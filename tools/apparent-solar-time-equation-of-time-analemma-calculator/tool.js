(() => {
  'use strict';
  const dEl = document.getElementById('eot-day');
  const eoResEl = document.getElementById('eot-res-eot'), dcResEl = document.getElementById('eot-res-dec');

  function update() {
    const N = parseInt(dEl.value, 10);
    if (isNaN(N) || N < 1 || N > 365) return;

    // Angle B = 360/365 * (N - 81)  [degrees -> radians]
    const B_rad = ((360.0 / 365.0) * (N - 81) * Math.PI) / 180.0;

    // Spencer / Smart empirical formula for Equation of Time in minutes:
    // EoT = 9.87 * sin(2B) - 7.53 * cos(B) - 1.5 * sin(B)  [minutes]
    const EoT_min = 9.87 * Math.sin(2.0 * B_rad) - 7.53 * Math.cos(B_rad) - 1.5 * Math.sin(B_rad);

    // Solar declination approx: delta = 23.45 * sin( 360/365 * (284 + N) )  [degrees]
    const dec_angle_rad = ((360.0 / 365.0) * (284 + N) * Math.PI) / 180.0;
    const dec_deg = 23.45 * Math.sin(dec_angle_rad);

    const sign = EoT_min >= 0 ? '+' : '';
    const status = EoT_min >= 0 ? 'Sundial is ' + Math.abs(EoT_min).toFixed(1) + ' min FAST' : 'Sundial is ' + Math.abs(EoT_min).toFixed(1) + ' min SLOW';

    eoResEl.textContent = 'Equation of Time = ' + sign + EoT_min.toFixed(1) + ' Minutes';
    dcResEl.textContent = status + ' | Solar Declination δ = ' + (dec_deg >= 0 ? '+' : '') + dec_deg.toFixed(1) + '° (Day ' + N + ')';
  }

  dEl.addEventListener('input', update);
  update();
})();