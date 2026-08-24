(() => {
  'use strict';
  const vpEl = document.getElementById('tr-vp'), npEl = document.getElementById('tr-np'), nsEl = document.getElementById('tr-ns'), isEl = document.getElementById('tr-is');
  const vsEl = document.getElementById('tr-res-vs'), tEl = document.getElementById('tr-res-type'), ipEl = document.getElementById('tr-res-ip');

  function update() {
    const Vp = parseFloat(vpEl.value), Np = parseFloat(npEl.value), Ns = parseFloat(nsEl.value), Is = parseFloat(isEl.value);
    if (isNaN(Vp) || isNaN(Np) || isNaN(Ns) || isNaN(Is) || Vp <= 0 || Np <= 0 || Ns <= 0 || Is < 0) return;

    // Ratio a = Np / Ns
    const a = Np / Ns;
    // Vs = Vp / a = Vp * (Ns / Np)
    const Vs = Vp * (Ns / Np);
    // Ip = Is / a = Is * (Ns / Np)
    const Ip = Is * (Ns / Np);
    const powerVa = Vs * Is;

    vsEl.textContent = Vs.toFixed(2) + ' Volts AC';
    ipEl.textContent = Ip.toFixed(3) + ' A (' + powerVa.toFixed(1) + ' VA)';

    if (a > 1) {
      tEl.textContent = 'Step-Down (' + a.toFixed(1) + ' : 1)';
      tEl.style.color = '#2563eb';
    } else if (a < 1) {
      tEl.textContent = 'Step-Up (1 : ' + (1 / a).toFixed(1) + ')';
      tEl.style.color = '#c53030';
    } else {
      tEl.textContent = '1:1 Isolation Transformer';
      tEl.style.color = '#22543d';
    }
  }

  [vpEl, npEl, nsEl, isEl].forEach(el => el.addEventListener('input', update));
  update();
})();