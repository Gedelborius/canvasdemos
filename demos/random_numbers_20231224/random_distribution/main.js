const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let updateRequest = null;
let prng = null;
let iterations = 0;
let maxResults = 0;
let results = [];

const defaultParameters = {
    backgroundColor: '#ffffff',
    resultColor: '#000000',
    maxResults: {
        min: 10,
        max: 1000,
        value: 100,
        step: 10
    },
    iterations: {
        min: 1,
        max: 20,
        value: 3,
        step: 1
    },
    useSeed: true,
    seed: {
        min: 1,
        max: 999999999,
        value: 1, 
        step: 1
    }
}

const panelTitles = {
    backgroundColor: 'Background color',
    resultColor: 'Result color',
    maxResults: 'Max Results',
    iterations: 'Iterations',
    useSeed: 'Use seed?',
    seed: 'Seed',
    restart: 'Restart'
}

const panel = QuickSettings
    .create(
        0,
        0,
        'Move me (Double click - hide)'
    )
    .addColor(
        panelTitles.backgroundColor,
        defaultParameters.backgroundColor
    )
    .addColor(
        panelTitles.resultColor,
        defaultParameters.resultColor
    )
    .addRange(
        panelTitles.maxResults,
        defaultParameters.maxResults.min,
        defaultParameters.maxResults.max,
        defaultParameters.maxResults.value,
        defaultParameters.maxResults.step
    )
    .addRange(
        panelTitles.iterations,
        defaultParameters.iterations.min,
        defaultParameters.iterations.max,
        defaultParameters.iterations.value,
        defaultParameters.iterations.step
    )
    .addBoolean(
        panelTitles.useSeed,
        defaultParameters.useSeed,
        (e) => e ? panel.showControl(panelTitles.seed) : panel.hideControl(panelTitles.seed) 
    )
    .addNumber(
        panelTitles.seed,
        defaultParameters.seed.min,
        defaultParameters.seed.max,
        defaultParameters.seed.value,
        defaultParameters.seed.step
    )
    .addButton(
        panelTitles.restart,
        start
    )

const getPanelValue = {
    backgroundColor: () => panel.getValue(panelTitles.backgroundColor),
    resultColor: () => panel.getValue(panelTitles.resultColor),
    maxResults: () => panel.getValue(panelTitles.maxResults),
    iterations: () => panel.getValue(panelTitles.iterations),
    useSeed: () => panel.getValue(panelTitles.useSeed),
    seed: () => panel.getValue(panelTitles.seed)
}

function addResult() {
    let total = 0;
    for (let i = 0; i < iterations; i += 1) {
        total += prng() * maxResults;
    }
    const result = Math.floor(total / iterations);
    results[result] += 1;
}

function draw() {
    const w = width / maxResults;
    for (let i = 0; i < maxResults; i++) {
        const h = results[i] * -10;
        context.fillRect(w * i, height, w, h);
    }
}

function update() {
    addResult();
    draw();
}

function start() {
    if (updateRequest !== null) {
        cancelAnimationFrame(updateRequest);
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    iterations = getPanelValue.iterations();
    maxResults = getPanelValue.maxResults();
    prng = new Math.seedrandom(getPanelValue.useSeed() ? getPanelValue.seed() : null);
    
    results.length = 0;
    for (let i = 0; i < maxResults; i++) {
        results[i] = 0;
    }

    context.fillStyle = getPanelValue.backgroundColor();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = getPanelValue.resultColor();

    render(update)
}

start();