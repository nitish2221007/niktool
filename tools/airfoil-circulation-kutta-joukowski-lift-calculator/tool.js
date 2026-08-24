(() => {
  'use strict';
  const rEl = document.getElementById('kj-rho'), vEl = document.getElementById('kj-v'), gEl = document.getElementById('kj-gamma');
  const lResEl = document.getElementById('kj-res-lift'), clResEl = document.getElementById('kj-res-cl');

  function update() {
    const rho = parseFloat(rEl.value), V = parseFloat(vEl.value), gamma = parseFloat(gEl.value);
    if (isNaN(rho) || isNaN(V) || isNaN(gamma) || rho <= 0 || V <= 0 || gamma <= 0) return;

    const Lprime = rho * V * gamma;
    const lbf_ft = Lprime * 0.068521766;
    const Cl = (2 * gamma) / (V * 1.0);

    lResEl.textContent = Lprime.toFixed(1) + ' N / m (' + lbf_ft.toFixed(1) + ' lbf/ft)';
    clResEl.textContent = 'C_l = ' + Cl.toFixed(3) + ' (for 1.0m Chord: Γ = ' + gamma.toFixed(1) + ' m²/s @ ' + V + ' m/s)';
  }

  [rEl, vEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();