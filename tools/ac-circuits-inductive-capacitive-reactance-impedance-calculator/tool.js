(() => {
  'use strict';
  const fEl = document.getElementById('ac-f'), rEl = document.getElementById('ac-r');
  const lEl = document.getElementById('ac-l'), cEl = document.getElementById('ac-c');
  const zResEl = document.getElementById('ac-res-z'), rcResEl = document.getElementById('ac-res-react');

  function update() {
    const f = parseFloat(fEl.value), R = parseFloat(rEl.value);
    const L_mH = parseFloat(lEl.value), C_uF = parseFloat(cEl.value);

    if (isNaN(f) || isNaN(R) || isNaN(L_mH) || isNaN(C_uF) || f <= 0 || R < 0 || L_mH < 0 || C_uF <= 0) return;

    const L = L_mH / 1000.0;
    const C = C_uF * 1e-6;

    // Inductive reactance: X_L = 2 * pi * f * L  [Ohms]
    const X_L = 2.0 * Math.PI * f * L;
    // Capacitive reactance: X_C = 1 / ( 2 * pi * f * C )  [Ohms]
    const X_C = 1.0 / (2.0 * Math.PI * f * C);

    const netX = X_L - X_C;

    // Total impedance: Z = sqrt( R^2 + (X_L - X_C)^2 )  [Ohms]
    const Z = Math.sqrt(Math.pow(R, 2) + Math.pow(netX, 2));

    // Phase angle phi = atan( (X_L - X_C) / R ) in degrees
    const phi_rad = Math.atan2(netX, R);
    const phi_deg = (phi_rad * 180.0) / Math.PI;

    let regime = '';
    if (netX > 0.1) regime = 'INDUCTIVE (X_L > X_C: Current lags voltage by ' + phi_deg.toFixed(1) + '°)';
    else if (netX < -0.1) regime = 'CAPACITIVE (X_C > X_L: Current leads voltage by ' + Math.abs(phi_deg).toFixed(1) + '°)';
    else regime = 'PURELY RESISTIVE (Resonance: X_L = X_C, Z = R)';

    zResEl.textContent = 'Impedance Z = ' + Z.toFixed(2) + ' Ω';
    rcResEl.textContent = 'X_L = ' + X_L.toFixed(2) + ' Ω | X_C = ' + X_C.toFixed(2) + ' Ω | Net X = ' + (netX >= 0 ? '+' : '') + netX.toFixed(2) + ' Ω (' + regime + ')';
  }

  [fEl, rEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();