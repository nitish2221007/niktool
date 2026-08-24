(() => {
  'use strict';
  const viEl = document.getElementById('bst-vin'), voEl = document.getElementById('bst-vout');
  const fEl = document.getElementById('bst-freq'), iEl = document.getElementById('bst-iout'), dvEl = document.getElementById('bst-dvo');
  const dResEl = document.getElementById('bst-res-duty'), cResEl = document.getElementById('bst-res-cout');

  function update() {
    const Vin = parseFloat(viEl.value), Vout = parseFloat(voEl.value);
    const fKhz = parseFloat(fEl.value), Iout = parseFloat(iEl.value), dvMv = parseFloat(dvEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(fKhz) || isNaN(Iout) || isNaN(dvMv) || Vin <= 0 || Vout <= Vin || fKhz <= 0 || Iout <= 0 || dvMv <= 0) return;

    const fHz = fKhz * 1000;
    const dvVolts = dvMv * 1e-3;
    const D = 1 - (Vin / Vout);
    const D_pct = D * 100;
    const Cout_F = (Iout * D) / (fHz * dvVolts);
    const Cout_uF = Cout_F * 1e6;
    const IL_avg = Iout * (Vout / Vin);

    dResEl.textContent = 'D = ' + D.toFixed(3) + ' (' + D_pct.toFixed(1) + '% Duty Cycle)';
    cResEl.textContent = Cout_uF.toFixed(1) + ' μF (Avg Inductor Current I_L = ' + IL_avg.toFixed(2) + ' A, Switch Stress V_DS = ' + Vout + 'V)';
  }

  [viEl, voEl, fEl, iEl, dvEl].forEach(el => el.addEventListener('input', update));
  update();
})();