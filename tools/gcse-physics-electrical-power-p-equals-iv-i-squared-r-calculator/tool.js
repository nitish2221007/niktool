(() => {
  'use strict';
  const vEl = document.getElementById('pwr-v'), iEl = document.getElementById('pwr-i'), rEl = document.getElementById('pwr-r');
  const wResEl = document.getElementById('pwr-res-w'), htResEl = document.getElementById('pwr-res-heat');

  function update() {
    let V = parseFloat(vEl.value), I = parseFloat(iEl.value), R = parseFloat(rEl.value);
    if (isNaN(V) && isNaN(I) && isNaN(R)) return;

    let P = 0;
    if (!isNaN(V) && !isNaN(I) && V > 0 && I > 0) {
      P = V * I;
      R = V / I;
      rEl.value = R.toFixed(2);
    } else if (!isNaN(I) && !isNaN(R) && I > 0 && R > 0) {
      P = Math.pow(I, 2) * R;
      V = I * R;
      vEl.value = V.toFixed(2);
    } else if (!isNaN(V) && !isNaN(R) && V > 0 && R > 0) {
      P = Math.pow(V, 2) / R;
      I = V / R;
      iEl.value = I.toFixed(2);
    }

    const kW = P / 1000.0;
    const kWh_hr = kW;
    const MJ = (P * 3600) / 1e6;

    wResEl.textContent = 'P = ' + (P >= 1000 ? Math.round(P).toLocaleString() : P.toFixed(1)) + ' Watts (' + kW.toFixed(2) + ' kW)';
    htResEl.textContent = 'Joule Heating I²R = ' + (P >= 1000 ? Math.round(P).toLocaleString() : P.toFixed(1)) + ' W | 1 Hour Energy = ' + kWh_hr.toFixed(2) + ' kWh (' + MJ.toFixed(2) + ' MJ @ ' + V.toFixed(1) + ' V, ' + I.toFixed(2) + ' A)';
  }

  [vEl, iEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();