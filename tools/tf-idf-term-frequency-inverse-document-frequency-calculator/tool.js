(() => {
  'use strict';
  const tfEl = document.getElementById('tf-tf'), wdEl = document.getElementById('tf-words');
  const nEl = document.getElementById('tf-n'), dfEl = document.getElementById('tf-df');
  const tiResEl = document.getElementById('tf-res-tfidf'), dtResEl = document.getElementById('tf-res-details');

  function update() {
    const termCount = parseFloat(tfEl.value), totalWords = parseFloat(wdEl.value);
    const N = parseFloat(nEl.value), DF = parseFloat(dfEl.value);

    if (isNaN(termCount) || isNaN(totalWords) || isNaN(N) || isNaN(DF) || termCount < 0 || totalWords <= 0 || N <= 0 || DF <= 0 || DF > N) return;

    // Normalized Term Frequency: TF = count / total_words
    const TF = termCount / totalWords;

    // Inverse Document Frequency: IDF = ln( N / DF )
    const IDF = Math.log(N / DF);

    // TF-IDF = TF * IDF
    const TF_IDF = TF * IDF;

    tiResEl.textContent = 'TF-IDF Weight = ' + TF_IDF.toFixed(4);
    dtResEl.textContent = 'TF = ' + TF.toFixed(4) + ' (' + (TF * 100).toFixed(2) + '%) | IDF = ' + IDF.toFixed(3) + ' (Present in ' + DF + ' of ' + N.toLocaleString() + ' docs)';
  }

  [tfEl, wdEl, nEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();