// canvasを取得
const canvas = document.getElementById("display");
// contextを取得
const c = canvas.getContext("2d");

const oneRound = 2 * Math.PI;

const r = 50;
const A = {
    x: r * Math.cos(-Math.PI / 2),
    y: r * Math.sin(-Math.PI / 2)
};
const B = {
    x: r * Math.cos((2 * Math.PI) / 5 - Math.PI / 2),
    y: r * Math.sin((2 * Math.PI) / 5 - Math.PI / 2)
};
const C = {
    x: r * Math.cos(((2 * Math.PI) * 2) / 5 - Math.PI / 2),
    y: r * Math.sin(((2 * Math.PI) * 2) / 5 - Math.PI / 2)
};
const D = {
    x: r * Math.cos(((2 * Math.PI) * 3) / 5 - Math.PI / 2),
    y: r * Math.sin(((2 * Math.PI) * 3) / 5 - Math.PI / 2)
};
const E = {
    x: r * Math.cos(((2 * Math.PI) * 4) / 5 - Math.PI / 2),
    y: r * Math.sin(((2 * Math.PI) * 4) / 5 - Math.PI / 2)
};


for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
        c.save();
        // const center = {x: 50 * (x + 1), y: 50 * (y + 1)};
        c.translate(((r + 5) * 2) * (x + 1), ((r + 5) * 2) * (y + 1));
        c.rotate((x + 1) * (y + 1) * Math.PI * 2 / 180);
        c.beginPath();
        // c.arc(50 * (x + 1), 50 * (y + 1), 20, 0, oneRound);
        c.moveTo(A.x, A.y);
        c.lineTo(C.x, C.y);
        c.lineTo(E.x, E.y);
        c.lineTo(B.x, B.y);
        c.lineTo(D.x, D.y);
        c.closePath();

        c.fillStyle = 'orange';
        c.fill();
        c.stroke();

        c.restore();
    }
}