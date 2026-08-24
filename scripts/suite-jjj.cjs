const { createTool } = require('./generate-curated-tools.cjs');

// Suite JJJ: 5 Tools in Geodesy, Navigation, Haversine Distance & Magnetic Heading to reach 620 tools
const toolsSuiteJJJ = [
  // 1. Haversine Great-Circle Distance Calculator
  {
    slug: 'haversine-great-circle-distance-calculator',
    name: 'Haversine Great-Circle Distance & Flight Path Calculator',
    description: 'Calculate spherical great-circle flight distance between two GPS coordinates (Latitude/Longitude) using the Haversine formula (Earth radius R = 6,371 km).',
    category: 'Science',
    icon: 'text',
    keywords: ['haversine distance calculator', 'great circle flight distance formula', 'lat long distance calculator km miles', 'gps coordinate distance formula online', 'spherical trigonometry distance online'],
    order: 493,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Origin (Lat₁, Lon₁) & Destination (Lat₂, Lon₂) in Decimal Degrees',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hav-lat1">Origin Lat₁ (°)</label>
          <input class="tool-textarea" id="hav-lat1" type="number" step="any" value="40.7128" placeholder="40.7128° (New York)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hav-lon1">Origin Lon₁ (°)</label>
          <input class="tool-textarea" id="hav-lon1" type="number" step="any" value="-74.0060" placeholder="-74.0060°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hav-lat2">Dest Lat₂ (°)</label>
          <input class="tool-textarea" id="hav-lat2" type="number" step="any" value="51.5074" placeholder="51.5074° (London)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hav-lon2">Dest Lon₂ (°)</label>
          <input class="tool-textarea" id="hav-lon2" type="number" step="any" value="-0.1278" placeholder="-0.1278°" />
        </div>
      </div>
      <div id="hav-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hav-res-km" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5,570 km (3,461 Miles)</span>
            <span class="stat-label">Great-Circle Distance</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hav-res-nm" style="font-weight:700;">3,008 Nautical Miles</span>
            <span class="stat-label">Aviation / Marine Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lat1El = document.getElementById('hav-lat1'), lon1El = document.getElementById('hav-lon1');
  const lat2El = document.getElementById('hav-lat2'), lon2El = document.getElementById('hav-lon2');
  const kmResEl = document.getElementById('hav-res-km'), nmResEl = document.getElementById('hav-res-nm');

  const R_Earth_km = 6371.0;

  function toRad(deg) { return (deg * Math.PI) / 180; }

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = toRad(lat1), phi2 = toRad(lat2);
    const dPhi = toRad(lat2 - lat1);
    const dLam = toRad(lon2 - lon1);

    // a = sin^2(dPhi/2) + cos(phi1) * cos(phi2) * sin^2(dLam/2)
    const a = Math.pow(Math.sin(dPhi / 2), 2) + Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(dLam / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distKm = R_Earth_km * c;
    const distMiles = distKm * 0.621371;
    const distNm = distKm * 0.539957;

    kmResEl.textContent = Math.round(distKm).toLocaleString() + ' km (' + Math.round(distMiles).toLocaleString() + ' Miles)';
    nmResEl.textContent = Math.round(distNm).toLocaleString() + ' Nautical Miles (Flight Path)';
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter origin starting GPS latitude and longitude in decimal degrees.',
      'Enter destination arrival GPS latitude and longitude.',
      'Inspect shortest curved great-circle flight navigation distance in kilometers, statute miles, and nautical miles.'
    ],
    benefitTitle: 'James Inman\'s 1835 Haversine Navigation Equation',
    benefitContent: 'Because straight lines on flat maps distort true spherical distances, transoceanic commercial flights fly curved great-circle routes (e.g. over Greenland from NYC to London) to save thousands of miles of jet fuel.',
    faqs: [{ q: 'What is the great-circle distance between New York and London?', a: 'Approximately 5,570 km (3,461 statute miles or 3,008 nautical miles).' }]
  },

  // 2. Initial Compass Bearing & Forward Azimuth Calculator
  {
    slug: 'initial-compass-bearing-forward-azimuth-calculator',
    name: 'Initial Compass Bearing & Forward Azimuth Navigation Calculator',
    description: 'Calculate initial great-circle forward azimuth navigation course heading (θ = atan2(sin Δλ · cos φ₂, cos φ₁ · sin φ₂ - sin φ₁ · cos φ₂ · cos Δλ)) between GPS coordinates.',
    category: 'Science',
    icon: 'text',
    keywords: ['compass bearing calculator', 'forward azimuth formula online', 'initial navigation heading calculator', 'lat long to compass bearing degrees', 'great circle initial course calculator'],
    order: 494,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Origin (Lat₁, Lon₁) & Destination (Lat₂, Lon₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="brg-lat1">Start Lat₁ (°)</label>
          <input class="tool-textarea" id="brg-lat1" type="number" step="any" value="37.7749" placeholder="37.7749° (San Francisco)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-lon1">Start Lon₁ (°)</label>
          <input class="tool-textarea" id="brg-lon1" type="number" step="any" value="-122.4194" placeholder="-122.4194°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-lat2">Dest Lat₂ (°)</label>
          <input class="tool-textarea" id="brg-lat2" type="number" step="any" value="35.6762" placeholder="35.6762° (Tokyo)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-lon2">Dest Lon₂ (°)</label>
          <input class="tool-textarea" id="brg-lon2" type="number" step="any" value="139.6503" placeholder="139.6503°" />
        </div>
      </div>
      <div id="brg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="brg-res-deg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">302.5° (WNW)</span>
            <span class="stat-label">Initial True Heading Course</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="brg-res-quad" style="font-weight:700;">N 57.5° W</span>
            <span class="stat-label">Quadrant Compass Bearing</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lat1El = document.getElementById('brg-lat1'), lon1El = document.getElementById('brg-lon1');
  const lat2El = document.getElementById('brg-lat2'), lon2El = document.getElementById('brg-lon2');
  const dResEl = document.getElementById('brg-res-deg'), qResEl = document.getElementById('brg-res-quad');

  function toRad(deg) { return (deg * Math.PI) / 180; }

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = toRad(lat1), phi2 = toRad(lat2);
    const dLam = toRad(lon2 - lon1);

    // y = sin(dLam) * cos(phi2)
    // x = cos(phi1) * sin(phi2) - sin(phi1) * cos(phi2) * cos(dLam)
    const y = Math.sin(dLam) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLam);

    let bearingRad = Math.atan2(y, x);
    let bearingDeg = (bearingRad * 180) / Math.PI;
    bearingDeg = (bearingDeg + 360) % 360;

    const compassPoints = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const ptIdx = Math.round(bearingDeg / 22.5) % 16;
    const ptName = compassPoints[ptIdx];

    dResEl.textContent = bearingDeg.toFixed(1) + '° (' + ptName + ')';
    qResEl.textContent = (bearingDeg > 180 ? 'N ' + (360 - bearingDeg).toFixed(1) + '° W' : 'N ' + bearingDeg.toFixed(1) + '° E');
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter departure airport/port GPS latitude and longitude.',
      'Enter destination waypoint GPS latitude and longitude.',
      'Inspect initial forward azimuth true heading in degrees (0° to 360°) and 16-point cardinal compass direction.'
    ],
    benefitTitle: 'Spherical Azimuth Navigation Geometry',
    benefitContent: 'Along a spherical great-circle path, compass heading changes continuously; the forward azimuth calculates the exact initial heading an aircraft autopilot must establish at departure.',
    faqs: [{ q: 'Why does flying from San Francisco to Tokyo (similar latitude) start out heading North-West?', a: 'Because the spherical curvature of Earth curves toward the Arctic; flying northwest across the North Pacific is shorter than flying due West along a parallel of latitude.' }]
  },

  // 3. Rhumb Line (Loxodrome) Constant Compass Bearing Distance Calculator
  {
    slug: 'rhumb-line-loxodrome-distance-bearing-calculator',
    name: 'Rhumb Line (Loxodrome) Constant Bearing Navigation Calculator',
    description: 'Calculate constant compass heading navigation course and Mercator sailing distance (Rhumb line / Loxodrome) between geographic coordinates.',
    category: 'Science',
    icon: 'text',
    keywords: ['rhumb line distance calculator', 'loxodrome navigation formula', 'constant compass bearing calculator', 'mercator sailing rhumb line online', 'rhumb line vs great circle calculator'],
    order: 495,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Origin (Lat₁, Lon₁) & Destination (Lat₂, Lon₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rl-lat1">Origin Lat₁ (°)</label>
          <input class="tool-textarea" id="rl-lat1" type="number" step="any" value="25.7617" placeholder="25.7617° (Miami)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-lon1">Origin Lon₁ (°)</label>
          <input class="tool-textarea" id="rl-lon1" type="number" step="any" value="-80.1918" placeholder="-80.1918°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-lat2">Dest Lat₂ (°)</label>
          <input class="tool-textarea" id="rl-lat2" type="number" step="any" value="38.7223" placeholder="38.7223° (Lisbon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-lon2">Dest Lon₂ (°)</label>
          <input class="tool-textarea" id="rl-lon2" type="number" step="any" value="-9.1393" placeholder="-9.1393°" />
        </div>
      </div>
      <div id="rl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rl-res-hdg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">072.8° True</span>
            <span class="stat-label">Constant Rhumb Line Bearing</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rl-res-dist" style="font-weight:700;">6,758 km (3,649 NM)</span>
            <span class="stat-label">Loxodromic Sailing Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lat1El = document.getElementById('rl-lat1'), lon1El = document.getElementById('rl-lon1');
  const lat2El = document.getElementById('rl-lat2'), lon2El = document.getElementById('rl-lon2');
  const hdgResEl = document.getElementById('rl-res-hdg'), dstResEl = document.getElementById('rl-res-dist');

  const R_Earth_km = 6371.0;
  function toRad(deg) { return (deg * Math.PI) / 180; }

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = toRad(lat1), phi2 = toRad(lat2);
    const dPhi = phi2 - phi1;
    let dLam = toRad(lon2 - lon1);

    // Projected latitude change on Mercator chart: dPsi = ln( tan(pi/4 + phi2/2) / tan(pi/4 + phi1/2) )
    const dPsi = Math.log(Math.tan(Math.PI / 4 + phi2 / 2) / Math.tan(Math.PI / 4 + phi1 / 2));

    // Wrap delta longitude between -pi and +pi
    if (Math.abs(dLam) > Math.PI) {
      dLam = dLam > 0 ? -(2 * Math.PI - dLam) : (2 * Math.PI + dLam);
    }

    // Bearing theta = atan2(dLam, dPsi)
    const bearingRad = Math.atan2(dLam, dPsi);
    let bearingDeg = (bearingRad * 180) / Math.PI;
    bearingDeg = (bearingDeg + 360) % 360;

    // Distance q = dPhi / dPsi (or cos(phi1) if dPsi -> 0 along parallel)
    const q = Math.abs(dPsi) > 1e-10 ? dPhi / dPsi : Math.cos(phi1);
    const distKm = Math.sqrt(dPhi * dPhi + q * q * dLam * dLam) * R_Earth_km;
    const distNm = distKm * 0.539957;

    hdgResEl.textContent = bearingDeg.toFixed(1) + '° True Heading';
    dstResEl.textContent = Math.round(distKm).toLocaleString() + ' km (' + Math.round(distNm).toLocaleString() + ' NM Sailing Distance)';
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter departure starting GPS coordinates in decimal degrees.',
      'Enter destination arrival GPS coordinates.',
      'Inspect constant Rhumb line compass steering heading and total Mercator sailing distance.'
    ],
    benefitTitle: 'Pedro Nunes & Gerardus Mercator\'s 1569 Sailing Line',
    benefitContent: 'A rhumb line (loxodrome) cuts all meridians of longitude at the exact same constant angle, allowing traditional ship captains to lock a single compass heading for the entire oceanic voyage without continuous helm recalculations.',
    faqs: [{ q: 'What is the difference between a Great Circle and a Rhumb Line?', a: 'A Great Circle is the shortest physical distance on Earth (curved course heading), while a Rhumb Line maintains one constant compass bearing but covers slightly greater total distance.' }]
  },

  // 4. UTM Grid Convergence Angle & Point Scale Factor Calculator
  {
    slug: 'utm-grid-convergence-scale-factor-calculator',
    name: 'UTM Grid Convergence Angle & Point Scale Factor Calculator',
    description: 'Calculate Universal Transverse Mercator (UTM) Grid Convergence angle (γ = Δλ · sin φ) and Transverse Mercator point scale distortion factor k.',
    category: 'Science',
    icon: 'text',
    keywords: ['utm grid convergence calculator', 'utm scale factor calculator', 'transverse mercator grid angle formula', 'utm central meridian convergence online', 'land surveying utm distortion calculator'],
    order: 496,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Latitude φ (°), Longitude λ (°) & UTM Central Meridian (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="utm-lat">Latitude φ (°)</label>
          <input class="tool-textarea" id="utm-lat" type="number" step="any" value="34.0522" placeholder="34.0522° (Los Angeles)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="utm-lon">Longitude λ (°)</label>
          <input class="tool-textarea" id="utm-lon" type="number" step="any" value="-118.2437" placeholder="-118.2437°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="utm-cm">Zone Central Meridian (°)</label>
          <input class="tool-textarea" id="utm-cm" type="number" step="any" value="-117.0" placeholder="-117.0° (UTM Zone 11)" />
        </div>
      </div>
      <div id="utm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="utm-res-gamma" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-0.70° (-41.8 arcmin)</span>
            <span class="stat-label">Grid Convergence Angle (γ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="utm-res-k" style="font-weight:700;">k = 0.99978</span>
            <span class="stat-label">Grid Point Scale Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const latEl = document.getElementById('utm-lat'), lonEl = document.getElementById('utm-lon'), cmEl = document.getElementById('utm-cm');
  const gResEl = document.getElementById('utm-res-gamma'), kResEl = document.getElementById('utm-res-k');

  const k0 = 0.9996; // Standard UTM central meridian scale factor

  function update() {
    const lat = parseFloat(latEl.value), lon = parseFloat(lonEl.value), cm = parseFloat(cmEl.value);
    if (isNaN(lat) || isNaN(lon) || isNaN(cm) || lat < -80 || lat > 84) return;

    const phiRad = (lat * Math.PI) / 180;
    const dLamDeg = lon - cm;
    const dLamRad = (dLamDeg * Math.PI) / 180;

    // First-order grid convergence: gamma = dLam * sin(phi)
    const gammaDeg = dLamDeg * Math.sin(phiRad);
    const gammaArcMin = gammaDeg * 60;

    // Transverse Mercator scale factor k ≈ k0 * (1 + 0.5 * (dLam * cos phi)^2)
    const k = k0 * (1 + 0.5 * Math.pow(dLamRad * Math.cos(phiRad), 2));

    gResEl.textContent = (gammaDeg >= 0 ? '+' : '') + gammaDeg.toFixed(3) + '° (' + gammaArcMin.toFixed(1) + ' arcmin)';
    kResEl.textContent = 'k = ' + k.toFixed(5) + ' (Grid Distance / Ground Distance)';
  }

  [latEl, lonEl, cmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter survey point GPS Latitude and Longitude in decimal degrees.',
      'Enter UTM Zone Central Meridian in degrees (6° wide zone center).',
      'Inspect Grid Convergence angular offset between True Geodetic North and UTM Grid North, and point scale factor k.'
    ],
    benefitTitle: 'Mapping True North vs Grid North Discrepancy',
    benefitContent: 'Because the Transverse Mercator cylinder maps curved meridians onto a flat Cartesian grid, Grid North deviates from True North by the convergence angle $\\gamma = \\Delta\\lambda\\cdot\\sin\\phi$, crucial for land surveyors and GPS navigation.',
    faqs: [{ q: 'What is the scale factor at the UTM Central Meridian?', a: 'By international convention, the scale factor at the central meridian is exactly $k_0 = 0.9996$ (compressing ground distances by 1 part in 2,500).' }]
  },

  // 5. Magnetic Declination & Compass Variation Correction Calculator
  {
    slug: 'magnetic-declination-true-north-compass-calculator',
    name: 'Magnetic Declination & Compass Variation Correction Calculator',
    description: 'Convert between Magnetic Compass Bearing, True Geodetic Heading, and Map Grid Heading (True Heading = Magnetic Bearing ± Magnetic Declination) for land navigation and aviation.',
    category: 'Science',
    icon: 'text',
    keywords: ['magnetic declination calculator', 'true north magnetic north converter', 'compass variation calculator online', 'true heading magnetic heading formula', 'aviation magnetic variation calculator'],
    order: 497,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Magnetic Compass Reading (°) & Local Magnetic Declination (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mag-hdg">Magnetic Compass Bearing (°)</label>
          <input class="tool-textarea" id="mag-hdg" type="number" step="any" value="240" placeholder="240°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mag-dec">Magnetic Declination Variation (°)</label>
          <input class="tool-textarea" id="mag-dec" type="number" step="0.1" value="12.5" placeholder="+12.5° East (or -10° West)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mag-dir">Declination Direction</label>
          <select class="tool-textarea" id="mag-dir">
            <option value="1" selected>East (Add to Magnetic Bearing)</option>
            <option value="-1">West (Subtract from Magnetic Bearing)</option>
          </select>
        </div>
      </div>
      <div id="mag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mag-res-true" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">252.5° True</span>
            <span class="stat-label">True Geodetic Heading</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mag-res-rule" style="font-weight:700;">"East is Least, West is Best"</span>
            <span class="stat-label">Navigational Mnemonic</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('mag-hdg'), dEl = document.getElementById('mag-dec'), dirEl = document.getElementById('mag-dir');
  const tResEl = document.getElementById('mag-res-true'), rResEl = document.getElementById('mag-res-rule');

  function update() {
    const magHdg = parseFloat(hEl.value), decMag = Math.abs(parseFloat(dEl.value)), sign = parseFloat(dirEl.value);
    if (isNaN(magHdg) || isNaN(decMag)) return;

    // True = Magnetic + (Declination * sign)
    const decSigned = decMag * sign;
    let trueHdg = (magHdg + decSigned + 360) % 360;

    tResEl.textContent = trueHdg.toFixed(1) + '° True Heading (Map Bearing)';
    rResEl.textContent = 'True = Mag ' + magHdg.toFixed(1) + '° ' + (sign > 0 ? '+ ' : '- ') + decMag.toFixed(1) + '° ' + (sign > 0 ? 'East' : 'West');
  }

  [hEl, dEl, dirEl].forEach(el => el.addEventListener('input', update));
  dirEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter handheld magnetic compass bearing in degrees (0° to 360°).',
      'Enter local geomagnetic declination variation from NOAA/WMM models in degrees.',
      'Select East (+) or West (-) magnetic declination direction.',
      'Inspect corrected True Geodetic North map heading for wilderness navigation.'
    ],
    benefitTitle: 'NOAA World Magnetic Model (WMM) Corrections',
    benefitContent: 'Because Earth\'s magnetic north pole drifts continuously over time in northern Canada and Siberia, navigation charts provide annual magnetic variation rates to calibrate compass bearings against true geodetic north.',
    faqs: [{ q: 'What is the navigator mnemonic for magnetic declination?', a: '"East is least (subtract when converting True to Magnetic), West is best (add when converting True to Magnetic)."' }]
  }
];

toolsSuiteJJJ.forEach(createTool);
console.log('Suite JJJ complete: 5 tools created.');
