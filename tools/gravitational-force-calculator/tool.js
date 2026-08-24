(() => {
  'use strict';
  const m1El = document.getElementById('gf-m1'), m2El = document.getElementById('gf-m2'), rEl = document.getElementById('gf-r');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('gf-res-card');
  const resF = document.getElementById('gf-res-force');

  const G = 6.67430e-11;

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value), r = parseFloat(rEl.value);
    if (isNaN(m1) || isNaN(m2) || isNaN(r) || m1 <= 0 || m2 <= 0 || r <= 0) {
      setMsg('Please enter positive numerical values (Scientific notation like 5.97e24 is supported).', true);
      resCard.style.display = 'none'; return;
    }

    const F = (G * m1 * m2) / (r * r);
    resF.textContent = F.toExponential(4) + ' N (Newtons)';
    resCard.style.display = 'block';
    setMsg('Gravitational attraction computed.');
  });

  clearBtn.addEventListener('click', () => {
    m1El.value = '5.972e24'; m2El.value = '7.342e22'; rEl.value = '3.844e8'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();