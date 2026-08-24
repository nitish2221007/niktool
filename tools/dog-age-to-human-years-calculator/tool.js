(() => {
  'use strict';
  const aEl = document.getElementById('dog-age');
  const hEl = document.getElementById('dog-res-human'), lEl = document.getElementById('dog-res-legacy');

  function update() {
    const dogYears = parseFloat(aEl.value);
    if (isNaN(dogYears) || dogYears <= 0) return;

    // UCSD Epigenetic clock formula: Human_Age = 16 * ln(Dog_Age) + 31
    const humanAge = 16 * Math.log(dogYears) + 31;
    const legacyAge = dogYears * 7;

    hEl.textContent = (humanAge < 1 ? 1 : humanAge.toFixed(1)) + ' Years Old in Human Life';
    lEl.textContent = Math.round(legacyAge) + ' Years (Old 7x Rule)';
  }

  aEl.addEventListener('input', update);
  update();
})();