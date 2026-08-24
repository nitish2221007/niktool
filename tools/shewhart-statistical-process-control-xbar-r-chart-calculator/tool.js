(() => {
  'use strict';
  const xbEl = document.getElementById('spc-xbar'), rbEl = document.getElementById('spc-rbar'), nEl = document.getElementById('spc-n');
  const xResEl = document.getElementById('spc-res-xlim'), rResEl = document.getElementById('spc-res-rlim');

  const CONSTS = {
    '3': { A2: 1.023, D3: 0.0,   D4: 2.574, d2: 1.693 },
    '4': { A2: 0.729, D3: 0.0,   D4: 2.282, d2: 2.059 },
    '5': { A2: 0.577, D3: 0.0,   D4: 2.114, d2: 2.326 },
    '6': { A2: 0.483, D3: 0.0,   D4: 2.004, d2: 2.534 }
  };

  function update() {
    const c = CONSTS[nEl.value];
    const Xbarbar = parseFloat(xbEl.value), Rbar = parseFloat(rbEl.value);

    if (isNaN(Xbarbar) || isNaN(Rbar) || Rbar < 0) return;

    // X-bar chart limits: UCL = Xbarbar + A2 * Rbar, LCL = Xbarbar - A2 * Rbar
    const UCL_x = Xbarbar + (c.A2 * Rbar);
    const LCL_x = Xbarbar - (c.A2 * Rbar);

    // R chart limits: UCL = D4 * Rbar, LCL = D3 * Rbar
    const UCL_r = c.D4 * Rbar;
    const LCL_r = c.D3 * Rbar;

    // Estimated process standard deviation sigma = Rbar / d2
    const sigma_est = Rbar / c.d2;

    xResEl.textContent = 'X̄ Limits: [' + LCL_x.toFixed(2) + ' to ' + UCL_x.toFixed(2) + ']';
    rResEl.textContent = 'Range R Limits: [' + LCL_r.toFixed(2) + ' to ' + UCL_r.toFixed(2) + '] | Process σ̂ = ' + sigma_est.toFixed(3) + ' (d₂ = ' + c.d2 + ', A₂ = ' + c.A2 + ')';
  }

  [xbEl, rbEl].forEach(el => el.addEventListener('input', update));
  nEl.addEventListener('change', update);
  update();
})();