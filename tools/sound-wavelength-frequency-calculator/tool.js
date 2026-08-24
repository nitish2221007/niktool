(() => {
  'use strict';
  const fEl = document.getElementById('ac-freq'), tEl = document.getElementById('ac-temp');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ac-res-card');
  const resL = document.getElementById('ac-res-lambda'), resS = document.getElementById('ac-res-speed'), resP = document.getElementById('ac-res-period');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const f = parseFloat(fEl.value);
    const t = parseFloat(tEl.value);

    if (isNaN(f) || isNaN(t) || f <= 0) {
      setMsg('Please enter a positive frequency value.', true);
      resCard.style.display = 'none'; return;
    }

    // Speed of sound in dry air: c ≈ 331.3 + 0.606 * T (°C)
    const c = 331.3 + 0.606 * t;
    const lambda = c / f;
    const periodMs = (1 / f) * 1000;

    resL.textContent = lambda >= 1 ? lambda.toFixed(3) + ' meters' : (lambda * 100).toFixed(2) + ' cm';
    resS.textContent = c.toFixed(1) + ' m/s (' + (c * 3.6).toFixed(1) + ' km/h)';
    resP.textContent = periodMs.toFixed(3) + ' ms';

    resCard.style.display = 'block';
    setMsg('Acoustic wave parameters calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fEl.value = '440'; tEl.value = '20'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();