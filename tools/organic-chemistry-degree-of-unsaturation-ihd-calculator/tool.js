(() => {
  'use strict';
  const cEl = document.getElementById('ihd-c'), hEl = document.getElementById('ihd-h');
  const xEl = document.getElementById('ihd-x'), nEl = document.getElementById('ihd-n');
  const valResEl = document.getElementById('ihd-res-val'), stResEl = document.getElementById('ihd-res-struc');

  function update() {
    const C = parseInt(cEl.value, 10) || 0;
    const H = parseInt(hEl.value, 10) || 0;
    const X = parseInt(xEl.value, 10) || 0;
    const N = parseInt(nEl.value, 10) || 0;

    // IHD formula: IHD = C + 1 - (H / 2) - (X / 2) + (N / 2)
    const IHD = C + 1 - (H / 2.0) - (X / 2.0) + (N / 2.0);

    let structure = '';
    let color = '#22543d';

    if (IHD < 0 || Math.floor(IHD) !== IHD) {
      valResEl.textContent = 'Invalid Molecular Formula!';
      stResEl.textContent = 'Valence rules violated. Check atom counts.';
      return;
    }

    if (IHD === 0) {
      structure = 'FULLY SATURATED (0 Rings, 0 Pi Bonds: Pure Alkane / Alcohol / Ether)';
      color = '#22543d';
    } else if (IHD === 1) {
      structure = '1 DOUBLE BOND (C=C or C=O Carbonyl) OR 1 Monocyclic Ring';
      color = '#2563eb';
    } else if (IHD === 2) {
      structure = '1 TRIPLE BOND (Alkyne / Nitrile) OR 2 Double Bonds / Rings';
      color = '#2563eb';
    } else if (IHD >= 4) {
      structure = 'STRONG AROMATIC BENZENE RING INDICATOR (IHD ≥ 4: 1 Ring + 3 Double Bonds in Phenyl Core)';
      color = '#22543d';
    } else {
      structure = IHD + ' Total Combined Pi (π) Bonds and/or Carbocyclic Rings';
      color = '#2563eb';
    }

    valResEl.textContent = 'IHD = ' + IHD + ' Degrees of Unsaturation';
    valResEl.style.color = color;
    stResEl.textContent = structure + ' (C' + C + 'H' + H + (X > 0 ? 'X' + X : '') + (N > 0 ? 'N' + N : '') + ')';
    stResEl.style.color = color;
  }

  [cEl, hEl, xEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();