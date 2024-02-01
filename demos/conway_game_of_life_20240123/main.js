const defaultParameters = {
    cvs: null,
    ctx: null,
    color: {
        background: '#000000',
        line: '#757575',
        cell: '#ffffff'
    },
    grid: {
        columns: null,
        rows: null,
        array: null
    },
    cell: {
        size: 10,
    },
}

let array = null;

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


function countSum(scene, x, y) {
    const r = scene.grid.rows, c = scene.grid.columns;
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + c) % c,
                row = (y + j + r) % r;

            console.log(`column: ${col}; row: ${row}; state: ${scene.grid.array[col][row]}`);
            // let row = (y + j + r) % r,
            //     col = (x + i + c) % c;

            sum += scene.grid.array[col][row];
        }
    }
    return sum - scene.grid.array[x][y];
}

function drawCell(scene, x, y) {
    const s = scene.cell.size, c = s - 1;
    scene.ctx.fillStyle = scene.color.cell;
    scene.ctx.fillRect(x * s, y * s, c, c)
}


function step(scene) {
    const rows = scene.grid.rows, columns = scene.grid.columns;
    let prevArray = scene.grid.array;
    let nextGrid = JSON.parse(JSON.stringify(scene.grid.array))
    drawBackground(scene);
    // drawGrid(scene);



    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            const sum = sumAround(prevArray, col, row),
                state = scene.grid.array[col][row];

            console.log(
                `x: ${col}; y: ${row}; sum: ${sum}`
            )

            if (state === 0 && sum === 3) {
                nextGrid[col][row] = 1;
            } else if (state === 1) {
                drawCell(scene, col, row);
                if (sum < 2 || sum > 3) {
                    nextGrid[col][row] = 0;
                }
            }
        }
    }

    // console.log(nextGrid)

    scene.grid.array = nextGrid;
}

function setCanvas(scene) {
    canvasHelper.create.canvas();
    canvasHelper.setContext();
    scene.cvs = canvasHelper.canvas();
    scene.ctx = canvasHelper.context();
    canvasHelper.insertBeforeFirst.canvas();
    return scene;
}

function resizeCanvas(scene, width, height) {
    scene.cvs.width = width;
    scene.cvs.height = height;
}

function makeGrid(scene) {
    const c = scene.grid.columns, r = scene.grid.rows;
    let grid = [];
    for (let x = 0; x < c; x++) {
        let col = [];
        for (let y = 0; y < r; y++) {
            col.push(getRandomInt(0, 1));
        }
        grid.push(col);
    }
    return grid;
}

function start(scene) {
    scene.grid.columns = scene.cvs.width / scene.cell.size;
    scene.grid.rows = scene.cvs.height / scene.cell.size;
    scene.grid.array = makeGrid(scene);
    array = scene.grid.array;
    console.log('grid array: ', scene.grid.array);
    // console.log(scene)
    render(_ => step(scene), 1);
    step(scene)
}

function init() {
    let scene = setCanvas({ ...defaultParameters });
    resizeCanvas(scene, 200, 100);
    start(scene);
}

initialization(init);