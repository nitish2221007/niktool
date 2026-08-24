(() => {
  'use strict';
  const aEl = document.getElementById('ssd-a'), lamEl = document.getElementById('ssd-lambda'), lEl = document.getElementById('ssd-l');
  const wResEl = document.getElementById('ssd-res-width'), thResEl = document.getElementById('ssd-res-theta');

  function update() {
    const aUm = parseFloat(aEl.value), lamNm = parseFloat(lamEl.value), lM = parseFloat(lEl.value);
    if (isNaN(aUm) || isNaN(lamNm) || isNaN(lM) || aUm <= 0 || lamNm <= 0 || lM <= 0) return;

    const aM = aUm * 1e-6;
    const lamM = lamNm * 1e-9;

    // First minimum: sin(theta) = lambda / a
    const sinTheta = lamM / aM;
    if (sinTheta > 1.0) {
      wResEl.textContent = 'Slit too narrow (Diffuses everywhere)';
      thResEl.textContent = 'θ₁ > 90°';
      return;
    }

    const rad = Math.asin(sinTheta);
    const deg = (rad * 180) / Math.PI;

    // Central peak width w = 2 * L * tan(theta)
    const widthM = 2 * lM * Math.tan(rad);
    const widthMm = widthM * 1000;
    const widthCm = widthM * 100;

    wResEl.textContent = widthMm >= 1000 ? widthM.toFixed(2) + ' meters' : widthMm.toFixed(2) + ' mm (' + widthCm.toFixed(2) + ' cm)';
    thResEl.textContent = deg.toFixed(3) + '° (' + (rad * 1000).toFixed(2) + ' mrad)';
  }

  [aEl, lamEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();