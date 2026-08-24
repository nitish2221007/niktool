(() => {
  'use strict';
  const d1El = document.getElementById('pv-d1'), d2El = document.getElementById('pv-d2');
  const d3El = document.getElementById('pv-d3'), mEl = document.getElementById('pv-m');
  const snResEl = document.getElementById('pv-res-sn'), esResEl = document.getElementById('pv-res-esal');

  function update() {
    const D1 = parseFloat(d1El.value), D2 = parseFloat(d2El.value);
    const D3 = parseFloat(d3El.value), m = parseFloat(mEl.value);

    if (isNaN(D1) || isNaN(D2) || isNaN(D3) || isNaN(m) || D1 < 0 || D2 < 0 || D3 < 0 || m <= 0) return;

    // Standard AASHTO layer structural coefficients:
    // Hot Mix Asphalt (HMA): a1 = 0.44 per inch
    // Crushed aggregate base: a2 = 0.14 per inch
    // Granular subbase: a3 = 0.11 per inch
    const sn1 = 0.44 * D1;
    const sn2 = 0.14 * D2 * m;
    const sn3 = 0.11 * D3 * m;

    const SN = sn1 + sn2 + sn3;

    // Approximate AASHTO ESALs capacity: ESALs approx = 10^( (SN - 1.5) / 0.45 ) * 100,000
    const esals = Math.pow(10.0, (SN - 1.5) / 0.55) * 50000;
    const esal_millions = esals / 1e6;

    snResEl.textContent = 'Structural Number SN = ' + SN.toFixed(2);
    esResEl.textContent = 'Capacity ≈ ' + esal_millions.toFixed(1) + 'M ESALs (HMA: ' + sn1.toFixed(2) + ' + Base: ' + sn2.toFixed(2) + ' + Subbase: ' + sn3.toFixed(2) + ' @ m = ' + m + ')';
  }

  [d1El, d2El, d3El, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();