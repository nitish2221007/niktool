(() => {
  'use strict';
  const q1El = document.getElementById('cl-q1'), q2El = document.getElementById('cl-q2'), rEl = document.getElementById('cl-r');
  const fResEl = document.getElementById('cl-res-f'), ntResEl = document.getElementById('cl-res-nature');

  const k_e = 8.9875517923e9; // N * m^2 / C^2

  function update() {
    const q1_uC = parseFloat(q1El.value), q2_uC = parseFloat(q2El.value), r_cm = parseFloat(rEl.value);
    if (isNaN(q1_uC) || isNaN(q2_uC) || isNaN(r_cm) || r_cm <= 0) return;

    const q1_C = q1_uC * 1e-6;
    const q2_C = q2_uC * 1e-6;
    const r_m = r_cm / 100.0;

    // Coulomb's Law: F = k_e * |q1 * q2| / r^2  [Newtons]
    const F = (k_e * Math.abs(q1_C * q2_C)) / Math.pow(r_m, 2);

    const isAttractive = (q1_uC * q2_uC) < 0;
    const isZero = q1_uC === 0 || q2_uC === 0;

    let nature = '', color = '#22543d';
    if (isZero) { nature = 'ZERO FORCE (Uncharged point)'; color = '#22543d'; }
    else if (isAttractive) { nature = 'ATTRACTIVE FORCE (Opposite charges attract: + and -)'; color = '#22543d'; }
    else { nature = 'REPULSIVE FORCE (Like charges repel: +/+ or -/-)'; color = '#2563eb'; }

    fResEl.textContent = 'Force F = ' + (F >= 1000 ? (F/1000).toFixed(2) + ' kN' : F.toFixed(2) + ' N') + ' (' + (isAttractive ? 'ATTRACTIVE' : 'REPULSIVE') + ')';
    fResEl.style.color = color;
    ntResEl.textContent = nature + ' [Distance r = ' + r_cm + ' cm | k_e = 8.99 × 10⁹ N·m²/C²]';
    ntResEl.style.color = color;
  }

  [q1El, q2El, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();