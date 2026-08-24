(() => {
  'use strict';
  const xEl = document.getElementById('z-raw'), muEl = document.getElementById('z-mean'), sdEl = document.getElementById('z-sd');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('z-res-card');
  const resZ = document.getElementById('z-res-val'), resPct = document.getElementById('z-res-pct'), resPval = document.getElementById('z-res-pval');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  // Approximation of cumulative standard normal distribution
  function normalCDF(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989422804014327 * Math.exp(-z * z / 2);
    const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return z > 0 ? 1 - p : p;
  }

  btn.addEventListener('click', () => {
    const x = parseFloat(xEl.value), mu = parseFloat(muEl.value), sd = parseFloat(sdEl.value);
    if (isNaN(x) || isNaN(mu) || isNaN(sd) || sd <= 0) {
      setMsg('Please enter valid numerical parameters (Standard Deviation must be > 0).', true);
      resCard.style.display = 'none'; return;
    }

    const z = (x - mu) / sd;
    const cdf = normalCDF(z);
    const pct = cdf * 100;
    const rightP = 1 - cdf;

    resZ.textContent = (z >= 0 ? '+' : '') + z.toFixed(4);
    resPct.textContent = pct.toFixed(2) + '%';
    resPval.textContent = rightP.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Z-score calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    xEl.value = ''; muEl.value = ''; sdEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();