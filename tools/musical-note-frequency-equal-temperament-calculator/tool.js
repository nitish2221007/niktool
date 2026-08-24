(() => {
  'use strict';
  const nEl = document.getElementById('mus-note'), oEl = document.getElementById('mus-oct');
  const hzResEl = document.getElementById('mus-res-hz'), mResEl = document.getElementById('mus-res-midi'), wlResEl = document.getElementById('mus-res-wlen');

  function update() {
    const noteVal = parseInt(nEl.value, 10);
    const octVal = parseInt(oEl.value, 10);

    // MIDI note number: C4 = 60 => C0 = 12
    const midiNum = 12 + (octVal * 12) + noteVal;
    // f = 440 * 2^((midi - 69) / 12)
    const freqHz = 440 * Math.pow(2, (midiNum - 69) / 12);
    // Wavelength in air (c = 344.5 m/s at 22°C): lambda = c / f
    const wlenM = 344.5 / freqHz;
    const wlenCm = wlenM * 100;

    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const fullNoteName = noteNames[noteVal] + octVal;

    hzResEl.textContent = freqHz.toFixed(2) + ' Hz';
    mResEl.textContent = 'MIDI Note #' + midiNum + ' (' + fullNoteName + ')';
    wlResEl.textContent = wlenM >= 1.0 ? wlenM.toFixed(2) + ' meters' : wlenCm.toFixed(1) + ' cm';
  }

  nEl.addEventListener('change', update);
  oEl.addEventListener('change', update);
  update();
})();