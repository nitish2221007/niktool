(() => {
  'use strict';
  const countEl = document.getElementById('li-count'), typeEl = document.getElementById('li-type'), outEl = document.getElementById('li-output');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn'), copyBtn = document.getElementById('copy-li-btn');
  const msgEl = document.getElementById('tool-message');

  const WORDS = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];

  function makeSentence() {
    const len = 8 + Math.floor(Math.random() * 8);
    const words = [];
    for (let i = 0; i < len; i++) {
      words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
    const str = words.join(' ');
    return str.charAt(0).toUpperCase() + str.slice(1) + '.';
  }

  function makeParagraph() {
    const sCount = 4 + Math.floor(Math.random() * 3);
    const sens = [];
    for (let i = 0; i < sCount; i++) sens.push(makeSentence());
    return sens.join(' ');
  }

  function generate() {
    const count = Math.min(50, Math.max(1, parseInt(countEl.value, 10) || 3));
    const type = typeEl.value;

    let res = '';
    if (type === 'words') {
      const w = [];
      for (let i = 0; i < count; i++) w.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      res = w.join(' ');
    } else if (type === 'sentences') {
      const s = [];
      for (let i = 0; i < count; i++) s.push(makeSentence());
      res = s.join(' ');
    } else {
      const p = [];
      for (let i = 0; i < count; i++) p.push(makeParagraph());
      res = p.join('\n\n');
    }

    outEl.value = res;
    msgEl.textContent = 'Generated ' + count + ' ' + type + '.';
  }

  btn.addEventListener('click', generate);
  typeEl.addEventListener('change', generate);
  countEl.addEventListener('input', generate);
  generate();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    msgEl.textContent = 'Lorem Ipsum copied to clipboard.';
  });

  clearBtn.addEventListener('click', () => {
    outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
  });
})();