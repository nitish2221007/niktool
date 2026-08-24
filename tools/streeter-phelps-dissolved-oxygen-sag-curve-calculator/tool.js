(() => {
  'use strict';
  const kdEl = document.getElementById('sp-kd'), krEl = document.getElementById('sp-kr');
  const l0El = document.getElementById('sp-l0'), d0El = document.getElementById('sp-d0'), satEl = document.getElementById('sp-dosat');
  const minResEl = document.getElementById('sp-res-min'), tcResEl = document.getElementById('sp-res-tc');

  function update() {
    const k_d = parseFloat(kdEl.value), k_r = parseFloat(krEl.value);
    const L_0 = parseFloat(l0El.value), D_0 = parseFloat(d0El.value), DO_sat = parseFloat(satEl.value);

    if (isNaN(k_d) || isNaN(k_r) || isNaN(L_0) || isNaN(D_0) || isNaN(DO_sat) || k_d <= 0 || k_r <= 0 || k_d === k_r || L_0 <= 0 || D_0 < 0 || DO_sat <= 0) return;

    // Self-purification constant f = k_r / k_d
    const f = k_r / k_d;

    // Critical time t_c:
    // t_c = ( 1 / (k_r - k_d) ) * ln( (k_r / k_d) * [ 1 - (D_0 * (k_r - k_d) / (k_d * L_0)) ] )
    const bracket = 1.0 - ( (D_0 * (k_r - k_d)) / (k_d * L_0) );
    if (bracket <= 0) return;

    const t_c = (1.0 / (k_r - k_d)) * Math.log(f * bracket);

    // Critical oxygen deficit D_c = (k_d / k_r) * L_0 * exp(-k_d * t_c)
    // Streeter-Phelps equation: D(t) = ( (k_d * L_0) / (k_r - k_d) ) * ( exp(-k_d*t) - exp(-k_r*t) ) + D_0 * exp(-k_r*t)
    const D_c = ((k_d * L_0) / (k_r - k_d)) * (Math.exp(-k_d * t_c) - Math.exp(-k_r * t_c)) + (D_0 * Math.exp(-k_r * t_c));

    const DO_min = Math.max(0.0, DO_sat - D_c);

    let qual = '', color = '#22543d';
    if (DO_min >= 5.0) { qual = 'HEALTHY AQUATIC LIFE (DO ≥ 5.0 mg/L ✓)'; color = '#22543d'; }
    else if (DO_min >= 2.0) { qual = 'STRESSED FISHERY (2.0 ≤ DO < 5.0 mg/L: Sensitive fish die-off risk)'; color = '#ea580c'; }
    else { qual = 'SEPTIC / ANOXIC CONDITIONS (DO < 2.0 mg/L: Severe fish kills ✗)'; color = '#c53030'; }

    minResEl.textContent = 'Minimum DO = ' + DO_min.toFixed(2) + ' mg/L (' + qual.split(' (')[0] + ')';
    minResEl.style.color = color;
    tcResEl.textContent = 'Critical Sag t_c = ' + t_c.toFixed(2) + ' Days (Max Deficit D_c = ' + D_c.toFixed(2) + ' mg/L | Self-Purification f = ' + f.toFixed(2) + ')';
  }

  [kdEl, krEl, l0El, d0El, satEl].forEach(el => el.addEventListener('input', update));
  update();
})();