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
                <a href="index.html" class="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                    <div class="relative">
                        <div class="logo-badge">SDC</div>
                        <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                    <span class="site-mark hidden sm:inline">Selim'in Dijital Günlüğü</span>
                </a>
                <nav class="hidden md:flex space-x-1 ml-auto">
                    ${navItems.map(item => `
                        <div class="relative group">
                            <a href="${item.href}" class="${activePage === item.id ? 'flex flex-col items-center justify-center w-14 h-14 bg-indigo-600/90 shadow-lg shadow-indigo-500/50 rounded-tl-[5px] rounded-br-[5px] text-white border border-indigo-400/50' : 'hover:text-white transition-all duration-300 flex flex-col items-center justify-center w-14 h-14 rounded-tl-[5px] rounded-br-[5px] bg-gray-800/80 hover:bg-indigo-600/90 hover:shadow-lg hover:shadow-indigo-500/40 text-gray-200 border border-gray-700/50 hover:border-indigo-400/50'}">
                                <span class="text-sm font-bold">${item.code}</span>
                                <div class="absolute -bottom-20 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-full shadow-lg border border-indigo-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                                    ${item.label}
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </nav>
                <button class="md:hidden text-white hover:text-indigo-300 transition-colors p-2" onclick="toggleMobileMenu()" aria-label="Menüyü Aç">
                    <i data-feather="menu" class="w-6 h-6"></i>
                </button>
                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden md:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
                    <div class="flex flex-col h-full">
                        <div class="flex justify-between items-center p-4 border-b border-gray-700">
                            <div class="flex items-center space-x-1">
                                <div class="relative">
                                    <div class="logo-badge">SDC</div>
                                    <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                                </div>
                                <span class="site-mark">Selim'in Dijital Günlüğü</span>
                            </div>
                            <button onclick="toggleMobileMenu()" class="text-white hover:text-indigo-300 transition-colors p-2" aria-label="Menüyü Kapat">
                                <i data-feather="x" class="w-6 h-6"></i>
                            </button>
                        </div>
                        <nav class="flex flex-col p-4 space-y-2 flex-grow">
                            ${navItems.map(item => `
                                <a href="${item.href}" onclick="toggleMobileMenu()" class="flex items-center justify-between p-4 rounded-lg ${activePage === item.id ? 'bg-indigo-600/90 text-white border border-indigo-400/50' : 'bg-gray-800/80 text-gray-200 hover:bg-indigo-600/90 hover:text-white border border-gray-700/50 hover:border-indigo-400/50'} transition-all duration-300">
                                    <div class="flex flex-col">
                                        <span class="text-sm font-bold">${item.code}</span>
                                        <span class="text-xs text-gray-400 ${activePage === item.id ? 'text-indigo-200' : ''}">${item.label}</span>
                                    </div>
                                    <i data-feather="chevron-right" class="w-5 h-5"></i>
                                </a>
                            `).join('')}
                        </nav>
                    </div>
                </div>
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
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        // Feather icons'ı yeniden yükle (menü açıldığında)
        if (typeof feather !== 'undefined') {
            setTimeout(() => feather.replace(), 100);
        }
    }
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
