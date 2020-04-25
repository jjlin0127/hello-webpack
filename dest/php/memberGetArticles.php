<?php
// ini_set("display_errors","On");
// error_reporting(E_ALL);
session_start();
$memNo = $_SESSION["memNo"];
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from article where (article.artStatus = 1) and (memNo = :memNo)";
    $myArticles = $pdo->prepare($sql);
    $myArticles -> bindValue(":memNo", $memNo);
    $myArticles -> execute();
    
    if($myArticles -> rowCount() == 0){
        echo json_encode(array(
            'errorMsg' => 'no data'
        ));
    }else{
        $myArticlesRows = $myArticles->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($myArticlesRows);
    };

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>