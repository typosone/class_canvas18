const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
const FPS = 1000 / 60;

const drawFunctions = [];

function draw() {
    // canvasの消去
    ctx.clearRect(0, 0, 800, 600);

    drawFunctions.forEach(func => func())
}

window.setInterval(draw, FPS);

document.getElementById("start").addEventListener("click",
    event => {
        drawFunctions.push(
            function () {
                // 緑
                let x1 = 200;
                let y1 = 100;
                let vx1 = 7.52;
                let vy1 = 2.74;

                // 赤
                let x2 = 200;
                let y2 = 100;
                let vx2 = 7.52;
                let vy2 = 2.74;

                const angle360 = Math.PI * 2;
                const decay = 0.8;

                return () => {
                    // 減衰しないボール(緑)
                    ctx.save();

                    ctx.beginPath();
                    ctx.arc(x1, y1, 5, 0, angle360);

                    ctx.fillStyle = 'green';
                    ctx.fill();

                    ctx.restore();

                    // 減衰するボール(赤)
                    ctx.save();

                    ctx.beginPath();
                    ctx.arc(x2, y2, 5, 0, angle360);

                    ctx.fillStyle = 'red';
                    ctx.fill();

                    ctx.restore();


                    // 次のために座標計算
                    x1 += vx1;
                    y1 += vy1;

                    x2 += vx2;
                    y2 += vy2;


                    // 下の壁の跳ね返りチェック
                    if (y1 + 5 > 600) {
                        y1 -= (y1 + 5) - 600;
                        vy1 = -vy1;
                    }
                    // 右の壁の跳ね返りチェック
                    if (x1 + 5 > 800) {
                        x1 -= (x1 + 5) - 800;
                        vx1 = -vx1;
                    }
                    // 上の壁の跳ね返りチェック
                    if (y1 - 5 < 0) {
                        y1 -= y1 - 5;
                        vy1 = -vy1;
                    }
                    // 左の壁の跳ね返りチェック
                    if (x1 - 5 < 0) {
                        x1 -= x1 - 5;
                        vx1 = -vx1;
                    }

                    // 下の壁の跳ね返りチェック(赤)
                    if (y2 + 5 > 600) {
                        y2 -= (y2 + 5) - 600;
                        vy2 = -(vy2 * decay);
                    }
                    // 右の壁の跳ね返りチェック(赤)
                    if (x2 + 5 > 800) {
                        x2 -= (x2 + 5) - 800;
                        vx2 = -(vx2 * decay);
                    }
                    // 上の壁の跳ね返りチェック(赤)
                    if (y2 - 5 < 0) {
                        y2 -= y2 - 5;
                        vy2 = -(vy2 * decay);
                    }
                    // 左の壁の跳ね返りチェック(赤)
                    if (x2 - 5 < 0) {
                        x2 -= x2 - 5;
                        vx2 = -(vx2 * decay);
                    }
                }
            }()
        );
    }
);

document.getElementById("stop").addEventListener("click",
    event => {
        drawFunctions.shift();
    }
);