(function() {
  'use strict';
  var slug = 'remove-last-two-pages-from-pdf';
  var presetMode = 'last2';

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

        applyPresetMode();
        setMsg('PDF loaded successfully.');
      } catch (err) {
        setMsg('Failed to parse PDF: ' + err.message, true);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function applyPresetMode() {
    removedPages.clear();
    if (presetMode === 'first1') {
      if (totalPagesCount >= 1) removedPages.add(1);
    } else if (presetMode === 'last1') {
      if (totalPagesCount >= 1) removedPages.add(totalPagesCount);
    } else if (presetMode === 'last2') {
      if (totalPagesCount >= 1) removedPages.add(totalPagesCount);
      if (totalPagesCount >= 2) removedPages.add(totalPagesCount - 1);
    } else if (presetMode === 'even') {
      for (var i = 2; i <= totalPagesCount; i += 2) removedPages.add(i);
    } else if (presetMode === 'odd') {
      for (var i = 1; i <= totalPagesCount; i += 2) removedPages.add(i);
    } else if (presetMode === 'extract_first1') {
      for (var i = 2; i <= totalPagesCount; i++) removedPages.add(i);
    } else if (presetMode === 'extract_first2') {
      for (var i = 3; i <= totalPagesCount; i++) removedPages.add(i);
    } else if (presetMode === 'extract_even') {
      for (var i = 1; i <= totalPagesCount; i += 2) removedPages.add(i);
    } else if (presetMode === 'extract_odd') {
      for (var i = 2; i <= totalPagesCount; i += 2) removedPages.add(i);
    }
    renderPagesGrid();
  }

  function renderPagesGrid() {
    pagesContainer.innerHTML = '';
    for (var i = 1; i <= totalPagesCount; i++) {
      var isRemoved = removedPages.has(i);
      var card = document.createElement('div');
      card.className = 'page-card' + (isRemoved ? ' removed' : '');
      card.setAttribute('data-page', i);

      var numDiv = document.createElement('div');
      numDiv.className = 'page-num';
      numDiv.textContent = i;

      var labelDiv = document.createElement('div');
      labelDiv.className = 'page-label';
      labelDiv.textContent = isRemoved ? 'Remove' : 'Keep';

      card.appendChild(numDiv);
      card.appendChild(labelDiv);

      (function(pageIndex) {
        card.addEventListener('click', function() {
          if (removedPages.has(pageIndex)) removedPages.delete(pageIndex);
          else removedPages.add(pageIndex);
          renderPagesGrid();
        });
      })(i);

      pagesContainer.appendChild(card);
    }
  }

  presetDefault.addEventListener('click', function() { applyPresetMode(); });
  presetClear.addEventListener('click', function() { removedPages.clear(); renderPagesGrid(); });

  processBtn.addEventListener('click', async function() {
    if (!currentArrayBuffer || totalPagesCount === 0) { setMsg('No PDF loaded.', true); return; }

    if (presetMode === 'reverse') {
      try {
        setMsg('Reversing page order...');
        var srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
        var newDoc = await PDFLib.PDFDocument.create();
        var indices = [];
        for (var i = totalPagesCount - 1; i >= 0; i--) indices.push(i);
        var copiedPages = await newDoc.copyPages(srcDoc, indices);
        copiedPages.forEach(function(p) { newDoc.addPage(p); });
        var pdfBytes = await newDoc.save();
        downloadBlob(pdfBytes, '-reversed.pdf');
        setMsg('Success! Reversed PDF downloaded.');
        return;
      } catch (e) { setMsg('Error: ' + e.message, true); return; }
    }

    if (removedPages.size >= totalPagesCount) { setMsg('Cannot remove all pages from the document.', true); return; }

    try {
      setMsg('Processing PDF...');
      var srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
      var newDoc = await PDFLib.PDFDocument.create();

      var keepIndices = [];
      for (var i = 0; i < totalPagesCount; i++) {
        if (!removedPages.has(i + 1)) keepIndices.push(i);
      }

      var copiedPages = await newDoc.copyPages(srcDoc, keepIndices);
      copiedPages.forEach(function(page) { newDoc.addPage(page); });

      var pdfBytes = await newDoc.save();
      downloadBlob(pdfBytes, '-processed.pdf');
      setMsg('Success! Updated PDF downloaded.');
    } catch (e) {
      setMsg('Error processing PDF: ' + e.message, true);
    }
  });

  function downloadBlob(bytes, suffix) {
    var blob = new Blob([bytes], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = currentFile.name.replace(/\.pdf$/i, '') + suffix;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  resetBtn.addEventListener('click', function() {
    currentFile = null; currentArrayBuffer = null; totalPagesCount = 0; removedPages.clear(); fileInput.value = '';
    detailsPanel.style.display = 'none'; dropzone.style.display = 'block';
    setMsg('Ready. Select a PDF file above.');
  });
})();
