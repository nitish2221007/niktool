(() => {
  'use strict';
  const clEl = document.getElementById('id-cl'), bEl = document.getElementById('id-b');
  const sEl = document.getElementById('id-s'), eEl = document.getElementById('id-e');
  const cdResEl = document.getElementById('id-res-cdi'), arResEl = document.getElementById('id-res-ar');

  function update() {
    const C_L = parseFloat(clEl.value), b_m = parseFloat(bEl.value);
    const S_m2 = parseFloat(sEl.value), e = parseFloat(eEl.value);

    if (isNaN(C_L) || isNaN(b_m) || isNaN(S_m2) || isNaN(e) || b_m <= 0 || S_m2 <= 0 || e <= 0 || e > 1) return;

    const AR = Math.pow(b_m, 2) / S_m2;
    const C_Di = Math.pow(C_L, 2) / (Math.PI * e * AR);
    const drag_counts = C_Di * 1e4;

    cdResEl.textContent = 'Induced Drag C_Di = ' + C_Di.toFixed(4) + ' (' + Math.round(drag_counts) + ' Drag Counts)';
    arResEl.textContent = 'Aspect Ratio AR = ' + AR.toFixed(2) + ' | Oswald e = ' + e + ' (b=' + b_m + ' m, S=' + S_m2 + ' m² @ C_L=' + C_L + ')';
  }

  [clEl, bEl, sEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();