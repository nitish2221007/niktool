(() => {
  'use strict';
  const t1El = document.getElementById('bt-t1'), t2El = document.getElementById('bt-t2');
  const a10El = document.getElementById('bt-a10'), tmEl = document.getElementById('bt-time');
  const a2ResEl = document.getElementById('bt-res-a2'), eqResEl = document.getElementById('bt-res-eq');

  function update() {
    const T1_hr = parseFloat(t1El.value), T2_hr = parseFloat(t2El.value);
    const A10_MBq = parseFloat(a10El.value), t_hr = parseFloat(tmEl.value);

    if (isNaN(T1_hr) || isNaN(T2_hr) || isNaN(A10_MBq) || isNaN(t_hr) || T1_hr <= 0 || T2_hr <= 0 || A10_MBq <= 0 || t_hr < 0 || T1_hr === T2_hr) return;

    const lambda1 = Math.LN2 / T1_hr;
    const lambda2 = Math.LN2 / T2_hr;

    const A1_MBq = A10_MBq * Math.exp(-lambda1 * t_hr);
    const factor = lambda2 / (lambda2 - lambda1);
    const A2_MBq = factor * A10_MBq * (Math.exp(-lambda1 * t_hr) - Math.exp(-lambda2 * t_hr));
    const t_max_hr = Math.log(lambda2 / lambda1) / (lambda2 - lambda1);

    let mode = '';
    if (T1_hr > 100.0 * T2_hr) {
      mode = 'SECULAR EQUILIBRIUM (T₁ >> T₂: A₂ approaches A₁ at long times)';
    } else if (T1_hr > T2_hr) {
      const eq_ratio = lambda2 / (lambda2 - lambda1);
      mode = 'TRANSIENT EQUILIBRIUM (T₁ > T₂: Ingrowth peak @ ' + t_max_hr.toFixed(1) + ' hr, asymptotic A₂/A₁ = ' + eq_ratio.toFixed(2) + ')';
    } else {
      mode = 'NO EQUILIBRIUM (T₁ < T₂: Daughter decays slower than parent)';
    }

    a2ResEl.textContent = 'Daughter Activity A₂ = ' + A2_MBq.toFixed(1) + ' MBq';
    eqResEl.textContent = 'Parent A₁ = ' + A1_MBq.toFixed(1) + ' MBq | ' + mode + ' [t_peak = ' + t_max_hr.toFixed(1) + ' hr]';
  }

  [t1El, t2El, a10El, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();