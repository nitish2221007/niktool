(() => {
  'use strict';
  const kEl = document.getElementById('gw-k'), dhEl = document.getElementById('gw-dh');
  const lEl = document.getElementById('gw-l'), neEl = document.getElementById('gw-ne');
  const qResEl = document.getElementById('gw-res-q'), vsResEl = document.getElementById('gw-res-vs');

  function update() {
    const K = parseFloat(kEl.value), dh = parseFloat(dhEl.value);
    const L = parseFloat(lEl.value), ne = parseFloat(neEl.value);

    if (isNaN(K) || isNaN(dh) || isNaN(L) || isNaN(ne) || K <= 0 || dh <= 0 || L <= 0 || ne <= 0 || ne > 1.0) return;

    // Hydraulic gradient i = dh / L
    const i = dh / L;

    // Darcy flux q = K * i  [m / day]
    const q = K * i;

    // Actual linear seepage velocity v_s = q / n_e  [m / day]
    const v_s = q / ne;
    const v_s_yr = v_s * 365.25;

    qResEl.textContent = 'Darcy Flux q = ' + q.toFixed(3) + ' m / day';
    vsResEl.textContent = 'Seepage Velocity v_s = ' + v_s.toFixed(3) + ' m/day (' + v_s_yr.toFixed(1) + ' m/yr | Gradient i = ' + i.toFixed(4) + ' @ n_e = ' + ne + ')';
  }

  [kEl, dhEl, lEl, neEl].forEach(el => el.addEventListener('input', update));
  update();
})();