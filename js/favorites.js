(function () {
  const KEY = 'apex-f1-favorites';
  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  };
  const write = (items) => {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('favorites:changed'));
  };
  window.ApexFavorites = {
    all: read,
    has: (id) => read().includes(id),
    toggle(id) {
      const items = read();
      write(items.includes(id) ? items.filter(item => item !== id) : [...items, id]);
      return !items.includes(id);
    }
  };
})();
