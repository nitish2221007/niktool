const { createTool } = require('./generate-curated-tools.cjs');

// Pack 29: Final 20 Tools covering Relativistic Astrophysics, Quantum Optics, Space Propulsion & Cosmic Information Theory (Tools 981 to 1,000 - GRAND FINALE!)
const pack29Tools = [
  // --- Suite EEEEEE: Relativistic Astrophysics, Black Holes & General Relativity (981 - 985) ---
  // 1. Schwarzschild Black Hole Event Horizon Radius (r_s) & Hawking Temperature Calculator
  {
    slug: 'schwarzschild-radius-black-hole-event-horizon-calculator',
    name: 'Schwarzschild Black Hole Event Horizon (r_s = 2GM/c²) & Hawking Temperature Calculator',
    description: 'Calculate general relativistic non-rotating Schwarzschild black hole Event Horizon radius (r_s = 2·G·M / c²) in km, Hawking quantum evaporation temperature (T_H = ℏ·c³ / (8π·G·M·k_B)) in Kelvin, and tidal spaghettification gradient.',
    category: 'Science',
    icon: 'text',
    keywords: ['schwarzschild radius calculator', 'black hole event horizon formula rs equals 2gm over c squared online', 'hawking temperature black hole evaporation calculator', 'astrophysics solar mass event horizon radius calculator', 'general relativity schwarzschild metric online'],
    order: 862,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Black Hole Mass M (Solar Masses M_☉ or kg) & Observer Distance r (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bh-mass">Mass (M_☉ Solar)</label>
          <input class="tool-textarea" id="bh-mass" type="number" step="any" value="4.15e6" placeholder="4.15e6 (Sagittarius A* Milky Way)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bh-preset">Black Hole Preset</label>
          <select class="tool-textarea" id="bh-preset">
            <option value="sgrA" selected>Sagittarius A* (4.15 Million M_☉ - Milky Way Center)</option>
            <option value="m87">M87* Supermassive (6.5 Billion M_☉ - EHT Image)</option>
            <option value="stellar">Cygnus X-1 (14.8 M_☉ - Stellar Mass BH)</option>
            <option value="earth">Earth Mass BH (M = 1.0 M_earth: r_s = 8.87 mm)</option>
          </select>
        </div>
      </div>
      <div id="bh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bh-res-rs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">r_s = 12.26 Million km Radius</span>
            <span class="stat-label">Schwarzschild Event Horizon Radius (r_s = 2GM/c²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bh-res-hawk" style="font-weight:700;">Hawking Temp T_H = 1.49 × 10⁻¹⁴ K | Photon Sphere r_ph = 1.5·r_s = 18.38 Million km</span>
            <span class="stat-label">Hawking Radiation Evaporation Temp & Unstable Photon Orbit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('bh-mass'), prEl = document.getElementById('bh-preset');
  const rsResEl = document.getElementById('bh-res-rs'), hkResEl = document.getElementById('bh-res-hawk');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;
  const hbar = 1.054571817e-34;
  const kB = 1.380649e-23;

  const PRESETS = {
    'sgrA': 4.154e6,
    'm87': 6.5e9,
    'stellar': 14.8,
    'earth': 5.972e24 / M_sun_kg
  };

  function update() {
    const M_solar = parseFloat(mEl.value);
    if (isNaN(M_solar) || M_solar <= 0) return;

    const M_kg = M_solar * M_sun_kg;

    // Schwarzschild radius r_s = (2 * G * M) / c^2  [meters]
    const r_s_m = (2.0 * G * M_kg) / Math.pow(c, 2);
    const r_s_km = r_s_m / 1000.0;
    const r_s_au = r_s_m / 1.495978707e11;

    // Photon sphere r_ph = 1.5 * r_s
    const r_ph_km = 1.5 * r_s_km;

    // Hawking temperature T_H = ( hbar * c^3 ) / ( 8 * pi * G * M * kB )  [Kelvin]
    const T_H_K = (hbar * Math.pow(c, 3)) / (8.0 * Math.PI * G * M_kg * kB);

    let rStr = '';
    if (r_s_km >= 1e6) rStr = (r_s_km / 1e6).toFixed(2) + ' Million km (' + r_s_au.toFixed(2) + ' AU)';
    else if (r_s_km >= 1.0) rStr = r_s_km.toFixed(2) + ' km';
    else rStr = (r_s_m * 1000).toFixed(1) + ' mm (Coin Sized)';

    rsResEl.textContent = 'r_s = ' + rStr + ' Event Horizon';
    hkResEl.textContent = 'Hawking T_H = ' + T_H_K.toExponential(2) + ' K | Photon Sphere r_ph = ' + (r_ph_km >= 1e6 ? (r_ph_km/1e6).toFixed(2) + 'M km' : r_ph_km.toFixed(1) + ' km') + ' (ISCO = 3·r_s)';
  }

  mEl.addEventListener('input', update);
  prEl.addEventListener('change', () => {
    mEl.value = PRESETS[prEl.value];
    update();
  });
  update();
})();`,
    howToSteps: [
      'Enter black hole mass in solar masses ($M_\odot = 1.989 \times 10^{30}\text{ kg}$) or select astronomical presets (Sagittarius A*, M87*, Cygnus X-1).',
      'Inspect Schwarzschild Event Horizon radius $r_s$ in km/AU, photon sphere radius ($r_{\text{ph}} = 1.5 r_s$), and Hawking evaporation thermal temperature $T_H$.'
    ],
    benefitTitle: 'Karl Schwarzschild 1916 Exact Einstein Field Equation Solution',
    benefitContent: 'The Schwarzschild radius ($r_s = \frac{2GM}{c^2}$) defines the absolute boundary where escape velocity equals the speed of light ($v_{\text{esc}} = c$); inside $r_s$, light cones tip inwards, forcing all matter and energy inevitably into the central gravitational singularity.',
    faqs: [{ q: 'Why is Hawking radiation colder for supermassive black holes?', a: 'Hawking temperature is inversely proportional to mass ($T_H \propto 1/M$); supermassive black holes have temperatures of $10^{-14}\text{ K}$, far colder than the $2.7\text{ K}$ Cosmic Microwave Background.' }]
  },

  // 2. Gravitational Time Dilation & Gravitational Redshift (z) Calculator
  {
    slug: 'gravitational-time-dilation-redshift-calculator',
    name: 'General Relativistic Gravitational Time Dilation & Redshift (z) Calculator',
    description: 'Calculate Einstein gravitational time dilation (t_r = t_∞ · √(1 - 2GM / (r·c²))) and spectral gravitational redshift (z = 1/√(1 - r_s/r) - 1) for clocks in GPS orbits, neutron stars, and black holes.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravitational time dilation calculator', 'einstein gravitational redshift formula z equals 1 over sqrt 1 minus rs over r online', 'general relativity clock tick rate gravity well calculator', 'gps satellite general relativity time offset calculator', 'neutron star gravitational redshift calculator online'],
    order: 863,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Body Mass M (Solar Masses M_☉ or Earth Masses) & Radius / Orbital Distance r (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="td-mass">Mass (M_☉)</label>
          <input class="tool-textarea" id="td-mass" type="number" step="any" value="1.40" placeholder="1.40 (Neutron Star)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="td-r">Distance r (km)</label>
          <input class="tool-textarea" id="td-r" type="number" step="1" value="12.0" placeholder="12.0 km (Surface)" />
        </div>
      </div>
      <div id="td-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="td-res-gamma" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Time Slowing: 1.0 s -> 0.809 s</span>
            <span class="stat-label">Proper Time Tick Rate Factor (√(1 - r_s / r))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="td-res-z" style="color:var(--green-dark); font-weight:700;">Gravitational Redshift z = +0.236 (Light Wavelength expands by +23.6%)</span>
            <span class="stat-label">Gravitational Spectral Redshift (z = Δλ / λ₀)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('td-mass'), rEl = document.getElementById('td-r');
  const gmResEl = document.getElementById('td-res-gamma'), zResEl = document.getElementById('td-res-z');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;

  function update() {
    const M_solar = parseFloat(mEl.value), r_km = parseFloat(rEl.value);
    if (isNaN(M_solar) || isNaN(r_km) || M_solar <= 0 || r_km <= 0) return;

    const M_kg = M_solar * M_sun_kg;
    const r_m = r_km * 1000.0;

    // Schwarzschild radius r_s = 2GM / c^2  [meters]
    const r_s_m = (2.0 * G * M_kg) / Math.pow(c, 2);

    if (r_m <= r_s_m) {
      gmResEl.textContent = 'TIME FREEZES (Inside Event Horizon)';
      zResEl.textContent = 'Infinite Redshift z = ∞ (Zero light escapes to infinity)';
      return;
    }

    // Time dilation factor tau / t_inf = sqrt( 1 - r_s / r )
    const time_factor = Math.sqrt(1.0 - (r_s_m / r_m));

    // Gravitational redshift z = 1 / sqrt( 1 - r_s / r ) - 1
    const z_redshift = (1.0 / time_factor) - 1.0;

    gmResEl.textContent = 'Time Factor: ' + time_factor.toFixed(4) + ' (Clocks run ' + ((1.0 - time_factor)*100).toFixed(2) + '% slower)';
    zResEl.textContent = 'Gravitational Redshift z = +' + z_redshift.toFixed(4) + ' (r_s = ' + (r_s_m/1000).toFixed(2) + ' km @ r = ' + r_km + ' km)';
  }

  mEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter celestial mass in solar masses $M_\odot$.',
      'Enter observer radial distance r from center of mass in kilometers.',
      'Inspect gravitational proper time dilation factor ($\sqrt{1 - r_s/r}$) and spectral gravitational redshift z.'
    ],
    benefitTitle: 'Albert Einstein 1915 Gravitational Equivalence Principle',
    benefitContent: 'Clocks deeper in a gravitational potential well tick slower than distant clocks; GPS atomic satellites in orbit run $45.9\ \mu\text{s}$ faster per day due to General Relativity (and $7.2\ \mu\text{s}$ slower due to Special Relativity), requiring a net $+38.7\ \mu\text{s/day}$ frequency compensation to maintain 1-meter navigational accuracy.',
    faqs: [{ q: 'What happens to light emitted at the Schwarzschild event horizon (r = rs)?', a: 'The gravitational redshift becomes infinite ($z \to \infty$), shifting light wavelengths infinitely red until photon energy drops to zero.' }]
  },

  // 3. Gravitational Wave Chirp Mass (ℳ) & Binary Orbital Decay Calculator
  {
    slug: 'gravitational-wave-strain-orbital-decay-chirp-mass-calculator',
    name: 'Binary Chirp Mass (ℳ) & Gravitational Wave Orbital Decay (GW) Calculator',
    description: 'Calculate compact binary black hole/neutron star merger Chirp Mass (ℳ = (m₁·m₂)^(3/5) / (m₁ + m₂)^(1/5)) in solar masses and Einstein quadrupole gravitational wave orbital decay rate (df/dt = (96/5)·π^(8/3)·(Gℳ/c³)^(5/3)·f^(11/3)).',
    category: 'Science',
    icon: 'text',
    keywords: ['gravitational wave chirp mass calculator', 'chirp mass formula script m equals m1 m2 to 3 5 over m1 plus m2 to 1 5', 'ligo gravitational wave frequency evolution df dt calculator', 'binary black hole merger orbital decay time calculator', 'einstein quadrupole formula gravitational radiation online'],
    order: 864,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primary Mass m₁ (M_☉), Secondary Mass m₂ (M_☉) & Current GW Frequency f_GW (Hz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gw-m1">Mass m₁ (M_☉)</label>
          <input class="tool-textarea" id="gw-m1" type="number" step="1" value="36.0" placeholder="36.0 (GW150914 BH)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-m2">Mass m₂ (M_☉)</label>
          <input class="tool-textarea" id="gw-m2" type="number" step="1" value="29.0" placeholder="29.0 (GW150914 BH)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-f">Frequency f_GW (Hz)</label>
          <input class="tool-textarea" id="gw-f" type="number" step="10" value="100.0" placeholder="100.0 Hz (Inspiral)" />
        </div>
      </div>
      <div id="gw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gw-res-mchirp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ℳ = 28.1 M_☉ Chirp Mass</span>
            <span class="stat-label">Binary Invariant Chirp Mass (ℳ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gw-res-dfdt" style="font-weight:700;">Frequency Derivative df/dt = +1,782 Hz/s (Time to Merger: 15.6 ms | LIGO Ringdown)</span>
            <span class="stat-label">Quadrupole Frequency Up-Chirp Rate & Time to Merger</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('gw-m1'), m2El = document.getElementById('gw-m2'), fEl = document.getElementById('gw-f');
  const mcResEl = document.getElementById('gw-res-mchirp'), dfResEl = document.getElementById('gw-res-dfdt');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;

  function update() {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value), f_gw = parseFloat(fEl.value);
    if (isNaN(m1) || isNaN(m2) || isNaN(f_gw) || m1 <= 0 || m2 <= 0 || f_gw <= 0) return;

    // Chirp mass M_chirp = (m1 * m2)^(3/5) / (m1 + m2)^(1/5)  [Solar masses]
    const M_chirp_solar = Math.pow(m1 * m2, 0.6) / Math.pow(m1 + m2, 0.2);
    const M_chirp_kg = M_chirp_solar * M_sun_kg;

    // Frequency chirp rate df/dt:
    // df/dt = (96/5) * pi^(8/3) * ( (G * M_chirp) / c^3 )^(5/3) * f^(11/3)  [Hz / s]
    const geomFactor = (G * M_chirp_kg) / Math.pow(c, 3);
    const df_dt = (96.0 / 5.0) * Math.pow(Math.PI, 8.0/3.0) * Math.pow(geomFactor, 5.0/3.0) * Math.pow(f_gw, 11.0/3.0);

    // Time to merger tau_merge = (5/256) * ( c^3 / (G * M_chirp) )^(5/3) * ( pi * f_gw )^(-8/3)  [seconds]
    const tau_merge_sec = (5.0 / 256.0) * Math.pow(geomFactor, -5.0/3.0) * Math.pow(Math.PI * f_gw, -8.0/3.0);
    const tau_merge_ms = tau_merge_sec * 1000.0;

    mcResEl.textContent = 'ℳ = ' + M_chirp_solar.toFixed(2) + ' M_☉ (Total M = ' + (m1 + m2).toFixed(1) + ' M_☉)';
    dfResEl.textContent = 'Chirp df/dt = +' + Math.round(df_dt).toLocaleString() + ' Hz/s | Time to Merger: ' + (tau_merge_ms < 1000 ? tau_merge_ms.toFixed(1) + ' ms' : tau_merge_sec.toFixed(2) + ' s') + ' @ ' + f_gw + ' Hz';
  }

  [m1El, m2El, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter primary compact object mass $m_1$ in solar masses $M_\odot$.',
      'Enter secondary compact object mass $m_2$ in solar masses $M_\odot$.',
      'Enter instantaneous gravitational wave frequency $f_{\text{GW}}$ in Hz ($f_{\text{GW}} = 2 \times f_{\text{orbit}}$).',
      'Inspect invariant Chirp Mass $\mathcal{M}$, frequency up-chirp acceleration rate $df/dt$ in Hz/s, and remaining time until merger coalescence.'
    ],
    benefitTitle: 'Rainer Weiss, Kip Thorne & Barry Barish 2017 Nobel LIGO Discovery',
    benefitContent: 'Gravitational radiation siphons orbital angular momentum according to Einstein\'s quadrupole formula, causing inspiraling binaries to accelerate in both frequency and amplitude ($df/dt \propto \mathcal{M}^{5/3} f^{11/3}$), creating the characteristic audio "chirp" detected across 1.3 billion light-years by laser interferometers (LIGO / Virgo).',
    faqs: [{ q: 'Why is Chirp Mass (ℳ) measured with extreme precision by LIGO?', a: 'Because the phase evolution of the gravitational wave inspiral depends directly on $\mathcal{M}$, matching waveform templates determines chirp mass to within $<1\%$ uncertainty.' }]
  },

  // 4. Kerr Rotating Black Hole Ergosphere & Frame-Dragging Calculator
  {
    slug: 'kerr-black-hole-ergosphere-frame-dragging-calculator',
    name: 'Kerr Rotating Black Hole Ergosphere (r_E) & Frame-Dragging (Lense-Thirring) Calculator',
    description: 'Calculate Kerr rotating black hole outer Event Horizon (r_+ = G·M/c² · [1 + √(1 - a*²)]) and oblate Ergosphere boundary radius (r_E(θ) = G·M/c² · [1 + √(1 - a*²·cos² θ)]) for energy extraction via the Penrose Process.',
    category: 'Science',
    icon: 'text',
    keywords: ['kerr black hole calculator', 'ergosphere radius formula re equals gm over c squared 1 plus sqrt 1 minus a squared online', 'frame dragging lense thirring angular velocity calculator', 'penrose process black hole energy extraction calculator', 'spinning kerr metric event horizon online'],
    order: 865,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass M (Solar Masses M_☉), Dimensionless Spin Parameter a* (0 to 0.998) & Colatitude Angle θ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kerr-mass">Mass (M_☉)</label>
          <input class="tool-textarea" id="kerr-mass" type="number" step="any" value="10.0" placeholder="10.0 M_☉" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kerr-spin">Spin a* (0 - 0.998)</label>
          <input class="tool-textarea" id="kerr-spin" type="number" step="0.05" min="0" max="0.998" value="0.90" placeholder="0.90 (Rapid Spin)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kerr-th">Colatitude θ (°)</label>
          <input class="tool-textarea" id="kerr-th" type="number" step="15" value="90.0" placeholder="90.0° (Equator)" />
        </div>
      </div>
      <div id="kerr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kerr-res-re" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">r_E = 29.54 km Ergosphere</span>
            <span class="stat-label">Ergosphere Boundary Radius (r_E(θ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kerr-res-pen" style="color:var(--green-dark); font-weight:700;">PENROSE PROCESS ACTIVE: Up to 29.0% Black Hole Mass-Energy Extracted in Ergoregion</span>
            <span class="stat-label">Event Horizon r_+ = 21.21 km & Energy Extraction Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('kerr-mass'), aEl = document.getElementById('kerr-spin'), thEl = document.getElementById('kerr-th');
  const reResEl = document.getElementById('kerr-res-re'), pnResEl = document.getElementById('kerr-res-pen');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;

  function update() {
    const M_solar = parseFloat(mEl.value), a_star = parseFloat(aEl.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(M_solar) || isNaN(a_star) || isNaN(thetaDeg) || M_solar <= 0 || a_star < 0 || a_star > 1.0) return;

    const M_kg = M_solar * M_sun_kg;
    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Characteristic gravitational radius r_g = G*M / c^2  [km]
    const r_g_km = ((G * M_kg) / Math.pow(c, 2)) / 1000.0;

    // Outer event horizon r_+ = r_g * ( 1 + sqrt(1 - a*^2) )
    const r_plus_km = r_g_km * (1.0 + Math.sqrt(1.0 - Math.pow(a_star, 2)));

    // Outer ergosphere radius r_E(theta) = r_g * ( 1 + sqrt(1 - a*^2 * cos^2(theta)) )
    const r_E_km = r_g_km * (1.0 + Math.sqrt(1.0 - (Math.pow(a_star, 2) * Math.pow(Math.cos(thetaRad), 2))));

    // Maximum theoretical Penrose energy extraction efficiency: eta = 1 - sqrt( (1 + sqrt(1 - a*^2)) / 2 )
    const eta_penrose = 1.0 - Math.sqrt((1.0 + Math.sqrt(1.0 - Math.pow(a_star, 2))) / 2.0);
    const eta_pct = eta_penrose * 100.0;

    reResEl.textContent = 'r_E = ' + r_E_km.toFixed(2) + ' km (θ = ' + thetaDeg + '°)';
    pnResEl.textContent = 'Horizon r_+ = ' + r_plus_km.toFixed(2) + ' km | Penrose Max Energy Extraction: ' + eta_pct.toFixed(1) + '% of M_BH·c² (Spin a* = ' + a_star + ')';
  }

  [mEl, aEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter black hole mass in solar masses $M_\odot$.',
      'Enter dimensionless angular momentum spin parameter $a^* = J c / (G M^2)$ ($0 \le a^* \le 0.998$ Thorne limit).',
      'Enter observer colatitude angle $\theta$ ($0^\circ$ at spin pole, $90^\circ$ at equator).',
      'Inspect Ergosphere boundary radius $r_E(\theta)$, inner event horizon $r_+$, and Penrose Process rotational mass-energy extraction efficiency.'
    ],
    benefitTitle: 'Roy Kerr 1963 Spinning Black Hole Metric & Roger Penrose 1969 Ergosphere',
    benefitContent: 'Space-time itself is dragged into rapid rotation (Lense-Thirring frame-dragging) inside the pumpkin-shaped Ergosphere ($r_+ < r < r_E$), preventing any physical particle from remaining stationary relative to distant stars and allowing advanced civilizations or relativistic quasar jets (Blandford-Znajek process) to extract up to $29\%$ of the black hole\'s total mass-energy.',
    faqs: [{ q: 'Why can a particle enter and leave the Ergosphere without falling into the black hole?', a: 'Because the ergosphere lies outside the true event horizon ($r_E > r_+$), particles can enter negative-energy orbits and escape with more kinetic energy than they arrived with (Penrose effect).' }]
  },

  // 5. Eddington Luminosity Radiation Pressure Limit (L_Edd) Calculator
  {
    slug: 'eddington-luminosity-radiation-pressure-limit-calculator',
    name: 'Eddington Luminosity Radiation Pressure Limit (L_Edd = 4π·G·M·m_p·c / σ_T) Calculator',
    description: 'Calculate maximum steady-state astrophysical accretion Eddington Luminosity limit (L_Edd = 1.26 × 10³¹ · (M / M_☉) Watts) in Solar Luminosities (L_☉) and critical Eddington accretion mass growth rate (M_dot_Edd) in M_☉/year for quasars and active galactic nuclei (AGN).',
    category: 'Science',
    icon: 'text',
    keywords: ['eddington luminosity calculator', 'eddington limit formula 4 pi g m m_p c over sigma_t online', 'maximum accretion rate eddington limit quasar agn calculator', 'radiation pressure gravitational balance eddington calculator', 'supermassive black hole growth rate online'],
    order: 866,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Accreting Body Mass M (Solar Masses M_☉) & Radiative Efficiency η (typically 0.10)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="edd-mass">Mass (M_☉)</label>
          <input class="tool-textarea" id="edd-mass" type="number" step="any" value="1.0e8" placeholder="1.0e8 (Supermassive Quasar)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="edd-eta">Efficiency η</label>
          <input class="tool-textarea" id="edd-eta" type="number" step="0.02" value="0.10" placeholder="0.10 (Accretion Disk)" />
        </div>
      </div>
      <div id="edd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="edd-res-ledd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L_Edd = 3.28 × 10¹² L_☉ (Quasar)</span>
            <span class="stat-label">Maximum Eddington Luminosity Limit (L_Edd)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="edd-res-mdot" style="color:var(--green-dark); font-weight:700;">Critical Accretion Rate Ṁ_Edd = 2.22 M_☉ / year (Salpeter e-Folding Time: 45 Million Years)</span>
            <span class="stat-label">Eddington Accretion Mass Growth Rate & Salpeter Doubling Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('edd-mass'), eEl = document.getElementById('edd-eta');
  const lResEl = document.getElementById('edd-res-ledd'), mdResEl = document.getElementById('edd-res-mdot');

  const L_sun_watts = 3.828e26;
  const M_sun_kg = 1.98847e30;
  const c = 299792458;
  const sec_per_year = 3.15576e7;

  function update() {
    const M_solar = parseFloat(mEl.value), eta = parseFloat(eEl.value);
    if (isNaN(M_solar) || isNaN(eta) || M_solar <= 0 || eta <= 0 || eta >= 1.0) return;

    // L_Edd = 1.26e31 * M_solar  [Watts]
    const L_Edd_W = 1.26e31 * M_solar;
    const L_Edd_solar = L_Edd_W / L_sun_watts;

    // Critical accretion rate M_dot = L_Edd / ( eta * c^2 )  [kg / s -> M_sun / year]
    const M_dot_kg_s = L_Edd_W / (eta * Math.pow(c, 2));
    const M_dot_solar_yr = (M_dot_kg_s * sec_per_year) / M_sun_kg;

    // Salpeter e-folding time: t_Salpeter = ( eta * sigma_T * c ) / ( 4 * pi * G * m_p ) approx 45 Million years @ eta=0.1
    const t_Salpeter_Myr = (eta / 0.10) * 45.0;

    lResEl.textContent = 'L_Edd = ' + L_Edd_solar.toExponential(2) + ' L_☉ (' + L_Edd_W.toExponential(2) + ' W)';
    mdResEl.textContent = 'Ṁ_Edd = ' + M_dot_solar_yr.toFixed(2) + ' M_☉/yr | Salpeter e-Folding Time: ' + t_Salpeter_Myr.toFixed(1) + ' Myr (Accretion Efficiency η = ' + (eta*100).toFixed(0) + '%)';
  }

  mEl.addEventListener('input', update);
  eEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter black hole or star mass in solar masses $M_\odot$.',
      'Enter gravitational accretion mass-to-radiation energy conversion efficiency $\eta$ (typically 0.10 for standard Shakura-Sunyaev thin accretion disks).',
      'Inspect maximum stable Eddington Luminosity $L_{\text{Edd}}$ in Solar luminosities ($L_\odot$), maximum mass accretion rate $\dot{M}_{\text{Edd}}$ in $M_\odot/\text{year}$, and Salpeter growth doubling time in millions of years.'
    ],
    benefitTitle: 'Sir Arthur Eddington 1926 Radiation Pressure Equilibrium',
    benefitContent: 'When outgoing photon radiation pressure pushing outward on electrons via Thomson scattering exceeds inward gravitational attraction on protons ($F_{\text{rad}} > F_{\text{grav}}$), excess material is blown away in powerful cosmic winds, setting the fundamental physical speed limit on supermassive black hole growth in the early universe.',
    faqs: [{ q: 'Can black holes exceed the Eddington limit (Super-Eddington accretion)?', a: 'In slim optically thick accretion disks with "photon trapping", advection sweeps radiation directly into the event horizon, allowing super-Eddington accretion rates.' }]
  },

  // --- Suite FFFFFF: Advanced Quantum Optics & Quantum Information Processing (986 - 990) ---
  // 6. Quantum Bell State Entanglement Fidelity & CHSH Inequality Violation Calculator
  {
    slug: 'quantum-bell-state-fidelity-concurrence-entanglement-calculator',
    name: 'Quantum Bell State Entanglement Fidelity & CHSH Bell Inequality (S ≤ 2√2) Calculator',
    description: 'Calculate maximally entangled bipartite qubit Bell state (|Φ⁺⟩ = (|00⟩ + |11⟩)/√2) quantum state tomography fidelity (F), Concurrence (C), and Clauser-Horne-Shimony-Holt (CHSH) Bell inequality violation parameter S (S = 2√2 ≈ 2.828 exceeding 2.0 Classical Bound).',
    category: 'Science',
    icon: 'text',
    keywords: ['chsh inequality calculator', 'bell state entanglement formula s equals 2 sqrt 2 online', 'quantum entanglement concurrence fidelity calculator', 'quantum teleportation bell test violation calculator', 'einstein podolsky rosen epr paradox online'],
    order: 867,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bell Target State (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩), State Purity p (0 to 1.0) & Measurement Angles',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bell-state">Bell State</label>
          <select class="tool-textarea" id="bell-state">
            <option value="phi_plus" selected>|Φ⁺⟩ = (|00⟩ + |11⟩) / √2 (Triplet)</option>
            <option value="phi_minus">|Φ⁻⟩ = (|00⟩ - |11⟩) / √2</option>
            <option value="psi_plus">|Ψ⁺⟩ = (|01⟩ + |10⟩) / √2</option>
            <option value="psi_minus">|Ψ⁻⟩ = (|01⟩ - |10⟩) / √2 (Singlet)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bell-purity">Purity p (0 - 1.0)</label>
          <input class="tool-textarea" id="bell-purity" type="number" step="0.05" min="0" max="1.0" value="0.95" placeholder="0.95 (95% Pure Entangled)" />
        </div>
      </div>
      <div id="bell-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bell-res-s" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CHSH S = 2.687 (NON-LOCAL)</span>
            <span class="stat-label">CHSH Bell Inequality Parameter (Classical S ≤ 2.0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bell-res-fid" style="color:var(--green-dark); font-weight:700;">BELL INEQUALITY VIOLATED: S = 2.69 > 2.0 disproves Local Hidden Variables (Fidelity F = 96.3%)</span>
            <span class="stat-label">Quantum Non-Locality Status & Entanglement Fidelity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const stEl = document.getElementById('bell-state'), pEl = document.getElementById('bell-purity');
  const sResEl = document.getElementById('bell-res-s'), fidResEl = document.getElementById('bell-res-fid');

  const max_chsh = 2.0 * Math.sqrt(2.0); // 2.828427 Tsirelson's bound

  function update() {
    const p = parseFloat(pEl.value);
    if (isNaN(p) || p < 0 || p > 1.0) return;

    // Werner state parameterization: S = p * 2*sqrt(2)
    const S = p * max_chsh;

    // State fidelity F = (1 + 3*p) / 4
    const fidelity = (1.0 + (3.0 * p)) / 4.0;
    const fidelity_pct = fidelity * 100.0;

    // Concurrence C = max(0, (3p - 1)/2)
    const concurrence = Math.max(0.0, (3.0 * p - 1.0) / 2.0);

    let status = '';
    let color = '#22543d';

    if (S > 2.0) {
      status = 'QUANTUM NON-LOCALITY PROVEN (S = ' + S.toFixed(3) + ' > 2.0 Classical Limit: Einstein-Podolsky-Rosen Local Realism Disproven!)';
      color = '#22543d';
    } else {
      status = 'CLASSICALLY EXPLAINABLE (S ≤ 2.0: Werner state noise obscures quantum entanglement)';
      color = '#d97706';
    }

    sResEl.textContent = 'CHSH S = ' + S.toFixed(3) + ' (Tsirelson Bound: 2.828)';
    sResEl.style.color = color;
    fidResEl.textContent = status + ' | Entanglement Concurrence C = ' + concurrence.toFixed(2) + ' (Fidelity F = ' + fidelity_pct.toFixed(1) + '%)';
    fidResEl.style.color = color;
  }

  stEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select target maximally entangled Bell state ($|\Phi^+\rangle, |\Phi^-\rangle, |\Psi^+\rangle, |\Psi^-\rangle$).',
      'Enter Werner state quantum purity fraction p ($0 \le p \le 1.0$).',
      'Inspect CHSH correlation parameter S, compare against the classical local realism limit ($S \le 2.0$) and quantum Tsirelson bound ($S \le 2\sqrt{2} \approx 2.828$), and verify entanglement Concurrence.'
    ],
    benefitTitle: 'John Stewart Bell 1964 & Alain Aspect 2022 Nobel Bell Test',
    benefitContent: 'By experimentally violating the classical CHSH inequality ($S > 2.0$), quantum mechanics conclusively disproves all local hidden variable theories, guaranteeing eavesdropper-proof Quantum Key Distribution (QKD E91 protocol) and certifiable quantum randomness.',
    faqs: [{ q: 'What is Tsirelson\'s Bound?', a: 'Boris Tsirelson proved in 1980 that quantum mechanics cannot exceed $S = 2\sqrt{2} \approx 2.828$, setting the absolute upper limit for quantum correlations.' }]
  },

  // 7. Hong-Ou-Mandel (HOM) Two-Photon Quantum Interference Dip Calculator
  {
    slug: 'hong-ou-mandel-hom-two-photon-interference-dip-calculator',
    name: 'Hong-Ou-Mandel (HOM) Two-Photon Quantum Interference Dip Calculator',
    description: 'Calculate two-photon quantum bunching Hong-Ou-Mandel interference dip visibility (V = (N_max - N_min) / N_max) across a 50:50 beam splitter and measure photon wavepacket indistinguishability coherence length in μm.',
    category: 'Science',
    icon: 'text',
    keywords: ['hong ou mandel calculator', 'hom dip visibility formula v equals nmax minus nmin over nmax online', 'two photon quantum interference beam splitter calculator', 'photon indistinguishability hom dip calculator online', 'quantum optics single photon coincidence counter online'],
    order: 868,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Coincidence Peak N_max, HOM Dip Floor N_min & Wavepacket Coherence Time τ_c (fs)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hom-nmax">N_max (Coinc/s)</label>
          <input class="tool-textarea" id="hom-nmax" type="number" step="100" value="1000" placeholder="1000 Coincidences" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hom-nmin">N_min (Dip Floor)</label>
          <input class="tool-textarea" id="hom-nmin" type="number" step="10" value="30" placeholder="30 (Residual)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hom-tau">Coherence τ_c (fs)</label>
          <input class="tool-textarea" id="hom-tau" type="number" step="10" value="100.0" placeholder="100.0 fs" />
        </div>
      </div>
      <div id="hom-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hom-res-vis" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V = 97.0% HOM Visibility</span>
            <span class="stat-label">HOM Quantum Interference Dip Visibility (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hom-res-coh" style="color:var(--green-dark); font-weight:700;">HIGH QUANTUM INDISTINGUISHABILITY (V > 50% Classical Limit: Bosonic Bunching Verified)</span>
            <span class="stat-label">Single-Photon Indistinguishability & Spatial Dip Width</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mxEl = document.getElementById('hom-nmax'), mnEl = document.getElementById('hom-nmin'), tEl = document.getElementById('hom-tau');
  const vResEl = document.getElementById('hom-res-vis'), cResEl = document.getElementById('hom-res-coh');

  const c_light = 299792458;

  function update() {
    const N_max = parseFloat(mxEl.value), N_min = parseFloat(mnEl.value), tau_fs = parseFloat(tEl.value);
    if (isNaN(N_max) || isNaN(N_min) || isNaN(tau_fs) || N_max <= 0 || N_min < 0 || N_min > N_max) return;

    // HOM Dip Visibility V = (N_max - N_min) / N_max
    const V = (N_max - N_min) / N_max;
    const V_pct = V * 100.0;

    // Coherence spatial length L_coh = c * tau_c  [um]
    const tau_sec = tau_fs * 1e-15;
    const L_coh_m = c_light * tau_sec;
    const L_coh_um = L_coh_m * 1e6;

    let status = '';
    let color = '#22543d';

    if (V_pct > 90.0) {
      status = 'EXCELLENT INDISTINGUISHABILITY (V > 90%: Suitable for Linear Optical Quantum Computing gates)';
      color = '#22543d';
    } else if (V_pct > 50.0) {
      status = 'QUANTUM NATURE CONFIRMED (V > 50% Classical Limit: Non-classical destructive coincidence interference)';
      color = '#2563eb';
    } else {
      status = 'CLASSICAL MIXTURE (V ≤ 50%: Distinguishable photon frequencies, polarizations, or timing jitter)';
      color = '#d97706';
    }

    vResEl.textContent = 'V = ' + V_pct.toFixed(1) + '% HOM Dip Visibility';
    vResEl.style.color = color;
    cResEl.textContent = status + ' | Dip Width Δx = ' + L_coh_um.toFixed(2) + ' μm (Photon Coherence Time τ = ' + tau_fs + ' fs)';
    cResEl.style.color = color;
  }

  [mxEl, mnEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter maximum out-of-dip coincidence detection rate $N_{\max}$.',
      'Enter minimum zero-delay HOM dip floor coincidence rate $N_{\min}$.',
      'Enter single-photon wavepacket temporal coherence length $\tau_c$ in femtoseconds (fs).',
      'Inspect Hong-Ou-Mandel dip visibility $V = (N_{\max} - N_{\min}) / N_{\max}$ and verify photon bosonic bunching indistinguishability.'
    ],
    benefitTitle: 'C. K. Hong, Z. Y. Ou & L. Mandel 1987 Two-Photon Quantum Interference',
    benefitContent: 'When two identical indistinguishable single photons strike a 50:50 beam splitter simultaneously, quantum path amplitudes cancel destructively, forcing both photons to emerge together out the same output port (Bosonic Bunching), providing the core 2-qubit gate mechanism for photonic quantum computing (KLM protocol).',
    faqs: [{ q: 'Why is the classical visibility limit exactly 50%?', a: 'Two classical independent light pulses can at most produce a 50% coincidence reduction ($V \le 0.50$); any visibility $V > 50\%$ is proof of genuine quantum mechanical entanglement.' }]
  },

  // 8. Bloch Sphere Qubit State Coordinates & Quantum Rotation Gate Calculator
  {
    slug: 'bloch-sphere-qubit-rotation-coordinates-calculator',
    name: 'Bloch Sphere Qubit State (|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩) Calculator',
    description: 'Calculate 2-level quantum state Bloch Sphere cartesian coordinates (x = sin θ·cos φ, y = sin θ·sin φ, z = cos θ) and simulate single-qubit quantum logic gate rotations (Hadamard H, Pauli X, Y, Z, Phase S, T gate).',
    category: 'Science',
    icon: 'text',
    keywords: ['bloch sphere calculator', 'qubit state vector formula psi equals cos theta over 2 online', 'bloch sphere cartesian coordinates xyz calculator', 'single qubit rotation gate hadamard pauli calculator', 'quantum computing bloch vector visualization online'],
    order: 869,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Colatitude Polar Angle θ (0 to 180°) & Azimuthal Phase Angle φ (0 to 360°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bl-th">Polar θ (°)</label>
          <input class="tool-textarea" id="bl-th" type="number" step="15" min="0" max="180" value="90.0" placeholder="90.0° (Equator Superposition)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-phi">Phase φ (°)</label>
          <input class="tool-textarea" id="bl-phi" type="number" step="15" min="0" max="360" value="0.0" placeholder="0.0° (|+⟩ State)" />
        </div>
      </div>
      <div id="bl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bl-res-vec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">(x=1.00, y=0.00, z=0.00) = |+⟩</span>
            <span class="stat-label">Bloch Sphere Cartesian Vector (x, y, z)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bl-res-prob" style="color:var(--green-dark); font-weight:700;">Measurement Probabilities: P(|0⟩) = 50.0% | P(|1⟩) = 50.0% (Equal Superposition)</span>
            <span class="stat-label">Computational Basis Measurement Collapse Probabilities</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('bl-th'), phiEl = document.getElementById('bl-phi');
  const vResEl = document.getElementById('bl-res-vec'), pResEl = document.getElementById('bl-res-prob');

  function update() {
    const thDeg = parseFloat(thEl.value), phiDeg = parseFloat(phiEl.value);
    if (isNaN(thDeg) || isNaN(phiDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phiRad = (phiDeg * Math.PI) / 180;

    // Bloch sphere cartesian coordinates:
    // x = sin(theta) * cos(phi)
    // y = sin(theta) * sin(phi)
    // z = cos(theta)
    const x = Math.sin(thRad) * Math.cos(phiRad);
    const y = Math.sin(thRad) * Math.sin(phiRad);
    const z = Math.cos(thRad);

    // Basis state probabilities:
    // P(|0>) = cos^2(theta / 2)
    // P(|1>) = sin^2(theta / 2)
    const p0 = Math.pow(Math.cos(thRad / 2.0), 2);
    const p1 = Math.pow(Math.sin(thRad / 2.0), 2);

    let stateName = '';
    if (Math.abs(z - 1.0) < 0.01) stateName = '|0⟩ Ground State';
    else if (Math.abs(z + 1.0) < 0.01) stateName = '|1⟩ Excited State';
    else if (Math.abs(x - 1.0) < 0.01) stateName = '|+⟩ = (|0⟩+|1⟩)/√2';
    else if (Math.abs(x + 1.0) < 0.01) stateName = '|-⟩ = (|0⟩-|1⟩)/√2';
    else if (Math.abs(y - 1.0) < 0.01) stateName = '|i+⟩ = (|0⟩+i|1⟩)/√2';
    else if (Math.abs(y + 1.0) < 0.01) stateName = '|i-⟩ = (|0⟩-i|1⟩)/√2';
    else stateName = 'General Superposition State';

    vResEl.textContent = '(x=' + x.toFixed(2) + ', y=' + y.toFixed(2) + ', z=' + z.toFixed(2) + ') = ' + stateName;
    pResEl.textContent = 'P(|0⟩) = ' + (p0 * 100).toFixed(1) + '% | P(|1⟩) = ' + (p1 * 100).toFixed(1) + '% (θ = ' + thDeg + '°, φ = ' + phiDeg + '°)';
  }

  thEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter polar colatitude angle $\theta \in [0^\circ, 180^\circ]$ ($0^\circ$ for $|0\rangle$, $180^\circ$ for $|1\rangle$, $90^\circ$ for equator).',
      'Enter azimuthal quantum phase angle $\phi \in [0^\circ, 360^\circ]$.',
      'Inspect 3D unit Bloch vector coordinates $(x, y, z)$ and Born rule measurement collapse probabilities $P(|0\rangle) = \cos^2(\theta/2)$ and $P(|1\rangle) = \sin^2(\theta/2)$.'
    ],
    benefitTitle: 'Felix Bloch 1946 Geometric Qubit Sphere Representation',
    benefitContent: 'Any pure single-qubit state $|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle$ maps uniquely to a point on the surface of a 3D unit sphere, where quantum logic gates correspond to simple geometric rotations ($X = 180^\circ$ around X-axis, Hadamard $H = 180^\circ$ around X+Z diagonal).',
    faqs: [{ q: 'What do points inside the Bloch Sphere represent (r < 1)?', a: 'Points strictly inside the sphere ($r < 1$) represent mixed quantum states described by density matrices with purity $\text{Tr}(\rho^2) < 1$.' }]
  },

  // 9. Quantum Error Correction Surface Code Distance & Logical Error Rate Calculator
  {
    slug: 'quantum-error-correction-surface-code-threshold-calculator',
    name: 'Quantum Surface Code Distance (d) & Logical Error Rate (P_L) Calculator',
    description: 'Calculate 2D rotated Surface Code quantum error correction code distance (d = 2t + 1), required physical data and syndrome ancilla qubits (N = 2·d² - 1), and exponential logical error suppression (P_L ≈ 0.1 · (p_phys / p_th)^((d+1)/2)) below the 1% threshold limit.',
    category: 'Science',
    icon: 'text',
    keywords: ['surface code calculator', 'quantum error correction logical error rate formula pl online', 'code distance physical to logical qubit ratio calculator', 'fault tolerant quantum computing surface code calculator', 'syndrome extraction threshold 1 percent surface code online'],
    order: 870,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Code Distance d (3, 5, 7, 9, 11) & Physical 2-Qubit Gate Error Rate p_phys',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qec-d">Distance d</label>
          <select class="tool-textarea" id="qec-d">
            <option value="3">d = 3 (17 Physical Qubits: Corrects 1 Error)</option>
            <option value="5">d = 5 (49 Physical Qubits: Corrects 2 Errors)</option>
            <option value="7" selected>d = 7 (97 Physical Qubits: Corrects 3 Errors)</option>
            <option value="9">d = 9 (161 Physical Qubits: Corrects 4 Errors)</option>
            <option value="11">d = 11 (241 Physical Qubits: Corrects 5 Errors)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="qec-pphys">Physical Error p</label>
          <input class="tool-textarea" id="qec-pphys" type="number" step="0.0005" value="0.0010" placeholder="0.0010 (0.1% Gate Error)" />
        </div>
      </div>
      <div id="qec-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qec-res-pl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_L ≈ 1.00 × 10⁻⁵ / cycle</span>
            <span class="stat-label">Logical Qubit Error Rate per Error-Correction Cycle (P_L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qec-res-qubits" style="color:var(--green-dark); font-weight:700;">FAULT-TOLERANT: 97 Physical Qubits (49 Data + 48 Ancilla) suppress errors by 100×</span>
            <span class="stat-label">Physical Qubit Overhead & Fault-Tolerance Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('qec-d'), pEl = document.getElementById('qec-pphys');
  const plResEl = document.getElementById('qec-res-pl'), qbResEl = document.getElementById('qec-res-qubits');

  const p_threshold = 0.010; // 1.0% surface code fault-tolerant threshold

  function update() {
    const d = parseInt(dEl.value, 10), p_phys = parseFloat(pEl.value);
    if (isNaN(d) || isNaN(p_phys) || d < 3 || p_phys <= 0 || p_phys >= 0.5) return;

    // Total physical qubits in rotated surface code N_phys = 2 * d^2 - 1
    const n_data = Math.pow(d, 2);
    const n_ancilla = Math.pow(d, 2) - 1;
    const n_total = (2 * Math.pow(d, 2)) - 1;

    // Error correction capability t = (d - 1) / 2
    const t_errors = Math.floor((d - 1) / 2);

    // Logical error rate scaling: P_L approx = 0.1 * ( p_phys / p_threshold )^( (d + 1)/2 )
    const exponent = (d + 1.0) / 2.0;
    const ratio = p_phys / p_threshold;
    const P_L = 0.1 * Math.pow(ratio, exponent);

    let status = '';
    let color = '#22543d';

    if (p_phys < p_threshold) {
      const suppressionFactor = p_phys / P_L;
      status = 'FAULT-TOLERANT REGIME (p < 1.0% Threshold: Distance d=' + d + ' achieves ' + Math.round(suppressionFactor).toLocaleString() + '× exponential error suppression)';
      color = '#22543d';
    } else {
      status = 'ABOVE THRESHOLD (p ≥ 1.0%: Increasing code distance increases logical error rate!)';
      color = '#c53030';
    }

    plResEl.textContent = 'P_L ≈ ' + P_L.toExponential(2) + ' / cycle (d = ' + d + ')';
    plResEl.style.color = color;
    qbResEl.textContent = status + ' | ' + n_total + ' Physical Qubits (' + n_data + ' Data + ' + n_ancilla + ' Ancilla to correct ' + t_errors + ' arbitrary errors)';
    qbResEl.style.color = color;
  }

  dEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select rotated surface code distance d (odd integers $d = 3, 5, 7, 9, 11$).',
      'Enter physical hardware 2-qubit gate error rate $p_{\text{phys}}$ (e.g. 0.001 = 0.1% for superconducting transmon qubits).',
      'Inspect logical qubit error rate per cycle $P_L$, total physical qubit overhead ($N = 2d^2 - 1$), and maximum correctable simultaneous errors ($t = \frac{d-1}{2}$).'
    ],
    benefitTitle: 'Alexei Kitaev 1997 Topological Surface Code',
    benefitContent: 'Surface codes arrange data and stabilizer ancilla qubits on a 2D nearest-neighbor checkerboard lattice; as long as physical gate errors remain below the fault-tolerant threshold ($p < 1.0\%$), scaling code distance d suppresses logical errors exponentially ($P_L \propto (p/p_{\text{th}})^{(d+1)/2}$), enabling million-qubit Shor\'s algorithm quantum computers.',
    faqs: [{ q: 'Why is the 2D surface code the leading architecture for Google and IBM?', a: 'Unlike other quantum codes that require non-local long-range wiring, 2D surface codes require only nearest-neighbor planar grid connectivity.' }]
  },

  // 10. Spontaneous Parametric Down-Conversion (SPDC) Phase-Matching Calculator
  {
    slug: 'spontaneous-parametric-down-conversion-spdc-phase-matching-calculator',
    name: 'Spontaneous Parametric Down-Conversion (SPDC) Phase-Matching Calculator',
    description: 'Calculate non-linear optical crystal Type-I and Type-II Spontaneous Parametric Down-Conversion (SPDC) energy conservation (1/λ_p = 1/λ_s + 1/λ_i) and collinear momentum phase-matching (k_p = k_s + k_i) for entangled photon pair generation in BBO, KTP, and PPLN.',
    category: 'Science',
    icon: 'text',
    keywords: ['spdc phase matching calculator', 'spontaneous parametric down conversion formula lambda p equals lambda s plus lambda i', 'entangled photon pair generation bbo ppln calculator', 'type 1 type 2 spdc phase matching angle calculator', 'quantum optics single photon source spdc online'],
    order: 871,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pump Laser Wavelength λ_p (nm), Signal Wavelength λ_s (nm) & Non-Linear Crystal (BBO, PPLN, KTP)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spdc-lp">Pump λ_p (nm)</label>
          <input class="tool-textarea" id="spdc-lp" type="number" step="5" value="405.0" placeholder="405.0 nm (Violet Blue Diode)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spdc-crys">Nonlinear Crystal</label>
          <select class="tool-textarea" id="spdc-crys">
            <option value="bbo" selected>BBO Beta-Barium Borate (Degenerate: 810 nm Pairs)</option>
            <option value="ppln">PPLN Periodically Poled Lithium Niobate (Telecom 1550 nm)</option>
            <option value="ktp">KTP Potassium Titanyl Phosphate (Type-II Cross-Polarized)</option>
          </select>
        </div>
      </div>
      <div id="spdc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spdc-res-deg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ_signal = 810 nm | λ_idler = 810 nm</span>
            <span class="stat-label">Degenerate Entangled Photon Pair Wavelengths</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spdc-res-match" style="color:var(--green-dark); font-weight:700;">Phase-Matching Angle θ_pm = 29.3° (BBO Type-I e -> o + o | Energy Conserved: ℏω_p = ℏω_s + ℏω_i)</span>
            <span class="stat-label">Birefringent Crystal Phase-Matching Tuning Angle (θ_pm)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lpEl = document.getElementById('spdc-lp'), crEl = document.getElementById('spdc-crys');
  const degResEl = document.getElementById('spdc-res-deg'), mtResEl = document.getElementById('spdc-res-match');

  const CRYSTALS = {
    'bbo':  { angle_deg: 29.3, type: 'Type-I (e -> o + o)', name: 'BBO' },
    'ppln': { angle_deg: 0.0,  type: 'Quasi-Phase-Matched (QPM Poling Λ = 9.8 μm)', name: 'PPLN' },
    'ktp':  { angle_deg: 90.0, type: 'Type-II (e -> o + e)', name: 'KTP' }
  };

  function update() {
    const lambda_p_nm = parseFloat(lpEl.value);
    const cr = CRYSTALS[crEl.value];

    if (isNaN(lambda_p_nm) || lambda_p_nm <= 0) return;

    // Degenerate down-conversion: lambda_signal = lambda_idler = 2 * lambda_p  [nm]
    const lambda_deg_nm = 2.0 * lambda_p_nm;

    degResEl.textContent = 'λ_signal = ' + lambda_deg_nm.toFixed(1) + ' nm | λ_idler = ' + lambda_deg_nm.toFixed(1) + ' nm';
    mtResEl.textContent = cr.name + ' ' + cr.type + ' | ' + (cr.angle_deg > 0 ? 'Phase Angle θ_pm = ' + cr.angle_deg + '°' : cr.type) + ' (Pump: ' + lambda_p_nm + ' nm -> NIR Pairs)';
  }

  lpEl.addEventListener('input', update);
  crEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter pump laser wavelength $\lambda_p$ in nanometers (e.g. 405 nm violet diode or 532 nm doubled Nd:YAG).',
      'Select non-linear optical birefringent crystal (BBO, PPLN periodically poled, KTP).',
      'Inspect generated signal and idler entangled twin photon wavelengths ($\lambda_s = \lambda_i = 2 \lambda_p$) and phase-matching crystal angle $\theta_{\text{pm}}$.'
    ],
    benefitTitle: 'Quantum Nonlinear Optics & Entangled Photon Pair Source',
    benefitContent: 'In a second-order ($\chi^{(2)}$) non-linear optical crystal, a single high-energy ultraviolet pump photon spontaneously splits into a pair of momentum-entangled twin photons (Signal and Idler), providing the foundational light source for quantum teleportation, quantum key distribution, and optical quantum computers.',
    faqs: [{ q: 'What is the difference between Type-I and Type-II SPDC?', a: 'In Type-I SPDC, both down-converted photons share the same polarization; in Type-II SPDC, the signal and idler photons have mutually perpendicular cross-polarizations (ordinary and extraordinary).' }]
  },

  // --- Suite GGGGGG: Space Propulsion & Interstellar Rocketry (991 - 995) ---
  // 11. Gridded Electrostatic Ion Thruster Exhaust Velocity & Thrust Calculator
  {
    slug: 'ion-thruster-exhaust-velocity-thrust-power-calculator',
    name: 'Gridded Electrostatic Ion Thruster Exhaust Velocity (v_e) & Thrust (T) Calculator',
    description: 'Calculate electric space propulsion electrostatic gridded ion thruster ion exhaust velocity (v_e = √(2·q·V_acc / m_Xe)) in km/s, specific impulse (I_sp = v_e / g₀) in seconds, and thrust output (T = √(2·m_Xe / q) · I_beam · √V_acc) in mN for Deep Space 1 and Dawn NASA missions.',
    category: 'Science',
    icon: 'text',
    keywords: ['ion thruster calculator', 'electrostatic ion propulsion exhaust velocity formula v_e equals sqrt 2 q vacc over m online', 'specific impulse ion engine xenon propellant calculator', 'nasa dawn deep space 1 ion thruster calculator online', 'electric propulsion beam current thrust calculator'],
    order: 872,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Grid Accelerator Voltage V_acc (Volts), Ion Beam Current I_beam (Amps) & Propellant (Xenon, Krypton, Argon)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ion-vacc">Voltage V_acc (V)</label>
          <input class="tool-textarea" id="ion-vacc" type="number" step="100" value="1280.0" placeholder="1280.0 V (NSTAR NASA)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ion-ibeam">Beam Current (A)</label>
          <input class="tool-textarea" id="ion-ibeam" type="number" step="0.1" value="1.76" placeholder="1.76 A (Dawn Thruster)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ion-gas">Propellant Gas</label>
          <select class="tool-textarea" id="ion-gas">
            <option value="xe" selected>Xenon Xe (M = 131.29 amu)</option>
            <option value="kr">Krypton Kr (M = 83.80 amu - Starlink)</option>
            <option value="ar">Argon Ar (M = 39.95 amu)</option>
          </select>
        </div>
      </div>
      <div id="ion-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ion-res-isp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">I_sp = 3,180 s (31.2 km/s v_e)</span>
            <span class="stat-label">Specific Impulse (I_sp) & Effective Exhaust Velocity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ion-res-thrust" style="font-weight:700;">Thrust T = 91.8 mN | Beam Power P_beam = 2.25 kW (Efficiency η = 72.5%)</span>
            <span class="stat-label">Electrostatic Thrust Output & Electrical Beam Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('ion-vacc'), iEl = document.getElementById('ion-ibeam'), gEl = document.getElementById('ion-gas');
  const ispResEl = document.getElementById('ion-res-isp'), thResEl = document.getElementById('ion-res-thrust');

  const g0 = 9.80665;
  const e_charge = 1.602176634e-19;
  const m_u = 1.66053906660e-27;

  const GASES = {
    'xe': { mass: 131.293 * m_u, name: 'Xenon Xe' },
    'kr': { mass: 83.798 * m_u,  name: 'Krypton Kr' },
    'ar': { mass: 39.948 * m_u,  name: 'Argon Ar' }
  };

  function update() {
    const Vacc = parseFloat(vEl.value), I_beam = parseFloat(iEl.value);
    const gas = GASES[gEl.value];

    if (isNaN(Vacc) || isNaN(I_beam) || Vacc <= 0 || I_beam <= 0) return;

    // Exhaust velocity v_e = sqrt( (2 * e * Vacc) / m_ion )  [m / s]
    const v_e_m_s = Math.sqrt((2.0 * e_charge * Vacc) / gas.mass);
    const v_e_km_s = v_e_m_s / 1000.0;

    // Specific impulse I_sp = v_e / g0  [seconds]
    const I_sp_sec = v_e_m_s / g0;

    // Thrust T = sqrt( (2 * m_ion) / e ) * I_beam * sqrt(Vacc)  [Newtons -> mN]
    const T_newtons = Math.sqrt((2.0 * gas.mass) / e_charge) * I_beam * Math.sqrt(Vacc);
    const T_mN = T_newtons * 1000.0;

    // Beam electrical power P = I_beam * Vacc  [Watts -> kW]
    const P_beam_W = I_beam * Vacc;
    const P_beam_kW = P_beam_W / 1000.0;

    ispResEl.textContent = 'I_sp = ' + Math.round(I_sp_sec).toLocaleString() + ' s (' + v_e_km_s.toFixed(1) + ' km/s v_e)';
    thResEl.textContent = 'Thrust T = ' + T_mN.toFixed(1) + ' mN | Beam Power P = ' + P_beam_kW.toFixed(2) + ' kW (' + gas.name + ' @ V_acc = ' + Vacc + ' V, I = ' + I_beam + ' A)';
  }

  [vEl, iEl].forEach(el => el.addEventListener('input', update));
  gEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter grid electrostatic accelerating voltage $V_{\text{acc}}$ in Volts (typically 1,000 V to 2,000 V).',
      'Enter extracted ion beam current $I_{\text{beam}}$ in Amperes.',
      'Select noble propellant gas (Xenon, Krypton for SpaceX Starlink, Argon).',
      'Inspect specific impulse $I_{\text{sp}}$ in seconds ($10\times$ higher than chemical rockets), exhaust velocity $v_e$ in km/s, and thrust output in milli-Newtons (mN).'
    ],
    benefitTitle: 'Harold R. Kaufman 1960 Electrostatic Ion Propulsion',
    benefitContent: 'While chemical rockets are limited to $I_{\text{sp}} \le 450\text{ s}$ by molecular combustion bond energies, electrostatic ion thrusters accelerate ionized atoms across thousands of volts to reach $I_{\text{sp}} > 3,000\text{ s}$ ($v_e > 30\text{ km/s}$), slashing satellite propellant launch mass by $>70\%$ for deep space missions (NASA Dawn).',
    faqs: [{ q: 'Why is a hollow cathode neutralizer required outside the ion thruster?', a: 'To inject electrons into the exiting positive ion beam, preventing the spacecraft from building up a negative electrical charge that would pull ions back.' }]
  },

  // 12. Hall Effect Thruster (HET) Anode Efficiency & Specific Impulse Calculator
  {
    slug: 'hall-effect-thruster-anode-efficiency-specific-impulse-calculator',
    name: 'Hall Effect Thruster (HET) Anode Efficiency (η_a) & Specific Impulse Calculator',
    description: 'Calculate spacecraft electric Hall Effect Thruster (HET) total anode efficiency (η_a = T² / (2·ṁ·P_d)) and specific impulse (I_sp = T / (ṁ·g₀)) from discharge power P_d in kW and mass flow rate ṁ in mg/s.',
    category: 'Science',
    icon: 'text',
    keywords: ['hall effect thruster calculator', 'het anode efficiency formula eta equals t squared over 2 mdot p online', 'spacecraft hall thruster specific impulse calculator', 'spacex starlink krypton hall thruster calculator online', 'electric propulsion hall current thrust calculator'],
    order: 873,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Thrust T (mN), Discharge Power P_d (kW) & Mass Flow Rate ṁ (mg/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="het-t">Thrust T (mN)</label>
          <input class="tool-textarea" id="het-t" type="number" step="10" value="290.0" placeholder="290.0 mN (BHT-600)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="het-p">Power P_d (kW)</label>
          <input class="tool-textarea" id="het-p" type="number" step="0.5" value="4.50" placeholder="4.50 kW Discharge" />
        </div>
        <div class="control-group">
          <label class="control-label" for="het-mdot">Flow ṁ (mg/s)</label>
          <input class="tool-textarea" id="het-mdot" type="number" step="1" value="15.0" placeholder="15.0 mg/s (Xenon)" />
        </div>
      </div>
      <div id="het-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="het-res-eta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">η_a = 62.3% Efficiency</span>
            <span class="stat-label">Hall Thruster Anode Efficiency (η_a)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="het-res-isp" style="font-weight:700;">I_sp = 1,971 s (19.3 km/s Exhaust Velocity | Thrust/Power = 64.4 mN/kW)</span>
            <span class="stat-label">Specific Impulse (I_sp) & Thrust-to-Power Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('het-t'), pEl = document.getElementById('het-p'), mEl = document.getElementById('het-mdot');
  const etaResEl = document.getElementById('het-res-eta'), ispResEl = document.getElementById('het-res-isp');

  const g0 = 9.80665;

  function update() {
    const T_mN = parseFloat(tEl.value), P_kW = parseFloat(pEl.value), mdot_mg_s = parseFloat(mEl.value);
    if (isNaN(T_mN) || isNaN(P_kW) || isNaN(mdot_mg_s) || T_mN <= 0 || P_kW <= 0 || mdot_mg_s <= 0) return;

    const T_N = T_mN * 1e-3;
    const P_W = P_kW * 1000.0;
    const mdot_kg_s = mdot_mg_s * 1e-6;

    // Specific impulse I_sp = T / ( mdot * g0 )  [seconds]
    const I_sp = T_N / (mdot_kg_s * g0);
    // Exhaust velocity v_e = I_sp * g0  [m / s -> km / s]
    const v_e_km_s = (I_sp * g0) / 1000.0;

    // Anode efficiency eta_a = T^2 / ( 2 * mdot * P_d )
    const eta_a = Math.pow(T_N, 2) / (2.0 * mdot_kg_s * P_W);
    const eta_pct = eta_a * 100.0;

    // Thrust-to-power ratio T/P in mN / kW
    const T_P = T_mN / P_kW;

    etaResEl.textContent = 'η_a = ' + eta_pct.toFixed(1) + '% Anode Efficiency';
    ispResEl.textContent = 'I_sp = ' + Math.round(I_sp).toLocaleString() + ' s (' + v_e_km_s.toFixed(1) + ' km/s | T/P = ' + T_P.toFixed(1) + ' mN/kW @ ' + P_kW + ' kW)';
  }

  [tEl, pEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured Hall thruster thrust output T in milli-Newtons (mN).',
      'Enter electric discharge power $P_d$ in kW.',
      'Enter propellant mass flow rate $\dot{m}$ in mg/s.',
      'Inspect total anode electrical efficiency $\eta_a$, specific impulse $I_{\text{sp}}$ in seconds, and thrust-to-power ratio (mN/kW).'
    ],
    benefitTitle: 'A. I. Morozov 1968 Closed-Drift Hall Thruster',
    benefitContent: 'Hall thrusters trap electrons in an azimuthal magnetic drift ($\vec{E} \times \vec{B}$ Hall current) to ionize and accelerate noble gas propellant without space-charge grid limitations, delivering high thrust density ($>60\text{ mN/kW}$) for satellite orbit raising (Starlink / NASA Gateway).',
    faqs: [{ q: 'Why did SpaceX switch Starlink satellites from Xenon to Krypton?', a: 'Krypton is significantly cheaper and more abundant in Earth\'s atmosphere than Xenon, despite having slightly lower specific impulse ($I_{\text{sp}} \sim 1,800\text{ s}$ vs $2,200\text{ s}$).' }]
  },

  // 13. Solar Sail Radiation Pressure Acceleration & Characteristic Acceleration Calculator
  {
    slug: 'solar-sail-radiation-pressure-acceleration-calculator',
    name: 'Solar Photon Sail Radiation Pressure Force & Acceleration (a_c) Calculator',
    description: 'Calculate interplanetary Solar Sail solar photon radiation pressure (P_rad = (1 + R)·I_solar / c) in μN/m² and characteristic solar sail acceleration (a_c = 2·I_0·A / (c·M)) in mm/s² at 1 AU for propellantless deep space propulsion.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar sail calculator', 'solar radiation pressure formula p equals 1 plus r i over c online', 'solar sail characteristic acceleration ac calculator', 'ikaros lightsail photon propulsion calculator online', 'propellantless interstellar spaceflight calculator'],
    order: 874,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sail Area A (m²), Total Spacecraft Mass M (kg), Sail Reflectivity R (0.85 to 0.95) & Distance (AU)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sail-area">Sail Area A (m²)</label>
          <input class="tool-textarea" id="sail-area" type="number" step="50" value="196.0" placeholder="196.0 m² (14m × 14m IKAROS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sail-mass">Total Mass M (kg)</label>
          <input class="tool-textarea" id="sail-mass" type="number" step="10" value="315.0" placeholder="315.0 kg (Spacecraft)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sail-r">Reflectivity R</label>
          <input class="tool-textarea" id="sail-r" type="number" step="0.05" value="0.90" placeholder="0.90 (90% Aluminum)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sail-dist">Distance (AU)</label>
          <input class="tool-textarea" id="sail-dist" type="number" step="0.1" value="1.0" placeholder="1.0 AU (Earth Orbit)" />
        </div>
      </div>
      <div id="sail-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sail-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Force F = 1.70 mN Total</span>
            <span class="stat-label">Solar Photon Radiation Pressure Thrust Force (F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sail-res-acc" style="color:var(--green-dark); font-weight:700;">Acceleration a = 0.0054 mm/s² (Δv = +467 m/s per day continuously)</span>
            <span class="stat-label">Continuous Interplanetary Sail Acceleration & Daily Delta-V</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('sail-area'), mEl = document.getElementById('sail-mass');
  const rEl = document.getElementById('sail-r'), dEl = document.getElementById('sail-dist');
  const fResEl = document.getElementById('sail-res-force'), acResEl = document.getElementById('sail-res-acc');

  const I0_solar = 1361.0; // W / m^2 solar constant at 1 AU
  const c_light = 299792458; // m / s

  function update() {
    const Area = parseFloat(aEl.value), Mass = parseFloat(mEl.value);
    const R = parseFloat(rEl.value), dist_au = parseFloat(dEl.value);

    if (isNaN(Area) || isNaN(Mass) || isNaN(R) || isNaN(dist_au) || Area <= 0 || Mass <= 0 || dist_au <= 0) return;

    // Solar irradiance at distance d: I = I0 / d^2  [W / m^2]
    const I_solar = I0_solar / Math.pow(dist_au, 2);

    // Radiation pressure P_rad = (1 + R) * I / c  [N / m^2 -> uN / m^2]
    const P_rad_Pa = ((1.0 + R) * I_solar) / c_light;
    const P_rad_uN = P_rad_Pa * 1e6;

    // Total thrust force F = P_rad * Area  [Newtons -> mN]
    const Force_N = P_rad_Pa * Area;
    const Force_mN = Force_N * 1000.0;

    // Acceleration a = Force / Mass  [m / s^2 -> mm / s^2]
    const a_m_s2 = Force_N / Mass;
    const a_mm_s2 = a_m_s2 * 1000.0;

    // Delta-V accumulated per day: DeltaV = a * 86,400 seconds
    const deltaV_day_m_s = a_m_s2 * 86400.0;

    fResEl.textContent = 'Force F = ' + Force_mN.toFixed(2) + ' mN (P_rad = ' + P_rad_uN.toFixed(2) + ' μN/m²)';
    acResEl.textContent = 'Acceleration a = ' + a_mm_s2.toFixed(4) + ' mm/s² (Daily Δv = +' + deltaV_day_m_s.toFixed(1) + ' m/s @ ' + dist_au + ' AU, Mass = ' + Mass + ' kg)';
  }

  [aEl, mEl, rEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reflective solar sail area in square meters ($m^2$).',
      'Enter total spacecraft dry mass including sail in kg.',
      'Enter aluminum/mylar mirror specular reflectivity R ($0.85$ to $0.95$).',
      'Enter heliocentric distance in Astronomical Units (AU).',
      'Inspect total photon radiation pressure thrust force in milli-Newtons (mN) and continuous daily delta-V acceleration.'
    ],
    benefitTitle: 'Johannes Kepler 1619 & JAXA IKAROS 2010 Propellantless Propulsion',
    benefitContent: 'Photons carry momentum ($p = E/c$); reflecting sunlight off an ultra-thin aluminized Kapton sail transfers double momentum ($F = \frac{2IA}{c}$), delivering continuous, infinite specific impulse propellantless thrust that accelerates solar sails to $>50\text{ km/s}$ for interstellar precursor missions.',
    faqs: [{ q: 'How does a solar sail steer or change orbital inclination?', a: 'By tilting the sail relative to the Sun, the radiation pressure vector is angled forward to raise orbit or backward to spiral inward toward the Sun.' }]
  },

  // 14. Nuclear Thermal Propulsion (NTP) Specific Impulse & Core Temperature Calculator
  {
    slug: 'nuclear-thermal-propulsion-ntp-specific-impulse-calculator',
    name: 'Nuclear Thermal Propulsion (NTP) Specific Impulse (I_sp ∝ √(T/M)) Calculator',
    description: 'Calculate nuclear thermal rocket reactor specific impulse (I_sp = (1/g₀) · √[2·γ/(γ-1) · (R_univ·T_chamber / M_prop)]) in seconds and thrust-to-weight performance in Hydrogen and Ammonia for NASA Mars crewed transfer vehicles.',
    category: 'Science',
    icon: 'text',
    keywords: ['nuclear thermal propulsion calculator', 'ntp specific impulse formula i_sp proportional to sqrt t over m online', 'nasa nerva drakon nuclear thermal rocket calculator', 'hydrogen propellant specific impulse 900s calculator online', 'crewed mars mission nuclear thermal delta v online'],
    order: 875,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reactor Chamber Temperature T_c (Kelvin), Chamber Pressure P_c (bar) & Propellant Gas (H₂, NH₃, CH₄)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ntp-temp">Core Temp T_c (K)</label>
          <input class="tool-textarea" id="ntp-temp" type="number" step="100" value="2750.0" placeholder="2750.0 K (NERVA Target)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ntp-press">Pressure P_c (bar)</label>
          <input class="tool-textarea" id="ntp-press" type="number" step="5" value="45.0" placeholder="45.0 bar" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ntp-gas">Propellant</label>
          <select class="tool-textarea" id="ntp-gas">
            <option value="h2" selected>Liquid Hydrogen LH₂ (M = 2.016 g/mol, γ = 1.40)</option>
            <option value="nh3">Ammonia NH₃ (M = 17.03 g/mol, γ = 1.33)</option>
            <option value="ch4">Methane CH₄ (M = 16.04 g/mol, γ = 1.32)</option>
          </select>
        </div>
      </div>
      <div id="ntp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ntp-res-isp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">I_sp = 912.4 s (8.95 km/s v_e)</span>
            <span class="stat-label">Nuclear Thermal Specific Impulse (I_sp)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ntp-res-perf" style="color:var(--green-dark); font-weight:700;">2.03× HIGHER THAN CHEMICAL: Cuts Earth-Mars transit time from 9 months to 4 months!</span>
            <span class="stat-label">Crewed Mars Transit Performance vs Hydrolox (450 s)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('ntp-temp'), pEl = document.getElementById('ntp-press'), gEl = document.getElementById('ntp-gas');
  const ispResEl = document.getElementById('ntp-res-isp'), pfResEl = document.getElementById('ntp-res-perf');

  const g0 = 9.80665;
  const R_univ = 8314.462; // J / (kmol * K)

  const PROPELLANTS = {
    'h2':  { M: 2.016, gamma: 1.40, name: 'Hydrogen LH₂' },
    'nh3': { M: 17.03, gamma: 1.33, name: 'Ammonia NH₃' },
    'ch4': { M: 16.04, gamma: 1.32, name: 'Methane CH₄' }
  };

  function update() {
    const Tc_K = parseFloat(tEl.value), Pc_bar = parseFloat(pEl.value);
    const p = PROPELLANTS[gEl.value];

    if (isNaN(Tc_K) || isNaN(Pc_bar) || Tc_K <= 0 || Pc_bar <= 0) return;

    // Ideal thermodynamic expansion velocity v_e into vacuum (expansion ratio ~ 100:1):
    // v_e approx = sqrt( (2 * gamma / (gamma - 1)) * (R_univ / M) * Tc * [ 1 - (Pe/Pc)^((gamma-1)/gamma) ] )
    const pr_ratio = 1.0 / (Pc_bar * 100.0); // expansion to deep space ~ 0.01 bar exit
    const exp_term = 1.0 - Math.pow(pr_ratio, (p.gamma - 1.0) / p.gamma);

    const v_e_m_s = Math.sqrt((2.0 * p.gamma / (p.gamma - 1.0)) * (R_univ / p.M) * Tc_K * Math.max(0.75, exp_term));
    const v_e_km_s = v_e_m_s / 1000.0;

    // Specific impulse I_sp = v_e / g0  [seconds]
    const I_sp = v_e_m_s / g0;

    const ratioChem = I_sp / 450.0; // Compared to best LH2/LOX RS-25 chemical rocket (450s)

    ispResEl.textContent = 'I_sp = ' + I_sp.toFixed(1) + ' s (' + v_e_km_s.toFixed(2) + ' km/s v_e)';
    pfResEl.textContent = ratioChem.toFixed(2) + '× Chemical Efficiency (' + p.name + ' @ T_core = ' + Tc_K + ' K, P_c = ' + Pc_bar + ' bar | DRACO Target: ~900 s)';
  }

  [tEl, pEl].forEach(el => el.addEventListener('input', update));
  gEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter nuclear reactor fuel element core chamber temperature in Kelvin (typically 2500 K to 2800 K in NERVA / DRACO solid core reactors).',
      'Enter chamber stagnation pressure in bar.',
      'Select light molecular propellant (Liquid Hydrogen $LH_2$, Ammonia, Methane).',
      'Inspect specific impulse $I_{\text{sp}}$ in seconds, effective exhaust velocity $v_e$ in km/s, and transit time reduction for human Mars missions.'
    ],
    benefitTitle: 'Project NERVA & DARPA DRACO Nuclear Fission Thermal Propulsion',
    benefitContent: 'Rocket exhaust velocity scales inversely with molecular weight ($I_{\text{sp}} \propto \sqrt{T/M}$); by heating pure low-molecular-weight hydrogen ($M = 2\text{ g/mol}$) directly with a fission reactor rather than heavy water vapor ($M = 18\text{ g/mol}$), NTP doubles specific impulse to $>900\text{ s}$, slashing round-trip Mars mission times in half.',
    faqs: [{ q: 'Why is liquid hydrogen (LH2) preferred over other gases?', a: 'Hydrogen has the lowest molecular mass of any element ($M = 2\text{ g/mol}$), yielding the maximum possible exhaust velocity for any given reactor operating temperature.' }]
  },

  // 15. Relativistic Rocket Tsiolkovsky Proper-Time & Interstellar Velocity Calculator
  {
    slug: 'relativistic-rocket-tsiolkovsky-proper-time-calculator',
    name: 'Relativistic Rocket Equation (Δv = c·tanh[(v_e/c)·ln(m₀/m_f)]) Calculator',
    description: 'Calculate interstellar relativistic rocket final velocity (v/c = tanh[(v_e/c) · ln(m₀ / m_f)]), astronaut shipboard proper time vs Earth coordinate time, and Lorentz time dilation (γ) for near-lightspeed interstellar voyages.',
    category: 'Science',
    icon: 'text',
    keywords: ['relativistic rocket equation calculator', 'relativistic tsiolkovsky formula v equals c tanh ve over c ln m0 over mf online', 'interstellar spaceflight proper time twin paradox calculator', 'antimatter rocket relativistic velocity calculator online', 'special relativity lorentz gamma rocket speed online'],
    order: 876,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass Ratio m₀/m_f, Exhaust Velocity v_e (fraction of c) & Destination Distance (Light-Years)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rel-mr">Mass Ratio m₀/m_f</label>
          <input class="tool-textarea" id="rel-mr" type="number" step="5" value="10.0" placeholder="10.0 (90% Fuel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rel-ve">Exhaust v_e (c)</label>
          <input class="tool-textarea" id="rel-ve" type="number" step="0.1" max="1.0" value="0.60" placeholder="0.60 c (Antimatter/Fusion)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rel-dist">Distance (ly)</label>
          <input class="tool-textarea" id="rel-dist" type="number" step="1" value="4.24" placeholder="4.24 ly (Proxima Centauri)" />
        </div>
      </div>
      <div id="rel-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rel-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Final v = 0.881 c (Lorentz γ = 2.11)</span>
            <span class="stat-label">Relativistic Terminal Velocity (v / c) & Lorentz Factor (γ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rel-res-time" style="color:var(--green-dark); font-weight:700;">Shipboard Proper Time τ = 2.28 Years (Earth Elapsed Time t = 4.81 Years to Proxima)</span>
            <span class="stat-label">Astronaut Proper Time (τ) vs Earth Observer Time (t)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mrEl = document.getElementById('rel-mr'), veEl = document.getElementById('rel-ve'), dEl = document.getElementById('rel-dist');
  const vResEl = document.getElementById('rel-res-v'), tmResEl = document.getElementById('rel-res-time');

  function update() {
    const mass_ratio = parseFloat(mrEl.value), ve_c = parseFloat(veEl.value), dist_ly = parseFloat(dEl.value);
    if (isNaN(mass_ratio) || isNaN(ve_c) || isNaN(dist_ly) || mass_ratio <= 1.0 || ve_c <= 0 || ve_c > 1.0 || dist_ly <= 0) return;

    // Relativistic Tsiolkovsky equation:
    // v / c = tanh( (v_e / c) * ln( m0 / mf ) )
    const rapidity = ve_c * Math.log(mass_ratio);
    const beta = Math.tanh(rapidity); // v / c

    // Lorentz dilation factor gamma = 1 / sqrt(1 - beta^2) = cosh(rapidity)
    const gamma = 1.0 / Math.sqrt(1.0 - Math.pow(beta, 2));

    // Earth coordinate time to travel distance d at speed v: t_earth = d / v  [years]
    const t_earth_years = dist_ly / beta;

    // Astronaut shipboard proper time tau = t_earth / gamma  [years]
    const tau_ship_years = t_earth_years / gamma;

    vResEl.textContent = 'Final v = ' + beta.toFixed(3) + ' c (Lorentz γ = ' + gamma.toFixed(2) + ')';
    tmResEl.textContent = 'Ship Proper Time τ = ' + tau_ship_years.toFixed(2) + ' yrs | Earth Time t = ' + t_earth_years.toFixed(2) + ' yrs (' + dist_ly + ' ly Voyage @ v_e = ' + ve_c + ' c)';
  }

  [mrEl, veEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rocket propellant mass ratio $m_0 / m_f$ (e.g. 10 for a rocket containing 90% fuel by mass).',
      'Enter rocket effective exhaust velocity $v_e$ as a fraction of the speed of light ($c$).',
      'Enter destination star distance in light-years (e.g. 4.24 ly to Proxima Centauri).',
      'Inspect relativistic terminal cruise velocity $v/c$, Lorentz time dilation factor $\gamma$, and astronaut shipboard proper time $\tau$ vs Earth elapsed time.'
    ],
    benefitTitle: 'Albert Einstein & Konstantin Tsiolkovsky Relativistic Flight',
    benefitContent: 'Because velocities do not add linearly in Special Relativity ($v = c \tanh \theta$), classical rocket equations fail at high speeds; relativistic time dilation ($\Delta t_{\text{ship}} = \Delta t_{\text{Earth}} / \gamma$) allows astronauts traveling near lightspeed ($0.999\ c$) to traverse the entire 100,000 light-year Milky Way galaxy within a single human lifetime of 30 shipboard years.',
    faqs: [{ q: 'Why can a rocket never reach or exceed the speed of light (v = c)?', a: 'As velocity approaches $c$, the hyperbolic tangent function asymptotically approaches 1 ($\tanh(\infty) = 1$), requiring infinite energy and infinite propellant mass to reach $c$.' }]
  },

  // --- Suite HHHHHH: Deep Space Communications, Information Theory & Cosmic Metrology (996 - 1000 - GRAND FINALE!) ---
  // 16. NASA Deep Space Network (DSN) Interplanetary Link Budget Calculator
  {
    slug: 'interplanetary-link-budget-deep-space-network-calculator',
    name: 'NASA Deep Space Network (DSN) Interplanetary RF Link Budget Calculator',
    description: 'Calculate deep space exploration radio telecommunication Friis link budget received power (P_r = P_t · G_t · G_r · (c / (4π·d·f))²) in dBm and carrier-to-noise ratio (C/N₀) across Mars, Jupiter, and Voyager 1 distances in the X-band (8.4 GHz) and Ka-band (32 GHz).',
    category: 'Science',
    icon: 'text',
    keywords: ['deep space network link budget calculator', 'friis transmission formula interplanetary communication online', 'nasa dsn 70m antenna mars voyager signal strength calculator', 'spacecraft telemetry received power pr calculator', 'spacecraft x band ka band link budget online'],
    order: 877,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spacecraft Transmit Power P_t (Watts), Distance d (AU), Frequency f (GHz) & Ground Antenna DSN (70m Dish)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dsn-pt">Power P_t (W)</label>
          <input class="tool-textarea" id="dsn-pt" type="number" step="5" value="20.0" placeholder="20.0 W (TWTA)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dsn-dist">Distance (AU)</label>
          <input class="tool-textarea" id="dsn-dist" type="number" step="0.5" value="1.5" placeholder="1.5 AU (Mars Average)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dsn-freq">Freq f (GHz)</label>
          <input class="tool-textarea" id="dsn-freq" type="number" step="1" value="8.4" placeholder="8.4 GHz (X-Band)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dsn-dish">Spacecraft Dish</label>
          <input class="tool-textarea" id="dsn-dish" type="number" step="0.5" value="3.0" placeholder="3.0 m HGA Dish" />
        </div>
      </div>
      <div id="dsn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dsn-res-pr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_r = -118.4 dBm (1.45 × 10⁻¹⁵ W)</span>
            <span class="stat-label">Received Signal Power at 70m DSN Ground Dish (P_r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dsn-res-data" style="color:var(--green-dark); font-weight:700;">Max Telemetry Data Rate: 2.15 Mbps (Path Loss = -258.0 dB | 1-Way Light Delay: 12.5 Minutes)</span>
            <span class="stat-label">Sustainable Data Rate & One-Way Light Travel Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ptEl = document.getElementById('dsn-pt'), dEl = document.getElementById('dsn-dist');
  const fEl = document.getElementById('dsn-freq'), dishEl = document.getElementById('dsn-dish');
  const prResEl = document.getElementById('dsn-res-pr'), dtResEl = document.getElementById('dsn-res-data');

  const c_light = 299792458;
  const AU_meters = 1.495978707e11;
  const DSN_dish_diam_m = 70.0; // 70-meter Goldstone / Madrid / Canberra dish

  function update() {
    const Pt_W = parseFloat(ptEl.value), dist_AU = parseFloat(dEl.value);
    const f_GHz = parseFloat(fEl.value), d_sc_m = parseFloat(dishEl.value);

    if (isNaN(Pt_W) || isNaN(dist_AU) || isNaN(f_GHz) || isNaN(d_sc_m) || Pt_W <= 0 || dist_AU <= 0 || f_GHz <= 0 || d_sc_m <= 0) return;

    const f_Hz = f_GHz * 1e9;
    const lambda_m = c_light / f_Hz;
    const distance_m = dist_AU * AU_meters;

    // Free space path loss FSPL = ( 4 * pi * d / lambda )^2
    const FSPL_linear = Math.pow((4.0 * Math.PI * distance_m) / lambda_m, 2);
    const FSPL_dB = 10.0 * Math.log10(FSPL_linear);

    // Antenna gains with 55% aperture efficiency: G = 0.55 * ( pi * D / lambda )^2
    const G_tx_linear = 0.55 * Math.pow((Math.PI * d_sc_m) / lambda_m, 2);
    const G_rx_linear = 0.55 * Math.pow((Math.PI * DSN_dish_diam_m) / lambda_m, 2);

    const G_tx_dBi = 10.0 * Math.log10(G_tx_linear);
    const G_rx_dBi = 10.0 * Math.log10(G_rx_linear);

    // Received power P_r = P_t * G_tx * G_rx / FSPL  [Watts]
    const P_rx_W = (Pt_W * G_tx_linear * G_rx_linear) / FSPL_linear;
    const P_rx_dBm = 10.0 * Math.log10(P_rx_W * 1000.0);

    // One-way light travel time t_light = distance / c  [minutes]
    const light_delay_min = (distance_m / c_light) / 60.0;

    // Estimated data rate Shannon/BPSK (typical system temp T = 20K):
    const kB = 1.380649e-23;
    const T_sys = 20.0; // Cryogenic DSN maser amplifier
    const N0 = kB * T_sys;
    const Eb_N0_req = 4.0; // 6 dB required Eb/N0
    const max_bps = P_rx_W / (Eb_N0_req * N0);
    const max_kbps = max_bps / 1000.0;

    let dataStr = '';
    if (max_kbps >= 1000) dataStr = (max_kbps / 1000.0).toFixed(2) + ' Mbps';
    else if (max_kbps >= 1.0) dataStr = max_kbps.toFixed(1) + ' kbps';
    else dataStr = max_bps.toFixed(0) + ' bps';

    prResEl.textContent = 'P_r = ' + P_rx_dBm.toFixed(1) + ' dBm (' + P_rx_W.toExponential(2) + ' W)';
    dtResEl.textContent = 'Telemetry: ' + dataStr + ' | 1-Way Light Delay: ' + light_delay_min.toFixed(1) + ' min (FSPL = -' + FSPL_dB.toFixed(1) + ' dB @ ' + dist_AU + ' AU)';
  }

  [ptEl, dEl, fEl, dishEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter spacecraft transmitter radio frequency power $P_t$ in Watts (e.g. 20 W Traveling-Wave Tube Amplifier).',
      'Enter distance from Earth in Astronomical Units (1.5 AU for Mars, 5.2 AU for Jupiter, 160 AU for Voyager 1).',
      'Enter carrier frequency in GHz (8.4 GHz for standard X-band, 32 GHz for high-rate Ka-band).',
      'Enter spacecraft High-Gain Antenna (HGA) parabolic reflector diameter in meters.',
      'Inspect received power $P_r$ at NASA\'s 70-meter Deep Space Network ground station dish in dBm and Watts, free space path loss in dB, one-way speed-of-light propagation delay, and sustainable telemetry data rate.'
    ],
    benefitTitle: 'Harald T. Friis 1946 Deep Space Telecommunications Law',
    benefitContent: 'Because electromagnetic signals expand spherically across billions of kilometers ($\text{FSPL} \propto 1/d^2$), Voyager 1\'s signal arrives at Earth with less than a quintillionth of a watt ($10^{-18}\text{ W} = -150\text{ dBm}$), requiring cryogenic liquid-helium-cooled MASER preamplifiers on 70-meter parabolic dishes to recover scientific data.',
    faqs: [{ q: 'Why is NASA transitioning deep space links from X-band to Ka-band?', a: 'Ka-band (32 GHz) has 4× shorter wavelength than X-band (8.4 GHz), increasing parabolic antenna gain by $+12\text{ dB}$ to deliver $4\times$ to $10\times$ higher scientific telemetry downlink speeds.' }]
  },

  // 17. Shannon-Hartley Channel Capacity & Maximum Spectral Efficiency Calculator
  {
    slug: 'shannon-hartley-channel-capacity-spectral-efficiency-calculator',
    name: 'Shannon-Hartley Theorem Channel Capacity (C = B·log₂(1 + SNR)) Calculator',
    description: 'Calculate fundamental telecommunications information theory Shannon Channel Capacity (C = B · log₂(1 + SNR)) in Mbps/Gbps and determine theoretical minimum energy per bit Shannon Limit (E_b/N₀ = ln 2 = -1.59 dB).',
    category: 'Science',
    icon: 'text',
    keywords: ['shannon hartley theorem calculator', 'channel capacity formula c equals b log2 1 plus snr online', 'spectral efficiency bits per second per hertz calculator', 'shannon limit minus 1.59 db calculator online', 'telecom 5g 6g wifi channel capacity online'],
    order: 878,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Channel Bandwidth B (MHz), Signal-to-Noise Ratio SNR (dB) & Target Bit Error Rate',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-bw">Bandwidth B (MHz)</label>
          <input class="tool-textarea" id="sh-bw" type="number" step="10" value="100.0" placeholder="100.0 MHz (5G Channel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-snr">SNR (dB)</label>
          <input class="tool-textarea" id="sh-snr" type="number" step="2" value="25.0" placeholder="25.0 dB (Clean Channel)" />
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-cap" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">C = 830.8 Mbps Capacity</span>
            <span class="stat-label">Maximum Theoretical Channel Capacity (C)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-eff" style="color:var(--green-dark); font-weight:700;">Spectral Efficiency η = 8.31 bps/Hz (Shannon Ultimate Limit: E_b/N₀ ≥ -1.59 dB)</span>
            <span class="stat-label">Spectral Efficiency & Absolute Information Theory Bound</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bwEl = document.getElementById('sh-bw'), snrEl = document.getElementById('sh-snr');
  const capResEl = document.getElementById('sh-res-cap'), effResEl = document.getElementById('sh-res-eff');

  function update() {
    const B_mhz = parseFloat(bwEl.value), SNR_db = parseFloat(snrEl.value);
    if (isNaN(B_mhz) || isNaN(SNR_db) || B_mhz <= 0) return;

    const B_hz = B_mhz * 1e6;

    // SNR linear = 10^(SNR_db / 10)
    const SNR_linear = Math.pow(10, SNR_db / 10.0);

    // Shannon capacity C = B * log2( 1 + SNR )  [bits / s]
    const C_bps = B_hz * (Math.log(1.0 + SNR_linear) / Math.LN2);
    const C_mbps = C_bps / 1e6;
    const C_gbps = C_bps / 1e9;

    // Spectral efficiency eta = C / B = log2(1 + SNR)  [bits / s / Hz]
    const eta_bps_hz = C_bps / B_hz;

    capResEl.textContent = 'C = ' + (C_gbps >= 1.0 ? C_gbps.toFixed(2) + ' Gbps' : C_mbps.toFixed(1) + ' Mbps') + ' Capacity';
    effResEl.textContent = 'Spectral Efficiency η = ' + eta_bps_hz.toFixed(2) + ' bps/Hz (SNR = ' + SNR_db + ' dB | B = ' + B_mhz + ' MHz Channel)';
  }

  bwEl.addEventListener('input', update);
  snrEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter channel bandwidth B in MHz (e.g. 20 MHz for LTE, 100 MHz for 5G NR, 160 MHz for Wi-Fi 7).',
      'Enter Signal-to-Noise Ratio (SNR) in dB.',
      'Inspect absolute theoretical channel capacity C in Mbps/Gbps and spectral transmission efficiency in bits/s/Hz.'
    ],
    benefitTitle: 'Claude Shannon 1948 Mathematical Theory of Communication',
    benefitContent: 'Shannon proved that error-free digital transmission is possible over any noisy channel up to the fundamental capacity limit ($C = B \log_2(1 + \text{SNR})$); modern LDPC and Polar codes in 5G approach within $0.1\text{ dB}$ of this universal mathematical law.',
    faqs: [{ q: 'What is the absolute Shannon Limit for zero error communication?', a: 'The minimum signal-to-noise ratio per bit required for error-free transmission as bandwidth approaches infinity is $\frac{E_b}{N_0} = \ln 2 \approx -1.59\text{ dB}$.' }]
  },

  // 18. Cosmological Redshift & Hubble-Lemaître Cosmic Expansion Calculator
  {
    slug: 'cosmological-redshift-hubble-lemaitre-expansion-calculator',
    name: 'Cosmological Redshift (z) & Hubble-Lemaître Cosmic Expansion Calculator',
    description: 'Calculate expanding universe cosmological redshift (1 + z = a_now / a_then = λ_obs / λ_emit), recession velocity (v = H₀·d), and cosmic lookback travel time in billions of years under the Standard ΛCDM Cosmology model.',
    category: 'Science',
    icon: 'text',
    keywords: ['cosmological redshift calculator', 'hubble lemaitre law formula v equals h0 d online', 'cosmic lookback time expanding universe calculator', 'jwst high redshift galaxy z 13 calculator online', 'lambda cdm scale factor expansion calculator'],
    order: 879,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Observed Redshift z (0 to 15.0) & Hubble Constant H₀ (km/s/Mpc, default 70.0)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cos-z">Redshift (z)</label>
          <input class="tool-textarea" id="cos-z" type="number" step="0.5" min="0" max="20" value="7.5" placeholder="7.5 (Early Galaxy JWST)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cos-h0">Hubble H₀</label>
          <input class="tool-textarea" id="cos-h0" type="number" step="1" value="70.0" placeholder="70.0 km/s/Mpc (Planck)" />
        </div>
      </div>
      <div id="cos-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cos-res-scale" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Scale a(t) = 0.118 (Universe was 8.5× Smaller)</span>
            <span class="stat-label">Cosmic Scale Factor at Emission (a(t) = 1 / (1 + z))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cos-res-look" style="color:var(--green-dark); font-weight:700;">Lookback Time = 13.08 Billion Years (Emitted 700 Million Years after Big Bang)</span>
            <span class="stat-label">Cosmic Lookback Light Travel Time & Age of the Universe</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('cos-z'), h0El = document.getElementById('cos-h0');
  const scResEl = document.getElementById('cos-res-scale'), lkResEl = document.getElementById('cos-res-look');

  const age_universe_Gyr = 13.787; // Total age of Universe in Billion Years

  function update() {
    const z = parseFloat(zEl.value), H0 = parseFloat(h0El.value);
    if (isNaN(z) || isNaN(H0) || z < 0 || H0 <= 0) return;

    // Cosmic scale factor a(t) = 1 / (1 + z)
    const scale_factor = 1.0 / (1.0 + z);
    const sizeRatio = 1.0 + z;

    // Approximate lookback time integral for standard flat Lambda-CDM (Omega_M = 0.3, Omega_Lambda = 0.7):
    // t_lookback approx = t_age * ( 1 - (1 + z)^(-1.5) )
    const lookback_Gyr = age_universe_Gyr * (1.0 - Math.pow(1.0 + z, -1.35));
    const age_at_emission_Myr = Math.max(10, (age_universe_Gyr - lookback_Gyr) * 1000.0);

    scResEl.textContent = 'Scale a(t) = ' + scale_factor.toFixed(3) + ' (Universe was ' + sizeRatio.toFixed(1) + '× smaller)';
    lkResEl.textContent = 'Lookback Time: ' + lookback_Gyr.toFixed(2) + ' Billion Years (Emitted ~' + Math.round(age_at_emission_Myr) + ' Myr after Big Bang @ z = ' + z + ')';
  }

  zEl.addEventListener('input', update);
  h0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter astronomical spectroscopic cosmological redshift z (e.g. $z = 0.1$ nearby, $z = 7.5$ early JWST primeval galaxy, $z = 1100$ Cosmic Microwave Background).',
      'Enter Hubble expansion rate $H_0$ in km/s/Mpc (typically $67.4$ to $73.0\text{ km/s/Mpc}$).',
      'Inspect cosmic expansion scale factor $a(t) = \frac{1}{1+z}$, light lookback travel time in billions of years, and cosmic age of the universe when light was emitted.'
    ],
    benefitTitle: 'Edwin Hubble & Georges Lemaître 1929 Expanding Universe',
    benefitContent: 'Cosmological redshift is not a Doppler shift through space, but the stretching of photon wavelengths as space-time itself expands across billions of years ($\lambda_{\text{obs}} = \lambda_{\text{emit}} [1 + z]$), allowing the James Webb Space Telescope (JWST) to peer back $13.5\text{ billion years}$ to the dawn of the first stars.',
    faqs: [{ q: 'What is the redshift of the Cosmic Microwave Background (CMB)?', a: 'The CMB was emitted at $z \approx 1089$ when the universe cooled to $3,000\text{ K}$, stretching visible orange recombination light into $2.725\text{ K}$ microwave background radiation today.' }]
  },

  // 19. Chandrasekhar Mass Limit White Dwarf Electron Degeneracy Calculator
  {
    slug: 'chandrasekhar-mass-limit-white-dwarf-degeneracy-calculator',
    name: 'Chandrasekhar Mass Limit (M_Ch ≈ 1.44 M_☉) White Dwarf Degeneracy Calculator',
    description: 'Calculate quantum relativistic electron degeneracy Chandrasekhar mass collapse limit (M_Ch = (ω_3^0·√3π / 2) · (ℏc / G)^(3/2) · (1 / (μ_e·m_u))² ≈ 1.44 M_☉) and Type Ia Supernova detonation threshold.',
    category: 'Science',
    icon: 'text',
    keywords: ['chandrasekhar limit calculator', 'white dwarf maximum mass formula m_ch 1.44 solar mass online', 'relativistic electron degeneracy pressure calculator', 'type 1a supernova progenitor chandrasekhar mass calculator', 'subrahmanyan chandrasekhar 1930 collapse limit online'],
    order: 880,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mean Molecular Weight per Electron μ_e (2.0 for Carbon-Oxygen C-O, 2.15 for Iron Fe) & Stellar Mass (M_☉)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ch-mue">Elec Weight μ_e</label>
          <select class="tool-textarea" id="ch-mue">
            <option value="2.00" selected>Carbon-Oxygen White Dwarf (μ_e = 2.00: Standard M_Ch = 1.44 M_☉)</option>
            <option value="2.15">Iron-Silicon Core (μ_e = 2.15: M_Ch = 1.24 M_☉ Core Collapse)</option>
            <option value="1.00">Pure Hydrogen (μ_e = 1.00: M_Ch = 5.76 M_☉)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ch-mass">Stellar Mass (M_☉)</label>
          <input class="tool-textarea" id="ch-mass" type="number" step="0.1" value="1.20" placeholder="1.20 M_☉ (Stable Dwarf)" />
        </div>
      </div>
      <div id="ch-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ch-res-lim" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">M_Ch = 1.438 M_☉ Limit</span>
            <span class="stat-label">Exact Chandrasekhar Maximum Mass Limit (M_Ch)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ch-res-stat" style="color:var(--green-dark); font-weight:700;">STABLE WHITE DWARF (M = 1.20 M_☉ ≤ M_Ch: Supported by Quantum Pauli Exclusion Pressure)</span>
            <span class="stat-label">Degeneracy Stability & Supernova Collapse Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ueEl = document.getElementById('ch-mue'), mEl = document.getElementById('ch-mass');
  const limResEl = document.getElementById('ch-res-lim'), stResEl = document.getElementById('ch-res-stat');

  function update() {
    const mu_e = parseFloat(ueEl.value), M_star = parseFloat(mEl.value);
    if (isNaN(mu_e) || isNaN(M_star) || mu_e <= 0 || M_star <= 0) return;

    // Exact Chandrasekhar mass formula: M_Ch = ( 5.83 / mu_e^2 ) * M_sun  [Solar masses]
    const M_Ch = 5.83 / Math.pow(mu_e, 2);

    let status = '';
    let color = '#22543d';

    if (M_star < M_Ch) {
      const margin = ((M_Ch - M_star) / M_Ch) * 100.0;
      status = 'STABLE WHITE DWARF (M = ' + M_star + ' M_☉ ≤ M_Ch: ' + margin.toFixed(1) + '% stability margin below collapse threshold)';
      color = '#22543d';
    } else {
      status = 'CATASTROPHIC COLLAPSE / TYPE Ia SUPERNOVA (M ≥ M_Ch: Relativistic electron pressure fails -> Neutron star or thermonuclear detonation!)';
      color = '#c53030';
    }

    limResEl.textContent = 'M_Ch = ' + M_Ch.toFixed(3) + ' M_☉ Limit';
    limResEl.style.color = color;
    stResEl.textContent = status + ' | μ_e = ' + mu_e + ' (Carbon/Oxygen core)';
    stResEl.style.color = color;
  }

  ueEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select white dwarf core chemical composition (Carbon-Oxygen $\mu_e = 2.0$, Iron core $\mu_e = 2.15$).',
      'Enter white dwarf progenitor mass in solar masses $M_\odot$.',
      'Inspect exact quantum relativistic Chandrasekhar mass limit $M_{\text{Ch}} \approx 1.44 M_\odot$ and evaluate stability against Type Ia supernova collapse.'
    ],
    benefitTitle: 'Subrahmanyan Chandrasekhar 1930 Nobel Degeneracy Limit',
    benefitContent: 'Combining quantum mechanics (Pauli exclusion principle) and special relativity reveals that ultra-relativistic degenerate electrons have a softer equation of state ($P \propto \rho^{4/3}$), making white dwarfs unable to support more than $1.44 M_\odot$; exceeding this mass triggers runaway thermonuclear fusion as Type Ia "standard candle" supernovae used to discover dark energy.',
    faqs: [{ q: 'What supports a Neutron Star above the Chandrasekhar limit?', a: 'Neutron degeneracy pressure and the strong nuclear force (Tolman-Oppenheimer-Volkoff limit $\sim 2.1\ M_\odot$) support neutron stars until gravitational collapse forces them into black holes.' }]
  },

  // 20. Planck Scale Fundamental Quantum Gravity Dimensions (Tool 1000 - GRAND FINALE!)
  {
    slug: 'planck-units-fundamental-quantum-gravity-scales-calculator',
    name: 'Planck Fundamental Physical Scales (Length l_p, Time t_p, Mass m_p & Energy E_p) Calculator',
    description: 'Calculate fundamental quantum gravity dimensional Planck units (Planck Length l_p = √(ℏ·G/c³) = 1.616 × 10⁻³⁵ m, Planck Time t_p = √(ℏ·G/c⁵) = 5.391 × 10⁻⁴⁴ s, Planck Mass m_p = √(ℏ·c/G) = 21.76 μg, Planck Energy E_p = 1.956 GJ) from speed of light c, gravitational constant G, and Planck constant ℏ.',
    category: 'Science',
    icon: 'text',
    keywords: ['planck units calculator', 'planck length formula l_p equals sqrt hbar g over c cubed online', 'planck time 5.391e-44 seconds quantum gravity calculator', 'planck energy 1.956 gj string theory scale calculator', 'natural units max planck 1899 constants calculator'],
    order: 881,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fundamental Universal Constants: ℏ (Planck), G (Gravitation) & c (Speed of Light)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="plk-c">Light Speed c (m/s)</label>
          <input class="tool-textarea" id="plk-c" type="number" step="any" value="299792458" />
        </div>
        <div class="control-group">
          <label class="control-label" for="plk-g">Gravity G (m³/kg·s²)</label>
          <input class="tool-textarea" id="plk-g" type="number" step="any" value="6.67430e-11" />
        </div>
        <div class="control-group">
          <label class="control-label" for="plk-hbar">Planck ℏ (J·s)</label>
          <input class="tool-textarea" id="plk-hbar" type="number" step="any" value="1.054571817e-34" />
        </div>
      </div>
      <div id="plk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="plk-res-len" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">l_p = 1.616 × 10⁻³⁵ m (Planck Length)</span>
            <span class="stat-label">Planck Quantum Spatial Resolution Limit (l_p = √(ℏ·G / c³))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="plk-res-time" style="color:var(--green-dark); font-weight:700;">t_p = 5.391 × 10⁻⁴⁴ s | Mass m_p = 21.76 μg (Energy E_p = 1.956 GJ = 1.22 × 10¹⁹ GeV)</span>
            <span class="stat-label">Planck Time (t_p), Planck Mass (m_p) & Planck Energy (E_p)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('plk-c'), gEl = document.getElementById('plk-g'), hEl = document.getElementById('plk-hbar');
  const lResEl = document.getElementById('plk-res-len'), tmResEl = document.getElementById('plk-res-time');

  function update() {
    const c = parseFloat(cEl.value), G = parseFloat(gEl.value), hbar = parseFloat(hEl.value);
    if (isNaN(c) || isNaN(G) || isNaN(hbar) || c <= 0 || G <= 0 || hbar <= 0) return;

    // Planck Length l_p = sqrt( (hbar * G) / c^3 )  [meters]
    const l_p = Math.sqrt((hbar * G) / Math.pow(c, 3));

    // Planck Time t_p = sqrt( (hbar * G) / c^5 )  [seconds]
    const t_p = Math.sqrt((hbar * G) / Math.pow(c, 5));

    // Planck Mass m_p = sqrt( (hbar * c) / G )  [kg]
    const m_p_kg = Math.sqrt((hbar * c) / G);
    const m_p_ug = m_p_kg * 1e9; // micrograms

    // Planck Energy E_p = m_p * c^2  [Joules -> GigaJoules]
    const E_p_J = m_p_kg * Math.pow(c, 2);
    const E_p_GJ = E_p_J / 1e9;
    const E_p_GeV = (E_p_J / 1.602176634e-19) / 1e9;

    lResEl.textContent = 'l_p = ' + l_p.toExponential(3) + ' m (Quantum Geometry Scale)';
    tmResEl.textContent = 't_p = ' + t_p.toExponential(3) + ' s | m_p = ' + m_p_ug.toFixed(2) + ' μg (E_p = ' + E_p_GJ.toFixed(3) + ' GJ = ' + E_p_GeV.toExponential(2) + ' GeV)';
  }

  [cEl, gEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fundamental universal physical constants ($c, G, \hbar$).',
      'Inspect derived Planck Length $l_p = \sqrt{\hbar G / c^3} \approx 1.616 \times 10^{-35}\text{ m}$, Planck Time $t_p = 5.391 \times 10^{-44}\text{ s}$, Planck Mass $m_p \approx 21.76\ \mu\text{g}$, and Planck Energy $E_p \approx 1.956\text{ GJ}$.'
    ],
    benefitTitle: 'Max Planck 1899 Natural Unit System & Quantum Gravity Horizon',
    benefitContent: 'Planck units represent the ultimate scale where the de Broglie wavelength of a particle equals its Schwarzschild black hole event horizon; at distances smaller than $l_p \approx 10^{-35}\text{ m}$ and times shorter than $t_p \approx 10^{-44}\text{ s}$, smooth classical spacetime dissolves into quantum foam, requiring unified String Theory or Loop Quantum Gravity.',
    faqs: [{ q: 'Why is the Planck Mass (21.8 micrograms) so surprisingly macroscopic?', a: 'Unlike Planck length and time which are microscopically tiny, Planck mass ($m_p \approx 2.18 \times 10^{-8}\text{ kg}$) is about the mass of a flea egg, because gravity is extraordinarily weak compared to electromagnetism.' }]
  }
];

pack29Tools.forEach(createTool);
console.log('Pack 29 complete: 20 tools created.');
