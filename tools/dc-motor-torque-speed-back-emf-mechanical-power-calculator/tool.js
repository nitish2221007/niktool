(() => {
  'use strict';
  const vEl = document.getElementById('dc-v'), rEl = document.getElementById('dc-r');
  const ktEl = document.getElementById('dc-kt'), ldEl = document.getElementById('dc-load');
  const rpResEl = document.getElementById('dc-res-rpm'), pwResEl = document.getElementById('dc-res-power');

  function update() {
    const V = parseFloat(vEl.value), R = parseFloat(rEl.value);
    const K_t = parseFloat(ktEl.value), T_load = parseFloat(ldEl.value);

    if (isNaN(V) || isNaN(R) || isNaN(K_t) || isNaN(T_load) || V <= 0 || R <= 0 || K_t <= 0 || T_load < 0) return;

    // Stall current & torque:
    const I_stall = V / R;
    const T_stall = K_t * I_stall;

    if (T_load >= T_stall) {
      rpResEl.textContent = 'MOTOR STALLED (0 RPM)';
      rpResEl.style.color = '#c53030';
      pwResEl.textContent = 'Stall Current I = ' + I_stall.toFixed(1) + ' A | Power = 0 W (High Heat Dissipation ' + (Math.pow(I_stall, 2) * R).toFixed(0) + ' W)';
      return;
    }

    // Operating current: I = T_load / K_t
    const I_op = T_load / K_t;

    // Back EMF: V_emf = V - (I_op * R)
    const V_emf = V - (I_op * R);

    // K_e (in V / (rad/s)) is identical to K_t (in N*m / A) in SI units:
    const omega_rad_s = V_emf / K_t;
    const rpm = (omega_rad_s * 60.0) / (2.0 * Math.PI);

    // Mechanical power: P_mech = T_load * omega
    const P_mech = T_load * omega_rad_s;

    // Electrical input power: P_elec = V * I_op
    const P_elec = V * I_op;
    const eff_pct = P_elec > 0 ? (P_mech / P_elec) * 100.0 : 0;

    // No-load speed:
    const no_load_rpm = ((V / K_t) * 60.0) / (2.0 * Math.PI);

    rpResEl.textContent = 'Operating Speed = ' + Math.round(rpm).toLocaleString() + ' RPM (' + omega_rad_s.toFixed(1) + ' rad/s)';
    rpResEl.style.color = '#22543d';
    pwResEl.textContent = 'Power P = ' + P_mech.toFixed(1) + ' W (η = ' + eff_pct.toFixed(1) + '%) | Stall = ' + T_stall.toFixed(3) + ' N·m (I_stall = ' + I_stall.toFixed(1) + ' A, No-Load ' + Math.round(no_load_rpm) + ' RPM)';
  }

  [vEl, rEl, ktEl, ldEl].forEach(el => el.addEventListener('input', update));
  update();
})();