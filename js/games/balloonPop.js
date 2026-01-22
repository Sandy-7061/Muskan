// ============================================
// BALLOON POP GAME
// Pop balloons with sound effects!
// ============================================

class BalloonGame {
    constructor() {
        this.modal = document.getElementById('balloon-modal');
        this.content = document.getElementById('balloon-content');
        this.balloons = [];
        this.score = 0;
        this.targetScore = 20;
        this.gameActive = false;
    }

    start() {
        this.score = 0;
        this.balloons = [];
        this.gameActive = true;
        this.render();
        Utils.openModal('balloon-modal');
        this.createBalloons();
    }

    render() {
        this.content.innerHTML = `
            <div class="balloon-game-container">
                <div class="game-instruction">Pop all the balloons! 🎈</div>
                <div class="game-score">Popped: <span id="balloon-score">${this.score}</span>/${this.targetScore}</div>
                <div id="balloon-area" class="balloon-area"></div>
                <div id="balloon-result"></div>
            </div>
        `;
    }

    createBalloons() {
        const area = document.getElementById('balloon-area');
        const colors = ['#FFB6D9', '#D4ADFC', '#F4D9A6', '#FF6B9D', '#B8E6FF', '#FFE66D'];

        for (let i = 0; i < this.targetScore; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.dataset.id = i;

            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.background = `linear-gradient(135deg, ${color} 0%, ${this.adjustColor(color, -20)} 100%)`;

            // Random position
            balloon.style.left = (Math.random() * 80 + 5) + '%';
            balloon.style.animationDelay = (Math.random() * 2) + 's';
            balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';

            // Click handler
            balloon.addEventListener('click', () => this.popBalloon(balloon, i));

            area.appendChild(balloon);
            this.balloons.push(balloon);
        }
    }

    popBalloon(balloon, id) {
        if (!balloon.classList.contains('popped')) {
            balloon.classList.add('popped');
            this.score++;

            // Play pop sound
            this.playPopSound();

            // Create pop effect
            this.createPopEffect(balloon);

            // Remove balloon
            setTimeout(() => balloon.remove(), 300);

            // Update score
            document.getElementById('balloon-score').textContent = this.score;

            // Check if all popped
            if (this.score >= this.targetScore) {
                setTimeout(() => this.onComplete(), 500);
            }
        }
    }

    playPopSound() {
        // Play user's uploaded pop sound
        const audio = new Audio('assets/music/Ballon_pop_sond.wav');
        audio.volume = 0.4;
        audio.play().catch(() => {
            // If no sound file, create a beep
            this.createBeepSound();
        });
    }

    createBeepSound() {
        // Create a simple beep using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    createPopEffect(balloon) {
        const rect = balloon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create particle burst
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'balloon-particle';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.background = balloon.style.background;

            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 50 + Math.random() * 30;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 500);
        }
    }

    adjustColor(color, percent) {
        // Simple color adjustment
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    onComplete() {
        const resultDiv = document.getElementById('balloon-result');

        resultDiv.innerHTML = `
            <div class="balloon-complete animate-bounceIn">
                <h4>🎉 All Balloons Popped! 🎉</h4>
                <p class="romantic-text">
                    Just like these balloons, my love for you keeps rising higher and higher! 🎈💕
                </p>
                <p>You popped all ${this.targetScore} balloons! You're amazing!</p>
                <button class="next-photo-btn" onclick="balloonGame.close()">
                    Continue ✨
                </button>
            </div>
        `;

        Utils.createConfetti();
    }

    close() {
        Utils.closeModal('balloon-modal');
        Utils.showNotification('🎈 Balloon game completed!');
    }
}

// Global instance
let balloonGame;

// Global function for onclick handlers
function startBalloonGame() {
    if (!balloonGame) {
        balloonGame = new BalloonGame();
    }
    balloonGame.start();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    balloonGame = new BalloonGame();
});
