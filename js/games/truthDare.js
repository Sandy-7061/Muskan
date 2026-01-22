// ============================================
// TRUTH OR DARE GAME
// Romantic edition for couples
// ============================================

class TruthDareGame {
    constructor() {
        this.modal = document.getElementById('truth-dare-modal');
        this.content = document.getElementById('truth-dare-content');
        this.usedTruths = [];
        this.usedDares = [];
    }

    start() {
        this.showSelection();
        Utils.openModal('truth-dare-modal');
    }

    showSelection() {
        this.content.innerHTML = `
            <p class="game-instruction">Choose your adventure! Pick Truth or Dare... 💕</p>
            
            <div class="truth-dare-buttons">
                <button class="truth-btn" onclick="truthDareGame.pickTruth()">
                    💗 Truth
                </button>
                <button class="dare-btn" onclick="truthDareGame.pickDare()">
                    ✨ Dare
                </button>
            </div>
            
            <div id="truth-dare-display"></div>
        `;
    }

    pickTruth() {
        const truths = CONFIG.truthOrDare.truths;

        // Get unused truths
        const availableTruths = truths.filter((_, index) => !this.usedTruths.includes(index));

        // If all used, reset
        if (availableTruths.length === 0) {
            this.usedTruths = [];
            Utils.showNotification('All truths revealed! Starting fresh! 💕');
        }

        // Pick random truth
        const truthIndex = this.getUnusedIndex(truths, this.usedTruths);
        const truth = truths[truthIndex];
        this.usedTruths.push(truthIndex);

        this.showCard('Truth', truth, '💗');
    }

    pickDare() {
        const dares = CONFIG.truthOrDare.dares;

        // Get unused dares
        const availableDares = dares.filter((_, index) => !this.usedDares.includes(index));

        // If all used, reset
        if (availableDares.length === 0) {
            this.usedDares = [];
            Utils.showNotification('All dares completed! Starting fresh! ✨');
        }

        // Pick random dare
        const dareIndex = this.getUnusedIndex(dares, this.usedDares);
        const dare = dares[dareIndex];
        this.usedDares.push(dareIndex);

        this.showCard('Dare', dare, '✨');
    }

    getUnusedIndex(array, usedArray) {
        let index;
        do {
            index = Math.floor(Math.random() * array.length);
        } while (usedArray.includes(index) && usedArray.length < array.length);
        return index;
    }

    showCard(type, content, icon) {
        const displayDiv = document.getElementById('truth-dare-display');

        displayDiv.innerHTML = `
            <div class="truth-dare-card">
                <h4>${icon} ${type} ${icon}</h4>
                <p>${content}</p>
            </div>
            
            <button class="next-round-btn" onclick="truthDareGame.showSelection()">
                Play Again!
            </button>
        `;

        // Create particle burst
        if (particleSystem) {
            particleSystem.createBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                20
            );
        }
    }
}

// Global instance
let truthDareGame;

// Global function for onclick handlers
function startTruthDare() {
    if (!truthDareGame) {
        truthDareGame = new TruthDareGame();
    }
    truthDareGame.start();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    truthDareGame = new TruthDareGame();
});
