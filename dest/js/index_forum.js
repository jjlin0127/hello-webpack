loadIndexArticle();

function loadIndexArticle(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var artiOriArr = JSON.parse(xhr.responseText);
            // deep copy
            artiArrCopy = JSON.parse(JSON.stringify(artiOriArr));
            // console.log(artiArrCopy);
            artiArrCopy.sort(function(a, b){
                return b.artLikeCount - a.artLikeCount;
            });
            readInIndexArticles(artiArrCopy);
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/getArticles.php", true);
    xhr.send();
};

function readInIndexArticles(artiArr){
    // artiArr = indexArtiArr.splice(0, 3);
    // console.log(artiArr);
    let artiStr = '';
    let topicTypeStr = '';
    for(let i=0; i<3; i++){
        switch(artiArr[i].topicType){
            case "1":
            topicTypeStr =`
            <div class="post_topic post_topic1">
                <img src="./images/forum/circled1.jpg">
                <span class="topic1">幫助消化</span>
                <span class="post_time">${artiArr[i].artTime}</span>
            </div>
            <div class="post_content">${artiArr[i].artText}</div>
            <div class="post_hashtag">`;
            break;
            case "2":
            topicTypeStr =`
            <div class="post_topic post_topic2">
                <img src="./images/forum/circled2.jpg">
                <span class="topic2">保護血管</span>
                <span class="post_time">${artiArr[i].artTime}</span>
            </div>
            <div class="post_content">${artiArr[i].artText}</div>
            <div class="post_hashtag">`;
            break;
            case "3":
            topicTypeStr =`
            <div class="post_topic post_topic3">
                <img src="./images/forum/circled3.jpg">
                <span class="topic3">活化大腦</span>
                <span class="post_time">${artiArr[i].artTime}</span>
            </div>
            <div class="post_content">${artiArr[i].artText}</div>
            <div class="post_hashtag">`;
            break;
            case "4":
            topicTypeStr =`
            <div class="post_topic post_topic4">
                <img src="./images/forum/circled4.jpg">
                <span class="topic4">其它</span>
                <span class="post_time">${artiArr[i].artTime}</span>
            </div>
            <div class="post_content">${artiArr[i].artText}</div>
            <div class="post_hashtag">`;
            break;
            default:
            topicTypeStr =`
            <div class="post_topic post_topic5">
                <img src="./images/forum/circled4.jpg">
                <span class="topic5">未選擇主題</span>
                <span class="post_time">${artiArr[i].artTime}</span>
            </div>
            <div class="post_content">${artiArr[i].artText}</div>
            <div class="post_hashtag">`;
        };
        let fruitsItemsStr = '';
        for(let j=0; j<artiArr[i].fruitsItems.length; j++){
            switch (artiArr[i].fruitsItems.charAt(j)){
                case "1":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind1">楊桃</span>`;
                break;
                case "2":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind1">鳳梨</span>`;
                break;
                case "3":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind1">火龍果</span>`;
                break;
                case "4":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind2">香蕉</span>`;
                break;
                case "5":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind2">草莓</span>`;
                break;
                case "6":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind2">芭樂</span>`;
                break;
                case "7":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind3">芒果</span>`;
                break;
                case "8":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind3">蘋果</span>`;
                break;
                case "9":
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind3">藍莓</span>`;
                break;
                default:
                    fruitsItemsStr += 
                    `<span class="fruit_kind fruit_kind4">未選擇果甘</span>`;
            };
        };
        artiStr +=
        `
        <div class="bbs_article bbs_article${i+1}">
            <img src="./images/index/index_jerry/ball${i+1}.svg">
            <div class="bbs_article_contain">
                <a href="forum_article.php?articleNo=${artiArr[i].articleNo}" class="post_link">
                    <div class="post">
                        <div class="author">
                            <div class="author_img">
                            <img src="./images/member/headShot/${artiArr[i].memImgUrl}" alt="隱藏的頭像">
                            </div>
                            <p class="author_name">${artiArr[i].memNickname}</p>
                        </div>
                        <p class="post_title">${artiArr[i].artTitle}</p>` +
                        topicTypeStr + 
                        fruitsItemsStr +
                        `</div>
                        <div class="social_zone">
                            <div class="likeAndComment">
                                <i class="fas fa-heart"></i>
                                <p class="like_count">${artiArr[i].artLikeCount}</p>
                                <i class="fas fa-comment"></i>
                                <p class="comment_count">${artiArr[i].artMesCount}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        `;
    };
    let bbsArticles = document.getElementById('bbsArticles');
    bbsArticles.innerHTML = artiStr;
};

function switchSortby(postSortValue){
    let artiSortArr = artiArrCopy;
    // console.log(postSortValue);
    if(postSortValue == "time"){
        artiSortArr.sort(function(a, b){
            return b.articleNo - a.articleNo;
        });
    }else if(postSortValue == "like"){
        artiSortArr.sort(function(a, b){
            return b.artLikeCount - a.artLikeCount;
        });
    }else{
        artiSortArr.sort(function(a, b){
            return b.artLikeCount - a.artLikeCount;
        });
    }
    // console.log(artiSortArr);
    readInIndexArticles(artiSortArr);
};

function doFirst(){	
    postSortGroup = document.forms['postSet']['postSortby[]'];
    for (let i=0; i<postSortGroup.length; i++){
        postSortGroup[i].addEventListener('click', function(){
            if(postSortGroup[i].checked){
                postSortValue = postSortGroup[i].value;
                switchSortby(postSortValue);
            };
        });
    };
};

window.addEventListener('load', doFirst);