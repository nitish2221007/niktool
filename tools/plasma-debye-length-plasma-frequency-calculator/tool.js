(() => {
  'use strict';
  const neEl = document.getElementById('deb-ne'), teEl = document.getElementById('deb-te');
  const ldResEl = document.getElementById('deb-res-ld'), fpeResEl = document.getElementById('deb-res-fpe');

  const eps0 = 8.8541878128e-12; // F / m
  const e_charge = 1.602176634e-19; // Coulombs
  const m_e = 9.1093837e-31;     // kg

  function update() {
    const ne = parseFloat(neEl.value), Te_ev = parseFloat(teEl.value);
    if (isNaN(ne) || isNaN(Te_ev) || ne <= 0 || Te_ev <= 0) return;

    const Te_joules = Te_ev * e_charge;

    // Debye length lambda_D = sqrt( eps0 * Te_joules / ( ne * e_charge^2 ) )  [meters]
    const lambda_D_m = Math.sqrt((eps0 * Te_joules) / (ne * Math.pow(e_charge, 2)));
    const lambda_D_um = lambda_D_m * 1e6;

    // Plasma angular frequency omega_pe = sqrt( ne * e_charge^2 / ( eps0 * m_e ) )  [rad / s]
    const omega_pe = Math.sqrt((ne * Math.pow(e_charge, 2)) / (eps0 * m_e));
    const f_pe_ghz = (omega_pe / (2.0 * Math.PI)) / 1e9;

    // Number of particles in Debye sphere N_D = (4/3) * pi * ne * lambda_D^3
    const N_D = (4.0 / 3.0) * Math.PI * ne * Math.pow(lambda_D_m, 3);

    ldResEl.textContent = 'λ_D = ' + (lambda_D_um < 1000 ? lambda_D_um.toFixed(1) + ' μm' : (lambda_D_m * 1000).toFixed(2) + ' mm');
    fpeResEl.textContent = 'f_pe = ' + f_pe_ghz.toFixed(2) + ' GHz (Cutoff Wavelength λ = ' + (300/fpeResEl).toFixed(1) + ' mm | Debye Particles N_D = ' + N_D.toExponential(2) + ')';
  }

  neEl.addEventListener('input', update);
  teEl.addEventListener('input', update);
  update();
})();