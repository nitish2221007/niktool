const { createTool } = require('./generate-curated-tools.cjs');

// Pack 38: 25 Advanced Pure & Applied Mathematics, Discrete Mathematics, Cryptography, Numerical Analysis & Number Theory Calculators (Tools 1201 to 1225)
const pack38Tools = [
  // 1. Modular Multiplicative Inverse (Extended Euclidean Algorithm) Calculator
  {
    slug: 'modular-arithmetic-multiplicative-inverse-extended-euclidean-calculator',
    name: 'Modular Multiplicative Inverse (a·x ≡ 1 mod m Extended Euclidean) Calculator',
    description: 'Calculate modular multiplicative inverse x = a⁻¹ mod m such that (a · x) mod m = 1 using the Extended Euclidean Algorithm (Bézout\'s identity a·x + m·y = gcd(a,m)) for RSA and number theory.',
    category: 'Math',
    icon: 'text',
    keywords: ['modular inverse calculator', 'modular multiplicative inverse extended euclidean algorithm online', 'bezouts identity ax plus my equals gcd calculator', 'rsa modular inverse key generator calculator', 'number theory discrete mathematics modular inverse online'],
    order: 1082,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Integer a & Modulus m (Must be coprime: gcd(a, m) = 1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mi-a">Integer a</label>
          <input class="tool-textarea" id="mi-a" type="number" step="1" value="17" placeholder="17 (e.g. RSA e)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mi-m">Modulus m</label>
          <input class="tool-textarea" id="mi-m" type="number" step="1" value="3120" placeholder="3120 (e.g. φ(n))" />
        </div>
      </div>
      <div id="mi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mi-res-inv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Inverse a⁻¹ mod m = 2753</span>
            <span class="stat-label">Modular Multiplicative Inverse (17 · 2753 ≡ 1 mod 3120)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mi-res-bezout" style="color:var(--green-dark); font-weight:700;">gcd(17, 3120) = 1 | Bézout: 17·(2753) + 3120·(-15) = 1</span>
            <span class="stat-label">Bézout's Identity & Greatest Common Divisor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('mi-a'), mEl = document.getElementById('mi-m');
  const invResEl = document.getElementById('mi-res-inv'), bzResEl = document.getElementById('mi-res-bezout');

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return {
      gcd: res.gcd,
      x: res.y,
      y: res.x - Math.floor(a / b) * res.y
    };
  }

  function update() {
    let a = parseInt(aEl.value, 10), m = parseInt(mEl.value, 10);
    if (isNaN(a) || isNaN(m) || m <= 1) return;

    // Bring a into [0, m-1]
    let a_mod = ((a % m) + m) % m;
    if (a_mod === 0) {
      invResEl.textContent = 'NO MODULAR INVERSE (a is a multiple of m: gcd = ' + m + ')';
      bzResEl.textContent = 'Inverse exists if and only if gcd(a, m) = 1';
      return;
    }

    const { gcd, x, y } = extGCD(a_mod, m);

    if (gcd !== 1) {
      invResEl.textContent = 'NO MODULAR INVERSE (gcd(' + a + ', ' + m + ') = ' + gcd + ' ≠ 1)';
      bzResEl.textContent = 'a and m must be coprime (relatively prime) to possess a modular inverse';
      return;
    }

    let inv = ((x % m) + m) % m;

    invResEl.textContent = 'Inverse a⁻¹ mod m = ' + inv;
    bzResEl.textContent = 'gcd(' + a + ', ' + m + ') = 1 | Bézout: ' + a + '·(' + x + ') + ' + m + '·(' + y + ') = 1 (' + a + ' · ' + inv + ' mod ' + m + ' = 1)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter base integer a (e.g. public exponent e = 17 or 65537 in RSA).',
      'Enter modulus m (e.g. Euler totient $\phi(n)$ or prime p).',
      'Inspect unique modular multiplicative inverse $x \in [1, m-1]$ satisfying $a \cdot x \equiv 1 \pmod m$ and Bézout coefficient verification.'
    ],
    benefitTitle: 'Euclid of Alexandria & Étienne Bézout Number Theory Standard',
    benefitContent: 'Division is undefined in modular arithmetic ($\mathbb{Z}/m\mathbb{Z}$); multiplying by the modular inverse ($a^{-1} \pmod m$) replaces division, forming the mathematical backbone of RSA private key generation ($d \equiv e^{-1} \pmod{\phi(n)}$).',
    faqs: [{ q: 'When does a modular inverse fail to exist?', a: 'A modular inverse fails to exist if and only if $\gcd(a, m) > 1$ (the numbers share a common factor greater than 1).' }]
  },

  // 2. Chinese Remainder Theorem (CRT) System of Congruences Calculator
  {
    slug: 'chinese-remainder-theorem-system-of-congruences-calculator',
    name: 'Chinese Remainder Theorem (CRT System of 3 Congruences x ≡ a_i mod m_i) Calculator',
    description: 'Solve systems of simultaneous modular arithmetic congruences (x ≡ a₁ mod m₁, x ≡ a₂ mod m₂, x ≡ a₃ mod m₃) for pairwise coprime moduli using the classical Chinese Remainder Theorem (CRT) algorithm.',
    category: 'Math',
    icon: 'text',
    keywords: ['chinese remainder theorem calculator', 'crt system of congruences solver online', 'simultaneous modular equations calculator', 'pairwise coprime moduli crt calculator', 'discrete math number theory chinese remainder theorem online'],
    order: 1083,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Congruences: x ≡ a₁ (mod m₁), x ≡ a₂ (mod m₂), x ≡ a₃ (mod m₃) (Moduli must be pairwise coprime)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="crt-a1">Remainder a₁</label>
          <input class="tool-textarea" id="crt-a1" type="number" step="1" value="2" placeholder="2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="crt-m1">Modulus m₁</label>
          <input class="tool-textarea" id="crt-m1" type="number" step="1" value="3" placeholder="3 (Prime)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="crt-a2">Remainder a₂</label>
          <input class="tool-textarea" id="crt-a2" type="number" step="1" value="3" placeholder="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="crt-m2">Modulus m₂</label>
          <input class="tool-textarea" id="crt-m2" type="number" step="1" value="5" placeholder="5 (Prime)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="crt-a3">Remainder a₃</label>
          <input class="tool-textarea" id="crt-a3" type="number" step="1" value="2" placeholder="2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="crt-m3">Modulus m₃</label>
          <input class="tool-textarea" id="crt-m3" type="number" step="1" value="7" placeholder="7 (Prime)" />
        </div>
      </div>
      <div id="crt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="crt-res-x" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Unique Solution x ≡ 23 (mod 105)</span>
            <span class="stat-label">Unique Simultaneous Solution Modulo M = 3·5·7 = 105</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="crt-res-check" style="color:var(--green-dark); font-weight:700;">Check: 23 mod 3 = 2 ✓ | 23 mod 5 = 3 ✓ | 23 mod 7 = 2 ✓ (General Solution: x = 23 + 105·k)</span>
            <span class="stat-label">Verification across All 3 Modular Congruences</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const a1El = document.getElementById('crt-a1'), m1El = document.getElementById('crt-m1');
  const a2El = document.getElementById('crt-a2'), m2El = document.getElementById('crt-m2');
  const a3El = document.getElementById('crt-a3'), m3El = document.getElementById('crt-m3');
  const xResEl = document.getElementById('crt-res-x'), chkResEl = document.getElementById('crt-res-check');

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
  }

  function modInverse(a, m) {
    const { gcd: g, x } = extGCD(((a % m) + m) % m, m);
    return g === 1 ? ((x % m) + m) % m : null;
  }

  function update() {
    const a1 = parseInt(a1El.value, 10), m1 = parseInt(m1El.value, 10);
    const a2 = parseInt(a2El.value, 10), m2 = parseInt(m2El.value, 10);
    const a3 = parseInt(a3El.value, 10), m3 = parseInt(m3El.value, 10);

    if (isNaN(a1) || isNaN(m1) || isNaN(a2) || isNaN(m2) || isNaN(a3) || isNaN(m3) || m1 <= 1 || m2 <= 1 || m3 <= 1) return;

    // Check pairwise coprimality:
    if (gcd(m1, m2) !== 1 || gcd(m1, m3) !== 1 || gcd(m2, m3) !== 1) {
      xResEl.textContent = 'MODULI NOT COPRIME (gcd ≠ 1)';
      chkResEl.textContent = 'm₁, m₂, m₃ must be pairwise coprime for the standard Chinese Remainder Theorem';
      return;
    }

    const M = m1 * m2 * m3;
    const M1 = M / m1, M2 = M / m2, M3 = M / m3;

    const y1 = modInverse(M1, m1);
    const y2 = modInverse(M2, m2);
    const y3 = modInverse(M3, m3);

    if (y1 === null || y2 === null || y3 === null) return;

    let x = (a1 * M1 * y1 + a2 * M2 * y2 + a3 * M3 * y3) % M;
    x = ((x % M) + M) % M;

    const c1 = x % m1 === ((a1 % m1) + m1) % m1;
    const c2 = x % m2 === ((a2 % m2) + m2) % m2;
    const c3 = x % m3 === ((a3 % m3) + m3) % m3;

    xResEl.textContent = 'Unique Solution x ≡ ' + x + ' (mod ' + M + ')';
    chkResEl.textContent = 'Check: ' + x + ' mod ' + m1 + ' = ' + (x % m1) + (c1 ? ' ✓' : ' ✗') + ' | ' + x + ' mod ' + m2 + ' = ' + (x % m2) + (c2 ? ' ✓' : ' ✗') + ' | ' + x + ' mod ' + m3 + ' = ' + (x % m3) + (c3 ? ' ✓' : ' ✗') + ' (x = ' + x + ' + ' + M + 'k)';
  }

  [a1El, m1El, a2El, m2El, a3El, m3El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter remainders $a_1, a_2, a_3$ for the three congruences.',
      'Enter pairwise coprime moduli $m_1, m_2, m_3$ (e.g. 3, 5, 7).',
      'Inspect unique combined solution $x \pmod M$ where $M = m_1 \cdot m_2 \cdot m_3$ and verify congruence satisfaction across all equations.'
    ],
    benefitTitle: 'Sun Tzu 3rd Century AD Chinese Remainder Theorem',
    benefitContent: 'First recorded in Sunzi Suanjing to count soldiers in military formations, CRT enables ultra-fast large-number RSA arithmetic by splitting operations into smaller independent parallel moduli computations.',
    faqs: [{ q: 'Why is CRT used in RSA decryption?', a: 'RSA decryption with CRT (computing $m \pmod p$ and $m \pmod q$ separately) accelerates RSA private key operations by roughly $4\times$.' }]
  },

  // 3. RSA Public-Key Cryptography Key Pair & Encryption/Decryption Calculator
  {
    slug: 'rsa-cryptography-public-private-key-pair-encryption-calculator',
    name: 'RSA Public-Key Cryptography (Key Generation, Encryption c = m^e mod n & Decryption) Calculator',
    description: 'Calculate RSA public-private key pairs (n = p·q, φ(n) = (p-1)(q-1), private exponent d = e⁻¹ mod φ(n)), encrypt plaintext numbers (c = m^e mod n), and decrypt ciphertexts (m = c^d mod n) for cybersecurity education.',
    category: 'Math',
    icon: 'text',
    keywords: ['rsa key generator calculator', 'rsa encryption decryption formula c equals m to e mod n online', 'public private key pair phi n private exponent d calculator', 'modular exponentiation rsa cryptography calculator', 'cybersecurity public key encryption online'],
    order: 1084,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primes p & q (e.g. 61 & 53), Public Exponent e (e.g. 17) & Plaintext Message m (< n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rsa-p">Prime p</label>
          <input class="tool-textarea" id="rsa-p" type="number" step="2" value="61" placeholder="61" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-q">Prime q</label>
          <input class="tool-textarea" id="rsa-q" type="number" step="2" value="53" placeholder="53" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-e">Public e</label>
          <input class="tool-textarea" id="rsa-e" type="number" step="2" value="17" placeholder="17 (Coprime to φ)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-msg">Message m</label>
          <input class="tool-textarea" id="rsa-msg" type="number" step="1" value="65" placeholder="65 (ASCII 'A')" />
        </div>
      </div>
      <div id="rsa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rsa-res-cipher" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ciphertext c = 2790 | Decrypted m = 65</span>
            <span class="stat-label">Encryption (c = m^e mod n) & Decryption (m = c^d mod n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rsa-res-keys" style="color:var(--green-dark); font-weight:700;">Public Key: (e=17, n=3233) | Private Key: (d=2753, n=3233) | φ(n) = 3120</span>
            <span class="stat-label">RSA Public & Private Key Parameters</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('rsa-p'), qEl = document.getElementById('rsa-q');
  const eEl = document.getElementById('rsa-e'), msgEl = document.getElementById('rsa-msg');
  const cResEl = document.getElementById('rsa-res-cipher'), kResEl = document.getElementById('rsa-res-keys');

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
  }

  function modExp(base, exp, mod) {
    let res = 1n, b = BigInt(base) % BigInt(mod), e = BigInt(exp), m = BigInt(mod);
    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      b = (b * b) % m;
      e = e / 2n;
    }
    return Number(res);
  }

  function update() {
    const p = parseInt(pEl.value, 10), q = parseInt(qEl.value, 10);
    const e = parseInt(eEl.value, 10), m = parseInt(msgEl.value, 10);

    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(m) || p <= 1 || q <= 1 || p === q || e <= 1 || m < 0) return;

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    const { gcd, x } = extGCD(e, phi);
    if (gcd !== 1) {
      cResEl.textContent = 'INVALID EXPONENT e (gcd(e, φ(n)) = ' + gcd + ' ≠ 1)';
      kResEl.textContent = 'e must be coprime to φ(n) = ' + phi;
      return;
    }

    const d = ((x % phi) + phi) % phi;

    if (m >= n) {
      cResEl.textContent = 'MESSAGE m MUST BE LESS THAN n (' + m + ' ≥ ' + n + ')';
      kResEl.textContent = 'Split large messages into chunks smaller than n';
      return;
    }

    // Encrypt: c = m^e mod n
    const c = modExp(m, e, n);
    // Decrypt: m_dec = c^d mod n
    const m_dec = modExp(c, d, n);

    cResEl.textContent = 'Ciphertext c = ' + c + ' | Decrypted m = ' + m_dec + (m_dec === m ? ' ✓' : ' ✗');
    kResEl.textContent = 'Public Key: (e=' + e + ', n=' + n + ') | Private Key: (d=' + d + ', n=' + n + ') | Modulus n = ' + n + ', φ(n) = ' + phi;
  }

  [pEl, qEl, eEl, msgEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter two distinct prime numbers p and q (e.g. 61 and 53).',
      'Enter public encryption exponent e coprime to $\phi(n) = (p-1)(q-1)$ (commonly 17 or 65537).',
      'Enter numeric plaintext integer message m ($m < n$).',
      'Inspect generated RSA Public Key $(e, n)$, Private Key $(d, n)$, encrypted ciphertext c, and restored plaintext decryption.'
    ],
    benefitTitle: 'Rivest, Shamir & Adleman 1977 Public-Key Cryptosystem',
    benefitContent: 'RSA security relies on the hardness of prime integer factorization ($n = p \cdot q$); while computing $n$ is instantaneous, factoring a 2048-bit $n$ back into $p$ and $q$ would take classical supercomputers trillions of years.',
    faqs: [{ q: 'Why is e = 65537 (2^16 + 1) the standard public exponent in modern TLS/HTTPS?', a: '65537 in binary has only two "1" bits ($10000000000000001_2$), enabling fast modular exponentiation in just 17 multiplications.' }]
  },

  // 4. Euler's Totient Function φ(n) & Prime Factorization Calculator
  {
    slug: 'euler-totient-function-phi-n-prime-factors-calculator',
    name: 'Euler\'s Totient Function φ(n) & Prime Factorization (φ(n) = n·∏(1 - 1/p)) Calculator',
    description: 'Calculate Euler\'s phi totient function (φ(n) = n · ∏ (1 - 1/p)) counting positive integers up to n that are coprime to n, prime factorization prime factors, and divisor count for number theory.',
    category: 'Math',
    icon: 'text',
    keywords: ['eulers totient function calculator', 'phi n formula online prime factorization', 'coprime integers count euler phi calculator', 'multiplicative arithmetic functions phi n calculator', 'number theory euler totient online'],
    order: 1085,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Positive Integer n (e.g. 360, 1000, 3120)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="phi-n">Integer n</label>
        <input class="tool-textarea" id="phi-n" type="number" step="1" min="1" max="10000000" value="360" placeholder="360" />
      </div>
      <div id="phi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="phi-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">φ(360) = 96</span>
            <span class="stat-label">Euler's Totient Value (96 numbers ≤ 360 are coprime to 360)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="phi-res-fact" style="color:var(--green-dark); font-weight:700;">Prime Factors: 2³ × 3² × 5¹ | Formula: 360 · (1 - ½) · (1 - ⅓) · (1 - ⅕) = 96</span>
            <span class="stat-label">Unique Prime Factorization & Euler Product Formula</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('phi-n');
  const vResEl = document.getElementById('phi-res-val'), fResEl = document.getElementById('phi-res-fact');

  function primeFactorize(n) {
    const factors = {};
    let d = 2, temp = n;
    while (d * d <= temp) {
      if (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp = Math.floor(temp / d);
      } else {
        d = d === 2 ? 3 : d + 2;
      }
    }
    if (temp > 1) factors[temp] = (factors[temp] || 0) + 1;
    return factors;
  }

  function update() {
    let n = parseInt(nEl.value, 10);
    if (isNaN(n) || n < 1) return;

    if (n === 1) {
      vResEl.textContent = 'φ(1) = 1';
      fResEl.textContent = 'Prime Factors: 1 (by convention)';
      return;
    }

    const factors = primeFactorize(n);
    const uniquePrimes = Object.keys(factors).map(Number);

    // Euler product: phi(n) = n * prod( 1 - 1/p )
    let phi = n;
    uniquePrimes.forEach(p => {
      phi = Math.floor((phi * (p - 1)) / p);
    });

    const factorStr = uniquePrimes.map(p => p + (factors[p] > 1 ? '^' + factors[p] : '')).join(' × ');

    vResEl.textContent = 'φ(' + n + ') = ' + phi;
    fResEl.textContent = 'Prime Factors: ' + factorStr + ' | Formula: ' + n + ' · ∏(1 - 1/p) = ' + phi + (uniquePrimes.length === 1 && factors[uniquePrimes[0]] === 1 ? ' (PRIME NUMBER: φ(p) = p - 1)' : '');
  }

  nEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any positive integer n.',
      'Inspect Euler Totient value $\phi(n)$ representing the count of integers $k \in [1, n]$ where $\gcd(k, n) = 1$.',
      'Inspect prime decomposition and Euler product formula step-by-step breakdown.'
    ],
    benefitTitle: 'Leonhard Euler 1763 Totient Function & Euler\'s Theorem',
    benefitContent: 'Euler generalized Fermat\'s Little Theorem into Euler\'s Theorem ($a^{\phi(n)} \equiv 1 \pmod n$ for $\gcd(a, n)=1$), which proves why RSA decryption successfully reconstructs the original message ($m^{e d} \equiv m^{1 + k\phi(n)} \equiv m \pmod n$).',
    faqs: [{ q: 'What is φ(p) if p is a prime number?', a: 'For any prime number p, all $p-1$ positive integers below p are coprime to p, so $\phi(p) = p - 1$.' }]
  },

  // 5. Diffie-Hellman Key Exchange Shared Secret Calculator
  {
    slug: 'diffie-hellman-key-exchange-shared-secret-calculator',
    name: 'Diffie-Hellman Key Exchange (Shared Secret K = g^(a·b) mod p) Calculator',
    description: 'Simulate Diffie-Hellman key exchange: generate Alice and Bob public keys (A = g^a mod p, B = g^b mod p) and compute identical shared secret session keys (K = B^a mod p = A^b mod p) for cryptography.',
    category: 'Math',
    icon: 'text',
    keywords: ['diffie hellman calculator', 'diffie hellman shared secret formula g to ab mod p online', 'alice bob public private key exchange calculator', 'discrete logarithm diffie hellman key generator calculator', 'cybersecurity cryptographic key exchange online'],
    order: 1086,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Public Prime Modulus p, Generator Base g, Alice Private Secret a & Bob Private Secret b',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-p">Prime p</label>
          <input class="tool-textarea" id="dh-p" type="number" step="2" value="997" placeholder="997" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-g">Base g</label>
          <input class="tool-textarea" id="dh-g" type="number" step="1" value="7" placeholder="7 (Generator)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-a">Alice Private a</label>
          <input class="tool-textarea" id="dh-a" type="number" step="1" value="123" placeholder="123" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-b">Bob Private b</label>
          <input class="tool-textarea" id="dh-b" type="number" step="1" value="456" placeholder="456" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-secret" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Shared Secret Key K = 294</span>
            <span class="stat-label">Identical Established Symmetric AES Session Key</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-ex" style="color:var(--green-dark); font-weight:700;">Alice Public A = 7¹²³ mod 997 = 649 | Bob Public B = 7⁴⁵⁶ mod 997 = 359</span>
            <span class="stat-label">Public Exchanged Keys Transmitted Across Insecure Network</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('dh-p'), gEl = document.getElementById('dh-g');
  const aEl = document.getElementById('dh-a'), bEl = document.getElementById('dh-b');
  const sResEl = document.getElementById('dh-res-secret'), exResEl = document.getElementById('dh-res-ex');

  function modExp(base, exp, mod) {
    let res = 1n, b = BigInt(base) % BigInt(mod), e = BigInt(exp), m = BigInt(mod);
    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      b = (b * b) % m;
      e = e / 2n;
    }
    return Number(res);
  }

  function update() {
    const p = parseInt(pEl.value, 10), g = parseInt(gEl.value, 10);
    const a = parseInt(aEl.value, 10), b = parseInt(bEl.value, 10);

    if (isNaN(p) || isNaN(g) || isNaN(a) || isNaN(b) || p <= 2 || g <= 1 || a <= 0 || b <= 0) return;

    // Alice calculates public A = g^a mod p
    const A = modExp(g, a, p);

    // Bob calculates public B = g^b mod p
    const B = modExp(g, b, p);

    // Alice computes K_A = B^a mod p
    const K_A = modExp(B, a, p);

    // Bob computes K_B = A^b mod p
    const K_B = modExp(A, b, p);

    sResEl.textContent = 'Shared Secret Key K = ' + K_A + (K_A === K_B ? ' (MATCHES ✓)' : ' (ERROR)');
    exResEl.textContent = 'Alice Public A = ' + A + ' | Bob Public B = ' + B + ' (K = ' + g + '^(' + a + '·' + b + ') mod ' + p + ' = ' + K_A + ')';
  }

  [pEl, gEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter shared public prime modulus p and generator base g.',
      'Enter Alice\'s secret private integer a.',
      'Enter Bob\'s secret private integer b.',
      'Inspect public values $A = g^a \pmod p$ and $B = g^b \pmod p$ sent over the open internet, and verify that both parties independently arrive at the exact same shared secret key $K = g^{ab} \pmod p$.'
    ],
    benefitTitle: 'Whitfield Diffie & Martin Hellman 1976 Key Exchange Standard',
    benefitContent: 'Diffie-Hellman allows two parties who have never met to establish an identical secret encryption key over an untrusted, eavesdropped public network without ever transmitting the secret key itself.',
    faqs: [{ q: 'Why cannot an eavesdropper deduce the secret from public A and B?', a: 'Finding secret $a$ from public $A = g^a \pmod p$ requires solving the Discrete Logarithm Problem, which is computationally intractable for 2048-bit primes.' }]
  },

  // 6. Newton-Raphson Method Numerical Root Finding & Convergence Calculator
  {
    slug: 'newton-raphson-method-root-finding-convergence-calculator',
    name: 'Newton-Raphson Method (x_{n+1} = x_n - f(x_n) / f\'(x_n)) Root Finding Calculator',
    description: 'Calculate numerical equation roots with quadratic convergence using the Newton-Raphson iteration algorithm (x_{n+1} = x_n - f(x_n) / f\'(x_n)), viewing iteration steps and tolerance convergence for numerical analysis.',
    category: 'Math',
    icon: 'text',
    keywords: ['newton raphson calculator', 'root finding formula x n plus 1 equals x n minus f over f prime online', 'quadratic convergence newton method calculator', 'numerical analysis equation root solver newton raphson', 'applied mathematics nonlinear equation solver online'],
    order: 1087,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Function f(x), Initial Guess x₀ & Convergence Tolerance ε (e.g. 1e-6)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nr-fn">Function f(x)</label>
          <select class="tool-textarea" id="nr-fn">
            <option value="x3_x_2" selected>f(x) = x³ - x - 2 = 0 (Root ≈ 1.5214)</option>
            <option value="cos_x">f(x) = cos(x) - x = 0 (Dottie Root ≈ 0.7391)</option>
            <option value="x2_5">f(x) = x² - 5 = 0 (Square Root √5 ≈ 2.2361)</option>
            <option value="exp_x">f(x) = e^x - 3x = 0 (Root ≈ 0.6191)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="nr-x0">Initial Guess x₀</label>
          <input class="tool-textarea" id="nr-x0" type="number" step="0.5" value="1.0" placeholder="1.0" />
        </div>
      </div>
      <div id="nr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nr-res-root" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Root x* ≈ 1.52137971</span>
            <span class="stat-label">Converged Root (f(x*) = 0.000000)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nr-res-iter" style="color:var(--green-dark); font-weight:700;">Converged in 5 iterations (x₀: 1.000 -> x₁: 2.000 -> x₂: 1.625 -> x₃: 1.528 -> x₄: 1.521)</span>
            <span class="stat-label">Quadratic Rate of Convergence History</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fnEl = document.getElementById('nr-fn'), x0El = document.getElementById('nr-x0');
  const rtResEl = document.getElementById('nr-res-root'), itResEl = document.getElementById('nr-res-iter');

  function getFandFprime(type, x) {
    if (type === 'x3_x_2') {
      return { f: Math.pow(x, 3) - x - 2, df: 3 * Math.pow(x, 2) - 1 };
    } else if (type === 'cos_x') {
      return { f: Math.cos(x) - x, df: -Math.sin(x) - 1 };
    } else if (type === 'x2_5') {
      return { f: Math.pow(x, 2) - 5, df: 2 * x };
    } else {
      return { f: Math.exp(x) - 3 * x, df: Math.exp(x) - 3 };
    }
  }

  function update() {
    const fnType = fnEl.value;
    let x = parseFloat(x0El.value);
    if (isNaN(x)) return;

    let history = [x.toFixed(3)];
    let iter = 0;
    const maxIter = 50, tol = 1e-8;

    while (iter < maxIter) {
      const { f, df } = getFandFprime(fnType, x);
      if (Math.abs(df) < 1e-12) break; // stationary point

      const x_next = x - (f / df);
      history.push(x_next.toFixed(3));

      if (Math.abs(x_next - x) < tol) {
        x = x_next;
        break;
      }
      x = x_next;
      iter++;
    }

    const { f } = getFandFprime(fnType, x);

    rtResEl.textContent = 'Root x* ≈ ' + x.toFixed(8);
    itResEl.textContent = 'Converged in ' + history.length + ' steps | ' + history.slice(0, 5).join(' -> ') + (history.length > 5 ? ' ...' : '') + ' (f(x*) = ' + f.toExponential(2) + ')';
  }

  fnEl.addEventListener('change', update);
  x0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select non-linear benchmark equation $f(x) = 0$.',
      'Enter initial starting estimate guess $x_0$.',
      'Inspect converged root $x^*$ accurate to 8 decimal places and iteration sequence showing quadratic convergence.'
    ],
    benefitTitle: 'Isaac Newton & Joseph Raphson 1690 Numerical Root Method',
    benefitContent: 'Newton-Raphson uses tangent line linear approximations to iteratively zero in on roots; because error squares each iteration ($e_{n+1} \approx C e_n^2$), the number of correct decimal places doubles every step.',
    faqs: [{ q: 'When does the Newton-Raphson method fail to converge?', a: 'Newton-Raphson fails if $f\'(x_n) = 0$ (division by zero / horizontal tangent) or if the initial guess enters an oscillating cycle.' }]
  },

  // 7. Shannon Entropy Information Theory Uncertainty Calculator
  {
    slug: 'shannon-entropy-information-theory-bit-uncertainty-calculator',
    name: 'Shannon Entropy Information Theory (H(X) = -Σ p_i·log₂ p_i) Uncertainty Calculator',
    description: 'Calculate Shannon information entropy (H(X) = -∑ p_i · log₂ p_i) in bits/shannons, maximum possible entropy (log₂ N), coding efficiency, and redundancy for data compression and machine learning.',
    category: 'Math',
    icon: 'text',
    keywords: ['shannon entropy calculator', 'information entropy formula h of x equals minus sum pi log2 pi online', 'bits of information uncertainty calculator shannon', 'data compression entropy source coding theorem calculator', 'information theory machine learning entropy online'],
    order: 1088,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Probability Distribution p₁, p₂, p₃, p₄ (Must sum to 1.0)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-p1">Prob p₁</label>
          <input class="tool-textarea" id="sh-p1" type="number" step="0.05" min="0" max="1" value="0.50" placeholder="0.50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-p2">Prob p₂</label>
          <input class="tool-textarea" id="sh-p2" type="number" step="0.05" min="0" max="1" value="0.25" placeholder="0.25" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-p3">Prob p₃</label>
          <input class="tool-textarea" id="sh-p3" type="number" step="0.05" min="0" max="1" value="0.125" placeholder="0.125" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-p4">Prob p₄</label>
          <input class="tool-textarea" id="sh-p4" type="number" step="0.05" min="0" max="1" value="0.125" placeholder="0.125" />
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Entropy H(X) = 1.750 Bits / Symbol</span>
            <span class="stat-label">Shannon Information Content (H(X) = -Σ p_i·log₂ p_i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-eff" style="color:var(--green-dark); font-weight:700;">Max Entropy H_max = 2.000 Bits (log₂ 4) | Coding Efficiency = 87.5% (Redundancy = 12.5%)</span>
            <span class="stat-label">Theoretical Compression Bound & Channel Redundancy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('sh-p1'), p2El = document.getElementById('sh-p2');
  const p3El = document.getElementById('sh-p3'), p4El = document.getElementById('sh-p4');
  const hResEl = document.getElementById('sh-res-h'), efResEl = document.getElementById('sh-res-eff');

  function update() {
    const rawProbs = [
      parseFloat(p1El.value) || 0,
      parseFloat(p2El.value) || 0,
      parseFloat(p3El.value) || 0,
      parseFloat(p4El.value) || 0
    ];

    const sum = rawProbs.reduce((acc, v) => acc + v, 0);
    if (sum <= 0) return;

    // Normalize probabilities:
    const probs = rawProbs.map(p => p / sum);

    // Shannon Entropy: H = - sum( p * log2(p) )
    let H = 0;
    probs.forEach(p => {
      if (p > 0) {
        H -= p * Math.log2(p);
      }
    });

    const H_max = Math.log2(probs.length);
    const efficiency = (H / H_max) * 100.0;
    const redundancy = 100.0 - efficiency;

    hResEl.textContent = 'Entropy H(X) = ' + H.toFixed(3) + ' Bits / Symbol';
    efResEl.textContent = 'Max H_max = ' + H_max.toFixed(3) + ' Bits | Efficiency = ' + efficiency.toFixed(1) + '% | Redundancy = ' + redundancy.toFixed(1) + '% (Sum = ' + sum.toFixed(2) + ')';
  }

  [p1El, p2El, p3El, p4El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter discrete event probabilities $p_1, p_2, p_3, p_4$ (e.g. symbol frequencies in text).',
      'Inspect Shannon Entropy $H(X)$ in bits per symbol.',
      'Inspect maximum theoretical entropy $H_{\max} = \log_2 N$, source coding efficiency, and compression redundancy.'
    ],
    benefitTitle: 'Claude Shannon 1948 Mathematical Theory of Communication',
    benefitContent: 'Shannon entropy measures the fundamental lower bound on lossless data compression; according to Shannon\'s Source Coding Theorem, no compression algorithm (like ZIP, JPEG, or MP3) can compress a message stream to fewer than $H(X)$ bits per symbol without losing information.',
    faqs: [{ q: 'What probability distribution maximizes entropy?', a: 'The uniform distribution ($p_i = 1/N$) maximizes entropy ($H = \log_2 N$), representing maximum unpredictability and total lack of bias.' }]
  },

  // 8. Simpson's 1/3 Rule Numerical Definite Integration Calculator
  {
    slug: 'simpsons-one-third-rule-numerical-integration-calculator',
    name: 'Simpson\'s 1/3 Rule Numerical Integration (∫ f(x)dx ≈ (h/3)·[f₀ + 4·Σf_odd + 2·Σf_even + f_n]) Calculator',
    description: 'Calculate numerical definite integrals using Simpson\'s 1/3 parabolic quadrature rule (∫ f(x)dx ≈ (h/3)·[f(a) + 4·f_odd + 2·f_even + f(b)]) with error estimation (O(h⁴)) for numerical mathematics.',
    category: 'Math',
    icon: 'text',
    keywords: ['simpsons rule calculator', 'simpsons 1 3 rule numerical integration formula online', 'parabolic quadrature definite integral calculator', 'numerical calculus simpsons rule error calculator', 'applied mathematics numerical integration online'],
    order: 1089,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Integrand Function f(x), Lower Limit a, Upper Limit b & Even Number of Subintervals n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-fn">Function f(x)</label>
          <select class="tool-textarea" id="sp-fn">
            <option value="sin" selected>f(x) = sin(x) from 0 to π (Exact = 2.0)</option>
            <option value="x2">f(x) = x² from 0 to 3 (Exact = 9.0)</option>
            <option value="exp">f(x) = e^x from 0 to 1 (Exact = e - 1 ≈ 1.7183)</option>
            <option value="inv">f(x) = 1 / (1 + x²) from 0 to 1 (Exact = π/4 ≈ 0.7854)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-a">Lower a</label>
          <input class="tool-textarea" id="sp-a" type="number" step="0.5" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-b">Upper b</label>
          <input class="tool-textarea" id="sp-b" type="number" step="0.5" value="3.14159" placeholder="3.14159" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-n">Intervals n</label>
          <input class="tool-textarea" id="sp-n" type="number" step="2" min="2" value="6" placeholder="6 (Must be even)" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-int" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Integral I ≈ 2.000863</span>
            <span class="stat-label">Simpson's 1/3 Numerical Approximation</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-step" style="color:var(--green-dark); font-weight:700;">Step Size h = (b - a)/n = 0.5236 | Parabolic O(h⁴) Higher-Order Accuracy</span>
            <span class="stat-label">Step Size h & Truncation Error Order</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fnEl = document.getElementById('sp-fn'), aEl = document.getElementById('sp-a');
  const bEl = document.getElementById('sp-b'), nEl = document.getElementById('sp-n');
  const intResEl = document.getElementById('sp-res-int'), stpResEl = document.getElementById('sp-res-step');

  function evalF(type, x) {
    if (type === 'sin') return Math.sin(x);
    if (type === 'x2') return Math.pow(x, 2);
    if (type === 'exp') return Math.exp(x);
    return 1.0 / (1.0 + Math.pow(x, 2));
  }

  function update() {
    const fnType = fnEl.value;
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    let n = parseInt(nEl.value, 10);

    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 2 || a >= b) return;
    if (n % 2 !== 0) n += 1; // force even

    const h = (b - a) / n;
    let sum = evalF(fnType, a) + evalF(fnType, b);

    for (let i = 1; i < n; i++) {
      const x_i = a + i * h;
      const weight = (i % 2 === 1) ? 4.0 : 2.0;
      sum += weight * evalF(fnType, x_i);
    }

    const integral = (h / 3.0) * sum;

    intResEl.textContent = 'Integral I ≈ ' + integral.toFixed(6);
    stpResEl.textContent = 'Step Size h = ' + h.toFixed(4) + ' | n = ' + n + ' intervals (h/3 · [f₀ + 4·Σf_odd + 2·Σf_even + f_n])';
  }

  [fnEl, aEl, bEl, nEl].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select mathematical function $f(x)$ to integrate.',
      'Enter lower integration bound a and upper bound b.',
      'Enter even number of partition subintervals n (e.g. $n = 6$ or $10$).',
      'Inspect computed numerical definite integral value accurate to 6 decimal places.'
    ],
    benefitTitle: 'Thomas Simpson 1743 Parabolic Quadrature Rule',
    benefitContent: 'By fitting piecewise quadratic parabolas through groups of 3 consecutive points, Simpson\'s 1/3 Rule achieves fourth-order error scaling ($O(h^4)$), integrating cubic polynomials with zero error.',
    faqs: [{ q: 'Why must n be an even number in Simpson\'s 1/3 Rule?', a: 'Because fitting quadratic parabolas requires pairs of intervals (3 points each), the total number of subintervals must be an even multiple of 2.' }]
  },

  // 9. Runge-Kutta 4th Order (RK4) Differential Equation Solver Calculator
  {
    slug: 'runge-kutta-fourth-order-rk4-ode-solver-calculator',
    name: 'Runge-Kutta 4th Order (RK4 y_{n+1} = y_n + (h/6)·(k₁ + 2k₂ + 2k₃ + k₄)) ODE Solver Calculator',
    description: 'Solve first-order ordinary differential equations (dy/dx = f(x, y)) using the classical Runge-Kutta 4th Order algorithm (RK4) with fourth-order step accuracy (O(h⁴)) for physics and computational mathematics.',
    category: 'Math',
    icon: 'text',
    keywords: ['runge kutta 4th order calculator', 'rk4 ode solver formula online', 'differential equation numerical rk4 calculator', 'initial value problem runge kutta calculator', 'computational mathematics ode solver online'],
    order: 1090,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Differential Equation dy/dx = f(x, y), Initial Condition y(x₀) = y₀, Step Size h & Target x_end',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-ode">ODE dy/dx</label>
          <select class="tool-textarea" id="rk-ode">
            <option value="decay" selected>dy/dx = -2y (Exponential Decay: y = e^(-2x))</option>
            <option value="growth">dy/dx = y (Exponential Growth: y = e^x)</option>
            <option value="linear">dy/dx = x + y (Linear Non-Homogeneous)</option>
            <option value="logistic">dy/dx = y·(1 - y) (Logistic Growth)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-x0">Initial x₀</label>
          <input class="tool-textarea" id="rk-x0" type="number" step="0.1" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-y0">Initial y₀</label>
          <input class="tool-textarea" id="rk-y0" type="number" step="0.1" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-h">Step h</label>
          <input class="tool-textarea" id="rk-h" type="number" step="0.05" value="0.1" placeholder="0.1" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-yend" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">y(1.0) ≈ 0.135335 (Exact e⁻² = 0.135335)</span>
            <span class="stat-label">RK4 Numerical Solution at Target x = 1.0</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-slopes" style="color:var(--green-dark); font-weight:700;">Slopes: k₁ = -2.000, k₂ = -1.800, k₃ = -1.820, k₄ = -1.636 (10 RK4 Steps)</span>
            <span class="stat-label">Weighted RK4 Slopes & Fourth-Order Accuracy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const odeEl = document.getElementById('rk-ode'), x0El = document.getElementById('rk-x0');
  const y0El = document.getElementById('rk-y0'), hEl = document.getElementById('rk-h');
  const yendResEl = document.getElementById('rk-res-yend'), slResEl = document.getElementById('rk-res-slopes');

  function f(type, x, y) {
    if (type === 'decay') return -2.0 * y;
    if (type === 'growth') return y;
    if (type === 'linear') return x + y;
    return y * (1.0 - y);
  }

  function update() {
    const odeType = odeEl.value;
    let x = parseFloat(x0El.value), y = parseFloat(y0El.value);
    const h = parseFloat(hEl.value);
    const targetX = 1.0;

    if (isNaN(x) || isNaN(y) || isNaN(h) || h <= 0 || x >= targetX) return;

    let k1 = 0, k2 = 0, k3 = 0, k4 = 0;
    let steps = 0;

    while (x < targetX - 1e-6 && steps < 1000) {
      const step_h = Math.min(h, targetX - x);
      k1 = f(odeType, x, y);
      k2 = f(odeType, x + 0.5 * step_h, y + 0.5 * step_h * k1);
      k3 = f(odeType, x + 0.5 * step_h, y + 0.5 * step_h * k2);
      k4 = f(odeType, x + step_h, y + step_h * k3);

      y = y + (step_h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
      x += step_h;
      steps++;
    }

    yendResEl.textContent = 'y(' + targetX.toFixed(1) + ') ≈ ' + y.toFixed(6);
    slResEl.textContent = 'Last Slopes: k₁=' + k1.toFixed(3) + ', k₂=' + k2.toFixed(3) + ', k₃=' + k3.toFixed(3) + ', k₄=' + k4.toFixed(3) + ' (' + steps + ' RK4 Steps)';
  }

  [odeEl, x0El, y0El, hEl].forEach(el => el.addEventListener('input', update));
  odeEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select initial value ordinary differential equation $\frac{dy}{dx} = f(x, y)$.',
      'Enter initial boundary condition values $x_0$ and $y_0 = y(x_0)$.',
      'Enter integration step size h (e.g. 0.1).',
      'Inspect fourth-order accurate numerical solution $y(1.0)$ and weighted intermediate slope values ($k_1, k_2, k_3, k_4$).'
    ],
    benefitTitle: 'Carl Runge & Martin Kutta 1901 ODE Standard',
    benefitContent: 'RK4 evaluates four distinct trial slopes across each step interval to cancel out lower-order Taylor series error terms, delivering high numerical precision ($O(h^4)$) without requiring analytical derivative calculations.',
    faqs: [{ q: 'Why is RK4 superior to Euler\'s method?', a: 'Euler\'s method has first-order error ($O(h)$), requiring millions of steps for decent accuracy, whereas RK4 ($O(h^4)$) achieves greater precision in just a few dozen steps.' }]
  },

  // 10. LU Matrix Decomposition (Doolittle Algorithm A = L·U) Calculator
  {
    slug: 'lu-matrix-decomposition-doolittle-crout-solver-calculator',
    name: 'LU Matrix Decomposition (A = L·U Doolittle Factorization) Calculator',
    description: 'Calculate 3×3 matrix LU decomposition (A = L · U) into unit lower triangular matrix L and upper triangular matrix U using Doolittle\'s algorithm for linear algebra and systems of equations.',
    category: 'Math',
    icon: 'text',
    keywords: ['lu decomposition calculator', 'doolittle algorithm a equals l u matrix factorization online', 'lower upper triangular matrix decomposition calculator', 'linear algebra lu solver 3x3 matrix calculator', 'numerical linear algebra lu decomposition online'],
    order: 1091,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '3×3 Coefficient Matrix A Elements (Row 1, Row 2, Row 3)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem;">
        <input class="tool-textarea" id="lu-a11" type="number" step="1" value="2" placeholder="a11" />
        <input class="tool-textarea" id="lu-a12" type="number" step="1" value="3" placeholder="a12" />
        <input class="tool-textarea" id="lu-a13" type="number" step="1" value="1" placeholder="a13" />
        <input class="tool-textarea" id="lu-a21" type="number" step="1" value="4" placeholder="a21" />
        <input class="tool-textarea" id="lu-a22" type="number" step="1" value="7" placeholder="a22" />
        <input class="tool-textarea" id="lu-a23" type="number" step="1" value="5" placeholder="a23" />
        <input class="tool-textarea" id="lu-a31" type="number" step="1" value="6" placeholder="a31" />
        <input class="tool-textarea" id="lu-a32" type="number" step="1" value="11" placeholder="a32" />
        <input class="tool-textarea" id="lu-a33" type="number" step="1" value="8" placeholder="a33" />
      </div>
      <div id="lu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lu-res-det" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">det(A) = -6.00 (Invertible)</span>
            <span class="stat-label">Determinant of Matrix A (Product of U Diagonal)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lu-res-u" style="color:var(--green-dark); font-weight:700;">U: [2, 3, 1; 0, 1, 3; 0, 0, -3] | L: [1, 0, 0; 2, 1, 0; 3, 2, 1]</span>
            <span class="stat-label">Factorized Lower (L) and Upper (U) Triangular Matrices</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ids = ['lu-a11','lu-a12','lu-a13','lu-a21','lu-a22','lu-a23','lu-a31','lu-a32','lu-a33'];
  const els = ids.map(id => document.getElementById(id));
  const dtResEl = document.getElementById('lu-res-det'), uResEl = document.getElementById('lu-res-u');

  function update() {
    const vals = els.map(el => parseFloat(el.value));
    if (vals.some(isNaN)) return;

    let A = [
      [vals[0], vals[1], vals[2]],
      [vals[3], vals[4], vals[5]],
      [vals[6], vals[7], vals[8]]
    ];

    let L = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    let U = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const n = 3;
    for (let i = 0; i < n; i++) {
      // Upper Triangular U
      for (let k = i; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) sum += L[i][j] * U[j][k];
        U[i][k] = A[i][k] - sum;
      }
      // Lower Triangular L
      for (let k = i + 1; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) sum += L[k][j] * U[j][i];
        if (Math.abs(U[i][i]) < 1e-12) {
          dtResEl.textContent = 'SINGULAR / PIVOT ERROR (Zero on diagonal)';
          uResEl.textContent = 'Row pivoting required';
          return;
        }
        L[k][i] = (A[k][i] - sum) / U[i][i];
      }
    }

    const det = U[0][0] * U[1][1] * U[2][2];

    dtResEl.textContent = 'det(A) = ' + det.toFixed(2) + (Math.abs(det) > 1e-6 ? ' (Invertible)' : ' (Singular)');
    uResEl.textContent = 'U: [' + U[0].map(v=>v.toFixed(1)).join(', ') + ' ; ' + U[1].map(v=>v.toFixed(1)).join(', ') + ' ; ' + U[2].map(v=>v.toFixed(1)).join(', ') + '] | L: [' + L[0].map(v=>v.toFixed(1)).join(', ') + ' ; ' + L[1].map(v=>v.toFixed(1)).join(', ') + ' ; ' + L[2].map(v=>v.toFixed(1)).join(', ') + ']';
  }

  els.forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter nine scalar numerical entries for the $3 \times 3$ matrix A.',
      'Inspect computed Unit Lower Triangular matrix L and Upper Triangular matrix U.',
      'Inspect determinant $\det(A) = u_{11} \cdot u_{22} \cdot u_{33}$ obtained by multiplying diagonal entries of U.'
    ],
    benefitTitle: 'Myrick H. Doolittle 1878 Matrix Factorization Method',
    benefitContent: 'Factoring $A = LU$ decomposes Gaussian elimination into two fast triangular substitution sweeps ($Ly = b$ and $Ux = y$), enabling high-speed solving of multiple load cases in finite element structural engineering software.',
    faqs: [{ q: 'Why is LU decomposition faster than finding matrix inverse A^(-1)?', a: 'LU decomposition requires $\sim \frac{2}{3}n^3$ operations, whereas finding matrix inverse requires $\sim 2n^3$ operations and has inferior numerical stability.' }]
  },

  // 11. Markov Chain Steady-State Stationary Probability Vector Calculator
  {
    slug: 'markov-chain-steady-state-transition-probability-calculator',
    name: 'Markov Chain 2-State Steady-State Stationary Distribution (π·P = π) Calculator',
    description: 'Calculate discrete-time 2-state Markov chain transition probabilities, long-term steady-state stationary distribution vector (π₁ = β/(α+β), π₂ = α/(α+β)), and mean recurrence return times.',
    category: 'Math',
    icon: 'text',
    keywords: ['markov chain calculator', 'steady state stationary distribution formula pi p equals pi online', '2 state transition matrix long run probability calculator', 'markov chain recurrence time ergodicity calculator', 'probability stochastic processes markov chain online'],
    order: 1092,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Transition Probabilities: State 1 -> State 2 (α) & State 2 -> State 1 (β)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-alpha">P(1 -> 2) α</label>
          <input class="tool-textarea" id="mc-alpha" type="number" step="0.05" min="0.01" max="0.99" value="0.20" placeholder="0.20 (Sunny -> Rainy)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-beta">P(2 -> 1) β</label>
          <input class="tool-textarea" id="mc-beta" type="number" step="0.05" min="0.01" max="0.99" value="0.40" placeholder="0.40 (Rainy -> Sunny)" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-pi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">π = [66.7% State 1, 33.3% State 2]</span>
            <span class="stat-label">Long-Run Stationary Probability Vector (π₁ = β/(α+β))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-rec" style="color:var(--green-dark); font-weight:700;">Recurrence Time: State 1 = 1.50 Steps | State 2 = 3.00 Steps (Ergodic Equilibrium)</span>
            <span class="stat-label">Mean Recurrence Return Times (μ_i = 1 / π_i)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('mc-alpha'), bEl = document.getElementById('mc-beta');
  const piResEl = document.getElementById('mc-res-pi'), rcResEl = document.getElementById('mc-res-rec');

  function update() {
    const alpha = parseFloat(aEl.value), beta = parseFloat(bEl.value);
    if (isNaN(alpha) || isNaN(beta) || alpha <= 0 || beta <= 0 || alpha >= 1 || beta >= 1) return;

    // Steady state stationary distribution:
    // pi1 = beta / (alpha + beta)
    // pi2 = alpha / (alpha + beta)
    const pi1 = beta / (alpha + beta);
    const pi2 = alpha / (alpha + beta);

    const rec1 = 1.0 / pi1;
    const rec2 = 1.0 / pi2;

    piResEl.textContent = 'π = [' + (pi1 * 100).toFixed(1) + '% State 1, ' + (pi2 * 100).toFixed(1) + '% State 2]';
    rcResEl.textContent = 'Return Times: State 1 = ' + rec1.toFixed(2) + ' Steps | State 2 = ' + rec2.toFixed(2) + ' Steps (α = ' + alpha + ', β = ' + beta + ')';
  }

  aEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter transition switching probability $\alpha = P(S_1 \rightarrow S_2)$.',
      'Enter return switching probability $\beta = P(S_2 \rightarrow S_1)$.',
      'Inspect long-run asymptotic stationary distribution vector $\vec{\pi} = [\pi_1, \pi_2]$ and mean recurrence return times.'
    ],
    benefitTitle: 'Andrey Markov 1906 Stochastic Process Theory',
    benefitContent: 'For ergodic Markov chains, the long-run probability distribution is completely independent of initial starting conditions ($\vec{\pi} P = \vec{\pi}$), driving Google\'s PageRank web search algorithm and speech recognition hidden Markov models (HMMs).',
    faqs: [{ q: 'What is the physical meaning of stationary distribution π?', a: '$\pi_i$ represents the exact percentage of total time a system spends in state i over an infinitely long operating horizon.' }]
  },

  // 12. Fast Fourier Transform (FFT) Twiddle Factors & Butterfly Calculator
  {
    slug: 'fast-fourier-transform-fft-twiddle-factors-butterfly-calculator',
    name: 'Fast Fourier Transform (FFT Radix-2 Cooley-Tukey Twiddle Factors W_N^k) Calculator',
    description: 'Calculate Radix-2 Cooley-Tukey Fast Fourier Transform (FFT) complex exponential twiddle factors (W_N^k = e^(-j·2π·k / N) = cos(2πk/N) - j·sin(2πk/N)) and butterfly operation arithmetic count.',
    category: 'Math',
    icon: 'text',
    keywords: ['fft twiddle factor calculator', 'radix 2 cooley tukey fft butterfly formula online', 'complex exponential wn k real imaginary calculator', 'fast fourier transform computational complexity o n log n calculator', 'digital signal processing dsp fft online'],
    order: 1093,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'FFT Transform Size N (e.g. 8, 16, 64, 1024) & Twiddle Index k (0 to N/2 - 1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fft-n">FFT Size N</label>
          <select class="tool-textarea" id="fft-n">
            <option value="8" selected>N = 8 (3 Butterfly Stages)</option>
            <option value="16">N = 16 (4 Stages)</option>
            <option value="64">N = 64 (6 Stages)</option>
            <option value="1024">N = 1024 (10 Stages Audio FFT)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="fft-k">Index k</label>
          <input class="tool-textarea" id="fft-k" type="number" step="1" min="0" value="1" placeholder="1" />
        </div>
      </div>
      <div id="fft-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fft-res-w" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">W₈¹ = 0.707 - 0.707 j (∠ -45.0°)</span>
            <span class="stat-label">Complex Twiddle Factor (W_N^k = e^(-j 2πk / N))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fft-res-comp" style="color:var(--green-dark); font-weight:700;">Operations: 12 Butterflies (FFT saves 81.3% multiplications vs 64 DFT ops)</span>
            <span class="stat-label">Cooley-Tukey O(N·log₂ N) Complexity Speedup</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('fft-n'), kEl = document.getElementById('fft-k');
  const wResEl = document.getElementById('fft-res-w'), cpResEl = document.getElementById('fft-res-comp');

  function update() {
    const N = parseInt(nEl.value, 10);
    let k = parseInt(kEl.value, 10);

    if (isNaN(N) || isNaN(k) || N <= 0 || k < 0) return;
    k = k % N;

    // Twiddle factor: W_N^k = exp( -j * 2 * pi * k / N ) = cos( 2*pi*k/N ) - j * sin( 2*pi*k/N )
    const angle_rad = (2.0 * Math.PI * k) / N;
    const real = Math.cos(angle_rad);
    const imag = -Math.sin(angle_rad);
    const angle_deg = -(angle_rad * 180.0) / Math.PI;

    // Computational comparison:
    // DFT = N^2 complex multiplications
    // FFT = (N / 2) * log2(N) complex multiplications
    const dft_ops = Math.pow(N, 2);
    const stages = Math.round(Math.log2(N));
    const fft_ops = (N / 2) * stages;
    const savings = ((dft_ops - fft_ops) / dft_ops) * 100.0;

    wResEl.textContent = 'W_' + N + '^' + k + ' = ' + real.toFixed(3) + (imag >= 0 ? ' + ' : ' - ') + Math.abs(imag).toFixed(3) + ' j (∠ ' + angle_deg.toFixed(1) + '°)';
    cpResEl.textContent = 'FFT: ' + fft_ops + ' Butterflies in ' + stages + ' stages (' + savings.toFixed(1) + '% faster than ' + dft_ops + ' direct DFT mults)';
  }

  nEl.addEventListener('change', update);
  kEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select power-of-two Fast Fourier Transform block size N ($N = 2^M$).',
      'Enter butterfly sub-stage twiddle index integer k ($0 \le k < N$).',
      'Inspect complex exponential twiddle factor ($W_N^k = e^{-j 2\pi k / N}$) in Cartesian $a + bj$ and polar form, along with computational operation count savings.'
    ],
    benefitTitle: 'James Cooley & John Tukey 1965 FFT Algorithm',
    benefitContent: 'By exploiting symmetry and periodicity of twiddle factors ($W_N^{k + N/2} = -W_N^k$), Cooley and Tukey slashed DFT complexity from $O(N^2)$ to $O(N \log_2 N)$, enabling real-time digital audio processing, Wi-Fi 6 OFDM modulation, and MRI medical imaging.',
    faqs: [{ q: 'How much faster is a 1024-point FFT compared to direct DFT?', a: 'A 1024-point FFT requires 5,120 complex multiplications versus 1,048,576 for direct DFT—a massive $>200\times$ speedup.' }]
  },

  // 13. Sieve of Eratosthenes Prime Counting Function π(n) Calculator
  {
    slug: 'sieve-of-eratosthenes-prime-counting-pi-n-calculator',
    name: 'Sieve of Eratosthenes Prime Counting Function π(n) & Density (π(n) ~ n / ln n) Calculator',
    description: 'Calculate prime counting function π(n) up to integer n using the Sieve of Eratosthenes, compare against Gauss\'s Prime Number Theorem asymptotic estimate (n / ln n) and logarithmic integral Li(n).',
    category: 'Math',
    icon: 'text',
    keywords: ['sieve of eratosthenes calculator', 'prime counting function pi n formula online', 'prime number theorem n over ln n calculator', 'prime density logarithmic integral li n calculator', 'pure mathematics number theory primes online'],
    order: 1094,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Integer Upper Limit n (e.g. 100, 1000, 10000, 100000)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sv-n">Upper Limit n</label>
        <input class="tool-textarea" id="sv-n" type="number" step="500" min="2" max="200000" value="1000" placeholder="1000" />
      </div>
      <div id="sv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sv-res-pi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">π(1000) = 168 Primes (16.8% Density)</span>
            <span class="stat-label">Exact Count of Primes ≤ n (Sieve of Eratosthenes)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sv-res-pnt" style="color:var(--green-dark); font-weight:700;">PNT Estimate: n / ln(n) = 144.8 | Largest Prime ≤ 1000 is 997</span>
            <span class="stat-label">Prime Number Theorem (PNT) Asymptotic Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('sv-n');
  const piResEl = document.getElementById('sv-res-pi'), pntResEl = document.getElementById('sv-res-pnt');

  function sieve(n) {
    const isPrime = new Uint8Array(n + 1);
    isPrime.fill(1);
    isPrime[0] = 0;
    isPrime[1] = 0;
    for (let p = 2; p * p <= n; p++) {
      if (isPrime[p]) {
        for (let i = p * p; i <= n; i += p) isPrime[i] = 0;
      }
    }
    let count = 0, lastPrime = 2;
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) {
        count++;
        lastPrime = i;
      }
    }
    return { count, lastPrime };
  }

  function update() {
    const n = parseInt(nEl.value, 10);
    if (isNaN(n) || n < 2 || n > 200000) return;

    const { count, lastPrime } = sieve(n);
    const density = (count / n) * 100.0;

    // Prime number theorem estimate: n / ln(n)
    const pnt = n / Math.log(n);

    piResEl.textContent = 'π(' + n + ') = ' + count + ' Primes (' + density.toFixed(1) + '% Density)';
    pntResEl.textContent = 'PNT n / ln(n) = ' + pnt.toFixed(1) + ' | Largest Prime ≤ ' + n + ' is ' + lastPrime;
  }

  nEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter upper integer limit n (up to 200,000).',
      'Inspect exact count of prime numbers $\pi(n)$ generated via the Sieve of Eratosthenes.',
      'Compare exact prime count against the Prime Number Theorem estimate $\frac{n}{\ln n}$.'
    ],
    benefitTitle: 'Eratosthenes of Cyrene 3rd Century BC Prime Sieve',
    benefitContent: 'By iteratively crossing off multiples of each prime starting at $p^2$, the Sieve discovers all primes up to n in near-linear time ($O(n \log \log n)$), verifying Gauss and Hadamard\'s Prime Number Theorem ($\lim_{n\to\infty} \frac{\pi(n)}{n/\ln n} = 1$).',
    faqs: [{ q: 'Why is prime density decreasing as numbers grow larger?', a: 'Because larger numbers have more potential smaller prime divisors, the average gap between adjacent primes increases proportionally to $\ln n$.' }]
  },

  // 14. Hamming (7,4) Error-Correcting Code Syndrome & Parity Calculator
  {
    slug: 'hamming-7-4-error-correcting-code-syndrome-parity-calculator',
    name: 'Hamming (7,4) Error-Correcting Code (Generator G & Parity Syndrome H) Calculator',
    description: 'Encode 4-bit data words into 7-bit error-correcting codewords using Hamming (7,4) Generator Matrix G, calculate 3-bit syndrome vector S = H·rᵀ, and locate/correct single-bit transmission bit-flip errors.',
    category: 'Math',
    icon: 'text',
    keywords: ['hamming 7 4 calculator', 'hamming code generator matrix g parity check h online', 'single bit error correcting syndrome calculator', 'codeword bit flip error detection correction calculator', 'information theory error correcting codes online'],
    order: 1095,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '4-Bit Data Nibble [d₁, d₂, d₃, d₄] & Injected Error Bit Position (0 = None, 1 to 7)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hm-data">4-Bit Data (d₁d₂d₃d₄)</label>
          <input class="tool-textarea" id="hm-data" type="text" maxlength="4" value="1011" placeholder="1011" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hm-err">Injected Error Bit</label>
          <select class="tool-textarea" id="hm-err">
            <option value="0" selected>0 (No Transmission Error)</option>
            <option value="1">Bit 1 (Flip Parity p₁)</option>
            <option value="2">Bit 2 (Flip Parity p₂)</option>
            <option value="3">Bit 3 (Flip Data d₁)</option>
            <option value="4">Bit 4 (Flip Parity p₃)</option>
            <option value="5">Bit 5 (Flip Data d₂)</option>
            <option value="6">Bit 6 (Flip Data d₃)</option>
            <option value="7">Bit 7 (Flip Data d₄)</option>
          </select>
        </div>
      </div>
      <div id="hm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hm-res-code" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Encoded 7-Bit: 0 1 1 0 0 1 1</span>
            <span class="stat-label">Transmitted Codeword [p₁, p₂, d₁, p₃, d₂, d₃, d₄]</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hm-res-syn" style="color:var(--green-dark); font-weight:700;">Syndrome S = [0, 0, 0] (NO ERROR DETECTED) | Original Data: [1, 0, 1, 1]</span>
            <span class="stat-label">Parity Syndrome Vector (S = H·rᵀ) & Error Correction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dtEl = document.getElementById('hm-data'), errEl = document.getElementById('hm-err');
  const cdResEl = document.getElementById('hm-res-code'), synResEl = document.getElementById('hm-res-syn');

  function update() {
    const raw = dtEl.value.trim();
    if (!/^[01]{4}$/.test(raw)) return;

    const d1 = parseInt(raw[0], 10);
    const d2 = parseInt(raw[1], 10);
    const d3 = parseInt(raw[2], 10);
    const d4 = parseInt(raw[3], 10);
    const errPos = parseInt(errEl.value, 10);

    // Hamming (7,4) standard parity equations (1-indexed positions 1, 2, 4):
    // p1 (pos 1): covers pos 1, 3, 5, 7 => p1 + d1 + d2 + d4 = 0 mod 2 => p1 = (d1 + d2 + d4) % 2
    // p2 (pos 2): covers pos 2, 3, 6, 7 => p2 + d1 + d3 + d4 = 0 mod 2 => p2 = (d1 + d3 + d4) % 2
    // p3 (pos 4): covers pos 4, 5, 6, 7 => p3 + d2 + d3 + d4 = 0 mod 2 => p3 = (d2 + d3 + d4) % 2
    const p1 = (d1 + d2 + d4) % 2;
    const p2 = (d1 + d3 + d4) % 2;
    const p3 = (d2 + d3 + d4) % 2;

    let codeword = [p1, p2, d1, p3, d2, d3, d4];
    let received = [...codeword];

    if (errPos >= 1 && errPos <= 7) {
      received[errPos - 1] = 1 - received[errPos - 1]; // flip bit
    }

    // Syndrome computation S = [s1, s2, s3]:
    const s1 = (received[0] + received[2] + received[4] + received[6]) % 2;
    const s2 = (received[1] + received[2] + received[5] + received[6]) % 2;
    const s3 = (received[3] + received[4] + received[5] + received[6]) % 2;

    // Error position = s3*4 + s2*2 + s1*1
    const detectedErr = s3 * 4 + s2 * 2 + s1;

    let corrected = [...received];
    if (detectedErr > 0) {
      corrected[detectedErr - 1] = 1 - corrected[detectedErr - 1];
    }

    const recData = [corrected[2], corrected[4], corrected[5], corrected[6]].join('');

    cdResEl.textContent = 'Transmitted: ' + codeword.join(' ') + ' | Received: ' + received.join(' ');
    synResEl.textContent = 'Syndrome S = [' + s3 + ',' + s2 + ',' + s1 + '] (Binary ' + detectedErr + ': ' + (detectedErr === 0 ? 'No Error' : 'Bit ' + detectedErr + ' flipped & CORRECTED') + ') | Recovered: [' + recData + ']';
  }

  dtEl.addEventListener('input', update);
  errEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter 4-bit binary data word (e.g. 1011).',
      'Optionally select a transmission bit-flip error position (bits 1 to 7).',
      'Inspect generated 7-bit Hamming codeword $[p_1, p_2, d_1, p_3, d_2, d_3, d_4]$ and observe how the 3-bit syndrome vector ($S = H r^T$) automatically pinpoints and repairs the flipped bit.'
    ],
    benefitTitle: 'Richard Hamming 1950 Forward Error Correction (FEC)',
    benefitContent: 'By strategically interleaving 3 parity bits at powers-of-two positions ($1, 2, 4$), the binary syndrome value directly points to the exact integer index of the corrupted bit ($S = 5 \implies \text{bit 5 is flipped}$), enabling real-time hardware error correction in ECC computer RAM.',
    faqs: [{ q: 'How many errors can Hamming (7,4) correct vs detect?', a: 'Standard Hamming (7,4) has a minimum Hamming distance $d_{\min} = 3$, allowing it to correct any single-bit error ($t = 1$) or detect up to 2-bit errors.' }]
  },

  // 15. Lagrange Interpolating Polynomial Curve Fitting Calculator
  {
    slug: 'lagrange-interpolating-polynomial-curve-fitting-calculator',
    name: 'Lagrange Interpolating Polynomial (P(x) = Σ y_i·L_i(x)) Curve Fitting Calculator',
    description: 'Calculate unique nth-degree polynomial interpolation passing exactly through given (x, y) coordinates using Lagrange basis polynomials (L_i(x) = ∏ (x - x_j)/(x_i - x_j)) for numerical analysis.',
    category: 'Math',
    icon: 'text',
    keywords: ['lagrange interpolation calculator', 'lagrange interpolating polynomial formula p of x online', 'curve fitting exact polynomial pass through points calculator', 'lagrange basis polynomial numerical calculator', 'numerical methods polynomial interpolation online'],
    order: 1096,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Data Points: (x₁, y₁), (x₂, y₂), (x₃, y₃) & Target Evaluation x',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(90px, 1fr)); gap:0.5rem;">
        <div class="control-group">
          <label class="control-label" for="lg-x1">x₁</label>
          <input class="tool-textarea" id="lg-x1" type="number" step="1" value="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-y1">y₁</label>
          <input class="tool-textarea" id="lg-y1" type="number" step="1" value="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-x2">x₂</label>
          <input class="tool-textarea" id="lg-x2" type="number" step="1" value="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-y2">y₂</label>
          <input class="tool-textarea" id="lg-y2" type="number" step="1" value="3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-x3">x₃</label>
          <input class="tool-textarea" id="lg-x3" type="number" step="1" value="4.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-y3">y₃</label>
          <input class="tool-textarea" id="lg-y3" type="number" step="1" value="11.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-xeval">Eval x</label>
          <input class="tool-textarea" id="lg-xeval" type="number" step="0.5" value="3.0" />
        </div>
      </div>
      <div id="lg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lg-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P(3.0) = 6.00</span>
            <span class="stat-label">Interpolated Value P(x) at x = 3.0</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lg-res-poly" style="color:var(--green-dark); font-weight:700;">Polynomial: P(x) = x² - 2x + 3 (Exact fit through all 3 data points)</span>
            <span class="stat-label">Lagrange Quadratic Polynomial Formula</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x1El = document.getElementById('lg-x1'), y1El = document.getElementById('lg-y1');
  const x2El = document.getElementById('lg-x2'), y2El = document.getElementById('lg-y2');
  const x3El = document.getElementById('lg-x3'), y3El = document.getElementById('lg-y3');
  const xeEl = document.getElementById('lg-xeval');
  const vResEl = document.getElementById('lg-res-val'), pResEl = document.getElementById('lg-res-poly');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value);
    const x3 = parseFloat(x3El.value), y3 = parseFloat(y3El.value);
    const x = parseFloat(xeEl.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3) || isNaN(x)) return;
    if (x1 === x2 || x1 === x3 || x2 === x3) return; // distinct x required

    // Lagrange Basis:
    // L1 = (x - x2)(x - x3) / ( (x1 - x2)(x1 - x3) )
    const L1 = ((x - x2) * (x - x3)) / ((x1 - x2) * (x1 - x3));
    const L2 = ((x - x1) * (x - x3)) / ((x2 - x1) * (x2 - x3));
    const L3 = ((x - x1) * (x - x2)) / ((x3 - x1) * (x3 - x2));

    const P_x = y1 * L1 + y2 * L2 + y3 * L3;

    vResEl.textContent = 'P(' + x + ') = ' + P_x.toFixed(2);
    pResEl.textContent = 'Lagrange Weights: L₁=' + L1.toFixed(2) + ', L₂=' + L2.toFixed(2) + ', L₃=' + L3.toFixed(2) + ' (Points: (' + x1 + ',' + y1 + '), (' + x2 + ',' + y2 + '), (' + x3 + ',' + y3 + '))';
  }

  [x1El, y1El, x2El, y2El, x3El, y3El, xeEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter three distinct data coordinate pairs $(x_1, y_1), (x_2, y_2), (x_3, y_3)$.',
      'Enter target x evaluation point.',
      'Inspect interpolated polynomial value $P(x)$ and Lagrange basis weights ($L_1, L_2, L_3$).'
    ],
    benefitTitle: 'Joseph-Louis Lagrange 1795 Interpolation Formula',
    benefitContent: 'Lagrange interpolation constructs a polynomial that passes through $N$ points without requiring matrix inversion, providing the foundational mathematics behind Shamir\'s $(k, n)$ Secret Sharing cryptography.',
    faqs: [{ q: 'What is Runge\'s phenomenon in polynomial interpolation?', a: 'Using high-degree polynomials with equally spaced points causes wild oscillations near the interval boundaries; Chebyshev nodes eliminate this oscillation.' }]
  },

  // 16. Bisection Method Root Finding & Error Bound Calculator
  {
    slug: 'bisection-method-root-finding-error-tolerance-calculator',
    name: 'Bisection Method (x_m = ½·(a + b)) Root Finding & Error Bound Calculator',
    description: 'Calculate real equation roots using the guaranteed-convergence Bisection Method (x_m = (a + b) / 2), calculate required iteration count (N ≥ log₂((b - a) / ε)), and verify Bolzano\'s Intermediate Value Theorem.',
    category: 'Math',
    icon: 'text',
    keywords: ['bisection method calculator', 'root finding bisection formula midpoint half a plus b online', 'intermediate value theorem bolzano root isolation calculator', 'bisection iterations count log2 b minus a over epsilon calculator', 'numerical analysis bisection method online'],
    order: 1097,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Function f(x), Bracket Interval [a, b] (Must have opposite signs: f(a)·f(b) < 0) & Tolerance ε',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bi-fn">Function f(x)</label>
          <select class="tool-textarea" id="bi-fn">
            <option value="x3_x_2" selected>f(x) = x³ - x - 2 = 0 (Root in [1, 2])</option>
            <option value="cos_x">f(x) = cos(x) - x = 0 (Root in [0, 1])</option>
            <option value="x2_3">f(x) = x² - 3 = 0 (Root √3 in [1, 2])</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bi-a">Interval a</label>
          <input class="tool-textarea" id="bi-a" type="number" step="0.5" value="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bi-b">Interval b</label>
          <input class="tool-textarea" id="bi-b" type="number" step="0.5" value="2.0" />
        </div>
      </div>
      <div id="bi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bi-res-root" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Root x* ≈ 1.521484</span>
            <span class="stat-label">Bisection Midpoint Root Estimate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bi-res-steps" style="color:var(--green-dark); font-weight:700;">Converged in 14 bisections (Error bound ≤ 0.000061 | f(a) = -2, f(b) = +4 Opposite Signs ✓)</span>
            <span class="stat-label">Iterations & Guaranteed Halving of Error</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fnEl = document.getElementById('bi-fn'), aEl = document.getElementById('bi-a'), bEl = document.getElementById('bi-b');
  const rtResEl = document.getElementById('bi-res-root'), stResEl = document.getElementById('bi-res-steps');

  function evalF(type, x) {
    if (type === 'x3_x_2') return Math.pow(x, 3) - x - 2;
    if (type === 'cos_x') return Math.cos(x) - x;
    return Math.pow(x, 2) - 3;
  }

  function update() {
    const fnType = fnEl.value;
    let a = parseFloat(aEl.value), b = parseFloat(bEl.value);

    if (isNaN(a) || isNaN(b) || a >= b) return;

    let fa = evalF(fnType, a), fb = evalF(fnType, b);
    if (fa * fb > 0) {
      rtResEl.textContent = 'INVALID BRACKET (f(a) and f(b) have same sign)';
      stResEl.textContent = 'f(' + a + ') = ' + fa.toFixed(2) + ', f(' + b + ') = ' + fb.toFixed(2) + ' (Opposite signs required by Bolzano Theorem)';
      return;
    }

    let mid = (a + b) / 2.0;
    let iter = 0;
    const tol = 1e-4;

    while ((b - a) / 2.0 > tol && iter < 100) {
      mid = (a + b) / 2.0;
      const fmid = evalF(fnType, mid);
      if (Math.abs(fmid) < 1e-12) break;

      if (fa * fmid < 0) {
        b = mid;
        fb = fmid;
      } else {
        a = mid;
        fa = fmid;
      }
      iter++;
    }

    rtResEl.textContent = 'Root x* ≈ ' + mid.toFixed(6);
    stResEl.textContent = 'Converged in ' + iter + ' bisections (Final interval width = ' + (b - a).toExponential(2) + ' | f(x*) = ' + evalF(fnType, mid).toExponential(2) + ')';
  }

  [fnEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select non-linear target equation $f(x) = 0$.',
      'Enter bracketing interval endpoints a and b ensuring $f(a) \cdot f(b) < 0$.',
      'Inspect converged root $x^* \approx \frac{a+b}{2}$ and number of interval-halving bisection steps.'
    ],
    benefitTitle: 'Bernard Bolzano 1817 Intermediate Value Theorem Bisection',
    benefitContent: 'Because the Bisection Method divides interval uncertainty exactly in half each step ($E_{n+1} = E_n / 2$), it provides an unbreakable guarantee of convergence for continuous functions.',
    faqs: [{ q: 'How many iterations are needed to gain 1 decimal digit of accuracy?', a: 'Since $\log_2(10) \approx 3.32$, approximately $3.32$ bisection iterations are required per decimal digit of accuracy.' }]
  },

  // 17. Trapezoidal Rule Numerical Definite Integration Calculator
  {
    slug: 'trapezoidal-rule-numerical-definite-integral-calculator',
    name: 'Trapezoidal Rule Numerical Definite Integral (∫ f(x)dx ≈ (h/2)·[f₀ + 2·Σf_i + f_n]) Calculator',
    description: 'Calculate numerical definite integrals using the composite Trapezoidal Rule (∫ f(x)dx ≈ (h/2) · [f(a) + 2·∑ f(x_i) + f(b)]) and evaluate second-order truncation error (O(h²)) for calculus students.',
    category: 'Math',
    icon: 'text',
    keywords: ['trapezoidal rule calculator', 'composite trapezoidal rule formula definite integral online', 'numerical calculus trapezoid rule calculator', 'definite integration step size h calculator', 'applied mathematics numerical integration online'],
    order: 1098,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Integrand f(x), Interval [a, b] & Number of Trapezoid Panels n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tp-fn">Function f(x)</label>
          <select class="tool-textarea" id="tp-fn">
            <option value="x2" selected>f(x) = x² from 0 to 3 (Exact = 9.0)</option>
            <option value="sin">f(x) = sin(x) from 0 to π (Exact = 2.0)</option>
            <option value="exp">f(x) = e^x from 0 to 1 (Exact ≈ 1.7183)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="tp-a">Lower a</label>
          <input class="tool-textarea" id="tp-a" type="number" step="0.5" value="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tp-b">Upper b</label>
          <input class="tool-textarea" id="tp-b" type="number" step="0.5" value="3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tp-n">Panels n</label>
          <input class="tool-textarea" id="tp-n" type="number" step="2" min="1" value="6" />
        </div>
      </div>
      <div id="tp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tp-res-int" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Integral I ≈ 9.1250 (Exact = 9.0000)</span>
            <span class="stat-label">Trapezoidal Rule Numerical Definite Integral</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tp-res-err" style="color:var(--green-dark); font-weight:700;">Step Size h = 0.500 | Error = +0.1250 (+1.39% Overestimate on concave up function)</span>
            <span class="stat-label">Step Size h & Truncation Error Analysis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fnEl = document.getElementById('tp-fn'), aEl = document.getElementById('tp-a');
  const bEl = document.getElementById('tp-b'), nEl = document.getElementById('tp-n');
  const intResEl = document.getElementById('tp-res-int'), errResEl = document.getElementById('tp-res-err');

  function evalF(type, x) {
    if (type === 'x2') return Math.pow(x, 2);
    if (type === 'sin') return Math.sin(x);
    return Math.exp(x);
  }

  function getExact(type, a, b) {
    if (type === 'x2') return (Math.pow(b, 3) - Math.pow(a, 3)) / 3.0;
    if (type === 'sin') return -Math.cos(b) - (-Math.cos(a));
    return Math.exp(b) - Math.exp(a);
  }

  function update() {
    const fnType = fnEl.value;
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const n = parseInt(nEl.value, 10);

    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 1 || a >= b) return;

    const h = (b - a) / n;
    let sum = 0.5 * (evalF(fnType, a) + evalF(fnType, b));

    for (let i = 1; i < n; i++) {
      sum += evalF(fnType, a + i * h);
    }

    const approx = h * sum;
    const exact = getExact(fnType, a, b);
    const err = approx - exact;
    const pct = (err / exact) * 100.0;

    intResEl.textContent = 'Integral I ≈ ' + approx.toFixed(4) + ' (Exact = ' + exact.toFixed(4) + ')';
    errResEl.textContent = 'Step h = ' + h.toFixed(3) + ' | Error = ' + (err >= 0 ? '+' : '') + err.toFixed(4) + ' (' + (pct >= 0 ? '+' : '') + pct.toFixed(2) + '% across ' + n + ' trapezoids)';
  }

  [fnEl, aEl, bEl, nEl].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select integrand function $f(x)$.',
      'Enter lower bound a and upper bound b.',
      'Enter number of trapezoidal panels n.',
      'Inspect numerical trapezoidal integral approximation and compare against the exact analytic calculus solution.'
    ],
    benefitTitle: 'Linear Interpolation Definite Integration Geometry',
    benefitContent: 'The trapezoidal rule approximates the area under a curve by a series of trapezoids ($I \approx \frac{h}{2}[f_0 + 2f_1 + \dots + f_n]$), offering a simple numerical quadrature formula with second-order error ($O(h^2)$).',
    faqs: [{ q: 'Why does the trapezoidal rule overestimate convex/concave-up functions?', a: 'Because chords connecting points on concave-up curves ($f\'\'(x) > 0$) lie entirely above the curve, trapezoids enclose slightly more area than the true integral.' }]
  },

  // 18. Gram-Schmidt Orthogonalization Process Calculator
  {
    slug: 'gram-schmidt-orthogonalization-orthonormal-basis-calculator',
    name: 'Gram-Schmidt Orthogonalization & Orthonormal Basis Vector Calculator',
    description: 'Calculate orthogonal and orthonormal basis vectors (u₁ = v₁, u₂ = v₂ - proj_{u₁}(v₂), e_i = u_i / ||u_i||) from linearly independent vectors in ℝ² and ℝ³ for linear algebra.',
    category: 'Math',
    icon: 'text',
    keywords: ['gram schmidt calculator', 'orthogonalization formula u2 equals v2 minus proj u1 v2 online', 'orthonormal basis vectors dot product calculator', 'linear algebra gram schmidt process calculator', 'vector spaces orthogonal projection online'],
    order: 1099,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Linearly Independent Vectors v₁ = [x₁, y₁] & v₂ = [x₂, y₂] in ℝ²',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.5rem;">
        <div class="control-group">
          <label class="control-label" for="gs-v1x">v₁ (x)</label>
          <input class="tool-textarea" id="gs-v1x" type="number" step="1" value="3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gs-v1y">v₁ (y)</label>
          <input class="tool-textarea" id="gs-v1y" type="number" step="1" value="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gs-v2x">v₂ (x)</label>
          <input class="tool-textarea" id="gs-v2x" type="number" step="1" value="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gs-v2y">v₂ (y)</label>
          <input class="tool-textarea" id="gs-v2y" type="number" step="1" value="2.0" />
        </div>
      </div>
      <div id="gs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gs-res-ortho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">u₁ = [3.0, 1.0] | u₂ = [-0.4, 1.2]</span>
            <span class="stat-label">Orthogonal Basis (u₁ · u₂ = 0.00 ✓ Perpendicular)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gs-res-norm" style="color:var(--green-dark); font-weight:700;">Orthonormal e₁ = [0.949, 0.316] | e₂ = [-0.316, 0.949] (Unit Length = 1.00)</span>
            <span class="stat-label">Normalized Orthonormal Basis Vectors (e_i = u_i / ||u_i||)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v1xEl = document.getElementById('gs-v1x'), v1yEl = document.getElementById('gs-v1y');
  const v2xEl = document.getElementById('gs-v2x'), v2yEl = document.getElementById('gs-v2y');
  const ortResEl = document.getElementById('gs-res-ortho'), nrmResEl = document.getElementById('gs-res-norm');

  function dot(a, b) { return a[0] * b[0] + a[1] * b[1]; }
  function norm(a) { return Math.sqrt(dot(a, a)); }

  function update() {
    const v1 = [parseFloat(v1xEl.value), parseFloat(v1yEl.value)];
    const v2 = [parseFloat(v2xEl.value), parseFloat(v2yEl.value)];

    if (v1.some(isNaN) || v2.some(isNaN)) return;

    // u1 = v1
    const u1 = [...v1];
    const dot_u1_u1 = dot(u1, u1);
    if (dot_u1_u1 === 0) return;

    // proj_{u1}(v2) = (v2 . u1 / u1 . u1) * u1
    const scalar_proj = dot(v2, u1) / dot_u1_u1;
    const proj = [scalar_proj * u1[0], scalar_proj * u1[1]];

    // u2 = v2 - proj_{u1}(v2)
    const u2 = [v2[0] - proj[0], v2[1] - proj[1]];

    const norm1 = norm(u1), norm2 = norm(u2);
    if (norm2 < 1e-9) {
      ortResEl.textContent = 'VECTORS ARE LINEARLY DEPENDENT (Parallel)';
      nrmResEl.textContent = 'Cannot span 2D space';
      return;
    }

    // Orthonormal basis:
    const e1 = [u1[0] / norm1, u1[1] / norm1];
    const e2 = [u2[0] / norm2, u2[1] / norm2];

    const checkDot = dot(u1, u2);

    ortResEl.textContent = 'u₁ = [' + u1[0].toFixed(1) + ', ' + u1[1].toFixed(1) + '] | u₂ = [' + u2[0].toFixed(1) + ', ' + u2[1].toFixed(1) + '] (u₁·u₂ = ' + checkDot.toFixed(2) + ')';
    nrmResEl.textContent = 'e₁ = [' + e1[0].toFixed(3) + ', ' + e1[1].toFixed(3) + '] | e₂ = [' + e2[0].toFixed(3) + ', ' + e2[1].toFixed(3) + '] (||e|| = 1.0)';
  }

  [v1xEl, v1yEl, v2xEl, v2yEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Cartesian components for two linearly independent vectors $\vec{v}_1$ and $\vec{v}_2$.',
      'Inspect orthogonal vectors $\vec{u}_1$ and $\vec{u}_2$ verifying $\vec{u}_1 \cdot \vec{u}_2 = 0$.',
      'Inspect normalized unit-length orthonormal basis vectors $\vec{e}_1$ and $\vec{e}_2$.'
    ],
    benefitTitle: 'Jørgen Gram & Erhard Schmidt Vector Space Orthogonalization',
    benefitContent: 'Gram-Schmidt subtracts vector projections to generate mutually perpendicular coordinates ($\vec{u}_k = \vec{v}_k - \sum \text{proj}_{\vec{u}_j}\vec{v}_k$), providing the mathematical engine for QR matrix decomposition in computer graphics and 3D game engines.',
    faqs: [{ q: 'What is the difference between Orthogonal and Orthonormal?', a: 'Orthogonal vectors are mutually perpendicular ($\vec{u}_i \cdot \vec{u}_j = 0$); orthonormal vectors are additionally normalized to unit length ($||\vec{e}_i|| = 1$).' }]
  },

  // 19. Secant Method Numerical Root Finding Calculator
  {
    slug: 'secant-method-numerical-root-finding-calculator',
    name: 'Secant Method Numerical Root Finding (x_{n+1} = x_n - f(x_n)·(x_n - x_{n-1}) / (f(x_n) - f(x_{n-1}))) Calculator',
    description: 'Calculate equation roots numerically using the derivative-free Secant Method (x_{n+1} = x_n - f(x_n) · [(x_n - x_{n-1}) / (f(x_n) - f(x_{n-1}))]) with superlinear golden-ratio convergence (order 1.618).',
    category: 'Math',
    icon: 'text',
    keywords: ['secant method calculator', 'secant root finding formula x n plus 1 online', 'derivative free numerical root solver secant calculator', 'superlinear convergence golden ratio secant calculator', 'numerical methods nonlinear root finding online'],
    order: 1100,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Function f(x) & Two Initial Guesses x₀ and x₁',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sc-fn">Function f(x)</label>
          <select class="tool-textarea" id="sc-fn">
            <option value="x3_x_2" selected>f(x) = x³ - x - 2 = 0</option>
            <option value="cos_x">f(x) = cos(x) - x = 0</option>
            <option value="x2_7">f(x) = x² - 7 = 0 (√7 ≈ 2.6458)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-x0">Guess x₀</label>
          <input class="tool-textarea" id="sc-x0" type="number" step="0.5" value="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-x1">Guess x₁</label>
          <input class="tool-textarea" id="sc-x1" type="number" step="0.5" value="2.0" />
        </div>
      </div>
      <div id="sc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sc-res-root" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Root x* ≈ 1.521380</span>
            <span class="stat-label">Secant Method Converged Root</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sc-res-iter" style="color:var(--green-dark); font-weight:700;">Converged in 6 iterations (Superlinear Order φ ≈ 1.618 Convergence)</span>
            <span class="stat-label">Iteration Steps without Evaluating Derivatives</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fnEl = document.getElementById('sc-fn'), x0El = document.getElementById('sc-x0'), x1El = document.getElementById('sc-x1');
  const rtResEl = document.getElementById('sc-res-root'), itResEl = document.getElementById('sc-res-iter');

  function evalF(type, x) {
    if (type === 'x3_x_2') return Math.pow(x, 3) - x - 2;
    if (type === 'cos_x') return Math.cos(x) - x;
    return Math.pow(x, 2) - 7;
  }

  function update() {
    const fnType = fnEl.value;
    let x_prev = parseFloat(x0El.value), x_curr = parseFloat(x1El.value);

    if (isNaN(x_prev) || isNaN(x_curr) || x_prev === x_curr) return;

    let iter = 0;
    const maxIter = 50, tol = 1e-7;

    while (iter < maxIter) {
      const f_prev = evalF(fnType, x_prev);
      const f_curr = evalF(fnType, x_curr);

      if (Math.abs(f_curr - f_prev) < 1e-12) break;

      const x_next = x_curr - f_curr * ((x_curr - x_prev) / (f_curr - f_prev));

      if (Math.abs(x_next - x_curr) < tol) {
        x_curr = x_next;
        break;
      }

      x_prev = x_curr;
      x_curr = x_next;
      iter++;
    }

    rtResEl.textContent = 'Root x* ≈ ' + x_curr.toFixed(6);
    itResEl.textContent = 'Converged in ' + iter + ' secant iterations (f(x*) = ' + evalF(fnType, x_curr).toExponential(2) + ' | No derivatives required)';
  }

  [fnEl, x0El, x1El].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select mathematical non-linear equation $f(x) = 0$.',
      'Enter two initial trial estimates $x_0$ and $x_1$.',
      'Inspect converged root $x^*$ and secant line iteration count.'
    ],
    benefitTitle: 'Finite Difference Derivative-Free Secant Method',
    benefitContent: 'The Secant Method replaces the analytical derivative $f\'(x)$ in Newton\'s method with a secant slope approximation ($\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$), achieving superlinear convergence ($O(\phi) \approx 1.618$) while requiring only one function evaluation per step.',
    faqs: [{ q: 'Why use the Secant Method instead of Newton-Raphson?', a: 'When the derivative $f\'(x)$ is impossible, computationally expensive, or too complex to calculate analytically, the Secant Method finds roots efficiently without derivatives.' }]
  },

  // 20. Euler's Method First-Order ODE Numerical Solver Calculator
  {
    slug: 'euler-method-first-order-ode-step-size-calculator',
    name: 'Euler\'s Method First-Order ODE Solver (y_{n+1} = y_n + h·f(x_n, y_n)) Calculator',
    description: 'Calculate step-by-step numerical solutions to first-order differential equations (dy/dx = f(x, y)) using classical Euler\'s forward tangent method (y_{n+1} = y_n + h · f(x_n, y_n)) and explore step size error propagation.',
    category: 'Math',
    icon: 'text',
    keywords: ['eulers method calculator', 'forward euler differential equation formula y n plus 1 online', 'ode step size numerical integration euler calculator', 'initial value problem first order differential equation euler', 'applied mathematics numerical calculus online'],
    order: 1101,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Differential Equation dy/dx = f(x, y), Initial Condition y(x₀) = y₀ & Step Size h',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eu-ode">ODE dy/dx</label>
          <select class="tool-textarea" id="eu-ode">
            <option value="decay" selected>dy/dx = -y (Exact: y = e^(-x))</option>
            <option value="linear">dy/dx = 2x (Exact: y = x² + 1)</option>
            <option value="growth">dy/dx = y (Exact: y = e^x)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="eu-x0">Initial x₀</label>
          <input class="tool-textarea" id="eu-x0" type="number" step="0.5" value="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eu-y0">Initial y₀</label>
          <input class="tool-textarea" id="eu-y0" type="number" step="0.5" value="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eu-h">Step h</label>
          <input class="tool-textarea" id="eu-h" type="number" step="0.05" value="0.1" />
        </div>
      </div>
      <div id="eu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eu-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Euler y(1.0) ≈ 0.348678 (Exact e⁻¹ = 0.367879)</span>
            <span class="stat-label">Numerical Euler Solution vs Exact Analytical Value</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eu-res-err" style="color:var(--green-dark); font-weight:700;">Global Error = -0.019201 (-5.22% Error with h = 0.1 in 10 Steps | O(h) First-Order)</span>
            <span class="stat-label">Global Discretization Truncation Error</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const odeEl = document.getElementById('eu-ode'), x0El = document.getElementById('eu-x0');
  const y0El = document.getElementById('eu-y0'), hEl = document.getElementById('eu-h');
  const valResEl = document.getElementById('eu-res-val'), errResEl = document.getElementById('eu-res-err');

  function f(type, x, y) {
    if (type === 'decay') return -y;
    if (type === 'linear') return 2.0 * x;
    return y;
  }

  function getExact(type, x) {
    if (type === 'decay') return Math.exp(-x);
    if (type === 'linear') return Math.pow(x, 2) + 1.0;
    return Math.exp(x);
  }

  function update() {
    const odeType = odeEl.value;
    let x = parseFloat(x0El.value), y = parseFloat(y0El.value);
    const h = parseFloat(hEl.value);
    const targetX = 1.0;

    if (isNaN(x) || isNaN(y) || isNaN(h) || h <= 0 || x >= targetX) return;

    let steps = 0;
    while (x < targetX - 1e-6 && steps < 1000) {
      const step_h = Math.min(h, targetX - x);
      y = y + step_h * f(odeType, x, y);
      x += step_h;
      steps++;
    }

    const exact = getExact(odeType, targetX);
    const err = y - exact;
    const pct = (err / exact) * 100.0;

    valResEl.textContent = 'Euler y(1.0) ≈ ' + y.toFixed(6) + ' (Exact = ' + exact.toFixed(6) + ')';
    errResEl.textContent = 'Global Error = ' + (err >= 0 ? '+' : '') + err.toFixed(6) + ' (' + pct.toFixed(2) + '% @ h = ' + h + ' in ' + steps + ' Steps)';
  }

  [odeEl, x0El, y0El, hEl].forEach(el => el.addEventListener('input', update));
  odeEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select ordinary differential equation $\frac{dy}{dx} = f(x, y)$.',
      'Enter initial starting conditions $x_0$ and $y_0 = y(x_0)$.',
      'Enter forward step size h (e.g. 0.1 or 0.01).',
      'Inspect calculated Euler approximate value $y(1.0)$ and compare against the exact calculus solution.'
    ],
    benefitTitle: 'Leonhard Euler 1768 Tangent Line Integration',
    benefitContent: 'Euler\'s Method projects forward along the instantaneous tangent slope ($y_{n+1} = y_n + h f(x_n, y_n)$), providing the simplest fundamental foundation for numerical differential equation integration.',
    faqs: [{ q: 'What happens to Euler\'s method error when halving the step size h?', a: 'Because Euler\'s method is first-order ($O(h)$), halving the step size h cuts the global truncation error approximately in half.' }]
  },

  // 21. Miller-Rabin Probabilistic Primality Test Calculator
  {
    slug: 'miller-rabin-primality-test-probabilistic-composite-calculator',
    name: 'Miller-Rabin Primality Test (n-1 = 2^s·d & a^d mod n) Calculator',
    description: 'Determine if an integer n is prime or composite using the Miller-Rabin probabilistic primality test (decomposing n - 1 = 2^s · d and computing modular powers a^d mod n) for cryptography.',
    category: 'Math',
    icon: 'text',
    keywords: ['miller rabin primality test calculator', 'miller rabin test formula a to d mod n online', 'probabilistic prime composite witness calculator', 'rsa prime generation primality test calculator', 'cryptography number theory prime testing online'],
    order: 1102,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Candidate Odd Integer n & Random Testing Base a (e.g. a = 2, 3, 5)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mr-n">Candidate n</label>
          <input class="tool-textarea" id="mr-n" type="number" step="2" min="3" value="561" placeholder="561 (Carmichael Number)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mr-a">Base a</label>
          <input class="tool-textarea" id="mr-a" type="number" step="1" min="2" value="2" placeholder="2" />
        </div>
      </div>
      <div id="mr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mr-res-prime" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">COMPOSITE WITNESS FOUND</span>
            <span class="stat-label">Miller-Rabin Primality Assessment</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mr-res-decomp" style="color:var(--green-dark); font-weight:700;">561 - 1 = 2⁴ · 35 (s=4, d=35) | 2³⁵ mod 561 = 263 ≠ 1 and 263 ≠ 560 (Composite!)</span>
            <span class="stat-label">Decomposition (n - 1 = 2^s · d) & Witness Test Trace</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('mr-n'), aEl = document.getElementById('mr-a');
  const prResEl = document.getElementById('mr-res-prime'), dcResEl = document.getElementById('mr-res-decomp');

  function modExp(base, exp, mod) {
    let res = 1n, b = BigInt(base) % BigInt(mod), e = BigInt(exp), m = BigInt(mod);
    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      b = (b * b) % m;
      e = e / 2n;
    }
    return Number(res);
  }

  function update() {
    const n = parseInt(nEl.value, 10);
    const a = parseInt(aEl.value, 10);

    if (isNaN(n) || isNaN(a) || n < 3 || n % 2 === 0 || a < 2 || a >= n) return;

    // Decompose n - 1 = 2^s * d with d odd
    let d = n - 1, s = 0;
    while (d % 2 === 0) {
      d = Math.floor(d / 2);
      s++;
    }

    // Compute x = a^d mod n
    let x = modExp(a, d, n);
    let isProbablePrime = false;

    if (x === 1 || x === n - 1) {
      isProbablePrime = true;
    } else {
      for (let r = 1; r < s; r++) {
        x = modExp(x, 2, n);
        if (x === n - 1) {
          isProbablePrime = true;
          break;
        }
      }
    }

    let status = '', color = '#22543d';
    if (isProbablePrime) {
      status = 'PROBABLY PRIME to Base a = ' + a;
      color = '#22543d';
    } else {
      status = 'DEFINITELY COMPOSITE (Base a = ' + a + ' is a witness)';
      color = '#c53030';
    }

    prResEl.textContent = status;
    prResEl.style.color = color;
    dcResEl.textContent = (n - 1) + ' = 2^' + s + ' · ' + d + ' | Initial a^d mod n = ' + modExp(a, d, n) + ' (Base a = ' + a + ')';
    dcResEl.style.color = color;
  }

  nEl.addEventListener('input', update);
  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter candidate odd integer n (e.g. 561 or 104729).',
      'Enter test base integer a ($2 \le a < n$).',
      'Inspect decomposition $n - 1 = 2^s \cdot d$, modular power trajectory, and determine whether n is definitively composite or probably prime.'
    ],
    benefitTitle: 'Gary Miller & Michael Rabin 1980 Primality Standard',
    benefitContent: 'Unlike Fermat\'s test which is fooled by Carmichael numbers (like 561), Miller-Rabin guarantees that every composite number fails for at least $\frac{3}{4}$ of all possible bases, making 64 rounds of testing virtually foolproof ($< 4^{-64} \approx 10^{-38}$ error rate).',
    faqs: [{ q: 'What is a Carmichael number?', a: 'A Carmichael number (like 561 = 3 × 11 × 17) is a composite number that passes Fermat\'s Little Theorem ($a^{n-1} \equiv 1 \pmod n$) for all coprime bases but is immediately caught by Miller-Rabin.' }]
  },

  // 22. Boolean Satisfiability (SAT) Truth Table & Assignment Solver
  {
    slug: 'boolean-satisfiability-dpll-truth-table-solver',
    name: 'Boolean Logic Satisfiability (SAT Truth Table & Valid Assignment) Calculator',
    description: 'Evaluate Boolean logic expressions (AND, OR, NOT, XOR, IMPLIES), generate complete 2^n truth tables, and determine formula Satisfiability (SAT vs UNSAT) and Tautology status for computer science.',
    category: 'Math',
    icon: 'text',
    keywords: ['boolean satisfiability calculator', 'sat solver truth table 3 variables online', 'boolean logic tautology satisfiable unsat calculator', 'propositional logic truth table generator calculator', 'discrete math computer science sat solver online'],
    order: 1103,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Propositional Boolean Logic Formula (Variables A, B, C)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sat-expr">Boolean Formula</label>
        <select class="tool-textarea" id="sat-expr">
          <option value="conj" selected>(A ∨ B) ∧ (¬A ∨ C) ∧ (¬B ∨ ¬C) (Satisfiable CNF)</option>
          <option value="xor">(A ⊕ B) ∧ (B ⊕ C) ∧ (A ⊕ C) (UNSAT Triangle Paradox)</option>
          <option value="taut">A ∨ ¬A (Tautology: Always True)</option>
          <option value="impl">(A → B) ∧ (B → C) → (A → C) (Hypothetical Syllogism Tautology)</option>
        </select>
      </div>
      <div id="sat-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sat-res-status" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">SATISFIABLE (4 Satisfying Models Found)</span>
            <span class="stat-label">Boolean Satisfiability Classification</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sat-res-assign" style="color:var(--green-dark); font-weight:700;">Valid Assignment: A=True, B=False, C=True evaluates to True</span>
            <span class="stat-label">Sample Satisfying Truth Assignment Model</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const exprEl = document.getElementById('sat-expr');
  const stResEl = document.getElementById('sat-res-status'), asResEl = document.getElementById('sat-res-assign');

  function evalExpr(type, A, B, C) {
    if (type === 'conj') {
      // (A or B) and (not A or C) and (not B or not C)
      return (A || B) && (!A || C) && (!B || !C);
    } else if (type === 'xor') {
      // (A != B) and (B != C) and (A != C) -> impossible in boolean logic
      return (A !== B) && (B !== C) && (A !== C);
    } else if (type === 'taut') {
      return A || !A;
    } else {
      // (A->B and B->C) -> (A->C)
      const prem = (!A || B) && (!B || C);
      const conc = !A || C;
      return !prem || conc;
    }
  }

  function update() {
    const type = exprEl.value;
    let satCount = 0;
    let sampleModel = null;

    const bools = [false, true];
    for (let A of bools) {
      for (let B of bools) {
        for (let C of bools) {
          if (evalExpr(type, A, B, C)) {
            satCount++;
            if (!sampleModel) sampleModel = { A, B, C };
          }
        }
      }
    }

    let status = '', color = '#22543d';
    if (satCount === 8) {
      status = 'TAUTOLOGY (Valid for 100% of all 8 truth assignments)';
      color = '#22543d';
    } else if (satCount > 0) {
      status = 'SATISFIABLE (' + satCount + ' / 8 Truth Models Satisfy Formula)';
      color = '#22543d';
    } else {
      status = 'UNSATISFIABLE (Contradiction: 0 / 8 Models satisfy formula)';
      color = '#c53030';
    }

    stResEl.textContent = status;
    stResEl.style.color = color;
    asResEl.textContent = sampleModel ? 'Satisfying Model: A=' + sampleModel.A + ', B=' + sampleModel.B + ', C=' + sampleModel.C : 'No satisfying assignment exists (Formula evaluates to False everywhere)';
    asResEl.style.color = color;
  }

  exprEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select propositional Boolean logic formula.',
      'Inspect complete 8-row truth table evaluation across binary states $(A, B, C)$.',
      'Determine formula classification (Satisfiable SAT, Tautology, or Unsatisfiable UNSAT contradiction).'
    ],
    benefitTitle: 'Stephen Cook 1971 Cook-Levin NP-Completeness Standard',
    benefitContent: 'Boolean Satisfiability (SAT) was the first problem proven to be NP-complete; modern DPLL and CDCL SAT solvers efficiently solve millions of industrial variables in microprocessor hardware verification.',
    faqs: [{ q: 'What is the difference between Satisfiable and Tautology?', a: 'A formula is Satisfiable if at least ONE truth assignment makes it True; a formula is a Tautology if EVERY possible truth assignment makes it True.' }]
  },

  // 23. Quaternion Multiplication & 3D Spatial Rotation Calculator
  {
    slug: 'quaternion-multiplication-3d-rotation-axis-angle-calculator',
    name: 'Quaternion Hamilton Product (q₁·q₂) & 3D Spatial Rotation Calculator',
    description: 'Calculate 4D Hamilton quaternion multiplication (q₁ · q₂), conjugate, norm, and convert 3D rotation axis-angle θ around unit vector u into unit rotation quaternions (q = cos(θ/2) + u·sin(θ/2)) for 3D robotics and game engines.',
    category: 'Math',
    icon: 'text',
    keywords: ['quaternion multiplication calculator', 'hamilton quaternion product formula q1 q2 online', 'quaternion 3d rotation axis angle calculator', 'gimbal lock avoidance quaternion robotics calculator', '3d computer graphics quaternion math online'],
    order: 1104,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rotation Angle θ (°) & Rotation Unit Axis Vector [u_x, u_y, u_z]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qt-deg">Angle θ (°)</label>
          <input class="tool-textarea" id="qt-deg" type="number" step="15" value="90.0" placeholder="90.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-ux">Axis u_x</label>
          <input class="tool-textarea" id="qt-ux" type="number" step="0.5" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-uy">Axis u_y</label>
          <input class="tool-textarea" id="qt-uy" type="number" step="0.5" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-uz">Axis u_z</label>
          <input class="tool-textarea" id="qt-uz" type="number" step="0.5" value="1.0" placeholder="1.0 (Z-Axis)" />
        </div>
      </div>
      <div id="qt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qt-res-quat" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">q = 0.707 + 0.000i + 0.000j + 0.707k</span>
            <span class="stat-label">Unit Rotation Quaternion (q = cos(θ/2) + u·sin(θ/2))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qt-res-norm" style="color:var(--green-dark); font-weight:700;">Norm ||q|| = 1.0000 | Rotates 3D vector v via v\' = q·v·q⁻¹ with ZERO Gimbal Lock</span>
            <span class="stat-label">Unit Norm Verification & 3D Spatial Rotation Transform</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const degEl = document.getElementById('qt-deg'), uxEl = document.getElementById('qt-ux');
  const uyEl = document.getElementById('qt-uy'), uzEl = document.getElementById('qt-uz');
  const qtResEl = document.getElementById('qt-res-quat'), nmResEl = document.getElementById('qt-res-norm');

  function update() {
    const deg = parseFloat(degEl.value);
    let ux = parseFloat(uxEl.value), uy = parseFloat(uyEl.value), uz = parseFloat(uzEl.value);

    if (isNaN(deg) || isNaN(ux) || isNaN(uy) || isNaN(uz)) return;

    // Normalize axis vector:
    const len = Math.sqrt(ux*ux + uy*uy + uz*uz);
    if (len === 0) return;
    ux /= len; uy /= len; uz /= len;

    // Quaternion for rotation theta around axis u:
    // q = cos(theta / 2) + u * sin(theta / 2)
    const theta_rad = (deg * Math.PI) / 180.0;
    const w = Math.cos(theta_rad / 2.0);
    const s = Math.sin(theta_rad / 2.0);
    const x = ux * s;
    const y = uy * s;
    const z = uz * s;

    const norm = Math.sqrt(w*w + x*x + y*y + z*z);

    qtResEl.textContent = 'q = ' + w.toFixed(3) + (x>=0?' + ':' - ') + Math.abs(x).toFixed(3) + 'i' + (y>=0?' + ':' - ') + Math.abs(y).toFixed(3) + 'j' + (z>=0?' + ':' - ') + Math.abs(z).toFixed(3) + 'k';
    nmResEl.textContent = 'Norm ||q|| = ' + norm.toFixed(4) + ' | θ = ' + deg + '° around axis [' + ux.toFixed(2) + ', ' + uy.toFixed(2) + ', ' + uz.toFixed(2) + '] (No Gimbal Lock)';
  }

  [degEl, uxEl, uyEl, uzEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter desired 3D rotation angle $\theta$ in degrees.',
      'Enter rotation unit axis components $[u_x, u_y, u_z]$ (e.g. $[0, 0, 1]$ for Z-axis yaw).',
      'Inspect computed 4D unit rotation quaternion $q = w + xi + yj + zk$ used in 3D game engines (Unity, Unreal Engine).'
    ],
    benefitTitle: 'Sir William Rowan Hamilton 1843 Quaternions (i² = j² = k² = ijk = -1)',
    benefitContent: 'Unlike Euler angles (pitch, roll, yaw) which suffer from catastrophic "gimbal lock" (loss of a degree of freedom when two axes align), unit quaternions represent smooth, continuous 3D rotations without singularities.',
    faqs: [{ q: 'Why is angle divided by 2 (θ/2) in rotation quaternions?', a: 'Rotating a 3D vector requires sandwich multiplication ($v\' = q v q^{-1}$), which applies the half-angle rotation twice to yield the full rotation angle $\theta$.' }]
  },

  // 24. Discrete Logarithm Shanks' Baby-Step Giant-Step Calculator
  {
    slug: 'discrete-logarithm-baby-step-giant-step-shanks-calculator',
    name: 'Discrete Logarithm (g^x ≡ h mod p Shanks\' Baby-Step Giant-Step) Calculator',
    description: 'Solve discrete logarithm problems (finding exponent x such that g^x ≡ h mod p) in O(√p) time and space using Daniel Shanks\' Baby-Step Giant-Step algorithm for cryptographic cryptanalysis.',
    category: 'Math',
    icon: 'text',
    keywords: ['discrete logarithm calculator', 'shanks baby step giant step algorithm online', 'discrete log solver g to x equals h mod p calculator', 'cryptanalysis discrete logarithm calculator', 'number theory cryptography discrete log online'],
    order: 1105,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Generator Base g, Target Value h & Prime Modulus p',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dl-g">Base g</label>
          <input class="tool-textarea" id="dl-g" type="number" step="1" value="5" placeholder="5" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dl-h">Target h</label>
          <input class="tool-textarea" id="dl-h" type="number" step="1" value="23" placeholder="23" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dl-p">Prime p</label>
          <input class="tool-textarea" id="dl-p" type="number" step="2" value="97" placeholder="97" />
        </div>
      </div>
      <div id="dl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dl-res-x" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Discrete Log x = 37</span>
            <span class="stat-label">Exact Solution (5³⁷ mod 97 = 23 ✓)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dl-res-trace" style="color:var(--green-dark); font-weight:700;">Shanks Block Size m = ⌈√97⌉ = 10 | Solved in O(√p) = 10 steps instead of 97</span>
            <span class="stat-label">Baby-Step Giant-Step Time-Memory Tradeoff Trace</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('dl-g'), hEl = document.getElementById('dl-h'), pEl = document.getElementById('dl-p');
  const xResEl = document.getElementById('dl-res-x'), trResEl = document.getElementById('dl-res-trace');

  function modExp(base, exp, mod) {
    let res = 1n, b = BigInt(base) % BigInt(mod), e = BigInt(exp), m = BigInt(mod);
    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      b = (b * b) % m;
      e = e / 2n;
    }
    return Number(res);
  }

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
  }

  function modInverse(a, m) {
    const { gcd: g, x } = extGCD(((a % m) + m) % m, m);
    return g === 1 ? ((x % m) + m) % m : null;
  }

  function update() {
    const g = parseInt(gEl.value, 10);
    const h = parseInt(hEl.value, 10);
    const p = parseInt(pEl.value, 10);

    if (isNaN(g) || isNaN(h) || isNaN(p) || g <= 1 || h < 1 || p <= 2) return;

    // Shanks' Baby-step Giant-step:
    // m = ceil(sqrt(p))
    const m = Math.ceil(Math.sqrt(p));

    // Baby steps: compute g^j mod p for j in [0, m-1] and store in hash table
    const table = new Map();
    let cur = 1;
    for (let j = 0; j < m; j++) {
      table.set(cur, j);
      cur = (cur * g) % p;
    }

    // Giant steps: g^(-m) mod p
    const g_m = modExp(g, m, p);
    const g_inv_m = modInverse(g_m, p);
    if (g_inv_m === null) return;

    let gamma = h;
    let solution_x = null;

    for (let i = 0; i < m; i++) {
      if (table.has(gamma)) {
        solution_x = i * m + table.get(gamma);
        break;
      }
      gamma = (gamma * g_inv_m) % p;
    }

    if (solution_x !== null) {
      const check = modExp(g, solution_x, p);
      xResEl.textContent = 'Discrete Log x = ' + solution_x;
      trResEl.textContent = g + '^' + solution_x + ' mod ' + p + ' = ' + check + (check === h ? ' ✓' : ' ✗') + ' | Block m = ' + m + ' (O(√p) Speedup)';
    } else {
      xResEl.textContent = 'NO SOLUTION FOUND';
      trResEl.textContent = 'Target h is not in the cyclic subgroup generated by g mod ' + p;
    }
  }

  [gEl, hEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter multiplicative generator base g.',
      'Enter target residue value h.',
      'Enter prime modulus p.',
      'Inspect calculated discrete logarithm exponent x satisfying $g^x \equiv h \pmod p$ solved via Baby-Step Giant-Step in $O(\sqrt{p})$ operations.'
    ],
    benefitTitle: 'Daniel Shanks 1971 Baby-Step Giant-Step Algorithm',
    benefitContent: 'Shanks replaced brute-force search ($O(p)$) with a meet-in-the-middle time-memory tradeoff ($O(\sqrt{p})$), proving that cryptographic key sizes must be at least twice as large as the desired security bit-level to resist square-root attacks.',
    faqs: [{ q: 'Why is the Discrete Logarithm Problem so crucial for cryptography?', a: 'Computing powers ($g^x \pmod p$) is easy ($O(\log x)$), but reversing it to find exponent $x$ takes astronomical time without quantum computers (Shor\'s algorithm).' }]
  },

  // 25. Elliptic Curve Point Addition & Doubling Calculator (y² = x³ + ax + b mod p)
  {
    slug: 'elliptic-curve-point-addition-scalar-multiplication-calculator',
    name: 'Elliptic Curve Point Addition (P + Q) & Doubling (2P on y² = x³ + ax + b mod p) Calculator',
    description: 'Calculate Weierstrass elliptic curve point addition (P + Q = R) and point doubling (2P) over finite field 𝔽_p (y² ≡ x³ + ax + b mod p) for ECC cryptography (Bitcoin secp256k1 & Curve25519).',
    category: 'Math',
    icon: 'text',
    keywords: ['elliptic curve point addition calculator', 'ecc group law formula y squared equals x cubed plus ax plus b online', 'elliptic curve point doubling slope lambda calculator', 'secp256k1 ecc cryptography point addition calculator', 'finite field cryptography elliptic curves online'],
    order: 1106,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Curve: y² ≡ x³ + ax + b (mod p) & Point P = (x₁, y₁)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ec-a">Curve a</label>
          <input class="tool-textarea" id="ec-a" type="number" step="1" value="2" placeholder="2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ec-b">Curve b</label>
          <input class="tool-textarea" id="ec-b" type="number" step="1" value="3" placeholder="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ec-p">Prime p</label>
          <input class="tool-textarea" id="ec-p" type="number" step="2" value="97" placeholder="97" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ec-px">Point P (x₁)</label>
          <input class="tool-textarea" id="ec-px" type="number" step="1" value="3" placeholder="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ec-py">Point P (y₁)</label>
          <input class="tool-textarea" id="ec-py" type="number" step="1" value="6" placeholder="6" />
        </div>
      </div>
      <div id="ec-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ec-res-double" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2P = (80, 10) on y² = x³ + 2x + 3 mod 97</span>
            <span class="stat-label">Point Doubling 2P = P + P Group Operation</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ec-res-curve" style="color:var(--green-dark); font-weight:700;">Slope λ = 83 | Non-Singular Discriminant Δ = -4(2³) - 27(3²) = -275 ≠ 0 mod 97 ✓</span>
            <span class="stat-label">Tangent Slope λ & Non-Singular Weierstrass Curve Check</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ec-a'), bEl = document.getElementById('ec-b'), pEl = document.getElementById('ec-p');
  const pxEl = document.getElementById('ec-px'), pyEl = document.getElementById('ec-py');
  const dbResEl = document.getElementById('ec-res-double'), cvResEl = document.getElementById('ec-res-curve');

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
  }

  function modInverse(a, m) {
    const { gcd: g, x } = extGCD(((a % m) + m) % m, m);
    return g === 1 ? ((x % m) + m) % m : null;
  }

  function update() {
    const a = parseInt(aEl.value, 10), b = parseInt(bEl.value, 10), p = parseInt(pEl.value, 10);
    const px = parseInt(pxEl.value, 10), py = parseInt(pyEl.value, 10);

    if (isNaN(a) || isNaN(b) || isNaN(p) || isNaN(px) || isNaN(py) || p <= 2) return;

    // Check non-singular discriminant: 4a^3 + 27b^2 != 0 mod p
    const disc = (4 * Math.pow(a, 3) + 27 * Math.pow(b, 2)) % p;
    if (disc === 0) {
      dbResEl.textContent = 'SINGULAR CURVE (4a³ + 27b² ≡ 0 mod p)';
      cvResEl.textContent = 'Singular curves are cryptographically broken';
      return;
    }

    // Verify P is on the curve: y^2 = x^3 + a*x + b mod p
    const lhs = (py * py) % p;
    const rhs = (Math.pow(px, 3) + a * px + b) % p;
    const rhs_pos = ((rhs % p) + p) % p;

    if (lhs !== rhs_pos) {
      dbResEl.textContent = 'POINT NOT ON CURVE';
      cvResEl.textContent = 'y₁² (' + lhs + ') ≠ x₁³ + ax₁ + b (' + rhs_pos + ') mod ' + p;
      return;
    }

    // Point Doubling 2P = P + P:
    // lambda = (3*px^2 + a) / (2*py) mod p
    const num = (3 * px * px + a) % p;
    const den = (2 * py) % p;
    const den_inv = modInverse(den, p);

    if (den_inv === null) {
      dbResEl.textContent = '2P = O (POINT AT INFINITY)';
      cvResEl.textContent = 'Tangent line is vertical (2y₁ = 0 mod p)';
      return;
    }

    const lambda = ((num * den_inv) % p + p) % p;

    // x3 = lambda^2 - 2*px mod p
    let x3 = (lambda * lambda - 2 * px) % p;
    x3 = ((x3 % p) + p) % p;

    // y3 = lambda*(px - x3) - py mod p
    let y3 = (lambda * (px - x3) - py) % p;
    y3 = ((y3 % p) + p) % p;

    dbResEl.textContent = '2P = (' + x3 + ', ' + y3 + ') on y² = x³ + ' + a + 'x + ' + b + ' mod ' + p;
    cvResEl.textContent = 'Slope λ = ' + lambda + ' | Point P(' + px + ',' + py + ') verified on curve ✓';
  }

  [aEl, bEl, pEl, pxEl, pyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Weierstrass curve coefficients a and b and finite field prime modulus p ($y^2 \equiv x^3 + ax + b \pmod p$).',
      'Enter coordinate pair $(x_1, y_1)$ for point P located on the elliptic curve.',
      'Inspect calculated tangent slope $\lambda$, doubled point coordinates $2P = (x_3, y_3)$, and verify that non-singular group addition is satisfied.'
    ],
    benefitTitle: 'Neal Koblitz & Victor Miller 1985 Elliptic Curve Cryptography (ECC)',
    benefitContent: 'Because elliptic curve discrete logarithms have no known sub-exponential index calculus attacks, a compact 256-bit ECC key (like Bitcoin secp256k1) matches the cryptographic strength of a massive 3072-bit RSA key while consuming $<10\%$ of battery and processor power.',
    faqs: [{ q: 'What is the Point at Infinity (O) in elliptic curves?', a: 'The Point at Infinity $\mathcal{O}$ acts as the additive identity element ($P + \mathcal{O} = P$ and $P + (-P) = \mathcal{O}$) in the abelian group of points on the curve.' }]
  }
];

pack38Tools.forEach(createTool);
console.log('Pack 38 complete: 25 tools created.');
