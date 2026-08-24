const { createTool } = require('./generate-curated-tools.cjs');

// Pack 51: 25 Aerospace Engineering, Orbital Mechanics, Rocket Propulsion & Aerodynamics Calculators (Tools 1526 to 1550)
const pack51Tools = [
  // 1. Tsiolkovsky Rocket Equation & Mass Ratio Calculator
  {
    slug: 'tsiolkovsky-rocket-equation-delta-v-mass-ratio-calculator',
    name: 'Tsiolkovsky Rocket Equation (Δv = I_sp·g₀·ln(m₀/m_f)) & Mass Ratio Calculator',
    description: 'Calculate rocket propulsion mission velocity change Delta-v in m/s (Tsiolkovsky Ideal Rocket Equation: Δv = I_sp · g₀ · ln(m₀ / m_f)), propellant mass fraction ζ, and initial wet mass to dry mass ratio m₀ / m_f.',
    category: 'Science',
    icon: 'text',
    keywords: ['tsiolkovsky rocket equation calculator', 'delta v formula isp mass ratio online', 'propellant mass fraction rocket staging calculator', 'specific impulse exhaust velocity delta v calculator', 'aerospace engineering orbital mechanics spaceflight astronautics online'],
    order: 1410,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Specific Impulse I_sp (Seconds), Initial Wet Mass m₀ (kg) & Final Dry Burnout Mass m_f (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ts-isp">Specific I_sp (s)</label>
          <input class="tool-textarea" id="ts-isp" type="number" step="10" value="350.0" placeholder="350.0 s (LOX/Methane Vac)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-m0">Initial Wet m₀ (kg)</label>
          <input class="tool-textarea" id="ts-m0" type="number" step="5000" value="120000.0" placeholder="120,000 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-mf">Final Dry m_f (kg)</label>
          <input class="tool-textarea" id="ts-mf" type="number" step="1000" value="15000.0" placeholder="15,000 kg (Dry + Payload)" />
        </div>
      </div>
      <div id="ts-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ts-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Mission Δv = 7,143 m / s (7.14 km/s)</span>
            <span class="stat-label">Tsiolkovsky Velocity Budget (Δv = I_sp · g₀ · ln(m₀ / m_f))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ts-res-frac" style="color:var(--green-dark); font-weight:700;">Mass Ratio m₀/m_f = 8.00 | Propellant Fraction = 87.5% (105,000 kg Fuel Burned)</span>
            <span class="stat-label">Effective Exhaust Velocity c = 3,432 m/s & Fuel Mass</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ispEl = document.getElementById('ts-isp'), m0El = document.getElementById('ts-m0'), mfEl = document.getElementById('ts-mf');
  const dvResEl = document.getElementById('ts-res-dv'), frResEl = document.getElementById('ts-res-frac');

  const g0 = 9.80665;

  function update() {
    const Isp_s = parseFloat(ispEl.value), m0_kg = parseFloat(m0El.value), mf_kg = parseFloat(mfEl.value);
    if (isNaN(Isp_s) || isNaN(m0_kg) || isNaN(mf_kg) || Isp_s <= 0 || m0_kg <= mf_kg || mf_kg <= 0) return;

    const mass_ratio = m0_kg / mf_kg;
    const c_mps = Isp_s * g0;
    const delta_v_mps = c_mps * Math.log(mass_ratio);
    const delta_v_kms = delta_v_mps / 1000.0;
    const prop_mass_kg = m0_kg - mf_kg;
    const prop_fraction_pct = (prop_mass_kg / m0_kg) * 100.0;

    dvResEl.textContent = 'Mission Δv = ' + Math.round(delta_v_mps).toLocaleString() + ' m/s (' + delta_v_kms.toFixed(2) + ' km/s)';
    frResEl.textContent = 'Mass Ratio = ' + mass_ratio.toFixed(2) + ' | Propellant = ' + prop_fraction_pct.toFixed(1) + '% (' + Math.round(prop_mass_kg).toLocaleString() + ' kg Fuel | Exhaust c = ' + Math.round(c_mps) + ' m/s)';
  }

  [ispEl, m0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rocket engine vacuum or sea-level Specific Impulse $I_{\text{sp}}$ in seconds (e.g. 310s RP-1/LOX, 360s Methane/LOX, 450s Hydrogen/LOX).',
      'Enter initial total rocket wet mass $m_0$ at ignition in kg.',
      'Enter final dry burnout mass $m_f$ (structural mass + dry engines + payload) in kg.',
      'Inspect total ideal velocity change $\Delta v$ in m/s and km/s, mass ratio, and burned propellant mass.'
    ],
    benefitTitle: 'Konstantin Tsiolkovsky 1903 Rocket Equation Standard',
    benefitContent: 'The foundational law of astronautics governing orbital launch, lunar landing, and interplanetary space exploration by linking momentum conservation ($m \, dv = -c \, dm$) to exponential fuel mass requirements.',
    faqs: [{ q: 'Why is getting to Low Earth Orbit (LEO) so difficult?', a: 'LEO requires $\Delta v \approx 9.4\text{ km/s}$ (including gravity/drag losses); with chemical propellants ($I_{\text{sp}} \approx 350\text{s}$), over $90\%$ of total liftoff weight must be pure propellant.' }]
  },

  // 2. Hohmann Transfer Orbit & Travel Time Calculator
  {
    slug: 'hohmann-transfer-orbit-delta-v-travel-time-calculator',
    name: 'Hohmann Transfer Orbit (Δv₁ + Δv₂) & Interplanetary Travel Time Calculator',
    description: 'Calculate two-impulse Hohmann orbital transfer maneuver velocity changes Δv₁ and Δv₂ in km/s (Δv_total = Δv₁ + Δv₂), transfer orbit semimajor axis a_tx, and one-way flight transfer time t_transfer in days/hours.',
    category: 'Science',
    icon: 'text',
    keywords: ['hohmann transfer orbit calculator', 'orbital delta v transfer formula online', 'interplanetary travel time earth mars hohmann calculator', 'two impulse coplanar circular transfer calculator', 'astrodynamics orbital mechanics space mission design online'],
    order: 1411,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Orbit Radius r₁ (km), Target Orbit Radius r₂ (km) & Central Body (Earth μ = 398,600 km³/s²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ho-r1">Initial r₁ (km)</label>
          <input class="tool-textarea" id="ho-r1" type="number" step="100" value="6678.0" placeholder="6,678 km (300 km LEO)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ho-r2">Target r₂ (km)</label>
          <input class="tool-textarea" id="ho-r2" type="number" step="1000" value="42164.0" placeholder="42,164 km (GEO Orbit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ho-mu">Gravity μ (km³/s²)</label>
          <input class="tool-textarea" id="ho-mu" type="number" step="5000" value="398600.4" placeholder="398,600 (Earth)" />
        </div>
      </div>
      <div id="ho-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ho-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Transfer Δv = 3.935 km / s</span>
            <span class="stat-label">Two-Burn Hohmann Transfer Delta-V (Δv₁ = 2.458 km/s, Δv₂ = 1.477 km/s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ho-res-time" style="color:var(--green-dark); font-weight:700;">Flight Time = 5.27 Hours (0.22 Days) | Transfer Semimajor a = 24,421 km</span>
            <span class="stat-label">One-Way Elliptical Half-Orbit Transfer Time (t = π · √(a³ / μ))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('ho-r1'), r2El = document.getElementById('ho-r2'), muEl = document.getElementById('ho-mu');
  const dvResEl = document.getElementById('ho-res-dv'), tmResEl = document.getElementById('ho-res-time');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), mu = parseFloat(muEl.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(mu) || r1 <= 0 || r2 <= 0 || mu <= 0 || r1 === r2) return;

    const v_circ_1 = Math.sqrt(mu / r1);
    const v_circ_2 = Math.sqrt(mu / r2);
    const a_tx = (r1 + r2) / 2.0;
    const v_tx_1 = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a_tx)));
    const v_tx_2 = Math.sqrt(mu * ((2.0 / r2) - (1.0 / a_tx)));
    const delta_v1 = Math.abs(v_tx_1 - v_circ_1);
    const delta_v2 = Math.abs(v_circ_2 - v_tx_2);
    const delta_v_tot = delta_v1 + delta_v2;
    const t_tx_s = Math.PI * Math.sqrt(Math.pow(a_tx, 3) / mu);
    const t_tx_hr = t_tx_s / 3600.0;
    const t_tx_days = t_tx_hr / 24.0;

    dvResEl.textContent = 'Total Transfer Δv = ' + delta_v_tot.toFixed(3) + ' km / s';
    tmResEl.textContent = 'Flight Time = ' + (t_tx_days >= 2 ? t_tx_days.toFixed(1) + ' Days (' + Math.round(t_tx_hr) + ' hr)' : t_tx_hr.toFixed(2) + ' Hours') + ' | Burns: Δv₁=' + delta_v1.toFixed(3) + ' km/s, Δv₂=' + delta_v2.toFixed(3) + ' km/s (a_tx=' + Math.round(a_tx).toLocaleString() + ' km)';
  }

  [r1El, r2El, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial circular orbit orbital radius $r_1$ from planet center in km (e.g. Earth radius $6378\text{ km} + \text{altitude}$).',
      'Enter target circular orbit radius $r_2$ from planet center in km.',
      'Enter central body standard gravitational parameter $\mu = G M$ (Earth: $398,600\text{ km}^3/\text{s}^2$, Sun: $1.327 \times 10^{11}\text{ km}^3/\text{s}^2$).',
      'Inspect total required two-impulse velocity change $\Delta v_{\text{total}}$, individual burns ($\Delta v_1, \Delta v_2$), and one-way transfer travel time.'
    ],
    benefitTitle: 'Walter Hohmann 1925 Optimal Orbital Transfer Standard',
    benefitContent: 'The most fuel-efficient two-impulse coplanar trajectory for raising satellite orbits (LEO to Geostationary GEO) and interplanetary voyages (Earth to Mars transfer window).',
    faqs: [{ q: 'Why is the Hohmann transfer mathematically the lowest energy transfer?', a: 'Both velocity changes occur tangentially at orbital apsides (periapsis and apoapsis), maximizing the Oberth effect kinetic energy gain.' }]
  },

  // 3. Vis-Viva Orbital Velocity & Escape Velocity Calculator
  {
    slug: 'orbital-velocity-vis-viva-equation-eccentricity-calculator',
    name: 'Vis-Viva Orbital Velocity (v² = μ·(2/r - 1/a)) & Escape Velocity Calculator',
    description: 'Calculate instantaneous Keplerian orbital velocity v in km/s (Vis-Viva Equation: v = √(μ · (2/r - 1/a))), parabolic Escape Velocity v_esc = √(2μ/r), circular velocity v_circ = √(μ/r), and orbital period T.',
    category: 'Science',
    icon: 'text',
    keywords: ['vis viva equation calculator', 'orbital velocity formula v squared online', 'escape velocity circular velocity calculator', 'semimajor axis orbital period kepler third law calculator', 'astrodynamics orbital mechanics space navigation online'],
    order: 1412,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Instantaneous Radius r (km), Semimajor Axis a (km) & Gravitational Parameter μ (km³/s²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vv-r">Current r (km)</label>
          <input class="tool-textarea" id="vv-r" type="number" step="100" value="6778.0" placeholder="6,778 km (400 km ISS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vv-a">Semimajor a (km)</label>
          <input class="tool-textarea" id="vv-a" type="number" step="100" value="6778.0" placeholder="6,778 km (Circular)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vv-mu">Gravity μ (km³/s²)</label>
          <input class="tool-textarea" id="vv-mu" type="number" step="5000" value="398600.4" placeholder="398,600 (Earth)" />
        </div>
      </div>
      <div id="vv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vv-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Orbital Velocity v = 7.672 km / s (27,620 km/h)</span>
            <span class="stat-label">Instantaneous Velocity (v = √(μ · (2/r - 1/a)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vv-res-esc" style="color:var(--green-dark); font-weight:700;">Escape v_esc = 10.850 km/s (√2 · v_circ) | Period T = 92.56 Minutes (1.54 hr)</span>
            <span class="stat-label">Local Escape Velocity (v_esc = √(2μ/r)) & Keplerian Orbit Period</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('vv-r'), aEl = document.getElementById('vv-a'), muEl = document.getElementById('vv-mu');
  const vResEl = document.getElementById('vv-res-v'), esResEl = document.getElementById('vv-res-esc');

  function update() {
    const r = parseFloat(rEl.value), a = parseFloat(aEl.value), mu = parseFloat(muEl.value);
    if (isNaN(r) || isNaN(a) || isNaN(mu) || r <= 0 || a <= 0 || mu <= 0) return;

    const term = (2.0 / r) - (1.0 / a);
    if (term <= 0) return;

    const v_kms = Math.sqrt(mu * term);
    const v_kmh = v_kms * 3600.0;
    const v_circ = Math.sqrt(mu / r);
    const v_esc = Math.sqrt(2.0 * mu / r);
    const T_s = 2.0 * Math.PI * Math.sqrt(Math.pow(a, 3) / mu);
    const T_min = T_s / 60.0;

    vResEl.textContent = 'Orbital Velocity v = ' + v_kms.toFixed(3) + ' km / s (' + Math.round(v_kmh).toLocaleString() + ' km/h)';
    esResEl.textContent = 'Escape v_esc = ' + v_esc.toFixed(3) + ' km/s | Period T = ' + T_min.toFixed(2) + ' Min (' + (T_min/60).toFixed(2) + ' hr | v_circ = ' + v_circ.toFixed(3) + ' km/s @ r=' + r + ' km)';
  }

  [rEl, aEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current satellite radial distance r from center of the body in km ($R_{\text{planet}} + \text{altitude}$).',
      'Enter orbital semimajor axis a in km (for circular orbits, $a = r$).',
      'Enter central body gravitational parameter $\mu = GM$ (Earth $398,600\text{ km}^3/\text{s}^2$, Moon $4,902\text{ km}^3/\text{s}^2$).',
      'Inspect instantaneous orbital speed in km/s and km/h, local parabolic escape velocity $v_{\text{esc}}$, and orbital revolution period.'
    ],
    benefitTitle: 'Gottfried Leibniz 1695 "Living Force" Energy Integral',
    benefitContent: 'Directly relates spacecraft kinetic energy and gravitational potential energy ($-\frac{\mu}{2a} = \frac{v^2}{2} - \frac{\mu}{r}$), calculating speed at any point along circular, elliptical, or hyperbolic trajectories.',
    faqs: [{ q: 'What is the relationship between circular velocity and escape velocity?', a: 'At any radial distance r, escape velocity is exactly $\sqrt{2} \approx 1.414$ times the circular orbital velocity ($v_{\text{esc}} = \sqrt{2} \, v_{\text{circ}}$).' }]
  },

  // 4. Bi-Elliptic Transfer Orbit Calculator
  {
    slug: 'bi-elliptic-transfer-orbit-delta-v-ratio-calculator',
    name: 'Bi-Elliptic Transfer Orbit (Three-Impulse Δv vs Hohmann) Calculator',
    description: 'Calculate three-impulse Bi-Elliptic orbital transfer velocity changes (Δv_total = Δv₁ + Δv₂ + Δv₃), intermediate apoapsis boost radius r_b, and evaluate where Bi-Elliptic beats Hohmann transfer when radius ratio r₂ / r₁ exceeds 11.94.',
    category: 'Science',
    icon: 'text',
    keywords: ['bi elliptic transfer calculator', 'three impulse orbital transfer formula online', 'bi elliptic vs hohmann transfer delta v calculator', 'sternfeld transfer intermediate apoapsis calculator', 'astrodynamics orbital mechanics space mission design online'],
    order: 1413,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Radius r₁ (km), Target Radius r₂ (km), Intermediate Apoapsis r_b (km) & Central μ (km³/s²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="be-r1">Initial r₁ (km)</label>
          <input class="tool-textarea" id="be-r1" type="number" step="100" value="6678.0" placeholder="6,678 km (LEO)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="be-r2">Target r₂ (km)</label>
          <input class="tool-textarea" id="be-r2" type="number" step="5000" value="100000.0" placeholder="100,000 km (High Orbit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="be-rb">Apoapsis r_b (km)</label>
          <input class="tool-textarea" id="be-rb" type="number" step="20000" value="200000.0" placeholder="200,000 km (r_b > r₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="be-mu">Gravity μ</label>
          <input class="tool-textarea" id="be-mu" type="number" step="5000" value="398600.4" placeholder="398,600 (Earth)" />
        </div>
      </div>
      <div id="be-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="be-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bi-Elliptic Δv = 4.148 km / s</span>
            <span class="stat-label">Three-Impulse Bi-Elliptic Transfer Delta-V (Δv₁ + Δv₂ + Δv₃)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="be-res-comp" style="color:var(--green-dark); font-weight:700;">Hohmann Δv = 4.225 km/s | SAVES Δv = 77 m/s (r₂/r₁ = 14.97 > 11.94 threshold ✓)</span>
            <span class="stat-label">Comparison against Standard Hohmann Transfer</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('be-r1'), r2El = document.getElementById('be-r2');
  const rbEl = document.getElementById('be-rb'), muEl = document.getElementById('be-mu');
  const dvResEl = document.getElementById('be-res-dv'), cpResEl = document.getElementById('be-res-comp');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    const rb = parseFloat(rbEl.value), mu = parseFloat(muEl.value);

    if (isNaN(r1) || isNaN(r2) || isNaN(rb) || isNaN(mu) || r1 <= 0 || r2 <= 0 || rb <= r2 || mu <= 0) return;

    const v_circ_1 = Math.sqrt(mu / r1);
    const v_circ_2 = Math.sqrt(mu / r2);
    const a1 = (r1 + rb) / 2.0;
    const v_1a = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a1)));
    const v_1b = Math.sqrt(mu * ((2.0 / rb) - (1.0 / a1)));
    const delta_v1 = v_1a - v_circ_1;
    const a2 = (r2 + rb) / 2.0;
    const v_2b = Math.sqrt(mu * ((2.0 / rb) - (1.0 / a2)));
    const v_2r2 = Math.sqrt(mu * ((2.0 / r2) - (1.0 / a2)));
    const delta_v2 = Math.abs(v_2b - v_1b);
    const delta_v3 = Math.abs(v_circ_2 - v_2r2);
    const bi_elliptic_dv = delta_v1 + delta_v2 + delta_v3;

    const a_hoh = (r1 + r2) / 2.0;
    const hoh_v1 = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a_hoh))) - v_circ_1;
    const hoh_v2 = v_circ_2 - Math.sqrt(mu * ((2.0 / r2) - (1.0 / a_hoh)));
    const hohmann_dv = hoh_v1 + hoh_v2;
    const ratio = r2 / r1;
    const diff_mps = (hohmann_dv - bi_elliptic_dv) * 100.0;

    let qual = '', color = '#22543d';
    if (diff_mps > 0) {
      qual = 'BI-ELLIPTIC IS MORE EFFICIENT (Saves ' + Math.round(diff_mps) + ' m/s over Hohmann ✓)';
      color = '#22543d';
    } else {
      qual = 'HOHMANN IS MORE EFFICIENT (Hohmann saves ' + Math.round(-diff_mps) + ' m/s)';
      color = '#ea580c';
    }

    dvResEl.textContent = 'Bi-Elliptic Δv = ' + bi_elliptic_dv.toFixed(3) + ' km / s';
    dvResEl.style.color = color;
    cpResEl.textContent = 'Hohmann Δv = ' + hohmann_dv.toFixed(3) + ' km/s | ' + qual + ' (r₂/r₁ = ' + ratio.toFixed(2) + ' @ r_b = ' + rb.toLocaleString() + ' km)';
  }

  [r1El, r2El, rbEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial circular orbit radius $r_1$ in km.',
      'Enter destination circular orbit radius $r_2$ in km.',
      'Enter intermediate apoapsis boost radius $r_b$ in km ($r_b > r_2$).',
      'Inspect 3-burn total Bi-Elliptic $\Delta v$ and compare fuel savings against 2-burn Hohmann transfer.'
    ],
    benefitTitle: 'Ary Sternfeld 1934 Bi-Elliptic Orbital Maneuver',
    benefitContent: 'When the ratio of destination to initial radius exceeds $r_2 / r_1 > 11.94$, a three-impulse bi-elliptic transfer uses less total $\Delta v$ than a standard two-impulse Hohmann transfer at the cost of longer travel time.',
    faqs: [{ q: 'Why is Bi-Elliptic transfer rarely used for crewed missions?', a: 'Although it saves propellant for large radius ratios, flying out to a distant intermediate apoapsis $r_b$ dramatically increases flight duration by weeks or months.' }]
  },

  // 5. Rocket Thrust Coefficient & Effective Exhaust Velocity Calculator
  {
    slug: 'rocket-thrust-coefficient-effective-exhaust-velocity-calculator',
    name: 'Rocket Thrust Coefficient (C_F) & Effective Exhaust Velocity (c) Calculator',
    description: 'Calculate rocket motor total thrust force F in kN (F = C_F · p_0 · A_t = m_dot · v_e + (p_e - p_a)·A_e), thrust coefficient C_F, characteristic exhaust velocity c*, and specific impulse I_sp.',
    category: 'Science',
    icon: 'text',
    keywords: ['rocket thrust coefficient calculator', 'thrust formula cf p0 at online', 'characteristic velocity c star effective exhaust velocity calculator', 'rocket chamber pressure throat area thrust calculator', 'rocket propulsion propulsion engineering astronautics online'],
    order: 1414,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Chamber Pressure p₀ (bar), Throat Area A_t (cm²), Thrust Coefficient C_F (1.3 to 1.9) & Mass Flow ṁ (kg/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tc-p0">Chamber p₀ (bar)</label>
          <input class="tool-textarea" id="tc-p0" type="number" step="10" value="100.0" placeholder="100.0 bar (10.0 MPa)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tc-at">Throat A_t (cm²)</label>
          <input class="tool-textarea" id="tc-at" type="number" step="50" value="250.0" placeholder="250.0 cm² Throat" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tc-cf">Thrust Coeff C_F</label>
          <input class="tool-textarea" id="tc-cf" type="number" step="0.05" value="1.75" placeholder="1.75 (Vacuum Nozzle)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tc-mdot">Mass Flow ṁ (kg/s)</label>
          <input class="tool-textarea" id="tc-mdot" type="number" step="10" value="125.0" placeholder="125.0 kg/s" />
        </div>
      </div>
      <div id="tc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tc-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Thrust F = 437.5 kN (98,350 lbf)</span>
            <span class="stat-label">Rocket Engine Total Thrust Force (F = C_F · p₀ · A_t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tc-res-isp" style="color:var(--green-dark); font-weight:700;">Specific Impulse I_sp = 356.9 s | Exhaust c = 3,500 m/s | c* = 2,000 m/s</span>
            <span class="stat-label">Vacuum Specific Impulse (I_sp = F / (ṁ · g₀)) & Characteristic Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p0El = document.getElementById('tc-p0'), atEl = document.getElementById('tc-at');
  const cfEl = document.getElementById('tc-cf'), mdEl = document.getElementById('tc-mdot');
  const fResEl = document.getElementById('tc-res-f'), spResEl = document.getElementById('tc-res-isp');

  const g0 = 9.80665;

  function update() {
    const p0_bar = parseFloat(p0El.value), At_cm2 = parseFloat(atEl.value);
    const C_F = parseFloat(cfEl.value), mdot_kg_s = parseFloat(mdEl.value);

    if (isNaN(p0_bar) || isNaN(At_cm2) || isNaN(C_F) || isNaN(mdot_kg_s) || p0_bar <= 0 || At_cm2 <= 0 || C_F <= 0 || mdot_kg_s <= 0) return;

    const p0_Pa = p0_bar * 1e5;
    const At_m2 = At_cm2 * 1e-4;
    const F_N = C_F * p0_Pa * At_m2;
    const F_kN = F_N / 1000.0;
    const F_lbf = F_N * 0.224809;
    const c_mps = F_N / mdot_kg_s;
    const Isp_s = c_mps / g0;
    const c_star_mps = (p0_Pa * At_m2) / mdot_kg_s;

    fResEl.textContent = 'Thrust F = ' + F_kN.toFixed(1) + ' kN (' + Math.round(F_lbf).toLocaleString() + ' lbf)';
    spResEl.textContent = 'Specific Impulse I_sp = ' + Isp_s.toFixed(1) + ' s | Exhaust c = ' + Math.round(c_mps) + ' m/s | c* = ' + Math.round(c_star_mps) + ' m/s (C_F=' + C_F + ')';
  }

  [p0El, atEl, cfEl, mdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rocket combustion chamber total pressure $p_0$ in bar (e.g. 100 bar for gas generator, 300 bar for staged combustion).',
      'Enter nozzle throat cross-sectional area $A_t$ in $\text{cm}^2$.',
      'Enter dimensionless thrust coefficient $C_F$ (typically 1.30–1.50 at sea level, 1.70–1.95 in vacuum).',
      'Enter total propellant mass flow rate $\dot{m}$ in kg/s.',
      'Inspect total engine thrust force in kN and lbf, Specific Impulse $I_{\text{sp}}$, and characteristic velocity $c^*$.'
    ],
    benefitTitle: 'George P. Sutton Rocket Thrust Performance Standard',
    benefitContent: 'Decouples chemical combustion efficiency ($c^* = \frac{p_0 A_t}{\dot{m}}$ determined by fuel chemistry) from gas-dynamic nozzle expansion efficiency ($C_F = \frac{F}{p_0 A_t}$ determined by bell geometry).',
    faqs: [{ q: 'Why is vacuum thrust higher than sea-level thrust?', a: 'In vacuum, ambient backpressure is zero ($p_a = 0$), eliminating the negative atmospheric pressure penalty on the nozzle exit plane ($(p_e - p_a) A_e$).' }]
  },

  // 6. De Laval Rocket Nozzle Isentropic Area-Mach Ratio Calculator
  {
    slug: 'de-laval-rocket-nozzle-isentropic-area-mach-ratio-calculator',
    name: 'De Laval Rocket Nozzle Isentropic Area-Mach Ratio (A/A* vs M) Calculator',
    description: 'Calculate supersonic converging-diverging De Laval rocket nozzle expansion Area Ratio ε = A_e / A_t from exit Mach number M_e (A/A* = (1/M) · [(2/(γ+1)) · (1 + (γ-1)/2 · M²)]^((γ+1)/(2(γ-1)))), exit pressure ratio p_e/p_0, and temperature ratio.',
    category: 'Science',
    icon: 'text',
    keywords: ['de laval nozzle calculator', 'area mach number relation formula a over a star online', 'rocket nozzle expansion ratio epsilon calculator', 'isentropic supersonic gas expansion calculator', 'compressible flow rocket propulsion aerospace engineering online'],
    order: 1415,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Exit Mach Number M_e (e.g. 3.20) & Specific Heat Ratio γ (e.g. 1.22 for Rocket Exhaust)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dl-m">Exit Mach M_e</label>
          <input class="tool-textarea" id="dl-m" type="number" step="0.2" value="3.50" placeholder="3.50 (Vacuum Expansion)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dl-gamma">Heat Ratio γ</label>
          <input class="tool-textarea" id="dl-gamma" type="number" step="0.02" value="1.22" placeholder="1.22 (Hot Gas Exhaust)" />
        </div>
      </div>
      <div id="dl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dl-res-eps" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Area Ratio ε = 24.8 : 1 (A_e / A_t)</span>
            <span class="stat-label">Isentropic Nozzle Exit Area Expansion Ratio (A_e / A*)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dl-res-press" style="color:var(--green-dark); font-weight:700;">Pressure Ratio p_e / p₀ = 0.0061 (0.61% Chamber Pressure) | T_e / T₀ = 0.426</span>
            <span class="stat-label">Exit Static-to-Total Pressure Ratio (p_e / p₀) & Temperature Drop</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('dl-m'), gmEl = document.getElementById('dl-gamma');
  const epResEl = document.getElementById('dl-res-eps'), prResEl = document.getElementById('dl-res-press');

  function update() {
    const M = parseFloat(mEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(M) || isNaN(gamma) || M <= 0 || gamma <= 1) return;

    const bracket = (2.0 / (gamma + 1.0)) * (1.0 + (0.5 * (gamma - 1.0) * Math.pow(M, 2)));
    const exponent = (gamma + 1.0) / (2.0 * (gamma - 1.0));
    const A_over_Astar = (1.0 / M) * Math.pow(bracket, exponent);
    const T_over_T0 = 1.0 / (1.0 + (0.5 * (gamma - 1.0) * Math.pow(M, 2)));
    const p_over_p0 = Math.pow(T_over_T0, gamma / (gamma - 1.0));

    epResEl.textContent = 'Area Ratio ε = ' + A_over_Astar.toFixed(1) + ' : 1 (A_e / A_t)';
    prResEl.textContent = 'Pressure p_e / p₀ = ' + (p_over_p0 * 100).toFixed(3) + '% | Temperature T_e / T₀ = ' + T_over_T0.toFixed(3) + ' (Mach M = ' + M.toFixed(2) + ' @ γ=' + gamma + ')';
  }

  mEl.addEventListener('input', update);
  gmEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter desired supersonic exhaust exit Mach number $M_e$ ($M > 1$).',
      'Enter combustion gas specific heat ratio $\gamma = c_p/c_v$ (typically 1.20–1.25 for rocket combustion gas, 1.40 for air).',
      'Inspect nozzle bell exit area expansion ratio $\epsilon = A_e/A_t$, static exit pressure drop ratio $p_e/p_0$, and temperature drop.'
    ],
    benefitTitle: 'Gustaf de Laval 1888 Converging-Diverging Supersonic Nozzle',
    benefitContent: 'Converts high-pressure high-temperature thermal enthalpy in the combustion chamber into directed supersonic kinetic energy, accelerating exhaust to Mach 3–5 to maximize thrust.',
    faqs: [{ q: 'Why do vacuum rocket nozzles have huge area ratios (ε > 100)?', a: 'In vacuum ($p_a = 0$), expanding exhaust to lower static pressures ($p_e \to 0$) extracts maximum kinetic energy without flow separation.' }]
  },

  // 7. Oblique Shock Wave Theta-Beta-Mach Relation Calculator
  {
    slug: 'oblique-shock-wave-theta-beta-mach-relation-calculator',
    name: 'Oblique Shock Wave Theta-Beta-Mach (θ-β-M) Angle Relation Calculator',
    description: 'Calculate supersonic compressible flow 2D wedge Oblique Shock Wave angle β in degrees from upstream Mach number M₁ and flow deflection wedge angle θ (Taylor-Maccoll θ-β-M Equation: tan θ = 2·cot β · (M₁²·sin²β - 1) / (M₁²·(γ + cos 2β) + 2)).',
    category: 'Science',
    icon: 'text',
    keywords: ['oblique shock wave calculator', 'theta beta mach relation formula online', 'supersonic shock angle wedge deflection calculator', 'normal mach downstream pressure jump calculator', 'aerodynamics compressible flow gas dynamics online'],
    order: 1416,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Upstream Mach M₁ (e.g. 2.50), Wedge Deflection Angle θ (Degrees) & Specific Heat Ratio γ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ob-m1">Upstream M₁</label>
          <input class="tool-textarea" id="ob-m1" type="number" step="0.2" value="2.50" placeholder="2.50 (Supersonic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ob-theta">Wedge Angle θ (°)</label>
          <input class="tool-textarea" id="ob-theta" type="number" step="2" value="15.0" placeholder="15.0° Deflection" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ob-gamma">Heat Ratio γ</label>
          <input class="tool-textarea" id="ob-gamma" type="number" step="0.05" value="1.40" placeholder="1.40 (Air)" />
        </div>
      </div>
      <div id="ob-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ob-res-beta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Shock Angle β = 36.95° (Weak Shock Solution)</span>
            <span class="stat-label">Oblique Shock Wave Angle (Attached Oblique Shock)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ob-res-post" style="color:var(--green-dark); font-weight:700;">Downstream M₂ = 1.87 (Supersonic) | Static Pressure Ratio p₂ / p₁ = 2.47× Jump</span>
            <span class="stat-label">Post-Shock Mach Number M₂ & Static Pressure Jump Across Shock</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('ob-m1'), thEl = document.getElementById('ob-theta'), gmEl = document.getElementById('ob-gamma');
  const btResEl = document.getElementById('ob-res-beta'), psResEl = document.getElementById('ob-res-post');

  function update() {
    const M1 = parseFloat(m1El.value), theta_deg = parseFloat(thEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(M1) || isNaN(theta_deg) || isNaN(gamma) || M1 <= 1 || theta_deg <= 0 || gamma <= 1) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const mu_mach_rad = Math.asin(1.0 / M1);

    let beta_weak = 0, found = false;
    for (let b_deg = (mu_mach_rad * 180 / Math.PI) + 0.1; b_deg <= 89.9; b_deg += 0.05) {
      const b_rad = (b_deg * Math.PI) / 180.0;
      const num = 2.0 * (1.0 / Math.tan(b_rad)) * (Math.pow(M1, 2) * Math.pow(Math.sin(b_rad), 2) - 1.0);
      const den = Math.pow(M1, 2) * (gamma + Math.cos(2.0 * b_rad)) + 2.0;
      const tan_theta_calc = num / den;

      if (tan_theta_calc >= Math.tan(theta_rad)) {
        beta_weak = b_deg;
        found = true;
        break;
      }
    }

    if (!found) {
      btResEl.textContent = 'DETACHED BOW SHOCK (θ > θ_max)';
      btResEl.style.color = '#c53030';
      psResEl.textContent = 'Wedge angle ' + theta_deg + '° exceeds maximum attachment angle for M₁=' + M1 + ' (Strong curved detached shock forms)';
      return;
    }

    const beta_rad = (beta_weak * Math.PI) / 180.0;
    const M1n = M1 * Math.sin(beta_rad);
    const p2_p1 = 1.0 + ((2.0 * gamma / (gamma + 1.0)) * (Math.pow(M1n, 2) - 1.0));
    const M2n_sq = (Math.pow(M1n, 2) + (2.0 / (gamma - 1.0))) / (((2.0 * gamma / (gamma - 1.0)) * Math.pow(M1n, 2)) - 1.0);
    const M2 = Math.sqrt(M2n_sq) / Math.sin(beta_rad - theta_rad);

    btResEl.textContent = 'Shock Angle β = ' + beta_weak.toFixed(2) + '° (Weak Attached Shock)';
    btResEl.style.color = '#22543d';
    psResEl.textContent = 'Downstream M₂ = ' + M2.toFixed(2) + ' | Pressure Jump p₂/p₁ = ' + p2_p1.toFixed(2) + '× (M₁n = ' + M1n.toFixed(2) + ' @ θ=' + theta_deg + '°)';
  }

  [m1El, thEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter upstream supersonic flow Mach number $M_1$ ($M_1 > 1$).',
      'Enter wedge compression flow deflection angle $\theta$ in degrees.',
      'Enter specific heat ratio $\gamma$ (1.40 for air).',
      'Inspect oblique shock wave angle $\beta$, downstream Mach number $M_2$, and pressure jump $p_2/p_1$.'
    ],
    benefitTitle: 'Geoffrey Taylor & J. W. Maccoll 1933 Oblique Shock Theory',
    benefitContent: 'Governs supersonic aircraft wedge intakes (Concorde, SR-71 Blackbird) to slow supersonic air with minimal total pressure stagnation pressure loss.',
    faqs: [{ q: 'What happens when wedge angle exceeds theta_max?', a: 'The oblique shock detaches from the wedge leading edge, becoming a detached normal bow shock that causes severe wave drag.' }]
  },

  // 8. Prandtl-Meyer Supersonic Expansion Fan Function Calculator
  {
    slug: 'prandtl-meyer-expansion-fan-angle-mach-number-calculator',
    name: 'Prandtl-Meyer Supersonic Expansion Fan Function (ν(M)) Calculator',
    description: 'Calculate supersonic Prandtl-Meyer expansion angle ν(M) in degrees (ν(M) = √((γ+1)/(γ-1)) · arctan√(((γ-1)/(γ+1))·(M²-1)) - arctan√(M²-1)) and post-turn expanded Mach number M₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['prandtl meyer expansion calculator', 'prandtl meyer function nu of m formula online', 'supersonic expansion fan corner turn calculator', 'post expansion mach number temperature drop calculator', 'aerodynamics compressible flow supersonic aircraft online'],
    order: 1417,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Mach M₁ (e.g. 1.50), Expansion Turn Angle θ (Degrees) & Specific Heat Ratio γ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pm-m1">Initial Mach M₁</label>
          <input class="tool-textarea" id="pm-m1" type="number" step="0.2" value="1.50" placeholder="1.50 (Supersonic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pm-theta">Turn Angle θ (°)</label>
          <input class="tool-textarea" id="pm-theta" type="number" step="2" value="15.0" placeholder="15.0° Convex Corner" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pm-gamma">Heat Ratio γ</label>
          <input class="tool-textarea" id="pm-gamma" type="number" step="0.05" value="1.40" placeholder="1.40 (Air)" />
        </div>
      </div>
      <div id="pm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pm-res-m2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Expanded Mach M₂ = 2.05 (Accelerated)</span>
            <span class="stat-label">Post-Expansion Flow Mach Number (ν(M₂) = ν(M₁) + θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pm-res-angles" style="color:var(--green-dark); font-weight:700;">ν(M₁) = 11.91° → ν(M₂) = 26.91° | Pressure Drop p₂ / p₁ = 0.434×</span>
            <span class="stat-label">Prandtl-Meyer Angle & Isentropic Static Pressure Reduction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('pm-m1'), thEl = document.getElementById('pm-theta'), gmEl = document.getElementById('pm-gamma');
  const m2ResEl = document.getElementById('pm-res-m2'), anResEl = document.getElementById('pm-res-angles');

  function prandtl_meyer(M, gamma) {
    const term1 = Math.sqrt((gamma + 1.0) / (gamma - 1.0));
    const term2 = Math.sqrt(((gamma - 1.0) / (gamma + 1.0)) * (Math.pow(M, 2) - 1.0));
    const term3 = Math.sqrt(Math.pow(M, 2) - 1.0);
    const nu_rad = (term1 * Math.atan(term2)) - Math.atan(term3);
    return (nu_rad * 180.0) / Math.PI;
  }

  function update() {
    const M1 = parseFloat(m1El.value), theta_deg = parseFloat(thEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(M1) || isNaN(theta_deg) || isNaN(gamma) || M1 < 1.0 || theta_deg < 0 || gamma <= 1) return;

    const nu1_deg = prandtl_meyer(M1, gamma);
    const nu2_deg = nu1_deg + theta_deg;

    let M2 = M1;
    for (let m = M1; m <= 15.0; m += 0.01) {
      if (prandtl_meyer(m, gamma) >= nu2_deg) {
        M2 = m;
        break;
      }
    }

    const p1_p0 = Math.pow(1.0 + (0.5 * (gamma - 1.0) * Math.pow(M1, 2)), -gamma / (gamma - 1.0));
    const p2_p0 = Math.pow(1.0 + (0.5 * (gamma - 1.0) * Math.pow(M2, 2)), -gamma / (gamma - 1.0));
    const p2_p1 = p2_p0 / p1_p0;

    m2ResEl.textContent = 'Expanded Mach M₂ = ' + M2.toFixed(2) + ' (Accelerated Flow)';
    anResEl.textContent = 'ν(M₁) = ' + nu1_deg.toFixed(2) + '° → ν(M₂) = ' + nu2_deg.toFixed(2) + '° | Pressure p₂/p₁ = ' + p2_p1.toFixed(3) + '× (θ = ' + theta_deg + '°)';
  }

  [m1El, thEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter upstream supersonic flow Mach number $M_1$ ($M_1 \ge 1.0$).',
      'Enter convex corner expansion deflection turn angle $\theta$ in degrees.',
      'Enter specific heat ratio $\gamma$ (1.40 for air).',
      'Inspect accelerated downstream Mach number $M_2$, Prandtl-Meyer angle $\nu(M_2)$, and static pressure drop ratio $p_2/p_1$.'
    ],
    benefitTitle: 'Ludwig Prandtl & Theodor Meyer 1908 Isentropic Expansion',
    benefitContent: 'Smooth isentropic expansion fans accelerate supersonic flows around convex corners without total pressure loss, modeling supersonic airfoils and rocket nozzle divergence plumes.',
    faqs: [{ q: 'Why is a Prandtl-Meyer expansion isentropic while a shock wave is not?', a: 'Expansion occurs through an infinite series of infinitesimal Mach waves with zero entropy generation ($\Delta s = 0$), preserving total stagnation pressure ($p_{02} = p_{01}$).' }]
  },

  // 9. Isentropic Flow Stagnation Pressure & Temperature Calculator
  {
    slug: 'stagnation-pressure-temperature-isentropic-flow-calculator',
    name: 'Isentropic Flow Stagnation Pressure (p₀/p) & Temperature Ratio Calculator',
    description: 'Calculate compressible flow Total-to-Static Stagnation Temperature ratio T₀/T (T₀/T = 1 + (γ-1)/2 · M²), Stagnation Pressure ratio p₀/p = (T₀/T)^(γ/(γ-1)), and dynamic pressure q for high-speed aerodynamics.',
    category: 'Science',
    icon: 'text',
    keywords: ['isentropic flow stagnation calculator', 'total temperature pressure ratio formula online', 'pitot tube compressible mach number calculator', 'stagnation enthalpy dynamic pressure q calculator', 'compressible aerodynamics fluid mechanics aerospace online'],
    order: 1418,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Mach Number M, Static Temperature T (K) & Static Ambient Pressure p (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sf-m">Mach Number M</label>
          <input class="tool-textarea" id="sf-m" type="number" step="0.2" value="2.00" placeholder="2.00 (Supersonic Flight)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sf-t">Static Temp T (K)</label>
          <input class="tool-textarea" id="sf-t" type="number" step="10" value="216.65" placeholder="216.65 K (-56.5 °C @ 11km)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sf-p">Static Press p (kPa)</label>
          <input class="tool-textarea" id="sf-p" type="number" step="5" value="22.63" placeholder="22.63 kPa (11km Altitude)" />
        </div>
      </div>
      <div id="sf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sf-res-t0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Stagnation T₀ = 390.0 K (+116.8 °C Total Temp)</span>
            <span class="stat-label">Total Stagnation Temperature (T₀ = T · (1 + 0.2 · M²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sf-res-p0" style="color:var(--green-dark); font-weight:700;">Stagnation p₀ = 177.1 kPa (7.82× Static) | Dynamic Pressure q = 63.4 kPa</span>
            <span class="stat-label">Total Stagnation Pressure (p₀ = p · (1 + 0.2 · M²)^3.5) & Aerodynamic Q</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('sf-m'), tEl = document.getElementById('sf-t'), pEl = document.getElementById('sf-p');
  const t0ResEl = document.getElementById('sf-res-t0'), p0ResEl = document.getElementById('sf-res-p0');

  const gamma = 1.40;

  function update() {
    const M = parseFloat(mEl.value), T_K = parseFloat(tEl.value), p_kPa = parseFloat(pEl.value);
    if (isNaN(M) || isNaN(T_K) || isNaN(p_kPa) || M < 0 || T_K <= 0 || p_kPa <= 0) return;

    const T0_over_T = 1.0 + (0.5 * (gamma - 1.0) * Math.pow(M, 2));
    const T0_K = T_K * T0_over_T;
    const T0_C = T0_K - 273.15;
    const p0_over_p = Math.pow(T0_over_T, gamma / (gamma - 1.0));
    const p0_kPa = p_kPa * p0_over_p;
    const q_kPa = 0.5 * gamma * p_kPa * Math.pow(M, 2);

    t0ResEl.textContent = 'Stagnation T₀ = ' + T0_K.toFixed(1) + ' K (' + (T0_C >= 0 ? '+' : '') + T0_C.toFixed(1) + ' °C)';
    p0ResEl.textContent = 'Stagnation p₀ = ' + p0_kPa.toFixed(1) + ' kPa (' + p0_over_p.toFixed(2) + '× Static) | Dynamic q = ' + q_kPa.toFixed(1) + ' kPa (M=' + M + ')';
  }

  [mEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter flight Mach number M.',
      'Enter ambient free-stream static temperature T in Kelvin (e.g. 216.65 K in standard stratosphere).',
      'Enter ambient free-stream static atmospheric pressure p in kPa.',
      'Inspect total stagnation recovery temperature $T_0$, stagnation pressure $p_0$, and aerodynamic dynamic pressure q (Max-Q).'
    ],
    benefitTitle: 'Compressible Aerodynamic Stagnation Energy Standard',
    benefitContent: 'Accounts for aerodynamic kinetic energy compression into thermal stagnation heat ($T_0 = T + \frac{v^2}{2 c_p}$), calculating Pitot tube airspeed and aircraft aerodynamic skin heating.',
    faqs: [{ q: 'Why do supersonic aircraft experience severe aerodynamic heating?', a: 'At Mach 3 (SR-71 Blackbird), stagnation temperature rises to $T_0 \approx 2.8 \, T \approx 330^\circ\text{C}$ ($625^\circ\text{F}$), requiring titanium structures.' }]
  },

  // 10. Aircraft Wing Lift-Induced Drag Coefficient Calculator
  {
    slug: 'aircraft-wing-lift-induced-drag-aspect-ratio-calculator',
    name: 'Aircraft Wing Lift-Induced Drag Coefficient (C_Di = C_L² / π·e·AR) Calculator',
    description: 'Calculate 3D finite aircraft wing Induced Drag Coefficient C_Di (Ludwig Prandtl Lifting-Line Theory: C_Di = C_L² / (π · e · AR)), wing Aspect Ratio AR = b² / S, and induced drag force D_i in kN.',
    category: 'Science',
    icon: 'text',
    keywords: ['induced drag calculator', 'lift induced drag coefficient formula cdi online', 'oswald efficiency factor wing aspect ratio calculator', 'wingtip vortex drag lift line theory calculator', 'aerodynamics aircraft design aeronautical engineering online'],
    order: 1419,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lift Coefficient C_L, Wingspan b (m), Wing Area S (m²) & Oswald Efficiency e (0.75 to 0.95)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="id-cl">Lift Coeff C_L</label>
          <input class="tool-textarea" id="id-cl" type="number" step="0.1" value="0.60" placeholder="0.60 (Cruise Lift)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="id-b">Wingspan b (m)</label>
          <input class="tool-textarea" id="id-b" type="number" step="2" value="34.0" placeholder="34.0 m (A320 / B737)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="id-s">Wing Area S (m²)</label>
          <input class="tool-textarea" id="id-s" type="number" step="10" value="122.0" placeholder="122.0 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="id-e">Oswald e</label>
          <input class="tool-textarea" id="id-e" type="number" step="0.02" value="0.85" placeholder="0.85 (Winglets)" />
        </div>
      </div>
      <div id="id-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="id-res-cdi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Induced Drag C_Di = 0.0142 (142 Drag Counts)</span>
            <span class="stat-label">Lift-Induced Drag Coefficient (C_Di = C_L² / (π · e · AR))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="id-res-ar" style="color:var(--green-dark); font-weight:700;">Aspect Ratio AR = 9.48 | Induced Drag represents ~45% of Total Aircraft Cruise Drag</span>
            <span class="stat-label">Wing Geometric Aspect Ratio (AR = b² / S)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const clEl = document.getElementById('id-cl'), bEl = document.getElementById('id-b');
  const sEl = document.getElementById('id-s'), eEl = document.getElementById('id-e');
  const cdResEl = document.getElementById('id-res-cdi'), arResEl = document.getElementById('id-res-ar');

  function update() {
    const C_L = parseFloat(clEl.value), b_m = parseFloat(bEl.value);
    const S_m2 = parseFloat(sEl.value), e = parseFloat(eEl.value);

    if (isNaN(C_L) || isNaN(b_m) || isNaN(S_m2) || isNaN(e) || b_m <= 0 || S_m2 <= 0 || e <= 0 || e > 1) return;

    const AR = Math.pow(b_m, 2) / S_m2;
    const C_Di = Math.pow(C_L, 2) / (Math.PI * e * AR);
    const drag_counts = C_Di * 1e4;

    cdResEl.textContent = 'Induced Drag C_Di = ' + C_Di.toFixed(4) + ' (' + Math.round(drag_counts) + ' Drag Counts)';
    arResEl.textContent = 'Aspect Ratio AR = ' + AR.toFixed(2) + ' | Oswald e = ' + e + ' (b=' + b_m + ' m, S=' + S_m2 + ' m² @ C_L=' + C_L + ')';
  }

  [clEl, bEl, sEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter operating 3D wing Lift Coefficient $C_L$ ($0.3$ high-speed cruise, $1.5$ takeoff/climb).',
      'Enter total wingspan b in meters.',
      'Enter reference wing planform area S in $\text{m}^2$.',
      'Enter Oswald span efficiency factor e (0.75 for plain rectangular wing, 0.85+ with blended winglets).',
      'Inspect Lift-Induced Drag Coefficient $C_{\text{Di}}$ (in drag counts, $1\text{ count} = 0.0001$) and wing Aspect Ratio (AR).'
    ],
    benefitTitle: 'Ludwig Prandtl 1918 Lifting-Line Vortex Theory',
    benefitContent: 'Quantifies aerodynamic drag created as a direct byproduct of generating lift by trailing wingtip vortices ($C_{\text{Di}} \propto C_L^2 / AR$), proving why gliders and U-2 spy planes use ultra-long slender wings ($AR > 20$).',
    faqs: [{ q: 'How do winglets reduce fuel burn on commercial airliners?', a: 'Winglets diffuse and lift the concentrated high-pressure wingtip vortex, increasing the effective Oswald span efficiency e and reducing induced drag by $4\%\text{ to }6\%$.' }]
  },

  // 11. Aircraft Takeoff Ground Roll Distance Calculator
  {
    slug: 'aircraft-takeoff-roll-distance-ground-run-calculator',
    name: 'Aircraft Takeoff Ground Roll Distance (S_G) & Takeoff Run Calculator',
    description: 'Calculate fixed-wing airplane takeoff ground roll distance S_G in meters (S_G = 1.21 · (W/S) / (g · ρ · C_L,max · (T/W - μ_r))) from wing loading W/S, thrust-to-weight ratio T/W, maximum lift coefficient C_L,max, and runway rolling friction μ_r.',
    category: 'Science',
    icon: 'text',
    keywords: ['aircraft takeoff distance calculator', 'takeoff ground roll formula sg online', 'wing loading thrust to weight takeoff runway calculator', 'cl max rolling friction takeoff run calculator', 'flight mechanics aeronautical engineering aircraft performance online'],
    order: 1420,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wing Loading W/S (kg/m² or N/m²), Thrust/Weight T/W, Max Lift C_L,max & Air Density ρ (kg/m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="to-ws">Wing Loading W/S</label>
          <input class="tool-textarea" id="to-ws" type="number" step="50" value="550.0" placeholder="550.0 kg/m² (Airliner)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="to-tw">Thrust/Weight T/W</label>
          <input class="tool-textarea" id="to-tw" type="number" step="0.05" value="0.30" placeholder="0.30 (Twin Jet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="to-clmax">Max Lift C_L,max</label>
          <input class="tool-textarea" id="to-clmax" type="number" step="0.1" value="2.20" placeholder="2.20 (Flaps/Slats)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="to-rho">Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="to-rho" type="number" step="0.05" value="1.225" placeholder="1.225 kg/m³ (Sea Level)" />
        </div>
      </div>
      <div id="to-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="to-res-sg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ground Roll S_G = 926 Meters (3,038 ft)</span>
            <span class="stat-label">Aircraft Takeoff Ground Run Distance to Liftoff (V_LOF = 1.1 · V_stall)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="to-res-vlof" style="color:var(--green-dark); font-weight:700;">Liftoff Speed V_LOF = 69.4 m/s (134.9 Knots / 250 km/h) | Stall V_s = 122.6 kts</span>
            <span class="stat-label">Liftoff Velocity & Balanced Field Runway Planning</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wsEl = document.getElementById('to-ws'), twEl = document.getElementById('to-tw');
  const clEl = document.getElementById('to-clmax'), rhEl = document.getElementById('to-rho');
  const sgResEl = document.getElementById('to-res-sg'), vlResEl = document.getElementById('to-res-vlof');

  const g = 9.80665;
  const mu_r = 0.03;

  function update() {
    const WS_kg_m2 = parseFloat(wsEl.value), TW = parseFloat(twEl.value);
    const CL_max = parseFloat(clEl.value), rho = parseFloat(rhEl.value);

    if (isNaN(WS_kg_m2) || isNaN(TW) || isNaN(CL_max) || isNaN(rho) || WS_kg_m2 <= 0 || TW <= mu_r || CL_max <= 0 || rho <= 0) return;

    const WS_N_m2 = WS_kg_m2 * g;
    const V_stall = Math.sqrt((2.0 * WS_N_m2) / (rho * CL_max));
    const V_LOF = 1.10 * V_stall;
    const S_G_m = (1.21 * WS_N_m2) / (g * rho * CL_max * (TW - mu_r));
    const S_G_ft = S_G_m * 3.28084;
    const V_LOF_kts = V_LOF * 1.94384;
    const V_stall_kts = V_stall * 1.94384;

    sgResEl.textContent = 'Ground Roll S_G = ' + Math.round(S_G_m).toLocaleString() + ' Meters (' + Math.round(S_G_ft).toLocaleString() + ' ft)';
    vlResEl.textContent = 'Liftoff Speed V_LOF = ' + V_LOF.toFixed(1) + ' m/s (' + V_LOF_kts.toFixed(1) + ' kts / ' + Math.round(V_LOF*3.6) + ' km/h) | V_stall = ' + V_stall_kts.toFixed(1) + ' kts (T/W=' + TW + ')';
  }

  [wsEl, twEl, clEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aircraft Takeoff Wing Loading $W/S$ in $\text{kg/m}^2$ (e.g. 50–100 $\text{kg/m}^2$ general aviation, 400–650 $\text{kg/m}^2$ commercial jet airliner).',
      'Enter Takeoff Thrust-to-Weight ratio $T/W$ (typically 0.25 to 0.35).',
      'Enter maximum takeoff flap configuration lift coefficient $C_{L,\max}$ (1.8 to 2.6).',
      'Enter runway ambient air density $\rho$ in $\text{kg/m}^3$ (accounting for airport elevation and temperature).',
      'Inspect takeoff ground roll distance $S_G$ in meters/feet and liftoff speed $V_{\text{LOF}}$ in knots.'
    ],
    benefitTitle: 'Daniel P. Raymer Aircraft Performance Sizing Standard',
    benefitContent: 'Evaluates runway takeoff field length requirements and hot-and-high density altitude performance penalties to prevent runway excursion overruns.',
    faqs: [{ q: 'Why do high-altitude airports require much longer runways?', a: 'Low air density $\rho$ raises liftoff speed ($V_{\text{LOF}} \propto 1/\sqrt{\rho}$) and reduces jet engine thrust $T$, quadratically increasing takeoff roll distance ($S_G \propto 1/\rho^2$).' }]
  },

  // 12. Breguet Aircraft Range Equation Calculator
  {
    slug: 'aircraft-breguet-range-endurance-jet-propeller-calculator',
    name: 'Breguet Aircraft Range Equation (Jet & Propeller Range / Endurance) Calculator',
    description: 'Calculate commercial jet aircraft cruise flight Range R in km and nautical miles (Breguet Jet Range Formula: R = (V / TSFC) · (L/D) · ln(W_initial / W_final)), flight endurance E in hours, and fuel burn percentage.',
    category: 'Science',
    icon: 'text',
    keywords: ['breguet range equation calculator', 'aircraft flight range formula jet propeller online', 'lift to drag ratio tsfc specific fuel consumption calculator', 'initial final gross weight fuel fraction calculator', 'aircraft design flight mechanics aeronautics online'],
    order: 1421,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cruise Speed V (km/h or M), TSFC (1/hr or kg/daN·hr), Aerodynamic L/D (14 to 20) & Initial/Final Weight (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="br-v">Speed V (km/h)</label>
          <input class="tool-textarea" id="br-v" type="number" step="25" value="850.0" placeholder="850.0 km/h (Mach 0.80)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-tsfc">TSFC (1/hr)</label>
          <input class="tool-textarea" id="br-tsfc" type="number" step="0.05" value="0.55" placeholder="0.55 hr⁻¹ (Turbofan)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-ld">Lift/Drag (L/D)</label>
          <input class="tool-textarea" id="br-ld" type="number" step="1" value="18.0" placeholder="18.0 (Modern Airliner)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-w0">Initial W₀ (kg)</label>
          <input class="tool-textarea" id="br-w0" type="number" step="5000" value="75000.0" placeholder="75,000 kg (MTOW)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-w1">Final W₁ (kg)</label>
          <input class="tool-textarea" id="br-w1" type="number" step="5000" value="55000.0" placeholder="55,000 kg (Dry + Payload)" />
        </div>
      </div>
      <div id="br-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="br-res-r" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cruise Range R = 8,630 km (4,660 NM)</span>
            <span class="stat-label">Breguet Jet Maximum Range (R = (V / TSFC) · (L/D) · ln(W₀ / W₁))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="br-res-end" style="color:var(--green-dark); font-weight:700;">Flight Endurance = 10.15 Hours | Fuel Burn = 20,000 kg (26.7% of MTOW)</span>
            <span class="stat-label">Total Airborne Flight Time & Trip Propellant Consumption</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('br-v'), tsEl = document.getElementById('br-tsfc');
  const ldEl = document.getElementById('br-ld'), w0El = document.getElementById('br-w0'), w1El = document.getElementById('br-w1');
  const rResEl = document.getElementById('br-res-r'), enResEl = document.getElementById('br-res-end');

  function update() {
    const V_kmh = parseFloat(vEl.value), TSFC_hr = parseFloat(tsEl.value);
    const LD = parseFloat(ldEl.value), W0 = parseFloat(w0El.value), W1 = parseFloat(w1El.value);

    if (isNaN(V_kmh) || isNaN(TSFC_hr) || isNaN(LD) || isNaN(W0) || isNaN(W1) || V_kmh <= 0 || TSFC_hr <= 0 || LD <= 0 || W0 <= W1 || W1 <= 0) return;

    const weight_ratio = W0 / W1;
    const ln_w = Math.log(weight_ratio);
    const Range_km = (V_kmh / TSFC_hr) * LD * ln_w;
    const Range_NM = Range_km / 1.852;
    const Endurance_hr = (1.0 / TSFC_hr) * LD * ln_w;
    const fuel_kg = W0 - W1;
    const fuel_pct = (fuel_kg / W0) * 100.0;

    rResEl.textContent = 'Cruise Range R = ' + Math.round(Range_km).toLocaleString() + ' km (' + Math.round(Range_NM).toLocaleString() + ' NM)';
    enResEl.textContent = 'Flight Endurance = ' + Endurance_hr.toFixed(2) + ' Hours | Fuel Burn = ' + Math.round(fuel_kg).toLocaleString() + ' kg (' + fuel_pct.toFixed(1) + '% MTOW @ L/D=' + LD + ')';
  }

  [vEl, tsEl, ldEl, w0El, w1El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter true airspeed cruise velocity V in km/h (e.g. 850–900 km/h).',
      'Enter engine Thrust Specific Fuel Consumption (TSFC) in $\text{hr}^{-1}$ (typically 0.50–0.60 for modern high-bypass turbofans).',
      'Enter aerodynamic lift-to-drag cruise efficiency ratio L/D (16 to 20 for commercial airliners).',
      'Enter initial takeoff gross weight $W_0$ in kg.',
      'Enter final empty/landing gross weight $W_1$ in kg.',
      'Inspect total maximum non-stop cruise range in km and Nautical Miles (NM), flight endurance time, and burned fuel weight.'
    ],
    benefitTitle: 'Louis Charles Breguet 1921 Aircraft Range Standard',
    benefitContent: 'The universal performance equation balancing structural lightweighting ($\ln(W_0/W_1)$), aerodynamic efficiency ($L/D$), and engine fuel efficiency ($\text{TSFC}$) for airline route planning.',
    faqs: [{ q: 'Why is cruising at high altitude optimal for jet aircraft?', a: 'In cold, thin stratospheric air, jet engines operate at peak thermodynamic efficiency while maintaining high true airspeed at optimal lift coefficient.' }]
  },

  // 13. Atmospheric Scale Height & Exponential Density-Altitude Calculator
  {
    slug: 'atmospheric-scale-height-barometric-density-altitude-calculator',
    name: 'Atmospheric Scale Height (H) & Exponential Density-Altitude Calculator',
    description: 'Calculate planetary atmospheric pressure p(z) and air density ρ(z) in kg/m³ at altitude z (Barometric Exponential Atmosphere: ρ(z) = ρ₀ · e^(-z / H)), Atmospheric Scale Height H = R_spec · T / g in km, and dynamic pressure.',
    category: 'Science',
    icon: 'text',
    keywords: ['atmospheric scale height calculator', 'barometric density altitude formula online', 'exponential atmosphere rho equals rho0 exp minus z over h calculator', 'planetary atmospheric pressure scale height calculator', 'aerospace engineering meteorology atmospheric entry online'],
    order: 1422,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Altitude z (km), Sea-Level Density ρ₀ (kg/m³), Sea-Level Pressure p₀ (kPa) & Scale Height H (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="as-z">Altitude z (km)</label>
          <input class="tool-textarea" id="as-z" type="number" step="2" value="10.0" placeholder="10.0 km (Cruising Altitude)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-h">Scale Height H (km)</label>
          <input class="tool-textarea" id="as-h" type="number" step="0.5" value="8.5" placeholder="8.5 km (Earth Atmosphere)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-rho0">Sea-Level ρ₀</label>
          <input class="tool-textarea" id="as-rho0" type="number" step="0.05" value="1.225" placeholder="1.225 kg/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-p0">Sea-Level p₀ (kPa)</label>
          <input class="tool-textarea" id="as-p0" type="number" step="5" value="101.325" placeholder="101.325 kPa" />
        </div>
      </div>
      <div id="as-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="as-res-rho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Air Density ρ = 0.378 kg / m³ (30.8% Sea Level)</span>
            <span class="stat-label">Ambient Atmospheric Density (ρ(z) = ρ₀ · e^(-z / H))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="as-res-p" style="color:var(--green-dark); font-weight:700;">Pressure p(z) = 31.25 kPa (308 mbar) | e-Folding Decays = 1.18 Scale Heights</span>
            <span class="stat-label">Barometric Ambient Pressure (p(z) = p₀ · e^(-z / H))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('as-z'), hEl = document.getElementById('as-h');
  const rh0El = document.getElementById('as-rho0'), p0El = document.getElementById('as-p0');
  const rhResEl = document.getElementById('as-res-rho'), pResEl = document.getElementById('as-res-p');

  function update() {
    const z_km = parseFloat(zEl.value), H_km = parseFloat(hEl.value);
    const rho0 = parseFloat(rh0El.value), p0_kPa = parseFloat(p0El.value);

    if (isNaN(z_km) || isNaN(H_km) || isNaN(rho0) || isNaN(p0_kPa) || z_km < 0 || H_km <= 0 || rho0 <= 0 || p0_kPa <= 0) return;

    const exponent = - z_km / H_km;
    const factor = Math.exp(exponent);
    const rho_z = rho0 * factor;
    const p_z_kPa = p0_kPa * factor;
    const p_z_mbar = p_z_kPa * 10.0;
    const pct_surface = factor * 100.0;

    rhResEl.textContent = 'Air Density ρ = ' + rho_z.toFixed(3) + ' kg / m³ (' + pct_surface.toFixed(1) + '% Sea Level)';
    pResEl.textContent = 'Pressure p = ' + p_z_kPa.toFixed(2) + ' kPa (' + Math.round(p_z_mbar) + ' mbar) | z = ' + z_km + ' km (' + (z_km/H_km).toFixed(2) + ' e-folds @ H=' + H_km + ' km)';
  }

  [zEl, hEl, rh0El, p0El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter flight altitude or re-entry altitude z in km.',
      'Enter planetary atmospheric scale height H in km ($8.5\text{ km}$ Earth, $11.1\text{ km}$ Mars, $15.9\text{ km}$ Venus, $27.0\text{ km}$ Jupiter).',
      'Enter sea-level base atmospheric density $\rho_0$ in $\text{kg/m}^3$.',
      'Enter surface ambient atmospheric pressure $p_0$ in kPa.',
      'Inspect ambient air density $\rho(z)$ and atmospheric pressure $p(z)$.'
    ],
    benefitTitle: 'Hydrostatic Equilibrium Barometric Law',
    benefitContent: 'Quantifies exponential atmospheric decay ($dp = -\rho g \, dz$), governing orbital decay lifetime of low-Earth satellites and hypersonic spacecraft re-entry deceleration trajectories.',
    faqs: [{ q: 'What is the physical meaning of Scale Height H?', a: 'Scale height is the vertical distance over which atmospheric pressure and density drop by a factor of $e \approx 2.718$ ($36.8\%$ of previous value).' }]
  },

  // 14. Spacecraft Solar Radiation Pressure (SRP) Force Calculator
  {
    slug: 'spacecraft-solar-radiation-pressure-photon-force-calculator',
    name: 'Spacecraft Solar Radiation Pressure (SRP Photon Force & Solar Sail Acceleration) Calculator',
    description: 'Calculate interplanetary spacecraft Solar Radiation Pressure photon thrust force F_SRP in μN (F_SRP = (P_sun / c) · A · (1 + R) · cos θ) from solar irradiance (1361 W/m² @ 1 AU), surface reflectivity R, and solar sail acceleration.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar radiation pressure calculator', 'srp photon force formula solar sail online', 'solar photon momentum thrust micronewtons calculator', 'spacecraft attitude perturbation solar pressure calculator', 'astrodynamics space mission design orbital perturbations online'],
    order: 1423,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solar Sail / Panel Area A (m²), Reflectivity R (0 for Black, 1 for Mirror), Spacecraft Mass m (kg) & Distance (AU)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-area">Sail Area A (m²)</label>
          <input class="tool-textarea" id="sp-area" type="number" step="10" value="100.0" placeholder="100.0 m² Solar Sail" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-r">Reflectivity R</label>
          <input class="tool-textarea" id="sp-r" type="number" step="0.05" value="0.90" placeholder="0.90 (Aluminized Mylar)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-m">Mass m (kg)</label>
          <input class="tool-textarea" id="sp-m" type="number" step="10" value="50.0" placeholder="50.0 kg CubeSat" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-dist">Distance (AU)</label>
          <input class="tool-textarea" id="sp-dist" type="number" step="0.1" value="1.0" placeholder="1.0 AU (Earth Orbit)" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">SRP Photon Force = 862 μN (0.862 mN)</span>
            <span class="stat-label">Continuous Solar Photon Momentum Force (F = (P_sun / c) · A · (1 + R))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-acc" style="color:var(--green-dark); font-weight:700;">Characteristic Acceleration = 17.2 μm/s² (1.49 m/s Δv per day propellantless!)</span>
            <span class="stat-label">Solar Sail Propellantless Daily Velocity Gain (a = F / m)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const arEl = document.getElementById('sp-area'), rEl = document.getElementById('sp-r');
  const mEl = document.getElementById('sp-m'), dsEl = document.getElementById('sp-dist');
  const fResEl = document.getElementById('sp-res-f'), acResEl = document.getElementById('sp-res-acc');

  const c_light = 2.99792458e8;
  const P_sun_1AU = 1361.0;

  function update() {
    const Area_m2 = parseFloat(arEl.value), R = parseFloat(rEl.value);
    const mass_kg = parseFloat(mEl.value), dist_AU = parseFloat(dsEl.value);

    if (isNaN(Area_m2) || isNaN(R) || isNaN(mass_kg) || isNaN(dist_AU) || Area_m2 <= 0 || R < 0 || R > 1 || mass_kg <= 0 || dist_AU <= 0) return;

    const P_sun = P_sun_1AU / Math.pow(dist_AU, 2);
    const P_rad_N_m2 = (P_sun / c_light) * (1.0 + R);
    const F_N = P_rad_N_m2 * Area_m2;
    const F_uN = F_N * 1e6;
    const F_mN = F_N * 1000.0;
    const a_mps2 = F_N / mass_kg;
    const a_um_s2 = a_mps2 * 1e6;
    const dv_per_day_mps = a_mps2 * 86400.0;

    fResEl.textContent = 'SRP Photon Force = ' + Math.round(F_uN).toLocaleString() + ' μN (' + F_mN.toFixed(3) + ' mN)';
    acResEl.textContent = 'Acceleration = ' + a_um_s2.toFixed(1) + ' μm/s² (+' + dv_per_day_mps.toFixed(2) + ' m/s Δv per day!) | Pressure = ' + (P_rad_N_m2*1e6).toFixed(2) + ' μN/m² @ ' + dist_AU + ' AU';
  }

  [arEl, rEl, mEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter exposed solar sail membrane / solar panel array surface area in $\text{m}^2$.',
      'Enter optical surface specular reflectivity R ($0.0$ for perfect absorber, $1.0$ for ideal mirror).',
      'Enter total spacecraft wet/dry mass in kg.',
      'Enter distance from the Sun in Astronomical Units (AU, 1.0 AU at Earth).',
      'Inspect total continuous solar photon radiation force in $\mu\text{N}$ and daily propellantless velocity gain.'
    ],
    benefitTitle: 'James Clerk Maxwell 1873 Photon Momentum Standard',
    benefitContent: 'Photons carry momentum ($p = E/c$), creating a continuous propellantless radiation pressure force ($4.54\ \mu\text{N/m}^2$ for absorption, $9.08\ \mu\text{N/m}^2$ for reflection) utilized by solar sails (NASA ACS3, JAXA IKAROS).',
    faqs: [{ q: 'Why is photon force doubled for a reflective mirror vs black absorber?', a: 'Reflecting a photon reverses its momentum vector from $+p$ to $-p$, transferring double momentum ($\Delta p = 2p$) via elastic collision compared to absorption ($\Delta p = p$).' }]
  },

  // 15. Gravity-Gradient Torque Spacecraft Attitude Stabilization Calculator
  {
    slug: 'gravity-gradient-torque-spacecraft-attitude-stabilization-calculator',
    name: 'Gravity-Gradient Torque Spacecraft Passive Attitude Stabilization Calculator',
    description: 'Calculate satellite passive attitude control Gravity-Gradient Torque T_GG in N·m (T_GG = 3·μ / (2·r³) · |I_z - I_x| · sin(2θ)) from Earth gravity μ, orbit radius r, moment of inertia asymmetry |I_z - I_x|, and pitch offset angle θ.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravity gradient torque calculator', 'spacecraft attitude control formula tgg online', 'passive gravity gradient stabilization boom calculator', 'moment of inertia asymmetry satellite pitch torque calculator', 'astrodynamics spacecraft dynamics attitude determination control adcs online'],
    order: 1424,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inertia Asymmetry |I_z - I_x| (kg·m²), Pitch Angle θ (°), Orbit Altitude h (km) & Earth μ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gg-di">Inertia ΔI (kg·m²)</label>
          <input class="tool-textarea" id="gg-di" type="number" step="50" value="250.0" placeholder="250.0 kg·m² (Boom Extended)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gg-theta">Pitch Offset θ (°)</label>
          <input class="tool-textarea" id="gg-theta" type="number" step="5" value="10.0" placeholder="10.0° Nadir Offset" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gg-alt">Altitude h (km)</label>
          <input class="tool-textarea" id="gg-alt" type="number" step="50" value="500.0" placeholder="500.0 km LEO" />
        </div>
      </div>
      <div id="gg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gg-res-tgg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Restoring Torque T_GG = 1.62 × 10⁻⁴ N · m (162 μN·m)</span>
            <span class="stat-label">Gravity-Gradient Restoring Torque (T_GG = 3/2 · ω₀² · ΔI · sin(2θ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gg-res-stab" style="color:var(--green-dark); font-weight:700;">PASSIVE NADIR STABILIZATION (Tidal force aligns long axis with Earth local vertical ✓)</span>
            <span class="stat-label">Orbital Mean Motion ω₀ = 1.107 × 10⁻³ rad/s (Period T = 94.6 min)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const diEl = document.getElementById('gg-di'), thEl = document.getElementById('gg-theta'), altEl = document.getElementById('gg-alt');
  const tgResEl = document.getElementById('gg-res-tgg'), stResEl = document.getElementById('gg-res-stab');

  const mu_earth = 398600.4418;
  const R_earth = 6378.137;

  function update() {
    const delta_I = parseFloat(diEl.value), theta_deg = parseFloat(thEl.value), h_km = parseFloat(altEl.value);
    if (isNaN(delta_I) || isNaN(theta_deg) || isNaN(h_km) || delta_I <= 0 || h_km < 0) return;

    const r_km = R_earth + h_km;
    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const omega0 = Math.sqrt(mu_earth / Math.pow(r_km, 3));
    const Period_min = (2.0 * Math.PI / omega0) / 60.0;
    const T_GG_Nm = 1.5 * Math.pow(omega0, 2) * delta_I * Math.sin(2.0 * theta_rad);
    const T_GG_uNm = T_GG_Nm * 1e6;

    tgResEl.textContent = 'Restoring Torque T_GG = ' + T_GG_uNm.toFixed(1) + ' μN · m (' + T_GG_Nm.toExponential(2) + ' N·m)';
    stResEl.textContent = 'Passive Nadir Lock Active (ω₀ = ' + (omega0*1000).toFixed(3) + ' mrad/s, Orbit Period T = ' + Period_min.toFixed(1) + ' min @ h=' + h_km + ' km)';
  }

  [diEl, thEl, altEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter satellite principal moment of inertia difference $|I_z - I_x|$ in $\text{kg}\cdot\text{m}^2$ (increased by deploying a gravity gradient tip mass boom).',
      'Enter satellite pitch misalignment angle $\theta$ from local Nadir vertical in degrees.',
      'Enter orbit altitude h above Earth in km.',
      'Inspect gravity-gradient restoring torque in $\mu\text{N}\cdot\text{m}$ and orbital angular velocity $\omega_0$.'
    ],
    benefitTitle: 'Tidal Differential Gravity Alignment Standard',
    benefitContent: 'The lower tip of a satellite experiences slightly stronger gravitational pull than the upper tip ($F \propto 1/r^2$), creating a natural restoring torque that passively aligns spacecraft antennas toward Earth without consuming thruster fuel.',
    faqs: [{ q: 'Why is the Earth\'s Moon tidally locked to Earth?', a: 'Over billions of years, gravity-gradient tidal friction dissipations slowed the Moon\'s rotation until its orbital period equaled its rotational period ($1:1$ resonance).' }]
  },

  // 16. J2 Orbital Nodal Precession & Sun-Synchronous Orbit (SSO) Calculator
  {
    slug: 'j2-orbital-perturbation-nodal-precession-sun-synchronous-calculator',
    name: 'J2 Orbital Nodal Precession & Sun-Synchronous Orbit (SSO) Inclination Calculator',
    description: 'Calculate Earth oblateness J2 gravitational perturbation Right Ascension of Ascending Node (RAAN) nodal precession rate dΩ/dt in deg/day and required inclination i for a Sun-Synchronous Orbit (SSO: dΩ/dt = +0.9856 deg/day = 360°/year).',
    category: 'Science',
    icon: 'text',
    keywords: ['j2 orbital perturbation calculator', 'sun synchronous orbit inclination formula sso online', 'raan nodal precession rate degrees per day calculator', 'earth oblateness j2 geopotential calculator', 'orbital mechanics astrodynamics earth observation satellites online'],
    order: 1425,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Circular Orbit Altitude h (km) & Target SSO Orbital Precession Rate (0.9856°/day)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sso-alt">Altitude h (km)</label>
          <input class="tool-textarea" id="sso-alt" type="number" step="50" value="600.0" placeholder="600.0 km (Earth Observation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sso-inc">Inclination i (°)</label>
          <input class="tool-textarea" id="sso-inc" type="number" step="0.5" value="97.79" placeholder="97.79° (Retrograde SSO)" />
        </div>
      </div>
      <div id="sso-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sso-res-precess" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Precession dΩ/dt = +0.986 ° / day (SUN-SYNCHRONOUS)</span>
            <span class="stat-label">J2 Nodal Precession Rate (Exact Match to Earth Sun Orbit = 360° / 365.242 days ✓)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sso-res-req" style="color:var(--green-dark); font-weight:700;">Exact Required SSO Inclination i_SSO = 97.79° (Retrograde) | Period T = 96.69 min</span>
            <span class="stat-label">Sun-Synchronous Constant Solar Lighting Angle Orbit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const altEl = document.getElementById('sso-alt'), incEl = document.getElementById('sso-inc');
  const prResEl = document.getElementById('sso-res-precess'), rqResEl = document.getElementById('sso-res-req');

  const mu_E = 398600.4418; // km^3 / s^2
  const R_E = 6378.137; // km
  const J2 = 1.08263e-3; // Earth J2 harmonic

  function update() {
    const h_km = parseFloat(altEl.value), inc_deg = parseFloat(incEl.value);
    if (isNaN(h_km) || isNaN(inc_deg) || h_km < 0) return;

    const r_km = R_E + h_km;
    const inc_rad = (inc_deg * Math.PI) / 180.0;

    // Mean motion n: n = sqrt( mu / r^3 )  [rad / s]
    const n = Math.sqrt(mu_E / Math.pow(r_km, 3));
    const Period_min = (2.0 * Math.PI / n) / 60.0;

    // Nodal precession rate dOmega/dt in rad/s:
    // dOmega/dt = - (3/2) * J2 * (R_E / r)^2 * n * cos(i)
    const dOmega_rad_s = - 1.5 * J2 * Math.pow(R_E / r_km, 2) * n * Math.cos(inc_rad);
    const dOmega_deg_day = dOmega_rad_s * (180.0 / Math.PI) * 86400.0;

    // Required SSO inclination for dOmega/dt = +0.9856 deg/day (= 2*pi / 365.242 days / 86400 s):
    const omega_sun_rad_s = (2.0 * Math.PI) / (365.2422 * 86400.0);
    const cos_i_sso = - omega_sun_rad_s / ( 1.5 * J2 * Math.pow(R_E / r_km, 2) * n );

    let i_sso_deg = 0;
    if (Math.abs(cos_i_sso) <= 1.0) {
      i_sso_deg = Math.acos(cos_i_sso) * (180.0 / Math.PI);
    }

    prResEl.textContent = 'Precession dΩ/dt = ' + (dOmega_deg_day >= 0 ? '+' : '') + dOmega_deg_day.toFixed(3) + ' ° / day';
    rqResEl.textContent = 'Exact SSO Inclination i_SSO = ' + i_sso_deg.toFixed(2) + '° (Period = ' + Period_min.toFixed(2) + ' min @ h=' + h_km + ' km)';
  }

  altEl.addEventListener('input', update);
  incEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter circular orbit altitude h in km (typically 500–800 km for Landsat and Sentinel satellites).',
      'Enter current orbit inclination angle in degrees.',
      'Inspect J2 gravitational oblateness nodal precession rate in degrees/day and exact required Sun-Synchronous inclination $i_{\text{SSO}}$.'
    ],
    benefitTitle: 'Earth Equatorial Bulge J2 Geopotential Standard',
    benefitContent: 'Earth\'s equatorial bulge precesses the orbital plane at exactly $+0.9856^\circ/\text{day}$ (360° per year), matching Earth\'s revolution around the Sun so satellites pass over ground targets at the exact same local solar time every day.',
    faqs: [{ q: 'Why are all Sun-Synchronous Orbits slightly retrograde (i > 90°)?', a: 'To achieve positive eastward precession ($\dot{\Omega} > 0$), $\cos(i)$ must be negative, requiring an inclination between $96^\circ$ and $99^\circ$.' }]
  },

  // 17. Planetary Sphere of Influence & Hill Sphere Calculator
  {
    slug: 'sphere-of-influence-hill-sphere-laplace-radius-calculator',
    name: 'Planetary Sphere of Influence (Laplace SOI & Hill Sphere Radius) Calculator',
    description: 'Calculate planetary gravitational Sphere of Influence radius r_SOI in km (Laplace SOI: r_SOI = a · (m_planet / M_sun)^(2/5)) and maximum stable moon satellite bound orbit Hill Sphere radius r_H = a · (m_planet / 3M_sun)^(1/3).',
    category: 'Science',
    icon: 'text',
    keywords: ['sphere of influence calculator', 'laplace soi formula r equals a m over m two fifths online', 'hill sphere radius stable moon orbit calculator', 'patched conics interplanetary trajectory calculator', 'astrodynamics orbital mechanics space navigation online'],
    order: 1426,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Semimajor Axis a (AU or Million km), Planet Mass m (kg) & Sun Mass M (1.989 × 10³⁰ kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="so-a">Distance a (AU)</label>
          <input class="tool-textarea" id="so-a" type="number" step="0.1" value="1.00" placeholder="1.00 AU (Earth)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="so-m">Planet Mass (10²⁴ kg)</label>
          <input class="tool-textarea" id="so-m" type="number" step="0.5" value="5.972" placeholder="5.972 × 10²⁴ kg (Earth)" />
        </div>
      </div>
      <div id="so-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="so-res-soi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Laplace SOI = 924,600 km (145 Earth Radii)</span>
            <span class="stat-label">Planetary Sphere of Influence (r_SOI = a · (m / M_sun)^(2/5))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="so-res-hill" style="color:var(--green-dark); font-weight:700;">Hill Sphere r_H = 1,496,500 km (235 R_E) | Moon Orbit (384,400 km) sits safely inside ✓</span>
            <span class="stat-label">Three-Body Gravitational Stability Limit (r_H = a · (m / 3M_sun)^(1/3))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('so-a'), mEl = document.getElementById('so-m');
  const soResEl = document.getElementById('so-res-soi'), hlResEl = document.getElementById('so-res-hill');

  const M_sun = 1.98847e30; // kg
  const AU_km = 149597870.7; // km

  function update() {
    const a_AU = parseFloat(aEl.value), m_scaled = parseFloat(mEl.value);
    if (isNaN(a_AU) || isNaN(m_scaled) || a_AU <= 0 || m_scaled <= 0) return;

    const a_km = a_AU * AU_km;
    const m_planet_kg = m_scaled * 1e24;

    // Mass ratio:
    const mu_ratio = m_planet_kg / M_sun;

    // Laplace SOI radius: r_SOI = a * (m / M)^(2/5)  [km]
    const r_SOI_km = a_km * Math.pow(mu_ratio, 0.40);

    // Hill sphere radius: r_H = a * ( m / (3*M) )^(1/3)  [km]
    const r_H_km = a_km * Math.pow(mu_ratio / 3.0, 1.0 / 3.0);

    soResEl.textContent = 'Laplace SOI = ' + Math.round(r_SOI_km).toLocaleString() + ' km (' + (r_SOI_km / 6378.137).toFixed(1) + ' Earth Radii)';
    hlResEl.textContent = 'Hill Sphere r_H = ' + Math.round(r_H_km).toLocaleString() + ' km (' + (r_H_km / 6378.137).toFixed(1) + ' R_E @ a=' + a_AU + ' AU)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter planet orbital distance from the Sun in Astronomical Units (AU).',
      'Enter planet mass in units of $10^{24}\text{ kg}$ (e.g. 5.972 for Earth, 0.642 for Mars, 1898 for Jupiter).',
      'Inspect Laplace Sphere of Influence (SOI) boundary for patched conics mission design and Hill Sphere maximum satellite stability radius.'
    ],
    benefitTitle: 'Pierre-Simon Laplace & George William Hill Gravitational Standard',
    benefitContent: 'Defines the switching boundary in patched-conics interplanetary navigation: inside the SOI, the planet dominates trajectory equations; outside, heliocentric solar gravity takes over.',
    faqs: [{ q: 'What is the difference between Laplace SOI and the Hill Sphere?', a: 'Laplace SOI ($r \propto (m/M)^{2/5}$) defines where 2-body planetary perturbation equations are most accurate; the Hill Sphere ($r \propto (m/3M)^{1/3}$) defines the absolute boundary where moons can orbit stably without being pulled away by the Sun.' }]
  },

  // 18. Interplanetary Launch Energy (C3) & Hyperbolic Excess Velocity Calculator
  {
    slug: 'porkchop-plot-hyperbolic-excess-velocity-c3-interplanetary-calculator',
    name: 'Interplanetary Launch Energy (C3) & Hyperbolic Excess Velocity (v_∞) Calculator',
    description: 'Calculate deep space and interplanetary probe Characteristic Launch Energy C3 in km²/s² (C3 = v_∞²), Hyperbolic Excess Velocity v_∞ in km/s, and required LEO Trans-Mars/Trans-Lunar injection burn velocity Δv_inj.',
    category: 'Science',
    icon: 'text',
    keywords: ['c3 launch energy calculator', 'hyperbolic excess velocity v infinity formula online', 'porkchop plot interplanetary injection delta v calculator', 'trans mars injection tmi c3 calculator', 'astrodynamics interplanetary trajectory design nasa online'],
    order: 1427,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hyperbolic Excess Velocity v_∞ (km/s) & Parking Orbit Altitude h (km, e.g. 200 km LEO)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="c3-vinf">Excess v_∞ (km/s)</label>
          <input class="tool-textarea" id="c3-vinf" type="number" step="0.5" value="3.00" placeholder="3.00 km/s (Mars Window)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="c3-alt">LEO Altitude h (km)</label>
          <input class="tool-textarea" id="c3-alt" type="number" step="50" value="200.0" placeholder="200.0 km Parking Orbit" />
        </div>
      </div>
      <div id="c3-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="c3-res-c3" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Launch Energy C3 = 9.00 km² / s²</span>
            <span class="stat-label">Characteristic Launch Energy (C3 = v_∞²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="c3-res-tmi" style="color:var(--green-dark); font-weight:700;">Injection Burn Δv_inj = 3.612 km / s | Injection Speed v_inj = 11.396 km/s</span>
            <span class="stat-label">Trans-Mars Injection Burn from 200 km LEO (v_inj = √(v_esc² + C3))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const viEl = document.getElementById('c3-vinf'), altEl = document.getElementById('c3-alt');
  const c3ResEl = document.getElementById('c3-res-c3'), tmResEl = document.getElementById('c3-res-tmi');

  const mu_E = 398600.4418; // km^3 / s^2
  const R_E = 6378.137; // km

  function update() {
    const v_inf = parseFloat(viEl.value), h_km = parseFloat(altEl.value);
    if (isNaN(v_inf) || isNaN(h_km) || v_inf < 0 || h_km < 0) return;

    // Characteristic energy C3: C3 = v_inf^2  [km^2 / s^2]
    const C3 = Math.pow(v_inf, 2);

    const r_park = R_E + h_km;

    // Circular parking velocity: v_park = sqrt( mu / r )
    const v_park = Math.sqrt(mu_E / r_park);

    // Escape velocity from parking orbit: v_esc = sqrt( 2 * mu / r )
    const v_esc = Math.sqrt(2.0 * mu_E / r_park);

    // Hyperbolic injection velocity at periapsis: v_inj = sqrt( v_esc^2 + v_inf^2 ) = sqrt( 2*mu/r + C3 )
    const v_inj = Math.sqrt(Math.pow(v_esc, 2) + C3);

    // Injection delta-v: Delta_v_inj = v_inj - v_park
    const delta_v_inj = v_inj - v_park;

    c3ResEl.textContent = 'Launch Energy C3 = ' + C3.toFixed(2) + ' km² / s²';
    tmResEl.textContent = 'Injection Burn Δv = ' + delta_v_inj.toFixed(3) + ' km/s (v_inj = ' + v_inj.toFixed(3) + ' km/s vs v_park = ' + v_park.toFixed(3) + ' km/s @ ' + h_km + ' km LEO)';
  }

  viEl.addEventListener('input', update);
  altEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter interplanetary hyperbolic excess arrival/departure velocity $v_\infty$ in km/s (from Porkchop plot analysis).',
      'Enter circular Low Earth Orbit parking altitude in km (typically 180–300 km).',
      'Inspect Characteristic Launch Energy C3 in $\text{km}^2/\text{s}^2$ and required Trans-Mars Injection (TMI) velocity burn $\Delta v_{\text{inj}}$.'
    ],
    benefitTitle: 'NASA Deep Space Mission Characteristic Energy Standard',
    benefitContent: 'Specifies the rocket launch vehicle payload capability curve ($M_{\text{payload}}$ vs C3) required to break free of Earth\'s gravity well and reach Mars, Jupiter, or the outer Solar System.',
    faqs: [{ q: 'What does C3 = 0 represent?', a: 'C3 = 0 represents a parabolic escape trajectory with exactly zero residual velocity at infinity ($v_\infty = 0$), precisely reaching the threshold to escape Earth\'s gravity.' }]
  },

  // 19. Multistage Rocket Optimal Delta-V Split Calculator
  {
    slug: 'rocket-staging-payload-fraction-optimal-delta-v-split-calculator',
    name: 'Multistage Rocket Optimal Delta-V Split & Payload Fraction Calculator',
    description: 'Calculate 2-stage and 3-stage orbital launch vehicle optimal stage mass distribution, payload ratio λ_pl, structural mass coefficients ε, and stage velocity distribution to reach orbital velocity (9.4 km/s).',
    category: 'Science',
    icon: 'text',
    keywords: ['rocket staging calculator', 'multistage rocket optimal delta v split formula online', 'payload fraction stage mass ratio calculator', 'two stage rocket sizing orbital launch calculator', 'rocket propulsion astronautics aerospace engineering online'],
    order: 1428,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Total Δv (m/s), Stage 1 I_sp (s), Stage 2 I_sp (s) & Structural Factor ε (e.g. 0.08)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rs-dv">Target Δv (m/s)</label>
          <input class="tool-textarea" id="rs-dv" type="number" step="250" value="9200.0" placeholder="9,200 m/s (LEO Target)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rs-isp1">Stage 1 I_sp (s)</label>
          <input class="tool-textarea" id="rs-isp1" type="number" step="10" value="300.0" placeholder="300.0 s (Booster Sea Level)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rs-isp2">Stage 2 I_sp (s)</label>
          <input class="tool-textarea" id="rs-isp2" type="number" step="10" value="380.0" placeholder="380.0 s (Upper Vac)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rs-eps">Structural ε</label>
          <input class="tool-textarea" id="rs-eps" type="number" step="0.01" value="0.08" placeholder="0.08 (8% Dry Weight)" />
        </div>
      </div>
      <div id="rs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rs-res-pl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Payload Fraction λ = 3.82% (3,820 kg / 100t)</span>
            <span class="stat-label">Total Orbit Payload Mass Delivery Fraction</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rs-res-split" style="color:var(--green-dark); font-weight:700;">Stage 1 Δv₁ = 4,150 m/s | Stage 2 Δv₂ = 5,050 m/s (Optimal Energy Split ✓)</span>
            <span class="stat-label">Optimal Equalized Lagrange Multiplier Staging Split</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dvEl = document.getElementById('rs-dv'), is1El = document.getElementById('rs-isp1');
  const is2El = document.getElementById('rs-isp2'), epEl = document.getElementById('rs-eps');
  const plResEl = document.getElementById('rs-res-pl'), spResEl = document.getElementById('rs-res-split');

  const g0 = 9.80665;

  function update() {
    const total_dv = parseFloat(dvEl.value), Isp1 = parseFloat(is1El.value);
    const Isp2 = parseFloat(is2El.value), eps = parseFloat(epEl.value);

    if (isNaN(total_dv) || isNaN(Isp1) || isNaN(Isp2) || isNaN(eps) || total_dv <= 0 || Isp1 <= 0 || Isp2 <= 0 || eps <= 0 || eps >= 0.5) return;

    const c1 = Isp1 * g0;
    const c2 = Isp2 * g0;

    // Optimal 2-stage split approx: higher Isp stage takes slightly higher delta-v
    const dv1 = total_dv * (c1 / (c1 + c2)) * 0.95;
    const dv2 = total_dv - dv1;

    // Mass ratios: R1 = exp(dv1 / c1), R2 = exp(dv2 / c2)
    const R1 = Math.exp(dv1 / c1);
    const R2 = Math.exp(dv2 / c2);

    // Payload fraction per stage: lambda_i = (1 - eps*R) / R  (if 1 - eps*R > 0)
    const lam1 = (1.0 - (eps * R1)) / R1;
    const lam2 = (1.0 - (eps * R2)) / R2;

    if (lam1 <= 0 || lam2 <= 0) {
      plResEl.textContent = 'STAGING INFEASIBLE (Single-stage payload negative)';
      plResEl.style.color = '#c53030';
      spResEl.textContent = 'Target Δv=' + total_dv + ' m/s exceeds physical limits with structural factor ε=' + eps + ' (Decrease Δv or structural mass)';
      return;
    }

    const total_payload_fraction = lam1 * lam2;
    const payload_pct = total_payload_fraction * 100.0;
    const payload_100t = Math.round(total_payload_fraction * 100000.0);

    plResEl.textContent = 'Payload Fraction λ = ' + payload_pct.toFixed(2) + '% (' + payload_100t.toLocaleString() + ' kg / 100t)';
    plResEl.style.color = '#22543d';
    spResEl.textContent = 'Stage 1 Δv₁ = ' + Math.round(dv1).toLocaleString() + ' m/s | Stage 2 Δv₂ = ' + Math.round(dv2).toLocaleString() + ' m/s (R₁=' + R1.toFixed(2) + ', R₂=' + R2.toFixed(2) + ')';
  }

  [dvEl, is1El, is2El, epEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total mission velocity requirement in m/s (typically 9,000–9,500 m/s for LEO with gravity losses).',
      'Enter Stage 1 booster average Specific Impulse in seconds (sea level).',
      'Enter Stage 2 upper stage vacuum Specific Impulse in seconds.',
      'Enter structural dry mass fraction $\epsilon = m_{\text{structure}} / (m_{\text{structure}} + m_{\text{propellant}})$ (typically 0.06 to 0.09).',
      'Inspect overall vehicle payload mass fraction $\lambda_{\text{pl}}$ and optimal $\Delta v$ velocity split per stage.'
    ],
    benefitTitle: 'Lagrange Multiplier Optimal Rocket Staging Law',
    benefitContent: 'Dropping empty propellant tanks in stages discards dead structural weight, turning an impossible single-stage mission into a practical orbital launch vehicle.',
    faqs: [{ q: 'Why is Single-Stage-To-Orbit (SSTO) so difficult on Earth?', a: 'Earth\'s deep gravity well requires $9.4\text{ km/s}$; with structural fractions $\epsilon \approx 8\%$, single-stage payload fraction is virtually zero ($< 0.5\%$).' }]
  },

  // 20. Hypersonic Atmospheric Re-Entry Heat Flux Calculator
  {
    slug: 'hypersonic-reentry-aerodynamic-heat-flux-fay-riddell-calculator',
    name: 'Hypersonic Atmospheric Re-Entry Stagnation Point Heat Flux (Fay-Riddell) Calculator',
    description: 'Calculate spacecraft hypersonic atmospheric re-entry nose cone stagnation point convective heat flux q_dot in W/cm² and MW/m² (Detra-Kemp-Riddell / Fay-Riddell Correlation: q_dot = C / √R_nose · √(ρ / ρ₀) · (v / v₀)^3) and total heat load.',
    category: 'Science',
    icon: 'text',
    keywords: ['hypersonic heat flux calculator', 'fay riddell stagnation point heating formula online', 'spacecraft atmospheric reentry heat shield calculator', 'nose radius blunt body heating w cm2 calculator', 'hypersonic aerothermodynamics space capsule tps online'],
    order: 1429,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Re-Entry Velocity v (km/s, e.g. 7.8 km/s LEO, 11.0 km/s Lunar), Altitude z (km) & Nose Radius R_n (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hr-v">Velocity v (km/s)</label>
          <input class="tool-textarea" id="hr-v" type="number" step="0.5" value="7.80" placeholder="7.80 km/s (LEO Reentry)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-z">Altitude z (km)</label>
          <input class="tool-textarea" id="hr-z" type="number" step="5" value="65.0" placeholder="65.0 km (Peak Heating)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-rn">Nose Radius R_n (m)</label>
          <input class="tool-textarea" id="hr-rn" type="number" step="0.5" value="1.50" placeholder="1.50 m (Blunt Capsule)" />
        </div>
      </div>
      <div id="hr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hr-res-qdot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Heat Flux q̇ = 145.2 W / cm² (1.45 MW/m²)</span>
            <span class="stat-label">Stagnation Point Convective Heat Flux (q̇ ∝ 1/√R_n · √ρ · v³)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hr-res-eval" style="color:var(--green-dark); font-weight:700;">ABLATIVE HEAT SHIELD REQUIRED (PICA-X / Carbon-Phenolic TPS Capable ✓)</span>
            <span class="stat-label">H. Julian Allen Blunt Body Aerodynamic Shock Stand-Off Benefit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('hr-v'), zEl = document.getElementById('hr-z'), rnEl = document.getElementById('hr-rn');
  const qdResEl = document.getElementById('hr-res-qdot'), evResEl = document.getElementById('hr-res-eval');

  function update() {
    const v_kms = parseFloat(vEl.value), z_km = parseFloat(zEl.value), R_n_m = parseFloat(rnEl.value);
    if (isNaN(v_kms) || isNaN(z_km) || isNaN(R_n_m) || v_kms <= 0 || z_km < 0 || R_n_m <= 0) return;

    // Atmospheric density at altitude z: rho = 1.225 * exp(-z / 8.5)  [kg / m^3]
    const rho = 1.225 * Math.exp(-z_km / 8.5);
    const rho_ratio = rho / 1.225;

    // Detra-Kemp-Riddell empirical correlation for stagnation heat flux:
    // q_dot (W / cm^2) approx (17415 / sqrt(R_n)) * sqrt(rho / rho0) * (v / 7925)^3.15
    const q_dot_W_cm2 = (110.0 / Math.sqrt(R_n_m)) * Math.sqrt(rho_ratio) * Math.pow(v_kms / 7.5, 3.15) * 100.0;
    const q_dot_MW_m2 = q_dot_W_cm2 * 0.01;

    let tps = '', color = '#22543d';
    if (q_dot_W_cm2 >= 500.0) {
      tps = 'SEVERE LUNAR/INTERPLANETARY HEATING (Phenolic Carbon Ablator Mandatory)';
      color = '#c53030';
    } else if (q_dot_W_cm2 >= 100.0) {
      tps = 'TYPICAL LEO ORBITAL RE-ENTRY (PICA-X / Reinforced Carbon-Carbon)';
      color = '#22543d';
    } else {
      tps = 'MODERATE HEATING (Ceramic Silica Tiles / Flexible Thermal Blankets)';
      color = '#22543d';
    }

    qdResEl.textContent = 'Heat Flux q̇ = ' + q_dot_W_cm2.toFixed(1) + ' W / cm² (' + q_dot_MW_m2.toFixed(2) + ' MW/m²)';
    evResEl.textContent = tps + ' [v = ' + v_kms + ' km/s @ z = ' + z_km + ' km, Nose Radius R_n = ' + R_n_m + ' m]';
    evResEl.style.color = color;
  }

  [vEl, zEl, rnEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter atmospheric re-entry entry speed v in km/s (7.8 km/s LEO, 11.0 km/s Apollo Lunar, 12.5 km/s Mars return).',
      'Enter peak heating trajectory altitude z in km (typically 55–70 km).',
      'Enter spacecraft heatshield nose sphere radius $R_n$ in meters (e.g. 1.0–2.0 m for blunt Apollo/Dragon capsules).',
      'Inspect convective stagnation point aerodynamic heat flux in $\text{W/cm}^2$ and $\text{MW/m}^2$.'
    ],
    benefitTitle: 'H. Julian Allen & A. J. Eggers 1953 Blunt Body Concept',
    benefitContent: 'Proves that a blunt nose cone creates a detached shock wave that deflects over $90\%$ of kinetic friction heat into the surrounding air flow ($\dot{q} \propto 1/\sqrt{R_n}$), protecting human space capsules.',
    faqs: [{ q: 'Why did early engineers incorrectly assume needle-sharp nose cones were best?', a: 'Needle points minimize aerodynamic drag, but direct shock attachment transfers almost all frictional heat directly into the metal skin, causing instant melting.' }]
  },

  // 21. Turbofan Engine Thrust Specific Fuel Consumption Calculator
  {
    slug: 'turbofan-engine-thrust-specific-fuel-consumption-tsfc-calculator',
    name: 'Turbofan Engine Thrust Specific Fuel Consumption (TSFC) & Bypass Ratio Calculator',
    description: 'Calculate commercial aviation turbofan engine Thrust Specific Fuel Consumption TSFC in g/(kN·s) and lbm/(lbf·hr) (TSFC = m_dot_fuel / F_thrust), Bypass Ratio BPR = m_dot_fan / m_dot_core, and thermal propulsive efficiency.',
    category: 'Science',
    icon: 'text',
    keywords: ['tsfc calculator', 'thrust specific fuel consumption formula online', 'turbofan bypass ratio bpr fuel burn calculator', 'jet engine propulsive thermal efficiency calculator', 'aircraft propulsion gas turbines aeronautical engineering online'],
    order: 1430,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fuel Flow Rate ṁ_f (kg/s), Net Thrust F (kN) & Bypass Ratio BPR (e.g. 10:1 to 12:1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tf-mf">Fuel Flow ṁ_f (kg/s)</label>
          <input class="tool-textarea" id="tf-mf" type="number" step="0.1" value="0.45" placeholder="0.45 kg/s Fuel" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tf-f">Thrust F (kN)</label>
          <input class="tool-textarea" id="tf-f" type="number" step="5" value="30.0" placeholder="30.0 kN (Cruise Thrust)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tf-bpr">Bypass Ratio BPR</label>
          <input class="tool-textarea" id="tf-bpr" type="number" step="1" value="11.0" placeholder="11.0 (Geared Turbofan)" />
        </div>
      </div>
      <div id="tf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tf-res-tsfc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">TSFC = 15.00 g / (kN · s) (0.530 lbm/lbf·hr)</span>
            <span class="stat-label">Thrust Specific Fuel Consumption (TSFC = ṁ_f / F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tf-res-eff" style="color:var(--green-dark); font-weight:700;">HIGH BYPASS ULTRA-EFFICIENT (BPR = 11:1: High Propulsive Efficiency η_p ≈ 85% ✓)</span>
            <span class="stat-label">Fuel Burn = 1,620 kg / hour per engine (3,571 lbf Thrust)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mfEl = document.getElementById('tf-mf'), fEl = document.getElementById('tf-f'), bpEl = document.getElementById('tf-bpr');
  const tsResEl = document.getElementById('tf-res-tsfc'), efResEl = document.getElementById('tf-res-eff');

  function update() {
    const mf_kg_s = parseFloat(mfEl.value), F_kN = parseFloat(fEl.value), BPR = parseFloat(bpEl.value);
    if (isNaN(mf_kg_s) || isNaN(F_kN) || isNaN(BPR) || mf_kg_s <= 0 || F_kN <= 0 || BPR < 0) return;

    // TSFC in SI units: g / (kN * s)
    const TSFC_g_kN_s = (mf_kg_s * 1000.0) / F_kN;

    // TSFC in Imperial English units: lbm / (lbf * hr)
    // 1 g/(kN*s) approx 0.03530 lbm/(lbf*hr)
    const TSFC_imperial = TSFC_g_kN_s * 0.0353039;

    // Fuel consumption per hour:
    const fuel_kg_hr = mf_kg_s * 3600.0;
    const F_lbf = F_kN * 224.809;

    tsResEl.textContent = 'TSFC = ' + TSFC_g_kN_s.toFixed(2) + ' g / (kN · s) (' + TSFC_imperial.toFixed(3) + ' lbm/(lbf·hr))';
    efResEl.textContent = 'Fuel Burn = ' + Math.round(fuel_kg_hr).toLocaleString() + ' kg/hr | Thrust = ' + Math.round(F_lbf).toLocaleString() + ' lbf (BPR = ' + BPR + ':1)';
  }

  [mfEl, fEl, bpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total engine kerosene Jet-A fuel mass flow rate $\dot{m}_f$ in kg/s.',
      'Enter net aerodynamic thrust force F in kN.',
      'Enter engine bypass ratio BPR (e.g. 5:1 for older CFM56, 11:1 for Leap/GTF).',
      'Inspect Thrust Specific Fuel Consumption in metric $\text{g/(kN}\cdot\text{s)}$ and imperial $\text{lbm/(lbf}\cdot\text{hr)}$, plus hourly fuel burn.'
    ],
    benefitTitle: 'Gas Turbine Propulsive Efficiency Standard',
    benefitContent: 'Increasing bypass ratio accelerates a larger mass of air at lower velocity ($F = \dot{m} \Delta v$), maximizing propulsive efficiency ($\eta_p = \frac{2}{1 + v_j/v}$) to slash airline fuel burn.',
    faqs: [{ q: 'Why do fighter jets use low bypass turbofans (BPR < 1.0)?', a: 'Fighter jets prioritize high exhaust jet velocity ($v_j$) and compact frontal cross-sectional area to achieve supersonic speed with minimum supersonic wave drag.' }]
  },

  // 22. Helicopter Rotor Hover Induced Velocity Calculator
  {
    slug: 'helicopter-rotor-hover-thrust-induced-power-momentum-theory-calculator',
    name: 'Helicopter Rotor Hover Induced Velocity & Momentum Theory Power Calculator',
    description: 'Calculate helicopter rotor hover aerodynamics: induced downwash inflow velocity v_i in m/s (Rankine-Froude Momentum Theory: v_i = √(T / (2·ρ·A))), ideal induced hover power P_i in kW (P_i = T · v_i), and Figure of Merit (FM).',
    category: 'Science',
    icon: 'text',
    keywords: ['helicopter rotor hover calculator', 'rotor induced downwash velocity formula vi online', 'momentum theory induced power calculator', 'rotor disc loading figure of merit calculator', 'helicopter aerodynamics rotorcraft flight mechanics online'],
    order: 1431,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gross Weight / Thrust T (kg or kN), Rotor Diameter D (m) & Air Density ρ (kg/m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hc-m">Gross Mass (kg)</label>
          <input class="tool-textarea" id="hc-m" type="number" step="500" value="4500.0" placeholder="4,500 kg (UH-60 Black Hawk)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-d">Rotor Dia D (m)</label>
          <input class="tool-textarea" id="hc-d" type="number" step="1" value="16.3" placeholder="16.3 m Rotor" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-fm">Figure Merit FM</label>
          <input class="tool-textarea" id="hc-fm" type="number" step="0.05" value="0.75" placeholder="0.75 (Aerodynamic FM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-rho">Air Density ρ</label>
          <input class="tool-textarea" id="hc-rho" type="number" step="0.05" value="1.225" placeholder="1.225 kg/m³" />
        </div>
      </div>
      <div id="hc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hc-res-vi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Induced Downwash v_i = 9.30 m / s (18.1 kts)</span>
            <span class="stat-label">Actuator Disk Induced Hover Inflow Velocity (v_i = √(T / (2·ρ·A)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hc-res-pwr" style="color:var(--green-dark); font-weight:700;">Hover Shaft Power = 547 kW (734 hp) | Disk Loading DL = 211 N/m² (4.4 psf)</span>
            <span class="stat-label">Actual Rotor Shaft Hover Power (P_actual = P_induced / FM)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('hc-m'), dEl = document.getElementById('hc-d');
  const fmEl = document.getElementById('hc-fm'), rhEl = document.getElementById('hc-rho');
  const viResEl = document.getElementById('hc-res-vi'), pwResEl = document.getElementById('hc-res-pwr');

  const g = 9.80665;

  function update() {
    const mass_kg = parseFloat(mEl.value), D_m = parseFloat(dEl.value);
    const FM = parseFloat(fmEl.value), rho = parseFloat(rhEl.value);

    if (isNaN(mass_kg) || isNaN(D_m) || isNaN(FM) || isNaN(rho) || mass_kg <= 0 || D_m <= 0 || FM <= 0 || FM > 1 || rho <= 0) return;

    // Hover thrust equals weight: T = m * g  [Newtons]
    const T_N = mass_kg * g;

    // Rotor disk area: A = pi * D^2 / 4  [m^2]
    const A_disk = (Math.PI * Math.pow(D_m, 2)) / 4.0;

    // Disk loading: DL = T / A  [N / m^2]
    const DL_N_m2 = T_N / A_disk;

    // Induced downwash velocity: v_i = sqrt( T / (2 * rho * A) )  [m / s]
    const v_i = Math.sqrt(T_N / (2.0 * rho * A_disk));
    const v_i_kts = v_i * 1.94384;

    // Ideal induced power: P_i = T * v_i  [Watts]
    const P_i_W = T_N * v_i;

    // Actual hover power accounting for profile drag & tip losses (FM = P_i / P_actual):
    const P_actual_W = P_i_W / FM;
    const P_actual_kW = P_actual_W / 1000.0;
    const P_actual_hp = P_actual_kW * 1.34102;

    viResEl.textContent = 'Induced Downwash v_i = ' + v_i.toFixed(2) + ' m / s (' + v_i_kts.toFixed(1) + ' kts)';
    pwResEl.textContent = 'Shaft Power = ' + Math.round(P_actual_kW) + ' kW (' + Math.round(P_actual_hp) + ' hp) | Disk Loading DL = ' + Math.round(DL_N_m2) + ' N/m² (FM = ' + FM + ')';
  }

  [mEl, dEl, fmEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total helicopter gross hovering weight in kg.',
      'Enter main rotor blade diameter D in meters.',
      'Enter rotor aerodynamic Figure of Merit (FM, typically 0.70 to 0.80).',
      'Enter ambient air density $\rho$ in $\text{kg/m}^3$.',
      'Inspect rotor downwash induced velocity $v_i$, rotor disk loading, and required hover turboshaft engine power in kW and horsepower.'
    ],
    benefitTitle: 'Rankine-Froude Actuator Disk Momentum Theory',
    benefitContent: 'Balances momentum flux across the rotor disk ($T = 2\rho A v_i^2$), sizing helicopter powertrains and eVTOL air taxi battery power requirements for out-of-ground-effect (OGE) hover.',
    faqs: [{ q: 'What is Ground Effect (IGE hover)?', a: 'When hovering within one rotor diameter of the ground ($h \le D$), the ground impedes downwash flow, reducing induced velocity $v_i$ and decreasing required engine power by $15\%\text{ to }25\%$.' }]
  },

  // 23. Parabolic Satellite Dish Antenna Gain Calculator
  {
    slug: 'parabolic-satellite-dish-antenna-gain-beamwidth-calculator',
    name: 'Parabolic Satellite Dish Antenna Gain (G = η·(πD/λ)²) & Beamwidth Calculator',
    description: 'Calculate satellite communications parabolic reflector dish antenna Gain G in dBi (G = 10 · log₁₀(η · (π·D / λ)²)), half-power 3-dB beamwidth θ_3dB in degrees (θ_3dB = 70 · λ / D), and effective aperture area.',
    category: 'Science',
    icon: 'text',
    keywords: ['parabolic dish antenna gain calculator', 'antenna gain formula dbi d over lambda online', 'half power beamwidth 3db dish calculator', 'satellite ground station dish antenna calculator', 'telecommunications rf satellite communications microwave online'],
    order: 1432,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dish Diameter D (m), Frequency f (GHz) & Aperture Efficiency η (0.55 to 0.75)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ds-d">Dish Dia D (m)</label>
          <input class="tool-textarea" id="ds-d" type="number" step="0.5" value="2.4" placeholder="2.4 m Dish" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ds-f">Freq f (GHz)</label>
          <input class="tool-textarea" id="ds-f" type="number" step="1" value="12.0" placeholder="12.0 GHz (Ku-Band)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ds-eta">Efficiency η</label>
          <input class="tool-textarea" id="ds-eta" type="number" step="0.05" value="0.65" placeholder="0.65 (65% Aperture)" />
        </div>
      </div>
      <div id="ds-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ds-res-g" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Antenna Gain G = 47.72 dBi (59,100× Directivity)</span>
            <span class="stat-label">Parabolic Reflector Peak Boresight Gain (G = η · (π·D / λ)²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ds-res-bw" style="color:var(--green-dark); font-weight:700;">3-dB Beamwidth θ = 0.73° | Wavelength λ = 2.50 cm (Narrow Pointing Beam)</span>
            <span class="stat-label">Half-Power 3-dB Beamwidth (θ_3dB ≈ 70 · λ / D)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('ds-d'), fEl = document.getElementById('ds-f'), etEl = document.getElementById('ds-eta');
  const gResEl = document.getElementById('ds-res-g'), bwResEl = document.getElementById('ds-res-bw');

  const c_light = 2.99792458e8;

  function update() {
    const D_m = parseFloat(dEl.value), f_GHz = parseFloat(fEl.value), eta = parseFloat(etEl.value);
    if (isNaN(D_m) || isNaN(f_GHz) || isNaN(eta) || D_m <= 0 || f_GHz <= 0 || eta <= 0 || eta > 1) return;

    // Wavelength: lambda = c / f  [m]
    const f_Hz = f_GHz * 1e9;
    const lambda_m = c_light / f_Hz;
    const lambda_cm = lambda_m * 100.0;

    // Linear Gain: G_lin = eta * ( pi * D / lambda )^2
    const G_lin = eta * Math.pow(Math.PI * D_m / lambda_m, 2);
    const G_dBi = 10.0 * Math.log10(G_lin);

    // 3-dB Half-power beamwidth in degrees: theta_3dB = 70 * lambda / D
    const theta_3dB_deg = 70.0 * (lambda_m / D_m);

    gResEl.textContent = 'Antenna Gain G = ' + G_dBi.toFixed(2) + ' dBi (' + Math.round(G_lin).toLocaleString() + '×)';
    bwResEl.textContent = '3-dB Beamwidth θ = ' + theta_3dB_deg.toFixed(2) + '° | λ = ' + lambda_cm.toFixed(2) + ' cm (D=' + D_m + ' m @ ' + f_GHz + ' GHz)';
  }

  [dEl, fEl, etEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter circular parabolic reflector dish diameter D in meters.',
      'Enter carrier radio microwave frequency f in GHz (e.g. 4 GHz C-band, 12 GHz Ku-band, 30 GHz Ka-band).',
      'Enter antenna aperture illumination efficiency $\eta$ (typically 0.60–0.70).',
      'Inspect peak boresight antenna gain in dBi and 3-dB half-power beamwidth in degrees.'
    ],
    benefitTitle: 'Aperture Diffraction Directivity Standard',
    benefitContent: 'Focuses spherical microwave radiation into a narrow laser-like pencil beam ($\text{Gain} \propto (D/\lambda)^2$), powering NASA Deep Space Network 70-meter dishes to communicate with Voyager probes beyond the solar system.',
    faqs: [{ q: 'Why does higher frequency increase antenna gain for the same dish size?', a: 'Higher frequency shortens wavelength $\lambda$; since $G \propto (D/\lambda)^2$, doubling frequency quadruples ($+6\text{ dB}$) antenna gain.' }]
  },

  // 24. Deep Space Satellite Link Budget & Free-Space Path Loss Calculator
  {
    slug: 'link-margin-friis-free-space-path-loss-eb-n0-calculator',
    name: 'Deep Space Satellite Link Budget & Free-Space Path Loss (FSPL) Calculator',
    description: 'Calculate satellite communications Link Budget Free-Space Path Loss FSPL in dB (Friis Transmission Equation: FSPL = 20·log₁₀(d) + 20·log₁₀(f) + 20·log₁₀(4π/c)), Received Power P_rx in dBm, and Energy per Bit to Noise Ratio E_b/N_0.',
    category: 'Science',
    icon: 'text',
    keywords: ['satellite link budget calculator', 'free space path loss fspl formula friis online', 'received power eb over n0 link margin calculator', 'deep space communications path loss calculator', 'satellite communications aerospace engineering rf online'],
    order: 1433,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Transmit Power P_tx (Watts), Tx Gain G_tx (dBi), Rx Gain G_rx (dBi), Freq f (GHz) & Distance d (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lk-ptx">Tx Power P_tx (W)</label>
          <input class="tool-textarea" id="lk-ptx" type="number" step="5" value="20.0" placeholder="20.0 Watts (Spacecraft)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lk-gtx">Tx Gain G_tx (dBi)</label>
          <input class="tool-textarea" id="lk-gtx" type="number" step="5" value="35.0" placeholder="35.0 dBi Dish" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lk-grx">Rx Gain G_rx (dBi)</label>
          <input class="tool-textarea" id="lk-grx" type="number" step="5" value="65.0" placeholder="65.0 dBi (DSN 70m)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lk-f">Freq f (GHz)</label>
          <input class="tool-textarea" id="lk-f" type="number" step="1" value="8.4" placeholder="8.4 GHz (X-Band)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lk-d">Dist d (Million km)</label>
          <input class="tool-textarea" id="lk-d" type="number" step="10" value="75.0" placeholder="75.0 M km (Mars Range)" />
        </div>
      </div>
      <div id="lk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lk-res-prx" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Received P_rx = -125.4 dBm (2.88 × 10⁻¹⁶ W)</span>
            <span class="stat-label">Received RF Carrier Power at Ground Station Dish Feed</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lk-res-fspl" style="color:var(--green-dark); font-weight:700;">Path Loss FSPL = 268.4 dB | EIRP = +48.0 dBW (+78.0 dBm) | Link Closed ✓</span>
            <span class="stat-label">Free-Space Path Loss (FSPL = (4π·d / λ)²) & Equivalent Isotropic Radiated Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ptxEl = document.getElementById('lk-ptx'), gtxEl = document.getElementById('lk-gtx');
  const grxEl = document.getElementById('lk-grx'), fEl = document.getElementById('lk-f'), dEl = document.getElementById('lk-d');
  const prResEl = document.getElementById('lk-res-prx'), fsResEl = document.getElementById('lk-res-fspl');

  const c_light = 2.99792458e8;

  function update() {
    const P_tx_W = parseFloat(ptxEl.value), G_tx_dBi = parseFloat(gtxEl.value);
    const G_rx_dBi = parseFloat(grxEl.value), f_GHz = parseFloat(fEl.value), d_Mkm = parseFloat(dEl.value);

    if (isNaN(P_tx_W) || isNaN(G_tx_dBi) || isNaN(G_rx_dBi) || isNaN(f_GHz) || isNaN(d_Mkm) || P_tx_W <= 0 || f_GHz <= 0 || d_Mkm <= 0) return;

    // Transmit power in dBm:
    const P_tx_dBm = 10.0 * Math.log10(P_tx_W * 1000.0);
    const EIRP_dBW = (10.0 * Math.log10(P_tx_W)) + G_tx_dBi;

    // Distance in meters:
    const d_m = d_Mkm * 1e9;
    const f_Hz = f_GHz * 1e9;

    // Free space path loss: FSPL = 20*log10(d) + 20*log10(f) + 20*log10(4*pi/c)  [dB]
    const FSPL_dB = (20.0 * Math.log10(d_m)) + (20.0 * Math.log10(f_Hz)) + (20.0 * Math.log10(4.0 * Math.PI / c_light));

    // Friis received power: P_rx = P_tx + G_tx + G_rx - FSPL  [dBm]
    const P_rx_dBm = P_tx_dBm + G_tx_dBi + G_rx_dBi - FSPL_dB;
    const P_rx_Watts = Math.pow(10.0, (P_rx_dBm - 30.0) / 10.0);

    prResEl.textContent = 'Received P_rx = ' + P_rx_dBm.toFixed(1) + ' dBm (' + P_rx_Watts.toExponential(2) + ' W)';
    fsResEl.textContent = 'Path Loss FSPL = ' + FSPL_dB.toFixed(1) + ' dB | EIRP = +' + EIRP_dBW.toFixed(1) + ' dBW (d=' + d_Mkm + ' Million km @ ' + f_GHz + ' GHz)';
  }

  [ptxEl, gtxEl, grxEl, fEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter satellite radio transmitter RF power output in Watts.',
      'Enter satellite high-gain antenna dish gain $G_{\text{tx}}$ in dBi.',
      'Enter receiving ground station antenna dish gain $G_{\text{rx}}$ in dBi (e.g. 65 dBi for a 70-meter deep space dish).',
      'Enter carrier radio frequency in GHz.',
      'Enter transmission distance in Millions of kilometers (e.g. 75 M km for Mars average).',
      'Inspect received power level $P_{\text{rx}}$ in dBm and total Free-Space Path Loss (FSPL) in dB.'
    ],
    benefitTitle: 'Harald T. Friis 1946 Free-Space Transmission Law',
    benefitContent: 'Quantifies inverse-square electromagnetic power spreading across interplanetary space ($P_{\text{rx}} \propto 1/d^2$), enabling NASA and ESA to size microwave amplifiers and receiver cryogenic low-noise amplifiers (LNAs).',
    faqs: [{ q: 'Why is received power measured in picowatts or femtowatts?', a: 'Across millions of kilometers, path loss exceeds $260\text{ dB}$ ($10^{-26}$), so even a 20 Watt transmitter delivers less than $10^{-15}\text{ Watts}$ to the receiver dish.' }]
  },

  // 25. Rocket Propellant Tank Ullage Volume & Blowdown Pressurization Calculator
  {
    slug: 'propellant-tank-ullage-volume-pressurization-blowdown-calculator',
    name: 'Rocket Propellant Tank Gas Ullage Volume & Blowdown Pressurization Calculator',
    description: 'Calculate liquid rocket propellant tank helium pressurization blowdown expansion: Final Tank Pressure p₂ in bar (Isentropic / Isothermal Gas Law: p₂ = p₁ · (V₁ / V₂)^γ), required Helium pressurant gas mass m_He in kg, and blowdown ratio.',
    category: 'Science',
    icon: 'text',
    keywords: ['rocket propellant tank pressurization calculator', 'helium ullage volume blowdown formula online', 'blowdown ratio propellant tank pressure drop calculator', 'pressurant gas mass helium ideal gas law calculator', 'rocket propulsion liquid engines aerospace online'],
    order: 1434,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Pressure p₁ (bar), Initial Ullage V₁ (Liters), Expelled Propellant Volume V_prop (L) & Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pt-p1">Initial p₁ (bar)</label>
          <input class="tool-textarea" id="pt-p1" type="number" step="5" value="30.0" placeholder="30.0 bar (Regulated)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pt-v1">Initial Ullage V₁ (L)</label>
          <input class="tool-textarea" id="pt-v1" type="number" step="10" value="50.0" placeholder="50.0 L (5% Ullage Space)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pt-vp">Propellant Vol (L)</label>
          <input class="tool-textarea" id="pt-vp" type="number" step="100" value="950.0" placeholder="950.0 L Propellant" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pt-temp">Gas Temp (K)</label>
          <input class="tool-textarea" id="pt-temp" type="number" step="20" value="293" placeholder="293 K (20 °C)" />
        </div>
      </div>
      <div id="pt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pt-res-p2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Final Pressure p₂ = 1.50 bar (20.0 : 1 Blowdown Ratio)</span>
            <span class="stat-label">Final Burnout Ullage Pressure (Isothermal Blowdown: p₂ = p₁ · V₁ / V₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pt-res-mhe" style="color:var(--green-dark); font-weight:700;">Required Helium Mass = 2.46 kg (Ideal Gas Law: m_He = p·V / (R_spec · T))</span>
            <span class="stat-label">Total Gaseous Helium Pressurant Mass (R_He = 2,077 J/(kg·K))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('pt-p1'), v1El = document.getElementById('pt-v1');
  const vpEl = document.getElementById('pt-vp'), tmEl = document.getElementById('pt-temp');
  const p2ResEl = document.getElementById('pt-res-p2'), mhResEl = document.getElementById('pt-res-mhe');

  const R_He = 2077.1; // J / (kg * K) for Helium gas

  function update() {
    const p1_bar = parseFloat(p1El.value), V1_L = parseFloat(v1El.value);
    const V_prop_L = parseFloat(vpEl.value), T_K = parseFloat(tmEl.value);

    if (isNaN(p1_bar) || isNaN(V1_L) || isNaN(V_prop_L) || isNaN(T_K) || p1_bar <= 0 || V1_L <= 0 || V_prop_L <= 0 || T_K <= 0) return;

    // Total final ullage volume: V2 = V1 + V_prop  [Liters -> m^3]
    const V2_L = V1_L + V_prop_L;
    const V1_m3 = V1_L * 1e-3;
    const V2_m3 = V2_L * 1e-3;
    const p1_Pa = p1_bar * 1e5;

    // Blowdown ratio: BR = V2 / V1
    const blowdown_ratio = V2_L / V1_L;

    // Isothermal final pressure: p2 = p1 * (V1 / V2)
    const p2_bar_isothermal = p1_bar * (V1_L / V2_L);

    // Helium mass required to pressurize initial volume V1 to p1:
    // m_He = p1 * V1 / (R_He * T)  [kg]
    const m_He_kg = (p1_Pa * V1_m3) / (R_He * T_K);

    p2ResEl.textContent = 'Final Pressure p₂ = ' + p2_bar_isothermal.toFixed(2) + ' bar (' + blowdown_ratio.toFixed(1) + ':1 Blowdown)';
    mhResEl.textContent = 'Helium Mass = ' + m_He_kg.toFixed(2) + ' kg | Total Tank Vol = ' + V2_L.toLocaleString() + ' L (p₁=' + p1_bar + ' bar @ ' + T_K + ' K)';
  }

  [p1El, v1El, vpEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial tank pre-charge pressurization pressure $p_1$ in bar.',
      'Enter initial gas ullage void space volume $V_1$ in Liters (typically 3%–5% of total tank volume).',
      'Enter usable liquid fuel/oxidizer propellant volume $V_{\text{prop}}$ to be drained in Liters.',
      'Enter gaseous helium pressurant storage temperature in Kelvin.',
      'Inspect final blowdown burnout pressure $p_2$, blowdown expansion ratio, and total Helium mass required in kg.'
    ],
    benefitTitle: 'Liquid Rocket Pressurant Sizing Standard',
    benefitContent: 'Calculates high-pressure Helium gas mass requirements to prevent propellant tank collapse, maintain structural stiffness, and supply cavitation-free Net Positive Suction Head (NPSH) to rocket turbopumps.',
    faqs: [{ q: 'Why is Helium universally used as rocket pressurant gas?', a: 'Helium is light ($M=4\text{ g/mol}$), chemically inert, non-flammable, and has the lowest boiling point of any element ($4.2\text{ K}$), preventing it from dissolving or freezing in cryogenic liquid oxygen or hydrogen.' }]
  }
];

pack51Tools.forEach(createTool);
console.log('Pack 51 complete: ' + pack51Tools.length + ' tools created.');
