(() => {
  'use strict';
  const grEl = document.getElementById('clm-grad'), gsEl = document.getElementById('clm-gs');
  const rocResEl = document.getElementById('clm-res-roc'), pctResEl = document.getElementById('clm-res-pct');

  function update() {
    const ftPerNm = parseFloat(grEl.value), gsKts = parseFloat(gsEl.value);
    if (isNaN(ftPerNm) || isNaN(gsKts) || ftPerNm <= 0 || gsKts <= 0) return;

    // ROC (ft / min) = (ft / NM) * (Groundspeed kts / 60)
    const roc = ftPerNm * (gsKts / 60);
    // Gradient % = (ft / 6076.12 ft) * 100
    const gradPct = (ftPerNm / 6076.12) * 100;

    rocResEl.textContent = Math.round(roc).toLocaleString() + ' ft / min';
    pctResEl.textContent = gradPct.toFixed(2) + '% Climb Gradient';
  }

  grEl.addEventListener('input', update);
  gsEl.addEventListener('input', update);
  update();
})();