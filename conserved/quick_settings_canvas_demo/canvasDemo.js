const canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

const parametersName = {
    backgroundColor: 'backgroundColor',
    textColor: 'textColor',
    fontSize: 'fontSize',
    font: 'font',
    iter: 'iter',
    scale: 'scale',
    angle0: 'angle0',
    angle1: 'angle1',
    angle2: 'angle2',
    shadow: 'shadow'
};

const panel = QuickSettings
                         .create()
                         .addColor(parametersName.backgroundColor, defaultParameters.backgroundColor, draw)
                         .addColor(parametersName.textColor, defaultParameters.textColor, draw)
                         .addRange(parametersName.fontSize, 10, 200, defaultParameters.fontSize, 1, draw)
                         .addText(parametersName.font, defaultParameters.font, draw)
                         .addRange(parametersName.iter, 1, 7, defaultParameters.iter, 1, draw)
                         .addRange(parametersName.scale, 0, 1, defaultParameters.scale, 0.1, draw)
                         .addRange(parametersName.angle0, 0, Math.PI*2, defaultParameters.angles[0], 0.01, draw)
                         .addRange(parametersName.angle1, 0, Math.PI*2, defaultParameters.angles[1], 0.01, draw)
                         .addRange(parametersName.angle2, 0, Math.PI*2, defaultParameters.angles[2], 0.01, draw)
                         .addBoolean(parametersName.shadow, defaultParameters.shadow, draw);

const panelParameters = {
    backgroundColor: () => panel.getValue(parametersName.backgroundColor),
    textColor: () => panel.getValue(parametersName.textColor),
    fontSize: () => panel.getValue(parametersName.fontSize),
    font: () => panel.getValue(parametersName.font),
    iter: () => panel.getValue(parametersName.iter),
    scale: () => panel.getValue(parametersName.scale),
    angles: [
        () => panel.getValue(parametersName.angle0),
        () => panel.getValue(parametersName.angle1),
        () => panel.getValue(parametersName.angle2)
    ],
    shadow: () => panel.getValue(parametersName.shadow)
}

function setShadow(isOn, inputContext) {
    if (isOn) {
        inputContext.shadowOffsetX = 3;
        inputContext.shadowOffsetY = 3;
        inputContext.shadowBlur = 5;
        inputContext.shadowColor = 'rgba(0,0,0,0.5)';
    } else {
        inputContext.shadowOffsetX = null;
        inputContext.shadowOffsetY = null;
        inputContext.shadowBlur = null;
        inputContext.shadowColor = null;
    }
}

function iterate(iter) {
    for (let i = 0; i < panelParameters.angles.length; i++) {
        const angle = panelParameters.angles[i]();
        context.save();
        context.rotate(angle);
        context.translate(defaultParameters.dist, 0);
        context.fillText(defaultParameters.text, 0, 0);
        if (iter > 0) {
            const scale = panelParameters.scale();
            context.scale(scale, scale);
            iterate(iter - 1);
        }
        context.restore();
    }
}

function draw() {
    context.fillStyle = panelParameters.backgroundColor();
    context.fillRect(0, 0, width, height);
    context.fillStyle = panelParameters.textColor();
    context.font = panelParameters.fontSize() + 'px ' + panelParameters.font();
    setShadow(panelParameters.shadow(), context);
    context.save();
    context.translate(width / 2, height / 2);
    iterate(panelParameters.iter());
    context.restore();
}

draw();