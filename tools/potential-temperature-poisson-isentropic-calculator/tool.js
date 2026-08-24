(() => {
  'use strict';
  const tEl = document.getElementById('pot-t'), pEl = document.getElementById('pot-p');
  const thResEl = document.getElementById('pot-res-th'), stResEl = document.getElementById('pot-res-stab');

  const kappa = 0.2857; // R_d / c_p = 287.05 / 1005 for dry air

  function update() {
    const Tc = parseFloat(tEl.value), P = parseFloat(pEl.value);
    if (isNaN(Tc) || isNaN(P) || P <= 0 || Tc < -273.15) return;

    const Tk = Tc + 273.15;
    // Potential temperature theta = T * (1000 / P)^kappa  [Kelvin]
    const thetaK = Tk * Math.pow(1000.0 / P, kappa);
    const thetaC = thetaK - 273.15;

    thResEl.textContent = 'θ = ' + thetaK.toFixed(1) + ' K (' + thetaC.toFixed(1) + ' °C)';
    stResEl.textContent = 'Adiabatic Compression: Air parcel at ' + P + ' hPa warms from ' + Tc + '°C to ' + thetaC.toFixed(1) + '°C if brought to 1000 hPa surface';
  }

  tEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();