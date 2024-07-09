<?php
include '../db/connect.php';

$userId = 1;

$sql = "SELECT u.*, ut.tank_id
        FROM users u
        LEFT JOIN user_tanks ut ON u.id = ut.user_id
        WHERE u.id = $userId";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $userTanks = array();
    while($row = $result->fetch_assoc()) {
        if (!isset($user)) {
            $user = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'gold' => $row['gold'],
                'silver' => $row['silver'],
                'tokens' => $row['tokens'],
                'red_tokens' => $row['red_tokens'],
                'tanks' => $row['tanks'],
                'premium_akk' => $row['premium_akk'],
                'drawings' => $row['drawings'],
            );
        }
        if (!is_null($row['tank_id'])) {
            $userTanks[] = $row['tank_id'];
        }
    }
    $user['userTanks'] = $userTanks;
    echo json_encode($user);
} else {
    echo json_encode(array());
}

$conn->close();
?>