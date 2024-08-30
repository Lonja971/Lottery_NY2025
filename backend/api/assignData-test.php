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
    $stmtCase->bind_param('s', $caseName);
    $stmtCase->execute();
    $resultCase = $stmtCase->get_result();
    if ($caseRow = $resultCase->fetch_assoc()) {
        $caseId = $caseRow['id'];
        
        $guarantorQuery = "SELECT * FROM user_guarantors WHERE user_id = ? AND case_id = ?";
        $stmtGuarantor = $conn->prepare($guarantorQuery);
        $stmtGuarantor->bind_param('ii', $userId, $caseId);
        $stmtGuarantor->execute();
        $resultGuarantor = $stmtGuarantor->get_result();
        
        if ($userGuarantorRow = $resultGuarantor->fetch_assoc()) {
            $discoveriesNumber = $userGuarantorRow['discoveries_number'];
            
            $guarantorQuery = "SELECT * FROM guarantors WHERE case_id = ?";
            $stmtGuarantor = $conn->prepare($guarantorQuery);
            $stmtGuarantor->bind_param('i', $caseId);
            $stmtGuarantor->execute();
            $resultGuarantor = $stmtGuarantor->get_result();
            
            if ($guarantorRow = $resultGuarantor->fetch_assoc()) {
                if ($discoveriesNumber >= $guarantorRow['discoveries_number']) {
                    if ($guarantorRow['guarantor_type'] === 'tank') {
                        $data['droppedItems'][] = [
                            'type' => 'tank',
                            'id' => $guarantorRow['tank_id'],
                            'amounts' => [1],
                        ];
                    } else {
                        $data['droppedItems'][] = [
                            'type' => $guarantorRow['guarantor_type'],
                            'amounts' => [$guarantorRow['amount']],
                        ];
                    }
                    
                    $deleteGuarantorQuery = "DELETE FROM user_guarantors WHERE user_id = ? AND case_id = ?";
                    $stmtDelete = $conn->prepare($deleteGuarantorQuery);
                    $stmtDelete->bind_param('ii', $userId, $caseId);
                    $stmtDelete->execute();
                    $stmtDelete->close();
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
    }

    // Обробка droppedItems
    foreach ($data['droppedItems'] as $item) {
        if ($item['type'] !== 'tank') {
            $type = $item['type'];
            $amount = $item['amounts'][0];
            $updateFields[] = "$type = $type + $amount";
        } else {
            $tankId = $item['id'];

            $checkQuery = "SELECT id FROM user_tanks WHERE user_id = ? AND tank_id = ?";
            $stmtCheck = $conn->prepare($checkQuery);
            $stmtCheck->bind_param('ii', $userId, $tankId);
            $stmtCheck->execute();
            $resultCheck = $stmtCheck->get_result();
            if ($resultCheck->num_rows > 0) {
                $existingTanks[] = $item['id'];

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

    // Оновлення користувача
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
                    'message' => 'Data updated successfully',
                    'updated_dropped_items' => $data['droppedItems'], // Повернення оновленого масиву droppedItems
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

    // Додавання нових танків
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

    // Повідомлення про вже наявні танки
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





Спочтаку нам треба перевірити, чи є у цього кейсу гарант. Для цього ідемо в таблицю cases, де шукаємо строку в якій name = $caseName , та зберігаємо id.
    Після цього ми ідемо в таблицю user_guarantors, де шукаємо рядкок, у якого user_id = $userId та case_id = id кейсу який ми взяли з таблиці cases.

    Якщо ми знайшли такий рядок:
        То зберігаємо з нього значення discoveries_number.
        Ідемо в таблицю guarantors, де шукаємо строку в якій case_id = id кейсу який ми взяли з таблиці cases.
        Якщо знайшли строку:
            Перевіряємо , чи discoveries_number(З таблиці user_guarantors) >= discoveries_number(з таблиці guarantors)
            Якщо це правда:
                В масив $data['droppedItems'] нам треба додати гарантований елемент, а саме:
                Якщо guarantor_type(з строки в таблиці guarantors) == tank тоді :
                    Додаємо до $data['droppedItems'] : { type: "tank", id: tank_id(з строки в таблиці guarantors), amounts: [1] },

                Else:
                    Додаємо до $data['droppedItems'] : { type: guarantor_type(з строки в таблиці guarantors), amounts: [ amount(з строки в таблиці guarantors) ] },

                Якщо ми оновили $data['droppedItems'] , то треба піти в таблицю user_guarantors, де шукаємо рядкок, у якого user_id = $userId та case_id = id кейсу який ми взяли з таблиці cases

            Якщо це не правда:
                Закінчуємо цикл з перевіркою гарантів.

        Якщо не знайшли строку, то пишемо про помилку та закінчуємо цикл з перевіркою гарантів.
        

    Якщо рядок не знайдений, то нічого не робимо.