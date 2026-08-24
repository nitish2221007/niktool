(() => {
  'use strict';
  const casEl = document.getElementById('tas-cas'), altEl = document.getElementById('tas-alt'), oatEl = document.getElementById('tas-oat');
  const tasResEl = document.getElementById('tas-res-tas'), daResEl = document.getElementById('tas-res-da'), diffResEl = document.getElementById('tas-res-diff');

  function update() {
    const cas = parseFloat(casEl.value), altFt = parseFloat(altEl.value), oatC = parseFloat(oatEl.value);
    if (isNaN(cas) || isNaN(altFt) || isNaN(oatC) || cas <= 0) return;

    // Standard temperature at altitude T_isa = 15 - 0.0019812 * altFt
    const tIsa = 15 - (0.0019812 * altFt);
    // Density Altitude DA = Pressure Alt + 118.8 * (OAT - T_isa)
    const da = altFt + 118.8 * (oatC - tIsa);

    // Rule of thumb for TAS: ~2% increase in CAS per 1,000 feet density altitude
    // Precise density ratio:
    const tKelvin = oatC + 273.15;
    const pAltRatio = Math.pow(1 - (0.0000068756 * altFt), 5.2559);
    const rhoRatio = pAltRatio * (288.15 / tKelvin);
    const tas = cas / Math.sqrt(Math.max(0.1, rhoRatio));

    const gainPct = ((tas - cas) / cas) * 100;

    tasResEl.textContent = tas.toFixed(1) + ' Knots TAS';
    daResEl.textContent = Math.round(da).toLocaleString() + ' Feet';
    diffResEl.textContent = '+' + gainPct.toFixed(1) + '% Gain Over CAS';
  }

  [casEl, altEl, oatEl].forEach(el => el.addEventListener('input', update));
  update();
})();