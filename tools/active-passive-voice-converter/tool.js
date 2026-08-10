(function() {
  'use strict';
  var slug = 'active-passive-voice-converter';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please enter an active voice sentence.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var words = text.split(/\s+/);
    var out = 'Active to Passive Voice Conversion Guide\n';
    out += '='.repeat(40) + '\n\n';
    out += 'Original (Active): ' + text + '\n\n';
    out += 'Conversion Steps:\n';
    out += '1. Identify Subject, Verb, and Object\n';
    out += '2. Move Object to the beginning (becomes new subject)\n';
    out += '3. Change verb to "be" + past participle\n';
    out += '4. Move original Subject after "by"\n\n';
    out += 'Pattern: Subject + Verb + Object → Object + is/was/were + V3 + by + Subject\n\n';
    out += 'Example:\n';
    out += 'Active: The cat chased the mouse.\n';
    out += 'Passive: The mouse was chased by the cat.\n\n';
    out += 'Note: For complex sentences, manual conversion may be needed.\n';
    out += 'This tool provides the pattern and steps for learning.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Conversion guide generated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
