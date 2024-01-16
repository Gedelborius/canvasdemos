const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    particles = [];

const defaultParameters = {
    backgroundColor: '#ffffff',
    particleColor: '#000000',
    particlesNumber: {
        min: 1,
        max: 150,
        value: 50,
        step: 1
    },
    particleRadius: {
        min: 1,
        max: 50,
        value: 10,
        step: 1,
    },
    randomSpawn: false,
    pause: false,
}

const panelTitles = {
    backgroundColor: 'Background color',
    particleColor: 'Particle color',
    particlesNumber: 'Particles number',
    particleRadius: 'Particle radius',
    randomSpawn: 'Random spawn',
    pause: 'Pause',
    restart: 'Restart',
}

const panel = QuickSettings.create(0, 0, 'Move me (Double click - hide)')
    .addColor(
        panelTitles.backgroundColor,
        defaultParameters.backgroundColor
    )
    .addColor(
        panelTitles.particleColor,
        defaultParameters.particleColor
    )
    .addRange(
        panelTitles.particlesNumber,
        defaultParameters.particlesNumber.min,
        defaultParameters.particlesNumber.max,
        defaultParameters.particlesNumber.value,
        defaultParameters.particlesNumber.step,
        (particlesNumber) => createParticles(particlesNumber)
    )
    .addRange(
        panelTitles.particleRadius,
        defaultParameters.particleRadius.min,
        defaultParameters.particleRadius.max,
        defaultParameters.particleRadius.value,
        defaultParameters.particleRadius.step
    )
    .addBoolean(
        panelTitles.randomSpawn,
        defaultParameters.randomSpawn
    )
    .addBoolean(
        panelTitles.pause,
        defaultParameters.pause
    )
    .addButton(
        panelTitles.restart,
        start
    );

const getPanelValue = {
    backgroundColor: () => panel.getValue(
        panelTitles.backgroundColor
    ),
    particleColor: () => panel.getValue(
        panelTitles.particleColor
    ),
    particlesNumber: () => panel.getValue(
        panelTitles.particlesNumber
    ),
    particleRadius: () => panel.getValue(
        panelTitles.particleRadius
    ),
    randomSpawn: () => panel.getValue(
        panelTitles.randomSpawn
    ),
    pause: () => panel.getValue(
        panelTitles.pause
    )
}

let updateRequest = null;

function createParticles(particlesNumber) {
    const addedParticlesNumber = particlesNumber - particles.length;
    if (addedParticlesNumber > 0) {
        let spawn = {};
        if (getPanelValue.randomSpawn()) {
            spawn.x = Math.random() * width;
            spawn.y = Math.random() * height;
        } else {
            spawn.x = width / 2;
            spawn.y = height / 2;
        }
        for (let i = 0; i < addedParticlesNumber; i++) {
            particles.push(
                particle.create(
                    spawn.x,
                    spawn.y,
                    Math.random() * 4 + 1,
                    Math.random() * Math.PI * 2
                )
            );
        }
    } else {
        particles.length += addedParticlesNumber;
    }
}

function checkBounds(particle, context, particleRadius) {
    const top = 0 + particleRadius;
    const right = context.canvas.width - particleRadius;
    const bottom = context.canvas.height - particleRadius;
    const left = 0 + particleRadius;
    if (particle.position.x < left) {
        particle.position.x = left;
        particle.velocity.x *= -1;
    }
    if (particle.position.y < top) {
        particle.position.y = top;
        particle.velocity.y *= -1;
    }
    if (particle.position.x > right) {
        particle.position.x = right;
        particle.velocity.x *= -1;
    }
    if (particle.position.y > bottom) {
        particle.position.y = bottom;
        particle.velocity.y *= -1;
    }
}

function update() {
    if (!getPanelValue.pause()) {
        context.fillStyle = getPanelValue.backgroundColor();
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = getPanelValue.particleColor();
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            checkBounds(p, context, getPanelValue.particleRadius());
            p.update();
            context.beginPath();
            context.arc(
                p.position.x,
                p.position.y,
                getPanelValue.particleRadius(),
                0,
                Math.PI * 2,
                false
            )
            context.fill();
        }
    }
    // updateRequest = requestAnimationFrame(update);
}

function start() {
    if (updateRequest !== null) {
        cancelAnimationFrame(updateRequest);
    }
    particles.length = 0;
    createParticles(getPanelValue.particlesNumber());
    update();
    render(update);
}

start();