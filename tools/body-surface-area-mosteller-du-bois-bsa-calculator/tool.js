(() => {
  'use strict';
  const htEl = document.getElementById('bsa-ht'), wtEl = document.getElementById('bsa-wt');
  const mstResEl = document.getElementById('bsa-res-most'), dbResEl = document.getElementById('bsa-res-dubois');

  function update() {
    const ht_cm = parseFloat(htEl.value), wt_kg = parseFloat(wtEl.value);
    if (isNaN(ht_cm) || isNaN(wt_kg) || ht_cm <= 0 || wt_kg <= 0) return;

    // Mosteller formula: BSA = sqrt( (Height * Weight) / 3600 )  [m^2]
    const bsa_mosteller = Math.sqrt((ht_cm * wt_kg) / 3600.0);

    // Du Bois & Du Bois formula: BSA = 0.007184 * (Height^0.725) * (Weight^0.425)  [m^2]
    const bsa_dubois = 0.007184 * Math.pow(ht_cm, 0.725) * Math.pow(wt_kg, 0.425);

    mstResEl.textContent = 'BSA = ' + bsa_mosteller.toFixed(2) + ' m² (Mosteller)';
    dbResEl.textContent = 'Du Bois BSA = ' + bsa_dubois.toFixed(2) + ' m² | Chemotherapy Index @ ' + ht_cm + ' cm, ' + wt_kg + ' kg';
  }

  htEl.addEventListener('input', update);
  wtEl.addEventListener('input', update);
  update();
})();