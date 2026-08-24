(() => {
  'use strict';
  const inEl = document.getElementById('leq-in');
  const leqResEl = document.getElementById('leq-res-val'), arResEl = document.getElementById('leq-res-arith');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const nums = raw.split(/[,\s\t]+/).map(Number).filter(v => !isNaN(v) && v > 0);
    if (nums.length === 0) return;

    // L_eq = 10 * log10( 1/N * sum( 10^(L_i / 10) ) )
    let sumEnergy = 0;
    let arithSum = 0;
    for (const val of nums) {
      sumEnergy += Math.pow(10, val / 10);
      arithSum += val;
    }

    const meanEnergy = sumEnergy / nums.length;
    const leq = 10 * Math.log10(meanEnergy);
    const arithMean = arithSum / nums.length;

    leqResEl.textContent = leq.toFixed(1) + ' dBA (L_eq)';
    arResEl.textContent = arithMean.toFixed(1) + ' dBA Arithmetic Mean (Energy Diff +' + (leq - arithMean).toFixed(1) + ' dB)';
  }

  inEl.addEventListener('input', update);
  update();
})();