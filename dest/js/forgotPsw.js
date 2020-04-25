$('.mem_passw').click(function () {
    //那個按下忘記密碼的按鈕
    
    
    Swal.fire({
    
    //跳窗輸入資料
    
    title: '請輸入電子信箱',input: 'email',inputPlaceholder: '輸入電子信箱',confirmButtonText: '送出',confirmButtonColor: '#dc6247’,
    
    }).then(function (email) {
    
    $("#alertemail").val(email.value);
    
    if ($("#alertemail").val() != "") {
    
    $.ajax({
    type: "POST",url: "./php/forgotPassword.php?",data: $("#alertemail").serialize(),dataType: "text", //接收到的資料型態crossDomain: true,success: function (data) {if (data == "已發送郵件") {
    Swal.fire({
    title: data,
    html: `<p>請至信箱收取郵件</p>`,
    showConfirmButton: false,background: '#fff url("./img/p0080_m.jpg") center',
    });
    } else {
    Swal.fire({
    title: data,
    html: '
    <p>想想看🤔🧠</p>',
    showConfirmButton: false,background: '#fff url("./img/p0080_m.jpg") center',timer: 1000
    });
    }
    },
    error: function (xhr, ajaxOptions, thrownError) {
    alert(xhr.status);
    alert(thrownError);
    alert(ajaxOptions);
    }
    });
    }