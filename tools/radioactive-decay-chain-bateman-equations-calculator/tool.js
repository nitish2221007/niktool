(() => {
  'use strict';
  const th1El = document.getElementById('bat-th1'), th2El = document.getElementById('bat-th2');
  const a0El = document.getElementById('bat-a0'), tmEl = document.getElementById('bat-time');
  const adResEl = document.getElementById('bat-res-ad'), pkResEl = document.getElementById('bat-res-peak');

  function update() {
    const Th1 = parseFloat(th1El.value), Th2 = parseFloat(th2El.value);
    const A0 = parseFloat(a0El.value), t = parseFloat(tmEl.value);

    if (isNaN(Th1) || isNaN(Th2) || isNaN(A0) || isNaN(t) || Th1 <= 0 || Th2 <= 0 || A0 <= 0 || t < 0) return;

    const lambda1 = Math.LN2 / Th1;
    const lambda2 = Math.LN2 / Th2;

    // Parent activity A1(t) = A0 * exp(-lambda1 * t)
    const A1_t = A0 * Math.exp(-lambda1 * t);

    // Bateman equation for daughter activity A2(t):
    // A2(t) = A0 * ( lambda2 / (lambda2 - lambda1) ) * ( exp(-lambda1*t) - exp(-lambda2*t) )
    const A2_t = A0 * (lambda2 / (lambda2 - lambda1)) * (Math.exp(-lambda1 * t) - Math.exp(-lambda2 * t));

    // Time of maximum daughter activity: t_max = ln(lambda2 / lambda1) / (lambda2 - lambda1)
    const t_max = Math.log(lambda2 / lambda1) / (lambda2 - lambda1);
    const A2_max = A0 * (lambda2 / (lambda2 - lambda1)) * (Math.exp(-lambda1 * t_max) - Math.exp(-lambda2 * t_max));

    adResEl.textContent = A2_t.toFixed(1) + ' GBq Daughter Activity (Parent: ' + A1_t.toFixed(1) + ' GBq)';
    pkResEl.textContent = 'Peak: ' + A2_max.toFixed(1) + ' GBq @ t_max = ' + t_max.toFixed(1) + ' h (' + (Th1 > Th2 ? 'Transient Equilibrium A₂/A₁ = ' + (lambda2/(lambda2-lambda1)).toFixed(2) : 'No Equilibrium') + ')';
  }

  [th1El, th2El, a0El, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();