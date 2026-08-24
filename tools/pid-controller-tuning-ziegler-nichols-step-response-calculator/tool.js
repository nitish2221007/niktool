(() => {
  'use strict';
  const tpEl = document.getElementById('pid-type'), kuEl = document.getElementById('pid-ku'), tuEl = document.getElementById('pid-tu');
  const gnResEl = document.getElementById('pid-res-gains'), tmResEl = document.getElementById('pid-res-times');

  function update() {
    const type = tpEl.value;
    const Ku = parseFloat(kuEl.value), Tu = parseFloat(tuEl.value);

    if (isNaN(Ku) || isNaN(Tu) || Ku <= 0 || Tu <= 0) return;

    let Kp = 0, Ti = 0, Td = 0;

    if (type === 'classic_pid') {
      Kp = 0.60 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.125 * Tu;
    } else if (type === 'pi') {
      Kp = 0.45 * Ku;
      Ti = Tu / 1.2;
      Td = 0;
    } else if (type === 'p') {
      Kp = 0.50 * Ku;
      Ti = 0;
      Td = 0;
    } else if (type === 'no_overshoot') {
      Kp = 0.70 * Ku;
      Ti = 0.40 * Tu;
      Td = 0.15 * Tu;
    }

    const Ki = Ti > 0 ? Kp / Ti : 0;
    const Kd = Kp * Td;

    gnResEl.textContent = 'K_p = ' + Kp.toFixed(2) + (Ki > 0 ? ', K_i = ' + Ki.toFixed(2) : '') + (Kd > 0 ? ', K_d = ' + Kd.toFixed(2) : '');
    tmResEl.textContent = 'Integral T_i = ' + (Ti > 0 ? Ti.toFixed(2) + ' s' : 'None') + ' | Derivative T_d = ' + (Td > 0 ? Td.toFixed(2) + ' s' : 'None') + ' (Ku: ' + Ku + ', Tu: ' + Tu + ' s)';
  }

  [tpEl, kuEl, tuEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();