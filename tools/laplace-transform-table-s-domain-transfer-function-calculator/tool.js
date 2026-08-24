(() => {
  'use strict';
  const sigEl = document.getElementById('lap-sig'), aEl = document.getElementById('lap-a'), wEl = document.getElementById('lap-w');
  const fsResEl = document.getElementById('lap-res-fs'), rocResEl = document.getElementById('lap-res-roc');

  function update() {
    const sig = sigEl.value;
    const a = parseFloat(aEl.value) || 0, w = parseFloat(wEl.value) || 0;

    let Fs = '', poles = '', roc = '';

    if (sig === 'damped_cos') {
      Fs = '(s + ' + a + ') / ((s + ' + a + ')² + ' + Math.pow(w, 2) + ')';
      poles = 's = -' + a + ' ± ' + w + 'j';
      roc = 'Re(s) > -' + a;
    } else if (sig === 'damped_sin') {
      Fs = w + ' / ((s + ' + a + ')² + ' + Math.pow(w, 2) + ')';
      poles = 's = -' + a + ' ± ' + w + 'j';
      roc = 'Re(s) > -' + a;
    } else if (sig === 'step') {
      Fs = '1 / s';
      poles = 's = 0';
      roc = 'Re(s) > 0';
    } else if (sig === 'exp') {
      Fs = '1 / (s + ' + a + ')';
      poles = 's = -' + a;
      roc = 'Re(s) > -' + a;
    } else if (sig === 'ramp') {
      Fs = '1 / s²';
      poles = 's = 0 (Double pole)';
      roc = 'Re(s) > 0';
    } else if (sig === 'cos') {
      Fs = 's / (s² + ' + Math.pow(w, 2) + ')';
      poles = 's = ±' + w + 'j';
      roc = 'Re(s) > 0';
    } else if (sig === 'sin') {
      Fs = w + ' / (s² + ' + Math.pow(w, 2) + ')';
      poles = 's = ±' + w + 'j';
      roc = 'Re(s) > 0';
    }

    fsResEl.textContent = 'F(s) = ' + Fs;
    rocResEl.textContent = 'Poles: ' + poles + ' | Region of Convergence: ' + roc;
  }

  [sigEl, aEl, wEl].forEach(el => el.addEventListener('input', update));
  sigEl.addEventListener('change', update);
  update();
})();