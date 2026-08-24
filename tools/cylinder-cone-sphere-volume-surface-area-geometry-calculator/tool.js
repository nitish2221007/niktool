(() => {
  'use strict';
  const shEl = document.getElementById('sol-shape'), rEl = document.getElementById('sol-r'), hEl = document.getElementById('sol-h');
  const grpH = document.getElementById('sol-grp-h');
  const vResEl = document.getElementById('sol-res-vol'), saResEl = document.getElementById('sol-res-sa');

  function update() {
    const shape = shEl.value;
    const r = parseFloat(rEl.value), h = parseFloat(hEl.value);

    if (isNaN(r) || r <= 0) return;

    let Vol = 0, SA = 0, detail = '';

    if (shape === 'cylinder') {
      if (isNaN(h) || h <= 0) return;
      Vol = Math.PI * Math.pow(r, 2) * h;
      const baseArea = 2.0 * Math.PI * Math.pow(r, 2);
      const lateralArea = 2.0 * Math.PI * r * h;
      SA = baseArea + lateralArea;
      detail = 'Top/Base: ' + baseArea.toFixed(2) + ' + Curved Lateral: ' + lateralArea.toFixed(2);
    } else if (shape === 'cone') {
      if (isNaN(h) || h <= 0) return;
      Vol = (1.0 / 3.0) * Math.PI * Math.pow(r, 2) * h;
      const slant_l = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2));
      const baseArea = Math.PI * Math.pow(r, 2);
      const lateralArea = Math.PI * r * slant_l;
      SA = baseArea + lateralArea;
      detail = 'Base: ' + baseArea.toFixed(2) + ' + Slant Lateral: ' + lateralArea.toFixed(2) + ' (Slant Height l = ' + slant_l.toFixed(2) + ')';
    } else if (shape === 'sphere') {
      Vol = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);
      SA = 4.0 * Math.PI * Math.pow(r, 2);
      detail = 'Surface Area: 4·π·r² = ' + SA.toFixed(2);
    }

    vResEl.textContent = 'Volume V = ' + Vol.toFixed(2);
    saResEl.textContent = 'Total Surface Area = ' + SA.toFixed(2) + ' (' + detail + ')';
  }

  [shEl, rEl, hEl].forEach(el => el.addEventListener('input', update));
  shEl.addEventListener('change', () => {
    grpH.style.display = shEl.value === 'sphere' ? 'none' : 'block';
    update();
  });
  update();
})();