const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
const FPS = 1000 / 60;

let pos = {x: 10, y: 10};
let dx = 2;

let pos2 = {x: 10, y: 10};
let dx2 = 2;
let dy2 = 2;

let leftKey = false;
let rightKey = false;
let upKey = false;
let downKey = false;

function draw() {
    ctx.save();
    // 円1の座標を調整
    if (leftKey) {
        pos.x -= 2;
    }
    if (rightKey) {
        pos.x += 2;
    }
    if (upKey) {
        pos.y -= 2;
    }
    if (downKey) {
        pos.y += 2;
    }

    if (pos.x < 10) {
        pos.x = 10;
    } else if (pos.x > 790) {
        pos.x = 790;
    }
    if (pos.y < 10) {
        pos.y = 10;
    } else if (pos.y > 590) {
        pos.y = 590;
    }

    // 円2の座標を調整
    pos2.x += dx2;
    pos2.y += dy2;
    if (pos2.x < 10 || pos2.x > 790) {
        dx2 = -dx2;
    }
    if (pos2.y < 10 || pos2.y > 590) {
        dy2 = -dy2;
    }

    // canvasの消去
    ctx.clearRect(0, 0, 800, 600);

    // 円1を描画
    ctx.fillStyle = 'red';

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
    ctx.fill();

    // 円2を描画
    ctx.fillStyle = 'rgba(0, 0, 255, 0.8)';

    ctx.beginPath();
    ctx.arc(pos2.x, pos2.y, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

window.setInterval(draw, FPS);

function keyDownListener(event) {
    if (event.key === "ArrowLeft") {
        leftKey = true;
    }
    if (event.key === "ArrowRight") {
        rightKey = true;
    }
    if (event.key === "ArrowUp") {
        upKey = true;
    }
    if (event.key === "ArrowDown") {
        downKey = true;
    }
}

function keyUpListener(event) {
    if (event.key === "ArrowLeft") {
        leftKey = false;
    }
    if (event.key === "ArrowRight") {
        rightKey = false;
    }
    if (event.key === "ArrowUp") {
        upKey = false;
    }
    if (event.key === "ArrowDown") {
        downKey = false;
    }
}

window.addEventListener('keydown', keyDownListener);
window.addEventListener('keyup', keyUpListener);