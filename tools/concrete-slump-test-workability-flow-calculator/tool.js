(() => {
  'use strict';
  const dropEl = document.getElementById('sl-drop');
  const clsResEl = document.getElementById('sl-res-class'), appResEl = document.getElementById('sl-res-app');

  function update() {
    const slump_mm = parseFloat(dropEl.value);
    if (isNaN(slump_mm) || slump_mm < 0 || slump_mm > 300) return;

    const slump_in = slump_mm / 25.4;

    let sClass = '', appDesc = '', color = '#22543d';

    if (slump_mm <= 40) {
      sClass = 'Class S1 (10 - 40 mm) SEMI-DRY';
      appDesc = 'Road paving, mass gravity dams, roller compacted concrete (Requires heavy mechanical vibration)';
      color = '#2563eb';
    } else if (slump_mm <= 90) {
      sClass = 'Class S2 (50 - 90 mm) LOW PLASTICITY';
      appDesc = 'Standard strip footings, unreinforced foundation pads, mass concrete slabs';
      color = '#22543d';
    } else if (slump_mm <= 150) {
      sClass = 'Class S3 (100 - 150 mm) PLASTIC (STANDARD)';
      appDesc = 'Pumped concrete, heavily reinforced columns, suspended slabs, bridge decks';
      color = '#22543d';
    } else if (slump_mm <= 210) {
      sClass = 'Class S4 (160 - 210 mm) HIGH FLUIDITY';
      appDesc = 'Tremie underwater concrete, congested rebar cages, self-leveling base';
      color = '#ea580c';
    } else {
      sClass = 'Class S5 (≥ 220 mm) SUPER-FLUID';
      appDesc = 'Self-Compacting Concrete (SCC) with superplasticizers (Requires flow table test)';
      color = '#c53030';
    }

    clsResEl.textContent = sClass;
    clsResEl.style.color = color;
    appResEl.textContent = 'Slump = ' + slump_in.toFixed(2) + ' in (' + slump_mm + ' mm) | ' + appDesc;
  }

  dropEl.addEventListener('input', update);
  update();
})();