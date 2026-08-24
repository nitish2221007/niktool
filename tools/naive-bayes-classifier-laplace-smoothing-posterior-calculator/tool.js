(() => {
  'use strict';
  const pspEl = document.getElementById('nb-psp'), lspEl = document.getElementById('nb-lsp'), lhmEl = document.getElementById('nb-lhm');
  const psResEl = document.getElementById('nb-res-post'), hmResEl = document.getElementById('nb-res-ham');

  function update() {
    const P_spam = parseFloat(pspEl.value), L_spam = parseFloat(lspEl.value), L_ham = parseFloat(lhmEl.value);
    if (isNaN(P_spam) || isNaN(L_spam) || isNaN(L_ham) || P_spam <= 0 || P_spam >= 1 || L_spam < 0 || L_ham < 0) return;

    const P_ham = 1.0 - P_spam;

    // Unnormalized posteriors:
    const num_spam = P_spam * L_spam;
    const num_ham = P_ham * L_ham;
    const total = num_spam + num_ham;

    if (total === 0) return;

    const post_spam = (num_spam / total) * 100.0;
    const post_ham = (num_ham / total) * 100.0;

    let decision = post_spam >= 50.0 ? 'SPAM FILTERED' : 'INBOX (HAM)';
    let color = post_spam >= 50.0 ? '#c53030' : '#22543d';

    psResEl.textContent = 'P(Spam | Message) = ' + post_spam.toFixed(1) + '% (' + decision + ')';
    psResEl.style.color = color;
    hmResEl.textContent = 'P(Ham | Message) = ' + post_ham.toFixed(1) + '% | Likelihood Ratio = ' + (num_spam / num_ham).toFixed(2) + ':1';
  }

  [pspEl, lspEl, lhmEl].forEach(el => el.addEventListener('input', update));
  update();
})();