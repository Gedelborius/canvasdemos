const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    particles = [],
    particleRadius = 10,
    numParticles = 100;

for (let i = 0; i < numParticles; i++) {
    particles.push(
        particle.create(
            width / 2,
            height / 2,
            Math.random() * 4 + 1,
            Math.random() * Math.PI * 2
        )
    );
}

function checkBounds(particle, context, particleRadius) {
    const top = 0 + particleRadius;
    const right = context.canvas.width - particleRadius;
    const bottom = context.canvas.height - particleRadius;
    const left = 0 + particleRadius;

    if (particle.position.x < left) {
        particle.position.x = left;
        particle.velocity.multiplyBy(-1);
    }
    if (particle.position.y < top) {
        particle.position.y = top;
        particle.velocity.multiplyBy(-1);
    }
    if (particle.position.x > right) {
        particle.position.x = right;
        particle.velocity.multiplyBy(-1);
    }
    if (particle.position.y > bottom) {
        particle.position.y = bottom;
        particle.velocity.multiplyBy(-1);
    }
}

function update() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        checkBounds(p, context, particleRadius);
        p.update();
        context.beginPath();
        context.arc(
            p.position.x,
            p.position.y,
            particleRadius,
            0,
            Math.PI * 2,
            false
        )
        context.fill();
    }
    requestAnimationFrame(update);
}

update();