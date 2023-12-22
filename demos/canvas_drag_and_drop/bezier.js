const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const defaultParameters = {
    backgroundColor: '#ffffff',
    curveColor: '#000000',
    handlesRadius: {
        min: 1,
        max: 100,
        value: 15,
        step: 1
    },
    handles: [
        { x: 100, y: 100, r: 15, color: '#808080' },
        { x: 400, y: 400, r: 15, color: '#808080' },
        { x: 700, y: 100, r: 15, color: '#808080' },
        { x: 1000, y: 500, r: 15, color: '#808080' }
    ],
    doRandomSpawn: false
}

const panelTitles = {
    backgroundColor: 'Background color',
    curveColor: 'Curve color',
    handlesRadius: 'Point radius',
    handlesColor: [
        'Point 1 color',
        'Point 2 color',
        'Point 3 color',
        'Point 4 color'
    ],
    doRandomSpawn: 'Do Random Spawn',
    restart: 'Restart'
}

const panel = QuickSettings
    .create(0, 0, 'Move me (Double click - hide)')
    .addColor(panelTitles.backgroundColor, defaultParameters.backgroundColor)
    .addColor(panelTitles.curveColor, defaultParameters.curveColor)
    .addNumber(
        panelTitles.handlesRadius,
        defaultParameters.handlesRadius.min,
        defaultParameters.handlesRadius.max,
        defaultParameters.handlesRadius.value,
        defaultParameters.handlesRadius.step
    )
    .addColor(panelTitles.handlesColor[0], defaultParameters.handles[0].color)
    .addColor(panelTitles.handlesColor[1], defaultParameters.handles[1].color)
    .addColor(panelTitles.handlesColor[2], defaultParameters.handles[2].color)
    .addColor(panelTitles.handlesColor[3], defaultParameters.handles[3].color)
    .addBoolean(panelTitles.doRandomSpawn, defaultParameters.doRandomSpawn)
    .addButton(panelTitles.restart, start)


const getPanelValue = {
    backgroundColor: () => panel.getValue(panelTitles.backgroundColor),
    curveColor: () => panel.getValue(panelTitles.curveColor),
    handlesRadius: () => panel.getValue(panelTitles.handlesRadius),
    handlesColor: [
        () => panel.getValue(panelTitles.handlesColor[0]),
        () => panel.getValue(panelTitles.handlesColor[1]),
        () => panel.getValue(panelTitles.handlesColor[2]),
        () => panel.getValue(panelTitles.handlesColor[3])
    ],
    doRandomSpawn: () => panel.getValue(panelTitles.doRandomSpawn)
}


let handles = [
    { x: 100, y: 100, r: 15 },
    { x: 400, y: 400, r: 15 },
    { x: 700, y: 100, r: 15 },
    { x: 1000, y: 500, r: 15 }
];

let updateRequest = null;
let prng = null;
let offset = {};
let isDragging = false;
let dragHandle = null;

function initiateHandles(prng) {
    for (let i = 0; i < 4; i++) {
        let x = 0;
        let y = 0;
        if (getPanelValue.doRandomSpawn()) {
            x = prng() * ctx.canvas.width;
            y = prng() * ctx.canvas.height;
        } else {
            x = defaultParameters.handles[i].x;
            y = defaultParameters.handles[i].y;
        }
        handles.push(
            {
                x,
                y,
                r: getPanelValue.handlesRadius(),
            }
        )
    }
}

function onMouseMove(event) {
    dragHandle.x = event.clientX - offset.x;
    dragHandle.y = event.clientY - offset.y;
}

function onMouseUp() {
    document.body.removeEventListener('mousemove', onMouseMove);
    document.body.removeEventListener('mouseup', onMouseUp);
    isDragging = false;
}

function drawBackground() {
    ctx.fillStyle = getPanelValue.backgroundColor();
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawBezierCurve(points) {
    ctx.strokeStyle = getPanelValue.curveColor();
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.bezierCurveTo(
        points[1].x, points[1].y,
        points[2].x, points[2].y,
        points[3].x, points[3].y
    );
    ctx.stroke();
}

function drawCircle(point) {
    ctx.beginPath();
    ctx.arc(
        point.x,
        point.y,
        point.r,
        0,
        Math.PI * 2,
        false
    );
    ctx.fill();
}

function shadowOn() {
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 8;
}

function shadowOff() {
    ctx.shadowColor = null;
    ctx.shadowOffsetX = null;
    ctx.shadowOffsetY = null;
    ctx.shadowBlur = null;
}

function udpate() {
    drawBackground()
    drawBezierCurve(handles);

    for (let i = 0; i < handles.length; i++) {
        const handle = handles[i];
        ctx.fillStyle = getPanelValue.handlesColor[i]();
        if (isDragging && handle === dragHandle) {
            shadowOn();
        }
        drawCircle(handle);
        shadowOff()
    }

    updateRequest = requestAnimationFrame(udpate)
}

document.body.addEventListener('mousedown', (event) => {
    for (let i = 0; i < handles.length; i++) {
        const handle = handles[i];
        if (
            utils.circlePointCollision(
                event.clientX,
                event.clientY,
                handle
            )
        ) {
            isDragging = true;
            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
            dragHandle = handle;
            offset.x = event.clientX - handle.x;
            offset.y = event.clientY - handle.y;
        }
    }
})


function start() {
    if (updateRequest !== null) {
        cancelAnimationFrame(updateRequest);
    }

    prng = new Math.seedrandom();
    handles.length = 0;
    initiateHandles(prng);

    udpate();
}

start();