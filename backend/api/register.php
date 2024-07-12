<?php

include '../db/connect.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);
$userInfo = json_decode($data['userInfo'], true);

$username = $conn->real_escape_string($userInfo['username']);
$password = $userInfo['password'];
$confirmPassword = $userInfo['confirmPassword'];

// Check if username already exists
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Username already exists."]);
    exit();
}

// Check if passwords match
if ($password !== $confirmPassword) {
    echo json_encode(["status" => "error", "message" => "Passwords do not match."]);
    exit();
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Get column names
$columnsSql = "SHOW COLUMNS FROM users";
$columnsResult = $conn->query($columnsSql);

if (!$columnsResult) {
    echo json_encode(["status" => "error", "message" => "Error fetching column names: " . $conn->error]);
    exit();
}

$columns = [];
while ($row = $columnsResult->fetch_assoc()) {
    $columns[] = $row['Field'];
}

// Build the insert query dynamically
$columnsList = [];
$valuesList = [];

foreach ($columns as $column) {
    if ($column == 'username') {
        $columnsList[] = 'username';
        $valuesList[] = "'$username'";
    } elseif ($column == 'password') {
        $columnsList[] = 'password';
        $valuesList[] = "'$hashedPassword'";
    } else {
        $columnsList[] = $column;
        $valuesList[] = 0;
    }
}

$columnsString = implode(", ", $columnsList);
$valuesString = implode(", ", $valuesList);

$sql = "INSERT INTO users ($columnsString) VALUES ($valuesString)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "User registered successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>