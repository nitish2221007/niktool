(() => {
  'use strict';
  const matEl = document.getElementById('qd-mat'), rEl = document.getElementById('qd-r');
  const egResEl = document.getElementById('qd-res-eg'), shResEl = document.getElementById('qd-res-shift');

  const hbar = 1.054571817e-34;
  const m_e_kg = 9.1093837e-31;
  const e_charge = 1.602176634e-19;
  const c_light = 299792458;
  const h_planck = 6.62607015e-34;

  const SEMIS = {
    'cdse':  { eg_bulk: 1.74, me_eff: 0.13, mh_eff: 0.45, eps_r: 10.0, name: 'CdSe' },
    'inp':   { eg_bulk: 1.35, me_eff: 0.08, mh_eff: 0.60, eps_r: 12.5, name: 'InP' },
    'pbs':   { eg_bulk: 0.41, me_eff: 0.08, mh_eff: 0.08, eps_r: 17.0, name: 'PbS' },
    'perov': { eg_bulk: 2.30, me_eff: 0.15, mh_eff: 0.14, eps_r: 8.5,  name: 'CsPbBr₃' }
  };

  function update() {
    const s = SEMIS[matEl.value];
    const R_nm = parseFloat(rEl.value);

    if (isNaN(R_nm) || R_nm <= 0) return;

    const R_m = R_nm * 1e-9;

    // Reduced effective mass 1/mu = 1/me + 1/mh
    const inv_mu = (1.0 / s.me_eff) + (1.0 / s.mh_eff);
    const mu_kg = (m_e_kg / inv_mu);

    // Brus confinement kinetic energy term: Delta_Ek = ( hbar^2 * pi^2 ) / ( 2 * mu * R^2 )  [Joules -> eV]
    const Delta_Ek_J = (Math.pow(hbar, 2) * Math.pow(Math.PI, 2)) / (2.0 * mu_kg * Math.pow(R_m, 2));
    const Delta_Ek_ev = Delta_Ek_J / e_charge;

    // Coulomb attraction term: Delta_Ec = 1.8 * e^2 / ( 4 * pi * eps0 * eps_r * R )  [eV]
    const eps0 = 8.8541878128e-12;
    const Delta_Ec_J = (1.8 * Math.pow(e_charge, 2)) / (4.0 * Math.PI * eps0 * s.eps_r * R_m);
    const Delta_Ec_ev = Delta_Ec_J / e_charge;

    // Effective QD bandgap E_g_qd = E_g_bulk + Delta_Ek - Delta_Ec  [eV]
    const E_g_qd = s.eg_bulk + Delta_Ek_ev - Delta_Ec_ev;
    const blueShift_ev = E_g_qd - s.eg_bulk;

    // Photoluminescence emission wavelength lambda = h * c / Eg  [nm]
    const lambda_nm = (h_planck * c_light / (E_g_qd * e_charge)) * 1e9;

    let colorName = '';
    let hexColor = '#22543d';

    if (lambda_nm < 450) { colorName = 'Violet / UV'; hexColor = '#7c3aed'; }
    else if (lambda_nm < 495) { colorName = 'Blue Light'; hexColor = '#2563eb'; }
    else if (lambda_nm < 570) { colorName = 'Pure Green'; hexColor = '#16a34a'; }
    else if (lambda_nm < 590) { colorName = 'Yellow Light'; hexColor = '#ca8a04'; }
    else if (lambda_nm < 620) { colorName = 'Amber / Orange'; hexColor = '#ea580c'; }
    else if (lambda_nm < 750) { colorName = 'Deep Red'; hexColor = '#dc2626'; }
    else { colorName = 'Infrared (NIR / SWIR)'; hexColor = '#4b5563'; }

    egResEl.textContent = 'E_g = ' + E_g_qd.toFixed(2) + ' eV (' + Math.round(lambda_nm) + ' nm ' + colorName + ')';
    egResEl.style.color = hexColor;
    shResEl.textContent = 'Blue-Shift ΔE_g = +' + blueShift_ev.toFixed(2) + ' eV (Bulk: ' + s.eg_bulk + ' eV -> QD ' + E_g_qd.toFixed(2) + ' eV @ Core R = ' + R_nm + ' nm)';
  }

  matEl.addEventListener('change', update);
  rEl.addEventListener('input', update);
  update();
})();