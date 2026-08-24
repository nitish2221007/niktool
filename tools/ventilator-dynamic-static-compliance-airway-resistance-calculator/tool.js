(() => {
  'use strict';
  const vtEl = document.getElementById('vc-vt'), ppkEl = document.getElementById('vc-ppk');
  const pplEl = document.getElementById('vc-ppl'), peepEl = document.getElementById('vc-peep');
  const csResEl = document.getElementById('vc-res-cstat'), evResEl = document.getElementById('vc-res-eval');

  function update() {
    const Vt = parseFloat(vtEl.value), Ppeak = parseFloat(ppkEl.value);
    const Pplat = parseFloat(pplEl.value), PEEP = parseFloat(peepEl.value);

    if (isNaN(Vt) || isNaN(Ppeak) || isNaN(Pplat) || isNaN(PEEP) || Vt <= 0 || Pplat <= PEEP || Ppeak <= Pplat) return;

    const driving_pressure = Pplat - PEEP;
    const C_stat = Vt / driving_pressure;
    const C_dyn = Vt / (Ppeak - PEEP);
    const transairway_P = Ppeak - Pplat;

    let stat_eval = '', color = '#22543d';
    if (driving_pressure > 14.0) {
      stat_eval = 'HIGH DRIVING PRESSURE (ΔP > 14 cmH₂O: Increased Risk of Barotrauma/VILI)';
      color = '#c53030';
    } else {
      stat_eval = 'LUNG-PROTECTIVE (ΔP = ' + driving_pressure.toFixed(1) + ' cmH₂O ≤ 14 cmH₂O Target ✓)';
      color = '#22543d';
    }

    csResEl.textContent = 'Static Compliance C_stat = ' + C_stat.toFixed(1) + ' mL / cmH₂O';
    evResEl.textContent = stat_eval + ' | C_dyn = ' + C_dyn.toFixed(1) + ' mL/cmH₂O | Transairway ΔP = ' + transairway_P.toFixed(1) + ' cmH₂O';
    evResEl.style.color = color;
  }

  [vtEl, ppkEl, pplEl, peepEl].forEach(el => el.addEventListener('input', update));
  update();
})();