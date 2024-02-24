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
            scene.start(scene);
        } else {
            scene.start(scene, gridPresets[string]);
        }
    });
    const fColors = gui.addFolder('Colors');
    const colorsKeys = Object.keys(scene.color);
    for (let i = 0; i < colorsKeys.length; i++) {
        fColors.addColor(scene.color, colorsKeys[i]);
    }
    const fGameSettings = gui.addFolder('Game Settings');
    fGameSettings.add(scene, 'No Boundaries')
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
    );
    return gui;
}
