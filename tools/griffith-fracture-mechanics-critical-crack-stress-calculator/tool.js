(() => {
  'use strict';
  const eEl = document.getElementById('gf-e'), gmEl = document.getElementById('gf-gamma');
  const aEl = document.getElementById('gf-a'), yEl = document.getElementById('gf-y');
  const scResEl = document.getElementById('gf-res-sc'), kicResEl = document.getElementById('gf-res-kic');

  function update() {
    const E_GPa = parseFloat(eEl.value), gamma_s = parseFloat(gmEl.value);
    const a_mm = parseFloat(aEl.value), Y = parseFloat(yEl.value);

    if (isNaN(E_GPa) || isNaN(gamma_s) || isNaN(a_mm) || isNaN(Y) || E_GPa <= 0 || gamma_s <= 0 || a_mm <= 0 || Y <= 0) return;

    const E_Pa = E_GPa * 1e9;
    const a_m = a_mm * 1e-3;

    // Griffith equation: sigma_c = sqrt( (2 * E * gamma_s) / (pi * a) )  [Pa -> MPa]
    const sigma_c_Pa = Math.sqrt((2.0 * E_Pa * gamma_s) / (Math.PI * a_m)) / Y;
    const sigma_c_MPa = sigma_c_Pa / 1e6;

    // Stress Intensity Factor K_IC = Y * sigma_c * sqrt(pi * a)  [MPa * m^0.5]
    const K_IC = Y * sigma_c_MPa * Math.sqrt(Math.PI * a_m);

    scResEl.textContent = 'Critical Stress σ_c = ' + sigma_c_MPa.toFixed(1) + ' MPa';
    kicResEl.textContent = 'Fracture Toughness K_IC = ' + K_IC.toFixed(2) + ' MPa·m^½ (Crack a=' + a_mm + ' mm, Y=' + Y + ')';
  }

  [eEl, gmEl, aEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();