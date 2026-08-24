(() => {
  'use strict';
  const v1El = document.getElementById('av-v1'), n1El = document.getElementById('av-n1'), n2El = document.getElementById('av-n2');
  const v2El = document.getElementById('av-res-v2');

  function update() {
    const v1 = parseFloat(v1El.value), n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(v1) || isNaN(n1) || isNaN(n2) || v1 <= 0 || n1 <= 0 || n2 <= 0) return;

    // V2 = V1 * (n2 / n1)
    const v2 = v1 * (n2 / n1);
    v2El.textContent = v2.toFixed(2) + ' Liters';
  }

  [v1El, n1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();