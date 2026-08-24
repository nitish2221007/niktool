(() => {
  'use strict';
  const lvEl = document.getElementById('hc-live'), ddEl = document.getElementById('hc-dead');
  const sqEl = document.getElementById('hc-sq'), dfEl = document.getElementById('hc-df');
  const ccResEl = document.getElementById('hc-res-conc'), vbResEl = document.getElementById('hc-res-viab');

  function update() {
    const live = parseFloat(lvEl.value), dead = parseFloat(ddEl.value);
    const squares = parseFloat(sqEl.value), DF = parseFloat(dfEl.value);

    if (isNaN(live) || isNaN(dead) || isNaN(squares) || isNaN(DF) || live < 0 || dead < 0 || squares <= 0 || DF <= 0) return;

    const totalCount = live + dead;
    const viability = totalCount > 0 ? (live / totalCount) * 100.0 : 100.0;

    // Neubauer chamber volume per large square = 0.1 mm^3 = 10^-4 mL
    // Cells / mL = ( Count / squares ) * 10^4 * DF
    const live_conc = (live / squares) * 1e4 * DF;
    const total_conc = (totalCount / squares) * 1e4 * DF;

    ccResEl.textContent = 'Live Density = ' + live_conc.toExponential(2) + ' Cells / mL';
    vbResEl.textContent = 'Cell Viability = ' + viability.toFixed(1) + '% (' + live + ' Live / ' + totalCount + ' Total | Live: ' + (live_conc/1e6).toFixed(2) + 'M cells/mL @ DF ' + DF + ')';
  }

  [lvEl, ddEl, sqEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();