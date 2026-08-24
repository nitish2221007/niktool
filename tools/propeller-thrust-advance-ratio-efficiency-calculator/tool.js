(() => {
  'use strict';
  const vEl = document.getElementById('pr-v'), dEl = document.getElementById('pr-d');
  const rpmEl = document.getElementById('pr-rpm'), tEl = document.getElementById('pr-t');
  const jResEl = document.getElementById('pr-res-j'), efResEl = document.getElementById('pr-res-eff');

  function update() {
    const v_kts = parseFloat(vEl.value), D_m = parseFloat(dEl.value);
    const rpm = parseFloat(rpmEl.value), T_N = parseFloat(tEl.value);

    if (isNaN(v_kts) || isNaN(D_m) || isNaN(rpm) || isNaN(T_N) || v_kts <= 0 || D_m <= 0 || rpm <= 0 || T_N <= 0) return;

    // Convert kts to m/s:
    const v_mps = v_kts * 0.514444;
    // Rotational frequency n in rev/s:
    const n_rps = rpm / 60.0;

    // Advance ratio: J = v / ( n * D )
    const J = v_mps / (n_rps * D_m);

    // Useful thrust power: P_thrust = T * v  [Watts -> kW]
    const P_thrust_kW = (T_N * v_mps) / 1000.0;
    const P_thrust_HP = P_thrust_kW * 1.34102;

    // Propeller tip speed: v_tip = pi * D * n_rps
    const v_tip_mps = Math.PI * D_m * n_rps;
    const tipMach = v_tip_mps / 340.0; // speed of sound ~340 m/s

    jResEl.textContent = 'Advance Ratio J = ' + J.toFixed(2);
    efResEl.textContent = 'Thrust Power = ' + P_thrust_kW.toFixed(1) + ' kW (' + P_thrust_HP.toFixed(1) + ' HP) | Tip Mach = ' + tipMach.toFixed(2) + ' (Tip Speed: ' + v_tip_mps.toFixed(1) + ' m/s @ ' + rpm + ' RPM)';
  }

  [vEl, dEl, rpmEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();