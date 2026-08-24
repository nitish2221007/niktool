(() => {
  'use strict';
  const vrEl = document.getElementById('flr-vr'), chiEl = document.getElementById('flr-chi');
  const nuResEl = document.getElementById('flr-res-nu'), mcResEl = document.getElementById('flr-res-mc');

  // Molar volume of toluene Vs = 106.3 cm^3 / mol; density of rubber rho = 1.0 g/cm^3
  const Vs = 106.3;
  const rho_p = 1.0;

  function update() {
    const vr = parseFloat(vrEl.value), chi = parseFloat(chiEl.value);
    if (isNaN(vr) || isNaN(chi) || vr <= 0 || vr >= 1) return;

    // Flory-Rehner equation:
    // nu_e = - [ ln(1 - vr) + vr + chi * vr^2 ] / [ Vs * ( vr^(1/3) - vr / 2 ) ]
    const numerator = -(Math.log(1 - vr) + vr + (chi * Math.pow(vr, 2)));
    const denominator = Vs * (Math.pow(vr, 1 / 3) - (vr / 2));
    const nu_e = numerator / denominator;
    const Mc = nu_e > 0 ? (rho_p / nu_e) : 0;

    nuResEl.textContent = (nu_e * 1e4).toFixed(2) + ' × 10⁻⁴ mol / cm³';
    mcResEl.textContent = 'M_c ≈ ' + Math.round(Mc).toLocaleString() + ' g / mol (Swelling Ratio Q = ' + (1 / vr).toFixed(1) + 'x)';
  }

  vrEl.addEventListener('input', update);
  chiEl.addEventListener('input', update);
  update();
})();