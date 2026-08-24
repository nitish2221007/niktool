(() => {
  'use strict';
  const qkEl = document.getElementById('at-qk'), dkEl = document.getElementById('at-dk');
  const atResEl = document.getElementById('at-res-attn'), scResEl = document.getElementById('at-res-scale');

  function update() {
    const scores = qkEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const d_k = parseFloat(dkEl.value);

    if (scores.length === 0 || isNaN(d_k) || d_k <= 0) return;

    // Scale by sqrt(d_k):
    const sqrt_dk = Math.sqrt(d_k);
    const scaled_scores = scores.map(s => s / sqrt_dk);

    // Numerically stable softmax:
    const max_s = Math.max(...scaled_scores);
    const exp_s = scaled_scores.map(s => Math.exp(s - max_s));
    const sum_exp = exp_s.reduce((a, b) => a + b, 0);

    const weights = exp_s.map(e => e / sum_exp);
    const weightsStr = weights.map(w => (w * 100).toFixed(1) + '%').join(', ');
    const scaledStr = scaled_scores.map(s => s.toFixed(2)).join(', ');

    atResEl.textContent = 'Attention = [' + weightsStr + ']';
    scResEl.textContent = 'Scaling 1/√d_k = ' + (1.0/sqrt_dk).toFixed(3) + ' | Scaled Scores: [' + scaledStr + '] (d_k = ' + d_k + ')';
  }

  qkEl.addEventListener('input', update);
  dkEl.addEventListener('input', update);
  update();
})();