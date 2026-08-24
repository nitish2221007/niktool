(() => {
  'use strict';
  const vEl = document.getElementById('rn-v'), dEl = document.getElementById('rn-d');
  const rhoEl = document.getElementById('rn-rho'), muEl = document.getElementById('rn-mu');
  const reResEl = document.getElementById('rn-res-re'), fResEl = document.getElementById('rn-res-f');

  function update() {
    const v = parseFloat(vEl.value), D = parseFloat(dEl.value);
    const rho = parseFloat(rhoEl.value), mu = parseFloat(muEl.value);

    if (isNaN(v) || isNaN(D) || isNaN(rho) || isNaN(mu) || v <= 0 || D <= 0 || rho <= 0 || mu <= 0) return;

    // Reynolds Number: Re = ( rho * v * D ) / mu
    const Re = (rho * v * D) / mu;

    let regime = '', f = 0, color = '#22543d';
    if (Re < 2300) {
      regime = 'LAMINAR FLOW (Re < 2,300)';
      f = 64.0 / Re;
      color = '#22543d';
    } else if (Re <= 4000) {
      regime = 'TRANSITIONAL FLOW (2,300 ≤ Re ≤ 4,000)';
      f = 0.035;
      color = '#ea580c';
    } else {
      regime = 'TURBULENT FLOW (Re > 4,000)';
      // Blasius formula for smooth pipes: f = 0.3164 * Re^(-0.25)
      f = 0.3164 * Math.pow(Re, -0.25);
      color = '#22543d';
    }

    // Darcy-Weisbach head loss per meter: h_f/L = f * (v^2) / (2 * g * D)
    const g = 9.80665;
    const hf_per_L = f * (Math.pow(v, 2) / (2.0 * g * D));

    reResEl.textContent = 'Re = ' + Math.round(Re).toLocaleString() + ' (' + regime.split(' (')[0] + ')';
    reResEl.style.color = color;
    fResEl.textContent = 'Darcy Friction f = ' + f.toFixed(4) + ' | Unit Head Loss h_f/L = ' + hf_per_L.toFixed(3) + ' m/m (' + regime + ')';
  }

  [vEl, dEl, rhoEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();