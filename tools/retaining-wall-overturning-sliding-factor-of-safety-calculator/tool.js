(() => {
  'use strict';
  const mrEl = document.getElementById('rw-mr'), moEl = document.getElementById('rw-mo');
  const rvEl = document.getElementById('rw-rv'), phEl = document.getElementById('rw-ph'), muEl = document.getElementById('rw-mu');
  const fsoResEl = document.getElementById('rw-res-fso'), fssResEl = document.getElementById('rw-res-fss');

  function update() {
    const MR = parseFloat(mrEl.value), MO = parseFloat(moEl.value);
    const Rv = parseFloat(rvEl.value), Ph = parseFloat(phEl.value), mu = parseFloat(muEl.value);

    if (isNaN(MR) || isNaN(MO) || isNaN(Rv) || isNaN(Ph) || isNaN(mu) || MO <= 0 || Ph <= 0 || Rv <= 0 || mu <= 0) return;

    // FS against overturning = sum(M_R) / sum(M_O)
    const FS_ot = MR / MO;

    // Sliding resistance force Fr = mu * Rv  [kN / m]
    const Fr = mu * Rv;
    // FS against sliding = Fr / Ph
    const FS_sl = Fr / Ph;

    let otColor = FS_ot >= 2.0 ? '#22543d' : (FS_ot >= 1.5 ? '#d97706' : '#c53030');
    let slColor = FS_sl >= 1.5 ? '#22543d' : (FS_sl >= 1.2 ? '#d97706' : '#c53030');

    fsoResEl.textContent = 'FS_overturn = ' + FS_ot.toFixed(2) + ' (' + (FS_ot >= 2.0 ? 'SAFE ≥ 2.0 Code Compliant' : 'FAIL: Below 2.0 Minimum!') + ')';
    fsoResEl.style.color = otColor;

    fssResEl.textContent = 'FS_sliding = ' + FS_sl.toFixed(2) + ' (' + (FS_sl >= 1.5 ? 'SAFE ≥ 1.5' : 'FAIL: Base Key or Wider Footing Required!') + ' | Resisting Force F_r = ' + Fr.toFixed(1) + ' kN/m)';
    fssResEl.style.color = slColor;
  }

  [mrEl, moEl, rvEl, phEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();