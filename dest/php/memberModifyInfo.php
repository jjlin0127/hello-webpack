<?php 
session_start();
$memNo = $_SESSION["memNo"];

try {
	require_once("connectSchoolServer.php");

    $sql = "UPDATE `member` SET memName = :memName, memNickname = :memNickname, memPsw = :memPsw, memTel = :memTel
            WHERE memNo = :memNo";
    $member = $pdo->prepare($sql);
    $admin -> bindValue(":memName", $_POST["memName"]);
	$admin -> bindValue(":memNickname", $_POST["memNickname"]);
	$admin -> bindValue(":memPsw", $_POST["memPsw"]);
	$admin -> bindValue(":memTel", $_POST["memTel"]);
	$admin -> execute();
	
} catch (PDOException $e) {
	echo "ErrLine : " . $e->getLine() . "<br>";
	echo "ErrMsg : " . $e->getMessage() . "<br>";
}
?>  