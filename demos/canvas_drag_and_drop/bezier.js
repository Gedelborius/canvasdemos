const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = windows.innerWidth;
const height = canvas.height = windows.innerHeight;

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

let handle2= {
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