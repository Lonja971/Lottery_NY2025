<?php

include '../db/connect.php';

// Налаштування CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);

if ($data !== null) {
    $userId = $data['userId'];

    // Отримуємо поточний час у форматі UNIX timestamp
    $currentTime = time();

    // Отримуємо дані користувача з таблиці users
    $sql = "SELECT tokens_timer, tokens FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $tokensTimer = $row['tokens_timer'];

        // Перевірка, чи поточний час >= tokens_timer або tokens_timer дорівнює NULL
        if ($tokensTimer === null || $currentTime >= $tokensTimer) {
            // Оновлюємо tokens_timer на поточний час + 1 година і додаємо +1 до tokens
            $newTokensTimer = $currentTime + 3600;
            $newTokens = $row['tokens'] + 1;

            $updateSql = "UPDATE users SET tokens_timer = ?, tokens = ? WHERE id = ?";
            $stmtUpdate = $conn->prepare($updateSql);
            $stmtUpdate->bind_param('iii', $newTokensTimer, $newTokens, $userId);

            if ($stmtUpdate->execute()) {
                $response = [
                    'status' => 'success',
                    'message' => 'Tokens updated successfully'
                ];
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to update tokens: ' . $stmtUpdate->error
                ];
            }
            $stmtUpdate->close();
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Time has not passed yet'
            ];
        }
    } else {
        http_response_code(404);
        $response = [
            'status' => 'error',
            'message' => 'User not found'
        ];
    }
    $stmt->close();
} else {
    http_response_code(400);
    $response = ['error' => 'Invalid data format'];
}

echo json_encode($response);

$conn->close();
?>