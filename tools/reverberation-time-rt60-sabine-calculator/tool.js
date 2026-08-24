(() => {
  'use strict';
  const lEl = document.getElementById('rt-len'), wEl = document.getElementById('rt-wid'), hEl = document.getElementById('rt-ht'), aEl = document.getElementById('rt-alpha');
  const tEl = document.getElementById('rt-res-time'), vEl = document.getElementById('rt-res-vol');

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), H = parseFloat(hEl.value), alpha = parseFloat(aEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(H) || isNaN(alpha) || L <= 0 || W <= 0 || H <= 0 || alpha <= 0) return;

    // Room volume V = L * W * H
    const V = L * W * H;
    // Total boundary surface area S = 2*(LW + LH + WH)
    const S = 2 * (L * W + L * H + W * H);
    // Total absorption A = S * alpha (metric Sabins)
    const A = S * alpha;
    // RT60 = 0.161 * V / A
    const rt60 = (0.161 * V) / A;

    tEl.textContent = rt60.toFixed(2) + ' seconds';
    vEl.textContent = V.toFixed(1) + ' m³ (' + S.toFixed(1) + ' m² surfaces)';
  }

  [lEl, wEl, hEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();