(() => {
  'use strict';
  const xEl = document.getElementById('vc-x'), yEl = document.getElementById('vc-y'), zEl = document.getElementById('vc-z');
  const dvResEl = document.getElementById('vc-res-div'), crlResEl = document.getElementById('vc-res-curl');

  // Benchmark Vector Field: v = [ x*y, y*z, z*x ]
  // Divergence = d/dx(xy) + d/dy(yz) + d/dz(zx) = y + z + x
  // Curl = [ d/dy(zx) - d/dz(yz), d/dz(xy) - d/dx(zx), d/dx(yz) - d/dy(xy) ]
  //      = [ 0 - y, 0 - z, 0 - x ] = [ -y, -z, -x ]

  function update() {
    const x = parseFloat(xEl.value), y = parseFloat(yEl.value), z = parseFloat(zEl.value);
    if (isNaN(x) || isNaN(y) || isNaN(z)) return;

    const divergence = y + z + x;
    const curl_x = -y;
    const curl_y = -z;
    const curl_z = -x;

    dvResEl.textContent = '∇·v = ' + divergence.toFixed(2) + ' (Divergence Flux)';
    crlResEl.textContent = '∇×v = [ ' + curl_x.toFixed(2) + ', ' + curl_y.toFixed(2) + ', ' + curl_z.toFixed(2) + ' ] (v = [xy, yz, zx] @ (' + x + ', ' + y + ', ' + z + '))';
  }

  [xEl, yEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();