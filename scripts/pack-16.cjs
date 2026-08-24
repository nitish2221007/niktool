const { createTool } = require('./generate-curated-tools.cjs');

// Pack 16: 25 Tools covering Nuclear Physics, Plasma Physics, Beam Physics, Semiconductor Devices & Power Electronics (Tools 656 to 680)
const pack16Tools = [
  // --- Suite RRR: Nuclear Physics & Radiation Shielding (656 - 660) ---
  // 1. Nuclear Binding Energy Per Nucleon Calculator
  {
    slug: 'nuclear-binding-energy-per-nucleon-calculator',
    name: 'Nuclear Binding Energy Per Nucleon (BE/A) Calculator',
    description: 'Calculate nuclear mass defect (Δm = Z · m_p + N · m_n - M_nucleus) and binding energy per nucleon (BE / A) in MeV using Einstein mass-energy equivalence (1 u = 931.494 MeV).',
    category: 'Science',
    icon: 'text',
    keywords: ['binding energy per nucleon calculator', 'nuclear mass defect formula', 'mev per nucleon calculator online', 'weizsacker semi empirical mass formula', 'nuclear stability binding energy calculator'],
    order: 534,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Protons Z, Neutrons N & Measured Atomic Mass M (amu)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nbe-z">Atomic Number Z (Protons)</label>
          <input class="tool-textarea" id="nbe-z" type="number" step="1" value="26" placeholder="26 (Iron-56)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nbe-n">Neutron Number N</label>
          <input class="tool-textarea" id="nbe-n" type="number" step="1" value="30" placeholder="30 (Iron-56)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nbe-m">Measured Mass M (u)</label>
          <input class="tool-textarea" id="nbe-m" type="number" step="any" value="55.9349" placeholder="55.9349 u" />
        </div>
      </div>
      <div id="nbe-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nbe-res-bea" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.790 MeV / Nucleon</span>
            <span class="stat-label">Binding Energy per Nucleon (BE / A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nbe-res-tot" style="font-weight:700;">492.26 MeV Total (Mass Defect 0.5285 u)</span>
            <span class="stat-label">Total Nuclear Binding Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('nbe-z'), nEl = document.getElementById('nbe-n'), mEl = document.getElementById('nbe-m');
  const beaResEl = document.getElementById('nbe-res-bea'), totResEl = document.getElementById('nbe-res-tot');

  const mp = 1.007276466879;
  const mn = 1.00866491588;
  const mevPerU = 931.4940954;

  function update() {
    const Z = parseInt(zEl.value, 10), N = parseInt(nEl.value, 10), M = parseFloat(mEl.value);
    if (isNaN(Z) || isNaN(N) || isNaN(M) || Z <= 0 || N < 0 || M <= 0) return;

    const A = Z + N;
    const dm = (Z * mp) + (N * mn) - M;
    const totalBeMev = dm * mevPerU;
    const bePerNucleon = totalBeMev / A;

    beaResEl.textContent = bePerNucleon.toFixed(3) + ' MeV / Nucleon';
    totResEl.textContent = totalBeMev.toFixed(2) + ' MeV Total (Mass Defect Δm = ' + dm.toFixed(4) + ' u, A = ' + A + ')';
  }

  [zEl, nEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter atomic number Z (number of protons).',
      'Enter neutron number N (Mass number A = Z + N).',
      'Enter experimentally measured neutral isotope atomic mass in atomic mass units (u).',
      'Inspect mass defect in amu, total binding energy in MeV, and binding energy per nucleon (BE/A).'
    ],
    benefitTitle: 'The Iron-56 Peak of Nuclear Stability',
    benefitContent: 'Iron-56 and Nickel-62 sit at the highest peak of the binding energy curve (~8.8 MeV/nucleon); elements lighter than iron release energy via nuclear fusion, while elements heavier than iron release energy via nuclear fission.',
    faqs: [{ q: 'What is 1 atomic mass unit (u) in energy?', a: '1 u = 931.494 MeV of equivalent mass-energy (E = mc²).' }]
  },

  // 2. Nuclear Reaction Q-Value Energy Release Calculator
  {
    slug: 'nuclear-reaction-q-value-energy-calculator',
    name: 'Nuclear Reaction Q-Value Energy Release Calculator',
    description: 'Calculate nuclear reaction energy release Q-value (Q = (Σ m_reactants - Σ m_products) · c²) in MeV and Joules to determine exoergic (positive Q) vs endoergic reactions.',
    category: 'Science',
    icon: 'text',
    keywords: ['nuclear q value calculator', 'nuclear reaction energy release formula', 'exoergic endoergic nuclear q value online', 'mass defect q value mev calculator', 'deuterium tritium fusion q value online'],
    order: 535,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reactant Masses (amu) & Product Masses (amu)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qv-r">Reactant Masses Sum (u)</label>
          <input class="tool-textarea" id="qv-r" type="number" step="any" value="5.03013" placeholder="5.03013 u (²H + ³H Fusion)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qv-p">Product Masses Sum (u)</label>
          <input class="tool-textarea" id="qv-p" type="number" step="any" value="5.01127" placeholder="5.01127 u (⁴He + n)" />
        </div>
      </div>
      <div id="qv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qv-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">+17.57 MeV</span>
            <span class="stat-label">Reaction Q-Value Energy</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qv-res-type" style="color:var(--green-dark); font-weight:700;">Exoergic (Energy Released: 2.81 × 10⁻¹² J)</span>
            <span class="stat-label">Thermodynamic Nature</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('qv-r'), pEl = document.getElementById('qv-p');
  const qResEl = document.getElementById('qv-res-q'), tResEl = document.getElementById('qv-res-type');

  const mevPerU = 931.4940954;
  const joulesPerMev = 1.602176634e-13;

  function update() {
    const mR = parseFloat(rEl.value), mP = parseFloat(pEl.value);
    if (isNaN(mR) || isNaN(mP) || mR <= 0 || mP <= 0) return;

    const dm = mR - mP;
    const qMev = dm * mevPerU;
    const qJoules = qMev * joulesPerMev;

    qResEl.textContent = (qMev >= 0 ? '+' : '') + qMev.toFixed(2) + ' MeV';

    if (qMev > 0) {
      tResEl.textContent = 'Exoergic (Energy Released: ' + (qJoules * 1e12).toFixed(2) + ' pJ per reaction event)';
      tResEl.style.color = '#22543d';
    } else {
      tResEl.textContent = 'Endoergic Threshold Reaction (Requires |Q| = ' + Math.abs(qMev).toFixed(2) + ' MeV input energy)';
      tResEl.style.color = '#c53030';
    }
  }

  rEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total sum of reactant initial nuclear rest masses in atomic mass units (u).',
      'Enter total sum of product final nuclear rest masses in atomic mass units (u).',
      'Inspect Q-value in MeV and Joules, and determine whether the reaction is spontaneously exothermic (exoergic) or requires kinetic threshold energy (endoergic).'
    ],
    benefitTitle: 'Nuclear Mass-to-Energy Conversion',
    benefitContent: 'In the classic Deuterium-Tritium fusion reaction (²H + ³H → ⁴He + n), 0.01886 atomic mass units vanish into pure kinetic energy, releasing an enormous 17.57 MeV per fusion event.',
    faqs: [{ q: 'What is the difference between exoergic and endoergic reactions?', a: 'Exoergic reactions have Q positive and release energy, while endoergic reactions have Q negative and require external kinetic threshold energy to occur.' }]
  },

  // 3. Gamma Ray Half-Value Layer (HVL) & Radiation Attenuation Calculator
  {
    slug: 'gamma-ray-half-value-layer-hvl-shielding-calculator',
    name: 'Gamma Ray Half-Value Layer (HVL) Radiation Shielding Calculator',
    description: 'Calculate gamma ray and X-ray radiation shielding attenuation (I = I₀ · e^(-μ · x) = I₀ · (1/2)^(x / HVL)) from linear attenuation coefficient μ and shield thickness.',
    category: 'Science',
    icon: 'text',
    keywords: ['half value layer calculator', 'radiation shielding hvl formula', 'gamma ray lead shielding attenuation calculator', 'linear attenuation coefficient mu online', 'radiation protection tenth value layer tvl calculator'],
    order: 536,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Shielding Material, Shield Thickness x (cm) & Initial Dose Rate I₀ (mSv/hr)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hvl-mat">Shield Material (HVL @ 1 MeV)</label>
          <select class="tool-textarea" id="hvl-mat">
            <option value="0.86" selected>Lead (Pb, HVL = 0.86 cm)</option>
            <option value="1.50">Steel / Iron (Fe, HVL = 1.50 cm)</option>
            <option value="4.50">Standard Concrete (HVL = 4.50 cm)</option>
            <option value="10.0">Water (HVL = 10.0 cm)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hvl-x">Shield Thickness x (cm)</label>
          <input class="tool-textarea" id="hvl-x" type="number" step="any" value="2.58" placeholder="2.58 cm (3 HVL)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hvl-i0">Initial Dose I₀ (mSv/hr)</label>
          <input class="tool-textarea" id="hvl-i0" type="number" step="any" value="100.0" placeholder="100.0 mSv/hr" />
        </div>
      </div>
      <div id="hvl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hvl-res-i" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">12.50 mSv / hr</span>
            <span class="stat-label">Transmitted Radiation Dose Rate (I)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hvl-res-att" style="font-weight:700;">87.5% Attenuation (3.00 HVL Layers)</span>
            <span class="stat-label">Shielding Attenuation Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('hvl-mat'), xEl = document.getElementById('hvl-x'), i0El = document.getElementById('hvl-i0');
  const iResEl = document.getElementById('hvl-res-i'), attResEl = document.getElementById('hvl-res-att');

  function update() {
    const hvlCm = parseFloat(matEl.value), xCm = parseFloat(xEl.value), i0 = parseFloat(i0El.value);
    if (isNaN(hvlCm) || isNaN(xCm) || isNaN(i0) || hvlCm <= 0 || xCm < 0 || i0 <= 0) return;

    const nHvl = xCm / hvlCm;
    const I = i0 * Math.pow(0.5, nHvl);
    const attPct = (1 - (I / i0)) * 100;
    const mu = Math.LN2 / hvlCm;

    iResEl.textContent = I.toFixed(2) + ' mSv / hr';
    attResEl.textContent = attPct.toFixed(1) + '% Blocked (' + nHvl.toFixed(2) + ' HVL, μ = ' + mu.toFixed(3) + ' cm⁻¹)';
  }

  matEl.addEventListener('change', update);
  xEl.addEventListener('input', update);
  i0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select radiation barrier material (Lead, Steel, Concrete, Water).',
      'Enter physical shielding barrier thickness x in centimeters.',
      'Enter unshielded initial radiation exposure rate in mSv/hr.',
      'Inspect attenuated transmitted dose rate, linear absorption coefficient μ, and total percentage reduction.'
    ],
    benefitTitle: 'Beer-Lambert Exponential Radiation Attenuation',
    benefitContent: 'Gamma photons undergo photoelectric absorption and Compton scattering; each Half-Value Layer (HVL) cuts radiation intensity by exactly 50% (I = I₀ · 2^(-x/HVL)), and 10 HVLs reduce dose by over 99.9%.',
    faqs: [{ q: 'What is a Tenth-Value Layer (TVL)?', a: 'A Tenth-Value Layer (TVL = 3.32 × HVL) is the shield thickness required to reduce radiation intensity to exactly 10% of its initial level.' }]
  },

  // 4. Alpha Decay Quantum Tunneling Half-Life (Geiger-Nuttall Law) Calculator
  {
    slug: 'alpha-decay-geiger-nuttall-half-life-calculator',
    name: 'Alpha Decay Half-Life (Geiger-Nuttall Law) Calculator',
    description: 'Calculate radioactive alpha decay half-life (log₁₀(t₁/₂) = A + B · Z / √E_α) and Gamow quantum tunneling probability through the nuclear Coulomb barrier.',
    category: 'Science',
    icon: 'text',
    keywords: ['geiger nuttall law calculator', 'alpha decay half life formula', 'gamow quantum tunneling alpha decay calculator', 'coulomb barrier alpha particle energy online', 'nuclear physics alpha decay calculator'],
    order: 537,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Daughter Nucleus Z & Alpha Particle Kinetic Energy E_α (MeV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gn-z">Daughter Z (Atomic Number)</label>
          <input class="tool-textarea" id="gn-z" type="number" step="1" value="90" placeholder="90 (Thorium from Uranium-238)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gn-e">Alpha Energy E_α (MeV)</label>
          <input class="tool-textarea" id="gn-e" type="number" step="any" value="4.20" placeholder="4.20 MeV (U-238 Alpha)" />
        </div>
      </div>
      <div id="gn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gn-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.47 × 10⁹ Years</span>
            <span class="stat-label">Estimated Alpha Half-Life (t₁/₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gn-res-log" style="font-weight:700;">log₁₀(t₁/₂ in sec) = 17.15</span>
            <span class="stat-label">Quantum Coulomb Tunneling Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('gn-z'), eEl = document.getElementById('gn-e');
  const tResEl = document.getElementById('gn-res-t'), logResEl = document.getElementById('gn-res-log');

  function update() {
    const Z = parseFloat(zEl.value), E_alpha = parseFloat(eEl.value);
    if (isNaN(Z) || isNaN(E_alpha) || Z <= 0 || E_alpha <= 0) return;

    const log10_t_sec = (1.61 * (Z / Math.sqrt(E_alpha))) - 28.5;
    const t_sec = Math.pow(10, log10_t_sec);
    const t_years = t_sec / 31557600;

    let timeStr = '';
    if (t_years >= 1e9) timeStr = (t_years / 1e9).toFixed(2) + ' Billion Years';
    else if (t_years >= 1e6) timeStr = (t_years / 1e6).toFixed(2) + ' Million Years';
    else if (t_years >= 1.0) timeStr = t_years.toFixed(1) + ' Years';
    else if (t_sec >= 86400) timeStr = (t_sec / 86400).toFixed(1) + ' Days';
    else if (t_sec >= 1.0) timeStr = t_sec.toFixed(2) + ' Seconds';
    else timeStr = (t_sec * 1000).toFixed(2) + ' Milliseconds';

    tResEl.textContent = timeStr;
    logResEl.textContent = 'log₁₀(t₁/₂ in sec) = ' + log10_t_sec.toFixed(2) + ' (E_α = ' + E_alpha.toFixed(2) + ' MeV)';
  }

  zEl.addEventListener('input', update);
  eEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter atomic number Z of the daughter nucleus.',
      'Enter kinetic energy of the emitted alpha particle E_α in MeV.',
      'Inspect quantum tunneling half-life and Gamow barrier penetration scaling.'
    ],
    benefitTitle: 'George Gamow 1928 Quantum Tunneling Triumph',
    benefitContent: 'A small change in alpha particle energy causes a multi-order-of-magnitude collapse in half-life because quantum tunneling through the Coulomb barrier is exponentially sensitive to energy.',
    faqs: [{ q: 'Why does U-238 have a 4.5-billion-year half-life while Polonium-212 has 0.3 microseconds?', a: 'Uranium-238 emits 4.2 MeV alphas (thick barrier), while Po-212 emits 8.8 MeV alphas (narrow barrier, tunneling faster).' }]
  },

  // 5. Neutron Moderation Logarithmic Energy Decrement (Lethargy) Calculator
  {
    slug: 'neutron-moderation-lethargy-decrement-calculator',
    name: 'Neutron Moderation Lethargy & Collision Number Calculator',
    description: 'Calculate average logarithmic neutron energy decrement per collision (ξ = 1 + ((A - 1)² / (2 · A)) · ln((A - 1) / (A + 1))) and total collisions required to thermalize fast fission neutrons.',
    category: 'Science',
    icon: 'text',
    keywords: ['neutron moderation calculator', 'lethargy xi formula nuclear reactor', 'collisions to thermalize neutron calculator', 'nuclear moderator graphite water heavy water online', 'neutron energy decrement calculator'],
    order: 538,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Moderator Atomic Mass A (amu), Fast Energy E₀ (MeV) & Thermal Energy E_th (eV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mod-a">Moderator Mass A (amu)</label>
          <select class="tool-textarea" id="mod-a">
            <option value="1.008" selected>Light Water (Hydrogen H-1, A = 1)</option>
            <option value="2.014">Heavy Water (Deuterium H-2, A = 2)</option>
            <option value="9.012">Beryllium (Be-9, A = 9)</option>
            <option value="12.011">Graphite (Carbon C-12, A = 12)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="mod-e0">Initial Fast Energy (MeV)</label>
          <input class="tool-textarea" id="mod-e0" type="number" step="any" value="2.0" placeholder="2.0 MeV (Fission Neutron)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mod-eth">Thermal Energy (eV)</label>
          <input class="tool-textarea" id="mod-eth" type="number" step="any" value="0.025" placeholder="0.025 eV (Thermal Room Temp)" />
        </div>
      </div>
      <div id="mod-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mod-res-n" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">18 Collisions</span>
            <span class="stat-label">Collisions to Thermalize (N = u / ξ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mod-res-xi" style="font-weight:700;">ξ = 0.999 (Hydrogen H-1)</span>
            <span class="stat-label">Mean Logarithmic Decrement (ξ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('mod-a'), e0El = document.getElementById('mod-e0'), ethEl = document.getElementById('mod-eth');
  const nResEl = document.getElementById('mod-res-n'), xiResEl = document.getElementById('mod-res-xi');

  function update() {
    const A = parseFloat(aEl.value), e0Mev = parseFloat(e0El.value), ethEv = parseFloat(ethEl.value);
    if (isNaN(A) || isNaN(e0Mev) || isNaN(ethEv) || A < 1 || e0Mev <= 0 || ethEv <= 0) return;

    const e0Ev = e0Mev * 1e6;
    const u = Math.log(e0Ev / ethEv);

    let xi = 1.0;
    if (Math.abs(A - 1.0) < 0.05) {
      xi = 1.0;
    } else {
      const term1 = Math.pow(A - 1, 2) / (2 * A);
      const term2 = Math.log((A - 1) / (A + 1));
      xi = 1 + (term1 * term2);
    }

    const nCollisions = Math.ceil(u / xi);

    nResEl.textContent = nCollisions + ' Collisions to Thermal Energy';
    xiResEl.textContent = 'ξ = ' + xi.toFixed(3) + ' (Total Lethargy u = ' + u.toFixed(2) + ')';
  }

  aEl.addEventListener('change', update);
  e0El.addEventListener('input', update);
  ethEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select reactor moderator material (Light water, Heavy water, Beryllium, Graphite).',
      'Enter initial fast fission neutron kinetic energy in MeV (2.0 MeV standard).',
      'Enter target thermalized neutron kinetic energy in eV (0.025 eV room temperature thermal equilibrium).',
      'Inspect mean logarithmic energy decrement ξ and number of elastic scattering collisions required to thermalize neutrons.'
    ],
    benefitTitle: 'Enrico Fermi Neutron Moderation Theory',
    benefitContent: 'Light water (Hydrogen-1) has an atomic mass nearly identical to a neutron (A=1), maximizing kinetic energy transfer per collision (ξ = 1.0) so fast 2 MeV neutrons thermalize in just 18 collisions compared to 114 in graphite.',
    faqs: [{ q: 'Why is heavy water (D₂O) used in CANDU reactors despite needing 25 collisions?', a: 'Because Deuterium has a neutron absorption cross-section hundreds of times smaller than light hydrogen, allowing reactors to run on unenriched natural Uranium.' }]
  },

  // --- Suite SSS: Plasma Physics & Fusion Energy (661 - 665) ---
  // 6. Debye Length Screening & Plasma Parameter Calculator
  {
    slug: 'debye-length-screening-plasma-parameter-calculator',
    name: 'Debye Length (λ_D) & Plasma Parameter Calculator',
    description: 'Calculate electrostatic Debye screening length (λ_D = √(ε₀ · k_B · T_e / (n_e · q²))) in micrometers and number of particles in a Debye sphere (N_D) for fusion tokamaks and space plasmas.',
    category: 'Science',
    icon: 'text',
    keywords: ['debye length calculator', 'plasma screening length formula', 'debye sphere nd calculator online', 'tokamak plasma electron temperature density calculator', 'astrophysics debye shielding online'],
    order: 539,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electron Density n_e (m⁻³) & Electron Temperature T_e (eV or K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="deb-ne">Density n_e (m⁻³)</label>
          <input class="tool-textarea" id="deb-ne" type="number" step="any" value="1e20" placeholder="1e20 m⁻³ (Tokamak Core)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="deb-te">Temp T_e (eV)</label>
          <input class="tool-textarea" id="deb-te" type="number" step="any" value="10000" placeholder="10,000 eV (10 keV Fusion)" />
        </div>
      </div>
      <div id="deb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="deb-res-lam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">74.3 μm</span>
            <span class="stat-label">Debye Screening Length (λ_D)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="deb-res-nd" style="font-weight:700;">N_D = 1.72 × 10⁸ particles</span>
            <span class="stat-label">Plasma Parameter (N_D in Debye Sphere)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const neEl = document.getElementById('deb-ne'), teEl = document.getElementById('deb-te');
  const lamResEl = document.getElementById('deb-res-lam'), ndResEl = document.getElementById('deb-res-nd');

  function update() {
    const ne = parseFloat(neEl.value), teEv = parseFloat(teEl.value);
    if (isNaN(ne) || isNaN(teEv) || ne <= 0 || teEv <= 0) return;

    const lamDM = 7434.3 * Math.sqrt(teEv / ne);
    const lamDUm = lamDM * 1e6;
    const ND = (4 / 3) * Math.PI * ne * Math.pow(lamDM, 3);

    if (lamDUm >= 1000) {
      lamResEl.textContent = (lamDUm / 1000).toFixed(2) + ' mm (Debye Length)';
    } else {
      lamResEl.textContent = lamDUm.toFixed(1) + ' μm (Debye Length)';
    }

    ndResEl.textContent = 'N_D = ' + ND.toExponential(2) + ' particles (Quasineutral Plasma Criterion Met: N_D >> 1)';
  }

  neEl.addEventListener('input', update);
  teEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter plasma electron number density n_e in particles per cubic meter.',
      'Enter plasma electron temperature T_e in electron-volts (1 eV = 11,604 Kelvin).',
      'Inspect electrostatic Debye shielding length λ_D and plasma parameter N_D.'
    ],
    benefitTitle: 'Peter Debye Quasineutrality Criterion',
    benefitContent: 'For an ionized gas to behave collectively as true plasma rather than isolated charged particles, the system dimensions must be much larger than the Debye length and the Debye sphere must contain millions of shielding electrons.',
    faqs: [{ q: 'What is 10 keV in temperature?', a: '10 keV = 10,000 eV ≈ 116 Million Kelvin (the core temperature inside magnetic fusion reactors).' }]
  },

  // 7. Lawson Criterion Fusion Triple Product Calculator
  {
    slug: 'lawson-criterion-fusion-triple-product-calculator',
    name: 'Lawson Criterion Fusion Triple Product (n · T · τ_E) Calculator',
    description: 'Calculate nuclear fusion ignition triple product (n · T · τ_E) in keV·s/m³ to evaluate magnetic confinement breakeven (Q = 1) and steady-state ignition.',
    category: 'Science',
    icon: 'text',
    keywords: ['lawson criterion calculator', 'fusion triple product formula n t tau', 'tokamak ignition breakeven calculator', 'iter energy confinement time calculator online', 'nuclear fusion lawson criterion online'],
    order: 540,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ion Density n (m⁻³), Ion Temp T (keV) & Confinement Time τ_E (seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="law-n">Density n (m⁻³)</label>
          <input class="tool-textarea" id="law-n" type="number" step="any" value="1.0e20" placeholder="1.0e20 m⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="law-t">Temp T (keV)</label>
          <input class="tool-textarea" id="law-t" type="number" step="any" value="15.0" placeholder="15.0 keV (174M Kelvin)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="law-tau">Confinement τ_E (s)</label>
          <input class="tool-textarea" id="law-tau" type="number" step="any" value="3.5" placeholder="3.5 seconds (ITER Target)" />
        </div>
      </div>
      <div id="law-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="law-res-trip" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.25 × 10²¹ keV·s/m³</span>
            <span class="stat-label">Fusion Triple Product (n · T · τ_E)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="law-res-stat" style="color:var(--green-dark); font-weight:700;">EXCEEDS D-T IGNITION THRESHOLD (3 × 10²¹)</span>
            <span class="stat-label">Fusion Breakeven & Ignition Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('law-n'), tEl = document.getElementById('law-t'), tauEl = document.getElementById('law-tau');
  const tripResEl = document.getElementById('law-res-trip'), stResEl = document.getElementById('law-res-stat');

  function update() {
    const n = parseFloat(nEl.value), T = parseFloat(tEl.value), tau = parseFloat(tauEl.value);
    if (isNaN(n) || isNaN(T) || isNaN(tau) || n <= 0 || T <= 0 || tau <= 0) return;

    const triple = n * T * tau;
    tripResEl.textContent = triple.toExponential(2) + ' keV·s / m³';

    if (triple >= 3.0e21) {
      stResEl.textContent = 'SELF-SUSTAINING IGNITION (n·T·τ ≥ 3×10²¹: Burns without external heating)';
      stResEl.style.color = '#22543d';
    } else if (triple >= 1.0e21) {
      stResEl.textContent = 'SCIENTIFIC BREAKEVEN Q > 1 (Net Power Production)';
      stResEl.style.color = '#2563eb';
    } else {
      stResEl.textContent = 'SUB-BREAKEVEN (n·T·τ < 10²¹: Heat losses exceed fusion alpha heating)';
      stResEl.style.color = '#d97706';
    }
  }

  [nEl, tEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter plasma core ion density n in particles/m³.',
      'Enter ion temperature T in keV.',
      'Enter energy confinement time τ_E in seconds.',
      'Inspect fusion triple product and ignition threshold status.'
    ],
    benefitTitle: 'John D. Lawson 1955 Ignition Criterion',
    benefitContent: 'Lawson proved that fusion power output will only exceed bremsstrahlung radiation heat losses when the product of density, temperature, and thermal confinement time surpasses 3 × 10²¹ keV·s/m³.',
    faqs: [{ q: 'What is ITER\'s design triple product target?', a: 'ITER aims to achieve n · T · τ_E ≈ 5 × 10²¹ keV·s/m³, generating Q=10 (500 MW fusion power from 50 MW input).' }]
  },

  // 8. Plasma Electron Frequency & Cutoff Density Calculator
  {
    slug: 'plasma-frequency-cutoff-density-calculator',
    name: 'Plasma Electron Frequency (ω_pe) & EM Wave Cutoff Calculator',
    description: 'Calculate natural plasma oscillation frequency (ω_pe = √(n_e · q² / (ε₀ · m_e)) / 2π) in MHz/GHz and critical electron cutoff density for ionospheric radio reflection and microwave plasma heating.',
    category: 'Science',
    icon: 'text',
    keywords: ['plasma frequency calculator', 'electron plasma frequency formula omega pe', 'ionosphere radio reflection cutoff frequency online', 'plasma critical cutoff density calculator', 'microwave o mode x mode plasma cutoff online'],
    order: 541,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electron Density n_e (m⁻³ or cm⁻³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pef-ne">Density n_e (m⁻³)</label>
          <input class="tool-textarea" id="pef-ne" type="number" step="any" value="1.0e12" placeholder="1.0e12 m⁻³ (Ionosphere F-Layer)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pef-reg">Plasma Preset</label>
          <select class="tool-textarea" id="pef-reg">
            <option value="custom" selected>Custom Density</option>
            <option value="1e12">10¹² m⁻³ (Earth Ionosphere F-Layer ~9 MHz)</option>
            <option value="1e18">10¹⁸ m⁻³ (Glow Discharge Neon Sign)</option>
            <option value="1e20">10²⁰ m⁻³ (Tokamak Fusion Core ~90 GHz)</option>
          </select>
        </div>
      </div>
      <div id="pef-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pef-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.98 MHz</span>
            <span class="stat-label">Plasma Frequency (f_pe = 8.98 · √n_e)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pef-res-refl" style="font-weight:700;">Reflects Radio Waves Below 8.98 MHz</span>
            <span class="stat-label">Electromagnetic Transmission Cutoff</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const neEl = document.getElementById('pef-ne'), regEl = document.getElementById('pef-reg');
  const fResEl = document.getElementById('pef-res-f'), rResEl = document.getElementById('pef-res-refl');

  function update() {
    const ne = parseFloat(neEl.value);
    if (isNaN(ne) || ne <= 0) return;

    const fHz = 8.9786 * Math.sqrt(ne);
    const fMhz = fHz / 1e6;
    const fGhz = fHz / 1e9;

    if (fGhz >= 1.0) {
      fResEl.textContent = fGhz.toFixed(2) + ' GHz (Plasma Frequency)';
      rResEl.textContent = 'Reflects microwaves below ' + fGhz.toFixed(2) + ' GHz (O-Mode Cutoff)';
    } else {
      fResEl.textContent = fMhz.toFixed(2) + ' MHz (Plasma Frequency)';
      rResEl.textContent = 'Reflects HF radio waves below ' + fMhz.toFixed(2) + ' MHz (Skywave Skip Distance)';
    }
  }

  regEl.addEventListener('change', () => {
    if (regEl.value !== 'custom') {
      neEl.value = regEl.value;
      update();
    }
  });

  neEl.addEventListener('input', () => {
    regEl.value = 'custom';
    update();
  });

  update();
})();`,
    howToSteps: [
      'Enter plasma electron density n_e in m⁻³.',
      'Or select presets (Earth Ionosphere, Fluorescent lamp, Tokamak core).',
      'Inspect plasma cutoff oscillation frequency (f_pe ≈ 8.98√n_e) and electromagnetic wave total reflection threshold.'
    ],
    benefitTitle: 'Ionospheric Total Radio Reflection & O-Mode Cutoff',
    benefitContent: 'Electromagnetic waves with frequencies below f_pe cannot propagate through plasma and undergo total internal reflection, enabling global AM/Shortwave skywave radio broadcasting bounced off the ionosphere.',
    faqs: [{ q: 'Why can satellite GPS signals penetrate the ionosphere?', a: 'GPS operates at 1.575 GHz, far above the ionosphere\'s maximum ~10 MHz plasma frequency, allowing the signals to pass without reflection.' }]
  },

  // 9. Larmor Gyroradius & Cyclotron Frequency in Magnetic Fields Calculator
  {
    slug: 'larmor-gyroradius-cyclotron-frequency-calculator',
    name: 'Larmor Gyroradius (r_L) & Cyclotron Frequency Calculator',
    description: 'Calculate charged particle magnetic gyroradius (r_L = (m · v_⊥) / (|q| · B)) in mm and cyclotron gyrofrequency (ω_c = |q| · B / m) in Tesla magnetic fields.',
    category: 'Science',
    icon: 'text',
    keywords: ['larmor radius calculator', 'cyclotron gyrofrequency formula', 'magnetic gyroradius electron ion calculator', 'plasma particle helical orbit calculator online', 'tokamak magnetic confinement larmor radius'],
    order: 542,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle Species, Energy (eV / keV) & Magnetic Field B (Tesla)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lar-spec">Particle Species</label>
          <select class="tool-textarea" id="lar-spec">
            <option value="deuteron" selected>Deuteron Ion (m = 2 u, q = +e)</option>
            <option value="proton">Proton (m = 1 u, q = +e)</option>
            <option value="electron">Electron (m = 9.11e-31 kg, q = -e)</option>
            <option value="alpha">Alpha Particle (m = 4 u, q = +2e)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="lar-e">Perpendicular Energy (keV)</label>
          <input class="tool-textarea" id="lar-e" type="number" step="any" value="10.0" placeholder="10.0 keV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lar-b">Magnetic Field B (Tesla)</label>
          <input class="tool-textarea" id="lar-b" type="number" step="any" value="5.0" placeholder="5.0 Tesla (High Field Superconductor)" />
        </div>
      </div>
      <div id="lar-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lar-res-rl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.09 mm</span>
            <span class="stat-label">Larmor Gyro-Radius (r_L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lar-res-fc" style="font-weight:700;">38.16 MHz (f_c)</span>
            <span class="stat-label">Cyclotron Frequency (q·B / 2πm)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('lar-spec'), eEl = document.getElementById('lar-e'), bEl = document.getElementById('lar-b');
  const rlResEl = document.getElementById('lar-res-rl'), fcResEl = document.getElementById('lar-res-fc');

  const q_e = 1.602176634e-19;
  const u_kg = 1.66053906660e-27;
  const me_kg = 9.1093837015e-31;

  const SPECIES = {
    'deuteron': { m: 2.014 * u_kg, q: 1 * q_e },
    'proton':   { m: 1.007 * u_kg, q: 1 * q_e },
    'electron': { m: me_kg,        q: 1 * q_e },
    'alpha':    { m: 4.001 * u_kg, q: 2 * q_e }
  };

  function update() {
    const spec = SPECIES[sEl.value], eKev = parseFloat(eEl.value), B = parseFloat(bEl.value);
    if (isNaN(eKev) || isNaN(B) || eKev <= 0 || B <= 0) return;

    const eJoules = eKev * 1000 * q_e;
    const vPerp = Math.sqrt((2 * eJoules) / spec.m);
    const rL_m = (spec.m * vPerp) / (spec.q * B);
    const rL_mm = rL_m * 1000;
    const rL_um = rL_m * 1e6;

    const fcHz = (spec.q * B) / (2 * Math.PI * spec.m);
    const fcMhz = fcHz / 1e6;
    const fcGhz = fcHz / 1e9;

    if (rL_mm >= 1.0) {
      rlResEl.textContent = rL_mm.toFixed(2) + ' mm (Larmor Radius)';
    } else {
      rlResEl.textContent = rL_um.toFixed(1) + ' μm (Larmor Radius)';
    }

    if (fcGhz >= 1.0) {
      fcResEl.textContent = fcGhz.toFixed(2) + ' GHz (Cyclotron Gyrofrequency)';
    } else {
      fcResEl.textContent = fcMhz.toFixed(2) + ' MHz (Cyclotron Gyrofrequency)';
    }
  }

  sEl.addEventListener('change', update);
  eEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select charged particle species (Deuteron, Proton, Electron, Alpha particle).',
      'Enter perpendicular kinetic energy in keV.',
      'Enter magnetic field strength B in Tesla (e.g. 5.0 T in modern tokamaks).',
      'Inspect helical gyro-orbit Larmor radius r_L and cyclotron resonance heating frequency f_c.'
    ],
    benefitTitle: 'Lorentz Force Helical Gyromotion',
    benefitContent: 'Charged particles are trapped by magnetic fields into tight circular orbits around magnetic field lines; keeping the ion Larmor radius much smaller than the vessel radius is the fundamental principle of magnetic plasma confinement.',
    faqs: [{ q: 'Why is the electron Larmor radius so much smaller than an ion\'s?', a: 'Because electrons have 3,600× less mass than deuterons, their Larmor radius is 60× smaller.' }]
  },

  // 10. Plasma Magnetic Beta (β) Confinement Ratio Calculator
  {
    slug: 'plasma-magnetic-beta-confinement-calculator',
    name: 'Plasma Magnetic Beta (β) Confinement Ratio Calculator',
    description: 'Calculate plasma magnetic pressure confinement efficiency ratio (β = (2 · μ₀ · n · k_B · T) / B²) and Troyon beta stability limit in fusion tokamaks.',
    category: 'Science',
    icon: 'text',
    keywords: ['plasma beta calculator', 'magnetic beta ratio formula beta 2 mu0 p over b2', 'tokamak troyon beta limit calculator', 'magnetic confinement efficiency online', 'plasma kinetic pressure vs magnetic pressure calculator'],
    order: 543,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Plasma Density n (m⁻³), Temp T (keV) & Magnetic Field B (Tesla)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bet-n">Density n (m⁻³)</label>
          <input class="tool-textarea" id="bet-n" type="number" step="any" value="1.0e20" placeholder="1.0e20 m⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bet-t">Temp T (keV)</label>
          <input class="tool-textarea" id="bet-t" type="number" step="any" value="10.0" placeholder="10.0 keV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bet-b">Field B (Tesla)</label>
          <input class="tool-textarea" id="bet-b" type="number" step="any" value="5.3" placeholder="5.3 Tesla (ITER Field)" />
        </div>
      </div>
      <div id="bet-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bet-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">β = 2.87%</span>
            <span class="stat-label">Plasma Magnetic Beta (β)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bet-res-press" style="font-weight:700;">Kinetic: 3.20 bar | Magnetic: 111.7 bar</span>
            <span class="stat-label">Plasma Kinetic Pressure vs Magnetic Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('bet-n'), tEl = document.getElementById('bet-t'), bEl = document.getElementById('bet-b');
  const pctResEl = document.getElementById('bet-res-pct'), prsResEl = document.getElementById('bet-res-press');

  const mu0 = 4 * Math.PI * 1e-7;
  const q_e = 1.602176634e-19;

  function update() {
    const n = parseFloat(nEl.value), tKev = parseFloat(tEl.value), B = parseFloat(bEl.value);
    if (isNaN(n) || isNaN(tKev) || isNaN(B) || n <= 0 || tKev <= 0 || B <= 0) return;

    const pKineticPa = 2 * n * (tKev * 1000 * q_e);
    const pMagPa = Math.pow(B, 2) / (2 * mu0);
    const beta = pKineticPa / pMagPa;
    const betaPct = beta * 100;

    const pKineticBar = pKineticPa / 1e5;
    const pMagBar = pMagPa / 1e5;

    pctResEl.textContent = 'β = ' + betaPct.toFixed(2) + '% (Ratio P_kinetic / P_magnetic)';
    prsResEl.textContent = 'Kinetic: ' + pKineticBar.toFixed(2) + ' bar | Magnetic: ' + pMagBar.toFixed(1) + ' bar (' + (betaPct <= 5.0 ? 'Within Tokamak Troyon Limit' : 'High Beta') + ')';
  }

  [nEl, tEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter plasma number density n in particles/m³.',
      'Enter plasma core temperature in keV.',
      'Enter confining toroidal magnetic field strength B in Tesla.',
      'Inspect plasma beta ratio and hydrostatic pressure balance.'
    ],
    benefitTitle: 'Magnetic Confinement Economic Figure of Merit',
    benefitContent: 'Beta measures how efficiently costly superconducting magnetic field coils confine hot plasma; tokamaks operate safely at 2% to 5% beta, limited by magnetohydrodynamic ballooning and kink instabilities.',
    faqs: [{ q: 'What is the magnetic pressure of a 5 Tesla field?', a: 'P_mag = B² / 2μ₀ ≈ 99.5 atmospheres (bars).' }]
  },

  // --- Suite TTT: Particle Accelerators & Synchrotron Radiation (666 - 670) ---
  // 11. Synchrotron Radiation Power Loss Calculator
  {
    slug: 'synchrotron-radiation-power-loss-calculator',
    name: 'Synchrotron Radiation Power Loss & Energy Radiated Calculator',
    description: 'Calculate relativistic synchrotron radiation power loss per electron turn (ΔE = (q² · γ⁴) / (3 · ε₀ · R) = 88.5 · E⁴ / R) in keV per revolution in circular particle storage rings.',
    category: 'Science',
    icon: 'text',
    keywords: ['synchrotron radiation power loss calculator', 'delta e 88.5 e4 over r formula', 'electron storage ring synchrotron energy loss online', 'relativistic gamma fourth radiation calculator', 'particle accelerator synchrotron light calculator'],
    order: 544,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Beam Energy E (GeV), Bending Radius R (meters) & Current I (mA)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="syn-e">Beam Energy E (GeV)</label>
          <input class="tool-textarea" id="syn-e" type="number" step="any" value="3.0" placeholder="3.0 GeV (3rd Gen Synchrotron)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="syn-r">Bending Radius R (m)</label>
          <input class="tool-textarea" id="syn-r" type="number" step="any" value="8.0" placeholder="8.0 meters" />
        </div>
        <div class="control-group">
          <label class="control-label" for="syn-curr">Beam Current (mA)</label>
          <input class="tool-textarea" id="syn-curr" type="number" step="any" value="500" placeholder="500 mA (0.5 A)" />
        </div>
      </div>
      <div id="syn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="syn-res-de" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">896.1 keV / turn</span>
            <span class="stat-label">Energy Loss per Electron Revolution (ΔE)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="syn-res-pwr" style="font-weight:700;">448.0 kW Total X-Ray Power</span>
            <span class="stat-label">Total Radiated Synchrotron Light Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('syn-e'), rEl = document.getElementById('syn-r'), cEl = document.getElementById('syn-curr');
  const deResEl = document.getElementById('syn-res-de'), pwrResEl = document.getElementById('syn-res-pwr');

  function update() {
    const eGev = parseFloat(eEl.value), rM = parseFloat(rEl.value), currMa = parseFloat(cEl.value);
    if (isNaN(eGev) || isNaN(rM) || isNaN(currMa) || eGev <= 0 || rM <= 0 || currMa <= 0) return;

    const deltaE_keV = (88.5 * Math.pow(eGev, 4)) / rM;
    const deltaE_MeV = deltaE_keV / 1000;
    const totalPwrKw = (deltaE_keV * currMa) / 1000;
    const gamma = (eGev * 1e9) / 511000;

    deResEl.textContent = (deltaE_keV >= 1000 ? (deltaE_MeV).toFixed(2) + ' MeV' : deltaE_keV.toFixed(1) + ' keV') + ' / turn (γ = ' + Math.round(gamma).toLocaleString() + ')';
    pwrResEl.textContent = totalPwrKw.toFixed(1) + ' kW Synchrotron Light (E⁴ Scaling: ' + (Math.pow(eGev, 4)).toFixed(0) + ')';
  }

  [eEl, rEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter electron relativistic beam energy in Giga-electronvolts (GeV).',
      'Enter dipole bending magnet trajectory radius R in meters.',
      'Enter circulating electron beam stored current in milliamperes (mA).',
      'Inspect energy lost per electron per turn in keV and total emitted synchrotron X-ray beam power in kilowatts (kW).'
    ],
    benefitTitle: 'The E⁴ Relativistic Radiation Catastrophe',
    benefitContent: 'Synchrotron radiation power scales with the fourth power of beam energy; doubling electron energy increases RF cavity replenishment power sixteen-fold, creating brilliant X-rays for molecular biology crystallography.',
    faqs: [{ q: 'Why do proton accelerators like the LHC radiate much less than electron rings?', a: 'Protons are 1,836× heavier than electrons, so their synchrotron radiation power is reduced by over 10 trillion times.' }]
  },

  // 12. Relativistic Magnetic Rigidity (B·ρ) Beam Bending Calculator
  {
    slug: 'magnetic-rigidity-beam-bending-calculator',
    name: 'Relativistic Magnetic Rigidity (B · ρ) & Beam Bending Calculator',
    description: 'Calculate particle accelerator magnetic rigidity (B · ρ = p / q = √(E_k² + 2 · E_k · m₀c²) / (q · c)) in Tesla-meters (T·m) and required dipole magnet bending fields.',
    category: 'Science',
    icon: 'text',
    keywords: ['magnetic rigidity calculator', 'b rho formula particle accelerator', 'tesla meters beam rigidity calculator online', 'cyclotron dipole bending radius calculator', 'proton beam magnetic rigidity online'],
    order: 545,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Kinetic Energy E_k (GeV or MeV), Particle Type & Bending Field B (Tesla)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rig-spec">Particle</label>
          <select class="tool-textarea" id="rig-spec">
            <option value="proton" selected>Proton (m₀ = 0.938 GeV/c²)</option>
            <option value="electron">Electron (m₀ = 0.511 MeV/c²)</option>
            <option value="carbon">Carbon-12 C⁶⁺ (Hadron Therapy)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rig-ek">Kinetic Energy (GeV)</label>
          <input class="tool-textarea" id="rig-ek" type="number" step="any" value="7000" placeholder="7000 GeV (7 TeV LHC Beam)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rig-b">Dipole Field B (Tesla)</label>
          <input class="tool-textarea" id="rig-b" type="number" step="any" value="8.33" placeholder="8.33 T (LHC Superconducting Dipoles)" />
        </div>
      </div>
      <div id="rig-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rig-res-brho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">23,350 T·m</span>
            <span class="stat-label">Magnetic Rigidity (B · ρ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rig-res-rho" style="font-weight:700;">ρ = 2,803 meters Bending Radius</span>
            <span class="stat-label">Ring Bending Dipole Radius (ρ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const spEl = document.getElementById('rig-spec'), ekEl = document.getElementById('rig-ek'), bEl = document.getElementById('rig-b');
  const brResEl = document.getElementById('rig-res-brho'), rhResEl = document.getElementById('rig-res-rho');

  const c = 2.99792458e8;

  function update() {
    const spec = spEl.value, EkGev = parseFloat(ekEl.value), B = parseFloat(bEl.value);
    if (isNaN(EkGev) || isNaN(B) || EkGev <= 0 || B <= 0) return;

    let m0Gev = 0.938272;
    let zCharge = 1;
    if (spec === 'electron') { m0Gev = 0.000511; zCharge = 1; }
    else if (spec === 'carbon') { m0Gev = 12 * 0.9315; zCharge = 6; }

    const Etot = EkGev + m0Gev;
    const pGev_c = Math.sqrt(Math.pow(Etot, 2) - Math.pow(m0Gev, 2));
    const Brho = (1e9 * pGev_c) / (zCharge * c);
    const rhoM = Brho / B;

    brResEl.textContent = Math.round(Brho).toLocaleString() + ' T·m (Rigidity)';
    rhResEl.textContent = 'ρ = ' + Math.round(rhoM).toLocaleString() + ' meters Radius (Total Momentum p = ' + Math.round(pGev_c).toLocaleString() + ' GeV/c)';
  }

  spEl.addEventListener('change', update);
  ekEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select particle beam type (Protons, Electrons, Heavy Carbon ions for cancer therapy).',
      'Enter kinetic energy in GeV.',
      'Enter bending dipole magnet magnetic field strength B in Tesla.',
      'Inspect relativistic magnetic beam rigidity B·ρ and required bending radius ρ.'
    ],
    benefitTitle: 'The 3.3356 Momentum-to-Rigidity Constant',
    benefitContent: 'For single-charge relativistic particles, magnetic rigidity simplifies to B · ρ ≈ 3.3356 × p [GeV/c]; at 7 TeV, LHC protons have a massive 23,350 T·m rigidity, demanding 8.33 Tesla superconducting magnets spanning 27 kilometers.',
    faqs: [{ q: 'What is magnetic rigidity?', a: 'Magnetic rigidity B·ρ = p/q measures a charged particle beam\'s resistance to being bent by a magnetic field.' }]
  },

  // 13. RF Resonant Cavity Shunt Impedance & Quality Factor (Q) Calculator
  {
    slug: 'rf-cavity-shunt-impedance-q-factor-calculator',
    name: 'RF Resonant Cavity Shunt Impedance & Quality Factor (Q₀) Calculator',
    description: 'Calculate RF accelerating cavity dissipated power loss (P = V_acc² / (2 · R_shunt)) and unloaded quality factor (Q₀ = ω · U / P_loss) for superconducting and copper accelerator cavities.',
    category: 'Science',
    icon: 'text',
    keywords: ['rf cavity shunt impedance calculator', 'accelerator cavity q factor formula', 'superconducting rf cavity power loss calculator', 'vacc squared over 2 r shunt online', 'rf cavity transit time factor calculator'],
    order: 546,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Accelerating Voltage V_acc (MV), Shunt Impedance R_s (MΩ) & Frequency f (MHz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rfc-v">Voltage V_acc (MV)</label>
          <input class="tool-textarea" id="rfc-v" type="number" step="any" value="2.0" placeholder="2.0 MV (2 Million Volts)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rfc-rs">Shunt Impedance R_s (MΩ)</label>
          <input class="tool-textarea" id="rfc-rs" type="number" step="any" value="5.0" placeholder="5.0 MΩ (Copper Cavity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rfc-q">Quality Factor Q₀</label>
          <input class="tool-textarea" id="rfc-q" type="number" step="any" value="30000" placeholder="30,000 (Copper) or 1e10 (SRF)" />
        </div>
      </div>
      <div id="rfc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rfc-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">400.0 kW Dissipated</span>
            <span class="stat-label">Cavity Wall RF Power Loss (P_diss)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rfc-res-roq" style="font-weight:700;">R / Q = 166.7 Ω Geometric Ratio</span>
            <span class="stat-label">Characteristic Geometry Factor (R / Q)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('rfc-v'), rEl = document.getElementById('rfc-rs'), qEl = document.getElementById('rfc-q');
  const pResEl = document.getElementById('rfc-res-pwr'), rqResEl = document.getElementById('rfc-res-roq');

  function update() {
    const vMv = parseFloat(vEl.value), rsMohm = parseFloat(rEl.value), Q0 = parseFloat(qEl.value);
    if (isNaN(vMv) || isNaN(rsMohm) || isNaN(Q0) || vMv <= 0 || rsMohm <= 0 || Q0 <= 0) return;

    const vVolts = vMv * 1e6;
    const rsOhms = rsMohm * 1e6;
    const pWatts = (Math.pow(vVolts, 2)) / (2 * rsOhms);
    const pKw = pWatts / 1000;
    const roq = rsOhms / Q0;

    pResEl.textContent = pKw.toFixed(1) + ' kW Dissipated (' + (pKw >= 1000 ? (pKw / 1000).toFixed(2) + ' MW' : pKw.toFixed(1) + ' kW') + ')';
    rqResEl.textContent = 'R / Q = ' + roq.toFixed(1) + ' Ω (Quality Factor Q₀ = ' + (Q0 >= 1e6 ? Q0.toExponential(1) : Math.round(Q0).toLocaleString()) + ')';
  }

  [vEl, rEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter peak accelerating voltage gap V_acc in Megavolts (MV).',
      'Enter cavity effective shunt impedance R_s in Megohms.',
      'Enter unloaded quality factor Q_0 (30,000 for copper, 10¹⁰ for superconducting niobium cavities).',
      'Inspect continuous RF wall dissipation power loss and geometric R/Q ratio.'
    ],
    benefitTitle: 'Superconducting RF Cryogenic Power Advantage',
    benefitContent: 'Normal copper cavities dissipate hundreds of kilowatts in ohmic wall heating; cooling superconducting Niobium cavities with liquid helium to 2 Kelvin boosts Q_0 to 10¹⁰, slashing wall power losses to mere watts.',
    faqs: [{ q: 'What is R/Q in RF cavities?', a: 'R/Q = R_shunt / Q_0 is a purely geometric figure of merit determined exclusively by the cavity shape.' }]
  },

  // 14. Betatron Frequency & Transverse Beam Emittance Calculator
  {
    slug: 'betatron-oscillation-beam-emittance-calculator',
    name: 'Betatron Oscillation & Transverse Beam Emittance (ε) Calculator',
    description: 'Calculate particle accelerator transverse beam envelope size (σ_x = √(ε · β_x)), betatron oscillation wavelength (λ_β = 2 · π · β_x), and normalized emittance (ε_n = γ · β_rel · ε).',
    category: 'Science',
    icon: 'text',
    keywords: ['beam emittance calculator', 'betatron oscillation formula accelerator', 'sigma x sqrt epsilon beta calculator', 'normalized emittance gamma beta online', 'courant snyder twiss parameter calculator'],
    order: 547,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Geometric Emittance ε (nm·rad), Twiss Beta Function β_x (meters) & Beam Energy (GeV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bet-eps">Emittance ε (nm·rad)</label>
          <input class="tool-textarea" id="bet-eps" type="number" step="any" value="2.5" placeholder="2.5 nm·rad (Low Emittance Ring)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bet-bx">Beta Function β_x (m)</label>
          <input class="tool-textarea" id="bet-bx" type="number" step="any" value="10.0" placeholder="10.0 meters" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bet-eg">Energy E (GeV)</label>
          <input class="tool-textarea" id="bet-eg" type="number" step="any" value="3.0" placeholder="3.0 GeV Electron" />
        </div>
      </div>
      <div id="bet-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bet-res-sig" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">158.1 μm</span>
            <span class="stat-label">RMS Beam Spot Size (σ_x = √(ε · β))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bet-res-norm" style="font-weight:700;">ε_n = 14.68 mm·mrad</span>
            <span class="stat-label">Normalized Emittance (γ · ε)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('bet-eps'), bEl = document.getElementById('bet-bx'), egEl = document.getElementById('bet-eg');
  const sResEl = document.getElementById('bet-res-sig'), nResEl = document.getElementById('bet-res-norm');

  function update() {
    const epsNm = parseFloat(eEl.value), bxM = parseFloat(bEl.value), egGev = parseFloat(egEl.value);
    if (isNaN(epsNm) || isNaN(bxM) || isNaN(egGev) || epsNm <= 0 || bxM <= 0 || egGev <= 0) return;

    const epsM = epsNm * 1e-9;
    const sigmaM = Math.sqrt(epsM * bxM);
    const sigmaUm = sigmaM * 1e6;
    const gamma = (egGev * 1e9) / 511000;
    const epsNormMm = (gamma * epsM) * 1e6;
    const lamBetaM = 2 * Math.PI * bxM;

    sResEl.textContent = sigmaUm.toFixed(1) + ' μm (RMS Beam Spot Radius)';
    nResEl.textContent = 'ε_n = ' + epsNormMm.toFixed(2) + ' mm·mrad (Betatron λ_β = ' + Math.round(lamBetaM) + ' m)';
  }

  [eEl, bEl, egEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter geometric horizontal beam emittance ε_x in nanometer-radians.',
      'Enter Courant-Snyder Twiss optical beta function β_x in meters.',
      'Enter beam particle energy in GeV.',
      'Inspect transverse RMS beam cross-sectional spot radius σ_x in micrometers and normalized emittance ε_n.'
    ],
    benefitTitle: 'Courant-Snyder Invariant & Liouville Theorem',
    benefitContent: 'Beam emittance defines the phase space volume occupied by the particle bunch in position and angle; lowering emittance creates ultra-dense, ultra-bright particle collisions and brilliant coherence in X-ray free-electron lasers.',
    faqs: [{ q: 'What is the Twiss Beta function (β)?', a: 'The Beta function describes the envelope focal narrowing and widening of the beam along the accelerator lattice produced by quadrupole focusing magnets.' }]
  },

  // 15. Undulator Synchrotron Radiation Wavelength & K-Parameter Calculator
  {
    slug: 'undulator-radiation-wavelength-k-parameter-calculator',
    name: 'Undulator Synchrotron X-Ray Radiation & K-Parameter Calculator',
    description: 'Calculate fundamental X-ray undulator radiation wavelength (λ = (λ_u / (2 · γ²)) · (1 + K² / 2)) and undulator magnetic deflection strength parameter K.',
    category: 'Science',
    icon: 'text',
    keywords: ['undulator radiation wavelength calculator', 'undulator deflection parameter k formula', 'synchrotron undulator x ray energy calculator', 'free electron laser undulator wavelength online', 'photonics undulator harmonics calculator'],
    order: 548,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Undulator Period λ_u (mm), Peak Field B₀ (Tesla) & Beam Energy (GeV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="und-lamu">Period λ_u (mm)</label>
          <input class="tool-textarea" id="und-lamu" type="number" step="any" value="25.0" placeholder="25.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="und-b0">Peak Field B₀ (T)</label>
          <input class="tool-textarea" id="und-b0" type="number" step="any" value="0.85" placeholder="0.85 Tesla" />
        </div>
        <div class="control-group">
          <label class="control-label" for="und-e">Beam Energy E (GeV)</label>
          <input class="tool-textarea" id="und-e" type="number" step="any" value="6.0" placeholder="6.0 GeV (ESRF / APS)" />
        </div>
      </div>
      <div id="und-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="und-res-lam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.285 nm (2.85 Å)</span>
            <span class="stat-label">Fundamental X-Ray Wavelength (λ₁)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="und-res-ev" style="font-weight:700;">4.35 keV X-Ray Photon (K = 1.98)</span>
            <span class="stat-label">Photon Energy & Undulator K-Parameter</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('und-lamu'), bEl = document.getElementById('und-b0'), eEl = document.getElementById('und-e');
  const lamResEl = document.getElementById('und-res-lam'), evResEl = document.getElementById('und-res-ev');

  function update() {
    const lamUMm = parseFloat(uEl.value), b0 = parseFloat(bEl.value), eGev = parseFloat(eEl.value);
    if (isNaN(lamUMm) || isNaN(b0) || isNaN(eGev) || lamUMm <= 0 || b0 <= 0 || eGev <= 0) return;

    const lamUM = lamUMm * 1e-3;
    const K = 0.09337 * b0 * lamUMm;
    const gamma = (eGev * 1e9) / 511000;
    const lamM = (lamUM / (2 * Math.pow(gamma, 2))) * (1 + (Math.pow(K, 2) / 2));
    const lamNm = lamM * 1e9;
    const lamAngstrom = lamNm * 10;
    const energyKev = 1.239841984 / lamNm;

    lamResEl.textContent = (lamNm < 0.1 ? lamAngstrom.toFixed(2) + ' Å' : lamNm.toFixed(3) + ' nm') + ' (' + lamAngstrom.toFixed(2) + ' Å Hard X-Ray)';
    evResEl.textContent = energyKev.toFixed(2) + ' keV Photons (Undulator Parameter K = ' + K.toFixed(2) + ')';
  }

  [uEl, bEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter undulator magnetic period λ_u in millimeters.',
      'Enter peak on-axis magnetic dipole field B_0 in Tesla.',
      'Enter electron beam kinetic energy in GeV.',
      'Inspect fundamental coherent X-ray photon wavelength in nanometers/Angstroms, photon energy in keV, and dimensionless undulator deflection parameter K.'
    ],
    benefitTitle: 'Relativistic Doppler Blue-Shift in Undulators',
    benefitContent: 'As electrons wiggle through the periodic permanent magnet array, relativistic Lorentz length contraction and forward relativistic Doppler shifting compress a 25 mm magnetic period down into Angstrom-scale coherent hard X-rays.',
    faqs: [{ q: 'What does K < 1 vs K > 1 mean in undulators?', a: 'When K <= 1, the device is a pure linear undulator emitting a single sharp spectral peak; when K >> 1, it acts as a wiggler emitting a broadband synchrotron spectrum.' }]
  },

  // --- Suite UUU: Semiconductor Device Physics (671 - 675) ---
  // 16. PN Junction Built-in Potential (V_bi) & Depletion Width Calculator
  {
    slug: 'pn-junction-builtin-potential-depletion-width-calculator',
    name: 'PN Junction Built-in Potential (V_bi) & Depletion Width Calculator',
    description: 'Calculate silicon PN junction built-in contact potential (V_bi = (k_B · T / q) · ln(N_A · N_D / n_i²)) in Volts and zero-bias depletion layer width W in micrometers.',
    category: 'Science',
    icon: 'text',
    keywords: ['pn junction built in potential calculator', 'vbi formula semiconductor physics', 'depletion layer width calculator online', 'na nd doping silicon vbi calculator', 'built in voltage pn diode online'],
    order: 549,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Acceptor Doping N_A (cm⁻³), Donor Doping N_D (cm⁻³) & Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pn-na">Acceptor N_A (cm⁻³)</label>
          <input class="tool-textarea" id="pn-na" type="number" step="any" value="1.0e16" placeholder="1e16 cm⁻³ (P-type)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pn-nd">Donor N_D (cm⁻³)</label>
          <input class="tool-textarea" id="pn-nd" type="number" step="any" value="1.0e17" placeholder="1e17 cm⁻³ (N-type)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pn-temp">Temperature T (K)</label>
          <input class="tool-textarea" id="pn-temp" type="number" step="any" value="300" placeholder="300 K (Room Temp)" />
        </div>
      </div>
      <div id="pn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pn-res-vbi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.754 Volts (V_bi)</span>
            <span class="stat-label">Built-in Contact Potential (V_bi)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pn-res-w" style="font-weight:700;">W = 0.334 μm (Depletion Width)</span>
            <span class="stat-label">Zero-Bias Depletion Layer Space-Charge Width</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('pn-na'), ndEl = document.getElementById('pn-nd'), tEl = document.getElementById('pn-temp');
  const vResEl = document.getElementById('pn-res-vbi'), wResEl = document.getElementById('pn-res-w');

  const eps0 = 8.8541878128e-12;
  const eps_si = 11.7 * eps0;
  const q_e = 1.602176634e-19;
  const kB = 1.380649e-23;

  function update() {
    const Na_cm3 = parseFloat(naEl.value), Nd_cm3 = parseFloat(ndEl.value), T = parseFloat(tEl.value);
    if (isNaN(Na_cm3) || isNaN(Nd_cm3) || isNaN(T) || Na_cm3 <= 0 || Nd_cm3 <= 0 || T <= 0) return;

    const Vt = (kB * T) / q_e;
    const ni = 1.5e10 * Math.pow(T / 300, 1.5) * Math.exp(-((1.12 * q_e) / (2 * kB)) * (1 / T - 1 / 300));
    const Vbi = Vt * Math.log((Na_cm3 * Nd_cm3) / Math.pow(ni, 2));

    const Na_m3 = Na_cm3 * 1e6;
    const Nd_m3 = Nd_cm3 * 1e6;
    const W_m = Math.sqrt(((2 * eps_si) / q_e) * ((1 / Na_m3) + (1 / Nd_m3)) * Vbi);
    const W_um = W_m * 1e6;

    vResEl.textContent = Vbi.toFixed(3) + ' Volts (V_bi @ ' + T + ' K)';
    wResEl.textContent = 'W = ' + W_um.toFixed(3) + ' μm (Thermal Voltage V_t = ' + (Vt * 1000).toFixed(1) + ' mV)';
  }

  [naEl, ndEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter p-side acceptor doping concentration N_A in cm⁻³.',
      'Enter n-side donor doping concentration N_D in cm⁻³.',
      'Enter junction operating temperature in Kelvin.',
      'Inspect built-in contact potential V_bi and zero-bias depletion space-charge layer thickness in micrometers.'
    ],
    benefitTitle: 'Carrier Diffusion vs Drift Equilibrium Barrier',
    benefitContent: 'Mobile majority carriers diffuse across the metallurgical junction, exposing uncompensated fixed ionized donor and acceptor space charges that establish the internal electric barrier V_bi ≈ 0.7 V in silicon.',
    faqs: [{ q: 'Why is silicon diode forward drop typically ~0.7V?', a: 'Because the built-in potential barrier V_bi created by standard doping levels is ~0.7 to 0.8 V, requiring ~0.7 V forward bias to overcome the barrier.' }]
  },

  // 17. Intrinsic Carrier Concentration (n_i) vs Temperature Calculator
  {
    slug: 'intrinsic-carrier-concentration-temperature-calculator',
    name: 'Silicon Intrinsic Carrier Concentration (n_i) vs Temperature Calculator',
    description: 'Calculate intrinsic semiconductor carrier density (n_i = √(N_c · N_v) · e^(-E_g / (2 · k_B · T))) in Silicon, Germanium, and GaAs across operating temperatures.',
    category: 'Science',
    icon: 'text',
    keywords: ['intrinsic carrier concentration calculator', 'ni temperature formula silicon', 'semiconductor bandgap ni calculator online', 'silicon ge gaas carrier density calculator', 'fermi level intrinsic semiconductor online'],
    order: 550,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Semiconductor Material & Operating Temperature (°C or K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nic-mat">Semiconductor</label>
          <select class="tool-textarea" id="nic-mat">
            <option value="si" selected>Silicon (Si, E_g = 1.12 eV @ 300K)</option>
            <option value="ge">Germanium (Ge, E_g = 0.66 eV)</option>
            <option value="gaas">Gallium Arsenide (GaAs, E_g = 1.42 eV)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="nic-t">Temperature T (°C)</label>
          <input class="tool-textarea" id="nic-t" type="number" step="any" value="25.0" placeholder="25.0 °C (Room Temp)" />
        </div>
      </div>
      <div id="nic-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nic-res-ni" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.02 × 10¹⁰ cm⁻³</span>
            <span class="stat-label">Intrinsic Carrier Concentration (n_i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nic-res-leak" style="font-weight:700;">Intrinsic Resistivity: 2.3 × 10⁵ Ω·cm</span>
            <span class="stat-label">Pure Undoped Bulk Resistivity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('nic-mat'), tEl = document.getElementById('nic-t');
  const niResEl = document.getElementById('nic-res-ni'), lkResEl = document.getElementById('nic-res-leak');

  const MATS = {
    'si':   { Eg0: 1.17, alpha: 4.73e-4, beta: 636, B: 5.23e15 },
    'ge':   { Eg0: 0.74, alpha: 4.77e-4, beta: 235, B: 1.66e15 },
    'gaas': { Eg0: 1.52, alpha: 5.41e-4, beta: 204, B: 2.10e15 }
  };

  const kB_eV = 8.617333262145e-5;

  function update() {
    const mat = MATS[mEl.value], tC = parseFloat(tEl.value);
    if (isNaN(tC)) return;

    const T = tC + 273.15;
    if (T <= 0) return;

    const Eg = mat.Eg0 - ((mat.alpha * Math.pow(T, 2)) / (T + mat.beta));
    const ni = mat.B * Math.pow(T, 1.5) * Math.exp(-Eg / (2 * kB_eV * T));

    niResEl.textContent = ni.toExponential(2) + ' cm⁻³ (n_i)';
    lkResEl.textContent = 'Bandgap E_g = ' + Eg.toFixed(3) + ' eV @ ' + Math.round(T) + ' K (Thermal Voltage ' + (kB_eV * T * 1000).toFixed(1) + ' mV)';
  }

  mEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select semiconductor substrate material (Silicon, Germanium, Gallium Arsenide).',
      'Enter operating chip junction temperature in Celsius.',
      'Inspect intrinsic electron-hole carrier concentration n_i in cm⁻³ and temperature-dependent Varshni bandgap.'
    ],
    benefitTitle: 'Thermal Leakage Current Doubling Every 8°C to 10°C',
    benefitContent: 'Because thermal electron-hole generation scales exponentially with bandgap, high junction temperatures drastically increase reverse diode leakage current and limit silicon chips from operating above 150°C.',
    faqs: [{ q: 'Why is GaAs superior to Silicon for high-temperature electronics?', a: 'Because GaAs has a wider 1.42 eV bandgap, its intrinsic leakage is millions of times lower than Silicon.' }]
  },

  // 18. BJT Early Voltage & Output Resistance (r_o) Calculator
  {
    slug: 'bjt-early-voltage-output-resistance-calculator',
    name: 'BJT Early Voltage (V_A) & Small-Signal Output Resistance (r_o) Calculator',
    description: 'Calculate BJT small-signal output resistance (r_o = (V_A + V_CE) / I_C ≈ V_A / I_C) and base-width modulation Early effect output conductance g_o.',
    category: 'Science',
    icon: 'text',
    keywords: ['bjt early voltage calculator', 'output resistance ro va over ic formula', 'bjt base width modulation calculator', 'small signal transistor output impedance online', 'analog circuit bjt early effect calculator'],
    order: 551,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Early Voltage V_A (Volts) & Collector Bias Current I_C (mA)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ea-va">Early Voltage V_A (V)</label>
          <input class="tool-textarea" id="ea-va" type="number" step="any" value="100.0" placeholder="100.0 V (NPN Transistor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ea-ic">Collector Current I_C (mA)</label>
          <input class="tool-textarea" id="ea-ic" type="number" step="any" value="1.0" placeholder="1.0 mA" />
        </div>
      </div>
      <div id="ea-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ea-res-ro" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">100.0 kΩ</span>
            <span class="stat-label">Small-Signal Output Resistance (r_o)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ea-res-gain" style="font-weight:700;">Intrinsic Gain A_v0 = 3,846 V/V (71.7 dB)</span>
            <span class="stat-label">Maximum Theoretical Single-Stage Voltage Gain (g_m · r_o)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vaEl = document.getElementById('ea-va'), icEl = document.getElementById('ea-ic');
  const roResEl = document.getElementById('ea-res-ro'), gnResEl = document.getElementById('ea-res-gain');

  const Vt = 0.026;

  function update() {
    const Va = parseFloat(vaEl.value), icMa = parseFloat(icEl.value);
    if (isNaN(Va) || isNaN(icMa) || Va <= 0 || icMa <= 0) return;

    const icAmps = icMa * 1e-3;
    const roOhms = Va / icAmps;
    const roKohm = roOhms / 1000;
    const gm = icAmps / Vt;
    const av0 = Va / Vt;
    const av0Db = 20 * Math.log10(av0);

    roResEl.textContent = (roKohm >= 1000 ? (roKohm / 1000).toFixed(2) + ' MΩ' : roKohm.toFixed(1) + ' kΩ') + ' (r_o)';
    gnResEl.textContent = 'Intrinsic Max Gain A_v0 = ' + Math.round(av0).toLocaleString() + ' V/V (' + av0Db.toFixed(1) + ' dB, g_m = ' + (gm * 1000).toFixed(1) + ' mA/V)';
  }

  vaEl.addEventListener('input', update);
  icEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter transistor Early voltage V_A in Volts (typically 50 V to 150 V for discrete BJTs).',
      'Enter collector operating quiescent bias current I_C in milliamperes (mA).',
      'Inspect small-signal output resistance r_o and maximum theoretical intrinsic gain A_v0.'
    ],
    benefitTitle: 'James M. Early 1952 Base-Width Modulation',
    benefitContent: 'Increasing collector-emitter voltage widens the collector-base reverse depletion region, narrowing the neutral base width and increasing collector current slope; Early voltage defines the ultimate output impedance of analog amplifiers.',
    faqs: [{ q: 'Why is intrinsic gain independent of bias current?', a: 'Because g_m is proportional to I_C and r_o is proportional to 1/I_C, their product A_v0 is purely determined by Early voltage and thermal voltage.' }]
  },

  // 19. MOSFET Gate Oxide Capacitance & Threshold Voltage Shift Calculator
  {
    slug: 'mosfet-gate-oxide-capacitance-calculator',
    name: 'MOSFET Gate Oxide Capacitance (C_ox) & Transconductance Parameter Calculator',
    description: 'Calculate gate dielectric oxide capacitance per unit area (C_ox = ε_ox / t_ox) in fF/μm² and process transconductance parameter (k_n\' = μ_n · C_ox) in μA/V².',
    category: 'Science',
    icon: 'text',
    keywords: ['mosfet gate oxide capacitance calculator', 'cox eps over tox formula', 'process transconductance parameter kn prime calculator', 'high k dielectric gate capacitance online', 'cmos vlsi mosfet capacitance calculator'],
    order: 552,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gate Dielectric Thickness t_ox (nm) & Dielectric Constant κ (k-value)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cox-tox">Thickness t_ox (nm)</label>
          <input class="tool-textarea" id="cox-tox" type="number" step="0.1" value="2.0" placeholder="2.0 nm Oxide" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cox-k">Dielectric Constant (κ)</label>
          <select class="tool-textarea" id="cox-k">
            <option value="3.9" selected>Silicon Dioxide (SiO₂, κ = 3.9)</option>
            <option value="7.5">Silicon Nitride (Si₃N₄, κ = 7.5)</option>
            <option value="25.0">Hafnium Oxide (HfO₂ High-k, κ = 25.0)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cox-mu">Electron Mobility μ_n (cm²/V·s)</label>
          <input class="tool-textarea" id="cox-mu" type="number" step="any" value="350" placeholder="350 cm²/V·s (Inversion Channel)" />
        </div>
      </div>
      <div id="cox-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cox-res-cox" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">17.27 fF / μm²</span>
            <span class="stat-label">Oxide Capacitance Density (C_ox)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cox-res-kn" style="font-weight:700;">k_n' = 604.3 μA / V²</span>
            <span class="stat-label">Process Transconductance Parameter (μ_n · C_ox)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const toxEl = document.getElementById('cox-tox'), kEl = document.getElementById('cox-k'), muEl = document.getElementById('cox-mu');
  const coxResEl = document.getElementById('cox-res-cox'), knResEl = document.getElementById('cox-res-kn');

  const eps0 = 8.8541878128e-12;

  function update() {
    const toxNm = parseFloat(toxEl.value), kappa = parseFloat(kEl.value), mu = parseFloat(muEl.value);
    if (isNaN(toxNm) || isNaN(kappa) || isNaN(mu) || toxNm <= 0 || kappa <= 0 || mu <= 0) return;

    const toxM = toxNm * 1e-9;
    const coxF_m2 = (kappa * eps0) / toxM;
    const coxFf_um2 = coxF_m2;
    const muM2_Vs = mu * 1e-4;
    const knA_V2 = muM2_Vs * coxF_m2;
    const knUa_V2 = knA_V2 * 1e6;

    coxResEl.textContent = coxFf_um2.toFixed(2) + ' fF / μm² (' + (coxF_m2 * 100).toFixed(2) + ' μF/cm²)';
    knResEl.textContent = 'k_n\' = ' + knUa_V2.toFixed(1) + ' μA / V² (MOSFET Current Gain Factor)';
  }

  [toxEl, kEl, muEl].forEach(el => el.addEventListener('input', update));
  kEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter gate insulator dielectric physical thickness t_ox in nanometers.',
      'Select gate dielectric material (Standard SiO₂, Silicon nitride, or High-k HfO₂).',
      'Enter channel electron inversion layer surface mobility μ_n in cm²/V·s.',
      'Inspect gate capacitance density C_ox in fF/μm² and CMOS transconductance process parameter k_n\'.'
    ],
    benefitTitle: 'High-k Dielectrics & Quantum Gate Tunneling',
    benefitContent: 'Thinning standard SiO₂ below 1.5 nm causes excessive quantum tunneling gate leakage; replacing SiO₂ with high-k hafnium dioxide provides identical high gate capacitance C_ox with much thicker physical barriers.',
    faqs: [{ q: 'What is Equivalent Oxide Thickness (EOT)?', a: 'EOT = t_high-k × (3.9 / κ), representing the thickness of a SiO₂ layer that would produce the exact same gate capacitance.' }]
  },

  // 20. Semiconductor Minority Carrier Diffusion Length (L = √(D·τ)) Calculator
  {
    slug: 'semiconductor-diffusion-length-lifetime-calculator',
    name: 'Semiconductor Minority Carrier Diffusion Length (L = √(D · τ)) Calculator',
    description: 'Calculate minority carrier diffusion length (L = √(D · τ) = √((k_B · T / q) · μ · τ)) in micrometers from carrier lifetime τ and Einstein diffusion coefficient D.',
    category: 'Science',
    icon: 'text',
    keywords: ['minority carrier diffusion length calculator', 'l sqrt d tau formula', 'einstein relation diffusion coefficient calculator', 'carrier recombination lifetime solar cell online', 'photovoltaic silicon diffusion length calculator'],
    order: 553,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Carrier Lifetime τ (μs), Mobility μ (cm²/V·s) & Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dif-tau">Lifetime τ (μs)</label>
          <input class="tool-textarea" id="dif-tau" type="number" step="any" value="50.0" placeholder="50.0 μs (Solar Silicon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dif-mu">Mobility μ (cm²/V·s)</label>
          <input class="tool-textarea" id="dif-mu" type="number" step="any" value="1350" placeholder="1350 cm²/V·s (Electrons in Si)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dif-temp">Temp T (K)</label>
          <input class="tool-textarea" id="dif-temp" type="number" step="any" value="300" placeholder="300 K" />
        </div>
      </div>
      <div id="dif-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dif-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">418.0 μm</span>
            <span class="stat-label">Minority Carrier Diffusion Length (L_n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dif-res-d" style="font-weight:700;">D_n = 34.9 cm² / s</span>
            <span class="stat-label">Einstein Diffusion Coefficient (D = μ · k_B·T / q)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tauEl = document.getElementById('dif-tau'), muEl = document.getElementById('dif-mu'), tEl = document.getElementById('dif-temp');
  const lResEl = document.getElementById('dif-res-l'), dResEl = document.getElementById('dif-res-d');

  const kB = 1.380649e-23;
  const q_e = 1.602176634e-19;

  function update() {
    const tauUs = parseFloat(tauEl.value), mu = parseFloat(muEl.value), T = parseFloat(tEl.value);
    if (isNaN(tauUs) || isNaN(mu) || isNaN(T) || tauUs <= 0 || mu <= 0 || T <= 0) return;

    const tauSec = tauUs * 1e-6;
    const Vt = (kB * T) / q_e;
    const D_cm2_s = mu * Vt;
    const L_cm = Math.sqrt(D_cm2_s * tauSec);
    const L_um = L_cm * 10000;

    lResEl.textContent = L_um.toFixed(1) + ' μm (' + (L_cm * 10).toFixed(2) + ' mm Diffusion Length)';
    dResEl.textContent = 'D = ' + D_cm2_s.toFixed(2) + ' cm² / s (Thermal Voltage V_t = ' + (Vt * 1000).toFixed(1) + ' mV)';
  }

  [tauEl, muEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter minority carrier recombination lifetime τ in microseconds (μs).',
      'Enter carrier drift mobility μ in cm²/V·s.',
      'Enter device temperature in Kelvin.',
      'Inspect Einstein diffusion coefficient D and average diffusion distance before recombination.'
    ],
    benefitTitle: 'Albert Einstein 1905 Mobility-Diffusion Relation',
    benefitContent: 'In solar photovoltaic cells and photodiodes, generated electron-hole pairs must diffuse to the PN junction space-charge zone to produce electrical current; if the wafer thickness exceeds the diffusion length, carriers recombine and are wasted as heat.',
    faqs: [{ q: 'What is a typical diffusion length for high-efficiency monocrystalline solar cells?', a: 'High-purity n-type monocrystalline silicon solar wafers achieve electron diffusion lengths exceeding 300 to 500 μm.' }]
  },

  // --- Suite VVV: Power Electronics & Switch-Mode Supplies (676 - 680) ---
  // 21. Buck-Boost DC-DC Converter Inductor Ripple & Sizing Calculator
  {
    slug: 'buck-boost-converter-inductor-ripple-calculator',
    name: 'Buck-Boost DC-DC Converter Inductor Ripple & Sizing Calculator',
    description: 'Calculate switch-mode DC-DC buck-boost converter duty cycle (D = |V_out| / (V_in + |V_out|)), critical minimum inductance (L_min), and peak-to-peak inductor ripple current (ΔI_L).',
    category: 'Science',
    icon: 'text',
    keywords: ['buck boost converter calculator', 'dcdc converter duty cycle formula', 'inductor ripple current delta il calculator', 'critical inductance ccm dcm buck boost online', 'switch mode power supply inductor sizing online'],
    order: 554,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input V_in (V), Output |V_out| (V), Switching Frequency f (kHz) & Load Current I_out (A)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bb-vin">Input V_in (V)</label>
          <input class="tool-textarea" id="bb-vin" type="number" step="any" value="12.0" placeholder="12.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bb-vout">Output |V_out| (V)</label>
          <input class="tool-textarea" id="bb-vout" type="number" step="any" value="24.0" placeholder="24.0 V Boost" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bb-freq">Frequency f (kHz)</label>
          <input class="tool-textarea" id="bb-freq" type="number" step="any" value="200" placeholder="200 kHz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bb-iout">Load I_out (A)</label>
          <input class="tool-textarea" id="bb-iout" type="number" step="any" value="2.0" placeholder="2.0 A" />
        </div>
      </div>
      <div id="bb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bb-res-duty" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D = 0.667 (66.7%)</span>
            <span class="stat-label">PWM Switching Duty Cycle (D)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bb-res-lmin" style="font-weight:700;">L_min = 6.67 μH (CCM Threshold)</span>
            <span class="stat-label">Continuous Conduction Mode Inductance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vinEl = document.getElementById('bb-vin'), voutEl = document.getElementById('bb-vout');
  const fEl = document.getElementById('bb-freq'), iEl = document.getElementById('bb-iout');
  const dResEl = document.getElementById('bb-res-duty'), lResEl = document.getElementById('bb-res-lmin');

  function update() {
    const Vin = parseFloat(vinEl.value), Vout = Math.abs(parseFloat(voutEl.value));
    const fKhz = parseFloat(fEl.value), Iout = parseFloat(iEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(fKhz) || isNaN(Iout) || Vin <= 0 || Vout <= 0 || fKhz <= 0 || Iout <= 0) return;

    const fHz = fKhz * 1000;
    const D = Vout / (Vin + Vout);
    const D_pct = D * 100;

    const IL_avg = Iout / (1 - D);
    const targetDeltaIL = 0.30 * IL_avg;
    const targetL_H = (Vin * D) / (fHz * targetDeltaIL);
    const targetL_uH = targetL_H * 1e6;

    const L_crit_H = (Math.pow(1 - D, 2) * Vout) / (2 * Iout * fHz);
    const L_crit_uH = L_crit_H * 1e6;

    dResEl.textContent = 'D = ' + D.toFixed(3) + ' (' + D_pct.toFixed(1) + '% Duty Cycle)';
    lResEl.textContent = targetL_uH.toFixed(1) + ' μH Inductor (30% Ripple, CCM Boundary L_crit: ' + L_crit_uH.toFixed(1) + ' μH)';
  }

  [vinEl, voutEl, fEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter input DC power supply voltage V_in.',
      'Enter desired output voltage magnitude |V_out| (can step up or step down).',
      'Enter PWM switching frequency in kHz (e.g. 100 to 500 kHz).',
      'Enter maximum output load current I_out in Amperes.',
      'Inspect required duty cycle D, recommended inductor value for 30% ripple, and minimum CCM boundary inductance.'
    ],
    benefitTitle: 'Inverting Buck-Boost Energy Transfer Mechanism',
    benefitContent: 'During the ON time, energy stores exclusively in the magnetic inductor core; during the OFF time, the collapsing magnetic field dumps stored inductive energy into the output filter capacitor with inverted negative voltage polarity.',
    faqs: [{ q: 'What happens if L is smaller than L_crit?', a: 'The converter enters Discontinuous Conduction Mode (DCM), where inductor current drops to zero before the next switching cycle, altering duty cycle linearity.' }]
  },

  // 22. Flyback Transformer Primary Inductance & Turns Ratio Calculator
  {
    slug: 'flyback-transformer-primary-inductance-turns-ratio-calculator',
    name: 'Flyback Transformer Primary Inductance (L_p) & Turns Ratio Calculator',
    description: 'Calculate isolated switch-mode flyback transformer primary inductance (L_p = (V_in(min) · D_max)² / (2 · P_in · f)), primary turns, and secondary turns ratio (N_p / N_s).',
    category: 'Science',
    icon: 'text',
    keywords: ['flyback transformer calculator', 'flyback primary inductance formula lp', 'turns ratio isolated smps calculator online', 'dcm ccm flyback transformer design calculator', 'power supply flyback inductance online'],
    order: 555,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Output Power P_out (W), Min Input V_in(min) (V), Output V_out (V) & Frequency f (kHz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fly-pwr">Power P_out (W)</label>
          <input class="tool-textarea" id="fly-pwr" type="number" step="any" value="65.0" placeholder="65.0 W (Laptop Charger)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fly-vin">Min Input V_in (V)</label>
          <input class="tool-textarea" id="fly-vin" type="number" step="any" value="100.0" placeholder="100.0 V (Rectified 85-265VAC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fly-vout">Output V_out (V)</label>
          <input class="tool-textarea" id="fly-vout" type="number" step="any" value="20.0" placeholder="20.0 V (USB-PD)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fly-freq">Frequency f (kHz)</label>
          <input class="tool-textarea" id="fly-freq" type="number" step="any" value="100" placeholder="100 kHz" />
        </div>
      </div>
      <div id="fly-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fly-res-lp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">153.8 μH</span>
            <span class="stat-label">Primary Inductance (L_p)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fly-res-ratio" style="font-weight:700;">N_p / N_s = 4.08 : 1</span>
            <span class="stat-label">Primary to Secondary Turns Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('fly-pwr'), viEl = document.getElementById('fly-vin');
  const voEl = document.getElementById('fly-vout'), fEl = document.getElementById('fly-freq');
  const lpResEl = document.getElementById('fly-res-lp'), ratResEl = document.getElementById('fly-res-ratio');

  const eff = 0.88;
  const D_max = 0.45;

  function update() {
    const Pout = parseFloat(pEl.value), VinMin = parseFloat(viEl.value);
    const Vout = parseFloat(voEl.value), fKhz = parseFloat(fEl.value);

    if (isNaN(Pout) || isNaN(VinMin) || isNaN(Vout) || isNaN(fKhz) || Pout <= 0 || VinMin <= 0 || Vout <= 0 || fKhz <= 0) return;

    const Pin = Pout / eff;
    const fHz = fKhz * 1000;
    const LpH = (Math.pow(VinMin * D_max, 2)) / (2 * Pin * fHz);
    const Lp_uH = LpH * 1e6;
    const VR = (VinMin * D_max) / (1 - D_max);
    const turnsRatio = VR / (Vout + 0.5);
    const Ipk = Math.sqrt((2 * Pin) / (LpH * fHz));

    lpResEl.textContent = Lp_uH.toFixed(1) + ' μH (Primary L_p)';
    ratResEl.textContent = 'N_p / N_s = ' + turnsRatio.toFixed(2) + ' : 1 (Peak Primary Current I_pk = ' + Ipk.toFixed(2) + ' A)';
  }

  [pEl, viEl, voEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total rated output power P_out in Watts.',
      'Enter minimum rectified DC bulk input voltage V_in(min).',
      'Enter regulated isolated DC output voltage V_out in Volts.',
      'Enter PWM switching frequency in kHz.',
      'Inspect required primary magnetizing inductance L_p in μH, transformer turns ratio N_p/N_s, and peak primary current.'
    ],
    benefitTitle: 'Coupled Inductor Isolated Topology',
    benefitContent: 'A flyback transformer is technically a gapped coupled storage inductor: primary and secondary windings never conduct simultaneously, providing galvanic isolation and multi-output regulation with minimal component count.',
    faqs: [{ q: 'Why is a gapped ferrite core required in flyback transformers?', a: 'The physical air gap in the center leg stores the magnetic energy and prevents high peak current from saturating the ferrite core.' }]
  },

  // 23. Inverter Output Total Harmonic Distortion (THD) Calculator
  {
    slug: 'inverter-output-thd-total-harmonic-distortion-calculator',
    name: 'Inverter Output Total Harmonic Distortion (THD) Calculator',
    description: 'Calculate voltage and current Total Harmonic Distortion percentage (THD % = √(Σ V_n²) / V₁ · 100) per IEEE 519 standards for solar grid-tie inverters and motor drives.',
    category: 'Science',
    icon: 'text',
    keywords: ['inverter thd calculator', 'total harmonic distortion formula ieee 519', 'thd percentage calculator online', 'voltage harmonics root sum of squares calculator', 'solar grid tie inverter thd calculator'],
    order: 556,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fundamental Voltage V₁ (V) & Harmonic Voltages (V₃, V₅, V₇, V₉ in Volts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="thd-v1">Fundamental V₁ (V)</label>
          <input class="tool-textarea" id="thd-v1" type="number" step="any" value="230.0" placeholder="230.0 V (50/60 Hz)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thd-v3">3rd Harmonic V₃ (V)</label>
          <input class="tool-textarea" id="thd-v3" type="number" step="any" value="5.2" placeholder="5.2 V (150 Hz)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thd-v5">5th Harmonic V₅ (V)</label>
          <input class="tool-textarea" id="thd-v5" type="number" step="any" value="3.8" placeholder="3.8 V (250 Hz)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thd-v7">7th Harmonic V₇ (V)</label>
          <input class="tool-textarea" id="thd-v7" type="number" step="any" value="1.9" placeholder="1.9 V (350 Hz)" />
        </div>
      </div>
      <div id="thd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="thd-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.92% THD</span>
            <span class="stat-label">Total Harmonic Distortion (THD_v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="thd-res-ieee" style="color:var(--green-dark); font-weight:700;">PASSES IEEE 519 Standard (THD ≤ 5.0%)</span>
            <span class="stat-label">Grid Compliance Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v1El = document.getElementById('thd-v1'), v3El = document.getElementById('thd-v3');
  const v5El = document.getElementById('thd-v5'), v7El = document.getElementById('thd-v7');
  const pctResEl = document.getElementById('thd-res-pct'), ieeeResEl = document.getElementById('thd-res-ieee');

  function update() {
    const V1 = parseFloat(v1El.value), V3 = parseFloat(v3El.value);
    const V5 = parseFloat(v5El.value), V7 = parseFloat(v7El.value);

    if (isNaN(V1) || isNaN(V3) || isNaN(V5) || isNaN(V7) || V1 <= 0 || V3 < 0 || V5 < 0 || V7 < 0) return;

    const sumHarmonicsSq = Math.pow(V3, 2) + Math.pow(V5, 2) + Math.pow(V7, 2);
    const rmsHarmonics = Math.sqrt(sumHarmonicsSq);
    const thdPct = (rmsHarmonics / V1) * 100;

    pctResEl.textContent = thdPct.toFixed(2) + '% THD (Harmonic RMS: ' + rmsHarmonics.toFixed(2) + ' V)';

    if (thdPct <= 5.0) {
      ieeeResEl.textContent = 'PASSES IEEE 519 Grid Interconnect (THD ≤ 5.0% Clean Pure Sine)';
      ieeeResEl.style.color = '#22543d';
    } else if (thdPct <= 8.0) {
      ieeeResEl.textContent = 'ACCEPTABLE for General Industrial Loads (5% < THD ≤ 8%)';
      ieeeResEl.style.color = '#d97706';
    } else {
      ieeeResEl.textContent = 'EXCEEDS IEEE LIMITS (THD > 8%: Filter Inductor/Capacitor Required)';
      ieeeResEl.style.color = '#c53030';
    }
  }

  [v1El, v3El, v5El, v7El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fundamental 50/60 Hz grid line voltage V_1 in Volts RMS.',
      'Enter measured Fourier harmonic amplitude voltages (V₃, V₅, V₇) in Volts RMS.',
      'Inspect Total Harmonic Distortion percentage and verify compliance with utility IEEE 519 grid-tie standards.'
    ],
    benefitTitle: 'IEEE 519-2022 Harmonic Control Standards',
    benefitContent: 'Excess harmonic distortion causes severe overheating in distribution transformers, false tripping of circuit breakers, and acoustic whining in induction motors; utility interconnection standards strictly cap voltage THD below 5.0%.',
    faqs: [{ q: 'What is the THD of a modified sine wave inverter?', a: 'Modified sine wave inverters have an extremely high THD of 25% to 45%, which can damage sensitive electronics and motors.' }]
  },

  // 24. Synchronous Rectifier MOSFET Conduction vs Diode Loss Calculator
  {
    slug: 'synchronous-rectifier-conduction-loss-calculator',
    name: 'Synchronous Rectifier MOSFET Conduction Loss vs Schottky Diode Calculator',
    description: 'Calculate synchronous rectifier power savings (P_loss = I_RMS² · R_DS(on) vs P_diode = I_avg · V_f) in low-voltage high-current power supplies.',
    category: 'Science',
    icon: 'text',
    keywords: ['synchronous rectifier loss calculator', 'mosfet rds on conduction loss formula', 'schottky diode vs synchronous rectifier power savings', 'low voltage high current smps efficiency online', 'power electronics conduction loss calculator'],
    order: 557,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Load Current I (Amperes), MOSFET R_DS(on) (mΩ) & Diode Forward V_f (V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sr-i">Current I_out (A)</label>
          <input class="tool-textarea" id="sr-i" type="number" step="any" value="20.0" placeholder="20.0 A (Server VRM / 12V)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-rds">MOSFET R_DS(on) (mΩ)</label>
          <input class="tool-textarea" id="sr-rds" type="number" step="0.1" value="2.5" placeholder="2.5 mΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-vf">Schottky V_f (V)</label>
          <input class="tool-textarea" id="sr-vf" type="number" step="0.05" value="0.45" placeholder="0.45 V Forward Drop" />
        </div>
      </div>
      <div id="sr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sr-res-ploss" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.00 W (MOSFET)</span>
            <span class="stat-label">Synchronous Rectifier Power Loss</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sr-res-sav" style="color:var(--green-dark); font-weight:700;">8.00 W Saved (88.9% Reduction vs 9.0W Diode)</span>
            <span class="stat-label">Thermal Energy Savings</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('sr-i'), rdsEl = document.getElementById('sr-rds'), vfEl = document.getElementById('sr-vf');
  const pResEl = document.getElementById('sr-res-ploss'), savResEl = document.getElementById('sr-res-sav');

  function update() {
    const I = parseFloat(iEl.value), rdsMohm = parseFloat(rdsEl.value), Vf = parseFloat(vfEl.value);
    if (isNaN(I) || isNaN(rdsMohm) || isNaN(Vf) || I <= 0 || rdsMohm <= 0 || Vf <= 0) return;

    const rdsOhms = rdsMohm * 1e-3;
    const pMosfet = Math.pow(I, 2) * rdsOhms;
    const pDiode = I * Vf;
    const pSaved = pDiode - pMosfet;
    const pctSaved = (pSaved / pDiode) * 100;

    pResEl.textContent = pMosfet.toFixed(2) + ' W (MOSFET Voltage Drop: ' + (I * rdsMohm).toFixed(1) + ' mV)';
    savResEl.textContent = pSaved.toFixed(2) + ' W Heat Saved (' + pctSaved.toFixed(1) + '% Reduction vs ' + pDiode.toFixed(1) + ' W Diode)';
  }

  [iEl, rdsEl, vfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter continuous rectified output current I in Amperes.',
      'Enter active synchronous MOSFET on-resistance R_DS(on) in milliohms.',
      'Enter passive Schottky barrier diode forward voltage drop V_f in Volts.',
      'Inspect electrical heat dissipation comparison and thermal energy savings.'
    ],
    benefitTitle: 'Eliminating the 0.5V Forward Diode Barrier',
    benefitContent: 'At 20 Amperes, a 0.45V Schottky diode dissipates 9.0 Watts of waste heat; replacing it with a 2.5 mΩ synchronous MOSFET drops the voltage loss to just 50 mV, cutting thermal losses by 89% down to 1.0 Watt.',
    faqs: [{ q: 'Why is synchronous rectification essential for low-voltage supplies?', a: 'In a 1.2V CPU voltage regulator module, a 0.5V diode drop would waste nearly 30% of total system power.' }]
  },

  // 25. Boost Converter Switch Duty Cycle & Component Stress Calculator
  {
    slug: 'boost-converter-duty-cycle-stress-calculator',
    name: 'Boost DC-DC Step-Up Converter Duty Cycle & Component Stress Calculator',
    description: 'Calculate boost converter voltage step-up duty cycle (D = 1 - (V_in / V_out)), peak switch voltage stress (V_DS = V_out), and minimum output smoothing capacitor capacitance (C_min).',
    category: 'Science',
    icon: 'text',
    keywords: ['boost converter calculator', 'step up dcdc duty cycle formula 1 minus vin over vout', 'boost converter output capacitor formula online', 'switch voltage stress boost converter calculator', 'smps boost converter design online'],
    order: 558,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input V_in (V), Output V_out (V), Switching Frequency f (kHz), Current I_out (A) & Ripple ΔV_out (mV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bst-vin">Input V_in (V)</label>
          <input class="tool-textarea" id="bst-vin" type="number" step="any" value="5.0" placeholder="5.0 V (USB Supply)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bst-vout">Output V_out (V)</label>
          <input class="tool-textarea" id="bst-vout" type="number" step="any" value="12.0" placeholder="12.0 V Step-Up" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bst-freq">Frequency f (kHz)</label>
          <input class="tool-textarea" id="bst-freq" type="number" step="any" value="300" placeholder="300 kHz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bst-iout">Load I_out (A)</label>
          <input class="tool-textarea" id="bst-iout" type="number" step="any" value="1.5" placeholder="1.5 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bst-dvo">Output Ripple ΔV (mV)</label>
          <input class="tool-textarea" id="bst-dvo" type="number" step="any" value="50" placeholder="50 mV Ripple" />
        </div>
      </div>
      <div id="bst-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bst-res-duty" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D = 0.583 (58.3%)</span>
            <span class="stat-label">Boost Duty Cycle (1 - V_in / V_out)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bst-res-cout" style="font-weight:700;">C_out(min) = 58.3 μF</span>
            <span class="stat-label">Minimum Output Filter Capacitance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const viEl = document.getElementById('bst-vin'), voEl = document.getElementById('bst-vout');
  const fEl = document.getElementById('bst-freq'), iEl = document.getElementById('bst-iout'), dvEl = document.getElementById('bst-dvo');
  const dResEl = document.getElementById('bst-res-duty'), cResEl = document.getElementById('bst-res-cout');

  function update() {
    const Vin = parseFloat(viEl.value), Vout = parseFloat(voEl.value);
    const fKhz = parseFloat(fEl.value), Iout = parseFloat(iEl.value), dvMv = parseFloat(dvEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(fKhz) || isNaN(Iout) || isNaN(dvMv) || Vin <= 0 || Vout <= Vin || fKhz <= 0 || Iout <= 0 || dvMv <= 0) return;

    const fHz = fKhz * 1000;
    const dvVolts = dvMv * 1e-3;
    const D = 1 - (Vin / Vout);
    const D_pct = D * 100;
    const Cout_F = (Iout * D) / (fHz * dvVolts);
    const Cout_uF = Cout_F * 1e6;
    const IL_avg = Iout * (Vout / Vin);

    dResEl.textContent = 'D = ' + D.toFixed(3) + ' (' + D_pct.toFixed(1) + '% Duty Cycle)';
    cResEl.textContent = Cout_uF.toFixed(1) + ' μF (Avg Inductor Current I_L = ' + IL_avg.toFixed(2) + ' A, Switch Stress V_DS = ' + Vout + 'V)';
  }

  [viEl, voEl, fEl, iEl, dvEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter input DC voltage V_in (e.g. 5.0V from USB).',
      'Enter desired stepped-up output DC voltage V_out (e.g. 12.0V).',
      'Enter switching frequency in kHz, load current in Amps, and maximum allowable output voltage ripple in mV.',
      'Inspect required boost duty cycle D, minimum output filter capacitance, and switch voltage stress.'
    ],
    benefitTitle: 'Boost Voltage Step-Up Relation',
    benefitContent: 'A boost converter charges its inductor when the switch is closed; when the switch opens, inductor flyback voltage adds in series with the input voltage to step up DC voltage.',
    faqs: [{ q: 'Why is practical boost converter duty cycle limited to ~85-90%?', a: 'Parasitic inductor series resistance and diode drops cause efficiency to plummet at high duty cycles, limiting maximum voltage gain.' }]
  }
];

pack16Tools.forEach(createTool);
console.log('Pack 16 complete: 25 tools created.');
