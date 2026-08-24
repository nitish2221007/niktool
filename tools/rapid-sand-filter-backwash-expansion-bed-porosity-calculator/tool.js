(() => {
  'use strict';
  const l0El = document.getElementById('fb-l0'), e0El = document.getElementById('fb-e0'), eeEl = document.getElementById('fb-ee');
  const leResEl = document.getElementById('fb-res-le'), evResEl = document.getElementById('fb-res-eval');

  function update() {
    const L0 = parseFloat(l0El.value), eps0 = parseFloat(e0El.value), eps_e = parseFloat(eeEl.value);
    if (isNaN(L0) || isNaN(eps0) || isNaN(eps_e) || L0 <= 0 || eps0 <= 0 || eps0 >= 1 || eps_e <= eps0 || eps_e >= 1) return;

    // Solid sand volume conservation: L_e * (1 - eps_e) = L0 * (1 - eps0)
    // L_e = L0 * (1 - eps0) / (1 - eps_e)
    const L_e = L0 * (1.0 - eps0) / (1.0 - eps_e);
    const expansion_pct = ((L_e - L0) / L0) * 100.0;

    let qual = '', color = '#22543d';
    if (expansion_pct >= 20.0 && expansion_pct <= 35.0) {
      qual = 'OPTIMAL FLUIDIZATION (20% - 35% Expansion: Thorough media scouring without sand loss ✓)';
      color = '#22543d';
    } else if (expansion_pct < 20.0) {
      qual = 'UNDER-EXPANDED (< 20%: Inadequate wash scouring, mudball risk)';
      color = '#ea580c';
    } else {
      qual = 'OVER-EXPANDED (> 35%: Risk of sand media washout into troughs)';
      color = '#c53030';
    }

    leResEl.textContent = 'Expanded Depth L_e = ' + L_e.toFixed(1) + ' cm (+' + expansion_pct.toFixed(1) + '% Expansion)';
    evResEl.textContent = qual + ' [L₀ = ' + L0 + ' cm → L_e = ' + L_e.toFixed(1) + ' cm]';
    evResEl.style.color = color;
  }

  [l0El, e0El, eeEl].forEach(el => el.addEventListener('input', update));
  update();
})();