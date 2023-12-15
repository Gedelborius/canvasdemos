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

function checkBounds(particle, context,) {
    if (particle.position.getX() < 0 + 10) {
        particle.position.setX(0 + 10);
        particle.velocity.multiplyBy(-1);
    }
    if (particle.position.getY() < 0 + 10) {
        particle.position.setY(0 + 10);
        particle.velocity.multiplyBy(-1);
    }
    if (particle.position.getX() > context.canvas.width - 10) {
        particle.position.setX(context.canvas.width - 10);
        particle.velocity.multiplyBy(-1);
    }
    if (particle.position.getY() > context.canvas.height - 10) {
        particle.position.setY(context.canvas.height - 10);
        particle.velocity.multiplyBy(-1);
    }
}

function update() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        checkBounds(p, context);
        p.update();
        context.beginPath();
        context.arc(
            p.position.getX(),
            p.position.getY(),
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