<?php
	$dsn = "mysql:host=localhost;port=8889;dbname=dd105g3;charset=utf8";
	$user = "root";
	$password = "1234";
	$options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION );
	$pdo = new PDO($dsn, $user, $password, $options);
?>