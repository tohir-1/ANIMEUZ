(function() {
  const THEME_KEY = 'animeuz_theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const btn = document.querySelector('.theme-btn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Light mode' : 'Dark mode');
    }
  }

  function toggleTheme() {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function initTheme() {
    setTheme(getTheme());
  }

  window.AnimeUZTheme = { getTheme, setTheme, toggleTheme, initTheme };
})();
