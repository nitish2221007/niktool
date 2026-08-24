(() => {
  'use strict';
  const r1El = document.getElementById('t5-r1'), r2El = document.getElementById('t5-r2'), cEl = document.getElementById('t5-c');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('t5-res-card');
  const resF = document.getElementById('t5-res-freq'), resD = document.getElementById('t5-res-duty'), resP = document.getElementById('t5-res-period');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const r1 = parseFloat(r1El.value) * 1000; // to Ohms
    const r2 = parseFloat(r2El.value) * 1000; // to Ohms
    const c = parseFloat(cEl.value) * 0.000001; // to Farads

    if (isNaN(r1) || isNaN(r2) || isNaN(c) || r1 <= 0 || r2 <= 0 || c <= 0) {
      setMsg('Please enter positive values for resistors and capacitor.', true);
      resCard.style.display = 'none'; return;
    }

    const t1 = 0.693 * (r1 + r2) * c; // High time
    const t2 = 0.693 * r2 * c; // Low time
    const T = t1 + t2;
    const freq = 1.44 / ((r1 + 2 * r2) * c);
    const duty = (t1 / T) * 100;

    resF.textContent = freq >= 1000 ? (freq / 1000).toFixed(2) + ' kHz' : freq.toFixed(2) + ' Hz';
    resD.textContent = duty.toFixed(1) + '% (High)';
    resP.textContent = T >= 1 ? T.toFixed(3) + ' s' : (T * 1000).toFixed(2) + ' ms';

    resCard.style.display = 'block';
    setMsg('555 oscillator parameters calculated.');
  });

  clearBtn.addEventListener('click', () => {
    r1El.value = '10'; r2El.value = '47'; cEl.value = '0.1'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();