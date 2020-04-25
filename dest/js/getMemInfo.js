laodMemInfo();

function laodMemInfo(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let mem = JSON.parse(xhr.responseText);
        let memStr = '';

        if(mem.memId){
            memStr =
            `
            <input type="text" id="memNo" value="chen@gmail.com" type="${mem.memNo}">
            <br>
            <span>帳號: </span>
            <input type="email" id="memId" disabled="true" value="${mem.memId}">
            <br>
            <span>姓名: </span>
            <input type="text" neme="memName" id="memName" value="${mem.memName}">
            <br>
            <span>暱稱: </span>
            <input type="text" neme="memNickname" id="memNickname" value="${mem.memNickname}">
            <br>
            <span>密碼: </span>
            <input type="password" name="memName" id="memPwd" value="${mem.memPwd}">
            <br>
            <span>電話: </span>
            <input type="tel"" name="memTel" id="memTel" value="${mem.memTel}">
            <br>
            `;
        }else{
            alert( xhr.status );
        }
        let memberInfo = document.getElementById('myForm');
            memberInfo.innerHTML = memStr;
    };
    xhr.open("POST", "./php/getMemberInfo.php", true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send();
};

    
