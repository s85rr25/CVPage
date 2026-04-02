/**
 * Global: nav scroll state, mobile menu, cursor petal, scroll reveals
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initNavScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        const threshold = 24;

        function update() {
            if (window.scrollY > threshold) {
                header.classList.remove('header--transparent');
                header.classList.add('header--solid');
            } else {
                header.classList.add('header--transparent');
                header.classList.remove('header--solid');
            }
        }

        update();
        window.addEventListener('scroll', update, { passive: true });
    }

    function initMobileNav() {
        const header = document.querySelector('.header');
        const toggle = document.querySelector('.nav__toggle');
        const list = document.querySelector('.nav__list');
        if (!header || !toggle || !list) return;

        function close() {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        function open() {
            header.classList.add('nav-open');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        toggle.addEventListener('click', function () {
            if (header.classList.contains('nav-open')) close();
            else open();
        });

        list.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', close);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    }

    function initCursorPetal() {
        if (prefersReducedMotion) return;
        const petal = document.querySelector('.cursor-petal');
        if (!petal) return;

        let scheduled = false;
        let mx = 0;
        let my = 0;
        let cx = 0;
        let cy = 0;

        document.addEventListener(
            'mousemove',
            function (e) {
                mx = e.clientX;
                my = e.clientY;
                petal.classList.add('is-active');
                if (scheduled) return;
                scheduled = true;
                requestAnimationFrame(function () {
                    scheduled = false;
                    cx += (mx - cx) * 0.14;
                    cy += (my - cy) * 0.14;
                    petal.style.left = cx + 'px';
                    petal.style.top = cy + 'px';
                    petal.style.transform =
                        'translate(-50%, -50%) rotate(' + Math.min(12, cx * 0.04) + 'deg)';
                });
            },
            { passive: true }
        );

        document.addEventListener('mouseleave', function () {
            petal.classList.remove('is-active');
        });
    }

    function initReveal() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        const obs = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
            obs.observe(el);
        });
    }

    function initSkipLink() {
        const existing = document.querySelector('.skip-link');
        if (existing) return;
        const skip = document.createElement('a');
        skip.href = '#main';
        skip.className = 'skip-link';
        skip.textContent = 'Skip to main content';
        document.body.insertBefore(skip, document.body.firstChild);
        const main = document.querySelector('main');
        if (main && !main.id) main.id = 'main';
    }

    function initHeroVideo() {
        const video = document.querySelector('.hero__video');
        if (!video) return;
        video.addEventListener('loadedmetadata', function () {
            video.play().catch(function () {});
        });
        video.play().catch(function () {});
    }

    function initAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const href = anchor.getAttribute('href');
                if (!href || href === '#' || href.length < 2) return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var headerOffset = 72;
                    var y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initSkipLink();
        initNavScroll();
        initMobileNav();
        initCursorPetal();
        initReveal();
        initHeroVideo();
        initAnchorScroll();
    });
})();
