(() => {
  'use strict';
  const rEl = document.getElementById('rc-r'), rUnit = document.getElementById('rc-r-unit');
  const cEl = document.getElementById('rc-c'), cUnit = document.getElementById('rc-c-unit');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rc-res-card');
  const resTau = document.getElementById('rc-res-tau'), resFc = document.getElementById('rc-res-fc'), resCh = document.getElementById('rc-res-charge');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const r = parseFloat(rEl.value) * parseFloat(rUnit.value);
    const c = parseFloat(cEl.value) * parseFloat(cUnit.value);

    if (isNaN(r) || isNaN(c) || r <= 0 || c <= 0) {
      setMsg('Please enter positive values for resistance and capacitance.', true);
      resCard.style.display = 'none'; return;
    }

    const tau = r * c; // in seconds
    const fc = 1 / (2 * Math.PI * r * c); // in Hz
    const fullCharge = 5 * tau;

    resTau.textContent = tau >= 1 ? tau.toFixed(3) + ' s' : (tau * 1000).toFixed(3) + ' ms';
    resFc.textContent = fc >= 1000 ? (fc / 1000).toFixed(2) + ' kHz' : fc.toFixed(2) + ' Hz';
    resCh.textContent = fullCharge >= 1 ? fullCharge.toFixed(3) + ' s' : (fullCharge * 1000).toFixed(3) + ' ms';

    resCard.style.display = 'block';
    setMsg('RC circuit parameters calculated.');
  });

  clearBtn.addEventListener('click', () => {
    rEl.value = '10'; cEl.value = '100'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();