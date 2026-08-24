(() => {
  'use strict';
  const nEl = document.getElementById('nq-n'), pEl = document.getElementById('nq-p');
  const zResEl = document.getElementById('nq-res-z'), evResEl = document.getElementById('nq-res-eval');

  function update() {
    const N = parseInt(nEl.value, 10), P = parseInt(pEl.value, 10);
    if (isNaN(N) || isNaN(P) || P < 0) return;

    // Nyquist criterion: Z = N + P
    const Z = N + P;

    let verdict = '', color = '#22543d';
    if (Z === 0) {
      verdict = 'CLOSED-LOOP IS ASYMPTOTICALLY STABLE (Z = 0: Zero unstable poles in RHP ✓)';
      color = '#22543d';
    } else {
      verdict = 'CLOSED-LOOP IS UNSTABLE (' + Z + ' Unstable Pole' + (Z > 1 ? 's' : '') + ' in Right-Half Plane ✗)';
      color = '#c53030';
    }

    zResEl.textContent = 'Closed-Loop RHP Poles Z = ' + Z + ' (' + (Z === 0 ? 'STABLE ✓' : 'UNSTABLE ✗') + ')';
    zResEl.style.color = color;
    evResEl.textContent = verdict + ' [N = ' + N + ', P = ' + P + ']';
    evResEl.style.color = color;
  }

  nEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();