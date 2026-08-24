(() => {
  'use strict';
  const vinEl = document.getElementById('zn-vin'), vzEl = document.getElementById('zn-vz');
  const ilEl = document.getElementById('zn-il'), izEl = document.getElementById('zn-iz');
  const rsResEl = document.getElementById('zn-res-rs'), pzResEl = document.getElementById('zn-res-pz');

  function update() {
    const vinMin = parseFloat(vinEl.value), vz = parseFloat(vzEl.value);
    const ilMa = parseFloat(ilEl.value), izMa = parseFloat(izEl.value);

    if (isNaN(vinMin) || isNaN(vz) || isNaN(ilMa) || isNaN(izMa) || vinMin <= vz || vz <= 0 || ilMa < 0 || izMa <= 0) return;

    // Total current through Rs = I_L(max) + I_z(min)
    const iTotA = (ilMa + izMa) * 1e-3;
    // R_s = (V_in(min) - V_z) / I_total (Ohms)
    const rsOhms = (vinMin - vz) / iTotA;

    // Max Zener power occurs at no-load (I_L = 0), so all current flows through Zener:
    // P_z(max) = V_z * ((V_in(min) - V_z) / R_s)
    const pzWatts = vz * ((vinMin - vz) / rsOhms);
    const pzMw = pzWatts * 1000;

    rsResEl.textContent = Math.round(rsOhms) + ' Ω';
    pzResEl.textContent = pzMw >= 1000 ? pzWatts.toFixed(2) + ' Watts' : pzMw.toFixed(1) + ' mW (' + (pzMw > 500 ? 'Use 1W Zener' : 'Use 0.5W Zener') + ')';
  }

  [vinEl, vzEl, ilEl, izEl].forEach(el => el.addEventListener('input', update));
  update();
})();