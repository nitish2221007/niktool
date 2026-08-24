(() => {
  'use strict';
  const lamEl = document.getElementById('brg-lam'), th2El = document.getElementById('brg-2th');
  const hEl = document.getElementById('brg-h'), kEl = document.getElementById('brg-k'), lEl = document.getElementById('brg-l');
  const dResEl = document.getElementById('brg-res-d'), aResEl = document.getElementById('brg-res-a');

  function update() {
    const lambdaA = parseFloat(lamEl.value), twoThetaDeg = parseFloat(th2El.value);
    const h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);

    if (isNaN(lambdaA) || isNaN(twoThetaDeg) || isNaN(h) || isNaN(k) || isNaN(l) || lambdaA <= 0 || twoThetaDeg <= 0 || twoThetaDeg >= 180) return;

    const thetaDeg = twoThetaDeg / 2;
    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Bragg's Law for first order (n=1): d = lambda / (2 * sin(theta))
    const dSpacingA = lambdaA / (2 * Math.sin(thetaRad));
    const dSpacingNm = dSpacingA / 10;

    // For cubic crystal: a = d * sqrt(h^2 + k^2 + l^2)
    const hklSumSq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    const aLatticeA = dSpacingA * Math.sqrt(hklSumSq);

    dResEl.textContent = 'd_' + h + k + l + ' = ' + dSpacingA.toFixed(4) + ' Å (' + dSpacingNm.toFixed(4) + ' nm)';
    aResEl.textContent = 'Cubic Lattice a = ' + aLatticeA.toFixed(4) + ' Å (Peak θ = ' + thetaDeg.toFixed(2) + '° | Planes (' + h + ',' + k + ',' + l + '))';
  }

  [lamEl, th2El, hEl, kEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();