(() => {
  'use strict';
  const tEl = document.getElementById('cvd-temp'), cEl = document.getElementById('cvd-cg'), hEl = document.getElementById('cvd-hg');
  const rResEl = document.getElementById('cvd-res-rate'), rgResEl = document.getElementById('cvd-res-reg');

  const R = 8.314;
  const Ea_j = 150000; // 150 kJ/mol activation energy for SiH4 decomposition
  const k0 = 1.2e6; // pre-exponential reaction constant

  function update() {
    const Tc = parseFloat(tEl.value), Cg = parseFloat(cEl.value), hg = parseFloat(hEl.value);
    if (isNaN(Tc) || isNaN(Cg) || isNaN(hg) || Tc < 200 || Cg <= 0 || hg <= 0) return;

    const Tk = Tc + 273.15;
    // Surface reaction rate coefficient ks = k0 * exp(-Ea / RT)  [m / s]
    const ks = k0 * Math.exp(-Ea_j / (R * Tk));

    // Combined flux J = (hg * ks / (hg + ks)) * Cg  [mol / m^2 * s]
    const J = ((hg * ks) / (hg + ks)) * Cg;

    // Growth rate in nm/min: growth = (J * M_si / rho_si) * 1e9 * 60
    // M_si = 0.028085 kg/mol, rho_si = 2330 kg/m^3 => M/rho = 1.205e-5 m^3/mol
    const growthNmMin = J * 1.205e-5 * 1e9 * 60;

    rResEl.textContent = growthNmMin.toFixed(1) + ' nm / min Growth Rate';

    if (ks < hg * 0.5) {
      rgResEl.textContent = 'SURFACE-REACTION CONTROL (ks << hg): Excellent Conformal Step Coverage across Trenches';
      rgResEl.style.color = '#22543d';
    } else if (ks > hg * 2.0) {
      rgResEl.textContent = 'MASS-TRANSFER CONTROL (ks >> hg): Gas Flow Limited - Risk of Non-Uniform Overhangs';
      rgResEl.style.color = '#d97706';
    } else {
      rgResEl.textContent = 'TRANSITIONAL REGIME (Mixed Surface & Gas Boundary Layer Resistance)';
      rgResEl.style.color = '#2563eb';
    }
  }

  [tEl, cEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();