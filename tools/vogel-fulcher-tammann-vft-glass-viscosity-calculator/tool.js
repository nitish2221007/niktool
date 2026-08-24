(() => {
  'use strict';
  const gEl = document.getElementById('vft-glass'), tEl = document.getElementById('vft-temp');
  const vResEl = document.getElementById('vft-res-visc'), ptResEl = document.getElementById('vft-res-pt');

  const GLASSES = {
    'soda_lime':        { A: -2.585, B: 4215.0, T0: 265.0, name: 'Soda-Lime Container Glass' },
    'borosilicate':     { A: -1.650, B: 4860.0, T0: 280.0, name: 'Borosilicate Glass' },
    'lead':             { A: -2.100, B: 3500.0, T0: 220.0, name: 'Lead Crystal Glass' },
    'aluminosilicate':  { A: -2.800, B: 5400.0, T0: 350.0, name: 'Aluminosilicate Glass' }
  };

  function update() {
    const g = GLASSES[gEl.value];
    const T_c = parseFloat(tEl.value);

    if (isNaN(T_c) || T_c <= g.T0) {
      vResEl.textContent = 'Temperature below VFT pole T₀ (' + g.T0 + '°C)';
      return;
    }

    // VFT Equation: log10(eta) = A + B / (T - T0) where eta is in dPa*s (Poise)
    const log_eta = g.A + (g.B / (T_c - g.T0));
    const eta_poise = Math.pow(10, log_eta);

    let fixedPoint = '';
    let color = '#22543d';

    if (log_eta <= 2.0) {
      fixedPoint = 'MELTING POINT (log₁₀ η ≤ 2.0 @ >1400°C: Fluid melt for batch fining & bubble removal)';
      color = '#c53030';
    } else if (log_eta <= 4.0) {
      fixedPoint = 'WORKING POINT (log₁₀ η ≈ 4.0: Ideal viscosity for bottle blowing, drawing & float casting)';
      color = '#22543d';
    } else if (log_eta <= 7.6) {
      fixedPoint = 'LITTLETON SOFTENING POINT (log₁₀ η = 7.6: Glass sags under its own weight)';
      color = '#2563eb';
    } else if (log_eta <= 13.0) {
      fixedPoint = 'ANNEALING POINT (log₁₀ η = 13.0: Internal thermal stresses relax in minutes)';
      color = '#d97706';
    } else if (log_eta <= 14.5) {
      fixedPoint = 'STRAIN POINT (log₁₀ η = 14.5: Solid glass transition Tg; zero plastic stress relief)';
      color = '#4b5563';
    } else {
      fixedPoint = 'SOLID ELASTIC STATE (log₁₀ η > 14.5: Solid rigid brittle glass)';
      color = '#1f2937';
    }

    vResEl.textContent = 'log₁₀ η = ' + log_eta.toFixed(2) + ' (' + (log_eta > 6 ? log_eta.toFixed(1) + ' log Poise' : Math.round(eta_poise).toLocaleString() + ' dPa·s)');
    ptResEl.textContent = fixedPoint + ' | ' + g.name;
    ptResEl.style.color = color;
  }

  gEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();