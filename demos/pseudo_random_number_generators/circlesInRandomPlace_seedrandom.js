(() => {

    function drawCircle(x, y, r, color = '#000000') {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();
    }

    function circlesInRandomPlace_seedrandom(seed) {
        const srng = new Math.seedrandom(seed);

        context.fillStyle = '#95cfa4';
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < 50; i++) {
            const x = srng() * 600,
                y = srng() * 600,
                r = 20 + srng() * 50;

            drawCircle(x, y, r, '#eb3a34');
            drawCircle(x, y, r - 20, '#4a737d');
        }
    }

    window.prngCanvasDemos.circlesInRandomPlace_seedrandom = circlesInRandomPlace_seedrandom;
})()