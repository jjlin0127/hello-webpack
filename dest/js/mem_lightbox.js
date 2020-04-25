function resizeTab(){
    $("#tab1.tab_content").css("height", $(document).height());
}

function resizeTabAgain(){
    $("#tab1.tab_content").css("height", 100 + "%" );
}

$(".icon-plus-sign").click(
    function() {   
        $(".pop").fadeIn('slow').height("100%");
        resizeTab();
    }
);

$(".pop i").click(
    function() {   
        $(".pop").fadeOut('fast');
        resizeTabAgain()
    }
);

var getIphoneWindowHeight = function() {
var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
return window.innerHeight * zoomLevel;
};

