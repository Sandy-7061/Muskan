// ============================================
// COUNTDOWN TIMER
// Live countdown to January 20, 2026
// ============================================

class CountdownTimer {
    constructor() {
        this.targetDate = CONFIG.birthday.date;
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            celebration: document.getElementById('birthday-celebration')
        };
        this.interval = null;
        this.isBirthday = false;
    }

    init() {
        this.updateCountdown();
        this.interval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;

        // Check if birthday has arrived
        if (distance <= 0 && !this.isBirthday) {
            this.onBirthdayArrived();
            return;
        }

        // Calculate time remaining
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update display
        if (this.elements.days) this.elements.days.textContent = Utils.padZero(days);
        if (this.elements.hours) this.elements.hours.textContent = Utils.padZero(hours);
        if (this.elements.minutes) this.elements.minutes.textContent = Utils.padZero(minutes);
        if (this.elements.seconds) this.elements.seconds.textContent = Utils.padZero(seconds);
    }

    onBirthdayArrived() {
        this.isBirthday = true;
        clearInterval(this.interval);

        // Hide countdown
        const countdownDisplay = document.querySelector('.countdown-display');
        if (countdownDisplay) {
            countdownDisplay.style.display = 'none';
        }

        // Show birthday celebration
        if (this.elements.celebration) {
            this.elements.celebration.style.display = 'block';
            this.elements.celebration.classList.add('animate-bounceIn');
        }

        // Trigger confetti
        Utils.createConfetti();

        // Play celebration sound (optional - would need audio file)
        this.playCelebrationSound();

        // Show notification
        Utils.showNotification('🎉 Happy Birthday, Muskan! 🎉', 5000);

        // Animate all time units to 0
        if (this.elements.days) this.elements.days.textContent = '00';
        if (this.elements.hours) this.elements.hours.textContent = '00';
        if (this.elements.minutes) this.elements.minutes.textContent = '00';
        if (this.elements.seconds) this.elements.seconds.textContent = '00';

        // Continuous confetti for 10 seconds
        setTimeout(() => Utils.createConfetti(), 2000);
        setTimeout(() => Utils.createConfetti(), 4000);
        setTimeout(() => Utils.createConfetti(), 6000);
        setTimeout(() => Utils.createConfetti(), 8000);
    }

    playCelebrationSound() {
        // Optional: Add a celebration sound effect
        // const audio = new Audio('assets/sounds/celebration.mp3');
        // audio.play().catch(e => console.log('Could not play celebration sound'));
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize countdown when DOM is ready
let countdownTimer;

document.addEventListener('DOMContentLoaded', () => {
    countdownTimer = new CountdownTimer();
    countdownTimer.init();
});
