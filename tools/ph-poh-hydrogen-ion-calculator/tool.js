(() => {
  'use strict';
  const typeEl = document.getElementById('ph-type'), valEl = document.getElementById('ph-val');
  const phEl = document.getElementById('ph-res-ph'), pohEl = document.getElementById('ph-res-poh');
  const hEl = document.getElementById('ph-res-h'), ohEl = document.getElementById('ph-res-oh'), classEl = document.getElementById('ph-res-class');

  function update() {
    const type = typeEl.value;
    const raw = parseFloat(valEl.value);
    if (isNaN(raw) || raw <= 0) return;

    let pH = 7.0;
    if (type === 'ph') pH = raw;
    else if (type === 'poh') pH = 14.0 - raw;
    else if (type === 'h') pH = -Math.log10(raw);
    else if (type === 'oh') pH = 14.0 - (-Math.log10(raw));

    pH = Math.max(0, Math.min(14, pH));
    const pOH = 14.0 - pH;
    const hConc = Math.pow(10, -pH);
    const ohConc = Math.pow(10, -pOH);

    phEl.textContent = pH.toFixed(2);
    pohEl.textContent = pOH.toFixed(2);
    hEl.textContent = hConc.toExponential(2);
    ohEl.textContent = ohConc.toExponential(2);

    if (Math.abs(pH - 7.0) < 0.05) classEl.textContent = 'Neutral (Pure Water)';
    else if (pH < 3) classEl.textContent = 'Strongly Acidic';
    else if (pH < 7) classEl.textContent = 'Weakly Acidic';
    else if (pH < 11) classEl.textContent = 'Weakly Alkaline / Basic';
    else classEl.textContent = 'Strongly Alkaline / Basic';
  }

  typeEl.addEventListener('change', update);
  valEl.addEventListener('input', update);
  update();
})();