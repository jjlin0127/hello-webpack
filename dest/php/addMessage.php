<?php 
try {
	require_once("connectSchoolServer.php");
	
	$sql1 = "INSERT INTO `message` (`articleNo`, `memNo`, `mesText`) values(:articleNo, :memNo, :mesText)";
	$message = $pdo->prepare($sql1);
    $message -> bindValue(":articleNo", $_POST["articleNo"]);
    $message -> bindValue(":memNo", $_POST["memNo"]);
	$message -> bindValue(":mesText", $_POST["mesText"]);
    $message -> execute();

    $sql2 = "update article set artMesCount=:artMesCount where articleNo=:articleNo";
	$article = $pdo->prepare($sql2);
	$article -> bindValue(":articleNo", $_POST["articleNo"]);
	$article -> bindValue(":artMesCount", $_POST["artMesCount"]+1);
    $article -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  
