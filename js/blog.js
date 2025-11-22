// Simple blog renderer with hash-based pagination
// Usage: BlogRenderer.render({ containerId: 'posts-container', paginationId: 'pagination', posts, pageSize: 4 })

const BlogRenderer = (function() {
    function parsePageFromHash() {
        const match = (location.hash || '').match(/page=(\d+)/);
        const page = match ? parseInt(match[1], 10) : 1;
        return Number.isFinite(page) && page > 0 ? page : 1;
    }

    function parseTagFromHash() {
        const match = (location.hash || '').match(/tag=([^&]+)/);
        return match ? decodeURIComponent(match[1]) : '';
    }

    function setPageInHash(page) {
        const tag = parseTagFromHash();
        const baseNoPage = (location.hash || '').replace(/page=\d+/, '').replace(/&&/g, '&').replace(/^#/, '').replace(/^&/, '');
        const params = [];
        if (tag) params.push(`tag=${encodeURIComponent(tag)}`);
        params.push(`page=${page}`);
        const next = params.length ? `#${params.join('&')}` : '';
        if (location.hash !== next) {
            location.hash = next;
        } else {
            // Force render if same hash clicked
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
    }

    function formatDate(dateStr) {
        // Expecting YYYY-MM-DD
        try {
            const [y, m, d] = dateStr.split('-').map(Number);
            return new Date(y, m - 1, d).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch { return dateStr; }
    }

    function renderPosts(containerEl, pagePosts) {
        containerEl.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-8';

        pagePosts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'bg-gray-800 bg-opacity-70 rounded-xl overflow-hidden shadow-lg transition transform hover:scale-105';
            card.innerHTML = `
                <img src="${post.image}" alt="${post.imageAlt}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-400 mb-2">
                        <span>${formatDate(post.date)}</span>
                        <span class="mx-2">•</span>
                        <span>${post.readingTime}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2">${post.title}</h3>
                    <p class="text-gray-300 mb-4">${post.excerpt}</p>
                    <a href="${post.href}" class="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center">
                        Devamını Oku <i data-feather="arrow-right" class="ml-1 w-4 h-4"></i>
                    </a>
                </div>`;
            grid.appendChild(card);
        });

        containerEl.appendChild(grid);
        if (typeof feather !== 'undefined') feather.replace();
    }

    function renderPagination(paginationEl, totalPages, currentPage, onNavigate) {
        paginationEl.innerHTML = '';
        if (totalPages <= 1) return;
        const nav = document.createElement('nav');
        nav.className = 'mt-10 flex items-center justify-center gap-2';

        const makeBtn = (label, page, isActive, isEdge) => {
            const btn = document.createElement('button');
            btn.textContent = String(label);
            btn.className = isActive
                ? 'px-3 py-2 rounded bg-indigo-600 text-white cursor-default'
                : 'px-3 py-2 rounded bg-gray-800/70 hover:bg-gray-800 text-gray-200';
            btn.disabled = isActive;
            btn.addEventListener('click', () => onNavigate(page));
            return btn;
        };

        // Prev
        const prev = makeBtn('<', Math.max(1, currentPage - 1), false, true);
        prev.disabled = currentPage === 1;
        prev.className += ' ml-1';
        nav.appendChild(prev);

        for (let p = 1; p <= totalPages; p++) {
            nav.appendChild(makeBtn(p, p, p === currentPage));
        }

        // Next
        const next = makeBtn('>', Math.min(totalPages, currentPage + 1), false, true);
        next.disabled = currentPage === totalPages;
        next.className += ' mr-1';
        nav.appendChild(next);

        paginationEl.appendChild(nav);
    }

    function render({ containerId, paginationId, posts, pageSize = 4 }) {
        if (!Array.isArray(posts)) return;

        const containerEl = document.getElementById(containerId);
        const paginationEl = document.getElementById(paginationId);
        if (!containerEl || !paginationEl) return;

        // Sort by date desc
        const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

        function update() {
            const tag = parseTagFromHash();
            const filtered = tag ? sorted.filter(p => Array.isArray(p.tags) && p.tags.includes(tag)) : sorted;
            const currentPage = Math.min(parsePageFromHash(), Math.max(1, Math.ceil(filtered.length / pageSize)));
            const start = (currentPage - 1) * pageSize;
            const pagePosts = filtered.slice(start, start + pageSize);
            renderPosts(containerEl, pagePosts);
            renderPagination(paginationEl, Math.ceil(filtered.length / pageSize), currentPage, (p) => setPageInHash(p));
        }

        window.addEventListener('hashchange', update);
        update();
    }

    return { render };
})();



