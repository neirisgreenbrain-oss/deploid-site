"use strict";
(() => {
  const panels = [...document.querySelectorAll('.step-reader')];
  const lastSource = new WeakMap();
  panels.forEach(panel => {
    if (typeof panel.showPopover !== 'function') return;
    panel.setAttribute('popover', 'auto');
    panel.querySelector('.step-reader-close').hidden = false;
    panel.addEventListener('toggle', event => {
      if (event.newState !== 'closed' || panel.matches(':popover-open')) return;
      document.querySelectorAll('[aria-controls="' + panel.id + '"]').forEach(button => button.setAttribute('aria-expanded', 'false'));
      if (panel.contains(document.activeElement)) lastSource.get(panel)?.focus({preventScroll:true});
    });
    panel.querySelector('.step-reader-close').addEventListener('click', () => {
      panel.hidePopover();
      lastSource.get(panel)?.focus({preventScroll:true});
    });
  });
  function explain(source) {
    const panel = document.getElementById(source.getAttribute('aria-controls'));
    if (!panel?.classList.contains('step-reader')) return;
    if (typeof panel.showPopover === 'function') {
      lastSource.set(panel, source);
      document.querySelectorAll('[aria-controls="' + panel.id + '"]').forEach(button => button.setAttribute('aria-expanded', String(button === source)));
      if (!panel.matches(':popover-open')) panel.showPopover();
      panel.querySelector('.step-reader-close').focus({preventScroll:true});
    } else {
      panel.scrollIntoView({block:'nearest',behavior:'auto'});
    }
  }
  // Existing target listeners update the explanation before this bubbling listener runs.
  document.addEventListener('click', event => {
    const source = event.target.closest('[data-process-step],button.workflow-node');
    if (source) explain(source);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const panel = event.target.closest('.step-reader[popover]');
      if (panel?.matches(':popover-open')) {
        event.preventDefault();
        panel.hidePopover();
        lastSource.get(panel)?.focus({preventScroll:true});
      }
      return;
    }
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const source = event.target.closest('[data-process-step]');
    if (source) explain(source);
  });
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const status = document.getElementById(button.getAttribute('aria-describedby'));
      try {
        await navigator.clipboard.writeText(button.dataset.copyEmail);
        button.textContent = 'Адрес скопирован';
        status.textContent = 'Адрес ' + button.dataset.copyEmail + ' скопирован.';
      } catch {
        status.textContent = 'Не удалось скопировать автоматически. Адрес можно выделить в строке выше.';
      }
    });
  });
})();
