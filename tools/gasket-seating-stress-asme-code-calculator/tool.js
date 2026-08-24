(() => {
  'use strict';
  const pEl = document.getElementById('gsk-p'), gEl = document.getElementById('gsk-g'), tEl = document.getElementById('gsk-type');
  const wm1ResEl = document.getElementById('gsk-res-wm1'), wm2ResEl = document.getElementById('gsk-res-wm2');

  function update() {
    const P = parseFloat(pEl.value), G = parseFloat(gEl.value);
    const [mStr, yStr] = tEl.value.split(',');
    const m = parseFloat(mStr), y = parseFloat(yStr);

    if (isNaN(P) || isNaN(G) || P <= 0 || G <= 0) return;

    // Standard effective gasket seating width b ≈ 0.125 inches (1/8")
    const b = 0.125;

    // Hydrostatic end force H = 0.785 * G^2 * P (lbs)
    const H = 0.7854 * Math.pow(G, 2) * P;
    // Gasket joint contact load H_p = 2 * b * pi * G * m * P (lbs)
    const Hp = 2 * b * Math.PI * G * m * P;
    // W_m1 = H + Hp (Operating load in lbs)
    const Wm1 = H + Hp;
    const Wm1_kips = Wm1 / 1000;

    // Initial seating load W_m2 = pi * b * G * y (lbs)
    const Wm2 = Math.PI * b * G * y;
    const Wm2_kips = Wm2 / 1000;

    wm1ResEl.textContent = Wm1_kips.toFixed(1) + ' kips (' + (Wm1_kips * 4.44822).toFixed(1) + ' kN Total Load)';
    wm2ResEl.textContent = Wm2_kips.toFixed(1) + ' kips (Initial Tightening Seating Load)';
  }

  [pEl, gEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();