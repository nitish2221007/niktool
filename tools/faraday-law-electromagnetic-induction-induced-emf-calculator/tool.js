(() => {
  'use strict';
  const nEl = document.getElementById('fi-n'), p1El = document.getElementById('fi-p1');
  const p2El = document.getElementById('fi-p2'), dtEl = document.getElementById('fi-dt');
  const emfResEl = document.getElementById('fi-res-emf'), lzResEl = document.getElementById('fi-res-lenz');

  function update() {
    const N = parseInt(nEl.value, 10), phi1 = parseFloat(p1El.value);
    const phi2 = parseFloat(p2El.value), dt_ms = parseFloat(dtEl.value);

    if (isNaN(N) || isNaN(phi1) || isNaN(phi2) || isNaN(dt_ms) || N < 1 || dt_ms <= 0) return;

    const dt_s = dt_ms / 1000.0;
    const deltaPhi = phi2 - phi1; // Webers

    // Rate of change: dPhi / dt
    const rate_Wb_s = deltaPhi / dt_s;

    // Faraday's Law: EMF = -N * (dPhi / dt)  [Volts]
    const EMF = -N * rate_Wb_s;

    emfResEl.textContent = 'Induced EMF = ' + (EMF >= 0 ? '+' : '') + EMF.toFixed(1) + ' Volts';
    lzResEl.textContent = 'Flux Rate = ' + rate_Wb_s.toFixed(2) + ' Wb/s | N = ' + N + ' Turns (Lenz's Law opposes flux change of ' + (deltaPhi >= 0 ? '+' : '') + deltaPhi.toFixed(3) + ' Wb)';
  }

  [nEl, p1El, p2El, dtEl].forEach(el => el.addEventListener('input', update));
  update();
})();