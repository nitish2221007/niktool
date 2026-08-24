(() => {
  'use strict';

  const origInput = document.getElementById('diff-original-input');
  const modInput = document.getElementById('diff-modified-input');
  const compareBtn = document.getElementById('compare-btn');
  const swapBtn = document.getElementById('swap-btn');
  const sampleBtn = document.getElementById('sample-btn');
  const clearBtn = document.getElementById('clear-btn');
  const msgEl = document.getElementById('diff-message');

  const optIgnoreWs = document.getElementById('diff-opt-ignore-whitespace');
  const optIgnoreCase = document.getElementById('diff-opt-ignore-case');

  const diffOutputCard = document.getElementById('diff-output-card');
  const diffContainer = document.getElementById('diff-container');
  const copyDiffBtn = document.getElementById('copy-diff-btn');

  const statAdded = document.getElementById('stat-added');
  const statRemoved = document.getElementById('stat-removed');
  const statUnchanged = document.getElementById('stat-unchanged');
  const statTotal = document.getElementById('stat-total');

  if (!origInput || !modInput || !compareBtn) {
    console.error('Text Diff: Missing required elements.');
    return;
  }

  function setMsg(text, type = '') {
    msgEl.textContent = text;
    msgEl.className = `message${type ? ` ${type}` : ''}`;
  }

  function normalizeLine(line, ignoreWs, ignoreCase) {
    let res = line;
    if (ignoreWs) res = res.trim();
    if (ignoreCase) res = res.toLowerCase();
    return res;
  }

  function computeLCS(linesA, linesB, ignoreWs, ignoreCase) {
    const n = linesA.length;
    const m = linesB.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));

    for (let i = 1; i <= n; i++) {
      const aVal = normalizeLine(linesA[i - 1], ignoreWs, ignoreCase);
      for (let j = 1; j <= m; j++) {
        const bVal = normalizeLine(linesB[j - 1], ignoreWs, ignoreCase);
        if (aVal === bVal) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const diff = [];
    let i = n;
    let j = m;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && normalizeLine(linesA[i - 1], ignoreWs, ignoreCase) === normalizeLine(linesB[j - 1], ignoreWs, ignoreCase)) {
        diff.push({ type: 'unchanged', lineA: i, lineB: j, text: linesA[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diff.push({ type: 'added', lineA: null, lineB: j, text: linesB[j - 1] });
        j--;
      } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
        diff.push({ type: 'removed', lineA: i, lineB: null, text: linesA[i - 1] });
        i--;
      }
    }

    return diff.reverse();
  }

  let lastDiffText = '';

  function runDiff() {
    const textA = origInput.value;
    const textB = modInput.value;

    if (!textA.trim() && !textB.trim()) {
      setMsg('Please enter text to compare in at least one box.', 'error');
      diffOutputCard.style.display = 'none';
      return;
    }

    const linesA = textA.split('\n');
    const linesB = textB.split('\n');
    const ignoreWs = optIgnoreWs.checked;
    const ignoreCase = optIgnoreCase.checked;

    const diff = computeLCS(linesA, linesB, ignoreWs, ignoreCase);

    let addedCount = 0;
    let removedCount = 0;
    let unchangedCount = 0;

    // Clear previous DOM safely
    while (diffContainer.firstChild) {
      diffContainer.removeChild(diffContainer.firstChild);
    }

    const textLines = [];

    diff.forEach((item) => {
      const lineDiv = document.createElement('div');
      lineDiv.style.display = 'flex';
      lineDiv.style.padding = '2px 6px';
      lineDiv.style.borderRadius = '4px';
      lineDiv.style.whiteSpace = 'pre-wrap';
      lineDiv.style.wordBreak = 'break-all';

      let prefix = '  ';
      if (item.type === 'added') {
        addedCount++;
        prefix = '+ ';
        lineDiv.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
        lineDiv.style.color = '#86efac';
      } else if (item.type === 'removed') {
        removedCount++;
        prefix = '- ';
        lineDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
        lineDiv.style.color = '#fca5a5';
      } else {
        unchangedCount++;
        lineDiv.style.color = '#9ca3af';
      }

      const formattedLine = `${prefix}${item.text}`;
      textLines.push(formattedLine);

      const prefixSpan = document.createElement('span');
      prefixSpan.style.userSelect = 'none';
      prefixSpan.style.width = '24px';
      prefixSpan.style.display = 'inline-block';
      prefixSpan.style.fontWeight = 'bold';
      prefixSpan.textContent = prefix;

      const contentSpan = document.createElement('span');
      contentSpan.textContent = item.text || ' ';

      lineDiv.appendChild(prefixSpan);
      lineDiv.appendChild(contentSpan);
      diffContainer.appendChild(lineDiv);
    });

    lastDiffText = textLines.join('\n');

    statAdded.textContent = `+${addedCount}`;
    statRemoved.textContent = `-${removedCount}`;
    statUnchanged.textContent = unchangedCount.toString();
    statTotal.textContent = diff.length.toString();

    diffOutputCard.style.display = 'block';

    if (addedCount === 0 && removedCount === 0) {
      setMsg('Both texts are completely identical!', 'success');
    } else {
      setMsg(`Comparison complete: ${addedCount} added, ${removedCount} removed.`, 'success');
    }
  }

  function loadSample() {
    origInput.value = [
      'function calculateTotal(price, taxRate) {',
      '  const tax = price * taxRate;',
      '  const total = price + tax;',
      '  console.log("Total is: " + total);',
      '  return total;',
      '}'
    ].join('\n');

    modInput.value = [
      'function calculateTotal(price, taxRate, discount = 0) {',
      '  const discountedPrice = Math.max(0, price - discount);',
      '  const tax = discountedPrice * taxRate;',
      '  const total = discountedPrice + tax;',
      '  return Math.round(total * 100) / 100;',
      '}'
    ].join('\n');

    runDiff();
  }

  compareBtn.addEventListener('click', runDiff);
  sampleBtn.addEventListener('click', loadSample);

  swapBtn.addEventListener('click', () => {
    const temp = origInput.value;
    origInput.value = modInput.value;
    modInput.value = temp;
    if (origInput.value.trim() || modInput.value.trim()) {
      runDiff();
    }
  });

  clearBtn.addEventListener('click', () => {
    origInput.value = '';
    modInput.value = '';
    diffOutputCard.style.display = 'none';
    while (diffContainer.firstChild) {
      diffContainer.removeChild(diffContainer.firstChild);
    }
    setMsg('Cleared.');
  });

  copyDiffBtn.addEventListener('click', () => {
    if (!lastDiffText) return;
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(lastDiffText, copyDiffBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(lastDiffText);
    }
    setMsg('Diff copied to clipboard.', 'success');
  });
})();
