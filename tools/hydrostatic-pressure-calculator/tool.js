(() => {
  'use strict';
  const fEl = document.getElementById('hp-fluid'), dEl = document.getElementById('hp-depth');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('hp-res-card');
  const resH = document.getElementById('hp-res-hydro'), resT = document.getElementById('hp-res-total'), resAtm = document.getElementById('hp-res-atm');

  const ATM_PA = 101325; // 1 atm in Pascals
  const g = 9.80665;

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const rho = parseFloat(fEl.value);
    const h = parseFloat(dEl.value);
    if (isNaN(rho) || isNaN(h) || rho <= 0 || h < 0) {
      setMsg('Please enter a valid non-negative depth.', true);
      resCard.style.display = 'none'; return;
    }

    const hydroPa = rho * g * h;
    const totalPa = hydroPa + ATM_PA;
    const atm = totalPa / ATM_PA;

    resH.textContent = (hydroPa / 1000).toFixed(2) + ' kPa (' + (hydroPa / 100000).toFixed(2) + ' bar)';
    resT.textContent = (totalPa / 1000).toFixed(2) + ' kPa';
    resAtm.textContent = atm.toFixed(2) + ' atm';

    resCard.style.display = 'block';
    setMsg('Hydrostatic pressure computed.');
  });

  clearBtn.addEventListener('click', () => {
    dEl.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();