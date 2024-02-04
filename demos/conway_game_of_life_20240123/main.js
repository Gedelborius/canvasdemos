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
    const s = scene.cell.size, c = s - 1;
    scene.ctx.fillStyle = scene.color.cell;
    scene.ctx.fillRect(
        row * scene.cell.width,
        column * scene.cell.height,
        scene.cell.width,
        scene.cell.height
    );
}

function copyDeep(any) {
    return JSON.parse(JSON.stringify(any));
}


function step(scene) {
    const columns = scene.grid.array.length, rows = scene.grid.array[0].length;

    let nextGrid = copyDeep(scene.grid.array);

    drawBackground(scene);

    for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {

            const sum = sumOfAdjacentCells(scene.grid.array, column, row),
                state = scene.grid.array[column][row];

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

    scene.grid.array = nextGrid;
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

function start(scene) {

    // scene.grid.array = makeGrid(scene.cvs.width / scene.cell.size, scene.cvs.height / scene.cell.size);
    scene.grid.array = makeGrid(23, 17);
    // scene.grid.array = testArrayGliders10x10;
    scene.cell.width = scene.cvs.width / scene.grid.array[0].length;
    scene.cell.height = scene.cvs.height / scene.grid.array.length;
    console.log(scene.grid.array)

    // step(scene);
    render(_ => step(scene), 10);
}

function init() {
    let scene = setCanvas({ ...defaultSettings });
    resizeCanvas(scene.cvs, 1920, 1080);
    start(scene);
}


initialization(init);