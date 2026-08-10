(function() {
  'use strict';
  var slug = 'empirical-relation-calculator';
  var findEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  function updateLabels() {
    var f = findEl.value;
    if (f === 'mode') { aEl.placeholder = 'Median'; bEl.placeholder = 'Mean'; }
    else if (f === 'median') { aEl.placeholder = 'Mode'; bEl.placeholder = 'Mean'; }
    else { aEl.placeholder = 'Median'; bEl.placeholder = 'Mode'; }
  }
  findEl.addEventListener('change', updateLabels);
  updateLabels();

  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var f = findEl.value;
    var out = 'Empirical Relation: Mode = 3 x Median - 2 x Mean\n\n';
    if (f === 'mode') {
      var mode = 3 * a - 2 * b;
      out += 'Given: Median = ' + a + ', Mean = ' + b + '\n';
      out += 'Mode = 3(' + a + ') - 2(' + b + ')\n';
      out += 'Mode = ' + (3*a).toFixed(2) + ' - ' + (2*b).toFixed(2) + '\n';
      out += 'Mode = ' + mode.toFixed(4) + '\n\n';
      out += 'Note: This is an approximate empirical relation, not an exact formula.';
    } else if (f === 'median') {
      var median = (a + 2 * b) / 3;
      out += 'Given: Mode = ' + a + ', Mean = ' + b + '\n';
      out += 'Median = (Mode + 2 x Mean) / 3\n';
      out += 'Median = (' + a + ' + ' + (2*b).toFixed(2) + ') / 3\n';
      out += 'Median = ' + median.toFixed(4) + '\n\n';
      out += 'Note: This is an approximate empirical relation, not an exact formula.';
    } else {
      var mean = (3 * a - b) / 2;
      out += 'Given: Median = ' + a + ', Mode = ' + b + '\n';
      out += 'Mean = (3 x Median - Mode) / 2\n';
      out += 'Mean = (' + (3*a).toFixed(2) + ' - ' + b + ') / 2\n';
      out += 'Mean = ' + mean.toFixed(4) + '\n\n';
      out += 'Note: This is an approximate empirical relation, not an exact formula.';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Calculation complete.');
  });

  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
