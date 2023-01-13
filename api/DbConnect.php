<?php
    class DbConnect{
        private $server = 'localhost';
        private $dbname = 'react-crud';
        private $username = 'root';
        private $password = '';

        public function connect(){
            try {
                $conn = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->username, $this->password);
                // set the PDO error mode to exception
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch(PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }
    }
?>