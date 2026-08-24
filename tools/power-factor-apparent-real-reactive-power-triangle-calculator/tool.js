(() => {
  'use strict';
  const vEl = document.getElementById('pf-v'), iEl = document.getElementById('pf-i'), cosEl = document.getElementById('pf-cos');
  const pResEl = document.getElementById('pf-res-p'), sqResEl = document.getElementById('pf-res-sq');

  function update() {
    const V = parseFloat(vEl.value), I = parseFloat(iEl.value), pf = parseFloat(cosEl.value);
    if (isNaN(V) || isNaN(I) || isNaN(pf) || V <= 0 || I <= 0 || pf <= 0 || pf > 1.0) return;

    // Apparent power: S = V * I  [VA -> kVA]
    const S_kVA = (V * I) / 1000.0;

    // Real power: P = S * PF  [kW]
    const P_kW = S_kVA * pf;

    // Phase angle: phi = acos(PF) in rad
    const phi_rad = Math.acos(pf);
    const phi_deg = (phi_rad * 180.0) / Math.PI;

    // Reactive power: Q = S * sin(phi)  [kVAR]
    const Q_kVAR = S_kVA * Math.sin(phi_rad);

    // Capacitor compensation needed to reach PF = 0.95:
    const target_phi = Math.acos(0.95);
    const target_Q = P_kW * Math.tan(target_phi);
    const cap_kVAR = Math.max(0, Q_kVAR - target_Q);

    pResEl.textContent = 'Real Power P = ' + P_kW.toFixed(2) + ' kW (' + (pf * 100).toFixed(0) + '% Power Factor)';
    sqResEl.textContent = 'Apparent S = ' + S_kVA.toFixed(2) + ' kVA | Reactive Q = ' + Q_kVAR.toFixed(2) + ' kVAR (Add ' + cap_kVAR.toFixed(2) + ' kVAR capacitors to reach 0.95 PF)';
  }

  [vEl, iEl, cosEl].forEach(el => el.addEventListener('input', update));
  update();
})();