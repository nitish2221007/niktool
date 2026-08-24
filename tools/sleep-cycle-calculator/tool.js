(() => {
  'use strict';
  const wEl = document.getElementById('slp-wake-time');
  const t6 = document.getElementById('slp-t6'), t5 = document.getElementById('slp-t5');
  const t4 = document.getElementById('slp-t4'), t3 = document.getElementById('slp-t3');

  function pad(n) { return n < 10 ? '0' + n : n; }

  function formatTime(mins) {
    mins = ((mins % 1440) + 1440) % 1440;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return pad(h) + ':' + pad(m);
  }

  function update() {
    const val = wEl.value;
    if (!val) return;

    const parts = val.split(':');
    const wakeMins = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    const fallAsleep = 15; // 15 mins to fall asleep

    t6.textContent = formatTime(wakeMins - (6 * 90 + fallAsleep));
    t5.textContent = formatTime(wakeMins - (5 * 90 + fallAsleep));
    t4.textContent = formatTime(wakeMins - (4 * 90 + fallAsleep));
    t3.textContent = formatTime(wakeMins - (3 * 90 + fallAsleep));
  }

  wEl.addEventListener('input', update);
  update();
})();