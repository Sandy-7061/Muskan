// ============================================
// PERFORMANCE OPTIMIZATION UTILITIES
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.observers = new Map();
    }

    /**
     * Throttle function execution
     */
    throttle(func, wait) {
        let timeout;
        let lastRan;

        return function executedFunction(...args) {
            if (!lastRan) {
                func.apply(this, args);
                lastRan = Date.now();
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if (Date.now() - lastRan >= wait) {
                        func.apply(this, args);
                        lastRan = Date.now();
                    }
                }, wait - (Date.now() - lastRan));
            }
        };
    }

    /**
     * Debounce function execution
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * Lazy load elements when they enter viewport
     */
    lazyObserve(elements, callback, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observerOptions = { ...defaultOptions, ...options };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));

        return observer;
    }

    /**
     * Request idle callback wrapper with fallback
     */
    runWhenIdle(callback) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback);
        } else {
            setTimeout(callback, 1);
        }
    }

    /**
     * Monitor FPS and performance
     */
    measurePerformance() {
        let lastTime = performance.now();
        let frames = 0;
        let fps = 60;

        const measureFPS = () => {
            const currentTime = performance.now();
            frames++;

            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;

                // Log if performance is poor
                if (fps < 30) {
                    console.warn(`⚠️ Low FPS detected: ${fps}`);
                }
            }

            requestAnimationFrame(measureFPS);
        };

        measureFPS();
        return () => fps;
    }
}

// Initialize global performance optimizer
const perfOptimizer = new PerformanceOptimizer();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.PerformanceOptimizer = PerformanceOptimizer;
    window.perfOptimizer = perfOptimizer;
}
