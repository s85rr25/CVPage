(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', function () {
        const facts = [
            '4.0 GPA',
            '3 native languages',
            '200+ community transactions facilitated',
            '360 girls inspired at CodeHers',
            'UC Berkeley Marching Band TA',
            'Behavioral economics × product',
        ];
        let i = 0;
        const el = document.getElementById('fun-fact');
        if (!el) return;

        function tick() {
            el.textContent = facts[i];
            i = (i + 1) % facts.length;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        setInterval(tick, 3800);
    });
})();
