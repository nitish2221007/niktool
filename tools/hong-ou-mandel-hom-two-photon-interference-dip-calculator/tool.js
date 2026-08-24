(() => {
  'use strict';
  const mxEl = document.getElementById('hom-nmax'), mnEl = document.getElementById('hom-nmin'), tEl = document.getElementById('hom-tau');
  const vResEl = document.getElementById('hom-res-vis'), cResEl = document.getElementById('hom-res-coh');

  const c_light = 299792458;

  function update() {
    const N_max = parseFloat(mxEl.value), N_min = parseFloat(mnEl.value), tau_fs = parseFloat(tEl.value);
    if (isNaN(N_max) || isNaN(N_min) || isNaN(tau_fs) || N_max <= 0 || N_min < 0 || N_min > N_max) return;

    // HOM Dip Visibility V = (N_max - N_min) / N_max
    const V = (N_max - N_min) / N_max;
    const V_pct = V * 100.0;

    // Coherence spatial length L_coh = c * tau_c  [um]
    const tau_sec = tau_fs * 1e-15;
    const L_coh_m = c_light * tau_sec;
    const L_coh_um = L_coh_m * 1e6;

    let status = '';
    let color = '#22543d';

    if (V_pct > 90.0) {
      status = 'EXCELLENT INDISTINGUISHABILITY (V > 90%: Suitable for Linear Optical Quantum Computing gates)';
      color = '#22543d';
    } else if (V_pct > 50.0) {
      status = 'QUANTUM NATURE CONFIRMED (V > 50% Classical Limit: Non-classical destructive coincidence interference)';
      color = '#2563eb';
    } else {
      status = 'CLASSICAL MIXTURE (V ≤ 50%: Distinguishable photon frequencies, polarizations, or timing jitter)';
      color = '#d97706';
    }

    vResEl.textContent = 'V = ' + V_pct.toFixed(1) + '% HOM Dip Visibility';
    vResEl.style.color = color;
    cResEl.textContent = status + ' | Dip Width Δx = ' + L_coh_um.toFixed(2) + ' μm (Photon Coherence Time τ = ' + tau_fs + ' fs)';
    cResEl.style.color = color;
  }

  [mxEl, mnEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();