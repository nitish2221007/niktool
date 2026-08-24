(() => {
  'use strict';
  const posEl = document.getElementById('w2-pos'), negEl = document.getElementById('w2-neg'), kEl = document.getElementById('w2-k');
  const lsResEl = document.getElementById('w2-res-loss'), pbResEl = document.getElementById('w2-res-prob');

  function update() {
    const dot_pos = parseFloat(posEl.value), dot_neg = parseFloat(negEl.value), K = parseFloat(kEl.value);
    if (isNaN(dot_pos) || isNaN(dot_neg) || isNaN(K) || K < 1) return;

    // Sigmoid of positive pair: sigma(pos)
    const sigma_pos = 1.0 / (1.0 + Math.exp(-dot_pos));
    const loss_pos = -Math.log(Math.max(1e-15, sigma_pos));

    // Sigmoid of negative pair: sigma(-neg)
    const sigma_neg = 1.0 / (1.0 + Math.exp(dot_neg)); // sigma(-dot_neg)
    const loss_neg = -Math.log(Math.max(1e-15, sigma_neg));

    // Total loss: L = loss_pos + K * loss_neg
    const total_loss = loss_pos + (K * loss_neg);

    lsResEl.textContent = 'SGNS Loss ℒ = ' + total_loss.toFixed(3);
    pbResEl.textContent = 'Positive P = ' + (sigma_pos * 100).toFixed(1) + '% | Neg Rejection = ' + (sigma_neg * 100).toFixed(1) + '% (K = ' + K + ' negative samples)';
  }

  [posEl, negEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();