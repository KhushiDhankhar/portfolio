const bear = document.getElementById("bear");

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let x = targetX;
let y = targetY;

document.addEventListener("mousemove", e => {

    targetX = e.clientX - 60;
    targetY = e.clientY + 30;

});

function update(){

    const dx = targetX - x;
    const dy = targetY - y;

    x += dx * 0.08;
    y += dy * 0.08;

    const facing =
    dx > 0 ? 1 : -1;

    bear.style.transform =
    `
    translate(${x}px,${y}px)
    scaleX(${facing})
    `;
    requestAnimationFrame(update);

}

update();