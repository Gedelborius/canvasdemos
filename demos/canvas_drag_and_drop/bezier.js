const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let handle0 = {
    x: 100,
    y: 100,
    radius: 15
}

let handle1 = {
    x: 400,
    y: 400,
    radius: 15
}

let handle2 = {
    x: 700,
    y: 100,
    radius: 15
}

let handle3 = {
    x: 1000,
    y: 500,
    radius: 15
}

let handles = [handle0, handle1, handle2, handle3];
let offset = {};
let isDragging = false;
let dragHandle = null;

function onMouseMove(event) {
    dragHandle.x = event.clientX - offset.x;
    dragHandle.y = event.clientY - offset.y;
}

function onMouseUp(event) {
    document.body.removeEventListener('mousemove', onMouseMove);
    document.body.removeEventListener('mouseup', onMouseUp);
    isDragging = false;
}

function draw() {
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(handle0.x, handle0.y);
    context.bezierCurveTo(
        handle1.x, handle1.y,
        handle2.x, handle2.y,
        handle3.x, handle3.y
    );
    context.stroke();

    context.fillStyle = 'gray';

    for (let i = 0; i < handles.length; i++) {
        const handle = handles[i];

        if (isDragging && handle === dragHandle) {
            context.shadowColor = 'black';
            context.shadowOffsetX = 4;
            context.shadowOffsetY = 4;
            context.shadowBlur = 8;
        }

        context.beginPath();
        context.arc(
            handle.x,
            handle.y,
            handle.radius,
            0,
            Math.PI * 2,
            false
        );
        context.fill();

        context.shadowColor = null;
        context.shadowOffsetX = null;
        context.shadowOffsetY = null;
        context.shadowBlur = null;
    }

    requestAnimationFrame(draw)
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

draw();