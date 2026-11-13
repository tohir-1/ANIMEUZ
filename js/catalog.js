(function() {
  let currentPage = 1;
  const perPage = 24;
  let filtered = [];

  function getFilters() {
    return {
      search: (document.getElementById('filter-search') || {}).value || '',
      genre: (document.getElementById('filter-genre') || {}).value || '',
      year: (document.getElementById('filter-year') || {}).value || '',
      rating: (document.getElementById('filter-rating') || {}).value || '',
      type: (document.getElementById('filter-type') || {}).value || '',
      status: (document.getElementById('filter-status') || {}).value || '',
      sort: (document.getElementById('filter-sort') || {}).value || 'rating-desc'
    };
  }

  function applyFilters() {
    const f = getFilters();
    let list = [...(window.animeData || [])];

    if (f.search.trim()) {
      const q = f.search.trim().toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.originalTitle.toLowerCase().includes(q) ||
        a.genres.some(g => g.toLowerCase().includes(q))
      );
    }
    if (f.genre) list = list.filter(a => a.genres.includes(f.genre));
    if (f.year) list = list.filter(a => String(a.year) === f.year);
    if (f.rating) list = list.filter(a => a.rating >= parseFloat(f.rating));
    if (f.type) list = list.filter(a => a.type === f.type);
    if (f.status) list = list.filter(a => a.status === f.status);

    switch (f.sort) {
      case 'rating-desc': list.sort((a, b) => b.rating - a.rating); break;
      case 'rating-asc': list.sort((a, b) => a.rating - b.rating); break;
      case 'year-desc': list.sort((a, b) => b.year - a.year); break;
      case 'year-asc': list.sort((a, b) => a.year - b.year); break;
      case 'title-asc': list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title-desc': list.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'views-desc': list.sort((a, b) => b.views - a.views); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }

    filtered = list;
    currentPage = 1;
    renderPage();
  }

  function renderPage() {
    const container = document.getElementById('catalog-grid');
    const info = document.getElementById('results-info');
    const pagination = document.getElementById('pagination');
    if (!container) return;

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage) || 1;
    const start = (currentPage - 1) * perPage;
    const pageItems = filtered.slice(start, start + perPage);

    if (info) {
      info.textContent = total > 0
        ? `${total} ta anime topildi (sahifa ${currentPage}/${totalPages})`
        : 'Hech narsa topilmadi';
    }

    renderAnime(container, pageItems);

    if (pagination) {
      if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
      }
      let html = `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">‹</button>`;
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
          html += `<button class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
          html += `<span style="padding:0 6px">…</span>`;
        }
      }
      html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">›</button>`;
      pagination.innerHTML = html;
      pagination.querySelectorAll('button[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
          currentPage = parseInt(btn.dataset.page);
          renderPage();
          window.scrollTo({ top: 200, behavior: 'smooth' });
        });
      });
    }
  }

  function clearFilters() {
    ['filter-search', 'filter-genre', 'filter-year', 'filter-rating', 'filter-type', 'filter-status'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const sort = document.getElementById('filter-sort');
    if (sort) sort.value = 'rating-desc';
    applyFilters();
  }

  function initCatalog() {
    // URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('genre')) {
      const g = document.getElementById('filter-genre');
      if (g) g.value = params.get('genre');
    }
    if (params.get('q')) {
      const s = document.getElementById('filter-search');
      if (s) s.value = params.get('q');
    }

    // Populate year options
    const yearSelect = document.getElementById('filter-year');
    if (yearSelect && window.animeData) {
      const years = [...new Set(animeData.map(a => a.year))].sort((a, b) => b - a);
      years.forEach(y => {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
      });
    }

    // Events
    ['filter-search', 'filter-genre', 'filter-year', 'filter-rating', 'filter-type', 'filter-status', 'filter-sort'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', applyFilters);
        if (id === 'filter-search') {
          el.addEventListener('input', AnimeUZSearch.debounceSearch(applyFilters, 300));
        }
      }
    });

    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) clearBtn.addEventListener('click', clearFilters);

    applyFilters();
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('catalog-grid')) initCatalog();
  });
})();
