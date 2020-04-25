

var scene = document.getElementById('scene')
var parallax = new Parallax(scene);



//首頁水果飄
$(document).ready(function () {

    $(window).scroll(function () {
        // if($(window).width()>'768px'){
        if ($(window).scrollTop()) {
            $('#scene').css({
                'transform': 'translateY(100%) scale(0)',
                'opacity': '0',
                'transition': '2s',
            });
            
        }
        else {
            
            $('#scene').css({
                'transform': 'translateY(0) scale(1)',
                'opacity': '1',
            });
         }

    });




});


//吉祥物路徑
// window.addEventListener("load", function () {


    var controller = new ScrollMagic.Controller();
    // -----------------happy-------------//
    
    
    var happy = new TimelineMax({
        yoyo: true,
    
    });
    
    happy.to('.happy', 1, {
        y: 130,
        x: -100,
        scale: 1.2,
    
    }).to('.happy', 1, {
        y: 300,
        x: -200,
        scale: 1,
        rotation: -60,
    }).to('.happy', 1, {
        y: 400,
        x: 0,
        scale: 1,
    }).to('.happy', 1, {
        y: 400,
        x: 100,
        scale: 1,
    }).to('.happy', 1, {
        y: 400,
        x: 200,
        scale: 1,
        rotate: 20,
    }).to('.happy', 1, {
        y: 450,
        x: 250,
        scale: 1,
        rotate: 20,
    })
        .to('.happy', 1, {
            y: 500,
            x: 500,
            scale: 1,
            rotate: 20,
        }).to('.happy', 1, {
            y: 530,
            x: 500,
            scale: 1,
            rotate: 20,
        }).to('.happy', 1, {
            y: 570,
            x: 500,
            scale: 1,
            rotate: 20,
        })
        .to('.happy', 1, {
            y: 600,
            x: 700,
            scale: 1.3,
        }).to('.happy', 1, {
            y: 700,
            x: 700,
            scale: 1.3,
    
        })
        .to('.happy', 1, {
            y: 750,
            x: 700,
            scale: 0.9,
        }).to('.happy', 1, {
            y: 800,
            x: 700,
            scale: 0.8,
            rotation: -20,
        })
        .to('.happy', 1, {
            y: 830,
            x: 730,
            scale: 0.8,
            rotation: -20,
        }).to('.happy', 1, {
            y: 880,
            x: 780,
            scale: 0.8,
            rotation: -20,
        }).to('.happy', 1, {
            y: 880,
            x: 800,
            scale: 0.8,
            rotation: -20,
        }).to('.happy', 1, {
            y: 880,
            x: 825,
            scale: 0.8,
            rotation: -20,
        })





        .to('.happy', 1, {
            y:800,
            x: 700,
            scale:1,
            rotation:-20,
           opacity:0.8, 
        }).to('.happy', 1, {
            y:820,
            x: 750,
            scale:0.8,
            rotation:-20,
           opacity:0.5, 
        }).to('.happy', 1, {
            y:850,
            x: 800,
            scale:0.8,
            rotation:-20,
           opacity:0, 
        }).to('.happy', 1, {
            y:800,
            x: 700,
            scale:1,
            rotation:-20,
           opacity:0.8,
        }).to('.happy', 1, {
            y:820,
            x: 750,
            scale:0.8,
            rotation:-20,
           opacity:1, 
    
        })   
        .to('.happy', 1, {
            y:1000,
            x: 800,
            scale:1,
            rotation:-20,
           opacity:0, 
        })







        .to('.happy', 1, {
            y: 900,
            x: 850,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1050,
            x: 850,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        })
        .to('.happy', 1, {
            y: 1150,
            x: 750,
            scale: 0.7,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1300,
            x: 600,
            scale: 0.6,
            rotation: -60,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1350,
            x: 700,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1350,
            x: 760,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1400,
            x: 820,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, { //qa
            y: 1550,
            x: 750,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, { //qa
            y: 1600,
            x: 750,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        })
        .to('.happy', 1, { //qa
            y: 1700,
            x: 760,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        })
    
        .to('.happy', 1, {
            y: 1820,
            x: 660,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1820,
            x: 500,
            scale: 0.6,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1850,
            x: 400,
            scale: 0.6,
            rotation: 0,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1850,
            x: 200,
            scale: 0.6,
            rotation: 0,
            opacity: 1,
        }).to('.happy', 1, {
            y: 1800,
            x: 0,
            scale: 0.6,
            rotation: 0,
            opacity: 1,
        }).to('.happy', 1, {
            y: 2200,
            x: -380,
            scale: 1.2,
            rotation: 0,
            opacity: 1,
        }).to('.happy', 1, {
            y: 2400,
            x: -400,
            scale: 0.8,
            rotation: 0,
            opacity: 1,
        }).to('.happy', 1, {
            y: 2400,
            x: 400,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 2500,
            x: 600,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 2600,
            x: 700,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 1, {
            y: 2600,
            x: 750,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        })
        .to('.happy', 3, {
            y: 2650,
            x: 850,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, { //rank
            y: 2700,
            x: 900,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 2800,
            x: 850,
            scale: 0.8,
            rotation: 0,
            opacity: 1,
        })
        .to('.happy', 3, {
            y: 3200,
            x: 820,
            scale: 1,
            rotation: 20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 3400,
            x: 750,
            scale: 1,
            rotation: 20,
            opacity: 1,
        })
        .to('.happy', 3, {
            y: 3600,
            x: 700,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 3800,
            x: 700,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        })
        .to('.happy', 3, {
            y: 4050,
            x: 700,
            scale: 1,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 4100,
            x: 800,
            scale: 1,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 4500,
            x: 860,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 4700,
            x: 770,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 4800,
            x: 770,
            scale: 0.8,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 4900,
            x: 750,
            scale: 1,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 5200,
            x: 600,
            scale: 1,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 5600,
            x: 600,
            scale: 1.3,
            rotation: -20,
            opacity: 1,
        }).to('.happy', 3, {
            y: 5600,
            x: 600,
            scale: 1.3,
            rotation: -20,
            opacity: 1,
        });
    
    
    var scene_01 = new ScrollMagic.Scene({
        triggerElement: '#keypoint',
        duration: 5780,
        //    reverse:true, 
        // offset:600,
        triggerHook: -5,
    
    })
        .setTween(happy)
        //  .addIndicators() 
        .addTo(controller)
    //  .setPin('html')
    
    // }



//停止吉祥物路徑
function stop_tweenmax() {
    if (screen.width > 1024) {
        // setTween(happy);
    } else {
        TweenMax.killTweensOf('.happy');

    }
}
window.addEventListener('load', stop_tweenmax);