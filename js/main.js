// Base path helper for GitHub Pages
function getBasePath() {
    const pathname = window.location.pathname;
    // Remove leading and trailing slashes, then split
    const parts = pathname.replace(/^\/|\/$/g, '').split('/').filter(p => p);
    
    // If pathname is just '/' or empty, we're at root (user/organization page)
    if (parts.length === 0) {
        return '';
    }
    
    // If first part is an HTML file, we're at root level
    // (e.g., /blog-post.html or /index.html)
    if (parts[0].endsWith('.html')) {
        return '';
    }
    
    // If first part doesn't end with .html, it's likely a repository name
    // (e.g., /repo-name/blog-post.html or /repo-name/)
    // Return the repository name as base path
    return '/' + parts[0];
}

// Vanta.js Background Initialization
function initVantaBackground(type = 'waves') {
    const vantaConfig = {
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x5b21b6,
        shininess: 50.00,
        waveHeight: 15.00,
        waveSpeed: 0.75,
        zoom: 0.80
    };

    if (type === 'net') {
        VANTA.NET({
            ...vantaConfig,
            shininess: 150.00,
            waveHeight: 20.00,
            waveSpeed: 0.50,
            zoom: 0.75
        });
    } else {
        VANTA.WAVES(vantaConfig);
    }
}

// Initialize feather icons
function initFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    initFeatherIcons();
    // Reuse static loader if present, otherwise create
    let loader = document.querySelector('.app-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'app-loader';
        loader.innerHTML = '<div class="loader-shape"><div class="sq s1"></div><div class="sq s2"></div><div class="sq s3"></div></div>';
        document.body.appendChild(loader);
    }

    // Determine delay: slightly longer on index.html
    const isIndex = /(?:^|\/)index\.html?$/.test(window.location.pathname) || window.location.pathname === '/';
    const hideDelay = isIndex ? 900 : 500; // ms

    function hideLoader() {
        if (!loader) return;
        loader.classList.add('hidden');
        setTimeout(() => loader && loader.remove(), 320);
    }

    if (document.readyState === 'complete') {
        setTimeout(hideLoader, hideDelay);
    } else {
        window.addEventListener('load', () => setTimeout(hideLoader, hideDelay), { once: true });
        setTimeout(hideLoader, hideDelay + 1500);
    }
});
