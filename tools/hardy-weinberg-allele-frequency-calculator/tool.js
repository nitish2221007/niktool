(() => {
  'use strict';
  const q2El = document.getElementById('hw-q2');
  const carResEl = document.getElementById('hw-res-carrier'), domResEl = document.getElementById('hw-res-dom'), alResEl = document.getElementById('hw-res-alleles');

  function update() {
    const q2 = parseFloat(q2El.value);
    if (isNaN(q2) || q2 <= 0 || q2 >= 1.0) return;

    // q = sqrt(q^2)
    const q = Math.sqrt(q2);
    // p = 1 - q
    const p = 1 - q;
    // p^2 = dominant, 2pq = carriers
    const p2 = Math.pow(p, 2);
    const twoPq = 2 * p * q;

    carResEl.textContent = (twoPq * 100).toFixed(1) + '% (' + (1 / twoPq).toFixed(1) + ' in 1)';
    domResEl.textContent = (p2 * 100).toFixed(1) + '% (p²)';
    alResEl.textContent = 'p = ' + p.toFixed(3) + ', q = ' + q.toFixed(3);
  }

  q2El.addEventListener('input', update);
  update();
})();