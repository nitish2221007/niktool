(() => {
  'use strict';
  const vmEl = document.getElementById('mm-vmax'), kmEl = document.getElementById('mm-km'), sEl = document.getElementById('mm-s');
  const vResEl = document.getElementById('mm-res-v'), lbResEl = document.getElementById('mm-res-lb');

  function update() {
    const Vmax = parseFloat(vmEl.value), Km = parseFloat(kmEl.value), S = parseFloat(sEl.value);
    if (isNaN(Vmax) || isNaN(Km) || isNaN(S) || Vmax <= 0 || Km <= 0 || S <= 0) return;

    // v = Vmax * [S] / (Km + [S])
    const v = (Vmax * S) / (Km + S);
    const pctVmax = (v / Vmax) * 100;

    const invV = 1 / v;
    const invS = 1 / S;
    const slope = Km / Vmax;

    vResEl.textContent = 'v = ' + v.toFixed(1) + ' μM / s (' + pctVmax.toFixed(1) + '% V_max)';
    lbResEl.textContent = '1/v = ' + invV.toFixed(4) + ' s/μM | 1/[S] = ' + invS.toFixed(4) + ' μM⁻¹ (Slope K_m/V_max = ' + slope.toFixed(3) + ' s)';
  }

  [vmEl, kmEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();