const { createTool } = require('./generate-curated-tools.cjs');

// Pack 39: 27 Aerospace, Orbital Mechanics, Flight Dynamics, Marine, Automotive & Turbomachinery Calculators (Tools 1224 to 1250)
const pack39Tools = [
  // 1. Rocket Thrust-to-Weight Ratio (TWR) & Tsiolkovsky Delta-v Calculator
  {
    slug: 'thrust-to-weight-ratio-twr-rocket-equation-calculator',
    name: 'Rocket Thrust-to-Weight Ratio (TWR) & Tsiolkovsky Delta-v (Δv = I_sp·g₀·ln(m₀/m_f)) Calculator',
    description: 'Calculate rocket liftoff Thrust-to-Weight ratio (TWR = F_thrust / (m₀·g₀)), initial sea-level acceleration (a = (TWR - 1)·g₀) in m/s², and mission delta-v budget (Δv = I_sp · g₀ · ln(m₀ / m_f)) in m/s.',
    category: 'Science',
    icon: 'text',
    keywords: ['rocket twr calculator', 'tsiolkovsky rocket equation delta v formula online', 'thrust to weight ratio liftoff acceleration calculator', 'specific impulse isp wet dry mass rocket calculator', 'aerospace orbital mechanics rocket propulsion online'],
    order: 1107,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Engine Thrust F (kN), Wet Mass m₀ (tons), Dry Mass m_f (tons) & Specific Impulse I_sp (seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-thrust">Thrust (kN)</label>
          <input class="tool-textarea" id="rk-thrust" type="number" step="500" value="7607.0" placeholder="7,607 kN (Falcon 9)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-m0">Wet Mass m₀ (t)</label>
          <input class="tool-textarea" id="rk-m0" type="number" step="50" value="549.0" placeholder="549 tons" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-mf">Dry Mass m_f (t)</label>
          <input class="tool-textarea" id="rk-mf" type="number" step="5" value="125.0" placeholder="125 tons" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-isp">I_sp (seconds)</label>
          <input class="tool-textarea" id="rk-isp" type="number" step="10" value="311.0" placeholder="311 s (Merlin 1D)" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-twr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Liftoff TWR = 1.41 (Initial a = 4.05 m/s² / 0.41 g)</span>
            <span class="stat-label">Thrust-to-Weight Ratio & Net Liftoff Acceleration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-dv" style="color:var(--green-dark); font-weight:700;">Delta-v Δv = 4,514 m / s (Mass Fraction = 4.39 | Effective Exhaust Velocity c = 3,050 m/s)</span>
            <span class="stat-label">Tsiolkovsky Ideal Velocity Change Capability (Δv)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('rk-thrust'), m0El = document.getElementById('rk-m0');
  const mfEl = document.getElementById('rk-mf'), ispEl = document.getElementById('rk-isp');
  const twrResEl = document.getElementById('rk-res-twr'), dvResEl = document.getElementById('rk-res-dv');

  const g0 = 9.80665;

  function update() {
    const thrust_kN = parseFloat(thEl.value), m0_tons = parseFloat(m0El.value);
    const mf_tons = parseFloat(mfEl.value), isp_s = parseFloat(ispEl.value);

    if (isNaN(thrust_kN) || isNaN(m0_tons) || isNaN(mf_tons) || isNaN(isp_s) || thrust_kN <= 0 || m0_tons <= 0 || mf_tons <= 0 || mf_tons >= m0_tons || isp_s <= 0) return;

    const m0_kg = m0_tons * 1000.0;
    const mf_kg = mf_tons * 1000.0;
    const thrust_N = thrust_kN * 1000.0;

    const weight_N = m0_kg * g0;
    const TWR = thrust_N / weight_N;
    const a_net = (TWR - 1.0) * g0;
    const a_g = TWR - 1.0;

    const c_mps = isp_s * g0;
    const mass_ratio = m0_kg / mf_kg;
    const delta_v = c_mps * Math.log(mass_ratio);

    let twrStatus = '', color = '#22543d';
    if (TWR >= 1.2 && TWR <= 1.8) {
      twrStatus = 'OPTIMAL LIFTOFF TWR (1.2 - 1.8: Balances gravity loss against aerodynamic drag)';
      color = '#22543d';
    } else if (TWR < 1.0) {
      twrStatus = 'CANNOT LIFTOFF (TWR < 1.0: Vehicle falls back to launchpad!)';
      color = '#c53030';
    } else if (TWR < 1.2) {
      twrStatus = 'HIGH GRAVITY DRAG (TWR 1.0 - 1.2)';
      color = '#ea580c';
    } else {
      twrStatus = 'HIGH AERODYNAMIC DRAG (TWR > 1.8)';
      color = '#2563eb';
    }

    twrResEl.textContent = 'Liftoff TWR = ' + TWR.toFixed(2) + ' (a = ' + a_net.toFixed(2) + ' m/s² / ' + a_g.toFixed(2) + ' g)';
    twrResEl.style.color = color;
    dvResEl.textContent = 'Delta-v Δv = ' + Math.round(delta_v).toLocaleString() + ' m/s (Mass Ratio ' + mass_ratio.toFixed(2) + ':1 | ' + twrStatus.split(' (')[0] + ')';
    dvResEl.style.color = color;
  }

  [thEl, m0El, mfEl, ispEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total sea-level rocket engine thrust in kilonewtons (kN).',
      'Enter total fueled rocket liftoff wet mass $m_0$ in metric tons.',
      'Enter burnout dry mass $m_f$ in metric tons.',
      'Enter rocket engine specific impulse $I_{\text{sp}}$ in seconds.',
      'Inspect Thrust-to-Weight Ratio (TWR) and total delta-v budget.'
    ],
    benefitTitle: 'Tsiolkovsky 1903 Ideal Rocket Equation',
    benefitContent: 'Reaching orbital velocity requires staging and logarithmic mass optimization ($\Delta v = I_{\text{sp}} g_0 \ln \frac{m_0}{m_f}$).',
    faqs: [{ q: 'What is a typical orbital delta-v budget?', a: 'Launching to Low Earth Orbit (LEO) requires $\sim 9.4\text{ km/s}$ total delta-v after accounting for atmospheric drag and gravity losses.' }]
  },

  // 2. Standard Atmosphere ISA Altitude Calculator
  {
    slug: 'standard-atmosphere-isa-altitude-temperature-pressure-calculator',
    name: 'Standard Atmosphere ISA (Troposphere & Stratosphere T(h), P(h), ρ(h)) Calculator',
    description: 'Calculate 1976 International Standard Atmosphere (ISA) thermodynamic properties: temperature T(h) in °C/K, barometric air pressure P(h) in hPa/psi, density ρ(h) in kg/m³, and speed of sound a(h) in knots/m/s from flight altitude in feet or meters.',
    category: 'Science',
    icon: 'text',
    keywords: ['isa standard atmosphere calculator', 'international standard atmosphere 1976 altitude calculator', 'air density temperature pressure altitude calculator aviation', 'speed of sound altitude isa calculator knots m s', 'aerospace flight aerodynamics isa online'],
    order: 1108,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Geopotential Flight Altitude h (Feet or Meters, 0 to 65,000 ft / 20,000 m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="isa-alt">Altitude (Feet)</label>
          <input class="tool-textarea" id="isa-alt" type="number" step="1000" min="0" max="65000" value="35000" placeholder="35,000 ft (FL350 Cruise)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="isa-unit">Input Units</label>
          <select class="tool-textarea" id="isa-unit">
            <option value="feet" selected>Feet (ft / Flight Level)</option>
            <option value="meters">Meters (m)</option>
          </select>
        </div>
      </div>
      <div id="isa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="isa-res-temp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T = -54.3 °C (218.8 K) | P = 238.4 hPa (3.46 psi)</span>
            <span class="stat-label">Ambient Air Temperature & Barometric Pressure</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="isa-res-rho" style="color:var(--green-dark); font-weight:700;">Density ρ = 0.380 kg/m³ (31.0% Sea Level) | Sound Speed a = 576.4 kts (296.5 m/s)</span>
            <span class="stat-label">Air Density (ρ) & Local Speed of Sound (Mach 1.00)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const altEl = document.getElementById('isa-alt'), unitEl = document.getElementById('isa-unit');
  const tResEl = document.getElementById('isa-res-temp'), rResEl = document.getElementById('isa-res-rho');

  const T0 = 288.15, P0 = 101325.0, rho0 = 1.225, L = 0.0065, g0 = 9.80665, R_air = 287.05287, gamma = 1.40;

  function update() {
    const isFeet = unitEl.value === 'feet';
    let h_input = parseFloat(altEl.value);
    if (isNaN(h_input) || h_input < 0) return;

    const h_m = isFeet ? h_input * 0.3048 : h_input;
    const h_ft = isFeet ? h_input : h_input / 0.3048;

    let T = 0, P = 0;
    if (h_m <= 11000.0) {
      T = T0 - (L * h_m);
      P = P0 * Math.pow(1.0 - (L * h_m) / T0, g0 / (R_air * L));
    } else if (h_m <= 20000.0) {
      const T11 = T0 - (L * 11000.0);
      P = P0 * Math.pow(1.0 - (L * 11000.0) / T0, g0 / (R_air * L)) * Math.exp((-g0 * (h_m - 11000.0)) / (R_air * T11));
      T = T11;
    } else {
      T = 216.65 + 0.001 * (h_m - 20000.0);
      P = 5474.89 * Math.exp(-0.00015 * (h_m - 20000.0));
    }

    const rho = P / (R_air * T);
    const sound_mps = Math.sqrt(gamma * R_air * T);
    const sound_kts = sound_mps * 1.94384;

    tResEl.textContent = 'T = ' + (T - 273.15).toFixed(1) + ' °C (' + T.toFixed(1) + ' K) | P = ' + (P/100).toFixed(1) + ' hPa (' + (P * 0.000145038).toFixed(2) + ' psi)';
    rResEl.textContent = 'Density ρ = ' + rho.toFixed(3) + ' kg/m³ (' + ((rho/rho0)*100).toFixed(1) + '% MSL) | Speed of Sound = ' + sound_kts.toFixed(1) + ' kts (' + sound_mps.toFixed(1) + ' m/s @ FL' + Math.round(h_ft/100) + ')';
  }

  altEl.addEventListener('input', update);
  unitEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter flight altitude in feet or meters.',
      'Inspect ambient temperature, pressure, density, and local speed of sound.'
    ],
    benefitTitle: 'ICAO Standard Atmosphere Model',
    benefitContent: 'Establishes the worldwide atmospheric reference for aviation flight instruments and aerodynamics.',
    faqs: [{ q: 'Why is standard temperature -56.5°C in the lower stratosphere?', a: 'The tropopause remains nearly isothermal at $-56.5^\circ\text{C}$ between 11 km and 20 km.' }]
  },

  // 3. Aircraft Wing Lift & Drag Coefficients Calculator
  {
    slug: 'aircraft-lift-drag-coefficient-glide-ratio-calculator',
    name: 'Aircraft Wing Aerodynamic Lift & Drag (L = ½·ρ·v²·S·C_L, D = ½·ρ·v²·S·C_D) & (L/D) Calculator',
    description: 'Calculate aerodynamic aircraft wing lift force (L = ½ · ρ · v² · S · C_L) in kN, drag force (D = ½ · ρ · v² · S · C_D), lift-to-drag glide ratio (L/D), and engine thrust required for steady level flight in aeronautics.',
    category: 'Science',
    icon: 'text',
    keywords: ['aircraft lift drag calculator', 'lift formula l equals half rho v squared s cl online', 'drag coefficient lift to drag ratio glide ratio calculator', 'wing surface area air density flight aerodynamics calculator', 'aeronautical engineering lift drag online'],
    order: 1109,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'True Airspeed v (kts), Wing Area S (m²), Air Density ρ (kg/m³) & Lift Coeff C_L',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ld-v">Airspeed v (kts)</label>
          <input class="tool-textarea" id="ld-v" type="number" step="25" value="450.0" placeholder="450.0 kts (Cruise)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-s">Wing Area S (m²)</label>
          <input class="tool-textarea" id="ld-s" type="number" step="10" value="122.6" placeholder="122.6 m² (Boeing 737)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-rho">Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="ld-rho" type="number" step="0.05" value="0.38" placeholder="0.38 kg/m³ (35,000 ft)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-cl">Lift Coeff C_L</label>
          <input class="tool-textarea" id="ld-cl" type="number" step="0.05" value="0.52" placeholder="0.52" />
        </div>
      </div>
      <div id="ld-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ld-res-lift" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Lift L = 649.3 kN (66.2 Metric Tons)</span>
            <span class="stat-label">Total Generated Wing Aerodynamic Lift Force</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ld-res-glide" style="color:var(--green-dark); font-weight:700;">Drag D = 36.1 kN (C_D = 0.029) | Glide Ratio L/D = 18.0 (18 km glide per 1 km descent)</span>
            <span class="stat-label">Aerodynamic Drag, Thrust Required & Maximum Glide Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('ld-v'), sEl = document.getElementById('ld-s');
  const rEl = document.getElementById('ld-rho'), clEl = document.getElementById('ld-cl');
  const lftResEl = document.getElementById('ld-res-lift'), gldResEl = document.getElementById('ld-res-glide');

  function update() {
    const v_kts = parseFloat(vEl.value), S_m2 = parseFloat(sEl.value);
    const rho = parseFloat(rEl.value), C_L = parseFloat(clEl.value);

    if (isNaN(v_kts) || isNaN(S_m2) || isNaN(rho) || isNaN(C_L) || v_kts <= 0 || S_m2 <= 0 || rho <= 0 || C_L <= 0) return;

    const v_mps = v_kts * 0.514444;
    const q_Pa = 0.5 * rho * Math.pow(v_mps, 2);

    const Lift_N = q_Pa * S_m2 * C_L;
    const Lift_kN = Lift_N / 1000.0;
    const Lift_tons = Lift_N / 9806.65;

    const C_D = 0.018 + 0.042 * Math.pow(C_L, 2);
    const Drag_N = q_Pa * S_m2 * C_D;
    const Drag_kN = Drag_N / 1000.0;

    const LD_ratio = C_L / C_D;

    lftResEl.textContent = 'Lift L = ' + Lift_kN.toFixed(1) + ' kN (' + Lift_tons.toFixed(1) + ' Metric Tons)';
    gldResEl.textContent = 'Drag D = ' + Drag_kN.toFixed(1) + ' kN (C_D = ' + C_D.toFixed(3) + ') | L/D = ' + LD_ratio.toFixed(1) + ':1 (' + LD_ratio.toFixed(1) + ' km glide per 1 km altitude loss)';
  }

  [vEl, sEl, rEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter airspeed in knots and wing planform area.',
      'Enter air density and lift coefficient.',
      'Inspect lift force, drag force, and glide ratio (L/D).'
    ],
    benefitTitle: 'Wing Aerodynamics Equilibrium',
    benefitContent: 'Balancing lift with weight and drag with engine thrust enables unaccelerated cruising flight.',
    faqs: [{ q: 'What is a typical jetliner L/D?', a: 'Modern commercial airliners achieve cruise $L/D \approx 18\text{ to }20$.' }]
  },

  // 4. Orbital Hohmann Transfer Delta-v Calculator
  {
    slug: 'orbital-hohmann-transfer-delta-v-calculator',
    name: 'Orbital Mechanics Hohmann Transfer Orbit (Δv₁ + Δv₂) & Travel Time Calculator',
    description: 'Calculate two-impulse Hohmann transfer orbit velocity changes (Δv₁ = v_t1 - v₁, Δv₂ = v₂ - v_t2) in km/s and semi-major axis flight duration t_transfer between circular satellite orbits around Earth or the Sun.',
    category: 'Science',
    icon: 'text',
    keywords: ['hohmann transfer calculator', 'orbital transfer delta v formula online', 'two impulse hohmann orbit transfer calculator km s', 'interplanetary orbital mechanics transfer time calculator', 'astrodynamics satellite orbit maneuvering online'],
    order: 1110,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Orbit Radius r₁ (km), Target Orbit Radius r₂ (km) & Central Body (Earth / Sun)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hm-body">Central Body</label>
          <select class="tool-textarea" id="hm-body">
            <option value="earth" selected>Earth (μ = 398,600 km³/s², R_e = 6,378 km)</option>
            <option value="sun">Sun (μ = 1.327 × 10¹¹ km³/s² - Interplanetary)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hm-r1">Initial r₁ (km)</label>
          <input class="tool-textarea" id="hm-r1" type="number" step="500" value="6778.0" placeholder="6,778 km (400 km LEO ISS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hm-r2">Target r₂ (km)</label>
          <input class="tool-textarea" id="hm-r2" type="number" step="1000" value="42164.0" placeholder="42,164 km (Geostationary GEO)" />
        </div>
      </div>
      <div id="hm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hm-res-dvtot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Δv = 3.86 km / s (LEO to GEO)</span>
            <span class="stat-label">Total Propulsive Velocity Impulse Budget (Δv₁ + Δv₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hm-res-time" style="color:var(--green-dark); font-weight:700;">Burn 1 Δv₁ = 2.40 km/s | Burn 2 Δv₂ = 1.46 km/s | Transfer Time = 5.26 Hours</span>
            <span class="stat-label">Perigee/Apogee Burn Breakdown & Transfer Duration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('hm-body'), r1El = document.getElementById('hm-r1'), r2El = document.getElementById('hm-r2');
  const dvTotResEl = document.getElementById('hm-res-dvtot'), tmResEl = document.getElementById('hm-res-time');

  function update() {
    const isEarth = bEl.value === 'earth';
    const mu = isEarth ? 398600.4418 : 1.32712440018e11;

    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0 || r1 === r2) return;

    const v1 = Math.sqrt(mu / r1);
    const v2 = Math.sqrt(mu / r2);
    const a_tx = (r1 + r2) / 2.0;

    const v_tx1 = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a_tx)));
    const v_tx2 = Math.sqrt(mu * ((2.0 / r2) - (1.0 / a_tx)));

    const delta_v1 = Math.abs(v_tx1 - v1);
    const delta_v2 = Math.abs(v2 - v_tx2);
    const total_delta_v = delta_v1 + delta_v2;

    const t_seconds = Math.PI * Math.sqrt(Math.pow(a_tx, 3) / mu);
    const t_hours = t_seconds / 3600.0;
    const t_days = t_hours / 24.0;

    let timeStr = t_days >= 2.0 ? t_days.toFixed(1) + ' Days (' + (t_days/30.4).toFixed(1) + ' Months)' : t_hours.toFixed(2) + ' Hours';

    dvTotResEl.textContent = 'Total Δv = ' + total_delta_v.toFixed(2) + ' km / s';
    tmResEl.textContent = 'Burn 1 Δv₁ = ' + delta_v1.toFixed(2) + ' km/s | Burn 2 Δv₂ = ' + delta_v2.toFixed(2) + ' km/s | Transfer Duration = ' + timeStr;
  }

  [bEl, r1El, r2El].forEach(el => el.addEventListener('input', update));
  bEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select central planet or Sun.',
      'Enter initial circular orbit radius and destination orbit radius.',
      'Inspect delta-v burns and transit time.'
    ],
    benefitTitle: 'Hohmann Transfer Trajectory',
    benefitContent: 'Provides the minimum-energy two-impulse transfer orbit between circular orbits.',
    faqs: [{ q: 'Why are Hohmann transfers fuel-efficient?', a: 'They use tangential burns at apsides, maximizing orbital Oberth effect efficiency.' }]
  },

  // 5. Vis-Viva Orbital Speed & Escape Velocity Calculator
  {
    slug: 'vis-viva-orbital-speed-equation-calculator',
    name: 'Vis-Viva Orbital Velocity (v = √(μ·(2/r - 1/a))) & Escape Velocity (v_esc = √(2μ/r)) Calculator',
    description: 'Calculate instantaneous orbital speed (v = √(μ · (2/r - 1/a))) in km/s at any distance r on circular, elliptical, or hyperbolic trajectories, and calculate gravitational Escape Velocity (v_esc = √(2·μ / r)) for astrodynamics.',
    category: 'Science',
    icon: 'text',
    keywords: ['vis viva equation calculator', 'orbital speed formula v equals sqrt mu 2 over r minus 1 over a online', 'escape velocity calculator gravitational potential well', 'celestial mechanics satellite velocity calculator km s', 'astrodynamics orbital velocity online'],
    order: 1111,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Distance r from Planet Center (km), Semi-Major Axis a (km) & Central Body (Earth, Moon, Mars)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vv-body">Central Planet</label>
          <select class="tool-textarea" id="vv-body">
            <option value="398600.44_6378" selected>Earth (μ = 398,600 km³/s², R = 6,378 km)</option>
            <option value="4902.8_1737">Moon (μ = 4,903 km³/s², R = 1,737 km)</option>
            <option value="42828.3_3389">Mars (μ = 42,828 km³/s², R = 3,389 km)</option>
            <option value="126686534_69911">Jupiter (μ = 1.27 × 10⁸ km³/s²)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="vv-r">Current Radius r (km)</label>
          <input class="tool-textarea" id="vv-r" type="number" step="500" value="6778.0" placeholder="6,778 km (400 km ISS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vv-a">Semi-Major Axis a (km)</label>
          <input class="tool-textarea" id="vv-a" type="number" step="500" value="6778.0" placeholder="6,778 km (Circular Orbit: a = r)" />
        </div>
      </div>
      <div id="vv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vv-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Orbital Speed v = 7.67 km / s (27,600 km/h)</span>
            <span class="stat-label">Instantaneous Orbital Velocity (Vis-Viva Equation)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vv-res-esc" style="color:var(--green-dark); font-weight:700;">Escape Velocity v_esc = 10.85 km / s (39,047 km/h | √2 × Circular Velocity)</span>
            <span class="stat-label">Parabolic Escape Velocity Threshold from Distance r</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('vv-body'), rEl = document.getElementById('vv-r'), aEl = document.getElementById('vv-a');
  const vResEl = document.getElementById('vv-res-v'), escResEl = document.getElementById('vv-res-esc');

  function update() {
    const parts = bEl.value.split('_');
    const mu = parseFloat(parts[0]);
    const R_planet = parseFloat(parts[1]);

    const r = parseFloat(rEl.value), a = parseFloat(aEl.value);
    if (isNaN(r) || isNaN(a) || r <= 0 || a <= 0) return;

    const term = (2.0 / r) - (1.0 / a);
    if (term <= 0) return;

    const v_kms = Math.sqrt(mu * term);
    const v_kmh = v_kms * 3600.0;
    const v_esc_kms = Math.sqrt((2.0 * mu) / r);
    const v_esc_kmh = v_esc_kms * 3600.0;
    const alt_km = r - R_planet;

    vResEl.textContent = 'Orbital Speed v = ' + v_kms.toFixed(2) + ' km / s (' + Math.round(v_kmh).toLocaleString() + ' km/h)';
    escResEl.textContent = 'Escape Velocity v_esc = ' + v_esc_kms.toFixed(2) + ' km / s (' + Math.round(v_esc_kmh).toLocaleString() + ' km/h @ Alt = ' + Math.round(alt_km) + ' km)';
  }

  [bEl, rEl, aEl].forEach(el => el.addEventListener('input', update));
  bEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select central planet or moon.',
      'Enter current radius and semi-major axis.',
      'Inspect orbital speed and escape velocity.'
    ],
    benefitTitle: 'Vis-Viva Energy Conservation',
    benefitContent: 'Connects orbital speed directly to specific mechanical energy conservation.',
    faqs: [{ q: 'What is circular orbit speed vs escape velocity?', a: 'Escape velocity is $\sqrt{2} \approx 1.414$ times circular velocity.' }]
  },

  // 6. Planetary Epicyclic Gear Train Ratio Calculator
  {
    slug: 'planetary-gear-train-gear-ratio-epicyclic-sun-ring-calculator',
    name: 'Planetary Epicyclic Gear Train (Gear Ratio R = 1 + N_ring / N_sun) Calculator',
    description: 'Calculate epicyclic planetary gear set gear ratio (R = 1 + N_ring / N_sun), output torque multiplication, output RPM, and Willis kinematic velocity equation for automotive automatic transmissions and robotics.',
    category: 'Science',
    icon: 'text',
    keywords: ['planetary gear ratio calculator', 'epicyclic gear train formula r equals 1 plus n ring over n sun online', 'automatic transmission planetary gear reduction calculator', 'sun planet carrier ring gear tooth count calculator', 'mechanical automotive drivetrain gear train online'],
    order: 1112,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sun Gear Teeth N_sun, Ring Teeth N_ring & Input Speed (RPM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pg-sun">Sun Teeth N_s</label>
          <input class="tool-textarea" id="pg-sun" type="number" step="2" value="24" placeholder="24" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pg-ring">Ring Teeth N_r</label>
          <input class="tool-textarea" id="pg-ring" type="number" step="6" value="72" placeholder="72" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pg-rpm">Input Speed (RPM)</label>
          <input class="tool-textarea" id="pg-rpm" type="number" step="500" value="3000" placeholder="3000 RPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pg-cfg">Mode</label>
          <select class="tool-textarea" id="pg-cfg">
            <option value="red" selected>Ring Fixed (Carrier Output R = 1 + N_r/N_s)</option>
            <option value="od">Carrier Fixed (Ring Output R = -N_r/N_s)</option>
          </select>
        </div>
      </div>
      <div id="pg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pg-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gear Ratio R = 4.00:1</span>
            <span class="stat-label">Total Epicyclic Planetary Gear Ratio</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pg-res-out" style="color:var(--green-dark); font-weight:700;">Output = 750 RPM (4× Torque) | Planet Gear N_p = 24</span>
            <span class="stat-label">Output Speed & Planet Gear Sizing</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('pg-sun'), rEl = document.getElementById('pg-ring');
  const rpmEl = document.getElementById('pg-rpm'), cfgEl = document.getElementById('pg-cfg');
  const rtResEl = document.getElementById('pg-res-ratio'), outResEl = document.getElementById('pg-res-out');

  function update() {
    const N_s = parseInt(sEl.value, 10), N_r = parseInt(rEl.value, 10);
    const rpm_in = parseFloat(rpmEl.value), mode = cfgEl.value;

    if (isNaN(N_s) || isNaN(N_r) || isNaN(rpm_in) || N_s <= 0 || N_r <= N_s) return;

    const N_p = (N_r - N_s) / 2.0;
    const ratio = mode === 'red' ? 1.0 + (N_r / N_s) : -(N_r / N_s);
    const rpm_out = rpm_in / Math.abs(ratio);

    rtResEl.textContent = 'Gear Ratio R = ' + Math.abs(ratio).toFixed(2) + ':1 (' + (ratio < 0 ? 'REVERSE' : 'FORWARD') + ')';
    outResEl.textContent = 'Output = ' + (ratio < 0 ? '-' : '') + rpm_out.toFixed(0) + ' RPM (' + Math.abs(ratio).toFixed(2) + '× Torque) | Planet N_p = ' + N_p;
  }

  [sEl, rEl, rpmEl].forEach(el => el.addEventListener('input', update));
  cfgEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter sun gear and ring gear teeth.',
      'Enter input shaft RPM.',
      'Inspect output gear ratio and torque multiplication.'
    ],
    benefitTitle: 'Planetary Gear Coaxial High Torque Density',
    benefitContent: 'Splits gear forces across multiple planet gears in a compact coaxial housing.',
    faqs: [{ q: 'What is the planetary gear tooth relationship?', a: '$N_{\text{ring}} = N_{\text{sun}} + 2 N_{\text{planet}}$.' }]
  },

  // 7. Engine Brake Mean Effective Pressure (BMEP) Calculator
  {
    slug: 'internal-combustion-engine-bmep-indicated-power-calculator',
    name: 'Engine Brake Mean Effective Pressure (BMEP = 2π·n_R·T / V_d) & Power Calculator',
    description: 'Calculate internal combustion engine Brake Mean Effective Pressure (BMEP = 2π · n_R · T / V_d) in bar/psi, Brake Horsepower (BHP), and engine torque volumetric efficiency from displacement V_d in liters and dyno torque T.',
    category: 'Science',
    icon: 'text',
    keywords: ['bmep calculator', 'brake mean effective pressure formula bmep online', 'engine torque displacement bmep calculator bar psi', 'brake horsepower engine power displacement calculator', 'automotive mechanical engine tuning online'],
    order: 1113,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Engine Displacement V_d (L), Torque T (N·m) & Speed (RPM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bm-disp">Displacement (L)</label>
          <input class="tool-textarea" id="bm-disp" type="number" step="0.2" value="2.0" placeholder="2.0 L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bm-tq">Torque (N·m)</label>
          <input class="tool-textarea" id="bm-tq" type="number" step="20" value="350.0" placeholder="350.0 N·m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bm-rpm">Speed (RPM)</label>
          <input class="tool-textarea" id="bm-rpm" type="number" step="500" value="5500" placeholder="5,500 RPM" />
        </div>
      </div>
      <div id="bm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bm-res-bmep" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BMEP = 22.00 bar (319.1 psi)</span>
            <span class="stat-label">Brake Mean Effective Pressure (BMEP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bm-res-power" style="color:var(--green-dark); font-weight:700;">Power = 201.6 kW (270.3 HP) | TURBOCHARGED (High Boost: 18-24 bar)</span>
            <span class="stat-label">Brake Horsepower Output & Engine Benchmark</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('bm-disp'), tqEl = document.getElementById('bm-tq'), rpmEl = document.getElementById('bm-rpm');
  const bmResEl = document.getElementById('bm-res-bmep'), pwResEl = document.getElementById('bm-res-power');

  function update() {
    const V_d_L = parseFloat(dEl.value), T_Nm = parseFloat(tqEl.value), rpm = parseFloat(rpmEl.value);
    if (isNaN(V_d_L) || isNaN(T_Nm) || isNaN(rpm) || V_d_L <= 0 || T_Nm <= 0 || rpm <= 0) return;

    const V_d_m3 = V_d_L * 1e-3;
    const BMEP_Pa = (2.0 * Math.PI * 2.0 * T_Nm) / V_d_m3;
    const BMEP_bar = BMEP_Pa / 1e5;
    const BMEP_psi = BMEP_bar * 14.5038;

    const omega = (2.0 * Math.PI * rpm) / 60.0;
    const Power_kW = (omega * T_Nm) / 1000.0;
    const Power_HP = Power_kW * 1.34102;

    bmResEl.textContent = 'BMEP = ' + BMEP_bar.toFixed(2) + ' bar (' + BMEP_psi.toFixed(1) + ' psi)';
    pwResEl.textContent = 'Power = ' + Power_kW.toFixed(1) + ' kW (' + Power_HP.toFixed(1) + ' HP) @ ' + rpm + ' RPM';
  }

  [dEl, tqEl, rpmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter displacement, torque, and engine RPM.',
      'Inspect BMEP in bar/psi and horsepower output.'
    ],
    benefitTitle: 'BMEP Universal Engine Metric',
    benefitContent: 'Normalizes engine torque by cylinder displacement for universal performance comparison.',
    faqs: [{ q: 'What is typical naturally aspirated BMEP?', a: 'Standard passenger car NA engines produce $9\text{–}11\text{ bar}$ BMEP.' }]
  },

  // 8. Dynamic Braking Weight Transfer Calculator
  {
    slug: 'vehicle-stopping-braking-weight-transfer-center-of-gravity-calculator',
    name: 'Vehicle Dynamic Braking Weight Transfer (ΔW = (a/g)·(h/L)·W) Calculator',
    description: 'Calculate automotive dynamic longitudinal weight transfer during braking (ΔW = (a/g) · (h/L) · W) in kg/N, front-to-rear dynamic axle load distribution, and brake bias percentage for chassis engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['weight transfer calculator', 'braking weight transfer formula delta w equals a over g times h over l online', 'automotive brake bias front rear axle load calculator', 'center of gravity height wheelbase weight transfer calculator', 'vehicle dynamics automotive chassis engineering online'],
    order: 1114,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vehicle Mass W (kg), Wheelbase L (m), CG Height h (m) & Decel a (g)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wt-m">Mass W (kg)</label>
          <input class="tool-textarea" id="wt-m" type="number" step="50" value="1500" placeholder="1500 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-l">Wheelbase L (m)</label>
          <input class="tool-textarea" id="wt-l" type="number" step="0.1" value="2.70" placeholder="2.70 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-h">CG Height h (m)</label>
          <input class="tool-textarea" id="wt-h" type="number" step="0.05" value="0.55" placeholder="0.55 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-a">Decel a (g)</label>
          <input class="tool-textarea" id="wt-a" type="number" step="0.1" value="0.90" placeholder="0.90 g" />
        </div>
      </div>
      <div id="wt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wt-res-dw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Transferred ΔW = 275.0 kg (2,697 N)</span>
            <span class="stat-label">Forward Dynamic Weight Transfer to Front Axle</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wt-res-split" style="color:var(--green-dark); font-weight:700;">Front Axle = 1,025 kg (68.3%) | Rear Axle = 475 kg (31.7% - Risk of Rear Lockup)</span>
            <span class="stat-label">Dynamic Braking Axle Weight Distribution & Brake Bias</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('wt-m'), lEl = document.getElementById('wt-l');
  const hEl = document.getElementById('wt-h'), aEl = document.getElementById('wt-a');
  const dwResEl = document.getElementById('wt-res-dw'), spResEl = document.getElementById('wt-res-split');

  function update() {
    const W_kg = parseFloat(mEl.value), L_m = parseFloat(lEl.value);
    const h_m = parseFloat(hEl.value), a_g = parseFloat(aEl.value);

    if (isNaN(W_kg) || isNaN(L_m) || isNaN(h_m) || isNaN(a_g) || W_kg <= 0 || L_m <= 0 || h_m <= 0 || a_g <= 0) return;

    const Delta_W_kg = a_g * (h_m / L_m) * W_kg;
    const dynamic_front = (W_kg * 0.50) + Delta_W_kg;
    const dynamic_rear = (W_kg * 0.50) - Delta_W_kg;

    dwResEl.textContent = 'Transferred ΔW = ' + Delta_W_kg.toFixed(1) + ' kg (' + Math.round(Delta_W_kg * 9.80665).toLocaleString() + ' N)';
    spResEl.textContent = 'Front = ' + Math.round(dynamic_front) + ' kg (' + ((dynamic_front/W_kg)*100).toFixed(1) + '%) | Rear = ' + Math.round(dynamic_rear) + ' kg (' + ((dynamic_rear/W_kg)*100).toFixed(1) + '%)';
  }

  [mEl, lEl, hEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mass, wheelbase, CG height, and deceleration.',
      'Inspect front/rear axle dynamic load distribution and required brake bias.'
    ],
    benefitTitle: 'Braking Weight Transfer',
    benefitContent: 'Chassis pitching dynamically shifts load to front wheels during deceleration.',
    faqs: [{ q: 'Why is electronic brake distribution (EBD) used?', a: 'EBD continuously adjusts rear brake pressure to match real-time dynamic weight transfer.' }]
  },

  // 9. Aircraft Wing Aspect Ratio & Induced Drag Calculator
  {
    slug: 'aircraft-wing-aspect-ratio-induced-drag-calculator',
    name: 'Aircraft Wing Aspect Ratio (AR = b² / S) & Induced Drag (C_Di = C_L² / (π·e·AR)) Calculator',
    description: 'Calculate aircraft wing Aspect Ratio (AR = b² / S), Oswald wing efficiency factor e, and induced vortex drag coefficient (C_Di = C_L² / (π · e · AR)) for aeronautical wing design.',
    category: 'Science',
    icon: 'text',
    keywords: ['wing aspect ratio calculator', 'induced drag formula c di equals cl squared over pi e ar online', 'oswald efficiency wing aspect ratio calculator', 'vortex drag lift induced drag aircraft calculator', 'aeronautical wing design aspect ratio online'],
    order: 1115,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wingspan b (m), Wing Area S (m²), Lift Coefficient C_L & Oswald Factor e (0.7-0.9)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ar-b">Wingspan b (m)</label>
          <input class="tool-textarea" id="ar-b" type="number" step="1" value="35.8" placeholder="35.8 m (Boeing 737)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-s">Wing Area S (m²)</label>
          <input class="tool-textarea" id="ar-s" type="number" step="10" value="122.6" placeholder="122.6 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-cl">Lift Coeff C_L</label>
          <input class="tool-textarea" id="ar-cl" type="number" step="0.1" value="0.55" placeholder="0.55 (Cruise)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-e">Oswald e</label>
          <input class="tool-textarea" id="ar-e" type="number" step="0.05" value="0.82" placeholder="0.82" />
        </div>
      </div>
      <div id="ar-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ar-res-ar" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Aspect Ratio AR = 10.45</span>
            <span class="stat-label">Wing Geometric Aspect Ratio (AR = b² / S)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ar-res-cdi" style="color:var(--green-dark); font-weight:700;">Induced Drag C_Di = 0.0112 (Accounts for ~38% of total cruise aircraft drag)</span>
            <span class="stat-label">Lift-Induced Vortex Drag Coefficient (C_Di)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('ar-b'), sEl = document.getElementById('ar-s');
  const clEl = document.getElementById('ar-cl'), eEl = document.getElementById('ar-e');
  const arResEl = document.getElementById('ar-res-ar'), cdiResEl = document.getElementById('ar-res-cdi');

  function update() {
    const b = parseFloat(bEl.value), S = parseFloat(sEl.value);
    const C_L = parseFloat(clEl.value), e = parseFloat(eEl.value);

    if (isNaN(b) || isNaN(S) || isNaN(C_L) || isNaN(e) || b <= 0 || S <= 0 || C_L <= 0 || e <= 0) return;

    // Aspect ratio AR = b^2 / S
    const AR = Math.pow(b, 2) / S;

    // Induced drag C_Di = C_L^2 / (pi * e * AR)
    const C_Di = Math.pow(C_L, 2) / (Math.PI * e * AR);

    arResEl.textContent = 'Aspect Ratio AR = ' + AR.toFixed(2);
    cdiResEl.textContent = 'Induced Drag C_Di = ' + C_Di.toFixed(4) + ' (Oswald e = ' + e + ' @ C_L = ' + C_L + ')';
  }

  [bEl, sEl, clEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter wingspan b in meters and wing surface area S in $\text{m}^2$.',
      'Enter operational lift coefficient $C_L$ and Oswald span efficiency factor e.',
      'Inspect Aspect Ratio ($AR$) and induced vortex drag coefficient ($C_{Di}$).'
    ],
    benefitTitle: 'Prandtl Lifting-Line Induced Drag Theory',
    benefitContent: 'High aspect ratio wings ($AR > 10$) reduce wingtip vortices and lift-induced drag ($C_{Di} \propto 1/AR$), which is why long-range gliders and U-2 spy planes use slender wings.',
    faqs: [{ q: 'Why do modern airliners install winglets?', a: 'Winglets diffuse wingtip vortex swirl, artificially boosting effective aspect ratio by $10\text{–}15\%$ and saving fuel.' }]
  },

  // 10. Mach Cone Angle & Supersonic Expansion Calculator
  {
    slug: 'mach-cone-angle-prandtl-meyer-expansion-calculator',
    name: 'Supersonic Mach Cone Angle (sin μ = 1 / M) & Shock Angle Calculator',
    description: 'Calculate supersonic Mach wave cone half-angle (μ = arcsin(1 / M)) in degrees, Prandtl-Meyer expansion angle, and flow properties across supersonic transitions in aerospace compressible aerodynamics.',
    category: 'Science',
    icon: 'text',
    keywords: ['mach cone angle calculator', 'mach angle formula mu equals arcsin 1 over m online', 'supersonic shock cone angle calculator', 'compressible flow prandtl meyer mach calculator', 'aerospace supersonic aerodynamics online'],
    order: 1116,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Supersonic Flight Mach Number M (M > 1.0, e.g. 1.5, 2.0, 3.0)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="mc-mach">Mach Number M</label>
        <input class="tool-textarea" id="mc-mach" type="number" step="0.2" min="1.01" max="10.0" value="2.0" placeholder="2.0 (Concorde / Mach 2)" />
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-mu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Mach Angle μ = 30.00°</span>
            <span class="stat-label">Mach Wave Shock Cone Half-Angle (μ = arcsin(1/M))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-zone" style="color:var(--green-dark); font-weight:700;">Zone of Action inside 60.0° Full Cone | Complete silence ahead in Zone of Silence</span>
            <span class="stat-label">Supersonic Acoustic Cone Propagation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('mc-mach');
  const muResEl = document.getElementById('mc-res-mu'), znResEl = document.getElementById('mc-res-zone');

  function update() {
    const M = parseFloat(mEl.value);
    if (isNaN(M) || M <= 1.0) {
      muResEl.textContent = 'SUBSONIC (M ≤ 1.0: No shock cone forms)';
      znResEl.textContent = 'Mach number must be strictly greater than 1.0 for supersonic shock cone';
      return;
    }

    const mu_rad = Math.asin(1.0 / M);
    const mu_deg = (mu_rad * 180.0) / Math.PI;
    const fullCone = 2.0 * mu_deg;

    muResEl.textContent = 'Mach Angle μ = ' + mu_deg.toFixed(2) + '°';
    znResEl.textContent = 'Full Cone = ' + fullCone.toFixed(1) + '° | M = ' + M.toFixed(2) + ' (Acoustic disturbances swept downstream inside cone)';
  }

  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter supersonic flight Mach number $M > 1.0$.',
      'Inspect Mach wave cone angle $\mu = \arcsin(1/M)$ and total shock cone envelope.'
    ],
    benefitTitle: 'Ernst Mach 1887 Supersonic Cone Geometry',
    benefitContent: 'At supersonic speeds, pressure disturbances cannot travel ahead of the vehicle, concentrating into a narrow conical shockwave envelope ($\sin\mu = 1/M$) that generates the ground sonic boom.',
    faqs: [{ q: 'What happens to the Mach cone angle as speed increases?', a: 'As Mach number increases, the Mach cone angle narrows ($\mu \rightarrow 0$), sweeping shockwaves tighter against the fuselage.' }]
  },

  // 11. Oblique Shock Wave Theta-Beta-Mach Relation Calculator
  {
    slug: 'oblique-shock-wave-theta-beta-mach-calculator',
    name: 'Oblique Shock Wave (θ-β-M Relation & Deflection Angle) Calculator',
    description: 'Calculate supersonic compressible oblique shock wave deflection angle θ, shock wave angle β, and downstream Mach number M₂ using the classic θ-β-M compressible flow equation for supersonic wedge intakes.',
    category: 'Science',
    icon: 'text',
    keywords: ['oblique shock wave calculator', 'theta beta mach relation formula online', 'supersonic shock wave deflection angle calculator', 'downstream mach number oblique shock calculator', 'aerospace compressible flow shock waves online'],
    order: 1117,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Upstream Mach M₁ (e.g. 2.5) & Shock Wave Angle β (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="obs-m1">Mach M₁</label>
          <input class="tool-textarea" id="obs-m1" type="number" step="0.2" value="2.5" placeholder="2.5" />
        </div>
        <div class="control-group">
          <label class="control-label" for="obs-beta">Shock Angle β (°)</label>
          <input class="tool-textarea" id="obs-beta" type="number" step="2" value="35.0" placeholder="35.0°" />
        </div>
      </div>
      <div id="obs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="obs-res-theta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Wedge Deflection θ = 13.06°</span>
            <span class="stat-label">Flow Deflection Angle θ (θ-β-M Relation)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="obs-res-m2" style="color:var(--green-dark); font-weight:700;">Downstream Mach M₂ = 1.94 (Weak Shock Solution | Pressure Ratio P₂/P₁ = 2.23)</span>
            <span class="stat-label">Downstream Mach M₂ & Static Pressure Jump</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('obs-m1'), bEl = document.getElementById('obs-beta');
  const thResEl = document.getElementById('obs-res-theta'), m2ResEl = document.getElementById('obs-res-m2');

  const gamma = 1.40;

  function update() {
    const M1 = parseFloat(m1El.value), beta_deg = parseFloat(bEl.value);
    if (isNaN(M1) || isNaN(beta_deg) || M1 <= 1.0 || beta_deg <= 0 || beta_deg >= 90) return;

    const beta_rad = (beta_deg * Math.PI) / 180.0;
    const sin_b = Math.sin(beta_rad);
    const cos_b = Math.cos(beta_rad);
    const cot_b = 1.0 / Math.tan(beta_rad);

    // Normal Mach number upstream: M_n1 = M1 * sin(beta)
    const M_n1 = M1 * sin_b;
    if (M_n1 <= 1.0) {
      thResEl.textContent = 'NO SHOCK (M_n1 = M₁·sin β ≤ 1.0)';
      m2ResEl.textContent = 'M₁·sin β must exceed 1.0 for an oblique shock';
      return;
    }

    // Theta-Beta-M relation:
    // tan(theta) = 2 * cot(beta) * [ (M1^2 * sin^2(beta) - 1) / ( M1^2 * (gamma + cos(2*beta)) + 2 ) ]
    const num = Math.pow(M1, 2) * Math.pow(sin_b, 2) - 1.0;
    const den = Math.pow(M1, 2) * (gamma + Math.cos(2.0 * beta_rad)) + 2.0;
    const tan_theta = 2.0 * cot_b * (num / den);

    const theta_rad = Math.atan(tan_theta);
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    // Normal Mach downstream:
    const M_n2 = Math.sqrt((Math.pow(M_n1, 2) + 2.0 / (gamma - 1.0)) / ((2.0 * gamma / (gamma - 1.0)) * Math.pow(M_n1, 2) - 1.0));
    // Downstream total Mach M2 = M_n2 / sin(beta - theta)
    const M2 = M_n2 / Math.sin(beta_rad - theta_rad);

    // Static pressure ratio P2 / P1 = 1 + (2*gamma / (gamma+1)) * (M_n1^2 - 1)
    const p_ratio = 1.0 + ((2.0 * gamma) / (gamma + 1.0)) * (Math.pow(M_n1, 2) - 1.0);

    thResEl.textContent = 'Wedge Deflection θ = ' + theta_deg.toFixed(2) + '°';
    m2ResEl.textContent = 'Downstream Mach M₂ = ' + M2.toFixed(2) + ' | P₂/P₁ = ' + p_ratio.toFixed(2) + ' (M_n1 = ' + M_n1.toFixed(2) + ')';
  }

  [m1El, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter upstream supersonic Mach number $M_1$.',
      'Enter oblique shock angle $\beta$ in degrees.',
      'Inspect wedge flow deflection angle $\theta$, downstream Mach number $M_2$, and static pressure ratio ($P_2/P_1$).'
    ],
    benefitTitle: 'Compressible Oblique Shock Dynamics',
    benefitContent: 'Oblique shock waves decelerate supersonic flow with dramatically less stagnation pressure loss than normal shocks, making them essential for supersonic jet engine intake ramps (SR-71, Concorde).',
    faqs: [{ q: 'What is the maximum deflection angle theta_max?', a: 'If wedge angle $\theta$ exceeds $\theta_{\max}$, the oblique shock detaches from the wedge nose, forming a detached bow shock.' }]
  },

  // 12. Pitot-Tube Airspeed & Dynamic Pressure Calculator
  {
    slug: 'pitot-tube-airspeed-dynamic-pressure-calculator',
    name: 'Pitot-Static Tube Airspeed (v = √(2·ΔP / ρ)) & Dynamic Pressure (q) Calculator',
    description: 'Calculate indicated and true airspeed (v = √(2·(P_total - P_static) / ρ)) in knots and km/h from Pitot-static tube dynamic impact pressure (q = P_t - P_s) in hPa and local air density ρ for avionics.',
    category: 'Science',
    icon: 'text',
    keywords: ['pitot tube calculator', 'pitot static airspeed formula v equals sqrt 2 delta p over rho online', 'dynamic pressure impact pressure airspeed calculator', 'indicated true airspeed pitot tube aviation calculator', 'avionics aerodynamics pitot tube online'],
    order: 1118,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Differential Impact Pressure ΔP (hPa or Pa) & Air Density ρ (kg/m³, 1.225 Sea Level)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pt-dp">Impact ΔP (hPa)</label>
          <input class="tool-textarea" id="pt-dp" type="number" step="5" value="50.0" placeholder="50.0 hPa (5,000 Pa)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pt-rho">Air Density ρ</label>
          <input class="tool-textarea" id="pt-rho" type="number" step="0.05" value="1.225" placeholder="1.225 kg/m³ (MSL)" />
        </div>
      </div>
      <div id="pt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pt-res-spd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Airspeed v = 175.6 Knots (325.2 km/h)</span>
            <span class="stat-label">True Airspeed (v = √(2·ΔP / ρ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pt-res-dyn" style="color:var(--green-dark); font-weight:700;">Dynamic Pressure q = 5,000 Pa (50.0 hPa / 0.725 psi | Velocity = 90.35 m/s)</span>
            <span class="stat-label">Incompressible Bernoulli Impact Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('pt-dp'), rEl = document.getElementById('pt-rho');
  const spdResEl = document.getElementById('pt-res-spd'), dynResEl = document.getElementById('pt-res-dyn');

  function update() {
    const dp_hPa = parseFloat(dpEl.value), rho = parseFloat(rEl.value);
    if (isNaN(dp_hPa) || isNaN(rho) || dp_hPa <= 0 || rho <= 0) return;

    const deltaP_Pa = dp_hPa * 100.0;

    // Bernoulli: deltaP = 0.5 * rho * v^2 => v = sqrt( 2 * deltaP / rho )  [m / s]
    const v_mps = Math.sqrt((2.0 * deltaP_Pa) / rho);
    const v_kts = v_mps * 1.94384;
    const v_kmh = v_mps * 3.6;

    spdResEl.textContent = 'Airspeed v = ' + v_kts.toFixed(1) + ' Knots (' + v_kmh.toFixed(1) + ' km/h)';
    dynResEl.textContent = 'Dynamic Pressure q = ' + Math.round(deltaP_Pa).toLocaleString() + ' Pa (' + dp_hPa.toFixed(1) + ' hPa | Velocity = ' + v_mps.toFixed(2) + ' m/s @ ρ = ' + rho + ' kg/m³)';
  }

  [dpEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Pitot-static tube dynamic pressure difference $\Delta P = P_{\text{total}} - P_{\text{static}}$ in hPa.',
      'Enter flight ambient air density $\rho$ in $\text{kg/m}^3$.',
      'Inspect calculated airspeed in knots, km/h, and m/s.'
    ],
    benefitTitle: 'Henri Pitot 1732 Differential Pressure Airspeed Standard',
    benefitContent: 'Pitot-static tubes convert fluid stagnation kinetic energy into readable pressure differences ($\Delta P = \frac{1}{2} \rho v^2$), driving all aircraft primary airspeed indicators (ASI).',
    faqs: [{ q: 'What is the difference between Indicated Airspeed (IAS) and True Airspeed (TAS)?', a: 'IAS measures dynamic pressure assuming standard sea-level density; TAS is the actual physical speed through the airmass ($v_{\text{TAS}} = v_{\text{IAS}} / \sqrt{\rho/\rho_0}$).' }]
  },

  // 13. Aircraft Stall Speed & Wing Loading Calculator
  {
    slug: 'aircraft-stall-speed-wing-loading-calculator',
    name: 'Aircraft Stall Speed (v_s = √(2·W / (ρ·S·C_L_max))) & Wing Loading Calculator',
    description: 'Calculate minimum aircraft aerodynamic stall speed (v_s = √(2·W / (ρ·S·C_L_max))) in knots and km/h, wing loading (W/S in kg/m²), and load factor g-turn accelerated stall speed for flight safety.',
    category: 'Science',
    icon: 'text',
    keywords: ['stall speed calculator', 'aircraft stall speed formula vs equals sqrt 2 w over rho s cl max online', 'wing loading w over s calculator', 'accelerated stall speed load factor g calculator', 'flight aerodynamics aviation stall speed online'],
    order: 1119,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Aircraft Gross Weight W (kg), Wing Area S (m²), Max Lift C_L_max & Bank Angle φ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="st-w">Weight W (kg)</label>
          <input class="tool-textarea" id="st-w" type="number" step="100" value="1150" placeholder="1150 kg (Cessna 172)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-s">Wing Area S (m²)</label>
          <input class="tool-textarea" id="st-s" type="number" step="1" value="16.2" placeholder="16.2 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-clmax">Max C_L_max</label>
          <input class="tool-textarea" id="st-clmax" type="number" step="0.1" value="1.60" placeholder="1.60 (Clean Wing)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-bank">Bank Angle φ (°)</label>
          <input class="tool-textarea" id="st-bank" type="number" step="15" min="0" max="75" value="0.0" placeholder="0.0° (Level Flight)" />
        </div>
      </div>
      <div id="st-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="st-res-vs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Stall Speed v_s = 51.8 Knots (96.0 km/h)</span>
            <span class="stat-label">Minimum Level Flight Aerodynamic Stall Speed</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="st-res-wl" style="color:var(--green-dark); font-weight:700;">Wing Loading W/S = 71.0 kg/m² (14.5 lb/ft²) | Load Factor n = 1.00 g</span>
            <span class="stat-label">Wing Loading & Accelerated G-Load Stall Multiplier</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('st-w'), sEl = document.getElementById('st-s');
  const clEl = document.getElementById('st-clmax'), bkEl = document.getElementById('st-bank');
  const vsResEl = document.getElementById('st-res-vs'), wlResEl = document.getElementById('st-res-wl');

  const rho_sl = 1.225, g = 9.80665;

  function update() {
    const W_kg = parseFloat(wEl.value), S_m2 = parseFloat(sEl.value);
    const CL_max = parseFloat(clEl.value), bank_deg = parseFloat(bkEl.value);

    if (isNaN(W_kg) || isNaN(S_m2) || isNaN(CL_max) || isNaN(bank_deg) || W_kg <= 0 || S_m2 <= 0 || CL_max <= 0 || bank_deg < 0 || bank_deg >= 90) return;

    // Load factor in coordinated level turn: n = 1 / cos(phi)
    const bank_rad = (bank_deg * Math.PI) / 180.0;
    const n_load = 1.0 / Math.cos(bank_rad);

    // Wing loading: W/S in kg/m^2
    const wingLoading = W_kg / S_m2;
    const wingLoading_lbft2 = wingLoading * 0.204816;

    // Weight force W_N = W_kg * g
    const W_N = W_kg * g;

    // Level stall speed: v_s0 = sqrt( (2 * W_N) / (rho * S * CL_max) )  [m / s]
    const v_s0_mps = Math.sqrt((2.0 * W_N) / (rho_sl * S_m2 * CL_max));

    // Accelerated stall speed in turn: v_s = v_s0 * sqrt(n)
    const v_s_mps = v_s0_mps * Math.sqrt(n_load);
    const v_s_kts = v_s_mps * 1.94384;
    const v_s_kmh = v_s_mps * 3.6;

    vsResEl.textContent = 'Stall Speed v_s = ' + v_s_kts.toFixed(1) + ' Knots (' + v_s_kmh.toFixed(1) + ' km/h)';
    wlResEl.textContent = 'Wing Loading W/S = ' + wingLoading.toFixed(1) + ' kg/m² (' + wingLoading_lbft2.toFixed(1) + ' lb/ft²) | Load Factor n = ' + n_load.toFixed(2) + ' g (@ ' + bank_deg + '° Bank)';
  }

  [wEl, sEl, clEl, bkEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aircraft gross weight W in kg.',
      'Enter wing planform surface area S in $\text{m}^2$.',
      'Enter maximum aerodynamic lift coefficient $C_{L,\max}$ (1.4–1.8 clean, 2.2–2.8 with full landing flaps).',
      'Enter turn bank angle $\phi$ in degrees.',
      'Inspect calibrated stall speed $v_s$, wing loading ($W/S$), and accelerated g-stall multiplier.'
    ],
    benefitTitle: 'Aerodynamic Stall Flight Envelope Boundary',
    benefitContent: 'Exceeding the critical angle of attack ($\alpha_{\text{crit}} \approx 14^\circ\text{–}18^\circ$) causes flow separation and loss of lift; during steep $60^\circ$ turns, the load factor doubles ($n = 2.0\text{g}$), increasing stall speed by $41.4\%$ ($v_s \propto \sqrt{n}$).',
    faqs: [{ q: 'Why do deployment of wing flaps reduce stall speed?', a: 'Flaps increase effective wing camber and area, raising $C_{L,\max}$ from $\sim 1.6$ to $\sim 2.4$, which lowers touchdown stall speed significantly.' }]
  },

  // 14. Propeller Advance Ratio & Propulsion Efficiency Calculator
  {
    slug: 'propeller-thrust-advance-ratio-efficiency-calculator',
    name: 'Aircraft Propeller Advance Ratio (J = v / (n·D)) & Efficiency (η = T·v / P) Calculator',
    description: 'Calculate aircraft propeller advance ratio (J = v / (n · D)), thrust coefficient C_T, power coefficient C_P, and propulsive efficiency (η = T · v / P) for piston/turboprop aeronautical propulsion.',
    category: 'Science',
    icon: 'text',
    keywords: ['propeller advance ratio calculator', 'propulsive efficiency formula eta equals t v over p online', 'propeller thrust power coefficient calculator', 'advance ratio j equals v over n d aviation calculator', 'aeronautical propeller propulsion mechanics online'],
    order: 1120,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flight Speed v (kts), Propeller Diameter D (m), Rotational Speed n (RPM) & Thrust T (N)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pr-v">Airspeed v (kts)</label>
          <input class="tool-textarea" id="pr-v" type="number" step="10" value="120.0" placeholder="120.0 kts" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-d">Diameter D (m)</label>
          <input class="tool-textarea" id="pr-d" type="number" step="0.1" value="1.90" placeholder="1.90 m (75 inch)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-rpm">Prop RPM</label>
          <input class="tool-textarea" id="pr-rpm" type="number" step="100" value="2400" placeholder="2,400 RPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-t">Thrust T (N)</label>
          <input class="tool-textarea" id="pr-t" type="number" step="100" value="1500" placeholder="1,500 N (337 lbf)" />
        </div>
      </div>
      <div id="pr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pr-res-j" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Advance Ratio J = 0.81</span>
            <span class="stat-label">Dimensionless Propeller Advance Ratio (J = v / n·D)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pr-res-eff" style="color:var(--green-dark); font-weight:700;">Thrust Power = 92.6 kW (124.2 HP) | Propeller Tip Mach = 0.70 (Tip Speed: 238.8 m/s)</span>
            <span class="stat-label">Useful Thrust Horsepower & Propeller Blade Tip Mach Number</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('pr-v'), dEl = document.getElementById('pr-d');
  const rpmEl = document.getElementById('pr-rpm'), tEl = document.getElementById('pr-t');
  const jResEl = document.getElementById('pr-res-j'), efResEl = document.getElementById('pr-res-eff');

  function update() {
    const v_kts = parseFloat(vEl.value), D_m = parseFloat(dEl.value);
    const rpm = parseFloat(rpmEl.value), T_N = parseFloat(tEl.value);

    if (isNaN(v_kts) || isNaN(D_m) || isNaN(rpm) || isNaN(T_N) || v_kts <= 0 || D_m <= 0 || rpm <= 0 || T_N <= 0) return;

    // Convert kts to m/s:
    const v_mps = v_kts * 0.514444;
    // Rotational frequency n in rev/s:
    const n_rps = rpm / 60.0;

    // Advance ratio: J = v / ( n * D )
    const J = v_mps / (n_rps * D_m);

    // Useful thrust power: P_thrust = T * v  [Watts -> kW]
    const P_thrust_kW = (T_N * v_mps) / 1000.0;
    const P_thrust_HP = P_thrust_kW * 1.34102;

    // Propeller tip speed: v_tip = pi * D * n_rps
    const v_tip_mps = Math.PI * D_m * n_rps;
    const tipMach = v_tip_mps / 340.0; // speed of sound ~340 m/s

    jResEl.textContent = 'Advance Ratio J = ' + J.toFixed(2);
    efResEl.textContent = 'Thrust Power = ' + P_thrust_kW.toFixed(1) + ' kW (' + P_thrust_HP.toFixed(1) + ' HP) | Tip Mach = ' + tipMach.toFixed(2) + ' (Tip Speed: ' + v_tip_mps.toFixed(1) + ' m/s @ ' + rpm + ' RPM)';
  }

  [vEl, dEl, rpmEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aircraft flight speed in knots.',
      'Enter propeller disc diameter D in meters.',
      'Enter propeller rotational speed in RPM.',
      'Enter generated propeller thrust in Newtons.',
      'Inspect dimensionless advance ratio J, useful thrust power, and blade tip Mach number.'
    ],
    benefitTitle: 'William Froude Propeller Actuator Disk Momentum Theory',
    benefitContent: 'The advance ratio ($J = \frac{v}{nD}$) represents the forward distance traveled per propeller revolution normalized by diameter; constant-speed variable-pitch propellers adjust blade angle to maintain peak propulsive efficiency ($\eta \approx 85\%$) across all flight regimes.',
    faqs: [{ q: 'Why must propeller blade tip Mach remain below 0.85?', a: 'Supersonic propeller blade tips generate severe shockwave drag and deafening acoustic noise.' }]
  },

  // 15. Rocket Nozzle Area Ratio & Isentropic Expansion Calculator
  {
    slug: 'rocket-nozzle-isentropic-expansion-area-ratio-calculator',
    name: 'Rocket De Laval Nozzle Area Ratio (A / A*) & Exit Mach Number Calculator',
    description: 'Calculate supersonic rocket engine De Laval converging-diverging nozzle expansion area ratio (A / A*), exit Mach number M_e, and pressure expansion ratio for rocket propulsion engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['rocket nozzle area ratio calculator', 'de laval nozzle expansion formula a over a star online', 'supersonic exit mach number nozzle calculator', 'rocket expansion ratio under overexpanded calculator', 'aerospace rocket propulsion gas dynamics online'],
    order: 1121,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Desired Exit Mach M_e (e.g. 2.5 to 4.5) & Specific Heat Ratio γ (1.20 to 1.40)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nz-me">Exit Mach M_e</label>
          <input class="tool-textarea" id="nz-me" type="number" step="0.2" value="3.2" placeholder="3.2 (Vacuum Upper Stage)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nz-gamma">Gamma γ</label>
          <input class="tool-textarea" id="nz-gamma" type="number" step="0.02" value="1.22" placeholder="1.22 (Combustion Gas)" />
        </div>
      </div>
      <div id="nz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nz-res-ar" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Nozzle Area Ratio ε = A_e / A* = 18.42</span>
            <span class="stat-label">Expansion Ratio (Exit Area / Throat Area)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nz-res-pr" style="color:var(--green-dark); font-weight:700;">Pressure Ratio P_e / P_c = 0.0162 (61.7× Chamber Pressure Drop | Supersonic Divergent Bell)</span>
            <span class="stat-label">Isentropic Chamber-to-Exit Pressure Expansion Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const meEl = document.getElementById('nz-me'), gEl = document.getElementById('nz-gamma');
  const arResEl = document.getElementById('nz-res-ar'), prResEl = document.getElementById('nz-res-pr');

  function update() {
    const M_e = parseFloat(meEl.value), gamma = parseFloat(gEl.value);
    if (isNaN(M_e) || isNaN(gamma) || M_e < 1.0 || gamma <= 1.0) return;

    // Isentropic Area-Mach Relation:
    // A / A* = (1 / M) * [ (2 / (gamma + 1)) * ( 1 + (gamma - 1)/2 * M^2 ) ]^( (gamma + 1) / (2 * (gamma - 1)) )
    const expTerm = (gamma + 1.0) / (2.0 * (gamma - 1.0));
    const baseTerm = (2.0 / (gamma + 1.0)) * (1.0 + ((gamma - 1.0) / 2.0) * Math.pow(M_e, 2));
    const A_over_Astar = (1.0 / M_e) * Math.pow(baseTerm, expTerm);

    // Isentropic Pressure Ratio: P_e / P_c = [ 1 + (gamma - 1)/2 * M_e^2 ]^( -gamma / (gamma - 1) )
    const p_ratio = Math.pow(1.0 + ((gamma - 1.0) / 2.0) * Math.pow(M_e, 2), -gamma / (gamma - 1.0));

    arResEl.textContent = 'Nozzle Area Ratio ε = A_e / A* = ' + A_over_Astar.toFixed(2);
    prResEl.textContent = 'Pressure Ratio P_e / P_c = ' + p_ratio.toExponential(3) + ' (' + (1.0/p_ratio).toFixed(1) + '× Expansion @ M_e = ' + M_e + ', γ = ' + gamma + ')';
  }

  [meEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter desired rocket nozzle exit Mach number $M_e > 1.0$.',
      'Enter combustion gas ratio of specific heats $\gamma$ ($\sim 1.20\text{–}1.25$ for hot rocket exhaust).',
      'Inspect required nozzle expansion area ratio ($\epsilon = A_e / A^*$) and chamber-to-exit pressure drop ratio ($P_e / P_c$).'
    ],
    benefitTitle: 'Gustaf de Laval 1888 Converging-Diverging Nozzle',
    benefitContent: 'Choking flow at the throat ($M=1$) allows supersonic expansion in the diverging bell ($M>1$), converting high-temperature thermal enthalpy into directed kinetic exhaust velocity.',
    faqs: [{ q: 'Why do vacuum rocket engines have much larger nozzles than sea-level engines?', a: 'Vacuum engines expand exhaust against near-zero ambient backpressure ($\epsilon > 100\text{–}200$), whereas sea-level nozzles are restricted ($\epsilon \approx 15\text{–}25$) to avoid flow separation.' }]
  },

  // 16. Gravitational Escape Velocity & Potential Well Calculator
  {
    slug: 'escape-velocity-gravitational-potential-well-calculator',
    name: 'Gravitational Escape Velocity (v_esc = √(2·G·M / R)) & Binding Energy Calculator',
    description: 'Calculate parabolic escape velocity (v_esc = √(2·G·M / R)) in km/s and km/h, surface gravitational acceleration (g = G·M / R²), and specific orbital binding energy for planets, moons, and black hole event horizons.',
    category: 'Science',
    icon: 'text',
    keywords: ['escape velocity calculator', 'gravitational escape velocity formula v equals sqrt 2 g m over r online', 'surface gravity celestial body escape velocity calculator', 'black hole event horizon escape velocity calculator km s', 'astrophysics celestial mechanics gravity online'],
    order: 1122,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Celestial Body (Earth, Moon, Mars, Sun, Neutron Star) or Custom Mass M (kg) & Radius R (km)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="esc-body">Celestial Body</label>
        <select class="tool-textarea" id="esc-body">
          <option value="5.972e24_6371" selected>Earth (M = 5.97 × 10²⁴ kg, R = 6,371 km)</option>
          <option value="7.342e22_1737">Moon (M = 7.34 × 10²² kg, R = 1,737 km)</option>
          <option value="6.417e23_3389">Mars (M = 6.42 × 10²³ kg, R = 3,389 km)</option>
          <option value="1.989e30_696340">Sun (M = 1.99 × 10³⁰ kg, R = 696,340 km)</option>
          <option value="2.785e30_12">Neutron Star (1.4 M_sun, R = 12 km)</option>
        </select>
      </div>
      <div id="esc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="esc-res-vesc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Escape Velocity v_esc = 11.19 km / s (40,270 km/h)</span>
            <span class="stat-label">Minimum Velocity to Escape Gravitational Well</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="esc-res-g" style="color:var(--green-dark); font-weight:700;">Surface Gravity g = 9.82 m / s² (1.00 g) | Specific Binding Energy = 62.6 MJ/kg</span>
            <span class="stat-label">Surface Gravitational Acceleration & Escape Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('esc-body');
  const vResEl = document.getElementById('esc-res-vesc'), gResEl = document.getElementById('esc-res-g');

  const G = 6.67430e-11;

  function update() {
    const parts = bEl.value.split('_');
    const M_kg = parseFloat(parts[0]);
    const R_km = parseFloat(parts[1]);

    if (isNaN(M_kg) || isNaN(R_km) || M_kg <= 0 || R_km <= 0) return;

    const R_m = R_km * 1000.0;

    // Escape velocity: v_esc = sqrt( 2 * G * M / R )  [m / s]
    const v_esc_mps = Math.sqrt((2.0 * G * M_kg) / R_m);
    const v_esc_kms = v_esc_mps / 1000.0;
    const v_esc_kmh = v_esc_kms * 3600.0;

    // Surface gravity: g = G * M / R^2  [m / s^2]
    const g_surf = (G * M_kg) / Math.pow(R_m, 2);
    const g_ratio = g_surf / 9.80665;

    // Specific kinetic energy to escape: E = 0.5 * v_esc^2  [J / kg -> MJ / kg]
    const E_spec_MJ = (0.5 * Math.pow(v_esc_mps, 2)) / 1e6;

    vResEl.textContent = 'Escape Velocity v_esc = ' + v_esc_kms.toFixed(2) + ' km / s (' + Math.round(v_esc_kmh).toLocaleString() + ' km/h)';
    gResEl.textContent = 'Surface Gravity g = ' + g_surf.toFixed(2) + ' m/s² (' + g_ratio.toFixed(2) + ' g) | Binding Energy = ' + E_spec_MJ.toFixed(1) + ' MJ/kg';
  }

  bEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select celestial body (Earth, Moon, Mars, Sun, Neutron Star).',
      'Inspect escape velocity $v_{\text{esc}} = \sqrt{2GM/R}$, surface gravity g, and specific kinetic binding energy.'
    ],
    benefitTitle: 'Newtonian Gravitational Potential Well',
    benefitContent: 'Escape velocity is the speed at which an object\'s kinetic energy exactly matches its negative gravitational potential energy ($\frac{1}{2}mv^2 = \frac{GMm}{R}$), allowing unpowered escape to infinity.',
    faqs: [{ q: 'What is the escape velocity of a black hole?', a: 'At a black hole\'s Schwarzschild event horizon ($R = 2GM/c^2$), the escape velocity equals the speed of light ($c \approx 300,000\text{ km/s}$).' }]
  },

  // 17. Geostationary Orbit (GEO) Altitude & Period Calculator
  {
    slug: 'orbital-period-altitude-geostationary-orbit-calculator',
    name: 'Geostationary Orbit (GEO Altitude h = 35,786 km & Kepler Period T = 2π·√(a³/μ)) Calculator',
    description: 'Calculate satellite orbital period (T = 2π · √(a³ / μ)) in minutes/hours, geostationary synchronization altitude (h_GEO = 35,786 km), and orbital ground speed using Kepler\'s Third Law.',
    category: 'Science',
    icon: 'text',
    keywords: ['geostationary orbit calculator', 'kepler third law orbital period formula t equals 2 pi sqrt a cubed over mu online', 'geo satellite altitude 35786 km calculator', 'orbital period altitude satellite calculator hours', 'astrodynamics satellite communications geo orbit online'],
    order: 1123,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Satellite Orbital Altitude h above Earth Surface (km)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="geo-alt">Altitude h (km)</label>
        <input class="tool-textarea" id="geo-alt" type="number" step="500" min="100" value="35786" placeholder="35,786 km (Geostationary GEO)" />
      </div>
      <div id="geo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="geo-res-per" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Period T = 23.93 Hours (1 Sidereal Day)</span>
            <span class="stat-label">Orbital Period (T = 2π·√(a³/μ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="geo-res-spd" style="color:var(--green-dark); font-weight:700;">Speed v = 3.07 km/s (11,068 km/h) | GEO: Stationary over fixed Earth longitude</span>
            <span class="stat-label">Orbital Velocity & Earth Rotation Synchronization</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const altEl = document.getElementById('geo-alt');
  const perResEl = document.getElementById('geo-res-per'), spdResEl = document.getElementById('geo-res-spd');

  const mu_earth = 398600.4418, R_earth = 6378.137;

  function update() {
    const h_km = parseFloat(altEl.value);
    if (isNaN(h_km) || h_km < 100) return;

    const a_km = R_earth + h_km;

    // Kepler's Third Law: T = 2 * pi * sqrt( a^3 / mu )  [seconds]
    const T_sec = 2.0 * Math.PI * Math.sqrt(Math.pow(a_km, 3) / mu_earth);
    const T_min = T_sec / 60.0;
    const T_hours = T_sec / 3600.0;

    // Circular orbital speed: v = sqrt( mu / a )  [km / s]
    const v_kms = Math.sqrt(mu_earth / a_km);
    const v_kmh = v_kms * 3600.0;

    let regime = '';
    if (Math.abs(h_km - 35786) < 200) {
      regime = 'GEOSTATIONARY ORBIT (GEO: Matches 23.93h sidereal day - Fixed over ground)';
    } else if (h_km < 2000) {
      regime = 'LOW EARTH ORBIT (LEO: Fast 90-120 min period)';
    } else if (h_km < 35786) {
      regime = 'MEDIUM EARTH ORBIT (MEO: GPS / Navigation ~12h period)';
    } else {
      regime = 'HIGH EARTH ORBIT (HEO: Super-synchronous period > 24h)';
    }

    perResEl.textContent = 'Period T = ' + (T_hours >= 1 ? T_hours.toFixed(2) + ' Hours (' + Math.round(T_min) + ' min)' : T_min.toFixed(1) + ' min');
    spdResEl.textContent = 'Speed v = ' + v_kms.toFixed(2) + ' km/s (' + Math.round(v_kmh).toLocaleString() + ' km/h) | ' + regime;
  }

  altEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter satellite orbital altitude above Earth in km.',
      'Inspect orbital period in minutes/hours and orbital velocity in km/s.'
    ],
    benefitTitle: 'Arthur C. Clarke 1945 Geostationary Orbit Concept',
    benefitContent: 'At an altitude of exactly $35,786\text{ km}$, a satellite\'s orbital period matches Earth\'s sidereal rotation ($23.93\text{ hours}$), allowing stationary ground satellite TV dishes.',
    faqs: [{ q: 'Why is Geostationary Orbit located strictly above the equator?', a: 'Because the orbital plane must pass through Earth\'s center of mass, only an equatorial orbit remains stationary over a single ground latitude ($0^\circ$).' }]
  },

  // 18. Spacecraft Atmospheric Reentry Heat Flux (Chapman-Sutton) Calculator
  {
    slug: 'spacecraft-atmospheric-reentry-heat-flux-chapman-calculator',
    name: 'Spacecraft Atmospheric Reentry Peak Heat Flux (q_dot ∝ √(ρ / R_n)·v³) Calculator',
    description: 'Calculate spacecraft hypersonic atmospheric reentry convective heat flux (q_dot = 1.83e-4 · √(ρ / R_n) · (v/1000)³) in kW/m² and W/cm² from reentry speed v in km/s, atmospheric density ρ, and nose radius R_n for heat shield TPS design.',
    category: 'Science',
    icon: 'text',
    keywords: ['reentry heat flux calculator', 'hypersonic heat flux formula chapman sutton online', 'thermal protection system tps heat shield calculator', 'blunt body aerodynamic heating spacecraft calculator', 'aerospace hypersonic reentry aerothermodynamics online'],
    order: 1124,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reentry Speed v (km/s, 7.5 LEO to 11.0 Lunar), Nose Radius R_n (m) & Air Density ρ (kg/m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="re-v">Speed v (km/s)</label>
          <input class="tool-textarea" id="re-v" type="number" step="0.5" value="7.8" placeholder="7.8 km/s (LEO Reentry)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-rn">Nose Radius R_n (m)</label>
          <input class="tool-textarea" id="re-rn" type="number" step="0.5" value="3.0" placeholder="3.0 m (Apollo / Orion Blunt Body)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-rho">Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="re-rho" type="number" step="0.001" value="0.005" placeholder="0.005 kg/m³ (60 km Alt Peak Heat)" />
        </div>
      </div>
      <div id="re-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="re-res-qdot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Heat Flux q̇ = 354.2 W / cm² (3.54 MW/m²)</span>
            <span class="stat-label">Peak Convective Aerodynamic Stagnation Heat Flux</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="re-res-tps" style="color:var(--green-dark); font-weight:700;">Surface Temp T ≈ 1,680 °C (Requires PICA-X / Carbon-Phenolic Ablative TPS)</span>
            <span class="stat-label">Equilibrium Radiative Heat Shield Temperature & TPS Material</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('re-v'), rnEl = document.getElementById('re-rn'), rEl = document.getElementById('re-rho');
  const qdResEl = document.getElementById('re-res-qdot'), tpsResEl = document.getElementById('re-res-tps');

  const sigma_sb = 5.670374419e-8; // Stefan-Boltzmann

  function update() {
    const v_kms = parseFloat(vEl.value), R_n = parseFloat(rnEl.value), rho = parseFloat(rEl.value);
    if (isNaN(v_kms) || isNaN(R_n) || isNaN(rho) || v_kms <= 0 || R_n <= 0 || rho <= 0) return;

    // Sutton-Graves stagnation convective heat flux formula:
    // q_dot = k * sqrt( rho / R_n ) * v^3  where k approx 1.7415e-4 (for Earth air)
    // q_dot in W / m^2:
    const v_mps = v_kms * 1000.0;
    const q_dot_W_m2 = 1.7415e-4 * Math.sqrt(rho / R_n) * Math.pow(v_mps, 3);
    const q_dot_MW_m2 = q_dot_W_m2 / 1e6;
    const q_dot_W_cm2 = q_dot_W_m2 / 1e4;

    // Radiative equilibrium surface temperature: q_dot = eps * sigma * T^4 (assume emissivity eps = 0.85)
    const T_rad_K = Math.pow(q_dot_W_m2 / (0.85 * sigma_sb), 0.25);
    const T_rad_C = T_rad_K - 273.15;

    let tpsType = '';
    if (T_rad_C <= 1260) tpsType = 'HRSI Silica Ceramic Tiles (Space Shuttle Belly)';
    else if (T_rad_C <= 1650) tpsType = 'Reinforced Carbon-Carbon (RCC Nose Cone)';
    else tpsType = 'Ablative PICA-X / Phenolic Carbon (Mars / Lunar Return)';

    qdResEl.textContent = 'Heat Flux q̇ = ' + q_dot_W_cm2.toFixed(1) + ' W / cm² (' + q_dot_MW_m2.toFixed(2) + ' MW/m²)';
    tpsResEl.textContent = 'Surface Temp T ≈ ' + Math.round(T_rad_C).toLocaleString() + ' °C (' + Math.round(T_rad_K).toLocaleString() + ' K | ' + tpsType + ')';
  }

  [vEl, rnEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reentry velocity in km/s (e.g. 7.8 km/s LEO, 11.0 km/s Apollo Moon return).',
      'Enter heat shield blunt nose radius $R_n$ in meters.',
      'Enter peak-heating atmospheric density $\rho$ in $\text{kg/m}^3$ (typically at 55–65 km altitude).',
      'Inspect peak heat flux in $\text{W/cm}^2$ and radiative equilibrium surface temperature.'
    ],
    benefitTitle: 'H. Julian Allen & A. J. Eggers 1953 Blunt Body Concept',
    benefitContent: 'Allen and Eggers discovered that blunt heat shields ($q \propto 1/\sqrt{R_n}$) push the detached bow shock wave away from the vehicle hull, dissipating $99\%$ of kinetic friction heating into the surrounding shock layer air.',
    faqs: [{ q: 'Why is heat flux lower on blunt capsules than sharp pointed missiles?', a: 'A blunt nose radius creates a thick detached shock layer that acts as a thermal cushion, transferring only $1\%$ of total kinetic energy to the shield.' }]
  },

  // 19. Gas Turbine Brayton Cycle Pressure Ratio & Thermal Efficiency Calculator
  {
    slug: 'gas-turbine-brayton-cycle-pressure-ratio-efficiency-calculator',
    name: 'Gas Turbine Brayton Cycle (Thermal Efficiency η = 1 - r_p^(-(γ-1)/γ)) Calculator',
    description: 'Calculate ideal Brayton cycle gas turbine thermal efficiency (η = 1 - r_p^(-(γ-1)/γ)), compressor and turbine exit temperatures, and specific work output from compressor pressure ratio r_p and turbine inlet temperature (TIT).',
    category: 'Science',
    icon: 'text',
    keywords: ['brayton cycle calculator', 'gas turbine thermal efficiency formula online', 'pressure ratio brayton cycle calculator eta', 'turbine inlet temperature tit specific power calculator', 'thermodynamics gas turbine jet engine online'],
    order: 1125,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Compressor Pressure Ratio r_p (e.g. 15 to 40) & Turbine Inlet Temp TIT (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bc-rp">Pressure Ratio r_p</label>
          <input class="tool-textarea" id="bc-rp" type="number" step="5" value="25.0" placeholder="25.0 (Modern Jet Engine)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bc-tit">TIT (°C)</label>
          <input class="tool-textarea" id="bc-tit" type="number" step="50" value="1400.0" placeholder="1,400 °C (Turbine Inlet)" />
        </div>
      </div>
      <div id="bc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bc-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ideal Efficiency η = 60.1%</span>
            <span class="stat-label">Brayton Cycle Thermal Efficiency (η = 1 - r_p^(-(γ-1)/γ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bc-res-temps" style="color:var(--green-dark); font-weight:700;">Compressor Exit T₂ = 450 °C (723 K) | Turbine Exhaust T₄ = 437 °C (Combustor ΔT = 950 K)</span>
            <span class="stat-label">Compressor & Turbine Thermodynamic State Temperatures</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpEl = document.getElementById('bc-rp'), titEl = document.getElementById('bc-tit');
  const efResEl = document.getElementById('bc-res-eff'), tmResEl = document.getElementById('bc-res-temps');

  const gamma = 1.40, T1 = 288.15; // 15°C ambient

  function update() {
    const r_p = parseFloat(rpEl.value), TIT_C = parseFloat(titEl.value);
    if (isNaN(r_p) || isNaN(TIT_C) || r_p <= 1.0) return;

    const TIT_K = TIT_C + 273.15;
    const expTerm = (gamma - 1.0) / gamma;

    // Ideal Brayton efficiency: eta = 1 - (1 / r_p^((gamma-1)/gamma))
    const eta = 1.0 - Math.pow(r_p, -expTerm);
    const eta_pct = eta * 100.0;

    // Compressor exit temp T2 = T1 * r_p^((gamma-1)/gamma)
    const T2 = T1 * Math.pow(r_p, expTerm);
    // Turbine exhaust temp T4 = TIT / r_p^((gamma-1)/gamma)
    const T4 = TIT_K * Math.pow(r_p, -expTerm);

    efResEl.textContent = 'Ideal Efficiency η = ' + eta_pct.toFixed(1) + '%';
    tmResEl.textContent = 'Compressor T₂ = ' + Math.round(T2 - 273.15) + ' °C | Turbine Exhaust T₄ = ' + Math.round(T4 - 273.15) + ' °C (TIT = ' + TIT_C + ' °C @ r_p = ' + r_p + ')';
  }

  [rpEl, titEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter compressor overall pressure ratio $r_p = P_2 / P_1$.',
      'Enter Turbine Inlet Temperature (TIT) in $^\circ\text{C}$.',
      'Inspect Brayton thermal efficiency $\eta$ and state temperatures ($T_2, T_4$).'
    ],
    benefitTitle: 'George Brayton 1872 Constant-Pressure Thermodynamic Cycle',
    benefitContent: 'The Brayton cycle models jet engines and power-plant gas turbines; higher compressor pressure ratios ($r_p$) directly increase thermal efficiency ($1 - r_p^{-\frac{\gamma-1}{\gamma}}$).',
    faqs: [{ q: 'What limits the maximum pressure ratio in real jet engines?', a: 'Extremely high pressure ratios increase compressor exit temperature $T_2$, leaving less margin for fuel combustion before exceeding turbine blade melting limits.' }]
  },

  // 20. Turbojet Engine Specific Thrust & TSFC Calculator
  {
    slug: 'turbojet-engine-specific-thrust-tsfc-calculator',
    name: 'Turbojet Engine Net Thrust (F_n = ṁ·(v_e - v₀)) & TSFC Calculator',
    description: 'Calculate turbojet/turbofan engine net thrust force (F_n = ṁ · (v_e - v₀)), Thrust Specific Fuel Consumption (TSFC in g/(kN·s) and lb/(lbf·hr)), and propulsive efficiency for jet engine performance.',
    category: 'Science',
    icon: 'text',
    keywords: ['turbojet thrust calculator', 'net thrust formula fn equals m dot ve minus v0 online', 'thrust specific fuel consumption tsfc calculator', 'jet engine mass flow exhaust velocity calculator', 'aerospace propulsion jet engine performance online'],
    order: 1126,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Air Mass Flow ṁ (kg/s), Exhaust Velocity v_e (m/s), Flight Speed v₀ (m/s) & Fuel Flow ṁ_f (kg/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tj-mdot">Airflow ṁ (kg/s)</label>
          <input class="tool-textarea" id="tj-mdot" type="number" step="50" value="350.0" placeholder="350.0 kg/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tj-ve">Exhaust v_e (m/s)</label>
          <input class="tool-textarea" id="tj-ve" type="number" step="50" value="550.0" placeholder="550.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tj-v0">Flight v₀ (m/s)</label>
          <input class="tool-textarea" id="tj-v0" type="number" step="25" value="230.0" placeholder="230.0 m/s (450 kts)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tj-mf">Fuel ṁ_f (kg/s)</label>
          <input class="tool-textarea" id="tj-mf" type="number" step="0.2" value="1.8" placeholder="1.8 kg/s" />
        </div>
      </div>
      <div id="tj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tj-res-fn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Net Thrust F_n = 112.00 kN (25,178 lbf)</span>
            <span class="stat-label">Net Propulsive Thrust Force (F_n = ṁ·(v_e - v₀))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tj-res-tsfc" style="color:var(--green-dark); font-weight:700;">TSFC = 16.07 g / (kN·s) (0.567 lb/(lbf·hr)) | Propulsive Efficiency η_p = 59.0%</span>
            <span class="stat-label">Thrust Specific Fuel Consumption (TSFC) & Propulsive Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mdEl = document.getElementById('tj-mdot'), veEl = document.getElementById('tj-ve');
  const v0El = document.getElementById('tj-v0'), mfEl = document.getElementById('tj-mf');
  const fnResEl = document.getElementById('tj-res-fn'), tsfcResEl = document.getElementById('tj-res-tsfc');

  function update() {
    const mdot = parseFloat(mdEl.value), v_e = parseFloat(veEl.value);
    const v_0 = parseFloat(v0El.value), mdot_f = parseFloat(mfEl.value);

    if (isNaN(mdot) || isNaN(v_e) || isNaN(v_0) || isNaN(mdot_f) || mdot <= 0 || v_e <= v_0 || mdot_f <= 0) return;

    // Net thrust F_n = mdot * (v_e - v_0)  [Newtons -> kN]
    const F_n_N = mdot * (v_e - v_0);
    const F_n_kN = F_n_N / 1000.0;
    const F_n_lbf = F_n_N * 0.224809;

    // TSFC in g / (kN * s) = (mdot_f * 1000) / F_n_kN
    const TSFC_SI = (mdot_f * 1000.0) / F_n_kN;
    const TSFC_imperial = (mdot_f * 3600.0 * 2.20462) / F_n_lbf;

    // Propulsive efficiency: eta_p = 2 * v_0 / (v_e + v_0)
    const eta_p = (2.0 * v_0) / (v_e + v_0) * 100.0;

    fnResEl.textContent = 'Net Thrust F_n = ' + F_n_kN.toFixed(2) + ' kN (' + Math.round(F_n_lbf).toLocaleString() + ' lbf)';
    tsfcResEl.textContent = 'TSFC = ' + TSFC_SI.toFixed(2) + ' g/(kN·s) (' + TSFC_imperial.toFixed(3) + ' lb/(lbf·hr)) | Propulsive η_p = ' + eta_p.toFixed(1) + '%';
  }

  [mdEl, veEl, v0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter engine core/bypass air mass flow rate in kg/s.',
      'Enter jet nozzle exhaust velocity $v_e$ in m/s.',
      'Enter aircraft flight speed $v_0$ in m/s.',
      'Enter fuel burn flow rate in kg/s.',
      'Inspect Net Thrust (kN and lbf), TSFC, and propulsive efficiency $\eta_p$.'
    ],
    benefitTitle: 'Airbreathing Momentum Thrust Equation',
    benefitContent: 'Net thrust equals rate of momentum change ($F_n = \dot{m}(v_e - v_0)$); high-bypass turbofans accelerate huge masses of air moderately rather than small masses violently, dramatically improving propulsive efficiency and cutting TSFC.',
    faqs: [{ q: 'Why do turbofans have lower TSFC than pure turbojets?', a: 'High-bypass turbofans match exhaust speed closer to flight speed ($v_e \approx v_0$), minimizing wasted kinetic energy in the jet wake.' }]
  },

  // 21. Marine Hydrofoil Cavitation Number & Froude Depth Calculator
  {
    slug: 'marine-hydrofoil-froude-number-cavitation-number-calculator',
    name: 'Marine Hydrofoil Cavitation Number (σ = (P₀ - P_v) / (½·ρ·v²)) Calculator',
    description: 'Calculate marine hydrofoil and propeller Cavitation Number (σ = (P₀ - P_v) / (½ · ρ · v²)) to predict onset of destructive cavitation bubbles, erosion risk, and hydrofoil lift breakdown in naval architecture.',
    category: 'Science',
    icon: 'text',
    keywords: ['cavitation number calculator', 'hydrofoil cavitation inception formula sigma online', 'marine propeller cavitation number calculator', 'naval architecture hydrofoil flow calculator', 'fluid mechanics marine cavitation online'],
    order: 1127,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vessel Speed v (knots), Foil Depth h (m, Hydrostatic Head) & Water Temp (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cv-v">Speed v (knots)</label>
          <input class="tool-textarea" id="cv-v" type="number" step="5" value="35.0" placeholder="35.0 kts" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cv-h">Submergence h (m)</label>
          <input class="tool-textarea" id="cv-h" type="number" step="0.5" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cv-cp">Min Pressure C_p_min</label>
          <input class="tool-textarea" id="cv-cp" type="number" step="0.1" value="-0.65" placeholder="-0.65 (Foil Profile)" />
        </div>
      </div>
      <div id="cv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cv-res-sigma" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cavitation Number σ = 0.739</span>
            <span class="stat-label">Dimensionless Cavitation Index (σ = (P₀ - P_v) / q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cv-res-stat" style="color:var(--green-dark); font-weight:700;">CAVITATION INCEPTION IMMINENT (σ = 0.739 close to |C_p_min| = 0.650)</span>
            <span class="stat-label">Cavitation Inception Risk Analysis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('cv-v'), hEl = document.getElementById('cv-h'), cpEl = document.getElementById('cv-cp');
  const sgResEl = document.getElementById('cv-res-sigma'), stResEl = document.getElementById('cv-res-stat');

  const rho_seawater = 1025.0, P_atm = 101325.0, g = 9.80665, P_vapor = 2338.0; // 20°C seawater

  function update() {
    const v_kts = parseFloat(vEl.value), h_m = parseFloat(hEl.value), Cp_min = parseFloat(cpEl.value);
    if (isNaN(v_kts) || isNaN(h_m) || isNaN(Cp_min) || v_kts <= 0 || h_m < 0) return;

    const v_mps = v_kts * 0.514444;

    // Ambient static pressure at depth h: P0 = P_atm + rho * g * h
    const P0 = P_atm + rho_seawater * g * h_m;

    // Dynamic pressure: q = 0.5 * rho * v^2
    const q_Pa = 0.5 * rho_seawater * Math.pow(v_mps, 2);

    // Cavitation number: sigma = (P0 - P_vapor) / q
    const sigma = (P0 - P_vapor) / q_Pa;
    const sigma_crit = Math.abs(Cp_min);

    let status = '', color = '#22543d';
    if (sigma > sigma_crit + 0.3) {
      status = 'NO CAVITATION (σ > |C_p_min|: Fully wetted subcavitating flow)';
      color = '#22543d';
    } else if (sigma >= sigma_crit) {
      status = 'INCEPTION THRESHOLD (σ ≈ |C_p_min|: Incipient vapor bubble formation)';
      color = '#ea580c';
    } else {
      status = 'SEVERE CAVITATION (σ < |C_p_min|: Vapor cavities, acoustic noise & erosion!)';
      color = '#c53030';
    }

    sgResEl.textContent = 'Cavitation Number σ = ' + sigma.toFixed(3);
    sgResEl.style.color = color;
    stResEl.textContent = status + ' [P₀ = ' + (P0/1000).toFixed(1) + ' kPa, q = ' + (q_Pa/1000).toFixed(1) + ' kPa @ ' + v_kts + ' kts]';
    stResEl.style.color = color;
  }

  [vEl, hEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vessel forward speed in knots.',
      'Enter hydrofoil/propeller submergence depth h in meters.',
      'Enter minimum foil pressure coefficient $C_{p,\min}$ (typically $-0.5$ to $-1.0$).',
      'Inspect Cavitation Number $\sigma$ and evaluate cavitation inception risk.'
    ],
    benefitTitle: 'Cavitation Inception Condition σ = -C_p_min',
    benefitContent: 'When local pressure drops below water vapor pressure ($P_{\min} \le P_v$), water boils into vapor cavities; when bubbles collapse against metal surfaces, microjets produce shock pressures of thousands of bars, pitting propellers.',
    faqs: [{ q: 'How can marine hydrofoil cavitation be avoided at high speeds?', a: 'Use supercavitating wedge foils designed to deliberately form a stable single vapor cavity over the entire suction side.' }]
  },

  // 22. Ship Hull Block Coefficient & Displacement Calculator
  {
    slug: 'ship-hull-block-coefficient-displacement-admiralty-calculator',
    name: 'Ship Hull Block Coefficient (C_b = ∇ / (L·B·T)) & Displacement Calculator',
    description: 'Calculate naval architecture ship hull Block Coefficient (C_b = ∇ / (L · B · T)), volumetric displacement ∇ in m³, seawater displacement tonnage Δ in metric tons, and hull form fullness classification.',
    category: 'Science',
    icon: 'text',
    keywords: ['ship block coefficient calculator', 'hull displacement volume formula cb equals nabla over l b t online', 'naval architecture ship tonnage displacement calculator', 'prismatic waterline block coefficient ship design calculator', 'marine engineering naval architecture online'],
    order: 1128,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Length Between Perpendiculars L_bp (m), Beam B (m) & Draft T (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-l">Length L_bp (m)</label>
          <input class="tool-textarea" id="sh-l" type="number" step="10" value="280.0" placeholder="280.0 m (Container Ship)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-b">Beam B (m)</label>
          <input class="tool-textarea" id="sh-b" type="number" step="2" value="40.0" placeholder="40.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-t">Draft T (m)</label>
          <input class="tool-textarea" id="sh-t" type="number" step="1" value="14.0" placeholder="14.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-type">Hull Type</label>
          <select class="tool-textarea" id="sh-type">
            <option value="0.65" selected>Container Ship / Cruiser (C_b ≈ 0.65)</option>
            <option value="0.82">VLCC Tanker / Bulk Carrier (C_b ≈ 0.82 Full)</option>
            <option value="0.55">Fast Frigate / Destroyer (C_b ≈ 0.55 Slender)</option>
          </select>
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-disp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Displacement Δ = 104,468 Metric Tons</span>
            <span class="stat-label">Total Submerged Seawater Displacement Tonnage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-vol" style="color:var(--green-dark); font-weight:700;">Submerged Volume ∇ = 101,920 m³ (Bounding Box: 156,800 m³ | C_b = 0.65)</span>
            <span class="stat-label">Volumetric Displacement & Hull Form Fullness</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('sh-l'), bEl = document.getElementById('sh-b');
  const tEl = document.getElementById('sh-t'), tpEl = document.getElementById('sh-type');
  const dsResEl = document.getElementById('sh-res-disp'), vlResEl = document.getElementById('sh-res-vol');

  const rho_seawater = 1.025; // metric tons / m^3

  function update() {
    const L = parseFloat(lEl.value), B = parseFloat(bEl.value), T = parseFloat(tEl.value);
    const C_b = parseFloat(tpEl.value);

    if (isNaN(L) || isNaN(B) || isNaN(T) || L <= 0 || B <= 0 || T <= 0) return;

    // Bounding box volume: V_box = L * B * T  [m^3]
    const V_box = L * B * T;

    // Submerged volumetric displacement: nabla = C_b * L * B * T  [m^3]
    const nabla = C_b * V_box;

    // Seawater displacement tonnage: Delta = nabla * 1.025  [metric tons]
    const Delta_tons = nabla * rho_seawater;

    dsResEl.textContent = 'Displacement Δ = ' + Math.round(Delta_tons).toLocaleString() + ' Metric Tons';
    vlResEl.textContent = 'Submerged Volume ∇ = ' + Math.round(nabla).toLocaleString() + ' m³ (Box: ' + Math.round(V_box).toLocaleString() + ' m³ | C_b = ' + C_b + ')';
  }

  [lEl, bEl, tEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter ship Length Between Perpendiculars $L_{\text{bp}}$ in meters.',
      'Enter molded hull beam width B in meters.',
      'Enter design water draft T in meters.',
      'Select vessel hull form type (Tanker, Container ship, Frigate).',
      'Inspect submerged displacement volume $\nabla$ and seawater displacement tonnage $\Delta$.'
    ],
    benefitTitle: 'Archimedes Principle in Naval Architecture',
    benefitContent: 'The block coefficient ($C_b = \frac{\nabla}{LBT}$) quantifies hull fullness: slow bulk carriers have full block hulls ($C_b \approx 0.85$) for maximum cargo capacity, whereas high-speed naval ships use slender forms ($C_b \approx 0.50$) to cut wave-making drag.',
    faqs: [{ q: 'What is the difference between Displacement and Deadweight (DWT)?', a: 'Displacement is the total weight of the ship plus everything aboard; Deadweight (DWT) is the payload cargo carrying capacity.' }]
  },

  // 23. Ship Squat Effect in Shallow Water & Confined Channels Calculator
  {
    slug: 'ship-squat-effect-shallow-water-underkeel-clearance-calculator',
    name: 'Ship Squat Effect (S_b = C_b·v² / 100) Shallow Water Under-Keel Clearance Calculator',
    description: 'Calculate shallow-water hydrodynamic ship squat sinkage (S_b = C_b · v_k² / 100 in open water, S_b = 2·C_b · v_k² / 100 in confined canal channels) and verify safe Under-Keel Clearance (UKC) to prevent vessel grounding.',
    category: 'Science',
    icon: 'text',
    keywords: ['ship squat effect calculator', 'shallow water sinkage formula sb equals cb v squared over 100 online', 'under keel clearance ukc canal grounding calculator', 'bernoulli shallow water hydrodynamic squat calculator', 'naval architecture maritime navigation safety online'],
    order: 1129,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ship Speed v (Knots), Block Coeff C_b (0.60-0.85), Channel Type & Initial Under-Keel UKC (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sq-v">Speed v (Knots)</label>
          <input class="tool-textarea" id="sq-v" type="number" step="1" value="12.0" placeholder="12.0 kts" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sq-cb">Block C_b</label>
          <input class="tool-textarea" id="sq-cb" type="number" step="0.05" value="0.80" placeholder="0.80 (Bulk Carrier)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sq-ukc">Static UKC (m)</label>
          <input class="tool-textarea" id="sq-ukc" type="number" step="0.5" value="2.5" placeholder="2.5 m Clearance" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sq-chan">Waterway</label>
          <select class="tool-textarea" id="sq-chan">
            <option value="open">Open Shallow Water (S_b = C_b·v²/100)</option>
            <option value="confined" selected>Confined Canal / Dredged Channel (S_b = 2·C_b·v²/100)</option>
          </select>
        </div>
      </div>
      <div id="sq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sq-res-squat" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Squat Sinkage S_b = 2.30 m</span>
            <span class="stat-label">Maximum Hydrodynamic Hull Squat Sinkage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sq-res-netukc" style="color:var(--green-dark); font-weight:700;">Remaining Net UKC = 0.20 m (CRITICAL GROUNDING RISK: Slow to 8 kts!)</span>
            <span class="stat-label">Dynamic Under-Keel Clearance & Grounding Hazard</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('sq-v'), cbEl = document.getElementById('sq-cb');
  const ukcEl = document.getElementById('sq-ukc'), chEl = document.getElementById('sq-chan');
  const sqResEl = document.getElementById('sq-res-squat'), ukcResEl = document.getElementById('sq-res-netukc');

  function update() {
    const v_kts = parseFloat(vEl.value), C_b = parseFloat(cbEl.value);
    const static_UKC = parseFloat(ukcEl.value), isConfined = chEl.value === 'confined';

    if (isNaN(v_kts) || isNaN(C_b) || isNaN(static_UKC) || v_kts < 0 || C_b <= 0 || static_UKC < 0) return;

    // Barrass empirical squat formula:
    // Open shallow water: S_b = ( C_b * v^2 ) / 100  [meters]
    // Confined canal: S_b = ( 2 * C_b * v^2 ) / 100  [meters]
    const factor = isConfined ? 2.0 : 1.0;
    const S_b = (factor * C_b * Math.pow(v_kts, 2)) / 100.0;

    const net_UKC = static_UKC - S_b;

    let status = '', color = '#22543d';
    if (net_UKC >= 1.0) {
      status = 'SAFE NAVIGATION (Net UKC ≥ 1.0 m: Ample seabed margin)';
      color = '#22543d';
    } else if (net_UKC > 0) {
      status = 'CRITICAL MARGIN (Net UKC < 1.0 m: Reduce transit speed immediately!)';
      color = '#ea580c';
    } else {
      status = 'GROUNDING COLLISION (Net UKC ≤ 0 m: Keel strikes canal seabed!)';
      color = '#c53030';
    }

    sqResEl.textContent = 'Squat Sinkage S_b = ' + S_b.toFixed(2) + ' m';
    sqResEl.style.color = color;
    ukcResEl.textContent = 'Net UKC = ' + net_UKC.toFixed(2) + ' m (' + status.split(' (')[0] + ' @ ' + v_kts + ' kts in ' + (isConfined ? 'Canal' : 'Open water') + ')';
    ukcResEl.style.color = color;
  }

  [vEl, cbEl, ukcEl].forEach(el => el.addEventListener('input', update));
  chEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter ship speed over ground in knots.',
      'Enter hull block coefficient $C_b$ (e.g. 0.80 for loaded container/tanker).',
      'Enter static Under-Keel Clearance (UKC) measured when stopped in meters.',
      'Select waterway confinement (Open shallow bay vs Confined canal like Suez or Panama).',
      'Inspect hydrodynamic squat sinkage depth and remaining dynamic Under-Keel Clearance.'
    ],
    benefitTitle: 'Dr. C. B. Barrass Hydrodynamic Squat Standard',
    benefitContent: 'Bernoulli\'s principle dictates that water rushing beneath a moving ship accelerates in shallow water, dropping pressure and bodily sucking the hull downward toward the seabed ($S_b \propto v^2$), which was a major contributing factor in the 2021 Ever Given Suez Canal grounding.',
    faqs: [{ q: 'Does a full-form ship squat by the bow or the stern?', a: 'Full-form bulk carriers ($C_b > 0.70$) squat predominantly by the bow, while slender fast ships ($C_b < 0.70$) squat by the stern.' }]
  },

  // 24. Turbocharger Compressor Pressure Ratio & Surge/Choke Limit Calculator
  {
    slug: 'turbocharger-compressor-surge-choke-pressure-ratio-calculator',
    name: 'Turbocharger Compressor Pressure Ratio (PR = P_out / P_in) & Boost Calculator',
    description: 'Calculate automotive and marine turbocharger compressor pressure ratio (PR = (P_atm + Boost) / P_in), compressor discharge temperature (T_out = T_in · (1 + (PR^((γ-1)/γ) - 1)/η_c)), and mass airflow for engine boosting.',
    category: 'Science',
    icon: 'text',
    keywords: ['turbocharger pressure ratio calculator', 'compressor pressure ratio pr formula online', 'boost pressure discharge temperature calculator', 'compressor map surge choke limit turbo calculator', 'automotive engine forced induction turbocharger online'],
    order: 1130,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gauge Boost Pressure (psi or bar), Ambient Temp (°C) & Compressor Isentropic Efficiency η_c (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tb-boost">Boost (psi)</label>
          <input class="tool-textarea" id="tb-boost" type="number" step="2" value="22.0" placeholder="22.0 psi (1.52 bar)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tb-tin">Inlet Temp (°C)</label>
          <input class="tool-textarea" id="tb-tin" type="number" step="5" value="25.0" placeholder="25.0 °C (Ambient)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tb-eff">Efficiency η_c (%)</label>
          <input class="tool-textarea" id="tb-eff" type="number" step="5" min="50" max="90" value="74.0" placeholder="74.0%" />
        </div>
      </div>
      <div id="tb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tb-res-pr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Pressure Ratio PR = 2.50:1</span>
            <span class="stat-label">Compressor Stage Pressure Ratio (P_out / P_in)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tb-res-tout" style="color:var(--green-dark); font-weight:700;">Discharge Temp T_out = 145.8 °C (Intercooler Mandatory to drop air to ~40 °C)</span>
            <span class="stat-label">Compressor Discharge Air Temperature & Intercooling Demand</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('tb-boost'), tEl = document.getElementById('tb-tin'), efEl = document.getElementById('tb-eff');
  const prResEl = document.getElementById('tb-res-pr'), toResEl = document.getElementById('tb-res-tout');

  const P_atm_psi = 14.696, gamma = 1.40;

  function update() {
    const boost_psi = parseFloat(bEl.value), Tin_C = parseFloat(tEl.value), eff_pct = parseFloat(efEl.value);
    if (isNaN(boost_psi) || isNaN(Tin_C) || isNaN(eff_pct) || boost_psi < 0 || eff_pct <= 0) return;

    const Tin_K = Tin_C + 273.15;
    const eta_c = eff_pct / 100.0;

    // Absolute pressure ratio: PR = (P_atm + Boost) / P_atm
    const P_out_psi = P_atm_psi + boost_psi;
    const PR = P_out_psi / P_atm_psi;

    // Ideal isentropic temperature ratio: (PR)^((gamma-1)/gamma)
    const expTerm = (gamma - 1.0) / gamma;
    const isentropic_factor = Math.pow(PR, expTerm);

    // Actual compressor discharge temp: Tout = Tin * [ 1 + (isentropic_factor - 1) / eta_c ]
    const Tout_K = Tin_K * (1.0 + (isentropic_factor - 1.0) / eta_c);
    const Tout_C = Tout_K - 273.15;
    const boost_bar = boost_psi * 0.0689476;

    prResEl.textContent = 'Pressure Ratio PR = ' + PR.toFixed(2) + ':1 (' + boost_bar.toFixed(2) + ' bar Boost)';
    toResEl.textContent = 'Discharge T_out = ' + Math.round(Tout_C) + ' °C (' + Math.round(Tout_K) + ' K | +' + Math.round(Tout_C - Tin_C) + ' °C Rise @ η_c = ' + eff_pct + '%)';
  }

  [bEl, tEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter intake manifold gauge boost pressure in psi (or bar).',
      'Enter ambient compressor inlet air temperature in $^\circ\text{C}$.',
      'Enter compressor isentropic island efficiency percentage $\eta_c$ (typically $70\%\text{–}78\%$).',
      'Inspect total Pressure Ratio (PR) and uncooled compressor discharge air temperature.'
    ],
    benefitTitle: 'Thermodynamics of Forced Induction Compression',
    benefitContent: 'Adiabatic gas compression drastically heats intake air ($T_{\text{out}} \propto \text{PR}^{\frac{\gamma-1}{\gamma}}$), reducing oxygen charge density and causing engine knock/detonation unless cooled via an air-to-air intercooler.',
    faqs: [{ q: 'What is Compressor Surge vs Choke?', a: 'Surge occurs at low flow/high boost when air separates and backflows violently; Choke occurs at maximum flow when air reaches sonic velocity in the compressor inlet.' }]
  },

  // 25. Worm Gear Lead Angle & Mechanical Efficiency Calculator
  {
    slug: 'worm-gear-lead-angle-mechanical-efficiency-calculator',
    name: 'Worm Gear Drive Lead Angle (tan γ = z₁·p_x / (π·d₁)) & Efficiency Calculator',
    description: 'Calculate worm gear drive lead angle (tan γ = z₁ · p_x / (π · d₁)), self-locking threshold (lead angle less than friction angle φ), and forward mechanical power transmission efficiency (η = tan γ / tan(γ + φ_v)) for machine design.',
    category: 'Science',
    icon: 'text',
    keywords: ['worm gear calculator', 'worm gear lead angle formula tan gamma online', 'self locking worm gear efficiency calculator', 'lead angle friction angle worm drive efficiency calculator', 'mechanical engineering machine design gear drive online'],
    order: 1131,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Worm Starts z₁, Axial Pitch p_x (mm), Worm Pitch Diameter d₁ (mm) & Friction Coeff μ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wg-z1">Starts z₁</label>
          <input class="tool-textarea" id="wg-z1" type="number" step="1" min="1" max="4" value="1" placeholder="1 (Single Start)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wg-px">Axial Pitch p_x (mm)</label>
          <input class="tool-textarea" id="wg-px" type="number" step="1" value="12.0" placeholder="12.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wg-d1">Pitch Dia d₁ (mm)</label>
          <input class="tool-textarea" id="wg-d1" type="number" step="5" value="50.0" placeholder="50.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wg-mu">Friction (μ)</label>
          <input class="tool-textarea" id="wg-mu" type="number" step="0.01" value="0.05" placeholder="0.05 (Bronze / Steel)" />
        </div>
      </div>
      <div id="wg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wg-res-lead" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Lead Angle γ = 4.37° (SELF-LOCKING)</span>
            <span class="stat-label">Worm Thread Helix Lead Angle (γ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wg-res-eff" style="color:var(--green-dark); font-weight:700;">Efficiency η = 58.7% (Lead γ < Friction Angle φ = 2.86°: Cannot backdrive!)</span>
            <span class="stat-label">Mechanical Power Transmission Efficiency & Backdrive Security</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const z1El = document.getElementById('wg-z1'), pxEl = document.getElementById('wg-px');
  const d1El = document.getElementById('wg-d1'), muEl = document.getElementById('wg-mu');
  const ldResEl = document.getElementById('wg-res-lead'), efResEl = document.getElementById('wg-res-eff');

  function update() {
    const z1 = parseInt(z1El.value, 10), px = parseFloat(pxEl.value);
    const d1 = parseFloat(d1El.value), mu = parseFloat(muEl.value);

    if (isNaN(z1) || isNaN(px) || isNaN(d1) || isNaN(mu) || z1 < 1 || px <= 0 || d1 <= 0 || mu <= 0) return;

    // Lead L = z1 * px
    const Lead = z1 * px;

    // Lead angle gamma: tan(gamma) = Lead / (pi * d1)
    const tan_gamma = Lead / (Math.PI * d1);
    const gamma_rad = Math.atan(tan_gamma);
    const gamma_deg = (gamma_rad * 180.0) / Math.PI;

    // Friction angle phi_v = atan(mu / cos(alpha_n)) where normal pressure angle alpha_n ~ 20 deg
    const alpha_n_rad = (20.0 * Math.PI) / 180.0;
    const mu_virtual = mu / Math.cos(alpha_n_rad);
    const phi_v_rad = Math.atan(mu_virtual);
    const phi_v_deg = (phi_v_rad * 180.0) / Math.PI;

    // Worm drive efficiency: eta = tan(gamma) / tan(gamma + phi_v)
    const eta = tan_gamma / Math.tan(gamma_rad + phi_v_rad);
    const eta_pct = Math.max(0, eta * 100.0);

    const isSelfLocking = gamma_deg <= phi_v_deg + 1.0;

    ldResEl.textContent = 'Lead Angle γ = ' + gamma_deg.toFixed(2) + '° (' + (isSelfLocking ? 'SELF-LOCKING' : 'BACKDRIVABLE') + ')';
    efResEl.textContent = 'Efficiency η = ' + eta_pct.toFixed(1) + '% (Friction Angle φ = ' + phi_v_deg.toFixed(2) + '° | ' + (isSelfLocking ? 'Secure hoist brake: Cannot backdrive' : 'Multi-start high efficiency') + ')';
  }

  [z1El, pxEl, d1El, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of thread starts on worm $z_1$ (1 for single-start self-locking, 2–4 for high efficiency).',
      'Enter axial thread pitch $p_x$ in mm.',
      'Enter worm pitch diameter $d_1$ in mm.',
      'Enter coefficient of friction $\mu$ (typically 0.03 to 0.07 for hardened steel on bronze).',
      'Inspect lead angle $\gamma$, power transmission efficiency $\eta$, and self-locking safety status.'
    ],
    benefitTitle: 'Worm Gear Transmission Kinematics & Self-Locking',
    benefitContent: 'When lead angle is smaller than the friction angle ($\gamma < \phi$), friction prevents the gear from driving the worm backward, creating an inherent fail-safe holding brake for cranes, elevators, and guitar tuning pegs.',
    faqs: [{ q: 'Why do single-start worm gears have low efficiency (50-60%)?', a: 'Single-start worms operate at shallow lead angles ($\gamma < 6^\circ$), creating extensive sliding friction between meshing teeth.' }]
  },

  // 26. Belt Drive Euler-Eytelwein Capstan Friction Torque Calculator
  {
    slug: 'belt-drive-euler-eytelwein-capstan-friction-torque-calculator',
    name: 'Belt Drive Capstan Friction (Euler-Eytelwein T₁ / T₂ = e^(μ·β)) Calculator',
    description: 'Calculate flat/V-belt drive and marine capstan belt tension ratio (T₁ / T₂ = e^(μ·β)), maximum transferable torque (T_torque = (T₁ - T₂)·R), and transmitted mechanical power (P = (T₁ - T₂)·v) without slip.',
    category: 'Science',
    icon: 'text',
    keywords: ['capstan equation calculator', 'euler eytelwein belt friction formula t1 over t2 equals e to mu beta online', 'belt drive maximum torque power calculator', 'wrap angle friction coefficient capstan equation calculator', 'mechanical engineering belt drive power transmission online'],
    order: 1132,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tight Side Tension T₁ (N), Friction Coeff μ, Wrap Angle β (°) & Pulley Radius R (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bt-t1">Tight Tension T₁ (N)</label>
          <input class="tool-textarea" id="bt-t1" type="number" step="500" value="2500" placeholder="2,500 N" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bt-mu">Friction (μ)</label>
          <input class="tool-textarea" id="bt-mu" type="number" step="0.05" value="0.30" placeholder="0.30 (Rubber on Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bt-beta">Wrap Angle β (°)</label>
          <input class="tool-textarea" id="bt-beta" type="number" step="15" value="180.0" placeholder="180.0° (π radians)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bt-rad">Pulley Radius R (m)</label>
          <input class="tool-textarea" id="bt-rad" type="number" step="0.05" value="0.15" placeholder="0.15 m" />
        </div>
      </div>
      <div id="bt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bt-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Tension Ratio T₁ / T₂ = 2.57</span>
            <span class="stat-label">Euler-Eytelwein Capstan Tension Ratio (e^(μ·β))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bt-res-tq" style="color:var(--green-dark); font-weight:700;">Max Torque = 229.0 N·m | Slack Tension T₂ = 974 N (Net Driving Force: 1,526 N)</span>
            <span class="stat-label">Maximum Transferable Torque & Slack Side Tension</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t1El = document.getElementById('bt-t1'), muEl = document.getElementById('bt-mu');
  const bEl = document.getElementById('bt-beta'), rEl = document.getElementById('bt-rad');
  const rtResEl = document.getElementById('bt-res-ratio'), tqResEl = document.getElementById('bt-res-tq');

  function update() {
    const T1 = parseFloat(t1El.value), mu = parseFloat(muEl.value);
    const beta_deg = parseFloat(bEl.value), R = parseFloat(rEl.value);

    if (isNaN(T1) || isNaN(mu) || isNaN(beta_deg) || isNaN(R) || T1 <= 0 || mu <= 0 || beta_deg <= 0 || R <= 0) return;

    const beta_rad = (beta_deg * Math.PI) / 180.0;

    // Euler-Eytelwein Capstan Equation: T1 / T2 = exp( mu * beta )
    const ratio = Math.exp(mu * beta_rad);
    const T2 = T1 / ratio;

    // Effective driving force: F_net = T1 - T2  [N]
    const F_net = T1 - T2;

    // Max torque: Torque = F_net * R  [N * m]
    const Torque_Nm = F_net * R;

    rtResEl.textContent = 'Tension Ratio T₁ / T₂ = ' + ratio.toFixed(2);
    tqResEl.textContent = 'Max Torque = ' + Torque_Nm.toFixed(1) + ' N·m | Slack T₂ = ' + Math.round(T2) + ' N (Net Force: ' + Math.round(F_net) + ' N @ β = ' + beta_deg + '°)';
  }

  [t1El, muEl, bEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter tight side belt tension $T_1$ in Newtons.',
      'Enter friction coefficient $\mu$ between belt and pulley.',
      'Enter belt contact wrap angle $\beta$ in degrees (e.g. $180^\circ = \pi\text{ rad}$).',
      'Enter driving pulley radius R in meters.',
      'Inspect tension holding ratio ($T_1/T_2 = e^{\mu\beta}$), slack side tension $T_2$, and maximum transferable torque without slip.'
    ],
    benefitTitle: 'Leonhard Euler & Johann Eytelwein 1808 Capstan Formula',
    benefitContent: 'Because holding force scales exponentially with wrap angle ($T_1 = T_2 e^{\mu\beta}$), winding a mooring rope just 3 full turns around a harbor capstan ($\beta = 6\pi$) multiplies a sailor\'s pulling force by over 300 times.',
    faqs: [{ q: 'Why do V-belts transmit far more torque than flat belts?', a: 'The $40^\circ$ V-groove wedges the belt, increasing virtual friction to $\mu_{\text{virtual}} = \mu / \sin(\theta/2) \approx 3\mu$.' }]
  },

  // 27. Flywheel Energy Storage & Speed Fluctuation Coefficient Calculator
  {
    slug: 'flywheel-coefficient-of-speed-fluctuation-energy-storage-calculator',
    name: 'Flywheel Mechanical Energy Storage & Speed Fluctuation (C_s = (ω₁ - ω₂) / ω₀) Calculator',
    description: 'Calculate mechanical press and engine flywheel energy storage (ΔE = I · ω₀² · C_s) in Joules/kJ, required Moment of Inertia I, and coefficient of speed fluctuation C_s for machine dynamics.',
    category: 'Science',
    icon: 'text',
    keywords: ['flywheel energy calculator', 'coefficient of speed fluctuation formula c s online', 'flywheel moment of inertia required delta e calculator', 'engine cyclic energy fluctuation flywheel calculator', 'machine dynamics mechanical flywheel sizing online'],
    order: 1133,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cyclic Energy Fluctuation ΔE (Joules or kJ), Mean Speed N₀ (RPM) & Fluctuation C_s (0.01-0.05)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fw-de">Energy ΔE (kJ)</label>
          <input class="tool-textarea" id="fw-de" type="number" step="0.5" value="5.0" placeholder="5.0 kJ (Punch Press)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fw-rpm">Mean Speed N₀</label>
          <input class="tool-textarea" id="fw-rpm" type="number" step="100" value="1200" placeholder="1,200 RPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fw-cs">Fluctuation C_s</label>
          <input class="tool-textarea" id="fw-cs" type="number" step="0.01" value="0.03" placeholder="0.03 (3% Precision)" />
        </div>
      </div>
      <div id="fw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fw-res-i" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Required Inertia I = 10.55 kg·m²</span>
            <span class="stat-label">Required Flywheel Moment of Inertia (I = ΔE / (ω₀²·C_s))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fw-res-mass" style="color:var(--green-dark); font-weight:700;">Flywheel Rim Mass ≈ 117.2 kg (at R = 0.30 m | Speed: 1,182 to 1,218 RPM)</span>
            <span class="stat-label">Flywheel Sizing & Min/Max Operational Speed Range</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const deEl = document.getElementById('fw-de'), rpmEl = document.getElementById('fw-rpm'), csEl = document.getElementById('fw-cs');
  const iResEl = document.getElementById('fw-res-i'), msResEl = document.getElementById('fw-res-mass');

  function update() {
    const deltaE_kJ = parseFloat(deEl.value), rpm = parseFloat(rpmEl.value), C_s = parseFloat(csEl.value);
    if (isNaN(deltaE_kJ) || isNaN(rpm) || isNaN(C_s) || deltaE_kJ <= 0 || rpm <= 0 || C_s <= 0 || C_s >= 1) return;

    const deltaE_J = deltaE_kJ * 1000.0;

    // Mean angular velocity: omega_0 = 2 * pi * N0 / 60  [rad / s]
    const omega_0 = (2.0 * Math.PI * rpm) / 60.0;

    // Required Moment of Inertia: I = Delta_E / ( omega_0^2 * C_s )  [kg * m^2]
    const I_req = deltaE_J / (Math.pow(omega_0, 2) * C_s);

    // Approximate rim mass assuming radius R = 0.30 m (I = m * R^2):
    const R_rim = 0.30;
    const m_rim_kg = I_req / Math.pow(R_rim, 2);

    const min_rpm = rpm * (1.0 - C_s / 2.0);
    const max_rpm = rpm * (1.0 + C_s / 2.0);

    iResEl.textContent = 'Required Inertia I = ' + I_req.toFixed(2) + ' kg·m²';
    msResEl.textContent = 'Rim Mass ≈ ' + m_rim_kg.toFixed(1) + ' kg (@ R = 0.30 m) | Speed: ' + min_rpm.toFixed(0) + ' to ' + max_rpm.toFixed(0) + ' RPM (ΔE = ' + deltaE_kJ + ' kJ)';
  }

  [deEl, rpmEl, csEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cyclic excess energy fluctuation $\Delta E$ absorbed/released per machine cycle in kJ.',
      'Enter mean operating flywheel shaft speed $N_0$ in RPM.',
      'Enter permissible coefficient of speed fluctuation $C_s = \frac{\omega_1 - \omega_2}{\omega_0}$ (typically $0.02\text{ to }0.05$).',
      'Inspect required flywheel Moment of Inertia I in $\text{kg}\cdot\text{m}^2$ and estimated rim mass.'
    ],
    benefitTitle: 'Mechanical Flywheel Energy Smoothing',
    benefitContent: 'Flywheels store kinetic energy during power strokes and release it during compression strokes, smoothing torque spikes and preventing motor stalling in industrial punch presses and internal combustion engines.',
    faqs: [{ q: 'What is a typical speed fluctuation coefficient (Cs) for electric generators?', a: 'Electric AC generators require extremely tight speed control ($C_s \le 0.005\text{ to }0.01$) to maintain constant 50/60 Hz electrical grid frequency.' }]
  }
];

pack39Tools.forEach(createTool);
console.log('Pack 39 complete: ' + pack39Tools.length + ' tools created.');
