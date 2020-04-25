<?php
session_start();
$memNo = $_SESSION["memNo"];
try {
	require_once("connectSchoolServer.php");

	if($_POST["topicType"]){
		$topicType = $_POST["topicType"];
	}
	else{
		$topicType = "";
	}

	if($_POST["fruitsItems"]){
		$fruitsItems = implode("",$_POST["fruitsItems"]);
	}
	else{
		$fruitsItems = "";
	}

	$sql = "INSERT INTO `article` (`memNo`, `artTitle`, `artText`, `topicType`, `fruitsItems`) 
			values(:memNo, :artTitle, :artText, :topicType, :fruitsItems)";
	$article = $pdo->prepare($sql);
	$article -> bindValue(":memNo", $memNo);
	$article -> bindValue(":artTitle", $_POST["artTitle"]);
	$article -> bindValue(":artText", $_POST["editordata"]);
    $article -> bindValue(":topicType", $_POST["topicType"]);
    $article -> bindValue(":fruitsItems", $fruitsItems);
	$article -> execute();

	$articleNo = $pdo->lastInsertId();

    header("location:../forum_article.php?articleNo={$articleNo}");
	
} catch (PDOException $e) {
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
}
?>  