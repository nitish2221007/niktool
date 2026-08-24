(() => {
  'use strict';
  const gEl = document.getElementById('wlk-gender'), bwEl = document.getElementById('wlk-bw'), totEl = document.getElementById('wlk-total');
  const scEl = document.getElementById('wlk-res-score'), clEl = document.getElementById('wlk-res-class');

  // Wilks polynomial coefficients
  const M_COEFFS = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-6, -1.291e-8];
  const F_COEFFS = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-5, -9.054e-8];

  function update() {
    const isMale = gEl.value === 'male';
    const bw = parseFloat(bwEl.value), total = parseFloat(totEl.value);
    if (isNaN(bw) || isNaN(total) || bw <= 30 || total <= 0) return;

    const c = isMale ? M_COEFFS : F_COEFFS;
    const denom = c[0] + (c[1] * bw) + (c[2] * Math.pow(bw, 2)) + (c[3] * Math.pow(bw, 3)) + (c[4] * Math.pow(bw, 4)) + (c[5] * Math.pow(bw, 5));
    const coeff = 500 / denom;
    const wilks = total * coeff;

    scEl.textContent = wilks.toFixed(1) + ' Wilks Points';

    if (wilks >= 450) {
      clEl.textContent = 'Elite National / International Competitor (450+)';
      clEl.style.color = '#22543d';
    } else if (wilks >= 380) {
      clEl.textContent = 'Advanced Competitive Lifter (380-450)';
      clEl.style.color = '#2563eb';
    } else if (wilks >= 300) {
      clEl.textContent = 'Intermediate Lifter (300-380)';
      clEl.style.color = '#d97706';
    } else {
      clEl.textContent = 'Novice / Developing Lifter (<300)';
      clEl.style.color = '#7c3aed';
    }
  }

  [gEl, bwEl, totEl].forEach(el => el.addEventListener('input', update));
  update();
})();