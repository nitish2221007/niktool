(function() {
  'use strict';
  var slug = 'sentence-counter';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function calc() {
    var text = inputEl.value.trim();
    if (!text) { outputEl.value = 'Sentences: 0\nWords: 0'; return; }
    // Simple regex for sentence boundaries (. ! ?)
    var sentences = text.split(/[.!?]+/).filter(function(s) { return s.trim().length > 0; }).length;
    var words = text.split(/\s+/).filter(Boolean).length;
    var avgWords = sentences > 0 ? (words / sentences).toFixed(1) : 0;
    var out = 'Sentence Count: ' + sentences + '\n';
    out += 'Word Count: ' + words + '\n';
    out += 'Average Words per Sentence: ' + avgWords + '\n\n';
    out += 'Note: Abbreviations like "Mr." or "Dr." may affect the count slightly.';
    outputEl.value = out;
  }
  inputEl.addEventListener('input', calc);
  btn.addEventListener('click', function() {
    calc();
    copyBtn.disabled = !inputEl.value.trim();
    setMsg('Sentences counted.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); calc(); });
  calc();
})();
