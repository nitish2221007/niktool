(() => {
  'use strict';
  const pEl = document.getElementById('pw-str'), hEl = document.getElementById('pw-hash');
  const bResEl = document.getElementById('pw-res-bits'), tResEl = document.getElementById('pw-res-time');

  function update() {
    const pw = pEl.value;
    const hashesPerSec = parseFloat(hEl.value);

    if (!pw || pw.length === 0) {
      bResEl.textContent = '0.0 Bits of Entropy';
      tResEl.textContent = 'Instantaneous Crack (Empty)';
      return;
    }

    const L = pw.length;
    let poolSize = 0;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasDigits = /[0-9]/.test(pw);
    const hasSymbols = /[^a-zA-Z0-9]/.test(pw);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigits) poolSize += 10;
    if (hasSymbols) poolSize += 33;

    const entropyBits = L * (Math.log(poolSize) / Math.LN2);
    const log10_seconds = ((entropyBits - 1) * Math.LOG10E * Math.LN2) - Math.log10(hashesPerSec);
    const seconds = Math.pow(10, log10_seconds);
    const years = seconds / 31557600;

    let timeStr = '';
    if (log10_seconds > 18) {
      const expYears = (log10_seconds - Math.log10(31557600));
      timeStr = '10^' + expYears.toFixed(0) + ' Years (Cosmologically Uncrackable)';
      tResEl.style.color = '#22543d';
    } else if (years >= 1e9) {
      timeStr = (years / 1e9).toFixed(1) + ' Billion Years';
      tResEl.style.color = '#22543d';
    } else if (years >= 1e6) {
      timeStr = (years / 1e6).toFixed(1) + ' Million Years';
      tResEl.style.color = '#22543d';
    } else if (years >= 1.0) {
      timeStr = years.toFixed(1) + ' Years';
      tResEl.style.color = '#2563eb';
    } else if (seconds >= 86400) {
      timeStr = (seconds / 86400).toFixed(1) + ' Days';
      tResEl.style.color = '#d97706';
    } else if (seconds >= 3600) {
      timeStr = (seconds / 3600).toFixed(1) + ' Hours';
      tResEl.style.color = '#c53030';
    } else if (seconds >= 60) {
      timeStr = (seconds / 60).toFixed(1) + ' Minutes';
      tResEl.style.color = '#c53030';
    } else {
      timeStr = seconds.toFixed(2) + ' Seconds (CRACKED INSTANTLY)';
      tResEl.style.color = '#c53030';
    }

    bResEl.textContent = entropyBits.toFixed(1) + ' Bits (L = ' + L + ', Pool N = ' + poolSize + ')';
    tResEl.textContent = timeStr + ' @ ' + (hashesPerSec >= 1e12 ? (hashesPerSec/1e12) + ' TH/s' : (hashesPerSec/1e9) + ' GH/s');
  }

  pEl.addEventListener('input', update);
  hEl.addEventListener('change', update);
  update();
})();