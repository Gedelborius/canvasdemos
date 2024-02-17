function drawBackground(scene) {
    scene.ctx.fillStyle = scene.color.background;
    scene.ctx.fillRect(0, 0, scene.cvs.width, scene.cvs.height);
}

// function drawGrid(scene) {
//     scene.ctx.beginPath();
//     scene.ctx.globalAlpha = 1;
//     scene.ctx.lineWidth = 1;
//     scene.ctx.strokeStyle = scene.color.line;
//     for (let y = 0; y <= scene.cvs.height; y += scene.cell.size) {
//         scene.ctx.moveTo(0, y);
//         scene.ctx.lineTo(scene.cvs.width, y)
//     }
//     for (let x = 0; x <= scene.cvs.width; x += scene.cell.size) {
//         scene.ctx.moveTo(x, 0);
//         scene.ctx.lineTo(x, scene.cvs.height)
//     }
//     scene.ctx.stroke();
//     scene.ctx.closePath();
// }

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
                drawCell(
                    scene.ctx,
                    column,
                    row,
                    scene.model.cell.width,
                    scene.model.cell.height,
                    scene.color.cell,
                    scene.model.cell.isEllipse
                );
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

function resizeCanvas(scene,
    // width, height
) {

    // Get the device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1;

    // Get the viewport size
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set the canvas size to the viewport size multiplied by the pixel ratio
    scene.cvs.width = viewportWidth * pixelRatio;
    scene.cvs.height = viewportHeight * pixelRatio;

    // Scale the canvas by the pixel ratio
    scene.cvs.style.width = viewportWidth + 'px';
    scene.cvs.style.height = viewportHeight + 'px';

    // canvas.width = width;
    // canvas.height = height;
}

function setStopButton(scene) {
    const body = document.querySelector('body');
    const button = document.createElement('button');
    body.insertBefore(button, body.firstChild);
    button.setAttribute(
        'style',
        'position:absolute;top:0;left:0;'
    )
    const style = 'position:absolute;top:0;left:0;';
    // const button = interface.addButton(
    //     true,
    //     style
    // );

    button.innerHTML = 'PAUSE GAME';

    button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (scene.pause) {
            render.start();
            button.innerHTML = 'PAUSE GAME';
        } else {
            render.stop();
            button.innerHTML = 'CONTINUE GAME';
        }
        scene.pause = !scene.pause;
    });
}

function setRestartButton(scene) {

}

function setButtonsContainer() {
    const body = document.querySelector('body');
    const buttonsContainer = document.createElement('div');
    buttonsContainer.setAttribute(
        'style',
        'position:absolute;top:0;left:0;'
    )
    body.insertBefore(button, body.firstChild);
    return buttonsContainer;
}

function setCellSize(scene) {
    scene.model.cell.width = scene.cvs.width / scene.model.grid[0].length;
    scene.model.cell.height = scene.cvs.height / scene.model.grid.length;
}

function start(scene) {

    setStopButton(scene);

    function resizeCallback() {
        resizeCanvas(scene);
        setCellSize(scene);
    }

    window.addEventListener("resize", resizeCallback);

    scene.model.grid = makeGrid(scene.model.columns, scene.model.rows);
    setCellSize(scene);

    const gui = setGUI(scene);
    render.start(_ => step(scene), scene.stepsPerSecond);
}

function init() {
    let scene = setCanvas({ ...defaultSettings });
    const buttonsContainer = setButtonsContainer();
    resizeCanvas(scene);
    // resizeCanvas(scene.cvs, 1920, 1080);
    start(scene);
}


initialization(init);