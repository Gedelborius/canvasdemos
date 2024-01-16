/**
 * incoming parameters: 
 * - prng (function that return random number on call)
 * - seed (number for prng seed),
 * - cContext (canvas context to canvas operations)
 * - settings (a set of parameters for demo):
 * - - backgroundColor (string for background color),
 * - - pixelColor (string for pixel color)
 */
function demoRandomPixels(prng, seed, context, settings) {
    const nextRandomFloat = prng(seed);
    context.fillStyle = settings.backgroundColor();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = settings.pixelColor();
    for (let y = 0; y < context.canvas.height; y++) {
        for (let x = 0; x < context.canvas.width; x++) {
            if (nextRandomFloat() < 0.5) {
                context.fillRect(x, y, 1, 1);
            }
        }
    }
}