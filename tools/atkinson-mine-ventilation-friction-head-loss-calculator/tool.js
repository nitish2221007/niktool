(() => {
  'use strict';
  const qEl = document.getElementById('ak-q'), aEl = document.getElementById('ak-a');
  const pEl = document.getElementById('ak-p'), lEl = document.getElementById('ak-l'), kEl = document.getElementById('ak-k');
  const dpResEl = document.getElementById('ak-res-dp'), pwResEl = document.getElementById('ak-res-power');

  function update() {
    const Q = parseFloat(qEl.value), A = parseFloat(aEl.value);
    const P = parseFloat(pEl.value), L = parseFloat(lEl.value), k_fric = parseFloat(kEl.value);

    if (isNaN(Q) || isNaN(A) || isNaN(P) || isNaN(L) || isNaN(k_fric) || Q <= 0 || A <= 0 || P <= 0 || L <= 0 || k_fric <= 0) return;

    // Atkinson Resistance: R = ( k * P * L ) / ( A^3 )  [N * s^2 / m^8]
    const R = (k_fric * P * L) / Math.pow(A, 3);

    // Pressure drop: Delta_P = R * Q^2  [Pa]
    const delta_P_Pa = R * Math.pow(Q, 2);
    const delta_P_in_wg = delta_P_Pa / 249.0889;

    // Fan air power: Air_Power = Delta_P * Q  [W -> kW]
    const power_kW = (delta_P_Pa * Q) / 1000.0;

    dpResEl.textContent = 'Pressure Drop ΔP = ' + delta_P_Pa.toFixed(1) + ' Pa (' + delta_P_in_wg.toFixed(3) + ' in. w.g.)';
    pwResEl.textContent = 'Fan Air Power = ' + power_kW.toFixed(2) + ' kW | Atkinson Resistance R = ' + R.toFixed(4) + ' N·s²/m⁸ (Q=' + Q + ' m³/s)';
  }

  [qEl, aEl, pEl, lEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();