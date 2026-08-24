(() => {
  'use strict';
  const kEl = document.getElementById('sp-k'), xEl = document.getElementById('sp-x');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('sp-res-card');
  const resPE = document.getElementById('sp-res-pe'), resF = document.getElementById('sp-res-force');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const k = parseFloat(kEl.value), x = parseFloat(xEl.value);
    if (isNaN(k) || isNaN(x) || k <= 0 || x <= 0) {
      setMsg('Please enter positive numbers for spring constant and displacement.', true);
      resCard.style.display = 'none'; return;
    }

    const force = k * x;
    const pe = 0.5 * k * Math.pow(x, 2);

    resPE.textContent = pe.toFixed(3) + ' Joules (J)';
    resF.textContent = force.toFixed(2) + ' Newtons (N)';

    resCard.style.display = 'block';
    setMsg('Spring potential energy calculated.');
  });

  clearBtn.addEventListener('click', () => {
    kEl.value = '250'; xEl.value = '0.2'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();