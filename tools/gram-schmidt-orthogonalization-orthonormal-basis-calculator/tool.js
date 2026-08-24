(() => {
  'use strict';
  const v1xEl = document.getElementById('gs-v1x'), v1yEl = document.getElementById('gs-v1y');
  const v2xEl = document.getElementById('gs-v2x'), v2yEl = document.getElementById('gs-v2y');
  const ortResEl = document.getElementById('gs-res-ortho'), nrmResEl = document.getElementById('gs-res-norm');

  function dot(a, b) { return a[0] * b[0] + a[1] * b[1]; }
  function norm(a) { return Math.sqrt(dot(a, a)); }

  function update() {
    const v1 = [parseFloat(v1xEl.value), parseFloat(v1yEl.value)];
    const v2 = [parseFloat(v2xEl.value), parseFloat(v2yEl.value)];

    if (v1.some(isNaN) || v2.some(isNaN)) return;

    // u1 = v1
    const u1 = [...v1];
    const dot_u1_u1 = dot(u1, u1);
    if (dot_u1_u1 === 0) return;

    // proj_{u1}(v2) = (v2 . u1 / u1 . u1) * u1
    const scalar_proj = dot(v2, u1) / dot_u1_u1;
    const proj = [scalar_proj * u1[0], scalar_proj * u1[1]];

    // u2 = v2 - proj_{u1}(v2)
    const u2 = [v2[0] - proj[0], v2[1] - proj[1]];

    const norm1 = norm(u1), norm2 = norm(u2);
    if (norm2 < 1e-9) {
      ortResEl.textContent = 'VECTORS ARE LINEARLY DEPENDENT (Parallel)';
      nrmResEl.textContent = 'Cannot span 2D space';
      return;
    }

    // Orthonormal basis:
    const e1 = [u1[0] / norm1, u1[1] / norm1];
    const e2 = [u2[0] / norm2, u2[1] / norm2];

    const checkDot = dot(u1, u2);

    ortResEl.textContent = 'u₁ = [' + u1[0].toFixed(1) + ', ' + u1[1].toFixed(1) + '] | u₂ = [' + u2[0].toFixed(1) + ', ' + u2[1].toFixed(1) + '] (u₁·u₂ = ' + checkDot.toFixed(2) + ')';
    nrmResEl.textContent = 'e₁ = [' + e1[0].toFixed(3) + ', ' + e1[1].toFixed(3) + '] | e₂ = [' + e2[0].toFixed(3) + ', ' + e2[1].toFixed(3) + '] (||e|| = 1.0)';
  }

  [v1xEl, v1yEl, v2xEl, v2yEl].forEach(el => el.addEventListener('input', update));
  update();
})();