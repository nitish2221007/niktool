(function() {
  'use strict';
  var slug = 'word-counter';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  function analyze() {
    var text = inputEl.value;
    var words = text.trim() ? text.trim().split(/\s+/).length : 0;
    var charsNoSpace = text.replace(/\s/g, '').length;
    var charsWithSpace = text.length;
    var sentences = text.split(/[.!?]+/).filter(function(s){return s.trim().length > 0;}).length;
    var paragraphs = text.split(/\n+/).filter(function(p){return p.trim().length > 0;}).length;
    var readingTime = Math.ceil(words / 200);
    
    var out = 'Words: ' + words + '\n';
    out += 'Characters (no spaces): ' + charsNoSpace + '\n';
    out += 'Characters (with spaces): ' + charsWithSpace + '\n';
    out += 'Sentences: ' + sentences + '\n';
    out += 'Paragraphs: ' + paragraphs + '\n';
    out += 'Estimated Reading Time: ' + readingTime + ' min (at 200 wpm)';
    return out;
  }
  
  inputEl.addEventListener('input', function() {
    outputEl.value = analyze();
    copyBtn.disabled = !inputEl.value.trim();
  });

  btn.addEventListener('click', function() {
    if (!inputEl.value.trim()) { setMsg('Please enter some text.', true); return; }
    outputEl.value = analyze();
    copyBtn.disabled = false;
    setMsg('Text analyzed successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter text above.');
  });
})();
