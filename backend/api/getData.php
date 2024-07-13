<?php
include '../db/connect.php';

// Ensure token is passed in the request
if (!isset($_GET['token'])) {
    http_response_code(400);
    echo json_encode(array('error' => 'Token is required'));
    exit;
}

$token = $_GET['token'];

// Fetch user id from tokens table using the provided token
$sql = "SELECT user_id FROM tokens WHERE identifier = '$token'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $userId = $row['user_id'];

    // Proceed to fetch user data using $userId
    $sql_user = "SELECT u.*, ut.tank_id
                 FROM users u
                 LEFT JOIN user_tanks ut ON u.id = ut.user_id
                 WHERE u.id = $userId";

    $result_user = $conn->query($sql_user);

    if ($result_user->num_rows > 0) {
        $userTanks = array();
        while($row_user = $result_user->fetch_assoc()) {
            if (!isset($user)) {
                $user = array(
                    'id' => $row_user['id'],
                    'name' => $row_user['username'],
                    'gold' => $row_user['gold'],
                    'silver' => $row_user['silver'],
                    'tokens' => $row_user['tokens'],
                    'red_tokens' => $row_user['red_tokens'],
                    'tanks' => $row_user['tanks'],
                    'premium_akk' => $row_user['premium_akk'],
                    'drawings' => $row_user['drawings'],
                    'regular_cases' => $row_user['regular_cases'],
                    'special_cases' => $row_user['special_cases'],
                    'rare_cases' => $row_user['rare_cases'],
                    'mythical_cases' => $row_user['mythical_cases'],
                    'legendary_cases' => $row_user['legendary_cases'],
                );
            }
            if (!is_null($row_user['tank_id'])) {
                $userTanks[] = $row_user['tank_id'];
            }
        }
        
        usort($userTanks, function($a, $b) {
            global $conn;
            $tankA = getTankDetails($a, $conn);
            $tankB = getTankDetails($b, $conn);
            
            return strcmp($tankA['land'], $tankB['land']);
        });
        
        $user['userTanks'] = $userTanks;
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(array('error' => 'User not found'));
    }
} else {
    // Token not found
    http_response_code(401);
    echo json_encode(array('error' => 'Invalid token'));
}

$conn->close();

function getTankDetails($tankId, $conn) {
    $sql = "SELECT * FROM tanks WHERE id = $tankId";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    } else {
        return array();
    }
}
?>
