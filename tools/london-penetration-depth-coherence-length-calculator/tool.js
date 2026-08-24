(() => {
  'use strict';
  const nsEl = document.getElementById('lon-ns'), xiEl = document.getElementById('lon-xi'), mEl = document.getElementById('lon-mass');
  const lResEl = document.getElementById('lon-res-lam'), kpResEl = document.getElementById('lon-res-kappa');

  const mu0 = 4.0 * Math.PI * 1e-7;
  const e_charge = 1.602176634e-19;
  const m_e = 9.1093837e-31;

  function update() {
    const ns_factor = parseFloat(nsEl.value), xiNm = parseFloat(xiEl.value), massRatio = parseFloat(mEl.value);
    if (isNaN(ns_factor) || isNaN(xiNm) || isNaN(massRatio) || ns_factor <= 0 || xiNm <= 0 || massRatio <= 0) return;

    const ns = ns_factor * 1e28; // Cooper pair super-electron density
    const m_eff = massRatio * m_e;

    // London penetration depth: lambda_L = sqrt( m / (mu0 * ns * e^2) )  [meters]
    const lambda_m = Math.sqrt(m_eff / (mu0 * ns * Math.pow(e_charge, 2)));
    const lambda_nm = lambda_m * 1e9;

    // Ginzburg-Landau parameter kappa = lambda / xi
    const kappa = lambda_nm / xiNm;

    let scType = '';
    let color = '#22543d';

    if (kappa < 0.70710678) {
      scType = 'TYPE I SUPERCONDUCTOR (κ = ' + kappa.toFixed(3) + ' < 1/√2: Complete Meissner Expulsion, Positive Surface Energy)';
      color = '#2563eb';
    } else {
      scType = 'TYPE II SUPERCONDUCTOR (κ = ' + kappa.toFixed(2) + ' > 1/√2: High-Field Abrikosov Vortex Mixed State)';
      color = '#22543d';
    }

    lResEl.textContent = 'λ_L = ' + lambda_nm.toFixed(1) + ' nm Meissner Screening Depth';
    kpResEl.textContent = scType + ' | ξ = ' + xiNm + ' nm (London λ_L = ' + lambda_nm.toFixed(1) + ' nm)';
    kpResEl.style.color = color;
  }

  [nsEl, xiEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();