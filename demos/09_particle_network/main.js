const defaultParameters = {
    scene: {
        cvs: null,
        ctx: null,
        color: {
            background: '#000000',
            particle: '#00b5ff',
            line: '#00b5ff',
        },
        particle: {
            array: null,
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
            radius: 300
        }
    }
}

class Particle {
    constructor(scene) {
        this.x = Math.random() * scene.cvs.width;
        this.y = Math.random() * scene.cvs.height;
        this.radius = scene.particle.radius.default + Math.random() * scene.particle.radius.variant;
        this.speed = scene.particle.speed.default + Math.random() * scene.particle.speed.variant;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.vector = {
            x: Math.cos(this.directionAngle) * this.speed,
            y: Math.sin(this.directionAngle) * this.speed
        }
    }

    draw(scene) {
        scene.ctx.beginPath();
        scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        scene.ctx.closePath();
        scene.ctx.fillStyle = scene.color.particle;
        scene.ctx.fill();
    }

    checkBorder(scene) {
        const cvs = scene.cvs;
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

    update(scene) {
        this.checkBorder(scene);
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
            scene.ctx.strokeStyle = scene.color.line;
            scene.ctx.globalAlpha = opacity;
            scene.ctx.beginPath();
            scene.ctx.moveTo(point.x, point.y);
            scene.ctx.lineTo(hubs[i].x, hubs[i].y);
            scene.ctx.closePath();
            scene.ctx.stroke();
            scene.ctx.globalAlpha = 1;
        }
    }
}

function animationLoop(scene) {
    const arr = scene.particle.array;
    scene.ctx.clearRect(0, 0, scene.cvs.width, scene.cvs.height);
    for (let i = 0; i < arr.length; i++) {
        let p = arr[i];
        p.update(scene);
        p.draw(scene);
        linkPoints(p, arr, scene);
    }
    requestAnimationFrame(_ => animationLoop(scene));
}

function resize(scene) {
    scene.cvs.width = window.innerWidth;
    scene.cvs.height = window.innerHeight;
    setBackgroundColorToBody(scene.color.background);
}

function createParticles(scene) {
    scene.particle.array = [];
    for (let i = 0; i < scene.particle.count; i++) {
        scene.particle.array.push(new Particle(scene));
    }
}

function setGui(scene) {
    const gui = new dat.GUI();
    const fColors = gui.addFolder('Colors');
    const colorsKeys = Object.keys(scene.color);
    for (let i = 0; i < colorsKeys.length; i++) {
        fColors.addColor(scene.color, colorsKeys[i]).onChange(_ => resize(scene));
    }

    const fParticle = gui.addFolder('Particles Settings');
    fParticle.add(scene.particle, 'count', 2, 200, 1).onChange(_ => createParticles(scene));
    const fParticleRadius = fParticle.addFolder('Radius');
    fParticleRadius.add(scene.particle.radius, 'default', 1, 20, 1).onChange(_ => createParticles(scene));
    fParticleRadius.add(scene.particle.radius, 'variant', 1, 20, 1).onChange(_ => createParticles(scene));
    const fParticleSpeed = fParticle.addFolder('Speed');
    fParticleSpeed.add(scene.particle.speed, 'default', 1, 20, 1).onChange(_ => createParticles(scene));
    fParticleSpeed.add(scene.particle.speed, 'variant', 1, 20, 1).onChange(_ => createParticles(scene));

    const fLine = gui.addFolder('Line Settings');
    fLine.add(scene.line, 'radius', 1, 600, 1);

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

    createParticles(scene);

    animationLoop(scene);

    window.addEventListener("resize", _ => resize(scene));
}

initialization(start);