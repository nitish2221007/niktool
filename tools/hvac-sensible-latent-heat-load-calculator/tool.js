(() => {
  'use strict';
  const cfmEl = document.getElementById('hvc-cfm'), dtEl = document.getElementById('hvc-dt'), dwEl = document.getElementById('hvc-dw');
  const totResEl = document.getElementById('hvc-res-tot'), shrResEl = document.getElementById('hvc-res-shr');

  function update() {
    const cfm = parseFloat(cfmEl.value), dt = parseFloat(dtEl.value), dwGrains = parseFloat(dwEl.value);
    if (isNaN(cfm) || isNaN(dt) || isNaN(dwGrains) || cfm <= 0 || dt <= 0 || dwGrains < 0) return;

    // Sensible heat q_s = 1.08 * CFM * delta_T (BTU / hr)
    const qs = 1.08 * cfm * dt;
    // Latent heat q_l = 4840 * CFM * (delta_W_grains / 7000) = 0.6914 * CFM * delta_W_grains (BTU / hr)
    const ql = 0.6914 * cfm * dwGrains;
    const qTotal = qs + ql;
    const tons = qTotal / 12000;
    const shr = qs / qTotal;

    totResEl.textContent = Math.round(qTotal).toLocaleString() + ' BTU/hr (' + tons.toFixed(2) + ' Tons / ' + (qTotal * 0.000293071).toFixed(2) + ' kW)';
    shrResEl.textContent = 'SHR = ' + shr.toFixed(3) + ' (Sensible: ' + Math.round(qs).toLocaleString() + ' BTU/h, Latent: ' + Math.round(ql).toLocaleString() + ' BTU/h)';
  }

  [cfmEl, dtEl, dwEl].forEach(el => el.addEventListener('input', update));
  update();
})();