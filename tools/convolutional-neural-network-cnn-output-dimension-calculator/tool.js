(() => {
  'use strict';
  const wEl = document.getElementById('cn-w'), kEl = document.getElementById('cn-k');
  const pEl = document.getElementById('cn-p'), sEl = document.getElementById('cn-s');
  const cinEl = document.getElementById('cn-cin'), coutEl = document.getElementById('cn-cout');
  const otResEl = document.getElementById('cn-res-out'), prResEl = document.getElementById('cn-res-param');

  function update() {
    const W = parseFloat(wEl.value), K = parseFloat(kEl.value);
    const P = parseFloat(pEl.value), S = parseFloat(sEl.value);
    const Cin = parseFloat(cinEl.value), Cout = parseFloat(coutEl.value);

    if (isNaN(W) || isNaN(K) || isNaN(P) || isNaN(S) || isNaN(Cin) || isNaN(Cout) || W <= 0 || K <= 0 || S <= 0 || Cin <= 0 || Cout <= 0) return;

    // Output dimension formula: O = floor( (W - K + 2*P) / S ) + 1
    const O = Math.floor((W - K + (2.0 * P)) / S) + 1;

    // Trainable parameters = ( K * K * Cin * Cout ) + Cout (biases)
    const weights = K * K * Cin * Cout;
    const biases = Cout;
    const totalParams = weights + biases;

    // Total Multiply-Accumulate operations (MACs) approx = O * O * K * K * Cin * Cout
    const MACs = O * O * weights;
    const GFLOPs = (2.0 * MACs) / 1e9;

    otResEl.textContent = 'Output Map = ' + O + ' × ' + O + ' × ' + Cout;
    prResEl.textContent = 'Parameters = ' + totalParams.toLocaleString() + ' Weights (' + (totalParams/1000).toFixed(1) + 'k) | Computation ≈ ' + GFLOPs.toFixed(2) + ' GFLOPs';
  }

  [wEl, kEl, pEl, sEl, cinEl, coutEl].forEach(el => el.addEventListener('input', update));
  update();
})();