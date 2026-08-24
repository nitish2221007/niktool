(() => {
  'use strict';
  const hEl = document.getElementById('mi-h'), kEl = document.getElementById('mi-k'), lEl = document.getElementById('mi-l'), aEl = document.getElementById('mi-a');
  const dhResEl = document.getElementById('mi-res-dhkl'), apResEl = document.getElementById('mi-res-apf');

  function update() {
    const h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);
    const a_A = parseFloat(aEl.value);

    if (isNaN(h) || isNaN(k) || isNaN(l) || isNaN(a_A) || a_A <= 0 || (h===0 && k===0 && l===0)) return;

    // d_hkl = a / sqrt(h^2 + k^2 + l^2)
    const sum_sq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    const d_hkl_A = a_A / Math.sqrt(sum_sq);
    const d_hkl_nm = d_hkl_A / 10.0;

    // Metallic radius for FCC: r = a * sqrt(2) / 4
    const r_fcc = (a_A * Math.SQRT2) / 4.0;

    dhResEl.textContent = 'd₍' + h + k + l + '₎ = ' + d_hkl_A.toFixed(3) + ' Å (' + d_hkl_nm.toFixed(4) + ' nm)';
    apResEl.textContent = 'FCC Metallic Radius r = ' + r_fcc.toFixed(3) + ' Å | h²+k²+l² = ' + sum_sq + ' (a=' + a_A + ' Å)';
  }

  [hEl, kEl, lEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();