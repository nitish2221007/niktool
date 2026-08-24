(() => {
  'use strict';
  const thEl = document.getElementById('dh-th'), dEl = document.getElementById('dh-d');
  const aEl = document.getElementById('dh-a'), alEl = document.getElementById('dh-alpha');
  const pResEl = document.getElementById('dh-res-pos'), rResEl = document.getElementById('dh-res-rot');

  function update() {
    const thDeg = parseFloat(thEl.value), d = parseFloat(dEl.value);
    const a = parseFloat(aEl.value), alDeg = parseFloat(alEl.value);

    if (isNaN(thDeg) || isNaN(d) || isNaN(a) || isNaN(alDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const alRad = (alDeg * Math.PI) / 180;

    const px = a * Math.cos(thRad);
    const py = a * Math.sin(thRad);
    const pz = d;

    pResEl.textContent = 'P = (' + px.toFixed(1) + ', ' + py.toFixed(1) + ', ' + pz.toFixed(1) + ') mm';
    rResEl.textContent = 'DH: θ=' + thDeg + '°, d=' + d + 'mm, a=' + a + 'mm, α=' + alDeg + '° (4×4 Homogeneous Transform)';
  }

  [thEl, dEl, aEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();