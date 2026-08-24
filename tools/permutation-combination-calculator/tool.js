(() => {
  'use strict';
  const nEl = document.getElementById('ncr-n');
  const rEl = document.getElementById('ncr-r');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('ncr-res-card');
  const resComb = document.getElementById('ncr-res-comb');
  const resPerm = document.getElementById('ncr-res-perm');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function factorial(num) {
    let res = 1n;
    for (let i = 2n; i <= BigInt(num); i++) res *= i;
    return res;
  }

  btn.addEventListener('click', () => {
    const n = parseInt(nEl.value, 10);
    const r = parseInt(rEl.value, 10);

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) {
      setMsg('Please enter valid integers where n >= 0, r >= 0, and r <= n.', true);
      resCard.style.display = 'none';
      return;
    }

    try {
      const factN = factorial(n);
      const factNR = factorial(n - r);
      const factR = factorial(r);

      const nPr = factN / factNR;
      const nCr = nPr / factR;

      resComb.textContent = nCr.toLocaleString();
      resPerm.textContent = nPr.toLocaleString();

      resCard.style.display = 'block';
      setMsg('Permutations and Combinations calculated successfully.');
    } catch (e) {
      setMsg('Values too large for computation.', true);
    }
  });

  clearBtn.addEventListener('click', () => {
    nEl.value = ''; rEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();