(function() {
  'use strict';
  var slug = 'formal-letter-format-checker';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please paste your letter draft.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    
    var lower = text.toLowerCase();
    var out = 'Formal Letter Format Checklist:\n\n';
    
    var hasSender = text.split('\n').length >= 3;
    out += (hasSender ? '[✓]' : '[✗]') + ' Sender address (top lines) seems present.\n';
    
    var hasDate = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/.test(text) || /\w+ \d{1,2},? \d{4}/.test(text);
    out += (hasDate ? '[✓]' : '[✗]') + ' Date is present.\n';
    
    var hasReceiver = text.split('\n').length >= 6;
    out += (hasReceiver ? '[✓]' : '[✗]') + ' Receiver address/designation seems present.\n';
    
    var hasSubject = lower.includes('subject') || lower.includes('sub:');
    out += (hasSubject ? '[✓]' : '[✗]') + ' Subject line is present.\n';
    
    var hasSalutation = lower.includes('sir') || lower.includes('madam') || lower.includes('dear');
    out += (hasSalutation ? '[✓]' : '[✗]') + ' Salutation (Sir/Madam/Dear) is present.\n';
    
    var hasClosing = lower.includes('yours') || lower.includes('regards') || lower.includes('sincerely');
    out += (hasClosing ? '[✓]' : '[✗]') + ' Closing (Yours faithfully/sincerely) is present.\n';
    
    var score = [hasSender, hasDate, hasReceiver, hasSubject, hasSalutation, hasClosing].filter(Boolean).length;
    out += '\nFormat Score: ' + score + '/6';
    
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
    setMsg('Cleared. Paste letter draft above.');
  });
})();
