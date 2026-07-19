/* =========================================
   EK DOORDARSHI — ATMOSPHERE.JS
========================================= */

const CONFIG = {
    stars: { count: 300, minSize: 1, maxSize: 3 },
    stardust: { spawnRate: 2, life: 1200 }
};

// Starfield
const starfield = document.getElementById("starfield");

function createStar() {
    const star = document.createElement("div");
    const size = Math.random() * (CONFIG.stars.maxSize - CONFIG.stars.minSize) + CONFIG.stars.minSize;
    const types = ['', 'warm', 'cool', 'rose', 'bright'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    star.className = `star ${type}`;
    star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${2 + Math.random() * 5}s;
        animation-delay: ${Math.random() * 5}s;
    `;
    return star;
}

for (let i = 0; i < CONFIG.stars.count; i++) {
    starfield.appendChild(createStar());
}

// Shooting Stars
const shootingContainer = document.getElementById("shooting-stars");

function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.cssText = `
        left: ${Math.random() * 80}%;
        top: ${Math.random() * 50}%;
        animation-duration: ${0.8 + Math.random() * 1.2}s;
    `;
    shootingContainer.appendChild(star);
    setTimeout(() => star.remove(), 2500);
}

function scheduleShootingStar() {
    createShootingStar();
    setTimeout(scheduleShootingStar, Math.random() * 4000 + 2000);
}
scheduleShootingStar();

// Mouse Stardust — FIXED
const trailContainer = document.createElement('div');
trailContainer.id = 'stardust-trail';
document.body.appendChild(trailContainer);

let mouseX = 0, mouseY = 0;
let lastX = 0, lastY = 0;
let lastSpawn = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createStardust(x, y) {
    const dust = document.createElement('div');
    dust.className = 'stardust';
    
    const size = Math.random() * 4 + 2;
    const driftX = (Math.random() - 0.5) * 80;
    const driftY = (Math.random() - 0.5) * 80 - 30;
    
    dust.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #fff 0%, #dff8ff 50%, transparent 70%);
        box-shadow: 0 0 ${size * 2}px #dff8ff, 0 0 ${size * 4}px rgba(158,231,255,0.5);
    `;
    
    trailContainer.appendChild(dust);
    
    // Web Animations API
    const animation = dust.animate([
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)', offset: 0 },
        { opacity: 0.8, transform: `translate(calc(-50% + ${driftX * 0.3}px), calc(-50% + ${driftY * 0.3}px)) scale(1.3)`, offset: 0.3 },
        { opacity: 0.3, transform: `translate(calc(-50% + ${driftX * 0.7}px), calc(-50% + ${driftY * 0.7}px)) scale(0.8)`, offset: 0.7 },
        { opacity: 0, transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(0.2)`, offset: 1 }
    ], {
        duration: CONFIG.stardust.life,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => dust.remove();
}

function stardustLoop() {
    const now = Date.now();
    const dist = Math.hypot(mouseX - lastX, mouseY - lastY);
    
    if (dist > 3 && now - lastSpawn > CONFIG.stardust.spawnRate) {
        createStardust(mouseX, mouseY);
        lastSpawn = now;
        lastX = mouseX;
        lastY = mouseY;
    }
    
    requestAnimationFrame(stardustLoop);
}

stardustLoop();

// Mouse Glow
const mouseGlow = document.createElement('div');
mouseGlow.id = 'mouse-glow';
mouseGlow.style.cssText = `
    position: fixed;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,60,90,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    opacity: 0;
`;
document.body.appendChild(mouseGlow);

document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
    mouseGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    mouseGlow.style.opacity = '0';
});

// Parallax
let parallaxX = 0, parallaxY = 0;
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function updateParallax() {
    parallaxX += (targetX - parallaxX) * 0.03;
    parallaxY += (targetY - parallaxY) * 0.03;
    
    const moon = document.querySelector('.moon');
    const aurora = document.querySelector('.aurora');
    
    if (moon) moon.style.transform = `translate(${parallaxX * -15}px, ${parallaxY * -15}px)`;
    if (aurora) aurora.style.transform = `translate(${parallaxX * -10}px, ${parallaxY * -5}px)`;
    
    requestAnimationFrame(updateParallax);
}
updateParallax();

// Random Star Twinkle
setInterval(() => {
    const stars = document.querySelectorAll('.star');
    if (stars.length > 0) {
        const star = stars[Math.floor(Math.random() * stars.length)];
        star.style.animation = 'none';
        star.offsetHeight;
        star.style.animation = 'starBurst 0.5s ease-out';
        setTimeout(() => {
            star.style.animation = '';
        }, 500);
    }
}, 1500);

// Fog, Nebula, Particles
function createFog() {
    const container = document.createElement('div');
    container.className = 'fog-container';
    for (let i = 0; i < 3; i++) {
        const fog = document.createElement('div');
        fog.className = 'fog-layer';
        container.appendChild(fog);
    }
    document.body.appendChild(container);
}
createFog();

function createNebula() {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    document.body.insertBefore(nebula, document.body.firstChild);
}
createNebula();

function createParticles() {
    const container = document.createElement('div');
    container.id = 'particles';
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${15 + Math.random() * 20}s;
            animation-delay: ${Math.random() * -20}s;
        `;
        container.appendChild(p);
    }
    document.body.appendChild(container);
}
createParticles();

function createDust() {
    const dust = document.createElement('div');
    dust.className = 'atmospheric-dust';
    document.body.appendChild(dust);
}
createDust();

console.log('✨ Atmosphere loaded — Stardust active');