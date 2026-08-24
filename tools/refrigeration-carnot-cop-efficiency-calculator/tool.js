(() => {
  'use strict';
  const tcEl = document.getElementById('ref-tc'), thEl = document.getElementById('ref-th');
  const qcEl = document.getElementById('ref-qc'), efEl = document.getElementById('ref-eff');
  const cResEl = document.getElementById('ref-res-cop'), pResEl = document.getElementById('ref-res-pwr');

  function update() {
    const Tc_c = parseFloat(tcEl.value), Th_c = parseFloat(thEl.value);
    const Qc_kw = parseFloat(qcEl.value), eff = parseFloat(efEl.value);

    if (isNaN(Tc_c) || isNaN(Th_c) || isNaN(Qc_kw) || isNaN(eff) || Th_c <= Tc_c || Qc_kw <= 0 || eff <= 0 || eff > 1.0) return;

    const Tc_k = Tc_c + 273.15;
    const Th_k = Th_c + 273.15;

    const copCarnot = Tc_k / (Th_k - Tc_k);
    const copReal = copCarnot * eff;

    const W_kw = Qc_kw / copReal;
    const W_hp = W_kw * 1.34102;
    const eer = copReal * 3.412142;

    cResEl.textContent = 'Real COP = ' + copReal.toFixed(2) + ' (Carnot Max: ' + copCarnot.toFixed(2) + ')';
    pResEl.textContent = 'Input Power: ' + W_kw.toFixed(2) + ' kW (' + W_hp.toFixed(2) + ' HP) | EER: ' + eer.toFixed(1) + ' (Lift: ' + (Th_c - Tc_c).toFixed(1) + '°C)';
  }

  [tcEl, thEl, qcEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();