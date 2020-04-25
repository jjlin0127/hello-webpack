<?php 
try {
	require_once("connectSchoolServer.php");
	
	$sql = "DELETE FROM `author_subscription` 
			where (authorNo = :authorNo) and (memNo = :memNo)";
	$subscription = $pdo->prepare($sql);
    $subscription -> bindValue(":authorNo", $_POST["authorNo"]);
    $subscription -> bindValue(":memNo", $_POST["memNo"]);
    $subscription -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>