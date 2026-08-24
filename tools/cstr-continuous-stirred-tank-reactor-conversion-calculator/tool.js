(() => {
  'use strict';
  const fa0El = document.getElementById('cstr-fa0'), ca0El = document.getElementById('cstr-ca0');
  const xEl = document.getElementById('cstr-x'), kEl = document.getElementById('cstr-k');
  const vResEl = document.getElementById('cstr-res-vol'), tResEl = document.getElementById('cstr-res-tau');

  function update() {
    const Fa0 = parseFloat(fa0El.value), Ca0 = parseFloat(ca0El.value);
    const X = parseFloat(xEl.value), k = parseFloat(kEl.value);

    if (isNaN(Fa0) || isNaN(Ca0) || isNaN(X) || isNaN(k) || Fa0 <= 0 || Ca0 <= 0 || X <= 0 || X >= 1.0 || k <= 0) return;

    // Volumetric flow rate Q = Fa0 / Ca0 [L / s]
    const Q = Fa0 / Ca0;

    // For 1st order reaction: -r_A = k * C_A = k * C_A0 * (1 - X)
    const ra = k * Ca0 * (1 - X); // mol / (L * s)

    // CSTR Design Equation: V = Fa0 * X / (-ra)  [Liters]
    const V = (Fa0 * X) / ra;
    const tau = V / Q;

    vResEl.textContent = V.toFixed(1) + ' Liters (' + (V / 1000).toFixed(3) + ' m³ CSTR)';
    tResEl.textContent = 'Space Time τ = ' + tau.toFixed(1) + ' s | Volumetric Flow Q = ' + Q.toFixed(2) + ' L/s (-r_A = ' + ra.toFixed(3) + ' mol/L·s)';
  }

  [fa0El, ca0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();