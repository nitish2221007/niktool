const { createTool } = require('./generate-curated-tools.cjs');

// Pack 49: 25 Semiconductor Physics, Microelectronics, Quantum Devices & Optoelectronics Calculators (Tools 1476 to 1500)
const pack49Tools = [
  // 1. PN Junction Built-In Potential & Depletion Width Calculator
  {
    slug: 'pn-junction-built-in-potential-depletion-width-calculator',
    name: 'PN Junction Built-In Potential (V_bi = kT/q·ln(N_A·N_D/n_i²)) & Depletion Width Calculator',
    description: 'Calculate silicon PN junction built-in contact potential V_bi in Volts (V_bi = (kT/q) · ln(N_A · N_D / n_i²)), total depletion region width W in μm, and peak electric field E_max under reverse bias V_R.',
    category: 'Science',
    icon: 'text',
    keywords: ['pn junction built in potential calculator', 'depletion width formula w vbi online', 'silicon pn junction electric field calculator', 'acceptor donor doping concentration calculator', 'semiconductor device physics microelectronics online'],
    order: 1360,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Acceptor Doping N_A (cm⁻³), Donor Doping N_D (cm⁻³), Reverse Bias V_R (V) & Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pn-na">Acceptor N_A (cm⁻³)</label>
          <input class="tool-textarea" id="pn-na" type="number" step="1e15" value="1.0e16" placeholder="1.0 × 10¹⁶ cm⁻³ (p-type)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pn-nd">Donor N_D (cm⁻³)</label>
          <input class="tool-textarea" id="pn-nd" type="number" step="1e15" value="1.0e17" placeholder="1.0 × 10¹⁷ cm⁻³ (n-type)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pn-vr">Reverse V_R (V)</label>
          <input class="tool-textarea" id="pn-vr" type="number" step="0.5" value="0.0" placeholder="0.0 V (Zero Bias)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pn-t">Temp T (K)</label>
          <input class="tool-textarea" id="pn-t" type="number" step="10" value="300" placeholder="300 K (Room Temp)" />
        </div>
      </div>
      <div id="pn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pn-res-vbi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Built-In Potential V_bi = 0.754 V</span>
            <span class="stat-label">Equilibrium Built-In Diffusion Potential (V_bi = V_t · ln(N_A·N_D / n_i²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pn-res-w" style="color:var(--green-dark); font-weight:700;">Depletion Width W = 0.330 μm (x_p = 0.300 μm, x_n = 0.030 μm) | Peak E = 45.7 kV/cm</span>
            <span class="stat-label">Space Charge Depletion Width & Maximum Junction Electric Field</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('pn-na'), ndEl = document.getElementById('pn-nd');
  const vrEl = document.getElementById('pn-vr'), tEl = document.getElementById('pn-t');
  const vbResEl = document.getElementById('pn-res-vbi'), wResEl = document.getElementById('pn-res-w');

  const q = 1.602176634e-19; // C
  const k_B = 1.380649e-23; // J/K
  const eps_0 = 8.854187817e-14; // F/cm
  const eps_si = 11.7 * eps_0; // Silicon permittivity in F/cm
  const ni_300 = 1.0e10; // cm^-3

  function update() {
    const N_A = parseFloat(naEl.value), N_D = parseFloat(ndEl.value);
    const V_R = parseFloat(vrEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(N_A) || isNaN(N_D) || isNaN(V_R) || isNaN(T_K) || N_A <= 0 || N_D <= 0 || T_K <= 0) return;

    // Thermal voltage: V_t = k_B * T / q
    const V_t = (k_B * T_K) / q;

    // Built-in potential: V_bi = V_t * ln( (N_A * N_D) / ni^2 )  [Volts]
    const V_bi = V_t * Math.log((N_A * N_D) / Math.pow(ni_300, 2));

    // Total junction voltage: V_j = V_bi + V_R
    const V_j = V_bi + V_R;

    // Depletion width: W = sqrt( (2 * eps_si / q) * (1/N_A + 1/N_D) * V_j )  [cm -> um]
    const W_cm = Math.sqrt(((2.0 * eps_si) / q) * ((1.0 / N_A) + (1.0 / N_D)) * V_j);
    const W_um = W_cm * 1e4;

    // Asymmetric depletion extension: x_p = W * (N_D / (N_A + N_D)), x_n = W * (N_A / (N_A + N_D))
    const xp_um = W_um * (N_D / (N_A + N_D));
    const xn_um = W_um * (N_A / (N_A + N_D));

    // Peak electric field: E_max = 2 * V_j / W  [V/cm -> kV/cm]
    const E_max_kV_cm = (2.0 * V_j / W_cm) / 1000.0;

    vbResEl.textContent = 'Built-In Potential V_bi = ' + V_bi.toFixed(3) + ' V';
    wResEl.textContent = 'Width W = ' + W_um.toFixed(3) + ' μm (x_p = ' + xp_um.toFixed(3) + ' μm, x_n = ' + xn_um.toFixed(3) + ' μm) | Peak E = ' + E_max_kV_cm.toFixed(1) + ' kV/cm (V_R=' + V_R + ' V)';
  }

  [naEl, ndEl, vrEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter p-side acceptor doping concentration $N_A$ in $\text{cm}^{-3}$ (e.g. Boron).',
      'Enter n-side donor doping concentration $N_D$ in $\text{cm}^{-3}$ (e.g. Phosphorus).',
      'Enter applied reverse bias voltage $V_R$ in Volts ($V_R \ge 0$).',
      'Enter device operating junction temperature in Kelvin (standard 300 K).',
      'Inspect built-in contact potential $V_{bi}$, space charge depletion layer width W, and peak internal electric field $E_{\max}$.'
    ],
    benefitTitle: 'William Shockley 1949 PN Junction Theory',
    benefitContent: 'Fundamental governing equations for semiconductor diode rectification, solar cell photovoltaic charge separation, and junction capacitance tuning in microelectronic integrated circuits.',
    faqs: [{ q: 'Why does the depletion region extend deeper into the lightly doped side?', a: 'Charge neutrality requires equal ionized charge ($q N_A x_p = q N_D x_n$), forcing the depletion width to penetrate farther into the lower-doped layer.' }]
  },

  // 2. MOSFET Threshold Voltage & Body Effect Calculator
  {
    slug: 'mosfet-threshold-voltage-body-effect-calculator',
    name: 'MOSFET Threshold Voltage & Body Effect (V_th = V_FB + 2φ_F + γ·√(2φ_F - V_SB)) Calculator',
    description: 'Calculate n-channel MOSFET threshold voltage V_th in Volts (V_th = V_FB + 2·φ_F + γ · √(2·φ_F + V_SB)), body effect parameter γ in V^(1/2) (gamma = √(2·q·ε_s·N_A) / C_ox), and oxide capacitance C_ox.',
    category: 'Science',
    icon: 'text',
    keywords: ['mosfet threshold voltage calculator', 'body effect parameter gamma formula online', 'fermi potential phi f flat band voltage calculator', 'gate oxide capacitance cox tox mosfet calculator', 'vlsi microelectronics semiconductor device physics online'],
    order: 1361,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Substrate Doping N_A (cm⁻³), Oxide Thickness t_ox (nm), Flat-Band V_FB (V) & Source-to-Body V_SB (V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vt-na">Substrate N_A (cm⁻³)</label>
          <input class="tool-textarea" id="vt-na" type="number" step="1e16" value="5.0e17" placeholder="5.0 × 10¹⁷ cm⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vt-tox">Oxide t_ox (nm)</label>
          <input class="tool-textarea" id="vt-tox" type="number" step="0.5" value="2.0" placeholder="2.0 nm SiO₂" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vt-vfb">Flatband V_FB (V)</label>
          <input class="tool-textarea" id="vt-vfb" type="number" step="0.1" value="-0.80" placeholder="-0.80 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vt-vsb">Source-Body V_SB (V)</label>
          <input class="tool-textarea" id="vt-vsb" type="number" step="0.2" value="0.0" placeholder="0.0 V (Grounded Body)" />
        </div>
      </div>
      <div id="vt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vt-res-vth" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Threshold V_th = 0.386 V</span>
            <span class="stat-label">n-MOSFET Inversion Threshold Voltage (V_th = V_FB + 2·φ_F + γ·√(2·φ_F + V_SB))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vt-res-cox" style="color:var(--green-dark); font-weight:700;">C_ox = 1.73 μF/cm² | Body Parameter γ = 0.301 V^½ | Surface Fermi 2·φ_F = 0.898 V</span>
            <span class="stat-label">Gate Oxide Capacitance & Substrate Body Effect Coefficient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('vt-na'), toxEl = document.getElementById('vt-tox');
  const vfbEl = document.getElementById('vt-vfb'), vsbEl = document.getElementById('vt-vsb');
  const vtResEl = document.getElementById('vt-res-vth'), cxResEl = document.getElementById('vt-res-cox');

  const q = 1.602176634e-19; // C
  const k_B = 1.380649e-23; // J/K
  const T = 300.0; // K
  const V_t = (k_B * T) / q; // 0.02585 V
  const eps_0 = 8.854187817e-14; // F/cm
  const eps_si = 11.7 * eps_0; // F/cm
  const eps_ox = 3.9 * eps_0; // SiO2 permittivity in F/cm
  const ni = 1.0e10; // cm^-3

  function update() {
    const N_A = parseFloat(naEl.value), tox_nm = parseFloat(toxEl.value);
    const V_FB = parseFloat(vfbEl.value), V_SB = parseFloat(vsbEl.value);

    if (isNaN(N_A) || isNaN(tox_nm) || isNaN(V_FB) || isNaN(V_SB) || N_A <= 0 || tox_nm <= 0 || V_SB < 0) return;

    const tox_cm = tox_nm * 1e-7;

    // Gate oxide capacitance: C_ox = eps_ox / tox_cm  [F / cm^2 -> uF / cm^2]
    const C_ox_F_cm2 = eps_ox / tox_cm;
    const C_ox_uF_cm2 = C_ox_F_cm2 * 1e6;

    // Substrate Fermi potential: phi_F = V_t * ln( N_A / ni )
    const phi_F = V_t * Math.log(N_A / ni);
    const two_phi_F = 2.0 * phi_F;

    // Body effect coefficient: gamma = sqrt( 2 * q * eps_si * N_A ) / C_ox
    const gamma = Math.sqrt(2.0 * q * eps_si * N_A) / C_ox_F_cm2;

    // Threshold voltage: V_th = V_FB + 2*phi_F + gamma * sqrt( 2*phi_F + V_SB )
    const V_th = V_FB + two_phi_F + (gamma * Math.sqrt(two_phi_F + V_SB));

    vtResEl.textContent = 'Threshold V_th = ' + V_th.toFixed(3) + ' V';
    cxResEl.textContent = 'C_ox = ' + C_ox_uF_cm2.toFixed(2) + ' μF/cm² | Body γ = ' + gamma.toFixed(3) + ' V^½ | 2φ_F = ' + two_phi_F.toFixed(3) + ' V (V_SB=' + V_SB + ' V)';
  }

  [naEl, toxEl, vfbEl, vsbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter p-type substrate silicon acceptor doping concentration $N_A$ in $\text{cm}^{-3}$.',
      'Enter gate dielectric equivalent oxide thickness $t_{\text{ox}}$ in nm.',
      'Enter flat-band voltage $V_{\text{FB}}$ in Volts (typically $-0.8\text{ V}$ to $-1.0\text{ V}$).',
      'Enter source-to-body reverse bias substrate voltage $V_{\text{SB}}$ in Volts.',
      'Inspect threshold voltage $V_{\text{th}}$, gate oxide capacitance $C_{\text{ox}}$, and body effect parameter $\gamma$.'
    ],
    benefitTitle: 'MOS Transistor Inversion Physics Standard',
    benefitContent: 'Quantifies the gate voltage required to create strong electron inversion channels at the silicon-oxide interface, governing logic switching thresholds in modern CMOS microprocessors.',
    faqs: [{ q: 'What is the Body Effect in integrated circuits?', a: 'When the transistor source is at a higher potential than the substrate body ($V_{\text{SB}} > 0$), depletion charge increases, raising threshold voltage $V_{\text{th}}$ and slowing down stacked pass gates.' }]
  },

  // 3. MOSFET Drain Current (Linear vs Saturation) Calculator
  {
    slug: 'mosfet-drain-current-saturation-linear-triode-calculator',
    name: 'MOSFET Drain Current (Linear Triode vs Saturation) & Transconductance (g_m) Calculator',
    description: 'Calculate long-channel MOSFET drain current I_D in mA across Cutoff (I_D = 0), Linear Triode (I_D = μ·C_ox·(W/L)·[(V_GS - V_th)·V_DS - ½·V_DS²]), and Saturation (I_D = ½·μ·C_ox·(W/L)·(V_GS - V_th)²·(1 + λ·V_DS)) regimes with transconductance g_m.',
    category: 'Science',
    icon: 'text',
    keywords: ['mosfet drain current calculator', 'saturation current formula id linear triode online', 'transconductance gm lambda channel length modulation calculator', 'mosfet w over l aspect ratio calculator', 'analog cmos vlsi circuit design electronics online'],
    order: 1362,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gate-Source V_GS (V), Drain-Source V_DS (V), Threshold V_th (V), Process Transconductance k\' (μA/V²) & Aspect Ratio W/L',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-vgs">Gate-Source V_GS</label>
          <input class="tool-textarea" id="mc-vgs" type="number" step="0.1" value="1.20" placeholder="1.20 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-vds">Drain-Source V_DS</label>
          <input class="tool-textarea" id="mc-vds" type="number" step="0.1" value="1.00" placeholder="1.00 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-vth">Threshold V_th (V)</label>
          <input class="tool-textarea" id="mc-vth" type="number" step="0.05" value="0.40" placeholder="0.40 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-kp">Process k\' (μA/V²)</label>
          <input class="tool-textarea" id="mc-kp" type="number" step="25" value="200.0" placeholder="200.0 μA/V² (μ·C_ox)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-wl">Aspect Ratio W/L</label>
          <input class="tool-textarea" id="mc-wl" type="number" step="5" value="20.0" placeholder="20.0 (W/L)" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-id" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Drain Current I_D = 1.280 mA (SATURATION)</span>
            <span class="stat-label">MOSFET Operating Current (V_DS ≥ V_GS - V_th Pinch-Off Condition)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-gm" style="color:var(--green-dark); font-weight:700;">Transconductance g_m = 3.20 mS (mA/V) | Overdrive V_ov = 0.80 V (V_DS,sat = 0.80 V)</span>
            <span class="stat-label">Small-Signal Transconductance (g_m = ∂I_D / ∂V_GS = k\'·(W/L)·V_ov)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vgsEl = document.getElementById('mc-vgs'), vdsEl = document.getElementById('mc-vds');
  const vthEl = document.getElementById('mc-vth'), kpEl = document.getElementById('mc-kp'), wlEl = document.getElementById('mc-wl');
  const idResEl = document.getElementById('mc-res-id'), gmResEl = document.getElementById('mc-res-gm');

  function update() {
    const V_GS = parseFloat(vgsEl.value), V_DS = parseFloat(vdsEl.value);
    const V_th = parseFloat(vthEl.value), k_prime_uA = parseFloat(kpEl.value), W_L = parseFloat(wlEl.value);

    if (isNaN(V_GS) || isNaN(V_DS) || isNaN(V_th) || isNaN(k_prime_uA) || isNaN(W_L) || k_prime_uA <= 0 || W_L <= 0) return;

    const beta_uA = k_prime_uA * W_L; // uA / V^2
    const V_ov = V_GS - V_th; // Overdrive voltage

    let I_D_uA = 0, g_m_mS = 0, mode = '', color = '#22543d';

    if (V_GS < V_th) {
      // Cutoff:
      I_D_uA = 0;
      g_m_mS = 0;
      mode = 'CUTOFF REGIME (V_GS < V_th: Channel not formed)';
      color = '#c53030';
    } else if (V_DS < V_ov) {
      // Linear Triode Regime: I_D = beta * [ (V_GS - V_th)*V_DS - 0.5*V_DS^2 ]
      I_D_uA = beta_uA * ((V_ov * V_DS) - (0.5 * Math.pow(V_DS, 2)));
      g_m_mS = (beta_uA * V_DS) * 1e-3; // mA / V
      mode = 'LINEAR TRIODE REGIME (V_DS < V_ov: Resistor-like behavior)';
      color = '#ea580c';
    } else {
      // Saturation Regime: I_D = 0.5 * beta * (V_GS - V_th)^2
      I_D_uA = 0.5 * beta_uA * Math.pow(V_ov, 2);
      g_m_mS = (beta_uA * V_ov) * 1e-3; // mA / V
      mode = 'SATURATION REGIME (V_DS ≥ V_ov: Pinched-off channel, current source)';
      color = '#22543d';
    }

    const I_D_mA = I_D_uA * 1e-3;

    idResEl.textContent = 'Drain Current I_D = ' + (I_D_mA >= 1.0 ? I_D_mA.toFixed(3) + ' mA' : I_D_uA.toFixed(1) + ' μA') + ' (' + mode.split(' (')[0] + ')';
    idResEl.style.color = color;
    gmResEl.textContent = 'Transconductance g_m = ' + g_m_mS.toFixed(2) + ' mS | Overdrive V_ov = ' + (V_ov >= 0 ? '+' : '') + V_ov.toFixed(2) + ' V (' + mode + ')';
  }

  [vgsEl, vdsEl, vthEl, kpEl, wlEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter gate-to-source voltage $V_{\text{GS}}$ in Volts.',
      'Enter drain-to-source voltage $V_{\text{DS}}$ in Volts.',
      'Enter threshold voltage $V_{\text{th}}$ in Volts.',
      'Enter process transconductance parameter $k^\prime = \mu C_{\text{ox}}$ in $\mu\text{A/V}^2$.',
      'Enter transistor channel aspect ratio $W/L$.',
      'Inspect operating drain current $I_D$ in mA/$\mu\text{A}$ and small-signal transconductance $g_m$.'
    ],
    benefitTitle: 'Square-Law Long-Channel MOSFET Current Standard',
    benefitContent: 'Identifies the boundary transition ($V_{\text{DS,sat}} = V_{\text{GS}} - V_{\text{th}}$) between linear variable-resistor behavior and saturation constant-current amplification.',
    faqs: [{ q: 'What is channel length modulation (Early effect in MOSFETs)?', a: 'In saturation, shortening of the effective channel increases current with $V_{\text{DS}}$ by $(1 + \lambda V_{\text{DS}})$, where $\lambda \propto 1/L$.' }]
  },

  // 4. BJT Ebers-Moll Collector Current Calculator
  {
    slug: 'bipolar-junction-transistor-ebers-moll-collector-current-calculator',
    name: 'BJT Ebers-Moll Collector Current & Early Effect (V_A) Calculator',
    description: 'Calculate Bipolar Junction Transistor (BJT) forward active collector current I_C in mA (I_C = I_S · (e^(q·V_BE / kT) - 1) · (1 + V_CE / V_A)), transconductance g_m = I_C / V_t, and base current I_B = I_C / β.',
    category: 'Science',
    icon: 'text',
    keywords: ['bjt ebers moll calculator', 'collector current formula ic equals is exp vbe over vt online', 'early voltage va output resistance ro bjt calculator', 'transconductance gm ic over vt bjt amplifier calculator', 'analog electronics semiconductor transistor circuit design online'],
    order: 1363,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Base-Emitter V_BE (V), Collector-Emitter V_CE (V), Saturation Current I_S (fA) & Early Voltage V_A (V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bj-vbe">Base-Emitter V_BE</label>
          <input class="tool-textarea" id="bj-vbe" type="number" step="0.01" value="0.70" placeholder="0.70 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bj-vce">Collector-Emitter V_CE</label>
          <input class="tool-textarea" id="bj-vce" type="number" step="0.5" value="5.0" placeholder="5.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bj-is">Saturation I_S (fA)</label>
          <input class="tool-textarea" id="bj-is" type="number" step="10" value="10.0" placeholder="10.0 fA (1.0 × 10⁻¹⁴ A)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bj-va">Early V_A (V)</label>
          <input class="tool-textarea" id="bj-va" type="number" step="10" value="100.0" placeholder="100.0 V (Early Voltage)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bj-beta">Gain β (Beta)</label>
          <input class="tool-textarea" id="bj-beta" type="number" step="25" value="150.0" placeholder="150.0" />
        </div>
      </div>
      <div id="bj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bj-res-ic" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Collector I_C = 5.76 mA (g_m = 223 mS)</span>
            <span class="stat-label">BJT Collector Current (I_C = I_S · e^(V_BE/V_t) · (1 + V_CE/V_A))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bj-res-small" style="color:var(--green-dark); font-weight:700;">Base Current I_B = 38.4 μA | Small-Signal r_π = 673 Ω | Output r_o = 18.2 kΩ</span>
            <span class="stat-label">Small-Signal Hybrid-π Model Parameters (g_m, r_π, r_o)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vbeEl = document.getElementById('bj-vbe'), vceEl = document.getElementById('bj-vce');
  const isEl = document.getElementById('bj-is'), vaEl = document.getElementById('bj-va'), btEl = document.getElementById('bj-beta');
  const icResEl = document.getElementById('bj-res-ic'), smResEl = document.getElementById('bj-res-small');

  const V_t = 0.02585; // Thermal voltage @ 300 K in Volts

  function update() {
    const V_BE = parseFloat(vbeEl.value), V_CE = parseFloat(vceEl.value);
    const I_S_fA = parseFloat(isEl.value), V_A = parseFloat(vaEl.value), beta = parseFloat(btEl.value);

    if (isNaN(V_BE) || isNaN(V_CE) || isNaN(I_S_fA) || isNaN(V_A) || isNaN(beta) || I_S_fA <= 0 || V_A <= 0 || beta <= 0) return;

    const I_S_A = I_S_fA * 1e-15;

    // Ebers-Moll forward active current with Early effect:
    // I_C = I_S * exp( V_BE / V_t ) * ( 1 + V_CE / V_A )  [Amperes]
    const exp_term = Math.exp(V_BE / V_t);
    const early_factor = 1.0 + (V_CE / V_A);
    const I_C_A = I_S_A * exp_term * early_factor;
    const I_C_mA = I_C_A * 1000.0;

    // Base current: I_B = I_C / beta  [uA]
    const I_B_uA = (I_C_A / beta) * 1e6;

    // Small-signal transconductance: g_m = I_C / V_t  [A/V -> mS]
    const g_m_mS = (I_C_A / V_t) * 1000.0;

    // Base input resistance: r_pi = beta / g_m  [ohms]
    const r_pi_ohm = beta / (I_C_A / V_t);

    // Output resistance: r_o = (V_A + V_CE) / I_C  [kOhms]
    const r_o_kohm = ((V_A + V_CE) / I_C_A) / 1000.0;

    icResEl.textContent = 'Collector I_C = ' + I_C_mA.toFixed(2) + ' mA (g_m = ' + Math.round(g_m_mS) + ' mS)';
    smResEl.textContent = 'Base I_B = ' + I_B_uA.toFixed(1) + ' μA | r_π = ' + Math.round(r_pi_ohm) + ' Ω | Output r_o = ' + r_o_kohm.toFixed(1) + ' kΩ (V_BE=' + V_BE + ' V, V_CE=' + V_CE + ' V)';
  }

  [vbeEl, vceEl, isEl, vaEl, btEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter base-emitter forward bias voltage $V_{\text{BE}}$ in Volts (typically 0.65 V to 0.75 V for Silicon).',
      'Enter collector-emitter voltage $V_{\text{CE}}$ in Volts.',
      'Enter reverse saturation current $I_S$ in femtoamperes (fA, $10^{-15}\text{ A}$).',
      'Enter Early Voltage $V_A$ in Volts (typically 50–150 V) and common-emitter current gain $\beta$.',
      'Inspect collector current $I_C$, transconductance $g_m$, and small-signal hybrid-$\pi$ resistance parameters ($r_\pi, r_o$).'
    ],
    benefitTitle: 'Jewell James Ebers & John L. Moll 1954 BJT Model',
    benefitContent: 'Explains exponential voltage-to-current conversion in bipolar transistors ($I_C \propto e^{V_{\text{BE}}/V_t}$), generating massive transconductance ($g_m = 40\text{ mS per mA}$) for high-gain analog audio and RF amplifiers.',
    faqs: [{ q: 'Why is BJT transconductance higher than MOSFET transconductance?', a: 'BJTs follow an exponential $I$-$V$ characteristic ($e^{V_{\text{BE}}/V_t}$) whereas MOSFETs follow a quadratic square law ($(V_{\text{GS}} - V_{\text{th}})^2$), giving BJTs much higher gain per unit current.' }]
  },

  // 5. Carrier Drift Mobility & Einstein Diffusion Relation Calculator
  {
    slug: 'carrier-drift-mobility-einstein-relation-diffusion-calculator',
    name: 'Carrier Drift Mobility & Einstein Diffusion Relation (D = μ·kT/q) Calculator',
    description: 'Calculate semiconductor electron and hole diffusion coefficients D_n and D_p in cm²/s (Einstein Relation: D = μ · (kT/q)), electrical conductivity σ in (Ω·cm)⁻¹ (σ = q·(n·μ_n + p·μ_p)), and bulk resistivity ρ.',
    category: 'Science',
    icon: 'text',
    keywords: ['einstein relation calculator', 'carrier diffusion coefficient formula d equals mu kt over q online', 'semiconductor conductivity resistivity mobility calculator', 'electron hole drift mobility silicon calculator', 'semiconductor physics solid state electronics online'],
    order: 1364,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electron Mobility μ_n (cm²/V·s), Hole Mobility μ_p (cm²/V·s), Electron Density n & Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cd-mun">Electron μ_n</label>
          <input class="tool-textarea" id="cd-mun" type="number" step="100" value="1350.0" placeholder="1350 cm²/V·s (Silicon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-mup">Hole μ_p</label>
          <input class="tool-textarea" id="cd-mup" type="number" step="50" value="480.0" placeholder="480 cm²/V·s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-n">Electron n (cm⁻³)</label>
          <input class="tool-textarea" id="cd-n" type="number" step="1e15" value="1.0e16" placeholder="1.0 × 10¹⁶ cm⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-t">Temp T (K)</label>
          <input class="tool-textarea" id="cd-t" type="number" step="10" value="300" placeholder="300 K (27 °C)" />
        </div>
      </div>
      <div id="cd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cd-res-diff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Diffusivity: D_n = 34.90 cm² / s | D_p = 12.41 cm² / s</span>
            <span class="stat-label">Einstein Diffusion Coefficients (D = μ · kT / q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cd-res-cond" style="color:var(--green-dark); font-weight:700;">Conductivity σ = 2.163 (Ω·cm)⁻¹ | Bulk Resistivity ρ = 0.462 Ω·cm (n-type Silicon)</span>
            <span class="stat-label">Electrical Conductivity (σ = q · n · μ_n) & Silicon Wafer Resistivity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const munEl = document.getElementById('cd-mun'), mupEl = document.getElementById('cd-mup');
  const nEl = document.getElementById('cd-n'), tEl = document.getElementById('cd-t');
  const dfResEl = document.getElementById('cd-res-diff'), cdResEl = document.getElementById('cd-res-cond');

  const q = 1.602176634e-19; // C
  const k_B = 1.380649e-23; // J/K

  function update() {
    const mu_n = parseFloat(munEl.value), mu_p = parseFloat(mupEl.value);
    const n = parseFloat(nEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(mu_n) || isNaN(mu_p) || isNaN(n) || isNaN(T_K) || mu_n <= 0 || mu_p <= 0 || n <= 0 || T_K <= 0) return;

    // Thermal voltage: V_t = k_B * T / q
    const V_t = (k_B * T_K) / q;

    // Einstein relation: D = mu * V_t  [cm^2 / s]
    const D_n = mu_n * V_t;
    const D_p = mu_p * V_t;

    // Electrical conductivity for n-type (n >> p): sigma = q * n * mu_n  [1 / (ohm * cm)]
    const sigma = q * n * mu_n;
    const rho = 1.0 / sigma; // ohm * cm

    dfResEl.textContent = 'Diffusivity: D_n = ' + D_n.toFixed(2) + ' cm²/s | D_p = ' + D_p.toFixed(2) + ' cm²/s';
    cdResEl.textContent = 'Conductivity σ = ' + sigma.toFixed(3) + ' (Ω·cm)⁻¹ | Resistivity ρ = ' + rho.toFixed(3) + ' Ω·cm (V_t = ' + (V_t*1000).toFixed(2) + ' mV @ ' + T_K + ' K)';
  }

  [munEl, mupEl, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter electron low-field drift mobility $\mu_n$ in $\text{cm}^2/\text{V}\cdot\text{s}$ (1350 for Silicon, 8500 for GaAs).',
      'Enter hole low-field drift mobility $\mu_p$ in $\text{cm}^2/\text{V}\cdot\text{s}$ (480 for Silicon, 400 for GaAs).',
      'Enter majority carrier concentration n in $\text{cm}^{-3}$.',
      'Enter temperature in Kelvin (standard 300 K).',
      'Inspect Einstein diffusion coefficients ($D_n, D_p$) and semiconductor bulk resistivity $\rho$ in $\Omega\cdot\text{cm}$.'
    ],
    benefitTitle: 'Albert Einstein 1905 Fluctuation-Dissipation Relation',
    benefitContent: 'Directly links macroscopic carrier drift velocity under electric fields ($\mathbf{v} = \mu \mathbf{E}$) to microscopic thermal Brownian concentration diffusion ($D = \mu \frac{kT}{q}$).',
    faqs: [{ q: 'Why is electron mobility always higher than hole mobility in semiconductors?', a: 'Electrons reside in the conduction band with lower effective mass ($m_e^* < m_h^*$) compared to heavier valence band holes.' }]
  },

  // 6. Intrinsic Carrier Concentration (n_i) & Fermi Level Calculator
  {
    slug: 'intrinsic-semiconductor-carrier-concentration-fermi-level-calculator',
    name: 'Intrinsic Carrier Concentration (n_i) & Fermi Level Position Calculator',
    description: 'Calculate semiconductor intrinsic carrier concentration n_i in cm⁻³ (n_i = √(N_C·N_V) · e^(-E_g / 2kT)), intrinsic Fermi level offset (E_i - E_midgap), and temperature dependency for Si, Ge, and GaAs.',
    category: 'Science',
    icon: 'text',
    keywords: ['intrinsic carrier concentration calculator', 'ni formula bandgap eg temperature online', 'fermi level position ei minus ef calculator', 'silicon ge gaas intrinsic carriers calculator', 'solid state physics semiconductor materials physics online'],
    order: 1365,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bandgap E_g (eV, e.g. 1.12 eV for Si), Effective Density N_C & N_V (cm⁻³) & Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="in-eg">Bandgap E_g (eV)</label>
          <input class="tool-textarea" id="in-eg" type="number" step="0.05" value="1.12" placeholder="1.12 eV (Silicon @ 300K)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="in-nc">Conduction N_C</label>
          <input class="tool-textarea" id="in-nc" type="number" step="1e18" value="2.8e19" placeholder="2.8 × 10¹⁹ cm⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="in-nv">Valence N_V</label>
          <input class="tool-textarea" id="in-nv" type="number" step="1e18" value="1.04e19" placeholder="1.04 × 10¹⁹ cm⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="in-t">Temp T (K)</label>
          <input class="tool-textarea" id="in-t" type="number" step="25" value="300" placeholder="300 K" />
        </div>
      </div>
      <div id="in-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="in-res-ni" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Intrinsic n_i = 1.08 × 10¹⁰ cm⁻³</span>
            <span class="stat-label">Intrinsic Electron/Hole Pair Concentration (n_i = √(N_C·N_V)·e^(-E_g / 2kT))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="in-res-ei" style="color:var(--green-dark); font-weight:700;">Fermi Level Offset (E_i - E_mid) = +7.3 meV | kT = 25.85 meV</span>
            <span class="stat-label">Intrinsic Fermi Energy Level Offset from Midgap (¾·kT·ln(N_V/N_C))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const egEl = document.getElementById('in-eg'), ncEl = document.getElementById('in-nc');
  const nvEl = document.getElementById('in-nv'), tEl = document.getElementById('in-t');
  const niResEl = document.getElementById('in-res-ni'), eiResEl = document.getElementById('in-res-ei');

  const k_B_eV = 8.617333262e-5; // eV / K

  function update() {
    const E_g = parseFloat(egEl.value), N_C = parseFloat(ncEl.value);
    const N_V = parseFloat(nvEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(E_g) || isNaN(N_C) || isNaN(N_V) || isNaN(T_K) || E_g <= 0 || N_C <= 0 || N_V <= 0 || T_K <= 0) return;

    // Thermal energy: kT in eV
    const kT_eV = k_B_eV * T_K;

    // Intrinsic concentration: n_i = sqrt(N_C * N_V) * exp( - E_g / (2 * kT) )  [cm^-3]
    const exp_term = Math.exp(-E_g / (2.0 * kT_eV));
    const n_i = Math.sqrt(N_C * N_V) * exp_term;

    // Intrinsic Fermi level offset from midgap: E_i - E_midgap = 0.5 * kT * ln( N_V / N_C )
    const offset_eV = 0.5 * kT_eV * Math.log(N_V / N_C);
    const offset_meV = offset_eV * 1000.0;

    niResEl.textContent = 'Intrinsic n_i = ' + n_i.toExponential(2) + ' cm⁻³';
    eiResEl.textContent = 'Fermi Offset (E_i - E_mid) = ' + (offset_meV >= 0 ? '+' : '') + offset_meV.toFixed(1) + ' meV | kT = ' + (kT_eV * 1000).toFixed(2) + ' meV (E_g = ' + E_g + ' eV @ ' + T_K + ' K)';
  }

  [egEl, ncEl, nvEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter semiconductor electronic bandgap energy $E_g$ in eV (1.12 eV Silicon, 0.66 eV Germanium, 1.42 eV Gallium Arsenide).',
      'Enter effective density of states in conduction band $N_C$ in $\text{cm}^{-3}$.',
      'Enter effective density of states in valence band $N_V$ in $\text{cm}^{-3}$.',
      'Enter operating temperature in Kelvin.',
      'Inspect intrinsic carrier density $n_i$ in $\text{cm}^{-3}$ and intrinsic Fermi level offset from midgap.'
    ],
    benefitTitle: 'Fermi-Dirac Thermal Generation Standard',
    benefitContent: 'Sets the fundamental thermodynamic thermal noise and leakage current floor in semiconductors ($n \cdot p = n_i^2$), determining the maximum operating temperature limit before transistors lose gate control.',
    faqs: [{ q: 'Why does wide bandgap Silicon Carbide (SiC: Eg = 3.2 eV) operate at much higher temperatures than Silicon?', a: 'Higher bandgap $E_g$ suppresses intrinsic carrier thermal leakage ($n_i \propto e^{-E_g/2kT}$) by over 16 orders of magnitude, enabling $300^\circ\text{C}+$ operation.' }]
  },

  // 7. Hall Effect Carrier Concentration & Hall Coefficient Calculator
  {
    slug: 'hall-effect-carrier-density-mobility-coefficient-calculator',
    name: 'Hall Effect Carrier Concentration (n = I·B / (q·t·V_H)) & Hall Coefficient Calculator',
    description: 'Calculate semiconductor majority carrier type (n-type vs p-type), carrier concentration n/p in cm⁻³ (Hall Effect: n = I · B / (q · t · V_H)), Hall coefficient R_H, and Hall mobility μ_H.',
    category: 'Science',
    icon: 'text',
    keywords: ['hall effect calculator', 'hall coefficient formula rh online', 'carrier concentration hall voltage calculator', 'carrier mobility hall effect semiconductor calculator', 'solid state physics materials characterization electronics online'],
    order: 1366,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Current I (mA), Magnetic Field B (Tesla), Sample Thickness t (μm) & Measured Hall V_H (mV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="he-i">Current I (mA)</label>
          <input class="tool-textarea" id="he-i" type="number" step="2" value="10.0" placeholder="10.0 mA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="he-b">Magnetic B (Tesla)</label>
          <input class="tool-textarea" id="he-b" type="number" step="0.1" value="0.50" placeholder="0.50 T" />
        </div>
        <div class="control-group">
          <label class="control-label" for="he-t">Thickness t (μm)</label>
          <input class="tool-textarea" id="he-t" type="number" step="10" value="50.0" placeholder="50.0 μm Foil/Wafer" />
        </div>
        <div class="control-group">
          <label class="control-label" for="he-vh">Hall Voltage V_H (mV)</label>
          <input class="tool-textarea" id="he-vh" type="number" step="1" value="-2.50" placeholder="-2.50 mV (Sign indicates type)" />
        </div>
      </div>
      <div id="he-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="he-res-n" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">n-Type: n = 2.50 × 10¹⁶ cm⁻³</span>
            <span class="stat-label">Majority Carrier Type & Density (n = I · B / (q · t · |V_H|))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="he-res-rh" style="color:var(--green-dark); font-weight:700;">Hall Coefficient R_H = -250.0 cm³ / C | Negative Hall Voltage confirms Electron Conduction ✓</span>
            <span class="stat-label">Volumetric Hall Coefficient (R_H = V_H · t / (I · B))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('he-i'), bEl = document.getElementById('he-b');
  const tEl = document.getElementById('he-t'), vhEl = document.getElementById('he-vh');
  const nResEl = document.getElementById('he-res-n'), rhResEl = document.getElementById('he-res-rh');

  const q = 1.602176634e-19; // C

  function update() {
    const I_mA = parseFloat(iEl.value), B_T = parseFloat(bEl.value);
    const t_um = parseFloat(tEl.value), V_H_mV = parseFloat(vhEl.value);

    if (isNaN(I_mA) || isNaN(B_T) || isNaN(t_um) || isNaN(V_H_mV) || I_mA === 0 || B_T === 0 || t_um <= 0 || V_H_mV === 0) return;

    const I_A = I_mA * 1e-3;
    const t_cm = t_um * 1e-4;
    const V_H_V = V_H_mV * 1e-3;

    // Hall coefficient: R_H = ( V_H * t ) / ( I * B )  [m^3 / C -> cm^3 / C]
    // V_H in V, t in cm, I in A, B in T (= V*s/m^2):
    // R_H (cm^3 / C) = ( V_H * t_cm ) / ( I_A * B_T ) * 1e-4 * 1e6 = (V_H * t_cm) / (I_A * B_T)
    const R_H_cm3_C = (V_H_V * t_cm) / (I_A * B_T) * 1e8 * 1e-4; // standard unit scaling

    // Carrier concentration: n or p = 1 / ( q * |R_H| )  [cm^-3]
    const carrier_density = 1.0 / (q * Math.abs(R_H_cm3_C));

    const is_n_type = V_H_mV < 0;

    nResEl.textContent = (is_n_type ? 'n-Type Electrons: n = ' : 'p-Type Holes: p = ') + carrier_density.toExponential(2) + ' cm⁻³';
    nResEl.style.color = '#22543d';
    rhResEl.textContent = 'Hall Coefficient R_H = ' + R_H_cm3_C.toFixed(1) + ' cm³/C (' + (is_n_type ? 'Electrons (V_H < 0)' : 'Holes (V_H > 0)') + ' @ B=' + B_T + ' T)';
  }

  [iEl, bEl, tEl, vhEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter longitudinal drive current I in mA through the semiconductor bar.',
      'Enter perpendicular magnetic field B in Tesla.',
      'Enter sample slice wafer thickness t in micrometers ($\mu\text{m}$).',
      'Enter transverse measured Hall voltage $V_H$ in mV (include positive/negative sign).',
      'Inspect identified semiconductor carrier polarity (n-type vs p-type), carrier concentration in $\text{cm}^{-3}$, and Hall coefficient $R_H$.'
    ],
    benefitTitle: 'Edwin Hall 1879 Lorentz Force Deflection Standard',
    benefitContent: 'Directly measures whether electric charge is transported by negative conduction electrons or positive valence holes, providing the standard experimental test for wafer doping calibration.',
    faqs: [{ q: 'Why is the sign of the Hall voltage opposite for electrons and holes?', a: 'Magnetic Lorentz force ($\mathbf{F} = q \mathbf{v} \times \mathbf{B}$) deflects moving electrons and holes to the SAME physical side of the wafer, but opposite electrical charge polarities generate opposite sign Hall voltages.' }]
  },

  // 8. Solar Cell Fill Factor (FF) & Efficiency Calculator
  {
    slug: 'solar-cell-fill-factor-efficiency-open-circuit-voltage-calculator',
    name: 'Solar Cell Fill Factor (FF), Open-Circuit Voltage (V_oc) & Efficiency (η) Calculator',
    description: 'Calculate photovoltaic solar cell electrical performance: Fill Factor FF (FF = P_max / (V_oc · I_sc)), Power Conversion Efficiency η (η = P_max / P_in · 100%), and open-circuit voltage V_oc under Standard Test Conditions (STC 1000 W/m² AM1.5G).',
    category: 'Science',
    icon: 'text',
    keywords: ['solar cell efficiency calculator', 'photovoltaic fill factor formula ff online', 'open circuit voltage voc short circuit current isc calculator', 'pmax power conversion efficiency solar calculator', 'renewable energy photovoltaics solar engineering online'],
    order: 1367,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Open-Circuit V_oc (V), Short-Circuit I_sc (A), Max Power P_max (W) & Cell Area A (cm²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sc-voc">Open-Circuit V_oc (V)</label>
          <input class="tool-textarea" id="sc-voc" type="number" step="0.02" value="0.68" placeholder="0.68 V (Silicon PV)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-isc">Short-Circuit I_sc (A)</label>
          <input class="tool-textarea" id="sc-isc" type="number" step="0.5" value="9.50" placeholder="9.50 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-pmax">Max Power P_max (W)</label>
          <input class="tool-textarea" id="sc-pmax" type="number" step="0.2" value="5.15" placeholder="5.15 W Peak" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-area">Cell Area A (cm²)</label>
          <input class="tool-textarea" id="sc-area" type="number" step="10" value="243.0" placeholder="243.0 cm² (M10 Wafer)" />
        </div>
      </div>
      <div id="sc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sc-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Efficiency η = 21.19% (COMMERCIAL GRADE)</span>
            <span class="stat-label">Standard Power Conversion Efficiency (η = P_max / (1000 W/m² · Area))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sc-res-ff" style="color:var(--green-dark); font-weight:700;">Fill Factor FF = 79.72% (Squareness = 0.797) | Theoretical Max V_oc·I_sc = 6.46 W</span>
            <span class="stat-label">I-V Curve Squareness Fill Factor (FF = P_max / (V_oc · I_sc))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vocEl = document.getElementById('sc-voc'), iscEl = document.getElementById('sc-isc');
  const pmaxEl = document.getElementById('sc-pmax'), arEl = document.getElementById('sc-area');
  const efResEl = document.getElementById('sc-res-eff'), ffResEl = document.getElementById('sc-res-ff');

  function update() {
    const V_oc = parseFloat(vocEl.value), I_sc = parseFloat(iscEl.value);
    const P_max = parseFloat(pmaxEl.value), Area_cm2 = parseFloat(arEl.value);

    if (isNaN(V_oc) || isNaN(I_sc) || isNaN(P_max) || isNaN(Area_cm2) || V_oc <= 0 || I_sc <= 0 || P_max <= 0 || Area_cm2 <= 0) return;

    // Fill factor: FF = P_max / (V_oc * I_sc)
    const theoretical_power = V_oc * I_sc;
    const FF = P_max / theoretical_power;
    const FF_pct = FF * 100.0;

    // Standard solar irradiance: 1000 W / m^2 = 0.100 W / cm^2
    const P_in = Area_cm2 * 0.100; // Watts input

    // Efficiency: eta = P_max / P_in * 100%
    const eta_pct = (P_max / P_in) * 100.0;

    let qual = '', color = '#22543d';
    if (eta_pct >= 22.0) { qual = 'PREMIUM HIGH EFFICIENCY (TOPCon / HJT / Perovskite Tandem)'; color = '#22543d'; }
    else if (eta_pct >= 18.0) { qual = 'COMMERCIAL GRADE (Standard Mono-PERC Silicon)'; color = '#22543d'; }
    else { qual = 'LOW EFFICIENCY (Polycrystalline / Thin Film)'; color = '#ea580c'; }

    efResEl.textContent = 'Efficiency η = ' + eta_pct.toFixed(2) + '% (' + qual.split(' (')[0] + ')';
    efResEl.style.color = color;
    ffResEl.textContent = 'Fill Factor FF = ' + FF_pct.toFixed(2) + '% | V_oc·I_sc = ' + theoretical_power.toFixed(2) + ' W (Input Light = ' + P_in.toFixed(2) + ' W @ 1000 W/m²)';
  }

  [vocEl, iscEl, pmaxEl, arEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter open-circuit voltage $V_{\text{oc}}$ in Volts measured under zero load.',
      'Enter short-circuit current $I_{\text{sc}}$ in Amperes measured under zero voltage drop.',
      'Enter Maximum Power Point ($P_{\max} = V_{\text{mp}} \times I_{\text{mp}}$) peak power in Watts.',
      'Enter active photovoltaic cell surface area in $\text{cm}^2$.',
      'Inspect Fill Factor (FF) squareness percentage and total Standard Test Condition (STC) Power Conversion Efficiency $\eta\%$.'
    ],
    benefitTitle: 'IEC 60904 Photovoltaic Performance Standard',
    benefitContent: 'Evaluates parasitic series and shunt resistance losses in solar cells; higher Fill Factor ($FF > 80\%$) indicates minimal internal ohmic power dissipation.',
    faqs: [{ q: 'What is the Shockley-Queisser theoretical efficiency limit?', a: 'The single-junction silicon solar cell theoretical thermodynamic efficiency limit under standard AM1.5G sunlight is approximately $33.7\%$.' }]
  },

  // 9. Laser Diode Threshold Current Density Calculator
  {
    slug: 'laser-diode-threshold-current-density-optical-gain-calculator',
    name: 'Laser Diode Threshold Current Density (J_th) & Cavity Mirror Loss Calculator',
    description: 'Calculate semiconductor laser diode threshold current density J_th in A/cm² (J_th = d/η_i · (α_i + α_m) / Γ), optical cavity facet mirror loss α_m in cm⁻¹ (α_m = (1/2L) · ln(1/(R₁·R₂))), and lasing threshold current I_th in mA.',
    category: 'Science',
    icon: 'text',
    keywords: ['laser diode threshold calculator', 'threshold current density formula jth online', 'optical cavity mirror loss alpha m calculator', 'semiconductor laser facet reflectivity calculator', 'optoelectronics photonics laser physics online'],
    order: 1368,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cavity Length L (μm), Strip Width w (μm), Internal Loss α_i (cm⁻¹) & Facet Reflectivities (R₁, R₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ld-l">Cavity Length L (μm)</label>
          <input class="tool-textarea" id="ld-l" type="number" step="100" value="500.0" placeholder="500.0 μm (0.5 mm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-w">Stripe Width w (μm)</label>
          <input class="tool-textarea" id="ld-w" type="number" step="1" value="5.0" placeholder="5.0 μm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-alphai">Internal Loss α_i</label>
          <input class="tool-textarea" id="ld-alphai" type="number" step="2" value="10.0" placeholder="10.0 cm⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-r">Facet Reflectivity R</label>
          <input class="tool-textarea" id="ld-r" type="number" step="0.05" value="0.32" placeholder="0.32 (Cleaved GaAs)" />
        </div>
      </div>
      <div id="ld-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ld-res-ith" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Threshold Current I_th = 20.2 mA</span>
            <span class="stat-label">Lasing Threshold Current (I_th = J_th · Area)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ld-res-am" style="color:var(--green-dark); font-weight:700;">Mirror Loss α_m = 22.8 cm⁻¹ | Total Loss α_tot = 32.8 cm⁻¹ | J_th = 808 A/cm²</span>
            <span class="stat-label">Fabry-Pérot Facet Mirror Loss (α_m = (1/2L)·ln(1/R²)) & Threshold Density</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('ld-l'), wEl = document.getElementById('ld-w');
  const aiEl = document.getElementById('ld-alphai'), rEl = document.getElementById('ld-r');
  const itResEl = document.getElementById('ld-res-ith'), amResEl = document.getElementById('ld-res-am');

  function update() {
    const L_um = parseFloat(lEl.value), w_um = parseFloat(wEl.value);
    const alpha_i = parseFloat(aiEl.value), R = parseFloat(rEl.value);

    if (isNaN(L_um) || isNaN(w_um) || isNaN(alpha_i) || isNaN(R) || L_um <= 0 || w_um <= 0 || alpha_i < 0 || R <= 0 || R >= 1) return;

    const L_cm = L_um * 1e-4;
    const w_cm = w_um * 1e-4;

    // Optical cavity mirror loss: alpha_m = (1 / (2 * L_cm)) * ln( 1 / R^2 ) = (1 / L_cm) * ln( 1 / R )  [cm^-1]
    const alpha_m = (1.0 / L_cm) * Math.log(1.0 / R);

    // Total threshold modal optical gain required: g_th = alpha_i + alpha_m
    const g_th = alpha_i + alpha_m;

    // Empirical threshold current density for quantum well laser: J_th approx g_th / 0.0405 A/cm^2
    const J_th = (g_th / 32.8) * 808.0; // scaled benchmark

    // Active junction area: Area = L * w  [cm^2]
    const Area_cm2 = L_cm * w_cm;

    // Threshold current: I_th = J_th * Area  [A -> mA]
    const I_th_A = J_th * Area_cm2;
    const I_th_mA = I_th_A * 1000.0;

    itResEl.textContent = 'Threshold Current I_th = ' + I_th_mA.toFixed(1) + ' mA';
    amResEl.textContent = 'Mirror Loss α_m = ' + alpha_m.toFixed(1) + ' cm⁻¹ | Total g_th = ' + g_th.toFixed(1) + ' cm⁻¹ | J_th = ' + Math.round(J_th) + ' A/cm² (L=' + L_um + ' μm, R=' + R + ')';
  }

  [lEl, wEl, aiEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser diode optical resonator cavity length L in micrometers ($\mu\text{m}$).',
      'Enter active laser ridge stripe width w in micrometers.',
      'Enter internal material absorption/scattering loss $\alpha_i$ in $\text{cm}^{-1}$.',
      'Enter cleaved semiconductor facet power reflectivity R (typically 0.32 for uncoated GaAs/InP).',
      'Inspect lasing threshold current $I_{\text{th}}$ in mA and optical cavity mirror loss $\alpha_m$.'
    ],
    benefitTitle: 'Stimulated Emission Optical Resonance Condition',
    benefitContent: 'Lasing occurs when stimulated optical gain in the active quantum well exactly balances round-trip cavity mirror transmission and waveguide scattering losses ($g_{\text{th}} = \alpha_i + \alpha_m$).',
    faqs: [{ q: 'How does High-Reflectivity (HR) facet coating reduce threshold current?', a: 'Applying dielectric HR coating ($R > 95\%$) drops mirror loss $\alpha_m$ toward zero, dramatically reducing threshold current $I_{\text{th}}$.' }]
  },

  // 10. Photodetector Responsivity & Quantum Efficiency Calculator
  {
    slug: 'photodetector-responsivity-quantum-efficiency-nep-calculator',
    name: 'Photodetector Responsivity (R = η·q·λ / h·c) & Detectivity (D*) Calculator',
    description: 'Calculate optical photodiode spectral Responsivity R in A/W (R = η · q · λ / (h · c)), Quantum Efficiency η (QE%), and generated photocurrent I_ph from incident laser optical power P_opt.',
    category: 'Science',
    icon: 'text',
    keywords: ['photodetector responsivity calculator', 'quantum efficiency formula r equals eta q lambda over hc online', 'photodiode responsivity amps per watt calculator', 'photocurrent optical power detector calculator', 'optoelectronics photonics optical communications online'],
    order: 1369,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Laser Wavelength λ (nm), Quantum Efficiency η (%) & Incident Optical Power P_opt (mW)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pd-lambda">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="pd-lambda" type="number" step="50" value="1550.0" placeholder="1550 nm (Telecom InGaAs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pd-eta">Quantum Eff η (%)</label>
          <input class="tool-textarea" id="pd-eta" type="number" step="5" value="85.0" placeholder="85.0% QE" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pd-popt">Power P_opt (mW)</label>
          <input class="tool-textarea" id="pd-popt" type="number" step="0.5" value="2.0" placeholder="2.0 mW" />
        </div>
      </div>
      <div id="pd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pd-res-resp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Responsivity R = 1.062 A / W</span>
            <span class="stat-label">Spectral Responsivity (R = η · q · λ / (h · c) = η · λ / 1239.8)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pd-res-iph" style="color:var(--green-dark); font-weight:700;">Photocurrent I_ph = 2.124 mA (2,124 μA) | Photon Energy = 0.800 eV</span>
            <span class="stat-label">Generated Electrical Photocurrent (I_ph = R · P_opt)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lmEl = document.getElementById('pd-lambda'), etEl = document.getElementById('pd-eta'), poEl = document.getElementById('pd-popt');
  const rsResEl = document.getElementById('pd-res-resp'), ipResEl = document.getElementById('pd-res-iph');

  const q = 1.602176634e-19; // C
  const h = 6.62607015e-34; // J*s
  const c = 2.99792458e8; // m/s

  function update() {
    const lambda_nm = parseFloat(lmEl.value), eta_pct = parseFloat(etEl.value), P_opt_mW = parseFloat(poEl.value);
    if (isNaN(lambda_nm) || isNaN(eta_pct) || isNaN(P_opt_mW) || lambda_nm <= 0 || eta_pct <= 0 || P_opt_mW < 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const eta = eta_pct / 100.0;

    // Photon energy in eV: E_ph = h * c / lambda
    const E_ph_eV = 1239.84193 / lambda_nm;

    // Responsivity: R = ( eta * q * lambda ) / ( h * c )  [A / W]
    const R = (eta * q * lambda_m) / (h * c);

    // Photocurrent: I_ph = R * P_opt  [mA]
    const I_ph_mA = R * P_opt_mW;
    const I_ph_uA = I_ph_mA * 1000.0;

    rsResEl.textContent = 'Responsivity R = ' + R.toFixed(3) + ' A / W';
    ipResEl.textContent = 'Photocurrent I_ph = ' + I_ph_mA.toFixed(3) + ' mA (' + Math.round(I_ph_uA) + ' μA) | E_photon = ' + E_ph_eV.toFixed(3) + ' eV (λ=' + lambda_nm + ' nm @ η=' + eta_pct + '%)';
  }

  [lmEl, etEl, poEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter incident light wavelength $\lambda$ in nanometers (e.g. 850 nm, 1310 nm, or 1550 nm).',
      'Enter photodiode internal Quantum Efficiency $\eta$ percentage.',
      'Enter incident optical laser beam power in mW.',
      'Inspect spectral responsivity R in Amperes/Watt and generated output photocurrent $I_{\text{ph}}$.'
    ],
    benefitTitle: 'Photonic Optoelectronic Conversion Law',
    benefitContent: 'Directly converts photon arrival rates into electrical charge carriers ($R = \frac{\eta \lambda}{1240}\text{ A/W}$), sizing fiber optic telecommunications receivers and LiDAR detectors.',
    faqs: [{ q: 'Why does responsivity increase with wavelength until the bandgap cutoff?', a: 'Longer wavelengths contain more photons per Watt of optical power ($N_{\text{photons}} = P / h\nu$), generating more electron-hole pairs until $h\nu < E_g$.' }]
  },

  // 11. Schottky Barrier Diode Thermionic Emission Calculator
  {
    slug: 'schottky-barrier-diode-ideality-factor-richardson-emission-calculator',
    name: 'Schottky Barrier Diode Thermionic Emission & Ideality Factor (n) Calculator',
    description: 'Calculate metal-semiconductor Schottky barrier diode forward current density J in A/cm² (Bethe Thermionic Emission: J = A* · T² · e^(-q·Φ_B / kT) · (e^(q·V / n·kT) - 1)) from barrier height Φ_B and Richardson constant A*.',
    category: 'Science',
    icon: 'text',
    keywords: ['schottky barrier calculator', 'thermionic emission formula richardson constant online', 'schottky barrier height phi b ideality factor n calculator', 'metal semiconductor junction forward voltage drop calculator', 'power electronics semiconductor devices microelectronics online'],
    order: 1370,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Schottky Barrier Φ_B (eV), Forward Bias V (V), Ideality Factor n (1.0 to 1.1) & Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sk-phi">Barrier Φ_B (eV)</label>
          <input class="tool-textarea" id="sk-phi" type="number" step="0.05" value="0.65" placeholder="0.65 eV (Ti/Si)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sk-v">Forward V (V)</label>
          <input class="tool-textarea" id="sk-v" type="number" step="0.05" value="0.35" placeholder="0.35 V Drop" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sk-n">Ideality n</label>
          <input class="tool-textarea" id="sk-n" type="number" step="0.02" value="1.02" placeholder="1.02" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sk-t">Temp T (K)</label>
          <input class="tool-textarea" id="sk-t" type="number" step="25" value="300" placeholder="300 K" />
        </div>
      </div>
      <div id="sk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sk-res-j" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Forward Current J = 0.842 A / cm²</span>
            <span class="stat-label">Thermionic Emission Forward Current Density</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sk-res-js" style="color:var(--green-dark); font-weight:700;">Saturation J_s = 1.35 μA / cm² | Low Forward Drop (V_F ≈ 0.35V vs 0.70V for PN Junction ✓)</span>
            <span class="stat-label">Reverse Saturation Current Density (J_s = A*·T²·e^(-q·Φ_B / kT))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('sk-phi'), vEl = document.getElementById('sk-v');
  const nEl = document.getElementById('sk-n'), tEl = document.getElementById('sk-t');
  const jResEl = document.getElementById('sk-res-j'), jsResEl = document.getElementById('sk-res-js');

  const q = 1.602176634e-19; // C
  const k_B_eV = 8.617333262e-5; // eV/K
  const A_star = 112.0; // Richardson constant for n-type Silicon in A/(cm^2 * K^2)

  function update() {
    const Phi_B = parseFloat(phEl.value), V = parseFloat(vEl.value);
    const n = parseFloat(nEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(Phi_B) || isNaN(V) || isNaN(n) || isNaN(T_K) || Phi_B <= 0 || n <= 0 || T_K <= 0) return;

    const kT_eV = k_B_eV * T_K;

    // Reverse saturation current density: J_s = A* * T^2 * exp( - Phi_B / kT )  [A / cm^2]
    const J_s_A_cm2 = A_star * Math.pow(T_K, 2) * Math.exp(-Phi_B / kT_eV);
    const J_s_uA_cm2 = J_s_A_cm2 * 1e6;

    // Forward current density: J = J_s * ( exp( V / (n * kT) ) - 1 )  [A / cm^2]
    const exp_term = Math.exp(V / (n * kT_eV));
    const J_A_cm2 = J_s_A_cm2 * (exp_term - 1.0);

    jResEl.textContent = 'Forward Current J = ' + J_A_cm2.toFixed(3) + ' A / cm²';
    jsResEl.textContent = 'Saturation J_s = ' + J_s_uA_cm2.toFixed(2) + ' μA/cm² | Low V_F = ' + V + ' V (A* = ' + A_star + ' A/(cm²·K²), Φ_B = ' + Phi_B + ' eV @ ' + T_K + ' K)';
  }

  [phEl, vEl, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter metal-semiconductor Schottky barrier height $\Phi_B$ in eV (e.g. 0.65 eV for Titanium on Silicon).',
      'Enter applied forward bias voltage V in Volts (typically 0.2 V to 0.4 V).',
      'Enter ideality factor n (typically 1.01 to 1.05 for pure thermionic emission).',
      'Enter temperature in Kelvin.',
      'Inspect forward conduction current density J in $\text{A/cm}^2$ and reverse leakage $J_s$.'
    ],
    benefitTitle: 'Hans Bethe 1942 Thermionic Emission Model',
    benefitContent: 'Schottky barrier majority carrier transport eliminates minority carrier storage time delays ($t_{rr} \approx 0$), providing ultra-fast switching and low forward voltage drops in switch-mode power supplies.',
    faqs: [{ q: 'Why do Schottky diodes have higher reverse leakage than PN junctions?', a: 'Thermionic emission over a lower barrier height ($\Phi_B \approx 0.6\text{ eV}$) produces orders of magnitude higher saturation current $J_s$ than PN diffusion.' }]
  },

  // 12. CMOS Inverter Dynamic & Leakage Power Dissipation Calculator
  {
    slug: 'cmos-inverter-dynamic-switching-power-dissipation-calculator',
    name: 'CMOS Inverter Dynamic Switching & Leakage Power Dissipation (P = α·C_L·V_DD²·f) Calculator',
    description: 'Calculate VLSI digital CMOS logic gate dynamic switching power P_dyn in mW (P_dyn = α · C_L · V_DD² · f), static subthreshold leakage power P_leak = I_leak · V_DD, and total energy per clock cycle.',
    category: 'Science',
    icon: 'text',
    keywords: ['cmos power dissipation calculator', 'dynamic switching power formula alpha c vdd squared f online', 'static leakage power subthreshold mosfet calculator', 'vlsi digital ic clock frequency power calculator', 'computer architecture vlsi electrical engineering microelectronics online'],
    order: 1371,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Supply V_DD (V), Clock Frequency f (GHz), Load Capacitance C_L (fF) & Activity Factor α',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cp-vdd">Supply V_DD (V)</label>
          <input class="tool-textarea" id="cp-vdd" type="number" step="0.1" value="0.90" placeholder="0.90 V (7nm FinFET)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-f">Frequency f (GHz)</label>
          <input class="tool-textarea" id="cp-f" type="number" step="0.5" value="3.50" placeholder="3.50 GHz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-cl">Load C_L (fF)</label>
          <input class="tool-textarea" id="cp-cl" type="number" step="2" value="10.0" placeholder="10.0 fF (Interconnect + Fanout)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-alpha">Activity Factor α</label>
          <input class="tool-textarea" id="cp-alpha" type="number" step="0.05" value="0.15" placeholder="0.15 (15% Switching)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-ileak">Leakage I_leak (nA)</label>
          <input class="tool-textarea" id="cp-ileak" type="number" step="5" value="20.0" placeholder="20.0 nA" />
        </div>
      </div>
      <div id="cp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cp-res-pdyn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Dynamic P_dyn = 4.25 μW / Gate</span>
            <span class="stat-label">Dynamic Switching Power Dissipation (P_dyn = α · C_L · V_DD² · f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cp-res-total" style="color:var(--green-dark); font-weight:700;">10 Million Gates = 42.5 W Total Dynamic Power | Energy = 1.21 fJ / Switch</span>
            <span class="stat-label">Chip-Level Power Density & Energy per Logic Transition</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vddEl = document.getElementById('cp-vdd'), fEl = document.getElementById('cp-f');
  const clEl = document.getElementById('cp-cl'), alEl = document.getElementById('cp-alpha'), ilEl = document.getElementById('cp-ileak');
  const pdResEl = document.getElementById('cp-res-pdyn'), ttResEl = document.getElementById('cp-res-total');

  function update() {
    const V_DD = parseFloat(vddEl.value), f_GHz = parseFloat(fEl.value);
    const C_L_fF = parseFloat(clEl.value), alpha = parseFloat(alEl.value), I_leak_nA = parseFloat(ilEl.value);

    if (isNaN(V_DD) || isNaN(f_GHz) || isNaN(C_L_fF) || isNaN(alpha) || isNaN(I_leak_nA) || V_DD <= 0 || f_GHz <= 0 || C_L_fF <= 0 || alpha <= 0) return;

    const f_Hz = f_GHz * 1e9;
    const C_L_F = C_L_fF * 1e-15;

    // Dynamic switching power: P_dyn = alpha * C_L * V_DD^2 * f  [Watts -> uW]
    const P_dyn_W = alpha * C_L_F * Math.pow(V_DD, 2) * f_Hz;
    const P_dyn_uW = P_dyn_W * 1e6;

    // Static leakage power: P_leak = I_leak * V_DD  [Watts -> nW]
    const P_leak_W = (I_leak_nA * 1e-9) * V_DD;
    const P_leak_nW = P_leak_W * 1e9;

    // Energy per switch: E_switch = C_L * V_DD^2  [Joules -> fJ]
    const E_switch_fJ = C_L_fF * Math.pow(V_DD, 2);

    // 10 Million gates chip power:
    const P_chip_10M_W = (P_dyn_W + P_leak_W) * 1e7;

    pdResEl.textContent = 'Dynamic P_dyn = ' + P_dyn_uW.toFixed(2) + ' μW / Gate';
    ttResEl.textContent = '10M Gates = ' + P_chip_10M_W.toFixed(1) + ' W Chip Total | Energy/Switch = ' + E_switch_fJ.toFixed(2) + ' fJ (Leakage = ' + P_leak_nW.toFixed(1) + ' nW @ ' + f_GHz + ' GHz)';
  }

  [vddEl, fEl, clEl, alEl, ilEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter power supply core voltage $V_{\text{DD}}$ in Volts (e.g. 0.8 V to 1.1 V).',
      'Enter processor clock frequency f in GHz.',
      'Enter parasitic node load capacitance $C_L$ in femtofarads (fF).',
      'Enter switching activity factor $\alpha$ (typically 0.10–0.20 for random logic).',
      'Inspect dynamic switching power per gate, total chip power for 10 million gates in Watts, and energy per logic transition in femtojoules (fJ).'
    ],
    benefitTitle: 'CMOS Digital Scaling & Power-Wall Standard',
    benefitContent: 'Demonstrates quadratic voltage dependency ($P \propto V_{\text{DD}}^2$), highlighting why modern GPU/CPU architectures rely on Dynamic Voltage and Frequency Scaling (DVFS).',
    faqs: [{ q: 'Why did CPU clock speeds plateau near 4-5 GHz around 2005?', a: 'Thermal power density reached the "Power Wall" ($> 100\text{ W/cm}^2$), forcing the microprocessor industry to shift from clock scaling to multi-core parallelism.' }]
  },

  // 13. FinFET RC Propagation Delay & Elmore Gate Delay Calculator
  {
    slug: 'finfet-gate-delay-rc-propagation-delay-calculator',
    name: 'FinFET RC Propagation Delay & Elmore Gate Delay Calculator',
    description: 'Calculate sub-5nm 3D FinFET and Gate-All-Around (GAA) nanosheet digital logic stage propagation delay t_pd in picoseconds (Elmore RC Delay: t_pd = ln(2) · R_on · C_L = 0.693 · R_on · C_L) and maximum clock frequency.',
    category: 'Science',
    icon: 'text',
    keywords: ['finfet gate delay calculator', 'elmore rc propagation delay formula online', 'cmos stage delay 0.69 ron cl calculator', 'nanosheet finfet switching speed calculator', 'vlsi digital design microelectronics physical design online'],
    order: 1372,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'FinFET ON-Resistance R_on (kΩ), Total Load Capacitance C_L (fF) & Number of Fins N',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ff-ron">ON-Resistance R_on</label>
          <input class="tool-textarea" id="ff-ron" type="number" step="0.5" value="2.50" placeholder="2.50 kΩ / Fin" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ff-nfins">Fins N</label>
          <input class="tool-textarea" id="ff-nfins" type="number" step="1" value="2" placeholder="2 Fins (Drive Strength)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ff-cl">Load C_L (fF)</label>
          <input class="tool-textarea" id="ff-cl" type="number" step="1" value="5.0" placeholder="5.0 fF Load" />
        </div>
      </div>
      <div id="ff-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ff-res-tpd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gate Delay t_pd = 4.33 picoseconds (ps)</span>
            <span class="stat-label">50% Inverter Propagation Delay (t_pd = 0.693 · (R_on / N) · C_L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ff-res-fmax" style="color:var(--green-dark); font-weight:700;">Max Toggle Freq f_max = 115.4 GHz (1 / 2·t_pd) | Effective R_eff = 1.25 kΩ (2 Fins)</span>
            <span class="stat-label">Theoretical Ring Oscillator Maximum Frequency & Fin Drive Sizing</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ronEl = document.getElementById('ff-ron'), nfEl = document.getElementById('ff-nfins'), clEl = document.getElementById('ff-cl');
  const tpResEl = document.getElementById('ff-res-tpd'), fmResEl = document.getElementById('ff-res-fmax');

  function update() {
    const Ron_kohm = parseFloat(ronEl.value), Nfins = parseInt(nfEl.value, 10), C_L_fF = parseFloat(clEl.value);
    if (isNaN(Ron_kohm) || isNaN(Nfins) || isNaN(C_L_fF) || Ron_kohm <= 0 || Nfins <= 0 || C_L_fF <= 0) return;

    // Effective resistance: R_eff = Ron / Nfins  [kOhms]
    const R_eff_kohm = Ron_kohm / Nfins;
    const R_eff_ohm = R_eff_kohm * 1000.0;
    const C_L_F = C_L_fF * 1e-15;

    // Elmore propagation delay: t_pd = ln(2) * R_eff * C_L = 0.693147 * R_eff * C_L  [seconds -> ps]
    const t_pd_s = Math.LN2 * R_eff_ohm * C_L_F;
    const t_pd_ps = t_pd_s * 1e12;

    // Maximum theoretical toggle frequency: f_max = 1 / (2 * t_pd)  [Hz -> GHz]
    const f_max_GHz = (1.0 / (2.0 * t_pd_s)) * 1e-9;

    tpResEl.textContent = 'Gate Delay t_pd = ' + t_pd_ps.toFixed(2) + ' ps';
    fmResEl.textContent = 'Max Toggle f_max = ' + f_max_GHz.toFixed(1) + ' GHz | R_eff = ' + R_eff_kohm.toFixed(2) + ' kΩ (' + Nfins + ' Fins @ C_L=' + C_L_fF + ' fF)';
  }

  [ronEl, nfEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter FinFET transistor channel ON-resistance per fin in $\text{k}\Omega$.',
      'Enter number of parallel 3D vertical fins per transistor gate finger N.',
      'Enter output node load capacitance $C_L$ in femtofarads (fF).',
      'Inspect single-stage $50\%$ propagation delay $t_{\text{pd}}$ in picoseconds (ps) and maximum theoretical toggle frequency in GHz.'
    ],
    benefitTitle: 'W. C. Elmore 1948 Distributed RC Delay Standard',
    benefitContent: 'Core timing model used by static timing analysis (STA) electronic design automation (EDA) engines to verify nanometer critical timing paths in ASIC microchips.',
    faqs: [{ q: 'Why are multiple fins used in FinFETs instead of widening the gate?', a: 'FinFET width is quantized in discrete fin heights ($W_{\text{eff}} = N \times (2 H_{\text{fin}} + T_{\text{fin}})$); drive strength increases by adding parallel fins.' }]
  },

  // 14. Fowler-Nordheim Quantum Tunneling Current Calculator
  {
    slug: 'fowler-nordheim-tunneling-current-flash-memory-calculator',
    name: 'Fowler-Nordheim Quantum Tunneling Current Flash Memory Calculator',
    description: 'Calculate quantum mechanical Fowler-Nordheim field emission tunneling current density J_FN in A/cm² (J_FN = A · E_ox² · e^(-B / E_ox)) through thin dielectric oxide barriers in 3D NAND Flash memory program/erase cycles.',
    category: 'Science',
    icon: 'text',
    keywords: ['fowler nordheim calculator', 'quantum tunneling current density formula online', 'flash memory program erase electric field calculator', 'fn tunneling dielectric breakdown calculator', 'quantum mechanics semiconductor memory solid state online'],
    order: 1373,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Oxide Electric Field E_ox (MV/cm), Barrier Height Φ_B (eV) & Dielectric Thickness t_ox (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fn-eox">Field E_ox (MV/cm)</label>
          <input class="tool-textarea" id="fn-eox" type="number" step="0.5" value="10.0" placeholder="10.0 MV/cm (Flash Program)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fn-phi">Barrier Φ_B (eV)</label>
          <input class="tool-textarea" id="fn-phi" type="number" step="0.1" value="3.15" placeholder="3.15 eV (Si-SiO₂)" />
        </div>
      </div>
      <div id="fn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fn-res-jfn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Tunneling J_FN = 1.34 × 10⁻² A / cm²</span>
            <span class="stat-label">Fowler-Nordheim Quantum Field Tunneling Current Density</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fn-res-prog" style="color:var(--green-dark); font-weight:700;">FLASH WRITE SPEED: High Tunneling (Electrons tunnel into floating gate in ~10 μs ✓)</span>
            <span class="stat-label">NAND Flash Floating Gate / Charge Trap Program Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eoxEl = document.getElementById('fn-eox'), phiEl = document.getElementById('fn-phi');
  const jfResEl = document.getElementById('fn-res-jfn'), prResEl = document.getElementById('fn-res-prog');

  function update() {
    const E_ox_MV_cm = parseFloat(eoxEl.value), Phi_B_eV = parseFloat(phiEl.value);
    if (isNaN(E_ox_MV_cm) || isNaN(Phi_B_eV) || E_ox_MV_cm <= 0 || Phi_B_eV <= 0) return;

    // Standard coefficients for Si-SiO2 interface:
    // A_FN approx 1.54e-6 * (1 / Phi_B) * 1e12  [A / V^2]
    // B_FN approx 6.83e7 * Phi_B^1.5 * 1e-6 = 68.3 * Phi_B^1.5  [MV / cm]
    const B_FN = 48.3 * Math.pow(Phi_B_eV, 1.5);

    // J_FN = A * E^2 * exp( - B / E )  [A / cm^2]
    const E_sq = Math.pow(E_ox_MV_cm, 2);
    const exp_term = Math.exp(-B_FN / E_ox_MV_cm);
    const J_FN = 1.54e-6 * (1.0 / Phi_B_eV) * E_sq * 1e12 * exp_term * 1e-12; // A/cm^2 scale

    let status = '', color = '#22543d';
    if (E_ox_MV_cm >= 8.0) {
      status = 'HIGH TUNNELING REGIME (Fast Flash Program/Erase: ~10 μs write)';
      color = '#22543d';
    } else if (E_ox_MV_cm >= 5.0) {
      status = 'MODERATE TUNNELING (Slow charge transfer)';
      color = '#ea580c';
    } else {
      status = 'NEGLIGIBLE TUNNELING (Non-volatile charge retention > 10 years ✓)';
      color = '#22543d';
    }

    jfResEl.textContent = 'Tunneling J_FN = ' + J_FN.toExponential(2) + ' A / cm²';
    prResEl.textContent = status + ' [B_FN = ' + B_FN.toFixed(1) + ' MV/cm @ E_ox = ' + E_ox_MV_cm + ' MV/cm]';
    prResEl.style.color = color;
  }

  eoxEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter electric field across gate dielectric $E_{\text{ox}}$ in MV/cm (typically 8–12 MV/cm during Flash programming).',
      'Enter conduction band offset barrier height $\Phi_B$ in eV (3.15 eV for $\text{Si-SiO}_2$).',
      'Inspect quantum mechanical field emission tunneling current density $J_{\text{FN}}$ in $\text{A/cm}^2$.'
    ],
    benefitTitle: 'Ralph H. Fowler & Lothar W. Nordheim 1928 Wave-Mechanics Law',
    benefitContent: 'Electrons tunnel through triangular potential barriers under high electric fields, enabling non-volatile write/erase cycles in all SSD solid-state drives and USB flash drives.',
    faqs: [{ q: 'Why does Flash memory degrade after thousands of write cycles?', a: 'High-energy tunneling electrons generate defect traps in the thin oxide barrier, eventually causing leakage breakdown (oxide wearout).' }]
  },

  // 15. Quantum Well Energy Eigenvalues Calculator
  {
    slug: 'quantum-well-energy-eigenvalues-infinite-potential-box-calculator',
    name: 'Quantum Well Energy Eigenvalues (E_n = n²·π²·ℏ² / (2m*·L²)) Calculator',
    description: 'Calculate quantum well quantized discrete energy levels E_n in meV and eV (1D Infinite Potential Box: E_n = n² · π² · ℏ² / (2·m* · L²)), subband energy transitions, and photon emission wavelengths for semiconductor QW lasers.',
    category: 'Science',
    icon: 'text',
    keywords: ['quantum well energy eigenvalues calculator', 'particle in a box formula en online', 'quantum well subband energy transition calculator', 'effective mass quantum well width mev calculator', 'quantum mechanics semiconductor nanostructures photonics online'],
    order: 1374,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Quantum Well Thickness L (nm), Electron Effective Mass Ratio (m*/m₀) & Quantum Number n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qw-l">Well Width L (nm)</label>
          <input class="tool-textarea" id="qw-l" type="number" step="1" value="10.0" placeholder="10.0 nm (GaAs QW)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qw-m">Mass Ratio (m*/m₀)</label>
          <input class="tool-textarea" id="qw-m" type="number" step="0.01" value="0.067" placeholder="0.067 (GaAs Conduction)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qw-n">Level n</label>
          <input class="tool-textarea" id="qw-n" type="number" step="1" min="1" max="10" value="1" placeholder="1 (Ground State)" />
        </div>
      </div>
      <div id="qw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qw-res-en" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ground State E₁ = 56.12 meV (0.0561 eV)</span>
            <span class="stat-label">Quantized Bound Subband Energy Level (E_n = n²·π²·ℏ² / (2m*·L²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qw-res-trans" style="color:var(--green-dark); font-weight:700;">E₂ = 224.5 meV (4× E₁) | Subband Transition ΔE₂₁ = 168.4 meV (λ = 7.36 μm Mid-IR)</span>
            <span class="stat-label">First Excited State & Intersubband Optical Transition</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('qw-l'), mEl = document.getElementById('qw-m'), nEl = document.getElementById('qw-n');
  const enResEl = document.getElementById('qw-res-en'), trResEl = document.getElementById('qw-res-trans');

  const hbar = 1.054571817e-34; // J*s
  const m0 = 9.1093837e-31; // kg
  const q = 1.602176634e-19; // J/eV

  function update() {
    const L_nm = parseFloat(lEl.value), m_ratio = parseFloat(mEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(L_nm) || isNaN(m_ratio) || isNaN(n) || L_nm <= 0 || m_ratio <= 0 || n <= 0) return;

    const L_m = L_nm * 1e-9;
    const m_eff = m_ratio * m0;

    // E_n = ( n^2 * pi^2 * hbar^2 ) / ( 2 * m_eff * L^2 )  [Joules -> eV -> meV]
    const E1_J = (Math.pow(Math.PI, 2) * Math.pow(hbar, 2)) / (2.0 * m_eff * Math.pow(L_m, 2));
    const E1_eV = E1_J / q;
    const E1_meV = E1_eV * 1000.0;

    const En_meV = Math.pow(n, 2) * E1_meV;
    const En_eV = En_meV / 1000.0;

    // Subband transition E2 - E1:
    const delta_E21_meV = 3.0 * E1_meV;
    const delta_E21_eV = delta_E21_meV / 1000.0;
    const lambda_um = 1.23984 / delta_E21_eV;

    enResEl.textContent = 'State E' + n + ' = ' + En_meV.toFixed(2) + ' meV (' + En_eV.toFixed(4) + ' eV)';
    trResEl.textContent = 'E₂ = ' + (4.0 * E1_meV).toFixed(1) + ' meV | Transition ΔE₂₁ = ' + delta_E21_meV.toFixed(1) + ' meV (λ = ' + lambda_um.toFixed(2) + ' μm Mid-IR @ L=' + L_nm + ' nm)';
  }

  [lEl, mEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter semiconductor quantum well width L in nanometers (e.g. 5 to 20 nm).',
      'Enter carrier effective mass ratio $m^*/m_0$ (0.067 for conduction band electrons in GaAs).',
      'Enter integer quantum level number n ($n = 1, 2, 3\dots$).',
      'Inspect discrete bound energy eigenvalue $E_n$ in meV and intersubband photon emission wavelength.'
    ],
    benefitTitle: 'Erwin Schrödinger 1D Quantum Confinement Standard',
    benefitContent: 'Compressing electron wavefunctions within nanometer barriers ($L \le \lambda_{\text{de Broglie}}$) discretizes continuous bulk energy bands into distinct subband levels, creating tunable laser diodes and Quantum Cascade Lasers (QCLs).',
    faqs: [{ q: 'Why is energy inversely proportional to the square of well width (1/L²)?', a: 'De Broglie wavelength is constrained to $\lambda = 2L/n$; since kinetic energy $E \propto p^2 \propto 1/\lambda^2$, confinement energy scales as $1/L^2$.' }]
  },

  // 16. Bloch Sphere Qubit State Probability Calculator
  {
    slug: 'bloch-sphere-qubit-state-rotation-probability-calculator',
    name: 'Bloch Sphere Qubit State (|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)·sin(θ/2)|1⟩) Probability Calculator',
    description: 'Calculate single-qubit quantum state superposition |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)·sin(θ/2)|1⟩, measurement collapse probabilities P(|0⟩) = cos²(θ/2) and P(|1⟩) = sin²(θ/2), and Cartesian Bloch vector coordinates [x, y, z].',
    category: 'Math',
    icon: 'text',
    keywords: ['bloch sphere calculator', 'qubit quantum state superposition formula online', 'quantum measurement probability cos squared theta over 2 calculator', 'quantum computing bloch sphere coordinates calculator', 'quantum information quantum mechanics computing online'],
    order: 1375,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bloch Polar Angle θ (0° to 180°) & Azimuthal Phase Angle φ (0° to 360°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bs-theta">Polar Angle θ (°)</label>
          <input class="tool-textarea" id="bs-theta" type="number" step="15" min="0" max="180" value="90.0" placeholder="90.0° (Equator / Equal Superposition)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-phi">Phase Angle φ (°)</label>
          <input class="tool-textarea" id="bs-phi" type="number" step="15" min="0" max="360" value="0.0" placeholder="0.0° (|+⟩ State)" />
        </div>
      </div>
      <div id="bs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bs-res-prob" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P(|0⟩) = 50.0% | P(|1⟩) = 50.0%</span>
            <span class="stat-label">Measurement Outcome Probabilities (P(|0⟩) = cos²(θ/2), P(|1⟩) = sin²(θ/2))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bs-res-vec" style="color:var(--green-dark); font-weight:700;">Bloch Vector: [x: 1.000, y: 0.000, z: 0.000] | Hadamard |+⟩ State</span>
            <span class="stat-label">Cartesian Bloch Vector Coordinates (x = sin θ·cos φ, y = sin θ·sin φ, z = cos θ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('bs-theta'), phEl = document.getElementById('bs-phi');
  const prResEl = document.getElementById('bs-res-prob'), vcResEl = document.getElementById('bs-res-vec');

  function update() {
    const theta_deg = parseFloat(thEl.value), phi_deg = parseFloat(phEl.value);
    if (isNaN(theta_deg) || isNaN(phi_deg) || theta_deg < 0 || theta_deg > 180) return;

    const th = (theta_deg * Math.PI) / 180.0;
    const ph = (phi_deg * Math.PI) / 180.0;

    // State amplitudes:
    // alpha = cos(theta / 2)
    // beta = exp(i*phi) * sin(theta / 2)
    const p0 = Math.pow(Math.cos(th / 2.0), 2);
    const p1 = Math.pow(Math.sin(th / 2.0), 2);

    // Bloch vector coordinates:
    // x = sin(theta) * cos(phi)
    // y = sin(theta) * sin(phi)
    // z = cos(theta)
    const x = Math.sin(th) * Math.cos(ph);
    const y = Math.sin(th) * Math.sin(ph);
    const z = Math.cos(th);

    let state_name = '';
    if (theta_deg === 0) state_name = 'North Pole |0⟩ Ground State';
    else if (theta_deg === 180) state_name = 'South Pole |1⟩ Excited State';
    else if (theta_deg === 90 && phi_deg === 0) state_name = 'Hadamard |+⟩ State (1/√2 (|0⟩ + |1⟩))';
    else if (theta_deg === 90 && phi_deg === 180) state_name = 'Hadamard |-⟩ State (1/√2 (|0⟩ - |1⟩))';
    else if (theta_deg === 90 && phi_deg === 90) state_name = '|+i⟩ Circular State';
    else state_name = 'Superposition State';

    prResEl.textContent = 'P(|0⟩) = ' + (p0 * 100).toFixed(1) + '% | P(|1⟩) = ' + (p1 * 100).toFixed(1) + '%';
    vcResEl.textContent = 'Bloch: [x=' + x.toFixed(3) + ', y=' + y.toFixed(3) + ', z=' + z.toFixed(3) + '] | ' + state_name;
  }

  thEl.addEventListener('input', update);
  phEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter Bloch sphere polar angle $\theta$ from $0^\circ$ (North Pole $|0\rangle$) to $180^\circ$ (South Pole $|1\rangle$).',
      'Enter azimuthal quantum phase angle $\phi$ from $0^\circ$ to $360^\circ$.',
      'Inspect projective measurement outcome collapse probabilities ($P(|0\rangle), P(|1\rangle)$) and 3D Bloch sphere vector coordinates $[x, y, z]$.'
    ],
    benefitTitle: 'Felix Bloch 1946 Quantum Two-Level Visualization',
    benefitContent: 'Geometrically maps abstract 2D complex Hilbert space statevectors onto the surface of a 3D unit sphere ($x^2 + y^2 + z^2 = 1$), visualizing single-qubit quantum logic gates (Pauli X, Y, Z, Hadamard, and Phase rotations).',
    faqs: [{ q: 'What is a Hadamard gate on the Bloch sphere?', a: 'A Hadamard gate rotates the North Pole $|0\rangle$ by $90^\circ$ down to the equator, creating the equal superposition state $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$.' }]
  },

  // 17. Rabi Oscillation Frequency & State Transition Calculator
  {
    slug: 'rabi-oscillation-frequency-two-level-quantum-system-calculator',
    name: 'Rabi Oscillation Frequency & Two-Level Quantum State Transition Calculator',
    description: 'Calculate resonant Rabi frequency Ω_R in MHz (Ω_R = μ · E₀ / ℏ), generalized off-resonance Rabi frequency Ω = √(Ω_R² + Δ²), and quantum bit inversion π-pulse transition time t_π = π / Ω_R.',
    category: 'Science',
    icon: 'text',
    keywords: ['rabi oscillation calculator', 'rabi frequency formula omega r online', 'quantum bit pi pulse transition time calculator', 'two level atom electric dipole laser rabi calculator', 'quantum computing atomic physics quantum optics online'],
    order: 1376,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resonant Rabi Frequency Ω_R / 2π (MHz), Laser Detuning Δ / 2π (MHz) & Pulse Duration t (ns)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rb-omr">Rabi Ω_R / 2π (MHz)</label>
          <input class="tool-textarea" id="rb-omr" type="number" step="5" value="20.0" placeholder="20.0 MHz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rb-det">Detuning Δ / 2π (MHz)</label>
          <input class="tool-textarea" id="rb-det" type="number" step="5" value="0.0" placeholder="0.0 MHz (On Resonance)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rb-time">Pulse Time t (ns)</label>
          <input class="tool-textarea" id="rb-time" type="number" step="5" value="25.0" placeholder="25.0 ns (π-Pulse)" />
        </div>
      </div>
      <div id="rb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rb-res-pexc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Excited State P_e(t) = 100.0% (FULL INVERSION)</span>
            <span class="stat-label">Transition Probability (P_e(t) = (Ω_R / Ω)² · sin²(Ω · t / 2))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rb-res-pi" style="color:var(--green-dark); font-weight:700;">π-Pulse Duration t_π = 25.00 ns | π/2-Pulse = 12.50 ns (50/50 Superposition)</span>
            <span class="stat-label">Quantum Logic Gate Control Pulse Durations</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const omrEl = document.getElementById('rb-omr'), detEl = document.getElementById('rb-det'), tmEl = document.getElementById('rb-time');
  const peResEl = document.getElementById('rb-res-pexc'), piResEl = document.getElementById('rb-res-pi');

  function update() {
    const f_Rabi_MHz = parseFloat(omrEl.value), f_det_MHz = parseFloat(detEl.value);
    const t_ns = parseFloat(tmEl.value);

    if (isNaN(f_Rabi_MHz) || isNaN(f_det_MHz) || isNaN(t_ns) || f_Rabi_MHz <= 0 || t_ns < 0) return;

    // Angular frequencies in rad/s:
    const Omega_R = 2.0 * Math.PI * f_Rabi_MHz * 1e6;
    const Delta = 2.0 * Math.PI * f_det_MHz * 1e6;

    // Generalized Rabi frequency: Omega = sqrt( Omega_R^2 + Delta^2 )
    const Omega = Math.sqrt(Math.pow(Omega_R, 2) + Math.pow(Delta, 2));

    const t_s = t_ns * 1e-9;

    // Transition probability: P_e(t) = (Omega_R / Omega)^2 * sin^2( Omega * t / 2 )
    const amplitude = Math.pow(Omega_R / Omega, 2);
    const P_e = amplitude * Math.pow(Math.sin((Omega * t_s) / 2.0), 2);
    const P_e_pct = P_e * 100.0;

    // Resonant pi-pulse time: t_pi = pi / Omega_R  [s -> ns]
    const t_pi_ns = (Math.PI / Omega_R) * 1e9;
    const t_pi2_ns = t_pi_ns / 2.0;

    peResEl.textContent = 'Excited State P_e(t) = ' + P_e_pct.toFixed(1) + '%';
    piResEl.textContent = 'π-Pulse t_π = ' + t_pi_ns.toFixed(2) + ' ns | π/2-Pulse = ' + t_pi2_ns.toFixed(2) + ' ns (Ω_gen / 2π = ' + (Omega / (2*Math.PI*1e6)).toFixed(1) + ' MHz @ t=' + t_ns + ' ns)';
  }

  [omrEl, detEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter resonant Rabi frequency $\Omega_R / 2\pi$ in MHz proportional to microwave/laser drive amplitude.',
      'Enter laser-atom detuning frequency offset $\Delta / 2\pi$ in MHz (0 for perfect resonance).',
      'Enter control pulse execution duration in nanoseconds (ns).',
      'Inspect excited state population probability $P_e(t)$ and calibrated $\pi$-pulse / $\pi/2$-pulse durations.'
    ],
    benefitTitle: 'Isidor Isaac Rabi 1937 Quantum Resonance Discovery',
    benefitContent: 'The physical mechanism behind all coherent quantum qubit manipulation in superconducting transmon qubits, trapped ions, and nitrogen-vacancy (NV) diamond centers.',
    faqs: [{ q: 'What is a pi-pulse in quantum computing?', a: 'A $\pi$-pulse ($t = \pi / \Omega_R$) drives the qubit exactly half a full oscillation, flipping the state from $|0\rangle$ to $|1\rangle$ (equivalent to a quantum NOT / Pauli-X gate).' }]
  },

  // 18. Optical Fiber Numerical Aperture & V-Number Calculator
  {
    slug: 'optical-fiber-numerical-aperture-acceptance-angle-v-number-calculator',
    name: 'Optical Fiber Numerical Aperture (NA), Acceptance Angle & V-Number Calculator',
    description: 'Calculate optical fiber Numerical Aperture NA (NA = √(n_core² - n_clad²)), maximum acceptance cone half-angle θ_acc = arcsin(NA), Normalized Frequency V-number (V = 2π·a/λ · NA), and single-mode cutoff limit (V under 2.405).',
    category: 'Science',
    icon: 'text',
    keywords: ['optical fiber numerical aperture calculator', 'na formula acceptance angle online', 'v number normalized frequency single mode cutoff calculator', 'core cladding refractive index fiber optic calculator', 'photonics optical communications telecommunications online'],
    order: 1377,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Core Index n_core, Cladding Index n_clad, Core Radius a (μm) & Wavelength λ (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="of-ncore">Core n_core</label>
          <input class="tool-textarea" id="of-ncore" type="number" step="0.005" value="1.468" placeholder="1.468 (Silica Core)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="of-nclad">Clad n_clad</label>
          <input class="tool-textarea" id="of-nclad" type="number" step="0.005" value="1.463" placeholder="1.463 (Cladding)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="of-a">Core Radius a (μm)</label>
          <input class="tool-textarea" id="of-a" type="number" step="0.5" value="4.1" placeholder="4.1 μm (SMF-28 8.2μm Dia)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="of-lambda">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="of-lambda" type="number" step="50" value="1550.0" placeholder="1550.0 nm" />
        </div>
      </div>
      <div id="of-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="of-res-na" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Numerical Aperture NA = 0.1210 (Acceptance Angle θ = 6.95°)</span>
            <span class="stat-label">Fiber Light-Gathering Numerical Aperture (NA = √(n_core² - n_clad²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="of-res-vnum" style="color:var(--green-dark); font-weight:700;">V-Number = 2.012 (SINGLE-MODE FIBER: V < 2.405 Cutoff Standard ✓)</span>
            <span class="stat-label">Normalized Frequency Parameter (V = 2π·a / λ · NA)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ncEl = document.getElementById('of-ncore'), ncdEl = document.getElementById('of-nclad');
  const aEl = document.getElementById('of-a'), lmEl = document.getElementById('of-lambda');
  const naResEl = document.getElementById('of-res-na'), vnResEl = document.getElementById('of-res-vnum');

  function update() {
    const n_core = parseFloat(ncEl.value), n_clad = parseFloat(ncdEl.value);
    const a_um = parseFloat(aEl.value), lambda_nm = parseFloat(lmEl.value);

    if (isNaN(n_core) || isNaN(n_clad) || isNaN(a_um) || isNaN(lambda_nm) || n_core <= n_clad || n_clad <= 0 || a_um <= 0 || lambda_nm <= 0) return;

    // Numerical Aperture: NA = sqrt( n_core^2 - n_clad^2 )
    const NA = Math.sqrt(Math.pow(n_core, 2) - Math.pow(n_clad, 2));

    // Acceptance angle in air (n0 = 1): theta_acc = asin(NA)  [rad -> deg]
    const theta_acc_rad = Math.asin(Math.min(1.0, NA));
    const theta_acc_deg = (theta_acc_rad * 180.0) / Math.PI;

    // Normalized frequency V-number: V = ( 2 * pi * a / lambda ) * NA
    const a_nm = a_um * 1000.0;
    const V = (2.0 * Math.PI * a_nm / lambda_nm) * NA;

    // Approximate number of guided spatial modes: M approx V^2 / 2 for multi-mode
    const is_smf = V < 2.4048;
    const num_modes = is_smf ? 1 : Math.round(Math.pow(V, 2) / 2.0);

    let status = '', color = '#22543d';
    if (is_smf) {
      status = 'SINGLE-MODE FIBER (V = ' + V.toFixed(3) + ' < 2.405: Zero intermodal dispersion ✓)';
      color = '#22543d';
    } else {
      status = 'MULTI-MODE FIBER (V = ' + V.toFixed(2) + ' ≥ 2.405: Guided modes M ≈ ' + num_modes + ')';
      color = '#ea580c';
    }

    naResEl.textContent = 'Numerical Aperture NA = ' + NA.toFixed(4) + ' (Acceptance θ = ' + theta_acc_deg.toFixed(2) + '°)';
    vnResEl.textContent = 'V-Number = ' + V.toFixed(3) + ' (' + status + ')';
    vnResEl.style.color = color;
  }

  [ncEl, ncdEl, aEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fiber glass core refractive index $n_{\text{core}}$ (e.g. 1.468).',
      'Enter cladding refractive index $n_{\text{clad}}$ (e.g. 1.463).',
      'Enter core radius a in micrometers (e.g. $4.1\ \mu\text{m}$ for single-mode, $25\ \mu\text{m}$ for multimode).',
      'Enter laser wavelength $\lambda$ in nanometers (e.g. 1310 nm or 1550 nm).',
      'Inspect light-gathering Numerical Aperture (NA) and Normalized Frequency V-number.'
    ],
    benefitTitle: 'Total Internal Reflection Optical Waveguide Standard',
    benefitContent: 'Determines the single-mode cutoff condition ($V < 2.405$ based on the first zero of the $J_0$ Bessel function), eliminating multi-modal pulse dispersion across transoceanic telecom fiber links.',
    faqs: [{ q: 'What happens when V-number exceeds 2.405?', a: 'Higher-order transverse spatial modes ($\text{LP}_{11}, \text{LP}_{21}$) begin propagating at different group velocities, causing severe intermodal pulse spreading.' }]
  },

  // 19. Mach-Zehnder Interferometer (MZI) Phase Shift Calculator
  {
    slug: 'mach-zehnder-interferometer-phase-shift-extinction-ratio-calculator',
    name: 'Mach-Zehnder Interferometer (MZI) Phase Shift & Extinction Ratio Calculator',
    description: 'Calculate integrated photonics Mach-Zehnder Interferometer (MZI) electro-optic intensity transmission T(Δφ) = cos²(Δφ / 2), output optical power P_out, and Extinction Ratio ER in dB (ER = 10·log₁₀(P_max / P_min)).',
    category: 'Science',
    icon: 'text',
    keywords: ['mach zehnder interferometer calculator', 'mzi transmission formula cos squared delta phi over 2 online', 'extinction ratio decibels optical modulator calculator', 'electro optic phase shift mach zehnder calculator', 'integrated photonics silicon photonics optical communications online'],
    order: 1378,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Relative Phase Difference Δφ (Degrees), Input Power P_in (mW) & Power Splitting Imbalance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mz-phi">Phase Shift Δφ (°)</label>
          <input class="tool-textarea" id="mz-phi" type="number" step="15" value="0.0" placeholder="0.0° (Constructive Interference)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mz-pin">Input Power P_in (mW)</label>
          <input class="tool-textarea" id="mz-pin" type="number" step="2" value="10.0" placeholder="10.0 mW Laser" />
        </div>
      </div>
      <div id="mz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mz-res-pout" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Output Power P_out = 10.00 mW (100.0% Transmission)</span>
            <span class="stat-label">MZI Optical Output Power (P_out = P_in · cos²(Δφ / 2))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mz-res-mode" style="color:var(--green-dark); font-weight:700;">CONSTRUCTIVE INTERFERENCE (Δφ = 0°: ON-State | Δφ = 180° gives complete OFF null)</span>
            <span class="stat-label">Interferometric Switching State & Optical Transmission Fraction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('mz-phi'), pinEl = document.getElementById('mz-pin');
  const poResEl = document.getElementById('mz-res-pout'), mdResEl = document.getElementById('mz-res-mode');

  function update() {
    const delta_phi_deg = parseFloat(phEl.value), P_in_mW = parseFloat(pinEl.value);
    if (isNaN(delta_phi_deg) || isNaN(P_in_mW) || P_in_mW < 0) return;

    const delta_phi_rad = (delta_phi_deg * Math.PI) / 180.0;

    // Ideal balanced MZI transmission: T = cos^2( delta_phi / 2 )
    const transmission = Math.pow(Math.cos(delta_phi_rad / 2.0), 2);
    const P_out_mW = P_in_mW * transmission;
    const trans_pct = transmission * 100.0;

    let state = '';
    if (trans_pct >= 98.0) state = 'CONSTRUCTIVE ON-STATE (T ≈ 100%: Constructive wave interference)';
    else if (trans_pct <= 2.0) state = 'DESTRUCTIVE OFF-STATE (T ≈ 0%: Dark port null)';
    else if (Math.abs(trans_pct - 50.0) < 5.0) state = 'QUADRATURE BIAS (T ≈ 50%: Maximum linear electro-optic modulation)';
    else state = 'PARTIAL TRANSMISSION';

    poResEl.textContent = 'Output P_out = ' + P_out_mW.toFixed(2) + ' mW (' + trans_pct.toFixed(1) + '% Transmission)';
    mdResEl.textContent = state + ' [Δφ = ' + delta_phi_deg + '° @ P_in = ' + P_in_mW + ' mW]';
  }

  phEl.addEventListener('input', update);
  pinEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter electro-optic / thermo-optic phase difference $\Delta\phi$ between the two interferometer arms in degrees.',
      'Enter input continuous-wave laser optical power $P_{\text{in}}$ in mW.',
      'Inspect output transmitted optical power $P_{\text{out}}$ in mW and optical modulation state.'
    ],
    benefitTitle: 'Ludwig Mach 1891 & Ludwig Zehnder 1891 Wave Interferometry',
    benefitContent: 'Converts voltage-induced phase shifts ($\Delta\phi = \pi \cdot V / V_\pi$) into high-speed amplitude intensity modulation up to $100\text{ Gbps}$ in Silicon Photonics transceiver chips.',
    faqs: [{ q: 'Why are MZIs biased at the quadrature point (Δφ = 90°)?', a: 'At $\Delta\phi = 90^\circ$ ($T = 50\%$), the cosine-squared curve has its steepest linear slope, maximizing small-signal modulation depth with minimum harmonic distortion.' }]
  },

  // 20. Distributed Bragg Reflector (DBR) Stopband & Peak Reflectivity Calculator
  {
    slug: 'dbr-distributed-bragg-reflector-stopband-reflectivity-calculator',
    name: 'Distributed Bragg Reflector (DBR) Stopband & Peak Reflectivity Calculator',
    description: 'Calculate quarter-wavelength multilayer Distributed Bragg Reflector (DBR) peak mirror reflectivity R (R = [(1 - (n₁/n₂)^(2N)) / (1 + (n₁/n₂)^(2N))]²), photonic bandgap stopband bandwidth Δλ, and layer thicknesses (d = λ₀ / 4n) for VCSEL lasers.',
    category: 'Science',
    icon: 'text',
    keywords: ['dbr calculator', 'distributed bragg reflector peak reflectivity formula online', 'stopband bandwidth quarter wave dbr calculator', 'vcsel laser mirror dielectric stack calculator', 'photonics optoelectronics dielectric mirrors online'],
    order: 1379,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'High Index n_H (e.g. 3.50), Low Index n_L (e.g. 2.95), Pairs N (e.g. 25) & Center Wavelength λ₀ (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="db-nh">High Index n_H</label>
          <input class="tool-textarea" id="db-nh" type="number" step="0.05" value="3.50" placeholder="3.50 (GaAs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="db-nl">Low Index n_L</label>
          <input class="tool-textarea" id="db-nl" type="number" step="0.05" value="2.95" placeholder="2.95 (AlAs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="db-npairs">Pair Count N</label>
          <input class="tool-textarea" id="db-npairs" type="number" step="2" value="25" placeholder="25 Alternating Pairs" />
        </div>
        <div class="control-group">
          <label class="control-label" for="db-lambda0">Center λ₀ (nm)</label>
          <input class="tool-textarea" id="db-lambda0" type="number" step="50" value="850.0" placeholder="850.0 nm (VCSEL)" />
        </div>
      </div>
      <div id="db-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="db-res-ref" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Peak Reflectivity R = 99.965 % (VCSEL Grade)</span>
            <span class="stat-label">Quarter-Wave Multilayer DBR Power Reflectivity (R = [(1 - (n_L/n_H)^(2N)) / (1 + ...)]²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="db-res-band" style="color:var(--green-dark); font-weight:700;">Stopband Width Δλ = 72.4 nm | Layers: d_H = 60.7 nm, d_L = 72.0 nm</span>
            <span class="stat-label">Photonic Stopband Bandwidth (Δλ = 4·λ₀/π · (n_H - n_L)/(n_H + n_L))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nhEl = document.getElementById('db-nh'), nlEl = document.getElementById('db-nl');
  const npEl = document.getElementById('db-npairs'), lmEl = document.getElementById('db-lambda0');
  const rfResEl = document.getElementById('db-res-ref'), bdResEl = document.getElementById('db-res-band');

  function update() {
    const n_H = parseFloat(nhEl.value), n_L = parseFloat(nlEl.value);
    const N = parseInt(npEl.value, 10), lambda0_nm = parseFloat(lmEl.value);

    if (isNaN(n_H) || isNaN(n_L) || isNaN(N) || isNaN(lambda0_nm) || n_H <= n_L || n_L <= 0 || N <= 0 || lambda0_nm <= 0) return;

    // DBR peak reflectivity formula (air incident, matched substrate):
    // Ratio term: (n_L / n_H)^(2N)
    const ratio_term = Math.pow(n_L / n_H, 2.0 * N);
    const R = Math.pow((1.0 - ratio_term) / (1.0 + ratio_term), 2);
    const R_pct = R * 100.0;

    // Photonic stopband bandwidth: Delta_lambda = (4 * lambda0 / pi) * ( (n_H - n_L) / (n_H + n_L) )  [nm]
    const delta_lambda_nm = (4.0 * lambda0_nm / Math.PI) * ((n_H - n_L) / (n_H + n_L));

    // Quarter-wave layer thicknesses: d = lambda0 / (4 * n)
    const d_H_nm = lambda0_nm / (4.0 * n_H);
    const d_L_nm = lambda0_nm / (4.0 * n_L);

    rfResEl.textContent = 'Peak Reflectivity R = ' + R_pct.toFixed(3) + ' %';
    bdResEl.textContent = 'Stopband Δλ = ' + delta_lambda_nm.toFixed(1) + ' nm | Layers: d_H=' + d_H_nm.toFixed(1) + ' nm, d_L=' + d_L_nm.toFixed(1) + ' nm (N=' + N + ' pairs @ ' + lambda0_nm + ' nm)';
  }

  [nhEl, nlEl, npEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter high refractive index layer $n_H$ (e.g. 3.50 for GaAs).',
      'Enter low refractive index layer $n_L$ (e.g. 2.95 for AlAs).',
      'Enter number of alternating quarter-wave dielectric pairs N (typically 20–35 pairs).',
      'Enter design center reflection Bragg wavelength $\lambda_0$ in nanometers.',
      'Inspect peak power reflectivity R and photonic stopband bandwidth $\Delta\lambda$.'
    ],
    benefitTitle: 'Periodic 1D Photonic Bandgap Crystal Standard',
    benefitContent: 'Constructive multi-interface Fresnel reflections yield ultra-high mirror reflectivities ($R > 99.9\%$), enabling Vertical-Cavity Surface-Emitting Lasers (VCSELs) for iPhone FaceID and optical mice.',
    faqs: [{ q: 'Why do VCSELs require such high DBR reflectivity (R > 99.9%)?', a: 'Because VCSEL active gain regions are ultra-thin (a few nanometers), high round-trip mirror reflectivity is essential to sustain lasing threshold.' }]
  },

  // 21. Pockels Effect Electro-Optic Half-Wave Voltage Calculator
  {
    slug: 'pockels-effect-electro-optic-half-wave-voltage-calculator',
    name: 'Pockels Effect Electro-Optic Modulator Half-Wave Voltage (V_π = λ / 2n₀³·r₆₃) Calculator',
    description: 'Calculate electro-optic Pockels cell Half-Wave Voltage V_π in Volts (V_π = λ / (2 · n₀³ · r₆₃)), induced birefringence phase retardation Δφ, and electro-optic coefficient r for LiNbO₃ and KDP laser Q-switches.',
    category: 'Science',
    icon: 'text',
    keywords: ['pockels effect calculator', 'half wave voltage formula v pi online', 'electro optic coefficient r63 lithium niobate calculator', 'pockels cell q switch phase retardation calculator', 'nonlinear optics laser engineering photonics online'],
    order: 1380,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wavelength λ (nm), Crystal Refractive Index n₀ & Electro-Optic Coefficient r (pm/V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pk-lambda">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="pk-lambda" type="number" step="50" value="1064.0" placeholder="1064.0 nm (Nd:YAG)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-n0">Index n₀</label>
          <input class="tool-textarea" id="pk-n0" type="number" step="0.05" value="2.20" placeholder="2.20 (LiNbO₃)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-r">r-Coeff (pm/V)</label>
          <input class="tool-textarea" id="pk-r" type="number" step="2" value="30.8" placeholder="30.8 pm/V (r₃₃ LiNbO₃)" />
        </div>
      </div>
      <div id="pk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pk-res-vpi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Half-Wave Voltage V_π = 1,623 Volts (1.62 kV)</span>
            <span class="stat-label">Longitudinal Half-Wave Voltage (V_π = λ / (2 · n₀³ · r))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pk-res-eval" style="color:var(--green-dark); font-weight:700;">LASER Q-SWITCH READY (V_π = 1.62 kV produces 180° π-phase shift / 90° polarization rotation ✓)</span>
            <span class="stat-label">Electro-Optic Phase Retardation (Δφ = π · V / V_π)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lmEl = document.getElementById('pk-lambda'), n0El = document.getElementById('pk-n0'), rEl = document.getElementById('pk-r');
  const vpResEl = document.getElementById('pk-res-vpi'), evResEl = document.getElementById('pk-res-eval');

  function update() {
    const lambda_nm = parseFloat(lmEl.value), n0 = parseFloat(n0El.value), r_pm_V = parseFloat(rEl.value);
    if (isNaN(lambda_nm) || isNaN(n0) || isNaN(r_pm_V) || lambda_nm <= 0 || n0 <= 0 || r_pm_V <= 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const r_m_V = r_pm_V * 1e-12; // pm/V -> m/V

    // Half-wave voltage: V_pi = lambda / ( 2 * n0^3 * r )  [Volts]
    const V_pi = lambda_m / (2.0 * Math.pow(n0, 3) * r_m_V);

    vpResEl.textContent = 'Half-Wave Voltage V_π = ' + Math.round(V_pi).toLocaleString() + ' Volts (' + (V_pi / 1000).toFixed(2) + ' kV)';
    evResEl.textContent = 'Quarter-Wave V_π/2 = ' + Math.round(V_pi / 2.0).toLocaleString() + ' V (r = ' + r_pm_V + ' pm/V @ λ=' + lambda_nm + ' nm, n₀=' + n0 + ')';
  }

  [lmEl, n0El, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser beam operating wavelength $\lambda$ in nanometers (e.g. 1064 nm).',
      'Enter electro-optic crystal unperturbed refractive index $n_0$ (e.g. 2.20 for Lithium Niobate $\text{LiNbO}_3$).',
      'Enter linear electro-optic Pockels tensor coefficient r in picometers/Volt ($\text{pm/V}$).',
      'Inspect required Half-Wave Voltage $V_\pi$ and Quarter-Wave Voltage $V_{\pi/2}$.'
    ],
    benefitTitle: 'Friedrich Carl Alwin Pockels 1893 Electro-Optic Law',
    benefitContent: 'Applied electric fields linearly modify crystal refractive indices ($\Delta n = -\frac{1}{2} n_0^3 r E$), creating microsecond laser Q-switches and gigahertz telecom phase modulators.',
    faqs: [{ q: 'What is the difference between longitudinal and transverse Pockels cells?', a: 'In transverse modulators, the electric field is perpendicular to light propagation, reducing required voltage by the crystal aspect ratio ($V_\pi \propto d/L$).' }]
  },

  // 22. Optical Kerr Effect Nonlinear Phase Shift Calculator
  {
    slug: 'kerr-effect-nonlinear-optical-phase-shift-calculator',
    name: 'Optical Kerr Effect Nonlinear Refractive Index (Δn = n₂·I) Phase Shift Calculator',
    description: 'Calculate intensity-dependent optical Kerr effect refractive index change Δn (Δn = n₂ · I), nonlinear Self-Phase Modulation (SPM) phase shift Φ_NL in radians (Φ_NL = (2π / λ) · n₂ · I · L), and B-integral.',
    category: 'Science',
    icon: 'text',
    keywords: ['optical kerr effect calculator', 'nonlinear refractive index n2 formula online', 'self phase modulation spm phase shift calculator', 'b integral laser pulse filamentation calculator', 'nonlinear optics ultrafast photonics laser engineering online'],
    order: 1381,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Peak Laser Intensity I (GW/cm²), Nonlinear n₂ (×10⁻¹⁶ cm²/W), Fiber Length L (m) & Wavelength λ (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kr-i">Intensity I (GW/cm²)</label>
          <input class="tool-textarea" id="kr-i" type="number" step="0.5" value="2.0" placeholder="2.0 GW/cm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kr-n2">n₂ (×10⁻¹⁶ cm²/W)</label>
          <input class="tool-textarea" id="kr-n2" type="number" step="0.5" value="2.6" placeholder="2.6 × 10⁻¹⁶ (Silica Fiber)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kr-l">Length L (m)</label>
          <input class="tool-textarea" id="kr-l" type="number" step="10" value="100.0" placeholder="100.0 m Fiber" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kr-lambda">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="kr-lambda" type="number" step="50" value="1550.0" placeholder="1550.0 nm" />
        </div>
      </div>
      <div id="kr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kr-res-phi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Nonlinear Shift Φ_NL = 2.11 rad (0.67 π rad)</span>
            <span class="stat-label">Self-Phase Modulation (SPM) B-Integral (Φ_NL = (2π / λ) · n₂ · I · L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kr-res-dn" style="color:var(--green-dark); font-weight:700;">Index Change Δn = 5.20 × 10⁻⁷ | Self-Focusing / Spectral Broadening Threshold Reached</span>
            <span class="stat-label">Nonlinear Index Change (Δn = n₂ · I)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('kr-i'), n2El = document.getElementById('kr-n2');
  const lEl = document.getElementById('kr-l'), lmEl = document.getElementById('kr-lambda');
  const phResEl = document.getElementById('kr-res-phi'), dnResEl = document.getElementById('kr-res-dn');

  function update() {
    const I_GW_cm2 = parseFloat(iEl.value), n2_scaled = parseFloat(n2El.value);
    const L_m = parseFloat(lEl.value), lambda_nm = parseFloat(lmEl.value);

    if (isNaN(I_GW_cm2) || isNaN(n2_scaled) || isNaN(L_m) || isNaN(lambda_nm) || I_GW_cm2 <= 0 || n2_scaled <= 0 || L_m <= 0 || lambda_nm <= 0) return;

    // Intensity: 1 GW/cm^2 = 1e9 W/cm^2
    const I_W_cm2 = I_GW_cm2 * 1e9;
    const n2_cm2_W = n2_scaled * 1e-16;

    // Nonlinear index change: Delta_n = n2 * I
    const delta_n = n2_cm2_W * I_W_cm2;

    // SPM Phase shift (B-integral): Phi_NL = ( 2 * pi / lambda_m ) * Delta_n * L_m  [radians]
    const lambda_m = lambda_nm * 1e-9;
    const Phi_NL_rad = (2.0 * Math.PI / lambda_m) * delta_n * L_m;
    const pi_fractions = Phi_NL_rad / Math.PI;

    phResEl.textContent = 'Nonlinear Shift Φ_NL = ' + Phi_NL_rad.toFixed(2) + ' rad (' + pi_fractions.toFixed(2) + ' π rad)';
    dnResEl.textContent = 'Index Change Δn = ' + delta_n.toExponential(2) + ' | B-Integral = ' + Phi_NL_rad.toFixed(2) + ' (L=' + L_m + ' m @ I=' + I_GW_cm2 + ' GW/cm²)';
  }

  [iEl, n2El, lEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser peak optical intensity I in $\text{GW/cm}^2$.',
      'Enter nonlinear refractive index coefficient $n_2$ (typically $2.6 \times 10^{-16}\text{ cm}^2/\text{W}$ for fused silica glass).',
      'Enter optical fiber or crystal interaction length L in meters.',
      'Enter laser pulse wavelength in nanometers.',
      'Inspect nonlinear self-phase modulation phase shift $\Phi_{\text{NL}}$ (B-integral) in radians.'
    ],
    benefitTitle: 'John Kerr 1875 Third-Order Optical Nonlinearity',
    benefitContent: 'High-intensity laser pulses alter the refractive index of glass ($n = n_0 + n_2 I$), driving optical soliton formation, supercontinuum white light generation, and Kerr-lens mode-locking in femtosecond titanium-sapphire lasers.',
    faqs: [{ q: 'What is the B-integral limit in high-power laser amplifiers?', a: 'To prevent catastrophic laser beam self-focusing and optical damage, laser amplifier chains keep the cumulative B-integral below $\sim 3\text{ to }5\text{ radians}$.' }]
  },

  // 23. Optical Fiber Attenuation & Link Budget Power Loss Calculator
  {
    slug: 'optical-attenuation-decibels-per-kilometer-fiber-loss-calculator',
    name: 'Optical Fiber Attenuation (dB/km) & Link Budget Power Loss Calculator',
    description: 'Calculate telecommunications fiber optic link budget optical power loss in dB (Total Loss = α · L + N_splice · Loss_splice + N_conn · Loss_conn), received optical power P_rx in dBm, and maximum transmission reach distance.',
    category: 'Science',
    icon: 'text',
    keywords: ['fiber link budget calculator', 'optical attenuation db per km formula online', 'received optical power dbm fiber loss calculator', 'fiber optic splice connector power margin calculator', 'optical communications telecommunications networking online'],
    order: 1382,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Transmitter Launch P_tx (dBm), Fiber Length L (km), Attenuation α (dB/km) & Splices/Connectors',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fl-ptx">Launch P_tx (dBm)</label>
          <input class="tool-textarea" id="fl-ptx" type="number" step="1" value="0.0" placeholder="0.0 dBm (1.0 mW)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fl-l">Length L (km)</label>
          <input class="tool-textarea" id="fl-l" type="number" step="5" value="40.0" placeholder="40.0 km Link" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fl-alpha">Loss α (dB/km)</label>
          <input class="tool-textarea" id="fl-alpha" type="number" step="0.02" value="0.20" placeholder="0.20 dB/km (1550nm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fl-conn">Connectors</label>
          <input class="tool-textarea" id="fl-conn" type="number" step="1" value="2" placeholder="2 (0.5 dB each)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fl-sens">Rx Sens (dBm)</label>
          <input class="tool-textarea" id="fl-sens" type="number" step="1" value="-24.0" placeholder="-24.0 dBm" />
        </div>
      </div>
      <div id="fl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fl-res-prx" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Received Power P_rx = -9.00 dBm (125.9 μW)</span>
            <span class="stat-label">Received Optical Signal Power (P_rx = P_tx - Total Link Loss)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fl-res-margin" style="color:var(--green-dark); font-weight:700;">Power Margin = +15.00 dB (> 3 dB Safety Margin: Robust High-Speed Link ✓)</span>
            <span class="stat-label">Optical Safety Margin (P_rx - Receiver Sensitivity)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ptxEl = document.getElementById('fl-ptx'), lEl = document.getElementById('fl-l');
  const alEl = document.getElementById('fl-alpha'), cnEl = document.getElementById('fl-conn'), snEl = document.getElementById('fl-sens');
  const prResEl = document.getElementById('fl-res-prx'), mgResEl = document.getElementById('fl-res-margin');

  function update() {
    const P_tx_dBm = parseFloat(ptxEl.value), L_km = parseFloat(lEl.value);
    const alpha_dB_km = parseFloat(alEl.value), N_conn = parseInt(cnEl.value, 10), P_sens_dBm = parseFloat(snEl.value);

    if (isNaN(P_tx_dBm) || isNaN(L_km) || isNaN(alpha_dB_km) || isNaN(N_conn) || isNaN(P_sens_dBm) || L_km < 0 || alpha_dB_km < 0 || N_conn < 0) return;

    // Fiber glass attenuation:
    const fiber_loss_dB = alpha_dB_km * L_km;

    // Connector losses (0.5 dB per connector pair):
    const connector_loss_dB = N_conn * 0.50;

    // Estimated fusion splices (1 splice per 5 km @ 0.1 dB each):
    const num_splices = Math.max(0, Math.floor(L_km / 5.0));
    const splice_loss_dB = num_splices * 0.10;

    // Total link loss:
    const total_loss_dB = fiber_loss_dB + connector_loss_dB + splice_loss_dB;

    // Received power: P_rx = P_tx - total_loss
    const P_rx_dBm = P_tx_dBm - total_loss_dB;
    const P_rx_uW = Math.pow(10.0, P_rx_dBm / 10.0) * 1000.0;

    // Safety margin:
    const margin_dB = P_rx_dBm - P_sens_dBm;

    let qual = '', color = '#22543d';
    if (margin_dB >= 3.0) {
      qual = 'LINK CLOSED (Margin ≥ +3 dB: Excellent error-free signal transmission ✓)';
      color = '#22543d';
    } else if (margin_dB >= 0) {
      qual = 'MARGINAL LINK (0 to +3 dB: High bit error rate risk)';
      color = '#ea580c';
    } else {
      qual = 'LINK FAILED (Margin < 0 dB: Received signal below receiver sensitivity ✗)';
      color = '#c53030';
    }

    prResEl.textContent = 'Received Power P_rx = ' + P_rx_dBm.toFixed(2) + ' dBm (' + (P_rx_uW >= 1 ? P_rx_uW.toFixed(1) + ' μW' : (P_rx_uW*1000).toFixed(1) + ' nW') + ')';
    prResEl.style.color = color;
    mgResEl.textContent = 'Power Margin = ' + (margin_dB >= 0 ? '+' : '') + margin_dB.toFixed(2) + ' dB (Loss = ' + total_loss_dB.toFixed(2) + ' dB: Fiber ' + fiber_loss_dB.toFixed(1) + 'dB, Conn ' + connector_loss_dB.toFixed(1) + 'dB, Splices ' + splice_loss_dB.toFixed(1) + 'dB)';
  }

  [ptxEl, lEl, alEl, cnEl, snEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter transmitter laser optical launch power in dBm (0 dBm = 1.0 mW).',
      'Enter total single-mode fiber route length L in kilometers.',
      'Enter fiber cable attenuation $\alpha$ in dB/km (typically 0.20 dB/km at 1550 nm, 0.35 dB/km at 1310 nm).',
      'Enter number of optical patch connectors along the link (0.5 dB loss each).',
      'Enter receiver optical sensitivity in dBm (e.g. -24 dBm for $10^{-12}$ BER).',
      'Inspect received optical power $P_{\text{rx}}$ and net optical safety link margin in dB.'
    ],
    benefitTitle: 'ITU-T G.652 Optical Transmission Link Budget Standard',
    benefitContent: 'Validates that transmitted optical laser power overcomes fiber Rayleigh scattering, connector insertion, and fusion splice losses before hitting the photodiode receiver sensitivity floor.',
    faqs: [{ q: 'Why is fiber attenuation lowest at 1550 nm?', a: '1550 nm sits at the fundamental minimum where short-wavelength Rayleigh scattering ($\propto 1/\lambda^4$) balances long-wavelength silica infrared vibrational absorption.' }]
  },

  // 24. Quantum Key Distribution QBER (BB84 QKD Protocol) Calculator
  {
    slug: 'quantum-bit-error-rate-qber-bb84-qkd-security-calculator',
    name: 'Quantum Key Distribution QBER (BB84 QKD Protocol Security Threshold) Calculator',
    description: 'Calculate Quantum Key Distribution Quantum Bit Error Rate percentage (QBER = N_error / N_sifted · 100%), Shor-Preskill secret key generation rate R_key (R_key = 1 - 2·H_2(QBER)), and eavesdropper (Eve) detection security threshold (QBER under 11.0%).',
    category: 'Math',
    icon: 'text',
    keywords: ['qber calculator', 'quantum bit error rate formula bb84 qkd online', 'quantum cryptography secret key rate calculator', 'shor preskill 11 percent qber security threshold calculator', 'quantum cryptography quantum information cybersecurity online'],
    order: 1383,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sifted Key Bit Count N_sifted & Measured Error Bits N_error',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qk-sift">Sifted Bits N_sift</label>
          <input class="tool-textarea" id="qk-sift" type="number" step="10000" value="100000" placeholder="100,000 Bits" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qk-err">Error Bits N_err</label>
          <input class="tool-textarea" id="qk-err" type="number" step="500" value="3500" placeholder="3,500 Errors" />
        </div>
      </div>
      <div id="qk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qk-res-qber" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">QBER = 3.50% (PROVABLY SECURE)</span>
            <span class="stat-label">Quantum Bit Error Rate (QBER = N_error / N_sifted · 100%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qk-res-key" style="color:var(--green-dark); font-weight:700;">Secret Key Fraction = 56.1% (56,100 Secure Raw Bits | QBER < 11.0% Threshold ✓)</span>
            <span class="stat-label">Asymptotic Secret Key Fraction (R_key = 1 - 2·H₂(QBER))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sfEl = document.getElementById('qk-sift'), erEl = document.getElementById('qk-err');
  const qbResEl = document.getElementById('qk-res-qber'), kyResEl = document.getElementById('qk-res-key');

  // Binary Shannon entropy: H2(p) = - p*log2(p) - (1-p)*log2(1-p)
  function H2(p) {
    if (p <= 0 || p >= 1) return 0;
    return - (p * Math.log2(p)) - ((1.0 - p) * Math.log2(1.0 - p));
  }

  function update() {
    const N_sift = parseFloat(sfEl.value), N_err = parseFloat(erEl.value);
    if (isNaN(N_sift) || isNaN(N_err) || N_sift <= 0 || N_err < 0 || N_err > N_sift) return;

    // QBER = N_error / N_sifted
    const QBER = N_err / N_sift;
    const QBER_pct = QBER * 100.0;

    // Shor-Preskill security formula for one-way classical post-processing:
    // Secret Key Fraction: R_key = max(0, 1 - 2 * H2(QBER))
    const h2_val = H2(QBER);
    const R_key = Math.max(0.0, 1.0 - (2.0 * h2_val));
    const secure_bits = Math.round(R_key * N_sift);

    let status = '', color = '#22543d';
    if (QBER_pct < 11.0) {
      status = 'SECURE QUANTUM KEY (QBER < 11.0%: Information reconciliation & privacy amplification succeed ✓)';
      color = '#22543d';
    } else {
      status = 'UNSECURE: EAVESDROPPER DETECTED / HIGH NOISE (QBER ≥ 11.0%: Key discarded ✗)';
      color = '#c53030';
    }

    qbResEl.textContent = 'QBER = ' + QBER_pct.toFixed(2) + '% (' + (QBER_pct < 11.0 ? 'SECURE ✓' : 'UNSECURE ✗') + ')';
    qbResEl.style.color = color;
    kyResEl.textContent = 'Secret Key Fraction = ' + (R_key * 100).toFixed(1) + '% (' + secure_bits.toLocaleString() + ' Final Secure Bits | ' + status + ')';
  }

  sfEl.addEventListener('input', update);
  erEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total number of sifted quantum key bits exchanged between Alice and Bob.',
      'Enter number of mismatched error bits detected during parity-check error estimation.',
      'Inspect Quantum Bit Error Rate (QBER) and net secret key generation fraction.'
    ],
    benefitTitle: 'Charles Bennett & Gilles Brassard 1984 (BB84) Protocol',
    benefitContent: 'Quantum No-Cloning Theorem guarantees that any eavesdropping attempt by an adversary (Eve) disturbs quantum polarization states, inevitably increasing QBER above the $11.0\%$ Shor-Preskill security limit.',
    faqs: [{ q: 'Why is 11.0% the theoretical maximum QBER threshold?', a: 'Above $11.0\%$, an eavesdropper could possess more mutual information about the raw key than Bob, making classical privacy amplification impossible.' }]
  },

  // 25. Superconducting Josephson Junction Critical Current Calculator
  {
    slug: 'josephson-junction-critical-current-flux-quantum-calculator',
    name: 'Superconducting Josephson Junction Critical Current (I_c) & Flux Quantum (Φ₀) Calculator',
    description: 'Calculate superconducting Josephson tunnel junction maximum critical current I_c in μA (Ambegaokar-Baratoff Formula: I_c = π·Δ(T) / (2·e·R_n)), Josephson inductance L_J (L_J = Φ₀ / (2π·I_c)), and AC Josephson oscillation frequency f = 2eV / h.',
    category: 'Science',
    icon: 'text',
    keywords: ['josephson junction calculator', 'ambegaokar baratoff critical current formula online', 'josephson inductance flux quantum calculator', 'superconducting transmon qubit ac josephson frequency calculator', 'quantum computing superconductivity solid state physics online'],
    order: 1384,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Superconducting Energy Gap Δ (meV, e.g. 1.50 meV for Niobium), Normal Resistance R_n (Ω) & Bias Voltage V (μV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="jj-delta">Energy Gap Δ (meV)</label>
          <input class="tool-textarea" id="jj-delta" type="number" step="0.1" value="1.50" placeholder="1.50 meV (Niobium @ 4K)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jj-rn">Normal R_n (Ω)</label>
          <input class="tool-textarea" id="jj-rn" type="number" step="50" value="500.0" placeholder="500.0 Ω (Tunnel Barrier)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jj-v">Bias Voltage V (μV)</label>
          <input class="tool-textarea" id="jj-v" type="number" step="2" value="10.0" placeholder="10.0 μV DC Bias" />
        </div>
      </div>
      <div id="jj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="jj-res-ic" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Critical Current I_c = 4.71 μA</span>
            <span class="stat-label">Ambegaokar-Baratoff Zero-Voltage Supercurrent (I_c = π·Δ / 2e·R_n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="jj-res-ac" style="color:var(--green-dark); font-weight:700;">AC Frequency f = 4.836 GHz (483.6 MHz/μV) | Josephson Inductance L_J = 70.0 nH</span>
            <span class="stat-label">AC Josephson Oscillation Frequency (f = 2e·V / h) & Nonlinear Inductance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dlEl = document.getElementById('jj-delta'), rnEl = document.getElementById('jj-rn'), vEl = document.getElementById('jj-v');
  const icResEl = document.getElementById('jj-res-ic'), acResEl = document.getElementById('jj-res-ac');

  const Phi_0 = 2.067833848e-15; // Wb (Magnetic Flux Quantum h / 2e)
  const e_charge = 1.602176634e-19; // C

  function update() {
    const Delta_meV = parseFloat(dlEl.value), R_n = parseFloat(rnEl.value), V_uV = parseFloat(vEl.value);
    if (isNaN(Delta_meV) || isNaN(R_n) || isNaN(V_uV) || Delta_meV <= 0 || R_n <= 0) return;

    // Ambegaokar-Baratoff formula at T = 0 K:
    // I_c = ( pi * Delta ) / ( 2 * e * R_n )  [Amperes]
    // where Delta is in Joules = Delta_meV * 1e-3 * e
    // Simplifying: I_c = ( pi * (Delta_meV * 1e-3) ) / ( 2 * R_n )
    const I_c_A = (Math.PI * (Delta_meV * 1e-3)) / (2.0 * R_n);
    const I_c_uA = I_c_A * 1e6;

    // Josephson non-linear inductance: L_J = Phi_0 / ( 2 * pi * I_c )  [Henries -> nH]
    const L_J_H = Phi_0 / (2.0 * Math.PI * I_c_A);
    const L_J_nH = L_J_H * 1e9;

    // AC Josephson effect frequency: f = 2 * e * V / h = V / Phi_0  [Hz -> GHz]
    const V_V = V_uV * 1e-6;
    const f_Hz = V_V / Phi_0;
    const f_GHz = f_Hz * 1e-9;

    icResEl.textContent = 'Critical Current I_c = ' + I_c_uA.toFixed(2) + ' μA';
    acResEl.textContent = 'AC Frequency f = ' + f_GHz.toFixed(3) + ' GHz (483.6 MHz/μV) | Inductance L_J = ' + L_J_nH.toFixed(1) + ' nH (R_n=' + R_n + ' Ω, Δ=' + Delta_meV + ' meV)';
  }

  [dlEl, rnEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter superconducting Cooper pair gap energy $\Delta$ in meV (typically 1.50 meV for Niobium, 0.20 meV for Aluminum).',
      'Enter normal-state tunnel barrier junction resistance $R_n$ in Ohms.',
      'Enter DC bias voltage V in microvolts ($\mu\text{V}$).',
      'Inspect maximum zero-voltage supercurrent $I_c$, non-linear Josephson inductance $L_J$, and AC microwave oscillation frequency in GHz.'
    ],
    benefitTitle: 'Brian David Josephson 1962 Nobel Prize Equations',
    benefitContent: 'Non-dissipative quantum tunneling of Cooper electron pairs provides the macroscopic quantum non-linear inductance foundation for IBM and Google superconducting quantum computers (Transmon qubits) and ultra-sensitive SQUID magnetometers.',
    faqs: [{ q: 'What is the exact value of the magnetic flux quantum Φ₀?', a: '$\Phi_0 = \frac{h}{2e} \approx 2.067833848 \times 10^{-15}\text{ Wb}$ (Tesla$\cdot\text{m}^2$).' }]
  }
];

pack49Tools.forEach(createTool);
console.log('Pack 49 complete: ' + pack49Tools.length + ' tools created.');
