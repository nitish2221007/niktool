(() => {
  'use strict';
  const phiEl = document.getElementById('ll-phi'), wmEl = document.getElementById('ll-wm');
  const cpResEl = document.getElementById('ll-res-comp'), alResEl = document.getElementById('ll-res-alpha');

  function update() {
    const phi_m_deg = parseFloat(phiEl.value), omega_m = parseFloat(wmEl.value);
    if (isNaN(phi_m_deg) || isNaN(omega_m) || phi_m_deg <= 0 || phi_m_deg >= 90 || omega_m <= 0) return;

    const phi_m_rad = (phi_m_deg * Math.PI) / 180.0;

    // Attenuation factor: alpha = ( 1 - sin(phi_m) ) / ( 1 + sin(phi_m) )
    const sin_phi = Math.sin(phi_m_rad);
    const alpha = (1.0 - sin_phi) / (1.0 + sin_phi);

    // Center frequency: omega_m = 1 / ( T * sqrt(alpha) ) => T = 1 / ( omega_m * sqrt(alpha) )
    const T = 1.0 / (omega_m * Math.sqrt(alpha));

    // Zero location: z = 1 / T
    const zero_loc = 1.0 / T;

    // Pole location: p = 1 / ( alpha * T )
    const pole_loc = 1.0 / (alpha * T);

    // High frequency gain in dB: 20 * log10( 1 / alpha )
    const gain_dB = 20.0 * Math.log10(1.0 / alpha);

    cpResEl.textContent = 'G_c(s) = (s + ' + zero_loc.toFixed(1) + ') / (s + ' + pole_loc.toFixed(1) + ')';
    alResEl.textContent = 'α = ' + alpha.toFixed(4) + ' | Zero: -' + zero_loc.toFixed(1) + ', Pole: -' + pole_loc.toFixed(1) + ' rad/s (+ ' + gain_dB.toFixed(1) + ' dB Gain Boost)';
  }

  phiEl.addEventListener('input', update));
  wmEl.addEventListener('input', update);
  update();
})();