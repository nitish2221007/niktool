(() => {
  'use strict';
  const preEl = document.getElementById('sw-pre'), postEl = document.getElementById('sw-post');
  const flEl = document.getElementById('sw-fluid'), tEl = document.getElementById('sw-time');
  const rateEl = document.getElementById('sw-res-rate'), pctEl = document.getElementById('sw-res-pct'), totEl = document.getElementById('sw-res-tot');

  function update() {
    const pre = parseFloat(preEl.value), post = parseFloat(postEl.value);
    const fluid = parseFloat(flEl.value) || 0, timeH = parseFloat(tEl.value);

    if (isNaN(pre) || isNaN(post) || isNaN(timeH) || pre <= 0 || post <= 0 || timeH <= 0) return;

    // Total fluid lost (kg or Liters) = (Pre - Post) + Fluid
    const totalLostL = (pre - post) + fluid;
    const ratePerHour = totalLostL / timeH;
    const dehydPct = ((pre - post) / pre) * 100;

    rateEl.textContent = ratePerHour.toFixed(2) + ' L / hour';
    pctEl.textContent = dehydPct.toFixed(2) + '% Bodyweight Loss';
    totEl.textContent = totalLostL.toFixed(2) + ' Liters';

    if (dehydPct >= 2.0) {
      pctEl.textContent += ' (Aerobic Performance Decline Risk)';
      pctEl.style.color = '#c53030';
    } else {
      pctEl.style.color = '#22543d';
    }
  }

  [preEl, postEl, flEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();