(() => {
  'use strict';
  const n1El = document.getElementById('dt-n1'), n2El = document.getElementById('dt-n2');
  const gnResEl = document.getElementById('dt-res-gini'), enResEl = document.getElementById('dt-res-ent');

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || (n1 + n2) === 0) return;

    const total = n1 + n2;
    const p1 = n1 / total;
    const p2 = n2 / total;

    // Gini Impurity: I_G = 1 - (p1^2 + p2^2)
    const gini = 1.0 - (Math.pow(p1, 2) + Math.pow(p2, 2));

    // Shannon Entropy: H = -( p1 * log2(p1) + p2 * log2(p2) )
    let entropy = 0;
    if (p1 > 0) entropy -= p1 * (Math.log(p1) / Math.log(2.0));
    if (p2 > 0) entropy -= p2 * (Math.log(p2) / Math.log(2.0));

    gnResEl.textContent = 'Gini Impurity I_G = ' + gini.toFixed(3);
    enResEl.textContent = 'Shannon Entropy H = ' + entropy.toFixed(3) + ' Bits | p₁ = ' + (p1 * 100).toFixed(1) + '%, p₂ = ' + (p2 * 100).toFixed(1) + '% (Total: ' + total + ' samples)';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();