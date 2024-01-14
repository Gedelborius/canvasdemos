const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let w, h, particles = [];
let mouse = {
    x: undefined,
    y: undefined
}

function init() {
    resizeReset();
    animationLoop();
}

function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function animationLoop() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, w, h);

    drawParticles();

    let temp = [];
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].time <= particles[i].ttl) {
            temp.push(particles[i]);
        }
    }
    particles = temp;

    requestAnimationFrame(animationLoop);
}

function drawParticles() {
    // console.log('drawp')
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log('mousemove')
    particles.push(new Particle());
    // console.log(particles)

}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

class Particle {
    constructor() {
        this.x = mouse.x + getRandomInt(-20, 20);
        this.y = mouse.y + getRandomInt(-20, 20);
        this.size = 2;

        this.h = this.y / (h / 360);
        this.hue = getRandomInt(this.h - 20, this.h + 20);
        this.color = `hsla(${this.hue}, 100%, 50%, 1)`;

        this.speed = getRandomInt(10, 20) / 10;
        this.angle = getRandomInt(0, 360);

        this.time = 0;
        this.ttl = 120;
    }
    draw() {
        // console.log('draw')
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        if (this.time <= this.ttl) {
            let progress = 1 - (this.ttl - this.time) / this.ttl;
            let alpha = (progress > 0.7) ? 1 - progress : 1;

            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.angle += Math.random() * 0.8 - 0.4;
            this.color = `hsla(${this.hue}, 100%, 50%, ${alpha})`;
        }
        this.time++;
    }
}

if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);