(() => {
  'use strict';
  const c1El = document.getElementById('lp-c1'), c2El = document.getElementById('lp-c2');
  const b1El = document.getElementById('lp-b1'), b2El = document.getElementById('lp-b2');
  const zResEl = document.getElementById('lp-res-z'), ptResEl = document.getElementById('lp-res-pt');

  function update() {
    const c1 = parseFloat(c1El.value), c2 = parseFloat(c2El.value);
    const b1 = parseFloat(b1El.value), b2 = parseFloat(b2El.value);

    if (isNaN(c1) || isNaN(c2) || isNaN(b1) || isNaN(b2) || b1 <= 0 || b2 <= 0) return;

    // Linear Program:
    // Maximize Z = c1*x1 + c2*x2
    // Subject to:
    // 1*x1 + 0*x2 <= b1
    // 3*x1 + 2*x2 <= b2
    // x1, x2 >= 0

    // Feasible corner points:
    // 1. Origin: (0, 0) => Z = 0
    // 2. Point on x2 axis: x1 = 0 => 2*x2 <= b2 => x2 = b2 / 2
    const pt2 = { x1: 0, x2: b2 / 2.0, z: c2 * (b2 / 2.0) };

    // 3. Point on x1 axis: x2 = 0 => x1 = min( b1, b2 / 3 )
    const x1_max = Math.min(b1, b2 / 3.0);
    const pt3 = { x1: x1_max, x2: 0, z: c1 * x1_max };

    // 4. Intersection of x1 = b1 and 3*x1 + 2*x2 = b2 => x2 = (b2 - 3*b1) / 2
    let pt4 = { x1: b1, x2: (b2 - (3.0 * b1)) / 2.0, z: -1 };
    if (pt4.x2 >= 0) {
      pt4.z = (c1 * pt4.x1) + (c2 * pt4.x2);
    }

    // Find maximum among feasible vertices
    const candidates = [pt2, pt3];
    if (pt4.z >= 0) candidates.push(pt4);

    candidates.sort((a, b) => b.z - a.z);
    const best = candidates[0];

    zResEl.textContent = 'Max Z = $' + best.z.toFixed(2) + ' Optimal Profit';
    ptResEl.textContent = 'Optimal Decision: x₁* = ' + best.x1.toFixed(1) + ', x₂* = ' + best.x2.toFixed(1) + ' (c₁ = $' + c1 + ', c₂ = $' + c2 + ')';
  }

  [c1El, c2El, b1El, b2El].forEach(el => el.addEventListener('input', update));
  update();
})();