(() => {
  'use strict';
  const tEl = document.getElementById('lmp-temp'), trEl = document.getElementById('lmp-time'), cEl = document.getElementById('lmp-c');
  const lmpResEl = document.getElementById('lmp-res-val'), accResEl = document.getElementById('lmp-res-acc');

  function update() {
    const Tc = parseFloat(tEl.value), tr_hours = parseFloat(trEl.value), C = parseFloat(cEl.value);
    if (isNaN(Tc) || isNaN(tr_hours) || isNaN(C) || tr_hours <= 0 || C <= 0) return;

    const T_k = Tc + 273.15;

    // Larson-Miller Parameter: LMP = T_k * ( log10(tr) + C ) * 1e-3
    const LMP = T_k * (Math.log10(tr_hours) + C) * 1e-3;

    // Equivalent accelerated laboratory test at +125°C higher temperature:
    const T_acc_k = T_k + 125.0;
    const T_acc_c = T_acc_k - 273.15;
    // LMP = T_acc_k * ( log10(t_acc) + C ) * 1e-3 => log10(t_acc) = (LMP * 1000 / T_acc_k) - C
    const log_t_acc = ((LMP * 1000.0) / T_acc_k) - C;
    const t_acc_hours = Math.pow(10, log_t_acc);

    lmpResEl.textContent = 'LMP = ' + LMP.toFixed(2) + ' × 10³ (' + T_k.toFixed(1) + ' K)';
    accResEl.textContent = 'Accelerated Equivalence: ' + t_acc_hours.toFixed(1) + ' Hours @ ' + Math.round(T_acc_c) + '°C produces identical LMP creep rupture damage!';
  }

  [tEl, trEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();