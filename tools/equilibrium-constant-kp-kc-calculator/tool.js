(() => {
  'use strict';
  const kcEl = document.getElementById('eq-kc'), dnEl = document.getElementById('eq-dn'), tEl = document.getElementById('eq-t');
  const kpEl = document.getElementById('eq-res-kp'), rtEl = document.getElementById('eq-res-rt');

  const R = 0.082057; // L·atm / (mol·K)

  function update() {
    const kc = parseFloat(kcEl.value), dn = parseFloat(dnEl.value), T = parseFloat(tEl.value);
    if (isNaN(kc) || isNaN(dn) || isNaN(T) || kc <= 0 || T <= 0) return;

    const RT = R * T;
    // Kp = Kc * (RT)^dn
    const kp = kc * Math.pow(RT, dn);

    kpEl.textContent = kp < 0.001 ? kp.toExponential(3) : kp.toFixed(5);
    rtEl.textContent = 'RT = ' + RT.toFixed(2) + ' L·atm/mol';
  }

  [kcEl, dnEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();