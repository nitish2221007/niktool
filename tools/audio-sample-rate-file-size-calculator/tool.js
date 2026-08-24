(() => {
  'use strict';
  const srEl = document.getElementById('aud-sr'), dEl = document.getElementById('aud-depth');
  const chEl = document.getElementById('aud-ch'), mEl = document.getElementById('aud-mins');
  const sResEl = document.getElementById('aud-res-size'), bResEl = document.getElementById('aud-res-br');

  function update() {
    const sr = parseFloat(srEl.value), depth = parseFloat(dEl.value), ch = parseFloat(chEl.value), mins = parseFloat(mEl.value);
    if (isNaN(sr) || isNaN(depth) || isNaN(ch) || isNaN(mins) || mins <= 0) return;

    // Bitrate = sample_rate * bit_depth * channels (bits per second)
    const bps = sr * depth * ch;
    const kbps = bps / 1000;

    // Total bytes = (bps / 8) * (mins * 60)
    const totalBytes = (bps / 8) * (mins * 60);
    const totalMb = totalBytes / (1024 * 1024);

    sResEl.textContent = totalMb >= 1000 ? (totalMb / 1024).toFixed(2) + ' GB' : totalMb.toFixed(2) + ' MB';
    bResEl.textContent = Math.round(kbps).toLocaleString() + ' kbps (' + (kbps / 8).toFixed(1) + ' kB/s)';
  }

  [srEl, dEl, chEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();