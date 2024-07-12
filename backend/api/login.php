<?php

include '../db/connect.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Перевірка методу запиту
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// Отримання даних від фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка наявності необхідних даних
if (!isset($data['userInfo']['username']) || !isset($data['userInfo']['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing username or password']);
    exit;
}

// Підготовка та виконання запиту до бази даних
$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param('s', $data['userInfo']['username']);
$stmt->execute();
$result = $stmt->get_result();

// Отримання результатів запиту
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Перевірка пароля
    if (password_verify($data['userInfo']['password'], $user['password'])) {
        // Успішний вхід користувача
        // Додаткові дані для генерації токену входу
        $tokenIdentifier = bin2hex(random_bytes(16)); // Генерація випадкового ідентифікатора токену
        $deviceId = $_SERVER['REMOTE_ADDR'] . '_' . $_SERVER['HTTP_USER_AGENT']; // Отримання ідентифікатора пристрою
        $createdAt = time(); // Поточний час у форматі Unix-часу (ціле число секунд)

        // Видалення існуючого токену, якщо є
        $deleteStmt = $conn->prepare("DELETE FROM tokens WHERE user_id = ? AND device = ?");
        $deleteStmt->bind_param('is', $user['id'], $deviceId);
        if (!$deleteStmt->execute()) {
            $error = $deleteStmt->error;
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete existing token', 'error' => $error]);
            exit;
        }

        // Вставка нового токену
        $insertStmt = $conn->prepare("INSERT INTO tokens (identifier, user_id, device, created_at) VALUES (?, ?, ?, ?)");
        $insertStmt->bind_param('sisi', $tokenIdentifier, $user['id'], $deviceId, $createdAt);
        if (!$insertStmt->execute()) {
            $error = $insertStmt->error;
            echo json_encode(['status' => 'error', 'message' => 'Failed to insert new token', 'error' => $error]);
            exit;
        }

        // Відправлення успішної відповіді на фронтенд з токеном
        echo json_encode(['status' => 'success', 'message' => 'Login successful', 'token' => $tokenIdentifier]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
}

// Закриття з'єднання
$stmt->close();
$conn->close();
?>