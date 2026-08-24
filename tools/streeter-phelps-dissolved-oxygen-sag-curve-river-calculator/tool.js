(() => {
  'use strict';
  const l0El = document.getElementById('sp-l0'), d0El = document.getElementById('sp-d0');
  const k1El = document.getElementById('sp-k1'), k2El = document.getElementById('sp-k2');
  const dcResEl = document.getElementById('sp-res-dc'), tcResEl = document.getElementById('sp-res-tc');

  const DO_sat_20C = 9.10; // mg / L saturation at 20°C

  function update() {
    const L0 = parseFloat(l0El.value), D0 = parseFloat(d0El.value);
    const k1 = parseFloat(k1El.value), k2 = parseFloat(k2El.value);

    if (isNaN(L0) || isNaN(D0) || isNaN(k1) || isNaN(k2) || L0 <= 0 || k1 <= 0 || k2 <= 0 || k1 === k2) return;

    // Critical time formula: t_c = ( 1 / (k2 - k1) ) * ln( (k2 / k1) * ( 1 - D0*(k2 - k1)/(k1*L0) ) )
    const term = (k2 / k1) * (1.0 - (D0 * (k2 - k1)) / (k1 * L0));
    if (term <= 0) return;

    const t_c = (1.0 / (k2 - k1)) * Math.log(term);

    // Streeter-Phelps DO deficit at t_c:
    // D(t) = [ (k1 * L0) / (k2 - k1) ] * ( exp(-k1 * t) - exp(-k2 * t) ) + D0 * exp(-k2 * t)
    const D_c = ((k1 * L0) / (k2 - k1)) * (Math.exp(-k1 * t_c) - Math.exp(-k2 * t_c)) + (D0 * Math.exp(-k2 * t_c));
    const minDO = Math.max(0, DO_sat_20C - D_c);

    let status = '', color = '#22543d';
    if (minDO >= 5.0) { status = 'HEALTHY AQUATIC ECOSYSTEM (Min DO ≥ 5.0 mg/L: Supports game fish)'; color = '#22543d'; }
    else if (minDO >= 2.0) { status = 'STRESSED FISH HABITAT (Min DO 2.0 - 5.0 mg/L: Sensitive fish flee / die)'; color = '#ea580c'; }
    else { status = 'SEVERE ANOXIA / FISH KILL (Min DO < 2.0 mg/L: Anaerobic odors / massive mortality!)'; color = '#c53030'; }

    dcResEl.textContent = 'Critical DO Deficit D_c = ' + D_c.toFixed(2) + ' mg / L (' + status.split(' (')[0] + ')';
    dcResEl.style.color = color;
    tcResEl.textContent = 'Critical Sag t_c = ' + t_c.toFixed(2) + ' Days | Min DO = ' + minDO.toFixed(2) + ' mg/L (Saturation: 9.10 mg/L @ 20°C, k₁=' + k1 + ', k₂=' + k2 + ')';
    tcResEl.style.color = color;
  }

  [l0El, d0El, k1El, k2El].forEach(el => el.addEventListener('input', update));
  update();
})();