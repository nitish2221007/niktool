(() => {
  'use strict';
  const pkaEl = document.getElementById('hh-pka'), haEl = document.getElementById('hh-ha'), aEl = document.getElementById('hh-a');
  const phResEl = document.getElementById('hh-res-ph'), capResEl = document.getElementById('hh-res-cap');

  function update() {
    const pKa = parseFloat(pkaEl.value), HA = parseFloat(haEl.value), A = parseFloat(aEl.value);
    if (isNaN(pKa) || isNaN(HA) || isNaN(A) || HA <= 0 || A <= 0) return;

    // Henderson-Hasselbalch: pH = pKa + log10( [A-] / [HA] )
    const ratio = A / HA;
    const pH = pKa + Math.log10(ratio);

    let status = '';
    let color = '#22543d';

    if (Math.abs(pH - pKa) <= 1.0) {
      status = 'EXCELLENT BUFFER RANGE (pH = pKa ± 1.0: High resistance to pH fluctuations)';
      color = '#22543d';
    } else {
      status = 'POOR BUFFER CAPACITY (|pH - pKa| > 1.0: Ratio [A⁻]/[HA] exceeds 10:1 or drops below 1:10)';
      color = '#d97706';
    }

    phResEl.textContent = 'pH = ' + pH.toFixed(2) + ' Buffer Solution';
    capResEl.textContent = status + ' | [A⁻]/[HA] Ratio = ' + ratio.toFixed(2) + ' (pKa = ' + pKa + ')';
    capResEl.style.color = color;
  }

  [pkaEl, haEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();