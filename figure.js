function deg2rad(degree) {
    return degree * Math.PI / 180;
}

// canvasを取得
const canvas = document.getElementById("display");

// contextを取得
const ctx = canvas.getContext("2d");


// 正方形1
ctx.beginPath();
ctx.moveTo(100, 20);
ctx.lineTo(220, 20);
ctx.lineTo(220, 100);
ctx.lineTo(140, 100);
ctx.lineTo(140, 20);
ctx.moveTo(220,100);
ctx.lineTo(220, 220);
ctx.lineTo(140, 220);
ctx.lineTo(140, 140);
ctx.lineTo(220, 140);
ctx.moveTo(140, 220);
ctx.lineTo(20, 220);
ctx.lineTo(20, 140);
ctx.lineTo(100, 140);
ctx.lineTo(100, 220);
ctx.moveTo(20, 140);
ctx.lineTo(20, 20);
ctx.lineTo(100, 20);
ctx.lineTo(100, 100);
ctx.lineTo(20, 100);

ctx.fillStyle = 'orange';
ctx.fill();
ctx.stroke();


// ドーナツ型
const oneRound = 2 * Math.PI;
ctx.beginPath();
ctx.arc(400, 120, 100, 0, oneRound, true);
ctx.arc(400, 120, 50, 0, oneRound);

ctx.fill();
ctx.stroke();


//
const arcRight = deg2rad(0);
const arcBottom = deg2rad(90);
const arcLeft = deg2rad(180);
const arcTop = deg2rad(270);

ctx.beginPath();
ctx.arc(120, 300, 100, arcLeft, arcRight, true);
ctx.arc(220, 400, 100, arcTop, arcBottom, true);
ctx.arc(120, 500, 100, arcRight, arcLeft, true);
ctx.arc(20, 400, 100, arcBottom, arcTop, true);
ctx.lineTo(220, 300);
ctx.moveTo(20, 500);
ctx.lineTo(220, 500);
ctx.moveTo(20, 500);
ctx.lineTo(20, 300);
ctx.moveTo(220, 500);
ctx.lineTo(220, 300);
ctx.closePath();

ctx.fill();
ctx.stroke();


// triangle
const root3 = Math.sqrt(3);
const triangleHeight = 100 * root3;
const triangleHeightHalf = triangleHeight / 2;

ctx.beginPath();
ctx.moveTo(300, 500);                       // A
ctx.lineTo(400, 500 - triangleHeight);      // B
ctx.lineTo(450, 500 - triangleHeightHalf);  // C
ctx.lineTo(350, 500 - triangleHeightHalf);  // D
ctx.lineTo(400, 500);                       // E
ctx.lineTo(500, 500);                       // F
ctx.lineTo(450, 500 - triangleHeightHalf);  // C
ctx.lineTo(400, 500);                       // E
ctx.closePath();

ctx.fill();
ctx.stroke();


// 画像を読み込んでおく
const img = new Image();
img.src = "neko.jpg";

// 画像の描画
function draw() {
    ctx.drawImage(img, 480, 400);
}
img.addEventListener('load', draw);
