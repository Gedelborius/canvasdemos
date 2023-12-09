const canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = 600,
      height = canvas.height = 600;

function draw() {
    // window.prngCanvasDemos.middleSquare();
    // window.prngCanvasDemos.linearCongruential();
    window.prngCanvasDemos.circlesInRandomPlace_seedrandom(123);
}

draw();