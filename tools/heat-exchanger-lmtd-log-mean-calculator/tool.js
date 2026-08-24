(() => {
  'use strict';
  const fEl = document.getElementById('lmt-flow'), thiEl = document.getElementById('lmt-thin'), thoEl = document.getElementById('lmt-thout');
  const tciEl = document.getElementById('lmt-tcin'), tcoEl = document.getElementById('lmt-tcout');
  const lmtResEl = document.getElementById('lmt-res-val'), splResEl = document.getElementById('lmt-res-splits');

  function update() {
    const flow = fEl.value;
    const Thi = parseFloat(thiEl.value), Tho = parseFloat(thoEl.value);
    const Tci = parseFloat(tciEl.value), Tco = parseFloat(tcoEl.value);

    if (isNaN(Thi) || isNaN(Tho) || isNaN(Tci) || isNaN(Tco) || Thi <= Tho || Tco <= Tci) return;

    let dt1 = 0, dt2 = 0;
    if (flow === 'counter') {
      // Counter-flow: dt1 = Thi - Tco, dt2 = Tho - Tci
      dt1 = Thi - Tco;
      dt2 = Tho - Tci;
    } else {
      // Parallel-flow: dt1 = Thi - Tci, dt2 = Tho - Tco
      dt1 = Thi - Tci;
      dt2 = Tho - Tco;
    }

    if (dt1 <= 0 || dt2 <= 0) {
      lmtResEl.textContent = 'Invalid Temperature Cross!';
      lmtResEl.style.color = '#c53030';
      return;
    }

    // LMTD = (dt1 - dt2) / ln(dt1 / dt2)
    let lmtd = 0;
    if (Math.abs(dt1 - dt2) < 0.001) {
      lmtd = dt1; // Arithmetic limit
    } else {
      lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);
    }

    lmtResEl.textContent = lmtd.toFixed(2) + ' °C LMTD';
    lmtResEl.style.color = '#22543d';
    splResEl.textContent = 'ΔT₁ = ' + dt1.toFixed(1) + ' °C, ΔT₂ = ' + dt2.toFixed(1) + ' °C';
  }

  [fEl, thiEl, thoEl, tciEl, tcoEl].forEach(el => el.addEventListener('input', update));
  update();
})();