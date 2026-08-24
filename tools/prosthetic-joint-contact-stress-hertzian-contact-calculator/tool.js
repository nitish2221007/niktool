(() => {
  'use strict';
  const fEl = document.getElementById('hj-f'), r1El = document.getElementById('hj-r1');
  const r2El = document.getElementById('hj-r2'), eEl = document.getElementById('hj-e');
  const stResEl = document.getElementById('hj-res-stress'), evResEl = document.getElementById('hj-res-eval');

  function update() {
    const F_N = parseFloat(fEl.value), R1_mm = parseFloat(r1El.value);
    const R2_mm = parseFloat(r2El.value), E_cup_GPa = parseFloat(eEl.value);

    if (isNaN(F_N) || isNaN(R1_mm) || isNaN(R2_mm) || isNaN(E_cup_GPa) || F_N <= 0 || R1_mm <= 0 || R2_mm <= R1_mm || E_cup_GPa <= 0) return;

    // Contact mechanics for sphere in conforming spherical socket:
    // Relative curvature: 1/R_eff = 1/R1 - 1/R2
    const R1_m = R1_mm * 1e-3;
    const R2_m = R2_mm * 1e-3;
    const one_over_Reff = (1.0 / R1_m) - (1.0 / R2_m);
    const R_eff_m = 1.0 / one_over_Reff;

    // Equivalent elastic modulus E*:
    // For metal/ceramic head (E >> E_cup) and cup (Poisson ~ 0.4):
    // E* approx E_cup / (1 - nu^2) approx E_cup / 0.84
    const E_star_Pa = (E_cup_GPa * 1e9) / 0.84;

    // Hertzian contact radius: a = ( (3 * F * R_eff) / (4 * E*) )^(1/3)
    const a_m = Math.pow((3.0 * F_N * R_eff_m) / (4.0 * E_star_Pa), 1.0 / 3.0);
    const a_mm = a_m * 1000.0;

    // Peak contact stress: sigma_max = 3 * F / ( 2 * pi * a^2 )  [Pa -> MPa]
    const sigma_max_Pa = (3.0 * F_N) / (2.0 * Math.PI * Math.pow(a_m, 2));
    const sigma_max_MPa = sigma_max_Pa / 1e6;

    let eval_text = '', color = '#22543d';
    if (sigma_max_MPa > 25.0) {
      eval_text = 'EXCESSIVE CONTACT STRESS (Risk of Polyethylene Delamination / Wear Debris Osteolysis)';
      color = '#c53030';
    } else if (sigma_max_MPa > 18.0) {
      eval_text = 'MODERATE-HIGH STRESS (Acceptable for Ceramic-on-Ceramic, high for Conventional UHMWPE)';
      color = '#ea580c';
    } else {
      eval_text = 'OPTIMAL CONTACT STRESS (Long Joint Replacement Implant Longevity ✓)';
      color = '#22543d';
    }

    stResEl.textContent = 'Peak Contact Stress σ_max = ' + sigma_max_MPa.toFixed(1) + ' MPa';
    stResEl.style.color = color;
    evResEl.textContent = eval_text + ' [Contact Radius a = ' + a_mm.toFixed(1) + ' mm, Clearance = ' + ((R2_mm - R1_mm)*1000).toFixed(0) + ' μm @ F = ' + F_N + ' N]';
  }

  [fEl, r1El, r2El, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();