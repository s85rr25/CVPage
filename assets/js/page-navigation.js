/**
 * Page Navigation - Previous/Next page scrolling
 * Creates navigation buttons to move between pages in sequence
 */

(function() {
    'use strict';

    // Define page order
    const pageOrder = [
        'index.html',
        'education.html',
        'experience.html',
        'projects.html',
        'service.html',
        'music.html',
        'contact.html'
    ];

    // Get current page
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }

    // Get next and previous pages
    function getNavigationPages() {
        const current = getCurrentPage();
        const currentIndex = pageOrder.indexOf(current);
        
        return {
            previous: currentIndex > 0 ? pageOrder[currentIndex - 1] : null,
            next: currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null,
            currentIndex: currentIndex
        };
    }

    // Create navigation buttons
    function createPageNavigation() {
        const nav = getNavigationPages();
        const navContainer = document.createElement('div');
        navContainer.className = 'page-navigation';
        navContainer.setAttribute('aria-label', 'Page navigation');

        // Previous button
        if (nav.previous) {
            const prevBtn = document.createElement('a');
            prevBtn.href = nav.previous;
            prevBtn.className = 'page-nav-btn page-nav-btn--prev';
            prevBtn.setAttribute('aria-label', 'Previous page');
            prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i><span>Previous</span>';
            navContainer.appendChild(prevBtn);
        }

        // Next button
        if (nav.next) {
            const nextBtn = document.createElement('a');
            nextBtn.href = nav.next;
            nextBtn.className = 'page-nav-btn page-nav-btn--next';
            nextBtn.setAttribute('aria-label', 'Next page');
            nextBtn.innerHTML = '<span>Next</span><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';
            navContainer.appendChild(nextBtn);
        }

        // Add smooth scroll behavior
        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Add smooth transition effect
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 200);
            });
        });

        return navContainer;
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        const nav = createPageNavigation();
        if (nav.children.length > 0) {
            document.body.appendChild(nav);
        }

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            const nav = getNavigationPages();
            
            // Left arrow for previous, Right arrow for next
            if (e.key === 'ArrowLeft' && nav.previous) {
                window.location.href = nav.previous;
            } else if (e.key === 'ArrowRight' && nav.next) {
                window.location.href = nav.next;
            }
        });
    });

})();

