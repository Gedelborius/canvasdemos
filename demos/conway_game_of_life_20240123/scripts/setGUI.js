function setGUI(scene) {
    const gui = new dat.GUI();
    const restartButton = gui.add(scene, 'Restart');
    const pauseButton = gui.add(scene, 'Pause');
    const choosePreset = gui.add(
        scene,
        'Choose Preset',
        ['Pure Random', 'Glider', 'Two Gliders', 'Static Figures', 'Dynamic Figures', 'Gosper Glider Gun'],
    ).onChange(string => {
        if (string === 'Pure Random') {
            scene.start(scene, null);
        } else {
            scene.start(scene, { grid: gridPresets[string] });
        }
    });
    const fColors = gui.addFolder('Colors');
    const colorsKeys = Object.keys(scene.color);
    for (let i = 0; i < colorsKeys.length; i++) {
        fColors.addColor(scene.color, colorsKeys[i]);
    }
    const fGameSettings = gui.addFolder('Game Settings');
    fGameSettings.add(scene, 'No Boundaries')
    // const fGameSpeed = fGameSettings.addFolder('Game Speed');
    const speedKey = 'stepsPerSecond';
    fGameSettings.add(
        scene,
        speedKey,
        1,
        60
    ).onChange(_ => {
        render.set.fps(scene[speedKey]);
        if (scene.pause === false) {
            render.restart();
        }
    })

    const fModelSettings = gui.addFolder('Cell Settings');
    const fCell = fModelSettings.add(
        scene.cell,
        'isEllipse',
    )

    // const fTest = gui.addFolder('TEST');
    // fTest.add(scene, 'stringTest').onChange(_ => {
    //     console.log(scene);
    // });
    // const test = fTest.add(scene, 'numberTest', null, null, 123)
    // console.log("test: ", test)
    // const test2 = fTest.add(scene, 'testOptions', ['1', '2', '3']).onChange(_ => {
    //     console.log(scene)
    // });
    // console.log("test2: ", test2)
    // fTest.add(scene, 'functionTest', 'НАЖМИ МЕНЯ', 'TEST');


    return gui;
}
