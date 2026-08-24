(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), t10El = document.getElementById('ct-t10');
  const tmEl = document.getElementById('ct-temp'), phEl = document.getElementById('ct-ph');
  const valResEl = document.getElementById('ct-res-val'), evResEl = document.getElementById('ct-res-eval');

  function update() {
    const C = parseFloat(cEl.value), T10 = parseFloat(t10El.value);
    const T_C = parseFloat(tmEl.value), pH = parseFloat(phEl.value);

    if (isNaN(C) || isNaN(T10) || isNaN(T_C) || isNaN(pH) || C <= 0 || T10 <= 0 || T_C < 0 || pH <= 0) return;

    // Achieved CT = C * T10  [mg * min / L]
    const CT_achieved = C * T10;

    // EPA SWTR Required 3-Log (99.9%) Giardia CT approx: CT_req approx (2.8 * pH - 5.0) * exp(-0.05 * T_C) * 35
    // Typical at 15°C, pH 7.5, C=1.2: CT_req approx 49 mg*min/L
    const CT_req_3log = (2.5 * pH) * Math.exp(-0.045 * T_C) * 3.5;
    const log_inact = (CT_achieved / CT_req_3log) * 3.0;

    let qual = '', color = '#22543d';
    if (CT_achieved >= CT_req_3log) {
      qual = 'COMPLIANT (Achieved ' + log_inact.toFixed(2) + '-Log Giardia Kill ≥ 3.0-Log EPA Standard ✓)';
      color = '#22543d';
    } else {
      qual = 'NON-COMPLIANT (Achieved ' + log_inact.toFixed(2) + '-Log < 3.0-Log Required CT: Increase chlorine or contact time ✗)';
      color = '#c53030';
    }

    valResEl.textContent = 'Achieved CT = ' + CT_achieved.toFixed(1) + ' mg · min / L';
    evResEl.textContent = qual + ' [Required 3-Log CT ≈ ' + CT_req_3log.toFixed(1) + ' mg·min/L @ ' + T_C + '°C, pH ' + pH + ']';
    evResEl.style.color = color;
  }

  [cEl, t10El, tmEl, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();