(() => {
  'use strict';
  const wEl = document.getElementById('iv-w');
  const rtResEl = document.getElementById('iv-res-rate'), dyResEl = document.getElementById('iv-res-day');

  function update() {
    const W = parseFloat(wEl.value);
    if (isNaN(W) || W <= 0) return;

    // 4-2-1 Rule:
    // First 10 kg: 4 mL/kg/hr (40 mL/hr max, or 100 mL/kg/day)
    // 10 to 20 kg: +2 mL/kg/hr (20 mL/hr max, or 50 mL/kg/day)
    // > 20 kg: +1 mL/kg/hr (20 mL/kg/day)
    let rate_mL_hr = 0, total_mL_day = 0;

    if (W <= 10.0) {
      rate_mL_hr = 4.0 * W;
      total_mL_day = 100.0 * W;
    } else if (W <= 20.0) {
      rate_mL_hr = 40.0 + 2.0 * (W - 10.0);
      total_mL_day = 1000.0 + 50.0 * (W - 10.0);
    } else {
      rate_mL_hr = 60.0 + 1.0 * (W - 20.0);
      total_mL_day = 1500.0 + 20.0 * (W - 20.0);
    }

    rtResEl.textContent = 'Hourly Rate = ' + Math.round(rate_mL_hr) + ' mL / hr';
    dyResEl.textContent = '24-Hour Total = ' + Math.round(total_mL_day).toLocaleString() + ' mL / day (Weight: ' + W + ' kg | Standard D5 ½ NS + 20 mEq KCl)';
  }

  wEl.addEventListener('input', update);
  update();
})();