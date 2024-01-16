function initialization(startFunction) {
    let isListenerAdded = false;

    function afterDOMContentLoaded() {
        if (isListenerAdded) {
            document.removeEventListener('DOMContentLoaded', afterDOMContentLoaded)
            isListenerAdded = false;
        }
        startFunction();
    }

    if (document.readyState !== 'loading') {
        afterDOMContentLoaded();
    } else {
        isListenerAdded = true;
        document.addEventListener('DOMContentLoaded', afterDOMContentLoaded)
    }
}

function render(callback, fps = 60) {
    const interval = 1000 / fps;
    let thenTimeStamp = 0;
    const frameCallback = (nowTimeStamp) => {
        const deltaTime = nowTimeStamp - thenTimeStamp;
        if (deltaTime >= interval) {
            thenTimeStamp = nowTimeStamp - (deltaTime % interval);
            callback();
        }
        requestAnimationFrame(frameCallback);
    }
    requestAnimationFrame(frameCallback);
}

function setBackgroundColorToBody(color) {
    document.querySelector('body').style.backgroundColor = color;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function checkDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const utils = {
    norm: function (value, min, max) {
        return (value - min) / (max - min);
    },
    lerp: function (norm, min, max) {
        return (max - min) * norm + min;
    },
    map: function (value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(
            utils.norm(
                value, sourceMin, sourceMax
            ),
            destMin,
            destMax
        );
    },
    clamp: function (value, min, max) {
        return Math.min(
            Math.max(
                value,
                Math.min(min, max)
            ),
            Math.max(min, max)
        )
    },
    distance: function (p0, p1) {
        const dx = p1.x - p0.x;
        const dy = p1.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    distanceXY: function (x0, y0, x1, y1) {
        const dx = x1 - x0;
        const dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },
    circleCollision: function (c0, c1) {
        return utils.distance(c0, c1) <= c0.r + c1.r;
    },
    circlePointCollision: function (x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) < circle.r;
    },
    inRange: function (value, min, max) {
        return value >= Math.min(min, max) &&
            value <= Math.max(min, max);
    },
    pointInRect: function (x, y, rect) {
        return utils.inRange(x, rect.x, rect.x + rect.width) &&
            utils.inRange(y, rect.y, rect.y + rect.height);
    },
    rangeIntersect: function (min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) &&
            Math.min(min0, max0) <= Math.max(min1, max1);
    },
    rectIntersect: function (r0, r1) {
        return utils.rangeIntersect(
            r0.x,
            r0.x + r0.width,
            r1.x,
            r1.x + r1.width
        ) &&
            utils.rangeIntersect(
                r0.y,
                r0.y + r0.height,
                r1.y,
                r1.y + r1.height
            );
    },
    degreesToRads: function (degrees) {
        return degrees / 180 * Math.PI;
    },
    radsToDegrees: function (radians) {
        return radians * 180 / Math.PI;
    },
    randomRange: function (min, max) {
        return min + Math.random() * (max - min);
    },
    randomInt: function (min, max) {
        return Math.floor(
            min + Math.random() * (max - min + 1)
        );
    },
    randomDist: function (min, max, iterations) {
        let total = 0;
        for (let i = 0; i < iterations; i += 1) {
            total += utils.randomRange(min, max);
        }
        return total / iterations;
    }
}

/*

return utils.inRange(x, rect.x, rect.x + rect.width) &&
            utils.inRange(y, rect.y, rect.y + rect.height);

*/