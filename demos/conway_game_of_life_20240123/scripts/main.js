function drawBackground(scene) {
    scene.ctx.fillStyle = scene.color.background;
    scene.ctx.fillRect(0, 0, scene.cvs.width, scene.cvs.height);
}

function drawCell(ctx, column, row, width, height, color, isEllipse = false) {
    const x = row * width,
        y = column * height;
    ctx.fillStyle = color;
    if (isEllipse) {
        const radiusX = width / 2,
            radiusY = height / 2,
            centerX = x + radiusX,
            centerY = y + radiusY;
        ctx.beginPath();
        ctx.ellipse(
            centerX,
            centerY,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.closePath();
    } else {
        ctx.fillRect(
            x,
            y,
            width,
            height
        );
    }
}

/**
 * Глубокое копирование объекта или любой другой структуры данных.
 * @param {*} any - Объект или структура данных для копирования.
 * @returns {*} Глубокая копия исходного объекта или структуры данных.
 */
function copyDeep(any) {
    return JSON.parse(JSON.stringify(any));
}

function step(scene) {
    const columns = scene.grid.length, rows = scene.grid[0].length;

    let nextGrid = copyDeep(scene.grid);

    drawBackground(scene);

    for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {

            const sum = sumOfAdjacentCells(scene.grid, column, row, !scene['No Boundaries']),
                state = scene.grid[column][row];

            if (state === 0 && sum === 3) {
                nextGrid[column][row] = 1;

            } else if (state === 1) {
                drawCell(
                    scene.ctx,
                    column,
                    row,
                    scene.cell.width,
                    scene.cell.height,
                    scene.color.cell,
                    scene.cell.isEllipse
                );
                if (sum < 2 || sum > 3) {
                    nextGrid[column][row] = 0;
                }
            }
        }
    }

    scene.grid = nextGrid;
}

function setCanvas(scene) {
    scene.cvs = document.getElementById('canvas');
    scene.cvs.width = 800;
    scene.cvs.height = 800;
    scene.ctx = scene.cvs.getContext('2d');
    return scene;
}

function copyToFortyByFortyGrid(grid) {
    const length = { length: 40 };
    return Array.from(length, (_, column) => Array.from(length, (_, row) => grid[column] !== undefined && grid[column][row] !== undefined ? grid[column][row] : 0));
}

function start(scene, grid = null) {
    render.clear();
    if (grid === null) {
        scene.grid = makeGrid(40, 40);
    } else {
        scene.grid = copyToFortyByFortyGrid(grid);
    }
    render.start(_ => step(scene), scene.stepsPerSecond);
}

function init() {
    const scene = setCanvas({ ...defaultSettings });
    scene.Restart = function () {
        start(scene, null);
    }
    scene.Pause = function () {
        if (scene.pause) {
            render.start();
        } else {
            render.stop();
        }
        scene.pause = !scene.pause;
    }
    scene.start = start;
    const gui = setGUI(scene);
    start(scene);
}


initialization(init);