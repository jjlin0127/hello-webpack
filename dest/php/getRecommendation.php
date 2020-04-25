<?php
try{
  require_once("connectDD105G3.php");
  $sql = "SELECT * FROM `cusfruits_item` WHERE cusFruitsNo = :cusFruitsNo";
  $cusfruits_item = $pdo->prepare($sql);
  $cusfruits_item->bindValue(":cusFruitsNo", $_REQUEST["cusFruitsNo"]);
  $cusfruits_item->execute();

  if( $cusfruits_item->rowCount()==0){ //沒有該果甘組合
	  echo "error";
  }else{ //有找到
    //自資料庫中取回資料
    $cusFruitsRow = $cusfruits_item->fetch(PDO::FETCH_ASSOC);
    //寫入session
    session_start();
    $_SESSION["cusFruitsNo"] = $cusFruitsRow["cusFruitsNo"];
    $_SESSION["cus_memNo"] = $cusFruitsRow["memNo"];
    $_SESSION["cusFruitsName"] = $cusFruitsRow["cusFruitsName"];
    $_SESSION["prodNo1"] = $cusFruitsRow["prodNo1"];
    $_SESSION["prodNo2"] = $cusFruitsRow["prodNo2"];
    $_SESSION["prodNo3"] = $cusFruitsRow["prodNo3"];
    $_SESSION["prodNo4"] = $cusFruitsRow["prodNo4"];
    $_SESSION["prodNo5"] = $cusFruitsRow["prodNo5"];
    $_SESSION["prodNo6"] = $cusFruitsRow["prodNo6"];

    //送出取回的資料
    $cusfruits_item = [
      "cusFruitsNo"=>$_SESSION["cusFruitsNo"], 
      "cus_memNo"=>$_SESSION["cus_memNo"], 
      "cusFruitsName"=>$_SESSION["cusFruitsName"], 
      "prodNo1"=>$_SESSION["prodNo1"],
      "prodNo2"=>$_SESSION["prodNo2"],
      "prodNo3"=>$_SESSION["prodNo3"],
      "prodNo4"=>$_SESSION["prodNo4"],
      "prodNo5"=>$_SESSION["prodNo5"],
      "prodNo6"=>$_SESSION["prodNo6"],
    ];
    echo json_encode($cusfruits_item);
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>