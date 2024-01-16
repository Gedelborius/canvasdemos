function fadeInOut(t, m) {
    const hm = 0.5 * m;
    return Math.abs((t + hm) % m - hm) / hm;
}

class Line {
    constructor(
        settings
    ) {
        this.x = settings.x;
        this.y = settings.y;
        this.width = settings.width;
        this.height = settings.height;
        this.hue = settings.hue;
        this.ttl = settings.ttl;
        this.life = settings.life;
    }
    draw(renderingContext2D) {
        let gradient;
        gradient = renderingContext2D.createLinearGradient(this.x, this.y - this.height, this.x, this.y);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 65%, 0`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 65%, ${fadeInOut(this.life, this.ttl)})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 65%, 0)`);

        renderingContext2D.save();
        renderingContext2D.beginPath();
        renderingContext2D.strokeStyle = gradient;
        renderingContext2D.lineWidth = this.width;
        renderingContext2D.moveTo(this.x, this.y - this.height);
        renderingContext2D.lineTo(this.x, this.y);
        renderingContext2D.stroke();
        renderingContext2D.closePath();
        renderingContext2D.restore();
    }
    update(canvasObject, sceneObject) {
        this.life++;
        if (this.life > this.ttl) {
            this.life = 0;
            this.x = getRandomInt(0, canvasObject.canvas.back.width);
            this.width = getRandomInt(
                sceneObject.line.parameters.width.min,
                sceneObject.line.parameters.width.max
            );
        }
    }
}