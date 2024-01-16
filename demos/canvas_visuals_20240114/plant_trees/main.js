const defaultParameters = {
    scene: {
        color: {
            background: '#cccccc',
            branch: '#000000',
            ground: '#000000'
        },
        cvs: null,
        ctx: null,
        trees: null,
        branchChance: [0.08, 0.09, 0.1, 0.11, 0.12, 0.15, 0.3],
        branchAngles: [20, 25, 30, 35],
    }
}

class Branch {
    constructor(scene, x, y, radius, angle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = angle;
        this.branchReset(scene);
    }
    branchReset(scene) {
        this.sx = this.x;
        this.sy = this.y;
        this.length = this.radius * 20;
        this.progress = 0;
        this.branchChance = scene.branchChance[7 - this.radius];
        this.branchCount = 0;
        this.branchDirection = (Math.random() < 0.5) ? -1 : 1;
    }
    draw(scene) {
        if (this.progress > 1 || this.radius <= 0) return;
        scene.ctx.beginPath();
        scene.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        scene.ctx.fillStyle = scene.color.branch;
        scene.ctx.globalAlpha = 0.5;
        scene.ctx.fill();
        scene.ctx.closePath();
        scene.ctx.globalAlpha = 1;
    }
    update(scene) {
        let radian = (Math.PI / 180) * this.angle;
        this.x = this.sx + (this.length * this.progress) * Math.sin(radian);
        this.y = this.sy + (this.length * this.progress) * Math.cos(radian);
        if (this.radius == 1) {
            this.progress += .05;
        } else {
            this.progress += .1 / this.radius;
        }
        if (this.progress > 1) {
            this.radius -= 1;
            this.angle += (Math.floor(Math.random() * 3) - 1) * 10;
            this.branchReset(scene);
        }
    }
}

class Tree {
    constructor(scene, x) {
        this.x = (x) ? x : scene.cvs.width * 0.5;
        this.y = scene.cvs.height;
        this.branchs = [];
        this.addBranch(scene, this.x, this.y, getRandomInt(5, 7), 180);
    }
    addBranch(scene, x, y, radius, angle) {
        this.branchs.push(new Branch(scene, x, y, radius, angle));
    }
    draw(scene) {
        for (let i = 0; i < this.branchs.length; i++) {
            this.branchs[i].draw(scene);
        }
    }
    update(scene) {
        for (let i = 0; i < this.branchs.length; i++) {
            const b = this.branchs[i];
            b.update(scene);
            if (
                b.radius > 0 &&
                b.progress > 0.4 &&
                Math.random() < b.branchChance &&
                b.branchCount < 3
            ) {
                let newBranch = {
                    x: b.x,
                    y: b.y,
                    radius: b.radius - 1,
                    angle: b.angle +
                        scene.branchAngles[Math.floor(Math.random() * scene.branchAngles.length)] *
                        b.branchDirection
                };
                this.addBranch(
                    scene,
                    newBranch.x,
                    newBranch.y,
                    newBranch.radius,
                    newBranch.angle
                );
                b.branchCount++;
                b.branchDirection *= -1;
            }
        }
    }
}

function animationLoop(scene) {
    for (let i = 0; i < scene.trees.length; i++) {
        const t = scene.trees[i];
        t.update(scene);
        t.draw(scene);
    }
    requestAnimationFrame(_ => animationLoop(scene));
}

function drawGround(scene) {
    scene.ctx.fillStyle = scene.color.ground;
    scene.ctx.fillRect(0, scene.cvs.height - 10, scene.cvs.width, scene.cvs.height);
}

function restart(scene) {
    scene.cvs.width = window.innerWidth;
    scene.cvs.height = window.innerHeight;
    scene.trees = [];
    setBackgroundColorToBody(scene.color.background)
    drawGround(scene);
    scene.trees.push(new Tree(scene));
}

function setGui(scene) {
    const gui = new dat.GUI();
    const fColors = gui.addFolder('Colors');
    const colorsKeys = Object.keys(scene.color);
    for (let i = 0; i < colorsKeys.length; i++) {
        fColors.addColor(scene.color, colorsKeys[i]).onChange(_ => restart(scene));
    }
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
    restart(scene);
    animationLoop(scene);
    window.addEventListener("resize", _ => restart(scene));
    scene.cvs.addEventListener("click", e => scene.trees.push(new Tree(scene, e.x)));
}

initialization(start);