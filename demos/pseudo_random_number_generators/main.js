const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = 600;
const height = canvas.height = 600;
const defaultPRNGParameters = {
    middleSquare: {
        seed: 9999191999
    },
    linearCongruential: {
        seed: 1
    },
    seedrandom: {
        seed: 1
    }
};
const defaultDemoParameters = {
    randomPixels: {
        backgroundColor: '#ffffff',
        pixelColor: '#000000'
    },
    randomСircles: {
        backgroundColor: '#95cfa4',
        cirlceColor: '#eb3a34',
        doInsideCircle: true,
        insideCircleColor: '#4a737d'
    }
}
const panelParametersTitle = {
    draw: 'Draw',
    choosePRNG: 'Choose PRN Generator',
    prngParameters: {
        middleSquare: {
            seed: 'Middle square: seed (default 9999191999):'
        },
        linearCongruential: {
            seed: 'Linear congruential: seed (default 1):'
        },
        seedrandom: {
            seed: 'Seedrandom: seed (default 1):'
        }
    },
    chooseDemo: 'Choose demo that use PRNG',
    demoParameters: {
        randomPixels: {
            backgroundColor: 'Random pixels demo: background color:',
            pixelColor: 'Random pixels demo: pixel color:'
        },
        randomСircles: {
            backgroundColor: 'Random circles demo: background color:',
            cirlceColor: 'Random circles demo: circle color',
            doInsideCircle: 'Random circles demo: do inside circle?',
            insideCircleColor: 'Random circles demo: inside circle color'
        }
    }
}
const prngNames = [
    'Middle Square',
    'Linear Congruentiol',
    'Seedrandom'
];

const demoNames = [
    'Random pixels',
    'Random circles'
]
const panel = QuickSettings.create(0, 0, 'You can move me')
    .addDropDown(
        panelParametersTitle.choosePRNG,
        prngNames,
        draw
    )
    .addDropDown(
        panelParametersTitle.chooseDemo,
        demoNames,
        draw
    )
    .addNumber(
        panelParametersTitle.prngParameters.middleSquare.seed,
        0,
        9999999999,
        defaultPRNGParameters.middleSquare.seed,
        1,
    )
    .addNumber(
        panelParametersTitle.prngParameters.linearCongruential.seed,
        0,
        9999999999,
        defaultPRNGParameters.linearCongruential.seed,
        1,
    )
    .addNumber(
        panelParametersTitle.prngParameters.seedrandom.seed,
        0,
        9999999999,
        defaultPRNGParameters.seedrandom.seed,
        1,
    )
    .addColor(
        panelParametersTitle.demoParameters.randomPixels.backgroundColor,
        defaultDemoParameters.randomPixels.backgroundColor,
    )
    .addColor(
        panelParametersTitle.demoParameters.randomPixels.pixelColor,
        defaultDemoParameters.randomPixels.pixelColor,
    )
    .addColor(
        panelParametersTitle.demoParameters.randomСircles.backgroundColor,
        defaultDemoParameters.randomСircles.backgroundColor,
    )
    .addColor(
        panelParametersTitle.demoParameters.randomСircles.cirlceColor,
        defaultDemoParameters.randomСircles.cirlceColor,
    )
    .addBoolean(
        panelParametersTitle.demoParameters.randomСircles.doInsideCircle,
        defaultDemoParameters.randomСircles.doInsideCircle,
    )
    .addColor(
        panelParametersTitle.demoParameters.randomСircles.insideCircleColor,
        defaultDemoParameters.randomСircles.insideCircleColor,
    )
    .addButton(
        'Draw',
        draw
    );


const getPanelParameters = {
    prng: () => {
        return panel.getValue(
            panelParametersTitle.choosePRNG
        )
    },
    demo: () => {
        return panel.getValue(
            panelParametersTitle.chooseDemo
        )
    },
    middleSquareSeed: () => {
        return panel.getValue(
            panelParametersTitle.prngParameters.middleSquare.seed
        )
    },
    linearCongruentialSeed: () => {
        return panel.getValue(
            panelParametersTitle.prngParameters.linearCongruential.seed
        )
    },
    seedrandomSeed: () => {
        return panel.getValue(
            panelParametersTitle.prngParameters.seedrandom.seed
        )
    },
    pixelRandomSettings: {
        backgroundColor: () => {
            return panel.getValue(
                panelParametersTitle.demoParameters.randomPixels.backgroundColor
            )
        },
        pixelColor: () => {
            return panel.getValue(
                panelParametersTitle.demoParameters.randomPixels.pixelColor
            )
        },
    },
    randomСirclesSettings: {
        backgroundColor: () => {
            return panel.getValue(
                panelParametersTitle.demoParameters.randomСircles.backgroundColor
            )
        },
        cirlceColor: () => {
            return panel.getValue(
                panelParametersTitle.demoParameters.randomСircles.cirlceColor
            )
        },
        doInsideCircle: () => {
            return panel.getValue(
                panelParametersTitle.demoParameters.randomСircles.doInsideCircle
            )
        },
        insideCircleColor: () => {
            return panel.getValue(
                panelParametersTitle.demoParameters.randomСircles.insideCircleColor
            )
        },
    },
};

function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function getCurrentPrng() {
    switch (getPanelParameters.prng().value) {
        case prngNames[0]:
            panel.showControl(
                panelParametersTitle.prngParameters.middleSquare.seed
            );
            panel.hideControl(
                panelParametersTitle.prngParameters.linearCongruential.seed
            );
            panel.hideControl(
                panelParametersTitle.prngParameters.seedrandom.seed
            );
            return prngMiddleSquare;
        case prngNames[1]:
            panel.showControl(
                panelParametersTitle.prngParameters.linearCongruential.seed
            );
            panel.hideControl(
                panelParametersTitle.prngParameters.middleSquare.seed
            );
            panel.hideControl(
                panelParametersTitle.prngParameters.seedrandom.seed
            );
            return prngLinearCongruential;
        case prngNames[2]:
            panel.showControl(
                panelParametersTitle.prngParameters.seedrandom.seed
            );
            panel.hideControl(
                panelParametersTitle.prngParameters.middleSquare.seed
            );
            panel.hideControl(
                panelParametersTitle.prngParameters.linearCongruential.seed
            );
            return prngSeedrandom;
    }
}

function getCurrentSeed() {
    switch (getPanelParameters.prng().value) {
        case prngNames[0]:
            return getPanelParameters.middleSquareSeed();
        case prngNames[1]:
            return getPanelParameters.linearCongruentialSeed();
        case prngNames[2]:
            return getPanelParameters.seedrandomSeed();
    }
}

function draw() {
    clearCanvas(context);
    const currentPRNG = getCurrentPrng();
    const currentSeed = getCurrentSeed();
    const currentDemo = getPanelParameters.demo().value;

    switch (currentDemo) {
        case demoNames[0]:
            panel.showControl(
                panelParametersTitle.demoParameters.randomPixels.backgroundColor
            )
            panel.showControl(
                panelParametersTitle.demoParameters.randomPixels.pixelColor
            )
            panel.hideControl(
                panelParametersTitle.demoParameters.randomСircles.backgroundColor
            )
            panel.hideControl(
                panelParametersTitle.demoParameters.randomСircles.cirlceColor
            )
            panel.hideControl(
                panelParametersTitle.demoParameters.randomСircles.doInsideCircle
            )
            panel.hideControl(
                panelParametersTitle.demoParameters.randomСircles.insideCircleColor
            )
            demoRandomPixels(
                getCurrentPrng(),
                currentSeed,
                context,
                getPanelParameters.pixelRandomSettings
            )
            break;
        case demoNames[1]:
            panel.showControl(
                panelParametersTitle.demoParameters.randomСircles.backgroundColor
            )
            panel.showControl(
                panelParametersTitle.demoParameters.randomСircles.cirlceColor
            )
            panel.showControl(
                panelParametersTitle.demoParameters.randomСircles.doInsideCircle
            )
            panel.showControl(
                panelParametersTitle.demoParameters.randomСircles.insideCircleColor
            )
            panel.hideControl(
                panelParametersTitle.demoParameters.randomPixels.backgroundColor
            )
            panel.hideControl(
                panelParametersTitle.demoParameters.randomPixels.pixelColor
            )
            demoRandomCircles(
                currentPRNG,
                currentSeed,
                context,
                getPanelParameters.randomСirclesSettings
            )
            break;
    }
}

draw();