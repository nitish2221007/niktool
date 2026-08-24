(() => {
  'use strict';
  const cronInput = document.getElementById('cron-input');
  const humanText = document.getElementById('cron-human-text');
  const msgEl = document.getElementById('tool-message');

  function describeCron(cron) {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) return 'Invalid cron syntax: expected 5 fields (minute hour day month day-of-week).';
    const [min, hour, dom, mon, dow] = parts;

    let desc = '';
    if (min === '*' && hour === '*') desc = 'Every minute';
    else if (min.startsWith('*/') && hour === '*') desc = 'Every ' + min.slice(2) + ' minutes';
    else if (min === '0' && hour === '*') desc = 'Every hour on the hour';
    else if (min === '0' && hour === '0' && dom === '*' && mon === '*' && dow === '*') desc = 'At 00:00 (midnight) every day';
    else if (min === '0' && hour !== '*' && dom === '*' && mon === '*' && dow === '*') desc = 'At ' + hour + ':00 every day';
    else if (min === '0' && hour === '9' && dow === '1-5') desc = 'At 09:00 AM, Monday through Friday';
    else if (dom === '1' && min === '0' && hour === '0') desc = 'At midnight on the 1st of every month';
    else desc = 'Runs when minute is (' + min + '), hour is (' + hour + '), day is (' + dom + '), month is (' + mon + '), and day-of-week is (' + dow + ')';

    return desc;
  }

  function update() {
    const val = cronInput.value.trim();
    if (!val) { humanText.textContent = '-'; return; }
    humanText.textContent = describeCron(val);
  }

  cronInput.addEventListener('input', update);
  update();
})();