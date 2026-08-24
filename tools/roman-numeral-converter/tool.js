(() => {
  'use strict';
  const numInput = document.getElementById('roman-arabic-input');
  const romInput = document.getElementById('roman-str-input');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('roman-result-card');
  const resVal = document.getElementById('roman-res-val');

  const ROMAN_MAP = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  function toRoman(num) {
    let result = '';
    for (const [val, letter] of ROMAN_MAP) {
      while (num >= val) {
        result += letter;
        num -= val;
      }
    }
    return result;
  }

  function fromRoman(str) {
    const valMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    const s = str.toUpperCase().trim();
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      const cur = valMap[s[i]];
      const next = valMap[s[i + 1]];
      if (!cur) return NaN;
      if (next && cur < next) {
        total -= cur;
      } else {
        total += cur;
      }
    }
    return total;
  }

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    if (numInput.value) {
      const num = parseInt(numInput.value, 10);
      if (isNaN(num) || num < 1 || num > 3999) {
        setMsg('Please enter an integer between 1 and 3999.', true);
        resCard.style.display = 'none';
        return;
      }
      const r = toRoman(num);
      romInput.value = r;
      resVal.textContent = num + ' = ' + r;
      resCard.style.display = 'block';
      setMsg('Converted to Roman numerals.');
    } else if (romInput.value.trim()) {
      const parsed = fromRoman(romInput.value);
      if (isNaN(parsed) || parsed < 1 || parsed > 3999) {
        setMsg('Invalid Roman numeral string.', true);
        resCard.style.display = 'none';
        return;
      }
      numInput.value = parsed.toString();
      resVal.textContent = romInput.value.toUpperCase() + ' = ' + parsed;
      resCard.style.display = 'block';
      setMsg('Converted to Arabic number.');
    } else {
      setMsg('Please enter either a number or a Roman numeral.', true);
      resCard.style.display = 'none';
    }
  });

  numInput.addEventListener('input', () => {
    const num = parseInt(numInput.value, 10);
    if (!isNaN(num) && num >= 1 && num <= 3999) {
      romInput.value = toRoman(num);
    }
  });

  romInput.addEventListener('input', () => {
    const parsed = fromRoman(romInput.value);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 3999) {
      numInput.value = parsed.toString();
    }
  });

  clearBtn.addEventListener('click', () => {
    numInput.value = ''; romInput.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();