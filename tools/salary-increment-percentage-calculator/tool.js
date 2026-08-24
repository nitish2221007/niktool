(() => {
  'use strict';
  const curEl = document.getElementById('hike-current'), pctEl = document.getElementById('hike-pct');
  const newSalEl = document.getElementById('hike-res-new-sal'), raiseEl = document.getElementById('hike-res-raise'), moEl = document.getElementById('hike-res-new-month');

  function update() {
    const cur = parseFloat(curEl.value);
    const pct = parseFloat(pctEl.value);
    if (isNaN(cur) || isNaN(pct) || cur <= 0) return;

    const raise = cur * (pct / 100);
    const newSal = cur + raise;
    const moRaise = raise / 12;

    newSalEl.textContent = '$' + Math.round(newSal).toLocaleString() + ' / yr';
    raiseEl.textContent = '+$' + Math.round(raise).toLocaleString() + ' / yr';
    moEl.textContent = '+$' + Math.round(moRaise).toLocaleString() + ' / mo';
  }

  curEl.addEventListener('input', update);
  pctEl.addEventListener('input', update);
  update();
})();