(() => {
  'use strict';
  const inEl = document.getElementById('hrv-rr');
  const rmssdEl = document.getElementById('hrv-res-rmssd'), hrEl = document.getElementById('hrv-res-mean-hr'), stEl = document.getElementById('hrv-res-state');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const rrs = raw.split(/[,\s\t\n]+/).map(Number).filter(v => !isNaN(v) && v > 300 && v < 2000);
    if (rrs.length < 3) return;

    let sumDiffSq = 0;
    for (let i = 0; i < rrs.length - 1; i++) {
      const diff = rrs[i+1] - rrs[i];
      sumDiffSq += Math.pow(diff, 2);
    }

    const rmssd = Math.sqrt(sumDiffSq / (rrs.length - 1));
    const meanRR = rrs.reduce((a, b) => a + b, 0) / rrs.length;
    const meanBpm = 60000 / meanRR;

    rmssdEl.textContent = rmssd.toFixed(1) + ' ms';
    hrEl.textContent = Math.round(meanBpm) + ' BPM';

    if (rmssd > 50) {
      stEl.textContent = 'High HRV: Optimal Parasympathetic Recovery';
      stEl.style.color = '#22543d';
    } else if (rmssd >= 25) {
      stEl.textContent = 'Moderate HRV: Balanced Nervous System';
      stEl.style.color = '#2563eb';
    } else {
      stEl.textContent = 'Low HRV: Sympathetic Stress / Overtraining Alert';
      stEl.style.color = '#c53030';
    }
  }

  inEl.addEventListener('input', update);
  update();
})();