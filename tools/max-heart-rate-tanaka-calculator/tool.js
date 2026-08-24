(() => {
  'use strict';
  const aEl = document.getElementById('tan-age');
  const tResEl = document.getElementById('tan-res-tanaka'), fResEl = document.getElementById('tan-res-fox');

  function update() {
    const age = parseFloat(aEl.value);
    if (isNaN(age) || age <= 0 || age > 120) return;

    // Tanaka: HR_max = 208 - (0.7 * age)
    const hrTanaka = 208 - (0.7 * age);
    // Fox: HR_max = 220 - age
    const hrFox = 220 - age;

    tResEl.textContent = Math.round(hrTanaka) + ' BPM';
    fResEl.textContent = Math.round(hrFox) + ' BPM';
  }

  aEl.addEventListener('input', update);
  update();
})();