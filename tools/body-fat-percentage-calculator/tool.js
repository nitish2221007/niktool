(() => {
  'use strict';
  const genEl = document.getElementById('bf-gender'), wtEl = document.getElementById('bf-weight');
  const htEl = document.getElementById('bf-height'), waistEl = document.getElementById('bf-waist');
  const neckEl = document.getElementById('bf-neck'), hipEl = document.getElementById('bf-hip'), grpHip = document.getElementById('grp-bf-hip');

  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('bf-res-card');
  const resPct = document.getElementById('bf-res-pct'), resFat = document.getElementById('bf-res-fat-mass'), resLean = document.getElementById('bf-res-lean-mass');

  genEl.addEventListener('change', () => {
    grpHip.style.display = genEl.value === 'female' ? 'block' : 'none';
  });

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const isFemale = genEl.value === 'female';
    const wt = parseFloat(wtEl.value);
    const ht = parseFloat(htEl.value);
    const waist = parseFloat(waistEl.value);
    const neck = parseFloat(neckEl.value);
    const hip = parseFloat(hipEl.value);

    if (isNaN(wt) || isNaN(ht) || isNaN(waist) || isNaN(neck) || wt <= 0 || ht <= 0 || waist <= 0 || neck <= 0) {
      setMsg('Please enter valid measurements for all fields.', true);
      resCard.style.display = 'none'; return;
    }

    let bfPct = 0;
    if (!isFemale) {
      if (waist <= neck) { setMsg('Waist measurement must exceed neck circumference.', true); return; }
      bfPct = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(ht)) - 450;
    } else {
      if (isNaN(hip) || hip <= 0 || (waist + hip) <= neck) {
        setMsg('Please enter a valid hip circumference for female body fat calculation.', true); return;
      }
      bfPct = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(ht)) - 450;
    }

    bfPct = Math.max(3, Math.min(65, bfPct));
    const fatMass = wt * (bfPct / 100);
    const leanMass = wt - fatMass;

    resPct.textContent = bfPct.toFixed(1) + '%';
    resFat.textContent = fatMass.toFixed(1) + ' kg';
    resLean.textContent = leanMass.toFixed(1) + ' kg';

    resCard.style.display = 'block';
    setMsg('Body composition calculated.');
  });

  clearBtn.addEventListener('click', () => {
    wtEl.value = '75'; htEl.value = '178'; waistEl.value = '82'; neckEl.value = '38'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();