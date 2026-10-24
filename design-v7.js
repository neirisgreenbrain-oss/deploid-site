"use strict";
(() => {

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
function changed(element) {
  if (!motion.matches && element.animate) element.animate([{opacity:.4},{opacity:1}],{duration:180});
}
const filters = [...document.querySelectorAll('[data-filter]')];
const previews = [...document.querySelectorAll('.case-preview')];
const phone = window.matchMedia('(max-width: 680px)');
function setPreviewLayout() {
  previews.forEach(preview => { preview.open = !phone.matches; });
}
setPreviewLayout();
phone.addEventListener('change', setPreviewLayout);
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  document.querySelectorAll('.catalog-row').forEach(row => {
    const show = button.dataset.filter === 'all' || row.dataset.category.split(' ').includes(button.dataset.filter);
    row.hidden = !show; if (show) visible++;
  });
  const status = document.querySelector('.filter-status');
  status.textContent = button.dataset.filter === 'all' ? 'Показаны все избранные проекты' : 'Найдено по фильтру: ' + visible;
  changed(document.querySelector('.catalog-grid'));
}));
// Content stays readable without JS. Filters and stage controls enhance it only.
document.documentElement.classList.add('has-interactions');
})();
