(() => {
  'use strict';
  const aEl = document.getElementById('dh-a'), hEl = document.getElementById('dh-h');
  const kEl = document.getElementById('dh-k'), lEl = document.getElementById('dh-l');
  const dResEl = document.getElementById('dh-res-d'), pResEl = document.getElementById('dh-res-plane');

  function update() {
    const aAng = parseFloat(aEl.value);
    const h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);

    if (isNaN(aAng) || isNaN(h) || isNaN(k) || isNaN(l) || aAng <= 0) return;
    const sumSq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    if (sumSq === 0) { dResEl.textContent = 'Indices cannot all be zero'; return; }

    // d_hkl = a / sqrt(h^2 + k^2 + l^2)
    const dAng = aAng / Math.sqrt(sumSq);
    const dNm = dAng * 0.1;
    const dPm = dAng * 100;

    dResEl.textContent = dAng.toFixed(3) + ' Å (' + dNm.toFixed(4) + ' nm / ' + dPm.toFixed(1) + ' pm)';
    pResEl.textContent = '(' + h + ' ' + k + ' ' + l + ') Plane (h²+k²+l² = ' + sumSq + ')';
  }

  [aEl, hEl, kEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();