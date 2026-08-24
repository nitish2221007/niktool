(() => {
  'use strict';
  const r1El = document.getElementById('rm-r1'), r2El = document.getElementById('rm-r2');
  const r3El = document.getElementById('rm-r3'), r4El = document.getElementById('rm-r4'), r5El = document.getElementById('rm-r5');
  const rmrResEl = document.getElementById('rm-res-rmr'), engResEl = document.getElementById('rm-res-eng');

  function update() {
    const R1 = parseInt(r1El.value, 10);
    const R2 = parseInt(r2El.value, 10);
    const R3 = parseInt(r3El.value, 10);
    const R4 = parseInt(r4El.value, 10);
    const R5 = parseInt(r5El.value, 10);

    // Tunnel alignment adjustment R6 = 0 for favorable
    const RMR = R1 + R2 + R3 + R4 + R5;

    let rockClass = '', props = '', color = '#22543d';
    if (RMR >= 81) {
      rockClass = 'CLASS I: VERY GOOD ROCK (81 - 100)';
      props = 'Cohesion c > 400 kPa | Friction φ > 45° | Stand-Up: 20 yrs for 15m span';
      color = '#22543d';
    } else if (RMR >= 61) {
      rockClass = 'CLASS II: GOOD ROCK (61 - 80)';
      props = 'Cohesion c: 300 - 400 kPa | Friction φ: 35° - 45° | Stand-Up: 1 yr for 10m span';
      color = '#22543d';
    } else if (RMR >= 41) {
      rockClass = 'CLASS III: FAIR ROCK (41 - 60)';
      props = 'Cohesion c: 200 - 300 kPa | Friction φ: 25° - 35° | Stand-Up: 1 week for 5m span';
      color = '#ea580c';
    } else if (RMR >= 21) {
      rockClass = 'CLASS IV: POOR ROCK (21 - 40)';
      props = 'Cohesion c: 100 - 200 kPa | Friction φ: 15° - 25° | Stand-Up: 10 hrs for 2.5m span';
      color = '#c53030';
    } else {
      rockClass = 'CLASS V: VERY POOR ROCK (0 - 20)';
      props = 'Cohesion c < 100 kPa | Friction φ < 15° | Stand-Up: 30 min for 1m span';
      color = '#c53030';
    }

    rmrResEl.textContent = 'RMR Score = ' + RMR + ' (' + rockClass.split(' (')[0] + ')';
    rmrResEl.style.color = color;
    engResEl.textContent = props;
  }

  [r1El, r2El, r3El, r4El, r5El].forEach(el => el.addEventListener('change', update));
  update();
})();