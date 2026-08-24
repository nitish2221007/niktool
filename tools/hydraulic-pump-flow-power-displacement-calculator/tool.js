(() => {
  'use strict';
  const vdEl = document.getElementById('hyd-vd'), rpmEl = document.getElementById('hyd-rpm');
  const pEl = document.getElementById('hyd-p'), efEl = document.getElementById('hyd-eff');
  const flResEl = document.getElementById('hyd-res-flow'), pwResEl = document.getElementById('hyd-res-pwr');

  function update() {
    const Vd = parseFloat(vdEl.value), rpm = parseFloat(rpmEl.value);
    const pBar = parseFloat(pEl.value), eff = parseFloat(efEl.value);

    if (isNaN(Vd) || isNaN(rpm) || isNaN(pBar) || isNaN(eff) || Vd <= 0 || rpm <= 0 || pBar <= 0 || eff <= 0 || eff > 1.0) return;

    // Volumetric efficiency approx 95%
    const eta_v = 0.95;
    // Flow Q = (Vd * rpm * eta_v) / 1000  [L / min]
    const Q_lpm = (Vd * rpm * eta_v) / 1000;
    const Q_gpm = Q_lpm * 0.264172;

    // Drive power P = (Q * p) / (600 * eff)  [kW]
    const P_kw = (Q_lpm * pBar) / (600 * eff);
    const P_hp = P_kw * 1.34102;

    flResEl.textContent = Q_lpm.toFixed(1) + ' L / min (' + Q_gpm.toFixed(1) + ' GPM)';
    pwResEl.textContent = 'Drive Power: ' + P_kw.toFixed(1) + ' kW (' + P_hp.toFixed(1) + ' HP Motor | ' + pBar + ' bar / ' + Math.round(pBar*14.5038) + ' PSI)';
  }

  [vdEl, rpmEl, pEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();