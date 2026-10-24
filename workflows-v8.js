"use strict";
(() => {
  const graphs = {"orders": {"title": "Путь заказа и возврат на доработку", "height": [360, 390], "nodes": [{"id": "request", "title": "Заявка", "kind": "Вход", "detail": "Задание и исходные файлы поступают в Telegram-бот.", "small": [25, 55], "wide": [17, 60]}, {"id": "order", "title": "Карточка заказа", "kind": "Данные", "detail": "Статус, файлы и события хранятся в одном заказе.", "small": [75, 55], "wide": [50, 60]}, {"id": "worker", "title": "Исполнитель", "kind": "Работа", "detail": "Исполнитель получает свою задачу и передаёт результат.", "small": [25, 175], "wide": [83, 60]}, {"id": "review", "title": "Проверка результата", "kind": "Человек", "detail": "Человек принимает работу или возвращает её исполнителю на доработку.", "small": [75, 175], "wide": [83, 210]}, {"id": "accepted", "title": "Принятый результат", "kind": "Результат", "detail": "Готовые файлы остаются в истории заказа.", "small": [75, 305], "wide": [50, 310]}, {"id": "account", "title": "Расчёты и история", "kind": "Учёт", "detail": "Начисления связаны с заказом. Если ставка отсутствует, система сообщает об ошибке.", "small": [25, 305], "wide": [17, 310]}], "edges": [{"a": "request", "b": "order", "ports": "auto", "label": "", "style": ""}, {"a": "order", "b": "worker", "ports": "elbow", "label": "", "style": ""}, {"a": "worker", "b": "review", "ports": "auto", "label": "", "style": ""}, {"a": "review", "b": "worker", "ports": "return", "label": "Доработка", "style": "return"}, {"a": "review", "b": "accepted", "ports": "auto", "label": "Принято", "style": ""}, {"a": "accepted", "b": "account", "ports": "auto", "label": "", "style": ""}], "problem": "Файлы, статусы заказов и расчёты приходилось искать в разных переписках."}, "documents": {"title": "Сборка с отдельной проверкой комплекта", "height": [465, 440], "nodes": [{"id": "files", "title": "Исходные файлы", "kind": "Вход", "detail": "Исходные материалы определяют, что нужно подготовить.", "small": [25, 55], "wide": [20, 60]}, {"id": "rules", "title": "Требования", "kind": "Условия", "detail": "Заранее определяется нужная структура и состав комплекта.", "small": [75, 55], "wide": [80, 60]}, {"id": "build", "title": "План и черновик", "kind": "ИИ", "detail": "ИИ-агенты помогают разобрать требования, подготовить план и текст. Это отдельный этап перед программной сборкой документов.", "small": [50, 175], "wide": [50, 165]}, {"id": "check", "title": "Сборка и проверка", "kind": "Код", "detail": "Программы собирают DOCX, проверяют структуру, вложения и состав архива. Смысл документа проверяется отдельно.", "small": [50, 295], "wide": [50, 285]}, {"id": "errors", "title": "Список ошибок", "kind": "Нужна доработка", "detail": "Пропущенные элементы и технические ошибки нужно исправить перед передачей.", "small": [25, 415], "wide": [20, 390]}, {"id": "package", "title": "Готовый комплект", "kind": "Результат", "detail": "После технической проверки можно передавать комплект на содержательную проверку.", "small": [75, 415], "wide": [80, 390]}], "edges": [{"a": "files", "b": "build", "ports": "auto", "label": "", "style": ""}, {"a": "rules", "b": "build", "ports": "auto", "label": "", "style": ""}, {"a": "build", "b": "check", "ports": "auto", "label": "", "style": ""}, {"a": "check", "b": "errors", "ports": "auto", "label": "Есть ошибки", "style": ""}, {"a": "check", "b": "package", "ports": "auto", "label": "Проверено", "style": ""}], "problem": "При ручной сборке документов легко пропустить раздел или забыть файл."}, "workspace": {"title": "Один проект объединяет рабочие инструменты", "height": [400, 455], "nodes": [{"id": "browser", "title": "Браузер", "kind": "Доступ", "detail": "Рабочая панель открывается в браузере.", "small": [25, 55], "wide": [50, 55]}, {"id": "server", "title": "Сервер проекта", "kind": "Общий центр", "detail": "Сервер связывает диалоги, инструменты и текущие процессы.", "small": [75, 55], "wide": [50, 175]}, {"id": "dialog", "title": "ИИ-агент и история", "kind": "ИИ", "detail": "ИИ-агент получает запросы, работает с проектом через инструменты и сохраняет историю диалога. Запросы разрешений остаются видны человеку.", "small": [25, 190], "wide": [17, 305]}, {"id": "files", "title": "Файлы и изменения", "kind": "Инструмент", "detail": "Файлы и изменения проекта доступны рядом с диалогом.", "small": [75, 190], "wide": [50, 305]}, {"id": "terminal", "title": "Терминал", "kind": "Инструмент", "detail": "Процесс работает на сервере: закрытие браузера не означает его остановку.", "small": [25, 335], "wide": [83, 305]}, {"id": "permission", "title": "Запрос разрешения", "kind": "Человек", "detail": "Если действие требует разрешения, пользователь видит запрос и принимает решение.", "small": [75, 335], "wide": [17, 415]}], "edges": [{"a": "browser", "b": "server", "ports": "auto", "label": "", "style": ""}, {"a": "server", "b": "dialog", "ports": "auto", "label": "", "style": ""}, {"a": "server", "b": "files", "ports": "auto", "label": "", "style": ""}, {"a": "server", "b": "terminal", "ports": "outside-left", "label": "", "style": ""}, {"a": "dialog", "b": "permission", "ports": "auto", "label": "Если нужно", "style": ""}], "problem": "Диалог, файлы и команды находятся в разных окнах; после перерыва теряется контекст."}, "listings": {"title": "Форма проходит проверку до следующего шага", "height": [365, 410], "nodes": [{"id": "template", "title": "Данные и шаблон", "kind": "Вход", "detail": "Заголовок, описание, цена и адрес готовятся заранее.", "small": [25, 55], "wide": [17, 60]}, {"id": "form", "title": "Заполнение формы", "kind": "Браузер", "detail": "Программа переносит данные в поля формы. Есть пробный режим без публикации.", "small": [75, 55], "wide": [50, 60]}, {"id": "check", "title": "Сверка полей", "kind": "Код", "detail": "Перед продолжением сверяются ключевые значения, включая цену и адрес.", "small": [75, 180], "wide": [83, 180]}, {"id": "operator", "title": "Решение оператора", "kind": "Если проблема", "detail": "При проблеме программа останавливается и предлагает оператору выбрать действие.", "small": [25, 180], "wide": [83, 340]}, {"id": "progress", "title": "Сохранённый прогресс", "kind": "Продолжение", "detail": "Обработанные записи сохраняются, чтобы продолжить работу после остановки.", "small": [50, 310], "wide": [17, 300]}], "edges": [{"a": "template", "b": "form", "ports": "auto", "label": "", "style": ""}, {"a": "form", "b": "check", "ports": "auto", "label": "", "style": ""}, {"a": "check", "b": "operator", "ports": "auto", "label": "Проблема", "style": ""}, {"a": "check", "b": "progress", "ports": "auto", "label": "Проверено", "style": ""}], "problem": "Одни и те же поля заполняются вручную, легко ошибиться в цене или адресе."}, "research": {"title": "Утверждение сверяется с текстом источника", "height": [365, 410], "nodes": [{"id": "pages", "title": "Страницы компании", "kind": "Источники", "detail": "Сохраняются материалы с открытых страниц компании.", "small": [25, 55], "wide": [17, 60]}, {"id": "claims", "title": "Сведения о компании", "kind": "ИИ", "detail": "ИИ выделяет утверждения из собранных материалов и готовит черновик сведений.", "small": [75, 55], "wide": [50, 60]}, {"id": "quotes", "title": "Текст источника", "kind": "Основание", "detail": "У проверки есть исходный текст, с которым можно сопоставить цитату.", "small": [25, 180], "wide": [17, 210]}, {"id": "verify", "title": "Сверка цитаты", "kind": "ИИ + код", "detail": "ИИ помогает проверить утверждения. Код дополнительно проверяет присутствие цитаты в исходном тексте. Это не гарантирует истинность самого источника.", "small": [75, 180], "wide": [83, 210]}, {"id": "material", "title": "Материал со ссылками", "kind": "Есть подтверждение", "detail": "Подтверждённые фрагменты сохраняются со ссылками на источник.", "small": [25, 310], "wide": [50, 355]}, {"id": "uncertain", "title": "Не подтверждено", "kind": "Требует внимания", "detail": "Если подтверждение не найдено, утверждение нельзя выдавать за проверенный факт.", "small": [75, 310], "wide": [83, 355]}], "edges": [{"a": "pages", "b": "claims", "ports": "auto", "label": "", "style": ""}, {"a": "pages", "b": "quotes", "ports": "auto", "label": "", "style": ""}, {"a": "claims", "b": "verify", "ports": "auto", "label": "", "style": ""}, {"a": "quotes", "b": "verify", "ports": "auto", "label": "", "style": ""}, {"a": "verify", "b": "material", "ports": "auto", "label": "Цитата найдена", "style": ""}, {"a": "verify", "b": "uncertain", "ports": "auto", "label": "Не найдена", "style": ""}], "problem": "Сведения разбросаны по сайтам, а утверждения ИИ сложно проверить."}};
  const ns = 'http://www.w3.org/2000/svg';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const svgNode = (tag, attrs) => {
    const element = document.createElementNS(ns, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  };
  const diagrams = [...document.querySelectorAll('[data-workflow]')];
  diagrams.forEach((diagram, index) => {
    const graph = graphs[diagram.dataset.workflow];
    const canvas = diagram.querySelector('.workflow-canvas');
    const svg = diagram.querySelector('.workflow-edges');
    const nodes = [...diagram.querySelectorAll('[data-node]')];
    const detail = diagram.dataset.detail === 'true';
    let selected = detail ? graph.nodes[0].id : null;
    let frame = 0;

    function highlight(id) {
      svg.querySelectorAll('[data-from]').forEach(line => {
        line.classList.toggle('is-connected', line.dataset.from === id || line.dataset.to === id);
      });
      nodes.forEach(node => node.classList.toggle('is-selected', node.dataset.node === selected));
    }

    function draw() {
      frame = 0;
      const width = canvas.clientWidth;
      if (!width) return;
      const wide = width >= 640;
      canvas.classList.toggle('is-wide', wide);
      canvas.classList.add('is-laid-out');
      const scale = detail ? 1 : .82;
      canvas.style.height = graph.height[wide ? 1 : 0] * scale + 'px';
      graph.nodes.forEach((entry, i) => {
        const [x, y] = entry[wide ? 'wide' : 'small'];
        nodes[i].style.left = x + '%'; nodes[i].style.top = y * scale + 'px';
      });
      const bounds = canvas.getBoundingClientRect();
      const rects = {};
      nodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        rects[node.dataset.node] = {
          left: rect.left - bounds.left, right: rect.right - bounds.left,
          top: rect.top - bounds.top, bottom: rect.bottom - bounds.top,
          x: (rect.left + rect.right) / 2 - bounds.left,
          y: (rect.top + rect.bottom) / 2 - bounds.top
        };
      });
      svg.setAttribute('viewBox', '0 0 ' + width + ' ' + canvas.clientHeight);
      svg.replaceChildren();
      const defs = svgNode('defs');
      const marker = svgNode('marker', {id:'workflow-arrow-' + index, viewBox:'0 0 10 10', refX:9, refY:5, markerWidth:6, markerHeight:6, orient:'auto-start-reverse'});
      marker.append(svgNode('path',{d:'M 1 1 L 9 5 L 1 9 Z',fill:'context-stroke'}));
      defs.append(marker); svg.append(defs);
      graph.edges.forEach(edge => {
        const from = rects[edge.a], to = rects[edge.b];
        const dx = to.x - from.x, dy = to.y - from.y;
        let points, label;
        const outsideRight = (edge.ports === 'outside-right' && !wide) || (edge.ports === 'return' && wide);
        if (outsideRight) {
          const x = width - 5;
          points = [[from.right,from.y],[x,from.y],[x,to.y],[to.right,to.y]];
        } else if (edge.ports === 'outside-left' && !wide) {
          const y = from.bottom + 30;
          points = [[from.x,from.bottom],[from.x,y],[4,y],[4,to.y],[to.left,to.y]];
        } else if (edge.ports === 'return') {
          const y = Math.max(from.bottom,to.bottom) + 31;
          points = [[from.x,from.bottom],[from.x,y],[to.x,y],[to.x,to.bottom]];
          label = [(from.x+to.x)/2,y+15,'middle'];
        } else if (Math.abs(dy) < 8) {
          const x1 = dx > 0 ? from.right : from.left;
          const x2 = dx > 0 ? to.left : to.right;
          points = [[x1,from.y],[x2,to.y]];
          label = [(x1+x2)/2,Math.min(from.top,to.top)-12,'middle'];
        } else {
          const y1 = dy > 0 ? from.bottom : from.top;
          const y2 = dy > 0 ? to.top : to.bottom;
          const middle = (y1+y2)/2;
          points = [[from.x,y1],[from.x,middle],[to.x,middle],[to.x,y2]];
          label = Math.abs(dx)<8 ? [to.x+8,middle+3,'start'] : [to.x,middle-3,'middle'];
        }
        const d = points.map(([x,y],i) => (i ? 'L ' : 'M ') + x + ' ' + y).join(' ');
        const path = svgNode('path',{d, 'marker-end':'url(#workflow-arrow-'+index+')', 'data-from':edge.a, 'data-to':edge.b, class:edge.style === 'return' ? 'workflow-edge is-return' : 'workflow-edge'});
        svg.append(path);
        if (edge.label && label) {
          const text = svgNode('text',{x:label[0],y:label[1],'text-anchor':label[2],class:'edge-label'});
          text.textContent = edge.label; svg.append(text);
        }
      });
      highlight(selected);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
    if (detail) nodes.forEach(node => {
      node.addEventListener('click', () => {
        selected = node.dataset.node;
        const item = graph.nodes.find(entry => entry.id === selected);
        nodes.forEach(entry => entry.setAttribute('aria-pressed', String(entry === node)));
        const explanation = diagram.querySelector('.workflow-explanation');
        explanation.textContent = item.detail;
        const title = diagram.querySelector('.workflow-detail-title');
        const role = diagram.querySelector('.workflow-detail-role');
        if (title) title.textContent = item.title;
        if (role) { role.textContent = item.kind; role.classList.toggle('is-ai', item.kind.includes('ИИ')); }
        if (!reduced.matches && explanation.animate) explanation.animate([{opacity:.45},{opacity:1}],{duration:160});
        highlight(selected);
      });
      node.addEventListener('pointerenter', () => highlight(node.dataset.node));
      node.addEventListener('pointerleave', () => highlight(selected));
      node.addEventListener('focus', () => highlight(node.dataset.node));
      node.addEventListener('blur', () => highlight(selected));
    });
    new ResizeObserver(schedule).observe(canvas);
    const preview = diagram.closest('.case-preview');
    if (preview) preview.addEventListener('toggle', schedule);
    schedule();
    if (document.fonts) document.fonts.ready.then(schedule);
  });
})();
