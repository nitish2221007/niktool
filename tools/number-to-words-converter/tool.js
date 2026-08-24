(() => {
  'use strict';
  const inEl = document.getElementById('n2w-input'), outEl = document.getElementById('n2w-output');

  const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const SCALES = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  function convertGroup(n) {
    let str = '';
    if (n >= 100) {
      str += ONES[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += TENS[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ONES[n % 10] : '') + ' ';
    } else if (n > 0) {
      str += ONES[n] + ' ';
    }
    return str.trim();
  }

  function numToWords(num) {
    if (num === 0) return 'Zero';
    let str = '';
    let scaleIdx = 0;
    while (num > 0 && scaleIdx < SCALES.length) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        const chunkStr = convertGroup(chunk);
        str = chunkStr + (SCALES[scaleIdx] ? ' ' + SCALES[scaleIdx] + ' ' : ' ') + str;
      }
      num = Math.floor(num / 1000);
      scaleIdx++;
    }
    return str.trim();
  }

  function update() {
    const raw = inEl.value.trim().replace(/,/g, '');
    if (!raw || isNaN(parseFloat(raw))) { outEl.value = ''; return; }

    const parts = raw.split('.');
    const intVal = parseInt(parts[0], 10);
    if (isNaN(intVal)) return;

    let res = numToWords(Math.abs(intVal));
    if (intVal < 0) res = 'Negative ' + res;

    if (parts.length > 1 && parts[1]) {
      const cents = parseInt(parts[1].slice(0, 2), 10);
      res += ' and ' + (isNaN(cents) ? 0 : cents) + '/100';
    }

    outEl.value = res;
  }

  inEl.addEventListener('input', update);
  update();
})();