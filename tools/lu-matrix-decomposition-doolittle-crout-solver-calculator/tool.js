(() => {
  'use strict';
  const ids = ['lu-a11','lu-a12','lu-a13','lu-a21','lu-a22','lu-a23','lu-a31','lu-a32','lu-a33'];
  const els = ids.map(id => document.getElementById(id));
  const dtResEl = document.getElementById('lu-res-det'), uResEl = document.getElementById('lu-res-u');

  function update() {
    const vals = els.map(el => parseFloat(el.value));
    if (vals.some(isNaN)) return;

    let A = [
      [vals[0], vals[1], vals[2]],
      [vals[3], vals[4], vals[5]],
      [vals[6], vals[7], vals[8]]
    ];

    let L = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    let U = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const n = 3;
    for (let i = 0; i < n; i++) {
      // Upper Triangular U
      for (let k = i; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) sum += L[i][j] * U[j][k];
        U[i][k] = A[i][k] - sum;
      }
      // Lower Triangular L
      for (let k = i + 1; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) sum += L[k][j] * U[j][i];
        if (Math.abs(U[i][i]) < 1e-12) {
          dtResEl.textContent = 'SINGULAR / PIVOT ERROR (Zero on diagonal)';
          uResEl.textContent = 'Row pivoting required';
          return;
        }
        L[k][i] = (A[k][i] - sum) / U[i][i];
      }
    }

    const det = U[0][0] * U[1][1] * U[2][2];

    dtResEl.textContent = 'det(A) = ' + det.toFixed(2) + (Math.abs(det) > 1e-6 ? ' (Invertible)' : ' (Singular)');
    uResEl.textContent = 'U: [' + U[0].map(v=>v.toFixed(1)).join(', ') + ' ; ' + U[1].map(v=>v.toFixed(1)).join(', ') + ' ; ' + U[2].map(v=>v.toFixed(1)).join(', ') + '] | L: [' + L[0].map(v=>v.toFixed(1)).join(', ') + ' ; ' + L[1].map(v=>v.toFixed(1)).join(', ') + ' ; ' + L[2].map(v=>v.toFixed(1)).join(', ') + ']';
  }

  els.forEach(el => el.addEventListener('input', update));
  update();
})();