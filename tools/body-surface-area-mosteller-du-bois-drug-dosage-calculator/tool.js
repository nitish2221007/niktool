(() => {
  'use strict';
  const hEl = document.getElementById('bsa-h'), wEl = document.getElementById('bsa-w');
  const msResEl = document.getElementById('bsa-res-most'), cpResEl = document.getElementById('bsa-res-comp');

  function update() {
    const H_cm = parseFloat(hEl.value), W_kg = parseFloat(wEl.value);
    if (isNaN(H_cm) || isNaN(W_kg) || H_cm <= 0 || W_kg <= 0) return;

    // Mosteller formula: BSA = sqrt( (Height * Weight) / 3600 )
    const BSA_mosteller = Math.sqrt((H_cm * W_kg) / 3600.0);

    // Du Bois formula: BSA = 0.007184 * (Weight^0.425) * (Height^0.725)
    const BSA_dubois = 0.007184 * Math.pow(W_kg, 0.425) * Math.pow(H_cm, 0.725);

    // Haycock formula: BSA = 0.024265 * (Weight^0.5378) * (Height^0.3964)
    const BSA_haycock = 0.024265 * Math.pow(W_kg, 0.5378) * Math.pow(H_cm, 0.3964);

    msResEl.textContent = 'BSA = ' + BSA_mosteller.toFixed(2) + ' m² (Mosteller Standard)';
    cpResEl.textContent = 'Du Bois = ' + BSA_dubois.toFixed(2) + ' m² | Haycock = ' + BSA_haycock.toFixed(2) + ' m² | Adult Reference = 1.73 m² (H=' + H_cm + ' cm, W=' + W_kg + ' kg)';
  }

  hEl.addEventListener('input', update);
  wEl.addEventListener('input', update);
  update();
})();