(() => {
  'use strict';

  const form = document.querySelector('#niche-form');
  const input = document.querySelector('#niche-input');
  const submitButton = document.querySelector('#submit-button');
  const processCard = document.querySelector('#process-card');
  const activeNiche = document.querySelector('#active-niche');
  const progressValue = document.querySelector('#progress-value');
  const progressBar = document.querySelector('#progress-bar');
  const liveMessage = document.querySelector('#live-message');
  const ideaPreview = document.querySelector('#idea-preview');
  const previewName = document.querySelector('#preview-name');
  const previewPurpose = document.querySelector('#preview-purpose');
  const previewStatus = document.querySelector('#preview-status');
  const results = document.querySelector('#results');
  const errorCard = document.querySelector('#error-card');
  const errorMessage = document.querySelector('#error-message');
  const retryButton = document.querySelector('#retry-button');
  const alternativeButton = document.querySelector('#alternative-button');
  const alternativeStatus = document.querySelector('#alternative-status');
  const stageNodes = Array.from(document.querySelectorAll('#stage-list li'));
  const examples = document.querySelectorAll('[data-example]');
  const stageOrder = ['ideation', 'research', 'gap_analysis', 'generation', 'validation'];
  const modelInput = document.querySelector('#model-input');
  const modelActionButton = document.querySelector('#model-action-button');
  const modelStatusMessage = document.querySelector('#model-status-message');
  const modelPill = document.querySelector('#local-model-pill');
  const modelPillText = document.querySelector('#local-model-pill-text');
  const modelProgress = document.querySelector('#model-progress');
  const modelProgressBar = document.querySelector('#model-progress-bar');
  const modelProgressValue = document.querySelector('#model-progress-value');
  const modelLogs = document.querySelector('#model-logs');
  const installCommand = document.querySelector('#install-command');
  const copyInstallButton = document.querySelector('#copy-install-button');
  const codeFileTabs = document.querySelector('#code-file-tabs');
  const codeFilename = document.querySelector('#code-filename');
  const codeContent = document.querySelector('#code-content');
  const codeStatus = document.querySelector('#code-status');
  const copyCodeButton = document.querySelector('#copy-code-button');
  const githubUsername = document.querySelector('#github-username');
  const githubRepository = document.querySelector('#github-repository');
  const githubCommands = document.querySelector('#github-commands');
  const copyGithubButton = document.querySelector('#copy-github-button');

  if (!form || !input || !submitButton || !processCard || !activeNiche ||
      !progressValue || !progressBar || !liveMessage || !results || !errorCard ||
      !errorMessage || !retryButton || !ideaPreview || !previewName ||
      !previewPurpose || !previewStatus || !alternativeButton || !alternativeStatus) {
    console.error('Agent Studio initialization failed: required elements are missing.');
    return;
  }

  let running = false;
  let alternativeRunning = false;
  let alternativesUrl = '';
  let modelReady = false;
  let currentModelState = null;
  let currentCode = '';
  let generatedSlug = '';

  if (!modelInput || !modelActionButton || !modelStatusMessage || !modelPill ||
      !modelPillText || !modelProgress || !modelProgressBar ||
      !modelProgressValue || !modelLogs || !installCommand ||
      !copyInstallButton || !codeFileTabs || !codeFilename || !codeContent ||
      !codeStatus || !copyCodeButton || !githubUsername || !githubRepository ||
      !githubCommands || !copyGithubButton) {
    console.error('Offline Studio initialization failed: local model or code UI is missing.');
    return;
  }

  modelActionButton.addEventListener('click', handleModelAction);
  modelInput.addEventListener('change', () => {
    modelReady = false;
    currentModelState = null;
    refreshModelStatus();
  });
  copyInstallButton.addEventListener('click', () => {
    copyText('winget install Ollama.Ollama', copyInstallButton, 'Copied');
  });
  copyCodeButton.addEventListener('click', () => {
    if (currentCode) copyText(currentCode, copyCodeButton, 'Copied');
  });
  githubUsername.addEventListener('input', updateGitHubCommands);
  githubRepository.addEventListener('input', updateGitHubCommands);
  copyGithubButton.addEventListener('click', () => {
    const commands = githubCommands.textContent || '';
    if (generatedSlug) copyText(commands, copyGithubButton, 'Commands copied');
  });

  refreshModelStatus();

  examples.forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.example || '';
      input.focus();
    });
  });

  async function refreshModelStatus() {
    const model = modelInput.value.trim();
    if (!model) {
      applyModelState({
        ollama_installed: false,
        server_ready: false,
        model_ready: false,
        message: 'Enter an Ollama model tag such as gemma3:4b.'
      });
      return;
    }
    modelActionButton.disabled = true;
    modelStatusMessage.textContent = 'Checking the local Ollama runtime...';
    try {
      const response = await fetch(`/api/local-model?model=${encodeURIComponent(model)}`, {
        headers: {'Accept': 'application/json'}
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not check the local model.');
      applyModelState(payload);
    } catch (error) {
      applyModelState({
        ollama_installed: false,
        server_ready: false,
        model_ready: false,
        message: error instanceof Error ? error.message : 'Local model check failed.'
      });
    }
  }

  function applyModelState(state) {
    currentModelState = state;
    modelReady = Boolean(state.model_ready);
    modelStatusMessage.textContent = state.message || 'Local model status unavailable.';
    modelPill.classList.toggle('ready', modelReady);
    modelPill.classList.toggle('warning', !modelReady);
    modelPillText.textContent = modelReady
      ? `${modelInput.value.trim()} ready offline`
      : 'Local AI setup needed';
    installCommand.hidden = Boolean(state.ollama_installed);
    modelProgress.hidden = true;
    modelLogs.hidden = true;
    modelActionButton.disabled = false;
    if (!state.ollama_installed) {
      modelActionButton.textContent = 'Recheck after install';
    } else if (!state.server_ready) {
      modelActionButton.textContent = 'Start Ollama';
    } else if (!state.model_ready) {
      modelActionButton.textContent = `Download ${modelInput.value.trim()}`;
    } else {
      modelActionButton.textContent = 'Model ready';
      modelActionButton.disabled = true;
    }
    submitButton.disabled = running || !modelReady;
  }

  async function handleModelAction() {
    if (!currentModelState) {
      await refreshModelStatus();
      return;
    }
    if (!currentModelState.ollama_installed) {
      await refreshModelStatus();
      return;
    }
    modelActionButton.disabled = true;
    try {
      if (!currentModelState.server_ready) {
        modelStatusMessage.textContent = 'Starting the local Ollama server...';
        const response = await fetch('/api/local-model/start', {
          method: 'POST',
          headers: {'Accept': 'application/json'}
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'Could not start Ollama.');
        await refreshModelStatus();
        return;
      }
      await startModelPull();
    } catch (error) {
      modelStatusMessage.textContent = error instanceof Error
        ? error.message
        : 'Local model action failed.';
      modelActionButton.disabled = false;
    }
  }

  async function startModelPull() {
    const model = modelInput.value.trim();
    modelStatusMessage.textContent = `Preparing ${model} download...`;
    modelProgress.hidden = false;
    modelLogs.hidden = false;
    const response = await fetch('/api/local-model/pulls', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({model})
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Could not start the model download.');
    if (payload.already_ready) {
      applyModelState(payload);
      return;
    }
    await pollModelPull(payload.status_url);
  }

  async function pollModelPull(statusUrl) {
    while (true) {
      const response = await fetch(statusUrl, {headers: {'Accept': 'application/json'}});
      const pull = await response.json();
      if (!response.ok) throw new Error(pull.error || 'Could not read download progress.');
      const percent = Math.min(Math.max(Number(pull.progress) || 0, 0), 100);
      modelProgressBar.style.width = `${percent}%`;
      modelProgressValue.textContent = `${percent}%`;
      modelStatusMessage.textContent = pull.message || 'Downloading model...';
      modelLogs.textContent = Array.isArray(pull.logs) ? pull.logs.join('\n') : '';
      modelLogs.scrollTop = modelLogs.scrollHeight;
      if (pull.status === 'complete') {
        await refreshModelStatus();
        return;
      }
      if (pull.status === 'failed') {
        throw new Error(pull.error || 'Model download failed.');
      }
      await new Promise((resolve) => window.setTimeout(resolve, 800));
    }
  }

  retryButton.addEventListener('click', () => {
    errorCard.hidden = true;
    input.disabled = false;
    submitButton.disabled = false;
    input.focus();
  });

  alternativeButton.addEventListener('click', async () => {
    if (alternativeRunning || !alternativesUrl) return;
    setAlternativeRunning(true, 'Generating a new idea...');
    removeAlternativePreview();
    try {
      const response = await fetch(alternativesUrl, {
        method: 'POST',
        headers: {'Accept': 'application/json'}
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Could not generate another idea.');
      }
      await pollAlternative(payload.status_url);
    } catch (error) {
      setAlternativeRunning(
        false,
        error instanceof Error ? error.message : 'Could not generate another idea.'
      );
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const idea = input.value.trim().replace(/\s+/gu, ' ');
    if (running || !modelReady || idea.length < 2) {
      if (!modelReady) modelStatusMessage.scrollIntoView({behavior: 'smooth', block: 'center'});
      input.focus();
      return;
    }

    setRunning(true);
    resetRun(idea);
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({idea, model: modelInput.value.trim()})
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Could not start the agent.');
      }
      await pollJob(payload.status_url);
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Could not start the agent.');
    }
  });

  async function pollJob(statusUrl) {
    let transientFailures = 0;
    while (running) {
      try {
        const response = await fetch(statusUrl, {headers: {'Accept': 'application/json'}});
        const job = await response.json();
        if (!response.ok) {
          throw new Error(job.error || 'Could not read agent progress.');
        }
        transientFailures = 0;
        updateProgress(job);
        if (job.status === 'complete') {
          renderResults(job.result);
          setRunning(false);
          return;
        }
        if (job.status === 'failed') {
          throw new Error(job.error || 'The agent could not finish this run.');
        }
      } catch (error) {
        transientFailures += 1;
        if (transientFailures >= 3) {
          showError(error instanceof Error ? error.message : 'Progress polling failed.');
          return;
        }
      }
      await new Promise((resolve) => window.setTimeout(resolve, 1200));
    }
  }

  async function pollAlternative(statusUrl) {
    let transientFailures = 0;
    while (alternativeRunning) {
      try {
        const response = await fetch(statusUrl, {headers: {'Accept': 'application/json'}});
        const job = await response.json();
        if (!response.ok) {
          throw new Error(job.error || 'Could not read alternative progress.');
        }
        transientFailures = 0;
        alternativeStatus.textContent = job.message || 'Validating the alternative';
        if (job.preview) renderAlternativePreview(job.preview, job.stage);
        if (job.status === 'complete') {
          removeAlternativePreview();
          renderAlternative(job.result);
          setAlternativeRunning(false, 'Alternative validated. Generate another anytime.');
          return;
        }
        if (job.status === 'failed') {
          throw new Error(job.error || 'The alternative could not be validated.');
        }
      } catch (error) {
        transientFailures += 1;
        if (transientFailures >= 3) {
          removeAlternativePreview();
          setAlternativeRunning(
            false,
            error instanceof Error ? error.message : 'Alternative polling failed.'
          );
          return;
        }
      }
      await new Promise((resolve) => window.setTimeout(resolve, 1000));
    }
  }

  const consoleCode = document.querySelector('#console-code');
  const consoleLogsContainer = document.querySelector('#console-logs');

  function resetRun(idea) {
    processCard.hidden = false;
    results.hidden = true;
    errorCard.hidden = true;
    activeNiche.textContent = idea.length > 90 ? `${idea.slice(0, 87)}...` : idea;
    progressValue.textContent = '0%';
    progressBar.style.width = '0%';
    liveMessage.textContent = 'Waiting to start';
    ideaPreview.hidden = true;
    previewName.textContent = '';
    previewPurpose.textContent = '';
    previewStatus.textContent = 'Validating demand...';
    if (consoleCode) consoleCode.textContent = `[00:00:00] Starting local generation with ${modelInput.value.trim()}...`;
    alternativesUrl = '';
    alternativeStatus.textContent = '';
    setAlternativeRunning(false, '');
    alternativeButton.disabled = true;
    stageNodes.forEach((node) => node.classList.remove('active', 'done'));
    processCard.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  function updateProgress(job) {
    const percent = Math.min(Math.max(Number(job.progress) || 0, 0), 100);
    progressValue.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
    liveMessage.textContent = job.message || 'Working';
    if (job.preview) renderIdeaPreview(job.preview, job.stage);
    if (job.logs && Array.isArray(job.logs) && consoleCode) {
      consoleCode.textContent = job.logs.join('\n');
      if (consoleLogsContainer) {
        consoleLogsContainer.scrollTop = consoleLogsContainer.scrollHeight;
      }
    }
    const activeIndex = job.stage === 'complete'
      ? stageOrder.length
      : stageOrder.indexOf(job.stage);
    stageNodes.forEach((node, index) => {
      node.classList.toggle('active', index === activeIndex);
      node.classList.toggle('done', index < activeIndex || job.stage === 'complete');
    });
  }

  function renderIdeaPreview(idea, stage) {
    previewName.textContent = idea.name || 'Focused tool idea';
    previewPurpose.textContent = idea.purpose || '';
    const messages = {
      research: 'Validating demand...',
      gap_analysis: 'Demand checked - finding the gap...',
      generation: 'Gap found - building the tool...',
      validation: 'Tool built - validating output...'
    };
    previewStatus.textContent = messages[stage] || 'Idea generated';
    ideaPreview.hidden = false;
  }

  let activePreviewUrl = '';
  const previewButton = document.querySelector('#preview-button');
  const previewModal = document.querySelector('#preview-modal');
  const modalBackdrop = document.querySelector('#modal-backdrop');
  const closeModalBtn = document.querySelector('#close-modal');
  const previewIframe = document.querySelector('#preview-iframe');
  const modalToolTitle = document.querySelector('#modal-tool-title');
  const modalOpenTab = document.querySelector('#modal-open-tab');
  const winnerName = document.querySelector('#winner-name');

  function openPreview(url, titleText) {
    if (!url) return;
    activePreviewUrl = url;
    if (previewIframe) previewIframe.src = url;
    if (modalOpenTab) modalOpenTab.href = url;
    if (modalToolTitle) modalToolTitle.textContent = titleText || 'Tool Preview';
    if (previewModal) previewModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closePreviewModal() {
    if (previewModal) previewModal.hidden = true;
    if (previewIframe) previewIframe.src = 'about:blank';
    document.body.style.overflow = '';
  }

  if (previewButton) {
    previewButton.addEventListener('click', () => {
      openPreview(activePreviewUrl, winnerName ? winnerName.textContent : 'Generated Tool');
    });
  }
  if (closeModalBtn) closeModalBtn.addEventListener('click', closePreviewModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closePreviewModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && previewModal && !previewModal.hidden) {
      closePreviewModal();
    }
  });

  function renderResults(result) {
    if (!result || !result.selection || !result.selected_idea || !result.output) {
      throw new Error('The completed job did not include a usable result.');
    }
    const selection = result.selection;
    const winner = result.selected_idea;
    const research = result.selected_research || {};
    alternativesUrl = typeof result.alternatives_url === 'string'
      ? result.alternatives_url
      : '';
    alternativeButton.disabled = !alternativesUrl;
    activePreviewUrl = result.output.preview_url || `/preview/${result.run_id}/`;
    generatedSlug = String(result.output.slug || winner.slug || 'generated-tool');
    githubRepository.value = generatedSlug;
    updateGitHubCommands();
    renderCodeBrowser(result.output.files_url, result.output.files || []);

    setText('#winner-name', winner.name);
    setText('#winner-purpose', winner.purpose);
    setText('#winner-confidence', selection.confidence || 'low');
    setText('#gap-statement', selection.gap_statement);
    setText('#winner-rationale', selection.rationale);
    setText('#artifact-path', result.output.published_path || result.output.tool_path);

    const gapContainer = document.querySelector('#keyword-gaps');
    gapContainer.replaceChildren();
    const gaps = selection.keyword_gaps && selection.keyword_gaps.length
      ? selection.keyword_gaps
      : research.low_coverage_keywords || [];
    gaps.forEach((gap) => {
      const chip = document.createElement('span');
      chip.textContent = gap;
      gapContainer.append(chip);
    });

    const fileList = document.querySelector('#file-list');
    fileList.replaceChildren();
    (result.output.files || []).forEach((filename) => {
      const item = document.createElement('li');
      item.textContent = filename;
      fileList.append(item);
    });

    setInternalLink('#download-link', result.output.download_url);
    setInternalLink('#report-link', result.output.report_url);
    renderIdeas(result.ideas || [], winner.slug);
    (result.alternatives || []).forEach(renderAlternative);
    renderSources(research.websites || []);
    setText(
      '#research-note',
      research.metric_disclaimer || 'Research proxies are directional only.'
    );
    results.hidden = false;
    results.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  async function renderCodeBrowser(filesUrl, fallbackFiles) {
    codeFileTabs.replaceChildren();
    codeFilename.textContent = 'Loading files...';
    codeContent.textContent = '';
    codeStatus.textContent = '';
    currentCode = '';
    try {
      let files = Array.isArray(fallbackFiles) ? fallbackFiles : [];
      let contentBase = typeof filesUrl === 'string' ? `${filesUrl}/` : '';
      if (typeof filesUrl === 'string') {
        const response = await fetch(filesUrl, {headers: {'Accept': 'application/json'}});
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'Could not list generated files.');
        files = Array.isArray(payload.files) ? payload.files : files;
        contentBase = payload.content_base_url || contentBase;
      }
      if (!files.length || !contentBase) throw new Error('No generated source files were found.');
      files.forEach((filename, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = filename;
        button.title = filename;
        button.addEventListener('click', () => loadCodeFile(contentBase, filename, button));
        codeFileTabs.append(button);
        if (index === 0) loadCodeFile(contentBase, filename, button);
      });
    } catch (error) {
      codeFilename.textContent = 'Source unavailable';
      codeContent.textContent = '';
      codeStatus.textContent = error instanceof Error ? error.message : 'Could not load source.';
    }
  }

  async function loadCodeFile(contentBase, filename, button) {
    codeFileTabs.querySelectorAll('button').forEach((node) => node.classList.remove('active'));
    button.classList.add('active');
    codeFilename.textContent = filename;
    codeContent.textContent = 'Loading...';
    codeStatus.textContent = '';
    try {
      const encoded = filename.split('/').map(encodeURIComponent).join('/');
      const response = await fetch(`${contentBase}${encoded}`, {
        headers: {'Accept': 'application/json'}
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not load this file.');
      currentCode = String(payload.content || '');
      codeContent.textContent = currentCode;
      codeStatus.textContent = `${currentCode.split('\n').length} lines - ${currentCode.length.toLocaleString()} characters`;
    } catch (error) {
      currentCode = '';
      codeContent.textContent = '';
      codeStatus.textContent = error instanceof Error ? error.message : 'Could not load this file.';
    }
  }

  function updateGitHubCommands() {
    if (!generatedSlug) return;
    const username = sanitizeGitHubPart(githubUsername.value, 'YOUR_GITHUB_USERNAME');
    const repository = sanitizeGitHubPart(githubRepository.value, generatedSlug);
    githubCommands.textContent = [
      'git init',
      'git add .',
      'git commit -m "Initial generated app"',
      'git branch -M main',
      `git remote add origin https://github.com/${username}/${repository}.git`,
      'git push -u origin main'
    ].join('\n');
  }

  function sanitizeGitHubPart(value, fallback) {
    const cleaned = String(value || '').trim().replace(/[^A-Za-z0-9._-]/gu, '');
    return cleaned || fallback;
  }

  function renderIdeas(ideas, selectedSlug) {
    const grid = document.querySelector('#idea-grid');
    grid.replaceChildren();
    ideas.forEach((idea) => {
      grid.append(createIdeaCard(idea, idea.slug === selectedSlug, 'Selected'));
    });
  }

  function createIdeaCard(idea, selected = false, label = '') {
    const card = document.createElement('article');
    card.className = 'idea-card';
    if (selected) card.classList.add('selected');
    if (label) {
      const badge = document.createElement('span');
      badge.className = 'selected-label';
      badge.textContent = label;
      card.append(badge);
    }
    const title = document.createElement('h3');
    title.textContent = idea.name || 'Tool idea';
    const purpose = document.createElement('p');
    purpose.textContent = idea.purpose || '';
    card.append(title, purpose);
    if (idea.gap_statement) {
      const gap = document.createElement('p');
      gap.className = 'gap-summary';
      gap.textContent = `Gap: ${idea.gap_statement}`;
      card.append(gap);
    }
    const metrics = document.createElement('div');
    metrics.className = 'idea-metrics';
    const values = (idea.research && idea.research.metrics) || {};
    metrics.append(
      metric('Opportunity', `${values.opportunity_proxy ?? 0}/100`),
      metric('Competing domains', String(values.unique_domains ?? 0))
    );
    card.append(metrics);
    return card;
  }

  function renderAlternativePreview(idea, stage) {
    const grid = document.querySelector('#idea-grid');
    let card = document.querySelector('#alternative-preview');
    if (!card) {
      card = createIdeaCard(idea, false, 'Validating');
      card.id = 'alternative-preview';
      card.classList.add('loading');
      grid.append(card);
    }
    const stageMessage = stage === 'gap_analysis'
      ? `Finding the gap for ${idea.name}...`
      : `Validating demand for ${idea.name}...`;
    alternativeStatus.textContent = stageMessage;
  }

  function removeAlternativePreview() {
    const preview = document.querySelector('#alternative-preview');
    if (preview) preview.remove();
  }

  function renderAlternative(result) {
    if (!result || !result.idea) return;
    const grid = document.querySelector('#idea-grid');
    const idea = {
      ...result.idea,
      research: result.research || {},
      gap_statement: result.selection && result.selection.gap_statement
    };
    grid.append(createIdeaCard(idea, false, 'Validated'));
  }

  function metric(label, value) {
    const wrapper = document.createElement('div');
    const labelNode = document.createElement('span');
    const valueNode = document.createElement('strong');
    labelNode.textContent = label;
    valueNode.textContent = value;
    wrapper.append(labelNode, valueNode);
    return wrapper;
  }

  function renderSources(sources) {
    const list = document.querySelector('#source-list');
    list.replaceChildren();
    if (!sources.length) {
      const empty = document.createElement('p');
      empty.className = 'source-item';
      empty.textContent = 'No live website results were available for this run.';
      list.append(empty);
      return;
    }
    sources.forEach((source) => {
      const safeUrl = externalUrl(source.url);
      const item = safeUrl ? document.createElement('a') : document.createElement('div');
      item.className = 'source-item';
      if (safeUrl) {
        item.href = safeUrl;
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
      }
      const domain = document.createElement('span');
      domain.className = 'source-domain';
      domain.textContent = source.domain || 'website';
      const title = document.createElement('span');
      title.className = 'source-title';
      title.textContent = source.title || 'Search result';
      const arrow = document.createElement('span');
      arrow.className = 'source-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '\u2197';
      item.append(domain, title, arrow);
      list.append(item);
    });
  }

  function externalUrl(value) {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch (_error) {
      return '';
    }
  }

  function setInternalLink(selector, value) {
    const link = document.querySelector(selector);
    if (link && typeof value === 'string' && /^\/api\/jobs\/[a-f0-9]+\/(?:download|report)$/u.test(value)) {
      link.href = value;
    }
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.textContent = String(value || '');
  }

  async function copyText(value, button, successLabel) {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = successLabel;
    } catch (_error) {
      button.textContent = 'Copy failed';
    }
    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  }

  function setRunning(value) {
    running = value;
    input.disabled = value;
    modelInput.disabled = value;
    submitButton.disabled = value || !modelReady;
    submitButton.firstChild.textContent = value ? 'Generating locally ' : 'Generate app ';
  }

  function setAlternativeRunning(value, message) {
    alternativeRunning = value;
    alternativeButton.disabled = value || !alternativesUrl;
    alternativeButton.textContent = value
      ? 'Generating another concept...'
      : 'Generate another concept';
    alternativeStatus.textContent = message;
  }

  function showError(message) {
    setRunning(false);
    errorMessage.textContent = message;
    errorCard.hidden = false;
    errorCard.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
})();
