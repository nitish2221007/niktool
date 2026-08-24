(() => {
  'use strict';
  const stEl = document.getElementById('hd-state'), psEl = document.getElementById('hd-pass');
  const oResEl = document.getElementById('hd-res-out'), pResEl = document.getElementById('hd-res-prob');

  const invSqrt2 = 1 / Math.SQRT2;

  function update() {
    const state = stEl.value, passes = parseInt(psEl.value, 10);

    let a = 1.0, b = 0.0;
    if (state === '1') { a = 0.0; b = 1.0; }
    else if (state === 'plus') { a = invSqrt2; b = invSqrt2; }
    else if (state === 'minus') { a = invSqrt2; b = -invSqrt2; }

    for (let i = 0; i < passes; i++) {
      const a_next = (a + b) * invSqrt2;
      const b_next = (a - b) * invSqrt2;
      a = a_next;
      b = b_next;
    }

    const p0 = Math.pow(a, 2) * 100;
    const p1 = Math.pow(b, 2) * 100;

    let signStr = b >= 0 ? ' + ' : ' - ';
    oResEl.textContent = a.toFixed(3) + '|0⟩' + signStr + Math.abs(b).toFixed(3) + '|1⟩';
    pResEl.textContent = p0.toFixed(1) + '% |0⟩ | ' + p1.toFixed(1) + '% |1⟩ (' + (passes === 2 ? 'H² = I Identity Restored' : 'Hadamard Transform') + ')';
  }

  stEl.addEventListener('change', update);
  psEl.addEventListener('change', update);
  update();
})();