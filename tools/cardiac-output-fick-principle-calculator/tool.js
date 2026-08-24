(() => {
  'use strict';
  const vo2El = document.getElementById('fick-vo2'), caEl = document.getElementById('fick-ca');
  const cvEl = document.getElementById('fick-cv'), bsaEl = document.getElementById('fick-bsa');
  const coResEl = document.getElementById('fick-res-co'), ciResEl = document.getElementById('fick-res-ci');

  function update() {
    const VO2 = parseFloat(vo2El.value), Ca = parseFloat(caEl.value);
    const Cv = parseFloat(cvEl.value), bsa = parseFloat(bsaEl.value);

    if (isNaN(VO2) || isNaN(Ca) || isNaN(Cv) || isNaN(bsa) || VO2 <= 0 || Ca <= Cv || Cv <= 0 || bsa <= 0) return;

    // A-V O2 difference in mL / L = (Ca - Cv) * 10
    const avDiff_mLL = (Ca - Cv) * 10;
    // Cardiac Output CO = VO2 / avDiff_mLL  [L / min]
    const CO = VO2 / avDiff_mLL;
    // Cardiac Index CI = CO / BSA  [L / min / m^2]
    const CI = CO / bsa;

    coResEl.textContent = CO.toFixed(2) + ' L / min (A-V Diff: ' + (Ca - Cv).toFixed(1) + ' mL/dL)';

    if (CI >= 2.5 && CI <= 4.0) {
      ciResEl.textContent = 'CI = ' + CI.toFixed(2) + ' L/min/m² (Normal Cardiac Index)';
      ciResEl.style.color = '#22543d';
    } else if (CI < 2.2) {
      ciResEl.textContent = 'CI = ' + CI.toFixed(2) + ' L/min/m² (CARDIOGENIC SHOCK / Low Output < 2.2)';
      ciResEl.style.color = '#c53030';
    } else {
      ciResEl.textContent = 'CI = ' + CI.toFixed(2) + ' L/min/m² (Hyperdynamic / High Output)';
      ciResEl.style.color = '#2563eb';
    }
  }

  [vo2El, caEl, cvEl, bsaEl].forEach(el => el.addEventListener('input', update));
  update();
})();