(() => {
  'use strict';
  const fEl = document.getElementById('rf-freq'), dEl = document.getElementById('rf-dist');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rf-res-card');
  const resR = document.getElementById('rf-res-radius'), resC = document.getElementById('rf-res-clearance');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const fGhz = parseFloat(fEl.value);
    const dKm = parseFloat(dEl.value);

    if (isNaN(fGhz) || isNaN(dKm) || fGhz <= 0 || dKm <= 0) {
      setMsg('Please enter positive numbers for frequency and link distance.', true);
      resCard.style.display = 'none'; return;
    }

    // Midpoint Fresnel Radius: r (meters) = 8.657 * sqrt(d_km / f_GHz)
    const rMeters = 8.657 * Math.sqrt(dKm / fGhz);
    const c60 = rMeters * 0.60;

    resR.textContent = rMeters.toFixed(2) + ' meters';
    resC.textContent = c60.toFixed(2) + ' meters';

    resCard.style.display = 'block';
    setMsg('Fresnel clearance calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fEl.value = '5.8'; dEl.value = '5.0'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();