(() => {
  'use strict';
  const vEl = document.getElementById('ssd-v'), tEl = document.getElementById('ssd-t'), gEl = document.getElementById('ssd-g');
  const totResEl = document.getElementById('ssd-res-tot'), brkResEl = document.getElementById('ssd-res-break');

  function update() {
    const v_kmh = parseFloat(vEl.value), t_sec = parseFloat(tEl.value), G_pct = parseFloat(gEl.value);
    if (isNaN(v_kmh) || isNaN(t_sec) || isNaN(G_pct) || v_kmh <= 0 || t_sec <= 0) return;

    // Perception-reaction distance: d_r = 0.2778 * v * t  [meters]
    const d_reaction = 0.277778 * v_kmh * t_sec;

    // AASHTO design deceleration rate a = 3.4 m/s^2 (a/g = 0.35 friction coefficient)
    const a_over_g = 0.35;
    const G_dec = G_pct / 100.0;

    // Braking distance: d_b = v^2 / ( 254 * ( (a/g) + G ) )  [meters]
    const denominator = 254.0 * (a_over_g + G_dec);
    if (denominator <= 0) return;

    const d_braking = Math.pow(v_kmh, 2) / denominator;
    const total_SSD = d_reaction + d_braking;

    totResEl.textContent = 'Required SSD = ' + total_SSD.toFixed(1) + ' m';
    brkResEl.textContent = 'Reaction = ' + d_reaction.toFixed(1) + ' m | Braking = ' + d_braking.toFixed(1) + ' m (' + (G_pct < 0 ? Math.abs(G_pct) + '% Downgrade increases braking length' : 'Flat/Upgrade') + ' @ ' + v_kmh + ' km/h)';
  }

  [vEl, tEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();