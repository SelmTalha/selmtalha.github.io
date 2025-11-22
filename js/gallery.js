// Gallery functionality
let currentImageIndex = 0;
let currentCategory = 'all';
let visibleImages = [];

function filterGallery(category) {
    currentCategory = category;
    const galleryItems = document.querySelectorAll('.gallery-item');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.category-btn').classList.add('active');
    
    visibleImages = [];
    galleryItems.forEach((item, index) => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            visibleImages.push(item);
        } else {
            item.style.display = 'none';
        }
    });
    
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

function openModal(element) {
    const img = element.querySelector('img');
    const title = element.querySelector('h3').textContent;
    const location = element.querySelector('p').textContent;
    const settings = element.querySelector('.flex span').textContent;
    
    document.getElementById('modal-image').src = img.src;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-location').textContent = location;
    document.getElementById('modal-settings').textContent = settings;
    
    const allItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item => 
        item.style.display !== 'none'
    );
    currentImageIndex = allItems.indexOf(element);
    visibleImages = allItems;
    
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    const nextItem = visibleImages[currentImageIndex];
    
    const img = nextItem.querySelector('img');
    const title = nextItem.querySelector('h3').textContent;
    const location = nextItem.querySelector('p').textContent;
    const settings = nextItem.querySelector('.flex span').textContent;
    
    document.getElementById('modal-image').src = img.src;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-location').textContent = location;
    document.getElementById('modal-settings').textContent = settings;
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    const prevItem = visibleImages[currentImageIndex];
    
    const img = prevItem.querySelector('img');
    const title = prevItem.querySelector('h3').textContent;
    const location = prevItem.querySelector('p').textContent;
    const settings = prevItem.querySelector('.flex span').textContent;
    
    document.getElementById('modal-image').src = img.src;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-location').textContent = location;
    document.getElementById('modal-settings').textContent = settings;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('modal') && document.getElementById('modal').classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

// Initialize visible images
window.addEventListener('load', function() {
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
        visibleImages = Array.from(document.querySelectorAll('.gallery-item'));
    }
});
