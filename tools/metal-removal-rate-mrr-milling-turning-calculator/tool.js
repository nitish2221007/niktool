(() => {
  'use strict';
  const wEl = document.getElementById('mrr-woc'), dEl = document.getElementById('mrr-doc'), fEl = document.getElementById('mrr-feed');
  const valResEl = document.getElementById('mrr-res-val'), metResEl = document.getElementById('mrr-res-metric');

  function update() {
    const WOC = parseFloat(wEl.value), DOC = parseFloat(dEl.value), Feed = parseFloat(fEl.value);
    if (isNaN(WOC) || isNaN(DOC) || isNaN(Feed) || WOC <= 0 || DOC <= 0 || Feed <= 0) return;

    const mrr_in3_min = WOC * DOC * Feed;
    const mrr_cm3_min = mrr_in3_min * 16.387064;
    const litersPerHour = (mrr_cm3_min * 60) / 1000;

    valResEl.textContent = mrr_in3_min.toFixed(2) + ' in³ / min';
    metResEl.textContent = mrr_cm3_min.toFixed(1) + ' cm³ / min (' + litersPerHour.toFixed(2) + ' Liters of Chips / hr)';
  }

  [wEl, dEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();