function animationLoop(canvasObject, sceneObject) {
    canvasObject.renderingContext2D.back.clearRect(
        0, 0,
        canvasObject.canvas.back.width,
        canvasObject.canvas.back.height
    )
    canvasObject.renderingContext2D.front.fillStyle = sceneObject.background.color;
    canvasObject.renderingContext2D.front.fillRect(
        0, 0,
        canvasObject.canvas.front.width,
        canvasObject.canvas.front.height
    );

    for (let i = 0; i < sceneObject.line.array.length; i++) {
        sceneObject.line.array[i].update(
            canvasObject,
            sceneObject
        );
        sceneObject.line.array[i].draw(
            canvasObject.renderingContext2D.back
        );
    }

    canvasObject.renderingContext2D.front.save();
    canvasObject.renderingContext2D.front.filter = 'blur(13px)';
    canvasObject.renderingContext2D.back.globalCompositeOperation = 'lighter';
    canvasObject.renderingContext2D.front.drawImage(canvasObject.canvas.back, 0, 0);
    canvasObject.renderingContext2D.front.restore();
}