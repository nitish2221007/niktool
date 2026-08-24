(() => {
  'use strict';
  const fEl = document.getElementById('ant-freq'), vfEl = document.getElementById('ant-vf');
  const cmEl = document.getElementById('ant-res-cm'), inEl = document.getElementById('ant-res-in'), lamEl = document.getElementById('ant-res-lambda');

  const c = 299.792458; // speed of light in mm*MHz (or million m/s / MHz => meters * MHz)

  function update() {
    const fMhz = parseFloat(fEl.value), vf = parseFloat(vfEl.value);
    if (isNaN(fMhz) || isNaN(vf) || fMhz <= 0 || vf <= 0 || vf > 1.0) return;

    // Full wavelength lambda (meters) = (c / f)
    const lambdaM = c / fMhz;
    const lambdaCm = lambdaM * 100;
    // Quarter wave length = (lambda / 4) * VF
    const qWaveM = (lambdaM / 4) * vf;
    const qWaveCm = qWaveM * 100;
    const qWaveInches = qWaveM * 39.3701;

    cmEl.textContent = qWaveCm.toFixed(2) + ' cm';
    inEl.textContent = qWaveInches.toFixed(2) + ' Inches';
    lamEl.textContent = lambdaCm >= 100 ? (lambdaCm / 100).toFixed(2) + ' meters' : lambdaCm.toFixed(1) + ' cm';
  }

  fEl.addEventListener('input', update);
  vfEl.addEventListener('input', update);
  update();
})();