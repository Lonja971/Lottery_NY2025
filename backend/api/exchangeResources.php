<?php

include '../db/connect.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data !== null) {
    $playerId = $data['playerId'];
    $exchangeType = $data['exchange_type'];
    $exchangeRes = $data['exchange_res'];
    $getRes = $data['get_res'];
    $rangeValue = $data['range_value'];

    if ($exchangeType !== 'tank') {
        $table = '';
        if ($getRes === 'gold') {
            $table = 'exchange_gold';
        } elseif ($getRes === 'red_tokens') {
            $table = 'exchange_red_tokens';
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid get_res value']);
            exit();
        }

        $checkQuery = "SELECT exchange_value, get_value FROM $table WHERE exchange_resource = ?";
        $stmtCheck = $conn->prepare($checkQuery);
        $stmtCheck->bind_param('s', $exchangeRes);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->get_result();

        if ($resultCheck->num_rows === 0) {
            echo json_encode(['status' => 'error', 'message' => 'No matching exchange resource found']);
            exit();
        }

        $exchangeData = $resultCheck->fetch_assoc();
        $exchangeValue = $exchangeData['exchange_value'];
        $getValue = $exchangeData['get_value'];

        $exchangeAmount = intdiv($rangeValue, $exchangeValue) * $getValue;

        if ($exchangeAmount <= 0) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid range value']);
            exit();
        }

        // Віднімання ресурсу exchangeRes
        $userQuery = "SELECT $exchangeRes, $getRes FROM users WHERE id = ?";
        $stmtUser = $conn->prepare($userQuery);
        $stmtUser->bind_param('i', $playerId);
        $stmtUser->execute();
        $resultUser = $stmtUser->get_result();

        if ($resultUser->num_rows === 0) {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
            exit();
        }

        $userData = $resultUser->fetch_assoc();
        $currentExchangeResValue = $userData[$exchangeRes];
        $currentGetResValue = $userData[$getRes];

        if ($rangeValue > $currentExchangeResValue) {
            echo json_encode(['status' => 'error', 'message' => 'Not enough exchange resources']);
            exit();
        }

        $newExchangeResValue = $currentExchangeResValue - $rangeValue;
        $newGetResValue = $currentGetResValue + $exchangeAmount;

        $updateQuery = "UPDATE users SET $exchangeRes = ?, $getRes = ? WHERE id = ?";
        $stmtUpdate = $conn->prepare($updateQuery);
        $stmtUpdate->bind_param('iii', $newExchangeResValue, $newGetResValue, $playerId);
        if ($stmtUpdate->execute()) {
            echo json_encode([
                'status' => 'success',
                'new_exchange_res_value' => $newExchangeResValue,
                'new_get_res_value' => $newGetResValue,
                'added_amount' => $exchangeAmount,
                'added_resource' => $getRes
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user data: ' . $stmtUpdate->error]);
        }

        $stmtCheck->close();
        $stmtUser->close();
        $stmtUpdate->close();
    } else {
        // Обробка обміну танків
        $tankQuery = "SELECT * FROM user_tanks WHERE user_id = ? AND tank_id = ?";
        $stmtTank = $conn->prepare($tankQuery);
        $stmtTank->bind_param('ii', $playerId, $exchangeRes);
        $stmtTank->execute();
        $resultTank = $stmtTank->get_result();

        if ($resultTank->num_rows === 0) {
            echo json_encode(['status' => 'error', 'message' => 'Tank not found']);
            exit();
        }

        // Видалення танка з таблиці user_tanks
        $deleteTankQuery = "DELETE FROM user_tanks WHERE user_id = ? AND tank_id = ?";
        $stmtDeleteTank = $conn->prepare($deleteTankQuery);
        $stmtDeleteTank->bind_param('ii', $playerId, $exchangeRes);
        if (!$stmtDeleteTank->execute()) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete tank: ' . $stmtDeleteTank->error]);
            exit();
        }

        // Отримання значення conversion_value з таблиці tanks
        $tankConversionQuery = "SELECT conversion_value FROM tanks WHERE id = ?";
        $stmtTankConversion = $conn->prepare($tankConversionQuery);
        $stmtTankConversion->bind_param('i', $exchangeRes);
        $stmtTankConversion->execute();
        $resultTankConversion = $stmtTankConversion->get_result();

        if ($resultTankConversion->num_rows === 0) {
            echo json_encode(['status' => 'error', 'message' => 'Tank conversion value not found']);
            exit();
        }

        $tankData = $resultTankConversion->fetch_assoc();
        $conversionValue = $tankData['conversion_value'];

        // Оновлення значення gold для користувача
        $userGoldQuery = "SELECT gold FROM users WHERE id = ?";
        $stmtUserGold = $conn->prepare($userGoldQuery);
        $stmtUserGold->bind_param('i', $playerId);
        $stmtUserGold->execute();
        $resultUserGold = $stmtUserGold->get_result();

        if ($resultUserGold->num_rows === 0) {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
            exit();
        }

        $userData = $resultUserGold->fetch_assoc();
        $currentGoldValue = $userData['gold'];
        $newGoldValue = $currentGoldValue + $conversionValue;

        $updateGoldQuery = "UPDATE users SET gold = ? WHERE id = ?";
        $stmtUpdateGold = $conn->prepare($updateGoldQuery);
        $stmtUpdateGold->bind_param('ii', $newGoldValue, $playerId);
        if ($stmtUpdateGold->execute()) {
            echo json_encode([
                'status' => 'success',
                'new_gold_value' => $newGoldValue,
                'added_amount' => $conversionValue,
                'added_resource' => 'gold'
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user gold: ' . $stmtUpdateGold->error]);
        }

        $stmtTank->close();
        $stmtDeleteTank->close();
        $stmtTankConversion->close();
        $stmtUserGold->close();
        $stmtUpdateGold->close();
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}

$conn->close();
?>
