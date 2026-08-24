(() => {
  'use strict';
  const b0El = document.getElementById('zt-b0'), b1El = document.getElementById('zt-b1'), a1El = document.getElementById('zt-a1');
  const stResEl = document.getElementById('zt-res-stab'), hzResEl = document.getElementById('zt-res-hz');

  function update() {
    const b0 = parseFloat(b0El.value), b1 = parseFloat(b1El.value), a1 = parseFloat(a1El.value);
    if (isNaN(b0) || isNaN(b1) || isNaN(a1)) return;

    // Pole is at z = a1
    const pole_mag = Math.abs(a1);
    // Zero is at z = -b1 / b0
    const zero = b0 !== 0 ? -b1 / b0 : 0;

    let stability = '';
    let color = '#22543d';

    if (pole_mag < 1.0) {
      stability = 'BIBO STABLE (|z_pole| = ' + pole_mag.toFixed(2) + ' < 1.00: Pole strictly inside the Unit Circle)';
      color = '#22543d';
    } else if (pole_mag === 1.0) {
      stability = 'MARGINALLY STABLE (|z_pole| = 1.00: Pole on the Unit Circle boundary -> Sustained oscillation)';
      color = '#d97706';
    } else {
      stability = 'UNSTABLE (|z_pole| = ' + pole_mag.toFixed(2) + ' > 1.00: Pole outside Unit Circle -> Exponential overflow!)';
      color = '#c53030';
    }

    stResEl.textContent = stability;
    stResEl.style.color = color;
    hzResEl.textContent = 'H(z) = (' + b0.toFixed(2) + 'z + ' + b1.toFixed(2) + ') / (z - ' + a1.toFixed(2) + ') | Zero: z = ' + zero.toFixed(2) + ' | Pole: z = ' + a1.toFixed(2);
    hzResEl.style.color = color;
  }

  [b0El, b1El, a1El].forEach(el => el.addEventListener('input', update));
  update();
})();