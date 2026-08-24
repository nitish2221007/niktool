(() => {
  'use strict';
  const dEl = document.getElementById('ant-dia'), fEl = document.getElementById('ant-freq'), efEl = document.getElementById('ant-eff');
  const gResEl = document.getElementById('ant-res-gain'), bwResEl = document.getElementById('ant-res-bw');

  const c = 2.99792458e8;

  function update() {
    const D = parseFloat(dEl.value), fGhz = parseFloat(fEl.value), eff = parseFloat(efEl.value);
    if (isNaN(D) || isNaN(fGhz) || isNaN(eff) || D <= 0 || fGhz <= 0 || eff <= 0 || eff > 1.0) return;

    const fHz = fGhz * 1e9;
    const lambda = c / fHz;
    const lambdaMm = lambda * 1000;

    const gainLinear = Math.pow((Math.PI * D) / lambda, 2) * eff;
    const gainDbi = 10 * Math.log10(gainLinear);
    const theta3dB = 70 * (lambda / D);

    gResEl.textContent = gainDbi.toFixed(1) + ' dBi (' + Math.round(gainLinear).toLocaleString() + '× Directivity Power)';
    bwResEl.textContent = '3dB Beamwidth: ' + theta3dB.toFixed(2) + '° (λ = ' + lambdaMm.toFixed(1) + ' mm, Aperture: ' + (Math.PI*Math.pow(D/2,2)).toFixed(2) + ' m²)';
  }

  [dEl, fEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();