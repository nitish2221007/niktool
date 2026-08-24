(() => {
  'use strict';
  const hhvEl = document.getElementById('wb-hhv'), sgEl = document.getElementById('wb-sg');
  const iwResEl = document.getElementById('wb-res-iw'), stResEl = document.getElementById('wb-res-stat');

  function update() {
    const HHV = parseFloat(hhvEl.value), SG = parseFloat(sgEl.value);
    if (isNaN(HHV) || isNaN(SG) || HHV <= 0 || SG <= 0) return;

    // Wobbe Index I_W = HHV / sqrt(SG)  [MJ / m^3]
    const I_W = HHV / Math.sqrt(SG);
    // Convert MJ/m^3 to BTU/scf: 1 MJ/m^3 = 26.8392 BTU/scf
    const I_W_btu = I_W * 26.8392;

    let status = '';
    let color = '#22543d';

    if (I_W >= 48.5 && I_W <= 57.0) {
      status = 'GROUP H NATURAL GAS COMPLIANT (48.5 - 57.0 MJ/m³: Direct drop-in burner replacement)';
      color = '#22543d';
    } else if (I_W >= 39.0 && I_W < 48.5) {
      status = 'GROUP L NATURAL GAS (39.0 - 48.5 MJ/m³: Low-calorific gas, requires larger orifice)';
      color = '#2563eb';
    } else {
      status = 'OUT OF INTERCHANGEABILITY SPEC: Gas will cause flashback, flame lift-off, or carbon monoxide soot!';
      color = '#c53030';
    }

    iwResEl.textContent = 'I_W = ' + I_W.toFixed(2) + ' MJ / m³ (' + Math.round(I_W_btu).toLocaleString() + ' BTU/scf)';
    stResEl.textContent = status;
    stResEl.style.color = color;
  }

  hhvEl.addEventListener('input', update);
  sgEl.addEventListener('input', update);
  update();
})();