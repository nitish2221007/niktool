(() => {
  'use strict';
  const pfEl = document.getElementById('fg-pfus'), paEl = document.getElementById('fg-paux');
  const qResEl = document.getElementById('fg-res-q'), alResEl = document.getElementById('fg-res-alpha');

  function update() {
    const P_fus = parseFloat(pfEl.value), P_aux = parseFloat(paEl.value);
    if (isNaN(P_fus) || isNaN(P_aux) || P_fus < 0 || P_aux <= 0) return;

    // Fusion gain factor: Q = P_fus / P_aux
    const Q = P_fus / P_aux;

    // In D-T fusion, 3.5 MeV alpha particle (20%) stays in plasma; 14.1 MeV neutron (80%) escapes to blanket
    const P_alpha = 0.20 * P_fus;
    const P_neutron = 0.80 * P_fus;

    // Total plasma core heating power: P_heat = P_alpha + P_aux
    const P_heat_tot = P_alpha + P_aux;
    const alpha_heating_fraction_pct = (P_alpha / P_heat_tot) * 100.0;

    let regime = '', color = '#22543d';
    if (Q >= 20.0) {
      regime = 'NEAR-IGNITION REGIME (Q ≥ 20: Alpha self-heating exceeds 80% of total heating ✓)';
      color = '#22543d';
    } else if (Q >= 5.0) {
      regime = 'BURNING PLASMA REGIME (Q ≥ 5: Alpha self-heating exceeds external heating P_α > P_aux ✓)';
      color = '#22543d';
    } else if (Q >= 1.0) {
      regime = 'SCIENTIFIC BREAKEVEN (Q ≥ 1.0: Fusion power exceeds auxiliary drive)';
      color = '#ea580c';
    } else {
      regime = 'SUB-BREAKEVEN (Q < 1.0: Net energy consumer)';
      color = '#c53030';
    }

    qResEl.textContent = 'Fusion Gain Q = ' + Q.toFixed(2) + ' (' + regime.split(' (')[0] + ')';
    qResEl.style.color = color;
    alResEl.textContent = 'Alpha P_α = ' + P_alpha.toFixed(1) + ' MW (' + alpha_heating_fraction_pct.toFixed(1) + '% of Core Heating) | Neutrons = ' + P_neutron.toFixed(1) + ' MW (P_aux=' + P_aux + ' MW)';
  }

  pfEl.addEventListener('input', update);
  paEl.addEventListener('input', update);
  update();
})();