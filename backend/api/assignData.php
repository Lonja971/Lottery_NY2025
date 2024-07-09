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
    $userId = 1;
    $updateFields = [];
    $insertUserTanks = [];
    $existingTanks = [];

    foreach ($data['droppedItems'] as $item) {
        if ($item['type'] !== 'tank') {
            $type = $item['type'];
            $amount = $item['amount'];
            $updateFields[] = "$type = $type + $amount";
         } else {
            $tankId = $item['tankInfo']['id'];

            $checkQuery = "SELECT id FROM user_tanks WHERE user_id = ? AND tank_id = ?";
            $stmtCheck = $conn->prepare($checkQuery);
            $stmtCheck->bind_param('ii', $userId, $tankId);
            $stmtCheck->execute();
            $resultCheck = $stmtCheck->get_result();
            if ($resultCheck->num_rows > 0) {
                $existingTanks[] = $item['tankInfo']['name'] . ' (' . $item['tankInfo']['transcription'] . ')';
            } else {
                $insertUserTanks[] = "($userId, $tankId)";
            }
            $stmtCheck->close(); // Закриваємо підготовлений запит для перевірки
         }
    }

    if (!empty($updateFields)) {
        $updateQuery = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
        
        $stmt = $conn->prepare($updateQuery);
        if ($stmt) {
            $stmt->bind_param('i', $userId);
            if ($stmt->execute()) {
                $response = [
                    'status' => 'success',
                    'message' => 'Data updated successfully',
                ];
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to execute user update query: ' . $stmt->error,
                ];
            }
            $stmt->close(); // Закриваємо підготовлений запит для оновлення користувача
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to prepare user update query: ' . $conn->error,
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'No valid user data to update',
        ];
    }

    if (!empty($insertUserTanks)) {
        $insertQuery = "INSERT INTO user_tanks (user_id, tank_id) VALUES " . implode(', ', $insertUserTanks);
        
        if ($conn->query($insertQuery)) {
            $response['status'] = 'success';
            $response['message'] .= ', Tanks assigned successfully';
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to assign tanks: ' . $conn->error,
            ];
        }
    }

    if (!empty($existingTanks)) {
        $response['status'] = 'warning';
        $response['message'] .= ', Tanks already assigned: ' . implode(', ', $existingTanks);
    }

} else {
    http_response_code(400);
    $response = ['error' => 'Invalid data format'];
}

echo json_encode($response);
?>