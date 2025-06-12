<?php
include '../db/connect.php';

if (!isset($_GET['token'])) {
    http_response_code(400);
    echo json_encode(array('error' => 'Token is required'));
    exit;
}

$token = $_GET['token'];

$sql = "SELECT user_id FROM tokens WHERE identifier = '$token'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $userId = $row['user_id'];

    $stmt = $pdo->prepare("
        SELECT u.*, ut.tank_id
        FROM users u
        LEFT JOIN user_tanks ut ON u.id = ut.user_id
        WHERE u.id = :userId
    ");

    $stmt->execute(['userId' => $userId]);
    $result_user = $conn->query($stmt);

    $user_info = null;
    if ($result_user->num_rows > 0) {
        $userTanks = array();
        while($row_user = $result_user->fetch_assoc()) {
            if (!$user_info) {
                $user = array(
                    'id' => $row_user['id'],
                    'name' => $row_user['username'],
                    'gold' => $row_user['gold'],
                    'silver' => $row_user['silver'],
                    'tokens' => $row_user['tokens'],
                    'red_tokens' => $row_user['red_tokens'],
                    'counters' => $row_user['counters'],
                    'premium_akk' => $row_user['premium_akk'],
                    'drawings' => $row_user['drawings'],
                    'regular_cases' => $row_user['regular_cases'],
                    'special_cases' => $row_user['special_cases'],
                    'rare_cases' => $row_user['rare_cases'],
                    'mythical_cases' => $row_user['mythical_cases'],
                    'legendary_cases' => $row_user['legendary_cases'],
                    'tokens_timer' => $row_user['tokens_timer'],
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
    } else {
        http_response_code(404);
        echo json_encode(array('error' => 'User not found'));
        exit;
    }

    $playerGuarantors = array();
    $sql_guarantors = "SELECT ug.case_id, ug.discoveries_number, c.name 
                       FROM user_guarantors ug
                       JOIN cases c ON ug.case_id = c.id
                       WHERE ug.user_id = $userId";

    $result_guarantors = $conn->query($sql_guarantors);

    while ($row_guarantor = $result_guarantors->fetch_assoc()) {
        $playerGuarantors[] = array(
            'name' => $row_guarantor['name'],
            'discoveries_number' => $row_guarantor['discoveries_number']
        );
    }

    $conn->close();

    echo json_encode(array('user' => $user_info, 'playerGuarantors' => $playerGuarantors));

} else {
    http_response_code(401);
    echo json_encode(array('error' => 'Invalid token'));
}

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
