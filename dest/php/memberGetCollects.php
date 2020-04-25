<?php
session_start();
$memNo = $_SESSION["memNo"];
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from article_collect join article 
            on (article_collect.articleNo = article.articleNo)
            where (article.artStatus = 1) and
                  (article_collect.memNo = :memNo)";
    $myCollects = $pdo->prepare($sql);
    $myCollects -> bindValue(":memNo", $memNo);
    $myCollects -> execute();   

    if($myCollects -> rowCount() == 0){
        echo json_encode(array(
            'errorMsg' => 'no data'
        ));
    }else{
        $myCollectsRows = $myCollects->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($myCollectsRows);
    };

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>