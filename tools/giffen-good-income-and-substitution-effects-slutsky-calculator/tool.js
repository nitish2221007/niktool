(() => {
  'use strict';
  const dpEl = document.getElementById('sl-dp'), sEl = document.getElementById('sl-sub'), mEl = document.getElementById('sl-inc');
  const totResEl = document.getElementById('sl-res-tot'), tpResEl = document.getElementById('sl-res-type');

  function update() {
    const dp = parseFloat(dpEl.value), dx_s = parseFloat(sEl.value), dx_m = parseFloat(mEl.value);
    if (isNaN(dp) || isNaN(dx_s) || isNaN(dx_m)) return;

    // Slutsky identity: Total effect dx = dx_s + dx_m
    const total_dx = dx_s + dx_m;

    let classification = '';
    let color = '#22543d';

    if (dx_m <= 0) {
      classification = 'NORMAL GOOD (Substitution Δx^s = ' + dx_s + ' and Income Δx^m = ' + dx_m + ' both reduce consumption)';
      color = '#22543d';
    } else {
      if (Math.abs(dx_m) > Math.abs(dx_s)) {
        classification = 'GIFFEN GOOD (Income effect Δx^m = +' + dx_m + ' overpowers substitution Δx^s = ' + dx_s + ' -> Price hike increases demand!)';
        color = '#c53030';
      } else {
        classification = 'INFERIOR GOOD (Income effect is positive +' + dx_m + ' but outweighed by negative substitution effect)';
        color = '#2563eb';
      }
    }

    totResEl.textContent = 'Total Demand Change Δx = ' + (total_dx >= 0 ? '+' : '') + total_dx.toFixed(1) + ' Units';
    tpResEl.textContent = classification;
    tpResEl.style.color = color;
  }

  [dpEl, sEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();