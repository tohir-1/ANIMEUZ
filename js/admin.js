(function() {
  const ADMIN_KEY = 'animeuz_admin_data';

  function getAdminData() {
    try {
      const d = localStorage.getItem(ADMIN_KEY);
      return d ? JSON.parse(d) : null;
    } catch { return null; }
  }

  function initAdmin() {
    const list = document.getElementById('admin-list');
    if (!list) return;

    const data = getAdminData() || window.animeData || [];
    list.innerHTML = `
      <p style="margin-bottom:16px;color:var(--text-muted)">
        Jami: ${data.length} ta anime. Bu frontend-only demo. O'zgarishlar LocalStorage da saqlanadi.
        Haqiqiy admin panel uchun backend kerak.
      </p>
      <div class="anime-grid" id="admin-grid"></div>
    `;
    const grid = document.getElementById('admin-grid');
    if (grid) renderAnime(grid, data.slice(0, 24));
  }

  document.addEventListener('DOMContentLoaded', initAdmin);
})();
