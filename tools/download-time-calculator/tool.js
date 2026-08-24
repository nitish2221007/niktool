(() => {
  'use strict';
  const sizeEl = document.getElementById('dl-size');
  const sizeUnitEl = document.getElementById('dl-size-unit');
  const speedEl = document.getElementById('dl-speed');
  const speedUnitEl = document.getElementById('dl-speed-unit');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('dl-res-card');
  const resTime = document.getElementById('dl-res-time');
  const resRate = document.getElementById('dl-res-transfer-rate');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function formatDuration(sec) {
    if (sec < 60) return Math.ceil(sec) + ' Seconds';
    const min = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    if (min < 60) return min + ' Min ' + s + ' Sec';
    const hr = Math.floor(min / 60);
    const m = min % 60;
    if (hr < 24) return hr + ' Hours ' + m + ' Min';
    const days = Math.floor(hr / 24);
    const h = hr % 24;
    return days + ' Days ' + h + ' Hours';
  }

  btn.addEventListener('click', () => {
    const size = parseFloat(sizeEl.value);
    const speed = parseFloat(speedEl.value);

    if (isNaN(size) || isNaN(speed) || size <= 0 || speed <= 0) {
      setMsg('Please enter valid positive numbers for file size and connection speed.', true);
      resCard.style.display = 'none';
      return;
    }

    // Convert file size to MegaBytes (MB)
    let sizeMB = size;
    if (sizeUnitEl.value === 'GB') sizeMB = size * 1024;
    else if (sizeUnitEl.value === 'TB') sizeMB = size * 1024 * 1024;

    // Convert speed to MegaBytes per second (MB/s)
    let speedMBps = speed;
    if (speedUnitEl.value === 'Mbps') speedMBps = speed / 8;
    else if (speedUnitEl.value === 'Gbps') speedMBps = (speed * 1000) / 8;

    const totalSeconds = sizeMB / speedMBps;

    resTime.textContent = formatDuration(totalSeconds);
    resRate.textContent = speedMBps.toFixed(2) + ' MB/s';

    resCard.style.display = 'block';
    setMsg('Download duration calculated.');
  });

  clearBtn.addEventListener('click', () => {
    sizeEl.value = ''; speedEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();