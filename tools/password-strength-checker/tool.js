(function() {
  'use strict';
  var slug = 'password-strength-checker';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var pwd = inputEl.value;
    if (!pwd) { setMsg('Please enter a password to test.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var score = 0, feedback = [];
    if (pwd.length >= 8) score++; else feedback.push('- Too short (aim for 8+ characters)');
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++; else feedback.push('- Add lowercase letters');
    if (/[A-Z]/.test(pwd)) score++; else feedback.push('- Add uppercase letters');
    if (/[0-9]/.test(pwd)) score++; else feedback.push('- Add numbers');
    if (/[^A-Za-z0-9]/.test(pwd)) score++; else feedback.push('- Add special symbols (!@#$)');
    var strength = 'Very Weak';
    if (score >= 6) strength = 'Very Strong';
    else if (score >= 5) strength = 'Strong';
    else if (score >= 4) strength = 'Moderate';
    else if (score >= 2) strength = 'Weak';
    var out = 'Length: ' + pwd.length + ' characters\n';
    out += 'Score: ' + score + ' / 6\n';
    out += 'Strength: ' + strength + '\n\n';
    if (feedback.length) { out += 'Suggestions:\n' + feedback.join('\n'); }
    else { out += 'Excellent! This password uses a great mix of characters.'; }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Password analyzed locally.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
