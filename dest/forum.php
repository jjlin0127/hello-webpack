<?php 
try {
	require_once("./php/connectSchoolServer.php");
    $sql = "select * from article join member on (article.memNo = member.memNo)
            where (article.artStatus = 1)
            order by article.artLikeCount desc
            limit 6";
    $articles = $pdo->query($sql);

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>果甘話區 | 天然甘</title>
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="./images/shortIcon.png">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./css/page/forum/forum.css">
</head>
<body>
    <header>
        <nav class="header__container">
            <span class="logo">
                <a href="home.html"><img src="./images/Logo.svg"></a>
            </span>
            <div class="navList">
                <a class="navItem @@focus01" href="about.html">果甘物語 <i class="fas fa-seedling"></i></a>
                <a class="navItem @@focus02" href="prod_product.html">特色果甘 <i class="fas fa-apple-alt"></i></a>
                <a class="navItem @@focus03" href="box.html">客製禮盒 <i class="fas fa-gift"></i></a>
                <a class="navItem @@focus04" href="cusfruits.html">客製果甘 <i class="fas fa-lemon"></i></a>
                <!-- <a class="navItem @@focus05" href="#">折扣遊戲 <i class="fas fa-carrot"></i></a> -->
                <a class="navItem focus" href="forum.php">果甘話區 <i class="fas fa-leaf"></i></a>
            </div>
            <div class="navList_2">
                <input id="memNo" type="hidden" value="">
                <a id="shopCart" class="navItem_2" href="prod_shopping.html"><i class="fas fa-shopping-cart"></i></a>
                <a id="memNickname" href="member2.html">&nbsp;</a>
                <!-- 會員暱稱 -->
                <a id="spanLogin" class="navItem_2">登入</a>
            </div>
        </nav>
        <nav class="rwdHeader">
            <div class="rwdHeaderWrap">
                <a href="home.html">
                    <img id="topLogo2" src="./images/Logo.svg">
                </a>
                <button class="hamburger hamburger--elastic" id="hamburger" type="button">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </nav>

        <div id="rwdHamburgerMenu">
            <nav>
                <ul>
                    <a href="member2.html">
                        <li id="mobilememNickname">&nbsp;</li>
                    </a>
                    <a id="mobileloginLink">
                        <li id="mobilespanLogin">登入 <i class="fas fa-user-circle"></i></li>
                    </a>
                    <a id="shopCart" href="prod_shopping.html">
                        <li>購物車 <i class="fas fa-shopping-cart"></i></li>
                    </a>
                    <a href="about.html">
                        <li>果甘物語 <i class="fas fa-seedling"></i></li>
                    </a>
                    <a href="prod_product.html">
                        <li>特色果甘 <i class="fas fa-apple-alt"></i></li>
                    </a>
                    <a href="box.html">
                        <li>客製禮盒 <i class="fas fa-gift"></i></li>
                    </a>
                    <a href="cusfruits.html">
                        <li>客製果甘 <i class="fas fa-lemon"></i></li>
                    </a>
                    <!-- <a href="#">
                        <li>折扣遊戲 <i class="fas fa-carrot"></i></li>
                    </a> -->
                    <a href="forum.html">
                        <li>果甘話區 <i class="fas fa-leaf"></i></li>
                    </a>
                </ul>
            </nav>
        </div>
    </header>

    <div class="wrapper_forum">
        <img class="balloon1" src="./images/forum/ball.svg">
        <img class="balloon2" src="./images/forum/ball2.svg">

        <div class="hot_posts_area">            
            <h2 class="title_hot_posts">
                <img src="./images/forum/leaf.svg"  class="leafLeft">
                <img src="./images/forum/leaf.svg"  class="leafRight">
                熱門話題
            </h2>
            <div class="hot_posts">

                <div class="hot_post">
                    <div class="carousels">

                    <?php 
                        $artiRows = $articles->fetchAll(PDO::FETCH_ASSOC); 
                        foreach($artiRows as $i => $artiRow){
                    ?>

                        <a href="forum_article.php?articleNo=<?=$artiRow["articleNo"]?>" class="post_link" >
                            <div class="carousel item<?=$i+1?>">
                                <div class="author">
                                    <div class="author_img">
                                        <img src="./images/member/headShot/<?=$artiRow["memImgUrl"]?>" alt="隱藏的頭像">
                                    </div>
                                    <p class="author_name"><?=$artiRow["memNickname"]?></p>
                                </div>
                                <p class="post_title"><?=$artiRow["artTitle"]?></p>
                                
                                <?php
                                switch ($artiRow["topicType"]){
                                    case "1":
                                ?>
                                <div class="post_topic post_topic1">
                                    <img src="./images/forum/circled1.jpg">
                                    <span class="topic1">幫助消化</span>
                                <?php 
                                    break;
                                    case "2":
                                ?>
                                <div class="post_topic post_topic2">
                                    <img src="./images/forum/circled2.jpg">
                                    <span class="topic2">保護血管</span>
                                <?php 
                                    break;
                                    case "3":
                                ?>
                                <div class="post_topic post_topic3">
                                    <img src="./images/forum/circled3.jpg">
                                    <span class="topic3">活化大腦</span>
                                    <?php 
                                    break;
                                    case "4":
                                ?>
                                <div class="post_topic post_topic4">
                                    <img src="./images/forum/circled4.jpg">
                                    <span class="topic4">其它</span>
                                <?php
                                    break;
                                    default:
                                ?>
                                <div class="post_topic post_topic5">
                                    <img src="./images/forum/circled4.jpg">
                                    <span class="topic5">未選擇主題</span>
                                <?php  
                                };
                                ?> 
                                    <span class="post_time"><?=$artiRow["artTime"]?></span>
                                </div>
                                <div class="post_content"><?=$artiRow["artText"]?></div>
                                <div class="post_hashtag">

                                <?php
                                    $arrFruitsItems = str_split($artiRow["fruitsItems"]);
                                    for($i=0; $i<count($arrFruitsItems); $i++){
                                        switch ($arrFruitsItems[$i]){
                                            case "1":
                                        ?>
                                        <span class="fruit_kind fruit_kind1">楊桃</span>
                                        <?php 
                                            break;
                                            case "2":
                                        ?>
                                        <span class="fruit_kind fruit_kind1">鳳梨</span>
                                        <?php 
                                            break;
                                            case "3":
                                        ?>
                                        <span class="fruit_kind fruit_kind1">火龍果</span>
                                        <?php 
                                            break;
                                            case "4":
                                        ?>
                                        <span class="fruit_kind fruit_kind2">香蕉</span>
                                        <?php 
                                            break;
                                            case "5":
                                        ?>
                                        <span class="fruit_kind fruit_kind2">草莓</span>
                                        <?php 
                                            break;
                                            case "6":
                                        ?>
                                        <span class="fruit_kind fruit_kind2">芭樂</span>
                                        <?php 
                                            break;
                                            case "7":
                                        ?>
                                        <span class="fruit_kind fruit_kind3">芒果</span>
                                        <?php 
                                            break;
                                            case "8":
                                        ?>
                                        <span class="fruit_kind fruit_kind3">蘋果</span>
                                        <?php 
                                            break;
                                            case "9":
                                        ?>
                                        <span class="fruit_kind fruit_kind3">藍莓</span>
                                        <?php
                                            break;
                                            default:
                                        ?>
                                        <span class="fruit_kind fruit_kind4">未選擇果甘</span>
                                        <?php  
                                        };
                                    };
                                        ?>  

                                </div>
                                <div class="social_zone">
                                    <div class="likeAndComment">
                                        <i class="fas fa-heart"></i>
                                        <p class="like_count"><?=$artiRow["artLikeCount"]?></p>

                                        <i class="fas fa-comment"></i>
                                        <p class="comment_count"><?=$artiRow["artMesCount"]?></p>
                                    </div>
                                </div>
                            </div>
                        </a>

                    <?php }; ?>

                    </div>
                </div>
                <div class="arrow">
                    <i id="angle_left" class="fas fa-angle-left"></i>
                    <i id="angle_right" class="fas fa-angle-right"></i>
                </div>
            </div>
        </div>    

        <div class="all_posts_area">
            <h2 class="title_all_posts">
                <img src="./images/forum/leaf.svg"  class="leafLeft">
                <img src="./images/forum/leaf.svg"  class="leafRight">
                所有話題
            </h2>

            <button class="publish_btn" onclick="location.href='forum_post.html'">發表話題</button>
            <button class="mobile_publish_btn" onclick="location.href='forum_post.html'"></button>
            
            <div class="post_zone">
                <button id="panelBtn"></button>        
                <aside class="sortAndFilter">
                    <div class="forum_sort">
                        <button id="closeBtn"></button>
                        <form action="" class="sort_form">
                            <h5>話題排序</h5>
                            <div class="sort_select">
                                <select name="sort_by" id="sort_by" class="sort_by">
                                    <option>請選擇方式...</option>
                                    <option value="like">按讚數</option>
                                    <option value="message">留言數</option>
                                    <option value="time">發表時間</option>
                                </select>
                            </div>
                        </form>
                    </div>      
                    <div class="forum_filter">
                        <form class="filter_form" id="filter_form">
                            <h5>分類搜尋</h5>
                            <p>選擇話題種類</p>
                            <div class="options topic_options"> 
                                <div class="option">
                                    <input type="radio" id="digestion" name="topicType[]" value="1">
                                    <label for="digestion">幫助消化</label>
                                </div>
                                <div class="option">
                                    <input type="radio" id="cvd" name="topicType[]" value="2">
                                    <label for="cvd">保護血管</label>
                                </div>
                                <div class="option">
                                    <input type="radio" id="brain" name="topicType[]" value="3">
                                    <label for="brain">活化大腦</label>
                                </div>
                                <div class="option">
                                    <input type="radio" id="other" name="topicType[]" value="4">
                                    <label for="other">其它</label>
                                </div>
                            </div>

                            <p>選擇果甘種類</p>
                            <div class="options fruit_options">                             
                                <div class="option">
                                    <input type="checkbox" id="star" name="fruitsItems[]" value="1">
                                    <label for="star">楊桃</label>
                                </div>
                                <div class="option">
                                    <input type="checkbox" id="pineapple" name="fruitsItems[]" value="2">
                                    <label for="pineapple">鳳梨</label>
                                </div>                           
                                <div class="option">
                                    <input type="checkbox" id="dragon" name="fruitsItems[]" value="3">
                                    <label for="dragon">火龍果</label>
                                </div>
                                <div class="option">                                    
                                    <input type="checkbox" id="banana" name="fruitsItems[]" value="4">
                                    <label for="banana">香蕉</label>
                                </div>
                                <div class="option">                                   
                                    <input type="checkbox" id="strawberry" name="fruitsItems[]" value="5">
                                    <label for="strawberry">草莓</label>
                                </div>
                                <div class="option">
                                    <input type="checkbox" id="guava" name="fruitsItems[]" value="6">
                                    <label for="guava">芭樂</label>
                                </div>
                                <div class="option">                                   
                                    <input type="checkbox" id="mango" name="fruitsItems[]" value="7">
                                    <label for="mango">芒果</label>
                                </div>
                                <div class="option">
                                    <input type="checkbox" id="appale" name="fruitsItems[]" value="8">
                                    <label for="appale">蘋果</label>
                                </div>
                                <div class="option">
                                    <input type="checkbox" id="blueberry" name="fruitsItems[]" value="9">
                                    <label for="blueberry">藍莓</label>
                                </div>
                            </div>
                            <button type="reset" class="reset_btn" id="reset_btn">清除</button>
                            <button type="submit" class="search_btn" id="search_btn">搜尋</button>
                        </form>
                    </div>                  
                </aside>

                <section>
                    <div class="all_posts" id="allPosts">

                    </div>
                </section>
            </div> 
            
            <!-- <div class="pagination_block">
                <ul class="pagination">
                  <li><a href="#">&lt;</a></li>
                  <li><a href="#" class="-on">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&gt;</a></li>
                </ul>
            </div> -->

            <!-- alert start -->
            <div id="alertBox" class="alertBox hidden">
                <span id="close_alert_btn">&times;</span>
                <span id="alertMessage"></span>
            </div>
            <!-- alert end -->
        </div>
    </div>
    
    <footer>
        <div class="footer_content">
            <strong>Copyright &copy; 2020 Natural Sweet</srong>
                <i class="fas fa-leaf"></i>
        </div>
    </footer> 
    <script src="./js/jquery-3.4.1.js"></script>
    <script src="./js/jquery-ui.js"></script>
    <script src="./js/vendor/all.js"></script>
    <script src="./js/hamburger.js"></script>
    <script src="./js/login_common.js"></script>
    <script src="./js/forum/forum.js"></script>
</body>
</html>