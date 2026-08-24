(() => {
  'use strict';
  const dpEl = document.getElementById('geo-dp'), dnEl = document.getElementById('geo-dn'), latEl = document.getElementById('geo-lat');
  const sResEl = document.getElementById('geo-res-spd'), dResEl = document.getElementById('geo-res-dir');

  const omega = 7.2921159e-5; // rad / s Earth rotation
  const rho_air = 1.00; // kg / m^3 @ 850 hPa level

  function update() {
    const dP_hpa = parseFloat(dpEl.value), dnKm = parseFloat(dnEl.value), lat = parseFloat(latEl.value);
    if (isNaN(dP_hpa) || isNaN(dnKm) || isNaN(lat) || dP_hpa <= 0 || dnKm <= 0 || Math.abs(lat) === 0 || Math.abs(lat) > 90) return;

    const latRad = (lat * Math.PI) / 180;
    const f_coriolis = 2 * omega * Math.sin(latRad);
    const absF = Math.abs(f_coriolis);

    // Pressure gradient in Pa / m: (dP_hpa * 100) / (dnKm * 1000) = dP_hpa / (10 * dnKm)
    const gradP_Pa_m = (dP_hpa * 100) / (dnKm * 1000);

    // Geostrophic speed v_g = (1 / (rho * f)) * gradP  [m / s]
    const vgMs = gradP_Pa_m / (rho_air * absF);
    const vgKmh = vgMs * 3.6;
    const vgKts = vgMs * 1.94384;

    const hemisphere = lat > 0 ? 'Northern' : 'Southern';
    const lowSide = lat > 0 ? 'Left' : 'Right';

    sResEl.textContent = vgMs.toFixed(1) + ' m / s (' + vgKmh.toFixed(1) + ' km/h / ' + vgKts.toFixed(1) + ' Knots)';
    dResEl.textContent = 'Flows parallel to isobars (' + hemisphere + ' Hemisphere: Low pressure to the ' + lowSide + ', Coriolis f = ' + absF.toExponential(2) + ' s⁻¹)';
  }

  [dpEl, dnEl, latEl].forEach(el => el.addEventListener('input', update));
  update();
})();