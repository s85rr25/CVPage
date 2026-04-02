/**
 * Fixed bottom prev/next links between main pages
 */
(function () {
    'use strict';

    const pageOrder = [
        'index.html',
        'about.html',
        'experience.html',
        'projects.html',
        'leadership.html',
        'skills.html',
        'contact.html',
    ];

    function getCurrentPage() {
        const path = window.location.pathname;
        let filename = path.split('/').pop() || 'index.html';
        if (!filename || filename === '') filename = 'index.html';
        return filename;
    }

    function getNavigationPages() {
        const current = getCurrentPage();
        const currentIndex = pageOrder.indexOf(current);
        if (currentIndex === -1) {
            return { previous: null, next: null };
        }
        return {
            previous: currentIndex > 0 ? pageOrder[currentIndex - 1] : null,
            next: currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null,
        };
    }

    function createPageNavigation() {
        const nav = getNavigationPages();
        const navContainer = document.createElement('div');
        navContainer.className = 'page-navigation';
        navContainer.setAttribute('aria-label', 'Page navigation');

        if (nav.previous) {
            const prevBtn = document.createElement('a');
            prevBtn.href = nav.previous;
            prevBtn.className = 'page-nav-btn page-nav-btn--prev';
            prevBtn.setAttribute('aria-label', 'Previous page');
            prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i><span>Previous</span>';
            navContainer.appendChild(prevBtn);
        }

        if (nav.next) {
            const nextBtn = document.createElement('a');
            nextBtn.href = nav.next;
            nextBtn.className = 'page-nav-btn page-nav-btn--next';
            nextBtn.setAttribute('aria-label', 'Next page');
            nextBtn.innerHTML = '<span>Next</span><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';
            navContainer.appendChild(nextBtn);
        }

        return navContainer;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const nav = createPageNavigation();
        if (nav.children.length > 0) {
            document.body.appendChild(nav);
        }

        document.addEventListener('keydown', function (e) {
            if (e.target.closest('input, textarea, select, [contenteditable]')) return;
            const nav = getNavigationPages();
            if (e.key === 'ArrowLeft' && nav.previous) {
                window.location.href = nav.previous;
            } else if (e.key === 'ArrowRight' && nav.next) {
                window.location.href = nav.next;
            }
        });
    });
})();
