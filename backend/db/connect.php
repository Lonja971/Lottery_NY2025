<?php

header('Access-Control-Allow-Origin: http://localhost:3000');

//-OSPAnel:
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "ny_2025";

//-Plesk:
//$servername = "localhost:3306";
//$username = "Admin";
//$password = "Admin228-bg_agent";
//$dbname = "ny_2025";

//-MAMP:
//$servername = "localhost";
//$username = "root";
//$password = "root";
//$dbname = "ny_2025";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
};
?>