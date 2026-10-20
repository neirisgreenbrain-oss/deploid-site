(() => {
  const diagram = document.querySelector('.live-diagram');
  if (!diagram) return;
  const states = {
    normal: {title: 'Заявка сохранена, ответственный назначен', copy: 'Статус виден в системе. Следующий шаг не нужно искать в переписке.', stop: 3},
    missing: {title: 'Обработка остановлена: нужно уточнение', copy: 'Без обязательного поля заявка не уходит дальше. Владелец видит, каких данных не хватает.', stop: 1},
    offline: {title: 'Заявка сохранена в очереди на отправку', copy: 'Внешний сервис недоступен. Данные остаются в системе, а отправку можно повторить после восстановления связи.', stop: 2}
  };
  let selected = 'normal';
  let timers = [];
  const stages = [...diagram.querySelectorAll('[data-stage]')];
  const controls = [...diagram.querySelectorAll('button[data-scenario]')];
  const title = diagram.querySelector('[data-result-title]');
  const copy = diagram.querySelector('[data-result-copy]');
  const run = diagram.querySelector('.run-demo');
  function cancel() { timers.forEach(clearTimeout); timers = []; run.disabled = false; }
  function show() {
    const state = states[selected];
    diagram.dataset.scenario = selected;
    title.textContent = state.title;
    copy.textContent = state.copy;
    stages.forEach((stage, i) => { stage.className = i <= state.stop ? 'is-complete' : 'is-waiting'; if (selected !== 'normal' && i === state.stop) stage.className = 'is-attention'; });
    controls.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.scenario === selected)));
  }
  controls.forEach(button => button.addEventListener('click', () => { cancel(); selected = button.dataset.scenario; show(); }));
  run.addEventListener('click', () => {
    cancel();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { show(); return; }
    run.disabled = true;
    stages.forEach(stage => stage.className = 'is-waiting');
    title.textContent = 'Заявка проходит обработку';
    copy.textContent = 'Проверяем каждый шаг перед тем, как перейти к следующему.';
    for (let i = 0; i <= states[selected].stop; i++) timers.push(setTimeout(() => { stages[i].className = 'is-complete'; }, i * 450));
    timers.push(setTimeout(() => { show(); run.disabled = false; }, (states[selected].stop + 1) * 450));
  });
  show();
})();
