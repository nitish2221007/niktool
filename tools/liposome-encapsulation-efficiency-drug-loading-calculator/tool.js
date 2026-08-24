(() => {
  'use strict';
  const totEl = document.getElementById('lp-tot'), frEl = document.getElementById('lp-free'), lpEl = document.getElementById('lp-lipid');
  const eeResEl = document.getElementById('lp-res-ee'), dlcResEl = document.getElementById('lp-res-dlc');

  function update() {
    const total_drug = parseFloat(totEl.value), free_drug = parseFloat(frEl.value), lipid_mass = parseFloat(lpEl.value);
    if (isNaN(total_drug) || isNaN(free_drug) || isNaN(lipid_mass) || total_drug <= 0 || free_drug < 0 || free_drug > total_drug || lipid_mass <= 0) return;

    // Encapsulated drug mass = Total - Free
    const entrapped_drug = total_drug - free_drug;

    // Encapsulation Efficiency EE% = ( Entrapped / Total ) * 100
    const EE_pct = (entrapped_drug / total_drug) * 100.0;

    // Drug Loading Capacity DLC% = ( Entrapped / (Entrapped + Lipid Mass) ) * 100
    const DLC_pct = (entrapped_drug / (entrapped_drug + lipid_mass)) * 100.0;

    eeResEl.textContent = 'Encapsulation Efficiency EE = ' + EE_pct.toFixed(1) + '%';
    dlcResEl.textContent = 'Drug Loading DLC = ' + DLC_pct.toFixed(2) + '% (' + entrapped_drug.toFixed(1) + ' mg encapsulated in ' + (entrapped_drug + lipid_mass).toFixed(1) + ' mg total nanoparticle weight)';
  }

  [totEl, frEl, lpEl].forEach(el => el.addEventListener('input', update));
  update();
})();