(() => {
  'use strict';
  const inEl = document.getElementById('read-text-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('read-res-card');
  const resEase = document.getElementById('read-res-ease'), resGrade = document.getElementById('read-res-grade');
  const resTime = document.getElementById('read-res-reading-time'), resWords = document.getElementById('read-res-words');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function countSyllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  function analyze() {
    const text = inEl.value.trim();
    if (!text) { setMsg('Please paste text to analyze.', true); resCard.style.display = 'none'; return; }

    const words = text.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (words.length < 5 || sentences.length === 0) {
      setMsg('Please provide at least one complete sentence with 5+ words.', true);
      resCard.style.display = 'none'; return;
    }

    const totalWords = words.length;
    const totalSentences = Math.max(1, sentences.length);
    let totalSyllables = 0;
    for (const w of words) totalSyllables += countSyllables(w);

    // Flesch Reading Ease = 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
    const ease = 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);
    // Flesch-Kincaid Grade Level = 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
    const grade = 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;

    const clampedEase = Math.max(0, Math.min(100, ease));
    const clampedGrade = Math.max(1, Math.round(grade));
    const readMin = Math.ceil(totalWords / 200);

    let easeDesc = 'Standard';
    if (clampedEase >= 80) easeDesc = 'Easy (6th Grade)';
    else if (clampedEase >= 60) easeDesc = 'Standard (8th-9th Grade)';
    else if (clampedEase >= 50) easeDesc = 'Fairly Difficult (High School)';
    else if (clampedEase >= 30) easeDesc = 'Difficult (College)';
    else easeDesc = 'Very Confusing (Graduate Level)';

    resEase.textContent = clampedEase.toFixed(1) + ' (' + easeDesc + ')';
    resGrade.textContent = 'Grade ' + clampedGrade + (clampedGrade > 12 ? ' (College+)' : '');
    resTime.textContent = readMin + ' min read';
    resWords.textContent = totalWords.toLocaleString() + ' words';

    resCard.style.display = 'block';
    setMsg('Readability score computed.');
  }

  btn.addEventListener('click', analyze);
  inEl.addEventListener('input', analyze);

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();