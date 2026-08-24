(() => {
  'use strict';
  const r1El = document.getElementById('bi-r1'), r2El = document.getElementById('bi-r2'), rbEl = document.getElementById('bi-rb');
  const dvResEl = document.getElementById('bi-res-dv'), svResEl = document.getElementById('bi-res-save');

  const mu = 398600.4418; // Earth gravitational parameter in km^3 / s^2

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), rb = parseFloat(rbEl.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(rb) || r1 <= 0 || r2 <= r1 || rb <= r2) return;

    const ratio = r2 / r1;

    // Hohmann transfer 2-burn delta-V:
    // a_hoh = (r1 + r2) / 2
    // dv1_hoh = sqrt(mu/r1) * ( sqrt(2*r2 / (r1 + r2)) - 1 )
    // dv2_hoh = sqrt(mu/r2) * ( 1 - sqrt(2*r1 / (r1 + r2)) )
    const dv1_hoh = Math.sqrt(mu / r1) * (Math.sqrt((2.0 * r2) / (r1 + r2)) - 1.0);
    const dv2_hoh = Math.sqrt(mu / r2) * (1.0 - Math.sqrt((2.0 * r1) / (r1 + r2)));
    const dv_hohmann = dv1_hoh + dv2_hoh;

    // Bi-elliptic transfer 3-burn delta-V:
    // Burn 1 (at r1): dv1 = sqrt(2*mu/r1 - 2*mu/(r1+rb)) - sqrt(mu/r1)
    const dv1_bi = Math.sqrt((2.0 * mu / r1) - (2.0 * mu / (r1 + rb))) - Math.sqrt(mu / r1);
    // Burn 2 (at rb): dv2 = sqrt(2*mu/rb - 2*mu/(r2+rb)) - sqrt(2*mu/rb - 2*mu/(r1+rb))
    const dv2_bi = Math.abs(Math.sqrt((2.0 * mu / rb) - (2.0 * mu / (r2 + rb))) - Math.sqrt((2.0 * mu / rb) - (2.0 * mu / (r1 + rb))));
    // Burn 3 (at r2): dv3 = sqrt(mu/r2) - sqrt(2*mu/r2 - 2*mu/(r2+rb))
    const dv3_bi = Math.abs(Math.sqrt(mu / r2) - Math.sqrt((2.0 * mu / r2) - (2.0 * mu / (r2 + rb))));

    const dv_bielliptic = dv1_bi + dv2_bi + dv3_bi;
    const diff_m_s = (dv_hohmann - dv_bielliptic) * 1000.0;

    let evalStr = '';
    let color = '#22543d';

    if (ratio > 11.94 && dv_bielliptic < dv_hohmann) {
      evalStr = 'BI-ELLIPTIC IS MORE EFFICIENT (Saves +' + Math.round(diff_m_s) + ' m/s over Hohmann | r₂/r₁ = ' + ratio.toFixed(1) + ' > 11.94)';
      color = '#22543d';
    } else {
      evalStr = 'HOHMANN IS MORE EFFICIENT (Hohmann saves +' + Math.round(-diff_m_s) + ' m/s and requires much shorter transfer time)';
      color = '#2563eb';
    }

    dvResEl.textContent = 'Bi-Elliptic: ' + dv_bielliptic.toFixed(2) + ' km/s vs Hohmann: ' + dv_hohmann.toFixed(2) + ' km/s';
    svResEl.textContent = evalStr;
    svResEl.style.color = color;
  }

  [r1El, r2El, rbEl].forEach(el => el.addEventListener('input', update));
  update();
})();