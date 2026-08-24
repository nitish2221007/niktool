(() => {
  'use strict';
  const matEl = document.getElementById('hvl-mat'), xEl = document.getElementById('hvl-x'), i0El = document.getElementById('hvl-i0');
  const iResEl = document.getElementById('hvl-res-i'), attResEl = document.getElementById('hvl-res-att');

  function update() {
    const hvlCm = parseFloat(matEl.value), xCm = parseFloat(xEl.value), i0 = parseFloat(i0El.value);
    if (isNaN(hvlCm) || isNaN(xCm) || isNaN(i0) || hvlCm <= 0 || xCm < 0 || i0 <= 0) return;

    const nHvl = xCm / hvlCm;
    const I = i0 * Math.pow(0.5, nHvl);
    const attPct = (1 - (I / i0)) * 100;
    const mu = Math.LN2 / hvlCm;

    iResEl.textContent = I.toFixed(2) + ' mSv / hr';
    attResEl.textContent = attPct.toFixed(1) + '% Blocked (' + nHvl.toFixed(2) + ' HVL, μ = ' + mu.toFixed(3) + ' cm⁻¹)';
  }

  matEl.addEventListener('change', update);
  xEl.addEventListener('input', update);
  i0El.addEventListener('input', update);
  update();
})();