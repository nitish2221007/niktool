(() => {
  'use strict';
  const pEl = document.getElementById('cidr-prefix');
  const mEl = document.getElementById('cidr-res-mask'), hEl = document.getElementById('cidr-res-hosts'), wEl = document.getElementById('cidr-res-wild');

  function update() {
    const prefix = parseInt(pEl.value, 10);
    if (isNaN(prefix) || prefix < 0 || prefix > 32) return;

    // Mask integer = ~((1 << (32 - prefix)) - 1)
    const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const wildInt = (~maskInt) >>> 0;

    const m1 = (maskInt >>> 24) & 255, m2 = (maskInt >>> 16) & 255, m3 = (maskInt >>> 8) & 255, m4 = maskInt & 255;
    const w1 = (wildInt >>> 24) & 255, w2 = (wildInt >>> 16) & 255, w3 = (wildInt >>> 8) & 255, w4 = wildInt & 255;

    const totalIps = Math.pow(2, 32 - prefix);
    const usable = prefix === 32 ? 1 : (prefix === 31 ? 2 : Math.max(0, totalIps - 2));

    mEl.textContent = m1 + '.' + m2 + '.' + m3 + '.' + m4;
    hEl.textContent = usable.toLocaleString() + ' Usable Hosts (' + totalIps.toLocaleString() + ' Total IPs)';
    wEl.textContent = w1 + '.' + w2 + '.' + w3 + '.' + w4;
  }

  pEl.addEventListener('change', update);
  update();
})();