(() => {
  'use strict';
  const z1El = document.getElementById('us-z1'), z2El = document.getElementById('us-z2');
  const rResEl = document.getElementById('us-res-r'), tResEl = document.getElementById('us-res-t');

  function update() {
    const Z1 = parseFloat(z1El.value), Z2 = parseFloat(z2El.value);
    if (isNaN(Z1) || isNaN(Z2) || Z1 <= 0 || Z2 <= 0) return;

    // Amplitude reflection coefficient: r_amp = (Z2 - Z1) / (Z2 + Z1)
    const r_amp = (Z2 - Z1) / (Z2 + Z1);

    // Intensity reflection coefficient: R = r_amp^2
    const R = Math.pow(r_amp, 2);
    const R_pct = R * 100.0;

    // Intensity transmission coefficient: T = 1 - R
    const T = 1.0 - R;
    const T_pct = T * 100.0;

    // Echo amplitude in dB: 10 * log10(R)
    const echo_dB = R > 0 ? 10.0 * Math.log10(R) : -100.0;

    let eval_text = '';
    if (R_pct >= 99.0) {
      eval_text = 'COMPLETE ACOUSTIC REFLECTION (Air boundary: total beam blocked, gel required!)';
    } else if (R_pct >= 30.0) {
      eval_text = 'STRONG SPECULAR REFLECTOR (Bone boundary: bright echo with posterior acoustic shadow)';
    } else if (R_pct >= 1.0) {
      eval_text = 'MODERATE BOUNDARY (Organ parenchyma interfaces: kidney/liver capsules)';
    } else {
      eval_text = 'MINIMAL REFLECTION (Fluid/blood interface: near-complete sound transmission)';
    }

    rResEl.textContent = 'Intensity Reflected R = ' + R_pct.toFixed(1) + '% (Echo Signal)';
    tResEl.textContent = 'Transmitted T = ' + T_pct.toFixed(1) + '% | ' + eval_text + ' (' + echo_dB.toFixed(1) + ' dB @ Z₁=' + Z1 + ', Z₂=' + Z2 + ' MRayl)';
  }

  z1El.addEventListener('input', update);
  z2El.addEventListener('input', update);
  update();
})();