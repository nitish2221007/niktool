(() => {
  'use strict';
  const confEl = document.getElementById('ia-conf'), sdEl = document.getElementById('ia-sd'), moeEl = document.getElementById('ia-moe');
  const nResEl = document.getElementById('ia-res-n'), ntResEl = document.getElementById('ia-res-note');

  function update() {
    const z_star = parseFloat(confEl.value);
    const s = parseFloat(sdEl.value), MOE = parseFloat(moeEl.value);

    if (isNaN(z_star) || isNaN(s) || isNaN(MOE) || s <= 0 || MOE <= 0) return;

    // Minimum sample size: n = ( (z* * s) / MOE )^2
    const raw_n = Math.pow((z_star * s) / MOE, 2);
    const n_required = Math.ceil(raw_n);

    let validity = '';
    let color = '#22543d';

    if (n_required >= 30) {
      validity = 'STATISTICALLY VALID FOR IB IA (n = ' + n_required + ' ≥ 30): Meets Central Limit Theorem criteria for criterion E (Use of Mathematics)';
      color = '#22543d';
    } else {
      validity = 'CAUTION (n < 30): Small sample size requires verification of population normality via Shapiro-Wilk test or Q-Q plot';
      color = '#d97706';
    }

    nResEl.textContent = 'Required n = ' + n_required + ' Data Points';
    nResEl.style.color = color;
    ntResEl.textContent = validity + ' (z* = ' + z_star + ', s = ' + s + ', MOE = ±' + MOE + ')';
    ntResEl.style.color = color;
  }

  [confEl, sdEl, moeEl].forEach(el => el.addEventListener('input', update));
  confEl.addEventListener('change', update);
  update();
})();