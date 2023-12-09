(() => {
    const a = 1103515245,
        c = 12345,
        m = 2 ** 31;

    let seed = 1;

    function nextRand() {
        seed = (a * seed + c) % m;
        return seed;
    }

    function nextRandFloat() {
        return nextRand() / m;
    }

    let y = 0;
    function linearCongruential() {
        for (let x = 0; x < 600; x++) {
            if (nextRandFloat() < 0.5)
                context.fillRect(x, y, 1, 1);
        }

        y++;
        if (y < 600) requestAnimationFrame(linearCongruential);
    }

    window.prngCanvasDemos.linearCongruential = linearCongruential;
})()