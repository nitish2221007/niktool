(() => {
  'use strict';
  const kwEl = document.getElementById('kvar-kw'), pf1El = document.getElementById('kvar-pf1'), pf2El = document.getElementById('kvar-pf2');
  const capResEl = document.getElementById('kvar-res-cap'), curResEl = document.getElementById('kvar-res-curr');

  function update() {
    const P = parseFloat(kwEl.value), pf1 = parseFloat(pf1El.value), pf2 = parseFloat(pf2El.value);
    if (isNaN(P) || isNaN(pf1) || isNaN(pf2) || P <= 0 || pf1 <= 0 || pf1 >= 1 || pf2 <= pf1 || pf2 > 1.0) return;

    // theta1 = acos(pf1), theta2 = acos(pf2)
    const th1 = Math.acos(pf1);
    const th2 = Math.acos(pf2);

    // Q1 = P * tan(th1)
    const Q1 = P * Math.tan(th1);
    // Q2 = P * tan(th2)
    const Q2 = P * Math.tan(th2);
    // Q_cap = Q1 - Q2 = P * (tan(th1) - tan(th2))
    const Qcap = Q1 - Q2;

    capResEl.textContent = Qcap.toFixed(1) + ' kVAR';
    curResEl.textContent = Q1.toFixed(1) + ' kVAR (Initial)';
  }

  [kwEl, pf1El, pf2El].forEach(el => el.addEventListener('input', update));
  update();
})();