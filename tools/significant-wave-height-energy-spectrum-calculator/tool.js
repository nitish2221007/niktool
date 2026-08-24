(() => {
  'use strict';
  const m0El = document.getElementById('swh-m0'), tpEl = document.getElementById('swh-tp');
  const hResEl = document.getElementById('swh-res-h'), sResEl = document.getElementById('swh-res-sea');

  function update() {
    const m0 = parseFloat(m0El.value), Tp = parseFloat(tpEl.value);
    if (isNaN(m0) || isNaN(Tp) || m0 <= 0 || Tp <= 0) return;

    const Hm0 = 4 * Math.sqrt(m0);
    const Hm0_ft = Hm0 * 3.28084;
    const Hmax = Hm0 * 1.86;

    let seaState = '';
    if (Hm0 < 0.1) seaState = 'WMO 0: Calm (Glassy)';
    else if (Hm0 < 0.5) seaState = 'WMO 1-2: Smooth to Slight';
    else if (Hm0 < 1.25) seaState = 'WMO 3: Moderate (0.5 - 1.25m)';
    else if (Hm0 < 2.5) seaState = 'WMO 4: Moderate to Rough (1.25 - 2.5m)';
    else if (Hm0 < 4.0) seaState = 'WMO 5: Rough Seas (2.5 - 4.0m)';
    else if (Hm0 < 6.0) seaState = 'WMO 6: Very Rough (4.0 - 6.0m)';
    else if (Hm0 < 9.0) seaState = 'WMO 7: High Seas (6.0 - 9.0m)';
    else if (Hm0 < 14.0) seaState = 'WMO 8: Very High (9.0 - 14.0m)';
    else seaState = 'WMO 9: Phenomenal (> 14m Monster Waves)';

    hResEl.textContent = Hm0.toFixed(2) + ' m (' + Hm0_ft.toFixed(1) + ' ft Significant H_m0)';
    sResEl.textContent = seaState + ' (Estimated Peak H_max ≈ ' + Hmax.toFixed(1) + ' m)';
  }

  m0El.addEventListener('input', update);
  tpEl.addEventListener('input', update);
  update();
})();