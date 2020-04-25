loadMemberInfo();

function loadMemberInfo(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
            // console.log(xhr.responseText);
            memInfo = JSON.parse(xhr.responseText);
            console.log(memInfo);
            let memStr = '';
            // memInfo.forEach(function(mem){
               memStr = 
               `
               <span>帳號: </span>
               <input type="email" name="memId" id="memId" disabled="true" value="${memInfo.memId}">
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
               <input type="number" name="memPoint" id="memPoint" disabled="true" value="${memInfo.memPoint}">
               <br>
               <button class="member_info_btn">修改</button>
               `;    
            // });
            let memberTable = document.getElementById('memForm');
            memberTable.innerHTML = memStr;
    };
    xhr.open("GET", "./php/getMemberInfo.php", true);
   //  xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send();
};
