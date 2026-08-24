(() => {
  'use strict';
  const aEl = document.getElementById('ell-a'), bEl = document.getElementById('ell-b');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ell-res-card');
  const resArea = document.getElementById('ell-res-area'), resPeri = document.getElementById('ell-res-peri'), resEcc = document.getElementById('ell-res-ecc');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    let a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      setMsg('Please enter positive values for both axes.', true);
      resCard.style.display = 'none'; return;
    }
    if (b > a) { const tmp = a; a = b; b = tmp; } // ensure a >= b

    const area = Math.PI * a * b;
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    // Ramanujan's Second Approximation: P ≈ π(a+b)(1 + 3h / (10 + sqrt(4 - 3h)))
    const peri = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
    const ecc = Math.sqrt(1 - (b * b) / (a * a));

    resArea.textContent = area.toFixed(4) + ' sq units';
    resPeri.textContent = peri.toFixed(4) + ' units';
    resEcc.textContent = ecc.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Ellipse geometry calculated.');
  });

  clearBtn.addEventListener('click', () => {
    aEl.value = ''; bEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();