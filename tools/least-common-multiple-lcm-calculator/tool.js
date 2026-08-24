(() => {
  'use strict';
  const inEl = document.getElementById('lcm-input');
  const lcmEl = document.getElementById('lcm-res-lcm'), gcdEl = document.getElementById('lcm-res-gcd');

  function gcd2(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = b; b = a % b; a = t; }
    return a;
  }

  function lcm2(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd2(a, b);
  }

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const nums = raw.split(/[,\s\n]+/).map(Number).filter(n => Number.isInteger(n) && n > 0);
    if (nums.length < 2) return;

    const finalGcd = nums.reduce((a, b) => gcd2(a, b));
    const finalLcm = nums.reduce((a, b) => lcm2(a, b));

    lcmEl.textContent = finalLcm.toLocaleString();
    gcdEl.textContent = finalGcd.toLocaleString();
  }

  inEl.addEventListener('input', update);
  update();
})();