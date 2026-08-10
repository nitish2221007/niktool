(function() {
  'use strict';
  var slug = 'text-cleaner';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  btn.addEventListener('click', function() {
    var text = inputEl.value;
    if (!text.trim()) { setMsg('Please enter some text.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    
    // Remove extra spaces between words
    var cleaned = text.replace(/[ \t]+/g, ' ');
    // Remove trailing spaces on each line
    cleaned = cleaned.replace(/[ \t]+$/gm, '');
    // Replace 3+ consecutive newlines with exactly 2 (one blank line)
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    // Trim start and end
    cleaned = cleaned.trim();
    
    outputEl.value = cleaned;
    copyBtn.disabled = false;
    setMsg('Text cleaned successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter messy text above.');
  });
})();
