(() => {
  'use strict';
  const aEl = document.getElementById('sail-area'), mEl = document.getElementById('sail-mass');
  const rEl = document.getElementById('sail-r'), dEl = document.getElementById('sail-dist');
  const fResEl = document.getElementById('sail-res-force'), acResEl = document.getElementById('sail-res-acc');

  const I0_solar = 1361.0; // W / m^2 solar constant at 1 AU
  const c_light = 299792458; // m / s

  function update() {
    const Area = parseFloat(aEl.value), Mass = parseFloat(mEl.value);
    const R = parseFloat(rEl.value), dist_au = parseFloat(dEl.value);

    if (isNaN(Area) || isNaN(Mass) || isNaN(R) || isNaN(dist_au) || Area <= 0 || Mass <= 0 || dist_au <= 0) return;

    // Solar irradiance at distance d: I = I0 / d^2  [W / m^2]
    const I_solar = I0_solar / Math.pow(dist_au, 2);

    // Radiation pressure P_rad = (1 + R) * I / c  [N / m^2 -> uN / m^2]
    const P_rad_Pa = ((1.0 + R) * I_solar) / c_light;
    const P_rad_uN = P_rad_Pa * 1e6;

    // Total thrust force F = P_rad * Area  [Newtons -> mN]
    const Force_N = P_rad_Pa * Area;
    const Force_mN = Force_N * 1000.0;

    // Acceleration a = Force / Mass  [m / s^2 -> mm / s^2]
    const a_m_s2 = Force_N / Mass;
    const a_mm_s2 = a_m_s2 * 1000.0;

    // Delta-V accumulated per day: DeltaV = a * 86,400 seconds
    const deltaV_day_m_s = a_m_s2 * 86400.0;

    fResEl.textContent = 'Force F = ' + Force_mN.toFixed(2) + ' mN (P_rad = ' + P_rad_uN.toFixed(2) + ' μN/m²)';
    acResEl.textContent = 'Acceleration a = ' + a_mm_s2.toFixed(4) + ' mm/s² (Daily Δv = +' + deltaV_day_m_s.toFixed(1) + ' m/s @ ' + dist_au + ' AU, Mass = ' + Mass + ' kg)';
  }

  [aEl, mEl, rEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();