(() => {
  'use strict';
  const gEl = document.getElementById('is-g'), i0El = document.getElementById('is-i0');
  const mpEl = document.getElementById('is-mp'), mpcEl = document.getElementById('is-mpc');
  const eqResEl = document.getElementById('is-res-eq'), mlResEl = document.getElementById('is-res-mult');

  function update() {
    const G = parseFloat(gEl.value), I0 = parseFloat(i0El.value);
    const MP = parseFloat(mpEl.value), mpc = parseFloat(mpcEl.value);

    if (isNaN(G) || isNaN(I0) || isNaN(MP) || isNaN(mpc) || mpc <= 0 || mpc >= 1.0) return;

    // Keynesian multiplier k = 1 / (1 - mpc)
    const k = 1.0 / (1.0 - mpc);

    // Simplified IS curve: Y = k * ( I0 + G - 20 * r )
    // Simplified LM curve: r = 0.01 * Y - (MP / 100)
    // Solving simultaneous linear system:
    // Y = k*(I0 + G) - 20*k*(0.01*Y - MP/100)
    // Y * (1 + 0.2*k) = k*(I0 + G) + 0.2*k*MP
    const Y_star = (k * (I0 + G) + (0.2 * k * MP)) / (1.0 + (0.2 * k));
    const r_star = Math.max(0, (0.01 * Y_star) - (MP / 100.0));

    eqResEl.textContent = 'Income Y* = $' + Math.round(Y_star).toLocaleString() + ' B | Rate r* = ' + r_star.toFixed(2) + '%';
    mlResEl.textContent = 'Keynesian Multiplier k = ' + k.toFixed(2) + ' (1 / (1 - ' + mpc + ')) | IS-LM Equilibrium';
  }

  [gEl, i0El, mpEl, mpcEl].forEach(el => el.addEventListener('input', update));
  update();
})();