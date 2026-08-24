(() => {
  'use strict';
  const iEl = document.getElementById('lux-i'), dEl = document.getElementById('lux-d'), thEl = document.getElementById('lux-th');
  const lResEl = document.getElementById('lux-res-lux'), rResEl = document.getElementById('lux-res-rec');

  function update() {
    const I_cd = parseFloat(iEl.value), d_m = parseFloat(dEl.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(I_cd) || isNaN(d_m) || isNaN(thetaDeg) || I_cd <= 0 || d_m <= 0) return;

    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Illuminance in Lux E = ( I * cos(theta) ) / d^2  [lumens / m^2]
    const Lux = (I_cd * Math.cos(thetaRad)) / Math.pow(d_m, 2);

    // 1 Foot-Candle = 10.764 Lux => Foot-Candles = Lux / 10.764
    const FootCandles = Lux / 10.76391;

    let standard = '';
    let color = '#22543d';

    if (Lux < 100) {
      standard = 'CORRIDOR / AMBIENT LIGHT (50 - 100 Lux: Hallway & storage lighting)';
      color = '#d97706';
    } else if (Lux < 300) {
      standard = 'GENERAL LIVING / CASUAL WORK (150 - 300 Lux: Kitchen & dining area)';
      color = '#2563eb';
    } else if (Lux <= 750) {
      standard = 'OFFICE / DESK WORKSPACE (300 - 750 Lux: Standard IESNA reading & computer tasks)';
      color = '#22543d';
    } else if (Lux <= 1500) {
      standard = 'DETAILED INSPECTION (750 - 1,500 Lux: Precision assembly & drafting)';
      color = '#22543d';
    } else {
      standard = 'SURGICAL / HIGH PRECISION (>1,500 Lux: Operating rooms & fine electronics)';
      color = '#22543d';
    }

    lResEl.textContent = Lux.toFixed(1) + ' Lux (' + FootCandles.toFixed(1) + ' Foot-Candles)';
    rResEl.textContent = standard;
    rResEl.style.color = color;
  }

  [iEl, dEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();