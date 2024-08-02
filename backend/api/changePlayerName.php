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
    $newUserName = $data['new_user_name'];

    // Перевірка, чи існує користувач з таким player_id
    $checkQuery = "SELECT id, username FROM users WHERE id = ?";
    $stmtCheck = $conn->prepare($checkQuery);
    $stmtCheck->bind_param('i', $playerId);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    if ($resultCheck->num_rows > 0) {
        $user = $resultCheck->fetch_assoc();
        $currentUserName = $user['username'];

        // Перевірка на однаковість імені, ігноруючи регістр
        if (strcasecmp($currentUserName, $newUserName) === 0) {
            $response = [
                'status' => 'the_same',
                'message' => 'The new user name is the same as the current one'
            ];
        } else {
            // Перевірка, чи нове ім'я вже використовується іншими користувачами
            $checkNewNameQuery = "SELECT id FROM users WHERE LOWER(username) = LOWER(?)";
            $stmtCheckNewName = $conn->prepare($checkNewNameQuery);
            $stmtCheckNewName->bind_param('s', $newUserName);
            $stmtCheckNewName->execute();
            $resultNewNameCheck = $stmtCheckNewName->get_result();

            if ($resultNewNameCheck->num_rows > 0) {
                // Ім'я вже існує
                $response = [
                    'status' => 'the_same',
                    'message' => 'Username already exists'
                ];
            } else {
                // Оновлюємо ім'я користувача
                $updateQuery = "UPDATE users SET username = ? WHERE id = ?";
                $stmtUpdate = $conn->prepare($updateQuery);
                $stmtUpdate->bind_param('si', $newUserName, $playerId);

                if ($stmtUpdate->execute()) {
                    $response = [
                        'status' => 'success',
                        'message' => 'User name updated successfully'
                    ];
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Failed to update user name: ' . $stmtUpdate->error
                    ];
                }
                $stmtUpdate->close();
            }
            $stmtCheckNewName->close();
        }
        $stmtCheck->close();
    } else {
        // Користувач не знайдений
        $response = [
            'status' => 'error',
            'message' => 'Player not found'
        ];
    }
} else {
    http_response_code(400);
    $response = ['error' => 'Invalid data format'];
}

echo json_encode($response);

$conn->close();
?>
