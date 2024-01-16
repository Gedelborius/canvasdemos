const defaultParameters = {
    scene: {
        cvs: null,
        ctx: null,
        color: {
            background: '#ffffff',
        },
        particle: {
            array: [],
            size: 2,
            timeToLive: 120
        },
        mouse: {
            x: null,
            y: null
        }
    }
}

class Particle {
    constructor(scene) {
        this.x = scene.mouse.x + getRandomInt(-20, 20);
        this.y = scene.mouse.y + getRandomInt(-20, 20);
        this.size = scene.particle.size;

        this.h = this.y / (scene.cvs.height / 360);
        this.hue = getRandomInt(this.h - 20, this.h + 20);
        this.color = `hsla(${this.hue}, 100%, 50%, 1)`;

        this.speed = getRandomInt(10, 20) / 10;
        this.angle = getRandomInt(0, 360);

        this.time = 0;
        this.ttl = scene.particle.timeToLive;
    }
    draw(scene) {
        scene.ctx.beginPath();
        scene.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        scene.ctx.fillStyle = this.color;
        scene.ctx.fill();
        scene.ctx.closePath();
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

function animationLoop(scene) {
    scene.ctx.fillStyle = scene.color.background;
    scene.ctx.globalAlpha = 0.1;
    scene.ctx.fillRect(0, 0, scene.cvs.width, scene.cvs.height);
    scene.ctx.globalAlpha = 1;

    for (let i = 0; i < scene.particle.array.length; i++) {
        scene.particle.array[i].update();
        scene.particle.array[i].draw(scene);
    }

    let temp = [];
    for (let i = 0; i < scene.particle.array.length; i++) {
        if (scene.particle.array[i].time <= scene.particle.array[i].ttl) {
            temp.push(scene.particle.array[i]);
        }
    }
    scene.particle.array = temp;
}

function mousemove(scene, e) {
    scene.mouse.x = e.x;
    scene.mouse.y = e.y;
    scene.particle.array.push(new Particle(scene));
}

function mouseout(scene) {
    scene.mouse.x = null;
    scene.mouse.y = null;
}

function resize(scene) {
    scene.cvs.width = window.innerWidth;
    scene.cvs.height = window.innerHeight;
}

function setGui(scene) {
    const gui = new dat.GUI();
    const fColors = gui.addFolder('Colors');
    const colorsKeys = Object.keys(scene.color);
    for (let i = 0; i < colorsKeys.length; i++) {
        fColors.addColor(scene.color, colorsKeys[i]).onChange(_ => resize(scene));
    }
    const fParticle = gui.addFolder('Particle Settings');
    fParticle.add(scene.particle, 'size', 1, 20, 1);
    fParticle.add(scene.particle, 'timeToLive', 10, 200, 1);

    return gui;
}

function start() {
    let scene = { ...defaultParameters.scene };

    canvasHelper.create.canvas();
    canvasHelper.setContext();
    canvasHelper.insertBeforeFirst.canvas();

    scene.cvs = canvasHelper.canvas();
    scene.ctx = canvasHelper.context();

    const gui = setGui(scene);

    resize(scene);
    render(_ => animationLoop(scene))

    window.addEventListener("resize", _ => resize(scene));
    scene.cvs.addEventListener("mousemove", e => mousemove(scene, e));
    scene.cvs.addEventListener("mouseout", _ => mouseout(scene));
}

initialization(start);