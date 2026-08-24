(function() {
  'use strict';
  var slug = 'remove-last-13-pages-from-pdf';
  var mode = 'remove_last_n';
  var param = 13;

  var dropzone = document.getElementById('pdf-dropzone');
  var fileInput = document.getElementById('pdf-file-input');
  var selectBtn = document.getElementById('btn-select-pdf');
  var detailsPanel = document.getElementById('pdf-details-panel');

  var fileNameEl = document.getElementById('pdf-file-name');
  var fileInfoEl = document.getElementById('pdf-file-info');
  var pagesContainer = document.getElementById('pages-container');
  var processBtn = document.getElementById('btn-process-download');
  var resetBtn = document.getElementById('btn-reset-file');
  var msgEl = document.getElementById(slug + '-message');

  var presetDefault = document.getElementById('preset-default');
  var presetClear = document.getElementById('preset-clear');

  var currentFile = null;
  var currentArrayBuffer = null;
  var totalPagesCount = 0;
  var removedPages = new Set();
  var rotateDegrees = 0;

  function setMsg(txt, err) {
    msgEl.textContent = txt;
    msgEl.classList.toggle('is-error', !!err);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  selectBtn.addEventListener('click', function(e) { e.stopPropagation(); fileInput.click(); });
  dropzone.addEventListener('click', function() { fileInput.click(); });
  dropzone.addEventListener('dragover', function(e) { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', function() { dropzone.classList.remove('dragover'); });
  dropzone.addEventListener('drop', function(e) {
    e.preventDefault(); dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', function() {
    if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    if (!file || file.type !== 'application/pdf') { setMsg('Please select a valid PDF document (.pdf)', true); return; }
    currentFile = file;
    setMsg('Loading PDF file...');

    var reader = new FileReader();
    reader.onload = async function(evt) {
      currentArrayBuffer = evt.target.result;
      try {
        if (!window.PDFLib) { setMsg('PDF engine loading, please try again.', true); return; }
        var pdfDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
        totalPagesCount = pdfDoc.getPageCount();
        if (totalPagesCount === 0) { setMsg('The selected PDF has no pages.', true); return; }

        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';

        fileNameEl.childNodes[2].textContent = ' ' + file.name;
        fileInfoEl.textContent = totalPagesCount + ' Pages | ' + formatBytes(file.size);

        applyModeSelection();
        setMsg('PDF loaded successfully.');
      } catch (err) {
        setMsg('Failed to parse PDF: ' + err.message, true);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function applyModeSelection() {
    removedPages.clear();
    if (mode === 'remove_first_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = 1; i <= n; i++) removedPages.add(i);
    } else if (mode === 'remove_last_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = totalPagesCount - n + 1; i <= totalPagesCount; i++) if (i >= 1) removedPages.add(i);
    } else if (mode === 'remove_specific_page') {
      if (param <= totalPagesCount && param >= 1) removedPages.add(param);
    } else if (mode === 'remove_range') {
      var s = param[0], e = Math.min(param[1], totalPagesCount);
      for (var i = s; i <= e; i++) removedPages.add(i);
    } else if (mode === 'remove_front_and_back') {
      if (totalPagesCount >= 1) removedPages.add(1);
      if (totalPagesCount >= 2) removedPages.add(totalPagesCount);
    } else if (mode === 'remove_every_nth') {
      for (var i = param; i <= totalPagesCount; i += param) removedPages.add(i);
    } else if (mode === 'extract_first_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = n + 1; i <= totalPagesCount; i++) removedPages.add(i);
    } else if (mode === 'extract_last_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = 1; i <= totalPagesCount - n; i++) removedPages.add(i);
    } else if (mode === 'extract_specific_page') {
      for (var i = 1; i <= totalPagesCount; i++) if (i !== param) removedPages.add(i);
    } else if (mode === 'extract_range') {
      var s = param[0], e = Math.min(param[1], totalPagesCount);
      for (var i = 1; i <= totalPagesCount; i++) if (i < s || i > e) removedPages.add(i);
    } else if (mode === 'extract_middle') {
      if (totalPagesCount >= 1) removedPages.add(1);
      if (totalPagesCount >= 2) removedPages.add(totalPagesCount);
    } else if (mode === 'rotate_all') {
      rotateDegrees = param;
    }
    renderPagesGrid();
  }

  function renderPagesGrid() {
    pagesContainer.innerHTML = '';
    for (var i = 1; i <= totalPagesCount; i++) {
      var isRemoved = removedPages.has(i);
      var card = document.createElement('div');
      card.className = 'page-card' + (isRemoved ? ' removed' : '');

      var numDiv = document.createElement('div');
      numDiv.className = 'page-num';
      numDiv.textContent = i;

      var labelDiv = document.createElement('div');
      labelDiv.className = 'page-label';
      labelDiv.textContent = isRemoved ? 'Remove' : 'Keep';

      card.appendChild(numDiv);
      card.appendChild(labelDiv);

      (function(idx) {
        card.addEventListener('click', function() {
          if (removedPages.has(idx)) removedPages.delete(idx);
          else removedPages.add(idx);
          renderPagesGrid();
        });
      })(i);

      pagesContainer.appendChild(card);
    }
  }

  presetDefault.addEventListener('click', function() { applyModeSelection(); });
  presetClear.addEventListener('click', function() { removedPages.clear(); renderPagesGrid(); });

  processBtn.addEventListener('click', async function() {
    if (!currentArrayBuffer || totalPagesCount === 0) { setMsg('No PDF loaded.', true); return; }

    try {
      setMsg('Processing PDF...');
      var srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
      var newDoc = await PDFLib.PDFDocument.create();

      var keepIndices = [];
      if (mode === 'reverse_all') {
        for (var i = totalPagesCount - 1; i >= 0; i--) keepIndices.push(i);
      } else if (mode === 'swap_first_last') {
        if (totalPagesCount >= 2) {
          keepIndices.push(totalPagesCount - 1);
          for (var i = 1; i < totalPagesCount - 1; i++) keepIndices.push(i);
          keepIndices.push(0);
        } else {
          keepIndices.push(0);
        }
      } else if (mode === 'move_first_to_end') {
        for (var i = 1; i < totalPagesCount; i++) keepIndices.push(i);
        keepIndices.push(0);
      } else if (mode === 'move_last_to_front') {
        keepIndices.push(totalPagesCount - 1);
        for (var i = 0; i < totalPagesCount - 1; i++) keepIndices.push(i);
      } else if (mode === 'duplicate_first') {
        keepIndices.push(0);
        for (var i = 0; i < totalPagesCount; i++) keepIndices.push(i);
      } else if (mode === 'duplicate_last') {
        for (var i = 0; i < totalPagesCount; i++) keepIndices.push(i);
        keepIndices.push(totalPagesCount - 1);
      } else if (mode === 'duplicate_all') {
        for (var i = 0; i < totalPagesCount; i++) { keepIndices.push(i); keepIndices.push(i); }
      } else {
        for (var i = 0; i < totalPagesCount; i++) {
          if (!removedPages.has(i + 1)) keepIndices.push(i);
        }
      }

      if (keepIndices.length === 0) { setMsg('Cannot remove all pages from document.', true); return; }

      var copiedPages = await newDoc.copyPages(srcDoc, keepIndices);
      copiedPages.forEach(function(page) {
        if (rotateDegrees > 0) {
          var currRot = page.getRotation().angle;
          page.setRotation(PDFLib.degrees((currRot + rotateDegrees) % 360));
        }
        newDoc.addPage(page);
      });

      var pdfBytes = await newDoc.save();
      var blob = new Blob([pdfBytes], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = currentFile.name.replace(/\.pdf$/i, '') + '-processed.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setMsg('Success! Updated PDF downloaded. (' + keepIndices.length + ' pages saved)');
    } catch (e) {
      setMsg('Error: ' + e.message, true);
    }
  });

  resetBtn.addEventListener('click', function() {
    currentFile = null; currentArrayBuffer = null; totalPagesCount = 0; removedPages.clear(); fileInput.value = '';
    detailsPanel.style.display = 'none'; dropzone.style.display = 'block';
    setMsg('Ready. Select a PDF file above.');
  });
})();
