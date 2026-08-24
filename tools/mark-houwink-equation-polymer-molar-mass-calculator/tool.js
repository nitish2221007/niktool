(() => {
  'use strict';
  const etaEl = document.getElementById('mh-eta'), kEl = document.getElementById('mh-k'), aEl = document.getElementById('mh-a');
  const mvResEl = document.getElementById('mh-res-mv'), cfResEl = document.getElementById('mh-res-conf');

  function update() {
    const eta = parseFloat(etaEl.value), K = parseFloat(kEl.value), a = parseFloat(aEl.value);
    if (isNaN(eta) || isNaN(K) || isNaN(a) || eta <= 0 || K <= 0 || a <= 0) return;

    // Mark-Houwink: [eta] = K * (M_v)^a  =>  M_v = ( [eta] / K )^(1 / a)
    const Mv = Math.pow(eta / K, 1 / a);
    const DP = Mv / 104.15; // assuming styrene monomer Mw = 104.15 g/mol

    let solventQuality = '';
    if (a < 0.5) solventQuality = 'Collapsed Compact Globule (a < 0.5)';
    else if (Math.abs(a - 0.5) < 0.02) solventQuality = 'Theta Solvent Condition (Ideal Unperturbed Gaussian Coil, a = 0.50)';
    else if (a <= 0.8) solventQuality = 'Good Solvent Expanded Random Coil (0.5 < a < 0.8)';
    else solventQuality = 'Semi-Rigid / Rigid Extended Rod Polymer Chain (a > 0.8)';

    mvResEl.textContent = 'M_v = ' + Math.round(Mv).toLocaleString() + ' g / mol (' + (Mv / 1000).toFixed(1) + ' kDa)';
    cfResEl.textContent = solventQuality + ' | DP ≈ ' + Math.round(DP).toLocaleString() + ' Monomer Units';
  }

  [etaEl, kEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();