$(document).ready(function () {

    //先寫有幾個點
    imgCount = $('#content li').length;
    for (let i = 0; i < imgCount; i++) {
        $('#contentButton').append('<li></li>');
    }
    $('#contentButton li:nth-child(1)').addClass('clickMe');

    //先把content抓寬度的過程寫成函式
    function contentWidth() {
        divWidth = $(window).width() * 1.0;
        $('#slideBoard').width(divWidth);
        $('#content').width(divWidth * imgCount);
        $('#content li').width(divWidth);
    }
    contentWidth();
    //resize
    $(window).resize(function () {
        contentWidth();
    });


    //讓點點動
    index = 0;
    $('#contentButton li').click(function () {
        // alert($(this).index());
        index = $(this).index();
        $('#content').animate({
            // left: divWidth * index * -1,
            right:divWidth * index * 1,
        });

        $(this).addClass('clickMe');
        $('#contentButton li').not(this).removeClass('clickMe');
    });

    //製作自動輪播
    function auto() {
        setInterval(function () {
            index++;
            if (index == imgCount) {
                index = 0;
            }
            $('#content').animate({
                left: divWidth * -index,
                //left是指相對整個content的left，不是指向左移動的整體距離
            });
            //點點也要動
            $(`#contentButton li:nth-child(${index + 1})`).addClass('clickMe');
            $('#contentButton li').not(`#contentButton li:nth-child(${index + 1})`).removeClass('clickMe');
        }, 3000);
    };
    auto();

});