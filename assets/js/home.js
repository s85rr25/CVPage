/**
 * Home page: typewriter headline, cycling subtitle, stat count-up
 */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function typeWriter(el, fullText, speed, done) {
        if (!el) return;
        if (prefersReducedMotion) {
            el.textContent = fullText;
            if (done) done();
            return;
        }
        let i = 0;
        el.textContent = '';
        function tick() {
            if (i < fullText.length) {
                el.textContent += fullText.charAt(i);
                i++;
                setTimeout(tick, speed);
            } else if (done) {
                done();
            }
        }
        tick();
    }

    function cycleSubtitle(el, phrases, typingSpeed, startDelay) {
        if (!el || !phrases.length) return;
        if (prefersReducedMotion) {
            el.textContent = phrases[0];
            return;
        }
        let idx = 0;
        let current = '';
        let charIdx = 0;

        function erasePhrase() {
            if (current.length > 0) {
                current = current.slice(0, -1);
                el.textContent = current;
                setTimeout(erasePhrase, 28);
            } else {
                charIdx = 0;
                idx = (idx + 1) % phrases.length;
                setTimeout(typeNextPhrase, 400);
            }
        }

        function typeNextPhrase() {
            const target = phrases[idx];
            if (charIdx < target.length) {
                current += target.charAt(charIdx);
                charIdx++;
                el.textContent = current;
                setTimeout(typeNextPhrase, typingSpeed);
            } else {
                setTimeout(function () {
                    erasePhrase();
                }, 2200);
            }
        }

        setTimeout(function () {
            typeNextPhrase();
        }, startDelay || 0);
    }

    function animateValue(el, start, end, duration, formatter) {
        const t0 = performance.now();
        function frame(now) {
            const t = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = start + (end - start) * eased;
            el.textContent = formatter(val);
            if (t < 1) requestAnimationFrame(frame);
            else el.textContent = formatter(end);
        }
        requestAnimationFrame(frame);
    }

    function initStats() {
        const cards = document.querySelectorAll('[data-stat]');
        if (!cards.length) return;

        const obs = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    const wrap = entry.target;
                    const kind = wrap.getAttribute('data-stat');
                    const dur = prefersReducedMotion ? 0 : 1200;

                    if (kind === 'gpa') {
                        const el = wrap.querySelector('.js-stat-num');
                        if (el) animateValue(el, 0, 4, dur, function (v) { return v.toFixed(1); });
                    } else if (kind === 'billions') {
                        const el = wrap.querySelector('.js-stat-num');
                        if (el)
                            animateValue(el, 0, 56, dur, function (v) {
                                return Math.round(v) + 'B+';
                            });
                    } else if (kind === 'farmers') {
                        const el = wrap.querySelector('.js-stat-num');
                        if (el)
                            animateValue(el, 0, 350, dur, function (v) {
                                return Math.round(v) + '+';
                            });
                    }

                    obs.unobserve(wrap);
                });
            },
            { threshold: 0.35 }
        );

        cards.forEach(function (c) {
            obs.observe(c);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const sub = document.getElementById('hero-role');
        cycleSubtitle(
            sub,
            ['Data Scientist', 'Product Manager', 'Builder', 'UC Berkeley 28'],
            prefersReducedMotion ? 0 : 42,
            prefersReducedMotion ? 0 : 2600
        );

        initStats();
    });
})();
