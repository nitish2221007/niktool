(function() {
  'use strict';
  var slug = 'letter-writing-word-counter';
  var inputEl = document.getElementById(slug + '-input');
  var typeEl = document.getElementById(slug + '-type');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please paste your letter.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var words = text.split(/\s+/).filter(Boolean).length;
    var chars = text.length;
    var lines = text.split(/\n/).filter(function(l){return l.trim().length > 0;}).length;
    var type = typeEl.value;
    var out = 'Letter Analysis (' + (type === 'formal' ? 'Formal' : 'Informal') + ')\n';
    out += '='.repeat(35) + '\n\n';
    out += 'Word Count: ' + words + '\n';
    out += 'Character Count: ' + chars + '\n';
    out += 'Line Count: ' + lines + '\n\n';
    if (type === 'formal') {
      var checks = [];
      checks.push(text.toLowerCase().includes('subject') ? '[✓] Subject line found' : '[✗] Subject line missing');
      checks.push(text.toLowerCase().includes('dear') || text.toLowerCase().includes('respected') ? '[✓] Salutation found' : '[✗] Salutation missing');
      checks.push(text.toLowerCase().includes('yours') || text.toLowerCase().includes('regards') ? '[✓] Closing found' : '[✗] Closing missing');
      out += 'Format Checklist:\n' + checks.join('\n') + '\n\n';
      out += 'Tip: Formal letters typically have 120-150 words for the body.';
    } else {
      out += 'Tip: Informal letters are usually 100-150 words with a friendly tone.';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Letter analyzed.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
