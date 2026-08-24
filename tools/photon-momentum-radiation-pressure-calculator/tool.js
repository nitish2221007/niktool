(() => {
  'use strict';
  const iEl = document.getElementById('rad-i'), aEl = document.getElementById('rad-area');
  const pResEl = document.getElementById('rad-res-press'), tResEl = document.getElementById('rad-res-thrust');

  const cSpeed = 299792458; // m / s

  function update() {
    const I = parseFloat(iEl.value), areaM2 = parseFloat(aEl.value);
    if (isNaN(I) || isNaN(areaM2) || I <= 0 || areaM2 <= 0) return;

    // For a 100% reflective mirror sail: P = 2 * I / c (Pascals = N / m^2)
    const pressurePa = (2 * I) / cSpeed;
    const pressUpa = pressurePa * 1e6;

    // Force = Pressure * Area
    const forceN = pressurePa * areaM2;
    const forceMn = forceN * 1000;

    pResEl.textContent = pressUpa.toFixed(2) + ' μPa (' + pressurePa.toExponential(2) + ' N/m²)';
    tResEl.textContent = forceMn >= 1.0 ? forceMn.toFixed(2) + ' mN (' + (forceN * 101.97).toFixed(1) + ' grams thrust)' : (forceN * 1e6).toFixed(1) + ' μN';
  }

  iEl.addEventListener('input', update);
  aEl.addEventListener('input', update);
  update();
})();