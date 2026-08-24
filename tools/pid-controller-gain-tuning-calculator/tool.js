(() => {
  'use strict';
  const kuEl = document.getElementById('pid-ku'), puEl = document.getElementById('pid-pu'), typeEl = document.getElementById('pid-type');
  const kpResEl = document.getElementById('pid-res-kp'), kiResEl = document.getElementById('pid-res-ki'), kdResEl = document.getElementById('pid-res-kd');

  function update() {
    const Ku = parseFloat(kuEl.value), Pu = parseFloat(puEl.value), mode = typeEl.value;
    if (isNaN(Ku) || isNaN(Pu) || Ku <= 0 || Pu <= 0) return;

    let Kp = 0, Ti = 0, Td = 0, Ki = 0, Kd = 0;

    if (mode === 'p') {
      Kp = 0.50 * Ku;
      kpResEl.textContent = 'K_p = ' + Kp.toFixed(2);
      kiResEl.textContent = 'K_i = 0.00 (Off)';
      kdResEl.textContent = 'K_d = 0.00 (Off)';
    } else if (mode === 'pi') {
      Kp = 0.45 * Ku;
      Ti = Pu / 1.2;
      Ki = Kp / Ti;
      kpResEl.textContent = 'K_p = ' + Kp.toFixed(2);
      kiResEl.textContent = 'K_i = ' + Ki.toFixed(2) + ' (T_i = ' + Ti.toFixed(2) + 's)';
      kdResEl.textContent = 'K_d = 0.00 (Off)';
    } else { // Full PID
      Kp = 0.60 * Ku;
      Ti = 0.50 * Pu;
      Td = 0.125 * Pu;
      Ki = Kp / Ti;
      Kd = Kp * Td;
      kpResEl.textContent = 'K_p = ' + Kp.toFixed(2);
      kiResEl.textContent = 'K_i = ' + Ki.toFixed(2) + ' (T_i = ' + Ti.toFixed(2) + 's)';
      kdResEl.textContent = 'K_d = ' + Kd.toFixed(2) + ' (T_d = ' + Td.toFixed(2) + 's)';
    }
  }

  kuEl.addEventListener('input', update);
  puEl.addEventListener('input', update);
  typeEl.addEventListener('change', update);
  update();
})();