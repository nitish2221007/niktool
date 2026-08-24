(() => {
  'use strict';
  const s1El = document.getElementById('sw-s1'), s2El = document.getElementById('sw-s2');
  const scResEl = document.getElementById('sw-res-score'), alResEl = document.getElementById('sw-res-align');

  const matchScore = 2;
  const mismatchScore = -1;
  const gapPenalty = -2;

  function update() {
    const s1 = s1El.value.trim().toUpperCase();
    const s2 = s2El.value.trim().toUpperCase();

    if (s1.length === 0 || s2.length === 0) return;

    const n = s1.length;
    const m = s2.length;

    // Initialize DP matrix with zeros
    const H = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    let maxScore = 0;
    let maxI = 0, maxJ = 0;

    // Fill Smith-Waterman DP matrix: H[i][j] = max( 0, H[i-1][j-1] + score, H[i-1][j] + gap, H[i][j-1] + gap )
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const sim = s1[i - 1] === s2[j - 1] ? matchScore : mismatchScore;
        const diag = H[i - 1][j - 1] + sim;
        const up = H[i - 1][j] + gapPenalty;
        const left = H[i][j - 1] + gapPenalty;

        H[i][j] = Math.max(0, diag, up, left);

        if (H[i][j] > maxScore) {
          maxScore = H[i][j];
          maxI = i;
          maxJ = j;
        }
      }
    }

    // Traceback from maxI, maxJ until cell value reaches 0
    let align1 = '';
    let align2 = '';
    let currI = maxI;
    let currJ = maxJ;

    while (currI > 0 && currJ > 0 && H[currI][currJ] > 0) {
      const sim = s1[currI - 1] === s2[currJ - 1] ? matchScore : mismatchScore;
      if (H[currI][currJ] === H[currI - 1][currJ - 1] + sim) {
        align1 = s1[currI - 1] + align1;
        align2 = s2[currJ - 1] + align2;
        currI--;
        currJ--;
      } else if (H[currI][currJ] === H[currI - 1][currJ] + gapPenalty) {
        align1 = s1[currI - 1] + align1;
        align2 = '-' + align2;
        currI--;
      } else {
        align1 = '-' + align1;
        align2 = s2[currJ - 1] + align2;
        currJ--;
      }
    }

    scResEl.textContent = 'Max Score = ' + maxScore + ' (Local Optimum)';
    alResEl.textContent = 'Seq1: ' + align1 + ' | Seq2: ' + align2 + ' (Length: ' + align1.length + ' bp, Match: +' + matchScore + ', Mis: ' + mismatchScore + ', Gap: ' + gapPenalty + ')';
  }

  s1El.addEventListener('input', update);
  s2El.addEventListener('input', update);
  update();
})();