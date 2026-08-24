(() => {
  'use strict';
  const epsEl = document.getElementById('sb-eps'), aEl = document.getElementById('sb-area');
  const thEl = document.getElementById('sb-thot'), tsEl = document.getElementById('sb-tsurr');
  const pwResEl = document.getElementById('sb-res-pwr'), flResEl = document.getElementById('sb-res-flux');

  const sigma = 5.670374419e-8; // W / (m^2 * K^4)

  function update() {
    const eps = parseFloat(epsEl.value), Area = parseFloat(aEl.value);
    const T_hot = parseFloat(thEl.value), T_surr = parseFloat(tsEl.value);

    if (isNaN(eps) || isNaN(Area) || isNaN(T_hot) || isNaN(T_surr) || eps <= 0 || Area <= 0 || T_hot <= 0 || T_surr < 0) return;

    // Stefan-Boltzmann net radiation: P = eps * sigma * Area * ( T_hot^4 - T_surr^4 )  [Watts]
    const P_watts = eps * sigma * Area * (Math.pow(T_hot, 4) - Math.pow(T_surr, 4));
    const P_kW = P_watts / 1000.0;
    const flux_kW_m2 = P_kW / Area;

    pwResEl.textContent = 'Radiative Power P = ' + (P_kW >= 1 ? P_kW.toFixed(2) + ' kW' : P_watts.toFixed(1) + ' W');
    flResEl.textContent = 'Emissive Flux q" = ' + flux_kW_m2.toFixed(2) + ' kW/m² (T_hot: ' + T_hot + ' K / T_surr: ' + T_surr + ' K @ ε = ' + eps + ')';
  }

  [epsEl, aEl, thEl, tsEl].forEach(el => el.addEventListener('input', update));
  update();
})();