<?php
include '../db/connect.php';

$sql = "SELECT * FROM users WHERE id = 1";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode(array());
}

$conn->close();
?>