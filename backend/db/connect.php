<?php

header('Access-Control-Allow-Origin: http://localhost:3000');

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "ny_2025";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
};
?>