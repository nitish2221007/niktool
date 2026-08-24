(() => {
  'use strict';
  const c0El = document.getElementById('fo-c0'), kEl = document.getElementById('fo-k'), tEl = document.getElementById('fo-t');
  const ctResEl = document.getElementById('fo-res-ct'), thResEl = document.getElementById('fo-res-thalf');

  function update() {
    const C0 = parseFloat(c0El.value), k = parseFloat(kEl.value), t = parseFloat(tEl.value);
    if (isNaN(C0) || isNaN(k) || isNaN(t) || C0 <= 0 || k <= 0 || t < 0) return;

    // First order: C_t = C0 * exp(-k * t)
    const Ct = C0 * Math.exp(-k * t);
    const tHalf = Math.LN2 / k;
    const pctRemain = (Ct / C0) * 100;
    const halfLivesPassed = t / tHalf;

    ctResEl.textContent = Ct.toFixed(2) + ' (' + pctRemain.toFixed(1) + '% Remaining)';
    thResEl.textContent = 't₁/₂ = ' + tHalf.toFixed(2) + ' time units (' + halfLivesPassed.toFixed(2) + ' Half-Lives Passed)';
  }

  [c0El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();