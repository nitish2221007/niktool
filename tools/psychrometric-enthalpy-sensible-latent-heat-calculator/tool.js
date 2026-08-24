(() => {
  'use strict';
  const cfmEl = document.getElementById('psy-cfm'), dtEl = document.getElementById('psy-dt'), dwEl = document.getElementById('psy-dw');
  const tResEl = document.getElementById('psy-res-tot'), sResEl = document.getElementById('psy-res-shr');

  function update() {
    const cfm = parseFloat(cfmEl.value), deltaT_f = parseFloat(dtEl.value), deltaW_grains = parseFloat(dwEl.value);
    if (isNaN(cfm) || isNaN(deltaT_f) || isNaN(deltaW_grains) || cfm <= 0 || deltaT_f <= 0 || deltaW_grains < 0) return;

    const qs = 1.08 * cfm * deltaT_f;
    const deltaW_lb = deltaW_grains / 7000;
    const ql = 4840 * cfm * deltaW_lb;

    const qtotal = qs + ql;
    const tons = qtotal / 12000;
    const shr = qs / qtotal;

    tResEl.textContent = Math.round(qtotal).toLocaleString() + ' BTU/h (' + tons.toFixed(2) + ' Tons AC)';
    sResEl.textContent = 'Sensible: ' + Math.round(qs).toLocaleString() + ' BTU/h (' + (shr*100).toFixed(1) + '%) | Latent: ' + Math.round(ql).toLocaleString() + ' BTU/h (SHR = ' + shr.toFixed(2) + ')';
  }

  [cfmEl, dtEl, dwEl].forEach(el => el.addEventListener('input', update));
  update();
})();