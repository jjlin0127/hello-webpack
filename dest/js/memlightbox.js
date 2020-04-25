$(".icon-plus-sign").click(function () {
	$(".pop").fadeIn("slow");
});
  
$(".pop i").click(function () {
	$(".pop").fadeOut("fast");
});
  
    var getIphoneWindowHeight = function () {
	var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
	return window.innerHeight * zoomLevel;
  };