(function () {
    'use strict';

    // Loom modal functionality
    function initLoomModal() {
        const modal = document.getElementById('loom-modal');
        const iframe = document.getElementById('loom-iframe');
        const closeBtn = document.getElementById('loom-modal-close');
        
        if (!modal || !iframe) return;
        
        function openLoomModal(loomUrl) {
            // Extract embed URL from various Loom URL formats
            let embedUrl = loomUrl;
            if (loomUrl.includes('loom.com/')) {
                const videoId = loomUrl.split('/').pop();
                if (!videoId.includes('share') && !videoId.includes('embed')) {
                    embedUrl = `https://www.loom.com/embed/${videoId}`;
                }
            }
            if (!embedUrl.includes('embed')) {
                embedUrl = loomUrl.replace('loom.com/', 'loom.com/embed/');
            }
            
            iframe.src = embedUrl;
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLoomModal() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            iframe.src = '';
            document.body.style.overflow = '';
        }
        
        // Close button
        closeBtn.addEventListener('click', closeLoomModal);
        
        // Modal background click
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeLoomModal();
            }
        });
        
        // Keyboard escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                closeLoomModal();
            }
        });
        
        // Intercept Loom links
        document.querySelectorAll('a[href*="loom.com"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                const href = link.getAttribute('href');
                if (href.includes('loom.com')) {
                    e.preventDefault();
                    openLoomModal(href);
                }
            });
        });
    }

    // Carousel functionality - open gallery lightbox on carousel item click
    function initCarouselGalleryLinks() {
        document.querySelectorAll('.project-card__carousel-item').forEach(function (item) {
            item.addEventListener('click', function () {
                const track = item.closest('.project-card__carousel-track');
                const galleryName = track.getAttribute('data-gallery');
                if (!galleryName) return;
                
                const galleryContainer = document.querySelector(`[data-gallery="${galleryName}"]`);
                if (!galleryContainer || !galleryContainer.classList.contains('gallery-container')) return;
                
                // Find the gallery item index
                const carouselItems = track.querySelectorAll('.project-card__carousel-item');
                const itemIndex = Array.from(carouselItems).indexOf(item);
                
                // Open lightbox - trigger the gallery item click
                const galleryItem = galleryContainer.querySelectorAll('.gallery-item')[itemIndex];
                if (galleryItem) {
                    galleryItem.click();
                }
            });
        });
    }

    // Project filter functionality
    document.addEventListener('DOMContentLoaded', function () {
        // Loom modal
        initLoomModal();
        
        // Carousel gallery links
        initCarouselGalleryLinks();
        
        // Filter functionality
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
    });
})();
