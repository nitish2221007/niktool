(() => {
  'use strict';
  const ftEl = document.getElementById('hl-lwl-ft'), mEl = document.getElementById('hl-lwl-m');
  const kResEl = document.getElementById('hl-res-knots'), kmhResEl = document.getElementById('hl-res-kmh');

  function updateFromFeet(lwlFt) {
    if (isNaN(lwlFt) || lwlFt <= 0) return;

    mEl.value = (lwlFt * 0.3048).toFixed(2);

    // v_hull = 1.34 * sqrt(LWL_ft) in knots
    const knots = 1.34 * Math.sqrt(lwlFt);
    const kmh = knots * 1.852;
    const mph = knots * 1.15078;

    kResEl.textContent = knots.toFixed(2) + ' Knots';
    kmhResEl.textContent = kmh.toFixed(2) + ' km/h (' + mph.toFixed(2) + ' mph)';
  }

  ftEl.addEventListener('input', () => {
    const v = parseFloat(ftEl.value);
    if (!isNaN(v)) updateFromFeet(v);
  });

  mEl.addEventListener('input', () => {
    const v = parseFloat(mEl.value);
    if (!isNaN(v)) {
      const ft = v / 0.3048;
      ftEl.value = ft.toFixed(1);
      updateFromFeet(ft);
    }
  });

  updateFromFeet(36);
})();