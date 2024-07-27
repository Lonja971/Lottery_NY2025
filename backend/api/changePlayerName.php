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
    $checkQuery = "SELECT id FROM users WHERE id = ?";
    $stmtCheck = $conn->prepare($checkQuery);
    $stmtCheck->bind_param('i', $playerId);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    if ($resultCheck->num_rows > 0) {
        // Користувач існує, оновлюємо ім'я
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
    } else {
        // Користувач не знайдений
        $response = [
            'status' => 'error',
            'message' => 'Player not found'
        ];
    }

    $stmtCheck->close();
} else {
    http_response_code(400);
    $response = ['error' => 'Invalid data format'];
}

echo json_encode($response);

$conn->close();
?>