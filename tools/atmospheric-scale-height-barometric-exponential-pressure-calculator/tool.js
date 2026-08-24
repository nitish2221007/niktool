(() => {
  'use strict';
  const zEl = document.getElementById('at-z'), plEl = document.getElementById('at-planet');
  const pResEl = document.getElementById('at-res-p'), dsResEl = document.getElementById('at-res-desc');

  function update() {
    const z_km = parseFloat(zEl.value);
    const parts = plEl.value.split('_');
    const H_km = parseFloat(parts[0]);
    const P0_kPa = parseFloat(parts[1]);

    if (isNaN(z_km) || isNaN(H_km) || isNaN(P0_kPa) || z_km < 0) return;

    // Barometric formula: P(z) = P0 * exp( -z / H )
    const P_z = P0_kPa * Math.exp(-z_km / H_km);
    const frac = (P_z / P0_kPa) * 100.0;

    let note = '';
    let color = '#22543d';

    if (frac < 40.0) {
      note = 'EXTREME HYPOXIA / DEATH ZONE: Supplementary oxygen mandatory for humans';
      color = '#c53030';
    } else if (frac < 75.0) {
      note = 'HIGH ALTITUDE (Reduced air density: Aircraft cruising altitude regime)';
      color = '#ea580c';
    } else {
      note = 'HABITABLE SURFACE REGIME';
      color = '#22543d';
    }

    pResEl.textContent = 'P = ' + (P_z >= 100 ? P_z.toFixed(1) : P_z.toFixed(2)) + ' kPa (' + (P_z / 101.325).toFixed(3) + ' atm)';
    pResEl.style.color = color;
    dsResEl.textContent = note + ' (Scale Height H = ' + H_km + ' km | Pressure = ' + frac.toFixed(1) + '% of surface @ z = ' + z_km + ' km)';
    dsResEl.style.color = color;
  }

  zEl.addEventListener('input', update);
  plEl.addEventListener('change', update);
  update();
})();