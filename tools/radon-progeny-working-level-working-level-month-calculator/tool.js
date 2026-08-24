(() => {
  'use strict';
  const cEl = document.getElementById('rn-c'), fEl = document.getElementById('rn-f'), hrEl = document.getElementById('rn-hrs');
  const wlResEl = document.getElementById('rn-res-wl'), wmResEl = document.getElementById('rn-res-wlm');

  function update() {
    const C_pCi_L = parseFloat(cEl.value), F = parseFloat(fEl.value), hours = parseFloat(hrEl.value);
    if (isNaN(C_pCi_L) || isNaN(F) || isNaN(hours) || C_pCi_L <= 0 || F <= 0 || hours < 0) return;

    // Equilibrium Equivalent Concentration (EEC): EEC = F * C  [pCi / L]
    const EEC_pCi_L = F * C_pCi_L;
    const C_Bq_m3 = C_pCi_L * 37.0; // 1 pCi/L = 37 Bq/m^3

    // Working Level: 1 WL = 100 pCi / L of progeny in equilibrium (F=1)
    const WL = EEC_pCi_L / 100.0;

    // Working Level Months: WLM = ( WL * hours ) / 170  (170 working hours per month)
    const WLM = (WL * hours) / 170.0;

    let eval_text = '', color = '#22543d';
    if (C_pCi_L >= 4.0) {
      eval_text = 'EPA ACTION LEVEL REACHED (≥ 4.0 pCi/L: Radon mitigation fan recommended)';
      color = '#ea580c';
    } else if (C_pCi_L >= 2.0) {
      eval_text = 'ELEVATED RADON (2.0 - 4.0 pCi/L: Consider mitigation)';
      color = '#22543d';
    } else {
      eval_text = 'LOW RADON (< 2.0 pCi/L: Typical outdoor/safe indoor background)';
      color = '#22543d';
    }

    wlResEl.textContent = 'Working Level = ' + WL.toFixed(4) + ' WL (' + Math.round(C_Bq_m3) + ' Bq/m³)';
    wlResEl.style.color = color;
    wmResEl.textContent = 'Exposure = ' + WLM.toFixed(3) + ' WLM (' + eval_text + ' @ ' + hours + ' hrs/yr, F=' + F + ')';
  }

  [cEl, fEl, hrEl].forEach(el => el.addEventListener('input', update));
  update();
})();