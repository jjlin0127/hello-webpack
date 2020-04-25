function doFirst(){
    document.getElementById('angle_left').addEventListener('click', showPrev);
    document.getElementById('angle_right').addEventListener('click', showNext);
    document.getElementById('panelBtn').addEventListener('click', showPanel);
    
    sort_by = document.getElementById('sort_by');
    sort_by.addEventListener('change', sortArticles);
    topicTypeGroup = document.forms['filter_form']['topicType[]'];	
    fruitsItemsGroup = document.forms['filter_form']['fruitsItems[]'];
    for (let i=0; i<fruitsItemsGroup.length; i++){
        fruitsItemsGroup[i].addEventListener('click', checkBoxLimit);
    };
    document.getElementById('reset_btn').addEventListener('click', function(){
        document.getElementsByTagName('h2')[1].scrollIntoView({
            behavior: "smooth", 
            block: "start", 
            inline: "nearest"
        });
        loadArticles();
    });
    document.getElementById('search_btn').addEventListener('click', filterArticles);
};

currentDeg = 0;
function showNext(){
    currentDeg = currentDeg - 60;
    document.getElementsByClassName('carousels')[0].style.transform = 'translate(-50%,-50%) rotateY(' + currentDeg + 'deg)';
};

function showPrev(){
    currentDeg = currentDeg + 60;
    document.getElementsByClassName('carousels')[0].style.transform = 'translate(-50%,-50%) rotateY(' + currentDeg + 'deg)';
};

function showPanel(){
    document.getElementsByClassName('sortAndFilter')[0].classList.add("show");
    document.getElementById('closeBtn').addEventListener('click', function(){
        document.getElementsByClassName('sortAndFilter')[0].classList.remove("show");
    });
};

//  ajax load all articles
loadArticles();

function loadArticles(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var artiOriArr = JSON.parse(xhr.responseText);
            // deep copy
            artiArrCopy = JSON.parse(JSON.stringify(artiOriArr));
            // console.log(artiArrCopy);
            artiArrCopy.sort(function(a, b){
                return b.articleNo - a.articleNo;
            });
            readInArticles(artiArrCopy);
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/getArticles.php", true);
    xhr.send();
};

function readInArticles(artiArr){       
    let artiStr = '';
    let topicTypeStr = '';
    artiArr.forEach(function(arti){
        switch(arti.topicType){
            case "1":
            topicTypeStr =`
            <div class="post_topic post_topic1">
                <img src="./images/forum/circled1.jpg">
                <span class="topic1">幫助消化</span>
                <span class="post_time">${arti.artTime}</span>
            </div>
            <div class="post_content">${arti.artText}</div>
            <div class="post_hashtag">`;
            break;
            case "2":
            topicTypeStr =`
            <div class="post_topic post_topic2">
                <img src="./images/forum/circled2.jpg">
                <span class="topic2">保護血管</span>
                <span class="post_time">${arti.artTime}</span>
            </div>
            <div class="post_content">${arti.artText}</div>
            <div class="post_hashtag">`;
            break;
            case "3":
            topicTypeStr =`
            <div class="post_topic post_topic3">
                <img src="./images/forum/circled3.jpg">
                <span class="topic3">活化大腦</span>
                <span class="post_time">${arti.artTime}</span>
            </div>
            <div class="post_content">${arti.artText}</div>
            <div class="post_hashtag">`;
            break;
            case "4":
            topicTypeStr =`
            <div class="post_topic post_topic4">
                <img src="./images/forum/circled4.jpg">
                <span class="topic4">其它</span>
                <span class="post_time">${arti.artTime}</span>
            </div>
            <div class="post_content">${arti.artText}</div>
            <div class="post_hashtag">`;
            break;
            default:
            topicTypeStr =`
            <div class="post_topic post_topic5">
                <img src="./images/forum/circled4.jpg">
                <span class="topic5">未選擇主題</span>
                <span class="post_time">${arti.artTime}</span>
            </div>
            <div class="post_content">${arti.artText}</div>
            <div class="post_hashtag">`;
        };

        let fruitsItemsStr = '';
        for(let i=0; i<arti.fruitsItems.length; i++){
            switch (arti.fruitsItems.charAt(i)){
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
        <a href="forum_article.php?articleNo=${arti.articleNo}" class="post_link" >
            <div class="post">
                <div class="author">
                    <div class="author_img">
                        <img src="./images/member/headShot/${arti.memImgUrl}" alt="隱藏的頭像">
                    </div>
                    <p class="author_name">${arti.memNickname}</p>
                </div>
                <p class="post_title">${arti.artTitle}</p>` + 
                topicTypeStr + 
                fruitsItemsStr +
                `</div>
                <div class="social_zone">
                    <div class="likeAndComment">
                        <i class="fas fa-heart"></i>
                        <p class="like_count">${arti.artLikeCount}</p>
                        <i class="fas fa-comment"></i>
                        <p class="comment_count">${arti.artMesCount}</p>
                    </div>
                </div>
            </div>
        </a>
        `;
    });
    let allPosts = document.getElementById('allPosts');
    allPosts.innerHTML = artiStr;
    doFirst();
};

function checkBoxLimit(){
    let limit = 6;
    let checkedCount = 0;
      
    for(let j=0; j<fruitsItemsGroup.length; j++){
        checkedCount += (fruitsItemsGroup[j].checked) ? 1 : 0;
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

function filterArticles(e){
    e.preventDefault();
    sort_by.options.selectedIndex = 0;
    let topicTypeValue = 0;
    for(let i=0; i<topicTypeGroup.length; i++){
        if(topicTypeGroup[i].checked){
            topicTypeValue = topicTypeGroup[i].value;
        };
    };
    let topicTypeSql = '';
    if(topicTypeValue > 0){
        topicTypeSql = `and (article.topicType = ${topicTypeValue})`;
    }else{
        topicTypeSql = "";
    };
    
    // console.log(topicTypeSql);
    let fruitsItemsArr = [];		
    for (let j=0; j<fruitsItemsGroup.length; j++){
        if(fruitsItemsGroup[j].checked){
            fruitsItemsArr.push(fruitsItemsGroup[j].value);
        };
    };
    // console.log(fruitsItemsArr);
    // let fruitsItemsStr = fruitsItemsArr.sort().toString();
    let fruitsItemsSql = '';
    for(let k=0; k<fruitsItemsArr.length; k++){
        fruitsItemsSql += ` and (article.fruitsItems LIKE '%${fruitsItemsArr[k]}%')`;
    }
    // console.log(fruitsItemsSql);

    let filterSql = topicTypeSql + fruitsItemsSql;
    // console.log(filterSql);

    let xhr1 = new XMLHttpRequest();
    xhr1.onload = function(){
        if(xhr1.status == 200){
            if(xhr1.responseText.indexOf('no data') == -1){
                var artiFilOriArr = JSON.parse(xhr1.responseText);
                artiFilArrCopy = JSON.parse(JSON.stringify(artiFilOriArr));
                readInArticles(artiFilArrCopy);
            }else{
                document.getElementById('allPosts').innerHTML = '';
                let searchNoArticle = document.createElement('h5');
                searchNoArticle.style.padding = "10px";
                searchNoArticle.innerText = "抱歉，沒有搜尋到符合條件的話題。Sorry, we couldn't find any matches.";
                document.getElementById('allPosts').appendChild(searchNoArticle);
            };
        }else{
            alert(xhr1.status);
        };
    };
    xhr1.open("GET", `./php/filterArticles.php?filterSql=${filterSql}`, true);
    xhr1.send();

    document.getElementsByTagName('h2')[1].scrollIntoView({
        behavior: "smooth", 
        block: "start", 
        inline: "nearest"
    });
};

function sortArticles(){
    for(let i=0; i<topicTypeGroup.length; i++){
        topicTypeGroup[i].checked = false;
    };
    for(let j=0; j<fruitsItemsGroup.length; j++){
        fruitsItemsGroup[j].checked = false;
    };

    let result = artiArrCopy;
    if(sort_by.value === "like"){
        result.sort(function(a, b){
            return b.artLikeCount - a.artLikeCount;
        });
    }else if(sort_by.value === "message"){
        result.sort(function(a, b){
            return b.artMesCount - a.artMesCount;
        });
    }else if(sort_by.value === "time"){
        result.sort(function(a, b){
            return a.articleNo - b.articleNo;
        });
    }else{
        result.sort(function(a, b){
            return b.articleNo - a.articleNo;
        });
    }
    document.getElementsByTagName('h2')[1].scrollIntoView({
        behavior: "smooth", 
        block: "start", 
        inline: "nearest"
    });
    readInArticles(result);
};

window.addEventListener('load', doFirst);
