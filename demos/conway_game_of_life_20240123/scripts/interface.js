function setGUI(scene) {
    const gui = new dat.GUI();
    const fColors = gui.addFolder('Colors');
    const colorsKeys = Object.keys(scene.color);
    for (let i = 0; i < colorsKeys.length; i++) {
        fColors.addColor(scene.color, colorsKeys[i]);
    }
    const fGameSettings = gui.addFolder('Game Settings');
    fGameSettings.add(
        scene,
        'stepsPerSecond',
        1,
        60
    ).onChange(_ => {
        scene.pause = false;
        render.set.fps(scene.speed);
        render.restart();
    })
    const fModelSettings = gui.addFolder('Model Settings');
    const fCell = fModelSettings.add(
        scene.model.cell,
        'isEllipse',
    )
    return gui;
}

const interface = (_ => {

    function addButton(completionCallback, insertFirst = false, styleString = null) {
        const body = document.querySelector('body');
        const button = document.createElement('button');

        button.innerHTML = 'STOP STEPS';

        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            completionCallback();
        });

        if (styleString !== null && typeof styleString === 'string') {
            button.setAttribute(
                'style',
                styleString
            )
        }

        if (insertFirst) {
            body.insertBefore(button, body.firstChild);
        } else {
            body.appendChild(button);
        }

        return button;
    }

    return {
        addButton
    }
})()

