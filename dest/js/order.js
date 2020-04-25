$(document).ready(function () {
    // console.log(123);
    //展開訂單明細
    $('.orderList_btn').on('click', function () {
        // console.log(321);
        if ($(this).text() == "訂單明細 v") {
            // console.log('oop');
            $('.orderLis_content').removeClass('show');
            let tar = $(this).next().next(); //吃結構
            tar.addClass('show');
            $(this).text("訂單明細 ^");
        } else {
            $('.orderLis_content').removeClass('show');
            $(this).text("訂單明細 v");
        }
    });
});


//========================評價燈箱=========================== 
function showBox() {
    var evaBox = document.querySelectorAll('button.orderList_eva');
    // console.log(evaBox.length);
    for (var i = 0; i < evaBox.length; i++) {
        evaBox[i].addEventListener("click", function (e) {
            let lightBox = e.target.parentNode.parentNode.nextElementSibling;
            // console.log(e.target);
            // console.log(e.target.parentNode);
            // console.log(lightBox);
            lightBox.classList.add("appear");

        });
    }
}
window.addEventListener('load', showBox, false);

//========================評價燈箱離開=========================== 
function closeBox() {
    var leavEva = document.getElementsByClassName('eva_lightBox_leave');
    // console.log(leavEva.length);
    for (var i = 0; i < leavEva.length; i++) {
        leavEva[i].addEventListener('click', function (e) {
            
            let lightEvaBox = e.target.parentNode.parentNode;
            // console.log(e.target);
            lightEvaBox.classList.remove('appear');

        });

    }

}
window.addEventListener('load', closeBox, false);

//========================評價燈箱結束===========================


//========================我的甘話展開收合=========================== 
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

// AJAX 載入
loadMyAticle();
loadMycollect();
loadMySubscription()

function loadMyAticle(){
    // let memNo = document.getElementById('memNo').value;
    let memNo ='1';
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
                        <td class="member_aticleTitle"><a href="#">${mya.artTitle}</a></td>
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
    xhr.open("GET", `./php/memberGetArticles.php?memNo=${memNo}`, true);
    xhr.send();
};

function loadMycollect(){
    // let memNo = document.getElementById('memNo').value;
    let memNo ='1';
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var myCollectStr = '';
            if(xhr.responseText.indexOf('no data') == -1){
                console.log(xhr.responseText);
                var myCollectOriArr = JSON.parse(xhr.responseText);
                myCollectCopy = JSON.parse(JSON.stringify(myCollectOriArr));
                myCollectCopy.forEach(function(myc){
                    myCollectStr +=
                    `
                    <tr>
                        <td class="member_aticleTitle"><a href="#">${myc.artTitle}</a></td>
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
    xhr.open("GET", `./php/memberGetCollects.php?memNo=${memNo}`, true);
    xhr.send();
}

function loadMySubscription(){
    // let memNo = document.getElementById('memNo').value;
    let memNo ='1';
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var mySubsStr = '';
            if(xhr.responseText.indexOf('no data') == -1){
                console.log(xhr.responseText);
                var mySubsOriArr = JSON.parse(xhr.responseText);
                mySubsCopy = JSON.parse(JSON.stringify(mySubsOriArr));
                mySubsCopy.forEach(function(myc){
                    mySubsStr +=
                    `
                    <tr>
                        <td>${myc.memName}</td>
                        <td class="member_aticleTitle"><a href="#">${myc.artTitle}</a></td>
                        <td>${myc.artTime.substr(0, 10)}</td>
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
    xhr.open("GET", `./php/memberGetSubs.php?memNo=${memNo}`, true);
    xhr.send();
};

// function delMyArticle(delAticleNo){
//     let aticleNo = delAticleNo.substr(10);
//     console.log(aticleNo);
//     let xhr = new XMLHttpRequest();
//     xhr.onload = function(){
//         if(xhr.status == 200){
//             alertBox.classList.remove('hidden');
//             alertBox.style.backgroundColor = "crimson";
//             alertBox.style.boxShadow = "2px 2px 5px rgba(220, 20, 60, 0.75)";
//             alertMessage.innerText = '已成功刪除話題！';

//             close_alert_btn.addEventListener('click', function(){
//                 alertBox.classList.add('hidden');
//             });
    
//             setTimeout(function(){
//                 alertBox.classList.add('hidden');
//             }, 2000);

//             loadMyAticle();
//         }else{
//             alert(xhr.status);
//         };
//     };
//     xhr.open("GET", `./php/memberDelMyArticle.php?aticleNo=${aticleNo}`, true);
//     xhr.send();
// };

// function doFirst(){
//     var btnDelAticle = document.getElementsByClassName('btnDelAticle');
//     for(let i=0; i<btnDelAticle.length; i++){
//         btnDelAticle[i].addEventListener('click', function(){
//             let delAticleNo = this.previousSibling.previousSibling.id;
//             delMyArticle(delAticleNo);
//         });
//     };
// };

// window.addEventListener('load', doFirst);