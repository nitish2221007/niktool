(() => {
  'use strict';
  const vEl = document.getElementById('ion-vacc'), iEl = document.getElementById('ion-ibeam'), gEl = document.getElementById('ion-gas');
  const ispResEl = document.getElementById('ion-res-isp'), thResEl = document.getElementById('ion-res-thrust');

  const g0 = 9.80665;
  const e_charge = 1.602176634e-19;
  const m_u = 1.66053906660e-27;

  const GASES = {
    'xe': { mass: 131.293 * m_u, name: 'Xenon Xe' },
    'kr': { mass: 83.798 * m_u,  name: 'Krypton Kr' },
    'ar': { mass: 39.948 * m_u,  name: 'Argon Ar' }
  };

  function update() {
    const Vacc = parseFloat(vEl.value), I_beam = parseFloat(iEl.value);
    const gas = GASES[gEl.value];

    if (isNaN(Vacc) || isNaN(I_beam) || Vacc <= 0 || I_beam <= 0) return;

    // Exhaust velocity v_e = sqrt( (2 * e * Vacc) / m_ion )  [m / s]
    const v_e_m_s = Math.sqrt((2.0 * e_charge * Vacc) / gas.mass);
    const v_e_km_s = v_e_m_s / 1000.0;

    // Specific impulse I_sp = v_e / g0  [seconds]
    const I_sp_sec = v_e_m_s / g0;

    // Thrust T = sqrt( (2 * m_ion) / e ) * I_beam * sqrt(Vacc)  [Newtons -> mN]
    const T_newtons = Math.sqrt((2.0 * gas.mass) / e_charge) * I_beam * Math.sqrt(Vacc);
    const T_mN = T_newtons * 1000.0;

    // Beam electrical power P = I_beam * Vacc  [Watts -> kW]
    const P_beam_W = I_beam * Vacc;
    const P_beam_kW = P_beam_W / 1000.0;

    ispResEl.textContent = 'I_sp = ' + Math.round(I_sp_sec).toLocaleString() + ' s (' + v_e_km_s.toFixed(1) + ' km/s v_e)';
    thResEl.textContent = 'Thrust T = ' + T_mN.toFixed(1) + ' mN | Beam Power P = ' + P_beam_kW.toFixed(2) + ' kW (' + gas.name + ' @ V_acc = ' + Vacc + ' V, I = ' + I_beam + ' A)';
  }

  [vEl, iEl].forEach(el => el.addEventListener('input', update));
  gEl.addEventListener('change', update);
  update();
})();