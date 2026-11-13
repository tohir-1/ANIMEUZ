(function() {
  const HIST_KEY = 'animeuz_history';
  const MAX_HISTORY = 50;

  function getHistory() {
    try {
      const data = localStorage.getItem(HIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function addToHistory(anime) {
    if (!anime || !anime.id) return;
    let hist = getHistory();
    hist = hist.filter(h => h.id !== anime.id);
    hist.unshift({
      id: anime.id,
      title: anime.title,
      poster: anime.poster,
      date: new Date().toISOString()
    });
    if (hist.length > MAX_HISTORY) hist = hist.slice(0, MAX_HISTORY);
    localStorage.setItem(HIST_KEY, JSON.stringify(hist));
  }

  function clearHistory() {
    localStorage.setItem(HIST_KEY, '[]');
    if (window.showToast) showToast('Tarix tozalandi', 'success');
  }

  window.AnimeUZHistory = { getHistory, addToHistory, clearHistory };
})();
