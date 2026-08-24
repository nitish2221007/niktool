(() => {
  'use strict';
  const matEl = document.getElementById('ts-mat'), dtEl = document.getElementById('ts-dt');
  const rResEl = document.getElementById('ts-res-r'), stResEl = document.getElementById('ts-res-stat');

  const MATERIALS = {
    'fused_silica': { sigma_f: 70.0,  E: 72.0,  nu: 0.17, alpha_ppm: 0.5,  k: 1.4,   name: 'Fused Silica Quartz' },
    'sic':          { sigma_f: 450.0, E: 410.0, nu: 0.16, alpha_ppm: 4.0,  k: 120.0, name: 'Sintered Silicon Carbide' },
    'alumina':      { sigma_f: 300.0, E: 380.0, nu: 0.22, alpha_ppm: 8.0,  k: 30.0,  name: '99% Alumina Al₂O₃' },
    'zirconia':     { sigma_f: 1000.0,E: 210.0, nu: 0.30, alpha_ppm: 10.5, k: 2.2,   name: 'Yttria-Stabilized Zirconia' },
    'borosilicate': { sigma_f: 80.0,  E: 64.0,  nu: 0.20, alpha_ppm: 3.3,  k: 1.2,   name: 'Borosilicate Glass (Pyrex)' }
  };

  function update() {
    const m = MATERIALS[matEl.value];
    const deltaT = parseFloat(dtEl.value);

    if (isNaN(deltaT) || deltaT <= 0) return;

    // Thermal expansion alpha in 1/K: alpha_ppm * 1e-6
    const alpha = m.alpha_ppm * 1e-6;
    const E_pa = m.E * 1e9;
    const sigma_f_pa = m.sigma_f * 1e6;

    // Thermal shock resistance parameter R = ( sigma_f * (1 - nu) ) / ( E * alpha )  [Kelvin / °C]
    const R_degC = (sigma_f_pa * (1.0 - m.nu)) / (E_pa * alpha);

    // High heat flux thermal shock parameter R' = R * k  [W / m]
    const R_prime_W_m = R_degC * m.k;

    let status = '';
    let color = '#22543d';

    if (deltaT <= R_degC) {
      status = 'THERMALLY RESISTANT (Quench ΔT = ' + deltaT + '°C < R = ' + Math.round(R_degC) + '°C: Zero thermal stress cracking)';
      color = '#22543d';
    } else {
      status = 'THERMAL SHOCK FAILURE (Quench ΔT = ' + deltaT + '°C EXCEEDS R = ' + Math.round(R_degC) + '°C: Catastrophic thermal spalling crack!)';
      color = '#c53030';
    }

    rResEl.textContent = 'R = ' + Math.round(R_degC).toLocaleString() + ' °C (R' = ' + (R_prime_W_m/1000).toFixed(1) + ' kW/m)';
    stResEl.textContent = status + ' | ' + m.name + ' (α = ' + m.alpha_ppm + ' ppm/K, k = ' + m.k + ' W/m·K)';
    stResEl.style.color = color;
  }

  matEl.addEventListener('change', update);
  dtEl.addEventListener('input', update);
  update();
})();