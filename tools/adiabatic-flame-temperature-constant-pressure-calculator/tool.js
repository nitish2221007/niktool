(() => {
  'use strict';
  const fEl = document.getElementById('aft-fuel'), exEl = document.getElementById('aft-excess'), t0El = document.getElementById('aft-t0');
  const tResEl = document.getElementById('aft-res-temp'), dResEl = document.getElementById('aft-res-drop');

  const FUELS = {
    'methane':  { base_tad: 2226.0, name: 'Methane CH₄' },
    'propane':  { base_tad: 2267.0, name: 'Propane C₃H₈' },
    'hydrogen': { base_tad: 2483.0, name: 'Hydrogen H₂' },
    'gasoline': { base_tad: 2277.0, name: 'Gasoline Octane' }
  };

  function update() {
    const f = FUELS[fEl.value];
    const excessPct = parseFloat(exEl.value), t0C = parseFloat(t0El.value);

    if (isNaN(excessPct) || isNaN(t0C) || excessPct < 0) return;

    const excessRatio = excessPct / 100.0;
    const deltaT0 = t0C - 25.0; // Pre-heat bonus

    // Thermal dilution by excess ballast air: T_ad approx = (T_stoich - 298) / (1 + 0.65 * excessRatio) + 298 + deltaT0
    const heatRise = f.base_tad - 298.15;
    const dilutedRise = heatRise / (1.0 + (0.68 * excessRatio));
    const Tad_K = 298.15 + dilutedRise + (0.85 * deltaT0);
    const Tad_C = Tad_K - 273.15;

    const quenchDrop = f.base_tad - (298.15 + dilutedRise);

    let noxRisk = '';
    if (Tad_K >= 2100) noxRisk = 'SEVERE THERMAL NOx: T_ad ≥ 2100 K triggers Zeldovich thermal nitrogen oxide formation';
    else if (Tad_K >= 1800) noxRisk = 'MODERATE NOx: Thermal NOx active; selective catalytic reduction (SCR) recommended';
    else noxRisk = 'LOW NOx REGIME: Lean diluted flame suppresses Zeldovich thermal NOx';

    tResEl.textContent = 'T_ad = ' + Math.round(Tad_K).toLocaleString() + ' K (' + Math.round(Tad_C).toLocaleString() + ' °C)';
    dResEl.textContent = noxRisk + ' (Pure Stoichiometric T_ad = ' + Math.round(f.base_tad) + ' K | -' + Math.round(quenchDrop) + ' K Air Dilution)';
  }

  fEl.addEventListener('change', update);
  exEl.addEventListener('input', update);
  t0El.addEventListener('input', update);
  update();
})();