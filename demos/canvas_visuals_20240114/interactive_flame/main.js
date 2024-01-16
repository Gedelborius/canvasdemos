const defaultParameters = {
    scene: {
        cvs: null,
        ctx: null,
        background: {
            color: '#000000',
        },
        particles: {
            count: 50,
            array: [],
            hue: {
                min: 0,
                max: 40
            },
            radius: 30
        },
        mouse: {
            beforeX: undefined,
            forceX: 0
        }
    }
}

class Particle {
    constructor(scene) {
        this.reset(scene);
    }
    reset(scene) {
        this.x = scene.cvs.width * 0.5;
        this.y = scene.cvs.height * 0.5;
        this.x += getRandomInt(-10, 10);
        this.y += getRandomInt(-10, 10);
        this.radius = scene.particles.radius;
        this.hue = getRandomInt(scene.particles.hue.min, scene.particles.hue.max);
    }
    update(scene) {
        if (this.radius <= 0) {
            this.reset(scene);
        }
        this.radius -= 1;
        this.y -= 5;
        this.x += scene.mouse.forceX * ((30 - this.radius) / 30) * 1.5;
    }
    draw(scene) {
        scene.ctx.beginPath();
        scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        scene.ctx.fillStyle = `hsla(${this.hue}, 100%, 55%, .5)`;
        scene.ctx.fill();
        scene.ctx.shadowColor = `hsla(${this.hue}, 100%, 55%, 1)`;
        scene.ctx.shadowBlur = 15;
        scene.ctx.closePath();
    }
}

function drawScene(scene) {
    const arr = scene.particles.array;
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        p.update(scene);
        p.draw(scene);
    }
}

function animationLoop(scene) {
    if (scene.particles.array.length < scene.particles.count) {
        scene.particles.array.push(new Particle(scene));
    }

    scene.ctx.clearRect(0, 0, scene.cvs.width, scene.cvs.height);
    scene.ctx.globalCompositeOperation = 'lighter';
    drawScene(scene);;
}

function runAnimationWithFps(fps = 10, callback){
    const frameMs = Math.round(1000 / fps);
    let prevTime = 0;

    const animatedCallback = (time) =>{
        const dT = time - prevTime;

        if(dT>=frameMs) {
            prevTime = time;
            callback();
        }
        
        requestAnimationFrame(animatedCallback);
    }

    requestAnimationFrame(animatedCallback);
}


function mousemove(e, scene) {
    const w = scene.cvs.width;
    const h = scene.cvs.height;

    if (e.y >= h * 0.5 - 200 && e.y <= h * 0.5 + 30) {
        if (e.x >= w * 0.5 - 100 && e.x <= w * 0.5 + 100) {
            if (scene.mouse.beforeX) {
                scene.mouse.forceX = e.x - scene.mouse.beforeX;
            }
            scene.mouse.beforeX = e.x;
        } else {
            scene.mouse.forceX = 0;
            scene.mouse.beforeX = undefined;
        }
    } else {
        scene.mouse.forceX = 0;
        scene.mouse.beforeX = undefined;
    }
}

function resize(scene) {
    scene.cvs.width = window.innerWidth;
    scene.cvs.height = window.innerHeight;
}

function setGui(scene) {
    const gui = new dat.GUI();
    const fBackground = gui.addFolder('Background');
    fBackground.addColor(scene.background, 'color').onChange(_ => setBackgroundColorToBody(scene.background.color));
    const fParticles = gui.addFolder('Particles Settings');
    const fParticlesHue = fParticles.addFolder('Particles Hue');
    fParticlesHue.add(scene.particles.hue, 'min', 0, 255, 1);
    fParticlesHue.add(scene.particles.hue, 'max', 0, 255, 1);
    const fParticlesRadius = fParticles.addFolder('Particles Radius');
    fParticlesRadius.add(scene.particles, 'radius', 0, 255, 1);
    return gui;
}

function start() {
    let scene = { ...defaultParameters.scene };

    canvasHelper.create.canvas();
    canvasHelper.setContext();
    canvasHelper.insertBeforeFirst.canvas();

    scene.cvs = canvasHelper.canvas();
    scene.ctx = canvasHelper.context();

    setBackgroundColorToBody('black');

    const gui = setGui(scene);

    resize(scene);
    runAnimationWithFps(60, _ => animationLoop(scene));

    window.addEventListener("resize", _ => resize(scene));
    window.addEventListener("mousemove", e => mousemove(e, scene));
}

initialization(start);