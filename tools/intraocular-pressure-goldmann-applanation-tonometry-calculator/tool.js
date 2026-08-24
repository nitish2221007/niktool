(() => {
  'use strict';
  const rawEl = document.getElementById('iop-raw'), cctEl = document.getElementById('iop-cct');
  const adResEl = document.getElementById('iop-res-adj'), evResEl = document.getElementById('iop-res-eval');

  const baseline_CCT = 545.0; // standard Goldmann calibration thickness in um

  function update() {
    const raw_IOP = parseFloat(rawEl.value), CCT_um = parseFloat(cctEl.value);
    if (isNaN(raw_IOP) || isNaN(CCT_um) || raw_IOP <= 0 || CCT_um <= 0) return;

    // Dresdner linear pachymetry correction:
    // delta_IOP approx - ( CCT - 545 ) / 16.5  (mmHg)
    const delta_IOP = - (CCT_um - baseline_CCT) / 16.5;
    const adjusted_IOP = raw_IOP + delta_IOP;

    let eval_text = '', color = '#22543d';
    if (adjusted_IOP > 21.0) {
      eval_text = 'OCULAR HYPERTENSION / GLAUCOMA RISK (Adjusted IOP > 21 mmHg: Optic Nerve Evaluation Needed)';
      color = '#c53030';
    } else if (adjusted_IOP < 10.0) {
      eval_text = 'OCULAR HYPOTONY (Adjusted IOP < 10 mmHg)';
      color = '#ea580c';
    } else {
      eval_text = 'NORMAL INTRAOCULAR PRESSURE (10 to 21 mmHg Range ✓)';
      color = '#22543d';
    }

    adResEl.textContent = 'Adjusted IOP = ' + adjusted_IOP.toFixed(1) + ' mmHg (' + (adjusted_IOP <= 21 ? 'NORMAL' : 'ELEVATED') + ')';
    adResEl.style.color = color;
    evResEl.textContent = eval_text + ' [CCT = ' + CCT_um + ' μm: ' + (delta_IOP >= 0 ? '+' : '') + delta_IOP.toFixed(1) + ' mmHg Pachymetry Offset]';
  }

  rawEl.addEventListener('input', update);
  cctEl.addEventListener('input', update);
  update();
})();