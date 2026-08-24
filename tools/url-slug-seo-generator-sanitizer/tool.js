(() => {
  'use strict';
  const inEl = document.getElementById('slug-in'), outEl = document.getElementById('slug-out');

  function generateSlug(str) {
    return str
      .normalize('NFD') // Normalize accented characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
  }

  function update() {
    outEl.value = generateSlug(inEl.value);
  }

  inEl.addEventListener('input', update);
  update();
})();