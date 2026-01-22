// ============================================
// BIRTHDAY CAKE WITH CANDLES
// Blow out candles by clicking them
// ============================================

class BirthdayCake {
    constructor() {
        this.totalCandles = 20;
        this.litCandles = 20;
        this.candles = [];
    }

    init() {
        this.createCandles();
        this.updateCounter();
    }

    createCandles() {
        const container = document.getElementById('candles-container');
        if (!container) {
            console.warn('Candles container not found');
            return;
        }

        // Candles ON TOP of cake - RAISED POSITIONS
        const layers = [
            { count: 5, radius: 50, yOffset: 250 },    // Top layer - RAISED
            { count: 7, radius: 85, yOffset: 290 },    // Middle layer - RAISED  
            { count: 8, radius: 120, yOffset: 340 }    // Bottom layer - RAISED
        ];

        let candleId = 0;

        layers.forEach((layer, layerIndex) => {
            for (let i = 0; i < layer.count; i++) {
                const candle = document.createElement('div');
                candle.className = 'candle';
                candle.dataset.id = candleId;
                candle.title = 'Click to blow out!';

                // Calculate position in circle
                const angle = (Math.PI * 2 * i) / layer.count - Math.PI / 2; // Start from top
                const x = Math.cos(angle) * layer.radius;
                const y = Math.sin(angle) * layer.radius;

                // Position candle
                candle.style.left = `calc(50% + ${x}px)`;
                candle.style.top = `${layer.yOffset + y}px`;

                candle.addEventListener('click', () => this.blowOutCandle(candle, candleId));

                container.appendChild(candle);
                this.candles.push(candle);
                candleId++;
            }
        });
    }

    blowOutCandle(candleElement, id) {
        if (!candleElement.classList.contains('blown-out')) {
            candleElement.classList.add('blown-out');
            this.litCandles--;
            this.updateCounter();

            // Play blowing sound
            this.playBlowSound();

            // Create puff effect
            this.createPuffEffect(candleElement);

            // Check if all candles are blown out
            if (this.litCandles === 0) {
                setTimeout(() => this.onAllCandlesBlown(), 500);
            }
        }
    }

    playBlowSound() {
        const audio = new Audio('assets/music/blowing-out-candle_sound.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Sound play failed:', e));
    }

    createPuffEffect(candle) {
        const rect = candle.getBoundingClientRect();
        const puff = document.createElement('div');
        puff.textContent = '💨';
        puff.style.position = 'fixed';
        puff.style.left = rect.left + rect.width / 2 + 'px';
        puff.style.top = rect.top - 20 + 'px';
        puff.style.fontSize = '2rem';
        puff.style.pointerEvents = 'none';
        puff.style.zIndex = '9999';
        puff.style.animation = 'puff 0.5s ease-out forwards';

        document.body.appendChild(puff);
        setTimeout(() => puff.remove(), 500);
    }

    updateCounter() {
        const counter = document.getElementById('lit-count');
        if (counter) {
            counter.textContent = this.litCandles;
        }
    }

    onAllCandlesBlown() {
        // Create celebration modal
        const modal = document.createElement('div');
        modal.className = 'game-modal active';
        modal.style.zIndex = '10000';
        modal.innerHTML = `
            <div class="modal-content glass-card" style="max-width: 600px; text-align: center;">
                <div class="birthday-wish-content">
                    <h2 class="romantic-heading" style="font-size: 2.5rem; margin-bottom: 1.5rem;">
                        🎂 Happy 21st Birthday, Muskan! 🎂
                    </h2>
                    
                    <div class="wish-message" style="padding: 2rem; background: var(--glass-bg); backdrop-filter: blur(10px); border-radius: var(--radius-lg); margin: 1.5rem 0;">
                        <p class="romantic-text" style="font-size: 1.5rem; margin-bottom: 1rem;">
                            Your wish has been made! ✨
                        </p>
                        <p class="body-text" style="margin: 1rem 0;">
                            May this special day bring you endless joy, laughter, and beautiful memories. 
                            You deserve all the happiness in the world!
                        </p>
                        <p class="body-text" style="margin: 1rem 0;">
                            As you turn 21, may all your dreams come true and may your life be filled 
                            with love, success, and amazing adventures!
                        </p>
                        <p class="romantic-text" style="font-size: 1.3rem; margin-top: 1.5rem;">
                            You are beautiful, smart, kind, and absolutely perfect! 💕
                        </p>
                        <p class="body-text" style="margin-top: 1rem;">
                            Thank you for being you. Thank you for being mine.
                        </p>
                        <p class="romantic-text" style="font-size: 1.5rem; margin-top: 1.5rem;">
                            I love you so much! ❤️
                        </p>
                    </div>
                    
                    <button class="btn-primary btn-glow" onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="font-size: 1.2rem; padding: 1rem 2.5rem; margin-top: 1rem;">
                        Thank You! 💝
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Epic celebration
        Utils.createConfetti();
        setTimeout(() => Utils.createConfetti(), 500);
        setTimeout(() => Utils.createConfetti(), 1000);
        setTimeout(() => Utils.createConfetti(), 1500);

        // Particle burst
        if (particleSystem) {
            particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
        }

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    reset() {
        this.candles.forEach(candle => {
            candle.classList.remove('blown-out');
        });
        this.litCandles = this.totalCandles;
        this.updateCounter();
    }
}

// Global instance
let birthdayCake;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    birthdayCake = new BirthdayCake();
    birthdayCake.init();
});
