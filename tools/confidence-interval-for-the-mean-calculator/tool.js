(() => {
  'use strict';
  const mEl = document.getElementById('ci-mean'), sEl = document.getElementById('ci-sd');
  const nEl = document.getElementById('ci-n'), cEl = document.getElementById('ci-conf');
  const bEl = document.getElementById('ci-res-bounds'), moeEl = document.getElementById('ci-res-moe');

  function update() {
    const mean = parseFloat(mEl.value), s = parseFloat(sEl.value), n = parseInt(nEl.value, 10), z = parseFloat(cEl.value);
    if (isNaN(mean) || isNaN(s) || isNaN(n) || isNaN(z) || s <= 0 || n < 2) return;

    // ME = Z * (s / sqrt(n))
    const sem = s / Math.sqrt(n);
    const moe = z * sem;
    const lower = mean - moe;
    const upper = mean + moe;

    bEl.textContent = '[' + lower.toFixed(2) + ', ' + upper.toFixed(2) + ']';
    moeEl.textContent = '± ' + moe.toFixed(3);
  }

  [mEl, sEl, nEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();