(() => {
  'use strict';
  const wEl = document.getElementById('cpw-w'), sEl = document.getElementById('cpw-s'), erEl = document.getElementById('cpw-er');
  const z0ResEl = document.getElementById('cpw-res-z0'), efResEl = document.getElementById('cpw-res-eff');

  // Complete elliptic integral ratio K(k) / K'(k) approximation (Hilberg formula)
  function EllipticRatio(k) {
    const k_prime = Math.sqrt(1.0 - Math.pow(k, 2));
    if (k >= 0.70710678) {
      return Math.PI / Math.log(2 * (1 + Math.sqrt(k)) / (1 - Math.sqrt(k)));
    } else {
      return (1.0 / Math.PI) * Math.log(2 * (1 + Math.sqrt(k_prime)) / (1 - Math.sqrt(k_prime)));
    }
  }

  function update() {
    const w = parseFloat(wEl.value), s = parseFloat(sEl.value), eps_r = parseFloat(erEl.value);
    if (isNaN(w) || isNaN(s) || isNaN(eps_r) || w <= 0 || s <= 0 || eps_r < 1.0) return;

    // Aspect ratio modulus k = w / (w + 2*s)
    const k = w / (w + (2 * s));

    // Effective permittivity for infinitely thick CPW substrate: eps_eff = (eps_r + 1) / 2
    const eps_eff = (eps_r + 1.0) / 2.0;

    // Ratio K(k) / K'(k)
    const K_ratio = EllipticRatio(k);

    // CPW characteristic impedance Z0 = (30 * pi / sqrt(eps_eff)) * ( 1 / (K(k)/K'(k)) )
    const Z0 = (30 * Math.PI) / (Math.sqrt(eps_eff) * K_ratio);

    z0ResEl.textContent = 'Z₀ = ' + Z0.toFixed(1) + ' Ω Characteristic Impedance';
    efResEl.textContent = 'ε_eff = ' + eps_eff.toFixed(2) + ' (Modulus k = ' + k.toFixed(3) + ' | Ground Gap s = ' + s + ' mm, Trace w = ' + w + ' mm)';
  }

  [wEl, sEl, erEl].forEach(el => el.addEventListener('input', update));
  update();
})();