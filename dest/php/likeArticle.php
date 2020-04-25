<?php 
try {
	require_once("connectSchoolServer.php");

	$sql1 = "INSERT INTO `article_likes` (`articleNo`, `memNo`) 
			values(:articleNo, :memNo)";
	$Article = $pdo->prepare($sql1);
    $Article -> bindValue(":articleNo", $_POST["articleNo"]);
    $Article -> bindValue(":memNo", $_POST["memNo"]);
	$Article -> execute();
	
	$sql2 = "update `article` set artLikeCount = :artLikeCount 
	where (articleNo = :articleNo)";
	$article = $pdo->prepare($sql2);
	$article -> bindValue(":articleNo", $_POST["articleNo"]);
	$article -> bindValue(":artLikeCount", $_POST["artLikeCount"]);
    $article -> execute();

	$sql3 = "select * from article where (articleNo = :articleNo)";
    $articles = $pdo->prepare($sql3);
	$articles -> bindValue(":articleNo", $_POST["articleNo"]);
    $articles -> execute();
    $artiRow = $articles->fetch(PDO::FETCH_ASSOC);
    echo json_encode($artiRow);
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  