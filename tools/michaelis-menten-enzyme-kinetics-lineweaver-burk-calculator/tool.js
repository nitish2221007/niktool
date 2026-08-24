(() => {
  'use strict';
  const vmEl = document.getElementById('mm-vmax'), kmEl = document.getElementById('mm-km'), sEl = document.getElementById('mm-s');
  const vResEl = document.getElementById('mm-res-v'), lbResEl = document.getElementById('mm-res-lb');

  function update() {
    const V_max = parseFloat(vmEl.value), K_m = parseFloat(kmEl.value), S = parseFloat(sEl.value);
    if (isNaN(V_max) || isNaN(K_m) || isNaN(S) || V_max <= 0 || K_m <= 0 || S < 0) return;

    // Michaelis-Menten: v = ( V_max * [S] ) / ( K_m + [S] )
    const v = (V_max * S) / (K_m + S);
    const frac_vmax = (v / V_max) * 100.0;

    // Lineweaver-Burk slope: K_m / V_max
    const slope = K_m / V_max;

    let regime = '';
    if (S < (0.1 * K_m)) regime = 'First-Order Kinetics ([S] << K_m: v ∝ [S])';
    else if (S > (10.0 * K_m)) regime = 'Zero-Order Saturated Kinetics ([S] >> K_m: v ≈ V_max)';
    else regime = 'Mixed-Order Transition Kinetics';

    vResEl.textContent = 'v = ' + v.toFixed(2) + ' μM / min (' + frac_vmax.toFixed(1) + '% V_max)';
    lbResEl.textContent = 'Lineweaver-Burk Slope = ' + slope.toFixed(3) + ' min | ' + regime;
  }

  [vmEl, kmEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();