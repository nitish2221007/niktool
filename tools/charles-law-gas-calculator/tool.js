(() => {
  'use strict';
  const v1El = document.getElementById('ch-v1'), t1El = document.getElementById('ch-t1'), t2El = document.getElementById('ch-t2');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ch-res-card'), resVal = document.getElementById('ch-res-val');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v1 = parseFloat(v1El.value), t1 = parseFloat(t1El.value), t2 = parseFloat(t2El.value);
    if (isNaN(v1) || isNaN(t1) || isNaN(t2) || v1 <= 0 || t1 <= 0 || t2 <= 0) {
      setMsg('Please enter positive numbers (Temperature must be in Kelvin > 0).', true);
      resCard.style.display = 'none'; return;
    }

    // V2 = V1 * (T2 / T1)
    const v2 = v1 * (t2 / t1);
    resVal.textContent = v2.toFixed(3) + ' Liters';
    resCard.style.display = 'block';
    setMsg('Charles's Law computed.');
  });

  clearBtn.addEventListener('click', () => {
    v1El.value = '5.0'; t1El.value = '293.15'; t2El.value = '373.15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();