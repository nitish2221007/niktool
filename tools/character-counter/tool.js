(function() {
  'use strict';
  var slug = 'character-counter';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function calc() {
    var text = inputEl.value;
    var charsWith = text.length;
    var charsNo = text.replace(/\s/g, '').length;
    var words = text.trim() ? text.trim().split(/\s+/).length : 0;
    var lines = text.trim() ? text.split(/\n/).length : 0;
    var out = 'Characters (with spaces): ' + charsWith + '\n';
    out += 'Characters (no spaces): ' + charsNo + '\n';
    out += 'Word Count: ' + words + '\n';
    out += 'Line Count: ' + lines;
    outputEl.value = out;
  }
  inputEl.addEventListener('input', calc);
  btn.addEventListener('click', function() {
    calc();
    copyBtn.disabled = !inputEl.value;
    setMsg('Characters counted.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); calc(); });
  calc();
})();
