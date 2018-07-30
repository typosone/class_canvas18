const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
const FPS = 1000 / 60;
const ANGLE360 = Math.PI * 2;

class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.save();

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        ctx.restore();
    }
}

class Ball {
    constructor(x, y, speed, angle, color) {
        this.x = x;
        this.y = y;
        const rad = Math.PI * angle / 180;
        this.vx = Math.cos(rad) * speed;
        this.vy = Math.sin(rad) * speed;
        this.color = color;
        this.collisionPoint = [
            [5, 0],  // 0
            [Math.cos(Math.PI / 6) * 5, Math.sin(Math.PI / 6) * 5],  // 30
            [Math.cos(Math.PI / 3) * 5, Math.sin(Math.PI / 3) * 5],  // 60
            [0, 5],  // 90
            [Math.cos(Math.PI * 2 / 3) * 5, Math.sin(Math.PI * 2 / 3) * 5],  // 120
            [Math.cos(Math.PI * 5 / 6) * 5, Math.sin(Math.PI * 5 / 6) * 5],  // 150
            [-5, 0],  // 180
            [Math.cos(Math.PI * 7 / 6) * 5, Math.sin(Math.PI * 7 / 6) * 5],  // 210
            [Math.cos(Math.PI * 4 / 3) * 5, Math.sin(Math.PI * 4 / 3) * 5],  // 240
            [0, -5],  // 270
            [Math.cos(Math.PI * 5 / 3) * 5, Math.sin(Math.PI * 5 / 3) * 5],  // 300
            [Math.cos(Math.PI * 11 / 6) * 5, Math.sin(Math.PI * 11 / 6) * 5]  // 330
        ]
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, ANGLE360);

        ctx.fillStyle = this.color;
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

    isCollide(ctx) {
        let flag = false;
        this.collisionPoint.forEach((point) => {
            if (!flag) {
                const cx = this.x + point[0];
                const cy = this.y + point[1];

                flag = ctx.isPointInPath(cx, cy);
            }
        });
        return flag;
    }
}

class Input {
    constructor() {
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;
        window.addEventListener('keydown', (event) => {
            this.keyDown(event)
        });
        window.addEventListener('keyup', (event) => {
            this.keyUp(event)
        });
    }

    keyDown(event) {
        if (event.key === "ArrowLeft") {
            this.left = true;
        }
        if (event.key === "ArrowRight") {
            this.right = true;
        }
        if (event.key === "ArrowUp") {
            this.up = true;
        }
        if (event.key === "ArrowDown") {
            this.down = true;
        }
    }

    keyUp(event) {
        if (event.key === "ArrowLeft") {
            this.left = false;
        }
        if (event.key === "ArrowRight") {
            this.right = false;
        }
        if (event.key === "ArrowUp") {
            this.up = false;
        }
        if (event.key === "ArrowDown") {
            this.down = false;
        }
    }
}


const sprites = [];
const input = new Input();

sprites.push(new Block(210, 210, 50, 20, "red"));
sprites.push(new Block(270, 210, 50, 20, "red"));
sprites.push(new Block(270, 240, 50, 20, "red"));
sprites.push(new Block(330, 240, 50, 20, "red"));

const ball = new Ball(400, 300, 0, 0, "blue");
sprites.push(ball);

function game_tick() {
    // input読み取り
    if (input.up) {
        ball.y += -1;
    }
    if (input.right) {
        ball.x += 1;
    }
    if (input.down) {
        ball.y += 1;
    }
    if (input.left) {
        ball.x += -1;
    }

    // canvasの消去
    let isCollide = false;
    ctx.clearRect(0, 0, 800, 600);

    sprites.forEach(sprite => {
        sprite.draw(ctx);
        if (sprite !== ball) {
            if (ball.isCollide(ctx)) {
                isCollide = true;
            }
        }
    });

    if (isCollide) {
        canvas.style.backgroundColor = "lightgray";
    } else {
        canvas.style.backgroundColor = "white";
    }
}

window.setInterval(game_tick, FPS);



