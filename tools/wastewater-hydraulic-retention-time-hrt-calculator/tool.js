(() => {
  'use strict';
  const vEl = document.getElementById('hrt-v'), qEl = document.getElementById('hrt-q');
  const hResEl = document.getElementById('hrt-res-hours'), mResEl = document.getElementById('hrt-res-mins');

  function update() {
    const V = parseFloat(vEl.value), Q = parseFloat(qEl.value);
    if (isNaN(V) || isNaN(Q) || V <= 0 || Q <= 0) return;

    // HRT = V / Q (hours)
    const hrtHours = V / Q;
    const hrtMins = hrtHours * 60;
    const hrtDays = hrtHours / 24;

    hResEl.textContent = hrtHours.toFixed(2) + ' Hours';
    mResEl.textContent = Math.round(hrtMins) + ' Minutes (' + hrtDays.toFixed(2) + ' Days Mean Detention)';
  }

  vEl.addEventListener('input', update);
  qEl.addEventListener('input', update);
  update();
})();