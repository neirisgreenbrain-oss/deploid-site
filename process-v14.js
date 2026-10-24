"use strict";
(() => {
  document.querySelectorAll('[data-bpmn]').forEach(diagram => {
    const panel = diagram.querySelector('.process-detail');
    if (!panel) return;
    const actions = [...diagram.querySelectorAll('[data-process-step]')];
    function select(action) {
      const id = action.dataset.processStep;
      actions.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.processStep === id)));
      panel.querySelector('strong').textContent = action.dataset.title;
      panel.querySelector('p').textContent = action.dataset.explanation;
    }
    actions.forEach(action => {
      action.addEventListener('click', () => select(action));
      action.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          select(action);
        }
      });
    });
  });
})();
