(() => {
  'use strict';
  const typeEl = document.getElementById('mag-type'), tEl = document.getElementById('mag-temp');
  const vResEl = document.getElementById('mag-res-visc'), eResEl = document.getElementById('mag-res-erupt');

  const MAGMA_MODELS = {
    'basalt':   { baseLog: 2.0, sio2: '50%', defaultT: 1150, desc: 'Effusive Gentle Lava Flow (Pahoehoe / Aa)' },
    'andesite': { baseLog: 4.5, sio2: '60%', defaultT: 1000, desc: 'Intermediate Explosive Vulcanian Eruptions' },
    'dacite':   { baseLog: 6.5, sio2: '68%', defaultT: 900,  desc: 'Highly Explosive Plinian Eruption & Lava Domes' },
    'rhyolite': { baseLog: 8.5, sio2: '75%', defaultT: 800,  desc: 'Catastrophic Ultra-Plinian Supervolcano Caldera' }
  };

  function update() {
    const m = MAGMA_MODELS[typeEl.value];
    const Tc = parseFloat(tEl.value);
    if (isNaN(Tc) || Tc < 500 || Tc > 1500) return;

    // Arrhenius temperature correction relative to default reference temp
    const deltaT = (m.defaultT - Tc) / 100;
    const logVisc = m.baseLog + (deltaT * 0.8);
    const viscPaS = Math.pow(10, logVisc);

    let vStr = '';
    if (viscPaS < 1e4) vStr = Math.round(viscPaS).toLocaleString() + ' Pa · s';
    else vStr = viscPaS.toExponential(2) + ' Pa · s';

    vResEl.textContent = 'η ≈ ' + vStr + ' (log₁₀ η = ' + logVisc.toFixed(1) + ')';
    eResEl.textContent = m.desc + ' (' + m.sio2 + ' SiO₂ @ ' + Tc + '°C)';
  }

  typeEl.addEventListener('change', () => {
    tEl.value = MAGMA_MODELS[typeEl.value].defaultT;
    update();
  });
  tEl.addEventListener('input', update);
  update();
})();