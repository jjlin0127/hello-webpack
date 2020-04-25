<?php 
try {
	require_once("connectSchoolServer.php");
	
	$sql = "DELETE FROM `article_collect` 
			where (articleNo = :articleNo) and (memNo = :memNo)";
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