'use strict';

// Local integration hooks only. No network requests, cookies or visitor IDs.
function interaction(name, placement, topic) {
  document.dispatchEvent(new CustomEvent('deploid:interaction', {
    detail: { name: name, placement: placement || '', topic: topic || '' }
  }));
}

document.addEventListener('click', function (event) {
  var action = event.target.closest('[data-event]');
  if (action) interaction(action.dataset.event, action.dataset.placement, action.dataset.topic);
});

document.querySelectorAll('[data-copy-email]').forEach(function (button) {
  button.addEventListener('click', async function () {
    var status = button.closest('.contact-card').querySelector('.copy-status');
    var timer;
    status.textContent = 'Копирую адрес…';
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await Promise.race([
        navigator.clipboard.writeText('vankov@deploid.ru'),
        new Promise(function (_, reject) {
          timer = setTimeout(function () { reject(new Error('Clipboard timeout')); }, 2500);
        })
      ]);
      status.textContent = 'Адрес скопирован: vankov@deploid.ru';
      interaction('email_copy_success', 'contact');
    } catch (_) {
      status.textContent = 'Не удалось скопировать. Выделите адрес выше или ответьте на моё письмо.';
      interaction('email_copy_failed', 'contact');
    } finally {
      clearTimeout(timer);
    }
  });
});

document.querySelectorAll('.tech').forEach(function (details) {
  details.addEventListener('toggle', function () {
    if (details.open) interaction('case_detail_open', 'case', details.closest('.case').id);
  });
});
