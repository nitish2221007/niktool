(() => {
  'use strict';
  const t1El = document.getElementById('qs-t1'), t2El = document.getElementById('qs-t2');
  const t3El = document.getElementById('qs-t3'), t4El = document.getElementById('qs-t4');
  const nthResEl = document.getElementById('qs-res-nth'), dfResEl = document.getElementById('qs-res-diff');

  function update() {
    const t1 = parseFloat(t1El.value), t2 = parseFloat(t2El.value);
    const t3 = parseFloat(t3El.value), t4 = parseFloat(t4El.value);

    if (isNaN(t1) || isNaN(t2) || isNaN(t3) || isNaN(t4)) return;

    // 1st Differences:
    const d1_1 = t2 - t1;
    const d1_2 = t3 - t2;
    const d1_3 = t4 - t3;

    // 2nd Differences:
    const d2_1 = d1_2 - d1_1;
    const d2_2 = d1_3 - d1_2;

    // In a valid quadratic sequence, 2nd difference is constant:
    // 2a = 2nd difference => a = 2nd diff / 2
    const a = d2_1 / 2.0;

    // 3a + b = 1st difference (d1_1) => b = d1_1 - 3a
    const b = d1_1 - (3.0 * a);

    // a + b + c = t1 => c = t1 - a - b
    const c = t1 - a - b;

    // 10th term verification
    const t10 = (a * 100) + (b * 10) + c;

    // Format polynomial string
    let poly = (a === 1 ? 'n²' : (a === -1 ? '-n²' : a + 'n²'));
    if (b > 0) poly += ' + ' + (b === 1 ? 'n' : b + 'n');
    else if (b < 0) poly += ' - ' + (Math.abs(b) === 1 ? 'n' : Math.abs(b) + 'n');

    if (c > 0) poly += ' + ' + c;
    else if (c < 0) poly += ' - ' + Math.abs(c);

    nthResEl.textContent = 'T_n = ' + poly;
    dfResEl.textContent = '2nd Diff = ' + d2_1 + ' (a=' + a + ') | 1st Diff = ' + d1_1 + ' (b=' + b + ') | c = ' + c + ' (T₁₀ = ' + t10 + ')';
  }

  [t1El, t2El, t3El, t4El].forEach(el => el.addEventListener('input', update));
  update();
})();