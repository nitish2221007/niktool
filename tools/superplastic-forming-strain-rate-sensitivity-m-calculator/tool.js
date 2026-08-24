(() => {
  'use strict';
  const ed1El = document.getElementById('sp-ed1'), s1El = document.getElementById('sp-s1');
  const ed2El = document.getElementById('sp-ed2'), s2El = document.getElementById('sp-s2');
  const mResEl = document.getElementById('sp-res-m'), elResEl = document.getElementById('sp-res-elong');

  function update() {
    const ed1 = parseFloat(ed1El.value), s1 = parseFloat(s1El.value);
    const ed2 = parseFloat(ed2El.value), s2 = parseFloat(s2El.value);

    if (isNaN(ed1) || isNaN(s1) || isNaN(ed2) || isNaN(s2) || ed1 <= 0 || s1 <= 0 || ed2 <= 0 || s2 <= 0 || ed1 === ed2) return;

    // m = ln(s2 / s1) / ln(ed2 / ed1)
    const m = Math.log(s2 / s1) / Math.log(ed2 / ed1);

    let regime = '', elong = '', color = '#22543d';
    if (m >= 0.40) {
      regime = 'SUPERPLASTIC (m ≥ 0.40: Grain boundary sliding dominant)';
      elong = 'SUPERPLASTIC ELONGATION > 500% - 1500% (Extremely high necking resistance)';
      color = '#22543d';
    } else if (m >= 0.20) {
      regime = 'DISLOCATION CREEP (m = 0.2 - 0.39)';
      elong = 'MODERATE DUCTILITY (100% - 300% Elongation)';
      color = '#ea580c';
    } else {
      regime = 'CONVENTIONAL FORMING (m < 0.20)';
      elong = 'EARLY NECKING FAILURE (< 50% Elongation)';
      color = '#c53030';
    }

    mResEl.textContent = 'Sensitivity m = ' + m.toFixed(3);
    mResEl.style.color = color;
    elResEl.textContent = elong + ' [' + regime.split(' (')[0] + ']';
    elResEl.style.color = color;
  }

  [ed1El, s1El, ed2El, s2El].forEach(el => el.addEventListener('input', update));
  update();
})();