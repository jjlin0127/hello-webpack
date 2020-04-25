<?php
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from `boximg` where boxImgStatus = 1 order by boxImgNo desc limit 8 ";
    $boxes = $pdo->query($sql);
    $boxRows = $boxes->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($boxRows);

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>