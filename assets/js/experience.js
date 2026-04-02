(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.timeline-card').forEach(function (card) {
            card.addEventListener('toggle', function () {
                document.querySelectorAll('.timeline-card[open]').forEach(function (other) {
                    if (other !== card) other.removeAttribute('open');
                });
            });
        });
    });
})();
