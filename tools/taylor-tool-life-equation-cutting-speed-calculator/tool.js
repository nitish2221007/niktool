(() => {
  'use strict';
  const vEl = document.getElementById('tay-v'), nEl = document.getElementById('tay-n'), cEl = document.getElementById('tay-c');
  const tResEl = document.getElementById('tay-res-t'), ecoResEl = document.getElementById('tay-res-eco');

  function update() {
    const V = parseFloat(vEl.value), n = parseFloat(nEl.value), C = parseFloat(cEl.value);
    if (isNaN(V) || isNaN(n) || isNaN(C) || V <= 0 || n <= 0 || C <= 0) return;

    const T_min = Math.pow(C / V, 1 / n);
    const V_60 = C / Math.pow(60, n);

    let timeStr = '';
    if (T_min >= 60) timeStr = (T_min / 60).toFixed(1) + ' Hours (' + Math.round(T_min) + ' min)';
    else timeStr = T_min.toFixed(1) + ' Minutes';

    tResEl.textContent = timeStr + ' (V · T^' + n + ' = ' + C + ')';
    ecoResEl.textContent = 'V_60 = ' + V_60.toFixed(1) + ' m/min for 60-Minute Tool Life (V_15 = ' + (C / Math.pow(15, n)).toFixed(1) + ' m/min)';
  }

  [vEl, cEl].forEach(el => el.addEventListener('input', update));
  nEl.addEventListener('change', update);
  update();
})();