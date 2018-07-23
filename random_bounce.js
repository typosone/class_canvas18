const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
const FPS = 1000 / 60;
const ANGLE360 = Math.PI * 2;

const balls = [];

function game_tick() {
    // canvasの消去
    ctx.clearRect(0, 0, 800, 600);

    balls.forEach(ball => ball.draw(ctx));
}
window.setInterval(game_tick, FPS);

class Ball {
    constructor(x, y, speed, angle) {
        this.x = x;
        this.y = y;
        const rad = Math.PI * angle / 180;
        this.vx = Math.cos(rad) * speed;
        this.vy = Math.sin(rad) * speed;
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, ANGLE360);

        ctx.fillStyle = 'green';
        ctx.fill();

        ctx.restore();

        // 次のために座標計算
        this.x += this.vx;
        this.y += this.vy;

        // 下の壁の跳ね返りチェック
        if (this.y + 5 > 600) {
            this.y -= (this.y + 5) - 600;
            this.vy = -this.vy;
        }
        // 右の壁の跳ね返りチェック
        if (this.x + 5 > 800) {
            this.x -= (this.x + 5) - 800;
            this.vx = -this.vx;
        }
        // 上の壁の跳ね返りチェック
        if (this.y - 5 < 0) {
            this.y -= this.y - 5;
            this.vy = -this.vy;
        }
        // 左の壁の跳ね返りチェック
        if (this.x - 5 < 0) {
            this.x -= this.x - 5;
            this.vx = -this.vx;
        }
    }
}

// 「跳ね返り開始」ボタン
document.getElementById("start").addEventListener("click",
    event => {
        const x = Math.floor(Math.random() * 780) + 10;
        const y = Math.floor(Math.random() * 580) + 10;
        const speed = Math.floor(Math.random() * 9) + 2;
        const angle = Math.random() * 360;
        const ball = new Ball(x, y, speed, angle);
        balls.push(ball);
    }
);

// 「消去」ボタン
document.getElementById("stop").addEventListener("click",
    event => {
        balls.shift();
    }
);