<?php
// SeatView Pro - PHP Backend API
// Database configuration
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$host = 'localhost';
$dbname = 'seatview_db';
$username = 'root';
$password = '030701Lyz';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api/', '', $path);
$pathParts = explode('/', $path);

// Route handling
switch ($pathParts[0]) {
    case 'photos':
        handlePhotos($method, $pdo, $pathParts);
        break;
    case 'users':
        handleUsers($method, $pdo, $pathParts);
        break;
    case 'comments':
        handleComments($method, $pdo, $pathParts);
        break;
    case 'favorites':
        handleFavorites($method, $pdo, $pathParts);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}

// Photos API
function handlePhotos($method, $pdo, $pathParts) {
    switch ($method) {
        case 'GET':
            if (isset($pathParts[1])) {
                // Get single photo
                $stmt = $pdo->prepare("SELECT * FROM photos WHERE id = ?");
                $stmt->execute([$pathParts[1]]);
                $photo = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($photo) {
                    echo json_encode($photo);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Photo not found']);
                }
            } else {
                // Get all photos with filters
                $type = $_GET['type'] ?? 'all';
                $search = $_GET['search'] ?? '';
                $page = intval($_GET['page'] ?? 1);
                $limit = intval($_GET['limit'] ?? 20);
                $offset = ($page - 1) * $limit;
                
                $sql = "SELECT p.*, u.name as user_name, u.avatar 
                        FROM photos p 
                        JOIN users u ON p.user_id = u.id 
                        WHERE 1=1";
                $params = [];
                
                if ($type !== 'all') {
                    $sql .= " AND p.type = ?";
                    $params[] = $type;
                }
                
                if ($search) {
                    $sql .= " AND (p.venue ILIKE ? OR p.city ILIKE ? OR p.comment ILIKE ?)";
                    $params[] = "%$search%";
                    $params[] = "%$search%";
                    $params[] = "%$search%";
                }
                
                $sql .= " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
                $params[] = $limit;
                $params[] = $offset;
                
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
                $photos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Get total count
                $countSql = "SELECT COUNT(*) FROM photos WHERE 1=1";
                if ($type !== 'all') $countSql .= " AND type = '$type'";
                if ($search) $countSql .= " AND (venue ILIKE '%$search%' OR city ILIKE '%$search%' OR comment ILIKE '%$search%')";
                $total = $pdo->query($countSql)->fetchColumn();
                
                echo json_encode([
                    'photos' => $photos,
                    'total' => $total,
                    'page' => $page,
                    'pages' => ceil($total / $limit)
                ]);
            }
            break;
            
        case 'POST':
            // Create new photo
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $pdo->prepare("INSERT INTO photos (venue, city, country, type, section, seat, comment, img, rating, lat, lng, user_id) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id");
            $stmt->execute([
                $data['venue'], $data['city'], $data['country'], $data['type'],
                $data['section'], $data['seat'], $data['comment'], $data['img'],
                $data['rating'], $data['lat'], $data['lng'], $data['user_id']
            ]);
            
            $id = $stmt->fetchColumn();
            http_response_code(201);
            echo json_encode(['id' => $id, 'message' => 'Photo created successfully']);
            break;
            
        case 'PUT':
            if (!isset($pathParts[1])) {
                http_response_code(400);
                echo json_encode(['error' => 'Photo ID required']);
                return;
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("UPDATE photos SET venue=?, city=?, section=?, seat=?, comment=?, rating=? WHERE id=?");
            $stmt->execute([$data['venue'], $data['city'], $data['section'], $data['seat'], $data['comment'], $data['rating'], $pathParts[1]]);
            
            echo json_encode(['message' => 'Photo updated successfully']);
            break;
            
        case 'DELETE':
            if (!isset($pathParts[1])) {
                http_response_code(400);
                echo json_encode(['error' => 'Photo ID required']);
                return;
            }
            
            $stmt = $pdo->prepare("DELETE FROM photos WHERE id = ?");
            $stmt->execute([$pathParts[1]]);
            
            echo json_encode(['message' => 'Photo deleted successfully']);
            break;
    }
}

// Users API
function handleUsers($method, $pdo, $pathParts) {
    switch ($method) {
        case 'GET':
            if (isset($pathParts[1])) {
                $stmt = $pdo->prepare("SELECT id, name, email, avatar, created_at FROM users WHERE id = ?");
                $stmt->execute([$pathParts[1]]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($user) {
                    echo json_encode($user);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'User not found']);
                }
            }
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Check if email exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'Email already exists']);
                return;
            }
            
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id");
            $stmt->execute([$data['name'], $data['email'], $hashedPassword]);
            
            $id = $stmt->fetchColumn();
            http_response_code(201);
            echo json_encode(['id' => $id, 'message' => 'User created successfully']);
            break;
    }
}

// Comments API
function handleComments($method, $pdo, $pathParts) {
    switch ($method) {
        case 'GET':
            $photoId = $_GET['photo_id'] ?? null;
            if (!$photoId) {
                http_response_code(400);
                echo json_encode(['error' => 'Photo ID required']);
                return;
            }
            
            $stmt = $pdo->prepare("SELECT c.*, u.name as author, u.avatar 
                                   FROM comments c 
                                   JOIN users u ON c.user_id = u.id 
                                   WHERE c.photo_id = ? 
                                   ORDER BY c.created_at DESC");
            $stmt->execute([$photoId]);
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($comments);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $pdo->prepare("INSERT INTO comments (photo_id, user_id, text) VALUES (?, ?, ?) RETURNING id");
            $stmt->execute([$data['photo_id'], $data['user_id'], $data['text']]);
            
            $id = $stmt->fetchColumn();
            http_response_code(201);
            echo json_encode(['id' => $id, 'message' => 'Comment added successfully']);
            break;
            
        case 'DELETE':
            if (!isset($pathParts[1])) {
                http_response_code(400);
                echo json_encode(['error' => 'Comment ID required']);
                return;
            }
            
            $stmt = $pdo->prepare("DELETE FROM comments WHERE id = ?");
            $stmt->execute([$pathParts[1]]);
            
            echo json_encode(['message' => 'Comment deleted successfully']);
            break;
    }
}

// Favorites API
function handleFavorites($method, $pdo, $pathParts) {
    $userId = $_GET['user_id'] ?? null;
    
    switch ($method) {
        case 'GET':
            if (!$userId) {
                http_response_code(400);
                echo json_encode(['error' => 'User ID required']);
                return;
            }
            
            $stmt = $pdo->prepare("SELECT p.* FROM photos p 
                                   JOIN favorites f ON p.id = f.photo_id 
                                   WHERE f.user_id = ?");
            $stmt->execute([$userId]);
            $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($favorites);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $pdo->prepare("INSERT INTO favorites (user_id, photo_id) VALUES (?, ?)");
            $stmt->execute([$data['user_id'], $data['photo_id']]);
            
            http_response_code(201);
            echo json_encode(['message' => 'Added to favorites']);
            break;
            
        case 'DELETE':
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $pdo->prepare("DELETE FROM favorites WHERE user_id = ? AND photo_id = ?");
            $stmt->execute([$data['user_id'], $data['photo_id']]);
            
            echo json_encode(['message' => 'Removed from favorites']);
            break;
    }
}
?>