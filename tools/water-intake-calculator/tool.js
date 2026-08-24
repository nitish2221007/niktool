(() => {
  'use strict';
  const wtEl = document.getElementById('water-weight');
  const exEl = document.getElementById('water-exercise');
  const climEl = document.getElementById('water-climate');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('water-res-card');
  const resL = document.getElementById('water-res-liters');
  const resG = document.getElementById('water-res-glasses');
  const resOz = document.getElementById('water-res-oz');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const wt = parseFloat(wtEl.value);
    const exMin = parseFloat(exEl.value) || 0;
    const climate = climEl.value;

    if (isNaN(wt) || wt <= 0) {
      setMsg('Please enter a valid positive weight in kilograms.', true);
      resCard.style.display = 'none';
      return;
    }

    // Baseline: 35 mL per kg of body weight
    let totalMl = wt * 35;
    // Exercise: add ~350 mL per 30 mins of sweat
    totalMl += (exMin / 30) * 350;
    // Climate adjustment
    if (climate === 'hot') totalMl += 500;

    const liters = totalMl / 1000;
    const glasses = Math.round(totalMl / 250);
    const oz = totalMl * 0.033814;

    resL.textContent = liters.toFixed(2) + ' L / day';
    resG.textContent = glasses + ' Glasses';
    resOz.textContent = Math.round(oz) + ' fl oz';

    resCard.style.display = 'block';
    setMsg('Hydration target calculated.');
  });

  clearBtn.addEventListener('click', () => {
    wtEl.value = ''; exEl.value = '30'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();