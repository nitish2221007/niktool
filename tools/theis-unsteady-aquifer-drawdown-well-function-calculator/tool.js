(() => {
  'use strict';
  const qEl = document.getElementById('th-q'), tEl = document.getElementById('th-t');
  const sEl = document.getElementById('th-s'), rEl = document.getElementById('th-r'), tmEl = document.getElementById('th-time');
  const sResEl = document.getElementById('th-res-s'), wuResEl = document.getElementById('th-res-wu');

  // Exponential integral W(u) approximation:
  function wellFunction(u) {
    if (u <= 0) return 0;
    if (u < 0.05) {
      // Cooper-Jacob approximation: -0.5772 - ln(u)
      return -0.5772156649 - Math.log(u);
    }
    // Power series for moderate u:
    return -0.5772156649 - Math.log(u) + u - (Math.pow(u, 2) / 4.0) + (Math.pow(u, 3) / 18.0) - (Math.pow(u, 4) / 96.0);
  }

  function update() {
    const Q = parseFloat(qEl.value), T = parseFloat(tEl.value);
    const S = parseFloat(sEl.value), r = parseFloat(rEl.value), t = parseFloat(tmEl.value);

    if (isNaN(Q) || isNaN(T) || isNaN(S) || isNaN(r) || isNaN(t) || Q <= 0 || T <= 0 || S <= 0 || r <= 0 || t <= 0) return;

    // Dimensionless parameter: u = ( r^2 * S ) / ( 4 * T * t )
    const u = (Math.pow(r, 2) * S) / (4.0 * T * t);

    const W_u = wellFunction(u);

    // Theis drawdown: s = ( Q / (4 * pi * T) ) * W(u)  [meters]
    const s_drawdown = (Q / (4.0 * Math.PI * T)) * W_u;

    sResEl.textContent = 'Drawdown s = ' + s_drawdown.toFixed(2) + ' m';
    wuResEl.textContent = 'Well Function W(u) = ' + W_u.toFixed(3) + ' | u = ' + u.toExponential(3) + ' (r=' + r + ' m @ t=' + t + ' days)';
  }

  [qEl, tEl, sEl, rEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();