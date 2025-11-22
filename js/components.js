// Navbar Component - Tüm sayfalarda kullanılacak ortak navbar
function loadNavbar(activePage = '') {
    const navItems = [
        { href: 'index.html', code: 'AA', label: 'Anasayfa', id: 'home' },
        { href: 'chess-blog.html', code: 'SY', label: 'Satranç Yazılarım', id: 'chess' },
        { href: 'yazilim-blog.html', code: 'YZ', label: 'Yazılım Blogu', id: 'yazilim-blog' },
        { href: 'projects.html', code: 'PR', label: 'Projelerim', id: 'projects' },
        { href: 'photograph-gallery.html', code: 'FG', label: 'Fotoğraf Galerim', id: 'gallery' },
        { href: 'about.html', code: 'HA', label: 'Hakkımda', id: 'about' },
        { href: 'contact.html', code: 'İ', label: 'İletişim', id: 'contact' }
    ];

    const navbarHTML = `
        <header class="py-6 px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-1">
                    <div class="relative">
                        <div class="logo-badge">SDC</div>
                        <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                    <span class="site-mark hidden sm:inline">Selim'in Dijital Günlüğü</span>
                </div>
                <nav class="hidden md:flex space-x-1 ml-auto">
                    ${navItems.map(item => `
                        <div class="relative group">
                            <a href="${item.href}" class="${activePage === item.id ? 'flex flex-col items-center justify-center w-14 h-14 bg-indigo-700/80 shadow-lg shadow-indigo-500/40 rounded-tl-[5px] rounded-br-[5px]' : 'hover:text-indigo-300 transition-all duration-300 flex flex-col items-center justify-center w-14 h-14 rounded-tl-[5px] rounded-br-[5px] bg-indigo-800/50 hover:bg-indigo-700/70 hover:shadow-lg hover:shadow-indigo-500/40'}">
                                <span class="text-sm font-medium">${item.code}</span>
                                <div class="absolute -bottom-20 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-full shadow-lg border border-indigo-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    ${item.label}
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </nav>
                <button class="md:hidden" onclick="toggleMobileMenu()">
                    <i data-feather="menu"></i>
                </button>
            </div>
        </header>
    `;

    document.getElementById('navbar-container').innerHTML = navbarHTML;
    
    // Feather icons'ı yeniden yükle
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Footer Component - Tüm sayfalarda kullanılacak ortak footer
function loadFooter() {
    const footerHTML = `
        <footer class="py-6 text-center text-gray-400 text-sm mt-12">
            <p>Copyright © 2025 Selim's Digital Chronicle. All rights reserved.</p>
        </footer>
    `;

    document.getElementById('footer-container').innerHTML = footerHTML;
}

// Mobile menu toggle function
function toggleMobileMenu() {
    // Mobile menu fonksiyonalitesi buraya eklenebilir
    console.log('Mobile menu toggled');
}

// Sayfa yüklendiğinde componentleri yükle
document.addEventListener('DOMContentLoaded', function() {
    // Sayfaya göre aktif sekmeyi belirle
    const path = window.location.pathname;
    let activePage = '';
    
    if (path.includes('index.html') || path === '/') {
        activePage = 'home';
    } else if (path.includes('chess-blog.html')) {
        activePage = 'chess'; 
    } else if (path.includes('about.html')) {
        activePage = 'about';
    } else if (path.includes('yazilim-blog.html')) {
        activePage = 'yazilim-blog';
    } else if (path.includes('projects.html')) {
        activePage = 'projects';
    } else if (path.includes('photograph-gallery.html')) {
        activePage = 'gallery';
    } else if (path.includes('contact.html')) {
        activePage = 'contact';
    }
    
    loadNavbar(activePage);
    loadFooter();
});
