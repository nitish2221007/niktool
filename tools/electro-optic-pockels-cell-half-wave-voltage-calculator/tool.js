(() => {
  'use strict';
  const lEl = document.getElementById('poc-lam'), dEl = document.getElementById('poc-d');
  const lenEl = document.getElementById('poc-l'), rEl = document.getElementById('poc-r63');
  const vResEl = document.getElementById('poc-res-vpi'), qResEl = document.getElementById('poc-res-quarter');

  // Refractive index n0 ≈ 1.50 for KD*P crystal
  const n0 = 1.50;

  function update() {
    const lamNm = parseFloat(lEl.value), dMm = parseFloat(dEl.value);
    const lMm = parseFloat(lenEl.value), rPmV = parseFloat(rEl.value);

    if (isNaN(lamNm) || isNaN(dMm) || isNaN(lMm) || isNaN(rPmV) || lamNm <= 0 || dMm <= 0 || lMm <= 0 || rPmV <= 0) return;

    const lamM = lamNm * 1e-9;
    const dM = dMm * 1e-3;
    const lM = lMm * 1e-3;
    const rM_V = rPmV * 1e-12; // pm/V to m/V

    // Transverse Pockels cell half-wave voltage:
    // V_pi = (lambda * d) / (2 * n0^3 * r * L)  [Volts]
    const n0Cubed = Math.pow(n0, 3);
    const Vpi = (lamM * dM) / (2 * n0Cubed * rM_V * lM);
    const Vquarter = Vpi / 2;

    vResEl.textContent = Math.round(Vpi).toLocaleString() + ' Volts (V_π)';
    qResEl.textContent = Math.round(Vquarter).toLocaleString() + ' Volts (V_π/2 Quarter-Wave Voltage for Laser Q-Switching)';
  }

  [lEl, dEl, lenEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();