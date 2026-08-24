(() => {
  'use strict';
  const qtEl = document.getElementById('ecg-qt'), hrEl = document.getElementById('ecg-hr'), sexEl = document.getElementById('ecg-sex');
  const bzResEl = document.getElementById('ecg-res-baz'), frResEl = document.getElementById('ecg-res-frid');

  function update() {
    const QT_ms = parseFloat(qtEl.value), HR_bpm = parseFloat(hrEl.value);
    const sex = sexEl.value;

    if (isNaN(QT_ms) || isNaN(HR_bpm) || QT_ms <= 0 || HR_bpm <= 0) return;

    // RR interval in seconds: RR = 60 / HR
    const RR_sec = 60.0 / HR_bpm;
    const RR_ms = RR_sec * 1000.0;

    // Bazett formula: QTc = QT / sqrt(RR_sec)
    const QTc_bazett = QT_ms / Math.sqrt(RR_sec);

    // Fridericia formula: QTc = QT / (RR_sec^(1/3))
    const QTc_fridericia = QT_ms / Math.pow(RR_sec, 1.0 / 3.0);

    // Normal thresholds:
    const normal_limit = (sex === 'male') ? 450.0 : 460.0;

    let eval_text = '', color = '#22543d';
    if (QTc_bazett > 500.0) {
      eval_text = 'SEVERELY PROLONGED QTc (> 500 ms: High Risk of Torsades de Pointes / Fatal Ventricular Arrhythmia)';
      color = '#c53030';
    } else if (QTc_bazett > normal_limit) {
      eval_text = 'PROLONGED QTc (Above ' + normal_limit + ' ms threshold for ' + sex + ')';
      color = '#ea580c';
    } else {
      eval_text = 'NORMAL QTc INTERVAL (≤ ' + normal_limit + ' ms for ' + sex + ' ✓)';
      color = '#22543d';
    }

    bzResEl.textContent = 'Bazett QTc = ' + Math.round(QTc_bazett) + ' ms (' + (QTc_bazett > normal_limit ? 'PROLONGED' : 'NORMAL') + ')';
    bzResEl.style.color = color;
    frResEl.textContent = 'Fridericia QTc = ' + Math.round(QTc_fridericia) + ' ms | ' + eval_text + ' (RR = ' + Math.round(RR_ms) + ' ms @ HR=' + HR_bpm + ' bpm)';
  }

  [qtEl, hrEl, sexEl].forEach(el => el.addEventListener('input', update));
  update();
})();