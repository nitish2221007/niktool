(() => {
  'use strict';
  const i0El = document.getElementById('ml-i0'), thEl = document.getElementById('ml-th');
  const trResEl = document.getElementById('ml-res-trans'), rtResEl = document.getElementById('ml-res-ratio');

  function update() {
    const I0 = parseFloat(i0El.value), theta_deg = parseFloat(thEl.value);
    if (isNaN(I0) || isNaN(theta_deg) || I0 < 0) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const cos_theta = Math.cos(theta_rad);

    // Malus's Law: I = I0 * cos^2(theta)
    const I_trans = I0 * Math.pow(cos_theta, 2);
    const frac = (I_trans / I0) * 100.0;
    const dB_loss = I_trans > 0 ? 10.0 * Math.log10(I_trans / I0) : -Infinity;

    trResEl.textContent = 'Transmitted I = ' + I_trans.toFixed(2) + ' (' + frac.toFixed(1) + '% I₀)';
    rtResEl.textContent = 'cos(' + theta_deg + '°) = ' + cos_theta.toFixed(3) + ' | E-Field Amplitude = ' + (Math.abs(cos_theta) * 100).toFixed(1) + '% | Loss = ' + (isFinite(dB_loss) ? dB_loss.toFixed(2) + ' dB' : '-∞ dB (Crossed Polarizers)');
  }

  [i0El, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();