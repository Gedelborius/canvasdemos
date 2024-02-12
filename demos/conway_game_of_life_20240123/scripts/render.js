const render = (_ => {
    let completionCallback = null;
    let requestAnimationFrameId = null;
    let framePerSecond = null;
    let interval = null;
    let thenTimeStamp = 0;

    function changeInterval() {
        interval = 1000 / framePerSecond;
    }

    const set = {
        callback: function (f = null) {
            if (f !== null && typeof f === 'function') {
                completionCallback = f;
            }
        },
        fps: function (n = null) {
            if (n !== null && typeof n === 'number' && n > 0) {
                framePerSecond = n;
                changeInterval();
            }
        }
    }

    function frameCallback(nowTimeStamp = 0) {
        const deltaTime = nowTimeStamp - thenTimeStamp;
        if (deltaTime >= interval) {
            thenTimeStamp = nowTimeStamp - (deltaTime % interval);
            if (completionCallback !== null && typeof completionCallback === 'function') {
                completionCallback();
            }
        }
        requestAnimationFrameId = requestAnimationFrame(frameCallback);
    };

    function start(callback = null, fps = null) {
        if (requestAnimationFrameId === null) {
            if (callback !== null && typeof callback === 'function') {
                set.callback(callback);
            }
            if (fps !== null && typeof fps === 'number') {
                set.fps(fps);
            }
            if (completionCallback !== null && typeof completionCallback === 'function' && framePerSecond !== null && typeof framePerSecond === 'number') {
                changeInterval();
                frameCallback();
            }
        }
    };

    function stop() {
        if (requestAnimationFrameId !== null && typeof requestAnimationFrameId === 'number') {
            cancelAnimationFrame(requestAnimationFrameId);
            requestAnimationFrameId = null;
        }
    };

    function restart(callback = null, fps = null) {
        stop();
        start(callback, fps);
    }

    return {
        set,
        start,
        stop,
        restart
    }
})()