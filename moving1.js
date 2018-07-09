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

// 等速運動
document.getElementById("speed").addEventListener('click',
    event => {
        drawFunctions.push(
            function () {
                /*
                let x1 = 10;
                let y1 = 10;
                let x2 = 10;
                let y2 = 10;

                return () => {
                    //1個目の四角
                    ctx.save();

                    ctx.fillStyle = 'red';
                    ctx.fillRect(x1, y1, 10, 10);

                    ctx.restore();

                    if (x1 > 810 || y1 > 610) {
                        drawFunctions.shift();
                    }
                    //2個目の四角
                    ctx.save();

                    ctx.fillStyle = 'blue';
                    ctx.fillRect(x2, y2, 10, 10);

                    ctx.restore();

                    if (x2 > 810 || y2 > 610) {
                        drawFunctions.shift();
                    }
                    // 3個目の四角
                    ctx.save();
                    
                    ctx.fillStyle = 'green';
                    ctx.rotate(60 * Math.PI / 180);
                    
                    ctx.fillRect(x1, y1, 10, 10);
                    
                    ctx.restore();

                    x1 += 2;
                    // y1 += 5;
                    x2 += Math.cos(30 * Math.PI / 180) * 2;
                    y2 += Math.sin(30 * Math.PI / 180) * 2;
                }
                */
                let x1 = 0;
                let y1 = 0;
                const deg30 = 30 * Math.PI / 180;
                const deg60 = 60 * Math.PI / 180;

                return () => {
                    // セーブポイントA
                    ctx.save();

                    // 原点の移動
                    ctx.translate(10, 10);

                    // セーブポイントB
                    ctx.save();

                    //1個目の四角
                    ctx.fillStyle = 'red';
                    ctx.fillRect(x1, y1, 10, 10);

                    // セーブポイントBの状態に戻す(色情報が戻る)
                    ctx.restore();

                    // セーブポイントC
                    ctx.save();

                    //2個目の四角
                    // 30度回転させる
                    ctx.rotate(deg30);

                    ctx.fillStyle = 'blue';
                    ctx.fillRect(x1, y1, 10, 10);

                    // セーブポイントCの状態に戻す(色/回転)
                    ctx.restore();


                    // セーブポイントD
                    ctx.save();

                    // 3個目の四角
                    // 60度回転
                    ctx.rotate(deg60);

                    ctx.fillStyle = 'green';
                    ctx.fillRect(x1, y1, 10, 10);

                    // セーブポイントDの状態に戻す(色/回転)
                    ctx.restore();

                    // 次の描画のために移動の計算
                    x1 += 2;
                    // y1 += 5;

                    // セーブポイントAの状態に戻す(原点)
                    ctx.restore();

                    // 特定の条件で関数削除
                    if (x1 > 1000) {
                        drawFunctions.shift()
                    }
                }
            }());
    }
);

// 等加速度運動
document.getElementById("accel").addEventListener('click',
    event => {
        drawFunctions.push(
            function () {
                let x = 0;
                let y = 0;
                let v = 2;

                return () => {
                    // セーブポイントA
                    ctx.save();

                    // 原点の移動
                    ctx.translate(10, 40);

                    // 四角を描く
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(x, y, 10, 10);


                    // 次の描画に備えて座標計算
                    x += v;
                    v += 0.1;


                    // セーブポイントAの状態に戻す(原点)
                    ctx.restore();


                    // 不要になったら関数削除
                    if (x > 1000) {
                        drawFunctions.shift();
                    }
                }
            }()
        )
    }
);

// 落下運動
document.getElementById("fall").addEventListener('click',
    event => {
        drawFunctions.push(
            function () {
                let x = 0;
                let y = 0;
                let vy = -5; // 速度
                const g = 0.2; // 重力

                return () => {
                    // 初期状態セーブ
                    ctx.save();

                    // 原点移動
                    ctx.translate(300, 50);

                    ctx.fillStyle = 'gold';
                    ctx.fillRect(x, y, 30, 30);


                    // 次の描画のために計算
                    y += vy;
                    vy += g;
                    x += 1;

                    // もとに戻す
                    ctx.restore();

                    // 要らなくなったら削除
                    if (y > 1000) {
                        drawFunctions.shift();
                    }
                }
            }()
        );
    }
);