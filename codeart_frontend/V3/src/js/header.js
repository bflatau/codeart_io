import  { LeonSans }  from './lib/leon';
import { TweenMax, fromTo, killTweensOf, to, set, delayedCall }  from './lib/tweenMax';

    

let leon, canvas, header, ctx;

const sw = window.innerWidth;
const sh = 100;
const pixelRatio = 2;




export function init() {
    canvas = document.createElement('canvas');
    canvas.className = 'header-canvas';
    header = document.getElementById('header-container');
    header.appendChild(canvas);
    ctx = canvas.getContext("2d");

    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = sw + 'px';
    canvas.style.height = sh + 'px';
    // ctx.scale(.5, 1);

    ctx.scale(pixelRatio, pixelRatio);



    // leon = new LeonSans({
    //     text: 'The quick brown\nfox jumps over\nthe lazy dog',
    //     color: ['#ffffff'],
    //     size: getSize(120),
    //     weight: 1,
    //     isWave: true,
    //     pathGap: 0.3,
    //     amplitude: 0.5,
    //     fps: 30
    // });

    leon = new LeonSans({
        text: 'Code Art: I/0',
        color: ['#FFFFFF'],
        // colorful: ['#c5d73f', '#9d529c', '#49a9db', '#fec330', '#5eb96e', '#fc5356', '#f38f31'],
        size: 75,
        weight: 300,
        tracking: 2,

        // weight: 200,
        // isWave: true,
        // pathGap: 1,
        // amplitude: 0.25,
        // fps: 30
    });


    let i, total = leon.drawing.length;
    for (i = 0; i < total; i++) {
        TweenMax.fromTo(leon.drawing[i], 1.6, {
            value: 0
        }, {
            delay: i * 0.05,
            value: 1,
            ease: Power4.easeOut
        });
    }


    requestAnimationFrame(animate);
}

export function animate(t) {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, sw, sh);

    const x = 60;
    const y = 20;
    // const x = (sw - leon.rect.w) / 2;
    // const y = (sh - leon.rect.h) / 2;
   
    leon.position(x, y);  
    // leon.position(50, 50);

    leon.draw(ctx);
    // leon.wave(ctx, t);
}




 window.onload = () => {
    init();
};




