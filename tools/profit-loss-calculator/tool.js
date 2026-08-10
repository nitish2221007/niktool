(function() {
  'use strict';
  var slug = 'profit-loss-calculator';
  var cpEl = document.getElementById(slug + '-input');
  var spEl = document.getElementById(slug + '-sp');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var cp = parseFloat(cpEl.value), sp = parseFloat(spEl.value);
    if (isNaN(cp) || isNaN(sp)) { setMsg('Please enter both CP and SP.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (cp <= 0 || sp < 0) { setMsg('CP must be positive and SP must be non-negative.', true); return; }
    var out = 'Cost Price (CP): ' + cp + '\nSelling Price (SP): ' + sp + '\n';
    if (sp > cp) {
      var profit = sp - cp;
      var pPct = (profit / cp) * 100;
      out += 'Result: Profit\n';
      out += 'Profit Amount: ' + profit.toFixed(2) + '\n';
      out += 'Profit %: ' + pPct.toFixed(2) + '%';
    } else if (sp < cp) {
      var loss = cp - sp;
      var lPct = (loss / cp) * 100;
      out += 'Result: Loss\n';
      out += 'Loss Amount: ' + loss.toFixed(2) + '\n';
      out += 'Loss %: ' + lPct.toFixed(2) + '%';
    } else {
      out += 'Result: No Profit, No Loss (Break-even)';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Profit/Loss calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    cpEl.value = ''; spEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter CP and SP above.');
  });
})();
