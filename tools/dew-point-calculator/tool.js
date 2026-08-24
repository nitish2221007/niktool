(() => {
  'use strict';
  const tEl = document.getElementById('dew-temp'), rhEl = document.getElementById('dew-rh');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('dew-res-card');
  const resDp = document.getElementById('dew-res-dp'), resCom = document.getElementById('dew-res-comfort');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const T = parseFloat(tEl.value);
    const RH = parseFloat(rhEl.value);

    if (isNaN(T) || isNaN(RH) || RH < 1 || RH > 100) {
      setMsg('Please enter a valid temperature and relative humidity between 1% and 100%.', true);
      resCard.style.display = 'none'; return;
    }

    // Magnus-Tetens formula: Ts = (b * alpha) / (a - alpha)
    // where alpha = (a * T) / (b + T) + ln(RH / 100)
    // Constants: a = 17.27, b = 237.7 °C
    const a = 17.27, b = 237.7;
    const alpha = (a * T) / (b + T) + Math.log(RH / 100);
    const dp = (b * alpha) / (a - alpha);
    const dpF = (dp * 9/5) + 32;

    let comfort = 'Comfortable';
    if (dp < 10) comfort = 'Dry / Crisp';
    else if (dp <= 15) comfort = 'Pleasantly Comfortable';
    else if (dp <= 20) comfort = 'Humid / Sticky';
    else if (dp <= 24) comfort = 'Very Muggy & Oppressive';
    else comfort = 'Extremely Miserable & Dangerous';

    resDp.textContent = dp.toFixed(1) + ' °C (' + dpF.toFixed(1) + ' °F)';
    resCom.textContent = comfort;

    resCard.style.display = 'block';
    setMsg('Dew point calculated.');
  });

  clearBtn.addEventListener('click', () => {
    tEl.value = '28'; rhEl.value = '65'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();