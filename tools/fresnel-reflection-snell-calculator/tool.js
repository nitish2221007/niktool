(() => {
  'use strict';
  const n1El = document.getElementById('frn-n1'), n2El = document.getElementById('frn-n2'), th1El = document.getElementById('frn-th1');
  const unResEl = document.getElementById('frn-res-unpol'), brResEl = document.getElementById('frn-res-brew');

  function toRad(deg) { return (deg * Math.PI) / 180; }
  function toDeg(rad) { return (rad * 180) / Math.PI; }

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value), th1Deg = parseFloat(th1El.value);
    if (isNaN(n1) || isNaN(n2) || isNaN(th1Deg) || n1 <= 0 || n2 <= 0 || th1Deg < 0 || th1Deg >= 90) return;

    const th1 = toRad(th1Deg);
    // Snell's Law: sin(th2) = (n1 / n2) * sin(th1)
    const sinTh2 = (n1 / n2) * Math.sin(th1);

    // Brewster angle theta_B = arctan(n2 / n1)
    const brewsterDeg = toDeg(Math.atan(n2 / n1));

    if (sinTh2 > 1.0) {
      unResEl.textContent = '100.0% Total Internal Reflection (TIR)';
      brResEl.textContent = 'θ_critical = ' + toDeg(Math.asin(n2 / n1)).toFixed(2) + '° (TIR Exceeded)';
      return;
    }

    const th2 = Math.asin(sinTh2);

    // Fresnel Equations:
    // r_s = [ n1*cos(th1) - n2*cos(th2) ] / [ n1*cos(th1) + n2*cos(th2) ]
    const rs = (n1 * Math.cos(th1) - n2 * Math.cos(th2)) / (n1 * Math.cos(th1) + n2 * Math.cos(th2));
    const Rs = Math.pow(rs, 2);

    // r_p = [ n2*cos(th1) - n1*cos(th2) ] / [ n2*cos(th1) + n1*cos(th2) ]
    const rp = (n2 * Math.cos(th1) - n1 * Math.cos(th2)) / (n2 * Math.cos(th1) + n1 * Math.cos(th2));
    const Rp = Math.pow(rp, 2);

    const R_unpol = (Rs + Rp) / 2;

    unResEl.textContent = (R_unpol * 100).toFixed(2) + '% Reflected (Rs: ' + (Rs * 100).toFixed(2) + '%, Rp: ' + (Rp * 100).toFixed(2) + '%)';
    brResEl.textContent = 'θ_B = ' + brewsterDeg.toFixed(2) + '° (Zero P-Wave Reflection)';
  }

  [n1El, n2El, th1El].forEach(el => el.addEventListener('input', update));
  update();
})();