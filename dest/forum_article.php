<?php 
$articleNo = $_REQUEST["articleNo"];
try {
    require_once("./php/connectSchoolServer.php");
    
    $sql1 = "select * from article join member on (article.memNo = member.memNo)
        where (article.articleNo = :articleNo)";
    $articles = $pdo->prepare($sql1);
    $articles -> bindValue(":articleNo", $articleNo);
    $articles -> execute();
    $artiRow = $articles->fetch(PDO::FETCH_ASSOC);

    session_start();
    if(isset($_SESSION["memNo"])){
        $memNo = $_SESSION["memNo"];

        $sql2 = "select * from article_likes 
             where (memNo = :memNo) and (articleNo = :articleNo)";
        $articleLikes = $pdo->prepare($sql2);
        $articleLikes -> bindValue(":memNo", $memNo);
        $articleLikes -> bindValue(":articleNo", $articleNo);
        $articleLikes -> execute();

        $sql3 = "select * from article_collect 
                where (memNo = :memNo) and (articleNo = :articleNo)";
        $articleCollect = $pdo->prepare($sql3);
        $articleCollect -> bindValue(":memNo", $memNo);
        $articleCollect -> bindValue(":articleNo", $articleNo);
        $articleCollect -> execute();

        $authorNo = $artiRow["memNo"];
        $sql4 = "select * from author_subscription 
                where (memNo = :memNo) and (authorNo = :authorNo)";
        $authorSub = $pdo->prepare($sql4);
        $authorSub -> bindValue(":memNo", $memNo);
        $authorSub -> bindValue(":authorNo", $authorNo);
        $authorSub -> execute();

        $sql5 = "select * from article_report 
                where (memNo = :memNo) and (articleNo = :articleNo)";
        $authorReport = $pdo->prepare($sql5);
        $authorReport -> bindValue(":memNo", $memNo);
        $authorReport -> bindValue(":articleNo", $articleNo);
        $authorReport -> execute();
    };

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
    <title>果甘話區話題 | 天然甘</title>
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="./images/shortIcon.png">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./css/page/forum/forum_article.css">
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

    <div class="wrapper_article">
        <div class="article_container">
            <div class="article_area">
                <a href="forum.php" id="back_btn"></a>
                <div class="post" id="post">
                    <input type="hidden" id="authorNo" value="<?=$artiRow["memNo"]?>">
                    <input type="hidden" id="articleNo" value="<?=$artiRow["articleNo"]?>">
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
                            <p class="like_count" id="articleNo<?=$artiRow["articleNo"]?>"><?=$artiRow["artLikeCount"]?></p>
                            <i class="fas fa-comment"></i>
                            <p class="comment_count"><?=$artiRow["artMesCount"]?></p>
                        </div>
                        <div class="favoriteAndReport">
                            <div class="postfunc like">
                            <?php 
                            if(isset($_SESSION["memNo"]) && ($articleLikes -> rowCount() != 0)){
                            ?>  <i class="socialBtns likeBtns checked"></i>
                            <?php 
                            }else{
                            ?>  <i class="socialBtns likeBtns"></i>
                            <?php 
                            }
                            ?>
                                <span class="tooltiptext">愛心</span>
                            </div>
                            <div class="postfunc favorite">
                            <?php 
                            if(isset($_SESSION["memNo"]) && ($articleCollect -> rowCount() != 0)){
                            ?>  <i class="socialBtns favoriteBtns checked"></i>
                            <?php 
                            }else{
                            ?>  <i class="socialBtns favoriteBtns"></i>
                            <?php 
                            }
                            ?>
                                <span class="tooltiptext">收藏</span>
                            </div>
                            <div class="postfunc subscript">
                            <?php 
                            if(isset($_SESSION["memNo"]) && ($authorSub -> rowCount() != 0)){
                            ?>  <i class="socialBtns subscriptBtns checked"></i>
                            <?php 
                            }else{
                            ?>  <i class="socialBtns subscriptBtns"></i>
                            <?php 
                            }
                            ?>
                                <span class="tooltiptext">訂閱</span>
                            </div>
                            <div class="postfunc report">
                            <?php 
                            if(isset($_SESSION["memNo"]) && ($authorReport -> rowCount() != 0)){
                            ?>  <i class="socialBtns reportBtns checked"></i>
                            <?php 
                            }else{
                            ?>  <i class="socialBtns reportBtns"></i>
                            <?php 
                            }
                            ?>
                                <span class="tooltiptext">檢舉</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comments_area">
                    <p>話題留言</p>
                    <div id="comments">  
                        
                    </div>
                    
                    <div class="comment_zone">
                        <!-- <p>我要留言</p> -->
                        <form method="post" class="comment_form">
                            <textarea name="mesText" id="comment_textarea" maxlength="350" placeholder="最多輸入300個字"></textarea>
                            <div class="comment_btns">
                                <button type="submit" class="comment_submit_btn" id="comment_submit_btn">發表留言</button>
                                <button type="reset" class="comment_reset_btn">清除重填</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- alert start -->
        <div id="alertBox" class="alertBox hidden">
            <span id="close_alert_btn">&times;</span>
            <span id="alertMessage"></span>
          </div>
        <!-- alert end -->

        <!-- report popbox start -->
        <div id="reportBox" class="reportBox hidden">
            <form id="report_form">
                <h5>檢舉原因</h5>
                <div class="options_set set_report_reasons"> 
                    <div class="option">
                        <input type="radio" id="abuse" name="reportReason" value="1">
                        <label for="abuse">中傷、歧視或謾罵他人</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="spamming" name="reportReason" value="2">
                        <label for="spamming">惡意洗版、重複張貼</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="intense" name="reportReason" value="3">
                        <label for="intense">含色情、血腥或暴力等內容</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="other" name="reportReason" value="4">
                        <label for="other">其他原因</label>
                    </div>
                    <div class="reportBox_btns">
                        <button type="submit" id="submit_report_btn">送出</button>
                        <span id="cancel_report_btn">取消</span>
                    </div>
                </div>
            </form>
        </div>
        <!-- popbox end -->
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
    <script src="./js/forum/forum_article.js"></script>
</body>
</html>