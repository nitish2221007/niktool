(() => {
  'use strict';
  const eEl = document.getElementById('gcs-e'), vEl = document.getElementById('gcs-v'), mEl = document.getElementById('gcs-m');
  const totResEl = document.getElementById('gcs-res-tot'), tbiResEl = document.getElementById('gcs-res-tbi');

  function update() {
    const E = parseInt(eEl.value, 10), V = parseInt(vEl.value, 10), M = parseInt(mEl.value, 10);
    const totalGCS = E + V + M;

    let tbi = '', color = '#22543d';
    if (totalGCS >= 13) { tbi = 'MILD BRAIN INJURY (GCS 13 - 15)'; color = '#22543d'; }
    else if (totalGCS >= 9) { tbi = 'MODERATE BRAIN INJURY (GCS 9 - 12)'; color = '#ea580c'; }
    else { tbi = 'SEVERE TBI / COMA (GCS ≤ 8: Intubation recommended)'; color = '#c53030'; }

    totResEl.textContent = 'Total GCS = ' + totalGCS + ' (E' + E + ' V' + V + ' M' + M + ')';
    totResEl.style.color = color;
    tbiResEl.textContent = tbi;
    tbiResEl.style.color = color;
  }

  [eEl, vEl, mEl].forEach(el => el.addEventListener('change', update));
  update();
})();