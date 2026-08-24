(() => {
  'use strict';
  const vo2El = document.getElementById('fk-vo2'), hbEl = document.getElementById('fk-hb');
  const sao2El = document.getElementById('fk-sao2'), svo2El = document.getElementById('fk-svo2'), bsaEl = document.getElementById('fk-bsa');
  const coResEl = document.getElementById('fk-res-co'), ciResEl = document.getElementById('fk-res-ci');

  function update() {
    const VO2 = parseFloat(vo2El.value), Hb = parseFloat(hbEl.value);
    const SaO2 = parseFloat(sao2El.value), SvO2 = parseFloat(svo2El.value), BSA = parseFloat(bsaEl.value);

    if (isNaN(VO2) || isNaN(Hb) || isNaN(SaO2) || isNaN(SvO2) || isNaN(BSA) || VO2 <= 0 || Hb <= 0 || SaO2 <= SvO2 || BSA <= 0) return;

    // Oxygen content in mL O2 / L of blood (Hüfner's constant 1.34 mL/g Hb):
    // CaO2 - CvO2 = 1.34 * Hb * 10 * (SaO2 - SvO2)  [mL O2 / Liter blood]
    const av_diff_mLO2_L = 1.34 * Hb * 10.0 * (SaO2 - SvO2);

    // Cardiac output in L / min: CO = VO2 / (CaO2 - CvO2)
    const CO = VO2 / av_diff_mLO2_L;

    // Cardiac Index in L / min / m^2: CI = CO / BSA
    const CI = CO / BSA;

    let eval_text = '', color = '#22543d';
    if (CI < 2.2) {
      eval_text = 'CARDIOGENIC SHOCK / LOW CARDIAC OUTPUT (CI < 2.2 L/min/m²)';
      color = '#c53030';
    } else if (CI < 2.5) {
      eval_text = 'BORDERLINE LOW CARDIAC INDEX (2.2 - 2.5 L/min/m²)';
      color = '#ea580c';
    } else if (CI > 4.2) {
      eval_text = 'HYPERDYNAMIC STATE (Sepsis, Anemia, Cirrhosis)';
      color = '#ea580c';
    } else {
      eval_text = 'NORMAL HEMODYNAMIC CARDIAC INDEX (2.5 - 4.0 L/min/m² ✓)';
      color = '#22543d';
    }

    coResEl.textContent = 'Cardiac Output CO = ' + CO.toFixed(2) + ' L / min (' + (CI >= 2.5 && CI <= 4.0 ? 'NORMAL' : 'ABNORMAL') + ')';
    coResEl.style.color = color;
    ciResEl.textContent = 'Cardiac Index CI = ' + CI.toFixed(2) + ' L/min/m² | ' + eval_text + ' (A-V Diff = ' + av_diff_mLO2_L.toFixed(1) + ' mL/L)';
  }

  [vo2El, hbEl, sao2El, svo2El, bsaEl].forEach(el => el.addEventListener('input', update));
  update();
})();