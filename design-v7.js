"use strict";
(() => {
const content = {"topics": {"clients": {"title": "Обращения собраны в одном процессе.", "description": "Собрать обращения, назначить ответственного и видеть, на каком шаге клиент ждёт ответа.", "before": "Заявки в почте и мессенджерах", "after": "Одна история работы с клиентом", "steps": [["Обращение", "Форма, письмо или сообщение"], ["Обработка", "Ответственный и следующий шаг"], ["Контроль", "Статус заявки и история"]], "link": "orders"}, "operations": {"title": "Понятно, кто делает задачу и что дальше.", "description": "Распределить работу, связать согласования и напомнить о сроках. Руководителю виден ход процесса.", "before": "Задачи приходится держать в голове", "after": "У задачи есть срок и ответственный", "steps": [["Задача", "Что нужно сделать и к какому сроку"], ["Работа", "Исполнитель и согласование"], ["Результат", "Файлы, статус и история"]], "link": "orders"}, "information": {"title": "Меньше копирования и ручной сверки.", "description": "Собрать данные, проверить поля и подготовить документы. Спорное значение можно сверить с исходником.", "before": "Сведения разбросаны по файлам", "after": "Готовый материал с проверками", "steps": [["Материалы", "Файлы, таблицы и исходные данные"], ["Подготовка", "Извлечение и проверка полей"], ["Документ", "Сборка по нужному шаблону"]], "link": "documents"}, "systems": {"title": "Данные переходят между сервисами сами.", "description": "Связать инструменты, которыми уже пользуется компания. Определить, что передавать и как обрабатывать сбои.", "before": "Одни данные вводят несколько раз", "after": "Сервисы обмениваются нужными данными", "steps": [["Событие", "Новая запись в вашей системе"], ["Передача", "Проверка полей и повтор при сбое"], ["Обновление", "Нужные данные во втором сервисе"]], "link": "orders"}, "ai": {"title": "ИИ делает черновую работу. Вы контролируете результат.", "description": "Разбирать записи и документы, искать сведения, готовить черновики. Для важных решений предусмотреть проверку человеком.", "before": "Сотрудник начинает с пустого листа", "after": "Готовый материал для проверки", "steps": [["Материал", "Документ, запись или вопрос"], ["ИИ", "Обработка по заданным правилам"], ["Проверка", "Человек проверяет важное"]], "link": "research"}}};

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
function changed(element) {
  if (!motion.matches && element.animate) element.animate([{opacity:.4},{opacity:1}],{duration:180});
}
const topicButtons = [...document.querySelectorAll('[data-topic]')];
topicButtons.forEach(button => button.addEventListener('click', () => {
  const topic = content.topics[button.dataset.topic];
  if (!topic || button.getAttribute('aria-pressed') === 'true') return;
  topicButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('[data-title]').textContent = topic.title;
  document.querySelector('[data-description]').textContent = topic.description;
  document.querySelector('[data-before]').textContent = topic.before;
  document.querySelector('[data-after]').textContent = topic.after;
  const route = document.querySelector('[data-route]');
  route.replaceChildren(...topic.steps.map(([title, description]) => {
    const row = document.createElement('li');
    const heading = document.createElement('strong'); heading.textContent = title;
    const detail = document.createElement('span'); detail.textContent = description;
    row.append(heading, detail); return row;
  }));
  const link = document.querySelector('.topic-case');
  link.href = 'project-' + topic.link + '.html';
  changed(document.querySelector('[data-scenario]'));
}));
const filters = [...document.querySelectorAll('[data-filter]')];
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
