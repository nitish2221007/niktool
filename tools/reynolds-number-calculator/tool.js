(() => {
  'use strict';
  const rhoEl = document.getElementById('re-rho'), vEl = document.getElementById('re-vel');
  const dEl = document.getElementById('re-diam'), muEl = document.getElementById('re-visc');
  const reValEl = document.getElementById('re-res-val'), regEl = document.getElementById('re-res-regime');

  function update() {
    const rho = parseFloat(rhoEl.value), v = parseFloat(vEl.value), D = parseFloat(dEl.value), mu = parseFloat(muEl.value);
    if (isNaN(rho) || isNaN(v) || isNaN(D) || isNaN(mu) || rho <= 0 || v <= 0 || D <= 0 || mu <= 0) return;

    // Re = (rho * v * D) / mu
    const Re = (rho * v * D) / mu;

    reValEl.textContent = Math.round(Re).toLocaleString();

    if (Re < 2300) {
      regEl.textContent = 'Laminar Flow (Smooth, streamlined layers)';
      regEl.style.color = '#22543d';
    } else if (Re <= 4000) {
      regEl.textContent = 'Transitional Flow (Unstable boundary layer)';
      regEl.style.color = '#d97706';
    } else {
      regEl.textContent = 'Turbulent Flow (Vortices & chaotic mixing)';
      regEl.style.color = '#c53030';
    }
  }

  [rhoEl, vEl, dEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();