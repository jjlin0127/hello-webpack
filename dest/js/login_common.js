//此段處理登入登出
function $id(id) {
    return document.getElementById(id);
}

var member;

function showLoginForm() {
    if ($id('spanLogin').innerHTML == "登入" || $id("mobilespanLogin").innerHTML == "登入") {
        $id('spanLogin').location = location.href = "login.html";
        $id('mobileloginLink').location = location.href = "login.html";
    } else { //登出
        $id('spanLogin').location = window.location.href;
        $id('mobileloginLink').location = window.location.href;
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                $id("memNo").value = '&nbsp';
                $id('memNickname').innerHTML = '&nbsp';
                $id('spanLogin').innerHTML = '登入';
                //以下漢堡內的變化
                $id("mobilememNickname").innerHTML = '&nbsp';
                $id("mobilespanLogin").innerHTML = "登入";
            } else {
                $id("alertBox").style.backgroundColor = "firebrick";
                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
    
                $id("alertBox").classList.remove('hidden');
                $id("alertMessage").innerText = xhr.status;

                setTimeout(function(){
                    $id("alertBox").classList.add('hidden');
                }, 2000);
            }
        }
        xhr.open("get", "dest/../php/logout.php", true);
        xhr.send(null);
    }
}

function sendForm(e) {
    let memId = $id("memId").value;
    let memPsw = $id("memPsw").value;
    let data_info = `memId=${memId}&memPsw=${memPsw}`;

    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            member = xhr.responseText;
            if (member == "error") {
                $id("alertBox").style.backgroundColor = "firebrick";
                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
    
                $id("alertBox").classList.remove('hidden');
                $id("alertMessage").innerText = "帳密錯誤請重新輸入";
                
                setTimeout(function(){
                    $id("alertBox").classList.add('hidden');
                }, 2000);
            } else {
                memberParseLogin = JSON.parse(member)
                if(memberParseLogin.memStatus == "1"){
                    $id("memNickname").innerText = memberParseLogin.memNickname;
                    $id("spanLogin").innerText = "登出";
                    window.history.back();    
                } else{
                    $id("alertBox").style.backgroundColor = "firebrick";
                    $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        
                    $id("alertBox").classList.remove('hidden');
                    $id("alertMessage").innerHTML = "不好意思, 您已經被停權, 請聯繫天然甘了解詳情。<br>Email: DD105G3@gmail.com";
    
                    setTimeout(function(){
                        $id("alertBox").classList.add('hidden');
                    }, 4000);
                }               
            }
        } else { alert(xhr.status); }
    }
    xhr.open("Post", "dest/../php/ajaxLogin.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
    return false;
}

function mobilesendForm(e) {
    let memId = $id("mobilememId").value;
    let memPsw = $id("mobilememPsw").value;
    let data_info = `memId=${memId}&memPsw=${memPsw}`;

    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            mobileMember = xhr.responseText;
            if (mobileMember == "error") {
                $id("alertBox").style.backgroundColor = "firebrick";
                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
    
                $id("alertBox").classList.remove('hidden');    
                $id("alertMessage").innerText = "帳密錯誤請重新輸入";
                
                setTimeout(function(){
                    $id("alertBox").classList.add('hidden');
                }, 2000);
            } else {
                memberParseLogin = JSON.parse(mobileMember);
                if(memberParseLogin.memStatus == "1"){
                    $id("memNickname").innerText = memberParseLogin.memNickname;
                    $id("spanLogin").innerText = "登出";
                    window.history.back();    
                } else{
                    $id("alertBox").style.backgroundColor = "firebrick";
                    $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        
                    $id("alertBox").classList.remove('hidden');
                    $id("alertMessage").innerHTML = "不好意思, 您已經被停權, 請聯繫天然甘了解詳情。<br>Email: DD105G3@gmail.com";
                    
                    setTimeout(function(){
                        $id("alertBox").classList.add('hidden');
                    }, 4000);
                }               
            }
        } else { alert(xhr.status); }
    }
    xhr.open("Post", "dest/../php/ajaxLogin.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
    return false;
}

function getLoginInfo() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        memberParse = JSON.parse(xhr.responseText);
        if (memberParse.memId) {
            $id("memNo").value = memberParse.memNo;
            $id("memNickname").innerText = memberParse.memNickname;
            $id("spanLogin").innerText = "登出";
            //以下漢堡內的變化
            $id("mobilememNickname").innerText = `${memberParse.memNickname}，您好`;
            $id("mobilespanLogin").innerText = "登出";
        }
    }
    xhr.open("get", "dest/../php/getLoginInfo.php", true);
    xhr.send(null);
    
};
//以上登入登出結束

//此段處理註冊

function validateEmail(e){
    e.preventDefault();
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let xhr = new XMLHttpRequest();

    if ($('.signup .registeremail').val().match(emailRule)) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.responseText == 'can use') {
                    $(".signup .emailHint").text('該Email可以使用').css("color","green");                    
                } else if (xhr.responseText == 'existed') {
                    $(".signup .emailHint").text('Email已存在, 請重新輸入!').css("color","red");
                } else {
                    $id("alertBox").style.backgroundColor = "firebrick";
                    $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        
                    $id("alertBox").classList.remove('hidden');
                    $id("alertMessage").innerText = xhr.responseText;
                    
                    setTimeout(function(){
                        $id("alertBox").classList.add('hidden');
                    }, 3000);
                }
            }
        }
        let data_info = `memId=${$(".signup .registeremail").val()}`
        xhr.open("POST", "./php/regValidateEmail.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data_info);
    }else{
        $(".signup .emailHint").text('請檢查您輸入的email是否正確')
    }
}

function validateEmailMobile(e){
    e.preventDefault();
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let xhr = new XMLHttpRequest();

    if ($('#mobilelogintab2 .registeremail').val().match(emailRule)) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.responseText == 'can use') {
                    $("#mobilelogintab2 .emailHint").text('該Email可以使用').css("color","green");                    
                } else if (xhr.responseText == 'existed') {
                    $("#mobilelogintab2 .emailHint").text('Email已存在, 請重新輸入!').css("color","red");
                } else {
                    $id("alertBox").style.backgroundColor = "firebrick";
                    $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        
                    $id("alertBox").classList.remove('hidden');
                    $id("alertMessage").innerText = xhr.responseText;
                    
                    setTimeout(function(){
                        $id("alertBox").classList.add('hidden');
                    }, 3000);
                }
            }
        }
        let data_info = `memId=${$("#mobilelogintab2 .registeremail").val()}`
        xhr.open("POST", "./php/regValidateEmail.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data_info);
    }else{
        $("#mobilelogintab2 .emailHint").text('請檢查您輸入的email是否正確');
    }
}

function validatePsw(e){
    e.preventDefault();
    let pswRule = /\w{6,17}$/;
    if ($('.signup .firsttimepsw').val().match(pswRule)) {
        if ($('.whiteform .firsttimepsw').val() === $('.whiteform .confirmpsw').val()) {
            $(".pswHint").text('密碼可用').css("color","green");
        } else {
            $(".pswHint").text('請檢查兩次密碼輸入是否一致').css("color","red");;
        }
    } else {
        $(".pswHint").text('密碼請輸入6-18碼英文、數字。');
    }
}

function validatePswMobile(e){
    e.preventDefault();
    let pswRule = /\w{6,17}$/;
    if ($('#mobilelogintab2 .firsttimepsw').val().match(pswRule)) {
        if ($('.motabinner .firsttimepsw').val() === $('.motabinner .confirmpsw').val()) {
            $(".pswHint").text('密碼可用').css("color","green");
        } else {
            $(".pswHint").text('請檢查兩次密碼輸入是否一致').css("color","red");;
        }
    } else {
        $(".pswHint").text('密碼請輸入6-18碼英文、數字。');
    }
}

function registerfun(e) {
    e.preventDefault();
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    pswRule = /\w{6,17}$/;
    if ($('.registeremail').val() != "" &&
        $('.firsttimepsw').val() != "" &&
        $('.confirmpsw').val() != "" &&
        $('.regisnickname').val() != "") {
        if ($('.registeremail').val().match(emailRule)) {
            if ($('.firsttimepsw').val().match(pswRule)) {
                if ($('.whiteform .firsttimepsw').val() === $('.whiteform .confirmpsw').val()) {
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.responseText == 'success') { //恭喜經過一切驗證, 終成天然甘會員
                                $id("alertBox").style.backgroundColor = "#96DF73";
                                $id("alertBox").style.boxShadow = "2px 2px 5px #699c50";
                    
                                $id("alertBox").classList.remove('hidden');
                                $id("alertMessage").innerHTML = "註冊成功! 歡迎加入天然甘, 請重新登入<br>響應政府居家防疫, 註冊送1萬點";
                                $(".emailHint").text('');
                                
                                setTimeout(function(){
                                    $id("alertBox").classList.add('hidden');
                                    $(location).attr('href', './login.html');
                                }, 3000);
                                
                            } else if (xhr.responseText.match('23000')) {
                                $id("alertBox").style.backgroundColor = "firebrick";
                                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
                    
                                $id("alertBox").classList.remove('hidden');
                                $id("alertMessage").innerText = "Email已存在, 請重新輸入!";
                                
                                setTimeout(function(){
                                    $id("alertBox").classList.add('hidden');
                                }, 2000);
                            } else {
                                $id("alertBox").style.backgroundColor = "firebrick";
                                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
                    
                                $id("alertBox").classList.remove('hidden');
                                $id("alertMessage").innerText = xhr.responseText;
                                
                                setTimeout(function(){
                                    $id("alertBox").classList.add('hidden');
                                }, 2000);
                            }
                        }
                    }
                    let regisnickname = $('.regisnickname').val();
                    let regismemId = $('.registeremail').val();
                    let regispsw = $('.registerinput1').val();
                    let member_data = `memNickname=${regisnickname}&memId=${regismemId}&memPsw=${regispsw}`;
                    xhr.open("post", "./php/register.php", true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xhr.send(member_data);
                } else {
                    $id("alertBox").style.backgroundColor = "firebrick";
                    $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        
                    $id("alertBox").classList.remove('hidden');
                    $id("alertMessage").innerText = "請檢查兩次密碼輸入是否一致";

                    $('.whiteform .firsttimepsw').val('').focus();
                    $('.whiteform .confirmpsw').val('');
                    
                    setTimeout(function(){
                        $id("alertBox").classList.add('hidden');
                    }, 2000);
                }
            } else {
                $id("alertBox").style.backgroundColor = "firebrick";
                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
    
                $id("alertBox").classList.remove('hidden');
                $id("alertMessage").innerHTML = "密碼請輸入6-18碼英文、數字。";
                
                setTimeout(function(){
                    $id("alertBox").classList.add('hidden');
                }, 2000);
            }
        } else {
            $id("alertBox").style.backgroundColor = "firebrick";
            $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";

            $id("alertBox").classList.remove('hidden');
            $id("alertMessage").innerText = "請檢查您輸入的email是否正確";
            
            setTimeout(function(){
                $id("alertBox").classList.add('hidden');
            }, 2000);
        }
    } else {
        $id("alertBox").style.backgroundColor = "firebrick";
        $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        $id("alertBox").classList.remove('hidden');
        $id("alertMessage").innerText = "請輸入完整訊息再送出!";
        
        setTimeout(function(){
            $id("alertBox").classList.add('hidden');
        }, 2000);
    }

}

function mobileregisterfun(e) {
    e.preventDefault();
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    pswRule = /\w{5,17}$/;
    if ($('#mobilelogintab2 .registeremail').val() != "" &&
        $('#mobilelogintab2 .firsttimepsw').val() != "" &&
        $('#mobilelogintab2 .confirmpsw').val() != "" &&
        $('#mobilelogintab2 .regisnickname').val() != "") {
        if ($('#mobilelogintab2 .registeremail').val().match(emailRule)) {
            if ($('#mobilelogintab2 .firsttimepsw').val().match(pswRule)) {
                if ($('#mobilelogintab2 .firsttimepsw').val() === $('#mobilelogintab2 .confirmpsw').val()) {
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.responseText == 'success') { //恭喜經過一切驗證, 終成天然甘會員
                                $id("alertBox").style.backgroundColor = "#96DF73";
                                $id("alertBox").style.boxShadow = "2px 2px 5px #699c50";                        
                                $id("alertBox").classList.remove('hidden');
                                $id("alertMessage").innerHTML = "註冊成功! 歡迎加入天然甘, 請重新登入<br>響應政府居家防疫, 註冊送1萬點";
                                $(".emailHint").text('');
                                
                                setTimeout(function(){
                                    $id("alertBox").classList.add('hidden');
                                    $(location).attr('href', './login.html');
                                }, 3000);
                                
                            } else if (xhr.responseText.match('23000')) {
                                $id("alertBox").style.backgroundColor = "firebrick";
                                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
                        
                                $id("alertBox").classList.remove('hidden');
                                $id("alertMessage").innerHTML = "Email已存在, 請重新輸入!";
                                
                                setTimeout(function(){
                                    $id("alertBox").classList.add('hidden');
                                }, 2000);
                            } else {
                                alert(xhr.responseText);
                            }
                        }
                    }
                    let regisnickname = $('#mobilelogintab2 .regisnickname').val();
                    let regismemId = $('#mobilelogintab2 .registeremail').val();
                    let regispsw = $('#mobilelogintab2 .registerinput1').val();
                    let member_data = `memNickname=${regisnickname}&memId=${regismemId}&memPsw=${regispsw}`;
                    xhr.open("post", "./php/register.php", true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xhr.send(member_data);
                } else {
                    $id("alertBox").style.backgroundColor = "firebrick";
                    $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
            
                    $id("alertBox").classList.remove('hidden');
                    $id("alertMessage").innerHTML = "請檢查兩次密碼輸入是否一致";
                    $('#mobilelogintab2 .firsttimepsw').val('').focus();
                    $('#mobilelogintab2 .confirmpsw').val('');
                    
                    setTimeout(function(){
                        $id("alertBox").classList.add('hidden');
                    }, 2000);
                }
            } else {
                $id("alertBox").style.backgroundColor = "firebrick";
                $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        
                $id("alertBox").classList.remove('hidden');
                $id("alertMessage").innerHTML = "密碼請輸入6-18碼英文、數字。";
                
                setTimeout(function(){
                    $id("alertBox").classList.add('hidden');
                }, 2000);
            }
        } else {
            $id("alertBox").style.backgroundColor = "firebrick";
            $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
    
            $id("alertBox").classList.remove('hidden');
            $id("alertMessage").innerHTML = "請檢查您輸入的email是否正確";
            
            setTimeout(function(){
                $id("alertBox").classList.add('hidden');
            }, 2000);
        }
    } else {
        $id("alertBox").style.backgroundColor = "firebrick";
        $id("alertBox").style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";

        $id("alertBox").classList.remove('hidden');
        $id("alertMessage").innerHTML = "請輸入完整訊息再送出!";
        
        setTimeout(function(){
            $id("alertBox").classList.add('hidden');
        }, 2000);
    }
}


window.addEventListener("load", function() {
    
    getLoginInfo();

    $id('spanLogin').onclick = showLoginForm;
    $id('mobilespanLogin').onclick = showLoginForm;

    if (window.location.href.indexOf("login") > -1) {
        $('.signup .registeremail').blur(validateEmail);
        $('#mobilelogintab2 .registeremail').blur(validateEmailMobile);

        $('.signup .confirmpsw').blur(validatePsw);
        $('#mobilelogintab2 .confirmpsw').blur(validatePswMobile);


        $id('btnLogin').onclick = sendForm;
        $id('mobilebtnLogin').onclick = mobilesendForm;
        $id('btnRegis').onclick = registerfun;
        $id('mobilebtnRegis').onclick = mobileregisterfun;
        $id('close_alert_btn').onclick = function(){
            $id("alertBox").classList.add('hidden');
        };
    }
}, false);