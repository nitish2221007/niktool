(() => {
  'use strict';
  const mEl = document.getElementById('cf-mass'), vEl = document.getElementById('cf-vel'), rEl = document.getElementById('cf-rad');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('cf-res-card');
  const resF = document.getElementById('cf-res-force'), resAcc = document.getElementById('cf-res-acc'), resO = document.getElementById('cf-res-omega');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const m = parseFloat(mEl.value), v = parseFloat(vEl.value), r = parseFloat(rEl.value);
    if (isNaN(m) || isNaN(v) || isNaN(r) || m <= 0 || v <= 0 || r <= 0) {
      setMsg('Please enter valid positive numbers for mass, velocity, and radius.', true);
      resCard.style.display = 'none'; return;
    }
    const ac = (v * v) / r;
    const fc = m * ac;
    const omega = v / r;

    resF.textContent = Math.round(fc).toLocaleString() + ' N';
    resAcc.textContent = ac.toFixed(2) + ' m/s² (' + (ac / 9.80665).toFixed(1) + ' g)';
    resO.textContent = omega.toFixed(3) + ' rad/s';

    resCard.style.display = 'block';
    setMsg('Centripetal force calculated.');
  });

  clearBtn.addEventListener('click', () => {
    mEl.value = '1000'; vEl.value = '20'; rEl.value = '50'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();