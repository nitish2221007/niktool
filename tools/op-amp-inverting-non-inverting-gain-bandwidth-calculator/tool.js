(() => {
  'use strict';
  const cfgEl = document.getElementById('op-cfg'), rfEl = document.getElementById('op-rf');
  const rinEl = document.getElementById('op-rin'), gbwEl = document.getElementById('op-gbw');
  const gResEl = document.getElementById('op-res-gain'), bwResEl = document.getElementById('op-res-bw');

  function update() {
    const isInv = cfgEl.value === 'inverting';
    const Rf = parseFloat(rfEl.value), Rin = parseFloat(rinEl.value), GBWP_MHz = parseFloat(gbwEl.value);

    if (isNaN(Rf) || isNaN(Rin) || isNaN(GBWP_MHz) || Rf <= 0 || Rin <= 0 || GBWP_MHz <= 0) return;

    let Av = 0;
    if (isInv) {
      // Inverting: Av = -Rf / Rin
      Av = -Rf / Rin;
    } else {
      // Non-inverting: Av = 1 + Rf / Rin
      Av = 1.0 + (Rf / Rin);
    }

    const absAv = Math.abs(Av);
    const gain_dB = 20.0 * Math.log10(absAv);

    // Bandwidth in kHz = ( GBWP in MHz * 1000 ) / absAv
    const bandwidth_kHz = (GBWP_MHz * 1000.0) / absAv;

    gResEl.textContent = 'A_v = ' + (Av >= 0 ? '+' : '') + Av.toFixed(2) + ' (' + gain_dB.toFixed(1) + ' dB Gain)';
    bwResEl.textContent = '-3dB Bandwidth = ' + (bandwidth_kHz >= 1000 ? (bandwidth_kHz/1000).toFixed(2) + ' MHz' : bandwidth_kHz.toFixed(1) + ' kHz') + ' (GBWP: ' + GBWP_MHz + ' MHz @ ' + (isInv ? '180° Inverted' : 'Non-Inverting') + ')';
  }

  [cfgEl, rfEl, rinEl, gbwEl].forEach(el => el.addEventListener('input', update));
  cfgEl.addEventListener('change', update);
  update();
})();