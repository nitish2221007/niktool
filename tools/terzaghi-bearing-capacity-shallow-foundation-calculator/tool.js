(() => {
  'use strict';
  const cEl = document.getElementById('tz-c'), pEl = document.getElementById('tz-phi');
  const gEl = document.getElementById('tz-gam'), bEl = document.getElementById('tz-b'), dfEl = document.getElementById('tz-df');
  const quResEl = document.getElementById('tz-res-qult'), qaResEl = document.getElementById('tz-res-qall');

  function update() {
    const c = parseFloat(cEl.value), phiDeg = parseFloat(pEl.value);
    const gamma = parseFloat(gEl.value), B = parseFloat(bEl.value), Df = parseFloat(dfEl.value);

    if (isNaN(c) || isNaN(phiDeg) || isNaN(gamma) || isNaN(B) || isNaN(Df) || c < 0 || phiDeg < 0 || phiDeg > 45 || gamma <= 0 || B <= 0 || Df < 0) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const q_surcharge = gamma * Df;

    let Nq = 1.0, Nc = 5.14, Ngamma = 0.0;
    if (phiDeg > 0) {
      Nq = Math.exp(Math.PI * Math.tan(phiRad)) * Math.pow(Math.tan((Math.PI / 4) + (phiRad / 2)), 2);
      Nc = (Nq - 1) / Math.tan(phiRad);
      Ngamma = 2 * (Nq + 1) * Math.tan(phiRad);
    }

    const q_ult = (c * Nc) + (q_surcharge * Nq) + (0.5 * gamma * B * Ngamma);
    const q_allow = q_ult / 3.0;

    quResEl.textContent = q_ult.toFixed(1) + ' kPa (q_ult)';
    qaResEl.textContent = q_allow.toFixed(1) + ' kPa (FS = 3.0 | N_c=' + Nc.toFixed(1) + ', N_q=' + Nq.toFixed(1) + ', N_γ=' + Ngamma.toFixed(1) + ')';
  }

  [cEl, pEl, gEl, bEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();