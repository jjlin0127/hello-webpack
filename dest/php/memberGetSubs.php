<?php
session_start();
$memNo = $_SESSION["memNo"];
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from author_subscription 
            join article on (author_subscription.authorNo = article.memNo) 
            join member on (article.memNo = member.memNo)
            where (article.artStatus = 1) and
                  (author_subscription.memNo = :memNo)";
    $mySubs = $pdo->prepare($sql);
    $mySubs -> bindValue(":memNo", $memNo);
    $mySubs -> execute();   

    if($mySubs -> rowCount() == 0){
        echo json_encode(array(
            'errorMsg' => 'no data'
        ));
    }else{
        $mySubsRows = $mySubs->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($mySubsRows);
    };

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>