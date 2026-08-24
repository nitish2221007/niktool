(() => {
  'use strict';
  const vpEl = document.getElementById('trf-vp'), npEl = document.getElementById('trf-np');
  const nsEl = document.getElementById('trf-ns'), ipEl = document.getElementById('trf-ip');
  const vsResEl = document.getElementById('trf-res-vs'), isResEl = document.getElementById('trf-res-is');

  function update() {
    const V_p = parseFloat(vpEl.value), N_p = parseFloat(npEl.value);
    const N_s = parseFloat(nsEl.value), I_p = parseFloat(ipEl.value);

    if (isNaN(V_p) || isNaN(N_p) || isNaN(N_s) || isNaN(I_p) || V_p <= 0 || N_p <= 0 || N_s <= 0 || I_p <= 0) return;

    // V_s = V_p * ( N_s / N_p )
    const V_s = V_p * (N_s / N_p);

    // In an ideal transformer: P_in = P_out => V_p * I_p = V_s * I_s
    // I_s = I_p * ( N_p / N_s )
    const I_s = I_p * (N_p / N_s);

    const P_in = V_p * I_p;
    const isStepUp = N_s > N_p;

    vsResEl.textContent = 'V_s = ' + V_s.toFixed(2) + ' Volts (' + (isStepUp ? 'Step-Up' : 'Step-Down') + ')';
    isResEl.textContent = 'Secondary Current I_s = ' + I_s.toFixed(2) + ' A | Turns Ratio ' + (N_p/N_s).toFixed(1) + ':1 | Power = ' + P_in.toFixed(1) + ' W';
  }

  [vpEl, npEl, nsEl, ipEl].forEach(el => el.addEventListener('input', update));
  update();
})();