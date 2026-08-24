(() => {
  'use strict';
  const w1El = document.getElementById('ar-w1'), h1El = document.getElementById('ar-h1');
  const w2El = document.getElementById('ar-w2'), h2El = document.getElementById('ar-h2');
  const resRatio = document.getElementById('ar-res-ratio'), resDec = document.getElementById('ar-res-decimal');

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function updateRatio() {
    const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value);
    if (isNaN(w1) || isNaN(h1) || w1 <= 0 || h1 <= 0) return;

    const g = gcd(Math.round(w1), Math.round(h1));
    const simpleW = Math.round(w1) / g;
    const simpleH = Math.round(h1) / g;

    resRatio.textContent = simpleW + ':' + simpleH;
    resDec.textContent = (w1 / h1).toFixed(3);
  }

  w1El.addEventListener('input', () => {
    updateRatio();
    if (w2El.value) {
      const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), w2 = parseFloat(w2El.value);
      if (w1 > 0 && h1 > 0 && w2 > 0) h2El.value = Math.round((w2 * h1) / w1);
    }
  });

  h1El.addEventListener('input', () => {
    updateRatio();
    if (w2El.value) {
      const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), w2 = parseFloat(w2El.value);
      if (w1 > 0 && h1 > 0 && w2 > 0) h2El.value = Math.round((w2 * h1) / w1);
    }
  });

  w2El.addEventListener('input', () => {
    const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), w2 = parseFloat(w2El.value);
    if (w1 > 0 && h1 > 0 && w2 > 0) {
      h2El.value = Math.round((w2 * h1) / w1);
    }
  });

  h2El.addEventListener('input', () => {
    const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), h2 = parseFloat(h2El.value);
    if (w1 > 0 && h1 > 0 && h2 > 0) {
      w2El.value = Math.round((h2 * w1) / h1);
    }
  });

  updateRatio();
})();