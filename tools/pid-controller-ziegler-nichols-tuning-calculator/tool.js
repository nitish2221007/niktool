(() => {
  'use strict';
  const kuEl = document.getElementById('pid-ku'), tuEl = document.getElementById('pid-tu'), tpEl = document.getElementById('pid-type');
  const gResEl = document.getElementById('pid-res-gains'), tResEl = document.getElementById('pid-res-times');

  function update() {
    const Ku = parseFloat(kuEl.value), Tu = parseFloat(tuEl.value);
    const mode = tpEl.value;

    if (isNaN(Ku) || isNaN(Tu) || Ku <= 0 || Tu <= 0) return;

    let Kp = 0, Ti = Infinity, Td = 0;

    if (mode === 'p') {
      Kp = 0.50 * Ku;
    } else if (mode === 'pi') {
      Kp = 0.45 * Ku;
      Ti = Tu / 1.2;
    } else if (mode === 'pid') {
      Kp = 0.60 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.125 * Tu;
    } else if (mode === 'some_overshoot') {
      Kp = 0.33 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.33 * Tu;
    } else if (mode === 'no_overshoot') {
      Kp = 0.20 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.33 * Tu;
    }

    const Ki = Ti !== Infinity ? (Kp / Ti) : 0;
    const Kd = Kp * Td;

    gResEl.textContent = 'K_p = ' + Kp.toFixed(2) + ' | K_i = ' + Ki.toFixed(2) + ' | K_d = ' + Kd.toFixed(2);
    tResEl.textContent = 'T_i = ' + (Ti !== Infinity ? Ti.toFixed(3) + ' s' : 'None') + ' | T_d = ' + (Td > 0 ? Td.toFixed(3) + ' s' : 'None') + ' (Tuned for ' + tpEl.options[tpEl.selectedIndex].text.split('(')[0].trim() + ')';
  }

  [kuEl, tuEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();