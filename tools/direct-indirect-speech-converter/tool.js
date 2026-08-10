(function() {
  'use strict';
  var slug = 'direct-indirect-speech-converter';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please enter a direct speech sentence.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var out = 'Direct to Indirect Speech Conversion Guide\n';
    out += '='.repeat(45) + '\n\n';
    out += 'Original (Direct): ' + text + '\n\n';
    out += 'Key Conversion Rules:\n\n';
    out += '1. Remove quotation marks and comma\n';
    out += '2. Change reporting verb tense if needed\n';
    out += '3. Backshift the tense inside the quote:\n';
    out += '   - Present Simple → Past Simple\n';
    out += '   - Present Continuous → Past Continuous\n';
    out += '   - Past Simple → Past Perfect\n';
    out += '   - Will → Would\n';
    out += '   - Can → Could\n';
    out += '   - May → Might\n\n';
    out += '4. Change pronouns:\n';
    out += '   - I → he/she\n';
    out += '   - We → they\n';
    out += '   - You → he/she/they\n\n';
    out += '5. Change time/place words:\n';
    out += '   - today → that day\n';
    out += '   - tomorrow → the next day\n';
    out += '   - here → there\n';
    out += '   - this → that\n\n';
    out += 'Example:\n';
    out += 'Direct: He said, "I am happy."\n';
    out += 'Indirect: He said that he was happy.\n\n';
    out += 'Note: Apply these rules to your specific sentence for accurate conversion.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Conversion guide generated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
