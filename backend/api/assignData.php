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
    $userId = $data['playerId'];
    $updateFields = [];
    $insertUserTanks = [];
    $existingTanks = [];
    $goldToAdd = 0;
    $convertedItems = [];
    $newDroppedTanks = [];

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

                // Отримання conversion_value з таблиці tanks
                $conversionQuery = "SELECT conversion_value FROM tanks WHERE id = ?";
                $stmtConversion = $conn->prepare($conversionQuery);
                $stmtConversion->bind_param('i', $tankId);
                $stmtConversion->execute();
                $resultConversion = $stmtConversion->get_result();
                if ($row = $resultConversion->fetch_assoc()) {
                    $goldToAdd += $row['conversion_value'];
                    $convertedItems[] = [
                        'id' => $tankId,
                        'conversion_value' => $row['conversion_value']
                    ];
                }
                $stmtConversion->close();
            } else {
                $insertUserTanks[] = "($userId, $tankId)";
                $newDroppedTanks[] = [
                    'id' => $tankId,
                ];
            }
            $stmtCheck->close();
        }
    }

    if (!empty($updateFields) || $goldToAdd > 0) {
        if ($goldToAdd > 0) {
            $updateFields[] = "gold = gold + $goldToAdd";
        }
        $updateQuery = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
        
        $stmt = $conn->prepare($updateQuery);
        if ($stmt) {
            $stmt->bind_param('i', $userId);
            if ($stmt->execute()) {
                $response = [
                    'status' => 'success',
                    'message' => 'Data updated successfully'
                ];
                if (!empty($convertedItems)) {
                    $response['converted_items'] = $convertedItems;
                }
                if (!empty($newDroppedTanks)) {
                    $response['new_dropped_tanks'] = $newDroppedTanks;
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to execute user update query: ' . $stmt->error,
                ];
            }
            $stmt->close();
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
        $response['status'] = $response['status'] === 'success' ? 'success' : 'warning';
        $response['message'] .= ', Tanks already assigned: ' . implode(', ', $existingTanks);
    }

} else {
    http_response_code(400);
    $response = ['error' => 'Invalid data format'];
}

echo json_encode($response);

?>