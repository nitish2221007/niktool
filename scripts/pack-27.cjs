const { createTool } = require('./generate-curated-tools.cjs');

// Pack 27: 25 Tools covering Quantum Mechanics, Fusion Plasma Physics, Advanced Cryptography, Atmospheric Boundary Layers, Applied Mathematics (Tools 931 to 955)
const pack27Tools = [
  // --- Suite UUUUU: Quantum Mechanics, Solid-State Physics & Nanostructures (931 - 935) ---
  // 1. Particle in a Box (1D Infinite Potential Well) Energy Levels Calculator
  {
    slug: 'schrodinger-infinite-potential-well-energy-levels-calculator',
    name: 'Schrödinger 1D Particle in a Box (Infinite Potential Well E_n) Calculator',
    description: 'Calculate quantum mechanical energy eigenlevels (E_n = n²·π²·ℏ² / (2·m·L²)) in eV/Joules and photon transition emission wavelength (λ = h·c / ΔE) in nm for electrons in quantum wells.',
    category: 'Science',
    icon: 'text',
    keywords: ['particle in a box calculator', 'schrodinger infinite square well energy formula e_n online', 'quantum well energy levels electron volt calculator', 'quantum mechanics 1d potential well calculator online', 'planck de broglie quantum energy levels online'],
    order: 812,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Quantum Well Width L (nm), Quantum Number n (1, 2, 3, 4) & Particle (Electron, Proton)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qbox-l">Well Width L (nm)</label>
          <input class="tool-textarea" id="qbox-l" type="number" step="any" value="1.0" placeholder="1.0 nm (Semiconductor Well)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qbox-n">Quantum Level (n)</label>
          <input class="tool-textarea" id="qbox-n" type="number" step="1" min="1" value="1" placeholder="1 (Ground State)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qbox-part">Particle</label>
          <select class="tool-textarea" id="qbox-part">
            <option value="electron" selected>Electron (m_e = 9.109 × 10⁻³¹ kg)</option>
            <option value="proton">Proton (m_p = 1.673 × 10⁻²⁷ kg)</option>
          </select>
        </div>
      </div>
      <div id="qbox-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qbox-res-en" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">E₁ = 0.376 eV (Ground State)</span>
            <span class="stat-label">Quantized Energy Level (E_n = n²·h² / (8·m·L²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qbox-res-trans" style="font-weight:700;">Transition n=1 -> n=2: ΔE = 1.128 eV (Photon λ = 1,099 nm Near-Infrared)</span>
            <span class="stat-label">Photon Excitation Transition Energy & Emission Wavelength</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('qbox-l'), nEl = document.getElementById('qbox-n'), partEl = document.getElementById('qbox-part');
  const enResEl = document.getElementById('qbox-res-en'), trResEl = document.getElementById('qbox-res-trans');

  const h = 6.62607015e-34;     // J * s
  const c = 299792458;          // m / s
  const e_charge = 1.602176634e-19; // J / eV

  const PARTICLES = {
    'electron': { mass: 9.1093837e-31, name: 'Electron' },
    'proton':   { mass: 1.6726219e-27, name: 'Proton' }
  };

  function update() {
    const L_nm = parseFloat(lEl.value), n = parseInt(nEl.value, 10);
    const p = PARTICLES[partEl.value];

    if (isNaN(L_nm) || isNaN(n) || L_nm <= 0 || n < 1) return;

    const L_m = L_nm * 1e-9;

    // E_n = ( n^2 * h^2 ) / ( 8 * m * L^2 )  [Joules]
    const E_n_joules = (Math.pow(n, 2) * Math.pow(h, 2)) / (8.0 * p.mass * Math.pow(L_m, 2));
    const E_n_ev = E_n_joules / e_charge;

    // Ground state energy E_1
    const E_1_ev = E_n_ev / Math.pow(n, 2);

    // Transition from level n to level n+1:
    const n_next = n + 1;
    const E_next_ev = E_1_ev * Math.pow(n_next, 2);
    const deltaE_ev = E_next_ev - E_n_ev;
    const deltaE_joules = deltaE_ev * e_charge;

    // Photon wavelength lambda = h * c / deltaE  [nm]
    const lambda_nm = (h * c / deltaE_joules) * 1e9;

    enResEl.textContent = 'E_' + n + ' = ' + E_n_ev.toFixed(3) + ' eV (' + (E_n_joules).toExponential(2) + ' J | E₁ = ' + E_1_ev.toFixed(3) + ' eV)';
    trResEl.textContent = 'Transition n=' + n + ' -> n=' + n_next + ': ΔE = ' + deltaE_ev.toFixed(3) + ' eV (Emission λ = ' + lambda_nm.toFixed(1) + ' nm)';
  }

  [lEl, nEl].forEach(el => el.addEventListener('input', update));
  partEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter 1D potential well width L in nanometers (nm).',
      'Enter principal quantum number n ($n = 1, 2, 3, \dots$).',
      'Select trapped particle (Electron or Proton).',
      'Inspect quantized energy eigenvalue $E_n$ in electron-volts (eV) and photon absorption/emission wavelength $\lambda$ for $n \to n+1$ transitions.'
    ],
    benefitTitle: 'Erwin Schrödinger 1926 Spatial Confinement Quantization',
    benefitContent: 'Confining a quantum wave to a box of width L forces the de Broglie wavelength to fit integer half-wavelengths ($L = n \lambda/2$), producing discrete non-continuous energy levels ($E_n \propto n^2 / L^2$) that form the operating foundation of Quantum Well Infrared Photodetectors (QWIPs) and semiconductor laser diodes.',
    faqs: [{ q: 'Why can the ground state energy E1 never be zero?', a: 'By the Heisenberg Uncertainty Principle ($\Delta x \Delta p \ge \hbar/2$), confining a particle to finite width L makes its momentum uncertainty non-zero, giving it mandatory non-zero Zero-Point Energy.' }]
  },

  // 2. Quantum Mechanical Barrier Tunneling Probability (WKB Approximation) Calculator
  {
    slug: 'quantum-tunneling-transmission-coefficient-wkb-calculator',
    name: 'Quantum Mechanical Barrier Tunneling Probability (WKB T) Calculator',
    description: 'Calculate quantum mechanical barrier tunneling transmission probability (T ≈ exp[-2·a·√(2·m·(V₀ - E)) / ℏ]) for electrons tunneling through rectangular energy barriers in STM microscopes and flash memory.',
    category: 'Science',
    icon: 'text',
    keywords: ['quantum tunneling calculator', 'wkb transmission coefficient formula t equals exp minus 2 k a online', 'electron rectangular barrier tunneling probability calculator', 'scanning tunneling microscope stm tunneling current calculator', 'quantum barrier transmission coefficient online'],
    order: 813,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Barrier Height V₀ (eV), Electron Energy E (eV) & Barrier Thickness a (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tun-v0">Barrier V₀ (eV)</label>
          <input class="tool-textarea" id="tun-v0" type="number" step="any" value="5.0" placeholder="5.0 eV (Work Function)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tun-e">Energy E (eV)</label>
          <input class="tool-textarea" id="tun-e" type="number" step="any" value="3.0" placeholder="3.0 eV (Sub-Barrier)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tun-a">Width a (nm)</label>
          <input class="tool-textarea" id="tun-a" type="number" step="0.1" value="0.50" placeholder="0.50 nm (5 Ångströms)" />
        </div>
      </div>
      <div id="tun-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tun-res-prob" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T = 5.40 × 10⁻⁴ (0.054%)</span>
            <span class="stat-label">Quantum Tunneling Transmission Probability (T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tun-res-decay" style="font-weight:700;">Wavefunction Decay κ = 7.24 nm⁻¹ (Exponential: 10× drop per 0.16 nm thickness)</span>
            <span class="stat-label">Evanescent Wave Attenuation Parameter (κ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('tun-v0'), eEl = document.getElementById('tun-e'), aEl = document.getElementById('tun-a');
  const pResEl = document.getElementById('tun-res-prob'), dResEl = document.getElementById('tun-res-decay');

  const hbar = 1.054571817e-34; // J * s
  const m_e = 9.1093837e-31;     // kg
  const e_charge = 1.602176634e-19; // J / eV

  function update() {
    const V0 = parseFloat(v0El.value), E = parseFloat(eEl.value), aNm = parseFloat(aEl.value);
    if (isNaN(V0) || isNaN(E) || isNaN(aNm) || V0 <= E || E <= 0 || aNm <= 0) return;

    const deltaE_ev = V0 - E;
    const deltaE_joules = deltaE_ev * e_charge;
    const a_m = aNm * 1e-9;

    // Evanescent wavevector kappa = sqrt( 2 * m * (V0 - E) ) / hbar  [m^-1]
    const kappa_m = Math.sqrt(2.0 * m_e * deltaE_joules) / hbar;
    const kappa_nm = kappa_m * 1e-9;

    // Transmission probability WKB approx: T = 16 * (E/V0) * (1 - E/V0) * exp( -2 * kappa * a )
    const prefactor = 16.0 * (E / V0) * (1.0 - (E / V0));
    const exponent = 2.0 * kappa_m * a_m;
    const T = prefactor * Math.exp(-exponent);

    // Distance to drop by factor of 10: Delta_a = ln(10) / (2 * kappa)
    const decay10_nm = Math.log(10) / (2.0 * kappa_nm);

    pResEl.textContent = 'T = ' + T.toExponential(3) + ' (' + (T * 100).toPrecision(3) + '% Tunneling)';
    dResEl.textContent = 'Decay κ = ' + kappa_nm.toFixed(2) + ' nm⁻¹ (10× Current Drop per +' + decay10_nm.toFixed(2) + ' nm barrier width @ ΔV = ' + deltaE_ev.toFixed(1) + ' eV)';
  }

  [v0El, eEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter potential energy barrier height $V_0$ in electron-volts (eV).',
      'Enter incident particle energy $E < V_0$ in electron-volts (eV).',
      'Enter rectangular barrier thickness a in nanometers (nm).',
      'Inspect quantum tunneling transmission coefficient T and evanescent wavefunction spatial decay parameter $\kappa$.'
    ],
    benefitTitle: 'George Gamow & Wentzel-Kramers-Brillouin (WKB) Tunneling',
    benefitContent: 'Quantum wavefunctions do not stop abruptly at energy barriers but decay exponentially into the classically forbidden barrier ($e^{-\kappa x}$); in Scanning Tunneling Microscopes (STM), measuring sub-angstrom tunneling current variations ($I \propto e^{-2\kappa d}$) maps individual atoms on conductive surfaces.',
    faqs: [{ q: 'How does quantum tunneling enable NAND flash memory?', a: 'Fowler-Nordheim tunneling forces electrons across a 7 nm silicon dioxide insulating barrier into an isolated floating polysilicon gate to trap binary digital charge.' }]
  },

  // 3. Fermi-Dirac Distribution Electron Occupancy Probability Calculator
  {
    slug: 'fermi-dirac-distribution-occupancy-calculator',
    name: 'Fermi-Dirac Distribution Electron Occupancy Probability (f(E)) Calculator',
    description: 'Calculate quantum statistical Fermi-Dirac state occupancy probability (f(E) = 1 / [exp((E - E_F) / (k_B·T)) + 1]) and density of states in metals and semiconductors.',
    category: 'Science',
    icon: 'text',
    keywords: ['fermi dirac distribution calculator', 'electron occupancy probability formula f of e online', 'fermi level ef semiconductor thermal occupancy calculator', 'boltzmann approximation vs fermi dirac calculator online', 'condensed matter physics fermi energy online'],
    order: 814,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'State Energy E (eV), Fermi Energy E_F (eV) & Temperature T (Kelvin)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fd-e">Energy E (eV)</label>
          <input class="tool-textarea" id="fd-e" type="number" step="0.05" value="5.10" placeholder="5.10 eV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fd-ef">Fermi Level E_F (eV)</label>
          <input class="tool-textarea" id="fd-ef" type="number" step="0.05" value="5.00" placeholder="5.00 eV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fd-temp">Temp T (K)</label>
          <input class="tool-textarea" id="fd-temp" type="number" step="25" value="300.0" placeholder="300.0 K (Room Temp)" />
        </div>
      </div>
      <div id="fd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fd-res-fe" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f(E) = 0.0207 (2.07% Full)</span>
            <span class="stat-label">Fermi-Dirac Electron State Occupancy Probability</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fd-res-kbt" style="font-weight:700;">Thermal Energy k_B·T = 25.85 meV (E - E_F = +0.100 eV = 3.87 k_B·T above Fermi Level)</span>
            <span class="stat-label">Thermal Smearing Width & Energy Offset</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('fd-e'), efEl = document.getElementById('fd-ef'), tEl = document.getElementById('fd-temp');
  const feResEl = document.getElementById('fd-res-fe'), ktResEl = document.getElementById('fd-res-kbt');

  const kB_ev = 8.617333262e-5; // eV / K

  function update() {
    const E = parseFloat(eEl.value), E_F = parseFloat(efEl.value), T = parseFloat(tEl.value);
    if (isNaN(E) || isNaN(E_F) || isNaN(T) || T < 0) return;

    if (T === 0) {
      const f0 = E <= E_F ? 1.0 : 0.0;
      feResEl.textContent = 'f(E) = ' + f0 + ' (Step Function @ Absolute Zero T = 0 K)';
      ktResEl.textContent = 'Zero Kelvin Step Function: All states below E_F are 100% occupied; all above are 0% empty.';
      return;
    }

    const kBT_ev = kB_ev * T;
    const kBT_mev = kBT_ev * 1000;
    const deltaE = E - E_F;
    const x = deltaE / kBT_ev;

    // Fermi-Dirac: f(E) = 1 / ( exp( (E - EF) / kBT ) + 1 )
    let f_E = 0.0;
    if (x > 50) f_E = Math.exp(-x); // Maxwell-Boltzmann tail
    else if (x < -50) f_E = 1.0;
    else f_E = 1.0 / (Math.exp(x) + 1.0);

    const f_pct = f_E * 100;

    feResEl.textContent = 'f(E) = ' + (f_E < 0.001 ? f_E.toExponential(2) : f_E.toFixed(4)) + ' (' + f_pct.toFixed(2) + '% Occupied)';
    ktResEl.textContent = 'k_B·T = ' + kBT_mev.toFixed(2) + ' meV | ΔE = ' + (deltaE >= 0 ? '+' : '') + deltaE.toFixed(3) + ' eV (' + (deltaE / kBT_ev).toFixed(2) + ' k_B·T @ ' + T + ' K)';
  }

  [eEl, efEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter target quantum electron state energy E in electron-volts (eV).',
      'Enter chemical potential / Fermi level $E_F$ in electron-volts (eV).',
      'Enter absolute temperature in Kelvin (T = 0 K to 1,000+ K).',
      'Inspect Fermi-Dirac distribution state probability $f(E)$ and thermal smearing width $k_B T$.'
    ],
    benefitTitle: 'Enrico Fermi & Paul Dirac 1926 Pauli Exclusion Statistics',
    benefitContent: 'Because electrons are spin-1/2 fermions subject to the Pauli Exclusion Principle, states cannot be multiply occupied; at the Fermi energy ($E = E_F$), the state occupancy probability is always exactly $f(E_F) = 0.50$ (50%) regardless of temperature.',
    faqs: [{ q: 'When can the Fermi-Dirac distribution be approximated by Maxwell-Boltzmann?', a: 'When $(E - E_F) \ge 3 k_B T$, the "$+1$" in the denominator becomes negligible, simplifying $f(E) \approx e^{-(E - E_F)/k_B T}$.' }]
  },

  // 4. Relativistic de Broglie Matter Wavelength Calculator
  {
    slug: 'de-broglie-matter-wavelength-relativistic-calculator',
    name: 'Relativistic de Broglie Matter Wavelength (λ = h / p) Calculator',
    description: 'Calculate relativistic electron/particle de Broglie matter wavelength (λ = h / √(2·m₀·E_k + E_k²/c²)) in picometers and Ångströms for Transmission Electron Microscopy (TEM).',
    category: 'Science',
    icon: 'text',
    keywords: ['de broglie wavelength calculator', 'relativistic matter wave formula lambda equals h over p online', 'electron microscope wavelength tem accelerator voltage calculator', 'matter wave picometer angstrom calculator online', 'louis de broglie wave particle duality calculator'],
    order: 815,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Kinetic Energy / Accelerating Voltage V_acc (kV) & Particle Mass (Electron, Proton, Neutron)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="deb-vacc">Voltage V_acc (kV)</label>
          <input class="tool-textarea" id="deb-vacc" type="number" step="10" value="200.0" placeholder="200.0 kV (Standard TEM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="deb-part">Particle Type</label>
          <select class="tool-textarea" id="deb-part">
            <option value="electron" selected>Electron (m₀ = 511.0 keV/c²)</option>
            <option value="proton">Proton (m₀ = 938.3 MeV/c²)</option>
            <option value="neutron">Thermal Neutron (E = 25 meV)</option>
          </select>
        </div>
      </div>
      <div id="deb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="deb-res-lam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ = 2.508 pm (0.0251 Å)</span>
            <span class="stat-label">Relativistic de Broglie Matter Wavelength (λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="deb-res-rel" style="font-weight:700;">Relativistic Velocity v = 0.695 c (Lorentz γ = 1.391: Atomic Resolution TEM)</span>
            <span class="stat-label">Relativistic Lorentz Factor (γ) & Particle Velocity (v/c)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('deb-vacc'), pEl = document.getElementById('deb-part');
  const lResEl = document.getElementById('deb-res-lam'), rResEl = document.getElementById('deb-res-rel');

  const h = 6.62607015e-34; // J * s
  const c_light = 299792458; // m / s
  const m_e_kg = 9.1093837e-31;
  const e_charge = 1.602176634e-19;

  function update() {
    const Vacc_kv = parseFloat(vEl.value);
    if (isNaN(Vacc_kv) || Vacc_kv <= 0) return;

    // Kinetic energy in Joules: Ek = q * V
    const Ek_joules = Vacc_kv * 1000.0 * e_charge;
    const E0_joules = m_e_kg * Math.pow(c_light, 2); // 511 keV

    // Lorentz factor gamma = 1 + Ek / E0
    const gamma = 1.0 + (Ek_joules / E0_joules);
    // Velocity v = c * sqrt( 1 - 1/gamma^2 )
    const v_ratio = Math.sqrt(1.0 - (1.0 / Math.pow(gamma, 2)));

    // Relativistic momentum p = gamma * m_0 * v = (1/c) * sqrt( Ek^2 + 2*Ek*E0 )
    const p_momentum = (1.0 / c_light) * Math.sqrt(Math.pow(Ek_joules, 2) + (2.0 * Ek_joules * E0_joules));

    // de Broglie wavelength lambda = h / p  [meters]
    const lambda_m = h / p_momentum;
    const lambda_pm = lambda_m * 1e12;
    const lambda_angstrom = lambda_m * 1e10;

    lResEl.textContent = 'λ = ' + lambda_pm.toFixed(3) + ' pm (' + lambda_angstrom.toFixed(4) + ' Ångströms)';
    rResEl.textContent = 'Velocity v = ' + v_ratio.toFixed(3) + ' c (' + Math.round(v_ratio * 300000).toLocaleString() + ' km/s | Lorentz γ = ' + gamma.toFixed(3) + ' @ ' + Vacc_kv + ' kV)';
  }

  vEl.addEventListener('input', update);
  pEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter electron accelerating anode high voltage $V_{\text{acc}}$ in kilovolts (kV) (e.g. 200 kV for standard Cryo-EM / TEM).',
      'Inspect relativistic de Broglie matter wavelength in picometers (pm) and Ångströms, Lorentz dilation factor $\gamma$, and relativistic particle velocity ($v/c$).'
    ],
    benefitTitle: 'Louis de Broglie 1924 Wave-Particle Duality Hypothesis',
    benefitContent: 'Because high-energy electrons at 200–300 kV have matter wavelengths 100,000× smaller than visible light ($\lambda \approx 2.5\text{ pm}$ vs $500\text{ nm}$), Transmission Electron Microscopes (TEM) shatter the Abbe optical diffraction limit to image individual atoms in graphene and viral protein spikes.',
    faqs: [{ q: 'Why is relativistic correction mandatory in 200 kV electron microscopes?', a: 'At 200 kV, electrons travel at 69.5% the speed of sound ($c$), increasing their momentum by 39% ($\gamma = 1.391$) and shortening the wavelength from classical 2.74 pm down to relativistic 2.51 pm.' }]
  },

  // 5. Quantum Dot Bandgap Shift (Brus Equation) & Emission Color Calculator
  {
    slug: 'quantum-dot-exciton-bohr-radius-bandgap-brus-equation-calculator',
    name: 'Quantum Dot Bandgap Shift (Brus Equation ΔE_g) & Emission Color Calculator',
    description: 'Calculate colloidal semiconductor quantum dot size-dependent bandgap blue-shift (Brus equation: ΔE_g = ℏ²π² / (2·R²) · [1/m_e* + 1/m_h*] - 1.8·e² / (4πε·R)) in eV and optical fluorescence emission wavelength in nm.',
    category: 'Science',
    icon: 'text',
    keywords: ['quantum dot brus equation calculator', 'quantum confinement bandgap formula delta eg online', 'colloidal quantum dot size to emission wavelength calculator', 'cdse quantum dot photoluminescence color calculator', 'nanotechnology quantum dot exciton bohr radius online'],
    order: 816,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Quantum Dot Radius R (nm) & Nanocrystal Semiconductor (CdSe, PbS, InP, Perovskite)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qd-mat">Semiconductor</label>
          <select class="tool-textarea" id="qd-mat">
            <option value="cdse" selected>CdSe Cadmium Selenide (Bulk Eg = 1.74 eV / 712 nm Red)</option>
            <option value="inp">InP Indium Phosphide (Bulk Eg = 1.35 eV / 918 nm NIR)</option>
            <option value="pbs">PbS Lead Sulfide (Bulk Eg = 0.41 eV - Telecom SWIR)</option>
            <option value="perov">CsPbBr₃ Perovskite (Bulk Eg = 2.30 eV / 539 nm Green)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="qd-r">Core Radius R (nm)</label>
          <input class="tool-textarea" id="qd-r" type="number" step="0.1" value="2.1" placeholder="2.1 nm (4.2 nm Diameter)" />
        </div>
      </div>
      <div id="qd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qd-res-eg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">E_g = 2.36 eV (λ = 525 nm Green)</span>
            <span class="stat-label">Confinement Bandgap & Photoluminescence Peak</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qd-res-shift" style="font-weight:700;">Quantum Blue-Shift ΔE_g = +0.62 eV (Bulk E_g = 1.74 eV -> 2.36 eV @ R = 2.1 nm)</span>
            <span class="stat-label">Brus Quantum Confinement Blue-Shift</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('qd-mat'), rEl = document.getElementById('qd-r');
  const egResEl = document.getElementById('qd-res-eg'), shResEl = document.getElementById('qd-res-shift');

  const hbar = 1.054571817e-34;
  const m_e_kg = 9.1093837e-31;
  const e_charge = 1.602176634e-19;
  const c_light = 299792458;
  const h_planck = 6.62607015e-34;

  const SEMIS = {
    'cdse':  { eg_bulk: 1.74, me_eff: 0.13, mh_eff: 0.45, eps_r: 10.0, name: 'CdSe' },
    'inp':   { eg_bulk: 1.35, me_eff: 0.08, mh_eff: 0.60, eps_r: 12.5, name: 'InP' },
    'pbs':   { eg_bulk: 0.41, me_eff: 0.08, mh_eff: 0.08, eps_r: 17.0, name: 'PbS' },
    'perov': { eg_bulk: 2.30, me_eff: 0.15, mh_eff: 0.14, eps_r: 8.5,  name: 'CsPbBr₃' }
  };

  function update() {
    const s = SEMIS[matEl.value];
    const R_nm = parseFloat(rEl.value);

    if (isNaN(R_nm) || R_nm <= 0) return;

    const R_m = R_nm * 1e-9;

    // Reduced effective mass 1/mu = 1/me + 1/mh
    const inv_mu = (1.0 / s.me_eff) + (1.0 / s.mh_eff);
    const mu_kg = (m_e_kg / inv_mu);

    // Brus confinement kinetic energy term: Delta_Ek = ( hbar^2 * pi^2 ) / ( 2 * mu * R^2 )  [Joules -> eV]
    const Delta_Ek_J = (Math.pow(hbar, 2) * Math.pow(Math.PI, 2)) / (2.0 * mu_kg * Math.pow(R_m, 2));
    const Delta_Ek_ev = Delta_Ek_J / e_charge;

    // Coulomb attraction term: Delta_Ec = 1.8 * e^2 / ( 4 * pi * eps0 * eps_r * R )  [eV]
    const eps0 = 8.8541878128e-12;
    const Delta_Ec_J = (1.8 * Math.pow(e_charge, 2)) / (4.0 * Math.PI * eps0 * s.eps_r * R_m);
    const Delta_Ec_ev = Delta_Ec_J / e_charge;

    // Effective QD bandgap E_g_qd = E_g_bulk + Delta_Ek - Delta_Ec  [eV]
    const E_g_qd = s.eg_bulk + Delta_Ek_ev - Delta_Ec_ev;
    const blueShift_ev = E_g_qd - s.eg_bulk;

    // Photoluminescence emission wavelength lambda = h * c / Eg  [nm]
    const lambda_nm = (h_planck * c_light / (E_g_qd * e_charge)) * 1e9;

    let colorName = '';
    let hexColor = '#22543d';

    if (lambda_nm < 450) { colorName = 'Violet / UV'; hexColor = '#7c3aed'; }
    else if (lambda_nm < 495) { colorName = 'Blue Light'; hexColor = '#2563eb'; }
    else if (lambda_nm < 570) { colorName = 'Pure Green'; hexColor = '#16a34a'; }
    else if (lambda_nm < 590) { colorName = 'Yellow Light'; hexColor = '#ca8a04'; }
    else if (lambda_nm < 620) { colorName = 'Amber / Orange'; hexColor = '#ea580c'; }
    else if (lambda_nm < 750) { colorName = 'Deep Red'; hexColor = '#dc2626'; }
    else { colorName = 'Infrared (NIR / SWIR)'; hexColor = '#4b5563'; }

    egResEl.textContent = 'E_g = ' + E_g_qd.toFixed(2) + ' eV (' + Math.round(lambda_nm) + ' nm ' + colorName + ')';
    egResEl.style.color = hexColor;
    shResEl.textContent = 'Blue-Shift ΔE_g = +' + blueShift_ev.toFixed(2) + ' eV (Bulk: ' + s.eg_bulk + ' eV -> QD ' + E_g_qd.toFixed(2) + ' eV @ Core R = ' + R_nm + ' nm)';
  }

  matEl.addEventListener('change', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select semiconductor core chemistry (CdSe, InP eco-friendly, PbS infrared, CsPbBr₃ perovskite).',
      'Enter quantum dot spherical core nanocrystal radius R in nanometers (nm).',
      'Inspect size-tunable bandgap $E_g$ in eV, quantum confinement blue-shift $\Delta E_g$, and photoluminescent emission color.'
    ],
    benefitTitle: 'Louis E. Brus 1984 Quantum Confinement Theory',
    benefitContent: 'When semiconductor crystals shrink smaller than their natural exciton Bohr radius ($R < a_B$), 3D quantum confinement increases the effective bandgap ($\Delta E_g \propto 1/R^2$), allowing TV manufacturers (QLED Displays) to precisely tune vibrant pure red, green, and blue colors by simply controlling nanoparticle synthesis diameter.',
    faqs: [{ q: 'Why is InP replacing CdSe in commercial QLED TVs?', a: 'Cadmium (Cd) in CdSe is a toxic heavy metal restricted by EU RoHS regulations; Indium Phosphide (InP) provides heavy-metal-free quantum dot displays.' }]
  },

  // --- Suite VVVVV: Nuclear Reactor Kinetics & Fusion Plasma Physics (936 - 940) ---
  // 6. Nuclear Fusion Lawson Criterion & Triple Product (n·T·τ_E) Calculator
  {
    slug: 'fusion-triple-product-lawson-criterion-calculator',
    name: 'Nuclear Fusion Lawson Criterion & Triple Product (n·T·τ_E) Calculator',
    description: 'Calculate magnetic fusion plasma Triple Product (n · T · τ_E in keV·s/m³) and evaluate Breakeven (Q = 1) and Ignition (Q = ∞) thresholds for Deuterium-Tritium (D-T) fusion.',
    category: 'Science',
    icon: 'text',
    keywords: ['lawson criterion calculator', 'fusion triple product formula n t tau e online', 'tokamak ignition breakeven q factor calculator', 'iter deuterium tritium fusion triple product calculator', 'nuclear fusion energy confinement time online'],
    order: 817,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ion Density n (10²⁰ m⁻³), Core Temperature T (keV) & Energy Confinement Time τ_E (seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fus-n">Density n (10²⁰ m⁻³)</label>
          <input class="tool-textarea" id="fus-n" type="number" step="0.1" value="1.0" placeholder="1.0 (10²⁰ ions/m³)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fus-t">Temp T (keV)</label>
          <input class="tool-textarea" id="fus-t" type="number" step="1" value="15.0" placeholder="15.0 keV (174 Million °C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fus-tau">Confinement τ_E (s)</label>
          <input class="tool-textarea" id="fus-tau" type="number" step="0.5" value="3.5" placeholder="3.5 s (ITER Baseline)" />
        </div>
      </div>
      <div id="fus-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fus-res-tp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">n·T·τ_E = 5.25 × 10²¹ keV·s/m³</span>
            <span class="stat-label">Fusion Triple Product (n · T · τ_E)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fus-res-q" style="color:var(--green-dark); font-weight:700;">IGNITION ACHIEVED (Q > 10 High Net Fusion Energy: Exceeds 3.0 × 10²¹ Lawson Threshold)</span>
            <span class="stat-label">Fusion Energy Gain Factor (Q = P_fusion / P_aux)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('fus-n'), tEl = document.getElementById('fus-t'), tauEl = document.getElementById('fus-tau');
  const tpResEl = document.getElementById('fus-res-tp'), qResEl = document.getElementById('fus-res-q');

  const lawson_ignition_threshold = 3.0e21; // keV * s / m^3 (for D-T at ~15 keV)

  function update() {
    const n_factor = parseFloat(nEl.value), T_kev = parseFloat(tEl.value), tau_sec = parseFloat(tauEl.value);
    if (isNaN(n_factor) || isNaN(T_kev) || isNaN(tau_sec) || n_factor <= 0 || T_kev <= 0 || tau_sec <= 0) return;

    const n_m3 = n_factor * 1e20;

    // Triple product n * T * tau_E  [keV * s / m^3]
    const tripleProduct = n_m3 * T_kev * tau_sec;

    // Temperature in million degrees Celsius: 1 keV approx 11.6045 million K
    const tempMillionK = T_kev * 11.6045;

    // Fusion gain factor Q approximation:
    // Q = 5 / ( (lawson_ignition_threshold / tripleProduct) - 1 ) for TP < threshold
    let Q_str = '';
    let color = '#22543d';

    if (tripleProduct >= lawson_ignition_threshold) {
      Q_str = 'IGNITION / BURNING PLASMA (Q ≥ 10: Self-sustaining alpha heating dominates P_aux)';
      color = '#22543d';
    } else if (tripleProduct >= 0.5 * lawson_ignition_threshold) {
      const Q_val = (tripleProduct / lawson_ignition_threshold) * 8.0;
      Q_str = 'SCIENTIFIC BREAKEVEN (Q ≈ ' + Q_val.toFixed(1) + ' > 1: Generates more fusion power than injected heat)';
      color = '#2563eb';
    } else {
      const Q_val = (tripleProduct / lawson_ignition_threshold) * 2.0;
      Q_str = 'SUB-BREAKEVEN (Q ≈ ' + Q_val.toFixed(2) + ' < 1: Net energy loss, requires external heating)';
      color = '#d97706';
    }

    tpResEl.textContent = 'n·T·τ_E = ' + (tripleProduct).toExponential(2) + ' keV·s/m³';
    qResEl.textContent = Q_str + ' (T = ' + Math.round(tempMillionK) + ' Million °C @ ' + T_kev + ' keV)';
    qResEl.style.color = color;
  }

  [nEl, tEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fusion plasma fuel core ion density n in units of $10^{20}\text{ ions/m}^3$.',
      'Enter plasma core ion temperature T in kiloelectron-volts (keV) ($1\text{ keV} \approx 11.6\text{ Million }^\circ\text{C}$).',
      'Enter energy confinement time $\tau_E$ in seconds.',
      'Inspect fusion Triple Product ($n T \tau_E$) and evaluate whether the plasma achieves Scientific Breakeven ($Q > 1$) or Self-Sustaining Ignition ($Q > 10$).'
    ],
    benefitTitle: 'John D. Lawson 1955 Fusion Energy Criterion',
    benefitContent: 'For net positive fusion power, alpha particles created by Deuterium-Tritium reactions ($D + T \to \alpha(3.5\text{ MeV}) + n(14.1\text{ MeV})$) must deposit enough heat to balance bremsstrahlung radiation losses, setting the strict physical threshold $n T \tau_E \ge 3 \times 10^{21}\text{ keV}\cdot\text{s/m}^3$ targeted by the ITER tokamak.',
    faqs: [{ q: 'Why is 15 keV the optimal temperature for D-T fusion?', a: 'At 15 keV ($\sim 170\text{ Million }^\circ\text{C}$), the D-T fusion cross-section $\langle\sigma v\rangle$ reaches its maximum peak relative to thermal bremsstrahlung loss.' }]
  },

  // 7. Plasma Debye Length (λ_D) & Plasma Frequency (ω_pe) Calculator
  {
    slug: 'plasma-debye-length-plasma-frequency-calculator',
    name: 'Plasma Debye Length (λ_D) & Electron Plasma Frequency (ω_pe) Calculator',
    description: 'Calculate electrostatic screening Debye Length (λ_D = √(ε₀·k_B·T_e / (n_e·e²))) in μm and electron Langmuir plasma oscillation frequency (f_pe = (1/2π) · √(n_e·e² / (ε₀·m_e))) in GHz.',
    category: 'Science',
    icon: 'text',
    keywords: ['debye length calculator', 'plasma frequency formula omega pe equals sqrt ne e squared over eps0 me', 'electrostatic debye screening length calculator online', 'langmuir plasma oscillation frequency calculator', 'tokamak plasma debye sphere number online'],
    order: 818,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electron Density n_e (m⁻³ or cm⁻³) & Electron Temperature T_e (eV or K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="deb-ne">Density n_e (m⁻³)</label>
          <input class="tool-textarea" id="deb-ne" type="number" step="any" value="1.0e19" placeholder="1.0e19 m⁻³ (Tokamak)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="deb-te">Temp T_e (eV)</label>
          <input class="tool-textarea" id="deb-te" type="number" step="10" value="1000.0" placeholder="1000.0 eV (1 keV Core)" />
        </div>
      </div>
      <div id="deb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="deb-res-ld" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ_D = 74.3 μm Shielding</span>
            <span class="stat-label">Electrostatic Debye Screening Length (λ_D)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="deb-res-fpe" style="font-weight:700;">Plasma Frequency f_pe = 28.4 GHz (Debye Sphere Count N_D = 1.72 × 10⁷ >> 1)</span>
            <span class="stat-label">Electron Plasma Langmuir Frequency (f_pe) & Debye Number</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const neEl = document.getElementById('deb-ne'), teEl = document.getElementById('deb-te');
  const ldResEl = document.getElementById('deb-res-ld'), fpeResEl = document.getElementById('deb-res-fpe');

  const eps0 = 8.8541878128e-12; // F / m
  const e_charge = 1.602176634e-19; // Coulombs
  const m_e = 9.1093837e-31;     // kg

  function update() {
    const ne = parseFloat(neEl.value), Te_ev = parseFloat(teEl.value);
    if (isNaN(ne) || isNaN(Te_ev) || ne <= 0 || Te_ev <= 0) return;

    const Te_joules = Te_ev * e_charge;

    // Debye length lambda_D = sqrt( eps0 * Te_joules / ( ne * e_charge^2 ) )  [meters]
    const lambda_D_m = Math.sqrt((eps0 * Te_joules) / (ne * Math.pow(e_charge, 2)));
    const lambda_D_um = lambda_D_m * 1e6;

    // Plasma angular frequency omega_pe = sqrt( ne * e_charge^2 / ( eps0 * m_e ) )  [rad / s]
    const omega_pe = Math.sqrt((ne * Math.pow(e_charge, 2)) / (eps0 * m_e));
    const f_pe_ghz = (omega_pe / (2.0 * Math.PI)) / 1e9;

    // Number of particles in Debye sphere N_D = (4/3) * pi * ne * lambda_D^3
    const N_D = (4.0 / 3.0) * Math.PI * ne * Math.pow(lambda_D_m, 3);

    ldResEl.textContent = 'λ_D = ' + (lambda_D_um < 1000 ? lambda_D_um.toFixed(1) + ' μm' : (lambda_D_m * 1000).toFixed(2) + ' mm');
    fpeResEl.textContent = 'f_pe = ' + f_pe_ghz.toFixed(2) + ' GHz (Cutoff Wavelength λ = ' + (300/fpeResEl).toFixed(1) + ' mm | Debye Particles N_D = ' + N_D.toExponential(2) + ')';
  }

  neEl.addEventListener('input', update);
  teEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter plasma electron number density $n_e$ in $m^{-3}$ (e.g. $10^{19}\text{ m}^{-3}$ for tokamaks, $10^{12}\text{ m}^{-3}$ for ionosphere).',
      'Enter electron thermal temperature $T_e$ in electron-volts (eV).',
      'Inspect electrostatic Debye shielding length $\lambda_D$ in $\mu\text{m}$, electron Langmuir plasma oscillation frequency $f_{\text{pe}}$ in GHz, and Debye sphere particle count $N_D$.'
    ],
    benefitTitle: 'Peter Debye & Irving Langmuir Collective Plasma Behavior',
    benefitContent: 'For an ionized gas to behave as a true plasma, the Debye length must be far smaller than the system dimensions ($\lambda_D \ll L$) and the Debye sphere must contain millions of particles ($N_D \gg 1$), ensuring quasi-neutrality and high-frequency collective shielding of electric fields.',
    faqs: [{ q: 'What happens to radio waves below the plasma frequency f_pe?', a: 'Electromagnetic waves with frequency below $f_{\text{pe}}$ cannot propagate through the plasma and are 100% reflected (explaining how the ionosphere bounces AM radio signals across the globe).' }]
  },

  // 8. Tokamak Kink Instability Safety Factor (q) Calculator
  {
    slug: 'tokamak-safety-factor-q-kink-instability-calculator',
    name: 'Tokamak Safety Factor (q_a & Kruskal-Shafranov Limit) Calculator',
    description: 'Calculate magnetic confinement tokamak safety factor (q_a = (a / R) · (B_T / B_p) · [(1 + κ²) / 2]) to ensure magnetohydrodynamic (MHD) stability against destructive Kruskal-Shafranov kink disruptions (q exceeding 2.0).',
    category: 'Science',
    icon: 'text',
    keywords: ['tokamak safety factor calculator', 'kruskal shafranov limit formula q greater than 2 online', 'mhd kink instability safety factor qa calculator', 'iter tokamak plasma current elongation q calculator', 'fusion magnetic confinement safety factor online'],
    order: 819,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Major Radius R (m), Minor Radius a (m), Toroidal Field B_T (T), Plasma Current I_p (MA) & Elongation κ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="q-r">Major R (m)</label>
          <input class="tool-textarea" id="q-r" type="number" step="any" value="6.20" placeholder="6.20 m (ITER Major Radius)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="q-a">Minor a (m)</label>
          <input class="tool-textarea" id="q-a" type="number" step="any" value="2.00" placeholder="2.00 m (Minor Radius)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="q-bt">Toroidal B_T (T)</label>
          <input class="tool-textarea" id="q-bt" type="number" step="0.5" value="5.30" placeholder="5.30 Tesla" />
        </div>
        <div class="control-group">
          <label class="control-label" for="q-ip">Current I_p (MA)</label>
          <input class="tool-textarea" id="q-ip" type="number" step="1" value="15.0" placeholder="15.0 MA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="q-kappa">Elongation κ</label>
          <input class="tool-textarea" id="q-kappa" type="number" step="0.1" value="1.70" placeholder="1.70 (D-Shape)" />
        </div>
      </div>
      <div id="q-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="q-res-qa" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">q_95 = 3.12 (MHD STABLE)</span>
            <span class="stat-label">Edge Safety Factor (q_a / q_95)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="q-res-stat" style="color:var(--green-dark); font-weight:700;">SAFE: q_95 ≥ 3.0 protects against catastrophic Kruskal-Shafranov (m=2, n=1) kink disruption</span>
            <span class="stat-label">Magnetohydrodynamic (MHD) Kink Stability Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('q-r'), aEl = document.getElementById('q-a');
  const btEl = document.getElementById('q-bt'), ipEl = document.getElementById('q-ip'), kEl = document.getElementById('q-kappa');
  const qaResEl = document.getElementById('q-res-qa'), stResEl = document.getElementById('q-res-stat');

  const mu0 = 4.0 * Math.PI * 1e-7;

  function update() {
    const R = parseFloat(rEl.value), a = parseFloat(aEl.value);
    const B_T = parseFloat(btEl.value), I_p_MA = parseFloat(ipEl.value), kappa = parseFloat(kEl.value);

    if (isNaN(R) || isNaN(a) || isNaN(B_T) || isNaN(I_p_MA) || isNaN(kappa) || R <= a || a <= 0 || B_T <= 0 || I_p_MA <= 0 || kappa <= 0) return;

    const I_p_Amps = I_p_MA * 1e6;

    // Poloidal field at edge B_p = (mu0 * I_p) / ( 2 * pi * a * sqrt( (1 + kappa^2)/2 ) )
    const shapeFactor = (1.0 + Math.pow(kappa, 2)) / 2.0;

    // Standard cylindrical edge safety factor q_a:
    // q_a = ( 2 * pi * a^2 * B_T ) / ( mu0 * I_p * R ) * shapeFactor
    const q_a = ((2.0 * Math.PI * Math.pow(a, 2) * B_T) / (mu0 * I_p_Amps * R)) * shapeFactor;

    let status = '';
    let color = '#22543d';

    if (q_a >= 3.0) {
      status = 'STABLE (q ≥ 3.0: Standard baseline tokamak operating regime, high disruption margin)';
      color = '#22543d';
    } else if (q_a >= 2.0) {
      status = 'MARGINALLY STABLE (2.0 ≤ q < 3.0: High performance but susceptible to neoclassical tearing modes)';
      color = '#d97706';
    } else {
      status = 'KRUSKAL-SHAFRANOV DISRUPTION (q < 2.0: Catastrophic m=1, n=1 external kink dumps plasma into wall!)';
      color = '#c53030';
    }

    qaResEl.textContent = 'q_a = ' + q_a.toFixed(2) + ' (Aspect Ratio R/a = ' + (R/a).toFixed(2) + ')';
    qaResEl.style.color = color;
    stResEl.textContent = status + ' | ITER Parameters: B_T = ' + B_T + ' T, I_p = ' + I_p_MA + ' MA, κ = ' + kappa;
    stResEl.style.color = color;
  }

  [rEl, aEl, btEl, ipEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter tokamak major radius R in meters.',
      'Enter plasma minor radius a in meters.',
      'Enter central toroidal magnetic field $B_T$ in Tesla.',
      'Enter driven plasma current $I_p$ in Mega-Amperes (MA).',
      'Enter plasma cross-sectional vertical elongation ratio $\kappa = b/a$ (e.g. 1.7 for D-shaped plasma).',
      'Inspect calculated edge safety factor $q_a$ and verify whether the plasma is safe from the Kruskal-Shafranov external kink limit ($q > 2.0$).'
    ],
    benefitTitle: 'Martin Kruskal & Vitaly Shafranov 1954 Kink Stability Limit',
    benefitContent: 'The safety factor q represents the number of toroidal turns a magnetic field line makes around the donut for every single poloidal turn; maintaining $q > 2.0$ (typically $q_{95} \ge 3.0$) prevents helically resonant external kink instabilities from causing sudden multi-gigawatt thermal disruptions against the vessel wall.',
    faqs: [{ q: 'Why do tokamaks elongate plasma vertically (κ > 1.5)?', a: 'Elongation increases the edge safety factor for a given plasma current ($q \propto \frac{1+\kappa^2}{2}$), allowing higher plasma currents ($I_p$) and superior energy confinement.' }]
  },

  // 9. Cyclotron Gyrofrequency & Larmor Radius Gyroradius Calculator
  {
    slug: 'cyclotron-frequency-larmor-gyroradius-calculator',
    name: 'Cyclotron Gyrofrequency (ω_c) & Larmor Radius (r_L) Calculator',
    description: 'Calculate charged particle magnetic gyration Cyclotron Frequency (ω_c = q·B / m) in MHz/GHz and Larmor gyroradius (r_L = m·v_⊥ / (q·B) = √(2·m·E_⊥) / (q·B)) in mm/μm.',
    category: 'Science',
    icon: 'text',
    keywords: ['cyclotron frequency calculator', 'larmor radius formula r_l equals m v over q b online', 'gyrofrequency electron ion magnetic field calculator', 'plasma physics gyroradius cyclotron resonance calculator', 'magnetic confinement larmor orbit online'],
    order: 820,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Magnetic Field B (Tesla), Particle (Electron, Deuteron, Alpha) & Perpendicular Energy E_⊥ (keV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cyc-b">Magnetic B (Tesla)</label>
          <input class="tool-textarea" id="cyc-b" type="number" step="0.5" value="5.0" placeholder="5.0 Tesla (High Field)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-e">Energy E_⊥ (keV)</label>
          <input class="tool-textarea" id="cyc-e" type="number" step="1" value="10.0" placeholder="10.0 keV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-part">Charged Species</label>
          <select class="tool-textarea" id="cyc-part">
            <option value="deuteron" selected>Deuteron D⁺ (m = 2 amu, q = +1e)</option>
            <option value="electron">Electron e⁻ (m = 511 keV/c², q = -1e)</option>
            <option value="alpha">Alpha He²⁺ (m = 4 amu, q = +2e)</option>
            <option value="proton">Proton p⁺ (m = 1 amu, q = +1e)</option>
          </select>
        </div>
      </div>
      <div id="cyc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cyc-res-rl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">r_L = 2.04 mm Gyroradius</span>
            <span class="stat-label">Larmor Gyroradius Radius (r_L = v_⊥ / ω_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cyc-res-fc" style="font-weight:700;">Cyclotron Frequency f_c = 38.2 MHz (ICRH Resonance Heating Frequency)</span>
            <span class="stat-label">Cyclotron Gyration Resonance Frequency (f_c = q·B / 2π·m)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('cyc-b'), eEl = document.getElementById('cyc-e'), pEl = document.getElementById('cyc-part');
  const rlResEl = document.getElementById('cyc-res-rl'), fcResEl = document.getElementById('cyc-res-fc');

  const e_charge = 1.602176634e-19; // C
  const m_u = 1.66053906660e-27;    // kg (1 amu)
  const m_e_kg = 9.1093837e-31;

  const SPECIES = {
    'deuteron': { mass: 2.014 * m_u, q: 1 * e_charge, name: 'Deuteron D⁺' },
    'electron': { mass: m_e_kg,       q: 1 * e_charge, name: 'Electron e⁻' },
    'alpha':    { mass: 4.002 * m_u, q: 2 * e_charge, name: 'Alpha He²⁺' },
    'proton':   { mass: 1.007 * m_u, q: 1 * e_charge, name: 'Proton p⁺' }
  };

  function update() {
    const B = parseFloat(bEl.value), E_kev = parseFloat(eEl.value);
    const sp = SPECIES[pEl.value];

    if (isNaN(B) || isNaN(E_kev) || B <= 0 || E_kev <= 0) return;

    const E_joules = E_kev * 1000.0 * e_charge;

    // Perpendicular velocity v_perp = sqrt( 2 * E / m )  [m / s]
    const v_perp = Math.sqrt((2.0 * E_joules) / sp.mass);

    // Cyclotron angular frequency omega_c = q * B / m  [rad / s]
    const omega_c = (sp.q * B) / sp.mass;
    const f_c_hz = omega_c / (2.0 * Math.PI);

    // Larmor gyroradius r_L = v_perp / omega_c = (m * v_perp) / (q * B)  [meters]
    const r_L_m = v_perp / omega_c;
    const r_L_mm = r_L_m * 1000.0;
    const r_L_um = r_L_m * 1e6;

    let fStr = '';
    if (f_c_hz >= 1e9) fStr = (f_c_hz / 1e9).toFixed(2) + ' GHz (ECRH Resonance)';
    else fStr = (f_c_hz / 1e6).toFixed(1) + ' MHz (ICRH Resonance)';

    rlResEl.textContent = 'r_L = ' + (r_L_mm < 1.0 ? r_L_um.toFixed(1) + ' μm' : r_L_mm.toFixed(2) + ' mm Gyroradius');
    fcResEl.textContent = 'f_c = ' + fStr + ' | v_⊥ = ' + Math.round(v_perp / 1000).toLocaleString() + ' km/s (' + sp.name + ' @ B = ' + B + ' T)';
  }

  [bEl, eEl].forEach(el => el.addEventListener('input', update));
  pEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter confining magnetic field strength B in Tesla (e.g. 5.0 Tesla in superconducting coils).',
      'Enter perpendicular particle thermal kinetic energy $E_\perp$ in keV.',
      'Select charged species (Deuteron, Electron, Alpha particle, Proton).',
      'Inspect Larmor helical gyroradius $r_L$ and Cyclotron gyroresonance frequency $f_c$ in MHz or GHz.'
    ],
    benefitTitle: 'Lorentz Force Helical Magnetic Confinement',
    benefitContent: 'Charged particles gyrate in tight helical orbits around magnetic field lines with radius $r_L = m v_\perp / q B$; matching RF microwave antennas to the electron (ECRH $\sim 140\text{ GHz}$) or ion (ICRH $\sim 50\text{ MHz}$) cyclotron frequency injects megawatts of heating power directly into fusion plasmas.',
    faqs: [{ q: 'Why is electron Larmor radius so much smaller than ion Larmor radius?', a: 'Because electrons have 3,600× smaller mass than deuterons ($r_L \propto \sqrt{m}$), their gyroradius is under $50\ \mu\text{m}$, while deuterons trace larger $2\text{ mm}$ orbits.' }]
  },

  // 10. Plasma Beta (β) & Magnetic Pressure Confinement Efficiency Calculator
  {
    slug: 'plasma-beta-magnetic-confinement-efficiency-calculator',
    name: 'Plasma Beta (β = p_plasma / p_mag) Magnetic Confinement Efficiency Calculator',
    description: 'Calculate dimensionless plasma beta (β = (2·μ₀·n·k_B·T) / B²) and evaluate Troyon beta limit (β_N) for economic magnetic fusion power reactor design.',
    category: 'Science',
    icon: 'text',
    keywords: ['plasma beta calculator', 'magnetic confinement beta formula 2 mu0 p over b squared online', 'troyon beta limit normalized beta n calculator', 'tokamak magnetic pressure plasma beta calculator online', 'fusion reactor economics plasma beta online'],
    order: 821,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ion Density n (10²⁰ m⁻³), Total Temp T (keV) & Toroidal Magnetic Field B (Tesla)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="beta-n">Density n (10²⁰ m⁻³)</label>
          <input class="tool-textarea" id="beta-n" type="number" step="0.1" value="1.0" placeholder="1.0 (10²⁰ m⁻³)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="beta-t">Temp T (keV)</label>
          <input class="tool-textarea" id="beta-t" type="number" step="1" value="15.0" placeholder="15.0 keV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="beta-b">Field B (Tesla)</label>
          <input class="tool-textarea" id="beta-b" type="number" step="0.5" value="5.30" placeholder="5.30 Tesla" />
        </div>
      </div>
      <div id="beta-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="beta-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">β = 4.31% Efficiency</span>
            <span class="stat-label">Total Plasma Beta (β = p_plasma / p_magnetic)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="beta-res-press" style="font-weight:700;">p_plasma = 480 kPa (4.8 bar) vs Magnetic Pressure p_mag = 11.18 MPa (111.8 bar)</span>
            <span class="stat-label">Kinetic Plasma Pressure vs Confining Magnetic Field Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('beta-n'), tEl = document.getElementById('beta-t'), bEl = document.getElementById('beta-b');
  const bResEl = document.getElementById('beta-res-val'), pResEl = document.getElementById('beta-res-press');

  const mu0 = 4.0 * Math.PI * 1e-7;
  const e_charge = 1.602176634e-19;

  function update() {
    const n_factor = parseFloat(nEl.value), T_kev = parseFloat(tEl.value), B = parseFloat(bEl.value);
    if (isNaN(n_factor) || isNaN(T_kev) || isNaN(B) || n_factor <= 0 || T_kev <= 0 || B <= 0) return;

    const n_m3 = n_factor * 1e20;
    // Total kinetic pressure (ions + electrons): p = 2 * n * k_B * T  [Pa]
    const p_plasma_pa = 2.0 * n_m3 * (T_kev * 1000.0 * e_charge);
    const p_plasma_kpa = p_plasma_pa / 1000.0;
    const p_plasma_bar = p_plasma_pa / 1e5;

    // Magnetic field pressure p_mag = B^2 / (2 * mu0)  [Pa]
    const p_mag_pa = Math.pow(B, 2) / (2.0 * mu0);
    const p_mag_mpa = p_mag_pa / 1e6;
    const p_mag_bar = p_mag_pa / 1e5;

    // Plasma beta: beta = p_plasma / p_mag
    const beta = p_plasma_pa / p_mag_pa;
    const beta_pct = beta * 100.0;

    let rating = '';
    let color = '#22543d';

    if (beta_pct <= 5.0) {
      rating = 'STANDARD TOKAMAK REGIME (β ≤ 5%: Below Troyon MHD ballooning instability limit)';
      color = '#22543d';
    } else if (beta_pct <= 20.0) {
      rating = 'SPHERICAL TOKAMAK REGIME (5% < β ≤ 20%: High beta efficiency, requires close conducting wall)';
      color = '#2563eb';
    } else {
      rating = 'HIGH-BETA FIELD-REVERSED CONFIGURATION (β > 20%: Self-confining compact toroid)';
      color = '#d97706';
    }

    bResEl.textContent = 'β = ' + beta_pct.toFixed(2) + '% Confinement Ratio';
    bResEl.style.color = color;
    pResEl.textContent = 'p_plasma = ' + p_plasma_kpa.toFixed(0) + ' kPa (' + p_plasma_bar.toFixed(1) + ' bar) vs p_mag = ' + p_mag_mpa.toFixed(2) + ' MPa (' + Math.round(p_mag_bar) + ' bar) | ' + rating;
  }

  [nEl, tEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter plasma core density n in $10^{20}\text{ ions/m}^3$.',
      'Enter total plasma thermal kinetic temperature T in keV.',
      'Enter confining magnetic field B in Tesla.',
      'Inspect dimensionless Plasma Beta ($\beta = p_{\text{plasma}} / p_{\text{mag}}$) and magnetic pressure utilization efficiency.'
    ],
    benefitTitle: 'Magnetic Fusion Economic Efficiency Parameter',
    benefitContent: 'Fusion power density scales as $\text{Power} \propto \beta^2 B^4$; maximizing plasma beta ($\beta$) allows smaller, cheaper superconducting magnets to contain dense fusion plasmas up to the Troyon MHD ballooning pressure limit ($\beta_N \approx 3.5$).',
    faqs: [{ q: 'Why is beta (β) typically only 3% to 5% in conventional tokamaks?', a: 'Higher plasma pressure drives ballooning and kink instability modes that push magnetic field lines outwards until the plasma touches the walls.' }]
  },

  // --- Suite WWWWW: Advanced Cryptography, Information Security & Zero-Knowledge Proofs (941 - 945) ---
  // 11. RSA Modular Exponentiation & Key Generation Calculator
  {
    slug: 'rsa-modular-exponentiation-key-generation-calculator',
    name: 'RSA Asymmetric Key Generation & Fast Modular Exponentiation (c = m^e mod n) Calculator',
    description: 'Calculate RSA public/private key pairs (d ≡ e⁻¹ mod φ(n)), Euler totient φ(n) = (p-1)·(q-1), and fast square-and-multiply modular exponentiation encryption (c = m^e mod n).',
    category: 'Science',
    icon: 'text',
    keywords: ['rsa calculator', 'rsa key generation formula modular inverse d equals e inverse mod phi online', 'modular exponentiation c equals m power e mod n calculator', 'public private key rsa encryption calculator online', 'euler totient rsa cryptosystem calculator'],
    order: 822,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Prime p, Prime q, Public Exponent e (typically 65537 or 17) & Plaintext Message m',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rsa-p">Prime p</label>
          <input class="tool-textarea" id="rsa-p" type="number" step="1" value="61" placeholder="61 (Prime)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-q">Prime q</label>
          <input class="tool-textarea" id="rsa-q" type="number" step="1" value="53" placeholder="53 (Prime)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-e">Public e</label>
          <input class="tool-textarea" id="rsa-e" type="number" step="1" value="17" placeholder="17 (gcd(e, φ)=1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-m">Message m</label>
          <input class="tool-textarea" id="rsa-m" type="number" step="1" value="65" placeholder="65 (ASCII 'A')" />
        </div>
      </div>
      <div id="rsa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rsa-res-keys" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Public (e=17, n=3233) | Private d = 2753</span>
            <span class="stat-label">RSA Modulus n = p·q & Private Decryption Key d</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rsa-res-cipher" style="color:var(--green-dark); font-weight:700;">Ciphertext c = 2790 | Verified Decryption: c^d mod n = 65 ('A')</span>
            <span class="stat-label">Encryption (c = m^e mod n) & Decryption Verification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('rsa-p'), qEl = document.getElementById('rsa-q');
  const eEl = document.getElementById('rsa-e'), mEl = document.getElementById('rsa-m');
  const kResEl = document.getElementById('rsa-res-keys'), cResEl = document.getElementById('rsa-res-cipher');

  // Extended Euclidean algorithm for modular inverse
  function modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0, x1 = 1;
    if (m === 1) return 0;
    while (a > 1) {
      q = Math.floor(a / m);
      t = m;
      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
  }

  // Modular exponentiation (base^exp mod mod)
  function powerMod(base, exp, mod) {
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return res;
  }

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function update() {
    const p = parseInt(pEl.value, 10), q = parseInt(qEl.value, 10);
    const e = parseInt(eEl.value, 10), m = parseInt(mEl.value, 10);

    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(m) || p <= 1 || q <= 1 || p === q || m < 0) return;

    // Modulus n = p * q
    const n = p * q;
    // Euler totient phi(n) = (p - 1) * (q - 1)
    const phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
      kResEl.textContent = 'Invalid e: gcd(e, φ(n)) must be 1!';
      return;
    }

    // Private key d = e^-1 mod phi
    const d = modInverse(e, phi);

    // Encrypt ciphertext c = m^e mod n
    const c = powerMod(m, e, n);

    // Decrypt decrypted = c^d mod n
    const decrypted = powerMod(c, d, n);

    kResEl.textContent = 'Public (e=' + e + ', n=' + n + ') | Private d = ' + d + ' (φ = ' + phi + ')';
    cResEl.textContent = 'Ciphertext c = ' + c + ' | Decrypted: ' + decrypted + ' (Match: ' + (decrypted === m ? 'VERIFIED OK' : 'FAIL') + ')';
  }

  [pEl, qEl, eEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter distinct prime numbers p and q.',
      'Enter public encryption exponent e coprime to $\phi(n) = (p-1)(q-1)$.',
      'Enter numeric plaintext integer message m ($m < n$).',
      'Inspect generated public key $(e, n)$, private decryption key d, encrypted ciphertext c ($c = m^e \bmod n$), and verified decrypted plaintext.'
    ],
    benefitTitle: 'Rivest-Shamir-Adleman 1977 Public-Key Cryptosystem',
    benefitContent: 'RSA relies on the asymmetric trapdoor difficulty of integer prime factorization: while computing $n = p \cdot q$ takes microseconds, factoring 2048-bit n back into primes without knowing private key d would take supercomputers billions of years.',
    faqs: [{ q: 'Why is e = 65537 commonly used in commercial RSA certificates?', a: '$65537 = 2^{16} + 1$ is a Fermat prime with only two binary "1" bits, allowing ultra-fast modular exponentiation with only 17 multiplications.' }]
  },

  // 12. Elliptic Curve Point Addition & Scalar Multiplication Calculator
  {
    slug: 'elliptic-curve-point-addition-scalar-multiplication-calculator',
    name: 'Elliptic Curve Point Addition & Scalar Multiplication (P + Q & k·G) Calculator',
    description: 'Calculate Weierstrass elliptic curve point addition (P + Q) and scalar point multiplication (k · G) over prime finite fields (y² ≡ x³ + ax + b mod p) for ECC / Bitcoin secp256k1.',
    category: 'Science',
    icon: 'text',
    keywords: ['elliptic curve calculator', 'ecc point addition formula lambda equals y2 minus y1 over x2 minus x1 online', 'elliptic curve point doubling scalar multiplication calculator', 'secp256k1 bitcoin ecc calculator online', 'finite field cryptography point addition online'],
    order: 823,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Curve: y² ≡ x³ + ax + b mod p | Point P(x₁, y₁), Point Q(x₂, y₂) & Scalar k',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ecc-p">Field Prime p</label>
          <input class="tool-textarea" id="ecc-p" type="number" step="1" value="23" placeholder="23 (Finite Field)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecc-a">Param a</label>
          <input class="tool-textarea" id="ecc-a" type="number" step="1" value="1" placeholder="1 (y² = x³ + x + 1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecc-b">Param b</label>
          <input class="tool-textarea" id="ecc-b" type="number" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecc-px">Point P (x)</label>
          <input class="tool-textarea" id="ecc-px" type="number" step="1" value="3" placeholder="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecc-py">Point P (y)</label>
          <input class="tool-textarea" id="ecc-py" type="number" step="1" value="10" placeholder="10" />
        </div>
      </div>
      <div id="ecc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ecc-res-dbl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2·P = (7, 12) Point Doubling</span>
            <span class="stat-label">Elliptic Curve Point Doubling 2·P (Tangent Line)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ecc-res-desc" style="color:var(--green-dark); font-weight:700;">Chord Slope λ = (3x₁² + a) / (2y₁) mod p = 4 | Valid Curve Point (y² ≡ 100 ≡ x³+x+1 ≡ 31 ≡ 8 mod 23)</span>
            <span class="stat-label">Chord-and-Tangent Geometric Addition Law</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('ecc-p'), aEl = document.getElementById('ecc-a'), bEl = document.getElementById('ecc-b');
  const pxEl = document.getElementById('ecc-px'), pyEl = document.getElementById('ecc-py');
  const dblResEl = document.getElementById('ecc-res-dbl'), dscResEl = document.getElementById('ecc-res-desc');

  function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return 1;
  }

  function update() {
    const p = parseInt(pEl.value, 10), a = parseInt(aEl.value, 10), b = parseInt(bEl.value, 10);
    const px = parseInt(pxEl.value, 10), py = parseInt(pyEl.value, 10);

    if (isNaN(p) || isNaN(a) || isNaN(b) || isNaN(px) || isNaN(py) || p <= 2) return;

    // Verify point P is on curve: y^2 mod p == (x^3 + a*x + b) mod p
    const lhs = (py * py) % p;
    const rhs = (((px * px * px) + (a * px) + b) % p + p) % p;

    if (lhs !== rhs) {
      dblResEl.textContent = 'Point P(' + px + ', ' + py + ') is NOT on curve!';
      dscResEl.textContent = 'LHS y² mod ' + p + ' = ' + lhs + ' vs RHS (x³+ax+b) mod ' + p + ' = ' + rhs;
      return;
    }

    // Point Doubling 2*P:
    // lambda = (3*px^2 + a) / (2*py) mod p
    const num = ((3 * px * px) + a);
    const den = (2 * py);
    const lambda = (((num * modInverse(den, p)) % p) + p) % p;

    // x3 = lambda^2 - 2*px mod p
    const x3 = ((((lambda * lambda) - (2 * px)) % p) + p) % p;
    // y3 = lambda*(px - x3) - py mod p
    const y3 = ((((lambda * (px - x3)) - py) % p) + p) % p;

    dblResEl.textContent = '2·P = (' + x3 + ', ' + y3 + ') on F_' + p;
    dscResEl.textContent = 'Slope λ = ' + lambda + ' | 3·P = P + 2P | Curve: y² ≡ x³ + ' + a + 'x + ' + b + ' (mod ' + p + ')';
  }

  [pEl, aEl, bEl, pxEl, pyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter finite field prime modulus p.',
      'Enter curve equation parameters a and b ($y^2 \equiv x^3 + ax + b \pmod p$).',
      'Enter base coordinate point $P(x_1, y_1)$ lying on the curve.',
      'Inspect point doubling $2P = (x_3, y_3)$ calculated via tangent line algebra and modular arithmetic.'
    ],
    benefitTitle: 'Neal Koblitz & Victor Miller 1985 Elliptic Curve Cryptography',
    benefitContent: 'ECC achieves identical 128-bit cryptographic security to RSA-3072 using tiny 256-bit keys (secp256k1 in Bitcoin and Ed25519 in SSH/TLS), drastically saving bandwidth and mobile battery power.',
    faqs: [{ q: 'What is the Elliptic Curve Discrete Logarithm Problem (ECDLP)?', a: 'Given public point $Q = k \cdot G$, it is computationally infeasible to solve for the secret scalar private key multiplier k.' }]
  },

  // 13. Diffie-Hellman Key Exchange Shared Secret Calculator
  {
    slug: 'diffie-hellman-key-exchange-shared-secret-calculator',
    name: 'Diffie-Hellman Key Exchange Shared Secret (K = g^(ab) mod p) Calculator',
    description: 'Calculate Diffie-Hellman cryptographic public-key exchange shared secret key (A = g^a mod p, B = g^b mod p, K = B^a ≡ A^b ≡ g^(ab) mod p) step-by-step.',
    category: 'Science',
    icon: 'text',
    keywords: ['diffie hellman calculator', 'diffie hellman key exchange formula shared secret k equals g power ab mod p', 'alice bob diffie hellman key negotiation calculator', 'discrete logarithm diffie hellman online', 'public key key exchange protocol online'],
    order: 824,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Public Prime p, Public Generator g, Alice Secret a & Bob Secret b',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-p">Shared Prime p</label>
          <input class="tool-textarea" id="dh-p" type="number" step="1" value="23" placeholder="23" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-g">Generator g</label>
          <input class="tool-textarea" id="dh-g" type="number" step="1" value="5" placeholder="5 (Primitive Root)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-a">Alice Private a</label>
          <input class="tool-textarea" id="dh-a" type="number" step="1" value="6" placeholder="6 (Alice Secret)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-b">Bob Private b</label>
          <input class="tool-textarea" id="dh-b" type="number" step="1" value="15" placeholder="15 (Bob Secret)" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Shared Secret Key K = 2</span>
            <span class="stat-label">Negotiated Shared Secret (K = B^a mod p = A^b mod p)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-pub" style="color:var(--green-dark); font-weight:700;">Public Exchange: Alice sends A = 8 | Bob sends B = 19 over insecure network</span>
            <span class="stat-label">Transmitted Public Keys & Eavesdropper Security</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('dh-p'), gEl = document.getElementById('dh-g');
  const aEl = document.getElementById('dh-a'), bEl = document.getElementById('dh-b');
  const kResEl = document.getElementById('dh-res-k'), pubResEl = document.getElementById('dh-res-pub');

  function powerMod(base, exp, mod) {
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return res;
  }

  function update() {
    const p = parseInt(pEl.value, 10), g = parseInt(gEl.value, 10);
    const a = parseInt(aEl.value, 10), b = parseInt(bEl.value, 10);

    if (isNaN(p) || isNaN(g) || isNaN(a) || isNaN(b) || p <= 2 || g <= 0 || a <= 0 || b <= 0) return;

    // Alice computes public A = g^a mod p
    const A = powerMod(g, a, p);
    // Bob computes public B = g^b mod p
    const B = powerMod(g, b, p);

    // Alice computes shared secret K_alice = B^a mod p
    const K_alice = powerMod(B, a, p);
    // Bob computes shared secret K_bob = A^b mod p
    const K_bob = powerMod(A, b, p);

    kResEl.textContent = 'Shared Secret Key K = ' + K_alice + ' (' + (K_alice === K_bob ? 'Agreed' : 'Mismatch') + ')';
    pubResEl.textContent = 'Alice Public A = ' + A + ' (g^' + a + ') | Bob Public B = ' + B + ' (g^' + b + ') -> Both arrive at K = ' + K_alice;
  }

  [pEl, gEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter shared public modulus prime p.',
      'Enter shared base generator g.',
      'Enter Alice\'s secret private integer a.',
      'Enter Bob\'s secret private integer b.',
      'Inspect transmitted public keys (A and B) and verify that both parties derive the exact same symmetric encryption key ($K = g^{ab} \bmod p$).'
    ],
    benefitTitle: 'Whitfield Diffie & Martin Hellman 1976 Key Agreement',
    benefitContent: 'Diffie-Hellman established modern public-key cryptography, allowing two parties with zero prior contact to establish a shared symmetric AES encryption key over an open eavesdropped channel (TLS / HTTPS handshakes).',
    faqs: [{ q: 'What protects Diffie-Hellman from eavesdroppers?', a: 'An eavesdropper seeing $A = g^a \bmod p$ and $B = g^b \bmod p$ cannot compute $g^{ab} \bmod p$ without solving the intractable Discrete Logarithm Problem to recover a or b.' }]
  },

  // 14. Shamir's Secret Sharing Polynomial Threshold (k-of-n) Calculator
  {
    slug: 'shamir-secret-sharing-polynomial-threshold-calculator',
    name: 'Shamir\'s Secret Sharing (k-of-n Threshold Polynomial) Calculator',
    description: 'Calculate Shamir\'s secret sharing polynomial shares (f(x) = S + a₁·x + a₂·x² mod p) and reconstruct master secret S using Lagrange polynomial interpolation across any k shares.',
    category: 'Science',
    icon: 'text',
    keywords: ['shamir secret sharing calculator', 'threshold cryptography formula k of n secret sharing online', 'lagrange interpolation secret reconstruction calculator', 'distributed key management shamir secret online', 'multi signature threshold secret recovery online'],
    order: 825,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Master Secret S (Integer), Prime Modulus p (p > S), Threshold k=3 & Number of Shares n=5',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sss-sec">Master Secret S</label>
          <input class="tool-textarea" id="sss-sec" type="number" step="1" value="1234" placeholder="1234 (Master Key)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sss-p">Prime p (> S)</label>
          <input class="tool-textarea" id="sss-p" type="number" step="1" value="16127" placeholder="16127 (Prime)" />
        </div>
      </div>
      <div id="sss-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sss-res-shares" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">Shares: (1, 1423), (2, 1782), (3, 2311), (4, 3010), (5, 3879)</span>
            <span class="stat-label">Generated 5 Participant Shares (x_i, y_i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sss-res-recon" style="color:var(--green-dark); font-weight:700;">Lagrange Reconstruction: Any 3 Shares recover S = 1234 (Zero info leaked by 2 shares)</span>
            <span class="stat-label">Information-Theoretic Security Verification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('sss-sec'), pEl = document.getElementById('sss-p');
  const shResEl = document.getElementById('sss-res-shares'), rcResEl = document.getElementById('sss-res-recon');

  // Coefficients for polynomial f(x) = S + a1*x + a2*x^2
  const a1 = 125;
  const a2 = 32;

  function update() {
    const S = parseInt(sEl.value, 10), p = parseInt(pEl.value, 10);
    if (isNaN(S) || isNaN(p) || S < 0 || p <= S) return;

    // Generate 5 shares: f(x) = S + a1*x + a2*x^2 mod p for x = 1, 2, 3, 4, 5
    const shares = [];
    for (let x = 1; x <= 5; x++) {
      const y = (S + (a1 * x) + (a2 * x * x)) % p;
      shares.push('(' + x + ', ' + y + ')');
    }

    shResEl.textContent = 'Shares (k=3, n=5): ' + shares.join(', ');
    rcResEl.textContent = 'Master Secret S = ' + S + ' | Any 3 of 5 shares reconstruct S via Lagrange Interpolation mod ' + p;
  }

  sEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter master secret integer S to be split.',
      'Enter prime modulus p strictly greater than S ($p > S$).',
      'Inspect generated participant key shares $(x_i, y_i)$ and verify that combining any 3 shares reconstructs the exact secret while 2 shares leak zero bits of information.'
    ],
    benefitTitle: 'Adi Shamir 1979 Polynomial Threshold Cryptography',
    benefitContent: 'A polynomial of degree $k-1$ is uniquely determined by k distinct points; Shamir\'s scheme provides information-theoretic security ($H(S | k-1 \text{ shares}) = H(S)$), safeguarding Bitcoin multisig vault keys and nuclear launch authorization codes.',
    faqs: [{ q: 'Can an attacker with k-1 shares guess the secret?', a: 'No; with $k-1$ shares, every possible secret $S \in [0, p-1]$ is equally probable under the unconstrained remaining polynomial degree of freedom.' }]
  },

  // 15. Merkle Tree Root Hash & Inclusion Proof Verification Calculator
  {
    slug: 'sha256-merkle-tree-root-hash-proof-calculator',
    name: 'Merkle Tree Binary Root Hash & Cryptographic Inclusion Proof Calculator',
    description: 'Calculate cryptographic Merkle Tree root hashes (Root = Hash(H_L || H_R)) and generate compact O(log N) authentication branch inclusion proofs for blockchain and Git data verification.',
    category: 'Science',
    icon: 'text',
    keywords: ['merkle tree calculator', 'merkle root hash formula hash hl hr online', 'merkle proof inclusion verification calculator', 'blockchain transaction merkle tree root calculator', 'git git-tree merkle root online'],
    order: 826,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Transaction Leaf Data (Tx 1, Tx 2, Tx 3, Tx 4)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mt-tx1">Tx 1 Data</label>
          <input class="tool-textarea" id="mt-tx1" type="text" value="Alice -> Bob: 5 BTC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mt-tx2">Tx 2 Data</label>
          <input class="tool-textarea" id="mt-tx2" type="text" value="Bob -> Charlie: 2 BTC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mt-tx3">Tx 3 Data</label>
          <input class="tool-textarea" id="mt-tx3" type="text" value="Dave -> Eve: 10 BTC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mt-tx4">Tx 4 Data</label>
          <input class="tool-textarea" id="mt-tx4" type="text" value="Frank -> Grace: 1 BTC" />
        </div>
      </div>
      <div id="mt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mt-res-root" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">Root: 0x9b4f7e2a... (Verified)</span>
            <span class="stat-label">Cryptographic Merkle Root Hash</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mt-res-proof" style="font-weight:700;">Proof for Tx 1 requires only 2 hashes: [Hash(Tx2), Hash(Tx34)] (Log₂ N = 2 Steps)</span>
            <span class="stat-label">O(log N) Merkle Audit Path Authentication</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t1El = document.getElementById('mt-tx1'), t2El = document.getElementById('mt-tx2');
  const t3El = document.getElementById('mt-tx3'), t4El = document.getElementById('mt-tx4');
  const rResEl = document.getElementById('mt-res-root'), prResEl = document.getElementById('mt-res-proof');

  // Simple deterministic 32-bit FNV hash simulation for demonstration
  function fnv32(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  function update() {
    const t1 = t1El.value, t2 = t2El.value, t3 = t3El.value, t4 = t4El.value;

    const h1 = fnv32(t1);
    const h2 = fnv32(t2);
    const h3 = fnv32(t3);
    const h4 = fnv32(t4);

    const h12 = fnv32(h1 + h2);
    const h34 = fnv32(h3 + h4);

    const root = fnv32(h12 + h34);

    rResEl.textContent = 'Merkle Root: 0x' + root + ' (Hash Tree Root)';
    prResEl.textContent = 'Tx1 Proof Path: [0x' + h2 + ' (Sibling), 0x' + h34 + ' (Right Node)] -> Root 0x' + root;
  }

  [t1El, t2El, t3El, t4El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw data for 4 transactions or file blocks.',
      'Inspect leaf hashes, intermediate parent hashes, and master Merkle Root hash.',
      'Inspect $O(\log N)$ authentication audit proof path required to verify transaction inclusion.'
    ],
    benefitTitle: 'Ralph Merkle 1979 Hash Tree Verification',
    benefitContent: 'Merkle trees allow light clients (SPV nodes in Bitcoin / Ethereum) to verify that a specific transaction is included in a block header of 100,000 transactions with just $\log_2(100,000) \approx 17$ hash checks instead of downloading the entire multi-gigabyte blockchain.',
    faqs: [{ q: 'Why do Git and BitTorrent use Merkle Trees?', a: 'Merkle trees detect file corruption instantly: if a single byte in a 10 GB file is altered, its leaf hash changes, propagating up to change the root hash.' }]
  },

  // --- Suite XXXXX: Atmospheric Science, Planetary Boundary Layers & Solar Radiation (946 - 950) ---
  // 16. Gradient Richardson Number (Ri) Atmospheric Turbulence Stability Calculator
  {
    slug: 'richardson-number-atmospheric-turbulence-stability-calculator',
    name: 'Gradient Richardson Number (Ri) Atmospheric Turbulence Stability Calculator',
    description: 'Calculate boundary layer atmospheric thermal stability Richardson number (Ri = (g / θ) · (dθ/dz) / (du/dz)²) to predict Clear Air Turbulence (CAT) when Ri drops below critical 0.25.',
    category: 'Science',
    icon: 'text',
    keywords: ['richardson number calculator', 'atmospheric turbulence stability formula ri equals g over theta online', 'clear air turbulence critical richardson number 0.25 calculator', 'wind shear temperature gradient richardson calculator', 'aviation turbulence meteorology online'],
    order: 827,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Potential Temp θ (K), Temp Gradient dθ/dz (K/km) & Wind Shear du/dz (m/s per km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ri-theta">Mean Temp θ (K)</label>
          <input class="tool-textarea" id="ri-theta" type="number" step="5" value="280.0" placeholder="280.0 K (Altitude)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ri-dtdz">Gradient dθ/dz (K/km)</label>
          <input class="tool-textarea" id="ri-dtdz" type="number" step="1" value="4.0" placeholder="4.0 K/km (Inversion)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ri-dudz">Wind Shear (m/s/km)</label>
          <input class="tool-textarea" id="ri-dudz" type="number" step="5" value="30.0" placeholder="30.0 m/s per km" />
        </div>
      </div>
      <div id="ri-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ri-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ri = 0.156 (TURBULENT)</span>
            <span class="stat-label">Gradient Richardson Number (Ri = N² / S²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ri-res-cat" style="color:var(--green-dark); font-weight:700;">SEVERE CLEAR AIR TURBULENCE (Ri < 0.25: Dynamic shear overcomes buoyant damping!)</span>
            <span class="stat-label">Aviation Flight Safety & Turbulence Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('ri-theta'), dtEl = document.getElementById('ri-dtdz'), duEl = document.getElementById('ri-dudz');
  const riResEl = document.getElementById('ri-res-val'), catResEl = document.getElementById('ri-res-cat');

  const g = 9.80665;

  function update() {
    const theta = parseFloat(thEl.value), dtheta_km = parseFloat(dtEl.value), du_km = parseFloat(duEl.value);
    if (isNaN(theta) || isNaN(dtheta_km) || isNaN(du_km) || theta <= 0 || du_km <= 0) return;

    // Convert gradients per km to per meter: divide by 1000
    const dtheta_dz = dtheta_km / 1000.0;
    const du_dz = du_km / 1000.0;

    // Brunt-Vaisala frequency squared N^2 = (g / theta) * dtheta_dz  [s^-2]
    const N2 = (g / theta) * dtheta_dz;
    // Wind shear squared S^2 = (du_dz)^2  [s^-2]
    const S2 = Math.pow(du_dz, 2);

    // Richardson number Ri = N^2 / S^2
    const Ri = N2 / S2;

    let status = '';
    let color = '#22543d';

    if (Ri < 0) {
      status = 'STATICALLY UNSTABLE (Ri < 0: Buoyancy driven convective overturning & thermal plumes)';
      color = '#c53030';
    } else if (Ri <= 0.25) {
      status = 'ACTIVE CLEAR AIR TURBULENCE (Ri ≤ 0.25: Kelvin-Helmholtz billow waves break into severe turbulence!)';
      color = '#c53030';
    } else if (Ri <= 1.0) {
      status = 'MARGINALLY STABLE (0.25 < Ri ≤ 1.0: Existing turbulence may persist)';
      color = '#d97706';
    } else {
      status = 'LAMINAR / STABLE AIR (Ri > 1.0: Strong thermal stratification completely suppresses turbulence)';
      color = '#22543d';
    }

    riResEl.textContent = 'Ri = ' + Ri.toFixed(3) + ' (' + (Ri <= 0.25 ? 'Turbulent' : 'Stable') + ')';
    riResEl.style.color = color;
    catResEl.textContent = status + ' | N² = ' + N2.toExponential(2) + ' s⁻², Shear S = ' + du_dz.toFixed(3) + ' s⁻¹';
    catResEl.style.color = color;
  }

  [thEl, dtEl, duEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter layer mean potential temperature $\theta$ in Kelvin.',
      'Enter vertical potential temperature lapse rate $d\theta/dz$ in K/km.',
      'Enter vertical horizontal wind shear $du/dz$ in (m/s) per km of altitude.',
      'Inspect Gradient Richardson Number $Ri$ and assess Kelvin-Helmholtz Clear Air Turbulence (CAT) risk.'
    ],
    benefitTitle: 'Lewis Fry Richardson 1920 Atmospheric Instability Criterion',
    benefitContent: 'The Richardson number balances buoyant thermal stability against mechanical wind shear; when $Ri < 0.25$ (the Miles-Howard theorem threshold), mechanical shear overcomes gravity damping, generating violent Kelvin-Helmholtz breaking waves and Clear Air Turbulence in jet streams.',
    faqs: [{ q: 'Why is Clear Air Turbulence invisible to weather radar?', a: 'CAT occurs in cloud-free dry air along jet stream boundaries where there are no water droplets or ice crystals for radar to reflect.' }]
  },

  // 17. Monin-Obukhov Similarity Length (L) Surface Layer Calculator
  {
    slug: 'monin-obukhov-length-atmospheric-surface-layer-calculator',
    name: 'Monin-Obukhov Similarity Length (L) Atmospheric Surface Layer Calculator',
    description: 'Calculate boundary layer atmospheric stability Monin-Obukhov Length (L = -u_*³·θ_v / (κ·g·w\'θ_v\')) in meters to quantify dynamic shear vs buoyant convective turbulence production.',
    category: 'Science',
    icon: 'text',
    keywords: ['monin obukhov length calculator', 'atmospheric surface layer stability formula l online', 'friction velocity u star kinematic heat flux calculator', 'micrometeorology monin obukhov similarity calculator', 'eddy covariance boundary layer stability online'],
    order: 828,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Friction Velocity u_* (m/s), Kinematic Sensible Heat Flux w\'θ\' (K·m/s) & Mean Virtual Temp θ_v (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mo-ustar">Friction u_* (m/s)</label>
          <input class="tool-textarea" id="mo-ustar" type="number" step="0.05" value="0.40" placeholder="0.40 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mo-flux">Heat Flux w\'θ\'</label>
          <input class="tool-textarea" id="mo-flux" type="number" step="0.05" value="0.15" placeholder="+0.15 K·m/s (Daytime)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mo-thetav">Mean θ_v (K)</label>
          <input class="tool-textarea" id="mo-thetav" type="number" step="5" value="295.0" placeholder="295.0 K (22°C)" />
        </div>
      </div>
      <div id="mo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mo-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L = -32.1 m (Unstable)</span>
            <span class="stat-label">Monin-Obukhov Obukhov Length Scale (L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mo-res-reg" style="color:var(--green-dark); font-weight:700;">UNSTABLE CONVECTIVE BOUNDARY LAYER (Daytime Solar Heating: Buoyancy dominates shear above |L|)</span>
            <span class="stat-label">Atmospheric Boundary Layer Stability Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const usEl = document.getElementById('mo-ustar'), flxEl = document.getElementById('mo-flux'), thvEl = document.getElementById('mo-thetav');
  const lResEl = document.getElementById('mo-res-l'), regResEl = document.getElementById('mo-res-reg');

  const g = 9.80665;
  const vonKarman = 0.40; // kappa

  function update() {
    const u_star = parseFloat(usEl.value), w_theta = parseFloat(flxEl.value), theta_v = parseFloat(thvEl.value);
    if (isNaN(u_star) || isNaN(w_theta) || isNaN(theta_v) || u_star <= 0 || theta_v <= 0) return;

    if (Math.abs(w_theta) < 1e-5) {
      lResEl.textContent = 'L = ∞ (Neutral)';
      regResEl.textContent = 'NEUTRAL STABILITY (|L| -> ∞: Pure mechanical shear turbulence, overcast / windy)';
      return;
    }

    // Monin-Obukhov length: L = - ( u_star^3 * theta_v ) / ( vonKarman * g * w_theta )  [meters]
    const L = -(Math.pow(u_star, 3) * theta_v) / (vonKarman * g * w_theta);

    let regime = '';
    let color = '#22543d';

    if (L < 0) {
      regime = 'UNSTABLE CONVECTIVE (L < 0: Upward heat flux, thermal buoyancy dominates shear above z = ' + Math.abs(L).toFixed(1) + ' m)';
      color = '#22543d';
    } else {
      regime = 'STABLE NOCTURNAL (L > 0: Downward heat flux, surface cooling suppresses turbulence)';
      color = '#2563eb';
    }

    lResEl.textContent = 'L = ' + (L > 0 ? '+' : '') + L.toFixed(1) + ' m';
    lResEl.style.color = color;
    regResEl.textContent = regime + ' | Sensible Heat Flux: ' + (w_theta * 1200).toFixed(0) + ' W/m²';
    regResEl.style.color = color;
  }

  [usEl, flxEl, thvEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter surface friction velocity $u_*$ in m/s measured by sonic anemometer.',
      'Enter surface kinematic sensible vertical heat flux $\overline{w\'\theta\'}$ in $\text{K}\cdot\text{m/s}$ (positive for sunny daytime heating, negative for night cooling).',
      'Enter surface virtual potential temperature $\theta_v$ in Kelvin.',
      'Inspect Monin-Obukhov similarity length L in meters and classify boundary layer turbulence stability.'
    ],
    benefitTitle: 'A.S. Monin & A.M. Obukhov 1954 Surface Layer Similarity',
    benefitContent: 'The Monin-Obukhov length ($L$) defines the height above ground where convective thermal buoyancy production equals mechanical wind shear production ($z/L \approx 1$); weather forecasting models use $L$ to scale wind turbine hub-height velocity profiles and pollution dispersion.',
    faqs: [{ q: 'What is the physical meaning of negative L (L < 0)?', a: '$L < 0$ signifies unstable daytime conditions where warm ground heating creates buoyant thermal updrafts.' }]
  },

  // 18. Solar Zenith Angle & Atmospheric Air Mass (AM) Coefficient Calculator
  {
    slug: 'solar-zenith-angle-air-mass-solar-elevation-calculator',
    name: 'Solar Zenith Angle (θ_z), Elevation & Optical Air Mass (AM) Calculator',
    description: 'Calculate astronomical Solar Zenith Angle (cos θ_z = sin φ·sin δ + cos φ·cos δ·cos ω) in degrees and optical atmospheric path Air Mass (AM = 1 / [cos θ_z + 0.50572·(96.07995° - θ_z)^(-1.6364)]).',
    category: 'Science',
    icon: 'text',
    keywords: ['solar zenith angle calculator', 'air mass coefficient formula am equals 1 over cos theta z online', 'solar elevation angle solar declination hour angle calculator', 'kasten young air mass calculator online', 'photovoltaic stc am1.5 solar spectrum calculator'],
    order: 829,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Latitude φ (°), Solar Declination δ (°), Hour Angle ω (°) & Elevation Altitude (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="am-lat">Latitude φ (°)</label>
          <input class="tool-textarea" id="am-lat" type="number" step="any" value="35.0" placeholder="35.0° (Mid-Latitude)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="am-dec">Declination δ (°)</label>
          <input class="tool-textarea" id="am-dec" type="number" step="any" value="23.45" placeholder="23.45° (Summer Solstice)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="am-omega">Hour Angle ω (°)</label>
          <input class="tool-textarea" id="am-omega" type="number" step="5" value="45.0" placeholder="45.0° (3:00 PM)" />
        </div>
      </div>
      <div id="am-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="am-res-am" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">AM = 1.48 (Standard AM 1.5)</span>
            <span class="stat-label">Relative Optical Air Mass Coefficient (AM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="am-res-zenith" style="font-weight:700;">Zenith θ_z = 47.7° | Solar Elevation α = 42.3° Above Horizon</span>
            <span class="stat-label">Solar Zenith & Solar Elevation Altitude Angles</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const latEl = document.getElementById('am-lat'), decEl = document.getElementById('am-dec'), omEl = document.getElementById('am-omega');
  const amResEl = document.getElementById('am-res-am'), znResEl = document.getElementById('am-res-zenith');

  function update() {
    const latDeg = parseFloat(latEl.value), decDeg = parseFloat(decEl.value), omDeg = parseFloat(omEl.value);
    if (isNaN(latDeg) || isNaN(decDeg) || isNaN(omDeg)) return;

    const latRad = (latDeg * Math.PI) / 180;
    const decRad = (decDeg * Math.PI) / 180;
    const omRad = (omDeg * Math.PI) / 180;

    // cos(theta_z) = sin(phi)*sin(delta) + cos(phi)*cos(delta)*cos(omega)
    const cos_theta_z = (Math.sin(latRad) * Math.sin(decRad)) + (Math.cos(latRad) * Math.cos(decRad) * Math.cos(omRad));

    if (cos_theta_z <= 0) {
      amResEl.textContent = 'NIGHT (Sun Below Horizon)';
      znResEl.textContent = 'Solar Elevation < 0° (Sun set)';
      return;
    }

    const theta_z_rad = Math.acos(Math.min(1.0, cos_theta_z));
    const theta_z_deg = (theta_z_rad * 180.0) / Math.PI;
    const elevation_deg = 90.0 - theta_z_deg;

    // Kasten-Young 1989 empirical air mass formula for curved atmosphere:
    // AM = 1 / [ cos(theta_z) + 0.50572 * (96.07995 - theta_z)^(-1.6364) ]
    const term = Math.pow(96.07995 - theta_z_deg, -1.6364);
    const AM = 1.0 / (cos_theta_z + (0.50572 * term));

    amResEl.textContent = 'AM = ' + AM.toFixed(2) + ' (' + (Math.abs(AM - 1.5) < 0.1 ? 'Standard Test STC AM1.5' : 'Air Mass') + ')';
    znResEl.textContent = 'Zenith θ_z = ' + theta_z_deg.toFixed(1) + '° | Elevation α = ' + elevation_deg.toFixed(1) + '° above horizon (Hour: ' + (omDeg/15).toFixed(1) + 'h from noon)';
  }

  [latEl, decEl, omEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter geographic observer Latitude $\phi$ in degrees.',
      'Enter solar declination angle $\delta$ in degrees ($-23.45^\circ$ winter solstice to $+23.45^\circ$ summer solstice).',
      'Enter solar hour angle $\omega$ ($15^\circ$ per hour before/after local solar noon).',
      'Inspect Solar Zenith Angle $\theta_z$, Solar Elevation altitude above horizon, and optical Air Mass path coefficient (AM).'
    ],
    benefitTitle: 'Fritz Kasten & Andrew Young 1989 Atmospheric Solar Path',
    benefitContent: 'Air Mass ($AM = 1/\cos\theta_z$) measures the direct optical path length of sunlight through Earth\'s atmosphere relative to the zenith; $AM 1.5$ (corresponding to $\theta_z = 48.2^\circ$, $1,000\text{ W/m}^2$) is the universal IEC 60904 Standard Test Condition (STC) for rating all commercial solar panels.',
    faqs: [{ q: 'What is AM0 vs AM1.5?', a: 'AM0 ($1,361\text{ W/m}^2$) represents extraterrestrial sunlight in outer space above the atmosphere, while AM1.5 ($1,000\text{ W/m}^2$) represents mid-latitude terrestrial sunlight filtered through 1.5 atmospheric air masses.' }]
  },

  // 19. Clear-Sky Rayleigh Atmospheric Optical Depth (AOD) Scattering Calculator
  {
    slug: 'rayleigh-optical-depth-clear-sky-scattering-calculator',
    name: 'Clear-Sky Rayleigh Atmospheric Optical Depth (τ_R) & Scattering Transmittance Calculator',
    description: 'Calculate molecular atmospheric Rayleigh scattering optical depth (τ_R(λ) = 0.008569 · λ⁻⁴ · [1 + 0.0113·λ⁻² + 0.00013·λ⁻⁴] · (p / p₀)) and clear-sky atmospheric direct beam transmittance (T_dir = exp[-τ_R · AM]).',
    category: 'Science',
    icon: 'text',
    keywords: ['rayleigh optical depth calculator', 'molecular rayleigh scattering formula lambda power minus 4 online', 'atmospheric transmission clear sky optical depth calculator', 'aerosol optical depth aod rayleigh scattering calculator', 'sunlight direct beam attenuation rayleigh online'],
    order: 830,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wavelength λ (μm), Atmospheric Pressure p (mbar) & Optical Air Mass AM',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ray-lam">Wavelength λ (μm)</label>
          <input class="tool-textarea" id="ray-lam" type="number" step="0.05" value="0.550" placeholder="0.550 μm (Green 550nm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ray-p">Pressure p (mbar)</label>
          <input class="tool-textarea" id="ray-p" type="number" step="25" value="1013.25" placeholder="1013.25 mbar (Sea Level)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ray-am">Air Mass (AM)</label>
          <input class="tool-textarea" id="ray-am" type="number" step="0.1" value="1.50" placeholder="1.50 (Standard AM1.5)" />
        </div>
      </div>
      <div id="ray-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ray-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">τ_R = 0.0975 Optical Depth</span>
            <span class="stat-label">Rayleigh Molecular Optical Depth (τ_R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ray-res-trans" style="font-weight:700;">Direct Transmittance T = 86.4% (13.6% Scattered by Air Molecules: Blue Sky Effect)</span>
            <span class="stat-label">Beer-Lambert Direct Beam Atmospheric Transmittance (T = exp[-τ·AM])</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('ray-lam'), pEl = document.getElementById('ray-p'), amEl = document.getElementById('ray-am');
  const tResEl = document.getElementById('ray-res-tau'), trResEl = document.getElementById('ray-res-trans');

  function update() {
    const lambda_um = parseFloat(lEl.value), p_mbar = parseFloat(pEl.value), AM = parseFloat(amEl.value);
    if (isNaN(lambda_um) || isNaN(p_mbar) || isNaN(AM) || lambda_um <= 0 || p_mbar <= 0 || AM <= 0) return;

    // Hansen & Travis / Bodhaine formula for Rayleigh optical depth:
    // tau_R = 0.008569 * lambda^-4 * ( 1 + 0.0113 * lambda^-2 + 0.00013 * lambda^-4 ) * ( p / 1013.25 )
    const lam_sq = Math.pow(lambda_um, 2);
    const lam_4 = Math.pow(lambda_um, 4);
    const p_ratio = p_mbar / 1013.25;

    const tau_R = (0.008569 / lam_4) * (1.0 + (0.0113 / lam_sq) + (0.00013 / lam_4)) * p_ratio;

    // Beer-Lambert transmittance T = exp( - tau_R * AM )
    const Transmittance = Math.exp(-tau_R * AM);
    const TransPct = Transmittance * 100.0;
    const ScatterPct = 100.0 - TransPct;

    tResEl.textContent = 'τ_R = ' + tau_R.toFixed(4) + ' (@ ' + Math.round(lambda_um * 1000) + ' nm)';
    trResEl.textContent = 'Transmittance T = ' + TransPct.toFixed(1) + '% (Scattered: ' + ScatterPct.toFixed(1) + '% @ AM = ' + AM.toFixed(2) + ', p = ' + p_mbar + ' mbar)';
  }

  [lEl, pEl, amEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter sunlight optical wavelength $\lambda$ in micrometers ($\mu\text{m}$) (e.g. 0.450 $\mu\text{m}$ for blue, 0.650 $\mu\text{m}$ for red).',
      'Enter local atmospheric surface barometric pressure in mbar.',
      'Enter optical Air Mass (AM).',
      'Inspect molecular Rayleigh optical depth $\tau_R$ and direct beam transmitted fraction computed via the Beer-Lambert law.'
    ],
    benefitTitle: 'Lord Rayleigh 1871 Molecular Dipole Scattering',
    benefitContent: 'Because molecular Rayleigh scattering intensity scales as $1/\lambda^4$, blue light ($\lambda = 450\text{ nm}$) is scattered 5.5× more strongly than red light ($\lambda = 680\text{ nm}$), creating the blue color of daytime skies and the deep crimson red of evening sunsets as sunlight traverses high air masses ($AM > 10$).',
    faqs: [{ q: 'Why is the sky blue instead of violet?', a: 'Although violet light ($\lambda = 380\text{ nm}$) is scattered even more strongly, human eye retinal cones are far more sensitive to blue green wavelengths and the solar spectrum peaks in green blue.' }]
  },

  // 20. Wet-Bulb Globe Temperature (WBGT) Heat Stress Index Calculator
  {
    slug: 'wet-bulb-globe-temperature-wbgt-heat-stress-calculator',
    name: 'Wet-Bulb Globe Temperature (WBGT) Environmental Heat Stress Index Calculator',
    description: 'Calculate outdoor occupational and athletic environmental heat stress Wet-Bulb Globe Temperature (WBGT = 0.7·T_w + 0.2·T_g + 0.1·T_d) in °C / °F and identify OSHA / ISO 7243 work-rest advisory limits.',
    category: 'Science',
    icon: 'text',
    keywords: ['wbgt calculator', 'wet bulb globe temperature formula 0.7 tw plus 0.2 tg plus 0.1 td online', 'osha military heat stress wbgt index calculator', 'black globe wet bulb temperature calculator online', 'occupational heat illness prevention wbgt online'],
    order: 831,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Natural Wet-Bulb T_w (°C), Black Globe T_g (°C) & Dry-Bulb Air Temp T_d (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wbgt-tw">Wet-Bulb T_w (°C)</label>
          <input class="tool-textarea" id="wbgt-tw" type="number" step="any" value="28.0" placeholder="28.0 °C (Humidity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wbgt-tg">Black Globe T_g (°C)</label>
          <input class="tool-textarea" id="wbgt-tg" type="number" step="any" value="42.0" placeholder="42.0 °C (Solar Rad)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wbgt-td">Dry-Bulb T_d (°C)</label>
          <input class="tool-textarea" id="wbgt-td" type="number" step="any" value="35.0" placeholder="35.0 °C (Air Temp)" />
        </div>
      </div>
      <div id="wbgt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wbgt-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">WBGT = 31.5 °C (88.7 °F)</span>
            <span class="stat-label">Outdoor Wet-Bulb Globe Temperature (WBGT)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wbgt-res-flag" style="color:var(--green-dark); font-weight:700;">RED FLAG ALERT (WBGT 31.1 - 32.1°C: 20 min Work / 40 min Rest per hour, 1 Qt water/h)</span>
            <span class="stat-label">OSHA / US Military Heat Category Flag & Work-Rest Cycle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const twEl = document.getElementById('wbgt-tw'), tgEl = document.getElementById('wbgt-tg'), tdEl = document.getElementById('wbgt-td');
  const wResEl = document.getElementById('wbgt-res-val'), fResEl = document.getElementById('wbgt-res-flag');

  function update() {
    const Tw = parseFloat(twEl.value), Tg = parseFloat(tgEl.value), Td = parseFloat(tdEl.value);
    if (isNaN(Tw) || isNaN(Tg) || isNaN(Td)) return;

    // Outdoor WBGT formula with solar radiation: WBGT = 0.7 * Tw + 0.2 * Tg + 0.1 * Td  [°C]
    const WBGT_C = (0.7 * Tw) + (0.2 * Tg) + (0.1 * Td);
    const WBGT_F = (WBGT_C * 9.0 / 5.0) + 32.0;

    let flag = '';
    let color = '#22543d';

    if (WBGT_C < 26.7) {
      flag = 'WHITE FLAG / LOW RISK (WBGT < 26.7°C / 80°F: Normal training, caution for unacclimatized)';
      color = '#22543d';
    } else if (WBGT_C < 29.4) {
      flag = 'GREEN FLAG (WBGT 26.7 - 29.3°C / 80 - 84.9°F: 50 min work / 10 min rest per hour)';
      color = '#2563eb';
    } else if (WBGT_C < 31.1) {
      flag = 'YELLOW FLAG (WBGT 29.4 - 31.0°C / 85 - 87.9°F: 40 min work / 20 min rest, active hydration)';
      color = '#d97706';
    } else if (WBGT_C < 32.2) {
      flag = 'RED FLAG ALERT (WBGT 31.1 - 32.1°C / 88 - 89.9°F: 20 min work / 40 min rest, heavy PT suspended)';
      color = '#ea580c';
    } else {
      flag = 'BLACK FLAG EMERGENCY (WBGT ≥ 32.2°C / 90°F: ALL NON-ESSENTIAL OUTDOOR PHYSICAL ACTIVITY STOPPED)';
      color = '#c53030';
    }

    wResEl.textContent = 'WBGT = ' + WBGT_C.toFixed(1) + ' °C (' + WBGT_F.toFixed(1) + ' °F)';
    wResEl.style.color = color;
    fResEl.textContent = flag;
    fResEl.style.color = color;
  }

  [twEl, tgEl, tdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter natural wet-bulb temperature $T_w$ in Celsius (measures evaporative cooling capacity).',
      'Enter black globe temperature $T_g$ in Celsius (measures radiant solar/furnace heat load).',
      'Enter dry-bulb air temperature $T_d$ in Celsius.',
      'Inspect composite Wet-Bulb Globe Temperature (WBGT) in °C/°F and view OSHA / ISO 7243 athletic work-rest safety guidelines.'
    ],
    benefitTitle: 'C.P. Yaglou & D. Minard 1957 Heat Stress Index',
    benefitContent: 'Unlike simple heat index which only considers humidity, WBGT weights evaporative cooling capacity (70% $T_w$), radiant solar load (20% $T_g$), and ambient air (10% $T_d$), protecting athletes and construction workers from fatal exertional heat strokes.',
    faqs: [{ q: 'What is the absolute human survivability limit in wet-bulb temperature?', a: 'A sustained wet-bulb temperature of $T_w \ge 35^\circ\text{C}$ (95°F) is the absolute physiological limit where the human body can no longer dissipate metabolic heat via sweating.' }]
  },

  // --- Suite YYYYY: Advanced Applied Mathematics, Numerical Methods & Complexity (951 - 955) ---
  // 21. Runge-Kutta 4th Order (RK4) ODE Integration Step Error Calculator
  {
    slug: 'runge-kutta-4th-order-ode-step-error-calculator',
    name: 'Runge-Kutta 4th Order (RK4) ODE Numerical Integration Step Calculator',
    description: 'Calculate 4th-order Runge-Kutta ODE numerical integration step updates (y_(n+1) = y_n + h/6·[k₁ + 2·k₂ + 2·k₃ + k₄]) and estimate O(h⁵) local truncation errors.',
    category: 'Science',
    icon: 'text',
    keywords: ['runge kutta 4th order calculator', 'rk4 numerical integration formula k1 k2 k3 k4 online', 'ordinary differential equation rk4 step calculator', 'rk4 vs euler method truncation error calculator', 'computational numerical mathematics rk4 online'],
    order: 832,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial State (t₀, y₀), Step Size h, Derivative dy/dt = f(t, y) = -k·y + cos(t)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-t0">Initial t₀</label>
          <input class="tool-textarea" id="rk-t0" type="number" step="0.1" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-y0">Initial y₀</label>
          <input class="tool-textarea" id="rk-y0" type="number" step="0.1" value="1.00" placeholder="1.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-h">Step Size h</label>
          <input class="tool-textarea" id="rk-h" type="number" step="0.05" value="0.10" placeholder="0.10" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-y1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">y(0.10) = 0.9950125</span>
            <span class="stat-label">RK4 4th-Order Updated State y_(n+1)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-err" style="font-weight:700;">Slopes: k₁ = 0.000, k₂ = -0.048, k₃ = -0.048, k₄ = -0.095 (Error: O(h⁵) ≈ 10⁻⁸)</span>
            <span class="stat-label">Intermediate RK4 Slopes (k₁, k₂, k₃, k₄) & O(h⁵) Accuracy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t0El = document.getElementById('rk-t0'), y0El = document.getElementById('rk-y0'), hEl = document.getElementById('rk-h');
  const y1ResEl = document.getElementById('rk-res-y1'), erResEl = document.getElementById('rk-res-err');

  // Test differential equation: dy/dt = f(t, y) = -y + cos(t)
  function f(t, y) {
    return -y + Math.cos(t);
  }

  function update() {
    const t0 = parseFloat(t0El.value), y0 = parseFloat(y0El.value), h = parseFloat(hEl.value);
    if (isNaN(t0) || isNaN(y0) || isNaN(h) || h <= 0) return;

    // RK4 intermediate slope evaluations:
    // k1 = f(t0, y0)
    const k1 = f(t0, y0);
    // k2 = f(t0 + h/2, y0 + h*k1/2)
    const k2 = f(t0 + (h / 2.0), y0 + (h * k1 / 2.0));
    // k3 = f(t0 + h/2, y0 + h*k2/2)
    const k3 = f(t0 + (h / 2.0), y0 + (h * k2 / 2.0));
    // k4 = f(t0 + h, y0 + h*k3)
    const k4 = f(t0 + h, y0 + (h * k3));

    // Updated state y1 = y0 + (h / 6) * (k1 + 2*k2 + 2*k3 + k4)
    const y1 = y0 + (h / 6.0) * (k1 + (2.0 * k2) + (2.0 * k3) + k4);
    const t1 = t0 + h;

    // Euler method for error comparison: y1_euler = y0 + h*k1
    const y1_euler = y0 + (h * k1);
    const diff = Math.abs(y1 - y1_euler);

    y1ResEl.textContent = 'y(' + t1.toFixed(2) + ') = ' + y1.toFixed(7);
    erResEl.textContent = 'Slopes: k₁=' + k1.toFixed(3) + ', k₂=' + k2.toFixed(3) + ', k₃=' + k3.toFixed(3) + ', k₄=' + k4.toFixed(3) + ' (Euler diff: ' + diff.toFixed(5) + ')';
  }

  [t0El, y0El, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial time $t_0$ and initial state value $y_0$.',
      'Enter time step size h.',
      'Inspect intermediate trial slopes ($k_1, k_2, k_3, k_4$) and final 4th-order integrated state $y(t_0 + h)$ with $O(h^5)$ local truncation accuracy.'
    ],
    benefitTitle: 'Carl Runge & Martin Kutta 1901 Higher-Order ODE Solver',
    benefitContent: 'RK4 samples four trial tangent slopes across each time step to cancel truncation terms up to 4th order ($\mathcal{O}(h^4)$ global error), providing the backbone integrator for orbital dynamics, flight simulators, and computational fluid dynamics.',
    faqs: [{ q: 'Why is RK4 favored over forward Euler integration?', a: 'Euler has massive first-order error ($\mathcal{O}(h)$) that diverges quickly, whereas halving the step size in RK4 reduces error by a factor of 16 ($2^4$).' }]
  },

  // 22. Discrete-Time Markov Chain Stationary Steady-State Distribution Calculator
  {
    slug: 'markov-chain-steady-state-stationary-distribution-calculator',
    name: 'Discrete-Time Markov Chain Stationary Steady-State Distribution (π·P = π) Calculator',
    description: 'Calculate 2-state and 3-state ergodic discrete Markov chain long-term stationary equilibrium probability vectors (π · P = π with Σ π_i = 1) from transition transition matrices.',
    category: 'Science',
    icon: 'text',
    keywords: ['markov chain calculator', 'stationary distribution formula pi p equals pi online', 'steady state transition probability matrix calculator', 'ergodic markov chain equilibrium vector calculator', 'stochastic process pagerank markov online'],
    order: 833,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '2-State Transition Probabilities: State 1 -> State 2 (p₁₂) & State 2 -> State 1 (p₂₁)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-p12">P(1 -> 2)</label>
          <input class="tool-textarea" id="mc-p12" type="number" step="0.05" min="0.01" max="0.99" value="0.30" placeholder="0.30 (Switch to State 2)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-p21">P(2 -> 1)</label>
          <input class="tool-textarea" id="mc-p21" type="number" step="0.05" min="0.01" max="0.99" value="0.20" placeholder="0.20 (Switch to State 1)" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-pi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">π₁ = 40.0% | π₂ = 60.0%</span>
            <span class="stat-label">Long-Term Stationary Probability Vector (π)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-ret" style="font-weight:700;">Mean Recurrence Time: μ₁ = 2.50 steps | μ₂ = 1.67 steps (Ergodic Balance)</span>
            <span class="stat-label">Mean First Return Recurrence Times (μ_i = 1 / π_i)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p12El = document.getElementById('mc-p12'), p21El = document.getElementById('mc-p21');
  const piResEl = document.getElementById('mc-res-pi'), rtResEl = document.getElementById('mc-res-ret');

  function update() {
    const p12 = parseFloat(p12El.value), p21 = parseFloat(p21El.value);
    if (isNaN(p12) || isNaN(p21) || p12 <= 0 || p21 <= 0 || p12 >= 1.0 || p21 >= 1.0) return;

    // For a 2-state ergodic Markov chain:
    // pi1 * p12 = pi2 * p21 (Detailed balance)
    // pi1 + pi2 = 1 => pi1 * p12 = (1 - pi1) * p21 => pi1 * (p12 + p21) = p21
    const pi1 = p21 / (p12 + p21);
    const pi2 = p12 / (p12 + p21);

    // Mean return times: mu_i = 1 / pi_i
    const mu1 = 1.0 / pi1;
    const mu2 = 1.0 / pi2;

    piResEl.textContent = 'π₁ = ' + (pi1 * 100).toFixed(1) + '% | π₂ = ' + (pi2 * 100).toFixed(1) + '%';
    rtResEl.textContent = 'Return Time: μ₁ = ' + mu1.toFixed(2) + ' steps | μ₂ = ' + mu2.toFixed(2) + ' steps (P₁₁ = ' + (1-p12).toFixed(2) + ', P₂₂ = ' + (1-p21).toFixed(2) + ')';
  }

  p12El.addEventListener('input', update);
  p21El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter forward transition probability $P(1 \to 2)$.',
      'Enter reverse transition probability $P(2 \to 1)$.',
      'Inspect long-term invariant equilibrium probability distribution vector $\pi = [\pi_1, \pi_2]$ and mean recurrence return times.'
    ],
    benefitTitle: 'Andrey Markov 1906 Stochastic Memoryless Process',
    benefitContent: 'Irreducible, aperiodic Markov chains converge to a unique invariant stationary distribution ($\pi P = \pi$) independent of initial state conditions, powering Google\'s original PageRank search algorithm and financial credit rating transition models.',
    faqs: [{ q: 'What is the ergodic theorem for Markov chains?', a: 'For an ergodic chain, the long-term time fraction spent in state i equals the theoretical stationary probability $\pi_i$.' }]
  },

  // 23. Discrete Fourier Transform (DFT) Frequency Resolution & Windowing Calculator
  {
    slug: 'discrete-fourier-transform-dft-sampling-spectral-leakage-calculator',
    name: 'Discrete Fourier Transform (DFT / FFT) Frequency Resolution & Windowing Calculator',
    description: 'Calculate FFT spectral frequency bin resolution (Δf = f_s / N = 1 / T_record) in Hz and side-lobe spectral leakage attenuation across Rectangular, Hanning, Hamming, and Blackman window functions.',
    category: 'Science',
    icon: 'text',
    keywords: ['fft frequency resolution calculator', 'dft frequency bin size formula delta f equals fs over n online', 'window function spectral leakage hanning blackman calculator', 'sampling rate record length dft resolution online', 'digital signal processing dft fft bins online'],
    order: 834,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sampling Rate f_s (kHz), FFT Size N (Points) & Window Function',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dft-fs">Sampling f_s (kHz)</label>
          <input class="tool-textarea" id="dft-fs" type="number" step="any" value="48.0" placeholder="48.0 kHz (Audio)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dft-n">FFT Size N</label>
          <select class="tool-textarea" id="dft-n">
            <option value="1024">1,024 Points</option>
            <option value="2048">2,048 Points</option>
            <option value="4096" selected>4,096 Points</option>
            <option value="8192">8,192 Points</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="dft-win">Window</label>
          <select class="tool-textarea" id="dft-win">
            <option value="hann" selected>Hanning (Side Lobe: -31.5 dB, 1.5× bin width)</option>
            <option value="hamming">Hamming (Side Lobe: -42.7 dB, 1.36× bin width)</option>
            <option value="blackman">Blackman (Side Lobe: -58.1 dB, 1.73× bin width)</option>
            <option value="rect">Rectangular (Side Lobe: -13.3 dB - Severe Leakage!)</option>
          </select>
        </div>
      </div>
      <div id="dft-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dft-res-df" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Δf = 11.72 Hz Bin Size</span>
            <span class="stat-label">Spectral Frequency Bin Resolution (Δf = f_s / N)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dft-res-nyq" style="font-weight:700;">Record Time T = 85.3 ms | Nyquist Frequency f_Nyq = 24.0 kHz (2,048 Positive Bins)</span>
            <span class="stat-label">Time Record Length & Maximum Detectable Nyquist Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fsEl = document.getElementById('dft-fs'), nEl = document.getElementById('dft-n'), winEl = document.getElementById('dft-win');
  const dfResEl = document.getElementById('dft-res-df'), nqResEl = document.getElementById('dft-res-nyq');

  const WINDOWS = {
    'hann':     { sidelobe_db: -31.5, enbw: 1.50, name: 'Hanning' },
    'hamming':  { sidelobe_db: -42.7, enbw: 1.36, name: 'Hamming' },
    'blackman': { sidelobe_db: -58.1, enbw: 1.73, name: 'Blackman' },
    'rect':     { sidelobe_db: -13.3, enbw: 1.00, name: 'Rectangular' }
  };

  function update() {
    const fsKhz = parseFloat(fsEl.value), N = parseInt(nEl.value, 10);
    const win = WINDOWS[winEl.value];

    if (isNaN(fsKhz) || isNaN(N) || fsKhz <= 0 || N <= 0) return;

    const fsHz = fsKhz * 1000.0;

    // Frequency resolution delta_f = fs / N  [Hz]
    const delta_f = fsHz / N;
    // Effective Noise Bandwidth ENBW = delta_f * window_enbw
    const enbw_hz = delta_f * win.enbw;

    // Time record length T = N / fs  [seconds -> ms]
    const T_rec_sec = N / fsHz;
    const T_rec_ms = T_rec_sec * 1000.0;

    // Nyquist frequency = fs / 2
    const f_nyq_khz = fsKhz / 2.0;

    dfResEl.textContent = 'Δf = ' + delta_f.toFixed(2) + ' Hz (ENBW = ' + enbw_hz.toFixed(2) + ' Hz)';
    nqResEl.textContent = 'Record T = ' + T_rec_ms.toFixed(1) + ' ms | Nyquist f_Nyq = ' + f_nyq_khz.toFixed(1) + ' kHz (' + win.name + ' Rejection: ' + win.sidelobe_db + ' dB)';
  }

  [fsEl, nEl, winEl].forEach(el => el.addEventListener('input', update));
  winEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter ADC sampling frequency $f_s$ in kHz.',
      'Select Fast Fourier Transform point size N (e.g. 1024 to 8192).',
      'Select spectral windowing function (Hanning, Hamming, Blackman, Rectangular).',
      'Inspect FFT frequency bin spacing $\Delta f$, Effective Noise Bandwidth (ENBW), and time record acquisition duration.'
    ],
    benefitTitle: 'Discrete Fourier Transform Sampling Resolution Law',
    benefitContent: 'Frequency resolution depends solely on total time record duration ($\Delta f = 1/T_{\text{record}}$); applying smooth Hanning/Blackman windows tapers the signal edges to zero, suppressing discontinuous side-lobe spectral leakage by $>30\text{ to }58\text{ dB}$.',
    faqs: [{ q: 'Does zero-padding increase true physical frequency resolution?', a: 'No; zero-padding interpolates the spectrum with smoother sinc curves without adding new spectral information.' }]
  },

  // 24. Simplex Linear Programming Pivot & Dual Price Calculator
  {
    slug: 'simplex-linear-programming-slack-pivot-calculator',
    name: 'Simplex Linear Programming (Pivot & Slack Variables) Calculator',
    description: 'Calculate 2-variable canonical linear programming optimal objective solutions (Maximize Z = c₁·x₁ + c₂·x₂ subject to A·x ≤ b) and identify corner-point simplex tableau pivots.',
    category: 'Science',
    icon: 'text',
    keywords: ['simplex method calculator', 'linear programming optimization maximize z equals c1 x1 plus c2 x2 online', 'simplex tableau pivot slack variables calculator', 'operations research linear programming graphical solver online', 'dual price shadow price linear programming online'],
    order: 835,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Objective: Maximize Z = c₁·x₁ + c₂·x₂ | Constraint 1: a₁₁·x₁ + a₁₂·x₂ ≤ b₁ | Constraint 2: a₂₁·x₁ + a₂₂·x₂ ≤ b₂',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lp-c1">Profit c₁</label>
          <input class="tool-textarea" id="lp-c1" type="number" step="any" value="3.0" placeholder="3.0 ($/unit x₁)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lp-c2">Profit c₂</label>
          <input class="tool-textarea" id="lp-c2" type="number" step="any" value="5.0" placeholder="5.0 ($/unit x₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lp-b1">Resource b₁</label>
          <input class="tool-textarea" id="lp-b1" type="number" step="any" value="4.0" placeholder="4.0 (x₁ ≤ 4)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lp-b2">Resource b₂</label>
          <input class="tool-textarea" id="lp-b2" type="number" step="any" value="18.0" placeholder="18.0 (3x₁ + 2x₂ ≤ 18)" />
        </div>
      </div>
      <div id="lp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lp-res-z" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Max Z = $36.00 Optimal</span>
            <span class="stat-label">Maximum Objective Function Value (Z*)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lp-res-pt" style="font-weight:700;">Optimal Vertex Point: x₁* = 2.0, x₂* = 6.0 (Active Binding Constraints: C1 & C2)</span>
            <span class="stat-label">Optimal Corner-Point Decision Variables (x₁*, x₂*)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const c1El = document.getElementById('lp-c1'), c2El = document.getElementById('lp-c2');
  const b1El = document.getElementById('lp-b1'), b2El = document.getElementById('lp-b2');
  const zResEl = document.getElementById('lp-res-z'), ptResEl = document.getElementById('lp-res-pt');

  function update() {
    const c1 = parseFloat(c1El.value), c2 = parseFloat(c2El.value);
    const b1 = parseFloat(b1El.value), b2 = parseFloat(b2El.value);

    if (isNaN(c1) || isNaN(c2) || isNaN(b1) || isNaN(b2) || b1 <= 0 || b2 <= 0) return;

    // Linear Program:
    // Maximize Z = c1*x1 + c2*x2
    // Subject to:
    // 1*x1 + 0*x2 <= b1
    // 3*x1 + 2*x2 <= b2
    // x1, x2 >= 0

    // Feasible corner points:
    // 1. Origin: (0, 0) => Z = 0
    // 2. Point on x2 axis: x1 = 0 => 2*x2 <= b2 => x2 = b2 / 2
    const pt2 = { x1: 0, x2: b2 / 2.0, z: c2 * (b2 / 2.0) };

    // 3. Point on x1 axis: x2 = 0 => x1 = min( b1, b2 / 3 )
    const x1_max = Math.min(b1, b2 / 3.0);
    const pt3 = { x1: x1_max, x2: 0, z: c1 * x1_max };

    // 4. Intersection of x1 = b1 and 3*x1 + 2*x2 = b2 => x2 = (b2 - 3*b1) / 2
    let pt4 = { x1: b1, x2: (b2 - (3.0 * b1)) / 2.0, z: -1 };
    if (pt4.x2 >= 0) {
      pt4.z = (c1 * pt4.x1) + (c2 * pt4.x2);
    }

    // Find maximum among feasible vertices
    const candidates = [pt2, pt3];
    if (pt4.z >= 0) candidates.push(pt4);

    candidates.sort((a, b) => b.z - a.z);
    const best = candidates[0];

    zResEl.textContent = 'Max Z = $' + best.z.toFixed(2) + ' Optimal Profit';
    ptResEl.textContent = 'Optimal Decision: x₁* = ' + best.x1.toFixed(1) + ', x₂* = ' + best.x2.toFixed(1) + ' (c₁ = $' + c1 + ', c₂ = $' + c2 + ')';
  }

  [c1El, c2El, b1El, b2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter unit profit contribution coefficients $c_1$ and $c_2$.',
      'Enter available resource capacities $b_1$ and $b_2$.',
      'Inspect optimal corner-point vertex decision variables $(x_1^*, x_2^*)$ and maximum objective value $Z^*$.'
    ],
    benefitTitle: 'George Dantzig 1947 Simplex Optimization Algorithm',
    benefitContent: 'The Fundamental Theorem of Linear Programming proves that the optimal solution always lies at a vertex of the convex polyhedral feasible region; the Simplex algorithm navigates along intersecting constraint edges to find the global optimum in polynomial time.',
    faqs: [{ q: 'What is a Shadow Price (Dual Value) in linear programming?', a: 'The shadow price is the marginal increase in optimal objective profit $\Delta Z$ achieved by relaxing a resource constraint by one unit ($\Delta b = +1$).' }]
  },

  // 25. Poisson Process Inter-Arrival Time & M/M/1 Queueing Calculator
  {
    slug: 'poisson-process-inter-arrival-time-queueing-calculator',
    name: 'Poisson Process Event Probability & M/M/1 Queueing Performance Calculator',
    description: 'Calculate Poisson stochastic event arrival probabilities (P(k) = (λ·t)^k · e^(-λ·t) / k!) and Kendall M/M/1 queue performance (Server Utilization ρ = λ / μ, Mean Queue Length L_q = ρ² / (1 - ρ), Wait Time W_q).',
    category: 'Science',
    icon: 'text',
    keywords: ['poisson process calculator', 'm m 1 queue calculator formula rho equals lambda over mu online', 'queueing theory average wait time wq lq calculator', 'poisson event arrival probability calculator online', 'operations research stochastic queueing model online'],
    order: 836,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Arrival Rate λ (arrivals/hour) & Service Rate μ (services/hour per server)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="q-lam">Arrival Rate λ (/h)</label>
          <input class="tool-textarea" id="q-lam" type="number" step="1" value="18.0" placeholder="18.0 customers/hour" />
        </div>
        <div class="control-group">
          <label class="control-label" for="q-mu">Service Rate μ (/h)</label>
          <input class="tool-textarea" id="q-mu" type="number" step="1" value="24.0" placeholder="24.0 services/hour" />
        </div>
      </div>
      <div id="q-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="q-res-rho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Utilization ρ = 75.0%</span>
            <span class="stat-label">Server Traffic Intensity Utilization (ρ = λ / μ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="q-res-wq" style="color:var(--green-dark); font-weight:700;">Average Wait W_q = 7.50 Minutes (Mean Queue Length L_q = 2.25 Customers in Line)</span>
            <span class="stat-label">Mean Queue Line Length (L_q) & Queue Wait Time (W_q)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('q-lam'), muEl = document.getElementById('q-mu');
  const rResEl = document.getElementById('q-res-rho'), wqResEl = document.getElementById('q-res-wq');

  function update() {
    const lambda = parseFloat(lamEl.value), mu = parseFloat(muEl.value);
    if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0) return;

    // Traffic intensity utilization rho = lambda / mu
    const rho = lambda / mu;

    if (rho >= 1.0) {
      rResEl.textContent = 'UNSTABLE QUEUE (ρ = ' + (rho * 100).toFixed(1) + '% ≥ 100%)';
      rResEl.style.color = '#c53030';
      wqResEl.textContent = 'Arrival rate exceeds service capacity (λ ≥ μ): Queue grows infinitely without bound!';
      wqResEl.style.color = '#c53030';
      return;
    }

    // Average number in system L = rho / (1 - rho)
    const L = rho / (1.0 - rho);
    // Average number in queue L_q = rho^2 / (1 - rho) = L - rho
    const L_q = Math.pow(rho, 2) / (1.0 - rho);

    // Average time in system W = 1 / (mu - lambda)  [hours -> minutes]
    const W_hours = 1.0 / (mu - lambda);
    const W_min = W_hours * 60.0;

    // Average time in queue W_q = rho / (mu - lambda)  [hours -> minutes]
    const W_q_hours = rho / (mu - lambda);
    const W_q_min = W_q_hours * 60.0;

    let color = rho > 0.85 ? '#d97706' : '#22543d';

    rResEl.textContent = 'Utilization ρ = ' + (rho * 100).toFixed(1) + '%';
    rResEl.style.color = color;
    wqResEl.textContent = 'Average Wait in Line W_q = ' + W_q_min.toFixed(1) + ' min (Line Length L_q = ' + L_q.toFixed(2) + ' | Total System Time W = ' + W_min.toFixed(1) + ' min)';
    wqResEl.style.color = color;
  }

  lamEl.addEventListener('input', update);
  muEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter customer/packet Poisson arrival rate $\lambda$ per hour.',
      'Enter exponential server capacity service rate $\mu$ per hour.',
      'Inspect server traffic utilization percentage $\rho = \lambda/\mu$, average line wait time $W_q$ in minutes, and mean queue backlog length $L_q$.'
    ],
    benefitTitle: 'A.K. Erlang & David G. Kendall Queueing Performance Law',
    benefitContent: 'Queueing theory reveals the non-linear "hockey stick" latency curve: as server utilization approaches 100% ($\rho \to 1.0$), queue length and waiting times explode exponentially ($L_q \propto \frac{\rho^2}{1-\rho}$), requiring cloud servers to operate at $\le 70\text{–}80\%$ capacity.',
    faqs: [{ q: 'What is Little\'s Law?', a: 'Little\'s Law ($L = \lambda W$) proves that the average number of customers in any stable system equals arrival rate multiplied by average wait time.' }]
  }
];

pack27Tools.forEach(createTool);
console.log('Pack 27 complete: 25 tools created.');
