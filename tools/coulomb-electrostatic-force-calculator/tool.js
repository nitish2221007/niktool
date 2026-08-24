(() => {
  'use strict';
  const q1El = document.getElementById('cou-q1'), q2El = document.getElementById('cou-q2'), rEl = document.getElementById('cou-r');
  const fEl = document.getElementById('cou-res-force'), tEl = document.getElementById('cou-res-type');

  const ke = 8.9875517923e9; // Coulomb's constant N·m²/C²

  function update() {
    const q1Uc = parseFloat(q1El.value), q2Uc = parseFloat(q2El.value), r = parseFloat(rEl.value);
    if (isNaN(q1Uc) || isNaN(q2Uc) || isNaN(r) || r <= 0) return;

    const q1 = q1Uc * 1e-6;
    const q2 = q2Uc * 1e-6;

    // F = ke * |q1 * q2| / r^2
    const force = ke * (Math.abs(q1 * q2) / Math.pow(r, 2));

    fEl.textContent = force >= 1000 ? force.toExponential(3) + ' N' : force.toFixed(2) + ' N (Newtons)';

    if ((q1 * q2) < 0) {
      tEl.textContent = 'Attractive (Opposite Signs: + and -)';
      tEl.style.color = '#2563eb';
    } else {
      tEl.textContent = 'Repulsive (Like Signs: repel)';
      tEl.style.color = '#c53030';
    }
  }

  [q1El, q2El, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();