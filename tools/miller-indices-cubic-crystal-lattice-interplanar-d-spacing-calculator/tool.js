(() => {
  'use strict';
  const aEl = document.getElementById('ml-a'), hEl = document.getElementById('ml-h'), kEl = document.getElementById('ml-k'), lEl = document.getElementById('ml-l');
  const dResEl = document.getElementById('ml-res-dhkl'), rlResEl = document.getElementById('ml-res-rules');

  function update() {
    const a = parseFloat(aEl.value), h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);
    if (isNaN(a) || isNaN(h) || isNaN(k) || isNaN(l) || a <= 0 || (h===0 && k===0 && l===0)) return;

    // d_hkl = a / sqrt( h^2 + k^2 + l^2 )
    const sumSq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    const d_hkl = a / Math.sqrt(sumSq);

    // Selection rules:
    // SC: All allowed
    // BCC: h + k + l must be even
    const sumIndices = h + k + l;
    const bccAllowed = (sumIndices % 2 === 0);

    // FCC: h, k, l must be unmixed (all even or all odd)
    const isHEven = (h % 2 === 0), isKEven = (k % 2 === 0), isLEven = (l % 2 === 0);
    const allEven = isHEven && isKEven && isLEven;
    const allOdd = !isHEven && !isKEven && !isLEven;
    const fccAllowed = allEven || allOdd;

    dResEl.textContent = 'd(' + h + k + l + ') = ' + d_hkl.toFixed(3) + ' Å (' + (d_hkl / 10).toFixed(4) + ' nm)';
    rlResEl.textContent = 'FCC: ' + (fccAllowed ? 'ALLOWED' : 'FORBIDDEN (Mixed parity)') + ' | BCC: ' + (bccAllowed ? 'ALLOWED' : 'FORBIDDEN (Sum is odd)') + ' | SC: ALLOWED (h²+k²+l² = ' + sumSq + ')';
  }

  [aEl, hEl, kEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();