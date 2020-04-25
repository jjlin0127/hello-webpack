<?php
try{
  require_once("connectDD105G3.php");
  $sql = "SELECT * FROM `member` WHERE memId = :memId AND memPsw = :memPsw";
  $member = $pdo->prepare($sql);
  $member->bindValue(":memId", $_POST["memId"]);
  $member->bindValue(":memPsw", $_POST["memPsw"]);
  $member->execute();

  if( $member->rowCount()==0){ //帳密錯誤
	  echo "error";
  }else{ //登入成功
    //自資料庫中取回資料
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
    //寫入session
    session_start();
    $_SESSION["memNo"] = $memRow["memNo"];
    $_SESSION["memId"] = $memRow["memId"];
    $_SESSION["memName"] = $memRow["memName"];
    $_SESSION["memNickname"] = $memRow["memNickname"];
    $_SESSION["memTel"] = $memRow["memTel"];
    $_SESSION["memStatus"] = $memRow["memStatus"];
    $_SESSION["memImgUrl"] = $memRow["memImgUrl"];
    $_SESSION["memPoint"] = $memRow["memPoint"];

    //送出登入者的姓名資料
    $member = [
      "memNo"=>$_SESSION["memNo"], 
      "memId"=>$_SESSION["memId"], 
      "memName"=>$_SESSION["memName"], 
      "memNickname"=>$_SESSION["memNickname"],
      "memTel"=>$_SESSION["memTel"],
      "memStatus"=>$_SESSION["memStatus"],
      "memImgUrl"=>$_SESSION["memImgUrl"],
      "memPoint"=>$_SESSION["memPoint"],
    ];
    echo json_encode($member);
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>