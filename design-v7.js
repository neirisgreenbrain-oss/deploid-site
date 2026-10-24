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
function selectFilter(button, updateUrl) {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  document.querySelectorAll('.catalog-row').forEach(row => {
    const show = button.dataset.filter === 'all' || row.dataset.category.split(' ').includes(button.dataset.filter);
    row.hidden = !show; if (show) visible++;
  });
  const status = document.querySelector('.filter-status');
  if (status) status.textContent = button.dataset.filter === 'all' ? 'В подборке: ' + visible : 'По фильтру: ' + visible;
  if (updateUrl) {
    const url = new URL(location.href);
    if (button.dataset.filter === 'all') url.searchParams.delete('filter');
    else url.searchParams.set('filter', button.dataset.filter);
    url.hash = '';
    history.replaceState(null, '', url);
  }
  changed(document.querySelector('.catalog-grid'));
}
function restoreFilter() {
  const value = new URL(location.href).searchParams.get('filter') || 'all';
  const button = filters.find(item => item.dataset.filter === value) || filters[0];
  if (button) selectFilter(button, false);
}
filters.forEach(button => button.addEventListener('click', () => selectFilter(button, true)));
restoreFilter();
window.addEventListener('popstate', restoreFilter);
// Content stays readable without JS. Filters and stage controls enhance it only.
document.documentElement.classList.add('has-interactions');
})();
