(() => {
  'use strict';
  const sfEl = document.getElementById('qk-sift'), erEl = document.getElementById('qk-err');
  const qbResEl = document.getElementById('qk-res-qber'), kyResEl = document.getElementById('qk-res-key');

  // Binary Shannon entropy: H2(p) = - p*log2(p) - (1-p)*log2(1-p)
  function H2(p) {
    if (p <= 0 || p >= 1) return 0;
    return - (p * Math.log2(p)) - ((1.0 - p) * Math.log2(1.0 - p));
  }

  function update() {
    const N_sift = parseFloat(sfEl.value), N_err = parseFloat(erEl.value);
    if (isNaN(N_sift) || isNaN(N_err) || N_sift <= 0 || N_err < 0 || N_err > N_sift) return;

    // QBER = N_error / N_sifted
    const QBER = N_err / N_sift;
    const QBER_pct = QBER * 100.0;

    // Shor-Preskill security formula for one-way classical post-processing:
    // Secret Key Fraction: R_key = max(0, 1 - 2 * H2(QBER))
    const h2_val = H2(QBER);
    const R_key = Math.max(0.0, 1.0 - (2.0 * h2_val));
    const secure_bits = Math.round(R_key * N_sift);

    let status = '', color = '#22543d';
    if (QBER_pct < 11.0) {
      status = 'SECURE QUANTUM KEY (QBER < 11.0%: Information reconciliation & privacy amplification succeed ✓)';
      color = '#22543d';
    } else {
      status = 'UNSECURE: EAVESDROPPER DETECTED / HIGH NOISE (QBER ≥ 11.0%: Key discarded ✗)';
      color = '#c53030';
    }

    qbResEl.textContent = 'QBER = ' + QBER_pct.toFixed(2) + '% (' + (QBER_pct < 11.0 ? 'SECURE ✓' : 'UNSECURE ✗') + ')';
    qbResEl.style.color = color;
    kyResEl.textContent = 'Secret Key Fraction = ' + (R_key * 100).toFixed(1) + '% (' + secure_bits.toLocaleString() + ' Final Secure Bits | ' + status + ')';
  }

  sfEl.addEventListener('input', update);
  erEl.addEventListener('input', update);
  update();
})();