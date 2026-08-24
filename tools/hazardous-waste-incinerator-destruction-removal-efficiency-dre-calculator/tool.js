(() => {
  'use strict';
  const winEl = document.getElementById('dr-win'), woutEl = document.getElementById('dr-wout');
  const dreResEl = document.getElementById('dr-res-dre'), evResEl = document.getElementById('dr-res-eval');

  function update() {
    const Win_kg_hr = parseFloat(winEl.value), Wout_g_hr = parseFloat(woutEl.value);
    if (isNaN(Win_kg_hr) || isNaN(Wout_g_hr) || Win_kg_hr <= 0 || Wout_g_hr < 0) return;

    // Convert both to kg/hr:
    const Win = Win_kg_hr;
    const Wout = Wout_g_hr * 1e-3;

    // DRE = (Win - Wout) / Win * 100%
    const DRE_pct = ((Win - Wout) / Win) * 100.0;
    const nines = -Math.log10(1.0 - (DRE_pct / 100.0));

    let qual = '', color = '#22543d';
    if (DRE_pct >= 99.9999) {
      qual = 'PCB / DIOXIN COMPLIANT (≥ 99.9999% Six-Nines Standard ✓)';
      color = '#22543d';
    } else if (DRE_pct >= 99.99) {
      qual = 'STANDARD RCRA COMPLIANT (≥ 99.99% Four-Nines Standard ✓)';
      color = '#22543d';
    } else {
      qual = 'NON-COMPLIANT (DRE < 99.99%: Violation of EPA Hazardous Waste Rules ✗)';
      color = '#c53030';
    }

    dreResEl.textContent = 'DRE = ' + DRE_pct.toFixed(5) + ' % (' + nines.toFixed(2) + ' Nines)';
    dreResEl.style.color = color;
    evResEl.textContent = qual + ' [Fed: ' + Win + ' kg/hr vs Emitted: ' + Wout_g_hr + ' g/hr]';
    evResEl.style.color = color;
  }

  winEl.addEventListener('input', update);
  woutEl.addEventListener('input', update);
  update();
})();