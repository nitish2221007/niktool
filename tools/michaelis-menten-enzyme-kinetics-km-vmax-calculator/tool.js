(() => {
  'use strict';
  const sEl = document.getElementById('mm-s'), vmEl = document.getElementById('mm-vmax');
  const kmEl = document.getElementById('mm-km'), etEl = document.getElementById('mm-et');
  const vResEl = document.getElementById('mm-res-v'), kcResEl = document.getElementById('mm-res-kcat');

  function update() {
    const S = parseFloat(sEl.value), Vmax = parseFloat(vmEl.value);
    const Km = parseFloat(kmEl.value), Et = parseFloat(etEl.value);

    if (isNaN(S) || isNaN(Vmax) || isNaN(Km) || isNaN(Et) || S < 0 || Vmax <= 0 || Km <= 0 || Et <= 0) return;

    const v = (Vmax * S) / (Km + S);
    const pct_Vmax = (v / Vmax) * 100.0;
    const kcat_min = Vmax / Et;
    const kcat_s = kcat_min / 60.0;
    const Km_M = Km * 1e-6;
    const specificity = kcat_s / Km_M;

    vResEl.textContent = 'Initial Velocity v = ' + v.toFixed(1) + ' μM / min (' + pct_Vmax.toFixed(1) + '% V_max)';
    kcResEl.textContent = 'Turnover k_cat = ' + kcat_s.toFixed(2) + ' s⁻¹ | Catalytic Efficiency = ' + specificity.toExponential(2) + ' M⁻¹s⁻¹ ([S]=' + S + ' μM, K_m=' + Km + ' μM)';
  }

  [sEl, vmEl, kmEl, etEl].forEach(el => el.addEventListener('input', update));
  update();
})();