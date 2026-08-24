(() => {
  'use strict';
  const ptxEl = document.getElementById('lk-ptx'), gtxEl = document.getElementById('lk-gtx');
  const grxEl = document.getElementById('lk-grx'), fEl = document.getElementById('lk-f'), dEl = document.getElementById('lk-d');
  const prResEl = document.getElementById('lk-res-prx'), fsResEl = document.getElementById('lk-res-fspl');

  const c_light = 2.99792458e8;

  function update() {
    const P_tx_W = parseFloat(ptxEl.value), G_tx_dBi = parseFloat(gtxEl.value);
    const G_rx_dBi = parseFloat(grxEl.value), f_GHz = parseFloat(fEl.value), d_Mkm = parseFloat(dEl.value);

    if (isNaN(P_tx_W) || isNaN(G_tx_dBi) || isNaN(G_rx_dBi) || isNaN(f_GHz) || isNaN(d_Mkm) || P_tx_W <= 0 || f_GHz <= 0 || d_Mkm <= 0) return;

    // Transmit power in dBm:
    const P_tx_dBm = 10.0 * Math.log10(P_tx_W * 1000.0);
    const EIRP_dBW = (10.0 * Math.log10(P_tx_W)) + G_tx_dBi;

    // Distance in meters:
    const d_m = d_Mkm * 1e9;
    const f_Hz = f_GHz * 1e9;

    // Free space path loss: FSPL = 20*log10(d) + 20*log10(f) + 20*log10(4*pi/c)  [dB]
    const FSPL_dB = (20.0 * Math.log10(d_m)) + (20.0 * Math.log10(f_Hz)) + (20.0 * Math.log10(4.0 * Math.PI / c_light));

    // Friis received power: P_rx = P_tx + G_tx + G_rx - FSPL  [dBm]
    const P_rx_dBm = P_tx_dBm + G_tx_dBi + G_rx_dBi - FSPL_dB;
    const P_rx_Watts = Math.pow(10.0, (P_rx_dBm - 30.0) / 10.0);

    prResEl.textContent = 'Received P_rx = ' + P_rx_dBm.toFixed(1) + ' dBm (' + P_rx_Watts.toExponential(2) + ' W)';
    fsResEl.textContent = 'Path Loss FSPL = ' + FSPL_dB.toFixed(1) + ' dB | EIRP = +' + EIRP_dBW.toFixed(1) + ' dBW (d=' + d_Mkm + ' Million km @ ' + f_GHz + ' GHz)';
  }

  [ptxEl, gtxEl, grxEl, fEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();