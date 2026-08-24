(() => {
  'use strict';
  const smEl = document.getElementById('cb-samp'), coEl = document.getElementById('cb-co2'), h2El = document.getElementById('cb-h2o');
  const empResEl = document.getElementById('cb-res-emp'), msResEl = document.getElementById('cb-res-mass');

  function update() {
    const m_sample = parseFloat(smEl.value), m_co2 = parseFloat(coEl.value), m_h2o = parseFloat(h2El.value);
    if (isNaN(m_sample) || isNaN(m_co2) || isNaN(m_h2o) || m_sample <= 0 || m_co2 <= 0 || m_h2o <= 0) return;

    // Mass of Carbon = m_co2 * (12.011 / 44.01)  [grams]
    const m_C = m_co2 * (12.011 / 44.01);
    // Mass of Hydrogen = m_h2o * (2.016 / 18.015)  [grams]
    const m_H = m_h2o * (2.016 / 18.015);
    // Mass of Oxygen = m_sample - (m_C + m_H)  [grams]
    const m_O = Math.max(0, m_sample - (m_C + m_H));

    // Moles:
    const n_C = m_C / 12.011;
    const n_H = m_H / 1.008;
    const n_O = m_O > 0.005 ? m_O / 15.999 : 0;

    // Smallest mole divisor:
    const minMols = Math.min(n_C, n_H, (n_O > 0 ? n_O : Infinity));

    const ratio_C = n_C / minMols;
    const ratio_H = n_H / minMols;
    const ratio_O = n_O > 0 ? n_O / minMols : 0;

    const round_C = Math.round(ratio_C);
    const round_H = Math.round(ratio_H);
    const round_O = Math.round(ratio_O);

    let formula = 'C' + (round_C > 1 ? round_C : '') + 'H' + (round_H > 1 ? round_H : '');
    if (round_O > 0) formula += 'O' + (round_O > 1 ? round_O : '');

    empResEl.textContent = 'Formula = ' + formula;
    msResEl.textContent = 'C: ' + m_C.toFixed(2) + 'g (' + (m_C/m_sample*100).toFixed(1) + '%) | H: ' + m_H.toFixed(2) + 'g (' + (m_H/m_sample*100).toFixed(1) + '%) | O: ' + m_O.toFixed(2) + 'g (' + (m_O/m_sample*100).toFixed(1) + '%)';
  }

  [smEl, coEl, h2El].forEach(el => el.addEventListener('input', update));
  update();
})();