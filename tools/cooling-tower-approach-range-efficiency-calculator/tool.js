(() => {
  'use strict';
  const inEl = document.getElementById('ct-tin'), outEl = document.getElementById('ct-tout'), wbEl = document.getElementById('ct-twb');
  const efResEl = document.getElementById('ct-res-eff'), stResEl = document.getElementById('ct-res-stats');

  function update() {
    const Tin = parseFloat(inEl.value), Tout = parseFloat(outEl.value), Twb = parseFloat(wbEl.value);
    if (isNaN(Tin) || isNaN(Tout) || isNaN(Twb) || Tin <= Tout || Tout <= Twb) return;

    const range = Tin - Tout;
    const approach = Tout - Twb;
    const eff = (range / (range + approach)) * 100;

    efResEl.textContent = eff.toFixed(1) + '% Thermal Effectiveness';
    stResEl.textContent = 'Range ΔT: ' + range.toFixed(1) + '°C | Approach to Wet Bulb: ' + approach.toFixed(1) + '°C (CTI Standard)';
  }

  [inEl, outEl, wbEl].forEach(el => el.addEventListener('input', update));
  update();
})();