<?php 
try {
	require_once("connectSchoolServer.php");
	
	$sql = "INSERT INTO article_report (articleNo, memNo, reportReason) 
			values(:articleNo, :memNo, :reportReason)";
	$articleReport = $pdo->prepare($sql);
    $articleReport -> bindValue(":articleNo", $_POST["articleNo"]);
    $articleReport -> bindValue(":memNo", $_POST["memNo"]);
	$articleReport -> bindValue(":reportReason", $_POST["reportReason"]);
    $articleReport -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}

// header("location:forum_article.php?articleNo={$articleNo}");
?>  
