(() => {
  'use strict';
  const lpEl = document.getElementById('spdc-lp'), crEl = document.getElementById('spdc-crys');
  const degResEl = document.getElementById('spdc-res-deg'), mtResEl = document.getElementById('spdc-res-match');

  const CRYSTALS = {
    'bbo':  { angle_deg: 29.3, type: 'Type-I (e -> o + o)', name: 'BBO' },
    'ppln': { angle_deg: 0.0,  type: 'Quasi-Phase-Matched (QPM Poling Λ = 9.8 μm)', name: 'PPLN' },
    'ktp':  { angle_deg: 90.0, type: 'Type-II (e -> o + e)', name: 'KTP' }
  };

  function update() {
    const lambda_p_nm = parseFloat(lpEl.value);
    const cr = CRYSTALS[crEl.value];

    if (isNaN(lambda_p_nm) || lambda_p_nm <= 0) return;

    // Degenerate down-conversion: lambda_signal = lambda_idler = 2 * lambda_p  [nm]
    const lambda_deg_nm = 2.0 * lambda_p_nm;

    degResEl.textContent = 'λ_signal = ' + lambda_deg_nm.toFixed(1) + ' nm | λ_idler = ' + lambda_deg_nm.toFixed(1) + ' nm';
    mtResEl.textContent = cr.name + ' ' + cr.type + ' | ' + (cr.angle_deg > 0 ? 'Phase Angle θ_pm = ' + cr.angle_deg + '°' : cr.type) + ' (Pump: ' + lambda_p_nm + ' nm -> NIR Pairs)';
  }

  lpEl.addEventListener('input', update);
  crEl.addEventListener('change', update);
  update();
})();