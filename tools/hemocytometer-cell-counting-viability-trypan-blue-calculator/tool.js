(() => {
  'use strict';
  const lEl = document.getElementById('hemo-live'), dEl = document.getElementById('hemo-dead');
  const sEl = document.getElementById('hemo-sq'), dilEl = document.getElementById('hemo-dil');
  const concResEl = document.getElementById('hemo-res-conc'), viabResEl = document.getElementById('hemo-res-viab');

  function update() {
    const live = parseFloat(lEl.value) || 0, dead = parseFloat(dEl.value) || 0;
    const squares = parseFloat(sEl.value) || 1, dilution = parseFloat(dilEl.value) || 1;

    const totalCounted = live + dead;
    if (totalCounted <= 0 || squares <= 0) return;

    // Viability percentage = ( Live / Total ) * 100
    const viability = (live / totalCounted) * 100.0;

    // Hemocytometer volume per 1 mm^2 large square = 0.1 mm^3 = 10^-4 mL
    // Concentration = ( Live / squares ) * 10^4 * Dilution  [cells / mL]
    const conc_live = (live / squares) * 1e4 * dilution;

    let qual = '';
    let color = '#22543d';

    if (viability >= 90.0) {
      qual = 'EXCELLENT VIABILITY (≥ 90%: Optimal for experimental passaging & transfection)';
      color = '#22543d';
    } else if (viability >= 80.0) {
      qual = 'ACCEPTABLE VIABILITY (80 - 89%: Healthy culture)';
      color = '#2563eb';
    } else {
      qual = 'POOR VIABILITY (< 80%: High apoptosis/necrosis, media replenishment recommended)';
      color = '#c53030';
    }

    concResEl.textContent = conc_live.toExponential(2) + ' Live Cells / mL';
    concResEl.style.color = color;
    viabResEl.textContent = 'Viability = ' + viability.toFixed(1) + '% (' + live + ' Live / ' + totalCounted + ' Total across ' + squares + ' Squares | ' + qual.split(' (')[0] + ')';
    viabResEl.style.color = color;
  }

  [lEl, dEl, sEl, dilEl].forEach(el => el.addEventListener('input', update));
  update();
})();