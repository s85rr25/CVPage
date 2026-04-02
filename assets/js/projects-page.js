(function () {
    'use strict';

    document.querySelectorAll('[data-filter]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var f = btn.getAttribute('data-filter');
            document.querySelectorAll('.project-card').forEach(function (card) {
                var tags = (card.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
                var show = f === 'all' || tags.indexOf(f) !== -1;
                card.hidden = !show;
            });
            document.querySelectorAll('[data-filter]').forEach(function (b) {
                var active = b.getAttribute('data-filter') === f;
                b.classList.toggle('is-active', active);
                b.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        });
    });
})();
