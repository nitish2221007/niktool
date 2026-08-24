(() => {
  'use strict';
  const numEl = document.getElementById('pf-num');
  const expEl = document.getElementById('pf-res-exp'), listEl = document.getElementById('pf-res-list'), divEl = document.getElementById('pf-res-divs');

  const SUPERS = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };
  function toSuper(n) {
    return n.toString().split('').map(d => SUPERS[d] || d).join('');
  }

  function update() {
    let n = parseInt(numEl.value, 10);
    if (isNaN(n) || n < 2) return;

    const factors = [];
    const counts = {};

    let d = 2;
    while (d * d <= n) {
      while (n % d === 0) {
        factors.push(d);
        counts[d] = (counts[d] || 0) + 1;
        n /= d;
      }
      d++;
    }
    if (n > 1) {
      factors.push(n);
      counts[n] = (counts[n] || 0) + 1;
    }

    const expStr = Object.entries(counts).map(([p, c]) => p + toSuper(c)).join(' × ');
    let totalDivisors = 1;
    Object.values(counts).forEach(c => totalDivisors *= (c + 1));

    expEl.textContent = expStr;
    listEl.textContent = factors.join(', ');
    divEl.textContent = totalDivisors + ' Divisors';
  }

  numEl.addEventListener('input', update);
  update();
})();