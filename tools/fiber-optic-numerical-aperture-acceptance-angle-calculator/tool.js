(() => {
  'use strict';
  const n1El = document.getElementById('fo-n1'), n2El = document.getElementById('fo-n2');
  const naResEl = document.getElementById('fo-res-na'), thResEl = document.getElementById('fo-res-theta'), crResEl = document.getElementById('fo-res-crit');

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 <= 1.0 || n2 <= 1.0 || n2 >= n1) {
      naResEl.textContent = 'Requires n_core > n_clad > 1.0';
      return;
    }

    // NA = sqrt(n1^2 - n2^2)
    const NA = Math.sqrt(Math.pow(n1, 2) - Math.pow(n2, 2));
    // Acceptance angle in air (n0 = 1.0): theta_max = asin(NA)
    const thMaxRad = Math.asin(Math.min(1.0, NA));
    const thMaxDeg = (thMaxRad * 180) / Math.PI;

    // Critical angle at core-cladding boundary: theta_crit = asin(n2 / n1)
    const thCritRad = Math.asin(n2 / n1);
    const thCritDeg = (thCritRad * 180) / Math.PI;

    naResEl.textContent = 'NA = ' + NA.toFixed(4);
    thResEl.textContent = thMaxDeg.toFixed(2) + '° (Full Cone = ' + (thMaxDeg * 2).toFixed(1) + '°)';
    crResEl.textContent = thCritDeg.toFixed(2) + '°';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();