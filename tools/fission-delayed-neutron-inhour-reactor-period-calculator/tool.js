(() => {
  'use strict';
  const rhoEl = document.getElementById('inh-rho'), lEl = document.getElementById('inh-lstar'), bEl = document.getElementById('inh-beta');
  const tResEl = document.getElementById('inh-res-t'), dResEl = document.getElementById('inh-res-dol');

  // One-group effective delayed precursor decay constant lambda_eff approx 0.08 s^-1
  const lambda_eff = 0.08;

  function update() {
    const rhoPcm = parseFloat(rhoEl.value), lstarUs = parseFloat(lEl.value), beta = parseFloat(bEl.value);
    if (isNaN(rhoPcm) || isNaN(lstarUs) || isNaN(beta) || lstarUs <= 0 || beta <= 0) return;

    const rho = rhoPcm * 1e-5; // pcm to absolute delta k / k
    const dollar = rho / beta;
    const lstarSec = lstarUs * 1e-6;

    let T_sec = 0;
    let statusDesc = '';
    let color = '#22543d';

    if (rho >= beta) {
      // Prompt Supercritical regime! Period governed purely by prompt neutron lifetime
      T_sec = lstarSec / (rho - beta);
      statusDesc = 'PROMPT SUPERCRITICAL ($ ≥ 1.00): Explosive Millisecond Power Runaway (Chernobyl Condition!)';
      color = '#c53030';
    } else if (rho > 0) {
      // Delayed critical regime: T approx = (beta - rho) / (lambda_eff * rho)
      T_sec = (beta - rho) / (lambda_eff * rho);
      const tDouble = T_sec * Math.LN2;
      statusDesc = 'SAFE DELAYED CRITICAL: Controllable via Mechanical Rods (Doubling Time: ' + tDouble.toFixed(1) + ' s)';
      color = '#22543d';
    } else {
      T_sec = (beta - rho) / (lambda_eff * rho);
      statusDesc = 'SUBCRITICAL: Power Decaying Exponentially with Period T = ' + Math.abs(T_sec).toFixed(1) + ' s';
      color = '#2563eb';
    }

    tResEl.textContent = 'Reactor Period T = ' + (T_sec > 0 ? '+' : '') + (Math.abs(T_sec) < 0.01 ? T_sec.toExponential(2) : T_sec.toFixed(1)) + ' s';
    dResEl.textContent = 'Reactivity: ' + (dollar >= 0 ? '+' : '') + dollar.toFixed(3) + ' $ Dollars | ' + statusDesc;
    dResEl.style.color = color;
  }

  [rhoEl, lEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();