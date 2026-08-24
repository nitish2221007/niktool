(() => {
  'use strict';
  const pEl = document.getElementById('kn-p'), tEl = document.getElementById('kn-t');
  const lEl = document.getElementById('kn-l'), dEl = document.getElementById('kn-d');
  const knResEl = document.getElementById('kn-res-kn'), rgResEl = document.getElementById('kn-res-reg');

  const kB = 1.380649e-23; // J / K (Boltzmann constant)

  function update() {
    const P = parseFloat(pEl.value), Tc = parseFloat(tEl.value);
    const LMm = parseFloat(lEl.value), dNm = parseFloat(dEl.value);

    if (isNaN(P) || isNaN(Tc) || isNaN(LMm) || isNaN(dNm) || P <= 0 || LMm <= 0 || dNm <= 0 || Tc < -273.15) return;

    const Tk = Tc + 273.15;
    const dM = dNm * 1e-9;
    const LM = LMm * 1e-3;

    // Molecular mean free path lambda = ( kB * T ) / ( sqrt(2) * pi * d^2 * P )  [meters]
    const lambdaM = (kB * Tk) / (Math.SQRT2 * Math.PI * Math.pow(dM, 2) * P);
    const lambdaNm = lambdaM * 1e9;
    const lambdaUm = lambdaM * 1e6;

    // Knudsen number Kn = lambda / L
    const Kn = lambdaM / LM;

    let regime = '';
    let color = '#22543d';

    if (Kn < 0.001) {
      regime = 'CONTINUUM FLOW (Kn < 0.001): Standard Navier-Stokes Equations with No-Slip Wall Boundary';
      color = '#22543d';
    } else if (Kn < 0.1) {
      regime = 'SLIP FLOW (0.001 < Kn < 0.1): Navier-Stokes with Maxwell Velocity Slip & Temperature Jump';
      color = '#2563eb';
    } else if (Kn < 10.0) {
      regime = 'TRANSITION REGIME (0.1 < Kn < 10): DSMC (Direct Simulation Monte Carlo) Particle Methods Required';
      color = '#d97706';
    } else {
      regime = 'FREE MOLECULAR FLOW (Kn > 10): Intermolecular Collisions Negligible - Collisionless Gas Kinetics';
      color = '#c53030';
    }

    knResEl.textContent = 'Kn = ' + (Kn < 0.01 ? Kn.toExponential(3) : Kn.toFixed(4)) + ' (Mean Free Path λ = ' + (lambdaUm < 1.0 ? lambdaNm.toFixed(1) + ' nm' : lambdaUm.toFixed(2) + ' μm)');
    rgResEl.textContent = regime;
    rgResEl.style.color = color;
  }

  [pEl, tEl, lEl].forEach(el => el.addEventListener('input', update));
  dEl.addEventListener('change', update);
  update();
})();