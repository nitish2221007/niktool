(() => {
  'use strict';
  const vEl = document.getElementById('sb-v'), sEl = document.getElementById('sb-s'), alEl = document.getElementById('sb-alpha');
  const rtResEl = document.getElementById('sb-res-rt60'), evResEl = document.getElementById('sb-res-eval');

  function update() {
    const V = parseFloat(vEl.value), S = parseFloat(sEl.value), alpha = parseFloat(alEl.value);
    if (isNaN(V) || isNaN(S) || isNaN(alpha) || V <= 0 || S <= 0 || alpha <= 0 || alpha >= 1) return;

    // Total metric absorption: A = S * alpha  [m^2 sabins]
    const A = S * alpha;

    // Sabine formula: RT60 = ( 0.161 * V ) / A  [seconds]
    const RT60 = (0.161 * V) / A;

    let use = '', color = '#22543d';
    if (RT60 <= 0.6) {
      use = 'RECORDING STUDIO / PODCAST ROOM (Dry acoustic environment: RT₆₀ < 0.6 s)';
      color = '#22543d';
    } else if (RT60 <= 1.1) {
      use = 'CLASSROOM / LECTURE AUDITORIUM (Ideal Speech Intelligibility: 0.6 - 1.1 s)';
      color = '#22543d';
    } else if (RT60 <= 2.2) {
      use = 'ORCHESTRAL CONCERT HALL (Rich musical warmth: 1.6 - 2.2 s)';
      color = '#22543d';
    } else {
      use = 'EXCESSIVE ECHO / CATHEDRAL (RT₆₀ > 2.5 s: Poor speech intelligibility)';
      color = '#ea580c';
    }

    rtResEl.textContent = 'RT₆₀ = ' + RT60.toFixed(3) + ' Seconds';
    evResEl.textContent = use + ' [Absorption A = ' + A.toFixed(1) + ' Sabins @ α=' + alpha + ']';
    evResEl.style.color = color;
  }

  [vEl, sEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();