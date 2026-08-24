(() => {
  'use strict';
  const gwEl = document.getElementById('pr-gwet'), wEl = document.getElementById('pr-w'), maxEl = document.getElementById('pr-max');
  const gdResEl = document.getElementById('pr-res-gd'), rcResEl = document.getElementById('pr-res-rc');

  function update() {
    const gamma_wet = parseFloat(gwEl.value), w_pct = parseFloat(wEl.value), gamma_d_max = parseFloat(maxEl.value);
    if (isNaN(gamma_wet) || isNaN(w_pct) || isNaN(gamma_d_max) || gamma_wet <= 0 || w_pct < 0 || gamma_d_max <= 0) return;

    const w_dec = w_pct / 100.0;

    // Dry density: gamma_d = gamma_wet / ( 1 + w )  [kN / m^3]
    const gamma_d = gamma_wet / (1.0 + w_dec);

    // Relative compaction: RC = ( gamma_d / gamma_d_max ) * 100  [%]
    const RC = (gamma_d / gamma_d_max) * 100.0;

    let passStatus = '', color = '#22543d';
    if (RC >= 95.0) {
      passStatus = 'PASSES SPECIFICATION (RC = ' + RC.toFixed(1) + '% ≥ 95.0%: High structural stability)';
      color = '#22543d';
    } else {
      passStatus = 'FAILS (RC = ' + RC.toFixed(1) + '% < 95.0%: Additional roller compaction passes required!)';
      color = '#c53030';
    }

    gdResEl.textContent = 'Dry Density γ_d = ' + gamma_d.toFixed(2) + ' kN / m³';
    rcResEl.textContent = 'Relative Compaction RC = ' + RC.toFixed(1) + '% | ' + passStatus + ' (w = ' + w_pct + '%)';
    rcResEl.style.color = color;
  }

  [gwEl, wEl, maxEl].forEach(el => el.addEventListener('input', update));
  update();
})();