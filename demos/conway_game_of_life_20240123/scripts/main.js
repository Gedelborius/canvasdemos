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

            const sum = sumOfAdjacentCells(scene.grid, column, row, scene['No Boundaries']),
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
    canvasHelper.create.canvas();
    canvasHelper.setContext();
    scene.cvs = canvasHelper.canvas();
    scene.ctx = canvasHelper.context();
    canvasHelper.insertBeforeFirst.canvas();
    return scene;
}

function resizeCanvas(scene) {
    const pixelRatio = window.devicePixelRatio || 1;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    scene.cvs.width = viewportWidth * pixelRatio;
    scene.cvs.height = viewportHeight * pixelRatio;
    scene.cvs.style.width = viewportWidth + 'px';
    scene.cvs.style.height = viewportHeight + 'px';
}

function setCellSize(scene) {
    scene.cell.width = scene.cvs.width / scene.grid[0].length;
    scene.cell.height = scene.cvs.height / scene.grid.length;
}

function start(
    scene,
    preset = {
        columns: null,
        rows: null,
        grid: null
    }
) {
    render.clear();

    if (preset.grid === null) {
        if (preset.columns !== null && preset.rows !== null) {
            scene.grid = makeGrid(preset.columns, preset.rows);
        } else {
            const size = getRandomInt(10, 50);
            scene.grid = makeGrid(size, size)
        }
    } else {
        scene.grid = preset.grid;
    }

    setCellSize(scene);
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


    function resizeCallback() {
        resizeCanvas(scene);
        setCellSize(scene);
    }
    window.addEventListener("resize", resizeCallback);

    resizeCanvas(scene);

    start(scene);
}


initialization(init);