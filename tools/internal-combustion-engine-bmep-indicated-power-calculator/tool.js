(() => {
  'use strict';
  const dEl = document.getElementById('bm-disp'), tqEl = document.getElementById('bm-tq'), rpmEl = document.getElementById('bm-rpm');
  const bmResEl = document.getElementById('bm-res-bmep'), pwResEl = document.getElementById('bm-res-power');

  function update() {
    const V_d_L = parseFloat(dEl.value), T_Nm = parseFloat(tqEl.value), rpm = parseFloat(rpmEl.value);
    if (isNaN(V_d_L) || isNaN(T_Nm) || isNaN(rpm) || V_d_L <= 0 || T_Nm <= 0 || rpm <= 0) return;

    const V_d_m3 = V_d_L * 1e-3;
    const BMEP_Pa = (2.0 * Math.PI * 2.0 * T_Nm) / V_d_m3;
    const BMEP_bar = BMEP_Pa / 1e5;
    const BMEP_psi = BMEP_bar * 14.5038;

    const omega = (2.0 * Math.PI * rpm) / 60.0;
    const Power_kW = (omega * T_Nm) / 1000.0;
    const Power_HP = Power_kW * 1.34102;

    bmResEl.textContent = 'BMEP = ' + BMEP_bar.toFixed(2) + ' bar (' + BMEP_psi.toFixed(1) + ' psi)';
    pwResEl.textContent = 'Power = ' + Power_kW.toFixed(1) + ' kW (' + Power_HP.toFixed(1) + ' HP) @ ' + rpm + ' RPM';
  }

  [dEl, tqEl, rpmEl].forEach(el => el.addEventListener('input', update));
  update();
})();