(() => {
  'use strict';
  const rmEl = document.getElementById('rc-rm'), rhomEl = document.getElementById('rc-rhom'), rhosEl = document.getElementById('rc-rhos');
  const flResEl = document.getElementById('rc-res-fluid'), rgResEl = document.getElementById('rc-res-rigid');

  function update() {
    const RM = parseFloat(rmEl.value), rhoM = parseFloat(rhomEl.value), rhom = parseFloat(rhosEl.value);
    if (isNaN(RM) || isNaN(rhoM) || isNaN(rhom) || RM <= 0 || rhoM <= 0 || rhom <= 0) return;

    const densityRatio = rhoM / rhom;
    const cubeRoot = Math.cbrt(densityRatio);

    // Rigid body: d_rigid = RM * (2 * rhoM / rhom)^(1/3) approx = 1.260 * RM * (rhoM/rhom)^(1/3)
    const dRigid = RM * Math.cbrt(2 * densityRatio);
    // Fluid body: d_fluid = 2.44 * RM * (rhoM / rhom)^(1/3)
    const dFluid = 2.44 * RM * cubeRoot;

    flResEl.textContent = Math.round(dFluid).toLocaleString() + ' km (Fluid Moon Limit, ' + (dFluid / RM).toFixed(2) + ' R_M)';
    rgResEl.textContent = 'Rigid Limit: ' + Math.round(dRigid).toLocaleString() + ' km (' + (dRigid / RM).toFixed(2) + ' R_M | Rings form inside this zone)';
  }

  [rmEl, rhomEl, rhosEl].forEach(el => el.addEventListener('input', update));
  update();
})();