(() => {
  'use strict';
  const mEl = document.getElementById('jmp-mass'), vEl = document.getElementById('jmp-v'), dEl = document.getElementById('jmp-d');
  const hResEl = document.getElementById('jmp-res-ht'), gResEl = document.getElementById('jmp-res-grf');

  const g = 9.80665;

  function update() {
    const mass = parseFloat(mEl.value), vTakeoff = parseFloat(vEl.value), dPushCm = parseFloat(dEl.value);
    if (isNaN(mass) || isNaN(vTakeoff) || isNaN(dPushCm) || mass <= 0 || vTakeoff <= 0 || dPushCm <= 0) return;

    // Jump height h = v^2 / (2*g)  [meters]
    const hMeters = Math.pow(vTakeoff, 2) / (2 * g);
    const hCm = hMeters * 100;
    const hInches = hCm / 2.54;

    // Flight hang time = 2 * (v / g)
    const hangTime = 2 * (vTakeoff / g);

    // Push-off acceleration a = v^2 / (2 * d_push)
    const dPushM = dPushCm / 100;
    const accel = Math.pow(vTakeoff, 2) / (2 * dPushM);

    // Ground reaction force GRF = mass * (g + a)
    const GRF = mass * (g + accel);
    const bwRatio = GRF / (mass * g);

    hResEl.textContent = hCm.toFixed(1) + ' cm (' + hInches.toFixed(1) + ' inches Jump)';
    gResEl.textContent = 'Peak GRF: ' + Math.round(GRF).toLocaleString() + ' N (' + bwRatio.toFixed(2) + '× Bodyweight) | Hang Time: ' + hangTime.toFixed(3) + ' s';
  }

  [mEl, vEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();