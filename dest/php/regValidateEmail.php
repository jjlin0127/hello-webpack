<?php
try {
	require_once("connectDD105G3.php");
	$sql = "SELECT * FROM `member` WHERE memId = :memId";
    $validateMemId = $pdo->prepare($sql);
    $validateMemId->bindValue(":memId", $_REQUEST["memId"]);
    $validateMemId->execute();
    if($validateMemId->rowCount()==0){
        echo "can use";
    }else{
        echo "existed";
    }   
} catch (PDOException $e) {
	$errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號 : " . $e->getLine() . "<br>";
    echo $errMsg;
}


?>