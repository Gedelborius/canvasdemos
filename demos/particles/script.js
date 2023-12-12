const canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight,
particles = [],
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

function update() {
    context.clearRect(0,0,width,height);
    for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.update();
        context.beginPath();
        context.arc(
            p.position.getX(),
            p.position.getY(),
            10,
            0,
            Math.PI * 2,
            false
        )
        context.fill();
    }
    requestAnimationFrame(update);
}

update();