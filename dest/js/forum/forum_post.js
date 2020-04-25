$('#summernote').summernote({
    placeholder: '今天想分享什麼呢？',
    tabsize: 2,
    minHeight: 300,
    toolbar: [
        ['color', ['color']],
        ['font', ['underline']],
        ['para', ['paragraph']],
    ]
  });

function doFirst(){
    alertBox = document.getElementById('alertBox');
    alertMessage = document.getElementById('alertMessage');
    close_alert_btn = document.getElementById('close_alert_btn');
    close_alert_btn.addEventListener('click', function(){
        alertBox.classList.add('hidden');
    });
    topicType = document.getElementsByName('topicType');
    checkBoxGroup = document.forms['post_form']['fruitsItems[]'];			
    for (let i=0; i<checkBoxGroup.length; i++){
        checkBoxGroup[i].addEventListener('click', checkBoxLimit);
    };

    post_submit_btn = document.getElementById('post_submit_btn');
    post_submit_btn.addEventListener('click', checkPostForm);
}

function checkBoxLimit(){
    let limit = 6;
    let checkedCount = 0;
      
    for(let j=0; j<checkBoxGroup.length; j++){
        checkedCount += (checkBoxGroup[j].checked) ? 1 : 0;
    };

    if(checkedCount > limit) {
        alertBox.classList.remove('hidden');
        alertMessage.innerText = '最多選擇6項！';					
        this.checked = false;
          
        setTimeout(function(){
            alertBox.classList.add('hidden');
        }, 2000);
    };
};

function checkPostForm(e){
    let post_title = document.getElementById('post_title');
    let textContent = document.getElementById('summernote');

    if (document.getElementById('spanLogin').innerHTML === "登入" || document.getElementById("mobilespanLogin").innerHTML === "登入"){
        e?e.preventDefault():event.returnValue=false;
        alertBox.classList.remove('hidden');
        alertBox.style.backgroundColor = "firebrick";
        alertBox.style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        alertMessage.innerText = '請先登入會員！';
          
        setTimeout(function(){
            alertBox.classList.add('hidden');
        }, 2000);
        return;
    }else{
        if(post_title.value === ""){
            e?e.preventDefault():event.returnValue=false;
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '請輸入標題！';
              
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
    
            post_title.focus();
            return;					
        };

        if(topicType[0].checked == false && topicType[1].checked == false && topicType[2].checked == false && topicType[3].checked == false){
            e?e.preventDefault():event.returnValue=false;
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '請選取話題種類！';
              
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
    
            textConten.focus();
            return;		
        };
    
        if(textContent.value === ""){      
            e?e.preventDefault():event.returnValue=false;
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '請輸入話題內容！';				

            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
    
            textConten.focus();
            return;	
        }
    }
}

window.addEventListener('load', doFirst);