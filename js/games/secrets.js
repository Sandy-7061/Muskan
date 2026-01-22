// ============================================
// SECRET SURPRISES GAME
// Hidden easter eggs throughout the site
// ============================================

class SecretsGame {
    constructor() {
        this.secretsFound = this.loadProgress();
        this.totalSecrets = CONFIG.secrets.length;
        this.secretElements = [];
    }

    init() {
        this.updateCounter();
        this.addSecretTriggers();
    }

    loadProgress() {
        return Utils.storage.get(CONFIG.storageKeys.secretsFound) || [];
    }

    saveProgress() {
        Utils.storage.set(CONFIG.storageKeys.secretsFound, this.secretsFound);
    }

    updateCounter() {
        const counter = document.getElementById('secrets-found');
        if (counter) {
            counter.textContent = this.secretsFound.length;
        }
    }

    addSecretTriggers() {
        // Add hidden clickable elements throughout the site
        const sections = ['welcome', 'games', 'messages', 'gallery'];

        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            // Add 2-3 secrets per section
            const secretsInSection = Math.min(3, this.totalSecrets - (index * 2));

            for (let i = 0; i < secretsInSection && (index * 2 + i) < this.totalSecrets; i++) {
                const secretIndex = index * 2 + i;
                this.addSecretToSection(section, secretIndex);
            }
        });
    }

    addSecretToSection(section, secretIndex) {
        const secret = CONFIG.secrets[secretIndex];
        if (!secret) return;

        // Create hidden element
        const secretEl = document.createElement('span');
        secretEl.className = 'secret-trigger';
        secretEl.textContent = '✨';
        secretEl.style.position = 'absolute';
        secretEl.style.opacity = '0.3';
        secretEl.style.fontSize = '1.5rem';
        secretEl.style.cursor = 'pointer';
        secretEl.style.zIndex = '100';
        secretEl.style.transition = 'all 0.3s ease';

        // Random position within section
        secretEl.style.top = (Math.random() * 80 + 10) + '%';
        secretEl.style.left = (Math.random() * 80 + 10) + '%';

        // Hover effect
        secretEl.addEventListener('mouseenter', () => {
            if (!this.secretsFound.includes(secretIndex)) {
                secretEl.style.opacity = '0.8';
                secretEl.style.transform = 'scale(1.2)';
            }
        });

        secretEl.addEventListener('mouseleave', () => {
            if (!this.secretsFound.includes(secretIndex)) {
                secretEl.style.opacity = '0.3';
                secretEl.style.transform = 'scale(1)';
            }
        });

        // Click handler
        secretEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.revealSecret(secretIndex, secretEl);
        });

        // Make section relative for absolute positioning
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }

        section.appendChild(secretEl);
        this.secretElements.push({ element: secretEl, index: secretIndex });

        // If already found, mark as found
        if (this.secretsFound.includes(secretIndex)) {
            secretEl.style.opacity = '0.1';
            secretEl.textContent = '✓';
            secretEl.style.pointerEvents = 'none';
        }
    }

    revealSecret(secretIndex, element) {
        // Check if already found
        if (this.secretsFound.includes(secretIndex)) {
            return;
        }

        const secret = CONFIG.secrets[secretIndex];

        // Mark as found
        this.secretsFound.push(secretIndex);
        this.saveProgress();
        this.updateCounter();

        // Update element
        element.style.opacity = '0.1';
        element.textContent = '✓';
        element.style.pointerEvents = 'none';

        // Show secret modal
        this.showSecretModal(secret);

        // Create particle burst at click position
        if (particleSystem) {
            const rect = element.getBoundingClientRect();
            particleSystem.createBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                15
            );
        }

        // Check if all secrets found
        if (this.secretsFound.length === this.totalSecrets) {
            setTimeout(() => {
                this.onAllSecretsFound();
            }, 2000);
        }
    }

    showSecretModal(secret) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'secret-modal';
        modal.innerHTML = `
            <div class="secret-modal-content">
                <div class="secret-icon">${secret.icon}</div>
                <h3 class="secret-title">Secret Found!</h3>
                <p class="secret-message">${secret.message}</p>
                <button class="secret-close-btn" onclick="this.parentElement.parentElement.remove()">
                    Got it! 💕
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Auto-remove after  10 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.style.animation = 'fadeIn 0.3s ease reverse';
                setTimeout(() => modal.remove(), 300);
            }
        }, 10000);

        // Show notification
        Utils.showNotification(`Secret ${this.secretsFound.length}/${this.totalSecrets} found! 🎁`);
    }

    onAllSecretsFound() {
        Utils.showNotification('🎉 You found all the secrets! You\'re amazing! 🎉', 5000);
        Utils.createConfetti();

        // Show special modal
        const modal = document.createElement('div');
        modal.className = 'secret-modal';
        modal.innerHTML = `
            <div class="secret-modal-content" style="background: var(--gradient-romantic); color: var(--color-dark);">
                <div class="secret-icon">🏆</div>
                <h3 class="secret-title">All Secrets Discovered!</h3>
                <p class="secret-message">
                    You found every hidden surprise! Just like how you've discovered every part of my heart. 
                    You're incredibly special to me, and I'm so lucky to have you! 💕
                </p>
                <button class="secret-close-btn" style="background: white; color: var(--color-dark);" onclick="this.parentElement.parentElement.remove()">
                    Love you too! ❤️
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }
}

// Global instance
let secretsGame;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    secretsGame = new SecretsGame();
    // Wait a bit for sections to load
    setTimeout(() => {
        secretsGame.init();
    }, 1000);
});
