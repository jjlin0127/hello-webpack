<?php
session_start();
$memNo = $_SESSION["memNo"];
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from message_likes 
            where (memNo = :memNo)";
    $mesLikes = $pdo->prepare($sql);
    $mesLikes -> bindValue(":memNo", $memNo);
    $mesLikes -> execute();   

    if($mesLikes -> rowCount() == 0){
        echo json_encode(array(
            'errorMsg' => 'no data'
        ));
    }else{
        $mesLikesRow = $mesLikes->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($mesLikesRow);
    };
    
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>