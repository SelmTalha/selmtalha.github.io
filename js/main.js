// Base path helper for GitHub Pages
function getBasePath() {
    const path = window.location.pathname;
    // If path is like /repository-name/ or /repository-name/index.html
    // Extract the base path
    // For root domain (username.github.io), return empty string
    // For project pages (username.github.io/repo-name/), return /repo-name
    const parts = path.split('/').filter(p => p);
    // If we're at root or index.html at root, no base path needed
    if (parts.length === 0 || (parts.length === 1 && parts[0] === 'index.html')) {
        return '';
    }
    // Check if first part is an HTML file (like index.html, about.html)
    // If so, we're at root level
    if (parts[0].endsWith('.html')) {
        return '';
    }
    // Otherwise, first part is likely the repository name
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
