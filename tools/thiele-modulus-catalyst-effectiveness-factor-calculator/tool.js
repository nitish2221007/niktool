(() => {
  'use strict';
  const lEl = document.getElementById('thl-l'), kEl = document.getElementById('thl-k'), dEl = document.getElementById('thl-deff');
  const pResEl = document.getElementById('thl-res-phi'), eResEl = document.getElementById('thl-res-eta');

  function update() {
    const L_mm = parseFloat(lEl.value), k = parseFloat(kEl.value), Deff = parseFloat(dEl.value);
    if (isNaN(L_mm) || isNaN(k) || isNaN(Deff) || L_mm <= 0 || k <= 0 || Deff <= 0) return;

    const L_m = L_mm / 1000;
    // Thiele modulus phi = L * sqrt( k / Deff )
    const phi = L_m * Math.sqrt(k / Deff);

    // Effectiveness factor for slab geometry: eta = tanh(phi) / phi
    const eta = Math.tanh(phi) / phi;
    const etaPct = eta * 100;

    pResEl.textContent = 'ϕ = ' + phi.toFixed(2) + ' (Thiele Modulus)';

    let regime = '';
    if (phi < 0.3) {
      regime = 'η = ' + eta.toFixed(3) + ' (' + etaPct.toFixed(1) + '%: Reaction Limited - Pellet Fully Active)';
      eResEl.style.color = '#22543d';
    } else if (phi <= 3.0) {
      regime = 'η = ' + eta.toFixed(3) + ' (' + etaPct.toFixed(1) + '%: Transitional Mixed Control)';
      eResEl.style.color = '#d97706';
    } else {
      regime = 'η = ' + eta.toFixed(3) + ' (' + etaPct.toFixed(1) + '%: Strong Pore Diffusion Resistance - Interior Starved)';
      eResEl.style.color = '#c53030';
    }
    eResEl.textContent = regime;
  }

  [lEl, kEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();