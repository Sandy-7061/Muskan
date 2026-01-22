// ============================================
// MAIN APPLICATION
// Initialize all components and handle app-wide logic
// ============================================

class BirthdayApp {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        console.log('🎉 Birthday Website Initializing...');

        // Initialize scroll-based animations
        Utils.initScrollReveal();
        Utils.initSectionVisibility();

        // Update progress bar on scroll
        window.addEventListener('scroll', Utils.debounce(() => {
            Utils.updateProgressBar();
        }, 10));

        // Initialize lazy loading
        Utils.lazyLoadImages();

        // Load messages
        this.loadMessages();

        // Load gallery
        this.loadGallery();

        // Check and update finale status
        this.checkFinaleStatus();

        // Add keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Smooth scroll for all internal links
        this.setupSmoothScroll();

        this.initialized = true;
        console.log('✨ Birthday Website Ready!');
    }

    loadMessages() {
        const container = document.getElementById('messages-container');
        if (!container) return;

        // Get some random Muskan photos for message cards
        const allPhotos = CONFIG.images.getAllMuskanPhotos();
        const selectedPhotos = [];

        // Select 8 random unique photos
        const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(8, CONFIG.messages.length); i++) {
            selectedPhotos.push(shuffled[i % shuffled.length]);
        }

        CONFIG.messages.forEach((msg, index) => {
            const card = document.createElement('div');
            card.className = `message-card glass-card animate-fadeInUp delay-${(index % 5) + 1}`;

            // Get photo for this card
            const photoUrl = selectedPhotos[index] || CONFIG.images.placeholder;

            card.innerHTML = `
                <div class="message-front">
                    ${msg.icon}
                </div>
                <div class="message-back">
                    <p class="romantic-text">${msg.message}</p>
                    <img src="${photoUrl}" alt="Memory" class="message-photo" 
                         onerror="this.src='${CONFIG.images.placeholder}'">
                </div>
            `;

            // Flip on click
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });

            container.appendChild(card);
        });
    }

    loadGallery() {
        const container = document.getElementById('gallery-container');
        if (!container) return;

        // Get all Muskan photos using the new structure
        const allMuskanPhotos = CONFIG.images.getAllMuskanPhotos();
        const allImages = [
            ...CONFIG.images.couple,
            ...allMuskanPhotos
        ];

        allImages.forEach((imagePath, index) => {
            const item = document.createElement('div');
            item.className = `gallery-item`; // No animation - visible immediately

            const img = document.createElement('img');
            // Load ALL images immediately for visibility
            img.src = imagePath;
            img.alt = `Memory ${index + 1}`;

            // Fallback to placeholder if image doesn't exist
            img.onerror = () => {
                img.src = CONFIG.images.placeholder;
            };

            item.appendChild(img);

            // Click to view full size
            item.addEventListener('click', () => {
                this.showImageModal(imagePath);
            });

            container.appendChild(item);
        });


    }

    showImageModal(imagePath) {
        const modal = document.createElement('div');
        modal.className = 'game-modal active';
        modal.innerHTML = `
            <div class="modal-content glass-card">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
                <img src="${imagePath}" style="width: 100%; border-radius: var(--radius-md);" alt="Full size image" />
            </div>
        `;

        document.body.appendChild(modal);

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    checkFinaleStatus() {
        const photoGuessCompleted = Utils.storage.get(CONFIG.storageKeys.photoGuessCompleted);
        const puzzleCompleted = Utils.storage.get(CONFIG.storageKeys.puzzleCompleted);
        const quizCompleted = Utils.storage.get(CONFIG.storageKeys.quizCompleted);

        // Update checklist items
        if (photoGuessCompleted) {
            const item = document.querySelector('[data-requirement="photo-guess"]');
            if (item) {
                item.classList.add('completed');
                item.querySelector('.check').textContent = '✅';
            }
        }

        if (puzzleCompleted) {
            const item = document.querySelector('[data-requirement="puzzle"]');
            if (item) {
                item.classList.add('completed');
                item.querySelector('.check').textContent = '✅';
            }
        }

        if (quizCompleted) {
            const item = document.querySelector('[data-requirement="quiz"]');
            if (item) {
                item.classList.add('completed');
                item.querySelector('.check').textContent = '✅';
            }
        }

        // Check if finale should be unlocked
        checkFinaleUnlock();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.game-modal.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            // M to toggle music
            if (e.key === 'm' || e.key === 'M') {
                if (musicPlayer) {
                    musicPlayer.toggle();
                }
            }

            // Ctrl+Shift+T to toggle test mode
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                document.body.classList.toggle('test-mode');
                const testControls = document.getElementById('test-controls');
                if (testControls) {
                    testControls.style.display =
                        testControls.style.display === 'none' ? 'block' : 'none';
                }
                Utils.showNotification(
                    document.body.classList.contains('test-mode')
                        ? '🧪 Test Mode Activated!'
                        : '✅ Test Mode Deactivated'
                );
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ============================================
// FINALE UNLOCK LOGIC
// ============================================

function checkFinaleUnlock() {
    const photoGuessCompleted = Utils.storage.get(CONFIG.storageKeys.photoGuessCompleted);
    const puzzleCompleted = Utils.storage.get(CONFIG.storageKeys.puzzleCompleted);
    const quizCompleted = Utils.storage.get(CONFIG.storageKeys.quizCompleted);

    const allCompleted = photoGuessCompleted && puzzleCompleted && quizCompleted;

    if (allCompleted) {
        unlockFinale();
    }
}

function unlockFinale() {
    const locked = document.getElementById('finale-locked');
    const unlocked = document.getElementById('finale-unlocked');

    if (locked && unlocked) {
        // Hide locked content
        locked.style.display = 'none';

        // Show unlocked content
        unlocked.style.display = 'block';
        unlocked.classList.add('animate-fadeIn');

        // Mark as unlocked
        Utils.storage.set(CONFIG.storageKeys.finaleUnlocked, true);

        // Massive confetti celebration
        Utils.createConfetti();
        setTimeout(() => Utils.createConfetti(), 1000);
        setTimeout(() => Utils.createConfetti(), 2000);

        // Show notification
        Utils.showNotification('🎉 Final Surprise Unlocked! 🎉', 5000);

        // Scroll to finale
        setTimeout(() => {
            const finaleSection = document.getElementById('finale');
            if (finaleSection) {
                finaleSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
}

function showLastSurprise() {
    const modal = document.getElementById('last-surprise-modal');
    if (modal) {
        modal.classList.add('active');

        // Epic confetti
        Utils.createConfetti();
        setTimeout(() => Utils.createConfetti(), 500);
        setTimeout(() => Utils.createConfetti(), 1000);
        setTimeout(() => Utils.createConfetti(), 1500);
        setTimeout(() => Utils.createConfetti(), 2000);

        // Particle burst
        if (particleSystem) {
            particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
        }

        // Close after 10 seconds (or user can click outside)
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }, 1000);
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new BirthdayApp();
    app.init();

    // Check if finale already unlocked (from previous visit)
    const finaleUnlocked = Utils.storage.get(CONFIG.storageKeys.finaleUnlocked);
    if (finaleUnlocked) {
        unlockFinale();
    }
});

// ============================================
// DEVELOPER TEST FUNCTION
// ============================================

function unlockAllGamesForTesting() {
    console.log('🧪 Test Mode: Unlocking all games...');

    // Mark all games as completed
    Utils.storage.set(CONFIG.storageKeys.photoGuessCompleted, true);
    Utils.storage.set(CONFIG.storageKeys.puzzleCompleted, true);
    Utils.storage.set(CONFIG.storageKeys.quizCompleted, true);

    // Update checklist
    document.querySelectorAll('.checklist-item').forEach(item => {
        item.classList.add('completed');
        const check = item.querySelector('.check');
        if (check) check.textContent = '✅';
    });

    // Unlock finale
    unlockFinale();

    // Show notification
    Utils.showNotification('🎉 All games unlocked! Finale ready!', 3000);
    Utils.createConfetti();

    console.log('✅ Test Mode: All games unlocked!');
}

// Make functions globally available
window.scrollToSection = scrollToSection;
window.closeModal = closeModal;
window.checkFinaleUnlock = checkFinaleUnlock;
window.unlockFinale = unlockFinale;
window.showLastSurprise = showLastSurprise;
window.unlockAllGamesForTesting = unlockAllGamesForTesting;
