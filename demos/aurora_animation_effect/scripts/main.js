
const defaultParameters = {
    scene: {
        background: {
            color: '#000000'
        },
        line: {
            array: null,
            parameters: {
                count: null,
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
    let sceneObject = {
        ...defaultParameters.scene
    }

    resizeReset(canvasObject, sceneObject);
    animationLoop(canvasObject, sceneObject);
    window.addEventListener("resize", () => resizeReset(canvasObject, sceneObject));
}

initialization(start);