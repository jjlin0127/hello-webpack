<?php
$errMsg = "";
try {
	require_once("connectDD105G3.php");
	$pdo->beginTransaction();
	$sql = "INSERT INTO `member` (`memId`, `memPsw`, `memName`, `memNickname`, `memTel`, `memStatus`, `memImgUrl`, `memPoint`) 
			VALUES (:memId, :memPsw, NULL, :memNickname, NULL, '1', 'default.jpg', '10000')";
	$member = $pdo->prepare($sql);
	$member->bindValue(":memId", $_POST["memId"]);
	$member->bindValue(":memPsw", $_POST["memPsw"]);
	$member->bindValue(":memNickname", $_POST["memNickname"]);
	//取得自動創號的key值
	$memNo = $pdo->lastInsertId();
	echo "success";
	$member->execute();
	$pdo->commit();
} catch (PDOException $e) {
	$pdo->rollBack();
	$errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
	$errMsg .= "錯誤行號 : " . $e->getLine() . "<br>";
}
echo $errMsg;

?>