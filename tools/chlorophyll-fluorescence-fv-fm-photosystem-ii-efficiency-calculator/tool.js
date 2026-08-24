(() => {
  'use strict';
  const f0El = document.getElementById('cf-f0'), fmEl = document.getElementById('cf-fm');
  const yldResEl = document.getElementById('cf-res-fvfm'), stResEl = document.getElementById('cf-res-stat');

  function update() {
    const F0 = parseFloat(f0El.value), Fm = parseFloat(fmEl.value);
    if (isNaN(F0) || isNaN(Fm) || F0 <= 0 || Fm <= F0) return;

    // Variable fluorescence: Fv = Fm - F0
    const Fv = Fm - F0;

    // Maximum quantum efficiency of PSII: Fv / Fm
    const Fv_over_Fm = Fv / Fm;

    let status = '', color = '#22543d';
    if (Fv_over_Fm >= 0.79 && Fv_over_Fm <= 0.85) {
      status = 'OPTIMAL HEALTH (F_v/F_m 0.79 - 0.85: Unstressed PSII reaction centers)';
      color = '#22543d';
    } else if (Fv_over_Fm >= 0.70) {
      status = 'MILD ENVIRONMENTAL STRESS (0.70 - 0.78: Early drought, nutrient, or temperature stress)';
      color = '#ea580c';
    } else {
      status = 'SEVERE PHOTOINHIBITION / DAMAGE (< 0.70: Damaged D1 protein in PSII reaction centers)';
      color = '#c53030';
    }

    yldResEl.textContent = 'Quantum Yield F_v / F_m = ' + Fv_over_Fm.toFixed(3);
    yldResEl.style.color = color;
    stResEl.textContent = status + ' [F_v = ' + Math.round(Fv) + ' | F_0 = ' + F0 + ', F_m = ' + Fm + ']';
    stResEl.style.color = color;
  }

  f0El.addEventListener('input', update);
  fmEl.addEventListener('input', update);
  update();
})();