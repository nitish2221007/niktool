(function() {
  'use strict';
  var slug = 'surface-area-volume-calculator';
  var shapeEl = document.getElementById(slug + '-input');
  var d1El = document.getElementById(slug + '-d1');
  var d2El = document.getElementById(slug + '-d2');
  var d3El = document.getElementById(slug + '-d3');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  var PI = Math.PI;
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function f(v){ return v.toFixed(4); }
  btn.addEventListener('click', function() {
    var shape = shapeEl.value;
    var d1 = parseFloat(d1El.value), d2 = parseFloat(d2El.value), d3 = parseFloat(d3El.value);
    if (isNaN(d1) || d1 <= 0) { setMsg('Dimension 1 must be a positive number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var csa, tsa, vol, out;
    out = 'Solid: ' + shape + '\n';
    if (shape === 'cube') {
      var a = d1;
      csa = 4*a*a; tsa = 6*a*a; vol = a*a*a;
      out += 'Side = ' + a + '\n';
    } else if (shape === 'cuboid') {
      if (isNaN(d2) || isNaN(d3) || d2 <= 0 || d3 <= 0) { setMsg('Cuboid needs positive length, width and depth.', true); return; }
      var l=d1, w=d2, h=d3;
      csa = 2*h*(l+w); tsa = 2*(l*w + w*h + h*l); vol = l*w*h;
      out += 'l=' + l + ', w=' + w + ', h=' + h + '\n';
    } else if (shape === 'cylinder') {
      if (isNaN(d2) || d2 <= 0) { setMsg('Cylinder needs radius and height.', true); return; }
      var r=d1, hh=d2;
      csa = 2*PI*r*hh; tsa = 2*PI*r*(r+hh); vol = PI*r*r*hh;
      out += 'r=' + r + ', h=' + hh + '\n';
    } else if (shape === 'cone') {
      if (isNaN(d2) || d2 <= 0) { setMsg('Cone needs radius and height.', true); return; }
      var rc=d1, hc=d2, l = Math.sqrt(rc*rc + hc*hc);
      csa = PI*rc*l; tsa = PI*rc*(rc+l); vol = (1/3)*PI*rc*rc*hc;
      out += 'r=' + rc + ', h=' + hc + '\nSlant height l = ' + f(l) + '\n';
    } else if (shape === 'sphere') {
      var rs=d1;
      csa = 4*PI*rs*rs; tsa = 4*PI*rs*rs; vol = (4/3)*PI*rs*rs*rs;
      out += 'r=' + rs + '\n';
    } else {
      var rh=d1;
      csa = 2*PI*rh*rh; tsa = 3*PI*rh*rh; vol = (2/3)*PI*rh*rh*rh;
      out += 'r=' + rh + '\n';
    }
    out += '\nCSA / LSA = ' + f(csa) + ' sq units\n';
    out += 'TSA = ' + f(tsa) + ' sq units\n';
    out += 'Volume = ' + f(vol) + ' cubic units';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Surface area and volume calculated.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    d1El.value=''; d2El.value=''; d3El.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Choose a solid and enter dimensions.');
  });
})();
