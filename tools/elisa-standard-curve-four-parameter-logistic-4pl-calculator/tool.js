(() => {
  'use strict';
  const yEl = document.getElementById('el-y'), aEl = document.getElementById('el-a');
  const dEl = document.getElementById('el-d'), cEl = document.getElementById('el-c'), bEl = document.getElementById('el-b');
  const ccResEl = document.getElementById('el-res-conc'), rgResEl = document.getElementById('el-res-range');

  function update() {
    const y = parseFloat(yEl.value), a = parseFloat(aEl.value);
    const d = parseFloat(dEl.value), c = parseFloat(cEl.value), b = parseFloat(bEl.value);

    if (isNaN(y) || isNaN(a) || isNaN(d) || isNaN(c) || isNaN(b) || y <= d || y >= a || c <= 0 || b <= 0) return;

    // 4PL model: y = d + (a - d) / ( 1 + (x/c)^b )
    // Inverting for x:
    // (a - d) / (y - d) = 1 + (x/c)^b => (x/c)^b = (a - d)/(y - d) - 1
    const term = ((a - d) / (y - d)) - 1.0;
    if (term <= 0) return;

    const x = c * Math.pow(term, 1.0 / b);

    // 20% to 80% dynamic range:
    const od_20 = d + 0.20 * (a - d);
    const od_80 = d + 0.80 * (a - d);
    const isLinear = y >= od_20 && y <= od_80;

    ccResEl.textContent = 'Concentration x = ' + x.toFixed(1) + ' pg / mL';
    rgResEl.textContent = isLinear ? 'OPTIMAL LINEAR RANGE (OD ' + y.toFixed(2) + ' in 20-80% span: ' + od_20.toFixed(2) + ' to ' + od_80.toFixed(2) + ' OD)' : 'OUTSIDE LINEAR RANGE (Near curve asymptotes: Dilute sample)';
  }

  [yEl, aEl, dEl, cEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();