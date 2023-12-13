const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = 600,
    height = canvas.height = 600,
    panelParametersName = {
        prngDemo: 'Choose PRNG demo: ',
    },
    prngDemoName = [
        'None',
        'Middle Square',
        'Linear Congruentiol',
        'Seedrandom - Circles in random place'
    ],
    panel = QuickSettings.create()
        .addDropDown(
            panelParametersName.prngDemo,
            prngDemoName,
            draw
        ),
    getPanelParameters = {
        prngDemo: () => {
            return panel.getValue(
                panelParametersName.prngDemo
            )
        },
        somethingElse: () => console.log('Something else!')
    }
console.log(getPanelParameters.prngDemo())

// panel.hideControl('Choose PRNG demo:');

function draw() {
    const currentDemo = getPanelParameters.prngDemo().value;
    switch (currentDemo) {
        case prngDemoName[1]:
            window.prngCanvasDemos.middleSquare();
            break;
        case prngDemoName[2]:
            window.prngCanvasDemos.linearCongruential()
            break;
        case prngDemoName[3]:
            window.prngCanvasDemos.circlesInRandomPlace_seedrandom(123)
            break;
    }

    // window.prngCanvasDemos.middleSquare();
    // window.prngCanvasDemos.linearCongruential();
    // window.prngCanvasDemos.circlesInRandomPlace_seedrandom(123);
}

draw();