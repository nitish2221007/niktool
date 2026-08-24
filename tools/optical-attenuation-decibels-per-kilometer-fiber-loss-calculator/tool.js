(() => {
  'use strict';
  const ptxEl = document.getElementById('fl-ptx'), lEl = document.getElementById('fl-l');
  const alEl = document.getElementById('fl-alpha'), cnEl = document.getElementById('fl-conn'), snEl = document.getElementById('fl-sens');
  const prResEl = document.getElementById('fl-res-prx'), mgResEl = document.getElementById('fl-res-margin');

  function update() {
    const P_tx_dBm = parseFloat(ptxEl.value), L_km = parseFloat(lEl.value);
    const alpha_dB_km = parseFloat(alEl.value), N_conn = parseInt(cnEl.value, 10), P_sens_dBm = parseFloat(snEl.value);

    if (isNaN(P_tx_dBm) || isNaN(L_km) || isNaN(alpha_dB_km) || isNaN(N_conn) || isNaN(P_sens_dBm) || L_km < 0 || alpha_dB_km < 0 || N_conn < 0) return;

    // Fiber glass attenuation:
    const fiber_loss_dB = alpha_dB_km * L_km;

    // Connector losses (0.5 dB per connector pair):
    const connector_loss_dB = N_conn * 0.50;

    // Estimated fusion splices (1 splice per 5 km @ 0.1 dB each):
    const num_splices = Math.max(0, Math.floor(L_km / 5.0));
    const splice_loss_dB = num_splices * 0.10;

    // Total link loss:
    const total_loss_dB = fiber_loss_dB + connector_loss_dB + splice_loss_dB;

    // Received power: P_rx = P_tx - total_loss
    const P_rx_dBm = P_tx_dBm - total_loss_dB;
    const P_rx_uW = Math.pow(10.0, P_rx_dBm / 10.0) * 1000.0;

    // Safety margin:
    const margin_dB = P_rx_dBm - P_sens_dBm;

    let qual = '', color = '#22543d';
    if (margin_dB >= 3.0) {
      qual = 'LINK CLOSED (Margin ≥ +3 dB: Excellent error-free signal transmission ✓)';
      color = '#22543d';
    } else if (margin_dB >= 0) {
      qual = 'MARGINAL LINK (0 to +3 dB: High bit error rate risk)';
      color = '#ea580c';
    } else {
      qual = 'LINK FAILED (Margin < 0 dB: Received signal below receiver sensitivity ✗)';
      color = '#c53030';
    }

    prResEl.textContent = 'Received Power P_rx = ' + P_rx_dBm.toFixed(2) + ' dBm (' + (P_rx_uW >= 1 ? P_rx_uW.toFixed(1) + ' μW' : (P_rx_uW*1000).toFixed(1) + ' nW') + ')';
    prResEl.style.color = color;
    mgResEl.textContent = 'Power Margin = ' + (margin_dB >= 0 ? '+' : '') + margin_dB.toFixed(2) + ' dB (Loss = ' + total_loss_dB.toFixed(2) + ' dB: Fiber ' + fiber_loss_dB.toFixed(1) + 'dB, Conn ' + connector_loss_dB.toFixed(1) + 'dB, Splices ' + splice_loss_dB.toFixed(1) + 'dB)';
  }

  [ptxEl, lEl, alEl, cnEl, snEl].forEach(el => el.addEventListener('input', update));
  update();
})();