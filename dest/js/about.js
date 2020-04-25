window.addEventListener('load',function(){ // wait for document ready

    var controller = new ScrollMagic.Controller();

    var horizontalSlide = new TimelineMax()
        // animate panels
        .to("#js-slideContainer", 1, {
            x: "-20%"
        })
        .to("#js-slideContainer", 1, {
            x: "-40%"
        })
        .to("#js-slideContainer", 1, {
            x: "-60%"
        })
        .to("#js-slideContainer", 1, {
            x: "-80%"
        })


    // create scene to pin and link animation
    new ScrollMagic.Scene({
        triggerElement: "#js-wrapper",
        triggerHook: "onLeave",
        duration: "400%"
    })
        .setPin("#js-wrapper")
        .setTween(horizontalSlide)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);



});






//




//Tao 動畫

// TweenMax.to("img.Tao", 3, {y: -50},);

TweenMax.fromTo('img.Tao', 1,
    {
        y: 30
    }, {
    y: -30,
    // ease: Elastic.easeOut,
    repeat: -1,
    yoyo: true,
    // scale: 0.5, 


});

TweenMax.fromTo('.section_2', 5,
    {
        y: 30
    }, {
    y: -100,


});

//水果籃子
TweenMax.fromTo('.fruits', 5,
    {
        y: -200
    }, {
    y: 20,
    // ease: Elastic.easeOut,
    // repeat:-1,
    yoyo: true,
    scale: 1.2,


});


//蘋果樹
TweenMax.fromTo('.apple_1', 5,
    {
        x: 0,
        y: 0,
        alpha: 0.5,
    }, {
    x: 500,
    y: 280,
    alpha: 0.8,
    // ease: Elastic.easeOut,
    repeat: -1,
    // yoyo:true,



});