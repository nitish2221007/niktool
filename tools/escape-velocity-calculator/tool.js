(() => {
  'use strict';
  const preEl = document.getElementById('esc-preset');
  const kmsEl = document.getElementById('esc-res-kms'), kmhEl = document.getElementById('esc-res-kmh'), mphEl = document.getElementById('esc-res-mph');

  const BODIES = {
    earth: { m: 5.9722e24, r: 6.371e6 },
    moon: { m: 7.342e22, r: 1.737e6 },
    mars: { m: 6.417e23, r: 3.389e6 },
    jupiter: { m: 1.898e27, r: 6.9911e7 },
    sun: { m: 1.989e30, r: 6.9634e8 }
  };

  const G = 6.67430e-11;

  function update() {
    const body = BODIES[preEl.value] || BODIES.earth;
    // ve = sqrt(2 * G * M / R)
    const ve = Math.sqrt((2 * G * body.m) / body.r);
    const veKms = ve / 1000;
    const veKmh = veKms * 3600;
    const veMph = veKmh * 0.621371;

    kmsEl.textContent = veKms.toFixed(2) + ' km/s';
    kmhEl.textContent = Math.round(veKmh).toLocaleString() + ' km/h';
    mphEl.textContent = Math.round(veMph).toLocaleString() + ' mph';
  }

  preEl.addEventListener('change', update);
  update();
})();