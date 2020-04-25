<?php
// ini_set("display_errors","On");
// error_reporting(E_ALL);

try {
    require_once("connectSchoolServer.php");

    $sql = "select * from message join member on (message.memNo = member.memNo)
                                  join article on (message.articleNo = article.articleNo)
            where (message.articleNo = :articleNo) and
                  (message.mesStatus = 1)";
    $messages = $pdo->prepare($sql);
    $messages -> bindValue(":articleNo", $_REQUEST["articleNo"]);
    $messages -> execute();   
    $mesRows = $messages->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($mesRows);

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>