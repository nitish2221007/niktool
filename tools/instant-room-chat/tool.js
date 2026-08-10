document.addEventListener('DOMContentLoaded', () => {
  const setupScreen = document.getElementById('setup-screen');
  const chatScreen = document.getElementById('chat-screen');
  const nicknameInput = document.getElementById('user-nickname');
  const roomInput = document.getElementById('room-code-input');
  const createRoomBtn = document.getElementById('create-room-btn');
  const joinRoomBtn = document.getElementById('join-room-btn');
  const leaveRoomBtn = document.getElementById('leave-room-btn');
  const copyRoomCodeBtn = document.getElementById('copy-room-code-btn');
  const currentRoomBadge = document.getElementById('current-room-badge');
  const userBadge = document.getElementById('user-badge');
  const messagesContainer = document.getElementById('messages-container');
  const chatInput = document.getElementById('chat-input');
  const sendMsgBtn = document.getElementById('send-msg-btn');
  const msgEl = document.getElementById('instant-room-chat-message');

  let currentRoom = null;
  let currentNickname = 'Anonymous';
  let broadcastChannel = null;
  let storagePollInterval = null;

  const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  function cleanExpiredMessages() {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('niktool_chat_')) {
        try {
          const roomData = JSON.parse(localStorage.getItem(key) || '[]');
          const validData = roomData.filter(m => m.expiresAt && m.expiresAt > now);
          if (validData.length === 0) {
            localStorage.removeItem(key);
          } else if (validData.length !== roomData.length) {
            localStorage.setItem(key, JSON.stringify(validData));
          }
        } catch (e) {}
      }
    }
  }

  // Run cleanup on initial load
  cleanExpiredMessages();

  function generateRoomCode() {
    return 'ROOM-' + Math.floor(1000 + Math.random() * 9000);
  }

  function getRoomMessages(roomId) {
    const raw = localStorage.getItem(`niktool_chat_${roomId}`);
    if (!raw) return [];
    try {
      const msgs = JSON.parse(raw);
      const now = Date.now();
      return msgs.filter(m => m.expiresAt && m.expiresAt > now);
    } catch (e) {
      return [];
    }
  }

  function saveRoomMessage(roomId, msgObj) {
    const msgs = getRoomMessages(roomId);
    msgs.push(msgObj);
    localStorage.setItem(`niktool_chat_${roomId}`, JSON.stringify(msgs));
  }

  function renderMessages() {
    if (!currentRoom) return;
    const msgs = getRoomMessages(currentRoom);
    messagesContainer.innerHTML = '<div style="text-align: center; color: #888; font-size: 0.82rem; margin: 0.5rem 0;">🔒 Room created! Share room code with your phone or friends to start chatting. Messages self-destruct 24 hours after room exit.</div>';

    msgs.forEach(m => {
      const isMe = m.sender === currentNickname;
      const bubble = document.createElement('div');
      bubble.style.display = 'flex';
      bubble.style.flexDirection = 'column';
      bubble.style.alignItems = isMe ? 'flex-end' : 'flex-start';
      bubble.style.margin = '0.2rem 0';

      const content = document.createElement('div');
      content.style.maxWidth = '80%';
      content.style.padding = '0.65rem 0.9rem';
      content.style.borderRadius = isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px';
      content.style.background = isMe ? 'var(--green)' : '#ffffff';
      content.style.color = isMe ? '#ffffff' : 'var(--ink)';
      content.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      content.style.border = isMe ? 'none' : '1px solid #e2e8e4';
      content.style.wordBreak = 'break-word';

      const meta = document.createElement('div');
      meta.style.fontSize = '0.72rem';
      meta.style.marginBottom = '0.25rem';
      meta.style.opacity = '0.85';
      meta.style.fontWeight = '700';
      meta.textContent = m.sender + ' • ' + new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const textNode = document.createElement('div');
      textNode.style.fontSize = '0.92rem';
      textNode.style.lineHeight = '1.4';
      textNode.textContent = m.text;

      content.appendChild(meta);
      content.appendChild(textNode);
      bubble.appendChild(content);
      messagesContainer.appendChild(bubble);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function startRoom(roomId, nickname) {
    currentRoom = roomId;
    currentNickname = nickname || 'Anonymous';

    setupScreen.style.display = 'none';
    chatScreen.style.display = 'flex';
    currentRoomBadge.textContent = `ROOM: ${currentRoom}`;
    userBadge.textContent = `You: ${currentNickname}`;
    msgEl.textContent = `Active in room ${currentRoom}. Messages will auto-delete in 24h.`;

    renderMessages();

    if (window.BroadcastChannel) {
      if (broadcastChannel) broadcastChannel.close();
      broadcastChannel = new window.BroadcastChannel(`niktool_channel_${currentRoom}`);
      broadcastChannel.onmessage = () => {
        renderMessages();
      };
    }

    if (storagePollInterval) clearInterval(storagePollInterval);
    storagePollInterval = setInterval(() => {
      renderMessages();
    }, 1200);
  }

  createRoomBtn?.addEventListener('click', () => {
    const nick = nicknameInput.value.trim() || 'User_' + Math.floor(Math.random() * 1000);
    const newRoom = generateRoomCode();
    startRoom(newRoom, nick);
  });

  joinRoomBtn?.addEventListener('click', () => {
    const nick = nicknameInput.value.trim() || 'User_' + Math.floor(Math.random() * 1000);
    const roomCode = roomInput.value.trim().toUpperCase();
    if (!roomCode) {
      msgEl.textContent = 'Please enter a valid Room Code to join.';
      return;
    }
    startRoom(roomCode, nick);
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || !currentRoom) return;

    const msgObj = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      sender: currentNickname,
      text: text,
      timestamp: Date.now(),
      expiresAt: Date.now() + TTL_MS
    };

    saveRoomMessage(currentRoom, msgObj);
    if (broadcastChannel) broadcastChannel.postMessage('new_msg');

    chatInput.value = '';
    renderMessages();
  }

  sendMsgBtn?.addEventListener('click', sendMessage);

  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  copyRoomCodeBtn?.addEventListener('click', () => {
    if (currentRoom && window.NikTool && window.NikTool.copy) {
      window.NikTool.copy(currentRoom, copyRoomCodeBtn);
    }
  });

  leaveRoomBtn?.addEventListener('click', () => {
    if (broadcastChannel) {
      broadcastChannel.close();
      broadcastChannel = null;
    }
    if (storagePollInterval) {
      clearInterval(storagePollInterval);
      storagePollInterval = null;
    }
    currentRoom = null;
    chatScreen.style.display = 'none';
    setupScreen.style.display = 'block';
    msgEl.textContent = 'Left room. Enter details to join or create another room.';
  });
});
