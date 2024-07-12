<?php

include '../../db/connect.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data !== null) {
   $username = $data['username'];
   $password_1 = $data['password'];
   $password_2 = $data['confirmPassword'];
   $errors = array();

   if (empty($username)) {
       array_push($errors, "Ім'я користувача обов'язкове.");
   }
   if (empty($password_1)) {
       array_push($errors, "Пароль обов'язковий.");
   }
   if ($password_1 !== $password_2) {
       array_push($errors, "Паролі не співпадають.");
   }

   $user_check_query = "SELECT * FROM users WHERE username='$username' LIMIT 1";
   $result = mysqli_query($db, $user_check_query);
   $user = mysqli_fetch_assoc($result);

   if ($user) {
       if ($user['username'] === $username) {
           array_push($errors, "Ім'я користувача вже існує.");
       }
   }

   if (count($errors) == 0) {
       $hashed_password = password_hash($password_1, PASSWORD_BCRYPT);

       $query = "INSERT INTO users (username, password) VALUES('$username', '$hashed_password')";
       if (mysqli_query($db, $query)) {
           $response = array("status" => "success", "message" => "Користувач зареєстрований успішно.");
       } else {
           $response = array("status" => "error", "message" => "Помилка при реєстрації користувача.");
       }
   } else {
       $response = array("status" => "error", "message" => $errors);
   }

   echo json_encode($response);
} else {
   echo json_encode(array("status" => "error", "message" => "Невірні дані."));
}

mysqli_close($db);
?>