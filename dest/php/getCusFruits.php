<?php
try{
  require_once("connectDD105G3.php");
  $sql = "SELECT * FROM `fruit_type` WHERE fruitTypeStatus = '1'";
  $cusFruits = $pdo->prepare($sql);
  $cusFruits->execute();

  if( $cusFruits->rowCount()==0){ //取不到資料
	  echo "error from cusFruits";
  }else{
    //自資料庫中取回資料
    $cusFruitsRows = $cusFruits->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cusFruitsRows);
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>