(() => {
  'use strict';
  const lEl = document.getElementById('tm-l'), kEl = document.getElementById('tm-k'), deEl = document.getElementById('tm-deff');
  const etResEl = document.getElementById('tm-res-eta'), phResEl = document.getElementById('tm-res-phi');

  function update() {
    const L_mm = parseFloat(lEl.value), k = parseFloat(kEl.value), Deff = parseFloat(deEl.value);
    if (isNaN(L_mm) || isNaN(k) || isNaN(Deff) || L_mm <= 0 || k <= 0 || Deff <= 0) return;

    const L_m = L_mm * 1e-3;

    // Thiele modulus: Phi = L * sqrt( k / Deff )
    const Phi = L_m * Math.sqrt(k / Deff);

    // Effectiveness factor for slab geometry: eta = tanh(Phi) / Phi
    const eta = Math.tanh(Phi) / Phi;

    let regime = '', color = '#22543d';
    if (Phi < 0.5) {
      regime = 'SURFACE REACTION LIMITED (η ≈ 1.0: Catalyst pores fully utilized)';
      color = '#22543d';
    } else if (Phi <= 2.0) {
      regime = 'INTERMEDIATE REGIME (Moderate pore diffusion resistance)';
      color = '#ea580c';
    } else {
      regime = 'STRONG PORE DIFFUSION LIMITATION (η ≈ 1/Φ: Reactants consumed at outer rim)';
      color = '#c53030';
    }

    etResEl.textContent = 'Effectiveness η = ' + eta.toFixed(3) + ' (' + (eta * 100).toFixed(1) + '%)';
    etResEl.style.color = color;
    phResEl.textContent = 'Thiele Modulus Φ = ' + Phi.toFixed(2) + ' (' + regime + ')';
    phResEl.style.color = color;
  }

  [lEl, kEl, deEl].forEach(el => el.addEventListener('input', update));
  update();
})();