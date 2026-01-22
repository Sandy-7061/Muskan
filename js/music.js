// ============================================
// BACKGROUND MUSIC PLAYER
// Handles background music with controls
// ============================================

class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('background-music');
        this.toggleBtn = document.getElementById('music-toggle');
        this.playingIcon = this.toggleBtn?.querySelector('.playing');
        this.pausedIcon = this.toggleBtn?.querySelector('.paused');
        this.isPlaying = false;
        this.userInteracted = false;
    }

    init() {
        if (!this.audio || !this.toggleBtn) {
            console.warn('Music player elements not found');
            return;
        }

        // Set volume from config
        this.audio.volume = CONFIG.music.volume || 0.3;

        // Setup event listeners
        this.toggleBtn.addEventListener('click', () => this.toggle());

        // Auto-play after first user interaction (browser requirement)
        this.setupAutoPlay();

        // Handle audio events
        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
        this.audio.addEventListener('ended', () => this.onEnded());
        this.audio.addEventListener('error', (e) => this.onError(e));
    }

    setupAutoPlay() {
        // Browsers require user interaction before playing audio
        const interactionEvents = ['click', 'touchstart', 'keydown'];

        const handleFirstInteraction = () => {
            if (!this.userInteracted) {
                this.userInteracted = true;
                this.play();

                // Remove listeners after first interaction
                interactionEvents.forEach(event => {
                    document.removeEventListener(event, handleFirstInteraction);
                });
            }
        };

        interactionEvents.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { once: true });
        });
    }

    play() {
        if (this.audio) {
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.updateIcon();
                })
                .catch(e => {
                    console.log('Audio play prevented:', e);
                    // Browser prevented autoplay, user will need to click play button
                });
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            this.updateIcon();
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    updateIcon() {
        if (this.playingIcon && this.pausedIcon) {
            if (this.isPlaying) {
                this.playingIcon.style.display = 'inline';
                this.pausedIcon.style.display = 'none';
                this.toggleBtn.setAttribute('aria-label', 'Pause music');
            } else {
                this.playingIcon.style.display = 'none';
                this.pausedIcon.style.display = 'inline';
                this.toggleBtn.setAttribute('aria-label', 'Play music');
            }
        }
    }

    onPlay() {
        this.isPlaying = true;
        this.updateIcon();
        // Add animation to button
        if (this.toggleBtn) {
            this.toggleBtn.style.animation = 'pulse-glow 2s infinite';
        }
    }

    onPause() {
        this.isPlaying = false;
        this.updateIcon();
        // Remove animation
        if (this.toggleBtn) {
            this.toggleBtn.style.animation = 'none';
        }
    }

    onEnded() {
        // Loop is set in HTML, but handle it here too
        this.audio.currentTime = 0;
        this.play();
    }

    onError(e) {
        console.error('Music error:', e);
        // Hide music button if file not found
        if (this.toggleBtn) {
            this.toggleBtn.style.display = 'none';
        }
        Utils.showNotification('Music file not found. Please add background.mp3', 3000);
    }

    setVolume(volume) {
        if (this.audio) {
            this.audio.volume = Math.max(0, Math.min(1, volume));
        }
    }

    fadeIn(duration = 2000) {
        if (!this.audio) return;

        const targetVolume = CONFIG.music.volume || 0.3;
        const steps = 50;
        const stepDuration = duration / steps;
        const volumeIncrement = targetVolume / steps;
        let currentStep = 0;

        this.audio.volume = 0;
        this.play();

        const fadeInterval = setInterval(() => {
            currentStep++;
            const newVolume = volumeIncrement * currentStep;
            this.audio.volume = Math.min(newVolume, targetVolume);

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }

    fadeOut(duration = 2000) {
        if (!this.audio) return;

        const startVolume = this.audio.volume;
        const steps = 50;
        const stepDuration = duration / steps;
        const volumeDecrement = startVolume / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            const newVolume = startVolume - (volumeDecrement * currentStep);
            this.audio.volume = Math.max(newVolume, 0);

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.pause();
            }
        }, stepDuration);
    }
}

// Initialize music player
let musicPlayer;

document.addEventListener('DOMContentLoaded', () => {
    musicPlayer = new MusicPlayer();
    musicPlayer.init();
});
