(() => {
  'use strict';
  const lEl = document.getElementById('rl-ind'), cEl = document.getElementById('rl-cap'), rEl = document.getElementById('rl-res');
  const f0ResEl = document.getElementById('rl-res-f0'), qResEl = document.getElementById('rl-res-q');

  function update() {
    const L_uH = parseFloat(lEl.value), C_pF = parseFloat(cEl.value), R = parseFloat(rEl.value);
    if (isNaN(L_uH) || isNaN(C_pF) || isNaN(R) || L_uH <= 0 || C_pF <= 0 || R <= 0) return;

    const L = L_uH * 1e-6;
    const C = C_pF * 1e-12;

    // Resonant frequency: f0 = 1 / ( 2 * pi * sqrt(L * C) )  [Hz]
    const f0 = 1.0 / (2.0 * Math.PI * Math.sqrt(L * C));

    // Quality Factor Q = ( 1 / R ) * sqrt( L / C )
    const Q = (1.0 / R) * Math.sqrt(L / C);

    // Bandwidth BW = f0 / Q  [Hz]
    const BW = f0 / Q;

    let f0Str = '';
    if (f0 >= 1e6) f0Str = (f0 / 1e6).toFixed(3) + ' MHz';
    else if (f0 >= 1e3) f0Str = (f0 / 1e3).toFixed(2) + ' kHz';
    else f0Str = f0.toFixed(1) + ' Hz';

    let bwStr = '';
    if (BW >= 1e6) bwStr = (BW / 1e6).toFixed(2) + ' MHz';
    else if (BW >= 1e3) bwStr = (BW / 1e3).toFixed(2) + ' kHz';
    else bwStr = BW.toFixed(1) + ' Hz';

    f0ResEl.textContent = 'f₀ = ' + f0Str;
    qResEl.textContent = 'Quality Factor Q = ' + Q.toFixed(2) + ' | -3dB Bandwidth BW = ' + bwStr + ' (Characteristic Z₀ = ' + Math.sqrt(L/C).toFixed(1) + ' Ω @ R = ' + R + ' Ω)';
  }

  [lEl, cEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();