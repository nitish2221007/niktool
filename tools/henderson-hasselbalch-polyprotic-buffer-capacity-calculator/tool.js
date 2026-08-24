(() => {
  'use strict';
  const cEl = document.getElementById('bf-c'), pkaEl = document.getElementById('bf-pka'), phEl = document.getElementById('bf-ph');
  const btResEl = document.getElementById('bf-res-beta'), rtResEl = document.getElementById('bf-res-ratio');

  function update() {
    const C = parseFloat(cEl.value), pKa = parseFloat(pkaEl.value), pH = parseFloat(phEl.value);
    if (isNaN(C) || isNaN(pKa) || isNaN(pH) || C <= 0 || pH < 0 || pH > 14) return;

    const H = Math.pow(10.0, -pH);
    const Ka = Math.pow(10.0, -pKa);

    // Van Slyke buffer capacity formula: beta = 2.303 * C * ( (Ka * H) / (Ka + H)^2 )
    const beta = 2.302585 * C * ((Ka * H) / Math.pow(Ka + H, 2));

    // Ratio [A-] / [HA] = 10^(pH - pKa)
    const ratio = Math.pow(10.0, pH - pKa);
    const fracBase = (ratio / (1.0 + ratio)) * 100.0;

    let efficiency = '';
    let color = '#22543d';

    if (Math.abs(pH - pKa) <= 0.2) {
      efficiency = 'PEAK MAXIMUM CAPACITY (pH ≈ pKa: 100% of maximum possible buffer strength)';
      color = '#22543d';
    } else if (Math.abs(pH - pKa) <= 1.0) {
      efficiency = 'ACTIVE BUFFER ZONE (Within pKa ± 1.0 pH unit range)';
      color = '#22543d';
    } else {
      efficiency = 'POOR BUFFERING (Outside pKa ± 1: Depleted buffer capacity!)';
      color = '#c53030';
    }

    btResEl.textContent = 'β = ' + beta.toFixed(4) + ' mol / (L · pH) (' + efficiency.split(' (')[0] + ')';
    btResEl.style.color = color;
    rtResEl.textContent = 'Base/Acid Ratio = ' + ratio.toFixed(2) + ' (' + fracBase.toFixed(1) + '% Base / ' + (100 - fracBase).toFixed(1) + '% Acid | C = ' + C + ' M)';
    rtResEl.style.color = color;
  }

  [cEl, pkaEl, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();