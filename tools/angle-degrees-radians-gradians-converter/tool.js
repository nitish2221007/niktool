(() => {
  'use strict';
  const degEl = document.getElementById('ang-deg'), radEl = document.getElementById('ang-rad');
  const gradEl = document.getElementById('ang-grad'), moaEl = document.getElementById('ang-moa');

  function updateFromDeg(deg) {
    const rad = (deg * Math.PI) / 180;
    const grad = (deg * 400) / 360;
    const moa = deg * 60;

    radEl.value = rad.toFixed(5);
    gradEl.value = grad.toFixed(2);
    moaEl.value = moa.toFixed(1);
  }

  degEl.addEventListener('input', () => {
    const v = parseFloat(degEl.value);
    if (!isNaN(v)) updateFromDeg(v);
  });

  radEl.addEventListener('input', () => {
    const v = parseFloat(radEl.value);
    if (!isNaN(v)) {
      const deg = (v * 180) / Math.PI;
      degEl.value = deg.toFixed(4);
      gradEl.value = ((deg * 400) / 360).toFixed(2);
      moaEl.value = (deg * 60).toFixed(1);
    }
  });

  gradEl.addEventListener('input', () => {
    const v = parseFloat(gradEl.value);
    if (!isNaN(v)) {
      const deg = (v * 360) / 400;
      degEl.value = deg.toFixed(4);
      radEl.value = ((deg * Math.PI) / 180).toFixed(5);
      moaEl.value = (deg * 60).toFixed(1);
    }
  });

  updateFromDeg(180);
})();