"use strict";
(() => {
  // Keep the way back to the selected case list in this tab only.
  const key = 'deploid-catalogue-return';
  const catalogue = document.querySelector('.catalog-grid');
  const validFilter = value => ['all', 'process', 'app', 'data'].includes(value);
  if (catalogue) {
    catalogue.querySelectorAll('.catalog-row').forEach(row => {
      if (!row.id) row.id = 'case-' + row.dataset.project;
    });
    catalogue.addEventListener('click', event => {
      const link = event.target.closest('a');
      const row = link?.closest('.catalog-row');
      if (!row) return;
      const filter = document.querySelector('[data-filter][aria-pressed="true"]')?.dataset.filter || 'all';
      try { sessionStorage.setItem(key, JSON.stringify({filter, id:row.id})); } catch { /* Browsing still works when storage is disabled. */ }
    });
  } else if (document.querySelector('.case-page')) {
    try {
      const saved = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (!saved || !validFilter(saved.filter) || !/^[a-z0-9-]+$/.test(saved.id)) return;
      document.querySelectorAll('a[href="portfolio.html"]').forEach(link => {
        link.href = 'portfolio.html' + (saved.filter === 'all' ? '' : '?filter=' + saved.filter) + '#' + saved.id;
      });
    } catch { /* Default catalogue links remain available. */ }
  }
})();
