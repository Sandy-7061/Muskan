// ============================================
// PHOTO TIMELINE GAME
// Guess when photos were taken
// ============================================

class PhotoTimelineGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 8;

        // Couple photos with dates (you can customize these)
        this.timeline = [
            {
                photo: 'assets/images/couple/IMG-20221127-WA0005.jpg',
                date: '2022-11-27',
                options: ['November 2022', 'December 2022', 'October 2022'],
                correct: 0,
                memory: 'One of our first selfies together! 💕'
            },
            {
                photo: 'assets/images/couple/IMG-20221127-WA0006.jpg',
                date: '2022-11-27',
                options: ['September 2022', 'November 2022', 'January 2023'],
                correct: 1,
                memory: 'Remember this beautiful day? ✨'
            },
            {
                photo: 'assets/images/couple/IMG-20221127-WA0007.jpg',
                date: '2022-11-27',
                options: ['November 2022', 'August 2022', 'February 2023'],
                correct: 0,
                memory: 'Such a special moment for us! ❤️'
            },
            {
                photo: 'assets/images/couple/IMG-20221127-WA0008.jpg',
                date: '2022-11-27',
                options: ['October 2022', 'November 2022', 'December 2022'],
                correct: 1,
                memory: 'This was the best day! 🌟'
            },
            {
                photo: 'assets/images/couple/IMG-20221127-WA0009.jpg',
                date: '2022-11-27',
                options: ['November 2022', 'July 2022', 'March 2023'],
                correct: 0,
                memory: 'You looked so beautiful that day! 😍'
            },
            {
                photo: 'assets/images/couple/IMG-20221127-WA0010.jpg',
                date: '2022-11-27',
                options: ['September 2022', 'October 2022', 'November 2022'],
                correct: 2,
                memory: 'I love this memory! 💖'
            },
            {
                photo: 'assets/images/muskan/IMG_20230710_104512.jpg',
                date: '2023-07-10',
                options: ['June 2023', 'July 2023', 'August 2023'],
                correct: 1,
                memory: 'Your smile always makes my day! 😊'
            },
            {
                photo: 'assets/images/muskan/received_1011630063216542.jpeg',
                date: '2023-01-01',
                options: ['December 2022', 'January 2023', 'February 2023'],
                correct: 1,
                memory: 'Happy New Year moment! 🎉'
            }
        ];
    }

    init() {
        this.currentQuestion = 0;
        this.score = 0;
        this.showQuestion();
    }

    showQuestion() {
        const container = document.getElementById('timeline-game-content');
        if (!container) return;

        const question = this.timeline[this.currentQuestion];

        container.innerHTML = `
            <div class=\"timeline-progress\">
                <p>Question ${this.currentQuestion + 1} of ${this.totalQuestions}</p>
                <div class=\"progress-bar\">
                    <div class=\"progress-fill\" style=\"width: ${(this.currentQuestion / this.totalQuestions) * 100}%\"></div>
                </div>
            </div>

            <div class=\"timeline-photo\">
                <img src=\"${question.photo}\" alt=\"Memory\" onerror=\"this.src='${CONFIG.images.placeholder}'\">
            </div>

            <div class=\"timeline-question\">
                <h4>When was this photo taken?</h4>
                <div class=\"timeline-options\">
                    ${question.options.map((option, index) => `
                        <button class=\"timeline-option\" onclick=\"timelineGame.selectAnswer(${index})\">${option}</button>
                    `).join('')}
                </div>
            </div>

            <div class=\"timeline-score\">
                <p>Score: ${this.score}/${this.totalQuestions}</p>
            </div>
        `;
    }

    selectAnswer(selectedIndex) {
        const question = this.timeline[this.currentQuestion];
        const options = document.querySelectorAll('.timeline-option');

        // Disable all options
        options.forEach(btn => btn.disabled = true);

        if (selectedIndex === question.correct) {
            // Correct answer!
            this.score++;
            options[selectedIndex].classList.add('correct');

            // Show memory
            this.showMemory(question.memory, true);
        } else {
            // Wrong answer
            options[selectedIndex].classList.add('wrong');
            options[question.correct].classList.add('correct');

            this.showMemory(question.memory, false);
        }
    }

    showMemory(memory, correct) {
        const container = document.getElementById('timeline-game-content');
        const memoryDiv = document.createElement('div');
        memoryDiv.className = 'timeline-memory';
        memoryDiv.innerHTML = `
            <div class=\"memory-result ${correct ? 'correct' : 'wrong'}\">
                ${correct ? '✓ Correct!' : '✗ Not quite!'}
            </div>
            <p class=\"memory-text\">${memory}</p>
            <button class=\"btn-secondary\" onclick=\"timelineGame.nextQuestion()\">
                ${this.currentQuestion < this.totalQuestions - 1 ? 'Next Photo' : 'See Results'}
            </button>
        `;

        container.appendChild(memoryDiv);
    }

    nextQuestion() {
        this.currentQuestion++;

        if (this.currentQuestion < this.totalQuestions) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        const container = document.getElementById('timeline-game-content');
        const percentage = Math.round((this.score / this.totalQuestions) * 100);

        let message = '';
        if (percentage === 100) {
            message = 'Perfect! You remember every moment! 💕';
        } else if (percentage >= 75) {
            message = 'Amazing! You know our story so well! 🌟';
        } else if (percentage >= 50) {
            message = 'Good job! Keep making more memories! ✨';
        } else {
            message = 'We need to make more unforgettable moments! 💖';
        }

        container.innerHTML = `
            <div class=\"timeline-results\">
                <h3>Your Results</h3>
                <div class=\"score-circle\">
                    <div class=\"score-number\">${this.score}/${this.totalQuestions}</div>
                    <div class=\"score-percent\">${percentage}%</div>
                </div>
                <p class=\"result-message\">${message}</p>
                <div class=\"result-actions\">
                    <button class=\"btn-secondary\" onclick=\"timelineGame.init()\">Play Again</button>
                    <button class=\"btn-secondary\" onclick=\"closeModal('timeline-modal')\">Close</button>
                </div>
            </div>
        `;
    }
}

// Initialize game
let timelineGame;

function startPhotoTimeline() {
    const modal = document.getElementById('timeline-modal');
    if (modal) {
        modal.classList.add('active');
        timelineGame = new PhotoTimelineGame();
        timelineGame.init();
    }
}
