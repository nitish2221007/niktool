(() => {
  'use strict';
  const tEl = document.getElementById('cnt-target');
  const dEl = document.getElementById('cnt-res-days'), wEl = document.getElementById('cnt-res-weeks'), hEl = document.getElementById('cnt-res-hours');

  // Set default to New Year
  const nextYear = new Date().getFullYear() + 1;
  tEl.value = nextYear + '-01-01';

  function update() {
    const targetVal = tEl.value;
    if (!targetVal) return;

    const target = new Date(targetVal + 'T00:00:00');
    const now = new Date();
    const diffMs = target - now;

    if (diffMs < 0) {
      const pastDays = Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      dEl.textContent = pastDays + ' Days Ago';
      wEl.textContent = 'Date has passed';
      hEl.textContent = '-';
      return;
    }

    const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    dEl.textContent = totalDays.toLocaleString() + ' Days';
    wEl.textContent = weeks + ' Weeks, ' + remDays + ' Days';
    hEl.textContent = totalHours.toLocaleString() + ' Hours';
  }

  tEl.addEventListener('change', update);
  update();
})();