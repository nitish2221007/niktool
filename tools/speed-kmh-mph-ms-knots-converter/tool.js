(() => {
  'use strict';
  const kmhEl = document.getElementById('sp-kmh'), mphEl = document.getElementById('sp-mph');
  const msEl = document.getElementById('sp-ms'), knotEl = document.getElementById('sp-knots');

  function updateFromKmh(kmh) {
    mphEl.value = (kmh * 0.621371).toFixed(2);
    msEl.value = (kmh / 3.6).toFixed(2);
    knotEl.value = (kmh * 0.539957).toFixed(2);
  }

  kmhEl.addEventListener('input', () => {
    const v = parseFloat(kmhEl.value);
    if (!isNaN(v)) updateFromKmh(v);
  });

  mphEl.addEventListener('input', () => {
    const v = parseFloat(mphEl.value);
    if (!isNaN(v)) {
      const kmh = v / 0.621371;
      kmhEl.value = kmh.toFixed(2);
      msEl.value = (kmh / 3.6).toFixed(2);
      knotEl.value = (kmh * 0.539957).toFixed(2);
    }
  });

  msEl.addEventListener('input', () => {
    const v = parseFloat(msEl.value);
    if (!isNaN(v)) {
      const kmh = v * 3.6;
      kmhEl.value = kmh.toFixed(2);
      mphEl.value = (kmh * 0.621371).toFixed(2);
      knotEl.value = (kmh * 0.539957).toFixed(2);
    }
  });

  knotEl.addEventListener('input', () => {
    const v = parseFloat(knotEl.value);
    if (!isNaN(v)) {
      const kmh = v / 0.539957;
      kmhEl.value = kmh.toFixed(2);
      mphEl.value = (kmh * 0.621371).toFixed(2);
      msEl.value = (kmh / 3.6).toFixed(2);
    }
  });

  updateFromKmh(100);
})();