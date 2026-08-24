(() => {
  'use strict';
  const mdEl = document.getElementById('th-mdot'), veEl = document.getElementById('th-ve');
  const aeEl = document.getElementById('th-ae'), dpEl = document.getElementById('th-dp');
  const fResEl = document.getElementById('th-res-f'), ispResEl = document.getElementById('th-res-isp');

  const g0 = 9.80665;

  function update() {
    const mdot = parseFloat(mdEl.value), ve = parseFloat(veEl.value);
    const Ae = parseFloat(aeEl.value), dpKpa = parseFloat(dpEl.value);

    if (isNaN(mdot) || isNaN(ve) || isNaN(Ae) || isNaN(dpKpa) || mdot <= 0 || ve <= 0 || Ae < 0) return;

    const dpPa = dpKpa * 1000;
    const fNewtons = (mdot * ve) + (dpPa * Ae);
    const fKn = fNewtons / 1000;
    const fLbf = fNewtons * 0.224808943;
    const Isp = fNewtons / (mdot * g0);
    const cEff = fNewtons / mdot;

    fResEl.textContent = fKn.toFixed(1) + ' kN (' + Math.round(fLbf).toLocaleString() + ' lbf)';
    ispResEl.textContent = 'I_sp = ' + Isp.toFixed(1) + ' s (Effective Exhaust c = ' + Math.round(cEff) + ' m/s, Momentum: ' + ((mdot*ve)/1000).toFixed(1) + ' kN)';
  }

  [mdEl, veEl, aeEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();