(() => {
  'use strict';
  const pEl = document.getElementById('pb-p'), bEl = document.getElementById('pb-b');
  const ipEl = document.getElementById('pb-ip'), aEl = document.getElementById('pb-a');
  const btResEl = document.getElementById('pb-res-beta'), trResEl = document.getElementById('pb-res-troy');

  const mu_0 = 4.0 * Math.PI * 1e-7;

  function update() {
    const p_kPa = parseFloat(pEl.value), B_T = parseFloat(bEl.value);
    const I_p_MA = parseFloat(ipEl.value), a_m = parseFloat(aEl.value);

    if (isNaN(p_kPa) || isNaN(B_T) || isNaN(I_p_MA) || isNaN(a_m) || p_kPa <= 0 || B_T <= 0 || I_p_MA <= 0 || a_m <= 0) return;

    const p_Pa = p_kPa * 1000.0;

    // Magnetic pressure: P_mag = B^2 / (2 * mu_0)  [Pa]
    const P_mag_Pa = Math.pow(B_T, 2) / (2.0 * mu_0);

    // Total beta percentage: beta = p / P_mag * 100%
    const beta_pct = (p_Pa / P_mag_Pa) * 100.0;

    // Normalized beta: beta_N = beta% / ( I_p_MA / (a_m * B_T) )
    const normalized_current = I_p_MA / (a_m * B_T);
    const beta_N = beta_pct / normalized_current;

    let qual = '', color = '#22543d';
    if (beta_N <= 2.8) {
      qual = 'TROYON STABLE (β_N ≤ 2.8: Safe against ideal MHD ballooning modes ✓)';
      color = '#22543d';
    } else if (beta_N <= 3.5) {
      qual = 'ADVANCED TOKAMAK REGIME (2.8 < β_N ≤ 3.5: Wall stabilization required)';
      color = '#ea580c';
    } else {
      qual = 'UNSTABLE BALLOONING LIMIT (β_N > 3.5: Severe plasma loss ✗)';
      color = '#c53030';
    }

    btResEl.textContent = 'Total Plasma Beta β = ' + beta_pct.toFixed(2) + '%';
    btResEl.style.color = color;
    trResEl.textContent = 'Troyon β_N = ' + beta_N.toFixed(2) + ' (' + qual + ' | P_mag = ' + (P_mag_Pa/1e5).toFixed(1) + ' bar)';
  }

  [pEl, bEl, ipEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();