(() => {
  'use strict';
  const mEl = document.getElementById('eot-mat'), tEl = document.getElementById('eot-thk');
  const eotResEl = document.getElementById('eot-res-eot'), lkResEl = document.getElementById('eot-res-leak');

  const kappa_SiO2 = 3.90; // Standard thermal silicon dioxide permittivity

  const HIGH_K = {
    'hfo2':  { kappa: 25.0, name: 'Hafnium Oxide (HfO₂)' },
    'zro2':  { kappa: 24.0, name: 'Zirconium Oxide (ZrO₂)' },
    'al2o3': { kappa: 9.0,  name: 'Aluminum Oxide (Al₂O₃)' },
    'tio2':  { kappa: 80.0, name: 'Titanium Dioxide (TiO₂)' }
  };

  function update() {
    const m = HIGH_K[mEl.value];
    const t_phys_nm = parseFloat(tEl.value);

    if (isNaN(t_phys_nm) || t_phys_nm <= 0) return;

    // EOT = t_phys * ( kappa_SiO2 / kappa_material )  [nm]
    const EOT_nm = t_phys_nm * (kappa_SiO2 / m.kappa);
    const EOT_angstrom = EOT_nm * 10.0;

    // Thickness multiplier
    const thickFactor = m.kappa / kappa_SiO2;

    eotResEl.textContent = 'EOT = ' + EOT_nm.toFixed(2) + ' nm (' + EOT_angstrom.toFixed(1) + ' Ångströms)';
    lkResEl.textContent = 'Physical t = ' + t_phys_nm.toFixed(1) + ' nm is ' + thickFactor.toFixed(1) + '× thicker than equivalent SiO₂, suppressing quantum direct tunneling leakage by >10⁴×';
  }

  mEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();