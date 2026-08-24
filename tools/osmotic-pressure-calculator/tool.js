(() => {
  'use strict';
  const mEl = document.getElementById('osm-m'), tEl = document.getElementById('osm-t'), iEl = document.getElementById('osm-i');
  const atmEl = document.getElementById('osm-res-atm'), barEl = document.getElementById('osm-res-bar'), kpaEl = document.getElementById('osm-res-kpa');

  const R = 0.082057; // L·atm / (mol·K)

  function update() {
    const M = parseFloat(mEl.value), tC = parseFloat(tEl.value), i = parseFloat(iEl.value);
    if (isNaN(M) || isNaN(tC) || isNaN(i) || M <= 0 || i <= 0) return;

    const T = tC + 273.15;
    // Pi = i * M * R * T (in atm)
    const piAtm = i * M * R * T;
    const piBar = piAtm * 1.01325;
    const piKpa = piAtm * 101.325;

    atmEl.textContent = piAtm.toFixed(2) + ' atm';
    barEl.textContent = piBar.toFixed(2) + ' bar';
    kpaEl.textContent = piKpa.toFixed(1) + ' kPa';
  }

  [mEl, tEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();