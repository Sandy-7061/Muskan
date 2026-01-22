// ============================================
// PHOTO GUESSING GAME
// Show blurred photos with quiz questions
// ============================================

class PhotoGuessGame {
    constructor() {
        this.currentPhotoIndex = 0;
        this.photosCompleted = 0;
        this.gameData = CONFIG.photoGuessGame;
        this.modal = document.getElementById('photo-guess-modal');
        this.content = document.getElementById('photo-guess-content');
    }

    start() {
        this.currentPhotoIndex = 0;
        this.showPhoto();
        Utils.openModal('photo-guess-modal');
    }

    showPhoto() {
        if (this.currentPhotoIndex >= this.gameData.length) {
            this.showCompletion();
            return;
        }

        const photo = this.gameData[this.currentPhotoIndex];

        this.content.innerHTML = `
            <div class="game-instruction">Look carefully at the blurred image...</div>
            
            <img 
                src="${photo.image}" 
                alt="Mystery photo" 
                class="photo-guess-image blurred"
                id="current-photo"
                onerror="this.src='${CONFIG.images.placeholder}'"
            />
            
            <p class="photo-guess-question">${photo.question}</p>
            
            <div class="photo-guess-options" id="photo-options">
                ${photo.options.map((option, index) => `
                    <button 
                        class="option-btn" 
                        onclick="photoGuessGame.checkAnswer(${index})"
                    >
                        ${option}
                    </button>
                `).join('')}
            </div>
            
            <div id="photo-result"></div>
        `;
    }

    checkAnswer(selectedIndex) {
        const photo = this.gameData[this.currentPhotoIndex];
        const resultDiv = document.getElementById('photo-result');
        const photoImage = document.getElementById('current-photo');
        const optionButtons = document.querySelectorAll('.option-btn');

        // Disable all buttons
        optionButtons.forEach(btn => btn.disabled = true);

        const isCorrect = selectedIndex === photo.correctIndex;

        // Mark the selected button
        optionButtons[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            // Unblur the image
            photoImage.classList.remove('blurred');
            photoImage.classList.add('animate-zoomIn');

            // Show success message
            resultDiv.innerHTML = `
                <div class="photo-guess-result animate-fadeInUp">
                    <h4>✨ Perfect! ✨</h4>
                    <p>${photo.successMessage}</p>
                    <button class="next-photo-btn" onclick="photoGuessGame.nextPhoto()">
                        ${this.currentPhotoIndex < this.gameData.length - 1 ? 'Next Photo →' : 'Finish 🎉'}
                    </button>
                </div>
            `;

            // Particle effect
            if (particleSystem) {
                particleSystem.createBurst(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    30
                );
            }
        } else {
            // Show hint
            resultDiv.innerHTML = `
                <div class="photo-guess-result animate-fadeInUp">
                    <h4>Not quite! 💭</h4>
                    <p>Try again! Think about our special moments together...</p>
                    <button class="next-photo-btn" onclick="photoGuessGame.resetQuestion()">
                        Try Again
                    </button>
                </div>
            `;
        }
    }

    resetQuestion() {
        this.showPhoto();
    }

    nextPhoto() {
        this.photosCompleted++;
        this.currentPhotoIndex++;
        this.showPhoto();
    }

    showCompletion() {
        this.content.innerHTML = `
            <div class="photo-guess-result animate-bounceIn">
                <h4>🎉 Amazing! 🎉</h4>
                <p>You remembered all our special moments! Every photo tells a story of us, and I treasure each one.</p>
                <p class="romantic-text">Thank you for being part of my life's beautiful story. 💕</p>
                <button class="next-photo-btn" onclick="photoGuessGame.complete()">
                    Continue ✨
                </button>
            </div>
        `;
    }

    complete() {
        // Mark as completed
        Utils.storage.set(CONFIG.storageKeys.photoGuessCompleted, true);

        // Update finale checklist
        this.updateFinaleProgress();

        // Show notification
        Utils.showNotification('✅ Memory Lane completed!');

        // Close modal
        Utils.closeModal('photo-guess-modal');

        // Confetti
        Utils.createConfetti();
    }

    updateFinaleProgress() {
        const checklistItem = document.querySelector('[data-requirement="photo-guess"]');
        if (checklistItem) {
            checklistItem.classList.add('completed');
            const check = checklistItem.querySelector('.check');
            if (check) check.textContent = '✅';
        }

        // Check if finale should be unlocked
        checkFinaleUnlock();
    }
}

// Global instance
let photoGuessGame;

// Global function for onclick handlers
function startPhotoGuess() {
    if (!photoGuessGame) {
        photoGuessGame = new PhotoGuessGame();
    }
    photoGuessGame.start();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    photoGuessGame = new PhotoGuessGame();
});
