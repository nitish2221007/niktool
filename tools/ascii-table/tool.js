(function() {
  'use strict';
  var slug = 'ascii-table';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var q = inputEl.value.trim();
    if (!q) { setMsg('Please enter a character or code.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var code = null;
    if (q.length === 1) {
      code = q.charCodeAt(0);
    } else if (/^0x[0-9a-f]+$/i.test(q)) {
      code = parseInt(q, 16);
    } else if (/^\d+$/.test(q)) {
      code = parseInt(q, 10);
    }
    if (code === null || code < 0 || code > 127) {
      setMsg('Please enter a valid ASCII character (0-127) or single character.', true);
      outputEl.value = '';
      copyBtn.disabled = true;
      return;
    }
    var char = String.fromCharCode(code);
    var isControl = code < 32 || code === 127;
    var out = 'ASCII Lookup\n';
    out += '='.repeat(30) + '\n\n';
    out += 'Character: ' + (isControl ? '(control character)' : char) + '\n';
    out += 'Decimal: ' + code + '\n';
    out += 'Hexadecimal: 0x' + code.toString(16).toUpperCase().padStart(2, '0') + '\n';
    out += 'Binary: ' + code.toString(2).padStart(8, '0') + '\n';
    out += 'Octal: ' + code.toString(8) + '\n\n';
    if (isControl) {
      var names = {0:'NULL',7:'BEL',8:'BS',9:'TAB',10:'LF',13:'CR',27:'ESC',127:'DEL'};
      out += 'Name: ' + (names[code] || 'Control character');
    } else {
      var type = '';
      if (code >= 48 && code <= 57) type = 'Digit';
      else if (code >= 65 && code <= 90) type = 'Uppercase Letter';
      else if (code >= 97 && code <= 122) type = 'Lowercase Letter';
      else type = 'Symbol/Punctuation';
      out += 'Type: ' + type;
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('ASCII lookup complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
