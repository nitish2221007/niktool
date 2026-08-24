(() => {
  'use strict';
  const inEl = document.getElementById('case-input');
  const camelEl = document.getElementById('res-camel'), pascalEl = document.getElementById('res-pascal');
  const snakeEl = document.getElementById('res-snake'), kebabEl = document.getElementById('res-kebab'), constEl = document.getElementById('res-constant');

  function splitWords(str) {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
  }

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const words = splitWords(raw);
    if (words.length === 0) return;

    const camel = words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const pascal = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const snake = words.join('_');
    const kebab = words.join('-');
    const constCase = words.join('_').toUpperCase();

    camelEl.textContent = camel;
    pascalEl.textContent = pascal;
    snakeEl.textContent = snake;
    kebabEl.textContent = kebab;
    constEl.textContent = constCase;
  }

  inEl.addEventListener('input', update);
  update();
})();