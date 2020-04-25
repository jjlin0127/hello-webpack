<?php
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from `article` join `member` on (article.memNo = member.memNo) 
            where (article.artStatus = 1)";
    $articles = $pdo->query($sql);
    $artiRows = $articles->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($artiRows);

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>