(() => {
  'use strict';
  const rEl = document.getElementById('rlc-r'), lEl = document.getElementById('rlc-l');
  const cEl = document.getElementById('rlc-c'), fEl = document.getElementById('rlc-f');
  const zResEl = document.getElementById('rlc-res-z'), thResEl = document.getElementById('rlc-res-theta'), f0ResEl = document.getElementById('rlc-res-f0');

  function update() {
    const R = parseFloat(rEl.value), lMh = parseFloat(lEl.value), cUf = parseFloat(cEl.value), fHz = parseFloat(fEl.value);
    if (isNaN(R) || isNaN(lMh) || isNaN(cUf) || isNaN(fHz) || R < 0 || lMh <= 0 || cUf <= 0 || fHz <= 0) return;

    const L = lMh * 1e-3;
    const C = cUf * 1e-6;
    const omega = 2 * Math.PI * fHz;

    // Reactances: XL = omega*L, XC = 1 / (omega*C)
    const XL = omega * L;
    const XC = 1 / (omega * C);
    const Xnet = XL - XC;

    // Total Impedance Z = sqrt(R^2 + (XL - XC)^2)
    const Z = Math.sqrt(Math.pow(R, 2) + Math.pow(Xnet, 2));

    // Phase angle theta = atan(Xnet / R)
    const rad = Math.atan2(Xnet, R);
    const deg = (rad * 180) / Math.PI;

    // Resonance f0 = 1 / (2*pi*sqrt(L*C))
    const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));

    zResEl.textContent = Z.toFixed(2) + ' Ω';
    thResEl.textContent = (deg >= 0 ? '+' : '') + deg.toFixed(2) + '° (' + (deg > 0 ? 'Inductive' : (deg < 0 ? 'Capacitive' : 'Resonant')) + ')';
    f0ResEl.textContent = 'f₀ = ' + (f0 >= 1000 ? (f0 / 1000).toFixed(2) + ' kHz' : f0.toFixed(1) + ' Hz');
  }

  [rEl, lEl, cEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();