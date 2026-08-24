(() => {
  'use strict';
  const NEl = document.getElementById('hg-N'), KEl = document.getElementById('hg-K');
  const nEl = document.getElementById('hg-n'), kEl = document.getElementById('hg-k');
  const pResEl = document.getElementById('hg-res-prob'), mResEl = document.getElementById('hg-res-mean');

  function logFact(n) {
    let ans = 0;
    for (let i = 2; i <= n; i++) ans += Math.log(i);
    return ans;
  }

  function logCombin(n, r) {
    if (r < 0 || r > n) return -Infinity;
    return logFact(n) - logFact(r) - logFact(n - r);
  }

  function update() {
    const N = parseInt(NEl.value, 10), K = parseInt(KEl.value, 10);
    const n = parseInt(nEl.value, 10), k = parseInt(kEl.value, 10);

    if (isNaN(N) || isNaN(K) || isNaN(n) || isNaN(k) || N < 1 || K > N || n > N || k > K || k > n) {
      pResEl.textContent = 'Invalid parameters';
      return;
    }

    // P(X = k) = C(K, k) * C(N - K, n - k) / C(N, n)
    const logP = logCombin(K, k) + logCombin(N - K, n - k) - logCombin(N, n);
    const prob = Math.exp(logP);
    const expected = (n * K) / N;

    pResEl.textContent = prob.toFixed(4) + ' (' + (prob * 100).toFixed(2) + '%)';
    mResEl.textContent = 'E[X] = ' + expected.toFixed(2) + ' expected successes';
  }

  [NEl, KEl, nEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();