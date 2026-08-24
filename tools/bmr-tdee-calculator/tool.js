(() => {
  'use strict';
  const genEl = document.getElementById('bmr-gender');
  const ageEl = document.getElementById('bmr-age');
  const wtEl = document.getElementById('bmr-weight');
  const htEl = document.getElementById('bmr-height');
  const actEl = document.getElementById('bmr-activity');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('bmr-res-card');
  const resTdee = document.getElementById('res-tdee');
  const resBmr = document.getElementById('res-bmr');
  const resLoss = document.getElementById('res-loss');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const age = parseFloat(ageEl.value);
    const wt = parseFloat(wtEl.value);
    const ht = parseFloat(htEl.value);
    const act = parseFloat(actEl.value);
    const isMale = genEl.value === 'male';

    if (isNaN(age) || isNaN(wt) || isNaN(ht) || age <= 0 || wt <= 0 || ht <= 0) {
      setMsg('Please enter valid positive numbers for age, weight, and height.', true);
      resCard.style.display = 'none';
      return;
    }

    // Mifflin-St Jeor formula
    // BMR = 10*weight(kg) + 6.25*height(cm) - 5*age(y) + s (+5 male, -161 female)
    let bmr = 10 * wt + 6.25 * ht - 5 * age + (isMale ? 5 : -161);
    let tdee = bmr * act;

    resBmr.textContent = Math.round(bmr).toLocaleString() + ' kcal/day';
    resTdee.textContent = Math.round(tdee).toLocaleString() + ' kcal/day';
    resLoss.textContent = Math.max(1200, Math.round(tdee - 500)).toLocaleString() + ' kcal/day';

    resCard.style.display = 'block';
    setMsg('Metabolic energy expenditure calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    ageEl.value = ''; wtEl.value = ''; htEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();