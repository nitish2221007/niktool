(() => {
  'use strict';
  const p1El = document.getElementById('pt-p1'), v1El = document.getElementById('pt-v1');
  const vpEl = document.getElementById('pt-vp'), tmEl = document.getElementById('pt-temp');
  const p2ResEl = document.getElementById('pt-res-p2'), mhResEl = document.getElementById('pt-res-mhe');

  const R_He = 2077.1; // J / (kg * K) for Helium gas

  function update() {
    const p1_bar = parseFloat(p1El.value), V1_L = parseFloat(v1El.value);
    const V_prop_L = parseFloat(vpEl.value), T_K = parseFloat(tmEl.value);

    if (isNaN(p1_bar) || isNaN(V1_L) || isNaN(V_prop_L) || isNaN(T_K) || p1_bar <= 0 || V1_L <= 0 || V_prop_L <= 0 || T_K <= 0) return;

    // Total final ullage volume: V2 = V1 + V_prop  [Liters -> m^3]
    const V2_L = V1_L + V_prop_L;
    const V1_m3 = V1_L * 1e-3;
    const V2_m3 = V2_L * 1e-3;
    const p1_Pa = p1_bar * 1e5;

    // Blowdown ratio: BR = V2 / V1
    const blowdown_ratio = V2_L / V1_L;

    // Isothermal final pressure: p2 = p1 * (V1 / V2)
    const p2_bar_isothermal = p1_bar * (V1_L / V2_L);

    // Helium mass required to pressurize initial volume V1 to p1:
    // m_He = p1 * V1 / (R_He * T)  [kg]
    const m_He_kg = (p1_Pa * V1_m3) / (R_He * T_K);

    p2ResEl.textContent = 'Final Pressure p₂ = ' + p2_bar_isothermal.toFixed(2) + ' bar (' + blowdown_ratio.toFixed(1) + ':1 Blowdown)';
    mhResEl.textContent = 'Helium Mass = ' + m_He_kg.toFixed(2) + ' kg | Total Tank Vol = ' + V2_L.toLocaleString() + ' L (p₁=' + p1_bar + ' bar @ ' + T_K + ' K)';
  }

  [p1El, v1El, vpEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();