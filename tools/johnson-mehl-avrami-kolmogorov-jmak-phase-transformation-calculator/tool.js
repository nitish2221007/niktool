(() => {
  'use strict';
  const kEl = document.getElementById('jm-k'), nEl = document.getElementById('jm-n'), tEl = document.getElementById('jm-time');
  const xResEl = document.getElementById('jm-res-x'), hfResEl = document.getElementById('jm-res-half');

  function update() {
    const k = parseFloat(kEl.value), n = parseFloat(nEl.value), t = parseFloat(tEl.value);
    if (isNaN(k) || isNaN(n) || isNaN(t) || k <= 0 || n <= 0 || t < 0) return;

    // Extended volume: V_ext = k * t^n
    const V_ext = k * Math.pow(t, n);

    // JMAK transformed fraction: X = 1 - exp(-V_ext)
    const X = 1.0 - Math.exp(-V_ext);
    const X_pct = X * 100.0;

    // Half-transformation time (X = 0.5): t_0.5 = ( ln(2) / k )^(1/n)
    const t_half = Math.pow(Math.log(2.0) / k, 1.0 / n);

    let mode = '';
    if (n >= 3.5) mode = '3D Growth with Constant Nucleation Rate';
    else if (n >= 2.5) mode = '3D Growth with Site Saturation (Pre-existing nuclei)';
    else if (n >= 1.5) mode = '2D Plate/Disc Growth';
    else mode = '1D Needle/Rod Growth';

    xResEl.textContent = 'Transformed X(t) = ' + X_pct.toFixed(1) + '%';
    hfResEl.textContent = 'Half-Time t₀.₅ = ' + t_half.toFixed(2) + ' s (' + mode + ' @ n=' + n + ')';
  }

  [kEl, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();