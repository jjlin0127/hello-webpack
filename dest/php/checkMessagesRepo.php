<?php
session_start();
$memNo = $_SESSION["memNo"];
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from message_report 
            where (memNo = :memNo)";
    $mesReport = $pdo->prepare($sql);
    $mesReport -> bindValue(":memNo", $memNo);
    $mesReport -> execute();   

    if($mesReport -> rowCount() == 0){
        echo json_encode(array(
            'errorMsg' => 'no data'
        ));
    }else{
        $mesReportRows = $mesReport->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($mesReportRows);
    };

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>