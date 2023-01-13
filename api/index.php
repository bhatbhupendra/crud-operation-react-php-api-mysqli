<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    include 'DbConnect.php';
    $objDbConnect = new DbConnect;
    $conn = $objDbConnect->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM users";
            if(isset($path[3]) && is_numeric($path[3])){
                $sql .= " WHERE id = :id";//there is space before WHERE
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id',$path[3]);
                $stmt->execute();
                $users = $stmt->fetch(PDO::FETCH_ASSOC);
            }else{
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($users);
            break;
        case "POST":
            $user = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO users(id,name,email,mobile,created_at) VALUES(null,:name,:email,:mobile,:created_at)";
            $stmt = $conn->prepare($sql);
            $created_at = date('Y-m-d');
            $stmt->bindParam(':name',$user->name);
            $stmt->bindParam(':email',$user->email);
            $stmt->bindParam(':mobile',$user->mobile);
            $stmt->bindParam(':created_at',$user->$created_at);
            if($stmt->execute()){
                $response = ['status' => 1,'message' => 'Record created successfully'];
            }else{
                $response = ['status' => 0,'message' => 'Faild to create Record!!'];
            }
            echo json_encode($response);
            break;

        case "PUT":
            $user = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE users SET name=:name, email=:email, mobile=:mobile,updated_at=:updated_at WHERE id=:id";
            $stmt = $conn->prepare($sql);
            $updated_at = date('Y-m-d');
            $stmt->bindParam(':id',$user->id);
            $stmt->bindParam(':name',$user->name);
            $stmt->bindParam(':email',$user->email);
            $stmt->bindParam(':mobile',$user->mobile);
            $stmt->bindParam(':updated_at',$user->$updated_at);
            if($stmt->execute()){
                $response = ['status' => 1,'message' => 'Record updated successfully'];
            }else{
                $response = ['status' => 0,'message' => 'Faild to upadate Record!!'];
            }
            echo json_encode($response);
            break;

        case "DELETE":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "DELETE FROM users WHERE id=:id";
            if(isset($path[3]) && is_numeric($path[3])){
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id',$path[3]);
                // $stmt->execute();
                if($stmt->execute()){//if sucessfully deleted
                    $response = ['status' => 1,'message' => 'Record Deleted successfully'];
                }else{
                    $response = ['status' => 0,'message' => 'Faild to Deleted Record!!'];
                }
                echo json_encode($response);
                break;
            }
    }
?>