<?php 
try {
	require_once("connectSchoolServer.php");

	$sql1 = "INSERT INTO message_likes (messageNo, memNo) 
			values(:messageNo, :memNo)";
	$Message = $pdo->prepare($sql1);
    $Message -> bindValue(":messageNo", $_POST["messageNo"]);
    $Message -> bindValue(":memNo", $_POST["memNo"]);
    $Message -> execute();

	$sql2 = "update `message` set mesLikeCount = :mesLikeCount 
			where (messageNo = :messageNo)";
	$message = $pdo->prepare($sql2);
	$message -> bindValue(":messageNo", $_POST["messageNo"]);
	$message -> bindValue(":mesLikeCount", $_POST["mesLikeCount"]);
    $message -> execute();

	$sql3 = "select * from message 
			where (messageNo = :messageNo)";
    $messages = $pdo->prepare($sql3);
	$messages -> bindValue(":messageNo", $_POST["messageNo"]);
    $messages -> execute();
    $mesRow = $messages->fetch(PDO::FETCH_ASSOC);
    echo json_encode($mesRow);
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  