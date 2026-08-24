(() => {
  'use strict';
  const f0El = document.getElementById('dop-f0'), vsEl = document.getElementById('dop-vs'), dirEl = document.getElementById('dop-dir');
  const fResEl = document.getElementById('dop-res-f'), pResEl = document.getElementById('dop-res-pitch');

  const c_sound = 343.0; // m / s in 20°C air

  function update() {
    const f0 = parseFloat(f0El.value), vsKmh = parseFloat(vsEl.value);
    const mode = dirEl.value;

    if (isNaN(f0) || isNaN(vsKmh) || f0 <= 0 || vsKmh < 0) return;

    const vsMs = vsKmh / 3.6;
    if (vsMs >= c_sound) {
      fResEl.textContent = 'Sonic Boom Mach Wave (v_s ≥ 343 m/s)';
      pResEl.textContent = 'Source moving at supersonic speed (Mach ' + (vsMs / c_sound).toFixed(2) + ')';
      return;
    }

    // Approaching: f_app = f0 * ( c / (c - vs) )
    const f_app = f0 * (c_sound / (c_sound - vsMs));
    // Receding: f_rec = f0 * ( c / (c + vs) )
    const f_rec = f0 * (c_sound / (c_sound + vsMs));

    const fObs = mode === 'approaching' ? f_app : f_rec;
    const shiftHz = fObs - f0;

    // Musical semitone shift = 12 * log2(fObs / f0)
    const semitones = 12 * Math.log2(fObs / f0);

    fResEl.textContent = 'f' = ' + fObs.toFixed(1) + ' Hz (' + (shiftHz >= 0 ? '+' : '') + shiftHz.toFixed(1) + ' Hz Shift)';
    pResEl.textContent = 'Pitch Shift: ' + (semitones >= 0 ? '+' : '') + semitones.toFixed(2) + ' Semitones | Approaching: ' + f_app.toFixed(1) + ' Hz, Receding: ' + f_rec.toFixed(1) + ' Hz';
  }

  [f0El, vsEl].forEach(el => el.addEventListener('input', update));
  dirEl.addEventListener('change', update);
  update();
})();