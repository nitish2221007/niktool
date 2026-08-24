(() => {
  'use strict';
  const thEl = document.getElementById('dh-theta'), dEl = document.getElementById('dh-d');
  const aEl = document.getElementById('dh-a'), alEl = document.getElementById('dh-alpha');
  const psResEl = document.getElementById('dh-res-pos'), mtResEl = document.getElementById('dh-res-mat');

  function update() {
    const theta_deg = parseFloat(thEl.value), d_mm = parseFloat(dEl.value);
    const a_mm = parseFloat(aEl.value), alpha_deg = parseFloat(alEl.value);

    if (isNaN(theta_deg) || isNaN(d_mm) || isNaN(a_mm) || isNaN(alpha_deg)) return;

    const th = (theta_deg * Math.PI) / 180.0;
    const al = (alpha_deg * Math.PI) / 180.0;

    const ct = Math.cos(th), st = Math.sin(th);
    const ca = Math.cos(al), sa = Math.sin(al);

    // Standard DH Transformation Matrix:
    // [ cos(th), -sin(th)*cos(al),  sin(th)*sin(al), a*cos(th) ]
    // [ sin(th),  cos(th)*cos(al), -cos(th)*sin(al), a*sin(th) ]
    // [    0   ,      sin(al)    ,      cos(al)    ,     d     ]
    // [    0   ,         0       ,         0       ,     1     ]
    const r11 = ct, r12 = -st * ca, r13 = st * sa, px = a_mm * ct;
    const r21 = st, r22 = ct * ca, r23 = -ct * sa, py = a_mm * st;
    const r31 = 0, r32 = sa, r33 = ca, pz = d_mm;

    psResEl.textContent = 'Position P: [X=' + px.toFixed(1) + ', Y=' + py.toFixed(1) + ', Z=' + pz.toFixed(1) + '] mm';
    mtResEl.textContent = 'R₁=[' + r11.toFixed(2) + ', ' + r12.toFixed(2) + ', ' + r13.toFixed(2) + '] | R₂=[' + r21.toFixed(2) + ', ' + r22.toFixed(2) + ', ' + r23.toFixed(2) + '] | R₃=[' + r31.toFixed(2) + ', ' + r32.toFixed(2) + ', ' + r33.toFixed(2) + ']';
  }

  [thEl, dEl, aEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();