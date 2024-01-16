function setLineSettings(canvasObject, sceneObject) {
    return {
        x: getRandomInt(
            0,
            canvasObject.canvas.back.width
        ),
        y: canvasObject.canvas.back.height / 2 + sceneObject.line.parameters.height.min,
        width: getRandomInt(
            sceneObject.line.parameters.width.min,
            sceneObject.line.parameters.width.max
        ),
        height: getRandomInt(
            sceneObject.line.parameters.height.min,
            sceneObject.line.parameters.height.max
        ),
        hue: getRandomInt(
            120,
            180
        ),
        ttl: getRandomInt(
            sceneObject.line.parameters.ttl.min,
            sceneObject.line.parameters.ttl.max
        ),
        life: 0
    }
}