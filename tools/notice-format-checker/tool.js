(function() {
  'use strict';
  var slug = 'notice-format-checker';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please paste your notice draft.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    
    var lines = text.split('\n').map(function(l){return l.trim();}).filter(Boolean);
    var out = 'Notice Format Checklist:\n\n';
    
    var hasNotice = text.toUpperCase().includes('NOTICE');
    out += (hasNotice ? '[✓]' : '[✗]') + ' The word "NOTICE" is present.\n';
    
    var hasDate = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/.test(text) || /\w+ \d{1,2},? \d{4}/.test(text);
    out += (hasDate ? '[✓]' : '[✗]') + ' A valid date format is detected.\n';
    
    var hasHeading = lines.length >= 3;
    out += (hasHeading ? '[✓]' : '[✗]') + ' A heading/topic is likely present (3+ lines).\n';
    
    var hasBody = text.length > 50;
    out += (hasBody ? '[✓]' : '[✗]') + ' Body content is present (sufficient length).\n';
    
    var hasSignoff = lines.length >= 5 && lines[lines.length-1].length > 0;
    out += (hasSignoff ? '[✓]' : '[✗]') + ' Signature/Name/Designation at the end.\n';
    
    var score = [hasNotice, hasDate, hasHeading, hasBody, hasSignoff].filter(Boolean).length;
    out += '\nFormat Score: ' + score + '/5';
    if (score === 5) out += ' (Excellent!)';
    else if (score >= 3) out += ' (Good, but check missing items)';
    else out += ' (Needs significant formatting work)';
    
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Format checked successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Paste notice draft above.');
  });
})();
