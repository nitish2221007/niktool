(() => {
  'use strict';
  const dEl = document.getElementById('qec-d'), pEl = document.getElementById('qec-pphys');
  const plResEl = document.getElementById('qec-res-pl'), qbResEl = document.getElementById('qec-res-qubits');

  const p_threshold = 0.010; // 1.0% surface code fault-tolerant threshold

  function update() {
    const d = parseInt(dEl.value, 10), p_phys = parseFloat(pEl.value);
    if (isNaN(d) || isNaN(p_phys) || d < 3 || p_phys <= 0 || p_phys >= 0.5) return;

    // Total physical qubits in rotated surface code N_phys = 2 * d^2 - 1
    const n_data = Math.pow(d, 2);
    const n_ancilla = Math.pow(d, 2) - 1;
    const n_total = (2 * Math.pow(d, 2)) - 1;

    // Error correction capability t = (d - 1) / 2
    const t_errors = Math.floor((d - 1) / 2);

    // Logical error rate scaling: P_L approx = 0.1 * ( p_phys / p_threshold )^( (d + 1)/2 )
    const exponent = (d + 1.0) / 2.0;
    const ratio = p_phys / p_threshold;
    const P_L = 0.1 * Math.pow(ratio, exponent);

    let status = '';
    let color = '#22543d';

    if (p_phys < p_threshold) {
      const suppressionFactor = p_phys / P_L;
      status = 'FAULT-TOLERANT REGIME (p < 1.0% Threshold: Distance d=' + d + ' achieves ' + Math.round(suppressionFactor).toLocaleString() + '× exponential error suppression)';
      color = '#22543d';
    } else {
      status = 'ABOVE THRESHOLD (p ≥ 1.0%: Increasing code distance increases logical error rate!)';
      color = '#c53030';
    }

    plResEl.textContent = 'P_L ≈ ' + P_L.toExponential(2) + ' / cycle (d = ' + d + ')';
    plResEl.style.color = color;
    qbResEl.textContent = status + ' | ' + n_total + ' Physical Qubits (' + n_data + ' Data + ' + n_ancilla + ' Ancilla to correct ' + t_errors + ' arbitrary errors)';
    qbResEl.style.color = color;
  }

  dEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();