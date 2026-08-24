(() => {
  'use strict';
  const l1El = document.getElementById('lq-l1'), t1El = document.getElementById('lq-t1');
  const l2El = document.getElementById('lq-l2'), t2El = document.getElementById('lq-t2');
  const lqResEl = document.getElementById('lq-res-leq'), dsResEl = document.getElementById('lq-res-dose');

  function update() {
    const L1 = parseFloat(l1El.value), t1 = parseFloat(t1El.value);
    const L2 = parseFloat(l2El.value), t2 = parseFloat(t2El.value);

    if (isNaN(L1) || isNaN(t1) || isNaN(L2) || isNaN(t2) || t1 < 0 || t2 < 0 || (t1 + t2) <= 0) return;

    const T_total = t1 + t2;

    // Energy-averaged Leq = 10 * log10( (1/T) * ( t1*10^(L1/10) + t2*10^(L2/10) ) )
    const energy_sum = (t1 * Math.pow(10.0, L1 / 10.0)) + (t2 * Math.pow(10.0, L2 / 10.0));
    const Leq = 10.0 * Math.log10(energy_sum / T_total);

    // OSHA Dose calculation (PEL = 90 dBA, 5 dB exchange rate: C1/T1 + C2/T2):
    // Allowed time T = 8 / 2^((L - 90)/5)
    const T_allow_1 = 8.0 / Math.pow(2.0, (L1 - 90.0) / 5.0);
    const T_allow_2 = 8.0 / Math.pow(2.0, (L2 - 90.0) / 5.0);
    const osha_dose_pct = ((t1 / T_allow_1) + (t2 / T_allow_2)) * 100.0;

    let eval_text = '', color = '#22543d';
    if (osha_dose_pct >= 100.0) {
      eval_text = 'EXCEEDS OSHA PEL 100% DOSE (Hearing Protection Mandatory ✗)';
      color = '#c53030';
    } else if (osha_dose_pct >= 50.0) {
      eval_text = 'OSHA ACTION LEVEL REACHED (Dose ≥ 50%: Hearing testing required)';
      color = '#ea580c';
    } else {
      eval_text = 'COMPLIANT (Dose < 50%: Safe occupational exposure ✓)';
      color = '#22543d';
    }

    lqResEl.textContent = T_total.toFixed(0) + '-Hour L_eq = ' + Leq.toFixed(1) + ' dBA';
    lqResEl.style.color = color;
    dsResEl.textContent = 'OSHA Noise Dose = ' + osha_dose_pct.toFixed(1) + '% (' + eval_text + ' | Total Shift = ' + T_total.toFixed(1) + ' hrs)';
  }

  [l1El, t1El, l2El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();