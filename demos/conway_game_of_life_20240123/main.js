const defaultParameters = {
    cvs: null,
    ctx: null,
    size: 10,
    cols: null,
    rows: null,
    grid: null,
}

function countSum(scene, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let row = (y + j + scene.rows) % scene.rows,
                col = (x + i + scene.cols) % scene.cols;
            // if (scene.grid[row][col] === 1) {
            //     sum++;
            // }
            sum += scene.grid[row][col];
        }
    }
    // if (scene.grid[x][y] === 1) {
    //     sum--;
    // }
    return sum - scene.grid[x][y];
}

function draw(scene) {
    let next = [...scene.grid];

    scene.ctx.fillStyle = 'black';
    scene.ctx.fillRect(0, 0, scene.cvs.width, scene.cvs.height);

    for (let i = 0; i < scene.rows; i++) {
        for (let j = 0; j < scene.cols; j++) {

            const sum = countSum(scene, i, j);
            const state = scene.grid[i][j];
            // console.log(`i: ${i}; j: ${j}; state: ${state} sum: ${sum}`)
            // console.log(`i = ${i}; j = ${j}; state = ${state}`)
            // console.log(sum)

            // if (state === 0 && sum === 3) {
            //     next[i][j] = 1;
            // } else if (state === 1 && sum < 2) {
            //     next[i][j] = 0;
            // } else if (state === 1 && sum > 3) {
            //     next[i][j] = 0;
            // } else {
            //     next[i][j] = state;
            // }

            if (state === 0 && sum === 3) {
                next[i][j] = 1;
            } else if (state === 1) {
                scene.ctx.fillStyle = 'white'
                scene.ctx.fillRect(j * scene.size, i * scene.size, scene.size - 1, scene.size - 1);
                if (sum < 2 || sum > 3) {
                    next[i][j] = 0;
                }
            }

            // console.log(next)
            // if (state !== 1 && sum === 3) {
            //     next[i][j] = 1;
            // } else if (state !== 0 && (sum < 2 || sum > 3)) {
            //     next[i][j] = 0;
            // }
            // else {
            //     next[i][j] = state;
            // }

            // draw white rect -1 of size if [x,y] = 1 
            // if (state === 1) {
            //     scene.ctx.fillStyle = 'white'
            //     scene.ctx.fillRect(j * scene.size, i * scene.size, scene.size - 1, scene.size - 1);
            // }
        }
    }

    scene.grid = next;
}

function makeGrid(scene) {
    let newGrid = [];
    for (let i = 0; i < scene.rows; i++) {
        let newRow = [];
        for (let j = 0; j < scene.cols; j++) {
            newRow.push(getRandomInt(0, 1));
        }
        newGrid.push(newRow);
    }
    console.log(newGrid)
    return newGrid;
    // console.log()
}

function start() {
    let scene = { ...defaultParameters };
    canvasHelper.create.canvas();
    canvasHelper.setContext();
    scene.cvs = canvasHelper.canvas();
    scene.cvs.width = 600;
    scene.cvs.height = 400;
    canvasHelper.insertBeforeFirst.canvas();


    // scene.cvs.width = window.innerWidth;
    // scene.cvs.height = window.innerHeight;

    scene.ctx = canvasHelper.context();
    scene.cols = scene.cvs.width / scene.size;
    scene.rows = scene.cvs.height / scene.size;
    scene.grid = makeGrid(scene);

    render(_ => draw(scene), 3);
    // draw(scene);
}

initialization(start);