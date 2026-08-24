(() => {
  'use strict';
  const gmbEl = document.getElementById('as-gmb'), gmmEl = document.getElementById('as-gmm');
  const pbEl = document.getElementById('as-pb'), gsbEl = document.getElementById('as-gsb');
  const vaResEl = document.getElementById('as-res-va'), vmaResEl = document.getElementById('as-res-vma');

  function update() {
    const G_mb = parseFloat(gmbEl.value), G_mm = parseFloat(gmmEl.value);
    const P_b = parseFloat(pbEl.value), G_sb = parseFloat(gsbEl.value);

    if (isNaN(G_mb) || isNaN(G_mm) || isNaN(P_b) || isNaN(G_sb) || G_mb <= 0 || G_mm <= G_mb || P_b <= 0 || G_sb <= 0) return;

    // Air Voids: V_a = [ (G_mm - G_mb) / G_mm ] * 100  [%]
    const V_a = ((G_mm - G_mb) / G_mm) * 100.0;

    // Aggregate percentage P_s = 100 - P_b
    const P_s = 100.0 - P_b;

    // Voids in Mineral Aggregate: VMA = 100 - ( G_mb * P_s / G_sb )  [%]
    const VMA = 100.0 - ((G_mb * P_s) / G_sb);

    // Voids Filled with Asphalt: VFA = [ (VMA - V_a) / VMA ] * 100  [%]
    const VFA = ((VMA - V_a) / VMA) * 100.0;

    let vaStatus = '', color = '#22543d';
    if (V_a >= 3.0 && V_a <= 5.0) {
      vaStatus = 'OPTIMAL COMPLIANCE (3.0% - 5.0% Target)';
      color = '#22543d';
    } else if (V_a < 3.0) {
      vaStatus = 'RUTTING RISK (Air Voids < 3.0%: Bleeding / plastic flushing)';
      color = '#c53030';
    } else {
      vaStatus = 'PERMEABILITY RISK (Air Voids > 5.0%: Premature oxidative aging & moisture ravelling)';
      color = '#ea580c';
    }

    vaResEl.textContent = 'Air Voids V_a = ' + V_a.toFixed(2) + '% (' + vaStatus.split(' (')[0] + ')';
    vaResEl.style.color = color;
    vmaResEl.textContent = 'VMA = ' + VMA.toFixed(2) + '% | VFA = ' + VFA.toFixed(2) + '% (Binder P_b = ' + P_b + '% | ' + vaStatus + ')';
    vmaResEl.style.color = color;
  }

  [gmbEl, gmmEl, pbEl, gsbEl].forEach(el => el.addEventListener('input', update));
  update();
})();