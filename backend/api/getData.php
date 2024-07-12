<?php
include '../db/connect.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Перевірка чи існує токен у cookies
if (!isset($_COOKIE['t'])) {
    echo json_encode(['status' => 'error', 'message' => 'Token not found']);
    exit;
}

// Отримання та очистка токену з cookies для безпечного використання в запиті
$token = mysqli_real_escape_string($conn, $_COOKIE['t']);

// Підготовка та виконання запиту для перевірки токену та отримання user_id
$stmt = $conn->prepare("SELECT user_id FROM tokens WHERE identifier = ?");
$stmt->bind_param('s', $token);
$stmt->execute();
$result = $stmt->get_result();

// Перевірка чи існує користувач з таким токеном
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $userId = $row['user_id'];

    // Отримання даних користувача з бази даних
    $sql = "SELECT u.*, ut.tank_id
            FROM users u
            LEFT JOIN user_tanks ut ON u.id = ut.user_id
            WHERE u.id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $userTanks = array();
        while ($row = $result->fetch_assoc()) {
            if (!isset($user)) {
                $user = array(
                    'id' => $row['id'],
                    'name' => $row['username'],
                    'gold' => $row['gold'],
                    'silver' => $row['silver'],
                    'tokens' => $row['tokens'],
                    'red_tokens' => $row['red_tokens'],
                    'tanks' => $row['tanks'],
                    'premium_akk' => $row['premium_akk'],
                    'drawings' => $row['drawings'],
                    'regular_cases' => $row['regular_cases'],
                    'special_cases' => $row['special_cases'],
                    'rare_cases' => $row['rare_cases'],
                    'mythical_cases' => $row['mythical_cases'],
                    'legendary_cases' => $row['legendary_cases'],
                );
            }
            if (!is_null($row['tank_id'])) {
                $userTanks[] = $row['tank_id'];
            }
        }

        // Сортування танків за певним критерієм
        usort($userTanks, function ($a, $b) {
            global $conn;
            $tankA = getTankDetails($a, $conn);
            $tankB = getTankDetails($b, $conn);

            return strcmp($tankA['land'], $tankB['land']);
        });

        $user['userTanks'] = $userTanks;
        echo json_encode($user);
    } else {
        echo json_encode(array());
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
}

// Закриття з'єднання
$stmt->close();
$conn->close();

function getTankDetails($tankId, $conn)
{
    $sql = "SELECT * FROM tanks WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $tankId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    } else {
        return array();
    }
}
?>
