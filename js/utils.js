// ============================================
// UTILITY FUNCTIONS
// Helper functions used throughout the application
// ============================================

const Utils = {
    /**
     * Smooth scroll to a section
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * Open a modal
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    },

    /**
     * Close a modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    },

    /**
     * Get random item from array
     */
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Shuffle array
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * Local Storage helpers
     */
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('Error saving to localStorage:', e);
            }
        },
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Error reading from localStorage:', e);
                return null;
            }
        },
        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('Error removing from localStorage:', e);
            }
        }
    },

    /**
     * Create confetti effect
     */
    createConfetti() {
        const colors = ['#FFB6D9', '#D4ADFC', '#F4D9A6', '#FFFFFF'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';

                document.body.appendChild(confetti);

                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 30);
        }
    },

    /**
     * Show notification
     */
    showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'secret-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.5s ease reverse';
            setTimeout(() => notification.remove(), 500);
        }, duration);
    },

    /**
     * Lazy load images
     */
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    },

    /**
     * Scroll reveal animation
     */
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    },

    /**
     * Section visibility observer
     */
    initSectionVisibility() {
        const sections = document.querySelectorAll('.section');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        sections.forEach(section => sectionObserver.observe(section));
    },

    /**
     * Format time with leading zero
     */
    padZero(num) {
        return num.toString().padStart(2, '0');
    },

    /**
     * Check if image exists
     */
    imageExists(url, callback) {
        const img = new Image();
        img.onload = () => callback(true);
        img.onerror = () => callback(false);
        img.src = url;
    },

    /**
     * Get image with fallback
     */
    getImageWithFallback(url, fallback) {
        return new Promise((resolve) => {
            this.imageExists(url, (exists) => {
                resolve(exists ? url : fallback);
            });
        });
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Check if mobile device
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Get scroll progress
     */
    getScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        return (scrolled / documentHeight) * 100;
    },

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const progress = this.getScrollProgress();
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    },

    /**
     * Animate number
     */
    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    },

    /**
     * Create heart particle
     */
    createHeartParticle(x, y) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'float-up 2s ease-out forwards';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }
};

// Add CSS for float-up animation if not exists
if (!document.getElementById('utils-styles')) {
    const style = document.createElement('style');
    style.id = 'utils-styles';
    style.textContent = `
        @keyframes float-up {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Global helper functions for HTML onclick handlers
function scrollToSection(sectionId) {
    Utils.scrollToSection(sectionId);
}

function closeModal(modalId) {
    Utils.closeModal(modalId);
}
