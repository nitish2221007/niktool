(() => {
  'use strict';
  const dhEl = document.getElementById('cc-dh'), t1El = document.getElementById('cc-t1');
  const p1El = document.getElementById('cc-p1'), t2El = document.getElementById('cc-t2');
  const p2ResEl = document.getElementById('cc-res-p2'), barResEl = document.getElementById('cc-res-bar');

  const R = 8.314462; // J / (mol * K)

  function update() {
    const dH_kJ = parseFloat(dhEl.value), T1 = parseFloat(t1El.value);
    const P1_kPa = parseFloat(p1El.value), T2 = parseFloat(t2El.value);

    if (isNaN(dH_kJ) || isNaN(T1) || isNaN(P1_kPa) || isNaN(T2) || dH_kJ <= 0 || T1 <= 0 || P1_kPa <= 0 || T2 <= 0) return;

    const dH_J = dH_kJ * 1000.0;

    // Clausius-Clapeyron equation: ln(P2 / P1) = -(dH_vap / R) * ( 1/T2 - 1/T1 )
    const exponent = -(dH_J / R) * ((1.0 / T2) - (1.0 / T1));
    const P2_kPa = P1_kPa * Math.exp(exponent);

    const P2_atm = P2_kPa / 101.325;
    const P2_mmHg = P2_kPa * 7.50062;

    p2ResEl.textContent = 'Vapor Pressure P₂ = ' + P2_kPa.toFixed(2) + ' kPa';
    barResEl.textContent = 'P₂ = ' + P2_atm.toFixed(3) + ' atm (' + P2_mmHg.toFixed(1) + ' mmHg) @ T₂ = ' + T2 + ' K (' + (T2 - 273.15).toFixed(1) + ' °C)';
  }

  [dhEl, t1El, p1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();