const { createTool } = require('./generate-curated-tools.cjs');

// Suite KKK: 5 Tools in Food Science, Sourdough Baker's Math, Brewing ABV & Autoclave Sterilization to reach 625 tools
const toolsSuiteKKK = [
  // 1. Baker's Percentage & Sourdough Dough Hydration Calculator
  {
    slug: 'bakers-percentage-dough-hydration-calculator',
    name: 'Baker\'s Percentage & Sourdough Dough Hydration Calculator',
    description: 'Calculate Baker\'s percentages (Ingredient % = (Weight / Total Flour Weight) · 100), total dough hydration %, and individual water, levain, and salt ingredient weights.',
    category: 'Daily',
    icon: 'chart',
    keywords: ['bakers percentage calculator', 'dough hydration calculator sourdough', 'flour water salt baker math online', 'artisan bread dough hydration formula', 'sourdough levain hydration calculator'],
    order: 498,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Flour Weight (g), Target Hydration (%), Salt (%) & Levain (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bk-flour">Total Flour (g)</label>
          <input class="tool-textarea" id="bk-flour" type="number" step="any" value="1000" placeholder="1000g Flour" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bk-hyd">Hydration (%)</label>
          <input class="tool-textarea" id="bk-hyd" type="number" step="0.5" value="75.0" placeholder="75.0% Water" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bk-salt">Salt (%)</label>
          <input class="tool-textarea" id="bk-salt" type="number" step="0.1" value="2.0" placeholder="2.0% Salt" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bk-lev">Sourdough Starter (%)</label>
          <input class="tool-textarea" id="bk-lev" type="number" step="1" value="20" placeholder="20% Levain" />
        </div>
      </div>
      <div id="bk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bk-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,970 g Total Dough</span>
            <span class="stat-label">Total Scaled Batch Dough Mass</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bk-res-break" style="font-weight:700;">750g Water | 20g Salt | 200g Levain</span>
            <span class="stat-label">Scaled Ingredient Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('bk-flour'), hEl = document.getElementById('bk-hyd');
  const sEl = document.getElementById('bk-salt'), lEl = document.getElementById('bk-lev');
  const totResEl = document.getElementById('bk-res-tot'), brkResEl = document.getElementById('bk-res-break');

  function update() {
    const flourG = parseFloat(fEl.value), hydPct = parseFloat(hEl.value);
    const saltPct = parseFloat(sEl.value), levPct = parseFloat(lEl.value);

    if (isNaN(flourG) || isNaN(hydPct) || isNaN(saltPct) || isNaN(levPct) || flourG <= 0) return;

    // Baker's Math: Flour = 100%
    const waterG = flourG * (hydPct / 100);
    const saltG = flourG * (saltPct / 100);
    const levainG = flourG * (levPct / 100);
    const totalDoughG = flourG + waterG + saltG + levainG;
    const totalPct = 100 + hydPct + saltPct + levPct;

    totResEl.textContent = Math.round(totalDoughG).toLocaleString() + ' g Total Dough (' + totalPct.toFixed(1) + '% Baker Total)';
    brkResEl.textContent = Math.round(waterG) + 'g Water (' + hydPct + '%) | ' + saltG.toFixed(1) + 'g Salt (' + saltPct + '%) | ' + Math.round(levainG) + 'g Levain (' + levPct + '%)';
  }

  [fEl, hEl, sEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total recipe flour weight in grams (always established as 100% baseline).',
      'Enter desired dough hydration percentage (typically 65% for sandwich loaves, 72-80% for open-crumb artisanal sourdough).',
      'Enter salt percentage (standard 2.0%) and levain / sourdough starter percentage (15-20%).',
      'Inspect exact scaled ingredient gram weights and total final dough batch mass.'
    ],
    benefitTitle: 'Professional Baker\'s Percentage Standard',
    benefitContent: 'In commercial bakery production, all ingredients are expressed as a percentage of total flour weight (Flour = 100%), allowing bakers to scale recipes from a single loaf up to 500 kilograms instantaneously.',
    faqs: [{ q: 'What is 75% hydration dough?', a: 'It means the dough contains exactly 75 grams of water for every 100 grams of flour in the recipe.' }]
  },

  // 2. Beer Brewing Alcohol by Volume (ABV) & Attenuation Calculator
  {
    slug: 'beer-brewing-abv-specific-gravity-calculator',
    name: 'Beer Brewing Alcohol by Volume (ABV) & Attenuation Calculator',
    description: 'Calculate beer alcohol by volume (ABV % = (OG - FG) · 131.25), apparent attenuation percentage, and calories per 12 oz bottle from Original Gravity (OG) and Final Gravity (FG) hydrometer readings.',
    category: 'Science',
    icon: 'text',
    keywords: ['beer abv calculator', 'alcohol by volume specific gravity formula', 'brewing apparent attenuation calculator', 'og fg abv calculator online', 'homebrew hydrometer alcohol calculator'],
    order: 499,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Original Gravity (OG) & Final Gravity (FG) Hydrometer Readings',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="abv-og">Original Gravity (OG)</label>
          <input class="tool-textarea" id="abv-og" type="number" step="0.001" value="1.065" placeholder="1.065 (IPA Wort)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="abv-fg">Final Gravity (FG)</label>
          <input class="tool-textarea" id="abv-fg" type="number" step="0.001" value="1.012" placeholder="1.012 (Finished Beer)" />
        </div>
      </div>
      <div id="abv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="abv-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6.96% ABV</span>
            <span class="stat-label">Alcohol by Volume (ABV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="abv-res-att" style="font-weight:700;">81.5% Apparent Attenuation</span>
            <span class="stat-label">Yeast Fermentation Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ogEl = document.getElementById('abv-og'), fgEl = document.getElementById('abv-fg');
  const pctResEl = document.getElementById('abv-res-pct'), attResEl = document.getElementById('abv-res-att');

  function update() {
    const OG = parseFloat(ogEl.value), FG = parseFloat(fgEl.value);
    if (isNaN(OG) || isNaN(FG) || OG <= FG || FG <= 0.990) return;

    // Standard formula: ABV = (OG - FG) * 131.25
    const abv = (OG - FG) * 131.25;
    // Apparent Attenuation = ((OG - FG) / (OG - 1.000)) * 100
    const attenuation = ((OG - FG) / (OG - 1.000)) * 100;
    // Approximate Calories per 12 oz: Cal ≈ [(6.9 * (ABW)) + 4.0 * (RE - 0.1)] * 3.55
    const abw = abv * 0.79336;
    const re = (0.1808 * ((OG - 1) * 1000)) + (0.8192 * ((FG - 1) * 1000));
    const cals = ((6.9 * abw) + 4.0 * ((re / 4) - 0.1)) * 3.55;

    pctResEl.textContent = abv.toFixed(2) + '% ABV (' + abw.toFixed(2) + '% ABW)';
    attResEl.textContent = attenuation.toFixed(1) + '% Attenuation (~' + Math.round(cals) + ' Cal / 12 oz)';
  }

  ogEl.addEventListener('input', update);
  fgEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter unfermented wort Original Gravity (OG) hydrometer reading (typically 1.040 to 1.090).',
      'Enter fermented finished beer Final Gravity (FG) reading (typically 1.006 to 1.018).',
      'Inspect Alcohol by Volume (ABV %), yeast apparent attenuation %, and calorie estimate.'
    ],
    benefitTitle: 'Specific Gravity Fermentation Chemistry',
    benefitContent: 'Yeast consumes dissolved malt sugars ($C_6H_{12}O_6$) and converts them into ethanol and carbon dioxide, lowering the liquid\'s density from sugary wort down toward the density of water (1.000 SG).',
    faqs: [{ q: 'What is typical apparent attenuation for brewer\'s yeast?', a: 'Standard ale yeasts attenuate 70% to 80% of fermentable wort sugars (saison and dry yeasts can reach 85%+).' }]
  },

  // 3. Food Thermal Sterilization (F₀ & D-Value Autoclave) Calculator
  {
    slug: 'food-thermal-death-time-f-value-sterilization-calculator',
    name: 'Food Thermal Sterilization (F₀ & D-Value) Autoclave Calculator',
    description: 'Calculate equivalent thermal sterilization lethality value (F₀ = Δt · 10^((T - 121.1) / z)) in minutes for industrial canning and Clostridium botulinum spore eradication.',
    category: 'Science',
    icon: 'text',
    keywords: ['f0 sterilization calculator', 'thermal death time d value z value formula', 'canning f0 autoclave lethality calculator', 'clostridium botulinum 12d reduction online', 'retort food sterilization f value calculator'],
    order: 500,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Retort Core Temp T (°C), Hold Time (min) & Temperature Sensitivity z (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="f0-temp">Core Retort Temp T (°C)</label>
          <input class="tool-textarea" id="f0-temp" type="number" step="any" value="125.0" placeholder="125.0 °C (Pressurized Retort)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="f0-time">Exposure Time Δt (min)</label>
          <input class="tool-textarea" id="f0-time" type="number" step="any" value="5.0" placeholder="5.0 min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="f0-z">Thermal Sensitivity z (°C)</label>
          <input class="tool-textarea" id="f0-z" type="number" step="0.1" value="10.0" placeholder="10.0 °C (Botulinum Spores)" />
        </div>
      </div>
      <div id="f0-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="f0-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">12.27 F₀ Minutes</span>
            <span class="stat-label">Equivalent Sterilization Lethality (F₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="f0-res-safe" style="color:var(--green-dark); font-weight:700;">SAFE Commercial Sterility (F₀ ≥ 3.0 min)</span>
            <span class="stat-label">FDA Low-Acid Canned Food Standard</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tempEl = document.getElementById('f0-temp'), timeEl = document.getElementById('f0-time'), zEl = document.getElementById('f0-z');
  const f0ResEl = document.getElementById('f0-res-val'), sfResEl = document.getElementById('f0-res-safe');

  function update() {
    const T = parseFloat(tempEl.value), dt = parseFloat(timeEl.value), z = parseFloat(zEl.value);
    if (isNaN(T) || isNaN(dt) || isNaN(z) || dt <= 0 || z <= 0) return;

    // Lethal Rate L = 10^( (T - 121.1) / z )
    const L = Math.pow(10, (T - 121.11) / z);
    // F0 = dt * L (equivalent minutes at 121.1°C / 250°F)
    const F0 = dt * L;

    f0ResEl.textContent = F0.toFixed(2) + ' F₀ Minutes (Lethal Rate L = ' + L.toFixed(2) + 'x)';

    if (F0 >= 12.0) {
      sfResEl.textContent = 'EXCEEDS 12-D "Botulinum Cook" (F₀ ≥ 12 min: Maximum Commercial Shelf Life)';
      sfResEl.style.color = '#22543d';
    } else if (F0 >= 3.0) {
      sfResEl.textContent = 'SAFE Commercial Sterility (F₀ ≥ 3.0 min: Minimum Safe Canning Threshold)';
      sfResEl.style.color = '#22543d';
    } else {
      sfResEl.textContent = 'UNSAFE INSUFFICIENT STERILITY (F₀ < 3.0 min: Spore Survival Risk)';
      sfResEl.style.color = '#c53030';
    }
  }

  [tempEl, timeEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pressurized autoclave/retort product core temperature in Celsius (°C).',
      'Enter continuous thermal exposure hold time in minutes.',
      'Enter thermal resistance constant z-value (standard 10.0°C for bacterial endospores).',
      'Inspect equivalent sterilization F₀ value in minutes at 121.1°C (250°F) and verify FDA commercial sterility.'
    ],
    benefitTitle: 'The 12-Decimal "Botulinum Cook" Principle',
    benefitContent: 'Because heat exponentially destroys bacteria, each 10°C increase in temperature increases sterilization speed tenfold ($L = 10^{(T - 121.1)/10}$); delivering $F_0 \ge 3\text{ to }12\text{ min}$ achieves a $10^{12}$-fold reduction in fatal spores.',
    faqs: [{ q: 'What does F₀ = 12 minutes mean?', a: 'It means the thermal processing cycle delivered the exact same bacterial spore destruction as holding the product at 121.1°C (250°F) for exactly 12 continuous minutes.' }]
  },

  // 4. Equilibrium Meat Brine Salinity Percentage Calculator
  {
    slug: 'meat-brine-salinity-equilibrium-percentage-calculator',
    name: 'Equilibrium Meat Brining Salinity Percentage Calculator',
    description: 'Calculate equilibrium brining salt percentage (Salt % = (Salt Mass / (Meat Mass + Water Mass + Salt Mass)) · 100) for uniform, impossible-to-oversalt charcuterie and poultry.',
    category: 'Daily',
    icon: 'chart',
    keywords: ['equilibrium brining calculator', 'meat brine salt percentage formula', 'charcuterie equilibrium curing calculator', 'wet brine salt to water ratio online', 'modernist cuisine equilibrium brine calculator'],
    order: 501,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Meat Mass (g), Water Mass (g) & Target Equilibrium Salt (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="brn-meat">Meat Mass (g)</label>
          <input class="tool-textarea" id="brn-meat" type="number" step="any" value="1500" placeholder="1500g (Pork Shoulder / Turkey)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brn-water">Water Mass (g)</label>
          <input class="tool-textarea" id="brn-water" type="number" step="any" value="1000" placeholder="1000g Water" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brn-pct">Target Salt (%)</label>
          <input class="tool-textarea" id="brn-pct" type="number" step="0.1" value="1.5" placeholder="1.5% (Chef Standard)" />
        </div>
      </div>
      <div id="brn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="brn-res-salt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">38.1 g Salt</span>
            <span class="stat-label">Required Pure Salt (NaCl)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="brn-res-tot" style="font-weight:700;">2,538 g Total System</span>
            <span class="stat-label">Total Equilibrium System Mass</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('brn-meat'), wEl = document.getElementById('brn-water'), pEl = document.getElementById('brn-pct');
  const sResEl = document.getElementById('brn-res-salt'), tResEl = document.getElementById('brn-res-tot');

  function update() {
    const meatG = parseFloat(mEl.value), waterG = parseFloat(wEl.value), saltPct = parseFloat(pEl.value);
    if (isNaN(meatG) || isNaN(waterG) || isNaN(saltPct) || meatG <= 0 || waterG < 0 || saltPct <= 0 || saltPct >= 100) return;

    // Equilibrium formula: Salt / (Meat + Water + Salt) = (saltPct / 100)
    // Salt * (1 - saltPct/100) = (Meat + Water) * (saltPct / 100)
    // Salt = (Meat + Water) * (saltPct / 100) / (1 - (saltPct / 100))
    const p = saltPct / 100;
    const saltG = ((meatG + waterG) * p) / (1 - p);
    const totalMass = meatG + waterG + saltG;

    sResEl.textContent = saltG.toFixed(1) + ' g Salt (Pure Kosher/Sea Salt)';
    tResEl.textContent = Math.round(totalMass).toLocaleString() + ' g System (' + saltPct.toFixed(1) + '% Equilibrium Salinity)';
  }

  [mEl, wEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw meat / poultry weight in grams.',
      'Enter water added to cover the meat in grams (1 ml water = 1 gram).',
      'Enter target finished salt percentage (1.25% to 1.75% standard for perfectly seasoned meat).',
      'Inspect exact grams of salt to add to the container.'
    ],
    benefitTitle: 'Modernist Equilibrium Brining vs Traditional Gradient Brining',
    benefitContent: 'Traditional brines use concentrated 6-10% salt solutions that over-salt meat if left in too long; equilibrium brining balances total system mass at exactly 1.5% salt, making it physically impossible to over-salt meat even if soaked for a week.',
    faqs: [{ q: 'What is the optimal salt percentage for equilibrium brining chicken or pork?', a: '1.5% total salt by weight delivers optimal juiciness, tenderness, and seasoning without being overly salty.' }]
  },

  // 5. Gelatin Bloom Strength Mass Conversion Calculator
  {
    slug: 'gelatin-bloom-strength-mass-converter',
    name: 'Gelatin Bloom Strength Mass Converter (Bronze, Silver, Gold, Platinum)',
    description: 'Convert recipe gelatin mass between different Bloom gel strengths (Bronze 140, Silver 160, Gold 200, Platinum 250) using the Bloom conversion rule (m₂ = m₁ · √(Bloom₁ / Bloom₂)).',
    category: 'Daily',
    icon: 'chart',
    keywords: ['gelatin bloom converter', 'gelatin bloom strength mass formula', 'bronze silver gold platinum gelatin converter', 'gelatin sheet to powder bloom calculator', 'pastry gelatin bloom conversion online'],
    order: 502,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Original Gelatin Mass (g), Source Bloom Rating & Target Bloom Rating',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gel-m1">Original Mass m₁ (g)</label>
          <input class="tool-textarea" id="gel-m1" type="number" step="any" value="10.0" placeholder="10.0g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gel-b1">Original Gelatin Bloom</label>
          <select class="tool-textarea" id="gel-b1">
            <option value="140">Bronze (140 Bloom)</option>
            <option value="160">Silver (160 Bloom)</option>
            <option value="200" selected>Gold (200 Bloom - Standard)</option>
            <option value="250">Platinum (250 Bloom)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="gel-b2">Target Gelatin Bloom</label>
          <select class="tool-textarea" id="gel-b2">
            <option value="140">Bronze (140 Bloom)</option>
            <option value="160">Silver (160 Bloom)</option>
            <option value="200">Gold (200 Bloom)</option>
            <option value="250" selected>Platinum (250 Bloom)</option>
          </select>
        </div>
      </div>
      <div id="gel-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gel-res-m2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.94 g</span>
            <span class="stat-label">Equivalent Target Gelatin Mass (m₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gel-res-ratio" style="font-weight:700;">0.894x Mass Factor</span>
            <span class="stat-label">Strength Scaling Ratio (√(Bloom₁ / Bloom₂))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('gel-m1'), b1El = document.getElementById('gel-b1'), b2El = document.getElementById('gel-b2');
  const m2ResEl = document.getElementById('gel-res-m2'), ratResEl = document.getElementById('gel-res-ratio');

  function update() {
    const m1 = parseFloat(m1El.value), b1 = parseFloat(b1El.value), b2 = parseFloat(b2El.value);
    if (isNaN(m1) || isNaN(b1) || isNaN(b2) || m1 <= 0) return;

    // Bloom conversion rule: m2 = m1 * sqrt( Bloom1 / Bloom2 )
    const ratio = Math.sqrt(b1 / b2);
    const m2 = m1 * ratio;

    m2ResEl.textContent = m2.toFixed(2) + ' g Target Gelatin';
    ratResEl.textContent = ratio.toFixed(3) + 'x Mass Multiplier (' + b1 + ' Bloom → ' + b2 + ' Bloom)';
  }

  [m1El, b1El, b2El].forEach(el => el.addEventListener('input', update));
  b1El.addEventListener('change', update);
  b2El.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter original recipe gelatin mass in grams.',
      'Select source recipe gelatin Bloom rating (Bronze 140, Silver 160, Gold 200, Platinum 250).',
      'Select target available gelatin Bloom rating.',
      'Inspect adjusted gelatin gram weight maintaining identical jelly firmness.'
    ],
    benefitTitle: 'Oscar T. Bloom\'s 1925 Gelometer Test',
    benefitContent: 'Gel strength scales with the square root of Bloom value ($m_2 = m_1\cdot\sqrt{\text{Bloom}_1/\text{Bloom}_2}$); higher-Bloom gelatins form firmer gels at lower temperatures with higher clarity and zero savory odor.',
    faqs: [{ q: 'How much Platinum (250 Bloom) gelatin replaces 10g of Gold (200 Bloom)?', a: '$m_2 = 10 \times \sqrt{200 / 250} = 10 \times \sqrt{0.80} \approx 8.94\text{ grams}$.' }]
  }
];

toolsSuiteKKK.forEach(createTool);
console.log('Suite KKK complete: 5 tools created.');
