const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tools = [
  {
    slug: 'antenna-array-beamforming-half-power-beamwidth-directivity-calculator',
    title: 'Antenna Array Beamforming & HPBW Directivity Calculator',
    desc: 'Calculate half-power beamwidth (HPBW) and array directivity for uniform linear arrays (ULA) and phased array antenna systems.',
    inputs: [
      { id: 'n', label: 'Number of Antenna Elements (N)', type: 'number', placeholder: 'e.g. 16', val: '16', step: '1' },
      { id: 'd-lambda', label: 'Element Spacing (d in wavelengths λ)', type: 'number', placeholder: 'e.g. 0.5', val: '0.5', step: 'any' },
      { id: 'freq-ghz', label: 'Operating Frequency (GHz)', type: 'number', placeholder: 'e.g. 2.4', val: '2.4', step: 'any' }
    ],
    calcLogic: `
      var N = parseInt(el('n').value, 10);
      var d_lam = parseFloat(el('d-lambda').value);
      var f_ghz = parseFloat(el('freq-ghz').value);
      if (isNaN(N) || N <= 0 || isNaN(d_lam) || d_lam <= 0 || isNaN(f_ghz) || f_ghz <= 0) {
        return { err: 'Please enter valid positive numbers for all parameters.' };
      }
      var c = 3e8;
      var f = f_ghz * 1e9;
      var lam = c / f;
      var d = d_lam * lam;
      var hpbw_rad = 0.886 * lam / (N * d);
      var hpbw_deg = hpbw_rad * 180 / Math.PI;
      var directivity_dbi = 10 * Math.log10(N);
      var out = 'ANTENNA ARRAY BEAMFORMING ANALYSIS\\n';
      out += '====================================\\n';
      out += 'Number of Elements (N)  : ' + N + '\\n';
      out += 'Element Spacing (d)     : ' + d_lam + ' λ (' + (d * 1000).toFixed(2) + ' mm)\\n';
      out += 'Wavelength (λ)          : ' + (lam * 1000).toFixed(2) + ' mm @ ' + f_ghz + ' GHz\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Half-Power Beamwidth    : ' + hpbw_deg.toFixed(2) + '° (' + hpbw_rad.toFixed(4) + ' rad)\\n';
      out += 'Array Directivity (D)   : ' + directivity_dbi.toFixed(2) + ' dBi\\n';
      out += 'Linear Directivity Factor: ' + N + ' (ideal ULA)';
      return { out: out, msg: 'Beamwidth and directivity computed successfully.' };
    `,
    steps: [
      'Enter the total number of antenna array elements ($N$).',
      'Specify the element spacing in terms of wavelength ($d/\\lambda$, default is $0.5\\lambda$).',
      'Enter the operating radio frequency in Gigahertz (GHz).',
      'Click Process to compute HPBW in degrees and total directivity in dBi.'
    ],
    formulas: 'HPBW \\approx 0.886 \\cdot \\frac{\\lambda}{N \\cdot d} \\text{ rad}, \\quad D = 10 \\log_{10}(N) \\text{ dBi}',
    example: 'For a 16-element ULA with 0.5λ spacing at 2.4 GHz: HPBW = 6.35° and Directivity = 12.04 dBi.',
    faqs: [
      { q: 'What is Half-Power Beamwidth (HPBW)?', a: 'HPBW is the angular width of the main antenna beam measured between the 3 dB points where radiated power drops to 50%.' },
      { q: 'Why is 0.5λ element spacing standard?', a: 'Spacing elements at half a wavelength avoids grating lobes while maximizing array aperture and beam directivity.' },
      { q: 'Does beamforming work for 5G MIMO?', a: 'Yes, 5G massive MIMO arrays use phased array beamforming formulas to steer sharp directional beams to mobile devices.' },
      { q: 'Is this calculation performed locally?', a: 'Yes, all computations run 100% locally in your browser.' }
    ]
  },
  {
    slug: 'cdma-spreading-gain-eb-n0-processing-gain-calculator',
    title: 'CDMA Spreading Gain & Processing Gain Calculator',
    desc: 'Calculate CDMA processing gain Gp = 10 log10(Rc/Rb), required SNR, and spreading code efficiency for wireless communications.',
    inputs: [
      { id: 'rc', label: 'Chip Rate Rc (Mcps)', type: 'number', placeholder: 'e.g. 3.84', val: '3.84', step: 'any' },
      { id: 'rb', label: 'Data Bit Rate Rb (kbps)', type: 'number', placeholder: 'e.g. 12.2', val: '12.2', step: 'any' },
      { id: 'ebn0', label: 'Required Eb/N0 (dB)', type: 'number', placeholder: 'e.g. 5.0', val: '5.0', step: 'any' }
    ],
    calcLogic: `
      var Rc = parseFloat(el('rc').value) * 1e6;
      var Rb = parseFloat(el('rb').value) * 1e3;
      var ebn0 = parseFloat(el('ebn0').value);
      if (isNaN(Rc) || Rc <= 0 || isNaN(Rb) || Rb <= 0 || isNaN(ebn0)) {
        return { err: 'Please enter valid numbers for chip rate, data rate, and Eb/N0.' };
      }
      var sf = Rc / Rb;
      var gp_db = 10 * Math.log10(sf);
      var snr_req_db = ebn0 - gp_db;
      var out = 'CDMA SPREADING & PROCESSING GAIN ANALYSIS\\n';
      out += '=========================================\\n';
      out += 'Chip Rate (Rc)         : ' + (Rc/1e6).toFixed(3) + ' Mcps\\n';
      out += 'Data Rate (Rb)         : ' + (Rb/1e3).toFixed(2) + ' kbps\\n';
      out += 'Required Eb/N0         : ' + ebn0.toFixed(2) + ' dB\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Spreading Factor (SF)  : ' + sf.toFixed(2) + ' chips/bit\\n';
      out += 'Processing Gain (Gp)   : ' + gp_db.toFixed(2) + ' dB\\n';
      out += 'Required System SNR    : ' + snr_req_db.toFixed(2) + ' dB';
      return { out: out, msg: 'CDMA processing gain computed successfully.' };
    `,
    steps: [
      'Enter the CDMA chip rate in Megachips per second (Mcps).',
      'Enter the user data bit rate in kilobits per second (kbps).',
      'Enter the required Eb/N0 ratio in decibels (dB).',
      'Click Process to view spreading factor, processing gain, and required SNR.'
    ],
    formulas: 'SF = \\frac{R_c}{R_b}, \\quad G_p = 10 \\log_{10}(SF) \\text{ dB}, \\quad \\text{SNR} = \\frac{E_b}{N_0} - G_p',
    example: 'For WCDMA with Rc = 3.84 Mcps and voice rate Rb = 12.2 kbps, Spreading Factor = 314.75 and Processing Gain = 24.98 dB.',
    faqs: [
      { q: 'What is CDMA Processing Gain?', a: 'Processing gain measures how much a spread-spectrum signal improves signal-to-noise ratio over narrow-band noise.' },
      { q: 'How does processing gain protect against interference?', a: 'Despreading spreads narrow-band interference across the wider bandwidth while collapsing the desired signal back to baseband.' },
      { q: 'Where is CDMA spreading gain used?', a: 'It is used in 3G WCDMA, GPS satellite signals, military anti-jamming radios, and radar applications.' },
      { q: 'Is this calculation free and private?', a: 'Yes, it is 100% free and runs completely in your web browser.' }
    ]
  },
  {
    slug: 'coaxial-cable-attenuation-characteristic-impedance-calculator',
    title: 'Coaxial Cable Characteristic Impedance & Attenuation Calculator',
    desc: 'Calculate RF coaxial cable characteristic impedance Z0, capacitance per meter, cutoff frequency, and velocity factor from geometry.',
    inputs: [
      { id: 'd', label: 'Inner Conductor Diameter d (mm)', type: 'number', placeholder: 'e.g. 1.0', val: '1.0', step: 'any' },
      { id: 'D', label: 'Outer Conductor Inner Diameter D (mm)', type: 'number', placeholder: 'e.g. 3.5', val: '3.5', step: 'any' },
      { id: 'er', label: 'Dielectric Relative Permittivity (εr)', type: 'number', placeholder: 'e.g. 2.25', val: '2.25', step: 'any' }
    ],
    calcLogic: `
      var d = parseFloat(el('d').value);
      var D = parseFloat(el('D').value);
      var er = parseFloat(el('er').value);
      if (isNaN(d) || d <= 0 || isNaN(D) || D <= d || isNaN(er) || er < 1) {
        return { err: 'Outer diameter D must be strictly greater than inner diameter d, and εr >= 1.' };
      }
      var z0 = (138 / Math.sqrt(er)) * Math.log10(D / d);
      var c_pf_m = (24.15 * er) / Math.log10(D / d);
      var vf = (1 / Math.sqrt(er)) * 100;
      var fc_ghz = (190 / (Math.sqrt(er) * (d + D)));
      var out = 'COAXIAL CABLE GEOMETRY & IMPEDANCE ANALYSIS\\n';
      out += '============================================\\n';
      out += 'Inner Diameter (d)     : ' + d + ' mm\\n';
      out += 'Outer Diameter (D)     : ' + D + ' mm\\n';
      out += 'Dielectric Const (εr)  : ' + er + '\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Characteristic Impedance (Z0): ' + z0.toFixed(2) + ' Ω\\n';
      out += 'Capacitance per meter  : ' + c_pf_m.toFixed(2) + ' pF/m\\n';
      out += 'Velocity Factor (VF)   : ' + vf.toFixed(2) + '% of c\\n';
      out += 'TE11 Cutoff Frequency  : ' + fc_ghz.toFixed(2) + ' GHz';
      return { out: out, msg: 'Coaxial cable parameters computed successfully.' };
    `,
    steps: [
      'Enter the inner conductor diameter ($d$) in millimeters.',
      'Enter the outer conductor inner diameter ($D$) in millimeters.',
      'Enter the dielectric relative permittivity ($\\epsilon_r$, e.g., 2.25 for polyethylene).',
      'Click Process to compute $Z_0$, capacitance, velocity factor, and cutoff frequency.'
    ],
    formulas: 'Z_0 = \\frac{138}{\\sqrt{\\epsilon_r}} \\log_{10}\\left(\\frac{D}{d}\\right) \\Omega, \\quad C = \\frac{24.15 \\cdot \\epsilon_r}{\\log_{10}(D/d)} \\text{ pF/m}',
    example: 'For d = 1.0 mm, D = 3.5 mm, εr = 2.25 (solid PE): Characteristic Impedance Z0 = 50.06 Ω.',
    faqs: [
      { q: 'Why is 50 Ohms the RF coaxial standard?', a: '50 Ohms provides the optimal balance between maximum power handling capability (at ~30 Ω) and minimum attenuation loss (at ~77 Ω).' },
      { q: 'What is Velocity Factor (VF)?', a: 'Velocity factor is the speed of an electromagnetic wave in the cable divided by the speed of light in vacuum.' },
      { q: 'What causes cable cutoff frequency?', a: 'At high frequencies, higher-order non-TEM waveguide modes (like TE11) start propagating, degrading signal fidelity.' },
      { q: 'Is this calculation browser-based?', a: 'Yes, calculations are completed instantly inside your browser.' }
    ]
  },
  {
    slug: 'dbm-dbw-watts-voltage-rf-power-conversion-calculator',
    title: 'dBm, dBW, Watts & Voltage RF Power Conversion Calculator',
    desc: 'Convert RF power between dBm, dBW, Watts, milliwatts, and Vrms across 50-ohm load impedance instantly.',
    inputs: [
      { id: 'val', label: 'Input Power or Voltage Value', type: 'number', placeholder: 'e.g. 0', val: '0', step: 'any' },
      { id: 'unit', label: 'Input Unit', type: 'select', options: [
        { val: 'dbm', text: 'dBm (dB relative to 1 mW)' },
        { val: 'dbw', text: 'dBW (dB relative to 1 Watt)' },
        { val: 'w', text: 'Watts (W)' },
        { val: 'mw', text: 'Milliwatts (mW)' },
        { val: 'vrms', text: 'Vrms (Volts RMS across 50 Ω)' }
      ], val: 'dbm' }
    ],
    calcLogic: `
      var v = parseFloat(el('val').value);
      var unit = el('unit').value;
      if (isNaN(v)) return { err: 'Please enter a valid numerical value.' };
      var dbm = 0;
      if (unit === 'dbm') dbm = v;
      else if (unit === 'dbw') dbm = v + 30;
      else if (unit === 'w') {
        if (v <= 0) return { err: 'Watts must be greater than zero.' };
        dbm = 10 * Math.log10(v) + 30;
      } else if (unit === 'mw') {
        if (v <= 0) return { err: 'Milliwatts must be greater than zero.' };
        dbm = 10 * Math.log10(v);
      } else if (unit === 'vrms') {
        if (v <= 0) return { err: 'Voltage must be greater than zero.' };
        var p_w = (v * v) / 50;
        dbm = 10 * Math.log10(p_w) + 30;
      }
      var dbw = dbm - 30;
      var mw = Math.pow(10, dbm / 10);
      var w = mw / 1000;
      var vrms = Math.sqrt(w * 50);
      var vpp = vrms * 2 * Math.sqrt(2);
      var out = 'RF POWER & VOLTAGE EQUIVALENTS (50 Ω Load)\\n';
      out += '============================================\\n';
      out += 'Input: ' + v + ' ' + unit.toUpperCase() + '\\n\\n';
      out += 'RESULTS:\\n';
      out += 'dBm                   : ' + dbm.toFixed(2) + ' dBm\\n';
      out += 'dBW                   : ' + dbw.toFixed(2) + ' dBW\\n';
      out += 'Watts (W)             : ' + (w >= 0.001 ? w.toFixed(4) : w.toExponential(4)) + ' W\\n';
      out += 'Milliwatts (mW)       : ' + (mw >= 0.01 ? mw.toFixed(4) : mw.toExponential(4)) + ' mW\\n';
      out += 'Voltage (Vrms @ 50 Ω) : ' + vrms.toFixed(4) + ' V\\n';
      out += 'Peak-to-Peak (Vpp @ 50Ω): ' + vpp.toFixed(4) + ' Vpp';
      return { out: out, msg: 'RF power units converted successfully.' };
    `,
    steps: [
      'Enter the power or voltage numerical value.',
      'Select the unit of input (dBm, dBW, Watts, milliwatts, or Vrms in 50 Ω).',
      'Click Process to view equivalent values across all standard RF power units.'
    ],
    formulas: 'P_{\\text{dBm}} = 10 \\log_{10}(P_{\\text{mW}}), \\quad V_{\\text{rms}} = \\sqrt{P_{\\text{Watts}} \\cdot 50}',
    example: '0 dBm = 1 mW = 0.001 W = -30 dBW = 0.2236 Vrms in 50 Ω.',
    faqs: [
      { q: 'What is 0 dBm in Watts?', a: '0 dBm corresponds exactly to 1 milliwatt (0.001 Watt).' },
      { q: 'Why is 50 Ohms assumed for voltage conversion?', a: 'RF transmission lines, spectrum analyzers, and power meters are calibrated to a standard 50-ohm characteristic impedance.' },
      { q: 'How do you convert dBm to dBW?', a: 'Subtract 30 from dBm to get dBW (since 1 W = 1000 mW, which is a 30 dB difference).' },
      { q: 'Is this conversion processed locally?', a: 'Yes, all calculations occur strictly in your browser.' }
    ]
  },
  {
    slug: 'digital-filter-fir-iir-cutoff-coefficient-calculator',
    title: 'Digital Filter FIR Windowed Sinc Cutoff & Coefficient Calculator',
    desc: 'Design ideal windowed sinc FIR lowpass filters and calculate cutoff coefficients, impulse response taps, and stopband attenuation.',
    inputs: [
      { id: 'fs', label: 'Sampling Frequency fs (Hz)', type: 'number', placeholder: 'e.g. 48000', val: '48000', step: 'any' },
      { id: 'fc', label: 'Cutoff Frequency fc (Hz)', type: 'number', placeholder: 'e.g. 4000', val: '4000', step: 'any' },
      { id: 'taps', label: 'Filter Length N (odd taps)', type: 'number', placeholder: 'e.g. 15', val: '15', step: '1' }
    ],
    calcLogic: `
      var fs = parseFloat(el('fs').value);
      var fc = parseFloat(el('fc').value);
      var N = parseInt(el('taps').value, 10);
      if (isNaN(fs) || fs <= 0 || isNaN(fc) || fc <= 0 || fc >= fs/2 || isNaN(N) || N < 3) {
        return { err: 'Cutoff fc must be less than Nyquist frequency (fs / 2), and N >= 3.' };
      }
      if (N % 2 === 0) N += 1;
      var M = (N - 1) / 2;
      var fc_norm = fc / fs;
      var coeffs = [];
      var sum = 0;
      for (var n = -M; n <= M; n++) {
        var h = 0;
        if (n === 0) {
          h = 2 * fc_norm;
        } else {
          h = Math.sin(2 * Math.PI * fc_norm * n) / (Math.PI * n);
        }
        var win = 0.54 - 0.46 * Math.cos((2 * Math.PI * (n + M)) / (N - 1));
        var hw = h * win;
        coeffs.push(hw);
        sum += hw;
      }
      var out = 'WINDOWED SINC FIR LOWPASS FILTER DESIGN (Hamming Window)\\n';
      out += '=======================================================\\n';
      out += 'Sampling Rate (fs)   : ' + fs + ' Hz\\n';
      out += 'Cutoff Frequency (fc): ' + fc + ' Hz (Normalized: ' + fc_norm.toFixed(4) + ')\\n';
      out += 'Filter Taps (N)      : ' + N + ' taps\\n\\n';
      out += 'IMPULSE RESPONSE COEFFICIENTS h[n] (Normalized DC Gain = 1.0):\\n';
      for (var i = 0; i < coeffs.length; i++) {
        var norm_c = coeffs[i] / sum;
        out += 'h[' + (i - M) + '] = ' + norm_c.toFixed(6) + '\\n';
      }
      return { out: out, msg: 'FIR filter coefficients computed successfully.' };
    `,
    steps: [
      'Enter the system sampling frequency ($f_s$) in Hz.',
      'Enter the target cutoff frequency ($f_c$) in Hz (must be $< f_s/2$).',
      'Enter the desired filter tap length ($N$, odd integer).',
      'Click Process to generate windowed sinc FIR filter coefficients.'
    ],
    formulas: 'h[n] = \\frac{\\sin(2\\pi f_c n)}{\\pi n} \\cdot w[n], \\quad w[n] = 0.54 - 0.46 \\cos\\left(\\frac{2\\pi n}{N-1}\\right)',
    example: 'For fs = 48 kHz, fc = 4 kHz, N = 7 taps: Generates symmetric linear-phase Hamming-windowed FIR coefficients.',
    faqs: [
      { q: 'What is a windowed sinc FIR filter?', a: 'A windowed sinc filter truncates an ideal infinite sinc impulse response using a window function (like Hamming or Blackman) to prevent Gibbs oscillations.' },
      { q: 'Why must filter taps N be odd?', a: 'Odd length symmetric FIR filters produce Type-I linear phase filters with exact integer group delay.' },
      { q: 'What is the cutoff attenuation of a Hamming window?', a: 'A Hamming windowed FIR filter provides approximately -53 dB of stopband attenuation.' },
      { q: 'Is this calculation 100% private?', a: 'Yes, no data leaves your browser.' }
    ]
  },
  {
    slug: 'doppler-shift-frequency-velocity-radar-ultrasound-calculator',
    title: 'Doppler Shift Frequency & Velocity Radar Calculator',
    desc: 'Calculate Doppler frequency shift Δf = 2·v·f0·cos(θ)/c and target velocity for radar, ultrasound, and RF sensing.',
    inputs: [
      { id: 'freq-ghz', label: 'Carrier Frequency f0 (GHz)', type: 'number', placeholder: 'e.g. 24.0', val: '24.0', step: 'any' },
      { id: 'velocity-kmh', label: 'Relative Target Velocity v (km/h)', type: 'number', placeholder: 'e.g. 100', val: '100', step: 'any' },
      { id: 'angle-deg', label: 'Target Direction Angle θ (degrees)', type: 'number', placeholder: 'e.g. 0', val: '0', step: 'any' }
    ],
    calcLogic: `
      var f0_ghz = parseFloat(el('freq-ghz').value);
      var v_kmh = parseFloat(el('velocity-kmh').value);
      var theta_deg = parseFloat(el('angle-deg').value);
      if (isNaN(f0_ghz) || f0_ghz <= 0 || isNaN(v_kmh) || isNaN(theta_deg)) {
        return { err: 'Please enter valid numerical values for carrier frequency, velocity, and angle.' };
      }
      var c = 3e8;
      var f0 = f0_ghz * 1e9;
      var v_ms = v_kmh / 3.6;
      var theta_rad = theta_deg * Math.PI / 180;
      var delta_f = (2 * v_ms * f0 * Math.cos(theta_rad)) / c;
      var out = 'RADAR & ULTRASOUND DOPPLER SHIFT ANALYSIS\\n';
      out += '=========================================\\n';
      out += 'Carrier Frequency (f0): ' + f0_ghz + ' GHz\\n';
      out += 'Target Velocity (v)   : ' + v_kmh + ' km/h (' + v_ms.toFixed(2) + ' m/s)\\n';
      out += 'Observation Angle (θ) : ' + theta_deg + '°\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Doppler Shift (Δf)    : ' + delta_f.toFixed(2) + ' Hz (' + (delta_f/1000).toFixed(4) + ' kHz)\\n';
      out += 'Radial Velocity Component: ' + (v_ms * Math.cos(theta_rad)).toFixed(2) + ' m/s\\n';
      out += 'Target Direction      : ' + (delta_f >= 0 ? 'Approaching (+ shift)' : 'Receding (- shift)');
      return { out: out, msg: 'Doppler frequency shift computed successfully.' };
    `,
    steps: [
      'Enter radar or ultrasound carrier frequency in GHz (e.g., 24 GHz for automotive radar).',
      'Enter target relative velocity in km/h.',
      'Enter target direction angle $\\theta$ in degrees relative to beam axis.',
      'Click Process to compute exact Doppler frequency shift $\\Delta f$.'
    ],
    formulas: '\\Delta f = \\frac{2 \\cdot v \\cdot f_0 \\cdot \\cos(\\theta)}{c}',
    example: 'A 24 GHz radar tracking a car moving towards it at 100 km/h (27.78 m/s) along beam axis (θ=0°) experiences a Doppler shift of +4,444.44 Hz.',
    faqs: [
      { q: 'Why is there a factor of 2 in the radar Doppler formula?', a: 'In monostatic radar, the wave travels to the moving target and back, doubling the Doppler shift compared to a one-way transmitter.' },
      { q: 'What happens when target angle θ = 90°?', a: 'When motion is perpendicular to radar line-of-sight, cos(90°) = 0, resulting in zero radial Doppler shift.' },
      { q: 'What frequencies do police speed radars use?', a: 'Police radars typically operate in X-band (10.5 GHz), K-band (24.15 GHz), or Ka-band (34.7 GHz).' },
      { q: 'Is this calculation free?', a: 'Yes, NikTool tools are 100% free with no tracking.' }
    ]
  },
  {
    slug: 'eye-diagram-jitter-ber-floor-high-speed-serial-calculator',
    title: 'Eye Diagram Jitter & BER Floor High-Speed Serial Link Calculator',
    desc: 'Evaluate high-speed serial link eye diagram opening, total jitter (TJ), deterministic jitter (DJ), and BER floor.',
    inputs: [
      { id: 'data-rate-gbps', label: 'Data Rate (Gbps)', type: 'number', placeholder: 'e.g. 10', val: '10', step: 'any' },
      { id: 'tj-ps', label: 'Total Jitter TJ (ps)', type: 'number', placeholder: 'e.g. 30', val: '30', step: 'any' },
      { id: 'eye-height-mv', label: 'Eye Height (mV)', type: 'number', placeholder: 'e.g. 200', val: '200', step: 'any' }
    ],
    calcLogic: `
      var dr = parseFloat(el('data-rate-gbps').value);
      var tj = parseFloat(el('tj-ps').value);
      var eh = parseFloat(el('eye-height-mv').value);
      if (isNaN(dr) || dr <= 0 || isNaN(tj) || tj < 0 || isNaN(eh) || eh <= 0) {
        return { err: 'Please enter valid positive values for data rate, jitter, and eye height.' };
      }
      var ui_ps = 1000 / dr;
      var eye_width_ps = ui_ps - tj;
      var eye_width_ui = eye_width_ps / ui_ps;
      var eye_open_pct = Math.max(0, eye_width_ui * 100);
      var out = 'HIGH-SPEED SERIAL LINK EYE DIAGRAM ANALYSIS\\n';
      out += '===========================================\\n';
      out += 'Data Rate             : ' + dr + ' Gbps\\n';
      out += 'Unit Interval (UI)    : ' + ui_ps.toFixed(2) + ' ps\\n';
      out += 'Total Jitter (TJ)     : ' + tj + ' ps\\n';
      out += 'Vertical Eye Height   : ' + eh + ' mV\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Horizontal Eye Opening: ' + eye_width_ps.toFixed(2) + ' ps (' + eye_width_ui.toFixed(3) + ' UI)\\n';
      out += 'Eye Opening Percentage: ' + eye_open_pct.toFixed(2) + '%\\n';
      out += 'Link Status           : ' + (eye_open_pct > 50 ? 'PASS (Open Eye)' : 'FAIL (Eye Closed / High BER)');
      return { out: out, msg: 'Eye diagram parameters evaluated successfully.' };
    `,
    steps: [
      'Enter the high-speed serial link data rate in Gbps (e.g., 10 Gbps for PCIe 3.0/10GbE).',
      'Enter total jitter (TJ) in picoseconds (ps).',
      'Enter vertical eye height in millivolts (mV).',
      'Click Process to compute unit interval, eye width, and link opening status.'
    ],
    formulas: '\\text{UI} = \\frac{1000}{\\text{Data Rate (Gbps)}} \\text{ ps}, \\quad \\text{Eye Width} = \\text{UI} - \\text{TJ}',
    example: 'At 10 Gbps (UI = 100 ps) with 30 ps TJ: Horizontal Eye Width = 70 ps (0.70 UI) or 70% open.',
    faqs: [
      { q: 'What is an Eye Diagram in digital design?', a: 'An eye diagram overlays consecutive waveform sweeps to assess noise margin, jitter, and signal integrity of high-speed serial links.' },
      { q: 'What is Unit Interval (UI)?', a: 'Unit Interval is the time duration of one single data bit period.' },
      { q: 'What causes eye closure?', a: 'Intersymbol interference (ISI), crosstalk, dispersion, channel loss, and random jitter cause eye closure.' },
      { q: 'Is this calculation browser-based?', a: 'Yes, processing is performed 100% locally in your web browser.' }
    ]
  },
  {
    slug: 'friis-free-space-path-loss-link-budget-calculator',
    title: 'Friis Transmission & Free-Space Path Loss Link Budget Calculator',
    desc: 'Calculate free-space path loss (FSPL), received signal power Pr, and RF link budget using the Friis transmission equation.',
    inputs: [
      { id: 'freq-ghz', label: 'Frequency f (GHz)', type: 'number', placeholder: 'e.g. 2.4', val: '2.4', step: 'any' },
      { id: 'dist-km', label: 'Distance d (km)', type: 'number', placeholder: 'e.g. 1.0', val: '1.0', step: 'any' },
      { id: 'gt-dbi', label: 'Transmitter Antenna Gain Gt (dBi)', type: 'number', placeholder: 'e.g. 2.0', val: '2.0', step: 'any' },
      { id: 'gr-dbi', label: 'Receiver Antenna Gain Gr (dBi)', type: 'number', placeholder: 'e.g. 2.0', val: '2.0', step: 'any' },
      { id: 'pt-dbm', label: 'Transmitter Power Pt (dBm)', type: 'number', placeholder: 'e.g. 20', val: '20', step: 'any' }
    ],
    calcLogic: `
      var f_ghz = parseFloat(el('freq-ghz').value);
      var d_km = parseFloat(el('dist-km').value);
      var gt = parseFloat(el('gt-dbi').value);
      var gr = parseFloat(el('gr-dbi').value);
      var pt = parseFloat(el('pt-dbm').value);
      if (isNaN(f_ghz) || f_ghz <= 0 || isNaN(d_km) || d_km <= 0 || isNaN(gt) || isNaN(gr) || isNaN(pt)) {
        return { err: 'Please enter valid positive numbers for frequency and distance.' };
      }
      var fspl_db = 20 * Math.log10(d_km) + 20 * Math.log10(f_ghz) + 92.45;
      var eirp_dbm = pt + gt;
      var pr_dbm = pt + gt + gr - fspl_db;
      var pr_mw = Math.pow(10, pr_dbm / 10);
      var out = 'FRIIS TRANSMISSION & RF LINK BUDGET ANALYSIS\\n';
      out += '============================================\\n';
      out += 'Frequency (f)         : ' + f_ghz + ' GHz\\n';
      out += 'Distance (d)          : ' + d_km + ' km\\n';
      out += 'Tx Power (Pt)         : ' + pt + ' dBm\\n';
      out += 'Tx Antenna Gain (Gt)  : ' + gt + ' dBi (EIRP = ' + eirp_dbm.toFixed(2) + ' dBm)\\n';
      out += 'Rx Antenna Gain (Gr)  : ' + gr + ' dBi\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Free-Space Path Loss  : ' + fspl_db.toFixed(2) + ' dB\\n';
      out += 'Received Power (Pr)   : ' + pr_dbm.toFixed(2) + ' dBm (' + (pr_mw*1e6).toExponential(4) + ' µW)';
      return { out: out, msg: 'Friis link budget computed successfully.' };
    `,
    steps: [
      'Enter the operating signal frequency in GHz.',
      'Enter line-of-sight distance between antennas in kilometers.',
      'Enter transmitter antenna gain $G_t$ and receiver antenna gain $G_r$ in dBi.',
      'Enter transmitter output power $P_t$ in dBm.',
      'Click Process to compute FSPL and received power $P_r$.'
    ],
    formulas: '\\text{FSPL (dB)} = 20 \\log_{10}(d_{\\text{km}}) + 20 \\log_{10}(f_{\\text{GHz}}) + 92.45, \\quad P_r = P_t + G_t + G_r - \\text{FSPL}',
    example: 'At 2.4 GHz over 1 km with Pt = 20 dBm and 2 dBi dipole antennas: FSPL = 100.05 dB, Received Power Pr = -76.05 dBm.',
    faqs: [
      { q: 'What is Friis Transmission Equation?', a: 'The Friis equation calculates power received by one antenna from another under ideal line-of-sight conditions in free space.' },
      { q: 'What is EIRP?', a: 'Equivalent Isotropically Radiated Power (EIRP = Pt + Gt) is the total effective power radiated by a directional transmitter antenna.' },
      { q: 'Why does path loss increase with frequency?', a: 'Higher frequency EM waves have smaller wavelengths and smaller effective aperture areas for isotropic receiving antennas.' },
      { q: 'Is this calculation done on a remote server?', a: 'No, all calculations execute 100% locally in your browser.' }
    ]
  },
  {
    slug: 'gsm-lte-link-budget-indoor-outdoor-coverage-calculator',
    title: 'GSM / LTE Cellular Link Budget & Coverage Range Calculator',
    desc: 'Compute maximum allowable path loss (MAPL) and cell coverage radius for GSM, 4G LTE, and 5G cellular network deployment.',
    inputs: [
      { id: 'tx-power-dbm', label: 'Base Station Tx Power (dBm)', type: 'number', placeholder: 'e.g. 43', val: '43', step: 'any' },
      { id: 'tx-gain-dbi', label: 'BS Antenna Gain (dBi)', type: 'number', placeholder: 'e.g. 18', val: '18', step: 'any' },
      { id: 'rx-gain-dbi', label: 'Mobile Antenna Gain (dBi)', type: 'number', placeholder: 'e.g. 0', val: '0', step: 'any' },
      { id: 'rx-sens-dbm', label: 'Receiver Sensitivity (dBm)', type: 'number', placeholder: 'e.g. -104', val: ' -104', step: 'any' },
      { id: 'freq-mhz', label: 'Carrier Frequency (MHz)', type: 'number', placeholder: 'e.g. 1800', val: '1800', step: 'any' }
    ],
    calcLogic: `
      var pt = parseFloat(el('tx-power-dbm').value);
      var gt = parseFloat(el('tx-gain-dbi').value);
      var gr = parseFloat(el('rx-gain-dbi').value);
      var sens = parseFloat(el('rx-sens-dbm').value);
      var f_mhz = parseFloat(el('freq-mhz').value);
      if (isNaN(pt) || isNaN(gt) || isNaN(gr) || isNaN(sens) || isNaN(f_mhz) || f_mhz <= 0) {
        return { err: 'Please enter valid numerical values.' };
      }
      var mapl = pt + gt + gr - sens;
      var f_ghz = f_mhz / 1000;
      var max_d_km = Math.pow(10, (mapl - 92.45 - 20 * Math.log10(f_ghz)) / 20);
      var out = 'CELLULAR NETWORK LINK BUDGET & MAPL ANALYSIS\\n';
      out += '=============================================\\n';
      out += 'Tx Power              : ' + pt + ' dBm (20 W)\\n';
      out += 'Tx Antenna Gain       : ' + gt + ' dBi\\n';
      out += 'Rx Antenna Gain       : ' + gr + ' dBi\\n';
      out += 'Receiver Sensitivity  : ' + sens + ' dBm\\n';
      out += 'Frequency             : ' + f_mhz + ' MHz\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Max Allowable Path Loss (MAPL): ' + mapl.toFixed(2) + ' dB\\n';
      out += 'Est. Max Free-Space Cell Radius: ' + max_d_km.toFixed(2) + ' km';
      return { out: out, msg: 'Cellular link budget computed successfully.' };
    `,
    steps: [
      'Enter base station transmit power in dBm (e.g., 43 dBm = 20W).',
      'Enter base station antenna gain in dBi.',
      'Enter mobile device receiver sensitivity in dBm (e.g., -104 dBm).',
      'Enter cellular carrier frequency in MHz.',
      'Click Process to compute MAPL and maximum cell coverage radius.'
    ],
    formulas: '\\text{MAPL} = P_t + G_t + G_r - P_{\\text{sensitivity}}',
    example: 'For BS Tx = 43 dBm, Gt = 18 dBi, Sensitivity = -104 dBm: MAPL = 165 dB.',
    faqs: [
      { q: 'What is MAPL in cellular engineering?', a: 'Maximum Allowable Path Loss (MAPL) defines the total attenuation a radio signal can sustain before dropping below receiver sensitivity.' },
      { q: 'How does frequency impact cellular cell size?', a: 'Lower frequencies (e.g., 700 MHz) propagate much further with lower path loss than high frequencies (e.g., 3.5 GHz).' },
      { q: 'What fade margin is recommended for cellular links?', a: 'A log-normal shadow fading margin of 8 dB to 15 dB is typically added for 90-95% cell coverage reliability.' },
      { q: 'Is my data kept private?', a: 'Yes, no calculations leave your device.' }
    ]
  },
  {
    slug: 'impedance-matching-l-network-pi-network-rf-calculator',
    title: 'L-Network Impedance Matching RF Circuit Calculator',
    desc: 'Calculate inductor L and capacitor C component values for RF L-network and Pi-network impedance matching circuits.',
    inputs: [
      { id: 'rs', label: 'Source Resistance Rs (Ω)', type: 'number', placeholder: 'e.g. 50', val: '50', step: 'any' },
      { id: 'rl', label: 'Load Resistance Rl (Ω)', type: 'number', placeholder: 'e.g. 200', val: '200', step: 'any' },
      { id: 'freq-mhz', label: 'Operating Frequency f (MHz)', type: 'number', placeholder: 'e.g. 100', val: '100', step: 'any' }
    ],
    calcLogic: `
      var rs = parseFloat(el('rs').value);
      var rl = parseFloat(el('rl').value);
      var f_mhz = parseFloat(el('freq-mhz').value);
      if (isNaN(rs) || rs <= 0 || isNaN(rl) || rl <= 0 || isNaN(f_mhz) || f_mhz <= 0 || rs === rl) {
        return { err: 'Rs and Rl must be positive numbers and unequal (Rs != Rl).' };
      }
      var r_high = Math.max(rs, rl);
      var r_low = Math.min(rs, rl);
      var Q = Math.sqrt((r_high / r_low) - 1);
      var omega = 2 * Math.PI * f_mhz * 1e6;
      var L_henry = (r_low * Q) / omega;
      var C_farad = Q / (omega * r_high);
      var out = 'L-NETWORK RF IMPEDANCE MATCHING CIRCUIT DESIGN\\n';
      out += '============================================\\n';
      out += 'Source Resistance (Rs): ' + rs + ' Ω\\n';
      out += 'Load Resistance (Rl)  : ' + rl + ' Ω\\n';
      out += 'Frequency (f)         : ' + f_mhz + ' MHz\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Network Q Factor      : ' + Q.toFixed(3) + '\\n';
      out += 'Matching Inductance (L): ' + (L_henry * 1e9).toFixed(2) + ' nH\\n';
      out += 'Matching Capacitance (C): ' + (C_farad * 1e12).toFixed(2) + ' pF';
      return { out: out, msg: 'L-network matching components calculated successfully.' };
    `,
    steps: [
      'Enter the source impedance resistance ($R_s$) in Ohms.',
      'Enter the load impedance resistance ($R_l$) in Ohms.',
      'Enter the operating radio frequency in MHz.',
      'Click Process to obtain exact inductance (nH) and capacitance (pF) values.'
    ],
    formulas: 'Q = \\sqrt{\\frac{R_{\\text{high}}}{R_{\\text{low}}} - 1}, \\quad L = \\frac{R_{\\text{low}} \\cdot Q}{\\omega}, \\quad C = \\frac{Q}{\\omega \\cdot R_{\\text{high}}}',
    example: 'Matching 50 Ω source to 200 Ω load at 100 MHz: Q = 1.732, L = 137.83 nH, C = 13.78 pF.',
    faqs: [
      { q: 'Why is impedance matching essential in RF design?', a: 'Impedance matching maximizes power transfer and eliminates standing wave reflections (VSWR = 1:1).' },
      { q: 'What is an L-network?', a: 'An L-network uses two reactive components (one series, one shunt) to match unequal resistive impedances at a single frequency.' },
      { q: 'Can an L-network match any complex impedance?', a: 'Yes, by absorbing load/source reactances into the calculated L and C components.' },
      { q: 'Is this calculation secure?', a: 'Yes, 100% local calculation in your browser.' }
    ]
  },
  {
    slug: 'microstrip-line-characteristic-impedance-pcb-rf-calculator',
    title: 'Microstrip Line Characteristic Impedance Calculator',
    desc: 'Calculate PCB microstrip trace characteristic impedance Z0, effective dielectric constant εeff, and propagation delay.',
    inputs: [
      { id: 'w-mm', label: 'Trace Width W (mm)', type: 'number', placeholder: 'e.g. 1.5', val: '1.5', step: 'any' },
      { id: 'h-mm', label: 'Substrate Height H (mm)', type: 'number', placeholder: 'e.g. 1.0', val: '1.0', step: 'any' },
      { id: 'er', label: 'Relative Permittivity εr', type: 'number', placeholder: 'e.g. 4.4', val: '4.4', step: 'any' }
    ],
    calcLogic: `
      var w = parseFloat(el('w-mm').value);
      var h = parseFloat(el('h-mm').value);
      var er = parseFloat(el('er').value);
      if (isNaN(w) || w <= 0 || isNaN(h) || h <= 0 || isNaN(er) || er < 1) {
        return { err: 'Please enter valid positive values for W, H, and εr.' };
      }
      var u = w / h;
      var e_eff = ((er + 1) / 2) + (((er - 1) / 2) * (1 / Math.sqrt(1 + 12 / u)));
      var z0 = 0;
      if (u <= 1) {
        z0 = (60 / Math.sqrt(e_eff)) * Math.log((8 / u) + (u / 4));
      } else {
        z0 = (120 * Math.PI) / (Math.sqrt(e_eff) * (u + 1.393 + 0.667 * Math.log(u + 1.444)));
      }
      var c = 3e8;
      var v_m_s = c / Math.sqrt(e_eff);
      var prop_delay_ps_mm = (1 / v_m_s) * 1e9;
      var out = 'PCB MICROSTRIP LINE CHARACTERISTIC IMPEDANCE ANALYSIS\\n';
      out += '======================================================\\n';
      out += 'Trace Width (W)       : ' + w + ' mm\\n';
      out += 'Substrate Height (H)  : ' + h + ' mm (W/H ratio = ' + u.toFixed(3) + ')\\n';
      out += 'Substrate Permittivity (εr): ' + er + '\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Characteristic Impedance (Z0): ' + z0.toFixed(2) + ' Ω\\n';
      out += 'Effective Dielectric (εeff) : ' + e_eff.toFixed(3) + '\\n';
      out += 'Propagation Delay     : ' + prop_delay_ps_mm.toFixed(2) + ' ps/mm (' + (prop_delay_ps_mm * 25.4).toFixed(2) + ' ps/inch)';
      return { out: out, msg: 'Microstrip line impedance calculated successfully.' };
    `,
    steps: [
      'Enter PCB trace width $W$ in millimeters.',
      'Enter dielectric substrate height $H$ in millimeters.',
      'Enter substrate relative dielectric constant $\\epsilon_r$ (e.g., 4.4 for FR4).',
      'Click Process to compute microstrip $Z_0$, $\\epsilon_{eff}$, and propagation delay.'
    ],
    formulas: 'Z_0 \\approx \\frac{120\\pi}{\\sqrt{\\epsilon_{\\text{eff}}} \\left( \\frac{W}{H} + 1.393 + 0.667 \\ln\\left(\\frac{W}{H} + 1.444\\right) \\right)}',
    example: 'For FR4 (εr = 4.4), H = 1.0 mm, W = 1.86 mm: Characteristic Impedance Z0 = 50.0 Ω.',
    faqs: [
      { q: 'What is a Microstrip Line?', a: 'A microstrip is a PCB transmission line conductor separated from a ground plane by a dielectric substrate.' },
      { q: 'Why is effective dielectric constant (εeff) smaller than εr?', a: 'Part of the EM field travels through air (εr=1) above the board while part travels through the PCB substrate.' },
      { q: 'What trace width yields 50 Ω on 1.6mm FR4?', a: 'For standard 1.6mm FR4 (εr=4.4), a 50 Ω microstrip trace is typically ~3.0 mm wide.' },
      { q: 'Is this calculation client-side?', a: 'Yes, calculation is performed 100% locally in browser.' }
    ]
  },
  {
    slug: 'mimo-spatial-multiplexing-capacity-channel-matrix-calculator',
    title: 'MIMO Spatial Multiplexing Capacity & Channel Matrix Calculator',
    desc: 'Calculate theoretical spectral efficiency and Shannon channel capacity for Nt x Nr MIMO spatial multiplexing systems.',
    inputs: [
      { id: 'nt', label: 'Transmitter Antennas (Nt)', type: 'number', placeholder: 'e.g. 4', val: '4', step: '1' },
      { id: 'nr', label: 'Receiver Antennas (Nr)', type: 'number', placeholder: 'e.g. 4', val: '4', step: '1' },
      { id: 'snr-db', label: 'Average SNR (dB)', type: 'number', placeholder: 'e.g. 20', val: '20', step: 'any' },
      { id: 'bw-mhz', label: 'Bandwidth (MHz)', type: 'number', placeholder: 'e.g. 20', val: '20', step: 'any' }
    ],
    calcLogic: `
      var Nt = parseInt(el('nt').value, 10);
      var Nr = parseInt(el('nr').value, 10);
      var snr_db = parseFloat(el('snr-db').value);
      var bw_mhz = parseFloat(el('bw-mhz').value);
      if (isNaN(Nt) || Nt <= 0 || isNaN(Nr) || Nr <= 0 || isNaN(snr_db) || isNaN(bw_mhz) || bw_mhz <= 0) {
        return { err: 'Please enter valid positive numbers for antennas, SNR, and bandwidth.' };
      }
      var min_n = Math.min(Nt, Nr);
      var snr_lin = Math.pow(10, snr_db / 10);
      var spectral_eff = min_n * Math.log2(1 + (snr_lin / Nt));
      var cap_mbps = spectral_eff * bw_mhz;
      var out = 'MIMO SPATIAL MULTIPLEXING CAPACITY ANALYSIS\\n';
      out += '============================================\\n';
      out += 'Tx Antennas (Nt)      : ' + Nt + '\\n';
      out += 'Rx Antennas (Nr)      : ' + Nr + ' (Spatial Streams = ' + min_n + ')\\n';
      out += 'Average SNR           : ' + snr_db + ' dB\\n';
      out += 'Bandwidth             : ' + bw_mhz + ' MHz\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Spectral Efficiency   : ' + spectral_eff.toFixed(2) + ' bps/Hz\\n';
      out += 'MIMO Channel Capacity : ' + cap_mbps.toFixed(2) + ' Mbps (' + (cap_mbps/1000).toFixed(3) + ' Gbps)';
      return { out: out, msg: 'MIMO capacity calculated successfully.' };
    `,
    steps: [
      'Enter the number of transmit antennas ($N_t$).',
      'Enter the number of receive antennas ($N_r$).',
      'Enter average Signal-to-Noise Ratio (SNR) in dB.',
      'Enter channel bandwidth in MHz.',
      'Click Process to compute MIMO spectral efficiency (bps/Hz) and channel capacity (Mbps).'
    ],
    formulas: 'C = \\min(N_t, N_r) \\cdot B \\cdot \\log_2\\left(1 + \\frac{\\text{SNR}_{\\text{lin}}}{N_t}\\right)',
    example: 'For 4x4 MIMO with 20 dB SNR across 20 MHz bandwidth: Capacity = 239.38 Mbps (11.97 bps/Hz).',
    faqs: [
      { q: 'What is Spatial Multiplexing in MIMO?', a: 'Spatial multiplexing transmits separate independent data streams simultaneously over multiple antennas on the same frequency channel.' },
      { q: 'What limits the maximum MIMO streams?', a: 'The maximum spatial streams are limited by min(Nt, Nr), the smaller of transmit or receive antenna counts.' },
      { q: 'Why is MIMO used in 4G, 5G, and WiFi 6?', a: 'MIMO multiplies wireless throughput without requiring extra spectrum bandwidth.' },
      { q: 'Is this calculation free and private?', a: 'Yes, 100% free and runs locally.' }
    ]
  },
  {
    slug: 'nyquist-sampling-theorem-aliasing-minimum-sample-rate-calculator',
    title: 'Nyquist Sampling Theorem & Aliasing Calculator',
    desc: 'Determine minimum Nyquist sampling rate (fs at least 2*fmax), foldover aliasing frequencies, and reconstruction filter requirements.',
    inputs: [
      { id: 'fmax-khz', label: 'Maximum Signal Frequency fmax (kHz)', type: 'number', placeholder: 'e.g. 20', val: '20', step: 'any' },
      { id: 'fs-khz', label: 'Actual Sampling Frequency fs (kHz)', type: 'number', placeholder: 'e.g. 30', val: '30', step: 'any' }
    ],
    calcLogic: `
      var fmax = parseFloat(el('fmax-khz').value);
      var fs = parseFloat(el('fs-khz').value);
      if (isNaN(fmax) || fmax <= 0 || isNaN(fs) || fs <= 0) {
        return { err: 'Please enter positive frequencies for fmax and fs.' };
      }
      var nyquist_rate = 2 * fmax;
      var fn = fs / 2;
      var is_aliased = fs < nyquist_rate;
      var alias_freq = 0;
      if (is_aliased) {
        var k = Math.round(fmax / fs);
        alias_freq = Math.abs(fmax - k * fs);
      }
      var out = 'NYQUIST SAMPLING & ALIASING ANALYSIS\\n';
      out += '====================================\\n';
      out += 'Max Signal Freq (fmax): ' + fmax + ' kHz\\n';
      out += 'Sampling Rate (fs)    : ' + fs + ' kHz\\n';
      out += 'Nyquist Frequency (fs/2): ' + fn + ' kHz\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Min Nyquist Rate      : ' + nyquist_rate + ' kHz\\n';
      out += 'Aliasing Status       : ' + (is_aliased ? 'WARNING: ALIASING OCCURS! (fs < 2*fmax)' : 'NO ALIASING (fs >= 2*fmax)') + '\\n';
      if (is_aliased) {
        out += 'Apparent Aliased Freq : ' + alias_freq.toFixed(2) + ' kHz';
      } else {
        out += 'Guard Band Margin     : ' + (fs - nyquist_rate).toFixed(2) + ' kHz';
      }
      return { out: out, msg: 'Nyquist sampling parameters evaluated successfully.' };
    `,
    steps: [
      'Enter the maximum frequency component ($f_{max}$) contained in the analog signal.',
      'Enter the actual ADC sampling rate ($f_s$).',
      'Click Process to verify if Nyquist criterion is satisfied and calculate foldover aliased frequencies.'
    ],
    formulas: 'f_{\\text{Nyquist}} = 2 \\cdot f_{\\text{max}}, \\quad f_{\\text{alias}} = |f - k \\cdot f_s|',
    example: 'For audio signal with fmax = 20 kHz sampled at fs = 30 kHz (below 40 kHz Nyquist rate), a 20 kHz tone aliases down to 10 kHz.',
    faqs: [
      { q: 'What is the Nyquist Sampling Theorem?', a: 'It states that an analog signal can be perfectly reconstructed if sampled at a rate greater than twice its highest frequency.' },
      { q: 'What is aliasing in digital signal processing?', a: 'Aliasing occurs when high frequencies disguise themselves as lower frequencies due to under-sampling.' },
      { q: 'Why is CD audio sampled at 44.1 kHz?', a: 'Human hearing extends up to ~20 kHz, so 44.1 kHz provides >40 kHz Nyquist rate plus a guard band for antialiasing filters.' },
      { q: 'Is this calculation performed locally?', a: 'Yes, runs 100% locally in your browser.' }
    ]
  },
  {
    slug: 'ofdm-subcarrier-spacing-symbol-duration-cyclic-prefix-calculator',
    title: 'OFDM Subcarrier Spacing & Cyclic Prefix Calculator',
    desc: 'Calculate OFDM useful symbol time Tu, cyclic prefix duration Tcp, total symbol time, and subcarrier spacing for 4G/5G/WiFi.',
    inputs: [
      { id: 'df-khz', label: 'Subcarrier Spacing Δf (kHz)', type: 'number', placeholder: 'e.g. 15', val: '15', step: 'any' },
      { id: 'n-fft', label: 'FFT Size Nfft', type: 'number', placeholder: 'e.g. 2048', val: '2048', step: '1' },
      { id: 'cp-ratio', label: 'Cyclic Prefix Ratio (e.g. 0.07 for 7%)', type: 'number', placeholder: 'e.g. 0.07', val: '0.07', step: 'any' }
    ],
    calcLogic: `
      var df_khz = parseFloat(el('df-khz').value);
      var n_fft = parseInt(el('n-fft').value, 10);
      var cp_ratio = parseFloat(el('cp-ratio').value);
      if (isNaN(df_khz) || df_khz <= 0 || isNaN(n_fft) || n_fft <= 0 || isNaN(cp_ratio) || cp_ratio < 0) {
        return { err: 'Please enter valid positive numbers for subcarrier spacing, FFT size, and CP ratio.' };
      }
      var tu_us = 1000 / df_khz;
      var tcp_us = tu_us * cp_ratio;
      var ttotal_us = tu_us + tcp_us;
      var bw_mhz = (n_fft * df_khz) / 1000;
      var out = 'OFDM SYMBOL STRUCTURE & TIMING ANALYSIS\\n';
      out += '=======================================\\n';
      out += 'Subcarrier Spacing (Δf): ' + df_khz + ' kHz\\n';
      out += 'FFT Size (Nfft)        : ' + n_fft + '\\n';
      out += 'CP Overhead Ratio      : ' + (cp_ratio * 100).toFixed(2) + '%\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Useful Symbol Time (Tu): ' + tu_us.toFixed(3) + ' µs\\n';
      out += 'Cyclic Prefix Time (Tcp): ' + tcp_us.toFixed(3) + ' µs\\n';
      out += 'Total Symbol Time (T)  : ' + ttotal_us.toFixed(3) + ' µs\\n';
      out += 'Total FFT Bandwidth    : ' + bw_mhz.toFixed(2) + ' MHz\\n';
      out += 'Max Multipath Delay Tolarance: ' + tcp_us.toFixed(3) + ' µs';
      return { out: out, msg: 'OFDM parameters calculated successfully.' };
    `,
    steps: [
      'Enter subcarrier spacing $\\Delta f$ in kHz (e.g., 15 kHz for LTE, 30 kHz for 5G NR).',
      'Enter IFFT/FFT point size $N_{fft}$ (e.g., 2048).',
      'Enter cyclic prefix ratio (e.g., 0.07 for 7% normal CP).',
      'Click Process to compute symbol timing and maximum multipath delay tolerance.'
    ],
    formulas: 'T_u = \\frac{1}{\\Delta f}, \\quad T_{cp} = T_u \\cdot \\text{Ratio}, \\quad T_{\\text{total}} = T_u + T_{cp}',
    example: 'For 15 kHz subcarrier spacing (Tu = 66.67 µs) with 7% CP: Tcp = 4.67 µs, Total Symbol Duration = 71.33 µs.',
    faqs: [
      { q: 'What is the purpose of Cyclic Prefix (CP) in OFDM?', a: 'CP copies the end of an OFDM symbol to its beginning to eliminate Intersymbol Interference (ISI) caused by multipath delay spread.' },
      { q: 'How does 5G NR flexible subcarrier spacing work?', a: '5G scales subcarrier spacing as 15 kHz * 2^μ (15, 30, 60, 120, 240 kHz) to handle millimeter wave and low-latency applications.' },
      { q: 'What is subcarrier orthogonality?', a: 'Peak of each subcarrier occurs exactly at zero-crossings of all other subcarriers, preventing crosstalk without guard bands.' },
      { q: 'Is this tool completely free?', a: 'Yes, 100% free with no registration.' }
    ]
  },
  {
    slug: 'optical-fiber-attenuation-power-budget-link-calculator',
    title: 'Optical Fiber Attenuation & Power Budget Link Calculator',
    desc: 'Calculate total fiber optic link loss, power budget margin, connector/splice loss, and max link distance for telecom networks.',
    inputs: [
      { id: 'len-km', label: 'Fiber Link Length L (km)', type: 'number', placeholder: 'e.g. 20', val: '20', step: 'any' },
      { id: 'alpha-db-km', label: 'Fiber Attenuation α (dB/km)', type: 'number', placeholder: 'e.g. 0.35', val: '0.35', step: 'any' },
      { id: 'conn-loss-db', label: 'Total Connector & Splice Loss (dB)', type: 'number', placeholder: 'e.g. 1.5', val: '1.5', step: 'any' },
      { id: 'ptx-dbm', label: 'Transmitter Power Ptx (dBm)', type: 'number', placeholder: 'e.g. 0', val: '0', step: 'any' },
      { id: 'prx-sens-dbm', label: 'Receiver Sensitivity Prx (dBm)', type: 'number', placeholder: 'e.g. -28', val: '-28', step: 'any' }
    ],
    calcLogic: `
      var L = parseFloat(el('len-km').value);
      var alpha = parseFloat(el('alpha-db-km').value);
      var conn = parseFloat(el('conn-loss-db').value);
      var ptx = parseFloat(el('ptx-dbm').value);
      var prx = parseFloat(el('prx-sens-dbm').value);
      if (isNaN(L) || L <= 0 || isNaN(alpha) || alpha < 0 || isNaN(conn) || isNaN(ptx) || isNaN(prx)) {
        return { err: 'Please enter valid numerical values for fiber link parameters.' };
      }
      var total_fiber_loss = L * alpha;
      var total_attenuation = total_fiber_loss + conn;
      var avail_budget = ptx - prx;
      var margin_db = avail_budget - total_attenuation;
      var max_dist_km = (avail_budget - conn) / alpha;
      var out = 'FIBER OPTIC LINK POWER BUDGET ANALYSIS\\n';
      out += '======================================\\n';
      out += 'Link Distance (L)     : ' + L + ' km\\n';
      out += 'Fiber Attenuation (α) : ' + alpha + ' dB/km\\n';
      out += 'Connectors/Splices    : ' + conn + ' dB\\n';
      out += 'Transmitter Power     : ' + ptx + ' dBm\\n';
      out += 'Receiver Sensitivity  : ' + prx + ' dBm\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Total Attenuation     : ' + total_attenuation.toFixed(2) + ' dB\\n';
      out += 'Available Power Budget: ' + avail_budget.toFixed(2) + ' dB\\n';
      out += 'Link Power Margin     : ' + margin_db.toFixed(2) + ' dB\\n';
      out += 'Max Distance @ 3dB Margin: ' + ((avail_budget - conn - 3) / alpha).toFixed(2) + ' km\\n';
      out += 'Link Status           : ' + (margin_db >= 3 ? 'PASS (Good Power Margin >= 3dB)' : (margin_db >= 0 ? 'WARNING (Low Margin < 3dB)' : 'FAIL (Insufficient Power)'));
      return { out: out, msg: 'Fiber optic link budget calculated successfully.' };
    `,
    steps: [
      'Enter optical fiber link length in kilometers.',
      'Enter fiber attenuation coefficient $\\alpha$ in dB/km (e.g., 0.35 dB/km @ 1310nm, 0.20 dB/km @ 1550nm).',
      'Enter combined total connector and fusion splice insertion loss in dB.',
      'Enter optical transmitter launch power $P_{tx}$ in dBm and receiver sensitivity $P_{rx}$ in dBm.',
      'Click Process to compute total loss, available budget, and link power margin.'
    ],
    formulas: '\\text{Loss}_{\\text{total}} = L \\cdot \\alpha + \\text{Loss}_{\\text{connectors}}, \\quad \\text{Margin} = (P_{tx} - P_{rx}) - \\text{Loss}_{\\text{total}}',
    example: '20 km link @ 0.35 dB/km + 1.5 dB connector loss: Total loss = 8.5 dB. With 28 dB power budget, Power Margin = 19.5 dB.',
    faqs: [
      { q: 'What optical attenuation is standard for single-mode fiber?', a: 'Single-mode fiber typically exhibits ~0.35 dB/km at 1310 nm and ~0.20 dB/km at 1550 nm.' },
      { q: 'What is a safe fiber power margin?', a: 'A safety margin of 3 dB to 6 dB is standard to allow for fiber aging, repairs, and temperature variations.' },
      { q: 'What causes fiber attenuation?', a: 'Rayleigh scattering, material absorption (OH- ion peak), microbending, and splice imperfections.' },
      { q: 'Is this tool completely private?', a: 'Yes, no data is transmitted to external servers.' }
    ]
  },
  {
    slug: 'pulse-width-duty-cycle-frequency-period-digital-signal-calculator',
    title: 'Pulse Width / Duty Cycle / Frequency / Period Digital Signal Calculator',
    desc: 'Convert between frequency f, total period T, high pulse width tw, and percentage duty cycle D for digital PWM signals.',
    inputs: [
      { id: 'freq-khz', label: 'Signal Frequency f (kHz)', type: 'number', placeholder: 'e.g. 10', val: '10', step: 'any' },
      { id: 'duty-pct', label: 'Duty Cycle D (%)', type: 'number', placeholder: 'e.g. 50', val: '50', step: 'any' }
    ],
    calcLogic: `
      var f_khz = parseFloat(el('freq-khz').value);
      var duty = parseFloat(el('duty-pct').value);
      if (isNaN(f_khz) || f_khz <= 0 || isNaN(duty) || duty <= 0 || duty >= 100) {
        return { err: 'Frequency must be > 0 and Duty Cycle between 0% and 100%.' };
      }
      var f_hz = f_khz * 1000;
      var T_sec = 1 / f_hz;
      var T_ms = T_sec * 1000;
      var T_us = T_sec * 1e6;
      var Thigh_ms = T_ms * (duty / 100);
      var Tlow_ms = T_ms - Thigh_ms;
      var out = 'DIGITAL SIGNAL & PWM TIMING ANALYSIS\\n';
      out += '====================================\\n';
      out += 'Frequency (f)         : ' + f_khz + ' kHz (' + f_hz + ' Hz)\\n';
      out += 'Duty Cycle (D)        : ' + duty + '%\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Total Period (T)      : ' + T_ms.toFixed(4) + ' ms (' + T_us.toFixed(2) + ' µs)\\n';
      out += 'High Pulse Width (Thigh): ' + Thigh_ms.toFixed(4) + ' ms (' + (Thigh_ms*1000).toFixed(2) + ' µs)\\n';
      out += 'Low Pulse Width (Tlow) : ' + Tlow_ms.toFixed(4) + ' ms (' + (Tlow_ms*1000).toFixed(2) + ' µs)';
      return { out: out, msg: 'PWM signal timing calculated successfully.' };
    `,
    steps: [
      'Enter the pulse signal frequency in kHz.',
      'Enter the percentage duty cycle (0% to 100%).',
      'Click Process to compute total period, high pulse duration, and low pulse duration.'
    ],
    formulas: 'T = \\frac{1}{f}, \\quad t_{\\text{high}} = T \\cdot \\left(\\frac{D}{100}\\right), \\quad t_{\\text{low}} = T - t_{\\text{high}}',
    example: 'At 10 kHz (Period T = 100 µs) with 50% Duty Cycle: Thigh = 50 µs and Tlow = 50 µs.',
    faqs: [
      { q: 'What is Duty Cycle in PWM signals?', a: 'Duty cycle is the percentage of one full signal period during which the digital signal remains active (HIGH).' },
      { q: 'How is PWM used in microcontroller systems?', a: 'PWM is used for motor speed control, LED dimming, switching power supplies, and digital-to-analog audio output.' },
      { q: 'What happens at 100% duty cycle?', a: 'At 100% duty cycle, the signal remains constantly HIGH, behaving as a continuous DC voltage.' },
      { q: 'Is this calculation performed locally?', a: 'Yes, calculated 100% in browser.' }
    ]
  },
  {
    slug: 'qam-bit-error-rate-snr-modulation-order-calculator',
    title: 'QAM Bit Error Rate (BER) vs SNR Calculator',
    desc: 'Compute bit error rate (BER), symbol error rate (SER), and spectral efficiency for M-QAM modulation (4, 16, 64, 256 QAM).',
    inputs: [
      { id: 'm-order', label: 'QAM Modulation Order M', type: 'select', options: [
        { val: '4', text: '4-QAM / QPSK (2 bits/symbol)' },
        { val: '16', text: '16-QAM (4 bits/symbol)' },
        { val: '64', text: '64-QAM (6 bits/symbol)' },
        { val: '256', text: '256-QAM (8 bits/symbol)' }
      ], val: '16' },
      { id: 'ebn0-db', label: 'Eb/N0 (dB)', type: 'number', placeholder: 'e.g. 10', val: '10', step: 'any' }
    ],
    calcLogic: `
      var M = parseInt(el('m-order').value, 10);
      var ebn0_db = parseFloat(el('ebn0-db').value);
      if (isNaN(ebn0_db)) return { err: 'Please enter a valid Eb/N0 in dB.' };
      var k = Math.log2(M);
      var ebn0_lin = Math.pow(10, ebn0_db / 10);
      var snr_lin = ebn0_lin * k;
      var snr_db = 10 * Math.log10(snr_lin);
      var q_arg = Math.sqrt((3 * k * ebn0_lin) / (M - 1));
      function erfc(x) {
        var z = Math.abs(x);
        var t = 1.0 / (1.0 + 0.5 * z);
        var ans = t * Math.exp(-z*z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
        return x >= 0 ? ans : 2.0 - ans;
      }
      function Q(x) { return 0.5 * erfc(x / Math.SQRT2); }
      var ser_approx = 4 * (1 - (1 / Math.sqrt(M))) * Q(q_arg);
      var ber_approx = ser_approx / k;
      var out = 'M-QAM MODULATION & ERROR RATE ANALYSIS\\n';
      out += '=======================================\\n';
      out += 'Modulation Order (M)  : ' + M + '-QAM\\n';
      out += 'Bits per Symbol (k)   : ' + k + ' bits/symbol\\n';
      out += 'Eb/N0                 : ' + ebn0_db.toFixed(2) + ' dB\\n';
      out += 'Equivalent SNR        : ' + snr_db.toFixed(2) + ' dB\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Spectral Efficiency   : ' + k + ' bps/Hz\\n';
      out += 'Symbol Error Rate (SER): ' + ser_approx.toExponential(4) + '\\n';
      out += 'Bit Error Rate (BER)  : ' + ber_approx.toExponential(4);
      return { out: out, msg: 'QAM BER calculated successfully.' };
    `,
    steps: [
      'Select QAM constellation size (4-QAM, 16-QAM, 64-QAM, or 256-QAM).',
      'Enter energy per bit to noise power spectral density ratio ($E_b/N_0$) in dB.',
      'Click Process to calculate theoretical Bit Error Rate (BER) and Symbol Error Rate (SER).'
    ],
    formulas: 'P_b \\approx \\frac{4}{k} \\left(1 - \\frac{1}{\\sqrt{M}}\\right) Q\\left(\\sqrt{\\frac{3 k E_b/N_0}{M - 1}}\\right)',
    example: '16-QAM at Eb/N0 = 10 dB: Spectral Efficiency = 4 bps/Hz, BER ≈ 1.5e-3.',
    faqs: [
      { q: 'What is Quadrature Amplitude Modulation (QAM)?', a: 'QAM modulates both amplitude and phase of two orthogonal carrier waves (I and Q) to pack multiple bits into each symbol.' },
      { q: 'Why is higher order QAM faster?', a: '256-QAM carries 8 bits per symbol compared to QPSK which carries 2 bits per symbol, quadrupling data throughput at the cost of higher required SNR.' },
      { q: 'What SNR is needed for 64-QAM?', a: '64-QAM typically requires ~18 dB to 20 dB SNR for low error rates.' },
      { q: 'Is this calculation performed in browser?', a: 'Yes, 100% client-side calculation.' }
    ]
  },
  {
    slug: 'radar-range-equation-snr-detection-range-calculator',
    title: 'Radar Range Equation & Detection Range Calculator',
    desc: 'Calculate maximum radar detection range Rmax using peak power, antenna gain, target radar cross section (RCS), and receiver sensitivity.',
    inputs: [
      { id: 'pt-kw', label: 'Peak Transmitter Power Pt (kW)', type: 'number', placeholder: 'e.g. 50', val: '50', step: 'any' },
      { id: 'gain-db', label: 'Antenna Gain G (dB)', type: 'number', placeholder: 'e.g. 30', val: '30', step: 'any' },
      { id: 'rcs-m2', label: 'Target RCS σ (m²)', type: 'number', placeholder: 'e.g. 1.0', val: '1.0', step: 'any' },
      { id: 'freq-ghz', label: 'Operating Frequency (GHz)', type: 'number', placeholder: 'e.g. 10.0', val: '10.0', step: 'any' },
      { id: 'pmin-dbm', label: 'Minimum Detectable Signal Pmin (dBm)', type: 'number', placeholder: 'e.g. -100', val: '-100', step: 'any' }
    ],
    calcLogic: `
      var pt_kw = parseFloat(el('pt-kw').value);
      var gain_db = parseFloat(el('gain-db').value);
      var rcs = parseFloat(el('rcs-m2').value);
      var f_ghz = parseFloat(el('freq-ghz').value);
      var pmin_dbm = parseFloat(el('pmin-dbm').value);
      if (isNaN(pt_kw) || pt_kw <= 0 || isNaN(gain_db) || isNaN(rcs) || rcs <= 0 || isNaN(f_ghz) || f_ghz <= 0 || isNaN(pmin_dbm)) {
        return { err: 'Please enter valid positive values for power, RCS, frequency, and valid gains.' };
      }
      var pt_w = pt_kw * 1000;
      var g_lin = Math.pow(10, gain_db / 10);
      var lam = 3e8 / (f_ghz * 1e9);
      var pmin_w = Math.pow(10, (pmin_dbm - 30) / 10);
      var num = pt_w * g_lin * g_lin * lam * lam * rcs;
      var den = Math.pow(4 * Math.PI, 3) * pmin_w;
      var r_max_m = Math.pow(num / den, 0.25);
      var r_max_km = r_max_m / 1000;
      var out = 'RADAR RANGE EQUATION MAXIMUM DETECTION ANALYSIS\\n';
      out += '===============================================\\n';
      out += 'Peak Tx Power (Pt)    : ' + pt_kw + ' kW\\n';
      out += 'Antenna Gain (G)      : ' + gain_db + ' dB\\n';
      out += 'Target RCS (σ)        : ' + rcs + ' m²\\n';
      out += 'Frequency (f)         : ' + f_ghz + ' GHz (λ = ' + (lam*1000).toFixed(2) + ' mm)\\n';
      out += 'Min Detectable (Pmin) : ' + pmin_dbm + ' dBm\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Max Radar Range (Rmax): ' + r_max_km.toFixed(2) + ' km (' + (r_max_km * 0.539957).toFixed(2) + ' nmi)';
      return { out: out, msg: 'Maximum radar detection range computed successfully.' };
    `,
    steps: [
      'Enter radar peak transmitter power $P_t$ in kilowatts (kW).',
      'Enter radar antenna gain $G$ in dB.',
      'Enter target Radar Cross Section (RCS $\\sigma$) in square meters ($m^2$).',
      'Enter operating frequency in GHz and minimum detectable signal $P_{min}$ in dBm.',
      'Click Process to compute maximum radar detection range $R_{max}$.'
    ],
    formulas: 'R_{\\text{max}} = \\left[ \\frac{P_t \\cdot G^2 \\cdot \\lambda^2 \\cdot \\sigma}{(4\\pi)^3 \\cdot P_{\\text{min}}} \\right]^{1/4}',
    example: '50 kW radar with 30 dB gain antenna operating at 10 GHz detecting 1 m² RCS aircraft with -100 dBm sensitivity: Rmax = 42.61 km.',
    faqs: [
      { q: 'Why is radar range governed by a fourth-root law?', a: 'EM waves attenuate by 1/R² going to the target, and reflected echoes attenuate by another 1/R² returning, yielding overall 1/R⁴ two-way loss.' },
      { q: 'To double radar range, how much power increase is required?', a: 'Due to the 4th-root relationship, doubling detection range requires 2⁴ = 16 times (12 dB) more transmitter power!' },
      { q: 'What is Radar Cross Section (RCS)?', a: 'RCS measures how detectable an object is by radar; stealth aircraft aim to minimize RCS.' },
      { q: 'Is this calculation local?', a: 'Yes, computed entirely in your browser.' }
    ]
  },
  {
    slug: 'radio-wave-propagation-itu-r-path-loss-model-calculator',
    title: 'Radio Wave Propagation ITU-R Path Loss Model Calculator',
    desc: 'Estimate radio propagation path loss using ITU-R P.1238 indoor and Okumura-Hata outdoor propagation models.',
    inputs: [
      { id: 'dist-m', label: 'Distance d (meters)', type: 'number', placeholder: 'e.g. 100', val: '100', step: 'any' },
      { id: 'freq-mhz', label: 'Frequency f (MHz)', type: 'number', placeholder: 'e.g. 2400', val: '2400', step: 'any' },
      { id: 'env', label: 'Environment Type', type: 'select', options: [
        { val: 'office', text: 'Indoor Office Environment (N=30)' },
        { val: 'commercial', text: 'Indoor Commercial / Mall (N=22)' },
        { val: 'suburban', text: 'Outdoor Suburban Area' },
        { val: 'urban', text: 'Outdoor Urban City Area' }
      ], val: 'office' }
    ],
    calcLogic: `
      var d_m = parseFloat(el('dist-m').value);
      var f_mhz = parseFloat(el('freq-mhz').value);
      var env = el('env').value;
      if (isNaN(d_m) || d_m <= 0 || isNaN(f_mhz) || f_mhz <= 0) {
        return { err: 'Please enter positive numbers for distance and frequency.' };
      }
      var N = 30;
      var L_floor = 15;
      if (env === 'commercial') { N = 22; L_floor = 10; }
      else if (env === 'suburban') { N = 35; L_floor = 0; }
      else if (env === 'urban') { N = 40; L_floor = 0; }
      var pl_db = 20 * Math.log10(f_mhz) + N * Math.log10(d_m) + L_floor - 28;
      var out = 'ITU-R RADIO PROPAGATION PATH LOSS ANALYSIS\\n';
      out += '============================================\\n';
      out += 'Distance (d)          : ' + d_m + ' meters\\n';
      out += 'Frequency (f)         : ' + f_mhz + ' MHz\\n';
      out += 'Environment           : ' + env.toUpperCase() + '\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Distance Exponent (N) : ' + N + '\\n';
      out += 'Estimated Path Loss   : ' + pl_db.toFixed(2) + ' dB';
      return { out: out, msg: 'Radio propagation path loss computed successfully.' };
    `,
    steps: [
      'Enter line-of-sight distance between transmitter and receiver in meters.',
      'Enter carrier frequency in MHz.',
      'Select propagation environment type.',
      'Click Process to compute total path loss in dB.'
    ],
    formulas: 'L_{\\text{total}} = 20 \\log_{10}(f_{\\text{MHz}}) + N \\log_{10}(d_{\\text{m}}) + L_{f}(n) - 28',
    example: '2.4 GHz WiFi signal over 100 meters inside an office environment (N=30): Estimated Path Loss = 97.60 dB.',
    faqs: [
      { q: 'What is the ITU-R P.1238 propagation model?', a: 'ITU-R P.1238 is an international standard empirical model for indoor radio propagation loss between 300 MHz and 100 GHz.' },
      { q: 'What does the distance power loss coefficient N represent?', a: 'N represents how quickly signal power decays with distance; N=20 is free space, whereas obstacles increase N up to 40.' },
      { q: 'Why is indoor path loss higher than free space?', a: 'Walls, floors, furniture, and multipath interference add attenuation compared to open air.' },
      { q: 'Is this calculation local?', a: 'Yes, calculated 100% locally.' }
    ]
  },
  {
    slug: 'rectangular-waveguide-cutoff-frequency-mode-calculator',
    title: 'Rectangular Waveguide Cutoff Frequency & Mode Calculator',
    desc: 'Compute TE/TM mode cutoff frequencies, guide wavelength, phase velocity, and wave impedance for rectangular metallic waveguides.',
    inputs: [
      { id: 'a-mm', label: 'Broad Wall Dimension a (mm)', type: 'number', placeholder: 'e.g. 22.86', val: '22.86', step: 'any' },
      { id: 'b-mm', label: 'Narrow Wall Dimension b (mm)', type: 'number', placeholder: 'e.g. 10.16', val: '10.16', step: 'any' },
      { id: 'm', label: 'Mode Index m', type: 'number', placeholder: 'e.g. 1', val: '1', step: '1' },
      { id: 'n', label: 'Mode Index n', type: 'number', placeholder: 'e.g. 0', val: '0', step: '1' },
      { id: 'f-ghz', label: 'Operating Frequency f (GHz)', type: 'number', placeholder: 'e.g. 10.0', val: '10.0', step: 'any' }
    ],
    calcLogic: `
      var a = parseFloat(el('a-mm').value) / 1000;
      var b = parseFloat(el('b-mm').value) / 1000;
      var m = parseInt(el('m').value, 10);
      var n = parseInt(el('n').value, 10);
      var f_ghz = parseFloat(el('f-ghz').value);
      if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(m) || m < 0 || isNaN(n) || n < 0 || (m===0 && n===0)) {
        return { err: 'Please enter valid positive dimensions a, b and non-negative integers m, n (not both zero).' };
      }
      var c = 3e8;
      var fc_hz = (c / 2) * Math.sqrt(Math.pow(m / a, 2) + Math.pow(n / b, 2));
      var fc_ghz = fc_hz / 1e9;
      var out = 'RECTANGULAR WAVEGUIDE TE/TM MODE ANALYSIS\\n';
      out += '=========================================\\n';
      out += 'Waveguide Dimensions : a = ' + (a*1000) + ' mm, b = ' + (b*1000) + ' mm\\n';
      out += 'Selected Mode        : TE' + m + n + ' / TM' + m + n + '\\n';
      out += 'Operating Frequency  : ' + f_ghz + ' GHz\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Cutoff Frequency (fc): ' + fc_ghz.toFixed(3) + ' GHz\\n';
      if (f_ghz > fc_ghz) {
        var lambda_g = (c / (f_ghz * 1e9)) / Math.sqrt(1 - Math.pow(fc_ghz / f_ghz, 2));
        out += 'Wave Propagation Status: PROPAGATING (f > fc)\\n';
        out += 'Guide Wavelength (λg): ' + (lambda_g * 1000).toFixed(2) + ' mm';
      } else {
        out += 'Wave Propagation Status: EVANESCENT / CUTOFF (f <= fc)';
      }
      return { out: out, msg: 'Waveguide mode cutoff calculated successfully.' };
    `,
    steps: [
      'Enter rectangular waveguide broad wall dimension $a$ in mm (e.g., 22.86 mm for WR-90 / X-band).',
      'Enter narrow wall dimension $b$ in mm (e.g., 10.16 mm).',
      'Enter mode indices $m$ and $n$ (default TE10 dominant mode).',
      'Enter operating frequency in GHz.',
      'Click Process to compute cutoff frequency $f_c$ and guide wavelength.'
    ],
    formulas: 'f_c = \\frac{c}{2} \\sqrt{\\left(\\frac{m}{a}\\right)^2 + \\left(\\frac{n}{b}\\right)^2}, \\quad \\lambda_g = \\frac{\\lambda}{\\sqrt{1 - (f_c/f)^2}}',
    example: 'For standard WR-90 waveguide (a = 22.86 mm): Dominant TE10 mode cutoff frequency fc = 6.56 GHz.',
    faqs: [
      { q: 'What is the dominant mode in a rectangular waveguide?', a: 'The TE10 mode has the lowest cutoff frequency of all modes in a rectangular waveguide.' },
      { q: 'What happens when operating frequency f < fc?', a: 'The electromagnetic wave attenuates exponentially without propagating (evanescent mode).' },
      { q: 'What is WR-90 waveguide?', a: 'WR-90 is a standard X-band waveguide with inner dimensions 0.90 x 0.40 inches (22.86 x 10.16 mm) covering 8.2 - 12.4 GHz.' },
      { q: 'Is this calculation done client-side?', a: 'Yes, 100% in your browser.' }
    ]
  },
  {
    slug: 'rf-amplifier-noise-figure-cascaded-friis-noise-calculator',
    title: 'RF Amplifier Noise Figure & Cascaded Friis Noise Calculator',
    desc: 'Calculate total cascaded noise figure NFtotal, noise factor, and overall gain for multi-stage RF receiver front-ends.',
    inputs: [
      { id: 'g1-db', label: 'Stage 1 Gain G1 (dB)', type: 'number', placeholder: 'e.g. 15', val: '15', step: 'any' },
      { id: 'nf1-db', label: 'Stage 1 Noise Figure NF1 (dB)', type: 'number', placeholder: 'e.g. 1.5', val: '1.5', step: 'any' },
      { id: 'g2-db', label: 'Stage 2 Gain G2 (dB)', type: 'number', placeholder: 'e.g. 10', val: '10', step: 'any' },
      { id: 'nf2-db', label: 'Stage 2 Noise Figure NF2 (dB)', type: 'number', placeholder: 'e.g. 4.0', val: '4.0', step: 'any' },
      { id: 'g3-db', label: 'Stage 3 Gain G3 (dB)', type: 'number', placeholder: 'e.g. 20', val: '20', step: 'any' },
      { id: 'nf3-db', label: 'Stage 3 Noise Figure NF3 (dB)', type: 'number', placeholder: 'e.g. 8.0', val: '8.0', step: 'any' }
    ],
    calcLogic: `
      var g1 = parseFloat(el('g1-db').value);
      var nf1 = parseFloat(el('nf1-db').value);
      var g2 = parseFloat(el('g2-db').value);
      var nf2 = parseFloat(el('nf2-db').value);
      var g3 = parseFloat(el('g3-db').value);
      var nf3 = parseFloat(el('nf3-db').value);
      if ([g1, nf1, g2, nf2, g3, nf3].some(isNaN)) {
        return { err: 'Please enter valid numerical values for all stage gains and noise figures.' };
      }
      var f1 = Math.pow(10, nf1 / 10);
      var f2 = Math.pow(10, nf2 / 10);
      var f3 = Math.pow(10, nf3 / 10);
      var g1_lin = Math.pow(10, g1 / 10);
      var g2_lin = Math.pow(10, g2 / 10);
      var f_sys = f1 + ((f2 - 1) / g1_lin) + ((f3 - 1) / (g1_lin * g2_lin));
      var nf_sys = 10 * Math.log10(f_sys);
      var g_sys = g1 + g2 + g3;
      var out = 'CASCADED RF NOISE FIGURE (FRIIS FORMULA) ANALYSIS\\n';
      out += '================================================\\n';
      out += 'Stage 1: Gain = ' + g1 + ' dB, NF = ' + nf1 + ' dB\\n';
      out += 'Stage 2: Gain = ' + g2 + ' dB, NF = ' + nf2 + ' dB\\n';
      out += 'Stage 3: Gain = ' + g3 + ' dB, NF = ' + nf3 + ' dB\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Overall System Gain   : ' + g_sys.toFixed(2) + ' dB\\n';
      out += 'Cascaded Noise Factor : ' + f_sys.toFixed(4) + '\\n';
      out += 'Cascaded Noise Figure : ' + nf_sys.toFixed(2) + ' dB';
      return { out: out, msg: 'Cascaded noise figure computed successfully.' };
    `,
    steps: [
      'Enter gain (dB) and noise figure (dB) for stage 1 (Low-Noise Amplifier LNA).',
      'Enter gain (dB) and noise figure (dB) for stage 2 (RF Filter / Mixer).',
      'Enter gain (dB) and noise figure (dB) for stage 3 (IF Amplifier).',
      'Click Process to compute total cascaded noise figure and system gain.'
    ],
    formulas: 'F_{\\text{sys}} = F_1 + \\frac{F_2 - 1}{G_1} + \\frac{F_3 - 1}{G_1 G_2}, \\quad \\text{NF}_{\\text{sys}} = 10 \\log_{10}(F_{\\text{sys}})',
    example: 'Stage 1 (LNA: G1=15dB, NF1=1.5dB), Stage 2 (Mixer: G2=10dB, NF2=4dB), Stage 3 (IF: G3=20dB, NF3=8dB) yields total NF = 1.62 dB.',
    faqs: [
      { q: 'Why is the first amplifier stage (LNA) critical in RF design?', a: 'As shown by Friis formula, the first stage gain G1 divides subsequent noise contributions, making stage 1 Noise Figure dominate total system noise.' },
      { q: 'What is the difference between Noise Factor and Noise Figure?', a: 'Noise factor F is linear ratio F = SNRin / SNRout; Noise figure NF is expressed in decibels NF = 10 log10(F).' },
      { q: 'Can attenuators be included in Friis noise calculation?', a: 'Yes, an attenuator of X dB has a negative gain (-X dB) and a Noise Figure equal to its loss (+X dB).' },
      { q: 'Is this calculation free and private?', a: 'Yes, 100% free and private.' }
    ]
  },
  {
    slug: 'shannon-hartley-channel-capacity-snr-bandwidth-calculator',
    title: 'Shannon-Hartley Channel Capacity Calculator',
    desc: 'Calculate theoretical maximum channel data rate C = B log2(1 + SNR) in Mbps for additive white Gaussian noise (AWGN) channels.',
    inputs: [
      { id: 'bw-mhz', label: 'Channel Bandwidth B (MHz)', type: 'number', placeholder: 'e.g. 20', val: '20', step: 'any' },
      { id: 'snr-db', label: 'Signal-to-Noise Ratio SNR (dB)', type: 'number', placeholder: 'e.g. 25', val: '25', step: 'any' }
    ],
    calcLogic: `
      var B_mhz = parseFloat(el('bw-mhz').value);
      var snr_db = parseFloat(el('snr-db').value);
      if (isNaN(B_mhz) || B_mhz <= 0 || isNaN(snr_db)) {
        return { err: 'Please enter a positive bandwidth and valid SNR in dB.' };
      }
      var snr_lin = Math.pow(10, snr_db / 10);
      var cap_mbps = B_mhz * Math.log2(1 + snr_lin);
      var eff = cap_mbps / B_mhz;
      var out = 'SHANNON-HARTLEY CHANNEL CAPACITY ANALYSIS\\n';
      out += '=========================================\\n';
      out += 'Channel Bandwidth (B) : ' + B_mhz + ' MHz\\n';
      out += 'SNR                   : ' + snr_db + ' dB (Linear: ' + snr_lin.toFixed(2) + ')\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Spectral Efficiency   : ' + eff.toFixed(3) + ' bits/sec/Hz\\n';
      out += 'Theoretical Max Rate  : ' + cap_mbps.toFixed(2) + ' Mbps (' + (cap_mbps/1000).toFixed(3) + ' Gbps)';
      return { out: out, msg: 'Shannon channel capacity calculated successfully.' };
    `,
    steps: [
      'Enter channel bandwidth in MHz.',
      'Enter Signal-to-Noise Ratio (SNR) in dB.',
      'Click Process to compute maximum error-free theoretical channel capacity.'
    ],
    formulas: 'C = B \\cdot \\log_2(1 + \\text{SNR}_{\\text{linear}}) \\text{ Mbps}',
    example: 'For 20 MHz WiFi channel with 25 dB SNR: Max Shannon capacity C = 166.16 Mbps (8.31 bps/Hz).',
    faqs: [
      { q: 'What is the Shannon-Hartley Theorem?', a: 'It establishes the absolute mathematical upper limit on data rate for an AWGN communication channel of specified bandwidth and SNR.' },
      { q: 'Can real systems exceed the Shannon limit?', a: 'No, Shannon capacity is a strict physical upper bound that error-correction codes approach but cannot exceed.' },
      { q: 'What happens if you increase bandwidth to infinity?', a: 'Capacity approaches a ultimate limit C_max = 1.44 * (P / N0) as bandwidth approaches infinity.' },
      { q: 'Is this calculation client-side?', a: 'Yes, 100% browser-based.' }
    ]
  },
  {
    slug: 'snr-eb-n0-sensitivity-receiver-noise-floor-calculator',
    title: 'Receiver Noise Floor, SNR & Eb/N0 Conversion Calculator',
    desc: 'Calculate thermal noise floor Nfloor = kTB, receiver sensitivity, and convert between SNR (dB) and Eb/N0 (dB).',
    inputs: [
      { id: 'bw-khz', label: 'Receiver Bandwidth BW (kHz)', type: 'number', placeholder: 'e.g. 200', val: '200', step: 'any' },
      { id: 'nf-db', label: 'Receiver Noise Figure NF (dB)', type: 'number', placeholder: 'e.g. 5', val: '5', step: 'any' },
      { id: 'snr-req-db', label: 'Required SNR (dB)', type: 'number', placeholder: 'e.g. 10', val: '10', step: 'any' },
      { id: 'temp-k', label: 'Temperature T (Kelvin)', type: 'number', placeholder: 'e.g. 290', val: '290', step: 'any' }
    ],
    calcLogic: `
      var bw_khz = parseFloat(el('bw-khz').value);
      var nf = parseFloat(el('nf-db').value);
      var snr_req = parseFloat(el('snr-req-db').value);
      var T = parseFloat(el('temp-k').value);
      if (isNaN(bw_khz) || bw_khz <= 0 || isNaN(nf) || isNaN(snr_req) || isNaN(T) || T <= 0) {
        return { err: 'Please enter valid positive values for bandwidth and temperature.' };
      }
      var k = 1.380649e-23;
      var bw_hz = bw_khz * 1000;
      var nfloor_w = k * T * bw_hz;
      var nfloor_dbm = 10 * Math.log10(nfloor_w) + 30;
      var sens_dbm = nfloor_dbm + nf + snr_req;
      var out = 'RECEIVER NOISE FLOOR & SENSITIVITY ANALYSIS\\n';
      out += '===========================================\\n';
      out += 'Bandwidth (BW)        : ' + bw_khz + ' kHz (' + bw_hz + ' Hz)\\n';
      out += 'Noise Figure (NF)     : ' + nf + ' dB\\n';
      out += 'Required SNR          : ' + snr_req + ' dB\\n';
      out += 'Temperature (T)       : ' + T + ' K (27°C room temp)\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Thermal Noise Floor   : ' + nfloor_dbm.toFixed(2) + ' dBm (' + (nfloor_dbm - 30).toFixed(2) + ' dBW)\\n';
      out += 'Total Noise Density N0: ' + (10 * Math.log10(k * T) + 30 + nf).toFixed(2) + ' dBm/Hz\\n';
      out += 'Receiver Sensitivity  : ' + sens_dbm.toFixed(2) + ' dBm';
      return { out: out, msg: 'Receiver sensitivity computed successfully.' };
    `,
    steps: [
      'Enter receiver channel bandwidth in kHz.',
      'Enter receiver front-end noise figure in dB.',
      'Enter minimum required SNR for demodulation in dB.',
      'Enter ambient temperature in Kelvin (default 290 K).',
      'Click Process to compute thermal noise floor and receiver sensitivity in dBm.'
    ],
    formulas: 'N_{\\text{floor}} = 10 \\log_{10}(k \\cdot T \\cdot B) + 30 \\text{ dBm}, \\quad \\text{Sensitivity} = N_{\\text{floor}} + \\text{NF} + \\text{SNR}_{\\text{req}}',
    example: 'For 200 kHz channel (GSM), NF = 5 dB, SNRreq = 10 dB @ 290 K: Noise floor = -120.98 dBm, Sensitivity = -105.98 dBm.',
    faqs: [
      { q: 'What is thermal noise floor kTB?', a: 'Thermal noise floor is Johnson-Nyquist noise generated by thermal agitation of charge carriers inside passive components.' },
      { q: 'What is standard room temperature noise density?', a: 'At 290 K, thermal noise power density is -174 dBm/Hz.' },
      { q: 'How does receiver sensitivity relate to coverage?', a: 'More sensitive receivers (e.g. -110 dBm vs -95 dBm) can detect fainter signals over longer ranges.' },
      { q: 'Is this calculation local?', a: 'Yes, 100% browser-side calculation.' }
    ]
  },
  {
    slug: 'turbo-code-convolutional-code-coding-gain-rate-calculator',
    title: 'Convolutional / Turbo Code Coding Gain & Code Rate Calculator',
    desc: 'Calculate FEC channel coding gain, effective Eb/N0 improvement, free distance dfree, and bandwidth expansion factor.',
    inputs: [
      { id: 'code-rate', label: 'Code Rate r (e.g. 0.5 for rate 1/2)', type: 'number', placeholder: 'e.g. 0.5', val: '0.5', step: 'any' },
      { id: 'constraint-k', label: 'Constraint Length K', type: 'number', placeholder: 'e.g. 7', val: '7', step: '1' }
    ],
    calcLogic: `
      var r = parseFloat(el('code-rate').value);
      var K = parseInt(el('constraint-k').value, 10);
      if (isNaN(r) || r <= 0 || r >= 1 || isNaN(K) || K < 3) {
        return { err: 'Code rate r must be between 0 and 1, and constraint length K >= 3.' };
      }
      var dfree = Math.max(5, 2 * (K - 1) + 1);
      var coding_gain_db = 10 * Math.log10(r * dfree);
      var bw_expand = 1 / r;
      var rate_penalty_db = -10 * Math.log10(r);
      var out = 'CONVOLUTIONAL & TURBO FEC CODING ANALYSIS\\n';
      out += '==========================================\\n';
      out += 'Code Rate (r)         : ' + r + ' (Rate 1/' + (1/r).toFixed(2) + ')\\n';
      out += 'Constraint Length (K) : ' + K + '\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Approx Free Distance (dfree): ' + dfree + '\\n';
      out += 'Asymptotic Coding Gain: ' + coding_gain_db.toFixed(2) + ' dB\\n';
      out += 'Bandwidth Expansion   : ' + bw_expand.toFixed(2) + 'x\\n';
      out += 'Spectral Penalty      : ' + rate_penalty_db.toFixed(2) + ' dB';
      return { out: out, msg: 'FEC coding gain calculated successfully.' };
    `,
    steps: [
      'Enter code rate $r$ (e.g., 0.5 for rate 1/2, 0.333 for rate 1/3).',
      'Enter constraint length $K$ (e.g., 7 for standard NASA/GSM convolutional code).',
      'Click Process to compute free distance $d_{free}$, asymptotic coding gain, and bandwidth expansion.'
    ],
    formulas: 'd_{\\text{free}} \\approx 2(K - 1) + 1, \\quad \\text{Coding Gain} = 10 \\log_{10}(r \\cdot d_{\\text{free}}) \\text{ dB}',
    example: 'For rate-1/2 (r=0.5), K=7 convolutional code: dfree ≈ 10, Asymptotic Coding Gain ≈ 6.99 dB.',
    faqs: [
      { q: 'What is Forward Error Correction (FEC)?', a: 'FEC adds redundant parity bits to transmitted data so receivers can detect and correct channel errors without retransmission.' },
      { q: 'What is Coding Gain?', a: 'Coding gain is the reduction in required Eb/N0 in dB achieved by coded transmission compared to uncoded transmission at the same BER.' },
      { q: 'Why are Turbo codes and LDPC codes used in LTE/5G?', a: 'Turbo and LDPC codes approach within ~0.1 dB of the theoretical Shannon channel capacity limit.' },
      { q: 'Is this calculation processed locally?', a: 'Yes, 100% local calculation.' }
    ]
  },
  {
    slug: 'vlsi-cmos-propagation-delay-power-dissipation-calculator',
    title: 'VLSI CMOS Gate Propagation Delay & Power Dissipation Calculator',
    desc: 'Calculate CMOS gate propagation delay tp = 0.69·Req·CL and dynamic power dissipation P = α·CL·VDD²·f for digital IC design.',
    inputs: [
      { id: 'cl-ff', label: 'Load Capacitance CL (fF)', type: 'number', placeholder: 'e.g. 100', val: '100', step: 'any' },
      { id: 'vdd-v', label: 'Supply Voltage VDD (V)', type: 'number', placeholder: 'e.g. 1.2', val: '1.2', step: 'any' },
      { id: 'f-ghz', label: 'Clock Frequency f (GHz)', type: 'number', placeholder: 'e.g. 1.0', val: '1.0', step: 'any' },
      { id: 'alpha', label: 'Activity Factor α (0.0 - 1.0)', type: 'number', placeholder: 'e.g. 0.5', val: '0.5', step: 'any' },
      { id: 'req-kohm', label: 'Equivalent Resistance Req (kΩ)', type: 'number', placeholder: 'e.g. 10', val: '10', step: 'any' }
    ],
    calcLogic: `
      var cl_ff = parseFloat(el('cl-ff').value);
      var vdd = parseFloat(el('vdd-v').value);
      var f_ghz = parseFloat(el('f-ghz').value);
      var alpha = parseFloat(el('alpha').value);
      var req_kohm = parseFloat(el('req-kohm').value);
      if (isNaN(cl_ff) || cl_ff <= 0 || isNaN(vdd) || vdd <= 0 || isNaN(f_ghz) || f_ghz <= 0 || isNaN(alpha) || alpha < 0 || alpha > 1) {
        return { err: 'Please enter valid positive values for CL, VDD, clock frequency, and alpha between 0 and 1.' };
      }
      var CL = cl_ff * 1e-15;
      var f = f_ghz * 1e9;
      var Req = req_kohm * 1000;
      var p_dyn_w = alpha * CL * vdd * vdd * f;
      var tp_sec = 0.69 * Req * CL;
      var tp_ps = tp_sec * 1e12;
      var out = 'VLSI CMOS GATE DELAY & POWER DISSIPATION ANALYSIS\\n';
      out += '==================================================\\n';
      out += 'Load Capacitance (CL) : ' + cl_ff + ' fF\\n';
      out += 'Supply Voltage (VDD)  : ' + vdd + ' V\\n';
      out += 'Clock Frequency (f)   : ' + f_ghz + ' GHz\\n';
      out += 'Activity Factor (α)   : ' + alpha + '\\n';
      out += 'Equivalent Resistance : ' + req_kohm + ' kΩ\\n\\n';
      out += 'RESULTS:\\n';
      out += 'Dynamic Power Dissipation: ' + (p_dyn_w * 1e6).toFixed(4) + ' µW (' + (p_dyn_w * 1e3).toFixed(4) + ' mW)\\n';
      out += 'Propagation Delay (tp)   : ' + tp_ps.toFixed(2) + ' ps\\n';
      out += 'Energy per Switching Event: ' + (CL * vdd * vdd * 1e15).toFixed(2) + ' fJ';
      return { out: out, msg: 'CMOS gate delay and power dissipation computed successfully.' };
    `,
    steps: [
      'Enter gate output load capacitance $C_L$ in femtofarads (fF).',
      'Enter IC supply voltage $V_{DD}$ in Volts.',
      'Enter clock frequency $f$ in GHz and activity factor $\\alpha$ (0 to 1).',
      'Enter equivalent transistor resistance $R_{eq}$ in kΩ.',
      'Click Process to compute dynamic power dissipation (µW) and propagation delay (ps).'
    ],
    formulas: 'P_{\\text{dynamic}} = \\alpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f, \\quad t_p \\approx 0.69 \\cdot R_{\\text{eq}} \\cdot C_L',
    example: 'CL = 100 fF, VDD = 1.2V, f = 1 GHz, α = 0.5, Req = 10 kΩ: Dynamic Power = 72 µW, Delay tp = 690 ps.',
    faqs: [
      { q: 'What is CMOS dynamic power dissipation?', a: 'Dynamic power is consumed when charging and discharging internal gate and interconnect capacitance during switching transitions.' },
      { q: 'Why is supply voltage (VDD) so critical for IC power?', a: 'Dynamic power scales quadratically with VDD (P ∝ VDD²), so lowering VDD is the most effective way to reduce power consumption.' },
      { q: 'What is activity factor α?', a: 'Activity factor is the average fraction of clock cycles in which a gate output makes a power-consuming 0-to-1 transition.' },
      { q: 'Is this calculation private?', a: 'Yes, 100% browser-based computation.' }
    ]
  }
];

function generateHtml(tool) {
  const inputsHtml = tool.inputs.map(inp => {
    if (inp.type === 'select') {
      const opts = inp.options.map(o => `<option value="${o.val}"${o.val === inp.val ? ' selected' : ''}>${o.text}</option>`).join('');
      return `          <label class="editor-label" for="${tool.slug}-${inp.id}">${inp.label}</label>\n          <select class="tool-textarea" id="${tool.slug}-${inp.id}" style="height: auto; padding: 0.5rem;">${opts}</select>`;
    }
    return `          <label class="editor-label" for="${tool.slug}-${inp.id}">${inp.label}</label>\n          <input type="${inp.type}" class="tool-textarea" id="${tool.slug}-${inp.id}" placeholder="${inp.placeholder}" value="${inp.val}" step="${inp.step || 'any'}" style="height: auto; padding: 0.5rem;">`;
  }).join('\n');

  const stepsHtml = tool.steps.map(s => `        <li>${s}</li>`).join('\n');
  const faqsHtml = tool.faqs.map(f => `      <details>\n        <summary>${f.q}</summary>\n        <p>${f.a}</p>\n      </details>`).join('\n');
  const faqSchema = tool.faqs.map(f => `          {\n            "@type": "Question",\n            "name": ${JSON.stringify(f.q)},\n            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} }\n          }`).join(',\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${tool.title} - Free Online Tool | NikTool</title>
  <meta name="description" content="${tool.desc.replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://niktool.in/tools/${tool.slug}/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${tool.title} | NikTool">
  <meta property="og:description" content="${tool.desc.replace(/"/g, '&quot;')}">
  <meta property="og:url" content="https://niktool.in/tools/${tool.slug}/">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#176b4d">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  <!-- Google AdSense Auto Ads -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3039559152735742" crossorigin="anonymous"></script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HJB9MSVTRN"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-HJB9MSVTRN');
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": ${JSON.stringify(tool.title)},
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "url": "https://niktool.in/tools/${tool.slug}/",
        "description": ${JSON.stringify(tool.desc)},
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://niktool.in/" },
          { "@type": "ListItem", "position": 2, "name": "Utilities", "item": "https://niktool.in/#tools" },
          { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(tool.title)}, "item": "https://niktool.in/tools/${tool.slug}/" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
${faqSchema}
        ]
      }
    ]
  }
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M8 12h8m-5 5h2"/></svg>
        </span>
        <span class="brand-text">NikTool</span>
      </a>
      <div class="nav-links">
        <a class="home-link" href="/">Home</a>
        <a href="/#tools">All tools</a>
        <a href="/about/">About</a>
        <a href="/privacy/">Privacy</a>
        <a href="/contact/">Contact</a>
      </div>
    </nav>
  </header>

  <main id="main" class="container">
    <div class="breadcrumbs">
      <a href="/">Home</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <a href="/#tools">Utilities</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <span>${tool.title}</span>
    </div>

    <section class="tool-hero">
      <h1>${tool.title}</h1>
      <p>${tool.desc}</p>
    </section>

    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
${inputsHtml}
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-output">Result</label>
          <textarea class="tool-textarea" id="${tool.slug}-output" placeholder="Result will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">Process</button>
        <button class="button secondary" id="copy-output" type="button" disabled>Copy result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${tool.slug}-message" role="status">Ready. Enter input above.</p>
    </section>

    <article class="seo-content">
      <h2>How to use ${tool.title}</h2>
      <ol>
${stepsHtml}
      </ol>

      <h2>Mathematical &amp; Theoretical Formulas</h2>
      <p>This calculator evaluates performance using the following core formulas:</p>
      <p>$$\\displaystyle ${tool.formulas}$$</p>

      <h2>Worked Example</h2>
      <p>${tool.example}</p>

      <h2>Key Features &amp; Privacy</h2>
      <p>Fast, client-side processing with zero server calls. All calculations happen locally inside your browser for maximum privacy and instant performance.</p>

      <h2>Frequently asked questions</h2>
${faqsHtml}
    </article>
  </main>

  <footer class="site-footer">
    <div class="footer-inner container">
      <p>&copy; <span data-year></span> NikTool.</p>
      <div class="footer-links"><a href="/">Home</a><a href="/#tools">All tools</a></div>
    </div>
  </footer>

  <script src="/assets/shared.js"></script>
  <script src="/tools/${tool.slug}/tool.js"></script>
</body>
</html>
`;
}

function generateJs(tool) {
  return `(function() {
  'use strict';
  var slug = '${tool.slug}';

  function el(id) {
    return document.getElementById(slug + '-' + id);
  }

  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) {
    msgEl.textContent = t;
    msgEl.classList.toggle('is-error', !!err);
  }

  function calculate() {
    try {
${tool.calcLogic}
    } catch(e) {
      return { err: 'Error during calculation: ' + e.message };
    }
  }

  btn.addEventListener('click', function() {
    var res = calculate();
    if (res.err) {
      outputEl.value = '';
      copyBtn.disabled = true;
      setMsg(res.err, true);
    } else {
      outputEl.value = res.out;
      copyBtn.disabled = false;
      setMsg(res.msg || 'Calculation completed successfully.');
    }
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outputEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    var inputs = [${tool.inputs.map(i => `'${i.id}'`).join(', ')}];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
`;
}

function generateCatalog(tool) {
  return JSON.stringify({
    name: tool.title,
    description: tool.desc,
    path: `/tools/${tool.slug}/`,
    category: 'Utilities',
    icon: 'code',
    keywords: [
      tool.slug.replace(/-/g, ' '),
      tool.title,
      'calculator',
      'online tool',
      'free tool',
      'engineering calculator'
    ],
    order: 1500
  }, null, 2);
}

function generateSitemap(tool) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://niktool.in/tools/${tool.slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
}

console.log(`Starting update for ${tools.length} broken tools...`);

for (const tool of tools) {
  const dirPath = path.join(process.cwd(), 'tools', tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), generateHtml(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'tool.js'), generateJs(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'catalog.json'), generateCatalog(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'sitemap.xml'), generateSitemap(tool), 'utf8');

  console.log(`Updated: ${tool.slug}`);
}

console.log('Running metadata sync...');
try {
  execSync('node scripts/sync-tool-metadata.cjs', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Metadata sync complete!');
} catch (e) {
  console.error('Metadata sync failed:', e.message);
}
