function drawBackground(scene) {
    scene.ctx.fillStyle = scene.color.background;
    scene.ctx.fillRect(0, 0, scene.cvs.width, scene.cvs.height);
}

function drawGrid(scene) {
    scene.ctx.beginPath();
    scene.ctx.globalAlpha = 1;
    scene.ctx.lineWidth = 1;
    scene.ctx.strokeStyle = scene.color.line;
    for (let y = 0; y <= scene.cvs.height; y += scene.cell.size) {
        scene.ctx.moveTo(0, y);
        scene.ctx.lineTo(scene.cvs.width, y)
    }
    for (let x = 0; x <= scene.cvs.width; x += scene.cell.size) {
        scene.ctx.moveTo(x, 0);
        scene.ctx.lineTo(x, scene.cvs.height)
    }
    scene.ctx.stroke();
    scene.ctx.closePath();
}

function drawCell(scene, column, row) {
    scene.ctx.fillStyle = scene.color.cell;
    scene.ctx.fillRect(
        row * scene.model.cell.width,
        column * scene.model.cell.height,
        scene.model.cell.width,
        scene.model.cell.height
    );
}

function copyDeep(any) {
    return JSON.parse(JSON.stringify(any));
}


function step(scene) {
    const columns = scene.model.grid.length, rows = scene.model.grid[0].length;

    let nextGrid = copyDeep(scene.model.grid);

    drawBackground(scene);

    for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {

            const sum = sumOfAdjacentCells(scene.model.grid, column, row),
                state = scene.model.grid[column][row];

            if (state === 0 && sum === 3) {
                nextGrid[column][row] = 1;

            } else if (state === 1) {
                drawCell(scene, column, row);
                if (sum < 2 || sum > 3) {
                    nextGrid[column][row] = 0;
                }
            }
        }
    }

    scene.model.grid = nextGrid;
}

function setCanvas(scene) {
    canvasHelper.create.canvas();
    canvasHelper.setContext();
    scene.cvs = canvasHelper.canvas();
    scene.cvs.setAttribute(
        'style',
        ' display: flex; justify-content: center; align-items: center; width: 100%;  height: 100vh; image-rendering: pixelated; image-rendering: crisp-edges;'
    )
    scene.ctx = canvasHelper.context();
    canvasHelper.insertBeforeFirst.canvas();
    return scene;
}

function resizeCanvas(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

function setGUI(scene) {
    const gui = new dat.GUI();
    const fColors = gui.addFolder('Colors');
    const colorsKeys = Object.keys(scene.color);
    for (let i = 0; i < colorsKeys.length; i++) {
        fColors.addColor(scene.color, colorsKeys[i]);
    }
    const fGameSettings = gui.addFolder('Game Settings');
    fGameSettings.add(
        scene,
        'stepsPerSecond',
        1,
        60
    ).onChange(_ => {
        render.set.fps(scene.speed);
        render.restart();
    })
    // movesPerSecond.name('test')
    //     .onChange(_ => {
    //         render.set.fps(scene.speed);
    //         render.restart();
    //     });

    return gui;
}

function start(scene) {
    scene.model.grid = makeGrid(scene.model.columns, scene.model.rows);
    scene.model.cell.width = scene.cvs.width / scene.model.grid[0].length;
    scene.model.cell.height = scene.cvs.height / scene.model.grid.length;
    const gui = setGUI(scene);
    render.start(_ => step(scene), scene.stepsPerSecond);
}

function init() {
    let scene = setCanvas({ ...defaultSettings });
    resizeCanvas(scene.cvs, 1920, 1080);
    start(scene);
}


initialization(init);