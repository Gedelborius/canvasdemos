/**
 * incoming parameters: 
 * - prng (function that return random number on call)
 * - seed (number for prng seed),
 * - cContext (canvas context to canvas operations)
 * - settings (a set of parameters for demo):
 * - - backgroundColor (string for background color),
 * - - cirlceColor (string for cirlce color),
 * - - doInsideCircle (boolean to do inside circle),
 * - - insideCircleColor (string for inside cirlce color),
 */
function demoRandomCircles(prng, seed, context, settings) {
    const nextRandomFloat = prng(seed);
    context.fillStyle = settings.backgroundColor();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    function drawCircle(x, y, r, color = '#000000') {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();
    }
    for (let i = 0; i < 50; i++) {
        const x = nextRandomFloat() * context.canvas.width;
        const y = nextRandomFloat() * context.canvas.height;
        const r = 20 + nextRandomFloat() * 50;
        drawCircle(x, y, r, settings.cirlceColor());
        if (settings.doInsideCircle()) {
            drawCircle(x, y, r - 20, settings.insideCircleColor());
        }
    };
}