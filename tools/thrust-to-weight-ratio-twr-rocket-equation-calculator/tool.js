(() => {
  'use strict';
  const thEl = document.getElementById('rk-thrust'), m0El = document.getElementById('rk-m0');
  const mfEl = document.getElementById('rk-mf'), ispEl = document.getElementById('rk-isp');
  const twrResEl = document.getElementById('rk-res-twr'), dvResEl = document.getElementById('rk-res-dv');

  const g0 = 9.80665;

  function update() {
    const thrust_kN = parseFloat(thEl.value), m0_tons = parseFloat(m0El.value);
    const mf_tons = parseFloat(mfEl.value), isp_s = parseFloat(ispEl.value);

    if (isNaN(thrust_kN) || isNaN(m0_tons) || isNaN(mf_tons) || isNaN(isp_s) || thrust_kN <= 0 || m0_tons <= 0 || mf_tons <= 0 || mf_tons >= m0_tons || isp_s <= 0) return;

    const m0_kg = m0_tons * 1000.0;
    const mf_kg = mf_tons * 1000.0;
    const thrust_N = thrust_kN * 1000.0;

    const weight_N = m0_kg * g0;
    const TWR = thrust_N / weight_N;
    const a_net = (TWR - 1.0) * g0;
    const a_g = TWR - 1.0;

    const c_mps = isp_s * g0;
    const mass_ratio = m0_kg / mf_kg;
    const delta_v = c_mps * Math.log(mass_ratio);

    let twrStatus = '', color = '#22543d';
    if (TWR >= 1.2 && TWR <= 1.8) {
      twrStatus = 'OPTIMAL LIFTOFF TWR (1.2 - 1.8: Balances gravity loss against aerodynamic drag)';
      color = '#22543d';
    } else if (TWR < 1.0) {
      twrStatus = 'CANNOT LIFTOFF (TWR < 1.0: Vehicle falls back to launchpad!)';
      color = '#c53030';
    } else if (TWR < 1.2) {
      twrStatus = 'HIGH GRAVITY DRAG (TWR 1.0 - 1.2)';
      color = '#ea580c';
    } else {
      twrStatus = 'HIGH AERODYNAMIC DRAG (TWR > 1.8)';
      color = '#2563eb';
    }

    twrResEl.textContent = 'Liftoff TWR = ' + TWR.toFixed(2) + ' (a = ' + a_net.toFixed(2) + ' m/s² / ' + a_g.toFixed(2) + ' g)';
    twrResEl.style.color = color;
    dvResEl.textContent = 'Delta-v Δv = ' + Math.round(delta_v).toLocaleString() + ' m/s (Mass Ratio ' + mass_ratio.toFixed(2) + ':1 | ' + twrStatus.split(' (')[0] + ')';
    dvResEl.style.color = color;
  }

  [thEl, m0El, mfEl, ispEl].forEach(el => el.addEventListener('input', update));
  update();
})();