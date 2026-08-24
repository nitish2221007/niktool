(() => {
  'use strict';
  const toxEl = document.getElementById('cox-tox'), kEl = document.getElementById('cox-k'), muEl = document.getElementById('cox-mu');
  const coxResEl = document.getElementById('cox-res-cox'), knResEl = document.getElementById('cox-res-kn');

  const eps0 = 8.8541878128e-12;

  function update() {
    const toxNm = parseFloat(toxEl.value), kappa = parseFloat(kEl.value), mu = parseFloat(muEl.value);
    if (isNaN(toxNm) || isNaN(kappa) || isNaN(mu) || toxNm <= 0 || kappa <= 0 || mu <= 0) return;

    const toxM = toxNm * 1e-9;
    const coxF_m2 = (kappa * eps0) / toxM;
    const coxFf_um2 = coxF_m2;
    const muM2_Vs = mu * 1e-4;
    const knA_V2 = muM2_Vs * coxF_m2;
    const knUa_V2 = knA_V2 * 1e6;

    coxResEl.textContent = coxFf_um2.toFixed(2) + ' fF / μm² (' + (coxF_m2 * 100).toFixed(2) + ' μF/cm²)';
    knResEl.textContent = 'k_n' = ' + knUa_V2.toFixed(1) + ' μA / V² (MOSFET Current Gain Factor)';
  }

  [toxEl, kEl, muEl].forEach(el => el.addEventListener('input', update));
  kEl.addEventListener('change', update);
  update();
})();