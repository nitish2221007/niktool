document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const formatBtn = document.getElementById('format-btn');
    const minifyBtn = document.getElementById('minify-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const statusMessage = document.getElementById('status-message');

    const showStatus = (message, type = 'info') => {
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type}`;
    };

    const clearStatus = () => {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    };

    const processJson = (spacing) => {
        clearStatus();
        const rawJson = jsonInput.value.trim();
        
        if (!rawJson) {
            showStatus('Please enter some JSON data.', 'error');
            return;
        }

        showStatus('Processing...', 'loading');
        formatBtn.disabled = true;
        minifyBtn.disabled = true;

        // Small timeout to simulate processing and show loading state for UX
        setTimeout(() => {
            try {
                const parsed = JSON.parse(rawJson);
                const formatted = JSON.stringify(parsed, null, spacing);
                jsonOutput.textContent = formatted;
                showStatus('Valid JSON! Processed successfully.', 'success');
            } catch (error) {
                jsonOutput.textContent = '';
                showStatus(`Invalid JSON: ${error.message}`, 'error');
            } finally {
                formatBtn.disabled = false;
                minifyBtn.disabled = false;
            }
        }, 300);
    };

    formatBtn.addEventListener('click', () => processJson(4));
    minifyBtn.addEventListener('click', () => processJson(0));

    clearBtn.addEventListener('click', () => {
        jsonInput.value = '';
        jsonOutput.textContent = '';
        clearStatus();
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = jsonOutput.textContent;
        if (!textToCopy) {
            showStatus('Nothing to copy!', 'error');
            return;
        }
        
        if (window.NikTool && window.NikTool.copy) {
            window.NikTool.copy(textToCopy).then(() => {
                showStatus('Copied to clipboard!', 'success');
            }).catch(() => {
                fallbackCopy(textToCopy);
            });
        } else {
            fallbackCopy(textToCopy);
        }
    });

    const fallbackCopy = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showStatus('Copied to clipboard!', 'success');
        } catch (err) {
            showStatus('Failed to copy text.', 'error');
        }
        document.body.removeChild(textarea);
    };
});