(function() {
  'use strict';
  var slug = 'remove-first-two-pages-from-pdf';

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

  var presetFirst2 = document.getElementById('preset-first2');
  var presetFirst1 = document.getElementById('preset-first1');
  var presetLast2 = document.getElementById('preset-last2');
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

  // Trigger file browser
  selectBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    fileInput.click();
  });

  dropzone.addEventListener('click', function() {
    fileInput.click();
  });

  dropzone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', function() {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', function() {
    if (fileInput.files && fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  function handleFile(file) {
    if (!file || file.type !== 'application/pdf') {
      setMsg('Please select a valid PDF document (.pdf)', true);
      return;
    }

    currentFile = file;
    setMsg('Loading and reading PDF file...');

    var reader = new FileReader();
    reader.onload = async function(evt) {
      currentArrayBuffer = evt.target.result;
      try {
        if (!window.PDFLib) {
          setMsg('PDF processing engine is loading, please try again in a moment.', true);
          return;
        }

        var pdfDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
        totalPagesCount = pdfDoc.getPageCount();

        if (totalPagesCount === 0) {
          setMsg('The selected PDF has no pages.', true);
          return;
        }

        // Show Details Panel, Hide Dropzone
        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';

        fileNameEl.childNodes[2].textContent = ' ' + file.name;
        fileInfoEl.textContent = totalPagesCount + ' Pages | ' + formatBytes(file.size);

        // Auto-select pages 1 and 2 for removal by default
        setDefaultRemoval(1, 2);
        setMsg('PDF loaded successfully. Pages 1 and 2 selected for removal.');
      } catch (err) {
        setMsg('Failed to parse PDF document: ' + err.message, true);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function setDefaultRemoval(start, end) {
    removedPages.clear();
    for (var i = start; i <= Math.min(end, totalPagesCount); i++) {
      removedPages.add(i);
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
          if (removedPages.has(pageIndex)) {
            removedPages.delete(pageIndex);
          } else {
            removedPages.add(pageIndex);
          }
          renderPagesGrid();
        });
      })(i);

      pagesContainer.appendChild(card);
    }
  }

  // Presets Listeners
  presetFirst2.addEventListener('click', function() {
    setActivePreset(presetFirst2);
    setDefaultRemoval(1, 2);
  });

  presetFirst1.addEventListener('click', function() {
    setActivePreset(presetFirst1);
    setDefaultRemoval(1, 1);
  });

  presetLast2.addEventListener('click', function() {
    setActivePreset(presetLast2);
    removedPages.clear();
    if (totalPagesCount >= 1) removedPages.add(totalPagesCount);
    if (totalPagesCount >= 2) removedPages.add(totalPagesCount - 1);
    renderPagesGrid();
  });

  presetClear.addEventListener('click', function() {
    setActivePreset(presetClear);
    removedPages.clear();
    renderPagesGrid();
  });

  function setActivePreset(target) {
    [presetFirst2, presetFirst1, presetLast2, presetClear].forEach(function(b) {
      b.classList.remove('active');
    });
    target.classList.add('active');
  }

  // Process & Download Action
  processBtn.addEventListener('click', async function() {
    if (!currentArrayBuffer || totalPagesCount === 0) {
      setMsg('No PDF loaded.', true);
      return;
    }

    if (removedPages.size >= totalPagesCount) {
      setMsg('You cannot remove all pages from the PDF document.', true);
      return;
    }

    try {
      setMsg('Processing PDF and generating updated file...');
      var srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
      var newDoc = await PDFLib.PDFDocument.create();

      var keepPageIndices = [];
      for (var i = 0; i < totalPagesCount; i++) {
        var pageNum = i + 1;
        if (!removedPages.has(pageNum)) {
          keepPageIndices.push(i);
        }
      }

      var copiedPages = await newDoc.copyPages(srcDoc, keepPageIndices);
      copiedPages.forEach(function(page) {
        newDoc.addPage(page);
      });

      var pdfBytes = await newDoc.save();
      var blob = new Blob([pdfBytes], { type: 'application/pdf' });
      var downloadUrl = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.href = downloadUrl;
      var outName = currentFile.name.replace(/\.pdf$/i, '') + '-cleaned.pdf';
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setMsg('Success! Updated PDF downloaded as "' + outName + '". (' + keepPageIndices.length + ' pages kept)');
    } catch (e) {
      setMsg('Error processing PDF: ' + e.message, true);
    }
  });

  resetBtn.addEventListener('click', function() {
    currentFile = null;
    currentArrayBuffer = null;
    totalPagesCount = 0;
    removedPages.clear();
    fileInput.value = '';

    detailsPanel.style.display = 'none';
    dropzone.style.display = 'block';
    setMsg('Ready. Select a PDF file above to get started.');
  });
})();
