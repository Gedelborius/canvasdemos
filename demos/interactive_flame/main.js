const defaultParameters = {
    scene: {
        background: {
            color: '#000000',
        },
        particles: {
            count: 50,
            array: []
        },
        mouse: {
            beforeX: undefined,
            forceX: 0
        }
    }
}

class Particle {
    constructor(cvs) {
        this.reset(cvs);
    }
    reset(cvs) {
        this.x = cvs.width * 0.5;
        this.y = cvs.height * 0.5;
        this.x += getRandomInt(-10, 10);
        this.y += getRandomInt(-10, 10);
        this.radius = 30;
        this.hue = getRandomInt(0, 40);
    }
    update(cvs, scene) {
        if (this.radius <= 0) {
            this.reset(cvs);
        }
        this.radius -= 1;
        this.y -= 5;
        this.x += scene.mouse.forceX * ((30 - this.radius) / 30) * 1.5;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 55%, .5)`;
        ctx.fill();
        ctx.shadowColor = `hsla(${this.hue}, 100%, 55%, 1)`;
        ctx.shadowBlur = 15;
        ctx.closePath();
    }
}

function drawScene(cvs, ctx, scene) {
    const arr = scene.particles.array;
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        p.update(cvs, scene);
        p.draw(ctx);
    }
}

function animationLoop(cvs, ctx, scene) {
    if (scene.particles.array.length < scene.particles.count) {
        scene.particles.array.push(new Particle(cvs));
    }

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.globalCompositeOperation = 'lighter';
    drawScene(cvs, ctx, scene);

    requestAnimationFrame(_ => animationLoop(cvs, ctx, scene));
}


function mousemove(e, cvs, scene) {
    const w = cvs.width;
    const h = cvs.height;

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

function resize(cvs) {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
}

function gui(scene) {
    const gui = new dat.GUI();
    const fBackground = gui.addFolder('Background');
    fBackground.addColor(scene.background, 'color').onChange(_ => setBackgroundColorToBody(scene.background.color));
    const fParticles = gui.addFolder('Particles Settings');
    fParticles.add(scene.particles, 'count', 1, 200, 1);
}

function setBackgroundColorToBody(color) {
    document.querySelector('body').style.backgroundColor = color;
}

function start() {
    let cvs, ctx, scene = { ...defaultParameters.scene };

    canvasHelper.create.canvas();
    canvasHelper.setContext();
    canvasHelper.insertBeforeFirst.canvas();

    cvs = canvasHelper.canvas();
    ctx = canvasHelper.context();

    setBackgroundColorToBody('black');

    gui(scene);

    resize(cvs);
    animationLoop(cvs, ctx, scene);

    window.addEventListener("resize", _ => resize(cvs));
    window.addEventListener("mousemove", e => mousemove(e, cvs, scene));
}

initialization(start);