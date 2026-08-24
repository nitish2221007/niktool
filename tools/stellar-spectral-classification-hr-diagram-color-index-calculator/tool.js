(() => {
  'use strict';
  const tEl = document.getElementById('sp-temp');
  const clResEl = document.getElementById('sp-res-class'), bvResEl = document.getElementById('sp-res-bv');

  function update() {
    const T = parseFloat(tEl.value);
    if (isNaN(T) || T <= 0) return;

    // Ballesteros formula: B - V = -0.72 + 0.46 * log10(T) ... simplified empirical fit:
    // B - V approx ( 4600 * (1/(T - 500)) - 0.25 )
    let BV = (8540.0 / T) - 0.72;
    BV = Math.max(-0.35, Math.min(1.80, BV));

    let spec = '', lines = '', color = '#22543d';
    if (T >= 30000) { spec = 'O-Type (Blazing Blue Supergiant)'; lines = 'Ionized Helium (He II), Strong UV continuum'; color = '#2563eb'; }
    else if (T >= 10000) { spec = 'B-Type (Blue-White Star - Rigel/Spica)'; lines = 'Neutral Helium (He I), Strong Balmer Hydrogen'; color = '#2563eb'; }
    else if (T >= 7500) { spec = 'A-Type (White Star - Sirius/Vega)'; lines = 'Strongest Balmer Hydrogen (H-alpha, H-beta, H-gamma)'; color = '#2563eb'; }
    else if (T >= 6000) { spec = 'F-Type (Yellow-White Star - Procyon)'; lines = 'Ionized Calcium Ca II, Weakening Hydrogen'; color = '#22543d'; }
    else if (T >= 5200) { spec = 'G-Type (Yellow Dwarf - Sun / Alpha Centauri A)'; lines = 'Strong Ca II H&K lines, Neutral Metals (Fe I, Mg I)'; color = '#22543d'; }
    else if (T >= 3700) { spec = 'K-Type (Orange Star - Arcturus/Aldebaran)'; lines = 'Neutral Metal Lines Dominant, Weak Hydrogen'; color = '#ea580c'; }
    else { spec = 'M-Type (Red Dwarf / Red Supergiant - Betelgeuse/Proxima)'; lines = 'Titanium Oxide (TiO) Molecular Bands, Neutral Atoms'; color = '#c53030'; }

    clResEl.textContent = 'Spectral Class: ' + spec;
    clResEl.style.color = color;
    bvResEl.textContent = 'Color (B - V) ≈ ' + (BV >= 0 ? '+' : '') + BV.toFixed(2) + ' | Spectral Lines: ' + lines;
    bvResEl.style.color = color;
  }

  tEl.addEventListener('input', update);
  update();
})();