(() => {
  'use strict';
  const wcEl = document.getElementById('km-wcss');
  const kResEl = document.getElementById('km-res-k'), dpResEl = document.getElementById('km-res-drops');

  function update() {
    const wcss = wcEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (wcss.length < 3) return;

    // Differences:
    const diffs = [];
    for (let i = 0; i < wcss.length - 1; i++) {
      diffs.push(wcss[i] - wcss[i+1]);
    }

    // Second differences (acceleration drop):
    const diff2 = [];
    for (let i = 0; i < diffs.length - 1; i++) {
      diff2.push(diffs[i] - diffs[i+1]);
    }

    let maxIdx = 0, maxVal = -Infinity;
    for (let i = 0; i < diff2.length; i++) {
      if (diff2[i] > maxVal) {
        maxVal = diff2[i];
        maxIdx = i;
      }
    }

    const optimalK = maxIdx + 2; // K is 1-based, second diff at index i corresponds to K = i + 2

    const dropsDesc = diffs.map((d, idx) => 'K' + (idx+1) + '→K' + (idx+2) + ': -' + Math.round(d)).join(' | ');

    kResEl.textContent = 'Optimal K = ' + optimalK + ' (Elbow Point)';
    dpResEl.textContent = dropsDesc + ' (Inertia K=' + optimalK + ': ' + wcss[optimalK - 1] + ')';
  }

  wcEl.addEventListener('input', update);
  update();
})();