(() => {
  'use strict';
  const tEl = document.getElementById('lm-temp'), lmpEl = document.getElementById('lm-lmp'), cEl = document.getElementById('lm-c');
  const trResEl = document.getElementById('lm-res-tr'), tdResEl = document.getElementById('lm-res-tdeg');

  function update() {
    const T_C = parseFloat(tEl.value), LMP_k = parseFloat(lmpEl.value), C = parseFloat(cEl.value);
    if (isNaN(T_C) || isNaN(LMP_k) || isNaN(C) || T_C < -273.15 || LMP_k <= 0 || C <= 0) return;

    const T_K = T_C + 273.15;
    const LMP = LMP_k * 1000.0;

    // LMP = T * ( C + log10(t_r) ) => log10(t_r) = (LMP / T) - C
    const log10_tr = (LMP / T_K) - C;
    const t_r_hours = Math.pow(10.0, log10_tr);
    const t_r_years = t_r_hours / 8760.0;

    // +25°C thermal penalty:
    const T_hot_K = T_K + 25.0;
    const log10_tr_hot = (LMP / T_hot_K) - C;
    const tr_hot_years = Math.pow(10.0, log10_tr_hot) / 8760.0;

    trResEl.textContent = 'Creep Life t_r = ' + Math.round(t_r_hours).toLocaleString() + ' Hours (' + (t_r_years >= 1 ? t_r_years.toFixed(2) + ' Years' : (t_r_hours/24).toFixed(1) + ' Days') + ')';
    tdResEl.textContent = 'LMP = ' + LMP_k.toFixed(1) + 'k @ ' + T_C + '°C | +25°C rise shortens creep life to ' + (tr_hot_years >= 1 ? tr_hot_years.toFixed(2) + ' Years' : (tr_hot_years * 365).toFixed(1) + ' Days');
  }

  [tEl, lmpEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();