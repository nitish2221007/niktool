const { createTool } = require('./generate-curated-tools.cjs');

// Suite FF: 5 Tools in Population Genetics, Molecular Biology, PCR & Microbiology to reach 468 tools
const toolsSuiteFF = [
  // 1. Hardy-Weinberg Equilibrium Allele Frequency Calculator
  {
    slug: 'hardy-weinberg-allele-frequency-calculator',
    name: 'Hardy-Weinberg Equilibrium Allele Frequency Calculator',
    description: 'Calculate homozygous dominant (p²), heterozygous carrier (2pq), and homozygous recessive (q²) genotype frequencies from recessive phenotype incidence in population genetics.',
    category: 'Science',
    icon: 'text',
    keywords: ['hardy weinberg calculator', 'allele frequency p2 2pq q2 calculator', 'population genetics calculator online', 'carrier frequency hardy weinberg formula', 'recessive allele frequency calculator'],
    order: 339,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Recessive Phenotype Frequency (q²) or Count',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="hw-q2">Homozygous Recessive Incidence (q² or 1 in N)</label>
        <input class="tool-textarea" id="hw-q2" type="number" step="any" value="0.04" placeholder="0.04 (i.e. 4% or 1 in 25)" />
      </div>
      <div id="hw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hw-res-carrier" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">32.0% (2pq)</span>
            <span class="stat-label">Heterozygous Carrier Frequency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hw-res-dom" style="font-weight:700;">64.0% (p²)</span>
            <span class="stat-label">Homozygous Dominant</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hw-res-alleles">p = 0.80, q = 0.20</span>
            <span class="stat-label">Allele Frequencies</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const q2El = document.getElementById('hw-q2');
  const carResEl = document.getElementById('hw-res-carrier'), domResEl = document.getElementById('hw-res-dom'), alResEl = document.getElementById('hw-res-alleles');

  function update() {
    const q2 = parseFloat(q2El.value);
    if (isNaN(q2) || q2 <= 0 || q2 >= 1.0) return;

    // q = sqrt(q^2)
    const q = Math.sqrt(q2);
    // p = 1 - q
    const p = 1 - q;
    // p^2 = dominant, 2pq = carriers
    const p2 = Math.pow(p, 2);
    const twoPq = 2 * p * q;

    carResEl.textContent = (twoPq * 100).toFixed(1) + '% (' + (1 / twoPq).toFixed(1) + ' in 1)';
    domResEl.textContent = (p2 * 100).toFixed(1) + '% (p²)';
    alResEl.textContent = 'p = ' + p.toFixed(3) + ', q = ' + q.toFixed(3);
  }

  q2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the homozygous recessive disease or trait frequency (q²) as a decimal fraction (e.g. 0.0004 for 1 in 2,500).',
      'Inspect dominant allele frequency (p), recessive allele frequency (q), and heterozygous carrier percentage (2pq).'
    ],
    benefitTitle: 'G. H. Hardy and Wilhelm Weinberg\'s 1908 Law',
    benefitContent: 'Hardy-Weinberg equilibrium proves that in the absence of evolutionary influences (mutation, selection, drift), allele frequencies remain constant across generations: p² + 2pq + q² = 1.0.',
    faqs: [{ q: 'If a recessive condition affects 1 in 2,500 people, what is the carrier frequency?', a: 'q² = 0.0004 => q = 0.02, p = 0.98; Carrier frequency 2pq = 2 × 0.98 × 0.02 = 0.0392 (~1 in 25 people are carriers).' }]
  },

  // 2. DNA GC-Content & PCR Primer Melting Temperature (Tm) Calculator
  {
    slug: 'dna-gc-content-melting-temp-calculator',
    name: 'DNA GC-Content & PCR Primer Melting Temperature (Tm) Calculator',
    description: 'Calculate nucleotide Guanine-Cytosine GC percentage (%GC), molecular weight, and PCR primer annealing melting temperature (Tm) using the Marmur-Doty and Nearest-Neighbor formulas.',
    category: 'Science',
    icon: 'text',
    keywords: ['dna gc content calculator', 'pcr primer tm calculator', 'melting temperature primer formula', 'oligonucleotide gc percentage online', 'marmur doty primer annealing tm'],
    order: 340,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '5\' to 3\' DNA Oligonucleotide Sequence',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="dna-seq">Enter DNA Sequence (A, T, G, C)</label>
        <textarea class="tool-textarea" id="dna-seq" rows="3" placeholder="ATGCGATCGATCGATCGATCGATCGATC" style="font-family:monospace; text-transform:uppercase;"></textarea>
      </div>
      <div id="dna-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dna-res-tm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">64.2 °C</span>
            <span class="stat-label">Primer Melting Temperature (Tₘ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dna-res-gc" style="color:#2563eb; font-weight:700;">50.0% GC</span>
            <span class="stat-label">GC Content</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dna-res-len">28 bp</span>
            <span class="stat-label">Sequence Length</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const seqEl = document.getElementById('dna-seq');
  const tmResEl = document.getElementById('dna-res-tm'), gcResEl = document.getElementById('dna-res-gc'), lenResEl = document.getElementById('dna-res-len');

  function update() {
    const raw = seqEl.value.toUpperCase().replace(/[^ATGC]/g, '');
    if (!raw) return;

    const len = raw.length;
    let a = 0, t = 0, g = 0, c = 0;
    for (const ch of raw) {
      if (ch === 'A') a++;
      else if (ch === 'T') t++;
      else if (ch === 'G') g++;
      else if (ch === 'C') c++;
    }

    const gcCount = g + c;
    const gcPct = (gcCount / len) * 100;

    // Wallace Rule for short oligos (<14bp): Tm = 2*(A+T) + 4*(G+C)
    // Marmur-Doty formula for standard oligos (>=14bp): Tm = 64.9 + 41 * (G+C - 16.4) / N
    let tm = 0;
    if (len < 14) {
      tm = (2 * (a + t)) + (4 * gcCount);
    } else {
      tm = 64.9 + 41 * (gcCount - 16.4) / len;
    }

    tmResEl.textContent = tm.toFixed(1) + ' °C (Anneal @ ' + (tm - 5).toFixed(1) + ' °C)';
    gcResEl.textContent = gcPct.toFixed(1) + '% GC';
    lenResEl.textContent = len + ' bp (A:' + a + ' T:' + t + ' G:' + g + ' C:' + c + ')';
  }

  seqEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Paste DNA primer oligonucleotide sequence in 5\' to 3\' direction.',
      'Inspect base composition, Guanine-Cytosine (GC%) ratio, and calculated melting temperature (Tₘ).'
    ],
    benefitTitle: 'PCR Primer Design Rules (3 Hydrogen Bonds in G-C)',
    benefitContent: 'G-C base pairs form 3 hydrogen bonds compared to only 2 in A-T pairs, conferring higher thermal stability. Ideal PCR primers possess 40-60% GC content with a Tₘ between 55°C and 65°C.',
    faqs: [{ q: 'What is the optimal PCR annealing temperature?', a: 'The PCR annealing temperature is typically set 3°C to 5°C below the lower melting temperature (Tₘ) of the primer pair.' }]
  },

  // 3. Bacterial Doubling Generation Time Calculator
  {
    slug: 'bacterial-growth-doubling-time-calculator',
    name: 'Bacterial Growth Doubling & Generation Time Calculator',
    description: 'Calculate bacterial doubling generation time (g = t / n, n = 3.32 · log₁₀(N/N₀)) and specific growth rate constant (μ) from initial and final colony counts.',
    category: 'Science',
    icon: 'text',
    keywords: ['bacterial doubling time calculator', 'generation time microbiology calculator', 'bacterial exponential growth formula', 'specific growth rate mu calculator', 'colony doubling time online'],
    order: 341,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Cell Count (N₀), Final Count (N) & Elapsed Time',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-n0">Initial Cells (N₀)</label>
          <input class="tool-textarea" id="bg-n0" type="number" step="any" value="1000" placeholder="1000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-n">Final Cells (N)</label>
          <input class="tool-textarea" id="bg-n" type="number" step="any" value="64000" placeholder="64,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-time">Elapsed Time (Minutes)</label>
          <input class="tool-textarea" id="bg-time" type="number" step="any" value="120" placeholder="120 Mins" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-g" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">20.0 Minutes</span>
            <span class="stat-label">Doubling Generation Time (g)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-gen" style="font-weight:700;">6.0 Generations</span>
            <span class="stat-label">Number of Generations (n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-mu">μ = 2.08 hr⁻¹</span>
            <span class="stat-label">Specific Growth Rate (μ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n0El = document.getElementById('bg-n0'), nEl = document.getElementById('bg-n'), tEl = document.getElementById('bg-time');
  const gResEl = document.getElementById('bg-res-g'), genResEl = document.getElementById('bg-res-gen'), muResEl = document.getElementById('bg-res-mu');

  function update() {
    const N0 = parseFloat(n0El.value), N = parseFloat(nEl.value), tMins = parseFloat(tEl.value);
    if (isNaN(N0) || isNaN(N) || isNaN(tMins) || N0 <= 0 || N <= N0 || tMins <= 0) return;

    // n = (log10(N) - log10(N0)) / log10(2) = 3.3219 * log10(N / N0)
    const n = Math.log2(N / N0);
    // Doubling time g = t / n
    const g = tMins / n;
    // Specific growth rate mu = ln(2) / (g in hours)
    const gHours = g / 60;
    const mu = Math.LN2 / gHours;

    gResEl.textContent = g.toFixed(1) + ' Minutes';
    genResEl.textContent = n.toFixed(1) + ' Generations (n)';
    muResEl.textContent = 'μ = ' + mu.toFixed(2) + ' hr⁻¹';
  }

  [n0El, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter starting bacterial population count N₀ and final count N during logarithmic exponential phase.',
      'Enter total elapsed growth incubation time in minutes.',
      'Inspect generation doubling time (g) and specific growth rate constant (μ).'
    ],
    benefitTitle: 'Logarithmic Phase Kinetics in E. coli',
    benefitContent: 'Under ideal nutrient conditions at 37°C, Escherichia coli exhibits a rapid generation doubling time of approximately 20 minutes (μ ≈ 2.08 hr⁻¹).',
    faqs: [{ q: 'What is the formula for number of generations?', a: 'n = log₂(N / N₀) = (log₁₀(N) - log₁₀(N₀)) / 0.301.' }]
  },

  // 4. Dihybrid Cross Punnett Square Genetic Ratio Calculator
  {
    slug: 'dihybrid-cross-punnett-square-calculator',
    name: 'Dihybrid Cross & Punnett Square Ratio Calculator',
    description: 'Calculate 16-box Mendelian dihybrid cross genotypic and phenotypic inheritance ratios (e.g. 9:3:3:1 classical ratio) for two unlinked heterozygous genes (AaBb × AaBb).',
    category: 'Science',
    icon: 'text',
    keywords: ['dihybrid cross calculator', 'punnett square 9 3 3 1 ratio calculator', 'mendelian dihybrid inheritance calculator', 'aabb x aabb punnett square online', 'genotypic phenotypic ratio calculator'],
    order: 342,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Parental Genotypes for Two Traits (Gene A & Gene B)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ps-p1">Parent 1 Genotype</label>
          <select class="tool-textarea" id="ps-p1">
            <option value="AaBb" selected>AaBb (Double Heterozygous)</option>
            <option value="AABB">AABB (Homozygous Dominant)</option>
            <option value="aabb">aabb (Homozygous Recessive - Test Cross)</option>
            <option value="Aabb">Aabb (Heterozygous A, Recessive b)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-p2">Parent 2 Genotype</label>
          <select class="tool-textarea" id="ps-p2">
            <option value="AaBb" selected>AaBb (Double Heterozygous)</option>
            <option value="aabb">aabb (Homozygous Recessive - Test Cross)</option>
            <option value="AABB">AABB (Homozygous Dominant)</option>
          </select>
        </div>
      </div>
      <div id="ps-dhy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ps-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9 : 3 : 3 : 1</span>
            <span class="stat-label">Mendelian Phenotypic Ratio</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ps-res-domdom" style="font-weight:700;">56.25% (9/16)</span>
            <span class="stat-label">Dominant / Dominant (A_B_)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('ps-p1'), p2El = document.getElementById('ps-p2');
  const ratResEl = document.getElementById('ps-res-ratio'), domResEl = document.getElementById('ps-res-domdom');

  function update() {
    const p1 = p1El.value, p2 = p2El.value;

    if (p1 === 'AaBb' && p2 === 'AaBb') {
      ratResEl.textContent = '9 : 3 : 3 : 1';
      domResEl.textContent = '56.25% (9/16) Dominant / Dominant';
    } else if ((p1 === 'AaBb' && p2 === 'aabb') || (p1 === 'aabb' && p2 === 'AaBb')) {
      ratResEl.textContent = '1 : 1 : 1 : 1 (Test Cross)';
      domResEl.textContent = '25.0% (1/4) Dominant / Dominant';
    } else {
      ratResEl.textContent = '100% Dominant (16/16)';
      domResEl.textContent = '100% Phenotypic Dominance';
    }
  }

  p1El.addEventListener('change', update);
  p2El.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select parental genotypes for two independent gene pairs (Gene A and Gene B).',
      'Inspect the resulting 16-cell Punnett square classical Mendelian phenotypic probability distribution.'
    ],
    benefitTitle: 'Gregor Mendel\'s Law of Independent Assortment',
    benefitContent: 'Alleles of two or more different genes sort into gametes independently of one another during meiosis, generating the canonical 9:3:3:1 phenotypic ratio in F2 progeny.',
    faqs: [{ q: 'What is the classical 9:3:3:1 ratio breakdown?', a: '9/16 Dominant/Dominant (A_B_), 3/16 Dominant/Recessive (A_bb), 3/16 Recessive/Dominant (aaB_), 1/16 Recessive/Recessive (aabb).' }]
  },

  // 5. Serial Dilution & Colony Forming Unit (CFU/mL) Calculator
  {
    slug: 'serial-dilution-colony-cfu-calculator',
    name: 'Serial Dilution & Colony Forming Units (CFU/mL) Calculator',
    description: 'Calculate viable bacterial cell concentration in Colony Forming Units per mL (CFU/mL = (Colonies Counted · Dilution Factor) / Plated Volume) from agar plates.',
    category: 'Science',
    icon: 'text',
    keywords: ['serial dilution calculator', 'cfu per ml calculator', 'colony forming units formula', 'microbiology plate count cfu calculator', '10 fold serial dilution online'],
    order: 343,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Colonies Counted, Dilution Factor & Volume Plated',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cfu-colonies">Colony Count (30 - 300)</label>
          <input class="tool-textarea" id="cfu-colonies" type="number" step="any" value="142" placeholder="142" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfu-dil">Dilution Factor (e.g. 10⁻⁴ = 10000)</label>
          <input class="tool-textarea" id="cfu-dil" type="number" step="any" value="10000" placeholder="10000 (for 10⁻⁴ plate)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfu-vol">Volume Plated (mL)</label>
          <input class="tool-textarea" id="cfu-vol" type="number" step="any" value="0.1" placeholder="0.1 mL (100 μL)" />
        </div>
      </div>
      <div id="cfu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cfu-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">1.42 × 10⁷ CFU / mL</span>
            <span class="stat-label">Viable Stock Concentration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cfu-res-status" style="color:var(--green-dark); font-weight:700;">Valid Standard Count (30-300 range)</span>
            <span class="stat-label">Statistical Validity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('cfu-colonies'), dEl = document.getElementById('cfu-dil'), vEl = document.getElementById('cfu-vol');
  const valResEl = document.getElementById('cfu-res-val'), stResEl = document.getElementById('cfu-res-status');

  function update() {
    const colonies = parseFloat(cEl.value), dilFactor = parseFloat(dEl.value), volMl = parseFloat(vEl.value);
    if (isNaN(colonies) || isNaN(dilFactor) || isNaN(volMl) || colonies < 0 || dilFactor <= 0 || volMl <= 0) return;

    // CFU / mL = (Colonies * Dilution Factor) / Volume_mL
    const cfuPerMl = (colonies * dilFactor) / volMl;

    valResEl.textContent = cfuPerMl.toExponential(2) + ' CFU / mL';

    if (colonies >= 30 && colonies <= 300) {
      stResEl.textContent = 'Valid Standard Count (30-300 range)';
      stResEl.style.color = '#22543d';
    } else if (colonies < 30) {
      stResEl.textContent = 'TFTC (Too Few To Count < 30 colonies)';
      stResEl.style.color = '#d97706';
    } else {
      stResEl.textContent = 'TNTC (Too Numerous To Count > 300 colonies)';
      stResEl.style.color = '#c53030';
    }
  }

  [cEl, dEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter the number of distinct visible colonies counted on the petri dish.',
      'Enter reciprocal dilution factor (e.g. 10⁴ = 10,000 for a 10⁻⁴ dilution).',
      'Enter volume spread onto agar plate in mL (0.1 mL = 100 μL).',
      'Inspect viable microbial stock concentration in CFU/mL.'
    ],
    benefitTitle: 'The 30 to 300 Colony Statistical Standard',
    benefitContent: 'Microbiological plate counts are statistically valid only between 30 and 300 colonies per plate: fewer than 30 introduces high sampling error (TFTC), while over 300 causes colony overlap and nutrient competition (TNTC).',
    faqs: [{ q: 'What is 142 colonies on a 10⁻⁴ plate spread with 0.1 mL?', a: 'CFU/mL = (142 × 10,000) / 0.1 mL = 14,200,000 = 1.42 × 10⁷ CFU/mL.' }]
  }
];

toolsSuiteFF.forEach(createTool);
console.log('Suite FF complete: 5 tools created.');
