(() => {
  'use strict';
  const qEl = document.getElementById('kn-q'), kEl = document.getElementById('kn-k');
  const clResEl = document.getElementById('kn-res-class'), dsResEl = document.getElementById('kn-res-dist');

  // Hardcoded training sample set: [x, y, label]
  const trainData = [
    [1.0, 2.0, 'Red'],
    [2.0, 3.0, 'Red'],
    [3.0, 5.0, 'Red'],
    [5.0, 4.0, 'Blue'],
    [6.0, 6.0, 'Blue'],
    [7.0, 5.0, 'Blue']
  ];

  function update() {
    const qParts = qEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const K = parseInt(kEl.value, 10);

    if (qParts.length < 2 || isNaN(K) || K < 1) return;

    const qx = qParts[0], qy = qParts[1];

    // Compute Euclidean distance to all training points:
    const distances = trainData.map(pt => {
      const d = Math.sqrt(Math.pow(qx - pt[0], 2) + Math.pow(qy - pt[1], 2));
      return { pt: pt, dist: d, label: pt[2] };
    });

    distances.sort((a, b) => a.dist - b.dist);
    const kNearest = distances.slice(0, K);

    let redVotes = 0, blueVotes = 0;
    kNearest.forEach(n => {
      if (n.label === 'Red') redVotes++;
      else blueVotes++;
    });

    const winner = redVotes >= blueVotes ? 'RED' : 'BLUE';
    const desc = kNearest.map(n => '(' + n.pt[0] + ',' + n.pt[1] + ') ' + n.label + ' d=' + n.dist.toFixed(2)).join(' | ');

    clResEl.textContent = 'Class: ' + winner + ' (' + redVotes + ' Red / ' + blueVotes + ' Blue votes)';
    dsResEl.textContent = 'Nearest ' + K + ': ' + desc;
  }

  qEl.addEventListener('input', update);
  kEl.addEventListener('input', update);
  update();
})();