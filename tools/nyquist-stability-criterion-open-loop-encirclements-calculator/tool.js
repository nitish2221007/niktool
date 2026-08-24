(() => {
  'use strict';
  const pEl = document.getElementById('ny-p'), nEl = document.getElementById('ny-n');
  const zResEl = document.getElementById('ny-res-z'), stResEl = document.getElementById('ny-res-stat');

  function update() {
    const P = parseInt(pEl.value, 10), N = parseInt(nEl.value, 10);
    if (isNaN(P) || isNaN(N) || P < 0) return;

    // Nyquist formula: Z = N + P
    const Z = N + P;

    let verdict = '';
    let color = '#22543d';

    if (Z === 0) {
      verdict = 'CLOSED-LOOP ASYMPTOTICALLY STABLE (Z = 0: All closed-loop roots in Left-Half Plane LHP)';
      color = '#22543d';
    } else if (Z > 0) {
      verdict = 'CLOSED-LOOP UNSTABLE (Z = ' + Z + ' > 0: ' + Z + ' unstable right-half plane poles present)';
      color = '#c53030';
    } else {
      verdict = 'INVALID CONFIGURATION (Z cannot be negative; verify encirclement count sign)';
      color = '#d97706';
    }

    zResEl.textContent = 'Z = ' + Z + ' (' + (Z === 0 ? 'Closed-Loop STABLE' : 'UNSTABLE') + ')';
    zResEl.style.color = color;
    stResEl.textContent = verdict + ' [N = ' + N + ' encirclements, P = ' + P + ' open-loop poles]';
    stResEl.style.color = color;
  }

  pEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();