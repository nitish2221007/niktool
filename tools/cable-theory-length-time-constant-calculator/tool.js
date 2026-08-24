(() => {
  'use strict';
  const dEl = document.getElementById('cbl-d'), rmEl = document.getElementById('cbl-rm');
  const riEl = document.getElementById('cbl-ri'), xEl = document.getElementById('cbl-x');
  const lResEl = document.getElementById('cbl-res-lam'), atResEl = document.getElementById('cbl-res-atten');

  const C_m = 1.0e-6; // F / cm^2 (standard lipid bilayer capacitance)

  function update() {
    const dUm = parseFloat(dEl.value), Rm = parseFloat(rmEl.value);
    const Ri = parseFloat(riEl.value), xUm = parseFloat(xEl.value);

    if (isNaN(dUm) || isNaN(Rm) || isNaN(Ri) || isNaN(xUm) || dUm <= 0 || Rm <= 0 || Ri <= 0 || xUm < 0) return;

    const dCm = dUm * 1e-4; // um to cm

    // Space constant lambda = sqrt( (d * Rm) / (4 * Ri) )  [cm]
    const lambdaCm = Math.sqrt((dCm * Rm) / (4.0 * Ri));
    const lambdaUm = lambdaCm * 10000;
    const lambdaMm = lambdaCm * 10;

    // Membrane time constant tau_m = Rm * Cm  [seconds]
    const tau_m_sec = Rm * C_m;
    const tau_m_ms = tau_m_sec * 1000;

    // Passive steady-state exponential voltage attenuation: V(x) = V0 * exp(-x / lambda)
    const attenRatio = Math.exp(-xUm / lambdaUm);
    const attenPct = attenRatio * 100;

    lResEl.textContent = 'λ = ' + lambdaUm.toFixed(1) + ' μm (' + lambdaMm.toFixed(3) + ' mm Space Constant)';
    atResEl.textContent = 'V(' + xUm + ' μm) = ' + attenPct.toFixed(1) + '% of Initial EPSP | τ_m = ' + tau_m_ms.toFixed(1) + ' ms (Membrane Charging Time)';
  }

  [dEl, rmEl, riEl, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();