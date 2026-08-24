(() => {
  'use strict';
  const aEl = document.getElementById('py-a'), bEl = document.getElementById('py-b');
  const cResEl = document.getElementById('py-res-c'), prResEl = document.getElementById('py-res-prop');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

    // c = sqrt( a^2 + b^2 )
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    // Area = 0.5 * a * b
    const area = 0.5 * a * b;
    // Perimeter = a + b + c
    const perimeter = a + b + c;

    // Angles
    const angleA_deg = (Math.asin(a / c) * 180.0) / Math.PI;
    const angleB_deg = 90.0 - angleA_deg;

    let triple = '';
    if (Math.round(c) === c && Math.round(a) === a && Math.round(b) === b) {
      triple = ' (Integer Pythagorean Triple)';
    }

    cResEl.textContent = 'Hypotenuse c = ' + c.toFixed(2) + triple;
    prResEl.textContent = 'Area = ' + area.toFixed(2) + ' | Perimeter = ' + perimeter.toFixed(2) + ' | Angles: ' + angleA_deg.toFixed(1) + '°, ' + angleB_deg.toFixed(1) + '°, 90°';
  }

  aEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();