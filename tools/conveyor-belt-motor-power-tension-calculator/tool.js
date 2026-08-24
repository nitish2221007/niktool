(() => {
  'use strict';
  const tphEl = document.getElementById('cnv-tph'), vEl = document.getElementById('cnv-v');
  const lEl = document.getElementById('cnv-len'), hEl = document.getElementById('cnv-h'), efEl = document.getElementById('cnv-eff');
  const pwResEl = document.getElementById('cnv-res-pwr'), tnResEl = document.getElementById('cnv-res-ten');

  const g = 9.80665;
  const friction_f = 0.030; // CEMA idler and belt friction factor
  const beltWeightKgM = 20.0; // kg / m (belt + idler rotating parts weight)

  function update() {
    const tph = parseFloat(tphEl.value), vMs = parseFloat(vEl.value);
    const Lm = parseFloat(lEl.value), Hm = parseFloat(hEl.value), eff = parseFloat(efEl.value);

    if (isNaN(tph) || isNaN(vMs) || isNaN(Lm) || isNaN(Hm) || isNaN(eff) || tph <= 0 || vMs <= 0 || Lm <= 0 || Hm < 0 || eff <= 0 || eff > 1.0) return;

    // Material weight per linear meter q_m = (TPH * 1000) / (3600 * v)  [kg / m]
    const q_m = (tph * 1000) / (3600 * vMs);

    // Friction tension on empty and loaded belt T_f = friction_f * L * g * ( 2*q_belt + q_m )
    const T_friction = friction_f * Lm * g * ((2 * beltWeightKgM) + q_m);

    // Lift tension T_lift = q_m * g * H
    const T_lift = q_m * g * Hm;

    // Effective tension T_e = T_friction + T_lift  [Newtons]
    const Te = T_friction + T_lift;
    const Te_lbf = Te * 0.224809;

    // Motor Power P = (Te * v) / (1000 * eff)  [kW]
    const P_kw = (Te * vMs) / (1000 * eff);
    const P_hp = P_kw * 1.34102;

    pwResEl.textContent = P_kw.toFixed(2) + ' kW (' + P_hp.toFixed(1) + ' HP Motor)';
    tnResEl.textContent = 'T_e = ' + Math.round(Te).toLocaleString() + ' N (' + Math.round(Te_lbf).toLocaleString() + ' lbf) | Material Load: ' + q_m.toFixed(1) + ' kg/m (Friction: ' + Math.round(T_friction) + 'N, Lift: ' + Math.round(T_lift) + 'N)';
  }

  [tphEl, vEl, lEl, hEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();