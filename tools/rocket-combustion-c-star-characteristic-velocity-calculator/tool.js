(() => {
  'use strict';
  const pcEl = document.getElementById('cst-pc'), atEl = document.getElementById('cst-at'), mdEl = document.getElementById('cst-mdot');
  const cstResEl = document.getElementById('cst-res-val'), efResEl = document.getElementById('cst-res-eff');

  const c_star_ideal_kerolox = 1790.0; // m / s (standard LOX / RP-1 @ 100 bar)

  function update() {
    const pcBar = parseFloat(pcEl.value), atCm2 = parseFloat(atEl.value), mdot = parseFloat(mdEl.value);
    if (isNaN(pcBar) || isNaN(atCm2) || isNaN(mdot) || pcBar <= 0 || atCm2 <= 0 || mdot <= 0) return;

    const pcPa = pcBar * 1e5;
    const atM2 = atCm2 * 1e-4;

    // Measured c* = (p_c * A_t) / mdot  [m / s]
    const c_star = (pcPa * atM2) / mdot;

    // Combustion efficiency eta_c* = c*_measured / c*_ideal
    const eta_c_star = (c_star / c_star_ideal_kerolox) * 100;

    let effRating = '';
    let color = '#22543d';

    if (eta_c_star >= 97.0) {
      effRating = 'EXCELLENT (η_c* ≥ 97%: High-performance pintle/coaxial injector atomization)';
      color = '#22543d';
    } else if (eta_c_star >= 92.0) {
      effRating = 'MODERATE (92 - 96%: Incomplete droplet vaporization or core streaking)';
      color = '#2563eb';
    } else {
      effRating = 'POOR ATOMIZATION (<92%: Severe propellant unburnt mass loss)';
      color = '#c53030';
    }

    cstResEl.textContent = 'c* = ' + Math.round(c_star).toLocaleString() + ' m / s (Characteristic Velocity)';
    efResEl.textContent = 'η_c* = ' + eta_c_star.toFixed(1) + '% (' + effRating + ' | Thrust: ' + ((pcBar * atCm2 * 0.15).toFixed(0)) + ' kN est.)';
    efResEl.style.color = color;
  }

  [pcEl, atEl, mdEl].forEach(el => el.addEventListener('input', update));
  update();
})();