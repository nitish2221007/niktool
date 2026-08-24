(() => {
  'use strict';
  const pEl = document.getElementById('ro-p'), cfEl = document.getElementById('ro-cf');
  const cpEl = document.getElementById('ro-cp'), aEl = document.getElementById('ro-a');
  const flResEl = document.getElementById('ro-res-flux'), rjResEl = document.getElementById('ro-res-rej');

  function update() {
    const P_bar = parseFloat(pEl.value), C_f = parseFloat(cfEl.value);
    const C_p = parseFloat(cpEl.value), A_perm = parseFloat(aEl.value);

    if (isNaN(P_bar) || isNaN(C_f) || isNaN(C_p) || isNaN(A_perm) || P_bar <= 0 || C_f <= 0 || C_p < 0 || A_perm <= 0) return;

    // Osmotic pressure approx for seawater: pi approx 0.8 bar per 1000 mg/L TDS (van 't Hoff rule)
    const pi_bar = (C_f / 1000.0) * 0.80;

    // Net Driving Pressure: NDP = Delta_P - Delta_pi
    const NDP = Math.max(0.0, P_bar - pi_bar);

    // Permeate flux: J_w = A * NDP  [L / (m^2 * hr) = LMH]
    const J_w = A_perm * NDP;

    // Salt rejection efficiency: R = ( 1 - C_p / C_f ) * 100%
    const R_pct = (1.0 - (C_p / C_f)) * 100.0;

    flResEl.textContent = 'Water Flux J_w = ' + J_w.toFixed(1) + ' LMH (L/m²·hr)';
    rjResEl.textContent = 'Salt Rejection R = ' + R_pct.toFixed(2) + '% | Osmotic π = ' + pi_bar.toFixed(1) + ' bar (NDP = ' + NDP.toFixed(1) + ' bar @ P=' + P_bar + ' bar)';
  }

  [pEl, cfEl, cpEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();