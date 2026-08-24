(() => {
  'use strict';
  const dhEl = document.getElementById('gb-dh'), dsEl = document.getElementById('gb-ds'), tEl = document.getElementById('gb-temp');
  const dgResEl = document.getElementById('gb-res-dg'), kResEl = document.getElementById('gb-res-k');

  const R = 8.314462; // J / (mol * K)

  function update() {
    const dH_kJ = parseFloat(dhEl.value), dS_J = parseFloat(dsEl.value), T = parseFloat(tEl.value);
    if (isNaN(dH_kJ) || isNaN(dS_J) || isNaN(T) || T <= 0) return;

    // Convert dH to J/mol:
    const dH_J = dH_kJ * 1000.0;

    // Delta G = dH - T * dS  [J / mol]
    const dG_J = dH_J - (T * dS_J);
    const dG_kJ = dG_J / 1000.0;

    // Equilibrium constant K = exp( -dG / (R * T) )
    const exponent = -dG_J / (R * T);
    let K_str = '';
    if (exponent > 700) K_str = '> 10³⁰⁰ (Extremely Products-Favored)';
    else if (exponent < -700) K_str = '< 10⁻³⁰⁰ (Reactants-Favored)';
    else {
      const K = Math.exp(exponent);
      K_str = K >= 1000 || K <= 0.001 ? K.toExponential(2) : K.toFixed(3);
    }

    // Crossover temperature where Delta G = 0: T_eq = dH / dS
    let crossoverStr = '';
    if (dS_J !== 0) {
      const T_eq = dH_J / dS_J;
      if (T_eq > 0) {
        crossoverStr = 'Spontaneous Crossover T_eq = ' + T_eq.toFixed(1) + ' K (' + (T_eq - 273.15).toFixed(1) + ' °C)';
      } else {
        crossoverStr = dH_kJ < 0 ? 'Spontaneous at ALL temperatures' : 'Non-spontaneous at ALL temperatures';
      }
    }

    let status = '', color = '#22543d';
    if (dG_kJ < 0) {
      status = 'SPONTANEOUS (ΔG° < 0: Exergonic, forward reaction favored)';
      color = '#22543d';
    } else if (dG_kJ === 0) {
      status = 'DYNAMIC EQUILIBRIUM (ΔG° = 0)';
      color = '#22543d';
    } else {
      status = 'NON-SPONTANEOUS (ΔG° > 0: Endergonic, reverse reaction favored)';
      color = '#c53030';
    }

    dgResEl.textContent = 'ΔG° = ' + (dG_kJ >= 0 ? '+' : '') + dG_kJ.toFixed(2) + ' kJ / mol (' + status.split(' (')[0] + ')';
    dgResEl.style.color = color;
    kResEl.textContent = 'Equilibrium K = ' + K_str + ' | ' + crossoverStr;
    kResEl.style.color = color;
  }

  [dhEl, dsEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();