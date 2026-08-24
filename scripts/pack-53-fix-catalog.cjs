'use strict';
// Post-processor: generates catalog.json and sitemap.xml for all pack-53 tools
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'tools');
const SITE_ORIGIN = 'https://niktool.in';

const tools = [
  { slug: 'shannon-hartley-channel-capacity-snr-bandwidth-calculator', name: 'Shannon-Hartley Channel Capacity Calculator', description: 'Calculate maximum theoretical channel capacity C = B × log2(1 + S/N) using Shannon-Hartley theorem. Useful for telecommunications, information theory, and wireless network design students.', category: 'Telecommunications', keywords: ['shannon hartley', 'channel capacity', 'information theory', 'bandwidth SNR', 'wireless communication'] },
  { slug: 'nyquist-sampling-theorem-aliasing-minimum-sample-rate-calculator', name: 'Nyquist Sampling Theorem & Aliasing Calculator', description: 'Compute minimum Nyquist sampling rate fs = 2 × fmax to avoid aliasing. Essential for DSP, audio engineering, and signal processing students.', category: 'Digital Signal Processing', keywords: ['nyquist sampling', 'aliasing', 'sample rate', 'DSP', 'signal processing'] },
  { slug: 'friis-free-space-path-loss-link-budget-calculator', name: 'Friis Transmission & Free-Space Path Loss Calculator', description: 'Calculate received power and free-space path loss FSPL in dB. Essential for RF, satellite, and wireless link budget analysis.', category: 'RF Engineering', keywords: ['friis equation', 'free space path loss', 'link budget', 'RF power', 'antenna gain'] },
  { slug: 'microstrip-line-characteristic-impedance-pcb-rf-calculator', name: 'Microstrip Line Characteristic Impedance Calculator', description: 'Calculate microstrip PCB trace characteristic impedance Z0 and effective dielectric constant. Essential for RF PCB design and microwave engineering students.', category: 'Microwave Engineering', keywords: ['microstrip impedance', 'PCB trace impedance', 'RF PCB design', 'transmission line', 'microwave'] },
  { slug: 'qam-bit-error-rate-snr-modulation-order-calculator', name: 'QAM Bit Error Rate (BER) vs SNR Calculator', description: 'Calculate approximate BER for M-QAM modulation. Covers QPSK, 16-QAM, 64-QAM. Useful for wireless communications and digital modulation courses.', category: 'Digital Communications', keywords: ['QAM BER', 'bit error rate', 'modulation order', 'QPSK 16QAM', 'wireless BER'] },
  { slug: 'ofdm-subcarrier-spacing-symbol-duration-cyclic-prefix-calculator', name: 'OFDM Subcarrier Spacing & Cyclic Prefix Calculator', description: 'Compute OFDM symbol duration, cyclic prefix, spectral efficiency, and total bandwidth. Used in LTE, 5G NR, WiFi 802.11, and digital broadcasting courses.', category: 'Digital Communications', keywords: ['OFDM subcarrier spacing', 'cyclic prefix', 'LTE 5G OFDM', 'symbol duration', 'spectral efficiency'] },
  { slug: 'optical-fiber-attenuation-power-budget-link-calculator', name: 'Optical Fiber Attenuation & Power Budget Link Calculator', description: 'Calculate received optical power and check if link margin is positive. Covers single-mode and multimode fiber for telecom and photonics engineering students.', category: 'Photonics', keywords: ['fiber attenuation', 'optical power budget', 'single mode fiber', 'telecom link', 'dB loss'] },
  { slug: 'rf-amplifier-noise-figure-cascaded-friis-noise-calculator', name: 'RF Amplifier Noise Figure & Cascaded Friis Noise Calculator', description: 'Calculate total system noise figure using Friis formula for cascaded stages. Essential for LNA, receiver chain, and RF system design students.', category: 'RF Engineering', keywords: ['noise figure', 'friis noise formula', 'cascaded noise', 'LNA receiver chain', 'RF amplifier'] },
  { slug: 'radar-range-equation-snr-detection-range-calculator', name: 'Radar Range Equation & Detection Range Calculator', description: 'Calculate radar maximum detection range and received SNR. Covers pulse, CW, and phased array radar for EE and defense technology students.', category: 'Radar Systems', keywords: ['radar range equation', 'radar SNR', 'radar cross section', 'pulse radar', 'detection range'] },
  { slug: 'doppler-shift-frequency-velocity-radar-ultrasound-calculator', name: 'Doppler Shift Frequency Calculator (Radar & Ultrasound)', description: 'Calculate Doppler frequency shift for radar and acoustic applications. Covers moving target indication, medical ultrasound Doppler, and astrophysical redshift.', category: 'Wave Physics', keywords: ['doppler shift', 'doppler radar', 'doppler ultrasound', 'target velocity', 'frequency shift'] },
  { slug: 'antenna-array-beamforming-half-power-beamwidth-directivity-calculator', name: 'Antenna Array Beamforming & HPBW Directivity Calculator', description: 'Calculate half-power beamwidth HPBW and array directivity for uniform linear arrays (ULA). Covers phased arrays, MIMO beamforming, and 5G massive MIMO antenna systems.', category: 'Antenna Engineering', keywords: ['antenna beamforming', 'HPBW beamwidth', 'phased array', 'MIMO antenna', 'array directivity'] },
  { slug: 'impedance-matching-l-network-pi-network-rf-calculator', name: 'L-Network Impedance Matching RF Circuit Calculator', description: 'Calculate L-network reactive components to match source impedance to load impedance at a given frequency. Essential for RF power amplifiers and antenna matching.', category: 'RF Engineering', keywords: ['impedance matching', 'L network', 'RF matching circuit', 'antenna matching', 'Q factor matching'] },
  { slug: 'dbm-dbw-watts-voltage-rf-power-conversion-calculator', name: 'dBm / dBW / Watts / Voltage RF Power Conversion Calculator', description: 'Convert between dBm, dBW, milliwatts, watts, and RMS voltage across any impedance. Instant bidirectional RF power unit conversion essential for all RF and signal processing students.', category: 'RF Engineering', keywords: ['dBm to watts', 'dBm dBW conversion', 'RF power units', 'milliwatts', 'RMS voltage power'] },
  { slug: 'coaxial-cable-attenuation-characteristic-impedance-calculator', name: 'Coaxial Cable Attenuation & Characteristic Impedance Calculator', description: 'Calculate coaxial cable characteristic impedance Z0 and attenuation. Covers RG-58, RG-213, LMR-400 type cables for RF installations and cable TV engineering students.', category: 'RF Engineering', keywords: ['coaxial cable impedance', 'coax attenuation', 'RG58 RG213 LMR400', 'cable TV RF', 'transmission line'] },
  { slug: 'rectangular-waveguide-cutoff-frequency-mode-calculator', name: 'Rectangular Waveguide Cutoff Frequency & Mode Calculator', description: 'Calculate cutoff frequency for TE and TM modes in rectangular waveguides. Covers WR-90, WR-112, WR-284 standard waveguides for microwave engineering students.', category: 'Microwave Engineering', keywords: ['waveguide cutoff frequency', 'TE TM modes', 'rectangular waveguide', 'microwave guide', 'WR90 WR284'] },
  { slug: 'gsm-lte-link-budget-indoor-outdoor-coverage-calculator', name: 'GSM / LTE Cellular Link Budget & Coverage Range Calculator', description: 'Calculate cellular maximum allowable path loss MAPL and estimate cell radius using ITU-R Okumura-Hata propagation. Covers 2G 3G 4G LTE coverage planning for telecom engineering students.', category: 'Cellular Networks', keywords: ['LTE link budget', 'cell coverage', 'MAPL path loss', 'Okumura Hata', 'cellular planning'] },
  { slug: 'pulse-width-duty-cycle-frequency-period-digital-signal-calculator', name: 'Pulse Width / Duty Cycle / Frequency / Period Digital Signal Calculator', description: 'Calculate pulse period, duty cycle, pulse width, and average power for digital signals. Essential for microcontroller PWM, power electronics, and digital electronics students.', category: 'Digital Electronics', keywords: ['duty cycle calculator', 'PWM frequency period', 'pulse width', 'digital signal', 'microcontroller PWM'] },
  { slug: 'cdma-spreading-gain-eb-n0-processing-gain-calculator', name: 'CDMA Spreading Gain & Eb/N0 Processing Gain Calculator', description: 'Calculate CDMA WCDMA spreading gain, effective Eb N0 after despreading. Covers IS-95, CDMA2000, WCDMA for wireless communications students.', category: 'Wireless Communications', keywords: ['CDMA spreading gain', 'processing gain', 'WCDMA CDMA2000', 'Eb N0 CDMA', 'spread spectrum'] },
  { slug: 'radio-wave-propagation-itu-r-path-loss-model-calculator', name: 'Radio Wave Propagation ITU-R Path Loss Model Calculator', description: 'Calculate path loss using ITU-R P.525 free space and log-distance models. Covers propagation for broadcast, mobile, and fixed wireless systems from HF to millimeter wave frequencies.', category: 'Radio Propagation', keywords: ['ITU-R path loss', 'radio propagation', 'log distance model', 'P1546 P525', 'wireless coverage'] },
  { slug: 'snr-eb-n0-sensitivity-receiver-noise-floor-calculator', name: 'Receiver Noise Floor, SNR & Eb/N0 Conversion Calculator', description: 'Calculate thermal noise floor, receiver sensitivity, and convert between SNR and Eb N0. Essential for wireless receiver design students.', category: 'RF Engineering', keywords: ['receiver sensitivity', 'noise floor', 'Eb N0 SNR', 'kTB noise', 'wireless receiver design'] },
  { slug: 'digital-filter-fir-iir-cutoff-coefficient-calculator', name: 'Digital Filter FIR Windowed Sinc Cutoff & Coefficient Calculator', description: 'Calculate ideal FIR lowpass filter coefficients using windowed-sinc method. Covers rectangular, Hamming, and Hanning windows for DSP, audio, and biomedical signal processing courses.', category: 'Digital Signal Processing', keywords: ['FIR filter design', 'windowed sinc', 'digital filter coefficients', 'lowpass FIR', 'DSP filter'] },
  { slug: 'vlsi-cmos-propagation-delay-power-dissipation-calculator', name: 'VLSI CMOS Gate Propagation Delay & Power Dissipation Calculator', description: 'Calculate CMOS gate propagation delay, dynamic power, and static leakage power. Covers VLSI design, digital IC design, and semiconductor technology courses.', category: 'VLSI Design', keywords: ['CMOS propagation delay', 'VLSI power dissipation', 'dynamic power CMOS', 'gate delay', 'IC design'] },
  { slug: 'turbo-code-convolutional-code-coding-gain-rate-calculator', name: 'Convolutional / Turbo Code Coding Gain & Code Rate Calculator', description: 'Calculate channel coding gain, effective Eb N0 after coding, and throughput for convolutional and turbo codes. Covers FEC coding for LTE, satellite, and deep-space communications students.', category: 'Channel Coding', keywords: ['turbo code', 'convolutional code', 'coding gain', 'FEC forward error correction', 'LTE channel coding'] },
  { slug: 'mimo-spatial-multiplexing-capacity-channel-matrix-calculator', name: 'MIMO Spatial Multiplexing Capacity & Channel Matrix Calculator', description: 'Estimate MIMO channel capacity for multi-antenna systems. Covers 2x2 to 8x8 MIMO for 4G LTE, 5G NR, and WiFi 802.11n ac ax courses.', category: 'Wireless Communications', keywords: ['MIMO capacity', 'spatial multiplexing', 'MIMO channel matrix', '5G MIMO', 'LTE MIMO streams'] },
  { slug: 'eye-diagram-jitter-ber-floor-high-speed-serial-calculator', name: 'Eye Diagram Jitter & BER Floor High-Speed Serial Link Calculator', description: 'Estimate BER floor from random jitter (RJ) and deterministic jitter (DJ) for high-speed serial links. Covers USB, PCIe, SATA, Ethernet, and SerDes signal integrity courses.', category: 'Signal Integrity', keywords: ['eye diagram jitter', 'BER floor', 'random jitter RJ DJ', 'high speed serial', 'signal integrity PCIe'] }
];

const today = new Date().toISOString().split('T')[0];

let created = 0;
for (const t of tools) {
  const dir = path.join(TOOLS_DIR, t.slug);
  if (!fs.existsSync(dir)) {
    console.log('SKIP (missing dir):', t.slug);
    continue;
  }

  // Write catalog.json
  const catalog = {
    name: t.name,
    description: t.description,
    path: `/tools/${t.slug}/`,
    category: t.category,
    icon: 'code',
    keywords: t.keywords
  };
  fs.writeFileSync(path.join(dir, 'catalog.json'), JSON.stringify(catalog, null, 2), 'utf8');

  // Write sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_ORIGIN}/tools/${t.slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap, 'utf8');

  created++;
  console.log('Fixed:', t.slug);
}

console.log(`\nFixed ${created} tools with catalog.json + sitemap.xml`);
