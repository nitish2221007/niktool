(() => {
  'use strict';
  const inEl = document.getElementById('sd-input');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('sd-res-card');
  const resSample = document.getElementById('sd-res-sample');
  const resPop = document.getElementById('sd-res-pop');
  const resMean = document.getElementById('sd-res-mean');
  const resVar = document.getElementById('sd-res-var');
  const resCount = document.getElementById('sd-res-count');
  const resSum = document.getElementById('sd-res-sum');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) {
      setMsg('Please enter numerical data to calculate standard deviation.', true);
      resCard.style.display = 'none';
      return;
    }

    const nums = raw.split(/[,\s\n]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2) {
      setMsg('Please provide at least 2 valid numbers.', true);
      resCard.style.display = 'none';
      return;
    }

    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    const sqDiffs = nums.map(x => Math.pow(x - mean, 2));
    const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);

    const sampleVar = sumSqDiffs / (n - 1);
    const popVar = sumSqDiffs / n;

    const sampleSD = Math.sqrt(sampleVar);
    const popSD = Math.sqrt(popVar);

    resSample.textContent = sampleSD.toFixed(4);
    resPop.textContent = popSD.toFixed(4);
    resMean.textContent = mean.toFixed(4);
    resVar.textContent = sampleVar.toFixed(4);
    resCount.textContent = n.toString();
    resSum.textContent = sum.toFixed(2);

    resCard.style.display = 'block';
    setMsg('Statistical metrics calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();