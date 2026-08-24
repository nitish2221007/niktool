const { createTool } = require('./generate-curated-tools.cjs');

// Suite HH: 5 Tools in Meteorology, Heat Index, Wind Chill, VPD & Barometric Hypsometry to reach 478 tools
const toolsSuiteHH = [
  // 1. National Weather Service (NWS) Wind Chill Index Calculator
  {
    slug: 'wind-chill-temperature-index-calculator',
    name: 'Wind Chill Index & Frostbite Danger Calculator',
    description: 'Calculate effective Wind Chill apparent temperature (NWS formula: T_wc = 35.74 + 0.6215·T - 35.75·V^0.16 + 0.4275·T·V^0.16) and minutes to frostbite.',
    category: 'Daily',
    icon: 'text',
    keywords: ['wind chill calculator', 'nws wind chill temperature formula', 'apparent temperature wind chill online', 'frostbite time wind chill calculator', 'feels like winter cold calculator'],
    order: 349,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Air Temperature (°F) & Wind Speed (mph)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wc-temp">Air Temperature (°F)</label>
          <input class="tool-textarea" id="wc-temp" type="number" step="any" value="15" placeholder="15 °F (Must be ≤ 50°F)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-wind">Wind Speed (mph)</label>
          <input class="tool-textarea" id="wc-wind" type="number" step="any" value="25" placeholder="25 mph (Must be ≥ 3 mph)" />
        </div>
      </div>
      <div id="wc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wc-res-chill" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-4.1 °F (-20.1 °C)</span>
            <span class="stat-label">Calculated Wind Chill ("Feels Like")</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wc-res-danger" style="color:#d97706; font-weight:700;">Caution: 30 Mins to Frostbite</span>
            <span class="stat-label">Frostbite Danger Level</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('wc-temp'), wEl = document.getElementById('wc-wind');
  const cResEl = document.getElementById('wc-res-chill'), dResEl = document.getElementById('wc-res-danger');

  function update() {
    const T = parseFloat(tEl.value), V = parseFloat(wEl.value);
    if (isNaN(T) || isNaN(V) || V < 3 || T > 50) {
      cResEl.textContent = 'Enter T ≤ 50°F and V ≥ 3 mph';
      return;
    }

    // NWS Formula: T_wc = 35.74 + 0.6215*T - 35.75*(V^0.16) + 0.4275*T*(V^0.16)
    const vPow = Math.pow(V, 0.16);
    const wcF = 35.74 + (0.6215 * T) - (35.75 * vPow) + (0.4275 * T * vPow);
    const wcC = (wcF - 32) * (5 / 9);

    cResEl.textContent = wcF.toFixed(1) + ' °F (' + wcC.toFixed(1) + ' °C)';

    if (wcF < -35) {
      dResEl.textContent = 'EXTREME DANGER: Frostbite in Under 10 Mins!';
      dResEl.style.color = '#c53030';
    } else if (wcF < -18) {
      dResEl.textContent = 'DANGER: Frostbite in Under 30 Mins!';
      dResEl.style.color = '#c53030';
    } else if (wcF < 0) {
      dResEl.textContent = 'Caution: Hypothermia Risk on Exposed Skin';
      dResEl.style.color = '#d97706';
    } else {
      dResEl.textContent = 'Low Immediate Frostbite Risk';
      dResEl.style.color = '#22543d';
    }
  }

  tEl.addEventListener('input', update);
  wEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter ambient air temperature in Fahrenheit (°F) (valid for temperatures ≤ 50°F).',
      'Enter sustained wind speed in miles per hour (mph) (valid for speeds ≥ 3 mph).',
      'Inspect calculated Wind Chill apparent temperature and exposure danger time.'
    ],
    benefitTitle: 'NWS 2001 Joint Action Group Model',
    benefitContent: 'Developed by the National Weather Service, the modern wind chill index models convective heat loss from the human face (standing 5 ft off the ground into wind) to establish medical frostbite risk guidelines.',
    faqs: [{ q: 'Does wind chill affect inanimate objects like car engines?', a: 'No, wind chill only accelerates the rate of cooling down to ambient air temperature; an object cannot cool below actual air temperature.' }]
  },

  // 2. NOAA Heat Index & Apparent Summer Temperature Calculator
  {
    slug: 'heat-index-apparent-temperature-calculator',
    name: 'NOAA Heat Index & Summer Apparent Temperature Calculator',
    description: 'Calculate summer Heat Index ("Feels Like" temperature) and OSHA heat exhaustion danger levels from dry-bulb temperature (°F) and Relative Humidity (%).',
    category: 'Daily',
    icon: 'text',
    keywords: ['heat index calculator', 'noaa heat index formula', 'summer feels like temperature calculator', 'heat exhaustion danger humidity index', 'apparent temperature heat index online'],
    order: 350,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Air Temperature (°F) & Relative Humidity (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hi-temp">Air Temperature (°F)</label>
          <input class="tool-textarea" id="hi-temp" type="number" step="any" value="92" placeholder="92 °F (Must be ≥ 80°F)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hi-rh">Relative Humidity (%)</label>
          <input class="tool-textarea" id="hi-rh" type="number" min="1" max="100" value="65" placeholder="65%" />
        </div>
      </div>
      <div id="hi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hi-res-hi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">107.5 °F (41.9 °C)</span>
            <span class="stat-label">Calculated Heat Index ("Feels Like")</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hi-res-alert" style="color:#c53030; font-weight:700;">Danger (Heat Cramps / Exhaustion Likely)</span>
            <span class="stat-label">NOAA / OSHA Alert Category</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('hi-temp'), rhEl = document.getElementById('hi-rh');
  const hiResEl = document.getElementById('hi-res-hi'), alResEl = document.getElementById('hi-res-alert');

  function update() {
    const T = parseFloat(tEl.value), RH = parseFloat(rhEl.value);
    if (isNaN(T) || isNaN(RH) || T < 80 || RH < 0 || RH > 100) {
      hiResEl.textContent = 'Enter T ≥ 80°F and RH 0-100%';
      return;
    }

    // NOAA Rothfusz full regression formula:
    const HI = -42.379 + (2.04901523 * T) + (10.14333127 * RH) - (0.22475541 * T * RH) - (0.00683783 * T * T) - (0.05481717 * RH * RH) + (0.00122874 * T * T * RH) + (0.00085282 * T * RH * RH) - (0.00000199 * T * T * RH * RH);
    const hiC = (HI - 32) * (5 / 9);

    hiResEl.textContent = HI.toFixed(1) + ' °F (' + hiC.toFixed(1) + ' °C)';

    if (HI >= 130) {
      alResEl.textContent = 'EXTREME DANGER: Heatstroke Imminent (130°F+)';
      alResEl.style.color = '#7f1d1d';
    } else if (HI >= 105) {
      alResEl.textContent = 'DANGER: Heat Exhaustion Likely with Prolonged Activity (105-129°F)';
      alResEl.style.color = '#c53030';
    } else if (HI >= 90) {
      alResEl.textContent = 'Extreme Caution: Heat Cramps & Fatigue Possible (90-104°F)';
      alResEl.style.color = '#d97706';
    } else {
      alResEl.textContent = 'Caution: Fatigue Possible (80-89°F)';
      alResEl.style.color = '#22543d';
    }
  }

  tEl.addEventListener('input', update);
  rhEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter ambient summer dry-bulb temperature in Fahrenheit (°F) (valid for temperatures ≥ 80°F).',
      'Enter relative humidity percentage (%).',
      'Inspect NOAA Heat Index apparent temperature and OSHA workplace heat illness alert tier.'
    ],
    benefitTitle: 'Why High Humidity Blocks Evaporative Cooling',
    benefitContent: 'The human body cools itself by evaporating sweat from the skin into the air. When relative humidity is high, sweat cannot evaporate efficiently, causing core body temperatures to surge dangerously.',
    faqs: [{ q: 'What is the Heat Index at 92°F with 65% humidity?', a: 'The apparent Heat Index is 107.5°F (41.9°C), entering the OSHA Danger warning zone.' }]
  },

  // 3. Vapor Pressure Deficit (VPD) Horticulture Greenhouse Calculator
  {
    slug: 'vapor-pressure-deficit-vpd-horticulture-calculator',
    name: 'Vapor Pressure Deficit (VPD) Greenhouse Calculator',
    description: 'Calculate Vapor Pressure Deficit (VPD = VP_sat · (1 - RH/100)) in kiloPascals (kPa) for indoor hydroponics, greenhouse cultivation, and plant transpiration control.',
    category: 'Daily',
    icon: 'text',
    keywords: ['vpd calculator', 'vapor pressure deficit calculator', 'greenhouse vpd formula kpa', 'plant transpiration vpd chart', 'hydroponics leaf temperature vpd online'],
    order: 351,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Air Temp, Leaf Temp Offset & Relative Humidity',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vpd-air">Air Temp (°C)</label>
          <input class="tool-textarea" id="vpd-air" type="number" step="any" value="26.0" placeholder="26 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vpd-leaf">Leaf Temp Offset (°C)</label>
          <input class="tool-textarea" id="vpd-leaf" type="number" step="any" value="-1.5" placeholder="-1.5 °C (Transpiration Cooling)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vpd-rh">Relative Humidity (%)</label>
          <input class="tool-textarea" id="vpd-rh" type="number" min="1" max="100" value="60" placeholder="60%" />
        </div>
      </div>
      <div id="vpd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vpd-res-kpa" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.06 kPa</span>
            <span class="stat-label">Leaf Vapor Pressure Deficit (VPD)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vpd-res-stage" style="color:var(--green-dark); font-weight:700;">Optimal Vegetative / Early Flowering</span>
            <span class="stat-label">Horticultural Growth Zone</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('vpd-air'), lEl = document.getElementById('vpd-leaf'), rhEl = document.getElementById('vpd-rh');
  const kpaResEl = document.getElementById('vpd-res-kpa'), stResEl = document.getElementById('vpd-res-stage');

  // Tetens equation for saturation vapor pressure in kPa: VP_sat = 0.61078 * exp((17.27 * T) / (T + 237.3))
  function vpSat(tC) {
    return 0.61078 * Math.exp((17.27 * tC) / (tC + 237.3));
  }

  function update() {
    const airT = parseFloat(aEl.value), offsetT = parseFloat(lEl.value), rh = parseFloat(rhEl.value);
    if (isNaN(airT) || isNaN(offsetT) || isNaN(rh) || rh < 0 || rh > 100) return;

    const leafT = airT + offsetT;
    const vpLeafSat = vpSat(leafT);
    const vpAirSat = vpSat(airT);
    const vpAirActual = vpAirSat * (rh / 100);

    // Leaf VPD = VP_leaf_sat - VP_air_actual
    const vpd = vpLeafSat - vpAirActual;

    kpaResEl.textContent = vpd.toFixed(2) + ' kPa';

    if (vpd < 0.4) {
      stResEl.textContent = 'Too Low (< 0.4 kPa: Fungal Mildew & Stagnation Risk)';
      stResEl.style.color = '#c53030';
    } else if (vpd <= 0.8) {
      stResEl.textContent = 'Ideal Propagation / Rooting Zone (0.4 - 0.8 kPa)';
      stResEl.style.color = '#2563eb';
    } else if (vpd <= 1.2) {
      stResEl.textContent = 'Optimal Vegetative / Early Flower (0.8 - 1.2 kPa)';
      stResEl.style.color = '#22543d';
    } else if (vpd <= 1.6) {
      stResEl.textContent = 'Late Flowering / Ripening Zone (1.2 - 1.6 kPa)';
      stResEl.style.color = '#22543d';
    } else {
      stResEl.textContent = 'Too High (> 1.6 kPa: Plant Water Stress / Closed Stomata)';
      stResEl.style.color = '#c53030';
    }
  }

  [aEl, lEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter greenhouse ambient air temperature in Celsius.',
      'Enter infrared leaf temperature offset in Celsius (typically -1°C to -2°C due to evaporative cooling).',
      'Enter relative humidity percentage (%).',
      'Inspect Leaf VPD in kiloPascals (kPa) and horticultural growth target band.'
    ],
    benefitTitle: 'Driving Nutrient Uptake via Transpiration',
    benefitContent: 'VPD represents the drying power of the air: maintaining VPD between 0.8 and 1.2 kPa ensures plant stomata stay open for continuous CO₂ assimilation and calcium nutrient uptake without causing dehydration stress.',
    faqs: [{ q: 'What is ideal VPD for cannabis and vegetative crops?', a: '0.8 to 1.1 kPa for vegetative growth, increasing to 1.2 to 1.5 kPa during late flower/fruiting.' }]
  },

  // 4. Barometric Hypsometric Altimeter Elevation Calculator
  {
    slug: 'barometric-altitude-hypsometric-calculator',
    name: 'Barometric Altimeter & Hypsometric Elevation Calculator',
    description: 'Calculate physical altitude elevation (meters and feet) from measured barometric pressure (hPa/mbar or inHg) using the international barometric hypsometric formula.',
    category: 'Daily',
    icon: 'text',
    keywords: ['barometric altitude calculator', 'hypsometric formula elevation calculator', 'pressure to altitude calculator', 'hpa to elevation meters online', 'altimeter barometric pressure formula'],
    order: 352,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Station Pressure (hPa), Sea Level Reference & Temp',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="baro-p">Station Pressure (hPa / mbar)</label>
          <input class="tool-textarea" id="baro-p" type="number" step="any" value="850" placeholder="850 hPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="baro-p0">Sea Level QNH (hPa)</label>
          <input class="tool-textarea" id="baro-p0" type="number" step="any" value="1013.25" placeholder="1013.25 hPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="baro-temp">Temperature (°C)</label>
          <input class="tool-textarea" id="baro-temp" type="number" step="any" value="15" placeholder="15 °C" />
        </div>
      </div>
      <div id="baro-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="baro-res-alt-m" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,457 meters</span>
            <span class="stat-label">Calculated Elevation (Meters)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="baro-res-alt-ft" style="font-weight:700;">4,781 Feet</span>
            <span class="stat-label">Elevation in Feet</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('baro-p'), p0El = document.getElementById('baro-p0'), tEl = document.getElementById('baro-temp');
  const mResEl = document.getElementById('baro-res-alt-m'), ftResEl = document.getElementById('baro-res-alt-ft');

  function update() {
    const P = parseFloat(pEl.value), P0 = parseFloat(p0El.value), tempC = parseFloat(tEl.value);
    if (isNaN(P) || isNaN(P0) || isNaN(tempC) || P <= 0 || P0 <= 0) return;

    // International Standard Barometric Formula:
    // h = ( ((P0 / P)^(1 / 5.25588) - 1) * (tempC + 273.15) ) / 0.0065
    const altM = (((Math.pow(P0 / P, 1 / 5.25588)) - 1) * (tempC + 273.15)) / 0.0065;
    const altFt = altM * 3.28084;

    mResEl.textContent = Math.round(altM).toLocaleString() + ' meters';
    ftResEl.textContent = Math.round(altFt).toLocaleString() + ' Feet';
  }

  [pEl, p0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured absolute station barometric pressure in hPa/mbar from sensor.',
      'Enter regional sea-level calibrated reference pressure (standard 1013.25 hPa or current METAR QNH).',
      'Enter ambient temperature in Celsius.',
      'Inspect calculated physical altitude elevation in meters and feet.'
    ],
    benefitTitle: 'Standard Atmospheric Lapse Rate (-6.5°C / km)',
    benefitContent: 'Atmospheric pressure drops exponentially with altitude following the hydrostatic equation and the standard lapse rate (0.0065 K/m), allowing precise barometric altimetry in aircraft and GPS smartwatches.',
    faqs: [{ q: 'What is standard sea level pressure in hPa and inHg?', a: 'Standard sea level pressure is 1013.25 hPa (29.92 inHg).' }]
  },

  // 5. Wet-Bulb Globe Temperature (WBGT) Heat Stress Index Calculator
  {
    slug: 'wet-bulb-globe-temperature-wbgt-calculator',
    name: 'Wet-Bulb Globe Temperature (WBGT) Heat Stress Calculator',
    description: 'Calculate military and athletic Wet-Bulb Globe Temperature (WBGT = 0.7·T_w + 0.2·T_g + 0.1·T_d) to determine heat casualty flags and safe training work-rest cycles.',
    category: 'Daily',
    icon: 'text',
    keywords: ['wbgt calculator', 'wet bulb globe temperature formula', 'military wbgt flag conditions', 'heat stress work rest cycle calculator', 'outdoor athletic wbgt calculator online'],
    order: 353,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Wet-Bulb (T_w), Black Globe (T_g) & Dry-Bulb (T_d) Temps (°F)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wbgt-tw">Natural Wet-Bulb T_w (°F)</label>
          <input class="tool-textarea" id="wbgt-tw" type="number" step="any" value="82" placeholder="82 °F" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wbgt-tg">Black Globe T_g (°F)</label>
          <input class="tool-textarea" id="wbgt-tg" type="number" step="any" value="105" placeholder="105 °F (Radiant Heat)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wbgt-td">Dry-Bulb Air T_d (°F)</label>
          <input class="tool-textarea" id="wbgt-td" type="number" step="any" value="90" placeholder="90 °F (Shade Temp)" />
        </div>
      </div>
      <div id="wbgt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wbgt-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">87.4 °F (30.8 °C)</span>
            <span class="stat-label">Calculated WBGT Index</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wbgt-res-flag" style="color:#c53030; font-weight:700;">RED FLAG (88-89°F: 30m Work / 30m Rest)</span>
            <span class="stat-label">Military / NCAA Flag Condition</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const twEl = document.getElementById('wbgt-tw'), tgEl = document.getElementById('wbgt-tg'), tdEl = document.getElementById('wbgt-td');
  const valResEl = document.getElementById('wbgt-res-val'), flResEl = document.getElementById('wbgt-res-flag');

  function update() {
    const Tw = parseFloat(twEl.value), Tg = parseFloat(tgEl.value), Td = parseFloat(tdEl.value);
    if (isNaN(Tw) || isNaN(Tg) || isNaN(Td)) return;

    // Outdoor with solar load: WBGT = 0.7*Tw + 0.2*Tg + 0.1*Td
    const wbgtF = (0.7 * Tw) + (0.2 * Tg) + (0.1 * Td);
    const wbgtC = (wbgtF - 32) * (5 / 9);

    valResEl.textContent = wbgtF.toFixed(1) + ' °F (' + wbgtC.toFixed(1) + ' °C)';

    if (wbgtF >= 90) {
      flResEl.textContent = 'BLACK FLAG (≥90°F: Suspend Strenuous Outdoor Activity)';
      flResEl.style.color = '#111827';
    } else if (wbgtF >= 88) {
      flResEl.textContent = 'RED FLAG (88-89°F: Maximum 20m Work / 40m Rest)';
      flResEl.style.color = '#c53030';
    } else if (wbgtF >= 85) {
      flResEl.textContent = 'YELLOW FLAG (85-87°F: 30m Work / 30m Rest)';
      flResEl.style.color = '#d97706';
    } else if (wbgtF >= 82) {
      flResEl.textContent = 'GREEN FLAG (82-84°F: Heavy Exercise Discretion)';
      flResEl.style.color = '#22543d';
    } else {
      flResEl.textContent = 'WHITE FLAG (<82°F: Normal Activity)';
      flResEl.style.color = '#2563eb';
    }
  }

  [twEl, tgEl, tdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Natural Wet-Bulb temperature (T_w), Black Globe radiant temperature (T_g), and Dry-Bulb air temperature (T_d) in Fahrenheit.',
      'Inspect the composite WBGT index and corresponding US Military / NCAA Athletic Heat Flag status.'
    ],
    benefitTitle: 'Why WBGT is Superior to Simple Air Temperature',
    benefitContent: 'Unlike standard thermometer heat index, WBGT accounts for 4 environmental factors: air temperature, humidity (70% weighting), radiant solar sunshine (20%), and wind speed.',
    faqs: [{ q: 'What WBGT triggers Black Flag conditions?', a: 'WBGT ≥ 90.0°F (32.2°C) triggers Black Flag status, mandating the suspension of non-essential outdoor physical training.' }]
  }
];

toolsSuiteHH.forEach(createTool);
console.log('Suite HH complete: 5 tools created.');
