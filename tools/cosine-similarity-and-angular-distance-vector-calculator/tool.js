(() => {
  'use strict';
  const uEl = document.getElementById('cs-u'), vEl = document.getElementById('cs-v');
  const cosResEl = document.getElementById('cs-res-cos'), angResEl = document.getElementById('cs-res-ang');

  function update() {
    const uStr = uEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const vStr = vEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (uStr.length === 0 || vStr.length === 0 || uStr.length !== vStr.length) return;

    let dot = 0, normU_sq = 0, normV_sq = 0, euc_sq = 0;
    for (let i = 0; i < uStr.length; i++) {
      dot += uStr[i] * vStr[i];
      normU_sq += Math.pow(uStr[i], 2);
      normV_sq += Math.pow(vStr[i], 2);
      euc_sq += Math.pow(uStr[i] - vStr[i], 2);
    }

    const normU = Math.sqrt(normU_sq);
    const normV = Math.sqrt(normV_sq);
    if (normU === 0 || normV === 0) return;

    // Cosine similarity: cos_theta = dot / (normU * normV)
    let cos_theta = dot / (normU * normV);
    cos_theta = Math.max(-1.0, Math.min(1.0, cos_theta));

    const cos_dist = 1.0 - cos_theta;
    const theta_rad = Math.acos(cos_theta);
    const theta_deg = (theta_rad * 180.0) / Math.PI;
    const euc_dist = Math.sqrt(euc_sq);

    cosResEl.textContent = 'Cosine Similarity = ' + cos_theta.toFixed(4);
    angResEl.textContent = 'Angle θ = ' + theta_deg.toFixed(2) + '° | Cosine Distance = ' + cos_dist.toFixed(4) + ' | Euclidean Distance = ' + euc_dist.toFixed(3) + ' (' + uStr.length + '-D vectors)';
  }

  uEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();