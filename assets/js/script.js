/**
 * Main JavaScript for homepage interactions
 * Handles scroll effects, animations, and micro-interactions
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initHeroVideo();
        initNavigation();
        initScrollAnimations();
        initGalleryInteractions();
        initAccessibility();
    });

    /**
     * Hero Background Video
     */
    function initHeroVideo() {
        const video = document.querySelector('.hero__video');
        if (!video) return;

        // Ensure video plays and loops
        video.addEventListener('loadedmetadata', function() {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });

        // Handle video loop
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });

        // Try to play video
        video.play().catch(e => {
            // Autoplay was prevented, user interaction required
            console.log('Video autoplay prevented, will play on user interaction');
        });
    }

    /**
     * Navigation scroll effects
     */
    function initNavigation() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * Intersection Observer for scroll-triggered animations
     */
    function initScrollAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Skip animations if user prefers reduced motion
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        // Observe gallery items for fade-in animation
        const galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }

    /**
     * Gallery image interactions
     */
    function initGalleryInteractions() {
        const galleryItems = document.querySelectorAll('.gallery__item');
        
        galleryItems.forEach(item => {
            // Add subtle parallax effect on mouse move
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                
                const image = this.querySelector('.gallery__image');
                if (image) {
                    image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const image = this.querySelector('.gallery__image');
                if (image) {
                    image.style.transform = 'scale(1) translate(0, 0)';
                }
            });
        });
    }

    /**
     * Accessibility enhancements
     */
    function initAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Ensure main element has id
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }

        // Add keyboard navigation enhancement for gallery
        const galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View image ${index + 1}`);
            
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

})();
