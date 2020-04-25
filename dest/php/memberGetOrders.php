<?php
session_start();
$memNo = $_SESSION["memNo"];
try {
    require_once("connectSchoolServer.php");

    $sql = "SELECT * from `order_general` where memNo = :memNo";
    $myOrders = $pdo->prepare($sql);
    $myOrders -> bindValue(":memNo" , $memNo); 
    $myOrders ->execute();

    if($myOrders -> rowCount() == 0){
        echo json_encode(array(
            'errorMsg' => 'no data'
        ));
    }else{
        $myOrdersRows = $myOrders->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($myOrdersRows);
    };

} catch (PDOException $e) {
	echo "ErrLine : " . $e->getLine() . "<br>";
	echo "ErrMsg : " . $e->getMessage() . "<br>";
}
?>