(() => {
  'use strict';
  const flEl = document.getElementById('lm-flow'), thiEl = document.getElementById('lm-thin');
  const thoEl = document.getElementById('lm-thout'), tciEl = document.getElementById('lm-tcin'), tcoEl = document.getElementById('lm-tcout');
  const lmResEl = document.getElementById('lm-res-lmtd'), adResEl = document.getElementById('lm-res-adv');

  function update() {
    const isCounter = flEl.value === 'counter';
    const T_h_in = parseFloat(thiEl.value), T_h_out = parseFloat(thoEl.value);
    const T_c_in = parseFloat(tciEl.value), T_c_out = parseFloat(tcoEl.value);

    if (isNaN(T_h_in) || isNaN(T_h_out) || isNaN(T_c_in) || isNaN(T_c_out) || T_h_in <= T_h_out || T_c_out <= T_c_in) return;

    let dt1 = 0, dt2 = 0;
    if (isCounter) {
      // Counter-flow: dt1 = T_h_in - T_c_out, dt2 = T_h_out - T_c_in
      dt1 = T_h_in - T_c_out;
      dt2 = T_h_out - T_c_in;
    } else {
      // Parallel-flow: dt1 = T_h_in - T_c_in, dt2 = T_h_out - T_c_out
      dt1 = T_h_in - T_c_in;
      dt2 = T_h_out - T_c_out;
    }

    if (dt1 <= 0 || dt2 <= 0) {
      lmResEl.textContent = 'Invalid Temperature Cross (2nd Law of Thermodynamics violated)';
      return;
    }

    let LMTD = 0;
    if (Math.abs(dt1 - dt2) < 0.01) {
      LMTD = dt1; // When dt1 == dt2, LMTD = dt1
    } else {
      LMTD = (dt1 - dt2) / Math.log(dt1 / dt2);
    }

    lmResEl.textContent = 'LMTD = ' + LMTD.toFixed(2) + ' °C';
    adResEl.textContent = (isCounter ? 'Counter-Flow' : 'Parallel-Flow') + ': ΔT₁ = ' + dt1.toFixed(1) + '°C, ΔT₂ = ' + dt2.toFixed(1) + '°C (Hot: ' + T_h_in + '->' + T_h_out + '°C | Cold: ' + T_c_in + '->' + T_c_out + '°C)';
  }

  [flEl, thiEl, thoEl, tciEl, tcoEl].forEach(el => el.addEventListener('input', update));
  flEl.addEventListener('change', update);
  update();
})();