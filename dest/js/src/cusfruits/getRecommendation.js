var storage = sessionStorage;

function $id(id){
    return document.getElementById(id);
}

function loadRecommendation(){

    let cusFruitsNo = storage.getItem('recommend');
    let data_info = `cusFruitsNo=${cusFruitsNo}`;
     
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
      if(xhr.status==200){
        recommendation = xhr.responseText;
        if (recommendation == "error") {
            $('[name="close"]').click(function(){
                $('.recommended').css('display','none');
            })            
        } else {
            $('[name="close"]').click(function(){
                $('.recommended').css('display','block').addClass('bounce-in-top');
            })
            success = JSON.parse(xhr.responseText);
            switch(success.prodNo1){
                case "1": prodNo1 = "<span style='color: #5BC6C2;'>楊桃</span>";  break;
                case "2": prodNo1 = "<span style='color: #5BC6C2;'>鳳梨</span>"; break;
                case "3": prodNo1 = "<span style='color: #5BC6C2;'>火龍果</span>"; break;
                case "4": prodNo1 = "<span style='color: #FC8D7A;'>香蕉</span>"; break;
                case "5": prodNo1 = "<span style='color: #FC8D7A;'>草莓</span>"; break;
                case "6": prodNo1 = "<span style='color: #FC8D7A;'>芭樂</span>"; break;
                case "7": prodNo1 = "<span style='color: #F4AB6C;'>芒果</span>"; break;
                case "8": prodNo1 = "<span style='color: #F4AB6C;'>蘋果</span>"; break;
                case "9": prodNo1 = "<span style='color: #F4AB6C;'>藍莓</span>"; break;
            }
            switch(success.prodNo2){
                case "1": prodNo2 = "<span style='color: #5BC6C2;'>楊桃</span>";  break;
                case "2": prodNo2 = "<span style='color: #5BC6C2;'>鳳梨</span>"; break;
                case "3": prodNo2 = "<span style='color: #5BC6C2;'>火龍果</span>"; break;
                case "4": prodNo2 = "<span style='color: #FC8D7A;'>香蕉</span>"; break;
                case "5": prodNo2 = "<span style='color: #FC8D7A;'>草莓</span>"; break;
                case "6": prodNo2 = "<span style='color: #FC8D7A;'>芭樂</span>"; break;
                case "7": prodNo2 = "<span style='color: #F4AB6C;'>芒果</span>"; break;
                case "8": prodNo2 = "<span style='color: #F4AB6C;'>蘋果</span>"; break;
                case "9": prodNo2 = "<span style='color: #F4AB6C;'>藍莓</span>"; break;
            }
            switch(success.prodNo3){
                case "1": prodNo3 = "<span style='color: #5BC6C2;'>楊桃</span>";  break;
                case "2": prodNo3 = "<span style='color: #5BC6C2;'>鳳梨</span>"; break;
                case "3": prodNo3 = "<span style='color: #5BC6C2;'>火龍果</span>"; break;
                case "4": prodNo3 = "<span style='color: #FC8D7A;'>香蕉</span>"; break;
                case "5": prodNo3 = "<span style='color: #FC8D7A;'>草莓</span>"; break;
                case "6": prodNo3 = "<span style='color: #FC8D7A;'>芭樂</span>"; break;
                case "7": prodNo3 = "<span style='color: #F4AB6C;'>芒果</span>"; break;
                case "8": prodNo3 = "<span style='color: #F4AB6C;'>蘋果</span>"; break;
                case "9": prodNo3 = "<span style='color: #F4AB6C;'>藍莓</span>"; break;
            }
            switch(success.prodNo4){
                case "1": prodNo4 = "<span style='color: #5BC6C2;'>楊桃</span>";  break;
                case "2": prodNo4 = "<span style='color: #5BC6C2;'>鳳梨</span>"; break;
                case "3": prodNo4 = "<span style='color: #5BC6C2;'>火龍果</span>"; break;
                case "4": prodNo4 = "<span style='color: #FC8D7A;'>香蕉</span>"; break;
                case "5": prodNo4 = "<span style='color: #FC8D7A;'>草莓</span>"; break;
                case "6": prodNo4 = "<span style='color: #FC8D7A;'>芭樂</span>"; break;
                case "7": prodNo4 = "<span style='color: #F4AB6C;'>芒果</span>"; break;
                case "8": prodNo4 = "<span style='color: #F4AB6C;'>蘋果</span>"; break;
                case "9": prodNo4 = "<span style='color: #F4AB6C;'>藍莓</span>"; break;
            }
            switch(success.prodNo5){
                case "1": prodNo5 = "<span style='color: #5BC6C2;'>楊桃</span>";  break;
                case "2": prodNo5 = "<span style='color: #5BC6C2;'>鳳梨</span>"; break;
                case "3": prodNo5 = "<span style='color: #5BC6C2;'>火龍果</span>"; break;
                case "4": prodNo5 = "<span style='color: #FC8D7A;'>香蕉</span>"; break;
                case "5": prodNo5 = "<span style='color: #FC8D7A;'>草莓</span>"; break;
                case "6": prodNo5 = "<span style='color: #FC8D7A;'>芭樂</span>"; break;
                case "7": prodNo5 = "<span style='color: #F4AB6C;'>芒果</span>"; break;
                case "8": prodNo5 = "<span style='color: #F4AB6C;'>蘋果</span>"; break;
                case "9": prodNo5 = "<span style='color: #F4AB6C;'>藍莓</span>"; break;
            }
            switch(success.prodNo6){
                case "1": prodNo6 = "<span style='color: #5BC6C2;'>楊桃</span>";  break;
                case "2": prodNo6 = "<span style='color: #5BC6C2;'>鳳梨</span>"; break;
                case "3": prodNo6 = "<span style='color: #5BC6C2;'>火龍果</span>"; break;
                case "4": prodNo6 = "<span style='color: #FC8D7A;'>香蕉</span>"; break;
                case "5": prodNo6 = "<span style='color: #FC8D7A;'>草莓</span>"; break;
                case "6": prodNo6 = "<span style='color: #FC8D7A;'>芭樂</span>"; break;
                case "7": prodNo6 = "<span style='color: #F4AB6C;'>芒果</span>"; break;
                case "8": prodNo6 = "<span style='color: #F4AB6C;'>蘋果</span>"; break;
                case "9": prodNo6 = "<span style='color: #F4AB6C;'>藍莓</span>"; break;
            }
            switch(success.cusFruitsName){
                case "幫助消化": cusFruitsName = "<span style='color: #5BC6C2;'>幫助消化</span>";  break;
                case "活化大腦": cusFruitsName = "<span style='color: #F4AB6C;'>活化大腦</span>"; break;
                case "保護血管": cusFruitsName = "<span style='color: #FC8D7A;'>保護血管</span>"; break;
                case "幫助消化與活化大腦": cusFruitsName = "<span style='color: #5BC6C2;'>幫助消化</span>與<span style='color: #F4AB6C;'>活化大腦</span>"; break;
                case "幫助消化與保護血管": cusFruitsName = "<span style='color: #5BC6C2;'>幫助消化</span>與<span style='color: #FC8D7A;'>保護血管</span>"; break;
                case "活化大腦與保護血管": cusFruitsName = "<span style='color: #F4AB6C;'>活化大腦</span>與<span style='color: #FC8D7A;'>保護血管</span>"; break;
                case "均衡療效": cusFruitsName = "<span style='color: #006992;'>均衡療效</span>"; break;
            }

            $id("prodNo1").innerHTML = prodNo1;
            $id("prodNo2").innerHTML = prodNo2;
            $id("prodNo3").innerHTML = prodNo3;
            $id("prodNo4").innerHTML = prodNo4;
            $id("prodNo5").innerHTML = prodNo5;
            $id("prodNo6").innerHTML = prodNo6;            
            $id("cusFruitsName").innerHTML = cusFruitsName;
        }
      } else { alert(xhr.status); }
    }
    xhr.open("POST", "dest/../php/getRecommendation.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
};

$(document).ready(function(){
    loadRecommendation();
})



