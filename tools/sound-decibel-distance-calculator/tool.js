(() => {
  'use strict';
  const db1El = document.getElementById('snd-db1'), d1El = document.getElementById('snd-d1'), d2El = document.getElementById('snd-d2');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('snd-res-card');
  const resDb2 = document.getElementById('snd-res-db2'), resAtt = document.getElementById('snd-res-attenuation');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const db1 = parseFloat(db1El.value);
    const d1 = parseFloat(d1El.value);
    const d2 = parseFloat(d2El.value);

    if (isNaN(db1) || isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
      setMsg('Please enter positive values for both distances.', true);
      resCard.style.display = 'none'; return;
    }

    // Inverse Square Law: L2 = L1 - 20 * log10(d2 / d1)
    const drop = 20 * Math.log10(d2 / d1);
    const db2 = db1 - drop;

    resDb2.textContent = db2.toFixed(1) + ' dB';
    resAtt.textContent = (drop >= 0 ? '-' : '+') + Math.abs(drop).toFixed(1) + ' dB';

    resCard.style.display = 'block';
    setMsg('Acoustic decibel propagation calculated.');
  });

  clearBtn.addEventListener('click', () => {
    db1El.value = '90'; d1El.value = '1'; d2El.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();