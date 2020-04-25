<?php
// ini_set("display_errors","On");
// error_reporting(E_ALL);

try {
	require_once("connectSchoolServer.php");
	
	$sql = "INSERT INTO message_report (messageNo, memNo, reportReason) 
			values(:messageNo, :memNo, :reportReason)";
	$messageReport = $pdo->prepare($sql);
    $messageReport->bindValue(":messageNo", $_POST["messageNo"]);
    $messageReport->bindValue(":memNo", $_POST["memNo"]);
	$messageReport->bindValue(":reportReason", $_POST["reportReason"]);
    $messageReport->execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}

// header("location:forum_article.php?articleNo={$articleNo}");
?>  
