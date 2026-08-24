(() => {
  'use strict';
  const iEl = document.getElementById('fe-i'), tEl = document.getElementById('fe-t'), mEl = document.getElementById('fe-metal');
  const msResEl = document.getElementById('fe-res-mass'), chResEl = document.getElementById('fe-res-charge');

  const F = 96485.33; // C / mol e-

  function update() {
    const I = parseFloat(iEl.value), t_min = parseFloat(tEl.value);
    const parts = mEl.value.split('_');
    const M = parseFloat(parts[0]);
    const z = parseInt(parts[1], 10);

    if (isNaN(I) || isNaN(t_min) || isNaN(M) || isNaN(z) || I <= 0 || t_min <= 0) return;

    const t_sec = t_min * 60.0;
    // Total electric charge Q = I * t  [Coulombs]
    const Q_coulombs = I * t_sec;

    // Faraday's Law: m = ( Q * M ) / ( z * F )  [grams]
    const mass_g = (Q_coulombs * M) / (z * F);

    const molesDeposited = mass_g / M;
    const faradays = Q_coulombs / F;

    msResEl.textContent = 'Mass Yield m = ' + mass_g.toFixed(2) + ' g Plated Metal';
    chResEl.textContent = 'Total Charge Q = ' + Math.round(Q_coulombs).toLocaleString() + ' C (' + faradays.toFixed(4) + ' Faradays | ' + molesDeposited.toFixed(4) + ' mol Deposited @ I = ' + I + ' A)';
  }

  [iEl, tEl].forEach(el => el.addEventListener('input', update));
  mEl.addEventListener('change', update);
  update();
})();