(() => {
  'use strict';
  const p1El = document.getElementById('sh-p1'), p2El = document.getElementById('sh-p2');
  const p3El = document.getElementById('sh-p3'), p4El = document.getElementById('sh-p4');
  const hResEl = document.getElementById('sh-res-h'), efResEl = document.getElementById('sh-res-eff');

  function update() {
    const rawProbs = [
      parseFloat(p1El.value) || 0,
      parseFloat(p2El.value) || 0,
      parseFloat(p3El.value) || 0,
      parseFloat(p4El.value) || 0
    ];

    const sum = rawProbs.reduce((acc, v) => acc + v, 0);
    if (sum <= 0) return;

    // Normalize probabilities:
    const probs = rawProbs.map(p => p / sum);

    // Shannon Entropy: H = - sum( p * log2(p) )
    let H = 0;
    probs.forEach(p => {
      if (p > 0) {
        H -= p * Math.log2(p);
      }
    });

    const H_max = Math.log2(probs.length);
    const efficiency = (H / H_max) * 100.0;
    const redundancy = 100.0 - efficiency;

    hResEl.textContent = 'Entropy H(X) = ' + H.toFixed(3) + ' Bits / Symbol';
    efResEl.textContent = 'Max H_max = ' + H_max.toFixed(3) + ' Bits | Efficiency = ' + efficiency.toFixed(1) + '% | Redundancy = ' + redundancy.toFixed(1) + '% (Sum = ' + sum.toFixed(2) + ')';
  }

  [p1El, p2El, p3El, p4El].forEach(el => el.addEventListener('input', update));
  update();
})();