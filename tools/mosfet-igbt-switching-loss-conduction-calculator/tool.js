(() => {
  'use strict';
  const iEl = document.getElementById('pwr-irms'), rEl = document.getElementById('pwr-rds');
  const vEl = document.getElementById('pwr-vds'), trEl = document.getElementById('pwr-trtf'), fsEl = document.getElementById('pwr-fs');
  const pTotResEl = document.getElementById('pwr-res-ptot'), spResEl = document.getElementById('pwr-res-split');

  function update() {
    const Irms = parseFloat(iEl.value), RdsM = parseFloat(rEl.value);
    const Vds = parseFloat(vEl.value), trtfNs = parseFloat(trEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(Irms) || isNaN(RdsM) || isNaN(Vds) || isNaN(trtfNs) || isNaN(fsKhz) || Irms <= 0 || RdsM <= 0 || Vds <= 0 || trtfNs <= 0 || fsKhz <= 0) return;

    const RdsOhms = RdsM * 1e-3;
    const trtfSec = trtfNs * 1e-9;
    const fsHz = fsKhz * 1000;

    // Conduction loss P_cond = Irms^2 * Rds(on)  [Watts]
    const P_cond = Math.pow(Irms, 2) * RdsOhms;

    // Switching loss P_sw = 0.5 * Vds * I_peak * (t_rise + t_fall) * fs  [Watts]
    const P_sw = 0.5 * Vds * Irms * trtfSec * fsHz;

    // Total power loss P_total = P_cond + P_sw
    const P_total = P_cond + P_sw;

    const condPct = (P_cond / P_total) * 100;
    const swPct = (P_sw / P_total) * 100;

    pTotResEl.textContent = 'P_total = ' + P_total.toFixed(2) + ' Watts Heat Dissipation';
    spResEl.textContent = 'Conduction Loss: ' + P_cond.toFixed(2) + ' W (' + condPct.toFixed(1) + '%) | Switching Loss: ' + P_sw.toFixed(2) + ' W (' + swPct.toFixed(1) + '% @ ' + fsKhz + ' kHz)';
  }

  [iEl, rEl, vEl, trEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();