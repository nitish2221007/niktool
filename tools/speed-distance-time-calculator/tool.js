(function() {
  'use strict';
  var slug = 'speed-distance-time-calculator';
  var modeEl = document.getElementById(slug + '-mode');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function updateLabels() {
    var m = modeEl.value;
    if (m === 'speed') { aEl.placeholder = 'Distance (m)'; bEl.placeholder = 'Time (s)'; }
    else if (m === 'distance') { aEl.placeholder = 'Speed (m/s)'; bEl.placeholder = 'Time (s)'; }
    else { aEl.placeholder = 'Distance (m)'; bEl.placeholder = 'Speed (m/s)'; }
  }
  modeEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 0 || b < 0) { setMsg('Values cannot be negative.', true); return; }
    var mode = modeEl.value;
    var out = 'Formula: Speed = Distance / Time\n\n';
    if (mode === 'speed') {
      if (b === 0) { setMsg('Time cannot be zero.', true); return; }
      var s = a / b;
      out += 'Distance = ' + a + ' m, Time = ' + b + ' s\n';
      out += 'Speed = ' + s.toFixed(4) + ' m/s\n';
      out += 'Speed = ' + (s * 3.6).toFixed(4) + ' km/h';
    } else if (mode === 'distance') {
      var d = a * b;
      out += 'Speed = ' + a + ' m/s, Time = ' + b + ' s\n';
      out += 'Distance = ' + d.toFixed(4) + ' m\n';
      out += 'Distance = ' + (d / 1000).toFixed(4) + ' km';
    } else {
      if (a === 0) { setMsg('Speed cannot be zero.', true); return; }
      var t = b / a;
      out += 'Distance = ' + b + ' m, Speed = ' + a + ' m/s\n';
      out += 'Time = ' + t.toFixed(4) + ' seconds\n';
      if (t >= 60) out += 'Time = ' + Math.floor(t/60) + ' min ' + Math.round(t%60) + ' s';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Calculation complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
