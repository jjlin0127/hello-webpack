// --------Member Center Display------------------------------------------------------------------------------


// --------Tween Max---------------------------
 var tl = new TimelineMax({
  yoyo: true,
});

tl.to('.island', 2, {
  x: 400,
}).to('.island', 2, {
  x: 550,
  scale: 2
});


// --------syy717 Btn---------------------------
$(".firstOrderContent").hide();
$(function () {
  $(".firstOrderBtn").click(function () {
    $(".firstOrderContent").show().fadeIn();
    $(".firstOrderWrap").addClass("active");
    $(".firstOrderWrap").width("100%");
  });
    $(".firstClose").click(function () {
      $(".firstOrderWrap").removeClass("active");
      $(".firstOrderContent").hide(100);
  });
});

$(".secOrderContent").hide();
  $(function () {
    $(".secOrderBtn").click(function () {
      $(".secOrderContent").show().fadeIn();
      $(".secOrderWrap").addClass("active");
      $(".secOrderWrap").width("100%");
    });
  $(".secClose").click(function () {
      $(".secOrderWrap").removeClass("active");
      $(".secOrderContent").hide(100);
  });
});
 

// --------Jerry Subscribe---------------------------
$(document).ready(function () {
  //展開
  $('.aticleList_btn').on('click', function () {
      // console.log(321);
      if ($(this).text() == "展開清單 v") {
          // console.log('oop');
          $('.orderLis_content').removeClass('show');
          let tar = $(this).next().next(); //吃結構
          tar.addClass('show');
          $(this).text("收合清單 ^");
      } else {
          $('.orderLis_content').removeClass('show');
          $(this).text("展開清單 v");
      }
  });
});

// --------Ajax------------------------------------------------------------------------------
// --------Jerry Subscribe---------------------------
loadMyAticle();
loadMycollect();
loadMySubscription()

function loadMyAticle(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var myAticleStr = '';
            if(xhr.responseText.indexOf('no data') == -1){
                var myAticleOriArr = JSON.parse(xhr.responseText);
                myAticleCopy = JSON.parse(JSON.stringify(myAticleOriArr));
                
                myAticleCopy.forEach(function(mya){
                    myAticleStr +=
                    `
                    <tr>
                        <td class="member_aticleTitle"><a href="forum_article.php?articleNo=${mya.articleNo}">${mya.artTitle}</a></td>
                        <td>${mya.artTime.substr(0, 10)}</td>
                        <td>${mya.artLikeCount}</td>
                    </tr>
                    `;
                });
            }else{
                myAticleStr = "您尚未發表任何話題";
            };
        }else{
            alert(xhr.status);
        };
        let myAticle = document.getElementById('myAticle');
        myAticle.innerHTML = myAticleStr;
    };
    xhr.open("GET", "./php/memberGetArticles.php", true);
    xhr.send();
};

function loadMycollect(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var myCollectStr = '';
            if(xhr.responseText.indexOf('no data') == -1){
                // console.log(xhr.responseText);
                var myCollectOriArr = JSON.parse(xhr.responseText);
                myCollectCopy = JSON.parse(JSON.stringify(myCollectOriArr));
                myCollectCopy.forEach(function(myc){
                    myCollectStr +=
                    `
                    <tr>
                        <td class="member_aticleTitle"><a href="forum_article.php?articleNo=${myc.articleNo}">${myc.artTitle}</a></td>
                        <td>${myc.artTime.substr(0, 10)}</td>
                        <td>${myc.artMesCount}</td>
                    </tr>
                    `;
                });
            }else{
                myCollectStr = "您尚未收藏任何話題";
            };
        }else{
            alert(xhr.status);
        };
        let myCollect = document.getElementById('myCollect');
        myCollect.innerHTML = myCollectStr;
    };
    xhr.open("GET", "./php/memberGetCollects.php", true);
    xhr.send();
}

function loadMySubscription(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var mySubsStr = '';
            if(xhr.responseText.indexOf('no data') == -1){
                // console.log(xhr.responseText);
                var mySubsOriArr = JSON.parse(xhr.responseText);
                mySubsCopy = JSON.parse(JSON.stringify(mySubsOriArr));
                mySubsCopy.forEach(function(mys){
                    mySubsStr +=
                    `
                    <tr>
                        <td>${mys.memNickname}</td>
                        <td class="member_aticleTitle"><a href="forum_article.php?articleNo=${mys.articleNo}">${mys.artTitle}</a></td>
                        <td>${mys.artTime.substr(0, 10)}</td>
                    </tr>
                    `;
                });
            }else{
                mySubsStr = "您尚未訂閱任何作者";
            };
        }else{
            alert(xhr.status);
        };
        let mySubscription = document.getElementById('mySubscription');
        mySubscription.innerHTML = mySubsStr;
    };
    xhr.open("GET", "./php/memberGetSubs.php", true);
    xhr.send();
};


// --------syy717 Order---------------------------


// --------loadInfo---------------------------

loadMemberInfo();

function loadMemberInfo(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
            // console.log(xhr.responseText);
            memInfo = JSON.parse(xhr.responseText);
            // console.log(memInfo);
            let memStr = '';
            // memInfo.forEach(function(mem){
               memStr = 
               `
               <span>帳號: </span>
               <span id="memId">&ensp;${memInfo.memId}</span>
               <br>
               <span>姓名: </span>
               <input type="text" name="memName" id="memName" value="${memInfo.memName}">
               <br>
               <span>暱稱: </span>
               <input type="text" name="memNickname" id="memNickname" value="${memInfo.memNickname}">
               <br>
               <span>密碼: </span>
               <input type="password" name="memPsw" id="memPsw" value="${memInfo.memPsw}">
               <br>
               <span>電話: </span>
               <input type="tel"" name="memTel" id="memTel" value="${memInfo.memTel}">
               <br>
               <span>點數: </span>
               <span id="memPoint">&ensp;${memInfo.memPoint}</span>
               <br>
               <input id="member_info_btn" class="member_info_btn" type="submit" value="確定修改">
               `;    
            // });
            let memberTable = document.getElementById('memForm');
            memberTable.innerHTML = memStr;
    };
    xhr.open("GET", "./php/memberGetInfo.php", true);
   //  xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	xhr.send();
};


// --------ModifyInfo---------------------------

function $id(id) {
	return document.getElementById(id);
  }
  
  function headChange() {
	var file = $id('upFile').files[0];
	var readFile = new FileReader();
	readFile.readAsDataURL(file);
	readFile.addEventListener('load', function () {
	  var bigHead = $id('headPic');
	  bigHead.src = readFile.result;
	  bigHead.style.maxWidth = '200px';
	  bigHead.style.maxHeight = '300px';
	});
  }
  
//-----------會員資料編輯--------------------

 


// --------loadSelfie---------------------------

loadMemberSelfie();

function loadMemberSelfie(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
            // console.log(xhr.responseText);
            MemberSelfie = JSON.parse(xhr.responseText);
            console.log(MemberSelfie);
            let memStr = '';
               memStr =             
               `
               <form action="" name="selfieForm" id="selfieForm" method="POST" enctype="multipart/form-data">
               <div id="selfie_container" class="selfie">
                   <div class="selfie_container" style='background-image: url(./images/member/headShot/default.jpg);'></div>
                   <br>
                   <input type="file" name="" id="memSelfie">
               </div>
               </form>
               `;    
            let memSelfieDiv = document.getElementById('selfieForm');
            memSelfieDiv.innerHTML = memStr;
    };
    xhr.open("GET", "./php/memberGetSelfie.php", true);
    xhr.send();
};

// --------loadOrders---------------------------

loadMyOrders();

function loadMyOrders(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.status == 200){
            var myOrderStr = '';
            if(xhr.responseText.indexOf('no data') == -1){
                var myOrderOriArr = JSON.parse(xhr.responseText);
                console.log(myOrderOriArr);
                myOrderOriArr.forEach(function(myo){
                    myOrderStr +=
                    `
                    <tr>
                        <td class="member_orderTitle"><a href="#">${myo.ordNo}</a></td>
                        <td>${myo.ordDatetime}</td>
                        <td>${myo.ordTotal}</td>
                        <td>${myo.ordStatus}</td>
                    </tr>
                    `;
                });
            }else{
                myOrderStr = "您尚未有任何訂單";
            };
        }else{
            alert(xhr.status);
        };
        let myOrder = document.getElementById('myOrder');
        myOrder.innerHTML = myOrderStr;
    };
    xhr.open("GET", `./php/memberGetOrders.php?memNo=${memNo}`, true);
    xhr.send();
};





  
