(() => {
  'use strict';
  const epsEl = document.getElementById('rad-eps'), aEl = document.getElementById('rad-area');
  const t1El = document.getElementById('rad-t1'), t2El = document.getElementById('rad-t2');
  const qResEl = document.getElementById('rad-res-q'), fResEl = document.getElementById('rad-res-flux');

  const sigma = 5.670374419e-8; // Stefan-Boltzmann constant W / (m^2 * K^4)

  function update() {
    const eps = parseFloat(epsEl.value), A = parseFloat(aEl.value);
    const t1C = parseFloat(t1El.value), t2C = parseFloat(t2El.value);

    if (isNaN(eps) || isNaN(A) || isNaN(t1C) || isNaN(t2C) || eps <= 0 || eps > 1.0 || A <= 0 || t1C <= t2C) return;

    const T1 = t1C + 273.15;
    const T2 = t2C + 273.15;

    // q = eps * sigma * A * (T1^4 - T2^4) (Watts)
    const qWatts = eps * sigma * A * (Math.pow(T1, 4) - Math.pow(T2, 4));
    const qKw = qWatts / 1000;
    const flux = qWatts / A;

    qResEl.textContent = qKw >= 1.0 ? qKw.toFixed(2) + ' kW (' + Math.round(qWatts).toLocaleString() + ' W)' : qWatts.toFixed(1) + ' Watts';
    fResEl.textContent = flux >= 1000 ? (flux / 1000).toFixed(2) + ' kW / m²' : Math.round(flux).toLocaleString() + ' W / m²';
  }

  [epsEl, aEl, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();