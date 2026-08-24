(() => {
  'use strict';
  const r1El = document.getElementById('cd-r1'), r2El = document.getElementById('cd-r2');
  const lEl = document.getElementById('cd-len'), kEl = document.getElementById('cd-k'), dtEl = document.getElementById('cd-dt');
  const qResEl = document.getElementById('cd-res-q'), rtResEl = document.getElementById('cd-res-rate');

  function update() {
    const r1_mm = parseFloat(r1El.value), r2_mm = parseFloat(r2El.value);
    const L = parseFloat(lEl.value), k = parseFloat(kEl.value), dT = parseFloat(dtEl.value);

    if (isNaN(r1_mm) || isNaN(r2_mm) || isNaN(L) || isNaN(k) || isNaN(dT) || r1_mm <= 0 || r2_mm <= r1_mm || L <= 0 || k <= 0 || dT <= 0) return;

    // Fourier radial heat conduction: q = ( 2 * pi * k * L * dT ) / ln( r2 / r1 )
    const q_watts = (2.0 * Math.PI * k * L * dT) / Math.log(r2_mm / r1_mm);
    const q_per_meter = q_watts / L;

    qResEl.textContent = 'Heat Loss q = ' + (q_watts >= 1000 ? (q_watts/1000).toFixed(2) + ' kW' : q_watts.toFixed(1) + ' Watts');
    rtResEl.textContent = 'Heat Loss per Meter = ' + q_per_meter.toFixed(1) + ' W / m (r₂/r₁ = ' + (r2_mm/r1_mm).toFixed(2) + ' @ ΔT = ' + dT + '°C, k = ' + k + ' W/m·K)';
  }

  [r1El, r2El, lEl, kEl, dtEl].forEach(el => el.addEventListener('input', update));
  update();
})();