(() => {
  'use strict';
  const cEl = document.getElementById('pc-comp'), tEl = document.getElementById('pc-tot');
  const pResEl = document.getElementById('pc-res-pct'), eResEl = document.getElementById('pc-res-el');

  function update() {
    const parts = cEl.value.split('_');
    const totalMolar = parseFloat(parts[0]);
    const elemMass = parseFloat(parts[1]);

    const pct = (elemMass / totalMolar) * 100.0;

    pResEl.textContent = pct.toFixed(2) + '% by Mass';
    eResEl.textContent = 'Element Mass: ' + elemMass.toFixed(2) + ' g/mol out of ' + totalMolar.toFixed(2) + ' g/mol (' + cEl.options[cEl.selectedIndex].text + ')';
  }

  cEl.addEventListener('change', update);
  update();
})();