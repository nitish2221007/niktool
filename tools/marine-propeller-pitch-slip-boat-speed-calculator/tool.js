(() => {
  'use strict';
  const rpmEl = document.getElementById('prp-rpm'), gearEl = document.getElementById('prp-gear');
  const pitchEl = document.getElementById('prp-pitch'), slipEl = document.getElementById('prp-slip');
  const knResEl = document.getElementById('prp-res-knots'), thResEl = document.getElementById('prp-res-theo');

  function update() {
    const rpm = parseFloat(rpmEl.value), gear = parseFloat(gearEl.value);
    const pitchIn = parseFloat(pitchEl.value), slipPct = parseFloat(slipEl.value);

    if (isNaN(rpm) || isNaN(gear) || isNaN(pitchIn) || isNaN(slipPct) || rpm <= 0 || gear <= 0 || pitchIn <= 0) return;

    const propRpm = rpm / gear;
    // Theoretical Speed (MPH) = (propRpm * pitchIn * 60) / (12 * 5280) = (propRpm * pitchIn) / 1056
    const theoMph = (propRpm * pitchIn) / 1056;
    const realMph = theoMph * (1 - (slipPct / 100));
    const realKnots = realMph / 1.15078;
    const realKmh = realMph * 1.60934;

    knResEl.textContent = realKnots.toFixed(1) + ' Knots (' + realMph.toFixed(1) + ' MPH / ' + realKmh.toFixed(1) + ' km/h)';
    thResEl.textContent = theoMph.toFixed(1) + ' MPH Zero-Slip Limit (Prop RPM = ' + Math.round(propRpm) + ')';
  }

  [rpmEl, gearEl, pitchEl, slipEl].forEach(el => el.addEventListener('input', update));
  update();
})();