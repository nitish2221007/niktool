(() => {
  'use strict';
  const vEl = document.getElementById('rt-vol'), sEl = document.getElementById('rt-surf'), aEl = document.getElementById('rt-alpha');
  const rResEl = document.getElementById('rt-res-rt60'), tResEl = document.getElementById('rt-res-type');

  function update() {
    const V = parseFloat(vEl.value), S = parseFloat(sEl.value), alpha = parseFloat(aEl.value);
    if (isNaN(V) || isNaN(S) || isNaN(alpha) || V <= 0 || S <= 0 || alpha <= 0 || alpha >= 1.0) return;

    // Total absorption in Sabins: A = S * alpha
    const A = S * alpha;

    // Sabine RT60 = 0.161 * V / A  [seconds]
    const rtSabine = (0.161 * V) / A;

    // Eyring RT60 = 0.161 * V / ( -S * ln(1 - alpha) )
    const rtEyring = (0.161 * V) / (-S * Math.log(1 - alpha));

    let acousticCategory = '';
    if (rtSabine < 0.4) acousticCategory = 'Dry Recording Booth / Broadcast Studio (<0.4s)';
    else if (rtSabine <= 0.7) acousticCategory = 'Optimal Classroom & Audio Control Room (0.4 - 0.7s)';
    else if (rtSabine <= 1.2) acousticCategory = 'Chamber Music Hall & Multipurpose Auditorium (0.8 - 1.2s)';
    else if (rtSabine <= 2.2) acousticCategory = 'Symphony Concert Hall (1.5 - 2.2s Warm Acoustic Resonance)';
    else acousticCategory = 'Cathedral / Church Echo Chamber (>2.2s High Reverberance)';

    rResEl.textContent = 'RT₆₀ = ' + rtSabine.toFixed(3) + ' s (Sabine)';
    tResEl.textContent = acousticCategory + ' | Eyring: ' + rtEyring.toFixed(3) + ' s (Total Absorption: ' + Math.round(A) + ' metric Sabins)';
  }

  [vEl, sEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();