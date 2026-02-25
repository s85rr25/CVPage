/**
 * Education Page Scroll Animations
 * Handles scroll-triggered animations for full-screen sections
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initVideoBackground();
        initScrollAnimations();
    });

    /**
     * Initialize video background
     */
    function initVideoBackground() {
        const video = document.querySelector('.education-video');
        if (!video) return;

        video.addEventListener('loadedmetadata', function() {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });

        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });

        // Try to play video
        video.play().catch(e => {
            console.log('Video autoplay prevented, will play on user interaction');
        });
    }

    /**
     * Initialize scroll-triggered animations
     */
    function initScrollAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // If reduced motion, show all immediately
            const scenes = document.querySelectorAll('.education-scene');
            scenes.forEach(scene => {
                scene.classList.add('visible');
            });
            return;
        }
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class when entering viewport
                    entry.target.classList.add('visible');
                } else {
                    // Remove visible class when leaving viewport (for re-animation)
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        // Observe all education scenes
        const scenes = document.querySelectorAll('.education-scene');
        scenes.forEach(scene => {
            observer.observe(scene);
        });

        // Show first scene immediately
        if (scenes.length > 0) {
            scenes[0].classList.add('visible');
        }
    }

})();

