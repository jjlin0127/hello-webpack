<?php
	$dname = 'dd105g3';
	$dsn = "mysql:host=localhost;port=3306;dbname=$dname;charset=utf8";
	$user = "root";
	$password = "a123456";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO( $dsn, $user, $password, $options);
?>