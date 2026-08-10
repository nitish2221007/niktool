/* Remove First Five Pages from PDF - tool.js */
(function () {
  'use strict';

  const inputEl       = document.getElementById('pdf-input');
  const dropzone      = document.getElementById('dropzone');
  const dropText      = document.getElementById('dropzone-text');
  const fileInfoEl    = document.getElementById('file-info');
  const primaryBtn    = document.getElementById('primary-action-btn');
  const copyBtn       = document.getElementById('copy-output');
  const clearBtn      = document.getElementById('clear-text');
  const outputSummary = document.getElementById('output-summary');
  const downloadLink  = document.getElementById('download-link');
  const messageEl     = document.getElementById('tool-message');

  let currentFile     = null;
  let currentArrayBuf = null;
  let currentBlobUrl  = null;

  function showMessage(text, isError) {
    messageEl.textContent = text;
    messageEl.classList.toggle('is-error', !!isError);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function handleFile(file) {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showMessage('Please select a valid PDF file.', true);
      return;
    }
    currentFile = file;
    dropText.textContent = 'Selected: ' + file.name;
    fileInfoEl.textContent = 'Size: ' + formatBytes(file.size);
    fileInfoEl.style.display = 'block';
    primaryBtn.disabled = false;
    downloadLink.style.display = 'none';
    outputSummary.textContent = 'Ready to process. Click the button to remove the first 5 pages.';
    showMessage('PDF loaded. Click "Remove First 5 Pages" to proceed.');

    const reader = new FileReader();
    reader.onload = function (e) {
      currentArrayBuf = e.target.result;
    };
    reader.onerror = function () {
      showMessage('Failed to read file.', true);
    };
    reader.readAsArrayBuffer(file);
  }

  // Click to upload
  dropzone.addEventListener('click', function () {
    inputEl.click();
  });

  inputEl.addEventListener('change', function (e) {
    handleFile(e.target.files[0]);
  });

  // Drag & drop
  ['dragenter', 'dragover'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('is-dragover');
    });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('is-dragover');
    });
  });
  dropzone.addEventListener('drop', function (e) {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    handleFile(file);
  });

  // Primary action: trim first 5 pages
  primaryBtn.addEventListener('click', async function () {
    if (!currentArrayBuf) {
      showMessage('No PDF loaded.', true);
      return;
    }
    if (typeof PDFLib === 'undefined') {
      showMessage('PDF library not loaded. Please check your internet connection.', true);
      return;
    }

    primaryBtn.disabled = true;
    showMessage('Processing PDF...');

    try {
      const { PDFDocument } = PDFLib;
      const srcDoc = await PDFDocument.load(currentArrayBuf, { ignoreEncryption: true });
      const totalPages = srcDoc.getPageCount();

      if (totalPages <= 5) {
        outputSummary.textContent =
          'The PDF only has ' + totalPages + ' page(s). Removing the first 5 would leave nothing.';
        downloadLink.style.display = 'none';
        copyBtn.disabled = true;
        showMessage('Warning: PDF has ' + totalPages + ' page(s) — fewer than 5.', true);
        primaryBtn.disabled = false;
        return;
      }

      // Create a new empty PDF and copy pages [5..end]
      const newDoc = await PDFDocument.create();
      const pagesToCopy = [];
      for (let i = 5; i < totalPages; i++) pagesToCopy.push(i);
      const copiedPages = await newDoc.copyPages(srcDoc, pagesToCopy);
      copiedPages.forEach(function (p) { newDoc.addPage(p); });

      const bytes = await newDoc.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });

      if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
      currentBlobUrl = URL.createObjectURL(blob);

      const baseName = currentFile.name.replace(/\.pdf$/i, '');
      const newName = baseName + '-trimmed.pdf';

      downloadLink.href = currentBlobUrl;
      downloadLink.download = newName;
      downloadLink.textContent = '⬇ Download ' + newName;
      downloadLink.style.display = 'inline-block';

      outputSummary.textContent =
        'Original: ' + totalPages + ' pages (' + formatBytes(currentFile.size) + '). ' +
        'Trimmed: ' + (totalPages - 5) + ' pages (' + formatBytes(blob.size) + '). ' +
        'Removed first 5 pages successfully.';

      copyBtn.disabled = false;
      showMessage('Done! Removed first 5 pages. ' + (totalPages - 5) + ' page(s) remaining.');
    } catch (err) {
      console.error(err);
      showMessage('Error processing PDF: ' + err.message, true);
    } finally {
      primaryBtn.disabled = false;
    }
  });

  // Copy button (copies a data summary, since the download URL is a blob)
  copyBtn.addEventListener('click', async function () {
    if (!downloadLink.href) return;
    try {
      await navigator.clipboard.writeText(downloadLink.href);
      showMessage('Download URL copied to clipboard.');
    } catch (e) {
      showMessage('Could not copy to clipboard.', true);
    }
  });

  // Clear
  clearBtn.addEventListener('click', function () {
    currentFile = null;
    currentArrayBuf = null;
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
      currentBlobUrl = null;
    }
    inputEl.value = '';
    dropText.textContent = 'Click or drag & drop a PDF file here';
    fileInfoEl.style.display = 'none';
    fileInfoEl.textContent = '';
    outputSummary.textContent = 'No file processed yet.';
    downloadLink.style.display = 'none';
    downloadLink.removeAttribute('href');
    primaryBtn.disabled = true;
    copyBtn.disabled = true;
    showMessage('Cleared. Please select a PDF file.');
  });
})();
