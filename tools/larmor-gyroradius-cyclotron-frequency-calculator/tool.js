(() => {
  'use strict';
  const sEl = document.getElementById('lar-spec'), eEl = document.getElementById('lar-e'), bEl = document.getElementById('lar-b');
  const rlResEl = document.getElementById('lar-res-rl'), fcResEl = document.getElementById('lar-res-fc');

  const q_e = 1.602176634e-19;
  const u_kg = 1.66053906660e-27;
  const me_kg = 9.1093837015e-31;

  const SPECIES = {
    'deuteron': { m: 2.014 * u_kg, q: 1 * q_e },
    'proton':   { m: 1.007 * u_kg, q: 1 * q_e },
    'electron': { m: me_kg,        q: 1 * q_e },
    'alpha':    { m: 4.001 * u_kg, q: 2 * q_e }
  };

  function update() {
    const spec = SPECIES[sEl.value], eKev = parseFloat(eEl.value), B = parseFloat(bEl.value);
    if (isNaN(eKev) || isNaN(B) || eKev <= 0 || B <= 0) return;

    const eJoules = eKev * 1000 * q_e;
    const vPerp = Math.sqrt((2 * eJoules) / spec.m);
    const rL_m = (spec.m * vPerp) / (spec.q * B);
    const rL_mm = rL_m * 1000;
    const rL_um = rL_m * 1e6;

    const fcHz = (spec.q * B) / (2 * Math.PI * spec.m);
    const fcMhz = fcHz / 1e6;
    const fcGhz = fcHz / 1e9;

    if (rL_mm >= 1.0) {
      rlResEl.textContent = rL_mm.toFixed(2) + ' mm (Larmor Radius)';
    } else {
      rlResEl.textContent = rL_um.toFixed(1) + ' μm (Larmor Radius)';
    }

    if (fcGhz >= 1.0) {
      fcResEl.textContent = fcGhz.toFixed(2) + ' GHz (Cyclotron Gyrofrequency)';
    } else {
      fcResEl.textContent = fcMhz.toFixed(2) + ' MHz (Cyclotron Gyrofrequency)';
    }
  }

  sEl.addEventListener('change', update);
  eEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();