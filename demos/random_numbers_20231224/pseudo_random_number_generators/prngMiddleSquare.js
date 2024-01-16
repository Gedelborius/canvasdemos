function prngMiddleSquare(inputSeed) {
    const digits = 10;
    let seed = inputSeed;
    function nextRandom() {
        let n = (seed * seed).toString();
        while (n.length < digits * 2) {
            n = "0" + n;
        }
        const start = Math.floor(digits / 2);
        const end = start + digits;
        seed = parseInt(n.substring(start, end));
        return seed;
    };
    return function nextRandomFloat() {
        return nextRandom() / 9999999999
    };
}