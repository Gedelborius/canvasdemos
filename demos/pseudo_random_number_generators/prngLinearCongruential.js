function prngLinearCongruential(inputSeed) {
    const a = 1103515245;
    const c = 12345;
    const m = 2 ** 31;
    let seed = inputSeed;
    function nextRandom() {
        seed = (a * seed + c) % m;
        return seed;
    }
    return function nextRandomFloat() {
        return nextRandom() / m;
    }
}