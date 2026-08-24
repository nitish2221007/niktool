(() => {
  'use strict';
  const nuEl = document.getElementById('pl-nu'), alEl = document.getElementById('pl-alpha'), daEl = document.getElementById('pl-dab');
  const prResEl = document.getElementById('pl-res-pr'), leResEl = document.getElementById('pl-res-le');

  function update() {
    const nu = parseFloat(nuEl.value), alpha = parseFloat(alEl.value), Dab = parseFloat(daEl.value);
    if (isNaN(nu) || isNaN(alpha) || isNaN(Dab) || nu <= 0 || alpha <= 0 || Dab <= 0) return;

    // Prandtl Number: Pr = nu / alpha
    const Pr = nu / alpha;

    // Schmidt Number: Sc = nu / Dab
    const Sc = nu / Dab;

    // Lewis Number: Le = Sc / Pr = alpha / Dab
    const Le = Sc / Pr;

    prResEl.textContent = 'Prandtl Pr = ' + Pr.toFixed(3) + ' | Schmidt Sc = ' + Sc.toFixed(3);
    leResEl.textContent = 'Lewis Number Le = ' + Le.toFixed(3) + ' (α/D_AB) | ' + (Math.abs(Le - 1.0) < 0.2 ? 'Thermal & concentration boundary layers identical (Le ≈ 1.0)' : (Le > 1 ? 'Heat diffuses faster than mass' : 'Mass diffuses faster than heat'));
  }

  [nuEl, alEl, daEl].forEach(el => el.addEventListener('input', update));
  update();
})();