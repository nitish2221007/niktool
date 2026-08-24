(() => {
  'use strict';
  const bwEl = document.getElementById('sh-bw'), snrEl = document.getElementById('sh-snr');
  const capResEl = document.getElementById('sh-res-cap'), effResEl = document.getElementById('sh-res-eff');

  function update() {
    const B_mhz = parseFloat(bwEl.value), SNR_db = parseFloat(snrEl.value);
    if (isNaN(B_mhz) || isNaN(SNR_db) || B_mhz <= 0) return;

    const B_hz = B_mhz * 1e6;

    // SNR linear = 10^(SNR_db / 10)
    const SNR_linear = Math.pow(10, SNR_db / 10.0);

    // Shannon capacity C = B * log2( 1 + SNR )  [bits / s]
    const C_bps = B_hz * (Math.log(1.0 + SNR_linear) / Math.LN2);
    const C_mbps = C_bps / 1e6;
    const C_gbps = C_bps / 1e9;

    // Spectral efficiency eta = C / B = log2(1 + SNR)  [bits / s / Hz]
    const eta_bps_hz = C_bps / B_hz;

    capResEl.textContent = 'C = ' + (C_gbps >= 1.0 ? C_gbps.toFixed(2) + ' Gbps' : C_mbps.toFixed(1) + ' Mbps') + ' Capacity';
    effResEl.textContent = 'Spectral Efficiency η = ' + eta_bps_hz.toFixed(2) + ' bps/Hz (SNR = ' + SNR_db + ' dB | B = ' + B_mhz + ' MHz Channel)';
  }

  bwEl.addEventListener('input', update);
  snrEl.addEventListener('input', update);
  update();
})();