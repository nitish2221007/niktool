(() => {
  'use strict';

  const liveEpochSec = document.getElementById('live-epoch-sec');
  const copyLiveBtn = document.getElementById('copy-live-epoch');
  const toggleTickerBtn = document.getElementById('toggle-ticker-btn');

  const epochInput = document.getElementById('epoch-input');
  const convertEpochBtn = document.getElementById('convert-epoch-btn');
  const epochResultCard = document.getElementById('epoch-result-card');

  const resRelative = document.getElementById('res-relative');
  const resMode = document.getElementById('res-mode');
  const resLocal = document.getElementById('res-local');
  const resUtc = document.getElementById('res-utc');
  const resIso = document.getElementById('res-iso');
  const resRfc = document.getElementById('res-rfc');

  const dateInput = document.getElementById('date-input');
  const convertDateBtn = document.getElementById('convert-date-btn');
  const dateResultCard = document.getElementById('date-result-card');
  const resSec = document.getElementById('res-sec');
  const resMs = document.getElementById('res-ms');

  const setNowBtn = document.getElementById('set-now-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const msgEl = document.getElementById('ts-message');

  if (!liveEpochSec || !epochInput || !convertEpochBtn) {
    console.error('Timestamp converter: Missing required elements.');
    return;
  }

  function setMsg(text, type = '') {
    msgEl.textContent = text;
    msgEl.className = `message${type ? ` ${type}` : ''}`;
  }

  // Ticker
  let tickerInterval = null;
  let tickerRunning = true;

  function updateLiveEpoch() {
    const nowSec = Math.floor(Date.now() / 1000);
    liveEpochSec.textContent = nowSec.toLocaleString('en-US', { useGrouping: false });
  }

  function startTicker() {
    updateLiveEpoch();
    tickerInterval = setInterval(updateLiveEpoch, 1000);
    tickerRunning = true;
    toggleTickerBtn.textContent = 'Pause Clock';
  }

  function stopTicker() {
    if (tickerInterval) clearInterval(tickerInterval);
    tickerRunning = false;
    toggleTickerBtn.textContent = 'Resume Clock';
  }

  startTicker();

  toggleTickerBtn.addEventListener('click', () => {
    if (tickerRunning) {
      stopTicker();
    } else {
      startTicker();
    }
  });

  copyLiveBtn.addEventListener('click', () => {
    const text = Math.floor(Date.now() / 1000).toString();
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(text, copyLiveBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setMsg('Current Unix timestamp copied.', 'success');
  });

  function getRelativeTimeString(date) {
    const now = Date.now();
    const diffMs = date.getTime() - now;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHours = Math.round(diffMin / 60);
    const diffDays = Math.round(diffHours / 24);

    if (Math.abs(diffSec) < 45) return 'just now';
    if (Math.abs(diffMin) < 45) return diffMin > 0 ? `in ${diffMin} min` : `${Math.abs(diffMin)} min ago`;
    if (Math.abs(diffHours) < 24) return diffHours > 0 ? `in ${diffHours} hr` : `${Math.abs(diffHours)} hr ago`;
    if (Math.abs(diffDays) < 30) return diffDays > 0 ? `in ${diffDays} days` : `${Math.abs(diffDays)} days ago`;
    const diffMonths = Math.round(diffDays / 30);
    if (Math.abs(diffMonths) < 12) return diffMonths > 0 ? `in ${diffMonths} mo` : `${Math.abs(diffMonths)} mo ago`;
    const diffYears = Math.round(diffDays / 365);
    return diffYears > 0 ? `in ${diffYears} yr` : `${Math.abs(diffYears)} yr ago`;
  }

  function convertTimestampToDate() {
    const raw = epochInput.value.trim();
    if (!raw) {
      setMsg('Please enter a timestamp to convert.', 'error');
      epochResultCard.style.display = 'none';
      return;
    }

    const num = Number(raw);
    if (isNaN(num)) {
      setMsg('Invalid numeric timestamp.', 'error');
      epochResultCard.style.display = 'none';
      return;
    }

    let dateMs;
    let unitName;

    if (Math.abs(num) < 1e11) {
      // Seconds (e.g. 1700000000)
      dateMs = num * 1000;
      unitName = 'Seconds (s)';
    } else if (Math.abs(num) < 1e14) {
      // Milliseconds (e.g. 1700000000000)
      dateMs = num;
      unitName = 'Milliseconds (ms)';
    } else if (Math.abs(num) < 1e17) {
      // Microseconds
      dateMs = num / 1000;
      unitName = 'Microseconds (μs)';
    } else {
      // Nanoseconds
      dateMs = num / 1000000;
      unitName = 'Nanoseconds (ns)';
    }

    const date = new Date(dateMs);
    if (isNaN(date.getTime())) {
      setMsg('Timestamp resulted in an invalid date.', 'error');
      epochResultCard.style.display = 'none';
      return;
    }

    resMode.textContent = unitName;
    resRelative.textContent = getRelativeTimeString(date);
    resLocal.textContent = date.toString();
    resUtc.textContent = date.toUTCString();
    resIso.textContent = date.toISOString();
    resRfc.textContent = date.toUTCString();

    epochResultCard.style.display = 'block';
    setMsg('Timestamp converted successfully.', 'success');
  }

  function convertDateToTimestamp() {
    const val = dateInput.value;
    if (!val) {
      setMsg('Please select a date and time.', 'error');
      dateResultCard.style.display = 'none';
      return;
    }

    const date = new Date(val);
    if (isNaN(date.getTime())) {
      setMsg('Invalid date format.', 'error');
      dateResultCard.style.display = 'none';
      return;
    }

    const ms = date.getTime();
    const sec = Math.floor(ms / 1000);

    resSec.textContent = sec.toString();
    resMs.textContent = ms.toString();

    dateResultCard.style.display = 'block';
    setMsg('Date converted to timestamps.', 'success');
  }

  function setNow() {
    const now = new Date();
    epochInput.value = Math.floor(now.getTime() / 1000).toString();
    convertTimestampToDate();

    // Format local datetime string YYYY-MM-DDTHH:mm
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0, 16);
    dateInput.value = localISOTime;
    convertDateToTimestamp();
  }

  convertEpochBtn.addEventListener('click', convertTimestampToDate);
  epochInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') convertTimestampToDate();
  });

  convertDateBtn.addEventListener('click', convertDateToTimestamp);
  dateInput.addEventListener('change', convertDateToTimestamp);

  setNowBtn.addEventListener('click', setNow);

  clearAllBtn.addEventListener('click', () => {
    epochInput.value = '';
    dateInput.value = '';
    epochResultCard.style.display = 'none';
    dateResultCard.style.display = 'none';
    setMsg('Cleared.');
  });
})();
