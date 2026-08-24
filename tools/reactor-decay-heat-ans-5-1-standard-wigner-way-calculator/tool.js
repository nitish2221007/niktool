(() => {
  'use strict';
  const p0El = document.getElementById('dh-p0'), t0El = document.getElementById('dh-t0'), tEl = document.getElementById('dh-t');
  const pdResEl = document.getElementById('dh-res-pd'), tbResEl = document.getElementById('dh-res-table');

  function update() {
    const P0_MW = parseFloat(p0El.value), t0_days = parseFloat(t0El.value), t_min = parseFloat(tEl.value);
    if (isNaN(P0_MW) || isNaN(t0_days) || isNaN(t_min) || P0_MW <= 0 || t0_days <= 0 || t_min <= 0) return;

    const t0_sec = t0_days * 86400.0;
    const t_sec = t_min * 60.0;

    // Wigner-Way decay heat formula:
    // P(t) / P0 = 0.066 * [ t^(-0.2) - (t + t0)^(-0.2) ]
    const frac = 0.066 * (Math.pow(t_sec, -0.2) - Math.pow(t_sec + t0_sec, -0.2));
    const P_decay_MW = P0_MW * frac;
    const frac_pct = frac * 100.0;

    pdResEl.textContent = 'Decay Heat = ' + P_decay_MW.toFixed(1) + ' MW_th (' + frac_pct.toFixed(2) + '% of Rated Power)';
    tbResEl.textContent = 'Decay Power = ' + P_decay_MW.toFixed(1) + ' MW @ ' + t_min + ' min post-trip (t₀=' + t0_days + ' days irradiation @ P₀=' + P0_MW + ' MW)';
  }

  [p0El, t0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();