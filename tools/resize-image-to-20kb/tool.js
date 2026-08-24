(function() {
  'use strict';
  var slug = 'resize-image-to-20kb';
  var toolType = 'compress_kb';
  var config = {"targetKB":20};

  var dropzone = document.getElementById('img-dropzone');
  var fileInput = document.getElementById('img-file-input');
  var selectBtn = document.getElementById('btn-select-img');
  var detailsPanel = document.getElementById('img-details-panel');

  var previewTag = document.getElementById('img-preview-tag');
  var fileNameEl = document.getElementById('img-file-name');
  var dimBadge = document.getElementById('img-dim-badge');
  var sizeBadge = document.getElementById('img-size-badge');
  var fmtBadge = document.getElementById('img-fmt-badge');

  var qualitySlider = document.getElementById('img-quality-slider');
  var qualityTxt = document.getElementById('img-quality-txt');
  var processBtn = document.getElementById('btn-process-download');
  var resetBtn = document.getElementById('btn-reset-file');
  var msgEl = document.getElementById(slug + '-message');

  var currentFile = null;
  var imageObj = new Image();

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

  qualitySlider.addEventListener('input', function() {
    qualityTxt.textContent = 'Quality Target: ' + qualitySlider.value + '%';
  });

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      setMsg('Please select a valid image file (JPG, PNG, WebP).', true);
      return;
    }

    currentFile = file;
    setMsg('Loading image...');

    var reader = new FileReader();
    reader.onload = function(evt) {
      previewTag.src = evt.target.result;
      imageObj.onload = function() {
        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';

        fileNameEl.textContent = file.name;
        dimBadge.textContent = imageObj.width + ' x ' + imageObj.height + ' px';
        sizeBadge.textContent = formatBytes(file.size);
        fmtBadge.textContent = file.type.split('/')[1].toUpperCase();

        setMsg('Image loaded successfully.');
      };
      imageObj.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }

  processBtn.addEventListener('click', function() {
    if (!currentFile || !imageObj.width) { setMsg('No image loaded.', true); return; }

    try {
      setMsg('Processing image...');
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      var targetWidth = imageObj.width;
      var targetHeight = imageObj.height;
      var exportQuality = parseFloat(qualitySlider.value) / 100;
      var exportFormat = currentFile.type || 'image/jpeg';
      var ext = currentFile.name.split('.').pop() || 'jpg';

      if (toolType === 'resize_dim') {
        targetWidth = config.width;
        targetHeight = config.height;
      } else if (toolType === 'convert_format') {
        exportFormat = config.targetFormat;
        ext = config.ext;
      } else if (toolType === 'crop_ratio') {
        var ratio = config.ratioW / config.ratioH;
        var currentRatio = imageObj.width / imageObj.height;
        var cropW = imageObj.width;
        var cropH = imageObj.height;
        var startX = 0;
        var startY = 0;

        if (currentRatio > ratio) {
          cropW = imageObj.height * ratio;
          startX = (imageObj.width - cropW) / 2;
        } else {
          cropH = imageObj.width / ratio;
          startY = (imageObj.height - cropH) / 2;
        }
        canvas.width = cropW;
        canvas.height = cropH;
        ctx.drawImage(imageObj, startX, startY, cropW, cropH, 0, 0, cropW, cropH);

        canvas.toBlob(function(blob) {
          triggerDownload(blob, '-cropped.' + ext);
        }, exportFormat, exportQuality);
        return;
      } else if (toolType === 'filter_effect') {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        if (config.filter === 'grayscale') ctx.filter = 'grayscale(100%)';
        else if (config.filter === 'invert') ctx.filter = 'invert(100%)';
        ctx.drawImage(imageObj, 0, 0);

        canvas.toBlob(function(blob) {
          triggerDownload(blob, '-filtered.' + ext);
        }, exportFormat, exportQuality);
        return;
      } else if (toolType === 'transform_effect') {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        if (config.transform === 'flip_h') {
          ctx.translate(targetWidth, 0);
          ctx.scale(-1, 1);
        } else if (config.transform === 'flip_v') {
          ctx.translate(0, targetHeight);
          ctx.scale(1, -1);
        } else if (config.transform === 'rotate_90') {
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          ctx.translate(canvas.width, 0);
          ctx.rotate(90 * Math.PI / 180);
        }
        ctx.drawImage(imageObj, 0, 0);

        canvas.toBlob(function(blob) {
          triggerDownload(blob, '-transformed.' + ext);
        }, exportFormat, exportQuality);
        return;
      }

      // Default Canvas Draw
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(function(blob) {
        triggerDownload(blob, '-processed.' + ext);
      }, exportFormat, exportQuality);

    } catch(e) {
      setMsg('Error processing image: ' + e.message, true);
    }
  });

  function triggerDownload(blob, suffix) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = currentFile.name.replace(/\.[^/.]+$/, '') + suffix;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setMsg('Success! Image downloaded as "' + a.download + '". (' + formatBytes(blob.size) + ')');
  }

  resetBtn.addEventListener('click', function() {
    currentFile = null; imageObj = new Image(); fileInput.value = '';
    detailsPanel.style.display = 'none'; dropzone.style.display = 'block';
    setMsg('Ready. Select an image above to get started.');
  });
})();
