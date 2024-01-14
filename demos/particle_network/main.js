const defaultParameters = {
    scene: {
        cvs: null,
        ctx: null,
        particle: {
            array: null,
            color: 'rgba(0, 181, 255)',
            count: 40,
            radius: {
                default: 2,
                variant: 2
            },
            speed: {
                default: 1,
                variant: 1
            }
        },
        line: {
            color: 'rgba(0, 181, 255)',
            radius: 300
        }
    }
}

class Particle {
    constructor(scene) {
        this.x = Math.random() * scene.cvs.width;
        this.y = Math.random() * scene.cvs.height;
        this.color = scene.particle.color;
        this.radius = scene.particle.radius.default + Math.random() * scene.particle.radius.variant;
        this.speed = scene.particle.speed.default + Math.random() * scene.particle.speed.variant;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.vector = {
            x: Math.cos(this.directionAngle) * this.speed,
            y: Math.sin(this.directionAngle) * this.speed
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    checkBorder(cvs) {
        if (this.x >= cvs.width || this.x <= 0) {
            this.vector.x *= -1;
            if (this.x > cvs.width) this.x = cvs.width;
            if (this.x < 0) this.x = 0;
        }
        if (this.y >= cvs.height || this.y <= 0) {
            this.vector.y *= -1;
            if (this.y > cvs.height) this.y = cvs.height;
            if (this.y < 0) this.y = 0;
        }
    }

    update(cvs) {
        this.checkBorder(cvs);
        this.x += this.vector.x;
        this.y += this.vector.y;
    }
}

function linkPoints(point, hubs, scene) {
    for (let i = 0; i < hubs.length; i++) {
        const distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
        const opacity = 1 - distance / scene.line.radius;
        if (opacity > 0) {
            scene.ctx.lineWidth = 0.5;
            scene.ctx.strokeStyle = scene.line.color.slice(0, -1) + ', ' + opacity + ')';
            scene.ctx.beginPath();
            scene.ctx.moveTo(point.x, point.y);
            scene.ctx.lineTo(hubs[i].x, hubs[i].y);
            scene.ctx.closePath();
            scene.ctx.stroke();
        }
    }
}

function animationLoop(scene) {
    const arr = scene.particle.array;
    scene.ctx.clearRect(0, 0, scene.cvs.width, scene.cvs.height);
    for (let i = 0; i < arr.length; i++) {
        let p = arr[i];
        p.update(scene.cvs);
        p.draw(scene.ctx);
        linkPoints(p, arr, scene);
    }
    requestAnimationFrame(_ => animationLoop(scene));
}

function resize(scene) {
    scene.cvs.width = window.innerWidth;
    scene.cvs.height = window.innerHeight;
}

function start() {
    let scene = { ...defaultParameters.scene };

    document.querySelector('body').style.backgroundColor = 'black';

    canvasHelper.create.canvas();
    canvasHelper.setContext();
    canvasHelper.insertBeforeFirst.canvas();

    scene.cvs = canvasHelper.canvas();
    scene.ctx = canvasHelper.context();

    resize(scene);

    scene.particle.array = [];
    for (let i = 0; i < scene.particle.count; i++) {
        scene.particle.array.push(new Particle(scene));
    }

    animationLoop(scene);

    window.addEventListener("resize", _ => resize(scene));
}

initialization(start);