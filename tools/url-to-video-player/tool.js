document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-to-video-player-input');
  const playBtn = document.getElementById('primary-action-btn');
  const pipBtn = document.getElementById('pip-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msg = document.getElementById('url-to-video-player-message');
  const video = document.getElementById('video-player');
  const placeholder = document.getElementById('placeholder-text');
  const speedButtons = document.querySelectorAll('[data-speed]');

  let hlsInstance = null;

  function loadVideo(url) {
    if (!url) {
      msg.textContent = 'Please enter a valid video URL.';
      return;
    }

    placeholder.style.display = 'none';
    video.style.display = 'block';

    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }

    if (url.includes('.m3u8') && window.Hls && window.Hls.isSupported()) {
      hlsInstance = new window.Hls();
      hlsInstance.loadSource(url);
      hlsInstance.attachMedia(video);
      hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
        msg.textContent = 'Playing HLS stream.';
      });
      hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          msg.textContent = 'Error loading HLS stream. Check CORS or URL validity.';
        }
      });
    } else {
      video.src = url;
      video.load();
      video.play().then(() => {
        msg.textContent = 'Playing video stream.';
      }).catch((e) => {
        msg.textContent = 'Loaded video. Click play button on video player to start.';
      });
    }

    pipBtn.disabled = !document.pictureInPictureEnabled;
    fullscreenBtn.disabled = false;
    copyBtn.disabled = false;
  }

  playBtn?.addEventListener('click', () => {
    const url = urlInput.value.trim();
    loadVideo(url);
  });

  urlInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      loadVideo(urlInput.value.trim());
    }
  });

  pipBtn?.addEventListener('click', () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {});
    } else if (video && video.requestPictureInPicture) {
      video.requestPictureInPicture().catch((err) => {
        msg.textContent = 'Picture in Picture failed: ' + err.message;
      });
    }
  });

  fullscreenBtn?.addEventListener('click', () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });

  speedButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      speedButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = parseFloat(btn.getAttribute('data-speed'));
      if (video && !isNaN(speed)) {
        video.playbackRate = speed;
        msg.textContent = `Playback speed set to ${speed}x.`;
      }
    });
  });

  copyBtn?.addEventListener('click', () => {
    if (window.NikTool && window.NikTool.copy) {
      window.NikTool.copy(urlInput.value, copyBtn);
    }
  });

  clearBtn?.addEventListener('click', () => {
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }
    video.pause();
    video.removeAttribute('src');
    video.load();
    video.style.display = 'none';
    placeholder.style.display = 'block';
    urlInput.value = '';
    pipBtn.disabled = true;
    fullscreenBtn.disabled = true;
    copyBtn.disabled = true;
    msg.textContent = 'Ready. Enter video URL above.';
  });
});
