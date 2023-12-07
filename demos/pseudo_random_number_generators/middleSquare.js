(() => {
    const digits = 10;
    let seed = 999999199;

    function nextRandom() {
        let n = (seed * seed).toString();
        while (n.length < digits * 2)
            n = "0" + n;
        const start = Math.floor(digits / 2),
            end = start + digits;
        seed = parseInt(n.substring(start, end));
        return seed;
    }

    function nextRandomFloat() {
        return nextRandom() / 9999999999
    }

    let y = 0;
    function middleSquare() {
        for (let x = 0; x < 600; x++)
            if (nextRandomFloat() < 0.5)
                context.fillRect(x, y, 1, 1);
        y++;
        if (y < 600) requestAnimationFrame(middleSquare);
    }

    window.prngMethods.middleSquare = middleSquare;

})()