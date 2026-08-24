(() => {
  'use strict';
  const tEl = document.getElementById('wien-temp');
  const lEl = document.getElementById('wien-res-lambda'), bEl = document.getElementById('wien-res-band');

  const b = 2.897771955e-3; // Wien's displacement constant (m·K)

  function update() {
    const T = parseFloat(tEl.value);
    if (isNaN(T) || T <= 0) return;

    // lambda_max = b / T (in meters)
    const lambdaM = b / T;
    const lambdaNm = lambdaM * 1e9;

    lEl.textContent = lambdaNm >= 1000 ? (lambdaNm / 1000).toFixed(2) + ' μm' : lambdaNm.toFixed(1) + ' nm';

    if (lambdaNm < 10) bEl.textContent = 'Gamma / X-Rays';
    else if (lambdaNm < 400) bEl.textContent = 'Ultraviolet (UV)';
    else if (lambdaNm <= 700) bEl.textContent = 'Visible Optical Light';
    else if (lambdaNm <= 1000000) bEl.textContent = 'Infrared (Thermal IR)';
    else bEl.textContent = 'Microwaves / Radio';
  }

  tEl.addEventListener('input', update);
  update();
})();