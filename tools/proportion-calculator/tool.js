(function() {
  'use strict';
  var slug = 'proportion-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var parts = inputEl.value.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean);
    if (parts.length !== 4) { setMsg('Please enter exactly four values: a, b, c, d.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var unknownIdx = -1, vals = [];
    for (var i = 0; i < 4; i++) {
      if (parts[i].toLowerCase() === 'x' || parts[i] === '') { unknownIdx = i; vals.push(null); }
      else {
        var n = parseFloat(parts[i]);
        if (isNaN(n)) { setMsg('Value ' + (i+1) + ' is not a valid number.', true); return; }
        vals.push(n);
      }
    }
    if (unknownIdx === -1) { setMsg('Mark the unknown value with x or leave it blank.', true); return; }
    var a=vals[0], b=vals[1], c=vals[2], d=vals[3], x, step;
    // a : b = c : d  =>  a*d = b*c
    if (unknownIdx === 0) {
      if (d === 0) { setMsg('d cannot be zero.', true); return; }
      x = (b * c) / d; step = 'a = (b x c) / d = (' + b + ' x ' + c + ') / ' + d;
    } else if (unknownIdx === 1) {
      if (c === 0) { setMsg('c cannot be zero.', true); return; }
      x = (a * d) / c; step = 'b = (a x d) / c = (' + a + ' x ' + d + ') / ' + c;
    } else if (unknownIdx === 2) {
      if (b === 0) { setMsg('b cannot be zero.', true); return; }
      x = (a * d) / b; step = 'c = (a x d) / b = (' + a + ' x ' + d + ') / ' + b;
    } else {
      if (a === 0) { setMsg('a cannot be zero.', true); return; }
      x = (b * c) / a; step = 'd = (b x c) / a = (' + b + ' x ' + c + ') / ' + a;
    }
    var labels = ['a','b','c','d'];
    var out = 'Proportion: ' + parts.join(' : ') + '\n';
    out += 'Cross-multiplication: a x d = b x c\n';
    out += step + '\n';
    out += labels[unknownIdx] + ' = ' + (Number.isInteger(x) ? x : x.toFixed(4));
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Proportion solved successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter a, b, c, d above.');
  });
})();
