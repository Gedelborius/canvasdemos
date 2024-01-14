
const defaultParameters = {
    scene: {
        background: {
            color: '#000000'
        },
        line: {
            array: null,
            parameters: {
                count: 0,
                width: {
                    min: 10,
                    max: 30,
                },
                height: {
                    min: 200,
                    max: 600,
                },
                ttl: {
                    min: 100,
                    max: 300
                },
                life: 0
            }
        }
    }
}

function setGUI(cvs, scene) {
    const gui = new dat.GUI();


    const fBackgroundColor = gui.addFolder('Background color');
    fBackgroundColor.addColor(scene.background, 'color');

    const fLine = gui.addFolder('Line Settings');

    const fLineWidth = fLine.addFolder('Line Width');
    fLineWidth.add(scene.line.parameters.width, 'min', 1, 1000, 1).onChange(_ => resizeReset(cvs, scene));
    fLineWidth.add(scene.line.parameters.width, 'max', 1, 1000, 1).onChange(_ => resizeReset(cvs, scene));

    const fLineHeight = fLine.addFolder('Line Height');
    fLineHeight.add(scene.line.parameters.height, 'min', 1, 1000, 1).onChange(_ => resizeReset(cvs, scene));
    fLineHeight.add(scene.line.parameters.height, 'max', 1, 1000, 1).onChange(_ => resizeReset(cvs, scene));

    const fLineTTL = fLine.addFolder('Line TTL');
    fLineTTL.add(scene.line.parameters.ttl, 'min', 1, 1000, 1).onChange(_ => resizeReset(cvs, scene));
    fLineTTL.add(scene.line.parameters.ttl, 'max', 1, 1000, 1).onChange(_ => resizeReset(cvs, scene));

    return gui;
}

function start() {
    canvasHelper.create.container('canvas_container');
    canvasHelper.create.canvas('back');
    canvasHelper.create.canvas('front');
    canvasHelper.setContext();
    canvasHelper.insertBeforeFirst.container();
    canvasHelper.insertBeforeFirst.canvas();


    let canvasObject = {
        canvas: canvasHelper.canvas(),
        renderingContext2D: canvasHelper.context()
    };
    let sceneObject = { ...defaultParameters.scene }
    const gui = setGUI(canvasObject, sceneObject);

    resizeReset(canvasObject, sceneObject);
    animationLoop(canvasObject, sceneObject);
    window.addEventListener("resize", () => resizeReset(canvasObject, sceneObject));
}

initialization(start);