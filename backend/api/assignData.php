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

$response = ['status' => 'error', 'message' => 'Unknown error'];

if ($data !== null) {
    $userId = $data['playerId'];
    $caseName = $data['caseName'];
    $updateFields = [];
    $insertUserTanks = [];
    $existingTanks = [];
    $goldToAdd = 0;
    $convertedItems = [];
    $newDroppedTanks = [];

    // Перевірка на наявність гаранта
    $caseQuery = "SELECT id FROM cases WHERE name = ?";
    $stmtCase = $conn->prepare($caseQuery);
    if (!$stmtCase) {
        $response['message'] = 'Failed to prepare case query: ' . $conn->error;
        echo json_encode($response);
        exit();
    }
    $stmtCase->bind_param('s', $caseName);
    $stmtCase->execute();
    $resultCase = $stmtCase->get_result();
    if ($caseRow = $resultCase->fetch_assoc()) {
        $caseId = $caseRow['id'];
        
        $guarantorQuery = "SELECT * FROM user_guarantors WHERE user_id = ? AND case_id = ?";
        $stmtGuarantor = $conn->prepare($guarantorQuery);
        if (!$stmtGuarantor) {
            $response['message'] = 'Failed to prepare guarantor query: ' . $conn->error;
            echo json_encode($response);
            exit();
        }
        $stmtGuarantor->bind_param('ii', $userId, $caseId);
        $stmtGuarantor->execute();
        $resultGuarantor = $stmtGuarantor->get_result();
        
        if ($userGuarantorRow = $resultGuarantor->fetch_assoc()) {
            $discoveriesNumber = $userGuarantorRow['discoveries_number'];
            
            $guarantorDetailsQuery = "SELECT * FROM guarantors WHERE case_id = ?";
            $stmtGuarantorDetails = $conn->prepare($guarantorDetailsQuery);
            if (!$stmtGuarantorDetails) {
                $response['message'] = 'Failed to prepare guarantor details query: ' . $conn->error;
                echo json_encode($response);
                exit();
            }
            $stmtGuarantorDetails->bind_param('i', $caseId);
            $stmtGuarantorDetails->execute();
            $resultGuarantorDetails = $stmtGuarantorDetails->get_result();
            
            if ($guarantorRow = $resultGuarantorDetails->fetch_assoc()) {
                // Перевірка, чи випав такий самий танк користувачеві вже
                $tankAlreadyDropped = false;
                foreach ($data['droppedItems'] as $droppedItem) {
                    if ($droppedItem['type'] === 'tank' && (int)$droppedItem['id'] === (int)$guarantorRow['tank_id']) {
                        $tankAlreadyDropped = true;
                        break;
                    }
                }

                if ($tankAlreadyDropped) {
                    // Збиття гаранту
                    // UPDATE user_guarantors SET discoveries_number = 0 WHERE user_id = ? AND case_id = ?
                    $deleteGuarantorQuery = "DELETE FROM user_guarantors WHERE user_id = ? AND case_id = ?";
                    $stmtDelete = $conn->prepare($deleteGuarantorQuery);
                    if (!$stmtDelete) {
                        $response['message'] = 'Failed to prepare delete guarantor query: ' . $conn->error;
                        echo json_encode($response);
                        exit();
                    }
                    $stmtDelete->bind_param('ii', $userId, $caseId);
                    $stmtDelete->execute();
                    $stmtDelete->close();
                } else {
                    if ($discoveriesNumber >= $guarantorRow['discoveries_number']) {
                        if ($guarantorRow['guarantor_type'] === 'tank') {
                            $data['droppedItems'][] = [
                                'id' => $guarantorRow['tank_id'],
                                'type' => 'tank',
                                'tankInfo' => [
                                    'id' => $guarantorRow['tank_id'],
                                ],
                                'amount' => 1
                            ];
                        } else {
                            $data['droppedItems'][] = [
                                'type' => $guarantorRow['guarantor_type'],
                                'amount' => $guarantorRow['amount']
                            ];
                        }
                        
                        $deleteGuarantorQuery = "DELETE FROM user_guarantors WHERE user_id = ? AND case_id = ?";
                        $stmtDelete = $conn->prepare($deleteGuarantorQuery);
                        if (!$stmtDelete) {
                            $response['message'] = 'Failed to prepare delete guarantor query: ' . $conn->error;
                            echo json_encode($response);
                            exit();
                        }
                        $stmtDelete->bind_param('ii', $userId, $caseId);
                        $stmtDelete->execute();
                        $stmtDelete->close();
                    }
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Guarantor not found',
                ];
                echo json_encode($response);
                exit();
            }
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Case not found',
        ];
        echo json_encode($response);
        exit();
    }

    // Обробка droppedItems
    $types = '';
    $params = [];
    foreach ($data['droppedItems'] as $item) {
        if ($item['type'] !== 'tank') {
            $type = $item['type'];
            $amount = $item['amount'];
            if ($amount > 0) {
                $updateFields[] = "$type = $type + ?";
                $params[] = $amount;
                $types .= 'i';
            }
        } else {
            $tankId = $item['tankInfo']['id'];
            $tankName = $item['tankInfo']['name'] ?? 'Unknown';
            $tankTranscription = $item['tankInfo']['transcription'] ?? 'Unknown';

            $checkQuery = "SELECT id FROM user_tanks WHERE user_id = ? AND tank_id = ?";
            $stmtCheck = $conn->prepare($checkQuery);
            if (!$stmtCheck) {
                $response['message'] = 'Failed to prepare check tank query: ' . $conn->error;
                echo json_encode($response);
                exit();
            }
            $stmtCheck->bind_param('ii', $userId, $tankId);
            $stmtCheck->execute();
            $resultCheck = $stmtCheck->get_result();
            if ($resultCheck->num_rows > 0) {
                $existingTanks[] = $tankName . ' (' . $tankTranscription . ')';

                // Отримання conversion_value з таблиці tanks
                $conversionQuery = "SELECT conversion_value FROM tanks WHERE id = ?";
                $stmtConversion = $conn->prepare($conversionQuery);
                if (!$stmtConversion) {
                    $response['message'] = 'Failed to prepare conversion query: ' . $conn->error;
                    echo json_encode($response);
                    exit();
                }
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
            $updateFields[] = "gold = gold + ?";
            $params[] = $goldToAdd;
            $types .= 'i';
        }
        
        if (!empty($updateFields)) {
            $updateQuery = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $stmt = $conn->prepare($updateQuery);
            if (!$stmt) {
                $response['message'] = 'Failed to prepare update query: ' . $conn->error;
                echo json_encode($response);
                exit();
            }
            $params[] = $userId;
            $types .= 'i';
            $stmt->bind_param($types, ...$params);
            if ($stmt->execute()) {
                $response = [
                    'status' => 'success',
                    'message' => 'Data updated successfully',
                    'updated_dropped_items' => $data['droppedItems'],
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
                'message' => 'No valid user data to update',
            ];
        }
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
