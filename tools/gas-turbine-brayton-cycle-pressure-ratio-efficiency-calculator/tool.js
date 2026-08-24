(() => {
  'use strict';
  const rpEl = document.getElementById('bc-rp'), titEl = document.getElementById('bc-tit');
  const efResEl = document.getElementById('bc-res-eff'), tmResEl = document.getElementById('bc-res-temps');

  const gamma = 1.40, T1 = 288.15; // 15°C ambient

  function update() {
    const r_p = parseFloat(rpEl.value), TIT_C = parseFloat(titEl.value);
    if (isNaN(r_p) || isNaN(TIT_C) || r_p <= 1.0) return;

    const TIT_K = TIT_C + 273.15;
    const expTerm = (gamma - 1.0) / gamma;

    // Ideal Brayton efficiency: eta = 1 - (1 / r_p^((gamma-1)/gamma))
    const eta = 1.0 - Math.pow(r_p, -expTerm);
    const eta_pct = eta * 100.0;

    // Compressor exit temp T2 = T1 * r_p^((gamma-1)/gamma)
    const T2 = T1 * Math.pow(r_p, expTerm);
    // Turbine exhaust temp T4 = TIT / r_p^((gamma-1)/gamma)
    const T4 = TIT_K * Math.pow(r_p, -expTerm);

    efResEl.textContent = 'Ideal Efficiency η = ' + eta_pct.toFixed(1) + '%';
    tmResEl.textContent = 'Compressor T₂ = ' + Math.round(T2 - 273.15) + ' °C | Turbine Exhaust T₄ = ' + Math.round(T4 - 273.15) + ' °C (TIT = ' + TIT_C + ' °C @ r_p = ' + r_p + ')';
  }

  [rpEl, titEl].forEach(el => el.addEventListener('input', update));
  update();
})();