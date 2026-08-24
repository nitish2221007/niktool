(() => {
  'use strict';
  const mEl = document.getElementById('kf-mass'), muEl = document.getElementById('kf-mu'), aEl = document.getElementById('kf-angle');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('kf-res-card');
  const resF = document.getElementById('kf-res-force'), resN = document.getElementById('kf-res-normal');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const m = parseFloat(mEl.value), mu = parseFloat(muEl.value), deg = parseFloat(aEl.value) || 0;
    if (isNaN(m) || isNaN(mu) || m <= 0 || mu < 0 || deg < 0 || deg >= 90) {
      setMsg('Please enter valid positive values (Angle between 0° and 89°).', true);
      resCard.style.display = 'none'; return;
    }
    const g = 9.80665;
    const rad = (deg * Math.PI) / 180;
    const normal = m * g * Math.cos(rad);
    const fk = mu * normal;

    resF.textContent = fk.toFixed(2) + ' N (Newtons)';
    resN.textContent = normal.toFixed(2) + ' N';
    resCard.style.display = 'block';
    setMsg('Kinetic friction calculated.');
  });

  clearBtn.addEventListener('click', () => {
    mEl.value = '20'; muEl.value = '0.3'; aEl.value = '0'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();