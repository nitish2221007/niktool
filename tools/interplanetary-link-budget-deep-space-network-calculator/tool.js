(() => {
  'use strict';
  const ptEl = document.getElementById('dsn-pt'), dEl = document.getElementById('dsn-dist');
  const fEl = document.getElementById('dsn-freq'), dishEl = document.getElementById('dsn-dish');
  const prResEl = document.getElementById('dsn-res-pr'), dtResEl = document.getElementById('dsn-res-data');

  const c_light = 299792458;
  const AU_meters = 1.495978707e11;
  const DSN_dish_diam_m = 70.0; // 70-meter Goldstone / Madrid / Canberra dish

  function update() {
    const Pt_W = parseFloat(ptEl.value), dist_AU = parseFloat(dEl.value);
    const f_GHz = parseFloat(fEl.value), d_sc_m = parseFloat(dishEl.value);

    if (isNaN(Pt_W) || isNaN(dist_AU) || isNaN(f_GHz) || isNaN(d_sc_m) || Pt_W <= 0 || dist_AU <= 0 || f_GHz <= 0 || d_sc_m <= 0) return;

    const f_Hz = f_GHz * 1e9;
    const lambda_m = c_light / f_Hz;
    const distance_m = dist_AU * AU_meters;

    // Free space path loss FSPL = ( 4 * pi * d / lambda )^2
    const FSPL_linear = Math.pow((4.0 * Math.PI * distance_m) / lambda_m, 2);
    const FSPL_dB = 10.0 * Math.log10(FSPL_linear);

    // Antenna gains with 55% aperture efficiency: G = 0.55 * ( pi * D / lambda )^2
    const G_tx_linear = 0.55 * Math.pow((Math.PI * d_sc_m) / lambda_m, 2);
    const G_rx_linear = 0.55 * Math.pow((Math.PI * DSN_dish_diam_m) / lambda_m, 2);

    const G_tx_dBi = 10.0 * Math.log10(G_tx_linear);
    const G_rx_dBi = 10.0 * Math.log10(G_rx_linear);

    // Received power P_r = P_t * G_tx * G_rx / FSPL  [Watts]
    const P_rx_W = (Pt_W * G_tx_linear * G_rx_linear) / FSPL_linear;
    const P_rx_dBm = 10.0 * Math.log10(P_rx_W * 1000.0);

    // One-way light travel time t_light = distance / c  [minutes]
    const light_delay_min = (distance_m / c_light) / 60.0;

    // Estimated data rate Shannon/BPSK (typical system temp T = 20K):
    const kB = 1.380649e-23;
    const T_sys = 20.0; // Cryogenic DSN maser amplifier
    const N0 = kB * T_sys;
    const Eb_N0_req = 4.0; // 6 dB required Eb/N0
    const max_bps = P_rx_W / (Eb_N0_req * N0);
    const max_kbps = max_bps / 1000.0;

    let dataStr = '';
    if (max_kbps >= 1000) dataStr = (max_kbps / 1000.0).toFixed(2) + ' Mbps';
    else if (max_kbps >= 1.0) dataStr = max_kbps.toFixed(1) + ' kbps';
    else dataStr = max_bps.toFixed(0) + ' bps';

    prResEl.textContent = 'P_r = ' + P_rx_dBm.toFixed(1) + ' dBm (' + P_rx_W.toExponential(2) + ' W)';
    dtResEl.textContent = 'Telemetry: ' + dataStr + ' | 1-Way Light Delay: ' + light_delay_min.toFixed(1) + ' min (FSPL = -' + FSPL_dB.toFixed(1) + ' dB @ ' + dist_AU + ' AU)';
  }

  [ptEl, dEl, fEl, dishEl].forEach(el => el.addEventListener('input', update));
  update();
})();