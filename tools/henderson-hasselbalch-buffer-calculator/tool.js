(() => {
  'use strict';
  const pkaEl = document.getElementById('buf-pka'), baseEl = document.getElementById('buf-base'), acidEl = document.getElementById('buf-acid');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('buf-res-card');
  const resPh = document.getElementById('buf-res-ph'), resRatio = document.getElementById('buf-res-ratio');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const pKa = parseFloat(pkaEl.value);
    const base = parseFloat(baseEl.value);
    const acid = parseFloat(acidEl.value);

    if (isNaN(pKa) || isNaN(base) || isNaN(acid) || base <= 0 || acid <= 0) {
      setMsg('Please enter positive concentrations for acid and base.', true);
      resCard.style.display = 'none'; return;
    }

    const ratio = base / acid;
    const pH = pKa + Math.log10(ratio);

    resPh.textContent = pH.toFixed(2);
    resRatio.textContent = ratio.toFixed(3);

    resCard.style.display = 'block';
    setMsg('Buffer pH calculated.');
  });

  clearBtn.addEventListener('click', () => {
    pkaEl.value = '4.76'; baseEl.value = '0.1'; acidEl.value = '0.1'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();