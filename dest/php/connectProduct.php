<?php 
	$dsn = "mysql:host=localhost;port=3306;dbname=dd105g3;charset=utf8";
	$user = "dd105g3";
	//$user = "root";
	$password = "dd105g3";
	//$password = "root";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);

	$pdo = new PDO($dsn, $user, $password, $options);
?>