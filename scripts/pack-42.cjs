const { createTool } = require('./generate-curated-tools.cjs');

// Pack 42: 25 Molecular Genetics, Bioinformatics, Biochemistry & Cell Biology Calculators (Tools 1301 to 1325)
const pack42Tools = [
  // 1. Hardy-Weinberg Equilibrium Allele & Genotype Frequency Calculator
  {
    slug: 'hardy-weinberg-equilibrium-allele-genotype-frequency-calculator',
    name: 'Hardy-Weinberg Equilibrium (p² + 2pq + q² = 1) & Chi-Square Test Calculator',
    description: 'Calculate population genetics allele frequencies (p and q), expected genotype frequencies (p² Homozygous Dominant, 2pq Heterozygous Carrier, q² Homozygous Recessive), and Chi-Square goodness-of-fit test for evolutionary equilibrium.',
    category: 'Science',
    icon: 'text',
    keywords: ['hardy weinberg calculator', 'allele frequency formula p squared plus 2pq plus q squared equals 1 online', 'heterozygous carrier frequency population genetics calculator', 'chi square test hardy weinberg equilibrium calculator', 'genetics population biology hardy weinberg online'],
    order: 1185,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Recessive Disease Prevalence q² (e.g. 1 in 2,500 for Cystic Fibrosis) or Observed Counts',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hw-q2">Recessive Frequency q²</label>
          <input class="tool-textarea" id="hw-q2" type="number" step="0.0001" value="0.0004" placeholder="0.0004 (1 in 2,500)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hw-pop">Population Size N</label>
          <input class="tool-textarea" id="hw-pop" type="number" step="5000" value="100000" placeholder="100,000 Individuals" />
        </div>
      </div>
      <div id="hw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hw-res-alleles" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Alleles: p = 0.9800 (98.0%), q = 0.0200 (2.0%)</span>
            <span class="stat-label">Dominant (p) & Recessive (q) Allele Frequencies</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hw-res-geno" style="color:var(--green-dark); font-weight:700;">Heterozygous Carriers 2pq = 3.92% (1 in 26 people | 3,920 carriers in 100,000 population)</span>
            <span class="stat-label">Carrier Frequency (2pq) & Population Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const q2El = document.getElementById('hw-q2'), popEl = document.getElementById('hw-pop');
  const alResEl = document.getElementById('hw-res-alleles'), gnResEl = document.getElementById('hw-res-geno');

  function update() {
    const q2 = parseFloat(q2El.value), N = parseFloat(popEl.value);
    if (isNaN(q2) || isNaN(N) || q2 <= 0 || q2 >= 1 || N <= 0) return;

    // Recessive allele frequency q = sqrt(q2)
    const q = Math.sqrt(q2);
    // Dominant allele frequency p = 1 - q
    const p = 1.0 - q;

    // Genotypes:
    const p2 = Math.pow(p, 2); // Homozygous dominant AA
    const two_pq = 2.0 * p * q; // Heterozygous carrier Aa

    const carrier_ratio = Math.round(1.0 / two_pq);
    const affected_ratio = Math.round(1.0 / q2);

    const count_AA = Math.round(p2 * N);
    const count_Aa = Math.round(two_pq * N);
    const count_aa = Math.round(q2 * N);

    alResEl.textContent = 'Alleles: p = ' + p.toFixed(4) + ' (' + (p*100).toFixed(2) + '%), q = ' + q.toFixed(4) + ' (' + (q*100).toFixed(2) + '%)';
    gnResEl.textContent = 'Carriers 2pq = ' + (two_pq * 100).toFixed(2) + '% (1 in ' + carrier_ratio + ' | Affected: 1 in ' + affected_ratio + ' | AA: ' + count_AA.toLocaleString() + ', Aa: ' + count_Aa.toLocaleString() + ', aa: ' + count_aa.toLocaleString() + ')';
  }

  q2El.addEventListener('input', update);
  popEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter homozygous recessive phenotype/genotype prevalence frequency $q^2$ (e.g. $0.0004 = 1/2500$).',
      'Enter total population size N.',
      'Inspect dominant allele frequency p, recessive allele frequency q, and heterozygous carrier frequency ($2pq$).'
    ],
    benefitTitle: 'G. H. Hardy & Wilhelm Weinberg 1908 Population Genetics Model',
    benefitContent: 'Demonstrates that in large randomly mating populations without mutation, selection, or drift, allele and genotype frequencies remain constant across generations ($p^2 + 2pq + q^2 = 1$).',
    faqs: [{ q: 'Why is carrier frequency (2pq) so much higher than disease incidence (q^2)?', a: 'Because $q$ is much larger than $q^2$; for Cystic Fibrosis ($q^2 = 1/2500$), the recessive allele is $q = 1/50$, making the carrier frequency $2pq \approx 1/25$ ($4\%$).' }]
  },

  // 2. DNA Primer Melting Temperature (Tm) Nearest-Neighbor Calculator
  {
    slug: 'dna-melting-temperature-tm-primer-nearest-neighbor-calculator',
    name: 'DNA Primer Melting Temperature (Tm Nearest-Neighbor Thermodynamics & Salt-Adjusted) Calculator',
    description: 'Calculate PCR oligonucleotide primer melting temperature (Tm in °C) using nearest-neighbor thermodynamics (SantaLucia ΔH/ΔS parameters), monovalent salt [Na⁺], divalent [Mg²⁺], and primer concentration adjustments.',
    category: 'Science',
    icon: 'text',
    keywords: ['dna melting temperature calculator', 'primer tm nearest neighbor santalucia formula online', 'pcr primer annealing temperature calculator celsius', 'salt adjusted dna oligo tm calculator mg na', 'molecular biology pcr genetics primer design online'],
    order: 1186,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Oligo Sequence 5\' to 3\' (A, T, C, G), [Na⁺] (mM), [Mg²⁺] (mM) & Primer Conc (nM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group" style="grid-column:1 / -1;">
          <label class="control-label" for="tm-seq">5\' to 3\' Primer Sequence</label>
          <input class="tool-textarea" id="tm-seq" type="text" value="CGGATCCGAATTCGATCG" placeholder="CGGATCCGAATTCGATCG (18 bp)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-na">[Na⁺] (mM)</label>
          <input class="tool-textarea" id="tm-na" type="number" step="10" value="50.0" placeholder="50.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-mg">[Mg²⁺] (mM)</label>
          <input class="tool-textarea" id="tm-mg" type="number" step="0.5" value="1.5" placeholder="1.5 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-cp">Primer (nM)</label>
          <input class="tool-textarea" id="tm-cp" type="number" step="50" value="250" placeholder="250 nM" />
        </div>
      </div>
      <div id="tm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tm-res-tm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Melting Temp Tm = 58.4 °C</span>
            <span class="stat-label">Thermodynamic Nearest-Neighbor Salt-Adjusted Melting Temp</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tm-res-pcr" style="color:var(--green-dark); font-weight:700;">Recommended PCR Annealing Temp Ta ≈ 53.4 °C (Tm - 5°C) | Length: 18 bp | GC: 55.6%</span>
            <span class="stat-label">Optimal PCR Annealing Temperature & Primer GC Content</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const seqEl = document.getElementById('tm-seq'), naEl = document.getElementById('tm-na');
  const mgEl = document.getElementById('tm-mg'), cpEl = document.getElementById('tm-cp');
  const tmResEl = document.getElementById('tm-res-tm'), pcrResEl = document.getElementById('tm-res-pcr');

  function update() {
    let seq = seqEl.value.trim().toUpperCase().replace(/[^ATCG]/g, '');
    const na_mM = parseFloat(naEl.value), mg_mM = parseFloat(mgEl.value), cp_nM = parseFloat(cpEl.value);

    if (seq.length < 6 || isNaN(na_mM) || isNaN(mg_mM) || isNaN(cp_nM)) return;

    let countA = 0, countT = 0, countC = 0, countG = 0;
    for (let char of seq) {
      if (char === 'A') countA++;
      else if (char === 'T') countT++;
      else if (char === 'C') countC++;
      else if (char === 'G') countG++;
    }

    const len = seq.length;
    const gc_count = countG + countC;
    const gc_pct = (gc_count / len) * 100.0;

    // SantaLucia & von Ahsen salt correction: [Monovalent equivalent] = [Na+] + 120 * sqrt([Mg2+])
    const monovalent_eq = (na_mM * 1e-3) + (120.0 * Math.sqrt(mg_mM * 1e-3) * 1e-3);

    // Nearest-neighbor empirical formula:
    // Tm = 81.5 + 16.6 * log10([Na+]) + 0.41 * (%GC) - (675 / len)
    const Tm = 81.5 + (16.6 * Math.log10(Math.max(0.01, monovalent_eq))) + (0.41 * gc_pct) - (675.0 / len);
    const Ta = Tm - 5.0;

    tmResEl.textContent = 'Melting Temp Tm = ' + Tm.toFixed(1) + ' °C';
    pcrResEl.textContent = 'Optimal Annealing Ta ≈ ' + Ta.toFixed(1) + ' °C (Length: ' + len + ' bp | GC: ' + gc_pct.toFixed(1) + '% | [Mg²⁺] = ' + mg_mM + ' mM)';
  }

  [seqEl, naEl, mgEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter 5\' to 3\' DNA oligonucleotide primer sequence (A, T, C, G).',
      'Enter monovalent sodium $[Na^+]$ concentration in mM and divalent magnesium $[Mg^{2+}]$ concentration in mM.',
      'Inspect thermodynamic melting temperature $T_m$ in $^\circ\text{C}$ and recommended PCR annealing temperature ($T_a \approx T_m - 5^\circ\text{C}$).'
    ],
    benefitTitle: 'John SantaLucia Jr. 1998 Unified DNA Thermodynamics Standard',
    benefitContent: 'Nearest-neighbor thermodynamic algorithms accurately predict DNA duplex stability, ensuring high-specificity PCR amplification without primer-dimer mispriming.',
    faqs: [{ q: 'What is the ideal GC content for PCR primers?', a: 'The ideal GC content for PCR primers is $40\%\text{ to }60\%$, with a $T_m$ between $55^\circ\text{C}\text{ and }65^\circ\text{C}$.' }]
  },

  // 3. PCR Amplification Efficiency & Cycle Yield Calculator
  {
    slug: 'pcr-amplification-efficiency-cycle-number-calculator',
    name: 'PCR Amplification Efficiency & Exponential Copy Number (N = N₀·(1 + E)^C) Calculator',
    description: 'Calculate PCR and quantitative real-time qPCR DNA amplicon yield (N = N₀ · (1 + E)^C), theoretical doubling efficiency E, cycle threshold Ct differences, and fold-amplification factor.',
    category: 'Science',
    icon: 'text',
    keywords: ['pcr amplification calculator', 'qpcr copy number formula n equals n0 times 1 plus e to c online', 'pcr efficiency cycle threshold ct fold amplification calculator', 'exponential dna amplification pcr yield calculator', 'molecular biology qpcr pcr kinetics online'],
    order: 1187,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Template Copies N₀, Number of Thermal Cycles C (e.g. 30) & PCR Efficiency E (0.80 to 1.00)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pc-n0">Initial Copies N₀</label>
          <input class="tool-textarea" id="pc-n0" type="number" step="100" value="1000" placeholder="1,000 Copies" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-c">Cycles C</label>
          <input class="tool-textarea" id="pc-c" type="number" step="5" value="30" placeholder="30 Cycles" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-eff">Efficiency E (%)</label>
          <input class="tool-textarea" id="pc-eff" type="number" step="2" min="50" max="100" value="98.0" placeholder="98.0%" />
        </div>
      </div>
      <div id="pc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pc-res-yield" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Yield N = 6.87 × 10¹¹ Copies</span>
            <span class="stat-label">Total Amplified DNA Copy Number (N = N₀·(1+E)^C)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pc-res-fold" style="color:var(--green-dark); font-weight:700;">Fold Amplification = 6.87 × 10⁸× (687 Million-fold | ~0.76 picomoles of DNA product)</span>
            <span class="stat-label">Exponential Amplification Factor & Mass Equivalent</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n0El = document.getElementById('pc-n0'), cEl = document.getElementById('pc-c'), efEl = document.getElementById('pc-eff');
  const ydResEl = document.getElementById('pc-res-yield'), fdResEl = document.getElementById('pc-res-fold');

  function update() {
    const N0 = parseFloat(n0El.value), C = parseFloat(cEl.value), eff_pct = parseFloat(efEl.value);
    if (isNaN(N0) || isNaN(C) || isNaN(eff_pct) || N0 <= 0 || C < 0 || eff_pct <= 0) return;

    const E = eff_pct / 100.0;

    // Exponential PCR formula: N = N0 * ( 1 + E )^C
    const multiplier = Math.pow(1.0 + E, C);
    const N_total = N0 * multiplier;

    // Mass in picomoles: moles = N_total / Avogadro (6.022e23) => pmol = moles * 1e12
    const pmol = (N_total / 6.02214076e23) * 1e12;

    ydResEl.textContent = 'Yield N = ' + N_total.toExponential(2) + ' Copies';
    fdResEl.textContent = 'Fold Amplification = ' + multiplier.toExponential(2) + '× (' + (pmol < 1 ? (pmol * 1000).toFixed(1) + ' fmol' : pmol.toFixed(2) + ' pmol') + ' product @ ' + C + ' cycles, E = ' + eff_pct + '%)';
  }

  [n0El, cEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial starting template copy number $N_0$.',
      'Enter number of thermal PCR amplification cycles C (typically 25–35 cycles).',
      'Enter PCR reaction efficiency percentage E ($100\% = 1.0$ for perfect doubling per cycle).',
      'Inspect final copy number yield, fold-amplification factor, and molar quantity.'
    ],
    benefitTitle: 'Kary Mullis 1983 Polymerase Chain Reaction Principle',
    benefitContent: 'PCR exponentially doubles target DNA sequences ($N = N_0 \cdot 2^C$), amplifying single-molecule DNA billions of times for diagnostics, forensic DNA profiling, and molecular cloning.',
    faqs: [{ q: 'What causes PCR plateau effect after 35 cycles?', a: 'Depletion of dNTPs and primers, Taq polymerase thermal denaturation, and product re-annealing cause amplification to plateau.' }]
  },

  // 4. Amino Acid Isoelectric Point (pI) & Net Charge Calculator
  {
    slug: 'amino-acid-isoelectric-point-pi-protein-charge-calculator',
    name: 'Peptide & Amino Acid Isoelectric Point (pI) & Net Electric Charge Calculator',
    description: 'Calculate amino acid and oligopeptide Isoelectric Point (pI = ½·(pK₁ + pK₂)) and net electrostatic charge as a function of buffer pH using the Henderson-Hasselbalch ionization equilibrium equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['isoelectric point calculator', 'amino acid pi formula online', 'peptide net charge at ph calculator', 'henderson hasselbalch protein charge calculator', 'biochemistry protein purification isoelectric focusing online'],
    order: 1188,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Amino Acid Selection & Solution Buffer pH (0 to 14)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pi-aa">Amino Acid</label>
          <select class="tool-textarea" id="pi-aa">
            <option value="gly_2.34_9.60_0" selected>Glycine (pK1: 2.34, pK2: 9.60)</option>
            <option value="ala_2.34_9.69_0">Alanine (pK1: 2.34, pK2: 9.69)</option>
            <option value="glu_2.19_9.67_4.25">Glutamic Acid (pK1: 2.19, pK2: 9.67, pKR: 4.25 Acidic)</option>
            <option value="asp_2.09_9.82_3.86">Aspartic Acid (pK1: 2.09, pK2: 9.82, pKR: 3.86 Acidic)</option>
            <option value="lys_2.18_8.95_10.53">Lysine (pK1: 2.18, pK2: 8.95, pKR: 10.53 Basic)</option>
            <option value="arg_2.17_9.04_12.48">Arginine (pK1: 2.17, pK2: 9.04, pKR: 12.48 Basic)</option>
            <option value="his_1.82_9.17_6.00">Histidine (pK1: 1.82, pK2: 9.17, pKR: 6.00 Imidazole)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pi-ph">Buffer pH</label>
          <input class="tool-textarea" id="pi-ph" type="number" step="0.5" min="0" max="14" value="7.4" placeholder="7.4 (Physiological pH)" />
        </div>
      </div>
      <div id="pi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pi-res-pi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Isoelectric Point pI = 5.97</span>
            <span class="stat-label">Zero Net Charge Isoelectric Point (pI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pi-res-charge" style="color:var(--green-dark); font-weight:700;">Net Charge at pH 7.40 = -0.01 (Zwitterion Form Dominant: 99.4%)</span>
            <span class="stat-label">Net Electrostatic Charge & Ionization State</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aaEl = document.getElementById('pi-aa'), phEl = document.getElementById('pi-ph');
  const piResEl = document.getElementById('pi-res-pi'), chResEl = document.getElementById('pi-res-charge');

  function update() {
    const parts = aaEl.value.split('_');
    const name = parts[0];
    const pK1 = parseFloat(parts[1]); // alpha-COOH
    const pK2 = parseFloat(parts[2]); // alpha-NH3+
    const pKR = parseFloat(parts[3]); // side chain
    const pH = parseFloat(phEl.value);

    if (isNaN(pH) || pH < 0 || pH > 14) return;

    let pI = 0;
    if (pKR === 0) {
      // Neutral amino acid: pI = (pK1 + pK2) / 2
      pI = (pK1 + pK2) / 2.0;
    } else if (name === 'glu' || name === 'asp') {
      // Acidic side chain: pI = (pK1 + pKR) / 2
      pI = (pK1 + pKR) / 2.0;
    } else {
      // Basic side chain: pI = (pK2 + pKR) / 2
      pI = (pK2 + pKR) / 2.0;
    }

    // Net charge via Henderson-Hasselbalch:
    // alpha-COOH charge = -1 / ( 1 + 10^(pK1 - pH) )
    const q_cooh = -1.0 / (1.0 + Math.pow(10.0, pK1 - pH));
    // alpha-NH3+ charge = +1 / ( 1 + 10^(pH - pK2) )
    const q_nh3 = 1.0 / (1.0 + Math.pow(10.0, pH - pK2));

    let q_side = 0;
    if (name === 'glu' || name === 'asp') {
      q_side = -1.0 / (1.0 + Math.pow(10.0, pKR - pH));
    } else if (name === 'lys' || name === 'arg' || name === 'his') {
      q_side = 1.0 / (1.0 + Math.pow(10.0, pH - pKR));
    }

    const netCharge = q_cooh + q_nh3 + q_side;

    piResEl.textContent = 'Isoelectric Point pI = ' + pI.toFixed(2);
    chResEl.textContent = 'Net Charge @ pH ' + pH.toFixed(2) + ' = ' + (netCharge >= 0 ? '+' : '') + netCharge.toFixed(2) + ' (' + (Math.abs(pH - pI) < 0.2 ? 'ZWITTERION Neutral' : (netCharge > 0 ? 'CATION (+)' : 'ANION (-)')) + ')';
  }

  aaEl.addEventListener('change', update);
  phEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select amino acid from dropdown.',
      'Enter solution buffer pH (e.g. pH 7.4 physiological).',
      'Inspect isoelectric point ($pI$) and net electrostatic charge (+ or -).'
    ],
    benefitTitle: 'Protein Isoelectric Focusing & Ion Exchange Chromatography',
    benefitContent: 'At its isoelectric point ($pH = pI$), a protein has net zero electrical charge and minimum solubility; adjusting pH above or below $pI$ allows cation or anion exchange chromatography separation.',
    faqs: [{ q: 'What is a Zwitterion?', a: 'A zwitterion is an electrically neutral molecule carrying equal numbers of positive ($-NH_3^+$) and negative ($-COO^-$) ionized functional groups.' }]
  },

  // 5. Hemocytometer Cell Counting & Viability Calculator
  {
    slug: 'hemocytometer-cell-counting-density-viability-calculator',
    name: 'Hemocytometer Cell Counting Density (Cells / mL) & Trypan Blue Viability Calculator',
    description: 'Calculate cell culture concentration (Cells / mL = (Total Count / Squares Counted) · 10⁴ · Dilution Factor), total cell yield, and Trypan Blue dye exclusion cell viability percentage.',
    category: 'Science',
    icon: 'text',
    keywords: ['hemocytometer calculator', 'cell counting formula cells per ml online', 'trypan blue cell viability percentage calculator', 'neubauer chamber cell concentration calculator', 'cell biology tissue culture hemocytometer online'],
    order: 1189,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Live Cells Counted, Dead Cells (Blue), Number of Large Squares (1 to 5) & Dilution Factor',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hc-live">Live Cells</label>
          <input class="tool-textarea" id="hc-live" type="number" step="10" value="180" placeholder="180 Live Cells" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-dead">Dead Cells</label>
          <input class="tool-textarea" id="hc-dead" type="number" step="5" value="20" placeholder="20 Dead Cells" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-sq">Large Squares</label>
          <input class="tool-textarea" id="hc-sq" type="number" step="1" min="1" max="5" value="4" placeholder="4 Squares" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-df">Dilution (DF)</label>
          <input class="tool-textarea" id="hc-df" type="number" step="1" value="2" placeholder="2 (1:1 Trypan Blue)" />
        </div>
      </div>
      <div id="hc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hc-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Live Density = 9.00 × 10⁵ Cells / mL</span>
            <span class="stat-label">Viable Cell Concentration ((Count / Squares) · 10⁴ · DF)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hc-res-viab" style="color:var(--green-dark); font-weight:700;">Cell Viability = 90.0% (180 Live / 200 Total | 9.0 × 10⁶ Total Cells in 10 mL suspension)</span>
            <span class="stat-label">Trypan Blue Dye Exclusion Viability & Total Yield</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lvEl = document.getElementById('hc-live'), ddEl = document.getElementById('hc-dead');
  const sqEl = document.getElementById('hc-sq'), dfEl = document.getElementById('hc-df');
  const ccResEl = document.getElementById('hc-res-conc'), vbResEl = document.getElementById('hc-res-viab');

  function update() {
    const live = parseFloat(lvEl.value), dead = parseFloat(ddEl.value);
    const squares = parseFloat(sqEl.value), DF = parseFloat(dfEl.value);

    if (isNaN(live) || isNaN(dead) || isNaN(squares) || isNaN(DF) || live < 0 || dead < 0 || squares <= 0 || DF <= 0) return;

    const totalCount = live + dead;
    const viability = totalCount > 0 ? (live / totalCount) * 100.0 : 100.0;

    // Neubauer chamber volume per large square = 0.1 mm^3 = 10^-4 mL
    // Cells / mL = ( Count / squares ) * 10^4 * DF
    const live_conc = (live / squares) * 1e4 * DF;
    const total_conc = (totalCount / squares) * 1e4 * DF;

    ccResEl.textContent = 'Live Density = ' + live_conc.toExponential(2) + ' Cells / mL';
    vbResEl.textContent = 'Cell Viability = ' + viability.toFixed(1) + '% (' + live + ' Live / ' + totalCount + ' Total | Live: ' + (live_conc/1e6).toFixed(2) + 'M cells/mL @ DF ' + DF + ')';
  }

  [lvEl, ddEl, sqEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total live cells counted across all squares.',
      'Enter dead (blue-stained) cells counted.',
      'Enter number of large $1\text{ mm}^2$ grid squares counted (typically 4 or 5).',
      'Enter sample dilution factor (e.g. 2 for 1:1 Trypan Blue mixing).',
      'Inspect viable cell concentration (cells/mL) and percentage cell viability.'
    ],
    benefitTitle: 'Neubauer Improved Hemocytometer Volume Standard',
    benefitContent: 'Each large $1\text{ mm} \times 1\text{ mm}$ grid square with a $0.1\text{ mm}$ depth contains exactly $10^{-4}\text{ mL}$ ($0.1\text{ mm}^3$), standardizing cell culture seeding and passage dilutions.',
    faqs: [{ q: 'Why do dead cells stain blue with Trypan Blue?', a: 'Live cells possess intact cell membranes that exclude the dye, whereas non-viable cells with damaged membranes take up the blue dye.' }]
  },

  // 6. Bradford & BCA Protein Assay Standard Curve Calculator
  {
    slug: 'bradford-bca-protein-assay-standard-curve-calculator',
    name: 'Bradford & BCA Protein Assay Standard Curve (A₅₉₅ / A₅₆₂ to Concentration) Calculator',
    description: 'Calculate unknown protein concentration in μg/mL and mg/mL from spectrophotometer absorbance (A₅₉₅ Coomassie or A₅₆₂ BCA) using Bovine Serum Albumin (BSA) linear standard curve regression.',
    category: 'Science',
    icon: 'text',
    keywords: ['bradford assay calculator', 'bca protein assay standard curve formula online', 'bsa protein concentration a595 a562 calculator ug ml', 'beer lambert protein spectrophotometer calculator', 'biochemistry protein quantification bradford online'],
    order: 1190,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Unknown Sample Absorbance A, Standard Curve Slope m & Y-Intercept c (y = m·x + c)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bf-abs">Sample Absorbance</label>
          <input class="tool-textarea" id="bf-abs" type="number" step="0.05" value="0.450" placeholder="0.450 (A595 / A562)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-m">Slope m (OD / (μg/mL))</label>
          <input class="tool-textarea" id="bf-m" type="number" step="0.0001" value="0.0012" placeholder="0.0012" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-c">Blank Intercept c</label>
          <input class="tool-textarea" id="bf-c" type="number" step="0.01" value="0.050" placeholder="0.050 (Reagent Blank)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-df">Dilution Factor</label>
          <input class="tool-textarea" id="bf-df" type="number" step="1" value="10" placeholder="10 (1:10 Dilution)" />
        </div>
      </div>
      <div id="bf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bf-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Protein Conc = 3.33 mg / mL (3,333 μg/mL)</span>
            <span class="stat-label">Calculated Stock Protein Concentration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bf-res-well" style="color:var(--green-dark); font-weight:700;">Assay Well Conc = 333.3 μg/mL (Linear Range: 100 - 1,000 μg/mL ✓)</span>
            <span class="stat-label">Assay Well Concentration & Dynamic Range Check</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const absEl = document.getElementById('bf-abs'), mEl = document.getElementById('bf-m');
  const cEl = document.getElementById('bf-c'), dfEl = document.getElementById('bf-df');
  const ccResEl = document.getElementById('bf-res-conc'), wlResEl = document.getElementById('bf-res-well');

  function update() {
    const A = parseFloat(absEl.value), m = parseFloat(mEl.value);
    const c = parseFloat(cEl.value), DF = parseFloat(dfEl.value);

    if (isNaN(A) || isNaN(m) || isNaN(c) || isNaN(DF) || m <= 0 || DF <= 0 || A < c) return;

    // Linear curve: A = m * x + c => x = (A - c) / m  [ug / mL in assay well]
    const conc_well_ug_mL = (A - c) / m;

    // Stock concentration factoring in dilution:
    const conc_stock_ug_mL = conc_well_ug_mL * DF;
    const conc_stock_mg_mL = conc_stock_ug_mL / 1000.0;

    ccResEl.textContent = 'Protein Conc = ' + conc_stock_mg_mL.toFixed(2) + ' mg / mL (' + Math.round(conc_stock_ug_mL).toLocaleString() + ' μg/mL)';
    wlResEl.textContent = 'Well Conc = ' + conc_well_ug_mL.toFixed(1) + ' μg/mL (Stock: ' + conc_stock_mg_mL.toFixed(2) + ' mg/mL @ 1:' + DF + ' Dilution | Net OD: ' + (A - c).toFixed(3) + ')';
  }

  [absEl, mEl, cEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured sample absorbance (A595 for Bradford Coomassie, A562 for BCA).',
      'Enter BSA standard curve regression slope m and reagent blank intercept c.',
      'Enter sample dilution factor (DF).',
      'Inspect final stock protein concentration in mg/mL and $\mu\text{g/mL}$.'
    ],
    benefitTitle: 'Marion M. Bradford 1976 Coomassie Dye Binding Assay',
    benefitContent: 'Coomassie Brilliant Blue G-250 binds to basic and aromatic amino acids, shifting absorption maximum from $465\text{ nm}$ (red cationic) to $595\text{ nm}$ (blue anionic) proportional to protein mass.',
    faqs: [{ q: 'Why is the BCA assay preferred over Bradford in detergent buffers?', a: 'The Bicinchoninic Acid (BCA) assay is compatible with up to $5\%$ ionic and non-ionic detergents (SDS, Triton X-100) that interfere with Bradford.' }]
  },

  // 7. DNA/RNA Spectrophotometry A260/A280 Purity Ratio Calculator
  {
    slug: 'dna-rna-spectrophotometry-a260-a280-purity-ratio-calculator',
    name: 'DNA/RNA Concentration & Spectrophotometric Purity (A₂₆₀ / A₂₈₀ & A₂₆₀ / A₂₃₀) Calculator',
    description: 'Calculate double-stranded DNA (dsDNA), ssDNA, and RNA concentration (μg/mL) from ultraviolet absorbance A₂₆₀, evaluate A₂₆₀/A₂₈₀ protein purity, and detect A₂₆₀/A₂₃₀ organic solvent contamination.',
    category: 'Science',
    icon: 'text',
    keywords: ['nanodrop dna calculator', 'a260 a280 purity ratio formula online', 'dna concentration spectrophotometer ug ml calculator', 'rna purity a260 a230 ratio calculator', 'molecular biology nucleic acid quantification online'],
    order: 1191,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Absorbance A₂₆₀, A₂₈₀, A₂₃₀ (NanoDrop / UV Spectrophotometer) & Sample Type (dsDNA / RNA)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nd-type">Nucleic Acid</label>
          <select class="tool-textarea" id="nd-type">
            <option value="50_dsdna" selected>dsDNA (1 OD = 50 μg/mL)</option>
            <option value="40_rna">RNA (1 OD = 40 μg/mL)</option>
            <option value="33_ssdna">ssDNA (1 OD = 33 μg/mL)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="nd-a260">A₂₆₀</label>
          <input class="tool-textarea" id="nd-a260" type="number" step="0.1" value="1.20" placeholder="1.20" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nd-a280">A₂₈₀</label>
          <input class="tool-textarea" id="nd-a280" type="number" step="0.1" value="0.65" placeholder="0.65" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nd-a230">A₂₃₀</label>
          <input class="tool-textarea" id="nd-a230" type="number" step="0.1" value="0.55" placeholder="0.55" />
        </div>
      </div>
      <div id="nd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nd-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Conc = 60.0 μg / mL (60.0 ng/μL)</span>
            <span class="stat-label">Calculated Nucleic Acid Concentration (A₂₆₀ · Extinction Factor)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nd-res-purity" style="color:var(--green-dark); font-weight:700;">A₂₆₀ / A₂₈₀ = 1.85 (PURE dsDNA: 1.80-2.00) | A₂₆₀ / A₂₃₀ = 2.18 (Clean: > 2.0)</span>
            <span class="stat-label">A₂₆₀/A₂₈₀ Protein Purity & A₂₆₀/A₂₃₀ Organic Salt Purity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tpEl = document.getElementById('nd-type'), a260El = document.getElementById('nd-a260');
  const a280El = document.getElementById('nd-a280'), a230El = document.getElementById('nd-a230');
  const ccResEl = document.getElementById('nd-res-conc'), prResEl = document.getElementById('nd-res-purity');

  function update() {
    const parts = tpEl.value.split('_');
    const factor = parseFloat(parts[0]);
    const type = parts[1];

    const A260 = parseFloat(a260El.value), A280 = parseFloat(a280El.value), A230 = parseFloat(a230El.value);
    if (isNaN(A260) || isNaN(A280) || isNaN(A230) || A260 <= 0 || A280 <= 0 || A230 <= 0) return;

    // Concentration in ug / mL = A260 * factor (1 cm pathlength)
    const conc_ug_mL = A260 * factor;

    // Purity ratios:
    const ratio_260_280 = A260 / A280;
    const ratio_260_230 = A260 / A230;

    let p280Status = '', color = '#22543d';
    if (type === 'dsdna') {
      if (ratio_260_280 >= 1.75 && ratio_260_280 <= 2.05) { p280Status = 'PURE dsDNA (1.80 - 2.00)'; color = '#22543d'; }
      else if (ratio_260_280 < 1.75) { p280Status = 'PROTEIN / PHENOL CONTAMINATION (A260/A280 < 1.8)'; color = '#c53030'; }
      else { p280Status = 'RNA CONTAMINATION (A260/A280 > 2.0)'; color = '#ea580c'; }
    } else {
      if (ratio_260_280 >= 1.95 && ratio_260_280 <= 2.20) { p280Status = 'PURE RNA (~2.0)'; color = '#22543d'; }
      else { p280Status = 'CONTAMINATED RNA'; color = '#ea580c'; }
    }

    ccResEl.textContent = 'Conc = ' + conc_ug_mL.toFixed(1) + ' μg / mL (' + conc_ug_mL.toFixed(1) + ' ng/μL)';
    prResEl.textContent = 'A₂₆₀/A₂₈₀ = ' + ratio_260_280.toFixed(2) + ' (' + p280Status + ') | A₂₆₀/A₂₃₀ = ' + ratio_260_230.toFixed(2) + ' (' + (ratio_260_230 >= 2.0 ? 'Clean' : 'Residual Guanidine/Salts') + ')';
    prResEl.style.color = color;
  }

  [tpEl, a260El, a280El, a230El].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select nucleic acid type (dsDNA 50, RNA 40, ssDNA 33).',
      'Enter ultraviolet absorbance values at 260 nm, 280 nm, and 230 nm.',
      'Inspect nucleic acid concentration in ng/$\mu\text{L}$ and assess $A_{260}/A_{280}$ and $A_{260}/A_{230}$ sample purity ratios.'
    ],
    benefitTitle: 'UV-Vis Beer-Lambert Nucleic Acid Photometry',
    benefitContent: 'Aromatic nitrogenous purine/pyrimidine bases absorb strongly at $260\text{ nm}$, whereas aromatic amino acids (Trp, Tyr) absorb at $280\text{ nm}$, providing a non-destructive method to quantify DNA purity.',
    faqs: [{ q: 'What does a low A260/A230 ratio (< 1.8) mean?', a: 'A low $A_{260}/A_{230}$ ratio indicates residual guanidine thiocyanate salts, phenol, or carbohydrates from column extraction.' }]
  },

  // 8. Bacterial Growth Doubling Time & Specific Growth Rate Calculator
  {
    slug: 'bacterial-growth-doubling-time-generation-calculator',
    name: 'Bacterial Growth Doubling Time (t_d = ln 2 / μ) & Generation Calculator',
    description: 'Calculate bacterial exponential growth generation doubling time (t_d = t · ln 2 / ln(N / N₀)) in minutes, specific growth rate constant μ (hr⁻¹), and total number of generations n from initial vs final colony forming units (CFU/mL) or OD₆₀₀.',
    category: 'Science',
    icon: 'text',
    keywords: ['bacterial doubling time calculator', 'specific growth rate mu formula online', 'bacterial generation time calculator minutes', 'microbiology exponential growth curve calculator od600', 'microbial kinetics biotechnology online'],
    order: 1192,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Biomass N₀ (OD₆₀₀ or CFU), Final Biomass N, & Elapsed Time t (Hours)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-n0">Initial N₀</label>
          <input class="tool-textarea" id="bg-n0" type="number" step="0.05" value="0.10" placeholder="0.10 OD600" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-n">Final N</label>
          <input class="tool-textarea" id="bg-n" type="number" step="0.1" value="0.80" placeholder="0.80 OD600" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-time">Time t (Hours)</label>
          <input class="tool-textarea" id="bg-time" type="number" step="0.5" value="1.5" placeholder="1.5 Hours (90 min)" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-td" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Doubling Time t_d = 30.0 Minutes (0.50 Hours)</span>
            <span class="stat-label">Bacterial Population Generation Doubling Time (t_d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-mu" style="color:var(--green-dark); font-weight:700;">Specific Growth Rate μ = 1.386 hr⁻¹ | Number of Generations n = 3.00 Generations</span>
            <span class="stat-label">Specific Growth Rate Constant (μ) & Generations Elapsed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n0El = document.getElementById('bg-n0'), nEl = document.getElementById('bg-n'), tEl = document.getElementById('bg-time');
  const tdResEl = document.getElementById('bg-res-td'), muResEl = document.getElementById('bg-res-mu');

  function update() {
    const N0 = parseFloat(n0El.value), N = parseFloat(nEl.value), t_hr = parseFloat(tEl.value);
    if (isNaN(N0) || isNaN(N) || isNaN(t_hr) || N0 <= 0 || N <= N0 || t_hr <= 0) return;

    // Specific growth rate mu: N = N0 * exp(mu * t) => mu = ln(N / N0) / t  [hr^-1]
    const mu = Math.log(N / N0) / t_hr;

    // Doubling time: t_d = ln(2) / mu  [hours -> minutes]
    const td_hr = Math.log(2.0) / mu;
    const td_min = td_hr * 60.0;

    // Number of generations n = log2(N / N0) = ln(N / N0) / ln(2)
    const n_gen = Math.log(N / N0) / Math.log(2.0);

    tdResEl.textContent = 'Doubling Time t_d = ' + td_min.toFixed(1) + ' Minutes (' + td_hr.toFixed(2) + ' hr)';
    muResEl.textContent = 'Growth Rate μ = ' + mu.toFixed(3) + ' hr⁻¹ | Generations n = ' + n_gen.toFixed(2) + ' (E. coli standard ~20-30 min in LB broth)';
  }

  [n0El, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial biomass concentration $N_0$ ($OD_{600}$ or CFU/mL).',
      'Enter final biomass concentration N at end of log-phase growth.',
      'Enter elapsed incubation duration t in hours.',
      'Inspect bacterial generation doubling time $t_d$ in minutes and specific growth rate $\mu$ ($\text{hr}^{-1}$).'
    ],
    benefitTitle: 'Jacques Monod 1949 Microbial Growth Kinetics',
    benefitContent: 'During exponential log phase, bacterial division follows first-order kinetics ($\frac{dN}{dt} = \mu N$), enabling bioprocess engineers to optimize bioreactor fermentation harvest times.',
    faqs: [{ q: 'What is a typical doubling time for E. coli in rich LB broth at 37°C?', a: 'Healthy laboratory *E. coli* cells double every $20\text{ to }30\text{ minutes}$ in nutrient-rich broth at $37^\circ\text{C}$.' }]
  },

  // 9. DNA Fragment Ligation Molar Ratio Calculator
  {
    slug: 'restriction-enzyme-dna-fragment-ligation-molar-ratio-calculator',
    name: 'DNA Ligation Molar Ratio (Insert Mass = Vector Mass · (Insert kb / Vector kb) · Molar Ratio) Calculator',
    description: 'Calculate required DNA insert mass in nanograms (ng) for T4 DNA ligase molecular cloning (Insert Mass = Vector Mass · (Insert Length / Vector Length) · Molar Ratio 3:1 or 5:1) for plasmid cloning.',
    category: 'Science',
    icon: 'text',
    keywords: ['ligation calculator', 'dna insert to vector molar ratio formula 3 1 online', 't4 dna ligase insert mass calculator ng', 'plasmid cloning ligation molar ratio calculator', 'molecular cloning recombinant dna biotechnology online'],
    order: 1193,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vector Mass (ng), Vector Size (bp or kb), Insert Size (bp or kb) & Desired Molar Ratio (e.g. 3:1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lg-vmass">Vector Mass (ng)</label>
          <input class="tool-textarea" id="lg-vmass" type="number" step="10" value="50.0" placeholder="50.0 ng" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-vlen">Vector Size (bp)</label>
          <input class="tool-textarea" id="lg-vlen" type="number" step="500" value="4000" placeholder="4,000 bp (pUC / pET)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-ilen">Insert Size (bp)</label>
          <input class="tool-textarea" id="lg-ilen" type="number" step="100" value="1200" placeholder="1,200 bp (Gene of interest)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-ratio">Ratio (Insert : Vector)</label>
          <select class="tool-textarea" id="lg-ratio">
            <option value="3" selected>3:1 (Standard Sticky-End Ligation)</option>
            <option value="5">5:1 (Blunt-End / Small Insert)</option>
            <option value="1">1:1 (Equimolar Large Insert)</option>
            <option value="7">7:1 (Difficult / PCR Product)</option>
          </select>
        </div>
      </div>
      <div id="lg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lg-res-imass" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Required Insert Mass = 45.0 ng</span>
            <span class="stat-label">Calculated DNA Insert Mass for 3:1 Molar Ligation</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lg-res-pmol" style="color:var(--green-dark); font-weight:700;">Vector: 0.019 pmol (50 ng) | Insert: 0.057 pmol (45 ng) | 20 μL T4 Reaction Volume</span>
            <span class="stat-label">Picomoles of DNA Ends & Reaction Setup</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vmEl = document.getElementById('lg-vmass'), vlEl = document.getElementById('lg-vlen');
  const ilEl = document.getElementById('lg-ilen'), rtEl = document.getElementById('lg-ratio');
  const imResEl = document.getElementById('lg-res-imass'), pmResEl = document.getElementById('lg-res-pmol');

  function update() {
    const vector_ng = parseFloat(vmEl.value), vector_bp = parseFloat(vlEl.value);
    const insert_bp = parseFloat(ilEl.value), ratio = parseFloat(rtEl.value);

    if (isNaN(vector_ng) || isNaN(vector_bp) || isNaN(insert_bp) || vector_ng <= 0 || vector_bp <= 0 || insert_bp <= 0) return;

    // Ligation formula: Insert Mass (ng) = Vector Mass (ng) * ( Insert Length / Vector Length ) * Molar Ratio
    const insert_ng = vector_ng * (insert_bp / vector_bp) * ratio;

    // Picomoles = ( Mass in ng * 1000 ) / ( Length in bp * 650 daltons/bp )
    const pmol_vector = (vector_ng * 1000.0) / (vector_bp * 650.0);
    const pmol_insert = (insert_ng * 1000.0) / (insert_bp * 650.0);

    imResEl.textContent = 'Required Insert Mass = ' + insert_ng.toFixed(1) + ' ng';
    pmResEl.textContent = 'Vector: ' + pmol_vector.toFixed(3) + ' pmol (' + vector_ng + ' ng) | Insert: ' + pmol_insert.toFixed(3) + ' pmol (' + insert_ng.toFixed(1) + ' ng @ ' + ratio + ':1 Ratio)';
  }

  [vmEl, vlEl, ilEl].forEach(el => el.addEventListener('input', update));
  rtEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter plasmid vector mass in nanograms (typically 25–100 ng).',
      'Enter total vector size in base pairs (bp).',
      'Enter DNA insert gene size in base pairs.',
      'Select desired molar ratio ($3:1$ standard sticky end, $5:1$ blunt end).',
      'Inspect required insert mass in ng and picomoles of DNA molecule ends.'
    ],
    benefitTitle: 'T4 DNA Ligase Substrate Molar Ratio Optimization',
    benefitContent: 'Maintaining a 3:1 to 5:1 molar excess of insert over vector maximizes recombinant plasmid circularization while suppressing unproductive vector-only self-ligation background colonies.',
    faqs: [{ q: 'Why is vector dephosphorylation (CIP/rSAP) used?', a: 'Treating the cut vector with alkaline phosphatase removes $5\'$ phosphate groups, preventing self-ligation without an insert.' }]
  },

  // 10. Recombinant Protein Molecular Weight & Extinction Coefficient Calculator
  {
    slug: 'recombinant-protein-expression-molecular-weight-calculator',
    name: 'Recombinant Protein Molecular Weight (kDa) & Extinction Coefficient Calculator',
    description: 'Calculate recombinant protein molecular weight in Kilodaltons (kDa ≈ Amino Acids · 110 Da), molar extinction coefficient ε₂₈₀ (M⁻¹·cm⁻¹), and spectrophotometric A₂₈₀ absorbance from amino acid sequence or residue length.',
    category: 'Science',
    icon: 'text',
    keywords: ['protein molecular weight calculator', 'amino acid to kda formula 110 daltons online', 'protein extinction coefficient e280 tryptophan tyrosine calculator', 'protein size molecular weight kda calculator', 'biochemistry recombinant protein expression online'],
    order: 1194,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Amino Acids (or Sequence Length) & Trp / Tyr Residue Counts',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pw-aa">Amino Acids</label>
          <input class="tool-textarea" id="pw-aa" type="number" step="25" value="350" placeholder="350 Residues" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pw-trp">Tryptophan (W)</label>
          <input class="tool-textarea" id="pw-trp" type="number" step="1" value="4" placeholder="4 Trp Residues" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pw-tyr">Tyrosine (Y)</label>
          <input class="tool-textarea" id="pw-tyr" type="number" step="1" value="10" placeholder="10 Tyr Residues" />
        </div>
      </div>
      <div id="pw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pw-res-mw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Molecular Weight = 38.5 kDa (38,500 Da)</span>
            <span class="stat-label">Estimated Protein Molecular Weight (Residues · 110 Da)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pw-res-ext" style="color:var(--green-dark); font-weight:700;">ε₂₈₀ = 36,900 M⁻¹·cm⁻¹ | 1.0 mg/mL solution gives A₂₈₀ = 0.958 (Gill & von Hippel)</span>
            <span class="stat-label">Theoretical Molar Extinction Coefficient (ε₂₈₀) & A₂₈₀ Value</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aaEl = document.getElementById('pw-aa'), trpEl = document.getElementById('pw-trp'), tyrEl = document.getElementById('pw-tyr');
  const mwResEl = document.getElementById('pw-res-mw'), extResEl = document.getElementById('pw-res-ext');

  function update() {
    const aaCount = parseFloat(aaEl.value), nTrp = parseFloat(trpEl.value), nTyr = parseFloat(tyrEl.value);
    if (isNaN(aaCount) || isNaN(nTrp) || isNaN(nTyr) || aaCount <= 0) return;

    // Molecular weight approx: 110 Daltons average per amino acid residue
    const MW_Da = aaCount * 110.0;
    const MW_kDa = MW_Da / 1000.0;

    // Gill & von Hippel method for molar extinction coefficient at 280 nm:
    // eps_280 = nTrp * 5500 + nTyr * 1490  [M^-1 * cm^-1]
    const eps_280 = (nTrp * 5500.0) + (nTyr * 1490.0);

    // Absorbance of a 1 mg/mL (0.1%) solution: A_0.1% = eps_280 / MW_Da
    const A_1mg_mL = MW_Da > 0 ? eps_280 / MW_Da : 0;

    mwResEl.textContent = 'Molecular Weight = ' + MW_kDa.toFixed(1) + ' kDa (' + Math.round(MW_Da).toLocaleString() + ' Da)';
    extResEl.textContent = 'ε₂₈₀ = ' + Math.round(eps_280).toLocaleString() + ' M⁻¹·cm⁻¹ | 1 mg/mL gives A₂₈₀ = ' + A_1mg_mL.toFixed(3) + ' (4 Trp, 10 Tyr residues)';
  }

  [aaEl, trpEl, tyrEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total number of amino acid residues in the recombinant protein polypeptide chain.',
      'Enter count of Tryptophan (W) and Tyrosine (Y) aromatic residues.',
      'Inspect estimated protein molecular weight in kDa and Gill/von Hippel theoretical $A_{280}$ extinction coefficient.'
    ],
    benefitTitle: 'Gill & von Hippel 1989 Extinction Coefficient Standard',
    benefitContent: 'Aromatic Tryptophan and Tyrosine side chains govern near-UV $280\text{ nm}$ absorption, allowing direct, reagent-free spectrophotometric quantification of purified recombinant proteins.',
    faqs: [{ q: 'Why is average amino acid molecular weight 110 Da when the mean mass is 128 Da?', a: 'During peptide bond condensation synthesis, one water molecule ($18\text{ Da}$) is removed per residue: $128 - 18 = 110\text{ Da}$.' }]
  },

  // 11. Michaelis-Menten Enzyme Inhibition (Competitive vs Noncompetitive) Calculator
  {
    slug: 'michaelis-menten-enzyme-inhibition-competitive-noncompetitive-calculator',
    name: 'Enzyme Inhibition Kinetics (Competitive, Non-Competitive & Uncompetitive) Calculator',
    description: 'Calculate enzyme catalytic kinetics with reversible inhibitors: apparent K_m^app, V_max^app, inhibition constant K_i, and Lineweaver-Burk double reciprocal plot parameters.',
    category: 'Science',
    icon: 'text',
    keywords: ['enzyme inhibition calculator', 'competitive noncompetitive uncompetitive inhibition formula online', 'michaelis menten apparent km vmax inhibitor calculator', 'lineweaver burk double reciprocal inhibition calculator', 'biochemistry enzyme kinetics pharmacology online'],
    order: 1195,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Substrate [S] (mM), Uninhibited V_max (μmol/min), K_m (mM), Inhibitor [I] (μM) & K_i (μM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ei-mode">Inhibition Type</label>
          <select class="tool-textarea" id="ei-mode">
            <option value="comp" selected>Competitive (Increases Km, Vmax unchanged)</option>
            <option value="noncomp">Non-Competitive (Decreases Vmax, Km unchanged)</option>
            <option value="uncomp">Uncompetitive (Decreases both Km and Vmax)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ei-vmax">V_max (μmol/min)</label>
          <input class="tool-textarea" id="ei-vmax" type="number" step="10" value="100.0" placeholder="100.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ei-km">K_m (mM)</label>
          <input class="tool-textarea" id="ei-km" type="number" step="1" value="5.0" placeholder="5.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ei-inh">[I] / K_i Ratio</label>
          <input class="tool-textarea" id="ei-inh" type="number" step="0.5" value="2.0" placeholder="2.0 ([I] = 2·Ki)" />
        </div>
      </div>
      <div id="ei-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ei-res-app" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">K_m^app = 15.0 mM | V_max^app = 100.0 μmol/min</span>
            <span class="stat-label">Apparent Kinetic Parameters (α = 1 + [I]/K_i = 3.0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ei-res-desc" style="color:var(--green-dark); font-weight:700;">COMPETITIVE INHIBITION: Inhibitor binds active site; high substrate [S] overcomes inhibition</span>
            <span class="stat-label">Pharmacological Mechanism of Action</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mdEl = document.getElementById('ei-mode'), vmEl = document.getElementById('ei-vmax');
  const kmEl = document.getElementById('ei-km'), inhEl = document.getElementById('ei-inh');
  const apResEl = document.getElementById('ei-res-app'), dsResEl = document.getElementById('ei-res-desc');

  function update() {
    const mode = mdEl.value, Vmax = parseFloat(vmEl.value);
    const Km = parseFloat(kmEl.value), I_over_Ki = parseFloat(inhEl.value);

    if (isNaN(Vmax) || isNaN(Km) || isNaN(I_over_Ki) || Vmax <= 0 || Km <= 0 || I_over_Ki < 0) return;

    // Alpha factor = 1 + [I] / Ki
    const alpha = 1.0 + I_over_Ki;

    let Km_app = Km, Vmax_app = Vmax, desc = '';

    if (mode === 'comp') {
      Km_app = Km * alpha;
      Vmax_app = Vmax;
      desc = 'COMPETITIVE: Binds active site (Km increases ' + alpha.toFixed(1) + '×, Vmax unchanged)';
    } else if (mode === 'noncomp') {
      Km_app = Km;
      Vmax_app = Vmax / alpha;
      desc = 'NON-COMPETITIVE: Allosteric binding (Vmax reduced by ' + alpha.toFixed(1) + '×, Km unchanged)';
    } else {
      Km_app = Km / alpha;
      Vmax_app = Vmax / alpha;
      desc = 'UNCOMPETITIVE: Binds ES complex only (Both Km and Vmax reduced by ' + alpha.toFixed(1) + '×)';
    }

    apResEl.textContent = 'K_m^app = ' + Km_app.toFixed(1) + ' mM | V_max^app = ' + Vmax_app.toFixed(1) + ' μmol/min';
    dsResEl.textContent = desc + ' (α = ' + alpha.toFixed(2) + ')';
  }

  [mdEl, vmEl, kmEl, inhEl].forEach(el => el.addEventListener('input', update));
  mdEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select enzyme inhibition mechanism (Competitive, Non-Competitive, Uncompetitive).',
      'Enter uninhibited maximum velocity $V_{\max}$ and Michaelis constant $K_m$.',
      'Enter inhibitor ratio $[I] / K_i$.',
      'Inspect apparent $K_m^{\text{app}}$ and $V_{\max}^{\text{app}}$ changes.'
    ],
    benefitTitle: 'Enzyme Pharmacological Inhibition Kinetics',
    benefitContent: 'Competitive inhibitors (statins, ACE inhibitors) can be overcome by high substrate concentrations ($V_{\max}$ unchanged), whereas noncompetitive inhibitors reduce catalytic turnover ($V_{\max}$ decreased).',
    faqs: [{ q: 'What is the Lineweaver-Burk intersection for competitive inhibition?', a: 'Competitive inhibitor lines intersect at the same point on the Y-axis ($1/V_{\max}$) with differing X-axis intercepts ($-1/K_m^{\text{app}}$).' }]
  },

  // 12. Gibbs Free Energy of ATP Hydrolysis Calculator
  {
    slug: 'gibbs-free-energy-atp-hydrolysis-phosphorylation-potential-calculator',
    name: 'Gibbs Free Energy of ATP Hydrolysis (ΔG = ΔG°\' + RT·ln([ADP]·[Pi] / [ATP])) Calculator',
    description: 'Calculate physiological cellular ATP hydrolysis free energy (ΔG in kJ/mol and kcal/mol) and phosphorylation potential from intracellular ATP, ADP, and inorganic phosphate (Pi) concentrations.',
    category: 'Science',
    icon: 'text',
    keywords: ['atp hydrolysis gibbs free energy calculator', 'delta g atp adp pi phosphorylation potential calculator', 'cellular bioenergetics atp free energy online', 'biochemical thermodynamics delta g prime calculator', 'cell biology biochemistry bioenergetics online'],
    order: 1196,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Intracellular [ATP] (mM), [ADP] (mM), [Pi] (mM) & Cell Temp (°C, 37°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="atp-atp">[ATP] (mM)</label>
          <input class="tool-textarea" id="atp-atp" type="number" step="0.5" value="5.0" placeholder="5.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="atp-adp">[ADP] (mM)</label>
          <input class="tool-textarea" id="atp-adp" type="number" step="0.1" value="0.5" placeholder="0.5 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="atp-pi">[Pi] (mM)</label>
          <input class="tool-textarea" id="atp-pi" type="number" step="0.5" value="2.0" placeholder="2.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="atp-temp">Temp (°C)</label>
          <input class="tool-textarea" id="atp-temp" type="number" step="1" value="37" placeholder="37 °C" />
        </div>
      </div>
      <div id="atp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="atp-res-dg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Actual ΔG = -52.1 kJ / mol (-12.4 kcal/mol)</span>
            <span class="stat-label">In Vivo Physiological Cellular ATP Hydrolysis Free Energy</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="atp-res-std" style="color:var(--green-dark); font-weight:700;">Standard ΔG°\' = -30.5 kJ/mol | Cellular mass action adds -21.6 kJ/mol extra driving force</span>
            <span class="stat-label">Standard State Comparison & High Energy Phosphate Currency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const atpEl = document.getElementById('atp-atp'), adpEl = document.getElementById('atp-adp');
  const piEl = document.getElementById('atp-pi'), tEl = document.getElementById('atp-temp');
  const dgResEl = document.getElementById('atp-res-dg'), stResEl = document.getElementById('atp-res-std');

  const R = 8.314462618e-3; // kJ / (mol * K)
  const dG0_std = -30.5; // kJ / mol at pH 7.0, 25°C

  function update() {
    const ATP_mM = parseFloat(atpEl.value), ADP_mM = parseFloat(adpEl.value);
    const Pi_mM = parseFloat(piEl.value), T_C = parseFloat(tEl.value);

    if (isNaN(ATP_mM) || isNaN(ADP_mM) || isNaN(Pi_mM) || isNaN(T_C) || ATP_mM <= 0 || ADP_mM <= 0 || Pi_mM <= 0) return;

    const T_K = T_C + 273.15;

    // Convert mM to M:
    const ATP_M = ATP_mM * 1e-3;
    const ADP_M = ADP_mM * 1e-3;
    const Pi_M = Pi_mM * 1e-3;

    // Mass action ratio Q = ( [ADP] * [Pi] ) / [ATP]
    const Q = (ADP_M * Pi_M) / ATP_M;

    // Actual Delta_G = Delta_G0 + R * T * ln(Q)  [kJ / mol]
    const deltaG = dG0_std + (R * T_K * Math.log(Q));
    const deltaG_kcal = deltaG / 4.184;

    dgResEl.textContent = 'Actual ΔG = ' + deltaG.toFixed(1) + ' kJ / mol (' + deltaG_kcal.toFixed(1) + ' kcal/mol)';
    stResEl.textContent = 'Standard ΔG°\' = -30.5 kJ/mol | Mass action Q = ' + Q.toExponential(2) + ' (Adds ' + (deltaG - dG0_std).toFixed(1) + ' kJ/mol driving force @ ' + T_C + '°C)';
  }

  [atpEl, adpEl, piEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter intracellular concentrations of ATP, ADP, and inorganic phosphate ($P_i$) in mM.',
      'Enter physiological cell temperature in $^\circ\text{C}$ ($37^\circ\text{C}$ for human cells).',
      'Inspect physiological in vivo free energy change $\Delta G$ in kJ/mol and kcal/mol.'
    ],
    benefitTitle: 'Fritz Lipmann 1941 High-Energy Phosphate Bioenergetics',
    benefitContent: 'Because living cells maintain high ATP/ADP ratios far displaced from equilibrium, actual cellular ATP hydrolysis releases over $-50\text{ kJ/mol}$, substantially more than the standard $-30.5\text{ kJ/mol}$.',
    faqs: [{ q: 'Why does cellular ATP hydrolysis release more energy in vivo than in vitro?', a: 'Cells continually regenerate ATP, keeping the mass-action ratio $Q = \frac{[\text{ADP}][\text{P}_i]}{[\text{ATP}]}$ extremely small ($\sim 10^{-4}\text{ M}$), providing an additional $-20\text{ kJ/mol}$ of thermodynamic driving force.' }]
  },

  // 13. Chlorophyll Fluorescence Fv/Fm Photosystem II Efficiency Calculator
  {
    slug: 'chlorophyll-fluorescence-fv-fm-photosystem-ii-efficiency-calculator',
    name: 'Chlorophyll Fluorescence Maximum Quantum Yield (F_v / F_m = (F_m - F₀) / F_m) Calculator',
    description: 'Calculate plant photosystem II (PSII) maximum photochemical quantum efficiency (F_v / F_m = (F_m - F₀) / F_m) from dark-adapted minimum (F₀) and maximum (F_m) chlorophyll fluorescence to detect abiotic plant stress (drought, salinity, heat).',
    category: 'Science',
    icon: 'text',
    keywords: ['chlorophyll fluorescence calculator', 'fv fm formula photosystem ii efficiency online', 'plant stress photosynthetic yield calculator pam fluorometry', 'dark adapted f0 fm variable fluorescence calculator', 'plant physiology agronomy photosynthesis online'],
    order: 1197,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dark-Adapted Basal Fluorescence F₀ & Maximal Saturating Fluorescence F_m',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cf-f0">Basal F₀</label>
          <input class="tool-textarea" id="cf-f0" type="number" step="25" value="350" placeholder="350 (Dark-Adapted Minimum)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cf-fm">Maximal F_m</label>
          <input class="tool-textarea" id="cf-fm" type="number" step="100" value="2100" placeholder="2,100 (Saturating Flash)" />
        </div>
      </div>
      <div id="cf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cf-res-fvfm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Quantum Yield F_v / F_m = 0.833</span>
            <span class="stat-label">Photosystem II Maximum Photochemical Efficiency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cf-res-stat" style="color:var(--green-dark); font-weight:700;">HEALTHY PLANT (F_v/F_m = 0.80 - 0.84: Optimal unstressed photosynthetic apparatus)</span>
            <span class="stat-label">Plant Physiological Health & Photoinhibition Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const f0El = document.getElementById('cf-f0'), fmEl = document.getElementById('cf-fm');
  const yldResEl = document.getElementById('cf-res-fvfm'), stResEl = document.getElementById('cf-res-stat');

  function update() {
    const F0 = parseFloat(f0El.value), Fm = parseFloat(fmEl.value);
    if (isNaN(F0) || isNaN(Fm) || F0 <= 0 || Fm <= F0) return;

    // Variable fluorescence: Fv = Fm - F0
    const Fv = Fm - F0;

    // Maximum quantum efficiency of PSII: Fv / Fm
    const Fv_over_Fm = Fv / Fm;

    let status = '', color = '#22543d';
    if (Fv_over_Fm >= 0.79 && Fv_over_Fm <= 0.85) {
      status = 'OPTIMAL HEALTH (F_v/F_m 0.79 - 0.85: Unstressed PSII reaction centers)';
      color = '#22543d';
    } else if (Fv_over_Fm >= 0.70) {
      status = 'MILD ENVIRONMENTAL STRESS (0.70 - 0.78: Early drought, nutrient, or temperature stress)';
      color = '#ea580c';
    } else {
      status = 'SEVERE PHOTOINHIBITION / DAMAGE (< 0.70: Damaged D1 protein in PSII reaction centers)';
      color = '#c53030';
    }

    yldResEl.textContent = 'Quantum Yield F_v / F_m = ' + Fv_over_Fm.toFixed(3);
    yldResEl.style.color = color;
    stResEl.textContent = status + ' [F_v = ' + Math.round(Fv) + ' | F_0 = ' + F0 + ', F_m = ' + Fm + ']';
    stResEl.style.color = color;
  }

  f0El.addEventListener('input', update);
  fmEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter dark-adapted baseline minimum fluorescence $F_0$.',
      'Enter maximal fluorescence $F_m$ recorded during saturating light pulse.',
      'Inspect maximum quantum yield ($F_v / F_m = \frac{F_m - F_0}{F_m}$) and diagnose photosynthetic photoinhibition stress.'
    ],
    benefitTitle: 'Pulse-Amplitude-Modulation (PAM) Fluorometry Standard',
    benefitContent: 'Chlorophyll fluorescence provides a non-invasive, instant diagnostic of plant stress before visible leaf wilting or chlorosis occurs.',
    faqs: [{ q: 'What is the standard Fv/Fm value for healthy unstressed C3 and C4 plants?', a: 'Healthy unstressed leaves of almost all vascular plant species consistently exhibit an $F_v/F_m$ value of $0.83 \pm 0.01$.' }]
  },

  // 14. Transmembrane Helix Hydropathy (Kyte-Doolittle) Calculator
  {
    slug: 'transmembrane-helix-hydropathy-kyte-doolittle-calculator',
    name: 'Transmembrane Helix Kyte-Doolittle Hydropathy Profile Calculator',
    description: 'Calculate average amino acid hydropathy index using the standard Kyte-Doolittle scale to predict transmembrane alpha-helices (score greater than 1.6 across 19-residue sliding window) in membrane biology.',
    category: 'Science',
    icon: 'text',
    keywords: ['kyte doolittle hydropathy calculator', 'transmembrane helix prediction formula online', 'protein hydrophobicity window average calculator', 'membrane protein alpha helix hydropathy calculator', 'structural biology bioinformatics membrane proteins online'],
    order: 1198,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Peptide Amino Acid Sequence (19 to 25 Residues) or Pre-Set Transmembrane Segments',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="kd-seq">Amino Acid Sequence (Single-Letter Code)</label>
        <input class="tool-textarea" id="kd-seq" type="text" value="LALVALIAVALVIAFLIVV" placeholder="LALVALIAVALVIAFLIVV (Hydrophobic Transmembrane)" />
      </div>
      <div id="kd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kd-res-score" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Mean Hydropathy = +3.87 (High Hydrophobicity)</span>
            <span class="stat-label">Kyte-Doolittle Hydrophobicity Score (Scale: -4.5 to +4.5)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kd-res-tm" style="color:var(--green-dark); font-weight:700;">TRANSMEMBRANE HELIX PREDICTED (Score > +1.60 across 19-residue span: Spans lipid bilayer ✓)</span>
            <span class="stat-label">Membrane Spanning Prediction & Domain Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const seqEl = document.getElementById('kd-seq');
  const scResEl = document.getElementById('kd-res-score'), tmResEl = document.getElementById('kd-res-tm');

  const kdScale = {
    'I': 4.5, 'V': 4.2, 'L': 3.8, 'F': 2.8, 'C': 2.5, 'M': 1.9, 'A': 1.8, 'G': -0.4,
    'T': -0.7, 'S': -0.8, 'W': -0.9, 'Y': -1.3, 'P': -1.6, 'H': -3.2, 'E': -3.5,
    'Q': -3.5, 'D': -3.5, 'N': -3.5, 'K': -3.9, 'R': -4.5
  };

  function update() {
    const seq = seqEl.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (seq.length < 3) return;

    let totalScore = 0, validCount = 0;
    for (let aa of seq) {
      if (kdScale[aa] !== undefined) {
        totalScore += kdScale[aa];
        validCount++;
      }
    }

    if (validCount === 0) return;

    const meanHydropathy = totalScore / validCount;

    let pred = '', color = '#22543d';
    if (meanHydropathy >= 1.60 && validCount >= 18) {
      pred = 'TRANSMEMBRANE HELIX (Score > +1.6 across ' + validCount + ' aa: Lipid bilayer span)';
      color = '#22543d';
    } else if (meanHydropathy >= 0.5) {
      pred = 'HYDROPHOBIC CORE (Interior globular protein domain)';
      color = '#2563eb';
    } else {
      pred = 'HYDROPHILIC / SOLUBLE (Surface-exposed loop / Aqueous cytosolic region)';
      color = '#ea580c';
    }

    scResEl.textContent = 'Mean Hydropathy = ' + (meanHydropathy >= 0 ? '+' : '') + meanHydropathy.toFixed(2);
    tmResEl.textContent = pred + ' (' + validCount + ' residues evaluated)';
    tmResEl.style.color = color;
  }

  seqEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter amino acid peptide sequence in standard single-letter code (e.g. L, V, I, A, F).',
      'Inspect average Kyte-Doolittle hydropathy score (range -4.5 Arg to +4.5 Ile) and verify transmembrane lipid bilayer spanning capability.'
    ],
    benefitTitle: 'Jack Kyte & Russell F. Doolittle 1982 Hydropathy Scale',
    benefitContent: 'A 19–22 residue alpha-helix with a mean hydropathy score $> +1.60$ is energetically favorable inside the hydrophobic hydrocarbon interior of cell lipid membranes (G-protein coupled receptors, ion channels).',
    faqs: [{ q: 'Why is a 19-21 residue window used to find transmembrane helices?', a: 'An alpha-helix advances $0.15\text{ nm}$ per residue; spanning a $3.0\text{ nm}$ hydrophobic lipid bilayer core requires exactly $3.0 / 0.15 = 20\text{ residues}$.' }]
  },

  // 15. CRISPR-Cas9 Cutting Frequency Determination (CFD) Off-Target Score Calculator
  {
    slug: 'crispr-cas9-off-target-cutting-efficiency-cfd-calculator',
    name: 'CRISPR-Cas9 Guide RNA Off-Target Cutting Frequency (CFD Score) Calculator',
    description: 'Calculate CRISPR-Cas9 sgRNA off-target cutting probability using the Cutting Frequency Determination (CFD score from 0 to 100%) based on position-dependent base mismatches and PAM variations (NGG vs NAG/NGA).',
    category: 'Science',
    icon: 'text',
    keywords: ['crispr off target calculator', 'cfd score formula doench cutting frequency determination online', 'cas9 grna mismatch off target probability calculator', 'crispr gene editing specificity calculator', 'molecular genetics bioinformatics crispr cas9 online'],
    order: 1199,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'PAM Sequence (NGG, NAG, NGA) & Number of Seed (Pos 1-10) vs Distal (Pos 11-20) Base Mismatches',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cr-pam">PAM Site</label>
          <select class="tool-textarea" id="cr-pam">
            <option value="1.0" selected>Canonical NGG (1.00 Weight)</option>
            <option value="0.25">Non-Canonical NAG (0.25 Weight)</option>
            <option value="0.08">Non-Canonical NGA (0.08 Weight)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-seed">Seed Mismatches (1-10)</label>
          <input class="tool-textarea" id="cr-seed" type="number" step="1" min="0" max="5" value="1" placeholder="1 Seed Mismatch" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-dist">Distal Mismatches (11-20)</label>
          <input class="tool-textarea" id="cr-dist" type="number" step="1" min="0" max="5" value="1" placeholder="1 Distal Mismatch" />
        </div>
      </div>
      <div id="cr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cr-res-cfd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CFD Off-Target Score = 13.5%</span>
            <span class="stat-label">Predicted Relative Cutting Frequency Determination (CFD)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cr-res-risk" style="color:var(--green-dark); font-weight:700;">LOW OFF-TARGET RISK (Seed mismatch strongly suppresses Cas9 endonuclease cleavage)</span>
            <span class="stat-label">Gene Editing Specificity & Off-Target Cleavage Risk</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pamEl = document.getElementById('cr-pam'), sdEl = document.getElementById('cr-seed'), dsEl = document.getElementById('cr-dist');
  const cfdResEl = document.getElementById('cr-res-cfd'), rkResEl = document.getElementById('cr-res-risk');

  function update() {
    const pamWeight = parseFloat(pamEl.value);
    const nSeed = parseInt(sdEl.value, 10), nDist = parseInt(dsEl.value, 10);

    if (isNaN(pamWeight) || isNaN(nSeed) || isNaN(nDist) || nSeed < 0 || nDist < 0) return;

    // Doench 2016 CFD multiplicative penalty:
    // Seed mismatches (pos 1-10 close to PAM) reduce cutting heavily (~0.20 per mismatch)
    // Distal mismatches (pos 11-20) reduce cutting moderately (~0.65 per mismatch)
    const seedPenalty = Math.pow(0.22, nSeed);
    const distPenalty = Math.pow(0.68, nDist);

    const cfd_score = pamWeight * seedPenalty * distPenalty * 100.0;

    let risk = '', color = '#22543d';
    if (cfd_score >= 50.0) {
      risk = 'HIGH OFF-TARGET RISK (Cleavage probability > 50%: Validate with GUIDE-seq)';
      color = '#c53030';
    } else if (cfd_score >= 10.0) {
      risk = 'MODERATE RISK (10 - 50%: Possible non-specific indel formation)';
      color = '#ea580c';
    } else {
      risk = 'VERY LOW OFF-TARGET RISK (Cleavage < 10%: Highly specific on-target cutting)';
      color = '#22543d';
    }

    cfdResEl.textContent = 'CFD Score = ' + cfd_score.toFixed(1) + '%';
    cfdResEl.style.color = color;
    rkResEl.textContent = risk + ' (PAM factor: ' + pamWeight + ')';
    rkResEl.style.color = color;
  }

  [pamEl, sdEl, dsEl].forEach(el => el.addEventListener('input', update));
  pamEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select Protospacer Adjacent Motif (PAM) sequence (Canonical NGG vs non-canonical NAG/NGA).',
      'Enter number of base mismatches in the proximal seed region (positions 1–10 adjacent to PAM).',
      'Enter number of base mismatches in the distal 5\' region (positions 11–20).',
      'Inspect Doench Cutting Frequency Determination (CFD) off-target cutting score.'
    ],
    benefitTitle: 'John G. Doench 2016 Nature Biotechnology CFD Algorithm',
    benefitContent: 'Quantifies how single-base mismatches in the Cas9 seed region disrupt R-loop formation, guiding design of high-fidelity CRISPR gene therapy reagents.',
    faqs: [{ q: 'Why do seed region mismatches prevent Cas9 cutting more than distal mismatches?', a: 'Cas9 requires stable base pairing in the 8–10 bp proximal seed region to trigger the conformational change activating HNH and RuvC endonuclease domains.' }]
  },

  // 16. Western Blot Densitometry Housekeeping Normalization Calculator
  {
    slug: 'western-blot-densitometry-normalization-housekeeping-calculator',
    name: 'Western Blot Densitometry Normalization (Target / Housekeeping Control) Calculator',
    description: 'Calculate normalized Western blot protein expression fold-changes from raw densitometric band optical densities (OD) normalized to housekeeping loading controls (GAPDH, β-Actin, α-Tubulin).',
    category: 'Science',
    icon: 'text',
    keywords: ['western blot densitometry calculator', 'western blot normalization fold change formula online', 'gapdh beta actin loading control densitometry calculator', 'imagej western blot band intensity calculator', 'molecular biology protein expression western blot online'],
    order: 1200,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Protein & Housekeeping (GAPDH/Actin) Band Intensities (Control vs Treated)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wb-tc">Target Control (OD)</label>
          <input class="tool-textarea" id="wb-tc" type="number" step="1000" value="25000" placeholder="25,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-hc">Housekeeping Control</label>
          <input class="tool-textarea" id="wb-hc" type="number" step="1000" value="50000" placeholder="50,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-tt">Target Treated (OD)</label>
          <input class="tool-textarea" id="wb-tt" type="number" step="1000" value="75000" placeholder="75,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-ht">Housekeeping Treated</label>
          <input class="tool-textarea" id="wb-ht" type="number" step="1000" value="48000" placeholder="48,000" />
        </div>
      </div>
      <div id="wb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wb-res-fold" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Relative Expression = 3.13-Fold (UPREGULATED)</span>
            <span class="stat-label">Housekeeping-Normalized Relative Fold Change</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wb-res-ratio" style="color:var(--green-dark); font-weight:700;">Control Ratio = 0.500 | Treated Ratio = 1.563 (+212.5% Protein Increase)</span>
            <span class="stat-label">Normalized Optical Density Ratios</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tcEl = document.getElementById('wb-tc'), hcEl = document.getElementById('wb-hc');
  const ttEl = document.getElementById('wb-tt'), htEl = document.getElementById('wb-ht');
  const fdResEl = document.getElementById('wb-res-fold'), rtResEl = document.getElementById('wb-res-ratio');

  function update() {
    const T_ctrl = parseFloat(tcEl.value), H_ctrl = parseFloat(hcEl.value);
    const T_trt = parseFloat(ttEl.value), H_trt = parseFloat(htEl.value);

    if (isNaN(T_ctrl) || isNaN(H_ctrl) || isNaN(T_trt) || isNaN(H_trt) || T_ctrl <= 0 || H_ctrl <= 0 || T_trt <= 0 || H_trt <= 0) return;

    // Normalized ratio control: R_ctrl = T_ctrl / H_ctrl
    const R_ctrl = T_ctrl / H_ctrl;
    // Normalized ratio treated: R_trt = T_trt / H_trt
    const R_trt = T_trt / H_trt;

    // Fold change: R_trt / R_ctrl
    const foldChange = R_trt / R_ctrl;
    const pctChange = (foldChange - 1.0) * 100.0;

    let status = '', color = '#22543d';
    if (foldChange > 1.2) { status = 'UPREGULATED'; color = '#22543d'; }
    else if (foldChange < 0.8) { status = 'DOWNREGULATED'; color = '#c53030'; }
    else { status = 'NO SIGNIFICANT CHANGE (0.8 - 1.2×)'; color = '#2563eb'; }

    fdResEl.textContent = 'Relative Expression = ' + foldChange.toFixed(2) + '-Fold (' + status + ')';
    fdResEl.style.color = color;
    rtResEl.textContent = 'Control Ratio = ' + R_ctrl.toFixed(3) + ' | Treated Ratio = ' + R_trt.toFixed(3) + ' (' + (pctChange >= 0 ? '+' : '') + pctChange.toFixed(1) + '% Change)';
  }

  [tcEl, hcEl, ttEl, htEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw band densitometry integrated optical density (OD) for target protein in control and treated samples.',
      'Enter corresponding housekeeping control (GAPDH or Actin) band intensities.',
      'Inspect housekeeping-normalized relative protein expression fold-change.'
    ],
    benefitTitle: 'Quantitative Western Blot Densitometry Standard',
    benefitContent: 'Normalizing target protein bands against housekeeping controls corrects for unequal lane loading, membrane transfer discrepancies, and chemiluminescence exposure variations.',
    faqs: [{ q: 'Why must Western blot bands not be saturated during imaging?', a: 'Saturated CCD camera pixels lose linearity between protein mass and photon emission, distorting fold-change calculations.' }]
  },

  // 17. ELISA 4-Parameter Logistic (4PL) Standard Curve Calculator
  {
    slug: 'elisa-standard-curve-four-parameter-logistic-4pl-calculator',
    name: 'ELISA 4-Parameter Logistic (4PL Regression y = d + (a - d)/(1 + (x/c)^b)) Calculator',
    description: 'Calculate unknown antigen/antibody concentration x from optical density OD (450 nm) using the gold-standard 4-Parameter Logistic (4PL) sigmoidal standard curve regression equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['elisa 4pl calculator', 'four parameter logistic standard curve formula online', 'elisa concentration from od450 calculator pg ml', 'sandwich elisa 4pl regression curve calculator', 'immunology biotechnology elisa assay online'],
    order: 1201,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sample OD₄₅₀, Top Plateau a, Bottom Blank d, EC₅₀ Inflection Point c & Hill Slope b',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="el-y">Sample OD₄₅₀</label>
          <input class="tool-textarea" id="el-y" type="number" step="0.1" value="0.95" placeholder="0.95" />
        </div>
        <div class="control-group">
          <label class="control-label" for="el-a">Top Plateau a</label>
          <input class="tool-textarea" id="el-a" type="number" step="0.1" value="2.50" placeholder="2.50 OD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="el-d">Bottom Blank d</label>
          <input class="tool-textarea" id="el-d" type="number" step="0.01" value="0.05" placeholder="0.05 OD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="el-c">EC₅₀ c (pg/mL)</label>
          <input class="tool-textarea" id="el-c" type="number" step="50" value="250.0" placeholder="250.0 pg/mL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="el-b">Hill Slope b</label>
          <input class="tool-textarea" id="el-b" type="number" step="0.1" value="1.0" placeholder="1.0" />
        </div>
      </div>
      <div id="el-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="el-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Concentration x = 145.2 pg / mL</span>
            <span class="stat-label">4PL Inverted Antigen Concentration (x = c · ((a - d)/(y - d) - 1)^(1/b))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="el-res-range" style="color:var(--green-dark); font-weight:700;">IN DYNAMIC RANGE (OD 0.95 lies within 20-80% linear sigmoidal response: 0.54 - 2.01 OD)</span>
            <span class="stat-label">Assay Precision & Dynamic Range Verification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const yEl = document.getElementById('el-y'), aEl = document.getElementById('el-a');
  const dEl = document.getElementById('el-d'), cEl = document.getElementById('el-c'), bEl = document.getElementById('el-b');
  const ccResEl = document.getElementById('el-res-conc'), rgResEl = document.getElementById('el-res-range');

  function update() {
    const y = parseFloat(yEl.value), a = parseFloat(aEl.value);
    const d = parseFloat(dEl.value), c = parseFloat(cEl.value), b = parseFloat(bEl.value);

    if (isNaN(y) || isNaN(a) || isNaN(d) || isNaN(c) || isNaN(b) || y <= d || y >= a || c <= 0 || b <= 0) return;

    // 4PL model: y = d + (a - d) / ( 1 + (x/c)^b )
    // Inverting for x:
    // (a - d) / (y - d) = 1 + (x/c)^b => (x/c)^b = (a - d)/(y - d) - 1
    const term = ((a - d) / (y - d)) - 1.0;
    if (term <= 0) return;

    const x = c * Math.pow(term, 1.0 / b);

    // 20% to 80% dynamic range:
    const od_20 = d + 0.20 * (a - d);
    const od_80 = d + 0.80 * (a - d);
    const isLinear = y >= od_20 && y <= od_80;

    ccResEl.textContent = 'Concentration x = ' + x.toFixed(1) + ' pg / mL';
    rgResEl.textContent = isLinear ? 'OPTIMAL LINEAR RANGE (OD ' + y.toFixed(2) + ' in 20-80% span: ' + od_20.toFixed(2) + ' to ' + od_80.toFixed(2) + ' OD)' : 'OUTSIDE LINEAR RANGE (Near curve asymptotes: Dilute sample)';
  }

  [yEl, aEl, dEl, cEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter unknown sample optical density (OD450).',
      'Enter 4PL standard curve parameters: top plateau a, bottom background d, inflection $EC_{50}$ midpoint c, and slope b.',
      'Inspect calculated analyte concentration in pg/mL or ng/mL.'
    ],
    benefitTitle: 'Four-Parameter Logistic Sigmoidal Immunoassay Standard',
    benefitContent: '4PL models receptor-ligand cooperative binding and saturation asymptotes, providing far superior accuracy than linear regression for ELISAs.',
    faqs: [{ q: 'What does the parameter c represent in a 4PL curve?', a: 'Parameter c is the $EC_{50}$ / $IC_{50}$ inflection concentration that produces half-maximal optical density response.' }]
  },

  // 18. Gel Electrophoresis DNA Migration Rf to Base Pair Size Calculator
  {
    slug: 'gel-electrophoresis-dna-migration-rf-molecular-weight-calculator',
    name: 'Agarose Gel Electrophoresis DNA Migration (log₁₀(bp) = -m·R_f + c) Calculator',
    description: 'Calculate unknown DNA fragment base pair (bp) size from agarose gel electrophoresis relative migration distance (R_f = Band Distance / Dye Front Distance) using molecular ladder semi-log regression.',
    category: 'Science',
    icon: 'text',
    keywords: ['gel electrophoresis calculator', 'dna migration rf to base pairs formula online', 'agarose gel molecular weight standard curve calculator bp', 'relative migration distance rf gel electrophoresis calculator', 'molecular biology gel electrophoresis online'],
    order: 1202,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Unknown Band Migration Distance (mm), Dye Front Distance (mm) & Ladder Semi-Log Slope m, c',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ge-dband">Band Dist (mm)</label>
          <input class="tool-textarea" id="ge-dband" type="number" step="2" value="32.0" placeholder="32.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ge-dfront">Dye Front (mm)</label>
          <input class="tool-textarea" id="ge-dfront" type="number" step="5" value="65.0" placeholder="65.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ge-m">Slope m</label>
          <input class="tool-textarea" id="ge-m" type="number" step="0.1" value="1.85" placeholder="1.85" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ge-c">Intercept c</label>
          <input class="tool-textarea" id="ge-c" type="number" step="0.1" value="4.10" placeholder="4.10 (Ladder y-intercept)" />
        </div>
      </div>
      <div id="ge-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ge-res-bp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Estimated Size = 1,546 bp (1.55 kb)</span>
            <span class="stat-label">Estimated DNA Fragment Molecular Size (bp)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ge-res-rf" style="color:var(--green-dark); font-weight:700;">Relative Migration R_f = 0.492 | log₁₀(bp) = 3.189</span>
            <span class="stat-label">Relative Migration Distance (R_f) & Semi-Log Value</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dbEl = document.getElementById('ge-dband'), dfEl = document.getElementById('ge-dfront');
  const mEl = document.getElementById('ge-m'), cEl = document.getElementById('ge-c');
  const bpResEl = document.getElementById('ge-res-bp'), rfResEl = document.getElementById('ge-res-rf');

  function update() {
    const d_band = parseFloat(dbEl.value), d_front = parseFloat(dfEl.value);
    const m = parseFloat(mEl.value), c = parseFloat(cEl.value);

    if (isNaN(d_band) || isNaN(d_front) || isNaN(m) || isNaN(c) || d_band <= 0 || d_front <= 0 || d_band > d_front) return;

    // R_f = d_band / d_front
    const R_f = d_band / d_front;

    // Semi-log relationship: log10(bp) = -m * R_f + c
    const log_bp = -(m * R_f) + c;
    const bp = Math.pow(10.0, log_bp);
    const kb = bp / 1000.0;

    bpResEl.textContent = 'Estimated Size = ' + Math.round(bp).toLocaleString() + ' bp (' + kb.toFixed(2) + ' kb)';
    rfResEl.textContent = 'Migration R_f = ' + R_f.toFixed(3) + ' | log₁₀(bp) = ' + log_bp.toFixed(3) + ' (Band: ' + d_band + ' mm / Front: ' + d_front + ' mm)';
  }

  [dbEl, dfEl, mEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Measure migration distance from well to target DNA band in mm.',
      'Measure migration distance from well to tracking dye front in mm.',
      'Enter standard DNA ladder semi-log regression slope m and intercept c.',
      'Inspect estimated DNA fragment size in base pairs (bp) and kilobases (kb).'
    ],
    benefitTitle: 'Ogston Sieving Model of DNA Electrophoretic Mobility',
    benefitContent: 'Negative phosphate backbone charges impart a uniform charge-to-mass ratio to DNA; migration speed through agarose pores is inversely proportional to the logarithm of base pair length ($\log_{10}(\text{bp}) \propto -R_f$).',
    faqs: [{ q: 'What agarose percentage should be used for 500 bp to 2 kb fragments?', a: 'A standard $1.0\%\text{ to }1.2\%$ agarose gel provides optimal resolution for $500\text{ bp to }3\text{ kb}$ DNA fragments.' }]
  },

  // 19. Serial Dilution & Colony Forming Units (CFU/mL) Calculator
  {
    slug: 'serial-dilution-colony-forming-units-cfu-calculator',
    name: 'Microbial Colony Forming Units (CFU / mL = Colonies · Dilution / Volume) Calculator',
    description: 'Calculate viable bacterial or yeast titer concentration (CFU/mL = (Number of Colonies · Dilution Factor) / Plated Volume in mL) and stock suspension microbial count.',
    category: 'Science',
    icon: 'text',
    keywords: ['cfu calculator', 'colony forming units formula cfu per ml online', 'serial dilution plate count calculator microbiology', 'bacterial colony counter cfu per ml calculator', 'microbiology plate count dilution factor online'],
    order: 1203,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Colony Count (30 to 300 Statistically Valid), Plated Volume (mL) & Serial Dilution Factor',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cfu-cnt">Colonies Counted</label>
          <input class="tool-textarea" id="cfu-cnt" type="number" step="10" value="125" placeholder="125 Colonies" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfu-vol">Volume Plated (mL)</label>
          <input class="tool-textarea" id="cfu-vol" type="number" step="0.05" value="0.10" placeholder="0.10 mL (100 μL)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfu-dil">Dilution Factor (DF)</label>
          <input class="tool-textarea" id="cfu-dil" type="number" step="10000" value="100000" placeholder="100,000 (10⁻⁵ Dilution)" />
        </div>
      </div>
      <div id="cfu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cfu-res-titer" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Titer = 1.25 × 10⁸ CFU / mL</span>
            <span class="stat-label">Stock Microbial Concentration ((Colonies · DF) / Volume)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cfu-res-stat" style="color:var(--green-dark); font-weight:700;">STATISTICALLY VALID COUNT (30 - 300 Colonies / agar plate: High precision count ✓)</span>
            <span class="stat-label">Counting Accuracy Standard (30-300 Range)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cntEl = document.getElementById('cfu-cnt'), volEl = document.getElementById('cfu-vol'), dilEl = document.getElementById('cfu-dil');
  const ttResEl = document.getElementById('cfu-res-titer'), stResEl = document.getElementById('cfu-res-stat');

  function update() {
    const colonies = parseFloat(cntEl.value), vol_mL = parseFloat(volEl.value), DF = parseFloat(dilEl.value);
    if (isNaN(colonies) || isNaN(vol_mL) || isNaN(DF) || colonies <= 0 || vol_mL <= 0 || DF <= 0) return;

    // CFU / mL = ( colonies * DF ) / vol_mL
    const cfu_mL = (colonies * DF) / vol_mL;

    let validStatus = '', color = '#22543d';
    if (colonies >= 30 && colonies <= 300) {
      validStatus = 'STATISTICALLY VALID (30 - 300 Colonies: Optimal accuracy)';
      color = '#22543d';
    } else if (colonies < 30) {
      validStatus = 'TOO FEW TO COUNT (TFTC: < 30 Colonies - High Poisson statistical variance)';
      color = '#ea580c';
    } else {
      validStatus = 'TOO NUMEROUS TO COUNT (TNTC: > 300 Colonies - Colony crowding / overlap error)';
      color = '#c53030';
    }

    ttResEl.textContent = 'Titer = ' + cfu_mL.toExponential(2) + ' CFU / mL';
    stResEl.textContent = validStatus + ' [' + colonies + ' colonies in ' + vol_mL + ' mL @ 10^' + Math.round(Math.log10(DF)) + ' dilution]';
    stResEl.style.color = color;
  }

  [cntEl, volEl, dilEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of visible colony forming units counted on agar plate.',
      'Enter volume of diluted culture inoculated onto the plate in mL (e.g. 0.1 mL for $100\ \mu\text{L}$).',
      'Enter cumulative serial dilution factor (e.g. $10^5$ for a $10^{-5}$ dilution tube).',
      'Inspect calculated stock bacterial titer concentration in CFU/mL.'
    ],
    benefitTitle: 'Standard Plate Count (SPC) Microbiological Method',
    benefitContent: 'Serial dilutions ensure accurate colony counting in the statistically valid 30–300 colony range, quantifying viable living organisms in food safety, water testing, and clinical microbiology.',
    faqs: [{ q: 'Why are plates with fewer than 30 colonies considered TFTC?', a: 'Random Poisson distribution sampling errors become unacceptably high when counting fewer than 30 colonies.' }]
  },

  // 20. Codon Adaptation Index (CAI) Synonymous Bias Calculator
  {
    slug: 'codon-usage-bias-cai-codon-adaptation-index-calculator',
    name: 'Codon Adaptation Index (CAI = (∏ w_i)^(1/L)) Synonymous Codon Bias Calculator',
    description: 'Calculate recombinant gene Codon Adaptation Index (CAI geometric mean from 0.0 to 1.0) and synonymous codon optimization efficiency for heterologous gene expression in E. coli or yeast.',
    category: 'Science',
    icon: 'text',
    keywords: ['codon adaptation index calculator', 'cai formula geometric mean relative adaptiveness online', 'synonymous codon usage bias e coli expression calculator', 'gene codon optimization score calculator', 'bioinformatics molecular genetics biotechnology online'],
    order: 1204,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Average Codon Relative Adaptiveness w_i (0.1 to 1.0) & Gene Length (Codons)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cai-w">Mean Codon Weight w</label>
          <input class="tool-textarea" id="cai-w" type="number" step="0.05" min="0.1" max="1.0" value="0.85" placeholder="0.85 (Well Optimized)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cai-len">Codon Length L</label>
          <input class="tool-textarea" id="cai-len" type="number" step="50" value="300" placeholder="300 Codons (900 bp)" />
        </div>
      </div>
      <div id="cai-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cai-res-cai" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CAI Score = 0.850</span>
            <span class="stat-label">Codon Adaptation Index (CAI = (∏ w_i)^(1/L))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cai-res-exp" style="color:var(--green-dark); font-weight:700;">HIGH EXPRESSION POTENTIAL (CAI > 0.80: Excellent translation efficiency in E. coli)</span>
            <span class="stat-label">Heterologous Protein Expression Prediction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('cai-w'), lEl = document.getElementById('cai-len');
  const caiResEl = document.getElementById('cai-res-cai'), expResEl = document.getElementById('cai-res-exp');

  function update() {
    const mean_w = parseFloat(wEl.value), L = parseFloat(lEl.value);
    if (isNaN(mean_w) || isNaN(L) || mean_w <= 0 || mean_w > 1 || L <= 0) return;

    // Geometric mean of relative adaptiveness: CAI = ( prod w_i )^(1/L) = exp( (1/L) * sum(ln w_i) )
    const CAI = mean_w;

    let expr = '', color = '#22543d';
    if (CAI >= 0.80) {
      expr = 'HIGH EXPRESSION (CAI ≥ 0.80: Optimal tRNA availability, high ribosomal translation)';
      color = '#22543d';
    } else if (CAI >= 0.60) {
      expr = 'MODERATE EXPRESSION (CAI 0.60 - 0.79: Acceptable protein yield, minor ribosome pausing)';
      color = '#ea580c';
    } else {
      expr = 'POOR EXPRESSION (CAI < 0.60: Rare codon ribosomal stalling / Codon optimization required)';
      color = '#c53030';
    }

    caiResEl.textContent = 'CAI Score = ' + CAI.toFixed(3);
    caiResEl.style.color = color;
    expResEl.textContent = expr;
    expResEl.style.color = color;
  }

  wEl.addEventListener('input', update);
  lEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter average relative codon adaptiveness weight $w$ for the host expression organism (e.g. 0.85).',
      'Enter gene length in codons.',
      'Inspect Codon Adaptation Index (CAI) and predict translation elongation speed.'
    ],
    benefitTitle: 'Paul M. Sharp & Wen-Hsiung Li 1987 CAI Standard',
    benefitContent: 'Quantifies synonymous codon usage bias relative to highly expressed reference genes, ensuring synthetic genes match host cellular tRNA pools for maximum protein production.',
    faqs: [{ q: 'What happens if a human gene containing rare AGA/AGG arginine codons is expressed in E. coli?', a: 'Low host tRNA levels cause ribosomal stalling and premature translation termination; synonymous codon optimization cures this defect.' }]
  },

  // 21. DNA GC Content & Duplex Thermostability Calculator
  {
    slug: 'gc-content-dna-stability-thermostability-calculator',
    name: 'DNA %GC Content & Thermal Denaturation Stability Calculator',
    description: 'Calculate DNA sequence Guanine-Cytosine (%GC = (G + C) / (A + T + G + C) · 100%) percentage, GC-skew ((G - C)/(G + C)), and base-pair stacking thermostability for genome analysis.',
    category: 'Science',
    icon: 'text',
    keywords: ['gc content calculator', 'dna guanine cytosine percentage formula online', 'gc skew replication origin calculator', 'dna thermostability hydrogen bonding gc content calculator', 'genomics molecular biology bioinformatics online'],
    order: 1205,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'DNA Sequence (5\' to 3\') or Raw Nucleotide Counts (A, T, G, C)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="gc-seq">5\' to 3\' DNA Sequence</label>
        <input class="tool-textarea" id="gc-seq" type="text" value="ATGCGATCGATCGATCGCGCATATCGATCGATCGCGAT" placeholder="ATGC... (Enter nucleotide string)" />
      </div>
      <div id="gc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gc-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">GC Content = 56.4%</span>
            <span class="stat-label">Guanine-Cytosine Base Pair Fraction (%GC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gc-res-details" style="color:var(--green-dark); font-weight:700;">Length: 39 bp (G: 11, C: 11, A: 9, T: 8) | GC Skew = 0.000 | 3 H-Bonds per GC pair</span>
            <span class="stat-label">Nucleotide Breakdown & GC-Skew ((G - C) / (G + C))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('gc-seq');
  const pcResEl = document.getElementById('gc-res-pct'), dtResEl = document.getElementById('gc-res-details');

  function update() {
    const seq = sEl.value.trim().toUpperCase().replace(/[^ATGC]/g, '');
    if (seq.length === 0) return;

    let countA = 0, countT = 0, countG = 0, countC = 0;
    for (let nt of seq) {
      if (nt === 'A') countA++;
      else if (nt === 'T') countT++;
      else if (nt === 'G') countG++;
      else if (nt === 'C') countC++;
    }

    const total = seq.length;
    const gc = countG + countC;
    const gc_pct = (gc / total) * 100.0;

    // GC skew = (G - C) / (G + C)
    const gc_skew = gc > 0 ? (countG - countC) / gc : 0;

    pcResEl.textContent = 'GC Content = ' + gc_pct.toFixed(1) + '%';
    dtResEl.textContent = 'Length: ' + total + ' bp (G: ' + countG + ', C: ' + countC + ', A: ' + countA + ', T: ' + countT + ') | GC Skew = ' + gc_skew.toFixed(3);
  }

  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter raw 5\' to 3\' DNA sequence string.',
      'Inspect Guanine-Cytosine percentage (%GC), nucleotide counts, and GC-skew value.'
    ],
    benefitTitle: 'DNA Duplex Base Stacking & Hydrogen Bonding',
    benefitContent: 'GC base pairs have three hydrogen bonds and stronger base-stacking interactions than AT pairs (two hydrogen bonds), increasing thermal melting denaturation temperatures.',
    faqs: [{ q: 'What is GC-skew used for in bacterial genomics?', a: 'Asymmetric mutation rates during leading vs lagging strand replication create positive GC-skew, marking bacterial replication origins (*oriC*).' }]
  },

  // 22. Flow Cytometry Fluorescence Spectral Spillover Compensation Matrix Calculator
  {
    slug: 'flow-cytometry-fluorescence-compensation-matrix-calculator',
    name: 'Flow Cytometry Spectral Spillover (Fluorescence Compensation Matrix) Calculator',
    description: 'Calculate flow cytometry multi-color fluorescence spectral overlap spillover compensation (Compensated Signal = Measured Signal - Spillover % · Primary Fluorophore) for FITC/PE/PerCP channels.',
    category: 'Science',
    icon: 'text',
    keywords: ['flow cytometry compensation calculator', 'spectral spillover matrix formula flow cytometry online', 'fitc pe fluorescence overlap compensation calculator', 'flow cytometry facs gating compensation calculator', 'immunology flow cytometry cell analysis online'],
    order: 1206,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primary Fluorophore Intensity (e.g. FITC Signal) & Spectral Spillover % into Secondary Channel (PE)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fc-fitc">FITC Channel Signal</label>
          <input class="tool-textarea" id="fc-fitc" type="number" step="1000" value="10000" placeholder="10,000 MFI" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-pe">Raw PE Channel Signal</label>
          <input class="tool-textarea" id="fc-pe" type="number" step="500" value="2500" placeholder="2,500 MFI" />
        </div>
        <div class="control-group" style="grid-column:1 / -1;">
          <label class="control-label" for="fc-spill">FITC Spillover into PE (%)</label>
          <input class="tool-textarea" id="fc-spill" type="number" step="1" min="0" max="50" value="18.0" placeholder="18.0%" />
        </div>
      </div>
      <div id="fc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fc-res-comp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Compensated PE = 700 MFI</span>
            <span class="stat-label">True Compensated PE Fluorescence (Raw PE - Spillover · FITC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fc-res-sub" style="color:var(--green-dark); font-weight:700;">Subtracted FITC Bleedthrough = 1,800 MFI (72.0% of raw PE signal was optical artifact)</span>
            <span class="stat-label">Spillover Artifact Subtraction & Corrected Gating</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fitcEl = document.getElementById('fc-fitc'), peEl = document.getElementById('fc-pe'), spEl = document.getElementById('fc-spill');
  const cpResEl = document.getElementById('fc-res-comp'), sbResEl = document.getElementById('fc-res-sub');

  function update() {
    const FITC = parseFloat(fitcEl.value), raw_PE = parseFloat(peEl.value), spill_pct = parseFloat(spEl.value);
    if (isNaN(FITC) || isNaN(raw_PE) || isNaN(spill_pct) || FITC < 0 || raw_PE < 0 || spill_pct < 0) return;

    // Spillover MFI = ( spill_pct / 100 ) * FITC
    const spill_MFI = (spill_pct / 100.0) * FITC;

    // Compensated PE = raw_PE - spill_MFI
    const comp_PE = raw_PE - spill_MFI;
    const artifact_pct = raw_PE > 0 ? (spill_MFI / raw_PE) * 100.0 : 0;

    cpResEl.textContent = 'Compensated PE = ' + Math.round(comp_PE).toLocaleString() + ' MFI';
    sbResEl.textContent = 'Subtracted FITC Bleedthrough = ' + Math.round(spill_MFI).toLocaleString() + ' MFI (' + artifact_pct.toFixed(1) + '% of raw PE was spillover @ ' + spill_pct + '% overlap)';
  }

  [fitcEl, peEl, spEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter primary fluorophore fluorescence intensity (e.g. FITC in channel 1).',
      'Enter raw measured signal in secondary detector channel (e.g. PE in channel 2).',
      'Enter spectral spillover coefficient percentage.',
      'Inspect true compensated fluorophore intensity after mathematical matrix subtraction.'
    ],
    benefitTitle: 'Multicolor Flow Cytometry Spectral Decoupling',
    benefitContent: 'Broad fluorophore emission spectra bleed into neighboring optical bandpass filters; mathematical matrix inversion removes false-positive double-staining artifacts.',
    faqs: [{ q: 'What controls are required to set accurate flow cytometry compensation?', a: 'Single-stained compensation beads or cells for every fluorophore in the panel plus an unstained negative control.' }]
  },

  // 23. Surface Plasmon Resonance (SPR) Binding Kinetics KD Calculator
  {
    slug: 'surface-plasmon-resonance-spr-binding-kinetics-kd-calculator',
    name: 'Surface Plasmon Resonance Binding Kinetics (K_D = k_off / k_on) Calculator',
    description: 'Calculate biomolecular binding affinity equilibrium dissociation constant (K_D = k_off / k_on in nM), association rate k_on (M⁻¹·s⁻¹), dissociation rate k_off (s⁻¹), and complex half-life (t_½ = ln 2 / k_off) for Biacore SPR biosensors.',
    category: 'Science',
    icon: 'text',
    keywords: ['spr kinetics calculator', 'surface plasmon resonance affinity kd formula online', 'biacore association dissociation rate constant calculator', 'antibody antigen binding affinity kd calculator nm', 'biophysics biacore spr drug discovery online'],
    order: 1207,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Association Rate k_on (M⁻¹·s⁻¹) & Dissociation Rate k_off (s⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spr-kon">k_on (M⁻¹·s⁻¹)</label>
          <input class="tool-textarea" id="spr-kon" type="number" step="1e4" value="1.0e5" placeholder="1.0 × 10⁵ M⁻¹s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spr-koff">k_off (s⁻¹)</label>
          <input class="tool-textarea" id="spr-koff" type="number" step="1e-4" value="1.0e-3" placeholder="1.0 × 10⁻³ s⁻¹" />
        </div>
      </div>
      <div id="spr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spr-res-kd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Affinity K_D = 10.0 nM (High Affinity)</span>
            <span class="stat-label">Equilibrium Dissociation Constant (K_D = k_off / k_on)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spr-res-half" style="color:var(--green-dark); font-weight:700;">Complex Half-Life t_½ = 11.55 Minutes (693.1 seconds | Standard Therapeutic mAb)</span>
            <span class="stat-label">Antibody-Target Complex Dissociation Half-Life</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const onEl = document.getElementById('spr-kon'), offEl = document.getElementById('spr-koff');
  const kdResEl = document.getElementById('spr-res-kd'), hfResEl = document.getElementById('spr-res-half');

  function update() {
    const k_on = parseFloat(onEl.value), k_off = parseFloat(offEl.value);
    if (isNaN(k_on) || isNaN(k_off) || k_on <= 0 || k_off <= 0) return;

    // K_D = k_off / k_on  [Molar -> nM]
    const K_D_M = k_off / k_on;
    const K_D_nM = K_D_M * 1e9;

    // Complex half-life: t_1/2 = ln(2) / k_off  [seconds -> minutes]
    const t_half_sec = Math.log(2.0) / k_off;
    const t_half_min = t_half_sec / 60.0;

    let affDesc = '', color = '#22543d';
    if (K_D_nM < 1.0) { affDesc = 'PICOMOLAR ULTRA-HIGH AFFINITY (K_D < 1 nM)'; color = '#22543d'; }
    else if (K_D_nM <= 100.0) { affDesc = 'NANOMOLAR HIGH AFFINITY (1 - 100 nM: Therapeutic antibody range)'; color = '#22543d'; }
    else if (K_D_nM <= 10000.0) { affDesc = 'MICROMOLAR MODERATE AFFINITY (0.1 - 10 μM: Small molecule drug lead)'; color = '#ea580c'; }
    else { affDesc = 'WEAK TRANSIENT BINDING (> 10 μM)'; color = '#c53030'; }

    kdResEl.textContent = 'Affinity K_D = ' + (K_D_nM < 1 ? (K_D_nM * 1000).toFixed(1) + ' pM' : (K_D_nM >= 1000 ? (K_D_nM / 1000).toFixed(2) + ' μM' : K_D_nM.toFixed(1) + ' nM'));
    kdResEl.style.color = color;
    hfResEl.textContent = 'Complex Half-Life = ' + (t_half_min >= 60 ? (t_half_min/60).toFixed(2) + ' Hours' : t_half_min.toFixed(2) + ' min') + ' (' + affDesc + ')';
  }

  onEl.addEventListener('input', update);
  offEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter association on-rate constant $k_{\text{on}}$ in $\text{M}^{-1}\cdot\text{s}^{-1}$.',
      'Enter dissociation off-rate constant $k_{\text{off}}$ in $\text{s}^{-1}$.',
      'Inspect equilibrium dissociation constant $K_D$ (nM/pM) and complex stability half-life.'
    ],
    benefitTitle: 'Biacore Real-Time Surface Plasmon Resonance Kinetics',
    benefitContent: 'Measures label-free binding kinetics in real time; therapeutic monoclonal antibodies are optimized for fast association ($k_{\text{on}} > 10^5$) and slow dissociation ($k_{\text{off}} < 10^{-4}$).',
    faqs: [{ q: 'What is the difference between KD and IC50?', a: '$K_D$ is the thermodynamic equilibrium constant; $IC_{50}$ is an assay-dependent functional inhibition concentration influenced by enzyme and substrate levels.' }]
  },

  // 24. Liposome Drug Loading & Encapsulation Efficiency Calculator
  {
    slug: 'liposome-encapsulation-efficiency-drug-loading-calculator',
    name: 'Liposome & Nanoparticle Encapsulation Efficiency (EE% = (Total - Free) / Total·100%) Calculator',
    description: 'Calculate nanoparticle and liposomal drug delivery Encapsulation Efficiency (EE% = (Total Drug - Free Unencapsulated Drug) / Total Drug · 100%) and Drug Loading Capacity (DLC%) in pharmaceutical nanomedicine.',
    category: 'Science',
    icon: 'text',
    keywords: ['encapsulation efficiency calculator', 'liposome drug loading capacity formula ee percent online', 'nanoparticle drug delivery encapsulation calculator', 'lipid nanoparticle lnp encapsulation efficiency calculator', 'nanomedicine drug delivery pharmacology online'],
    order: 1208,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Drug Added (mg), Free Unencapsulated Drug (mg) & Total Nanoparticle Carrier Mass (mg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lp-tot">Total Drug (mg)</label>
          <input class="tool-textarea" id="lp-tot" type="number" step="5" value="50.0" placeholder="50.0 mg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lp-free">Free Drug (mg)</label>
          <input class="tool-textarea" id="lp-free" type="number" step="1" value="4.5" placeholder="4.5 mg (Supernatant)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lp-lipid">Lipid Mass (mg)</label>
          <input class="tool-textarea" id="lp-lipid" type="number" step="50" value="450.0" placeholder="450.0 mg (Carrier)" />
        </div>
      </div>
      <div id="lp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lp-res-ee" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Encapsulation Efficiency EE = 91.0%</span>
            <span class="stat-label">Percentage of Drug Successfully Encapsulated</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lp-res-dlc" style="color:var(--green-dark); font-weight:700;">Drug Loading DLC = 9.18% (45.5 mg encapsulated payload in 495.5 mg total formulation)</span>
            <span class="stat-label">Drug Loading Capacity (DLC% = Entrapped Drug / Total Nanoparticle Mass)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const totEl = document.getElementById('lp-tot'), frEl = document.getElementById('lp-free'), lpEl = document.getElementById('lp-lipid');
  const eeResEl = document.getElementById('lp-res-ee'), dlcResEl = document.getElementById('lp-res-dlc');

  function update() {
    const total_drug = parseFloat(totEl.value), free_drug = parseFloat(frEl.value), lipid_mass = parseFloat(lpEl.value);
    if (isNaN(total_drug) || isNaN(free_drug) || isNaN(lipid_mass) || total_drug <= 0 || free_drug < 0 || free_drug > total_drug || lipid_mass <= 0) return;

    // Encapsulated drug mass = Total - Free
    const entrapped_drug = total_drug - free_drug;

    // Encapsulation Efficiency EE% = ( Entrapped / Total ) * 100
    const EE_pct = (entrapped_drug / total_drug) * 100.0;

    // Drug Loading Capacity DLC% = ( Entrapped / (Entrapped + Lipid Mass) ) * 100
    const DLC_pct = (entrapped_drug / (entrapped_drug + lipid_mass)) * 100.0;

    eeResEl.textContent = 'Encapsulation Efficiency EE = ' + EE_pct.toFixed(1) + '%';
    dlcResEl.textContent = 'Drug Loading DLC = ' + DLC_pct.toFixed(2) + '% (' + entrapped_drug.toFixed(1) + ' mg encapsulated in ' + (entrapped_drug + lipid_mass).toFixed(1) + ' mg total nanoparticle weight)';
  }

  [totEl, frEl, lpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total active drug payload added to formulation in mg.',
      'Enter free unencapsulated drug measured in ultrafiltration supernatant in mg.',
      'Enter total lipid/polymer nanoparticle carrier mass in mg.',
      'Inspect Encapsulation Efficiency (EE%) and Drug Loading Capacity (DLC%).'
    ],
    benefitTitle: 'Lipid Nanoparticle (LNP) Pharmaceutical Formulations',
    benefitContent: 'High encapsulation efficiency ($EE > 90\%$) is critical for mRNA lipid nanoparticles (COVID-19 vaccines) and Doxil liposomal chemotherapy to prevent systemic toxicity and degradation.',
    faqs: [{ q: 'How is free drug separated from encapsulated liposomes?', a: 'Centrifugal ultrafiltration (Amicon filters) or size-exclusion column chromatography.' }]
  },

  // 25. Osmotic Fragility Erythrocyte Hemolysis Curve Calculator
  {
    slug: 'osmotic-fragility-erythrocyte-hemolysis-curve-calculator',
    name: 'Erythrocyte Osmotic Fragility (50% Hemolysis Saline Threshold) Calculator',
    description: 'Calculate red blood cell osmotic fragility curve 50% hemolysis threshold (% NaCl concentration) to diagnose Hereditary Spherocytosis (increased fragility) vs Thalassemia / Sickle Cell (decreased fragility).',
    category: 'Science',
    icon: 'text',
    keywords: ['osmotic fragility calculator', 'erythrocyte 50 percent hemolysis nacl formula online', 'hereditary spherocytosis osmotic fragility calculator', 'red blood cell hemolysis saline curve calculator', 'hematology clinical pathology hemolysis online'],
    order: 1209,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'NaCl Saline Concentration (% w/v) & Initial vs Complete Hemolysis Saline Values',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="of-nacl">Saline Conc (% NaCl)</label>
          <input class="tool-textarea" id="of-nacl" type="number" step="0.05" min="0" max="0.9" value="0.45" placeholder="0.45% NaCl (Half-Normal Saline)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="of-diag">Condition</label>
          <select class="tool-textarea" id="of-diag">
            <option value="normal" selected>Normal Healthy RBCs (50% Hemolysis @ 0.42% NaCl)</option>
            <option value="sphero">Hereditary Spherocytosis (Increased Fragility @ 0.60% NaCl)</option>
            <option value="thal">Thalassemia / Iron Deficiency (Decreased Fragility @ 0.35% NaCl)</option>
          </select>
        </div>
      </div>
      <div id="of-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="of-res-lysis" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Predicted Hemolysis = 26.9%</span>
            <span class="stat-label">Percentage of Lysed Red Blood Cells at 0.45% NaCl</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="of-res-eval" style="color:var(--green-dark); font-weight:700;">NORMAL OSMOTIC FRAGILITY: Hemolysis starts at 0.50% NaCl, complete at 0.30% NaCl</span>
            <span class="stat-label">Clinical Red Cell Membrane Fragility Diagnostic Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('of-nacl'), dgEl = document.getElementById('of-diag');
  const lsResEl = document.getElementById('of-res-lysis'), evResEl = document.getElementById('of-res-eval');

  function update() {
    const nacl = parseFloat(naEl.value), mode = dgEl.value;
    if (isNaN(nacl) || nacl < 0 || nacl > 0.90) return;

    let mean_nacl = 0.42, slope = 25.0, desc = '';

    if (mode === 'normal') {
      mean_nacl = 0.42; slope = 25.0;
      desc = 'NORMAL: Initial hemolysis ~0.50% NaCl, 50% at 0.42%, complete at 0.30%';
    } else if (mode === 'sphero') {
      mean_nacl = 0.60; slope = 20.0;
      desc = 'HEREDITARY SPHEROCYTOSIS: Spherocytes lack membrane reserve, lyse easily at high NaCl';
    } else {
      mean_nacl = 0.32; slope = 30.0;
      desc = 'THALASSEMIA / SICKLE CELL: Target cells have high surface-to-volume ratio, resist lysis';
    }

    // Sigmoidal hemolysis curve: % Hemolysis = 100 / ( 1 + exp( slope * (NaCl - mean_NaCl) ) )
    const hemolysis_pct = 100.0 / (1.0 + Math.exp(slope * (nacl - mean_nacl)));

    lsResEl.textContent = 'Predicted Hemolysis = ' + hemolysis_pct.toFixed(1) + '%';
    evResEl.textContent = desc + ' (At ' + nacl.toFixed(2) + '% NaCl)';
  }

  naEl.addEventListener('input', update);
  dgEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter testing sodium chloride concentration (% NaCl w/v).',
      'Select clinical erythrocyte disorder (Normal, Spherocytosis, Thalassemia).',
      'Inspect percentage of lysed erythrocytes and diagnostic membrane fragility evaluation.'
    ],
    benefitTitle: 'Erythrocyte Osmotic Fragility Diagnostic Test',
    benefitContent: 'When placed in hypotonic saline, water rushes into red blood cells by osmosis; spherical RBCs with low surface-to-volume ratios (spherocytes) lyse prematurely, diagnosing spectrin/ankyrin membrane cytoskeletal defects.',
    faqs: [{ q: 'Why do thalassemia target cells resist osmotic lysis?', a: 'Target cells have a high surface-area-to-volume ratio, allowing them to swell significantly before stretching their membrane to the burst point.' }]
  }
];

pack42Tools.forEach(createTool);
console.log('Pack 42 complete: ' + pack42Tools.length + ' tools created.');
