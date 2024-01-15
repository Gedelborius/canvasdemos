function prngSeedrandom(inputSeed) {
    const srng = new Math.seedrandom(inputSeed);
    return function nextRandomFloat() {
        return srng();
    };
}