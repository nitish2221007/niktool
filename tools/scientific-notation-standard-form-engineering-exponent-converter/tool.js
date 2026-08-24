(() => {
  'use strict';
  const inEl = document.getElementById('sn-in');
  const sciResEl = document.getElementById('sn-res-sci'), engResEl = document.getElementById('sn-res-eng');

  function update() {
    const raw = (inEl.value || '').trim();
    const val = parseFloat(raw);
    if (isNaN(val) || val === 0) return;

    // Scientific notation: a * 10^b
    const exp = Math.floor(Math.log10(Math.abs(val)));
    const a = val / Math.pow(10, exp);

    // Engineering notation (exponent multiple of 3):
    const engExp = Math.floor(exp / 3.0) * 3;
    const engA = val / Math.pow(10, engExp);

    let prefix = '';
    if (engExp === 12) prefix = 'Tera (T)';
    else if (engExp === 9) prefix = 'Giga (G)';
    else if (engExp === 6) prefix = 'Mega (M)';
    else if (engExp === 3) prefix = 'kilo (k)';
    else if (engExp === 0) prefix = 'Unit (10⁰)';
    else if (engExp === -3) prefix = 'milli (m)';
    else if (engExp === -6) prefix = 'micro (μ)';
    else if (engExp === -9) prefix = 'nano (n)';
    else if (engExp === -12) prefix = 'pico (p)';

    sciResEl.textContent = a.toFixed(3) + ' × 10^(' + exp + ')';
    engResEl.textContent = 'Engineering: ' + engA.toFixed(2) + ' × 10^(' + engExp + ')' + (prefix ? ' (' + prefix + ')' : '');
  }

  inEl.addEventListener('input', update);
  update();
})();