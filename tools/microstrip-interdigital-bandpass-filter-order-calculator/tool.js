(() => {
  'use strict';
  const apEl = document.getElementById('flt-ap'), asEl = document.getElementById('flt-as'), ratEl = document.getElementById('flt-ratio');
  const chResEl = document.getElementById('flt-res-cheb'), btResEl = document.getElementById('flt-res-butt');

  function update() {
    const Ap = parseFloat(apEl.value), As = parseFloat(asEl.value), wRatio = parseFloat(ratEl.value);
    if (isNaN(Ap) || isNaN(As) || isNaN(wRatio) || Ap <= 0 || As <= Ap || wRatio <= 1.0) return;

    // Epsilon parameter: eps = sqrt( 10^(0.1*Ap) - 1 )
    const eps = Math.sqrt(Math.pow(10, 0.1 * Ap) - 1.0);

    // Stopband parameter: g = sqrt( (10^(0.1*As) - 1) / eps^2 )
    const g = Math.sqrt((Math.pow(10, 0.1 * As) - 1.0) / Math.pow(eps, 2));

    // Chebyshev order n_cheb = acosh(g) / acosh(wRatio)
    const n_cheb_exact = Math.acosh(g) / Math.acosh(wRatio);
    const n_cheb = Math.ceil(n_cheb_exact);

    // Butterworth order n_butt = log10( (10^(0.1*As) - 1) / (10^(0.1*Ap) - 1) ) / ( 2 * log10(wRatio) )
    const n_butt_exact = Math.log10((Math.pow(10, 0.1 * As) - 1.0) / (Math.pow(10, 0.1 * Ap) - 1.0)) / (2 * Math.log10(wRatio));
    const n_butt = Math.ceil(n_butt_exact);

    chResEl.textContent = 'n = ' + n_cheb + ' Order (Chebyshev Type I)';
    btResEl.textContent = 'Butterworth Order: n = ' + n_butt + ' (Chebyshev saves ' + (n_butt - n_cheb) + ' resonator stages | Exact n = ' + n_cheb_exact.toFixed(2) + ')';
  }

  [apEl, asEl, ratEl].forEach(el => el.addEventListener('input', update));
  update();
})();