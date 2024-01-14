function resizeReset(canvasObject, sceneObject) {
    canvasObject.canvas.back.width = window.innerWidth;
    canvasObject.canvas.back.height = window.innerHeight;
    canvasObject.renderingContext2D.back.drawImage(canvasObject.canvas.front, 0, 0)

    canvasObject.canvas.front.width = window.innerWidth;
    canvasObject.canvas.front.height = window.innerHeight;

    canvasObject.renderingContext2D.front.drawImage(canvasObject.canvas.back, 0, 0)

    sceneObject.line.array = [];
    sceneObject.line.count = canvasObject.canvas.back.width / sceneObject.line.parameters.width.min * 5;

    for (let i = 0; i < sceneObject.line.count; i++) {
        sceneObject.line.array.push(new Line(setLineSettings(canvasObject, sceneObject)));
    }
}