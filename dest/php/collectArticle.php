<?php 
try {
	require_once("connectSchoolServer.php");
	
	$sql = "INSERT INTO `article_collect` (`articleNo`, `memNo`) 
			values(:articleNo, :memNo)";
	$collection = $pdo->prepare($sql);
    $collection -> bindValue(":articleNo", $_POST["articleNo"]);
    $collection -> bindValue(":memNo", $_POST["memNo"]);
    $collection -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>