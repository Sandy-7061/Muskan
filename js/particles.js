// ============================================
// PARTICLE EFFECTS SYSTEM
// Hearts, stars, and magical particles
// ============================================

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas?.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.particleCount = Utils.isMobile() ? 10 : 20; // Reduced for performance
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.isPaused = false;
    }

    init() {
        if (!this.canvas || !this.ctx) {
            console.warn('Canvas not found');
            return;
        }

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Pause particles during scroll for better performance
        window.addEventListener('scroll', () => {
            this.isPaused = true;
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isPaused = false;
            }, 150);
        }, { passive: true });

        // Create initial particles
        this.createParticles();

        // Start animation
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const types = ['heart', 'star', 'circle'];
        const type = types[Math.floor(Math.random() * types.length)];

        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 3 + 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            type: type,
            color: this.getRandomColor(),
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2
        };
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 182, 217, ', // Pink
            'rgba(212, 173, 252, ', // Lavender
            'rgba(244, 217, 166, ', // Gold
            'rgba(255, 255, 255, '  // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    drawParticle(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate((particle.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = particle.opacity;

        if (particle.type === 'heart') {
            this.drawHeart(particle);
        } else if (particle.type === 'star') {
            this.drawStar(particle);
        } else {
            this.drawCircle(particle);
        }

        this.ctx.restore();
    }

    drawHeart(particle) {
        const size = particle.size;
        this.ctx.fillStyle = particle.color + particle.opacity + ')';

        this.ctx.beginPath();
        const topCurveHeight = size * 0.3;
        this.ctx.moveTo(0, topCurveHeight);
        // Left curve
        this.ctx.bezierCurveTo(
            0, 0,
            -size, 0,
            -size, topCurveHeight
        );
        this.ctx.bezierCurveTo(
            -size, size * 0.5,
            0, size * 0.7,
            0, size
        );
        // Right curve
        this.ctx.bezierCurveTo(
            0, size * 0.7,
            size, size * 0.5,
            size, topCurveHeight
        );
        this.ctx.bezierCurveTo(
            size, 0,
            0, 0,
            0, topCurveHeight
        );
        this.ctx.fill();
    }

    drawStar(particle) {
        const size = particle.size;
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size * 0.5;

        this.ctx.fillStyle = particle.color + particle.opacity + ')';
        this.ctx.beginPath();

        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        this.ctx.closePath();
        this.ctx.fill();
    }

    drawCircle(particle) {
        this.ctx.fillStyle = particle.color + particle.opacity + ')';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    updateParticle(particle) {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Wrap around edges
        if (particle.x < -10) particle.x = this.canvas.width + 10;
        if (particle.x > this.canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = this.canvas.height + 10;
        if (particle.y > this.canvas.height + 10) particle.y = -10;

        // Pulsate opacity
        particle.opacity += Math.sin(Date.now() * 0.001) * 0.001;
        particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity));
    }

    animate() {
        // Skip updates when paused (during scroll) for better performance
        if (!this.isPaused) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach(particle => {
                this.updateParticle(particle);
                this.drawParticle(particle);
            });
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    createBurst(x, y, count = 20) {
        // Create a burst of particles at specific position
        for (let i = 0; i < count; i++) {
            const particle = this.createParticle();
            particle.x = x;
            particle.y = y;
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 3 + 2;
            particle.speedX = Math.cos(angle) * speed;
            particle.speedY = Math.sin(angle) * speed;
            this.particles.push(particle);
        }

        // Remove excess particles after some time
        setTimeout(() => {
            this.particles = this.particles.slice(-this.particleCount);
        }, 3000);
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize particle system
let particleSystem;

document.addEventListener('DOMContentLoaded', () => {
    particleSystem = new ParticleSystem();
    particleSystem.init();
});

// Optional: Create particle burst on click (for special moments)
document.addEventListener('click', (e) => {
    if (particleSystem && Math.random() < 0.3) { // 30% chance
        particleSystem.createBurst(e.clientX, e.clientY, 15);
    }
});
