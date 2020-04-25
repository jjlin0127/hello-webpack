//  ajax load all messages
loadMessages();

function loadMessages(){
    let articleNo = document.getElementById('articleNo').value;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var mesOriArr = JSON.parse(xhr.responseText);
            mesArr = JSON.parse(JSON.stringify(mesOriArr));
            // console.log(mesArr);
            let mesStr = '';
            mesArr.forEach(function(mes){
                mesStr += 
                `
                <div class="comment">
                    <div class="author">
                         <div class="author_img">
                            <img src="./images/member/headShot/${mes.memImgUrl}" alt="隱藏的頭像">
                        </div>
                        <p class="author_name">${mes.memNickname}<span class="comment_time">${mes.mesTime}</span></p>
                    </div>                    
                    <p class="comment_content">${mes.mesText}</p>
                    <div class="social_zone">
                        <div class="likeAndComment">
                            <i class="fas fa-heart"></i>
                            <p class="like_count" id="messageNo${mes.messageNo}">${mes.mesLikeCount}</p>
                        </div>
                        <div class="favoriteAndReport">
                            <div class="postfunc like">
                                <i class="socialBtns likeBtns"></i>
                                <span class="tooltiptext">愛心</span>
                            </div>
                            <div class="postfunc report">
                                <i class="socialBtns reportBtns"></i>
                                <span class="tooltiptext">檢舉</span>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                document.getElementsByClassName('comment_count')[0].innerText = mes.artMesCount;
            });
            let comments = document.getElementById('comments');
            comments.innerHTML = mesStr;
        }else{
            alert(xhr.status);
        };
        doFirst();
    };
    xhr.open("GET", `./php/getMessages.php?articleNo=${articleNo}`, true);
    xhr.send();

    // check member liked messages status
    let xhr1 = new XMLHttpRequest();
    xhr1.onload = function(){
        if(xhr1.status == 200){
            // console.log(xhr1.responseText.indexOf('no data'));
            if(xhr1.responseText.indexOf('no data') == -1){
                let mesLikeArr = JSON.parse(xhr1.responseText);
                let meslikeId = [];
                // console.log(mesLikeArr);
                for(let i=0; i<mesLikeArr.length; i++){
                    for(let j=0; j<mesArr.length; j++){
                        if(mesLikeArr[i].messageNo == mesArr[j].messageNo){
                            meslikeId.push(mesLikeArr[i].messageNo);
                        };
                    };
                };
                // console.log(meslikeId);
                for(let k=0; k<meslikeId.length; k++){
                    let likeBtns = document.getElementById(`messageNo${meslikeId[k]}`);
                    likeBtns.parentNode.parentNode.getElementsByClassName('likeBtns')[0].classList.add('checked');
                };
            };
        }else{
            alert(xhr1.status);
        };
    };
    xhr1.open("GET", "./php/checkMessagesLike.php", true);
    xhr1.send();

    // check member reported messages status
    let xhr2 = new XMLHttpRequest();
    xhr2.onload = function(){
        if(xhr2.status == 200){
            // console.log(xhr2.responseText.indexOf('no data'));
            if(xhr2.responseText.indexOf('no data') == -1){
                let mesRepoArr = JSON.parse(xhr2.responseText);
                let mesReppoId = [];
                // console.log(mesRepoArr);
                for(let l=0; l<mesRepoArr.length; l++){
                    for(let m=0; m<mesArr.length; m++){
                        if(mesRepoArr[l].messageNo == mesArr[m].messageNo){
                            mesReppoId.push(mesRepoArr[l].messageNo);
                        };
                    };
                };
                // console.log(mesReppoId);
                for(let n=0; n<mesReppoId.length; n++){
                    let repoBtns = document.getElementById(`messageNo${mesReppoId[n]}`);
                    repoBtns.parentNode.parentNode.getElementsByClassName('reportBtns')[0].classList.add('checked');
                };
            };
        }else{
            alert(xhr2.status);
        };
    };
    xhr2.open("GET", "./php/checkMessagesRepo.php", true);
    xhr2.send();

};

//  ajax add comment
function sendMessage(e) {
    e.preventDefault();
    if (document.getElementById('spanLogin').innerHTML === "登入" || document.getElementById("mobilespanLogin").innerHTML === "登入"){
        e?e.preventDefault():event.returnValue=false;
        alertBox.classList.remove('hidden');
        alertBox.style.backgroundColor = "firebrick";
        alertBox.style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        alertMessage.innerText = '請先登入會員！';
        
        close_alert_btn.addEventListener('click', function(){
            alertBox.classList.add('hidden');
        });
          
        setTimeout(function(){
            alertBox.classList.add('hidden');
        }, 2000);
        return;
    }else{
        mesText = document.getElementById('comment_textarea').value;
        if(mesText === ''){
            alertBox.classList.remove('hidden');
            alertBox.style.backgroundColor = "firebrick";
            alertBox.style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
            alertMessage.innerText = '請輸入留言！';

            close_alert_btn.addEventListener('click', function(){
                alertBox.classList.add('hidden');
            });

            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
        }else{
            let articleNo = document.getElementById('articleNo').value;
            let memNo = document.getElementById('memNo').value;
            let artMesCount = document.getElementsByClassName('comment_count')[0].innerText;
            let data_info = `articleNo=${articleNo}&memNo=${memNo}&mesText=${mesText}&artMesCount=${artMesCount}`;
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    // mesText = '';
                    document.getElementById('comment_textarea').value = '';
                    loadMessages();
                }else{
                    alert(xhr.status);
                };
            };
            xhr.open("POST", "./php/addMessage.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.send(data_info);
        };
    };
};

function doFirst(){
    var socialBtns = document.getElementsByClassName('socialBtns');
    for(let i=0; i<socialBtns.length; i++){
        socialBtns[i].addEventListener('click', socialBtnCheck);
    };
    
    var comment_submit_btn = document.getElementById("comment_submit_btn");
    comment_submit_btn.addEventListener('click', sendMessage);
};

//  social btns toggle checked & call
function socialBtnCheck(e){
    var alertBox = document.getElementById('alertBox');
    var alertMessage = document.getElementById('alertMessage');
    var close_alert_btn = document.getElementById('close_alert_btn');

    if (document.getElementById('spanLogin').innerHTML == "登入" || document.getElementById("mobilespanLogin").innerHTML == "登入"){
        e?e.preventDefault():event.returnValue=false;
        alertBox.classList.remove('hidden');
        alertBox.style.backgroundColor = "firebrick";
        alertBox.style.boxShadow = "2px 2px 5px rgba(178, 34, 34, 0.75)";
        alertMessage.innerText = '請先登入會員！';
        
        close_alert_btn.addEventListener('click', function(){
            alertBox.classList.add('hidden');
        });
          
        setTimeout(function(){
            alertBox.classList.add('hidden');
        }, 2000);
        return;
    }else{
        this.classList.toggle('checked');
    
        if(this.classList.contains('likeBtns') && this.classList.contains('checked')){
            let postId = this.parentNode.parentNode.parentNode.getElementsByClassName('like_count')[0].id;
            let plusCount = parseInt(this.parentNode.parentNode.parentNode.getElementsByClassName('like_count')[0].innerText);
            plusCount++;
            // console.log(postId);
            likePost(postId, plusCount);

        }else if(this.classList.contains('likeBtns')){
            let postId = this.parentNode.parentNode.parentNode.getElementsByClassName('like_count')[0].id;
            let minusCount = parseInt(this.parentNode.parentNode.parentNode.getElementsByClassName('like_count')[0].innerText);
            minusCount--;
            // console.log(postId, minusCount);
            unLikePost(postId, minusCount);

        }else if(this.classList.contains('favoriteBtns') && this.classList.contains('checked')){
            collectArticle();

        }else if(this.classList.contains('favoriteBtns')){
            cancelCollectArticle();

        }else if(this.classList.contains('subscriptBtns') && this.classList.contains('checked')){
            subscribeAuthor();

        }else if(this.classList.contains('subscriptBtns')){
            unSubscribeAuthor();

        }else if(this.classList.contains('reportBtns') && this.classList.contains('checked')){
            let reportBox = document.getElementById('reportBox');
            reportBox.classList.remove('hidden');

            report_form = document.getElementById('report_form');
            let postId = this.parentNode.parentNode.parentNode.getElementsByClassName('like_count')[0].id;
            reportPostNoInput = document.createElement('input');
            reportPostNoInput.name = postId.slice(0, 9);
            reportPostNoInput.type = 'hidden';
            reportPostNoInput.value = postId.substr(9);
            report_form.insertBefore(reportPostNoInput, report_form.firstChild);
            
            document.getElementById('submit_report_btn').addEventListener('click', reportPost);
            
            document.getElementById('cancel_report_btn').addEventListener('click', function(){
                reportBox.classList.add('hidden');
                report_form.removeChild(report_form.firstChild);
                e.target.classList.remove('checked');
            });

        }else if(this.classList.contains('reportBtns')){
            this.classList.add('checked');
            alertBox.classList.remove('hidden');
            alertBox.style.backgroundColor = "dimgrey";
            alertBox.style.boxShadow = "2px 2px 5px rgba(105, 105, 105, 0.75)";
            alertMessage.innerText = '待管理員審查！';
        };

        close_alert_btn.addEventListener('click', function(){
            alertBox.classList.add('hidden');
        });

        setTimeout(function(){
            alertBox.classList.add('hidden');
        }, 2000);
    };
};

function likePost(postId, postLikeCount){
    if(postId.indexOf('articleNo') != -1){
        let articleNo = document.getElementById('articleNo').value;
        let memNo = document.getElementById('memNo').value;
        let data_info = `articleNo=${articleNo}&artLikeCount=${postLikeCount}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                let article = JSON.parse(xhr.responseText);
                document.getElementById(postId).innerText = article.artLikeCount;
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "crimson";
                alertBox.style.boxShadow = "2px 2px 5px rgba(220, 20, 60, 0.75)";
                alertMessage.innerText = '表達愛心成功！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
    
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/likeArticle.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    }else {
        let messageNo = postId.substr(9);
        let memNo = document.getElementById('memNo').value;
        let data_info = `messageNo=${messageNo}&mesLikeCount=${postLikeCount}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                let message = JSON.parse(xhr.responseText);
                document.getElementById(postId).innerText = message.mesLikeCount;
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "crimson";
                alertBox.style.boxShadow = "2px 2px 5px rgba(220, 20, 60, 0.75)";
                alertMessage.innerText = '表達愛心成功！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
    
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/likeMessage.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    };
    close_alert_btn.addEventListener('click', function(){
        alertBox.classList.add('hidden');
    });

    setTimeout(function(){
        alertBox.classList.add('hidden');
    }, 2000);
};

function unLikePost(postId, postLikeCount){
    if(postId.indexOf('articleNo') != -1){
        let articleNo = document.getElementById('articleNo').value;
        let memNo = document.getElementById('memNo').value;
        let data_info = `articleNo=${articleNo}&artLikeCount=${postLikeCount}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                let article = JSON.parse(xhr.responseText);
                document.getElementById(postId).innerText = article.artLikeCount;
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "crimson";
                alertBox.style.boxShadow = "2px 2px 5px rgba(220, 20, 60, 0.75)";
                alertMessage.innerText = '已取消表達愛心！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
    
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/unLikeArticle.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    }else {
        let messageNo = postId.substr(9);
        let memNo = document.getElementById('memNo').value;
        let data_info = `messageNo=${messageNo}&mesLikeCount=${postLikeCount}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                let message = JSON.parse(xhr.responseText);
                document.getElementById(postId).innerText = message.mesLikeCount;
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "crimson";
                alertBox.style.boxShadow = "2px 2px 5px rgba(220, 20, 60, 0.75)";
                alertMessage.innerText = '已取消表達愛心！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
    
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/unLikeMessage.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    };
    close_alert_btn.addEventListener('click', function(){
        alertBox.classList.add('hidden');
    });

    setTimeout(function(){
        alertBox.classList.add('hidden');
    }, 2000);
};

function reportPost(e){
    e.preventDefault();
    let reportReasons = document.getElementsByName("reportReason");
    if(reportReasons[0].checked == false && reportReasons[1].checked == false && reportReasons[2].checked == false && reportReasons[3].checked == false){
        alertBox.classList.remove('hidden');
        alertBox.style.backgroundColor = "dimgrey";
        alertBox.style.boxShadow = "2px 2px 5px rgba(105, 105, 105, 0.75)";
        alertMessage.innerText = '請選擇檢舉原因！';

        close_alert_btn.addEventListener('click', function(){
            alertBox.classList.add('hidden');
        });

        setTimeout(function(){
            alertBox.classList.add('hidden');
        }, 2000);
    };
    let reportReason = document.querySelector('input[name="reportReason"]:checked').value;
    
    if(reportPostNoInput.name === "articleNo"){
        let articleNo = document.getElementById('articleNo').value;
        let memNo = document.getElementById('memNo').value;
        let data_info = `articleNo=${articleNo}&memNo=${memNo}&reportReason=${reportReason}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                document.getElementById('reportBox').classList.add('hidden');
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "dimgrey";
                alertBox.style.boxShadow = "2px 2px 5px rgba(105, 105, 105, 0.75)";
                alertMessage.innerText = '已檢舉，待審查！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
    
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);

                for(let i=0; i<reportReasons.length; i++){
                    reportReasons[i].checked = false;
                };

            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/reportArticle.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    }else if(reportPostNoInput.name === "messageNo"){
        let messageNo = reportPostNoInput.value;
        let memNo = document.getElementById('memNo').value;
        let data_info = `messageNo=${messageNo}&memNo=${memNo}&reportReason=${reportReason}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                document.getElementById('reportBox').classList.add('hidden');
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "dimgrey";
                alertBox.style.boxShadow = "2px 2px 5px rgba(105, 105, 105, 0.75)";
                alertMessage.innerText = '已檢舉，待審查！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
    
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);

                for(let i=0; i<reportReasons.length; i++){
                    reportReasons[i].checked = false;
                };
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/reportMessage.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    };
    close_alert_btn.addEventListener('click', function(){
        alertBox.classList.add('hidden');
    });

    setTimeout(function(){
        alertBox.classList.add('hidden');
    }, 2000);
};

function collectArticle(){
    let articleNo = document.getElementById('articleNo').value;
    let memNo = document.getElementById('memNo').value;
    let data_info = `articleNo=${articleNo}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "royalblue";
                alertBox.style.boxShadow = "2px 2px 5px rgba(65, 105, 225, 0.75)";
                alertMessage.innerText = '收藏話題成功！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
        
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/collectArticle.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
};

function cancelCollectArticle(){
    let articleNo = document.getElementById('articleNo').value;
    let memNo = document.getElementById('memNo').value;
    let data_info = `articleNo=${articleNo}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "royalblue";
                alertBox.style.boxShadow = "2px 2px 5px rgba(65, 105, 225, 0.75)";
                alertMessage.innerText = '已取消收藏話題！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
        
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/cancelCollectArticle.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
}

function subscribeAuthor(){
    let authorNo = document.getElementById('authorNo').value;
    let memNo = document.getElementById('memNo').value;
    // console.log(authorNo, memNo);

    let data_info = `authorNo=${authorNo}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "darkorange";
                alertBox.style.boxShadow = "2px 2px 5px rgba(255, 140, 0, 0.75)";
                alertMessage.innerText = '訂閱作者成功！';
                
                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
        
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/subscribeAuthor.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
}

function unSubscribeAuthor(){
    let authorNo = document.getElementById('authorNo').value;
    let memNo = document.getElementById('memNo').value;
    // console.log(authorNo, memNo);
    let data_info = `authorNo=${authorNo}&memNo=${memNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                alertBox.classList.remove('hidden');
                alertBox.style.backgroundColor = "darkorange";
                alertBox.style.boxShadow = "2px 2px 5px rgba(255, 140, 0, 0.75)";
                alertMessage.innerText = '已取消訂閱作者！';

                close_alert_btn.addEventListener('click', function(){
                    alertBox.classList.add('hidden');
                });
        
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
            }else{
                alert(xhr.status);
            };
        };
        xhr.open("POST", "./php/unSubscribeAuthor.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
}

window.addEventListener('load', doFirst);