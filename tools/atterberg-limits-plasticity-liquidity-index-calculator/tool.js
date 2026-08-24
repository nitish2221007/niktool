(() => {
  'use strict';
  const llEl = document.getElementById('att-ll'), plEl = document.getElementById('att-pl'), wEl = document.getElementById('att-w');
  const piResEl = document.getElementById('att-res-pi'), usResEl = document.getElementById('att-res-uscs');

  function update() {
    const LL = parseFloat(llEl.value), PL = parseFloat(plEl.value), w = parseFloat(wEl.value);
    if (isNaN(LL) || isNaN(PL) || isNaN(w) || LL <= 0 || PL <= 0 || LL <= PL || w < 0) return;

    const PI = LL - PL;
    const LI = (w - PL) / PI;
    const pi_A = 0.73 * (LL - 20);

    let uscs = '';
    if (LL >= 50) {
      if (PI >= pi_A) uscs = 'CH: Fat / High Plasticity Clay (Above A-Line, LL ≥ 50%)';
      else uscs = 'MH / OH: Elastic Silt / Organic Clay (Below A-Line, LL ≥ 50%)';
    } else {
      if (PI >= pi_A && PI > 7) uscs = 'CL: Lean Clay of Low Plasticity (Above A-Line, LL < 50%)';
      else if (PI < pi_A && PI < 4) uscs = 'ML: Low Plasticity Silt (Below A-Line, LL < 50%)';
      else uscs = 'CL-ML: Silty Clay Dual Classification';
    }

    let state = 'Plastic Solid State';
    if (LI < 0) state = 'Semi-Solid to Brittle (w < PL, Overconsolidated)';
    else if (LI > 1.0) state = 'Viscous Liquid / Sensitive Quick Clay (w > LL, High Liquefaction Risk)';

    piResEl.textContent = 'PI = ' + PI.toFixed(1) + '% | LI = ' + LI.toFixed(2) + ' (' + state + ')';
    usResEl.textContent = uscs;
  }

  [llEl, plEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();