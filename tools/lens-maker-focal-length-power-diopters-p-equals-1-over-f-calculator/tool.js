(() => {
  'use strict';
  const fEl = document.getElementById('ln-f'), tEl = document.getElementById('ln-type');
  const dResEl = document.getElementById('ln-res-d'), uResEl = document.getElementById('ln-res-use');

  function update() {
    const f_cm = parseFloat(fEl.value), sign = parseFloat(tEl.value);
    if (isNaN(f_cm) || f_cm <= 0) return;

    const f_m = (f_cm / 100.0) * sign;

    // Power in Diopters P = 1 / f_m
    const P = 1.0 / f_m;

    let use = '';
    let color = '#22543d';

    if (sign > 0) {
      use = 'CONVEX / CONVERGING LENS: Corrects Farsightedness (Hyperopia) & Presbyopia reading glasses';
      color = '#22543d';
    } else {
      use = 'CONCAVE / DIVERGING LENS: Corrects Nearsightedness (Myopia distance glasses prescription)';
      color = '#2563eb';
    }

    dResEl.textContent = 'P = ' + (P >= 0 ? '+' : '') + P.toFixed(2) + ' Diopters (D)';
    dResEl.style.color = color;
    uResEl.textContent = use + ' (f = ' + (f_m >= 0 ? '+' : '') + f_m.toFixed(2) + ' m / ' + (f_cm * sign) + ' cm)';
    uResEl.style.color = color;
  }

  fEl.addEventListener('input', update);
  tEl.addEventListener('change', update);
  update();
})();