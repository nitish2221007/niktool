(() => {
  'use strict';
  const llEl = document.getElementById('sc-ll'), plEl = document.getElementById('sc-pl');
  const uscsResEl = document.getElementById('sc-res-uscs'), piResEl = document.getElementById('sc-res-pi');

  function update() {
    const LL = parseFloat(llEl.value), PL = parseFloat(plEl.value);
    if (isNaN(LL) || isNaN(PL) || LL <= 0 || PL < 0 || LL <= PL) return;

    // Plasticity Index: PI = LL - PL
    const PI = LL - PL;

    // Casagrande A-Line equation: PI_A = 0.73 * (LL - 20)
    const PI_A_line = 0.73 * (LL - 20.0);

    let symbol = '', name = '', color = '#22543d';

    if (LL < 50.0) {
      // Low Plasticity (L)
      if (PI > PI_A_line && PI > 7.0) {
        symbol = 'CL';
        name = 'LEAN CLAY (Low to medium plasticity, above A-line)';
        color = '#22543d';
      } else if (PI < PI_A_line || PI < 4.0) {
        symbol = 'ML';
        name = 'SILT (Low plasticity inorganic silt, below A-line)';
        color = '#2563eb';
      } else {
        symbol = 'CL-ML';
        name = 'SILTY CLAY (Dual classification: 4 ≤ PI ≤ 7)';
        color = '#d97706';
      }
    } else {
      // High Plasticity (H)
      if (PI > PI_A_line) {
        symbol = 'CH';
        name = 'FAT CLAY (High plasticity expansive clay, above A-line)';
        color = '#c53030';
      } else {
        symbol = 'MH';
        name = 'ELASTIC SILT (High plasticity inorganic silt, below A-line)';
        color = '#ea580c';
      }
    }

    uscsResEl.textContent = symbol + ' - ' + name.split(' (')[0];
    uscsResEl.style.color = color;
    piResEl.textContent = 'Plasticity Index PI = ' + PI.toFixed(1) + '% | A-Line = ' + PI_A_line.toFixed(2) + '% (' + (PI > PI_A_line ? 'Above A-Line' : 'Below A-Line') + ' @ LL = ' + LL + '%)';
  }

  llEl.addEventListener('input', update);
  plEl.addEventListener('input', update);
  update();
})();