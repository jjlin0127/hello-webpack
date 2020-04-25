<?php
    session_start();
    $memNo = $_SESSION["memNo"];

    try {
        require_once("connectSchoolServer.php");

        $sql = "SELECT `memImgUrl` FROM `member` WHERE memNo = :memNo";
        $members = $pdo->prepare($sql);
        // $members -> bindValue(":memNo", $_POST["memNo"]);  -js
        $members -> bindValue(":memNo" , $memNo); //session
        $members ->execute();

        $memberRows = $members->fetch(PDO::FETCH_ASSOC);
        echo json_encode($memberRows);

    } catch (PDOException $e) {
	    echo "ErrLine : " . $e->getLine() . "<br>";
        echo "ErrMsg :" . $e->getMessage(). "<br>";   
    }
?>