//此段處理登入框互動效果及頁籤切換
$(document).ready(function() {
    $(".signup").css("display", "none");
    $('#signup').click(function() {
        let width = $(window).width();
        if (width < 768) {
            $(".whiteform").css("transform", "translateX(50%)");
        } else if (width >= 768) {
            $(".whiteform").css("transform", "translateX(80%)");
        }
        $(".signin").css("display", "none");
        $(".signup").css("display", "");
    });
    $('#signin').click(function() {
        $(".whiteform").css("transform", "translateX(0%)");
        $(".signup").css("display", "none");
        $(".signin").css("display", "");
    });
    $("#mobilelogintab").tabs();

    //密碼眼睛
    var pswType = $('[name="memPsw"]');
    var imgSrc = $('.showText');
    $('.showText').click(function(){
        if(pswType.attr("type") == "password"){
            pswType.attr("type","text");
            imgSrc.attr("src","./images/login/showPasswd.jpg");
        }else{
            pswType.attr("type","password");
            imgSrc.attr("src","./images/login/hidePasswd.jpg");
        }
    })

    pswType.focus(function(){
        imgSrc.addClass("shake-vertical");
    })
    pswType.blur(function(){
        imgSrc.removeClass("shake-vertical")
    })
});


