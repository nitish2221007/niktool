'use strict';
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'tools');

const tools = [
  {
    slug: 'shannon-hartley-channel-capacity-snr-bandwidth-calculator',
    name: 'Shannon-Hartley Channel Capacity Calculator',
    description: 'Calculate maximum theoretical channel capacity C = B × log2(1 + S/N) using Shannon-Hartley theorem. Useful for telecommunications, information theory, and wireless network design students.',
    category: 'Telecommunications',
    keywords: ['shannon hartley', 'channel capacity', 'information theory', 'bandwidth SNR', 'wireless communication'],
    grade: 'undergraduate',
    formula: 'C = B × log₂(1 + S/N)',
    inputs: [
      { id: 'B', label: 'Bandwidth B (Hz)', placeholder: '1000000', unit: 'Hz' },
      { id: 'SNR', label: 'Signal-to-Noise Ratio (linear)', placeholder: '100', unit: '' }
    ],
    calcFn: `
      const B = parseFloat(document.getElementById('B').value);
      const SNR = parseFloat(document.getElementById('SNR').value);
      if (isNaN(B) || isNaN(SNR) || B <= 0 || SNR < 0) { document.getElementById('result').textContent = 'Please enter valid values.'; return; }
      const C = B * Math.log2(1 + SNR);
      document.getElementById('result').textContent = 'Channel Capacity C = ' + C.toExponential(4) + ' bps (' + (C/1e6).toFixed(4) + ' Mbps)';
    `,
    howToSteps: ['Enter the channel bandwidth B in Hz.', 'Enter the linear SNR (not dB).', 'Click Calculate to see maximum capacity in bps.'],
    useCases: 'Wireless network design, fiber optic link planning, information theory courses, RF engineering.',
    countries: ['US', 'IN', 'UK', 'CA', 'AU', 'DE', 'JP']
  },
  {
    slug: 'nyquist-sampling-theorem-aliasing-minimum-sample-rate-calculator',
    name: 'Nyquist Sampling Theorem & Aliasing Calculator',
    description: 'Compute minimum Nyquist sampling rate fs = 2 × fmax to avoid aliasing. Shows alias frequency when undersampled. Essential for DSP, audio engineering, and signal processing students.',
    category: 'Digital Signal Processing',
    keywords: ['nyquist sampling', 'aliasing', 'sample rate', 'DSP', 'signal processing'],
    grade: 'undergraduate',
    formula: 'fs_min = 2 × fmax',
    inputs: [
      { id: 'fmax', label: 'Max Signal Frequency fmax (Hz)', placeholder: '20000', unit: 'Hz' },
      { id: 'fs', label: 'Actual Sampling Rate fs (Hz)', placeholder: '44100', unit: 'Hz' }
    ],
    calcFn: `
      const fmax = parseFloat(document.getElementById('fmax').value);
      const fs = parseFloat(document.getElementById('fs').value);
      if (isNaN(fmax) || fmax <= 0) { document.getElementById('result').textContent = 'Enter valid frequency.'; return; }
      const fsMin = 2 * fmax;
      let msg = 'Nyquist rate = ' + fsMin + ' Hz.';
      if (!isNaN(fs) && fs > 0) {
        if (fs >= fsMin) { msg += ' Actual fs=' + fs + ' Hz: No aliasing.'; }
        else {
          const falias = Math.abs(fs - fmax) <= fmax ? Math.abs(fmax - fs) : fmax - (fs % fmax);
          msg += ' Actual fs=' + fs + ' Hz: ALIASING! Alias ≈ ' + Math.abs(fmax % fs) + ' Hz.';
        }
      }
      document.getElementById('result').textContent = msg;
    `,
    howToSteps: ['Enter the maximum signal frequency.', 'Optionally enter actual sampling rate to check for aliasing.', 'Click Calculate.'],
    useCases: 'Audio ADC design, oscilloscope settings, DSP filter design, telecommunications systems.',
    countries: ['US', 'IN', 'UK', 'DE', 'JP', 'CN', 'AU']
  },
  {
    slug: 'friis-free-space-path-loss-link-budget-calculator',
    name: 'Friis Transmission & Free-Space Path Loss Calculator',
    description: 'Calculate received power Pr = Pt × Gt × Gr × (λ/4πd)² and free-space path loss FSPL = (4πd/λ)² in dB. Essential for RF, satellite, and wireless link budget analysis.',
    category: 'RF Engineering',
    keywords: ['friis equation', 'free space path loss', 'link budget', 'RF power', 'antenna gain'],
    grade: 'undergraduate',
    formula: 'FSPL (dB) = 20log(d) + 20log(f) + 20log(4π/c)',
    inputs: [
      { id: 'd', label: 'Distance d (km)', placeholder: '10', unit: 'km' },
      { id: 'f', label: 'Frequency f (MHz)', placeholder: '2400', unit: 'MHz' },
      { id: 'Gt', label: 'Tx Antenna Gain Gt (dBi)', placeholder: '0', unit: 'dBi' },
      { id: 'Gr', label: 'Rx Antenna Gain Gr (dBi)', placeholder: '0', unit: 'dBi' }
    ],
    calcFn: `
      const d = parseFloat(document.getElementById('d').value) * 1000;
      const f = parseFloat(document.getElementById('f').value) * 1e6;
      const Gt = parseFloat(document.getElementById('Gt').value) || 0;
      const Gr = parseFloat(document.getElementById('Gr').value) || 0;
      if (isNaN(d) || isNaN(f) || d <= 0 || f <= 0) { document.getElementById('result').textContent = 'Enter valid values.'; return; }
      const c = 3e8;
      const FSPL_dB = 20*Math.log10(d) + 20*Math.log10(f) + 20*Math.log10(4*Math.PI/c);
      const linkBudget = Gt + Gr - FSPL_dB;
      document.getElementById('result').textContent = 'FSPL = ' + FSPL_dB.toFixed(2) + ' dB | Link Budget (Gt+Gr-FSPL) = ' + linkBudget.toFixed(2) + ' dB';
    `,
    howToSteps: ['Enter distance in km.', 'Enter frequency in MHz.', 'Enter antenna gains in dBi (0 for isotropic).', 'Click Calculate.'],
    useCases: 'Wireless LAN planning, satellite link design, cellular coverage, radar system analysis.',
    countries: ['US', 'IN', 'UK', 'DE', 'AU', 'JP', 'BR']
  },
  {
    slug: 'microstrip-line-characteristic-impedance-pcb-rf-calculator',
    name: 'Microstrip Line Characteristic Impedance Calculator',
    description: 'Calculate microstrip PCB trace characteristic impedance Z0 and effective dielectric constant using IPC-2141 closed-form approximations. Essential for RF PCB design, high-speed digital, and microwave engineering students.',
    category: 'Microwave Engineering',
    keywords: ['microstrip impedance', 'PCB trace impedance', 'RF PCB design', 'transmission line', 'microwave'],
    grade: 'undergraduate',
    formula: 'Z0 ≈ (87/√(εr+1.41)) × ln(5.98h/(0.8w+t))',
    inputs: [
      { id: 'w', label: 'Trace Width w (mm)', placeholder: '1.5', unit: 'mm' },
      { id: 'h', label: 'Dielectric Height h (mm)', placeholder: '1.6', unit: 'mm' },
      { id: 't', label: 'Trace Thickness t (mm)', placeholder: '0.035', unit: 'mm' },
      { id: 'er', label: 'Dielectric Constant εr', placeholder: '4.4', unit: '' }
    ],
    calcFn: `
      const w = parseFloat(document.getElementById('w').value);
      const h = parseFloat(document.getElementById('h').value);
      const t = parseFloat(document.getElementById('t').value);
      const er = parseFloat(document.getElementById('er').value);
      if ([w,h,t,er].some(isNaN) || w<=0||h<=0||t<=0||er<=0) { document.getElementById('result').textContent = 'Enter valid values.'; return; }
      const Z0 = (87/Math.sqrt(er+1.41))*Math.log(5.98*h/(0.8*w+t));
      const erEff = (er+1)/2 + (er-1)/2/Math.sqrt(1+12*h/w);
      document.getElementById('result').textContent = 'Z0 = ' + Z0.toFixed(2) + ' Ω | εr_eff = ' + erEff.toFixed(3);
    `,
    howToSteps: ['Enter trace width, dielectric height, trace thickness in mm.', 'Enter substrate dielectric constant (FR4 ≈ 4.4).', 'Click Calculate.'],
    useCases: 'RF PCB layout, 50-ohm trace design, high-speed signals, antenna feed lines.',
    countries: ['US', 'DE', 'IN', 'CN', 'JP', 'KR', 'UK']
  },
  {
    slug: 'qam-bit-error-rate-snr-modulation-order-calculator',
    name: 'QAM Bit Error Rate (BER) vs SNR Calculator',
    description: 'Calculate approximate BER for M-QAM modulation as BER ≈ (4/log2(M)) × Q(√(3log2(M)×SNR/(M-1))). Covers QPSK, 16-QAM, 64-QAM. Useful for wireless communications and digital modulation courses.',
    category: 'Digital Communications',
    keywords: ['QAM BER', 'bit error rate', 'modulation order', 'QPSK 16QAM', 'wireless BER'],
    grade: 'undergraduate',
    formula: 'BER ≈ (4/log₂M) × Q(√(3log₂M × SNR / (M-1)))',
    inputs: [
      { id: 'M', label: 'Modulation Order M (4=QPSK, 16, 64, 256)', placeholder: '16', unit: '' },
      { id: 'SNR_lin', label: 'SNR per bit Eb/N0 (linear)', placeholder: '10', unit: '' }
    ],
    calcFn: `
      const M = parseInt(document.getElementById('M').value);
      const SNR = parseFloat(document.getElementById('SNR_lin').value);
      if (isNaN(M)||isNaN(SNR)||M<4||SNR<0) { document.getElementById('result').textContent = 'Enter valid values (M>=4).'; return; }
      const k = Math.log2(M);
      function Qfn(x) { return 0.5*Math.erfc(x/Math.sqrt(2)); }
      if (!Math.erfc) { document.getElementById('result').textContent = 'erfc not available in this browser.'; return; }
      const arg = Math.sqrt(3*k*SNR/(M-1));
      const BER = (4/k)*Qfn(arg);
      document.getElementById('result').textContent = M + '-QAM BER = ' + BER.toExponential(4) + ' at Eb/N0=' + SNR;
    `,
    howToSteps: ['Enter modulation order M (4=QPSK, 16, 64, 256, etc.).', 'Enter linear Eb/N0 (SNR per bit).', 'Click Calculate.'],
    useCases: 'Digital communications lab, LTE/5G PHY design, modulation comparison, academic assignments.',
    countries: ['US', 'IN', 'DE', 'UK', 'JP', 'KR', 'CN']
  },
  {
    slug: 'ofdm-subcarrier-spacing-symbol-duration-cyclic-prefix-calculator',
    name: 'OFDM Subcarrier Spacing & Cyclic Prefix Calculator',
    description: 'Compute OFDM symbol duration T = 1/Δf, cyclic prefix CP, guard interval, spectral efficiency, and total bandwidth = N × Δf. Used in LTE, 5G NR, WiFi 802.11, and digital broadcasting courses.',
    category: 'Digital Communications',
    keywords: ['OFDM subcarrier spacing', 'cyclic prefix', 'LTE 5G OFDM', 'symbol duration', 'spectral efficiency'],
    grade: 'undergraduate',
    formula: 'T_symbol = 1/Δf; T_total = T_symbol + T_CP',
    inputs: [
      { id: 'delta_f', label: 'Subcarrier Spacing Δf (kHz)', placeholder: '15', unit: 'kHz' },
      { id: 'N_sc', label: 'Number of Subcarriers N', placeholder: '1024', unit: '' },
      { id: 'CP_ratio', label: 'CP Ratio (fraction of symbol, e.g. 0.0703)', placeholder: '0.0703', unit: '' }
    ],
    calcFn: `
      const df = parseFloat(document.getElementById('delta_f').value)*1e3;
      const N = parseInt(document.getElementById('N_sc').value);
      const cp = parseFloat(document.getElementById('CP_ratio').value);
      if (isNaN(df)||isNaN(N)||df<=0||N<=0) { document.getElementById('result').textContent = 'Enter valid values.'; return; }
      const Tsym = 1/df;
      const Tcp = isNaN(cp)||cp<=0 ? 0 : cp*Tsym;
      const Ttotal = Tsym+Tcp;
      const BW = N*df/1e6;
      document.getElementById('result').textContent = 'Symbol duration = ' + (Tsym*1e6).toFixed(3) + ' µs | CP = ' + (Tcp*1e6).toFixed(3) + ' µs | Total = ' + (Ttotal*1e6).toFixed(3) + ' µs | Bandwidth = ' + BW.toFixed(3) + ' MHz';
    `,
    howToSteps: ['Enter subcarrier spacing in kHz (LTE=15, 5G NR=15/30/60/120 kHz).', 'Enter total number of subcarriers.', 'Enter CP ratio (LTE normal CP≈0.0703).', 'Click Calculate.'],
    useCases: 'LTE/5G NR physical layer design, WiFi 802.11a/n/ac/ax, digital TV DVB-T, OFDM lab experiments.',
    countries: ['US', 'IN', 'DE', 'KR', 'JP', 'UK', 'CN']
  },
  {
    slug: 'optical-fiber-attenuation-power-budget-link-calculator',
    name: 'Optical Fiber Attenuation & Power Budget Link Calculator',
    description: 'Calculate received optical power Pr = Pt - attenuation×length - connector losses and check if link margin is positive. Covers single-mode and multimode fiber for telecom and photonics engineering students.',
    category: 'Photonics',
    keywords: ['fiber attenuation', 'optical power budget', 'single mode fiber', 'telecom link', 'dB loss'],
    grade: 'undergraduate',
    formula: 'P_received = P_tx - α×L - N_conn×L_conn - N_splice×L_splice',
    inputs: [
      { id: 'Ptx', label: 'Tx Power Ptx (dBm)', placeholder: '0', unit: 'dBm' },
      { id: 'alpha', label: 'Fiber Attenuation α (dB/km)', placeholder: '0.35', unit: 'dB/km' },
      { id: 'L', label: 'Fiber Length L (km)', placeholder: '10', unit: 'km' },
      { id: 'Nconn', label: 'Number of Connectors', placeholder: '4', unit: '' },
      { id: 'Lconn', label: 'Connector Loss (dB each)', placeholder: '0.5', unit: 'dB' },
      { id: 'Prx_min', label: 'Receiver Sensitivity (dBm)', placeholder: '-20', unit: 'dBm' }
    ],
    calcFn: `
      const Ptx=parseFloat(document.getElementById('Ptx').value);
      const a=parseFloat(document.getElementById('alpha').value);
      const L=parseFloat(document.getElementById('L').value);
      const Nc=parseFloat(document.getElementById('Nconn').value)||0;
      const Lc=parseFloat(document.getElementById('Lconn').value)||0;
      const Pmin=parseFloat(document.getElementById('Prx_min').value);
      if([Ptx,a,L].some(isNaN)||a<0||L<0){document.getElementById('result').textContent='Enter valid values.';return;}
      const Prx=Ptx - a*L - Nc*Lc;
      const margin=isNaN(Pmin)?null:Prx-Pmin;
      let msg='P_received = ' + Prx.toFixed(2) + ' dBm';
      if(margin!==null) msg += ' | Margin = ' + margin.toFixed(2) + ' dB (' + (margin>=0?'OK - link feasible':'FAIL - insufficient power') + ')';
      document.getElementById('result').textContent=msg;
    `,
    howToSteps: ['Enter transmitter power in dBm.', 'Enter fiber attenuation (SMF≈0.2dB/km at 1550nm, MMF≈3dB/km at 850nm).', 'Enter fiber length, number of connectors and their losses.', 'Enter receiver sensitivity to check link margin.'],
    useCases: 'FTTH network design, data center interconnects, optical lab experiments, telecom engineering courses.',
    countries: ['US', 'IN', 'UK', 'DE', 'JP', 'CN', 'AU']
  },
  {
    slug: 'rf-amplifier-noise-figure-cascaded-friis-noise-calculator',
    name: 'RF Amplifier Noise Figure & Cascaded Friis Noise Calculator',
    description: 'Calculate total system noise figure using Friis formula for cascaded stages: NF_total = NF1 + (NF2-1)/G1 + (NF3-1)/(G1×G2). Essential for LNA, receiver chain, and RF system design students.',
    category: 'RF Engineering',
    keywords: ['noise figure', 'friis noise formula', 'cascaded noise', 'LNA receiver chain', 'RF amplifier'],
    grade: 'undergraduate',
    formula: 'F_total = F1 + (F2-1)/G1 + (F3-1)/(G1×G2)',
    inputs: [
      { id: 'NF1', label: 'Stage 1 NF (dB)', placeholder: '1.5', unit: 'dB' },
      { id: 'G1', label: 'Stage 1 Gain (dB)', placeholder: '20', unit: 'dB' },
      { id: 'NF2', label: 'Stage 2 NF (dB)', placeholder: '5', unit: 'dB' },
      { id: 'G2', label: 'Stage 2 Gain (dB)', placeholder: '15', unit: 'dB' },
      { id: 'NF3', label: 'Stage 3 NF (dB, optional)', placeholder: '8', unit: 'dB' }
    ],
    calcFn: `
      const nf1=parseFloat(document.getElementById('NF1').value);
      const g1=parseFloat(document.getElementById('G1').value);
      const nf2=parseFloat(document.getElementById('NF2').value);
      const g2=parseFloat(document.getElementById('G2').value);
      const nf3=parseFloat(document.getElementById('NF3').value);
      if([nf1,g1,nf2,g2].some(isNaN)){document.getElementById('result').textContent='Enter valid values for stages 1 and 2.';return;}
      const F1=Math.pow(10,nf1/10), G1l=Math.pow(10,g1/10);
      const F2=Math.pow(10,nf2/10), G2l=Math.pow(10,g2/10);
      let Ftot=F1+(F2-1)/G1l;
      if(!isNaN(nf3)){const F3=Math.pow(10,nf3/10);Ftot+=( F3-1)/(G1l*G2l);}
      const NFtot=10*Math.log10(Ftot);
      document.getElementById('result').textContent='System NF = ' + NFtot.toFixed(3) + ' dB (F = ' + Ftot.toFixed(4) + ')';
    `,
    howToSteps: ['Enter noise figure and gain (dB) for each amplifier stage.', 'Stage 3 is optional.', 'Click Calculate to get total system noise figure.'],
    useCases: 'Receiver chain design, LNA selection, radar front-end, satellite receiver, RF lab courses.',
    countries: ['US', 'IN', 'DE', 'KR', 'JP', 'UK', 'IL']
  },
  {
    slug: 'radar-range-equation-snr-detection-range-calculator',
    name: 'Radar Range Equation & Detection Range Calculator',
    description: 'Calculate radar maximum detection range using R = (Pt×Gt×Gr×λ²×σ / ((4π)³×Pmin))^0.25 and received SNR. Covers pulse, CW, and phased array radar for EE and defense technology students.',
    category: 'Radar Systems',
    keywords: ['radar range equation', 'radar SNR', 'radar cross section', 'pulse radar', 'detection range'],
    grade: 'undergraduate',
    formula: 'R_max = [(Pt×Gt×Gr×λ²×σ) / ((4π)³×Pmin)]^(1/4)',
    inputs: [
      { id: 'Pt', label: 'Peak Transmit Power Pt (W)', placeholder: '10000', unit: 'W' },
      { id: 'Gt_dB', label: 'Transmit Antenna Gain Gt (dBi)', placeholder: '30', unit: 'dBi' },
      { id: 'Gr_dB', label: 'Receive Antenna Gain Gr (dBi)', placeholder: '30', unit: 'dBi' },
      { id: 'freq_MHz', label: 'Frequency (MHz)', placeholder: '3000', unit: 'MHz' },
      { id: 'sigma', label: 'Target RCS σ (m²)', placeholder: '1', unit: 'm²' },
      { id: 'Pmin_dBm', label: 'Minimum Detectable Signal (dBm)', placeholder: '-100', unit: 'dBm' }
    ],
    calcFn: `
      const Pt=parseFloat(document.getElementById('Pt').value);
      const Gt=Math.pow(10,parseFloat(document.getElementById('Gt_dB').value)/10);
      const Gr=Math.pow(10,parseFloat(document.getElementById('Gr_dB').value)/10);
      const f=parseFloat(document.getElementById('freq_MHz').value)*1e6;
      const sigma=parseFloat(document.getElementById('sigma').value);
      const Pmin=Math.pow(10,(parseFloat(document.getElementById('Pmin_dBm').value)-30)/10);
      if([Pt,Gt,Gr,f,sigma,Pmin].some(isNaN)||Pt<=0||f<=0||sigma<=0){document.getElementById('result').textContent='Enter valid values.';return;}
      const lam=3e8/f;
      const Rmax=Math.pow((Pt*Gt*Gr*lam*lam*sigma)/((Math.pow(4*Math.PI,3))*Pmin),0.25);
      document.getElementById('result').textContent='R_max = ' + (Rmax/1000).toFixed(2) + ' km (' + Rmax.toFixed(0) + ' m)';
    `,
    howToSteps: ['Enter peak transmit power in Watts.', 'Enter antenna gains in dBi, frequency in MHz.', 'Enter target radar cross section and minimum detectable signal.', 'Click Calculate.'],
    useCases: 'Air traffic control radar design, weather radar, military radar courses, phased array analysis.',
    countries: ['US', 'IN', 'IL', 'DE', 'UK', 'RU', 'CN']
  },
  {
    slug: 'doppler-shift-frequency-velocity-radar-ultrasound-calculator',
    name: 'Doppler Shift Frequency Calculator (Radar & Ultrasound)',
    description: 'Calculate Doppler frequency shift fd = 2v×f0/c for radar and fd = (v/c)×f0 for acoustic applications. Covers moving target indication, medical ultrasound Doppler, and astrophysical redshift.',
    category: 'Wave Physics',
    keywords: ['doppler shift', 'doppler radar', 'doppler ultrasound', 'target velocity', 'frequency shift'],
    grade: 'highschool',
    formula: 'fd = 2×v×f₀/c (radar), fd = v×f₀/c (acoustic)',
    inputs: [
      { id: 'f0', label: 'Carrier/Source Frequency f0 (MHz)', placeholder: '10000', unit: 'MHz' },
      { id: 'v', label: 'Target/Object Velocity v (m/s)', placeholder: '30', unit: 'm/s' },
      { id: 'mode', label: 'Mode (1=Radar bistatic, 2=Radar monostatic)', placeholder: '2', unit: '' }
    ],
    calcFn: `
      const f0=parseFloat(document.getElementById('f0').value)*1e6;
      const v=parseFloat(document.getElementById('v').value);
      const mode=parseInt(document.getElementById('mode').value)||2;
      if(isNaN(f0)||isNaN(v)||f0<=0){document.getElementById('result').textContent='Enter valid values.';return;}
      const c=3e8;
      const fd=(mode===2?2:1)*v*f0/c;
      document.getElementById('result').textContent='Doppler shift fd = ' + fd.toFixed(2) + ' Hz (' + (fd/1000).toFixed(4) + ' kHz) | Velocity resolution = ' + (c/(2*f0*0.001)).toFixed(4) + ' m/s per Hz';
    `,
    howToSteps: ['Enter carrier frequency in MHz.', 'Enter target velocity in m/s.', 'Select mode: 2 for monostatic radar (factor of 2), 1 for bistatic or acoustic.', 'Click Calculate.'],
    useCases: 'Police speed gun, weather Doppler radar, medical echocardiography, astronomy redshift calculation.',
    countries: ['US', 'IN', 'UK', 'DE', 'JP', 'AU', 'FR']
  },
  {
    slug: 'antenna-array-beamforming-half-power-beamwidth-directivity-calculator',
    name: 'Antenna Array Beamforming & HPBW Directivity Calculator',
    description: 'Calculate half-power beamwidth HPBW ≈ 0.886×λ/(N×d×cosθ) and array directivity D ≈ N for uniform linear arrays (ULA). Covers phased arrays, MIMO beamforming, and 5G massive MIMO antenna systems.',
    category: 'Antenna Engineering',
    keywords: ['antenna beamforming', 'HPBW beamwidth', 'phased array', 'MIMO antenna', 'array directivity'],
    grade: 'undergraduate',
    formula: 'HPBW ≈ 0.886×λ/(N×d) radians',
    inputs: [
      { id: 'N', label: 'Number of Antenna Elements N', placeholder: '16', unit: '' },
      { id: 'd_lambda', label: 'Element Spacing d (in wavelengths λ)', placeholder: '0.5', unit: 'λ' },
      { id: 'freq_GHz', label: 'Frequency (GHz)', placeholder: '2.4', unit: 'GHz' }
    ],
    calcFn: `
      const N=parseInt(document.getElementById('N').value);
      const d_lam=parseFloat(document.getElementById('d_lambda').value);
      const f=parseFloat(document.getElementById('freq_GHz').value)*1e9;
      if(isNaN(N)||isNaN(d_lam)||isNaN(f)||N<=0||d_lam<=0||f<=0){document.getElementById('result').textContent='Enter valid values.';return;}
      const lam=3e8/f;
      const d=d_lam*lam;
      const HPBW_rad=0.886*lam/(N*d);
      const HPBW_deg=HPBW_rad*180/Math.PI;
      const D_dBi=10*Math.log10(N);
      document.getElementById('result').textContent='HPBW = ' + HPBW_deg.toFixed(2) + '° | Array Directivity ≈ ' + D_dBi.toFixed(2) + ' dBi | λ = ' + (lam*1000).toFixed(2) + ' mm';
    `,
    howToSteps: ['Enter number of antenna elements.', 'Enter element spacing in wavelengths (typically 0.5λ).', 'Enter operating frequency in GHz.', 'Click Calculate.'],
    useCases: '5G base station design, radar phased arrays, satellite MIMO, beamforming research, antenna lab experiments.',
    countries: ['US', 'KR', 'CN', 'IN', 'DE', 'UK', 'JP']
  },
  {
    slug: 'impedance-matching-l-network-pi-network-rf-calculator',
    name: 'L-Network Impedance Matching RF Circuit Calculator',
    description: 'Calculate L-network reactive components (inductor L and capacitor C) to match source impedance Rs to load impedance RL at a given frequency. Essential for RF power amplifiers, antenna matching, and microwave circuits.',
    category: 'RF Engineering',
    keywords: ['impedance matching', 'L network', 'RF matching circuit', 'antenna matching', 'Q factor matching'],
    grade: 'undergraduate',
    formula: 'Q = √((RL/RS)-1); XS = RS×Q; XP = RL/Q',
    inputs: [
      { id: 'RS', label: 'Source Impedance RS (Ω)', placeholder: '50', unit: 'Ω' },
      { id: 'RL', label: 'Load Impedance RL (Ω)', placeholder: '200', unit: 'Ω' },
      { id: 'freq_MHz', label: 'Frequency (MHz)', placeholder: '100', unit: 'MHz' }
    ],
    calcFn: `
      const RS=parseFloat(document.getElementById('RS').value);
      const RL=parseFloat(document.getElementById('RL').value);
      const f=parseFloat(document.getElementById('freq_MHz').value)*1e6;
      if([RS,RL,f].some(isNaN)||RS<=0||RL<=0||f<=0||RL<=RS){document.getElementById('result').textContent='Enter valid values. RL must exceed RS.';return;}
      const Q=Math.sqrt(RL/RS-1);
      const XS=RS*Q; const XP=RL/Q;
      const w=2*Math.PI*f;
      const L=XS/w; const C=1/(w*XP);
      document.getElementById('result').textContent='Q = ' + Q.toFixed(3) + ' | Series X = ' + XS.toFixed(2) + ' Ω (L=' + (L*1e9).toFixed(3) + ' nH) | Shunt X = ' + XP.toFixed(2) + ' Ω (C=' + (C*1e12).toFixed(3) + ' pF)';
    `,
    howToSteps: ['Enter source impedance RS (usually 50Ω).', 'Enter load impedance RL (must be larger than RS).', 'Enter operating frequency in MHz.', 'Click Calculate to get L and C values.'],
    useCases: 'PA output matching, antenna tuner design, LNA input matching, RF IC design, amateur radio.',
    countries: ['US', 'IN', 'DE', 'UK', 'JP', 'AU', 'BR']
  },
  {
    slug: 'dbm-dbw-watts-voltage-rf-power-conversion-calculator',
    name: 'dBm / dBW / Watts / Voltage RF Power Conversion Calculator',
    description: 'Convert between dBm, dBW, milliwatts, watts, and RMS voltage across any impedance. Instant bidirectional RF power unit conversion essential for all RF, microwave, and signal processing students.',
    category: 'RF Engineering',
    keywords: ['dBm to watts', 'dBm dBW conversion', 'RF power units', 'milliwatts', 'RMS voltage power'],
    grade: 'highschool',
    formula: 'P(dBm) = 10×log10(P_mW); P(W) = 10^(dBm/10)/1000',
    inputs: [
      { id: 'val', label: 'Input Value', placeholder: '20', unit: '' },
      { id: 'unit', label: 'Input Unit (1=dBm, 2=dBW, 3=mW, 4=W)', placeholder: '1', unit: '' },
      { id: 'Z', label: 'Load Impedance Z (Ω) for Voltage', placeholder: '50', unit: 'Ω' }
    ],
    calcFn: `
      const val=parseFloat(document.getElementById('val').value);
      const unit=parseInt(document.getElementById('unit').value)||1;
      const Z=parseFloat(document.getElementById('Z').value)||50;
      if(isNaN(val)){document.getElementById('result').textContent='Enter a value.';return;}
      let P_mW;
      if(unit===1) P_mW=Math.pow(10,val/10);
      else if(unit===2) P_mW=Math.pow(10,val/10)*1000;
      else if(unit===3) P_mW=val;
      else P_mW=val*1000;
      const P_W=P_mW/1000;
      const dBm=10*Math.log10(P_mW);
      const dBW=dBm-30;
      const Vrms=Math.sqrt(P_W*Z);
      document.getElementById('result').textContent=P_mW.toExponential(4)+' mW | '+P_W.toExponential(4)+' W | '+dBm.toFixed(3)+' dBm | '+dBW.toFixed(3)+' dBW | Vrms='+Vrms.toFixed(4)+' V (Z='+Z+'Ω)';
    `,
    howToSteps: ['Enter a power value.', 'Select input unit: 1=dBm, 2=dBW, 3=mW, 4=W.', 'Enter load impedance for voltage calculation (default 50Ω).', 'Click Calculate.'],
    useCases: 'RF bench work, spectrum analyzer readings, power amplifier specs, signal generator settings, academic labs.',
    countries: ['US', 'IN', 'DE', 'UK', 'AU', 'JP', 'CN']
  },
  {
    slug: 'coaxial-cable-attenuation-characteristic-impedance-calculator',
    name: 'Coaxial Cable Attenuation & Characteristic Impedance Calculator',
    description: 'Calculate coaxial cable characteristic impedance Z0 = (138/√εr)×log(D/d) and attenuation in dB/100m. Covers RG-58, RG-213, LMR-400 type cables for RF installations and cable TV engineering students.',
    category: 'RF Engineering',
    keywords: ['coaxial cable impedance', 'coax attenuation', 'RG58 RG213 LMR400', 'cable TV RF', 'transmission line'],
    grade: 'undergraduate',
    formula: 'Z0 = (138/√εr) × log₁₀(D/d)',
    inputs: [
      { id: 'D', label: 'Outer Conductor Inner Diameter D (mm)', placeholder: '4.95', unit: 'mm' },
      { id: 'd', label: 'Inner Conductor Diameter d (mm)', placeholder: '1.02', unit: 'mm' },
      { id: 'er_c', label: 'Dielectric Constant εr', placeholder: '2.29', unit: '' }
    ],
    calcFn: `
      const D=parseFloat(document.getElementById('D').value);
      const d=parseFloat(document.getElementById('d').value);
      const er=parseFloat(document.getElementById('er_c').value);
      if([D,d,er].some(isNaN)||D<=d||d<=0||er<=0){document.getElementById('result').textContent='Enter valid values (D must exceed d).';return;}
      const Z0=(138/Math.sqrt(er))*Math.log10(D/d);
      const VF=1/Math.sqrt(er);
      document.getElementById('result').textContent='Z0 = ' + Z0.toFixed(2) + ' Ω | Velocity Factor VF = ' + (VF*100).toFixed(1) + '% | Capacitance/m = ' + (55.6*er/Math.log10(D/d)).toFixed(1) + ' pF/m';
    `,
    howToSteps: ['Enter outer conductor inner diameter D and inner conductor diameter d in mm.', 'Enter dielectric constant (PE≈2.29, PTFE≈2.1, Air=1.0).', 'Click Calculate.'],
    useCases: 'Antenna feedline selection, cable TV system design, RF shielding, lab cable characterization.',
    countries: ['US', 'IN', 'UK', 'DE', 'AU', 'BR', 'ZA']
  },
  {
    slug: 'rectangular-waveguide-cutoff-frequency-mode-calculator',
    name: 'Rectangular Waveguide Cutoff Frequency & Mode Calculator',
    description: 'Calculate cutoff frequency fc = (c/2)×√((m/a)²+(n/b)²) for TE/TM modes in rectangular waveguides. Covers WR-90, WR-112, WR-284 standard waveguides for microwave engineering students.',
    category: 'Microwave Engineering',
    keywords: ['waveguide cutoff frequency', 'TE TM modes', 'rectangular waveguide', 'microwave guide', 'WR90 WR284'],
    grade: 'undergraduate',
    formula: 'fc = (c/2)×√((m/a)²+(n/b)²)',
    inputs: [
      { id: 'a_mm', label: 'Waveguide Width a (mm)', placeholder: '22.86', unit: 'mm' },
      { id: 'b_mm', label: 'Waveguide Height b (mm)', placeholder: '10.16', unit: 'mm' },
      { id: 'm', label: 'Mode index m', placeholder: '1', unit: '' },
      { id: 'n', label: 'Mode index n', placeholder: '0', unit: '' }
    ],
    calcFn: `
      const a=parseFloat(document.getElementById('a_mm').value)/1000;
      const b=parseFloat(document.getElementById('b_mm').value)/1000;
      const m=parseInt(document.getElementById('m').value)||1;
      const n=parseInt(document.getElementById('n').value)||0;
      if(isNaN(a)||isNaN(b)||a<=0||b<=0){document.getElementById('result').textContent='Enter valid waveguide dimensions.';return;}
      const c=3e8;
      const fc=(c/2)*Math.sqrt(Math.pow(m/a,2)+Math.pow(n/b,2));
      const lambdaC=c/fc;
      document.getElementById('result').textContent='TE'+m+n+'/TM'+m+n+' cutoff fc = ' + (fc/1e9).toFixed(4) + ' GHz | λc = ' + (lambdaC*1000).toFixed(2) + ' mm';
    `,
    howToSteps: ['Enter waveguide dimensions a and b in mm (WR-90: a=22.86mm, b=10.16mm).', 'Enter mode indices m and n (dominant mode TE10: m=1, n=0).', 'Click Calculate.'],
    useCases: 'X-band, Ku-band, Ka-band waveguide design, microwave oven analysis, satellite transponders, lab experiments.',
    countries: ['US', 'IN', 'DE', 'UK', 'JP', 'IL', 'KR']
  },
  {
    slug: 'gsm-lte-link-budget-indoor-outdoor-coverage-calculator',
    name: 'GSM / LTE Cellular Link Budget & Coverage Range Calculator',
    description: 'Calculate cellular maximum allowable path loss MAPL = EIRP - Sensitivity - margins, then estimate cell radius using ITU-R Okumura-Hata propagation. Covers 2G/3G/4G LTE coverage planning for telecom engineering students.',
    category: 'Cellular Networks',
    keywords: ['LTE link budget', 'cell coverage', 'MAPL path loss', 'Okumura Hata', 'cellular planning'],
    grade: 'undergraduate',
    formula: 'MAPL = EIRP - Receiver_Sensitivity - Fade_Margin',
    inputs: [
      { id: 'EIRP', label: 'Base Station EIRP (dBm)', placeholder: '46', unit: 'dBm' },
      { id: 'sensitivity', label: 'UE Sensitivity (dBm)', placeholder: '-100', unit: 'dBm' },
      { id: 'fade_margin', label: 'Fade Margin + Body Loss (dB)', placeholder: '12', unit: 'dB' },
      { id: 'freq_MHz_cell', label: 'Frequency (MHz)', placeholder: '1800', unit: 'MHz' },
      { id: 'hb', label: 'Base Station Height hb (m)', placeholder: '30', unit: 'm' }
    ],
    calcFn: `
      const EIRP=parseFloat(document.getElementById('EIRP').value);
      const sens=parseFloat(document.getElementById('sensitivity').value);
      const fm=parseFloat(document.getElementById('fade_margin').value)||0;
      const f=parseFloat(document.getElementById('freq_MHz_cell').value);
      const hb=parseFloat(document.getElementById('hb').value)||30;
      if([EIRP,sens,f].some(isNaN)){document.getElementById('result').textContent='Enter valid values.';return;}
      const MAPL=EIRP-sens-fm;
      const ahm=0.8+(1.56*Math.log10(f)-0.7)*1.5-(1.1*Math.log10(f)-0.7)*1.5;
      const L50=69.55+26.16*Math.log10(f)-13.82*Math.log10(hb)-ahm;
      const n=44.9-6.55*Math.log10(hb);
      const R=Math.pow(10,(MAPL-L50)/n);
      document.getElementById('result').textContent='MAPL = ' + MAPL.toFixed(1) + ' dB | Estimated cell radius ≈ ' + R.toFixed(2) + ' km (Okumura-Hata urban)';
    `,
    howToSteps: ['Enter base station EIRP, UE receiver sensitivity, and fade margin.', 'Enter frequency and base station height.', 'Click Calculate to see MAPL and estimated coverage radius.'],
    useCases: 'LTE 4G/5G network planning, rural broadband coverage, telecom regulatory submissions, academic assignments.',
    countries: ['IN', 'US', 'NG', 'ID', 'BD', 'BR', 'PK', 'PH']
  },
  {
    slug: 'pulse-width-duty-cycle-frequency-period-digital-signal-calculator',
    name: 'Pulse Width / Duty Cycle / Frequency / Period Digital Signal Calculator',
    description: 'Calculate pulse period T=1/f, duty cycle DC=tw/T, pulse width from duty cycle and frequency, and average power for digital signals. Essential for microcontroller PWM, power electronics, and digital electronics students.',
    category: 'Digital Electronics',
    keywords: ['duty cycle calculator', 'PWM frequency period', 'pulse width', 'digital signal', 'microcontroller PWM'],
    grade: 'highschool',
    formula: 'T = 1/f; DC = tw/T × 100%',
    inputs: [
      { id: 'freq_hz', label: 'Frequency f (Hz)', placeholder: '1000', unit: 'Hz' },
      { id: 'duty', label: 'Duty Cycle DC (%)', placeholder: '50', unit: '%' },
      { id: 'Vpeak', label: 'Peak Voltage Vp (V, optional)', placeholder: '5', unit: 'V' }
    ],
    calcFn: `
      const f=parseFloat(document.getElementById('freq_hz').value);
      const dc=parseFloat(document.getElementById('duty').value);
      const Vp=parseFloat(document.getElementById('Vpeak').value)||0;
      if(isNaN(f)||isNaN(dc)||f<=0||dc<0||dc>100){document.getElementById('result').textContent='Enter valid values.';return;}
      const T=1/f; const tw=T*dc/100;
      const Vavg=Vp*dc/100;
      const Vrms=Vp*Math.sqrt(dc/100);
      let msg='Period T = '+(T*1000).toFixed(4)+' ms | Pulse width tw = '+(tw*1000).toFixed(4)+' ms';
      if(Vp>0) msg+=' | Vavg = '+Vavg.toFixed(3)+' V | Vrms = '+Vrms.toFixed(3)+' V';
      document.getElementById('result').textContent=msg;
    `,
    howToSteps: ['Enter signal frequency in Hz.', 'Enter duty cycle percentage (0-100%).', 'Optionally enter peak voltage for average/RMS calculations.', 'Click Calculate.'],
    useCases: 'Arduino/Raspberry Pi PWM, motor speed control, LED dimming, switch-mode power supply design, digital labs.',
    countries: ['IN', 'US', 'UK', 'BR', 'DE', 'PH', 'NG', 'BD']
  },
  {
    slug: 'cdma-spreading-gain-eb-n0-processing-gain-calculator',
    name: 'CDMA Spreading Gain & Eb/N0 Processing Gain Calculator',
    description: 'Calculate CDMA/WCDMA spreading gain Gp = BW_spread/R_data (dB), effective Eb/N0 after despreading, and capacity using Erlang formulas. Covers IS-95, CDMA2000, WCDMA for wireless communications students.',
    category: 'Wireless Communications',
    keywords: ['CDMA spreading gain', 'processing gain', 'WCDMA CDMA2000', 'Eb N0 CDMA', 'spread spectrum'],
    grade: 'undergraduate',
    formula: 'Gp = 10×log10(BW_spread/R_data)',
    inputs: [
      { id: 'BW_spread', label: 'Spread Bandwidth BW (MHz)', placeholder: '3.84', unit: 'MHz' },
      { id: 'R_data', label: 'Data Rate R (kbps)', placeholder: '12.2', unit: 'kbps' },
      { id: 'SNR_in', label: 'Input SNR (dB)', placeholder: '-10', unit: 'dB' }
    ],
    calcFn: `
      const BW=parseFloat(document.getElementById('BW_spread').value)*1e6;
      const R=parseFloat(document.getElementById('R_data').value)*1e3;
      const SNRin=parseFloat(document.getElementById('SNR_in').value)||0;
      if(isNaN(BW)||isNaN(R)||BW<=0||R<=0){document.getElementById('result').textContent='Enter valid values.';return;}
      const Gp=10*Math.log10(BW/R);
      const SNRout=SNRin+Gp;
      document.getElementById('result').textContent='Processing Gain Gp = '+Gp.toFixed(2)+' dB | Output SNR = '+SNRout.toFixed(2)+' dB';
    `,
    howToSteps: ['Enter spread bandwidth in MHz (WCDMA=3.84 MHz, IS-95=1.23 MHz).', 'Enter data rate in kbps (voice=12.2 kbps).', 'Optionally enter input SNR to see output SNR.', 'Click Calculate.'],
    useCases: 'CDMA network planning, spread spectrum jammingresistance analysis, 3G WCDMA courses, academic assignments.',
    countries: ['US', 'IN', 'KR', 'JP', 'CN', 'BR', 'AU']
  },
  {
    slug: 'radio-wave-propagation-itu-r-path-loss-model-calculator',
    name: 'Radio Wave Propagation ITU-R Path Loss Model Calculator',
    description: 'Calculate path loss using ITU-R P.525 free space, P.1546 point-to-area, and log-distance models. Covers propagation for broadcast, mobile, and fixed wireless systems from HF to millimeter wave frequencies.',
    category: 'Radio Propagation',
    keywords: ['ITU-R path loss', 'radio propagation', 'log distance model', 'P1546 P525', 'wireless coverage'],
    grade: 'undergraduate',
    formula: 'L = 20log(f) + 20log(d) + 32.44 (free space, km, MHz)',
    inputs: [
      { id: 'f_prop_MHz', label: 'Frequency (MHz)', placeholder: '900', unit: 'MHz' },
      { id: 'd_prop_km', label: 'Distance d (km)', placeholder: '5', unit: 'km' },
      { id: 'n_exp', label: 'Path Loss Exponent n (2=free space, 3-4=urban)', placeholder: '3', unit: '' }
    ],
    calcFn: `
      const f=parseFloat(document.getElementById('f_prop_MHz').value);
      const d=parseFloat(document.getElementById('d_prop_km').value);
      const n=parseFloat(document.getElementById('n_exp').value)||2;
      if(isNaN(f)||isNaN(d)||f<=0||d<=0){document.getElementById('result').textContent='Enter valid values.';return;}
      const FSPL=20*Math.log10(f)+20*Math.log10(d)+32.44;
      const logDist=FSPL+(n-2)*10*Math.log10(d*1000/(1));
      document.getElementById('result').textContent='Free-space PL (ITU-R P.525) = '+FSPL.toFixed(2)+' dB | Log-distance PL (n='+n+') = '+logDist.toFixed(2)+' dB';
    `,
    howToSteps: ['Enter frequency in MHz.', 'Enter distance in km.', 'Enter path loss exponent (2=free space, 3=suburban, 4=urban dense).', 'Click Calculate.'],
    useCases: 'FM/AM broadcast coverage planning, cellular coverage, WiFi range estimation, link budget analysis.',
    countries: ['IN', 'US', 'NG', 'ID', 'BR', 'PK', 'BD', 'PH']
  },
  {
    slug: 'snr-eb-n0-sensitivity-receiver-noise-floor-calculator',
    name: 'Receiver Noise Floor, SNR & Eb/N0 Conversion Calculator',
    description: 'Calculate thermal noise floor N = kTB, receiver sensitivity = noise floor + NF + required SNR, and convert between SNR and Eb/N0 using Eb/N0 = SNR + 10log(BW/R). Essential for wireless receiver design students.',
    category: 'RF Engineering',
    keywords: ['receiver sensitivity', 'noise floor', 'Eb N0 SNR', 'kTB noise', 'wireless receiver design'],
    grade: 'undergraduate',
    formula: 'N_floor = kTB; Sensitivity = N_floor + NF + SNR_required',
    inputs: [
      { id: 'BW_rec', label: 'Receiver Bandwidth BW (kHz)', placeholder: '200', unit: 'kHz' },
      { id: 'NF_rec', label: 'Receiver Noise Figure NF (dB)', placeholder: '5', unit: 'dB' },
      { id: 'SNR_req', label: 'Required SNR (dB)', placeholder: '10', unit: 'dB' },
      { id: 'T_K', label: 'Temperature T (K)', placeholder: '290', unit: 'K' }
    ],
    calcFn: `
      const BW=parseFloat(document.getElementById('BW_rec').value)*1e3;
      const NF=parseFloat(document.getElementById('NF_rec').value)||0;
      const SNRreq=parseFloat(document.getElementById('SNR_req').value)||0;
      const T=parseFloat(document.getElementById('T_K').value)||290;
      if(isNaN(BW)||BW<=0){document.getElementById('result').textContent='Enter valid bandwidth.';return;}
      const k=1.38e-23;
      const Nfloor_W=k*T*BW;
      const Nfloor_dBm=10*Math.log10(Nfloor_W)+30;
      const sens=Nfloor_dBm+NF+SNRreq;
      document.getElementById('result').textContent='Noise floor = '+Nfloor_dBm.toFixed(2)+' dBm | Sensitivity = '+sens.toFixed(2)+' dBm (at NF='+NF+'dB, SNR_req='+SNRreq+'dB)';
    `,
    howToSteps: ['Enter receiver bandwidth in kHz.', 'Enter noise figure in dB and required SNR in dB.', 'Enter temperature (default 290K = 17°C).', 'Click Calculate.'],
    useCases: 'Radio receiver design, GPS receiver sensitivity, WiFi dongle performance, satellite receiver, academic labs.',
    countries: ['US', 'IN', 'DE', 'UK', 'JP', 'KR', 'AU']
  },
  {
    slug: 'digital-filter-fir-iir-cutoff-coefficient-calculator',
    name: 'Digital Filter FIR Windowed Sinc Cutoff & Coefficient Calculator',
    description: 'Calculate ideal FIR lowpass filter coefficients using the windowed-sinc method and display frequency response. Covers rectangular, Hamming, and Hanning windows for DSP, audio, and biomedical signal processing courses.',
    category: 'Digital Signal Processing',
    keywords: ['FIR filter design', 'windowed sinc', 'digital filter coefficients', 'lowpass FIR', 'DSP filter'],
    grade: 'undergraduate',
    formula: 'h[n] = sin(2πfc(n-M/2))/(π(n-M/2)) × w[n]',
    inputs: [
      { id: 'fc_norm', label: 'Normalized Cutoff fc (0 to 0.5)', placeholder: '0.1', unit: '' },
      { id: 'M_order', label: 'Filter Order M (odd preferred)', placeholder: '31', unit: '' },
      { id: 'win_type', label: 'Window (0=Rectangular, 1=Hamming, 2=Hanning)', placeholder: '1', unit: '' }
    ],
    calcFn: `
      const fc=parseFloat(document.getElementById('fc_norm').value);
      const M=parseInt(document.getElementById('M_order').value);
      const wt=parseInt(document.getElementById('win_type').value)||1;
      if(isNaN(fc)||isNaN(M)||fc<=0||fc>=0.5||M<3){document.getElementById('result').textContent='fc must be 0-0.5, M>=3.';return;}
      const h=[];
      for(let n=0;n<=M;n++){
        let s; const mid=M/2;
        if(n===mid) s=2*fc;
        else s=Math.sin(2*Math.PI*fc*(n-mid))/(Math.PI*(n-mid));
        let w;
        if(wt===0) w=1;
        else if(wt===1) w=0.54-0.46*Math.cos(2*Math.PI*n/M);
        else w=0.5*(1-Math.cos(2*Math.PI*n/M));
        h.push((s*w).toFixed(6));
      }
      document.getElementById('result').textContent='FIR coefficients (first 5): ['+h.slice(0,5).join(', ')+' ...] Total '+(M+1)+' taps. Cutoff ≈ fs×'+fc;
    `,
    howToSteps: ['Enter normalized cutoff frequency (0 to 0.5, where 0.5 = fs/2).', 'Enter filter order M (31 for moderate roll-off).', 'Select window type.', 'Click Calculate to see coefficients.'],
    useCases: 'Audio equalizer design, ECG signal filtering, vibration analysis, DSP lab assignments, MATLAB/Python verification.',
    countries: ['US', 'IN', 'DE', 'UK', 'JP', 'AU', 'KR']
  },
  {
    slug: 'vlsi-cmos-propagation-delay-power-dissipation-calculator',
    name: 'VLSI CMOS Gate Propagation Delay & Power Dissipation Calculator',
    description: 'Calculate CMOS gate propagation delay tpHL ≈ 0.69×R×CL, dynamic power P = α×C×V²×f, and static leakage power. Covers VLSI design, digital IC design, and semiconductor technology courses.',
    category: 'VLSI Design',
    keywords: ['CMOS propagation delay', 'VLSI power dissipation', 'dynamic power CMOS', 'gate delay', 'IC design'],
    grade: 'undergraduate',
    formula: 'P_dynamic = α×CL×VDD²×f; tp = 0.69×Req×CL',
    inputs: [
      { id: 'C_load', label: 'Load Capacitance CL (fF)', placeholder: '100', unit: 'fF' },
      { id: 'Vdd', label: 'Supply Voltage VDD (V)', placeholder: '1.2', unit: 'V' },
      { id: 'f_clk', label: 'Clock Frequency f (GHz)', placeholder: '1', unit: 'GHz' },
      { id: 'alpha', label: 'Activity Factor α (0-1)', placeholder: '0.5', unit: '' },
      { id: 'Req', label: 'Equivalent Resistance Req (kΩ)', placeholder: '10', unit: 'kΩ' }
    ],
    calcFn: `
      const CL=parseFloat(document.getElementById('C_load').value)*1e-15;
      const Vdd=parseFloat(document.getElementById('Vdd').value);
      const f=parseFloat(document.getElementById('f_clk').value)*1e9;
      const alpha=parseFloat(document.getElementById('alpha').value)||0.5;
      const Req=parseFloat(document.getElementById('Req').value)*1e3;
      if([CL,Vdd,f].some(isNaN)||CL<=0||Vdd<=0||f<=0){document.getElementById('result').textContent='Enter valid values.';return;}
      const Pdyn=alpha*CL*Vdd*Vdd*f;
      const tp=isNaN(Req)||Req<=0?null:0.69*Req*CL;
      let msg='P_dynamic = '+(Pdyn*1e6).toFixed(4)+' µW';
      if(tp) msg+=' | Propagation delay tp = '+(tp*1e12).toFixed(3)+' ps';
      document.getElementById('result').textContent=msg;
    `,
    howToSteps: ['Enter load capacitance in fF, supply voltage, and clock frequency.', 'Enter activity factor (fraction of clock cycles a transition occurs).', 'Optionally enter equivalent resistance for delay calculation.', 'Click Calculate.'],
    useCases: 'CMOS IC design courses, power estimation for ASICs, digital cell characterization, VLSI CAD tool verification.',
    countries: ['US', 'IN', 'TW', 'KR', 'JP', 'DE', 'UK']
  },
  {
    slug: 'turbo-code-convolutional-code-coding-gain-rate-calculator',
    name: 'Convolutional / Turbo Code Coding Gain & Code Rate Calculator',
    description: 'Calculate channel coding gain, effective Eb/N0 after coding, and throughput for convolutional and turbo codes at rates 1/2, 1/3, 2/3. Covers FEC coding for LTE, satellite, and deep-space communications students.',
    category: 'Channel Coding',
    keywords: ['turbo code', 'convolutional code', 'coding gain', 'FEC forward error correction', 'LTE channel coding'],
    grade: 'undergraduate',
    formula: 'Coding Gain = 10×log10(Eb/N0_uncoded / Eb/N0_coded) at same BER',
    inputs: [
      { id: 'code_rate', label: 'Code Rate r (e.g. 0.5 for rate 1/2)', placeholder: '0.5', unit: '' },
      { id: 'constraint_length', label: 'Constraint Length K', placeholder: '7', unit: '' },
      { id: 'target_BER', label: 'Target BER (e.g. 1e-5)', placeholder: '0.00001', unit: '' }
    ],
    calcFn: `
      const r=parseFloat(document.getElementById('code_rate').value);
      const K=parseInt(document.getElementById('constraint_length').value)||7;
      const BER=parseFloat(document.getElementById('target_BER').value);
      if(isNaN(r)||r<=0||r>=1){document.getElementById('result').textContent='Enter code rate between 0 and 1.';return;}
      const dfree=Math.max(5,2*(K-1)+1);
      const codingGain_approx=10*Math.log10(r*dfree);
      const spectralEff=-10*Math.log10(r);
      document.getElementById('result').textContent='Approx free distance dfree ≈ '+dfree+' | Coding gain ≈ '+codingGain_approx.toFixed(2)+' dB | Rate penalty = '+spectralEff.toFixed(2)+' dB (bandwidth expansion '+(1/r).toFixed(2)+'x)';
    `,
    howToSteps: ['Enter the code rate (0.5 for rate-1/2, 0.333 for rate-1/3).', 'Enter constraint length K (typical: 7 for GSM/LTE convolutional, 4 for turbo interleavers).', 'Enter target BER for context.', 'Click Calculate.'],
    useCases: 'LTE/5G channel coding selection, deep-space probe communication, satellite broadcasting, error-correction lab.',
    countries: ['US', 'IN', 'DE', 'JP', 'KR', 'UK', 'AU']
  },
  {
    slug: 'mimo-spatial-multiplexing-capacity-channel-matrix-calculator',
    name: 'MIMO Spatial Multiplexing Capacity & Channel Matrix Calculator',
    description: 'Estimate MIMO channel capacity using C = B×Σlog2(1+λi×SNR/Nt) where λi are channel singular values. Covers 2x2 to 8x8 MIMO for 4G LTE, 5G NR, and WiFi 802.11n/ac/ax courses.',
    category: 'Wireless Communications',
    keywords: ['MIMO capacity', 'spatial multiplexing', 'MIMO channel matrix', '5G MIMO', 'LTE MIMO streams'],
    grade: 'undergraduate',
    formula: 'C = B×Σlog₂(1 + λᵢ×SNR/Nt)',
    inputs: [
      { id: 'Nt', label: 'Number of Tx Antennas Nt', placeholder: '4', unit: '' },
      { id: 'Nr', label: 'Number of Rx Antennas Nr', placeholder: '4', unit: '' },
      { id: 'SNR_MIMO', label: 'Average SNR (dB)', placeholder: '20', unit: 'dB' },
      { id: 'BW_MIMO', label: 'Bandwidth (MHz)', placeholder: '20', unit: 'MHz' }
    ],
    calcFn: `
      const Nt=parseInt(document.getElementById('Nt').value);
      const Nr=parseInt(document.getElementById('Nr').value);
      const SNR_dB=parseFloat(document.getElementById('SNR_MIMO').value);
      const BW=parseFloat(document.getElementById('BW_MIMO').value)*1e6;
      if([Nt,Nr,SNR_dB,BW].some(isNaN)||Nt<=0||Nr<=0||BW<=0){document.getElementById('result').textContent='Enter valid values.';return;}
      const SNR=Math.pow(10,SNR_dB/10);
      const Nstreams=Math.min(Nt,Nr);
      let C=0;
      for(let i=0;i<Nstreams;i++) C+=Math.log2(1+SNR/Nt);
      C*=BW;
      const SISO_C=BW*Math.log2(1+SNR);
      document.getElementById('result').textContent=Nstreams+'x'+Nstreams+' MIMO capacity ≈ '+(C/1e6).toFixed(2)+' Mbps | SISO capacity = '+(SISO_C/1e6).toFixed(2)+' Mbps | Gain = '+(C/SISO_C).toFixed(2)+'x';
    `,
    howToSteps: ['Enter number of transmit and receive antennas.', 'Enter average SNR in dB and bandwidth in MHz.', 'Click Calculate to see MIMO vs SISO capacity comparison.'],
    useCases: '5G NR massive MIMO, WiFi 802.11ac/ax, LTE Advanced carrier aggregation, research simulations, academic projects.',
    countries: ['US', 'KR', 'CN', 'IN', 'DE', 'UK', 'JP']
  }
];

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

for (const tool of tools) {
  const dir = path.join(TOOLS_DIR, tool.slug);
  fs.mkdirSync(dir, { recursive: true });

  const inputsHtml = tool.inputs.map(inp =>
    `<div class="input-group">
      <label for="${inp.id}">${escapeHtml(inp.label)}</label>
      <input type="number" id="${inp.id}" placeholder="${inp.placeholder}" step="any" />
      ${inp.unit ? `<span class="unit">${escapeHtml(inp.unit)}</span>` : ''}
    </div>`
  ).join('\n');

  const stepsHtml = tool.howToSteps.map(s => `<li>${escapeHtml(s)}</li>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(tool.name)}</title>
<meta name="description" content="${escapeHtml(tool.description)}"/>
<meta name="keywords" content="${escapeHtml(tool.keywords.join(', '))}"/>
<link rel="stylesheet" href="/assets/tool.css"/>
</head>
<body>
<header><a href="/">&#8592; All Tools</a></header>
<main>
<h1>${escapeHtml(tool.name)}</h1>
<p class="desc">${escapeHtml(tool.description)}</p>
<div class="formula-box"><strong>Formula:</strong> ${escapeHtml(tool.formula)}</div>
<div class="calculator">
${inputsHtml}
<button onclick="calculate()">Calculate</button>
<div id="result" class="result"></div>
</div>
<section class="how-to">
<h2>How to Use</h2>
<ol>${stepsHtml}</ol>
</section>
<section class="use-cases">
<h2>Use Cases</h2>
<p>${escapeHtml(tool.useCases)}</p>
</section>
</main>
<script src="tool.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html);

  const js = `'use strict';
function calculate() {
  try {
    ${tool.calcFn.trim()}
  } catch(e) {
    document.getElementById('result').textContent = 'Error: ' + e.message;
  }
}`;
  fs.writeFileSync(path.join(dir, 'tool.js'), js);

  console.log('Created tool:', tool.slug);
}

console.log('Pack 53 complete: ' + tools.length + ' tools created.');
