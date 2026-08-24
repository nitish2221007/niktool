(() => {
  'use strict';
  const mEl = document.getElementById('hc-m'), dEl = document.getElementById('hc-d');
  const fmEl = document.getElementById('hc-fm'), rhEl = document.getElementById('hc-rho');
  const viResEl = document.getElementById('hc-res-vi'), pwResEl = document.getElementById('hc-res-pwr');

  const g = 9.80665;

  function update() {
    const mass_kg = parseFloat(mEl.value), D_m = parseFloat(dEl.value);
    const FM = parseFloat(fmEl.value), rho = parseFloat(rhEl.value);

    if (isNaN(mass_kg) || isNaN(D_m) || isNaN(FM) || isNaN(rho) || mass_kg <= 0 || D_m <= 0 || FM <= 0 || FM > 1 || rho <= 0) return;

    // Hover thrust equals weight: T = m * g  [Newtons]
    const T_N = mass_kg * g;

    // Rotor disk area: A = pi * D^2 / 4  [m^2]
    const A_disk = (Math.PI * Math.pow(D_m, 2)) / 4.0;

    // Disk loading: DL = T / A  [N / m^2]
    const DL_N_m2 = T_N / A_disk;

    // Induced downwash velocity: v_i = sqrt( T / (2 * rho * A) )  [m / s]
    const v_i = Math.sqrt(T_N / (2.0 * rho * A_disk));
    const v_i_kts = v_i * 1.94384;

    // Ideal induced power: P_i = T * v_i  [Watts]
    const P_i_W = T_N * v_i;

    // Actual hover power accounting for profile drag & tip losses (FM = P_i / P_actual):
    const P_actual_W = P_i_W / FM;
    const P_actual_kW = P_actual_W / 1000.0;
    const P_actual_hp = P_actual_kW * 1.34102;

    viResEl.textContent = 'Induced Downwash v_i = ' + v_i.toFixed(2) + ' m / s (' + v_i_kts.toFixed(1) + ' kts)';
    pwResEl.textContent = 'Shaft Power = ' + Math.round(P_actual_kW) + ' kW (' + Math.round(P_actual_hp) + ' hp) | Disk Loading DL = ' + Math.round(DL_N_m2) + ' N/m² (FM = ' + FM + ')';
  }

  [mEl, dEl, fmEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();