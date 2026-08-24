(() => {
  'use strict';
  const mEl = document.getElementById('stl-mass'), fEl = document.getElementById('stl-freq');
  const tlResEl = document.getElementById('stl-res-tl'), stcResEl = document.getElementById('stl-res-stc');

  function update() {
    const m = parseFloat(mEl.value), f = parseFloat(fEl.value);
    if (isNaN(m) || isNaN(f) || m <= 0 || f <= 0) return;

    // Field-incidence mass law equation: TL = 20 * log10(m * f) - 47.0  [dB]
    const TL = (20 * Math.log10(m * f)) - 47.0;

    // Empirical STC estimate approx = TL @ 500 Hz: STC approx = 20*log10(m) + 7
    const STC = Math.round((20 * Math.log10(m)) + 7);

    let privacyLevel = '';
    if (STC < 30) privacyLevel = 'STC < 30: Poor isolation (Normal speech heard easily and understood)';
    else if (STC < 40) privacyLevel = 'STC 30 - 39: Moderate privacy (Loud speech heard but muffled)';
    else if (STC < 50) privacyLevel = 'STC 40 - 49: Good acoustic isolation (Loud speech heard only faintly)';
    else if (STC < 60) privacyLevel = 'STC 50 - 59: Excellent commercial soundproofing (Loud music muffled)';
    else privacyLevel = 'STC 60+: Studio-grade high acoustic isolation (Loud noise inaudible)';

    tlResEl.textContent = 'TL = ' + TL.toFixed(1) + ' dB Attenuation @ ' + f + ' Hz';
    stcResEl.textContent = 'Estimated Partition STC ≈ ' + STC + ' | ' + privacyLevel;
  }

  [mEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();