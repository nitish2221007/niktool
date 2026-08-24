(() => {
  'use strict';
  const l1El = document.getElementById('jac-l1'), l2El = document.getElementById('jac-l2');
  const t1El = document.getElementById('jac-th1'), t2El = document.getElementById('jac-th2');
  const fxEl = document.getElementById('jac-fx'), fyEl = document.getElementById('jac-fy');
  const tResEl = document.getElementById('jac-res-tau'), pResEl = document.getElementById('jac-res-pos');

  function update() {
    const L1 = parseFloat(l1El.value), L2 = parseFloat(l2El.value);
    const th1Deg = parseFloat(t1El.value), th2Deg = parseFloat(t2El.value);
    const Fx = parseFloat(fxEl.value), Fy = parseFloat(fyEl.value);

    if (isNaN(L1) || isNaN(L2) || isNaN(th1Deg) || isNaN(th2Deg) || isNaN(Fx) || isNaN(Fy) || L1 <= 0 || L2 <= 0) return;

    const th1 = (th1Deg * Math.PI) / 180;
    const th2 = (th2Deg * Math.PI) / 180;
    const th12 = th1 + th2;

    const x = (L1 * Math.cos(th1)) + (L2 * Math.cos(th12));
    const y = (L1 * Math.sin(th1)) + (L2 * Math.sin(th12));

    const J11 = -(L1 * Math.sin(th1)) - (L2 * Math.sin(th12));
    const J12 = -(L2 * Math.sin(th12));
    const J21 = (L1 * Math.cos(th1)) + (L2 * Math.cos(th12));
    const J22 = (L2 * Math.cos(th12));

    const tau1 = (J11 * Fx) + (J21 * Fy);
    const tau2 = (J12 * Fx) + (J22 * Fy);

    tResEl.textContent = 'τ₁ = ' + tau1.toFixed(2) + ' Nm | τ₂ = ' + tau2.toFixed(2) + ' Nm';
    pResEl.textContent = 'Tip Position: (' + x.toFixed(3) + 'm, ' + y.toFixed(3) + 'm) | Arm Reach: ' + Math.sqrt(x*x + y*y).toFixed(3) + ' m';
  }

  [l1El, l2El, t1El, t2El, fxEl, fyEl].forEach(el => el.addEventListener('input', update));
  update();
})();