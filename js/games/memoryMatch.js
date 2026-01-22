// ============================================
// MEMORY MATCHING GAME
// Match pairs of couple photos
// ============================================

class MemoryMatchGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.isProcessing = false;

        // Use couple photos for cards
        this.photos = [
            'assets/images/couple/IMG-20221127-WA0005.jpg',
            'assets/images/couple/IMG-20221127-WA0006.jpg',
            'assets/images/couple/IMG-20221127-WA0007.jpg',
            'assets/images/couple/IMG-20221127-WA0008.jpg',
            'assets/images/couple/IMG-20221127-WA0009.jpg',
            'assets/images/couple/IMG-20221127-WA0010.jpg'
        ];
    }

    init() {
        this.createGameBoard();
        this.startTimer();
    }

    createGameBoard() {
        const container = document.getElementById('memory-game-content');
        if (!container) return;

        // Create pairs of cards (2 of each photo)
        const cardPairs = [...this.photos, ...this.photos];
        const shuffled = this.shuffle(cardPairs);

        container.innerHTML = `
            <div class="memory-game-header">
                <div class="game-stats">
                    <div class="stat">
                        <span class="stat-label">Time</span>
                        <span class="stat-value" id="memory-timer">00:00</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Moves</span>
                        <span class="stat-value" id="memory-moves">0</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Pairs</span>
                        <span class="stat-value"><span id="memory-pairs">0</span>/6</span>
                    </div>
                </div>
            </div>
            <div class="memory-grid" id="memory-grid"></div>
            <div class="game-actions">
                <button class="btn-secondary" onclick="memoryGame.restart()">Restart Game</button>
            </div>
        `;

        const grid = document.getElementById('memory-grid');

        shuffled.forEach((photo, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.index = index;
            card.dataset.photo = photo;

            card.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">
                        💕
                    </div>
                    <div class="memory-card-back">
                        <img src="${photo}" alt="Memory" onerror="this.src='${CONFIG.images.placeholder}'">
                    </div>
                </div>
            `;

            card.addEventListener('click', () => this.flipCard(card));
            grid.appendChild(card);
            this.cards.push(card);
        });
    }

    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    flipCard(card) {
        if (this.isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        card.classList.add('flipped');
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            document.getElementById('memory-moves').textContent = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isProcessing = true;
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.photo === card2.dataset.photo) {
            // Match found!
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;
                document.getElementById('memory-pairs').textContent = this.matchedPairs;

                // Celebration effect
                if (window.particleSystem) {
                    const rect1 = card1.getBoundingClientRect();
                    particleSystem.createBurst(rect1.left + rect1.width / 2, rect1.top + rect1.height / 2, 10);
                }

                this.flippedCards = [];
                this.isProcessing = false;

                if (this.matchedPairs === 6) {
                    this.gameWon();
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.isProcessing = false;
            }, 1000);
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            const minutes = Math.floor(this.timer / 60).toString().padStart(2, '0');
            const seconds = (this.timer % 60).toString().padStart(2, '0');
            document.getElementById('memory-timer').textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    gameWon() {
        clearInterval(this.timerInterval);

        setTimeout(() => {
            alert(`🎉 Congratulations! You matched all pairs in ${this.moves} moves and ${Math.floor(this.timer / 60)}:${(this.timer % 60).toString().padStart(2, '0')}! 💕`);
        }, 500);
    }

    restart() {
        clearInterval(this.timerInterval);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.timer = 0;
        this.isProcessing = false;
        this.init();
    }
}

// Initialize game when modal opens
let memoryGame;

function startMemoryMatch() {
    const modal = document.getElementById('memory-match-modal');
    if (modal) {
        modal.classList.add('active');
        memoryGame = new MemoryMatchGame();
        memoryGame.init();
    }
}
