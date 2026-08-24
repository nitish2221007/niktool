(() => {
  'use strict';
  const tinEl = document.getElementById('ct-tin'), toutEl = document.getElementById('ct-tout');
  const twbEl = document.getElementById('ct-twb'), lgEl = document.getElementById('ct-lg');
  const ntuResEl = document.getElementById('ct-res-ntu'), rgResEl = document.getElementById('ct-res-range');

  function update() {
    const T_in = parseFloat(tinEl.value), T_out = parseFloat(toutEl.value);
    const T_wb = parseFloat(twbEl.value), L_over_G = parseFloat(lgEl.value);

    if (isNaN(T_in) || isNaN(T_out) || isNaN(T_wb) || isNaN(L_over_G) || T_in <= T_out || T_out <= T_wb || L_over_G <= 0) return;

    // Cooling Range: Range = T_in - T_out
    const range = T_in - T_out;
    // Wet-bulb Approach: Approach = T_out - T_wb
    const approach = T_out - T_wb;

    // Chebyshev 4-point numerical integration for Merkel NTU approx:
    // NTU = (Range / 4) * ( 1/dh1 + 1/dh2 + 1/dh3 + 1/dh4 )
    // Approximate empirical Merkel NTU:
    const NTU = range / ( approach + (0.1 * range) );

    ntuResEl.textContent = 'Merkel NTU = ' + NTU.toFixed(2) + ' Transfer Units';
    rgResEl.textContent = 'Range = ' + range.toFixed(1) + '°C | Approach = ' + approach.toFixed(1) + '°C (L/G = ' + L_over_G.toFixed(2) + ')';
  }

  [tinEl, toutEl, twbEl, lgEl].forEach(el => el.addEventListener('input', update));
  update();
})();