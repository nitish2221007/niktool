(() => {
  'use strict';
  const ktEl = document.getElementById('nav-knots'), mphEl = document.getElementById('nav-mph');
  const kmhEl = document.getElementById('nav-kmh'), mpsEl = document.getElementById('nav-mps');

  function updateFromKnots(kt) {
    if (isNaN(kt)) return;
    // 1 knot = 1.15078 mph = 1.852 km/h = 0.514444 m/s
    mphEl.value = (kt * 1.15078).toFixed(2);
    kmhEl.value = (kt * 1.852).toFixed(2);
    mpsEl.value = (kt * 0.514444).toFixed(2);
  }

  ktEl.addEventListener('input', () => {
    const v = parseFloat(ktEl.value);
    if (!isNaN(v)) updateFromKnots(v);
  });

  mphEl.addEventListener('input', () => {
    const v = parseFloat(mphEl.value);
    if (!isNaN(v)) {
      const kt = v / 1.15078;
      ktEl.value = kt.toFixed(2);
      updateFromKnots(kt);
    }
  });

  kmhEl.addEventListener('input', () => {
    const v = parseFloat(kmhEl.value);
    if (!isNaN(v)) {
      const kt = v / 1.852;
      ktEl.value = kt.toFixed(2);
      updateFromKnots(kt);
    }
  });

  mpsEl.addEventListener('input', () => {
    const v = parseFloat(mpsEl.value);
    if (!isNaN(v)) {
      const kt = v / 0.514444;
      ktEl.value = kt.toFixed(2);
      updateFromKnots(kt);
    }
  });

  updateFromKnots(100);
})();