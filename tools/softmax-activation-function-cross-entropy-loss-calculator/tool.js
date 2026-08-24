(() => {
  'use strict';
  const lgEl = document.getElementById('sm-logits'), trEl = document.getElementById('sm-true');
  const pbResEl = document.getElementById('sm-res-probs'), lsResEl = document.getElementById('sm-res-loss');

  function update() {
    const logits = lgEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const targetIdx = parseInt(trEl.value, 10) - 1; // 0-based

    if (logits.length < 2 || targetIdx < 0 || targetIdx >= logits.length) return;

    // Numerically stable softmax: subtract max(z)
    const max_z = Math.max(...logits);
    const exp_z = logits.map(z => Math.exp(z - max_z));
    const sum_exp = exp_z.reduce((a, b) => a + b, 0);

    const probs = exp_z.map(e => e / sum_exp);
    const target_prob = probs[targetIdx];

    // Cross entropy loss = -ln(target_prob)
    const loss = -Math.log(Math.max(1e-15, target_prob));

    const probStr = probs.map(p => (p * 100).toFixed(1) + '%').join(', ');

    pbResEl.textContent = 'P = [' + probStr + ']';
    lsResEl.textContent = 'Cross-Entropy ℒ = ' + loss.toFixed(3) + ' | Target Class ' + (targetIdx + 1) + ' Prob = ' + (target_prob * 100).toFixed(1) + '%';
  }

  lgEl.addEventListener('input', update);
  trEl.addEventListener('input', update);
  update();
})();