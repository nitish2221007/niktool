(() => {
  'use strict';
  const fEl = document.getElementById('bk-flour'), hEl = document.getElementById('bk-hyd');
  const sEl = document.getElementById('bk-salt'), lEl = document.getElementById('bk-lev');
  const totResEl = document.getElementById('bk-res-tot'), brkResEl = document.getElementById('bk-res-break');

  function update() {
    const flourG = parseFloat(fEl.value), hydPct = parseFloat(hEl.value);
    const saltPct = parseFloat(sEl.value), levPct = parseFloat(lEl.value);

    if (isNaN(flourG) || isNaN(hydPct) || isNaN(saltPct) || isNaN(levPct) || flourG <= 0) return;

    // Baker's Math: Flour = 100%
    const waterG = flourG * (hydPct / 100);
    const saltG = flourG * (saltPct / 100);
    const levainG = flourG * (levPct / 100);
    const totalDoughG = flourG + waterG + saltG + levainG;
    const totalPct = 100 + hydPct + saltPct + levPct;

    totResEl.textContent = Math.round(totalDoughG).toLocaleString() + ' g Total Dough (' + totalPct.toFixed(1) + '% Baker Total)';
    brkResEl.textContent = Math.round(waterG) + 'g Water (' + hydPct + '%) | ' + saltG.toFixed(1) + 'g Salt (' + saltPct + '%) | ' + Math.round(levainG) + 'g Levain (' + levPct + '%)';
  }

  [fEl, hEl, sEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();