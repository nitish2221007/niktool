(() => {
  'use strict';
  const yinEl = document.getElementById('krm-yin'), youtEl = document.getElementById('krm-yout');
  const lgEl = document.getElementById('krm-lg'), mEl = document.getElementById('krm-m');
  const nResEl = document.getElementById('krm-res-n'), aResEl = document.getElementById('krm-res-a');

  function update() {
    const yinPct = parseFloat(yinEl.value), youtPct = parseFloat(youtEl.value);
    const LG = parseFloat(lgEl.value), m = parseFloat(mEl.value);

    if (isNaN(yinPct) || isNaN(youtPct) || isNaN(LG) || isNaN(m) || yinPct <= youtPct || youtPct <= 0 || LG <= 0 || m <= 0) return;

    // Absorption factor A = L / (m * G) = (L/G) / m
    const A = LG / m;

    const removalPct = ((yinPct - youtPct) / yinPct) * 100;

    let N = 0;
    if (Math.abs(A - 1.0) < 0.01) {
      // Special case A = 1: N = (yin - yout) / yout
      N = (yinPct - youtPct) / youtPct;
    } else {
      // Kremser absorption formula with clean solvent (x_in = 0):
      // N = ln( (1 - 1/A)*(yin / yout) + 1/A ) / ln(A)
      const term = ((1.0 - (1.0 / A)) * (yinPct / youtPct)) + (1.0 / A);
      if (term > 0) {
        N = Math.log(term) / Math.log(A);
      } else {
        nResEl.textContent = 'Absorption Factor Too Low (A < 1)';
        return;
      }
    }

    nResEl.textContent = 'N = ' + N.toFixed(2) + ' Stages (' + Math.ceil(N) + ' Theoretical Trays)';
    aResEl.textContent = 'Absorption Factor A = ' + A.toFixed(2) + ' (' + removalPct.toFixed(1) + '% Solute Scrubbed | L/G = ' + LG.toFixed(2) + ', m = ' + m.toFixed(2) + ')';
  }

  [yinEl, youtEl, lgEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();