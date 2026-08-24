(() => {
  'use strict';
  const rhoEl = document.getElementById('ih-rho'), betaEl = document.getElementById('ih-beta'), tauEl = document.getElementById('ih-tau');
  const tResEl = document.getElementById('ih-res-t'), evResEl = document.getElementById('ih-res-eval');

  function update() {
    const rho_pcm = parseFloat(rhoEl.value), beta = parseFloat(betaEl.value), tau_d_s = parseFloat(tauEl.value);
    if (isNaN(rho_pcm) || isNaN(beta) || isNaN(tau_d_s) || rho_pcm === 0 || beta <= 0 || tau_d_s <= 0) return;

    const rho = rho_pcm * 1e-5;
    const dollars = rho / beta;

    if (dollars >= 1.0) {
      tResEl.textContent = 'PROMPT CRITICAL (T < 0.001 s ✗)';
      tResEl.style.color = '#c53030';
      evResEl.textContent = 'SUPER-PROMPT CRITICAL (ρ = ' + dollars.toFixed(3) + ' $ ≥ 1.00 $: Millisecond power excursion without delayed neutron control)';
      return;
    }

    const T_sec = ((beta - rho) * tau_d_s) / rho;

    let qual = '', color = '#22543d';
    if (T_sec >= 60.0) {
      qual = 'SLOW SAFE OPERATIONAL TRANSIENT (T ≥ 60 s: Operator manageable ✓)';
      color = '#22543d';
    } else if (T_sec >= 10.0) {
      qual = 'MODERATE POWER INCREASE (10 s ≤ T < 60 s)';
      color = '#ea580c';
    } else {
      qual = 'FAST TRANSIENT (T < 10 s: Automatic scram protection active)';
      color = '#c53030';
    }

    tResEl.textContent = 'Reactor Period T = ' + T_sec.toFixed(1) + ' Seconds';
    tResEl.style.color = color;
    evResEl.textContent = qual + ' [Reactivity = ' + dollars.toFixed(3) + ' $ (' + rho_pcm + ' pcm) @ β=' + (beta*100).toFixed(3) + '%]';
  }

  [rhoEl, betaEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();