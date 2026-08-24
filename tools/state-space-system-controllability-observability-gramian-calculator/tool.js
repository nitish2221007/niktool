(() => {
  'use strict';
  const a11El = document.getElementById('ss-a11'), a12El = document.getElementById('ss-a12');
  const a21El = document.getElementById('ss-a21'), a22El = document.getElementById('ss-a22');
  const b1El = document.getElementById('ss-b1'), b2El = document.getElementById('ss-b2');
  const ctResEl = document.getElementById('ss-res-ctrl'), mtResEl = document.getElementById('ss-res-mat');

  function update() {
    const a11 = parseFloat(a11El.value), a12 = parseFloat(a12El.value);
    const a21 = parseFloat(a21El.value), a22 = parseFloat(a22El.value);
    const b1 = parseFloat(b1El.value), b2 = parseFloat(b2El.value);

    if (isNaN(a11) || isNaN(a12) || isNaN(a21) || isNaN(a22) || isNaN(b1) || isNaN(b2)) return;

    // A * B vector:
    // [ a11*b1 + a12*b2 ]
    // [ a21*b1 + a22*b2 ]
    const ab1 = (a11 * b1) + (a12 * b2);
    const ab2 = (a21 * b1) + (a22 * b2);

    // Controllability matrix C = [ B, AB ] = [ b1, ab1; b2, ab2 ]
    const det_C = (b1 * ab2) - (ab1 * b2);
    const is_controllable = Math.abs(det_C) > 1e-6;

    ctResEl.textContent = is_controllable ? 'CONTROLLABLE (Rank = 2, det(C) = ' + det_C.toFixed(2) + ')' : 'UNCONTROLLABLE (Rank < 2, det(C) = 0)';
    ctResEl.style.color = is_controllable ? '#22543d' : '#c53030';
    mtResEl.textContent = 'Matrix C = [' + b1 + ', ' + ab1.toFixed(1) + '; ' + b2 + ', ' + ab2.toFixed(1) + '] | ' + (is_controllable ? 'Full state feedback gain K can place all closed-loop poles' : 'System has uncontrollable uncontrollable modes');
  }

  [a11El, a12El, a21El, a22El, b1El, b2El].forEach(el => el.addEventListener('input', update));
  update();
})();