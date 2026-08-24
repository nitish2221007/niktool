(() => {
  'use strict';
  const phiEl = document.getElementById('xp-phi'), tdEl = document.getElementById('xp-tdown');
  const rhResEl = document.getElementById('xp-res-rho'), ptResEl = document.getElementById('xp-res-pit');

  function update() {
    const Phi_13 = parseFloat(phiEl.value), t_down = parseFloat(tdEl.value);
    if (isNaN(Phi_13) || isNaN(t_down) || Phi_13 <= 0 || t_down < 0) return;

    const Phi = Phi_13 * 1e13; // n / (cm^2 * s)

    // Steady-state equilibrium xenon reactivity worth approx:
    // rho_ss (pcm) approx - (3000 * Phi) / (Phi + 3.5e13) * 1.5
    const rho_ss_pcm = - (3200.0 * Phi) / (Phi + 3.0e13);

    // Post-shutdown peak factor: I-135 decays into Xe-135 with peak near 9.5 hours
    // Peak height scales with pre-shutdown flux Phi
    const peak_multiplier = 1.0 + (Phi_13 / 10.0) * 0.85;
    const peak_rho_pcm = rho_ss_pcm * peak_multiplier;

    // Time profile post shutdown:
    const decay_factor = Math.exp(-0.075 * Math.pow(t_down - 9.5, 2) / 8.0);
    const current_rho_pcm = rho_ss_pcm + (peak_rho_pcm - rho_ss_pcm) * Math.exp(-Math.pow(t_down - 9.5, 2) / 30.0);

    rhResEl.textContent = 'Xenon Worth = ' + Math.round(current_rho_pcm).toLocaleString() + ' pcm (' + (current_rho_pcm/1000).toFixed(2) + '% Δk/k)';
    ptResEl.textContent = 'Peak Deficit = ' + Math.round(peak_rho_pcm).toLocaleString() + ' pcm @ ~9.5 hr post-scram | Steady-State Worth = ' + Math.round(rho_ss_pcm).toLocaleString() + ' pcm (Pre-trip Φ=' + Phi_13 + '×10¹³)';
  }

  phiEl.addEventListener('input', update);
  tdEl.addEventListener('input', update);
  update();
})();