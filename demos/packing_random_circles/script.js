const canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

const defaultParameters = {
    radiusMinimum: 20,
    radiusMaximum: 50,
    backgroundColor: '#fffddd',
    circleColor: '#000000',
    shadow: true,
    hideBigCircles: false
}

const parametersName = {
    radiusMinimum: 'radiusMinimum',
    radiusMaximum: 'radiusMaximum',
    backgroundColor: 'backgroundColor',
    circleColor: 'circleColor',
    shadow: 'shadow',
    hideBigCircles: 'hideBigCircles',
};

let circles = [];

const panel = QuickSettings
                           .create()
                           .addButton('Start', draw)
                           .addRange(parametersName.radiusMinimum, 5, 100, defaultParameters.radiusMinimum, 1)
                           .addRange(parametersName.radiusMaximum, 5, 100, defaultParameters.radiusMaximum, 1)
                           .addColor(parametersName.backgroundColor, defaultParameters.backgroundColor)
                           .addColor(parametersName.circleColor, defaultParameters.circleColor)
                           .addBoolean(parametersName.shadow, defaultParameters.shadow)
                        //    .addBoolean(parametersName.hideBigCircles, defaultParameters.hideBigCircles);

const getPanelParameters = {
    radiusMinimum: () => panel.getValue(parametersName.radiusMinimum),
    radiusMaximum: () => panel.getValue(parametersName.radiusMaximum),
    backgroundColor: () => panel.getValue(parametersName.backgroundColor),
    circleColor: () => panel.getValue(parametersName.circleColor),
    shadow: () => panel.getValue(parametersName.shadow),
}

function setUpBackground() {
    context.fillStyle = getPanelParameters.backgroundColor();
    context.fillRect(0, 0, width, height);
}
      
function setUpShadow() {
    if (getPanelParameters.shadow()) {
        context.shadowColor = "rgba(0,0,0,0.5)";
        context.shadowOffsetX = 5;
        context.shadowOffsetX = 5;
        context.shadowBlur = 10;
    } else {
        context.shadowColor = null;
        context.shadowOffsetX = null;
        context.shadowOffsetX = null;
        context.shadowBlur = null;
    }
}

function setCircleRandomXY(circle, xRange, yRange) {
    circle.x = Math.random() *xRange;
    circle.y = Math.random() *yRange;
}

function createCircle() {
    let circle = {
        x: 0,
        y: 0,
        r: getPanelParameters.radiusMinimum()
    }
    setCircleRandomXY(circle, width, height);
    return circle;
}

function isValid(circle) {
    if (circle.r > getPanelParameters.radiusMaximum()) return false;
    for (let i = 0; i < circles.length; i++) {
        const circle2 = circles[i],
              dx = circle2.x - circle.x,
              dy = circle2.y - circle.y,
              dist = Math.sqrt(dx * dx + dy * dy);
        if ( dist < circle2.r + circle.r ) return false;
    }
    return true;
}

function drawCirlces() {
    const circle = createCircle();
    let counter = 0;
    while (!isValid(circle)) {
        setCircleRandomXY(circle, width, height);
        counter++;
        if (counter > 1000) return;
    }
    while(isValid(circle)) circle.r++;
    circle.r -= 2;
    circles.push(circle);
    // if (circle.r <= max * 0.5) {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        context.fillStyle = getPanelParameters.circleColor();
        context.fill();
    // }
    requestAnimationFrame(drawCirlces);
}

function draw() {
    circles = [];
    setUpBackground();
    setUpShadow();
    drawCirlces();
}