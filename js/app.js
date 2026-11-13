/* ANIMEUZ Main App */
(function() {
  function showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function createToastContainer() {
    const c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function createAnimeCard(anime, index = 0) {
    const isFav = window.AnimeUZFavorites && AnimeUZFavorites.isFavorite(anime.id);
    const card = document.createElement('div');
    card.className = `anime-card card-enter stagger-${(index % 5) + 1}`;
    card.dataset.id = anime.id;
    card.innerHTML = `
      <div class="poster-wrap">
        <img src="${escapeHtml(anime.poster)}" alt="${escapeHtml(anime.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x450/1a1a25/a855f7?text=Anime'">
        <div class="rating-badge">★ ${anime.rating}</div>
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${anime.id}" aria-label="Sevimli">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-title" title="${escapeHtml(anime.title)}">${escapeHtml(anime.title)}</div>
        <div class="card-meta">
          <span>${anime.year}</span>
          <span>•</span>
          <span>${anime.type}</span>
        </div>
        <div class="genres">
          ${(anime.genres || []).slice(0, 2).map(g => `<span class="genre-tag">${escapeHtml(g)}</span>`).join('')}
        </div>
      </div>
    `;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn')) return;
      openAnimeDetails(anime.id);
    });
    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const active = AnimeUZFavorites.toggleFavorite(anime.id);
      favBtn.classList.toggle('active', active);
      favBtn.innerHTML = active ? '❤️' : '🤍';
    });
    return card;
  }

  function renderAnime(container, list, limit) {
    if (!container) return;
    container.innerHTML = '';
    const items = limit ? list.slice(0, limit) : list;
    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1">
          <div class="icon">🔍</div>
          <h3>Hech narsa topilmadi</h3>
          <p>Boshqa kalit so'z yoki filtr bilan urinib ko'ring</p>
        </div>`;
      return;
    }
    items.forEach((a, i) => container.appendChild(createAnimeCard(a, i)));
  }

  function renderTrending(container) {
    if (!container || !window.animeData) return;
    const sorted = [...animeData].sort((a, b) => b.views - a.views).slice(0, 10);
    renderAnime(container, sorted);
  }

  function renderLatest(container) {
    if (!container || !window.animeData) return;
    const sorted = [...animeData].sort((a, b) => b.year - a.year || b.id - a.id).slice(0, 12);
    renderAnime(container, sorted);
  }

  function renderTopRated(container) {
    if (!container || !window.animeData) return;
    const sorted = [...animeData].sort((a, b) => b.rating - a.rating).slice(0, 12);
    renderAnime(container, sorted);
  }

  function renderGenres(container) {
    if (!container) return;
    const genres = [
      { name: 'Action', icon: '⚔️' },
      { name: 'Adventure', icon: '🗺️' },
      { name: 'Comedy', icon: '😂' },
      { name: 'Drama', icon: '🎭' },
      { name: 'Fantasy', icon: '✨' },
      { name: 'Romance', icon: '💕' },
      { name: 'Horror', icon: '👻' },
      { name: 'Mystery', icon: '🔍' },
      { name: 'Sports', icon: '⚽' },
      { name: 'Sci-Fi', icon: '🚀' },
      { name: 'Supernatural', icon: '🌙' },
      { name: 'Slice of Life', icon: '🌸' }
    ];
    container.innerHTML = genres.map(g => `
      <div class="genre-card" data-genre="${g.name}">
        <div class="icon">${g.icon}</div>
        <h3>${g.name}</h3>
      </div>
    `).join('');
    container.querySelectorAll('.genre-card').forEach(card => {
      card.addEventListener('click', () => {
        window.location.href = `catalog.html?genre=${encodeURIComponent(card.dataset.genre)}`;
      });
    });
  }

  function openAnimeDetails(id) {
    window.location.href = `details.html?id=${id}`;
  }

  function setupHeader() {
    // Theme
    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => AnimeUZTheme.toggleTheme());
    }
    AnimeUZTheme.initTheme();

    // Mobile menu
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuBtn.innerHTML = mobileMenu.classList.contains('open') ? '✕' : '☰';
      });
    }

    // Search
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const closeSearch = document.querySelector('.close-search');

    if (searchBtn && searchOverlay) {
      searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        if (searchInput) searchInput.focus();
      });
    }
    if (closeSearch) {
      closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
    }
    if (searchOverlay) {
      searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) searchOverlay.classList.remove('active');
      });
    }

    if (searchInput && searchResults) {
      const doSearch = AnimeUZSearch.debounceSearch((q) => {
        const results = AnimeUZSearch.searchAnime(q, window.animeData || []);
        if (!q.trim()) {
          searchResults.innerHTML = '<p style="padding:16px;color:var(--text-muted)">Anime nomini yozing...</p>';
          return;
        }
        if (results.length === 0) {
          searchResults.innerHTML = '<p style="padding:16px;color:var(--text-muted)">Natija topilmadi</p>';
          return;
        }
        searchResults.innerHTML = results.map(a => `
          <div class="search-result-item" data-id="${a.id}">
            <img src="${escapeHtml(a.poster)}" alt="" loading="lazy" onerror="this.src='https://via.placeholder.com/50x70'">
            <div>
              <div style="font-weight:600">${escapeHtml(a.title)}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">${a.year} • ★ ${a.rating}</div>
            </div>
          </div>
        `).join('');
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => openAnimeDetails(item.dataset.id));
        });
      }, 280);
      searchInput.addEventListener('input', (e) => doSearch(e.target.value));
    }

    // Active nav
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    AnimeUZFavorites.updateFavoriteCount();
  }

  function initializeApp() {
    setupHeader();
  }

  window.showToast = showToast;
  window.escapeHtml = escapeHtml;
  window.createAnimeCard = createAnimeCard;
  window.renderAnime = renderAnime;
  window.renderTrending = renderTrending;
  window.renderLatest = renderLatest;
  window.renderTopRated = renderTopRated;
  window.renderGenres = renderGenres;
  window.openAnimeDetails = openAnimeDetails;
  window.initializeApp = initializeApp;

  document.addEventListener('DOMContentLoaded', initializeApp);
})();
