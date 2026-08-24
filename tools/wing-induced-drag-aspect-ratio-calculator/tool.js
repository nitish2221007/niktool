(() => {
  'use strict';
  const clEl = document.getElementById('id-cl'), arEl = document.getElementById('id-ar');
  const eEl = document.getElementById('id-e'), sEl = document.getElementById('id-s');
  const cdResEl = document.getElementById('id-res-cdi'), spResEl = document.getElementById('id-res-span');

  function update() {
    const CL = parseFloat(clEl.value), AR = parseFloat(arEl.value);
    const e = parseFloat(eEl.value), S = parseFloat(sEl.value);

    if (isNaN(CL) || isNaN(AR) || isNaN(e) || isNaN(S) || CL <= 0 || AR <= 0 || e <= 0 || S <= 0) return;

    const CDi = Math.pow(CL, 2) / (Math.PI * AR * e);
    const dragCounts = Math.round(CDi * 10000);
    const bSpan = Math.sqrt(AR * S);
    const ld_induced = CL / CDi;

    cdResEl.textContent = 'C_Di = ' + CDi.toFixed(4) + ' (' + dragCounts + ' Drag Counts)';
    spResEl.textContent = 'Span b = ' + bSpan.toFixed(1) + ' m (Lift/Induced-Drag: ' + ld_induced.toFixed(1) + ':1, e = ' + e.toFixed(2) + ')';
  }

  [clEl, arEl, eEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();