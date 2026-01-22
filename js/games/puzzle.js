// ============================================
// JIGSAW PUZZLE GAME
// Drag and drop puzzle with her photo
// ============================================

class PuzzleGame {
    constructor() {
        this.gridSize = 3; // 3x3 puzzle
        this.pieces = [];
        this.correctPositions = [];
        this.moves = 0;
        this.modal = document.getElementById('puzzle-modal');
        this.content = document.getElementById('puzzle-content');
        this.puzzleImage = CONFIG.images.muskan.special[0]; // Use Smart Pose
    }

    start() {
        this.moves = 0;
        this.initializePuzzle();
        Utils.openModal('puzzle-modal');
    }

    initializePuzzle() {
        // Create puzzle pieces
        this.pieces = [];
        const totalPieces = this.gridSize * this.gridSize;

        for (let i = 0; i < totalPieces; i++) {
            this.pieces.push({
                id: i,
                currentPosition: i,
                correctPosition: i
            });
        }

        // Shuffle pieces
        this.shufflePieces();
        this.render();
    }

    shufflePieces() {
        // Fisher-Yates shuffle for current positions
        for (let i = this.pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempPos = this.pieces[i].currentPosition;
            this.pieces[i].currentPosition = this.pieces[j].currentPosition;
            this.pieces[j].currentPosition = tempPos;
        }
    }

    render() {
        this.content.innerHTML = `
            <div class="game-instruction">Drag and drop the pieces to complete the puzzle!</div>
            
            <div class="puzzle-grid" id="puzzle-grid">
                ${this.pieces.map(piece => this.renderPiece(piece)).join('')}
            </div>
            
            <div class="puzzle-moves">Moves: <span id="move-count">${this.moves}</span></div>
            
            <div id="puzzle-result"></div>
        `;

        this.setupDragAndDrop();
    }

    renderPiece(piece) {
        const row = Math.floor(piece.id / this.gridSize);
        const col = piece.id % this.gridSize;
        const bgPosX = -(col * 100 / (this.gridSize - 1));
        const bgPosY = -(row * 100 / (this.gridSize - 1));

        return `
            <div 
                class="puzzle-piece" 
                data-piece-id="${piece.id}"
                data-current-pos="${piece.currentPosition}"
                draggable="true"
                style="
                    background-image: url('${this.puzzleImage}');
                    background-position: ${bgPosX}% ${bgPosY}%;
                    background-size: 300%;
                "
            ></div>
        `;
    }

    setupDragAndDrop() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        let draggedPiece = null;

        pieces.forEach(piece => {
            // Desktop: drag and drop
            piece.addEventListener('dragstart', (e) => {
                draggedPiece = piece;
                piece.classList.add('dragging');
            });

            piece.addEventListener('dragend', (e) => {
                piece.classList.remove('dragging');
            });

            piece.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            piece.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedPiece && draggedPiece !== piece) {
                    this.swapPieces(draggedPiece, piece);
                }
            });

            // Mobile: touch events
            piece.addEventListener('touchstart', (e) => {
                draggedPiece = piece;
                piece.classList.add('dragging');
            });

            piece.addEventListener('touchend', (e) => {
                piece.classList.remove('dragging');

                // Get element at touch point
                const touch = e.changedTouches[0];
                const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

                if (targetElement && targetElement.classList.contains('puzzle-piece') && targetElement !== piece) {
                    this.swapPieces(piece, targetElement);
                }
            });

            piece.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });
        });
    }

    swapPieces(piece1, piece2) {
        const pos1 = parseInt(piece1.dataset.currentPos);
        const pos2 = parseInt(piece2.dataset.currentPos);

        // Swap positions in data
        piece1.dataset.currentPos = pos2;
        piece2.dataset.currentPos = pos1;

        const id1 = parseInt(piece1.dataset.pieceId);
        const id2 = parseInt(piece2.dataset.pieceId);

        this.pieces[id1].currentPosition = pos2;
        this.pieces[id2].currentPosition = pos1;

        // Swap in DOM
        const parent = piece1.parentNode;
        const piece1Index = Array.from(parent.children).indexOf(piece1);
        const piece2Index = Array.from(parent.children).indexOf(piece2);

        if (piece1Index < piece2Index) {
            parent.insertBefore(piece2, piece1);
            parent.insertBefore(piece1, parent.children[piece2Index]);
        } else {
            parent.insertBefore(piece1, piece2);
            parent.insertBefore(piece2, parent.children[piece1Index]);
        }

        // Increment moves
        this.moves++;
        document.getElementById('move-count').textContent = this.moves;

        // Check if completed
        if (this.checkCompletion()) {
            this.onComplete();
        }
    }

    checkCompletion() {
        return this.pieces.every(piece => piece.currentPosition === piece.correctPosition);
    }

    onComplete() {
        const resultDiv = document.getElementById('puzzle-result');

        // Mark all pieces as correct
        document.querySelectorAll('.puzzle-piece').forEach(piece => {
            piece.classList.add('correct');
            piece.setAttribute('draggable', 'false');
        });

        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="puzzle-complete animate-bounceIn">
                    <h4>🎉 Puzzle Complete! 🎉</h4>
                    <p class="puzzle-message">
                        You completed it in ${this.moves} moves! Just like how all the pieces of my life came together when I met you. 💕
                    </p>
                    <p class="romantic-text">
                        "You complete me"
                    </p>
                    <button class="next-photo-btn" onclick="puzzleGame.complete()">
                        Continue ✨
                    </button>
                </div>
            `;

            // Confetti
            Utils.createConfetti();
        }, 500);
    }

    complete() {
        // Mark as completed
        Utils.storage.set(CONFIG.storageKeys.puzzleCompleted, true);

        // Update finale checklist
        this.updateFinaleProgress();

        // Show notification
        Utils.showNotification('✅ Puzzle of Love completed!');

        // Close modal
        Utils.closeModal('puzzle-modal');
    }

    updateFinaleProgress() {
        const checklistItem = document.querySelector('[data-requirement="puzzle"]');
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
let puzzleGame;

// Global function for onclick handlers
function startPuzzle() {
    if (!puzzleGame) {
        puzzleGame = new PuzzleGame();
    }
    puzzleGame.start();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    puzzleGame = new PuzzleGame();
});
