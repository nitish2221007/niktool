(() => {
  'use strict';
  const aEl = document.getElementById('ca-a'), bEl = document.getElementById('ca-b');
  const cEl = document.getElementById('ca-c'), dEl = document.getElementById('ca-d');
  const mulEl = document.getElementById('ca-res-mult'), divEl = document.getElementById('ca-res-div');
  const addEl = document.getElementById('ca-res-add'), subEl = document.getElementById('ca-res-sub');

  function fmt(r, i) {
    return r.toFixed(2) + (i >= 0 ? ' + ' : ' - ') + Math.abs(i).toFixed(2) + 'i';
  }

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const c = parseFloat(cEl.value), d = parseFloat(dEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return;

    // Add: (a+c) + (b+d)i
    addEl.textContent = fmt(a + c, b + d);
    // Sub: (a-c) + (b-d)i
    subEl.textContent = fmt(a - c, b - d);

    // Mult: (a*c - b*d) + (a*d + b*c)i
    const mulR = (a * c) - (b * d);
    const mulI = (a * d) + (b * c);
    mulEl.textContent = fmt(mulR, mulI);

    // Div: (ac + bd)/(c^2 + d^2) + (bc - ad)/(c^2 + d^2)i
    const denom = Math.pow(c, 2) + Math.pow(d, 2);
    if (denom !== 0) {
      const divR = ((a * c) + (b * d)) / denom;
      const divI = ((b * c) - (a * d)) / denom;
      divEl.textContent = fmt(divR, divI);
    } else {
      divEl.textContent = 'Divide by 0';
    }
  }

  [aEl, bEl, cEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();