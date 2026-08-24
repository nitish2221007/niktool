(() => {
  'use strict';
  const qtEl = document.getElementById('qt-meas'), hrEl = document.getElementById('qt-hr');
  const bzResEl = document.getElementById('qt-res-baz'), frResEl = document.getElementById('qt-res-frid');

  function update() {
    const QT_ms = parseFloat(qtEl.value), HR = parseFloat(hrEl.value);
    if (isNaN(QT_ms) || isNaN(HR) || QT_ms <= 0 || HR <= 0) return;

    // RR interval in seconds: RR = 60 / HR
    const RR_sec = 60.0 / HR;
    const RR_ms = RR_sec * 1000.0;

    // Bazett formula: QTc = QT_ms / sqrt(RR_sec)
    const QTc_bazett = QT_ms / Math.sqrt(RR_sec);

    // Fridericia formula: QTc = QT_ms / (RR_sec)^(1/3)
    const QTc_fridericia = QT_ms / Math.pow(RR_sec, 1.0 / 3.0);

    // Framingham formula: QTc = QT_ms + 154 * (1 - RR_sec)
    const QTc_framingham = QT_ms + 154.0 * (1.0 - RR_sec);

    let status = '', color = '#22543d';
    if (QTc_bazett < 450) {
      status = 'NORMAL (QTc < 450 ms: Low arrhythmia risk)';
      color = '#22543d';
    } else if (QTc_bazett <= 500) {
      status = 'BORDERLINE PROLONGED (QTc 450 - 500 ms: Review QT-prolonging drugs)';
      color = '#ea580c';
    } else {
      status = 'HIGH RISK PROLONGED (QTc > 500 ms: Severe risk of Torsades de Pointes / VFib!)';
      color = '#c53030';
    }

    bzResEl.textContent = 'Bazett QTc = ' + QTc_bazett.toFixed(1) + ' ms (' + status.split(' (')[0] + ')';
    bzResEl.style.color = color;
    frResEl.textContent = 'Fridericia = ' + QTc_fridericia.toFixed(1) + ' ms | Framingham = ' + QTc_framingham.toFixed(1) + ' ms | RR Interval = ' + Math.round(RR_ms) + ' ms';
    frResEl.style.color = color;
  }

  qtEl.addEventListener('input', update);
  hrEl.addEventListener('input', update);
  update();
})();