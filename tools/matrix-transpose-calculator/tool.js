(() => {
  'use strict';
  const inEl = document.getElementById('mt-input'), outEl = document.getElementById('mt-output');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    const matrix = lines.map(l => l.split(/[,\s\t]+/).map(Number).filter(v => !isNaN(v)));

    if (matrix.length === 0 || matrix[0].length === 0) return;

    const rows = matrix.length;
    const cols = matrix[0].length;

    const trans = [];
    for (let c = 0; c < cols; c++) {
      const row = [];
      for (let r = 0; r < rows; r++) {
        row.push(matrix[r][c]);
      }
      trans.push(row.join('\t '));
    }

    outEl.value = trans.join('\n');
  }

  inEl.addEventListener('input', update);
  update();
})();