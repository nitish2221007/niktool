(() => {
  'use strict';
  const gtEl = document.getElementById('hwb-gt'), tinEl = document.getElementById('hwb-tin');
  const taEl = document.getElementById('hwb-ta'), aEl = document.getElementById('hwb-area');
  const efResEl = document.getElementById('hwb-res-eff'), pwResEl = document.getElementById('hwb-res-pwr');

  // Glazed selective flat-plate collector parameters:
  const FR_tau_alpha = 0.75; // optical efficiency intercept
  const FR_UL = 3.70; // W / m^2 * K (heat loss coefficient slope)

  function update() {
    const G_T = parseFloat(gtEl.value), Tin = parseFloat(tinEl.value);
    const Ta = parseFloat(taEl.value), Area = parseFloat(aEl.value);

    if (isNaN(G_T) || isNaN(Tin) || isNaN(Ta) || isNaN(Area) || G_T <= 0 || Area <= 0) return;

    // Reduced temperature parameter x = (Tin - Ta) / G_T  [K * m^2 / W]
    const deltaT = Tin - Ta;
    const x = deltaT / G_T;

    // Hottel-Whillier-Bliss efficiency: eta = FR_tau_alpha - FR_UL * x
    const eta = Math.max(0, FR_tau_alpha - (FR_UL * x));
    const etaPct = eta * 100;

    // Useful heat gain Q_u = Area * G_T * eta  [Watts]
    const Q_u_watts = Area * G_T * eta;
    const Q_u_kw = Q_u_watts / 1000;

    // Stagnation temperature where eta = 0 => (T_stag - Ta)/G_T = FR_tau_alpha / FR_UL
    const T_stag = Ta + (G_T * (FR_tau_alpha / FR_UL));

    efResEl.textContent = 'η = ' + etaPct.toFixed(1) + '% Collector Efficiency';
    pwResEl.textContent = 'Q_u = ' + Q_u_kw.toFixed(2) + ' kW Thermal (' + (Q_u_watts/Area).toFixed(0) + ' W/m² | Max Stagnation Temp T_stag = ' + Math.round(T_stag) + '°C)';
  }

  [gtEl, tinEl, taEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();