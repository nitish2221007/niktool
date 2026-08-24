(() => {
  'use strict';
  const uslEl = document.getElementById('cpk-usl'), lslEl = document.getElementById('cpk-lsl');
  const muEl = document.getElementById('cpk-mu'), sigEl = document.getElementById('cpk-sig');
  const cpkResEl = document.getElementById('cpk-res-cpk'), dpResEl = document.getElementById('cpk-res-dpmo');

  function update() {
    const USL = parseFloat(uslEl.value), LSL = parseFloat(lslEl.value);
    const mu = parseFloat(muEl.value), sigma = parseFloat(sigEl.value);

    if (isNaN(USL) || isNaN(LSL) || isNaN(mu) || isNaN(sigma) || USL <= LSL || sigma <= 0) return;

    // Potential process capability Cp = (USL - LSL) / (6 * sigma)
    const Cp = (USL - LSL) / (6.0 * sigma);

    // Actual process capability Cpk = min( (USL - mu)/(3*sigma), (mu - LSL)/(3*sigma) )
    const Cpu = (USL - mu) / (3.0 * sigma);
    const Cpl = (mu - LSL) / (3.0 * sigma);
    const Cpk = Math.min(Cpu, Cpl);

    // Sigma level approx = 3 * Cpk
    const sigmaLevel = 3.0 * Cpk;

    // DPMO approximation:
    let dpmo = 0;
    if (Cpk >= 2.0) dpmo = 0.002;
    else if (Cpk >= 1.67) dpmo = 0.57;
    else if (Cpk >= 1.50) dpmo = 3.4;
    else if (Cpk >= 1.33) dpmo = 63.0;
    else if (Cpk >= 1.00) dpmo = 2700.0;
    else dpmo = 66807.0;

    let rating = '';
    let color = '#22543d';

    if (Cpk >= 1.67) {
      rating = 'EXCELLENT (C_pk ≥ 1.67: Six Sigma Benchmark)';
      color = '#22543d';
    } else if (Cpk >= 1.33) {
      rating = 'CAPABLE (C_pk ≥ 1.33: Standard Automotive/Aerospace Requirement)';
      color = '#22543d';
    } else if (Cpk >= 1.00) {
      rating = 'MARGINAL (1.00 ≤ C_pk < 1.33: Process strictly on threshold, requires tight monitoring)';
      color = '#d97706';
    } else {
      rating = 'NOT CAPABLE (C_pk < 1.00: Generates active out-of-spec scrap defects)';
      color = '#c53030';
    }

    cpkResEl.textContent = 'C_pk = ' + Cpk.toFixed(2) + ' | C_p = ' + Cp.toFixed(2);
    dpResEl.textContent = 'DPMO ≈ ' + (dpmo < 1.0 ? dpmo : Math.round(dpmo).toLocaleString()) + ' PPM (' + sigmaLevel.toFixed(2) + 'σ | ' + rating + ')';
    dpResEl.style.color = color;
  }

  [uslEl, lslEl, muEl, sigEl].forEach(el => el.addEventListener('input', update));
  update();
})();