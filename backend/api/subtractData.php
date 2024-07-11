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

if ($data !== null && isset($data['case_name'], $data['case_open_resource'])) {
    $userId = 6;
    $caseName = $data['case_name'];
    $caseOpenResource = $data['case_open_resource'];

    // Знайти кейс у таблиці cases
    $caseQuery = "SELECT * FROM cases WHERE name = ?";
    $stmt = $conn->prepare($caseQuery);
    $stmt->bind_param('s', $caseName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $case = $result->fetch_assoc();
        $casePrice = 0;
        $resourceColumn = '';

        // Перевірка чи є case_open_resource у стовпцях cases
        if (isset($case[$caseOpenResource])) {
            $casePrice = $case[$caseOpenResource];
            $resourceColumn = $caseOpenResource;
        } else if (isset($case['unique_currency']) && isset($case['unique_price'])) {
            $resourceColumn = $case['unique_currency'];
            $casePrice = $case['unique_price'];
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Resource not found in case data']);
            exit();
        }

        // Перевірка чи користувач має достатньо ресурсів
        $userQuery = "SELECT $resourceColumn FROM users WHERE id = ?";
        $stmt = $conn->prepare($userQuery);
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $userResource = $user[$resourceColumn];

            if ($userResource >= $casePrice) {
                // Віднімання ресурсу у користувача
                $updateQuery = "UPDATE users SET $resourceColumn = $resourceColumn - ? WHERE id = ?";
                $stmt = $conn->prepare($updateQuery);
                $stmt->bind_param('ii', $casePrice, $userId);
                if ($stmt->execute()) {
                    echo json_encode(['status' => 'success', 'message' => 'Case opened successfully']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Failed to update user resources']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Not enough resources']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Case not found']);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid data format']);
}

$conn->close();
?>