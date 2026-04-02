// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    if (!lightboxImage || !lightboxClose || !lightboxPrev || !lightboxNext || !lightboxCounter) return;
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Get all gallery items from all galleries
    function getAllGalleryItems() {
        return Array.from(document.querySelectorAll('.gallery-item'));
    }
    
    // Open lightbox
    function openLightbox(index, galleryName = null) {
        const allItems = getAllGalleryItems();
        
        // If gallery name is specified, filter items from that gallery
        if (galleryName) {
            const galleryContainer = document.querySelector(`[data-gallery="${galleryName}"]`);
            if (galleryContainer) {
                currentImages = Array.from(galleryContainer.querySelectorAll('.gallery-item'));
            } else {
                currentImages = allItems;
            }
        } else {
            currentImages = allItems;
        }
        
        if (currentImages.length === 0) return;
        
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Update lightbox image
    function updateLightboxImage() {
        if (currentImages.length === 0) return;
        
        const currentItem = currentImages[currentIndex];
        const imageSrc = currentItem.getAttribute('data-src');
        lightboxImage.src = imageSrc;
        lightboxImage.alt = currentItem.querySelector('img').alt || 'Gallery Image';
        
        // Update counter
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        
        // Update navigation buttons visibility
        lightboxPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
    }
    
    // Navigate to previous image
    function prevImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }
    
    // Navigate to next image
    function nextImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }
    
    // Add click event to all gallery items
    const galleryItems = getAllGalleryItems();
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Find which gallery this item belongs to
            const galleryContainer = this.closest('.gallery-container');
            const galleryName = galleryContainer ? galleryContainer.getAttribute('data-gallery') : null;
            
            // Find index within the gallery
            const galleryItems = galleryContainer 
                ? Array.from(galleryContainer.querySelectorAll('.gallery-item'))
                : getAllGalleryItems();
            const itemIndex = galleryItems.indexOf(this);
            
            openLightbox(itemIndex, galleryName);
        });
    });
    
    // Close lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        // Close if clicking on the background (not on the image or controls)
        if (e.target === lightbox || e.target === lightboxImage) {
            closeLightbox();
        }
    });
    
    // Navigation events
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });
    
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - previous image
                prevImage();
            }
        }
    }
    
    // Prevent image drag in lightbox
    lightboxImage.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
    
    // Add loading state for images
    lightboxImage.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    lightboxImage.addEventListener('loadstart', function() {
        this.style.opacity = '0.5';
    });

    document.querySelectorAll('[data-open-gallery]').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            if (e.target.closest('a[href]')) return;
            const name = trigger.getAttribute('data-open-gallery');
            if (!name) return;
            const container = document.querySelector('[data-gallery="' + name + '"]');
            if (!container) return;
            const first = container.querySelector('.gallery-item');
            if (first) {
                e.preventDefault();
                first.click();
            }
        });
        trigger.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            if (e.target.closest('a[href]')) return;
            e.preventDefault();
            trigger.click();
        });
    });
});

