(() => {
  'use strict';
  const a0El = document.getElementById('so-a0'), kEl = document.getElementById('so-k'), tEl = document.getElementById('so-t');
  const atResEl = document.getElementById('so-res-at'), thResEl = document.getElementById('so-res-thalf');

  function update() {
    const A0 = parseFloat(a0El.value), k = parseFloat(kEl.value), t = parseFloat(tEl.value);
    if (isNaN(A0) || isNaN(k) || isNaN(t) || A0 <= 0 || k <= 0 || t < 0) return;

    // Second order: 1 / At = 1 / A0 + k * t  => At = 1 / (1/A0 + k*t)
    const invAt = (1 / A0) + (k * t);
    const At = 1 / invAt;
    const tHalf1 = 1 / (k * A0);
    const pctRemain = (At / A0) * 100;

    atResEl.textContent = At.toFixed(3) + ' M (' + pctRemain.toFixed(1) + '% Remaining)';
    thResEl.textContent = '1st t₁/₂ = ' + tHalf1.toFixed(1) + ' s (2nd t₁/₂ = ' + (tHalf1 * 2).toFixed(1) + ' s Doubled)';
  }

  [a0El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();