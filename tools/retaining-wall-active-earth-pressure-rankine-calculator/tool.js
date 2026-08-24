(() => {
  'use strict';
  const pEl = document.getElementById('rw-phi'), gEl = document.getElementById('rw-gamma'), hEl = document.getElementById('rw-h');
  const paResEl = document.getElementById('rw-res-pa'), kaResEl = document.getElementById('rw-res-ka'), aResEl = document.getElementById('rw-res-arm');

  function update() {
    const phiDeg = parseFloat(pEl.value), gamma = parseFloat(gEl.value), H = parseFloat(hEl.value);
    if (isNaN(phiDeg) || isNaN(gamma) || isNaN(H) || phiDeg <= 0 || phiDeg >= 90 || gamma <= 0 || H <= 0) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const sinPhi = Math.sin(phiRad);

    // K_a = (1 - sin(phi)) / (1 + sin(phi))
    const Ka = (1 - sinPhi) / (1 + sinPhi);

    // Total resultant active thrust P_a = 0.5 * Ka * gamma * H^2 (kN per meter of wall length)
    const Pa = 0.5 * Ka * gamma * Math.pow(H, 2);
    // Line of action is at H / 3 from base
    const arm = H / 3;

    paResEl.textContent = Pa.toFixed(2) + ' kN / m of wall';
    kaResEl.textContent = 'K_a = ' + Ka.toFixed(3);
    aResEl.textContent = arm.toFixed(2) + ' m above base (H / 3)';
  }

  [pEl, gEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();