(() => {
  'use strict';
  const bmdEl = document.getElementById('dx-bmd'), refEl = document.getElementById('dx-ref'), sdEl = document.getElementById('dx-sd');
  const tResEl = document.getElementById('dx-res-t'), dgResEl = document.getElementById('dx-res-diag');

  function update() {
    const BMD = parseFloat(bmdEl.value), ref_BMD = parseFloat(refEl.value), SD = parseFloat(sdEl.value);
    if (isNaN(BMD) || isNaN(ref_BMD) || isNaN(SD) || BMD <= 0 || ref_BMD <= 0 || SD <= 0) return;

    // T-score calculation: T = (BMD - ref_BMD) / SD
    const T_score = (BMD - ref_BMD) / SD;

    let who_class = '', color = '#22543d';
    if (T_score <= -2.5) {
      who_class = 'OSTEOPOROSIS (T ≤ -2.5: High Fracture Risk, Treatment Indicated)';
      color = '#c53030';
    } else if (T_score < -1.0) {
      who_class = 'OSTEOPENIA (Low Bone Mass: -2.5 < T < -1.0)';
      color = '#ea580c';
    } else {
      who_class = 'NORMAL BONE MINERAL DENSITY (T ≥ -1.0 ✓)';
      color = '#22543d';
    }

    tResEl.textContent = 'T-Score = ' + (T_score >= 0 ? '+' : '') + T_score.toFixed(2) + ' (' + (T_score <= -2.5 ? 'OSTEOPOROSIS' : T_score < -1.0 ? 'OSTEOPENIA' : 'NORMAL') + ')';
    tResEl.style.color = color;
    dgResEl.textContent = who_class + ' [BMD = ' + BMD.toFixed(3) + ' g/cm² vs Young Mean = ' + ref_BMD.toFixed(3) + ' g/cm²]';
  }

  [bmdEl, refEl, sdEl].forEach(el => el.addEventListener('input', update));
  update();
})();