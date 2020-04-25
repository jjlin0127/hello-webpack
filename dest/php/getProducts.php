<?php
try{
  require_once("connectDD105G3.php");
  $sql = "SELECT * FROM `product` WHERE prodStatus = '1'";
  $product = $pdo->prepare($sql);
  $product->execute();
  
  if($product->rowCount()==0){
    echo "error from product";
  }else{
    $productRows = $product->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($productRows);
  }

}catch(PDOException $e){
  echo $e->getMessage();
}
?>