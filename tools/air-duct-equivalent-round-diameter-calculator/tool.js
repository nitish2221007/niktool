(() => {
  'use strict';
  const wEl = document.getElementById('dct-w'), hEl = document.getElementById('dct-h');
  const deResEl = document.getElementById('dct-res-de'), arResEl = document.getElementById('dct-res-aspect');

  function update() {
    const a = parseFloat(wEl.value), b = parseFloat(hEl.value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

    // Huebscher formula: D_e = 1.30 * ( (a * b)^0.625 ) / ( (a + b)^0.25 )  [inches]
    const De = 1.30 * (Math.pow(a * b, 0.625) / Math.pow(a + b, 0.25));
    const DeMm = De * 25.4;
    const aspect = Math.max(a, b) / Math.min(a, b);

    deResEl.textContent = De.toFixed(1) + ' Inches (' + Math.round(DeMm) + ' mm Round Duct)';
    arResEl.textContent = aspect.toFixed(2) + ' : 1 Aspect Ratio (' + (aspect > 4 ? 'Poor > 4:1' : 'Good <= 4:1') + ')';
  }

  [wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();