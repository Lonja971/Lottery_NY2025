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
    $playerId = $data['player_id'];
    $promo = strtolower($data['promo']);

    // Перевірка, чи вже активований промо-код
    $checkUserCodeQuery = "SELECT 1 FROM user_codes WHERE user_id = ? AND code_id = (SELECT id FROM codes WHERE code_name = ?)";
    $stmtCheckUserCode = $conn->prepare($checkUserCodeQuery);
    $stmtCheckUserCode->bind_param('is', $playerId, $promo);
    $stmtCheckUserCode->execute();
    $resultCheckUserCode = $stmtCheckUserCode->get_result();

    if ($resultCheckUserCode->num_rows > 0) {
        // Промо-код вже активований
        $response = [
            'status' => 'success',
            'message' => 'Promo code already activated',
            'already_activated' => true
        ];
    } else {
        // Промо-код не активований, перевірка наявності промо-коду в таблиці codes
        $checkPromoQuery = "SELECT id, get_type, get_name, get_value FROM codes WHERE code_name = ?";
        $stmtCheckPromo = $conn->prepare($checkPromoQuery);
        $stmtCheckPromo->bind_param('s', $promo);
        $stmtCheckPromo->execute();
        $resultCheckPromo = $stmtCheckPromo->get_result();

        if ($resultCheckPromo->num_rows > 0) {
            // Промо-код знайдений
            $promoData = $resultCheckPromo->fetch_assoc();
            $codeId = $promoData['id'];
            $getType = $promoData['get_type'];
            $getName = $promoData['get_name'];
            $getValue = $promoData['get_value'];

            if ($getType === 'resource') {
                // Оновлення ресурсів користувача
                $updateResourceQuery = "UPDATE users SET $getName = $getName + ? WHERE id = ?";
                $stmtUpdateResource = $conn->prepare($updateResourceQuery);
                $stmtUpdateResource->bind_param('ii', $getValue, $playerId);

                if ($stmtUpdateResource->execute()) {
                    $response = [
                        'status' => 'success',
                        'type' => 'resource',
                        'get_name' => $getName,
                        'get_value' => $getValue,
                        'message' => 'Resource updated successfully'
                    ];
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Failed to update resource: ' . $stmtUpdateResource->error
                    ];
                }
                $stmtUpdateResource->close();
            } elseif ($getType === 'tank') {
                // Перевірка наявності танка у користувача
                $checkTankQuery = "SELECT 1 FROM user_tanks WHERE user_id = ? AND tank_id = ?";
                $stmtCheckTank = $conn->prepare($checkTankQuery);
                $stmtCheckTank->bind_param('ii', $playerId, $getName);
                $stmtCheckTank->execute();
                $resultCheckTank = $stmtCheckTank->get_result();

                if ($resultCheckTank->num_rows > 0) {
                    // Танк вже є у користувача, компенсуємо золото
                    $checkTankValueQuery = "SELECT conversion_value FROM tanks WHERE id = ?";
                    $stmtCheckTankValue = $conn->prepare($checkTankValueQuery);
                    $stmtCheckTankValue->bind_param('i', $getName);
                    $stmtCheckTankValue->execute();
                    $resultCheckTankValue = $stmtCheckTankValue->get_result();
                    
                    if ($resultCheckTankValue->num_rows > 0) {
                        $tankData = $resultCheckTankValue->fetch_assoc();
                        $conversionValue = $tankData['conversion_value'];

                        // Додаємо золото користувачу
                        $updateGoldQuery = "UPDATE users SET gold = gold + ? WHERE id = ?";
                        $stmtUpdateGold = $conn->prepare($updateGoldQuery);
                        $stmtUpdateGold->bind_param('ii', $conversionValue, $playerId);

                        if ($stmtUpdateGold->execute()) {
                            $response = [
                                'status' => 'success',
                                'type' => 'tank',
                                'get_name' => $getName,
                                'conversion_value' => $conversionValue,
                                'message' => 'Tank already owned. Compensation added to gold.'
                            ];
                        } else {
                            $response = [
                                'status' => 'error',
                                'message' => 'Failed to update gold: ' . $stmtUpdateGold->error
                            ];
                        }
                        $stmtUpdateGold->close();
                    } else {
                        $response = [
                            'status' => 'error',
                            'message' => 'Failed to find tank conversion value'
                        ];
                    }
                    $stmtCheckTankValue->close();
                } else {
                    // Додаємо новий танк для користувача
                    $addTankQuery = "INSERT INTO user_tanks (user_id, tank_id) VALUES (?, ?)";
                    $stmtAddTank = $conn->prepare($addTankQuery);
                    $stmtAddTank->bind_param('ii', $playerId, $getName);

                    if ($stmtAddTank->execute()) {
                        $response = [
                            'status' => 'success',
                            'type' => 'tank',
                            'get_name' => $getName,
                            'message' => 'Tank added successfully'
                        ];
                    } else {
                        $response = [
                            'status' => 'error',
                            'message' => 'Failed to add tank: ' . $stmtAddTank->error
                        ];
                    }
                    $stmtAddTank->close();
                }
                $stmtCheckTank->close();
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Invalid get_type'
                ];
            }

            // Додавання нового запису до таблиці user_codes
            $addUserCodeQuery = "INSERT INTO user_codes (user_id, code_id) VALUES (?, ?)";
            $stmtAddUserCode = $conn->prepare($addUserCodeQuery);
            $stmtAddUserCode->bind_param('ii', $playerId, $codeId);
            $stmtAddUserCode->execute();
            $stmtAddUserCode->close();
        } else {
            // Промо-код не знайдений
            $response = [
                'status' => 'error',
                'message' => 'Promo code not found'
            ];
        }

        $stmtCheckPromo->close();
    }

    $stmtCheckUserCode->close();
} else {
    http_response_code(400);
    $response = ['error' => 'Invalid data format'];
}

echo json_encode($response);

$conn->close();
?>