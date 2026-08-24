(() => {
  'use strict';
  const inEl = document.getElementById('sql-input'), outEl = document.getElementById('sql-output');
  const fmtBtn = document.getElementById('sql-format-btn'), minBtn = document.getElementById('sql-minify-btn');
  const copyBtn = document.getElementById('copy-sql-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');

  const SQL_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN',
    'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES',
    'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'UNION ALL', 'UNION',
    'AS', 'IN', 'IS NULL', 'IS NOT NULL', 'BETWEEN', 'LIKE', 'DISTINCT', 'COUNT', 'SUM', 'AVG'
  ];

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function formatSQL() {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter a SQL query to format.', true); return; }

    let sql = raw.replace(/\s+/g, ' ');
    // Uppercase standard keywords
    for (const kw of SQL_KEYWORDS) {
      const reg = new RegExp('\\b' + kw + '\\b', 'gi');
      sql = sql.replace(reg, kw);
    }

    // Add clean newlines before major clauses
    const clauses = ['SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'SET', 'VALUES'];
    for (const cl of clauses) {
      const reg = new RegExp('\\b' + cl + '\\b', 'g');
      sql = sql.replace(reg, '\n' + cl);
    }

    outEl.value = sql.trim();
    setMsg('SQL query formatted successfully.');
  }

  function minifySQL() {
    const raw = inEl.value.trim();
    if (!raw) return;
    outEl.value = raw.replace(/\s+/g, ' ');
    setMsg('SQL query minified to one line.');
  }

  fmtBtn.addEventListener('click', formatSQL);
  minBtn.addEventListener('click', minifySQL);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('SQL query copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();