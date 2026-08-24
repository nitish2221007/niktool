(() => {
  'use strict';
  const inEl = document.getElementById('mad-input');
  const madEl = document.getElementById('mad-res-val'), meanEl = document.getElementById('mad-res-mean');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const nums = raw.split(/[,\s\t\n]+/).map(Number).filter(v => !isNaN(v));
    if (nums.length < 2) return;

    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;

    let sumAbsDiff = 0;
    for (let i = 0; i < n; i++) {
      sumAbsDiff += Math.abs(nums[i] - mean);
    }

    const mad = sumAbsDiff / n;

    madEl.textContent = mad.toFixed(2);
    meanEl.textContent = 'x̄ = ' + mean.toFixed(2) + ' (n = ' + n + ')';
  }

  inEl.addEventListener('input', update);
  update();
})();