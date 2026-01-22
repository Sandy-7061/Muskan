// ============================================
// LOVE QUIZ GAME
// Quiz about Muskan and the relationship
// ============================================

class QuizGame {
    constructor() {
        this.modal = document.getElementById('quiz-modal');
        this.content = document.getElementById('quiz-content');
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.questions = CONFIG.quiz;
    }

    start() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.showQuestion();
        Utils.openModal('quiz-modal');
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;

        this.content.innerHTML = `
            <div class="quiz-progress">
                <div class="quiz-progress-bar" style="width: ${progress}%"></div>
            </div>
            
            <div class="quiz-question-container">
                <p class="quiz-question-number">
                    Question ${this.currentQuestion + 1} of ${this.questions.length}
                </p>
                <h3 class="quiz-question">${question.question}</h3>
                
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button 
                            class="quiz-option" 
                            onclick="quizGame.selectAnswer(${index})"
                        >
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    selectAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correctIndex;

        this.answers.push({
            questionIndex: this.currentQuestion,
            selectedIndex: selectedIndex,
            correct: isCorrect
        });

        if (isCorrect) {
            this.score++;
        }

        // Visual feedback
        const options = document.querySelectorAll('.quiz-option');
        options[selectedIndex].classList.add('selected');

        // Mark correct answer
        if (isCorrect) {
            options[selectedIndex].style.background = 'rgba(76, 175, 80, 0.3)';
            options[selectedIndex].style.borderColor = '#4CAF50';
        } else {
            options[selectedIndex].style.background = 'rgba(244, 67, 54, 0.3)';
            options[selectedIndex].style.borderColor = '#F44336';
            // Show correct answer
            options[question.correctIndex].style.background = 'rgba(76, 175, 80, 0.3)';
            options[question.correctIndex].style.borderColor = '#4CAF50';
        }

        // Disable all options
        options.forEach(opt => opt.disabled = true);

        // Auto-advance after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.showQuestion();
        }, 1500);
    }

    showResults() {
        const percentage = (this.score / this.questions.length) * 100;
        let result;

        if (percentage === 100) {
            result = CONFIG.quizResults.perfect;
        } else if (percentage >= 70) {
            result = CONFIG.quizResults.good;
        } else if (percentage >= 40) {
            result = CONFIG.quizResults.okay;
        } else {
            result = CONFIG.quizResults.low;
        }

        this.content.innerHTML = `
            <div class="quiz-result">
                <div class="quiz-score">${this.score}/${this.questions.length}</div>
                <h3>${result.title}</h3>
                <p>${result.message}</p>
                
                <div style="margin-top: 2rem;">
                    <p class="romantic-text">
                        No matter the score, you're perfect in my eyes! 💕
                    </p>
                </div>
                
                <button class="quiz-submit-btn" onclick="quizGame.complete()">
                    Continue ✨
                </button>
                
                <button class="quiz-restart-btn" onclick="quizGame.start()">
                    Play Again
                </button>
            </div>
        `;

        // Confetti for good scores
        if (percentage >= 70) {
            Utils.createConfetti();
        }
    }

    complete() {
        // Mark as completed
        Utils.storage.set(CONFIG.storageKeys.quizCompleted, true);

        // Update finale checklist
        this.updateFinaleProgress();

        // Show notification
        Utils.showNotification('✅ Love Quiz completed!');

        // Close modal
        Utils.closeModal('quiz-modal');
    }

    updateFinaleProgress() {
        const checklistItem = document.querySelector('[data-requirement="quiz"]');
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
let quizGame;

// Global function for onclick handlers
function startQuiz() {
    if (!quizGame) {
        quizGame = new QuizGame();
    }
    quizGame.start();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    quizGame = new QuizGame();
});
