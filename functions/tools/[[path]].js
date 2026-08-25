function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const TOOLS_INDEX = {"555-timer-astable-multivibrator-calculator":0,"555-timer-astable-multivibrator-frequency-duty-cycle-calculator":0,"a-level-physics-suvat-kinematics-equations-motion-calculator":0,"abbe-number-chromatic-dispersion-calculator":0,"absorbed-dose-kerma-stopping-power-bragg-gray-calculator":0,"ac-apparent-power-kva-calculator":0,"ac-circuits-inductive-capacitive-reactance-impedance-calculator":0,"ac-impedance-rlc-series-circuit-calculator":0,"ac-reactive-power-kvar-calculator":0,"ackermann-steering-geometry-inner-outer-wheel-angle-calculator":0,"ackermann-steering-geometry-turning-radius-calculator":0,"acoustic-coincidence-critical-frequency-calculator":0,"acoustic-loudness-phons-sones-calculator":0,"acousto-optic-modulator-bragg-angle-calculator":0,"activated-sludge-aeration-tank-fm-ratio-mlss-calculator":0,"activated-sludge-biochemical-oxygen-demand-bod-kinetics-calculator":0,"activated-sludge-food-to-mass-fm-ratio-calculator":0,"activated-sludge-solids-retention-time-srt-sludge-age-calculator":0,"activation-energy-arrhenius-calculator":0,"adiabatic-flame-temperature-constant-pressure-calculator":0,"adjusted-body-weight-clinical-calculator":0,"air-duct-equivalent-round-diameter-calculator":0,"air-stripping-tower-henry-law-voc-removal-calculator":0,"aircraft-breguet-range-endurance-jet-propeller-calculator":0,"aircraft-climb-gradient-rate-of-climb-calculator":0,"aircraft-lift-drag-coefficient-glide-ratio-calculator":0,"aircraft-stall-speed-wing-loading-calculator":0,"aircraft-takeoff-roll-distance-ground-run-calculator":0,"aircraft-wing-aspect-ratio-induced-drag-calculator":0,"aircraft-wing-lift-induced-drag-aspect-ratio-calculator":0,"airfoil-circulation-kutta-joukowski-lift-calculator":0,"aisc-column-slenderness-ratio-calculator":0,"algorithm-cheat-sheet":0,"alpha-decay-geiger-nuttall-half-life-calculator":0,"alveolar-gas-equation-a-a-oxygen-gradient-calculator":0,"alveolar-gas-equation-arterial-oxygen-gradient-calculator":0,"amino-acid-isoelectric-point-pi-protein-charge-calculator":0,"anaerobic-digester-methane-biogas-yield-calculator":0,"angle-degrees-radians-gradians-converter":0,"anion-gap-metabolic-acidosis-delta-ratio-calculator":0,"anion-gap-serum-osmolar-gap-metabolic-acidosis-calculator":0,"annulus-ring-area-calculator":0,"antenna-aperture-gain-beamwidth-calculator":0,"antenna-array-beamforming-half-power-beamwidth-directivity-calculator":0,"antoine-equation-vapor-pressure-pure-liquids-calculator":0,"ap-calculus-riemann-sum-left-right-trapezoidal-calculator":0,"ap-chemistry-buffer-solution-henderson-hasselbalch-ph-calculator":0,"ap-physics-projectile-motion-drag-quadratic-air-resistance-calculator":0,"ap-statistics-two-sample-t-test-p-value-calculator":0,"api-gravity-crude-oil-density-converter":0,"apparent-absolute-magnitude-astronomy-calculator":0,"apparent-resistivity-wenner-schlumberger-array-calculator":0,"apparent-solar-time-equation-of-time-analemma-calculator":0,"apparent-vs-absolute-magnitude-distance-modulus-calculator":0,"archard-wear-law-volume-loss-sliding-calculator":0,"archie-rock-water-saturation-resistivity-porosity-calculator":0,"area-sqft-sqm-acres-hectares-converter":0,"arithmetic-progression-calculator":0,"arithmetic-series-sum-calculator":0,"arrhenius-equation-activation-energy-calculator":0,"arrhenius-equation-activation-energy-rate-calculator":0,"arrhenius-equation-activation-energy-rate-constant-calculator":0,"arrhenius-thermal-degradation-activation-energy-calculator":0,"arterial-blood-gas-abg-henderson-hasselbalch-acid-base-calculator":0,"arterial-blood-gas-abg-respiratory-metabolic-acidosis-calculator":0,"ascii-table":0,"aspect-ratio-calculator":0,"asphalt-air-voids-vma-vfa-marshall-mix-calculator":0,"asphalt-paving-tonnage-calculator":0,"atkinson-mine-ventilation-friction-head-loss-calculator":0,"atmospheric-scale-height-barometric-density-altitude-calculator":0,"atmospheric-scale-height-barometric-exponential-pressure-calculator":0,"atomic-layer-deposition-ald-growth-per-cycle-calculator":0,"atomic-mass-lookup":0,"attendance-calculator":0,"attendance-shortage-calculator":0,"atterberg-limits-plasticity-liquidity-index-calculator":0,"audio-bpm-to-delay-time-calculator":0,"audio-sample-rate-file-size-calculator":0,"australian-atar-aggregate-scaled-study-score-calculator":0,"avogadro-law-gas-calculator":0,"bacterial-growth-doubling-time-calculator":0,"bacterial-growth-doubling-time-generation-calculator":0,"bakers-percentage-dough-hydration-calculator":0,"baking-flour-hydration-percentage-calculator":0,"ball-mill-critical-speed-rpm-calculator":0,"barometric-altitude-hypsometric-calculator":0,"batch-sterilization-del-factor-arrhenius-calculator":0,"battery-charge-time-efficiency-calculator":0,"battery-life-runtime-calculator":0,"battery-life-runtime-power-consumption-calculator":0,"bcs-theory-superconducting-energy-gap-critical-field-calculator":0,"beam-bending-deflection-moment-inertia-calculator":0,"beer-brewing-abv-specific-gravity-calculator":0,"beer-lambert-law-absorbance-calculator":0,"bell-state-entanglement-fidelity-calculator":0,"belt-drive-euler-eytelwein-capstan-friction-torque-calculator":0,"bernoulli-equation-head-loss-pipe-flow-calculator":0,"bernoulli-equation-pipe-flow-calculator":0,"bernoulli-equation-venturi-meter-pipe-flow-rate-calculator":0,"bernoulli-pitot-tube-fluid-velocity-calculator":0,"bert-transformer-self-attention-scaled-dot-product-calculator":0,"betatron-oscillation-beam-emittance-calculator":0,"bezier-cubic-curve-interpolation-calculator":0,"bi-elliptic-transfer-delta-v-hohmann-comparison-calculator":0,"bi-elliptic-transfer-orbit-delta-v-ratio-calculator":0,"big-o-calculator":0,"binary-hex-octal-decimal-matrix-converter":0,"binary-tree-visualizer":0,"binomial-distribution-probability-calculator":0,"biochemical-oxygen-demand-bod5-kinetics-calculator":0,"bioreactor-kla-volumetric-oxygen-transfer-calculator":0,"biot-savart-law-magnetic-field-straight-wire-loop-solenoid-calculator":0,"biot-savart-magnetic-field-wire-calculator":0,"bipolar-junction-transistor-ebers-moll-collector-current-calculator":0,"bisection-method-root-finding-error-tolerance-calculator":0,"bishop-simplified-method-slices-slope-stability-calculator":0,"bitwise-calculator":0,"bjt-early-voltage-output-resistance-calculator":0,"bjt-transistor-base-resistor-saturation-calculator":0,"black-scholes-european-call-option-calculator":0,"black-scholes-merton-call-put-option-greeks-delta-gamma-calculator":0,"black-scholes-merton-option-greeks-delta-gamma-calculator":0,"black-scholes-put-call-parity-arbitrage-calculator":0,"blackbody-radiation-emissivity-calculator":0,"blackbody-stefan-boltzmann-calculator":0,"bleu-score-machine-translation-ngram-precision-calculator":0,"bloch-sphere-qubit-rotation-coordinates-calculator":0,"bloch-sphere-qubit-state-coordinates-calculator":0,"bloch-sphere-qubit-state-rotation-probability-calculator":0,"blood-alcohol-content-widmark-calculator":0,"bmr-tdee-calculator":0,"bode-plot-gain-margin-phase-margin-frequency-response-calculator":0,"bode-plot-gain-phase-margin-gain-crossover-calculator":0,"body-fat-percentage-calculator":0,"body-surface-area-mosteller-du-bois-bsa-calculator":0,"body-surface-area-mosteller-du-bois-calculator":0,"body-surface-area-mosteller-du-bois-chemotherapy-calculator":0,"body-surface-area-mosteller-du-bois-drug-dosage-calculator":0,"bohr-model-hydrogen-energy-levels-calculator":0,"boiling-point-elevation-calculator":0,"boiling-point-elevation-ebullioscopic-calculator":0,"bolt-shear-bearing-capacity-aisc-calculator":0,"bond-macaulay-modified-duration-convexity-calculator":0,"bond-order-molecular-orbital-calculator":0,"bond-work-index-ball-mill-grinding-power-calculator":0,"bond-work-index-grinding-energy-calculator":0,"bone-mineral-density-dexa-t-score-z-score-osteoporosis-calculator":0,"boost-converter-duty-cycle-inductor-sizing-calculator":0,"boost-converter-duty-cycle-stress-calculator":0,"bouguer-gravity-anomaly-elevation-slab-correction-calculator":0,"boyles-law-gas-calculator":0,"bradford-assay-protein-standard-curve-bovine-serum-calculator":0,"bradford-bca-protein-assay-standard-curve-calculator":0,"bragg-law-xray-diffraction-calculator":0,"bragg-law-xray-diffraction-crystal-plane-spacing-calculator":0,"bragg-law-xray-diffraction-interplanar-spacing-calculator":0,"bragg-law-xray-diffraction-xrd-interplanar-spacing-calculator":0,"bragg-peak-proton-therapy-stopping-power-bethe-bloch-calculator":0,"break-even-point-calculator":0,"bremsstrahlung-radiation-power-loss-fusion-plasma-calculator":0,"bresenham-line-rasterization-step-calculator":0,"brewster-polarization-angle-calculator":0,"brinell-hardness-number-bhn-calculator":0,"btech-student-dashboard":0,"buck-boost-converter-inductor-ripple-calculator":0,"buck-converter-inductor-capacitor-ripple-calculator":0,"building-envelope-u-value-r-value-calculator":0,"cable-theory-length-time-constant-calculator":0,"caesar-cipher-encoder-decoder":0,"cagr-calculator":0,"camera-depth-of-field-hyperfocal-calculator":0,"cantilever-beam-deflection-end-load-calculator":0,"cantilever-beam-point-load-deflection-bending-moment-calculator":0,"capacitance-rc-time-constant-calculator":0,"cape-convective-available-potential-energy-calculator":0,"capillary-action-jurins-law-meniscus-height-calculator":0,"capital-asset-pricing-model-sharpe-treynor-jensen-alpha-calculator":0,"capm-capital-asset-pricing-model-beta-alpha-calculator":0,"capm-expected-return-beta-calculator":0,"carbon-adsorption-freundlich-langmuir-isotherm-calculator":0,"carbon-footprint-scope-1-2-3-greenhouse-gas-emissions-calculator":0,"cardiac-output-fick-principle-calculator":0,"cardiac-output-fick-principle-oxygen-consumption-calculator":0,"cardiac-output-stroke-volume-fick-principle-calculator":0,"carnot-heat-engine-efficiency-calculator":0,"carreau-yasuda-shear-thinning-viscosity-calculator":0,"carrier-drift-mobility-einstein-relation-diffusion-calculator":1,"case-kebab-camel-snake-converter":1,"cbse-class-10-cgpa-to-percentage-converter":1,"cbse-class-12-best-of-five-percentage-stream-calculator":1,"cdma-spreading-gain-eb-n0-processing-gain-calculator":1,"cell-doubling-time-specific-growth-rate-biotech-calculator":1,"cellular-path-loss-hata-cost231-calculator":1,"centrifugal-pump-affinity-laws-flow-head-power-calculator":1,"centripetal-acceleration-centripetal-force-curved-motion-calculator":1,"centripetal-force-calculator":1,"cereal-grain-drying-equilibrium-moisture-content-emc-calculator":1,"cfd-y-plus-boundary-layer-wall-distance-calculator":1,"cgpa-to-percentage-calculator":1,"cha2ds2-vasc-atrial-fibrillation-stroke-risk-calculator":1,"chandrasekhar-mass-limit-white-dwarf-degeneracy-calculator":1,"chapman-enskog-gas-diffusivity-collision-integral-calculator":1,"chapman-jouguet-detonation-velocity-hugoniot-calculator":1,"chapter-progress-tracker":1,"charles-law-gas-calculator":1,"chebyshev-inequality-probability-calculator":1,"chemical-equation-balancer":1,"chemical-formula-builder":1,"chemical-reaction-percent-yield-calculator":1,"chemical-vapor-deposition-cvd-thin-film-growth-rate-calculator":1,"chilled-water-flow-rate-delta-t-gpm-calculator":1,"chinese-remainder-theorem-system-of-congruences-calculator":1,"chlorine-contact-disinfection-ct-value-calculator":1,"chlorine-disinfection-ct-disinfection-log-inactivation-calculator":1,"chlorine-disinfection-ct-disinfection-log-kill-calculator":1,"chlorophyll-fluorescence-fv-fm-photosystem-ii-efficiency-calculator":1,"circle-area-calculator":1,"circle-area-circumference-arc-length-sector-area-calculator":1,"circle-sector-arc-length-calculator":1,"clarifier-surface-overflow-rate-sor-calculator":1,"clausius-clapeyron-cryogen-vapor-pressure-boiling-calculator":1,"clausius-clapeyron-vapor-pressure-boiling-point-calculator":1,"cmos-inverter-dynamic-switching-power-dissipation-calculator":1,"cnc-milling-feed-rate-ipt-ipm-calculator":1,"coagulation-flocculation-camp-stein-velocity-gradient-calculator":1,"coagulation-flocculation-velocity-gradient-g-value-calculator":1,"coastal-wave-shoaling-refraction-calculator":1,"coaxial-cable-attenuation-characteristic-impedance-calculator":1,"cobb-douglas-production-function-marginal-product-calculator":1,"codon-usage-bias-cai-codon-adaptation-index-calculator":1,"coffee-brew-ratio-calculator":1,"cohen-coon-pid-controller-open-loop-tuning-calculator":1,"colburn-htug-height-transfer-unit-packed-column-calculator":1,"collatz-conjecture-visualizer":1,"college-resource-manager":1,"college-weighted-gpa-4-point-scale-calculator":1,"colligative-properties-boiling-elevation-freezing-depression-osmotic-calculator":1,"color-contrast-checker":1,"combined-gas-law-calculator":1,"combustion-analysis-empirical-formula-hydrocarbon-calculator":1,"combustion-stoichiometry-air-fuel-ratio-calculator":1,"combustion-stoichiometry-air-fuel-ratio-equivalence-ratio-calculator":1,"complex-number-arithmetic-calculator":1,"complex-number-polar-cartesian-converter":1,"composting-carbon-nitrogen-cn-ratio-moisture-calculator":1,"compound-interest-calculator":1,"compound-interest-future-value-savings-a-equals-p-1-plus-r-over-n-nt-calculator":1,"compton-scattering-wavelength-shift-calculator":1,"computed-tomography-ct-hounsfield-unit-attenuation-calculator":1,"concentration-calculator":1,"concrete-mix-design-water-cement-ratio-aci-211-calculator":1,"concrete-slab-volume-bags-calculator":1,"concrete-slump-test-workability-flow-calculator":1,"cone-calculator":1,"cone-cylinder-volume-surface-calculator":1,"confidence-interval-for-the-mean-calculator":1,"confusion-matrix-precision-recall-f1-score-mcc-calculator":1,"consolidation-settlement-clay-compression-index-calculator":1,"constant-head-soil-permeability-darcy-k-calculator":1,"consumer-surplus-producer-surplus-deadweight-loss-calculator":1,"continuous-stirred-tank-reactor-cstr-conversion-calculator":1,"control-valve-flow-coefficient-cv-liquid-sizing-calculator":1,"conveyor-belt-motor-power-tension-calculator":1,"convolution-integral-discrete-linear-time-invariant-system-calculator":1,"convolutional-neural-network-cnn-output-dimension-calculator":1,"cooling-tower-approach-range-efficiency-calculator":1,"cooling-tower-merkel-enthalpy-number-of-transfer-units-calculator":1,"cooper-12-minute-run-test-calculator":1,"coordinate-geometry-calculator":1,"coplanar-waveguide-cpw-characteristic-impedance-calculator":1,"coriolis-geostrophic-wind-velocity-calculator":1,"corona-discharge-peek-law-critical-voltage-calculator":1,"corrected-calcium-hypoalbuminemia-payne-formula-calculator":1,"corrected-sodium-hyperglycemia-katz-hillier-calculator":1,"cosine-similarity-and-angular-distance-vector-calculator":1,"cosmological-redshift-hubble-lemaitre-expansion-calculator":1,"cosmological-redshift-scale-factor-universe-age-calculator":1,"coulomb-electrostatic-force-calculator":1,"coulomb-lateral-earth-pressure-retaining-wall-calculator":1,"coulomb-law-electric-field-calculator":1,"coulomb-logarithm-spitzer-plasma-resistivity-calculator":1,"coulombs-law-electrostatic-force-two-point-charges-calculator":1,"courant-friedrichs-lewy-cfl-time-step-calculator":1,"crane-boom-lift-capacity-radius-calculator":1,"creatine-loading-maintenance-dosage-calculator":1,"creatinine-clearance-cockcroft-gault-calculator":1,"creatinine-clearance-cockcroft-gault-formula-calculator":1,"creatinine-clearance-cockcroft-gault-gfr-calculator":1,"creatinine-clearance-cockcroft-gault-kidney-drug-dosing-calculator":1,"crispr-cas9-off-target-cutting-efficiency-cfd-calculator":1,"cron-expression-descriptor":1,"cross-multiplication-ratio-calculator":1,"cross-price-elasticity-of-demand-xed-calculator":1,"crosslink-density-flory-rehner-swelling-calculator":1,"crosswind-headwind-runway-component-calculator":1,"cryogenic-nitrogen-boil-off-rate-dewar-heat-leak-calculator":1,"crystal-lattice-interplanar-spacing-calculator":1,"crystallization-supersaturation-solubility-yield-calculator":1,"css-border-radius-generator":1,"css-box-shadow-generator":1,"css-clamp-fluid-typography-calculator":1,"css-glassmorphism-generator":1,"css-grid-template-generator":1,"css-linear-radial-gradient-generator":1,"css-text-shadow-generator":1,"css-transform-matrix-generator":1,"cstr-continuous-stirred-tank-reactor-conversion-calculator":1,"cstr-continuous-stirred-tank-reactor-volume-calculator":1,"culvert-hydraulic-inlet-outlet-control-headwater-calculator":1,"curb-65-pneumonia-severity-mortality-score-calculator":1,"cycling-power-aerodynamic-drag-climbing-calculator":1,"cyclone-gas-scrubber-collection-efficiency-venturi-calculator":1,"cyclone-separator-cut-diameter-collection-efficiency-calculator":1,"cyclotron-frequency-larmor-gyroradius-calculator":1,"cyclotron-frequency-radius-calculator":1,"cyclotron-synchrotron-radiation-loss-tokamak-plasma-calculator":1,"cylinder-calculator":1,"cylinder-cone-sphere-volume-surface-area-geometry-calculator":1,"cylindrical-to-cartesian-3d-coordinates-converter":1,"damkohler-number-mass-transfer-reactor-calculator":1,"darcy-law-groundwater-hydraulic-gradient-calculator":1,"darcy-law-groundwater-hydraulic-gradient-permeability-calculator":1,"darcy-radial-flow-oil-reservoir-calculator":1,"darcy-radial-flow-oil-well-production-calculator":1,"data-storage-bytes-kb-mb-gb-tb-converter":1,"data-structure-cheat-sheet":1,"days-between-dates":1,"days-until-date-countdown-calculator":1,"dbm-dbw-watts-voltage-rf-power-conversion-calculator":1,"dbm-to-milliwatts-watts-converter":1,"dbr-distributed-bragg-reflector-stopband-reflectivity-calculator":1,"dc-motor-torque-speed-back-emf-mechanical-power-calculator":1,"dca-dollar-cost-averaging-calculator":1,"de-broglie-matter-wavelength-calculator":1,"de-broglie-matter-wavelength-relativistic-calculator":1,"de-laval-rocket-nozzle-area-expansion-ratio-calculator":1,"de-laval-rocket-nozzle-isentropic-area-mach-ratio-calculator":1,"deadweight-loss-taxation-triangle-calculator":1,"debye-huckel-limiting-law-ionic-strength-activity-coefficient-calculator":1,"debye-length-plasma-frequency-screening-calculator":1,"debye-length-screening-plasma-parameter-calculator":1,"decibel-addition-sound-level-summation-calculator":1,"decision-tree-gini-impurity-information-gain-calculator":1,"denavit-hartenberg-transformation-matrix-calculator":1,"density-calculator":1,"density-mass-volume-rho-equals-m-over-v-calculator":1,"dew-point-calculator":1,"dialysis-urea-kinetic-modeling-kt-v-adequacy-calculator":1,"dielectric-loss-tangent-tan-delta-dissipation-calculator":1,"dielectrophoresis-dep-particle-trapping-force-calculator":1,"diesel-generator-fuel-consumption-calculator":1,"differential-drive-mobile-robot-unicycle-odometry-calculator":1,"differential-drive-robot-odometry-pose-calculator":1,"diffie-hellman-key-exchange-modular-exponentiation-calculator":1,"diffie-hellman-key-exchange-shared-secret-calculator":1,"diffraction-grating-lines-per-mm-calculator":1,"digital-filter-fir-iir-cutoff-coefficient-calculator":1,"dijkstra-shortest-path-graph-edge-weight-calculator":1,"dilution-law-m1v1-m2v2-calculator":1,"dipole-antenna-length-radiation-resistance-calculator":1,"dipole-moment-debye-charge-separation-calculator":1,"direct-shear-test-mohr-coulomb-cohesion-friction-angle-calculator":1,"discount-calculator":1,"discrete-cosine-transform-dct2-matrix-calculator":1,"discrete-fourier-transform-dft-sampling-spectral-leakage-calculator":1,"discrete-logarithm-baby-step-giant-step-shanks-calculator":1,"discriminant-calculator":1,"dislocation-density-taylor-hardening-flow-stress-calculator":1,"displacement-hull-speed-marine-calculator":1,"distance-formula-calculator":1,"distance-midpoint-3d-calculator":1,"distillation-mccabe-thiele-minimum-reflux-stages-fenske-calculator":1,"dna-melting-temperature-nearest-neighbor-tm-calculator":1,"dna-melting-temperature-tm-primer-nearest-neighbor-calculator":2,"dna-rna-spectrophotometry-a260-a280-purity-ratio-calculator":2,"dodecahedron-calculator":2,"dog-age-to-human-years-calculator":2,"doppler-effect-moving-source-observer-calculator":2,"doppler-effect-sound-frequency-shift-moving-source-observer-calculator":2,"doppler-redshift-calculator":2,"doppler-shift-frequency-velocity-radar-ultrasound-calculator":2,"download-time-calculator":2,"drake-equation-extraterrestrial-civilizations-seti-calculator":2,"drill-pipe-buoyancy-factor-calculator":2,"drill-thrust-force-spindle-power-calculator":2,"droplet-microfluidics-capillary-weber-number-calculator":2,"dsa-progress-tracker":2,"dubins-car-minimum-turning-radius-path-calculator":2,"duct-friction-loss-darcy-colebrook-calculator":2,"dump-truck-haul-cycle-fleet-sizing-calculator":2,"dupont-analysis-3-step-5-step-roe-calculator":2,"dupuit-forchheimer-unconfined-aquifer-seepage-calculator":2,"dynamic-amplification-factor-daf-resonance-calculator":2,"early-effect-bjt-output-resistance-calculator":2,"earthquake-elastic-response-spectrum-base-shear-calculator":2,"economic-order-quantity-eoq-holding-cost-calculator":2,"eddington-luminosity-radiation-pressure-limit-calculator":2,"effective-dose-equivalent-radiation-sievert-rem-calculator":2,"einstein-photoelectric-effect-work-function-calculator":2,"ekman-spiral-transport-depth-calculator":2,"elastic-potential-energy-calculator":2,"electric-dipole-torque-potential-energy-calculator":2,"electric-energy-capacitor-storage-calculator":2,"electric-field-electric-potential-point-charge-calculator":2,"electrical-energy-calculator":2,"electrical-power-calculator":2,"electricity-appliance-power-cost-calculator":2,"electricity-bill-calculator":2,"electricity-consumption-calculator":2,"electricity-units-converter":2,"electro-optic-pockels-cell-half-wave-voltage-calculator":2,"electrocardiogram-ecg-corrected-qt-interval-bazett-fridericia-calculator":2,"electrostatic-precipitator-deutsch-anderson-efficiency-calculator":2,"elisa-standard-curve-four-parameter-logistic-4pl-calculator":2,"ellipse-area-perimeter-calculator":2,"elliptic-curve-point-addition-scalar-multiplication-calculator":2,"emergency-fund-calculator":2,"empirical-relation-calculator":2,"energy-joules-calories-kwh-btu-converter":2,"enthalpy-moist-air-psychrometric-calculator":2,"equalizer-q-factor-bandwidth-octaves-calculator":2,"equilibrium-constant-kp-kc-calculator":2,"equivalence-ratio-fuel-air-combustion-stoichiometry-calculator":2,"equivalent-continuous-sound-level-leq-calculator":2,"equivalent-continuous-sound-level-leq-noise-calculator":2,"ergun-equation-packed-bed-pressure-drop-calculator":2,"escape-velocity-from-planet-calculator":2,"essay-word-counter":2,"euler-buckling-column-critical-load-slenderness-ratio-calculator":2,"euler-buckling-load-slenderness-ratio-column-calculator":2,"euler-critical-buckling-load-column-calculator":2,"euler-method-first-order-ode-step-size-calculator":2,"euler-totient-function-phi-n-prime-factors-calculator":2,"exam-countdown":2,"excavator-cycle-time-productivity-calculator":2,"exoplanet-radial-velocity-semi-amplitude-doppler-wobble-calculator":2,"exoplanet-transit-depth-light-curve-radius-calculator":2,"expense-splitter":2,"expense-tracker":2,"exponential-distribution-calculator":2,"exponential-distribution-reliability-calculator":2,"eye-diagram-jitter-ber-floor-high-speed-serial-calculator":2,"f-statistic-anova-variance-ratio-calculator":2,"fabry-perot-interferometer-finesse-free-spectral-range-calculator":2,"fabry-perot-interferometer-finesse-fsr-calculator":2,"factor-calculator":2,"faraday-law-electrolysis-electroplating-mass-yield-calculator":2,"faraday-law-electromagnetic-induction-calculator":2,"faraday-law-electromagnetic-induction-induced-emf-calculator":2,"fast-fourier-transform-fft-twiddle-factors-butterfly-calculator":2,"fenske-underwood-gilliland-distillation-stages-calculator":2,"fermi-dirac-distribution-occupancy-calculator":2,"fiber-optic-numerical-aperture-acceptance-angle-calculator":2,"fick-first-law-molecular-diffusion-mass-transfer-flux-calculator":2,"fick-second-law-case-hardening-diffusion-depth-calculator":2,"fick-second-law-transient-diffusion-erfc-calculator":2,"fillet-weld-throat-strength-calculator":2,"final-exam-grade-needed-target-calculator":2,"finfet-gate-delay-rc-propagation-delay-calculator":2,"finfet-tri-gate-effective-channel-width-calculator":2,"fir-filter-window-sinc-cutoff-calculator":2,"fire-financial-independence-retire-early-calculator":2,"first-order-second-order-chemical-reaction-half-life-calculator":2,"fission-delayed-neutron-inhour-reactor-period-calculator":2,"fizeau-interferometer-fringe-flatness-calculator":2,"flange-bolt-torque-preload-calculator":2,"flat-plate-solar-collector-hottel-whillier-bliss-calculator":2,"flexible-pavement-aashto-structural-number-sn-calculator":2,"flory-huggins-polymer-solution-free-energy-calculator":2,"flow-cytometry-fluorescence-compensation-matrix-calculator":2,"fluidized-bed-minimum-fluidization-velocity-calculator":2,"fluidized-bed-minimum-fluidization-velocity-ergun-calculator":2,"flyback-converter-transformer-turns-ratio-calculator":2,"flyback-transformer-primary-inductance-turns-ratio-calculator":2,"flywheel-coefficient-of-speed-fluctuation-energy-storage-calculator":2,"focal-length-calculator":2,"focal-length-field-of-view-camera-calculator":2,"food-thermal-death-time-f-value-sterilization-calculator":2,"food-to-microorganism-f-m-ratio-aeration-tank-calculator":2,"force-newtons-dynes-lbf-kgf-converter":2,"forward-kinematics-2d-robotic-arm-calculator":2,"forward-kinematics-denavit-hartenberg-dh-parameters-calculator":2,"four-factor-formula-infinite-multiplication-factor-calculator":2,"fourier-heat-conduction-cylindrical-pipe-insulation-loss-calculator":2,"fourier-law-thermal-conduction-calculator":2,"fourier-series-coefficients-square-sawtooth-triangle-wave-calculator":2,"fowler-nordheim-tunneling-current-flash-memory-calculator":2,"fraction-calculator":2,"fraction-simplifier-reducer-calculator":2,"fractional-excretion-of-sodium-fena-acute-kidney-injury-calculator":2,"francis-kaplan-turbine-specific-speed-calculator":2,"freelance-hourly-to-salary-calculator":2,"freezing-point-depression-calculator":2,"freezing-point-depression-cryoscopic-calculator":2,"french-baccalaureat-weighted-grade-point-mention-calculator":2,"fresnel-reflection-snell-calculator":2,"fresnel-zone-calculator":2,"fresnel-zone-clearance-radius-calculator":2,"friis-free-space-path-loss-link-budget-calculator":2,"friis-transmission-equation-link-budget-calculator":2,"froth-flotation-recovery-enrichment-ratio-calculator":2,"froth-flotation-recovery-rate-calculator":2,"froude-number-hydraulic-jump-energy-dissipation-calculator":2,"froude-number-ship-wave-making-resistance-calculator":2,"fuel-gas-trip-cost-calculator":2,"fugacity-coefficient-chemical-potential-residual-gibbs-calculator":2,"fusion-energy-gain-factor-q-plasma-scientific-breakeven-calculator":2,"fusion-triple-product-lawson-criterion-calculator":2,"gamma-ray-half-value-layer-hvl-shielding-calculator":2,"gamma-ray-half-value-layer-linear-attenuation-calculator":2,"gas-absorption-kremser-equation-stages-calculator":2,"gas-compressibility-z-factor-hall-yarborough-calculator":2,"gas-formation-volume-factor-bg-calculator":2,"gas-molar-volume-avogadro-law-stp-rtp-calculator":2,"gas-turbine-brayton-cycle-pressure-ratio-efficiency-calculator":2,"gasket-seating-stress-asme-code-calculator":2,"gaussian-beam-waist-rayleigh-range-divergence-calculator":2,"gaussian-plume-atmospheric-air-pollution-dispersion-calculator":2,"gay-lussac-law-gas-calculator":2,"gc-content-dna-stability-thermostability-calculator":2,"gcse-math-quadratic-sequence-nth-term-calculator":2,"gcse-physics-electrical-power-p-equals-iv-i-squared-r-calculator":2,"gel-electrophoresis-dna-fragment-migration-rf-calculator":2,"gel-electrophoresis-dna-migration-rf-molecular-weight-calculator":2,"gelatin-bloom-strength-mass-converter":2,"geometric-distribution-probability-calculator":2,"geometric-series-sum-calculator":2,"geotechnical-standard-penetration-test-spt-n-value-correction-calculator":2,"german-abitur-15-point-grade-to-gpa-converter":2,"gibbs-free-energy-atp-hydrolysis-phosphorylation-potential-calculator":2,"gibbs-free-energy-reaction-spontaneity-van-t-hoff-isochore-calculator":2,"gibbs-free-energy-spontaneity-calculator":2,"giffen-good-income-and-substitution-effects-slutsky-calculator":2,"glide-ratio-lift-to-drag-range-calculator":2,"glomerular-filtration-rate-ckd-epi-creatinine-calculator":2,"glover-dumm-agricultural-drain-spacing-calculator":2,"goldman-hodgkin-katz-ghk-membrane-potential-calculator":2,"goodman-soderberg-gerber-fatigue-endurance-limit-calculator":2,"gpm-weir-flow-v-notch-thomson-discharge-calculator":2,"gps-dilution-of-precision-gdop-pdop-calculator":2,"grade-calculator":2,"grade-point-average-gpa-scale-calculator":2,"gradient-descent-learning-rate-convergence-optimizer-calculator":2,"graham-law-effusion-calculator":2,"grain-growth-kinetics-annealing-calculator":2,"gram-schmidt-orthogonalization-orthonormal-basis-calculator":2,"graph-betweenness-closeness-degree-centrality-calculator":2,"gravel-sand-aggregate-tonnage-calculator":2,"gravitational-force-calculator":2,"gravitational-lensing-einstein-ring-angular-radius-calculator":2,"gravitational-potential-energy-kinetic-energy-conservation-calculator":2,"gravitational-time-dilation-calculator":2,"gravitational-time-dilation-general-relativity-calculator":2,"gravitational-time-dilation-redshift-calculator":2,"gravitational-wave-strain-binary-inspiral-calculator":2,"gravitational-wave-strain-chirp-mass-binary-black-hole-calculator":2,"gravitational-wave-strain-orbital-decay-chirp-mass-calculator":2,"gravity-gradient-torque-spacecraft-attitude-stabilization-calculator":2,"gravity-turn-rocket-launch-pitchover-trajectory-calculator":2,"great-circle-haversine-distance-bearing-calculator":2,"griffith-fracture-mechanics-critical-crack-stress-calculator":3,"gross-rent-multiplier-grm-calculator":3,"ground-water-drawdown-theis-well-equation-calculator":3,"groundwater-darcy-flux-hydraulic-conductivity-piezometer-calculator":3,"gsm-lte-link-budget-indoor-outdoor-coverage-calculator":3,"gst-calculator":3,"gst-reverse-calculator":3,"h-bridge-spwm-inverter-modulation-index-thd-calculator":3,"h-index-i10-index-academic-research-citation-impact-calculator":3,"hagen-poiseuille-laminar-flow-capillary-viscometer-calculator":3,"half-life-radioactive-first-order-decay-calculator":3,"hall-effect-carrier-density-mobility-coefficient-calculator":3,"hall-effect-thruster-anode-efficiency-specific-impulse-calculator":3,"hall-effect-voltage-calculator":3,"hall-petch-grain-boundary-strengthening-yield-strength-calculator":3,"hall-petch-grain-size-yield-strength-calculator":3,"hamming-7-4-error-correcting-code-syndrome-parity-calculator":3,"hardy-weinberg-allele-frequency-calculator":3,"hardy-weinberg-equilibrium-allele-frequency-calculator":3,"hardy-weinberg-equilibrium-allele-genotype-frequency-calculator":3,"harmonic-drive-strain-wave-gear-reduction-ratio-calculator":3,"harris-benedict-bmr-calculator":3,"hash-sha256-generator":3,"haversine-great-circle-distance-calculator":3,"hawking-radiation-black-hole-temperature-lifetime-calculator":3,"hazardous-waste-incinerator-destruction-removal-efficiency-dre-calculator":3,"hazen-hydraulic-conductivity-effective-grain-size-calculator":3,"heat-capacity-specific-heat-calculator":3,"heat-exchanger-effectiveness-ntu-method-calculator":3,"heat-exchanger-lmtd-log-mean-calculator":3,"heat-exchanger-lmtd-log-mean-temperature-difference-calculator":3,"heat-index-apparent-temperature-calculator":3,"heat-pump-cop-carnot-efficiency-calculator":3,"height-and-distance-calculator":3,"heisenberg-uncertainty-principle-calculator":3,"helicopter-rotor-hover-thrust-induced-power-momentum-theory-calculator":3,"helmholtz-resonator-acoustic-tuning-frequency-calculator":3,"hemisphere-calculator":3,"hemocytometer-cell-counting-density-viability-calculator":3,"hemocytometer-cell-counting-viability-trypan-blue-calculator":3,"henderson-hasselbalch-blood-ph-bicarbonate-acid-base-calculator":3,"henderson-hasselbalch-blood-ph-calculator":3,"henderson-hasselbalch-buffer-calculator":3,"henderson-hasselbalch-polyprotic-buffer-capacity-calculator":3,"henry-law-gas-solubility-calculator":3,"henrys-law-gas-solubility-aqueous-concentration-calculator":3,"herfindahl-hirschman-index-hhi-calculator":3,"hertzian-contact-stress-cylinder-sphere-calculator":3,"hex-to-rgb-hsl-converter":3,"hexagon-calculator":3,"hexagonal-prism-calculator":3,"high-k-dielectric-equivalent-oxide-thickness-eot-calculator":3,"highway-horizontal-curve-radius-superelevation-calculator":3,"highway-stopping-sight-distance-ssd-reaction-braking-calculator":3,"hill-equation-cooperativity-hemoglobin-oxygen-binding-calculator":3,"hodgkin-huxley-action-potential-membrane-current-calculator":3,"hodgkin-huxley-nerve-membrane-action-potential-calculator":3,"hohmann-transfer-orbit-delta-v-calculator":3,"hohmann-transfer-orbit-delta-v-travel-time-calculator":3,"hong-ou-mandel-hom-two-photon-interference-dip-calculator":3,"hookes-law-spring-force-elastic-potential-energy-calculator":3,"hubble-lemaitre-expansion-redshift-velocity-calculator":3,"hubble-lemaitre-law-cosmic-expansion-calculator":3,"hubble-lemaitre-law-cosmic-expansion-recession-velocity-calculator":3,"human-skeletal-muscle-hill-force-velocity-relation-calculator":3,"hume-rothery-solid-solubility-rules-evaluator":3,"hvac-sensible-latent-heat-load-calculator":3,"hydraulic-pump-flow-power-displacement-calculator":3,"hydrocyclone-cut-size-d50-calculator":3,"hydrocyclone-d50-cut-size-separation-calculator":3,"hydrodynamic-drag-force-calculator":3,"hydrodynamic-journal-bearing-sommerfeld-number-calculator":3,"hydroelectric-dam-power-generation-head-flow-rate-calculator":3,"hydroelectric-power-head-flow-calculator":3,"hydrostatic-force-submerged-gate-calculator":3,"hydrostatic-mud-weight-pressure-gradient-calculator":3,"hydrostatic-pressure-calculator":3,"hypergeometric-distribution-probability-calculator":3,"hypersonic-reentry-aerodynamic-heat-flux-fay-riddell-calculator":3,"i2c-pullup-resistor-bus-capacitance-calculator":3,"ib-biology-chi-square-goodness-of-fit-dihybrid-cross-calculator":3,"ib-chemistry-atom-economy-percentage-yield-green-chemistry-calculator":3,"ib-math-internal-assessment-ia-sample-size-confidence-interval-calculator":3,"ib-physics-uncertainty-propagation-percentage-error-calculator":3,"ideal-body-weight-devine-calculator":3,"ideal-gas-law-calculator":3,"ieee-754-floating-point-converter":3,"iir-butterworth-filter-order-calculator":3,"impedance-matching-l-network-pi-network-rf-calculator":3,"income-elasticity-of-demand-yed-calculator":3,"inductance-solenoid-coil-calculator":3,"industrial-robot-payload-inertia-margin-calculator":3,"inertial-measurement-unit-imu-complementary-filter-angle-calculator":3,"inertial-navigation-dead-reckoning-drift-error-calculator":3,"infinite-slope-stability-factor-of-safety-calculator":3,"inflation-adjusted-future-value-calculator":3,"inflation-purchasing-power-calculator":3,"initial-compass-bearing-forward-azimuth-calculator":3,"injection-molding-clamping-force-tonnage-calculator":3,"inr-to-cny-converter":3,"instant-room-chat":3,"integrate-and-fire-neuron-firing-rate-f-i-curve-calculator":3,"internal-combustion-engine-bmep-indicated-power-calculator":3,"interplanetary-link-budget-deep-space-network-calculator":3,"interstellar-reddening-color-excess-extinction-calculator":3,"intraocular-pressure-goldmann-applanation-tonometry-calculator":3,"intrinsic-carrier-concentration-temperature-calculator":3,"intrinsic-semiconductor-carrier-concentration-fermi-level-calculator":3,"inventory-turnover-ratio-calculator":3,"inverse-kinematics-2d-robotic-arm-calculator":3,"inverse-kinematics-two-link-planar-robot-arm-calculator":3,"inverter-output-thd-total-harmonic-distortion-calculator":3,"ion-exchange-water-softening-resin-capacity-calculator":3,"ion-implantation-projected-range-straggle-calculator":3,"ion-thruster-exhaust-velocity-thrust-power-calculator":3,"ipv6-compression-expansion-tool":3,"is-lm-model-equilibrium-interest-rate-national-income-calculator":3,"isoelectric-point-pi-amino-acids-calculator":3,"j2-nodal-precession-sun-synchronous-orbit-calculator":3,"j2-orbital-perturbation-nodal-precession-sun-synchronous-calculator":3,"jaw-crusher-reduction-ratio-throughput-calculator":3,"jeans-instability-mass-gravitational-collapse-star-formation-calculator":3,"jee-main-percentile-to-rank-predictor-calculator":3,"johnson-mehl-avrami-kolmogorov-jmak-phase-transformation-calculator":3,"josephson-junction-critical-current-flux-quantum-calculator":3,"joule-thomson-cooling-coefficient-liquefaction-calculator":3,"jump-height-ground-reaction-force-calculator":3,"jwt-debugger":3,"k-means-clustering-inertia-elbow-silhouette-calculator":3,"k-nearest-neighbors-knn-distance-classifier-calculator":3,"kalman-filter-1d-state-estimate-measurement-update-calculator":3,"kepler-third-law-binary-star-system-mass-calculator":3,"kepler-third-law-orbital-period-calculator":3,"kepler-third-law-orbital-period-semi-major-axis-calculator":3,"kerr-black-hole-ergosphere-frame-dragging-calculator":3,"kerr-effect-nonlinear-optical-phase-shift-calculator":3,"kinetic-energy-calculator":3,"kinetic-friction-calculator":3,"kozeny-carman-hydraulic-conductivity-granular-soil-calculator":3,"lagrange-interpolating-polynomial-curve-fitting-calculator":3,"landfill-gas-generation-first-order-decay-calculator":3,"langmuir-freundlich-adsorption-isotherm-surface-coverage-calculator":3,"laplace-transform-table-s-domain-transfer-function-calculator":3,"larmor-gyroradius-cyclotron-frequency-calculator":3,"larson-miller-parameter-creep-rupture-lifetime-calculator":3,"larson-miller-parameter-high-temp-creep-rupture-calculator":3,"laser-beam-waist-divergence-rayleigh-range-calculator":3,"laser-diode-threshold-current-density-optical-gain-calculator":3,"laser-diode-threshold-current-gain-calculator":3,"latent-heat-fusion-vaporization-q-equals-ml-calculator":3,"latent-heat-phase-change-material-pcm-storage-calculator":3,"lathe-turning-surface-speed-sfm-rpm-calculator":3,"law-school-lsac-adjusted-gpa-percentile-calculator":3,"lawson-criterion-fusion-triple-product-calculator":3,"lawson-criterion-triple-product-fusion-plasma-calculator":3,"lcm-hcf-calculator":3,"le-chatelier-equilibrium-constant-van-t-hoff-isochore-calculator":3,"lead-lag-compensator-frequency-response-phase-boost-calculator":3,"lead-screw-ball-screw-torque-efficiency-linear-thrust-calculator":3,"lead-screw-pitch-linear-travel-calculator":3,"lean-body-mass-boer-calculator":3,"least-common-multiple-lcm-calculator":3,"led-lumens-to-watts-equivalent-calculator":3,"led-resistor-calculator":3,"leiden-louvain-graph-community-modularity-q-calculator":3,"length-inches-cm-feet-meters-yards-converter":3,"lens-formula-calculator":3,"lens-maker-focal-length-power-diopters-p-equals-1-over-f-calculator":3,"lens-vergence-spectacle-magnification-refraction-calculator":3,"lever-rule-binary-phase-diagram-fraction-calculator":3,"lever-rule-binary-phase-diagram-mass-fraction-calculator":3,"lifted-condensation-level-lcl-height-calculator":3,"lightning-impulse-1.2-50-wave-generator-calculator":3,"line-equation-calculator":3,"line-slope-angle-of-inclination-calculator":3,"linear-equations-solver":3,"linear-quadratic-regulator-lqr-riccati-gain-matrix-calculator":3,"lineweaver-burk-double-reciprocal-calculator":3,"lineweaver-burk-enzyme-inhibition-km-vmax-calculator":3,"link-margin-friis-free-space-path-loss-eb-n0-calculator":3,"linked-list-visualizer":3,"liposome-encapsulation-efficiency-drug-loading-calculator":3,"lm317-adjustable-voltage-regulator-calculator":3,"loan-amortization-schedule-calculator":3,"logarithmic-decrement-structural-damping-ratio-calculator":3,"logistic-map-bifurcation-feigenbaum-constant-calculator":3,"logistic-regression-sigmoid-cross-entropy-loss-calculator":3,"london-penetration-depth-coherence-length-calculator":4,"lorem-ipsum-generator":4,"lorentz-length-contraction-relativity-calculator":4,"lorentz-magnetic-force-charged-particle-cyclotron-radius-calculator":4,"lorenz-attractor-dimension-kaplan-yorke-calculator":4,"lorenz-curve-gini-coefficient-income-inequality-calculator":4,"loudness-phon-sone-stevens-power-law-calculator":4,"lu-matrix-decomposition-doolittle-crout-solver-calculator":4,"lumped-capacitance-transient-thermal-calculator":4,"lux-to-foot-candles-inverse-square-photometry-calculator":4,"lux-to-foot-candles-lumens-converter":4,"lyapunov-exponent-chaos-divergence-calculator":4,"mac-address-formatter-lookup":4,"macaulay-duration-modified-duration-bond-convexity-calculator":4,"mach-cone-angle-prandtl-meyer-expansion-calculator":4,"mach-number-speed-of-sound-calculator":4,"mach-zehnder-interferometer-phase-shift-calculator":4,"mach-zehnder-interferometer-phase-shift-extinction-ratio-calculator":4,"macro-nutrient-split-calculator":4,"magma-viscosity-silica-content-temperature-calculator":4,"magnetic-declination-true-north-compass-calculator":4,"magnetic-dipole-torque-potential-energy-calculator":4,"magnetic-energy-inductor-storage-calculator":4,"magnetic-force-current-carrying-conductor-wire-calculator":4,"magnetic-rigidity-beam-bending-calculator":4,"magnification-calculator":4,"maintenance-iv-fluid-holliday-segar-4-2-1-rule-calculator":4,"malus-law-polarizer-intensity-calculator":4,"mandelbrot-fractal-box-counting-hausdorff-dimension-calculator":4,"manning-open-channel-flow-trapezoidal-hydraulic-radius-calculator":4,"margin-markup-calculator":4,"marine-hydrofoil-froude-number-cavitation-number-calculator":4,"marine-propeller-advance-coefficient-thrust-calculator":4,"marine-propeller-pitch-slip-boat-speed-calculator":4,"mark-houwink-equation-polymer-molar-mass-calculator":4,"markov-chain-steady-state-stationary-distribution-calculator":4,"markov-chain-steady-state-transition-probability-calculator":4,"markov-decision-process-bellman-optimality-value-iteration-calculator":4,"marks-needed-calculator":4,"marks-to-percentage-calculator":4,"mass-defect-nuclear-binding-energy-per-nucleon-calculator":4,"mass-energy-equivalence-calculator":4,"mass-percent-concentration-calculator":4,"mass-spring-simple-harmonic-motion-period-frequency-calculator":4,"matrix-determinant-calculator":4,"matrix-eigenvalue-2x2-calculator":4,"matrix-eigenvalues-eigenvectors-characteristic-polynomial-calculator":4,"max-heart-rate-tanaka-calculator":4,"mba-weighted-average-cost-of-capital-wacc-capm-calculator":4,"mccabe-thiele-fractional-distillation-stages-calculator":4,"mccabe-thiele-reflux-ratio-feed-q-line-calculator":4,"mean-arterial-pressure-map-cardiac-calculator":4,"mean-arterial-pressure-map-cardiovascular-perfusion-calculator":4,"mean-arterial-pressure-map-pulse-pressure-calculator":4,"mean-cell-residence-time-sludge-age-mcrt-calculator":4,"meat-brine-salinity-equilibrium-percentage-calculator":4,"medical-nursing-dosage-iv-flow-drop-rate-gtt-min-calculator":4,"medical-ultrasound-acoustic-impedance-reflection-coefficient-calculator":4,"meld-na-score-end-stage-liver-disease-allocation-calculator":4,"melt-flow-index-mfi-viscosity-calculator":4,"membrane-osmotic-pressure-van-t-hoff-reverse-osmosis-calculator":4,"mesh-knudsen-number-continuum-navier-stokes-calculator":4,"metal-removal-rate-mrr-milling-turning-calculator":4,"michaelis-menten-enzyme-inhibition-competitive-noncompetitive-calculator":4,"michaelis-menten-enzyme-kinetics-calculator":4,"michaelis-menten-enzyme-kinetics-km-vmax-calculator":4,"michaelis-menten-enzyme-kinetics-lineweaver-burk-calculator":4,"michelson-interferometer-fringe-shift-refractive-index-calculator":4,"microbiology-serial-dilution-colony-forming-units-cfu-calculator":4,"microfluidic-rectangular-channel-hydraulic-resistance-calculator":4,"microstrip-interdigital-bandpass-filter-order-calculator":4,"microstrip-line-characteristic-impedance-pcb-rf-calculator":4,"midpoint-calculator":4,"miller-indices-cubic-crystal-interplanar-spacing-calculator":4,"miller-indices-cubic-crystal-lattice-interplanar-d-spacing-calculator":4,"miller-rabin-primality-test-probabilistic-composite-calculator":4,"mimo-spatial-multiplexing-capacity-channel-matrix-calculator":4,"minimum-spanning-tree-kruskal-prim-total-weight-calculator":4,"mirror-formula-calculator":4,"modular-arithmetic-multiplicative-inverse-extended-euclidean-calculator":4,"modulo-inverse-calculator":4,"moho-crustal-depth-airy-isostasy-calculator":4,"mohr-circle-2d-principal-stresses-maximum-shear-stress-calculator":4,"mohr-circle-principal-stresses-maximum-shear-calculator":4,"mohr-coulomb-shear-strength-envelope-calculator":4,"mohr-coulomb-shear-strength-soil-cohesion-friction-calculator":4,"molality-calculator":4,"molar-mass-calculator":4,"molarity-calculator":4,"molarity-to-molality-density-converter":4,"mole-calculator":4,"moles-mass-molar-mass-n-equals-m-over-mr-calculator":4,"monetary-policy-taylor-rule-federal-funds-rate-calculator":4,"monin-obukhov-length-atmospheric-surface-layer-calculator":4,"monod-microbial-growth-kinetics-chemostat-calculator":4,"mooney-rivlin-rubber-hyperelasticity-calculator":4,"morison-equation-wave-force-offshore-pile-calculator":4,"mortgage-biweekly-payoff-calculator":4,"mosfet-drain-current-saturation-calculator":4,"mosfet-drain-current-saturation-linear-triode-calculator":4,"mosfet-gate-oxide-capacitance-calculator":4,"mosfet-igbt-switching-loss-conduction-calculator":4,"mosfet-subthreshold-swing-leakage-current-calculator":4,"mosfet-threshold-voltage-body-effect-calculator":4,"mri-larmor-precession-frequency-gyromagnetic-ratio-calculator":4,"mri-spin-lattice-t1-t2-relaxation-signal-calculator":4,"mri-t1-t2-relaxation-bloch-equations-signal-intensity-calculator":4,"muscle-force-lever-arm-torque-calculator":4,"naive-bayes-classifier-laplace-smoothing-posterior-calculator":4,"nautical-miles-knots-statute-converter":4,"navier-stokes-couette-flow-shear-stress-velocity-profile-calculator":4,"ne555-timer-astable-oscillator-calculator":4,"neet-ug-marks-to-percentile-rank-predictor-calculator":4,"nernst-equation-electrochemical-cell-potential-emf-calculator":4,"net-worth-tracker-calculator":4,"neutron-diffusion-length-fermi-age-thermalization-calculator":4,"neutron-moderation-lethargy-decrement-calculator":4,"neutron-moderation-logarithmic-energy-decrement-xi-calculator":4,"newton-law-cooling-convection-calculator":4,"newton-raphson-method-root-finding-convergence-calculator":4,"noise-reduction-coefficient-nrc-calculator":4,"noise-reduction-coefficient-nrc-porous-absorber-calculator":4,"notice-word-counter":4,"npsh-net-positive-suction-head-cavitation-calculator":4,"nuclear-binding-energy-per-nucleon-calculator":4,"nuclear-cross-section-mean-free-path-attenuation-calculator":4,"nuclear-reaction-q-value-energy-calculator":4,"nuclear-reactor-four-factor-formula-neutron-multiplication-calculator":4,"nuclear-reactor-thermal-power-uranium-235-fission-rate-calculator":4,"nuclear-thermal-propulsion-ntp-specific-impulse-calculator":4,"number-base-any-to-any-radix-converter":4,"number-to-words-converter":4,"nusselt-number-convective-heat-transfer-coefficient-calculator":4,"nyquist-sampling-theorem-aliasing-minimum-sample-rate-calculator":4,"nyquist-shannon-sampling-aliasing-frequency-calculator":4,"nyquist-stability-criterion-encirclements-calculator":4,"nyquist-stability-criterion-open-loop-encirclements-calculator":4,"o-ring-groove-squeeze-compression-calculator":4,"oblique-shock-wave-theta-beta-mach-calculator":4,"oblique-shock-wave-theta-beta-mach-relation-calculator":4,"ocean-wave-celerity-wavelength-airy-calculator":4,"octahedron-calculator":4,"ofdm-subcarrier-spacing-symbol-duration-cyclic-prefix-calculator":4,"ohms-law-calculator":4,"ohms-law-resistors-in-series-and-parallel-calculator":4,"ohms-law-triangle-helper":4,"oil-gas-ratio-gor-bubble-point-pressure-calculator":4,"one-rep-max-1rm-calculator":4,"ontario-ossd-top-6-grade-12-university-average-calculator":4,"op-amp-inverting-non-inverting-gain-bandwidth-calculator":4,"op-amp-inverting-noninverting-gain-calculator":4,"open-channel-hydraulic-jump-sequent-depth-energy-loss-calculator":4,"optical-attenuation-decibels-per-kilometer-fiber-loss-calculator":4,"optical-fiber-attenuation-power-budget-link-calculator":4,"optical-fiber-numerical-aperture-acceptance-angle-v-number-calculator":4,"orbital-decay-atmospheric-drag-lifetime-calculator":4,"orbital-hohmann-transfer-delta-v-calculator":4,"orbital-period-altitude-geostationary-orbit-calculator":4,"orbital-velocity-circular-satellite-calculator":4,"orbital-velocity-vis-viva-equation-eccentricity-calculator":4,"organic-chemistry-degree-of-unsaturation-ihd-calculator":4,"organic-chemistry-nmr-chemical-shift-splitting-n-plus-1-calculator":4,"osha-daily-noise-dose-twa-calculator":4,"osmotic-fragility-erythrocyte-hemolysis-curve-calculator":4,"osmotic-pressure-calculator":4,"osmotic-pressure-van-t-hoff-calculator":4,"overall-equipment-effectiveness-oee-availability-quality-calculator":4,"oxygen-delivery-do2-arterial-content-cao2-calculator":4,"packet-queueing-erlang-b-c-call-blocking-probability-calculator":4,"pagerank-algorithm-damping-factor-transition-matrix-calculator":4,"parabolic-satellite-dish-antenna-gain-beamwidth-calculator":4,"parabolic-trajectory-range-calculator":4,"parabolic-trough-solar-thermal-concentration-ratio-calculator":4,"parallel-plate-capacitor-capacitance-stored-energy-calculator":4,"parallel-plate-dielectric-capacitance-calculator":4,"parallelogram-area-calculator":4,"paris-law-fatigue-crack-growth-rate-calculator":4,"parkland-formula-burn-resuscitation-fluid-calculator":4,"parts-of-speech-checker":4,"paschen-law-electrical-spark-breakdown-voltage-calculator":4,"password-entropy-crack-time-brute-force-calculator":4,"password-generator":4,"password-strength-checker":4,"patched-conics-hyperbolic-excess-velocity-v-inf-calculator":4,"pauli-spin-matrices-expectation-value-calculator":4,"pcr-amplification-efficiency-cycle-number-calculator":4,"pcr-primer-melting-temperature-tm-wallace-nearest-neighbor-calculator":4,"pdf-merger":5,"pdf-remove-first-five-pages":5,"pe-ratio-valuation-calculator":5,"peclet-number-microfluidic-molecular-mixing-calculator":5,"pediatric-clark-rule-young-rule-drug-dosage-calculator":5,"pediatric-drug-dosage-clark-young-rule-calculator":5,"pelton-wheel-turbine-hydraulic-power-calculator":5,"pendulum-period-calculator":5,"peng-robinson-equation-of-state-fugacity-calculator":5,"percentage-change-calculator":5,"percentage-composition-by-mass-chemical-formula-calculator":5,"percentage-increase-decrease-calculator":5,"percolation-threshold-bethe-lattice-cluster-size-calculator":5,"permutation-combination-calculator":5,"perspective-projection-fov-frustum-calculator":5,"pet-scan-positron-range-non-collinearity-resolution-calculator":5,"pet-scan-standardized-uptake-value-suv-tumor-metabolism-calculator":5,"petroff-bearing-friction-power-loss-calculator":5,"pfr-plug-flow-reactor-space-time-calculator":5,"pfr-plug-flow-reactor-volume-calculator":5,"ph-calculator":5,"ph-poh-hydrogen-ion-calculator":5,"ph-poh-hydrogen-ion-concentration-converter":5,"pharmacokinetics-half-life-clearance-volume-of-distribution-calculator":5,"pharmacokinetics-one-compartment-elimination-half-life-auc-calculator":5,"photodetector-responsivity-quantum-efficiency-nep-calculator":5,"photodiode-responsivity-quantum-efficiency-calculator":5,"photon-energy-planck-calculator":5,"photon-momentum-radiation-pressure-calculator":5,"pid-controller-gain-tuning-calculator":5,"pid-controller-gain-ziegler-nichols-tuning-calculator":5,"pid-controller-tuning-ziegler-nichols-step-response-calculator":5,"pid-controller-ziegler-nichols-tuning-calculator":5,"pile-foundation-bearing-capacity-meyershof-calculator":5,"pilling-bedworth-ratio-metal-oxide-passivation-calculator":5,"pipe-burst-pressure-barlow-formula-calculator":5,"pipe-collapse-pressure-external-load-calculator":5,"pipe-water-hammer-joukowsky-surge-pressure-calculator":5,"pitot-tube-airspeed-dynamic-pressure-calculator":5,"planck-blackbody-spectral-radiance-wavelength-calculator":5,"planck-units-fundamental-quantum-gravity-scales-calculator":5,"planetary-epicyclic-gear-train-sun-ring-carrier-speed-calculator":5,"planetary-equilibrium-temperature-albedo-habitable-zone-calculator":5,"planetary-gear-ratio-sun-ring-carrier-calculator":5,"planetary-gear-train-gear-ratio-epicyclic-sun-ring-calculator":5,"planetary-weight-calculator":5,"planing-hull-savitsky-lift-drag-speed-calculator":5,"plasma-anion-gap-serum-osmolality-osmolar-gap-calculator":5,"plasma-beta-magnetic-confinement-efficiency-calculator":5,"plasma-beta-troyon-limit-tokamak-stability-calculator":5,"plasma-debye-length-plasma-frequency-calculator":5,"plasma-frequency-cutoff-density-calculator":5,"plasma-magnetic-beta-confinement-calculator":5,"plc-scan-time-execution-cycle-calculator":5,"plug-flow-reactor-pfr-volume-space-time-calculator":5,"pn-junction-built-in-potential-depletion-width-calculator":5,"pn-junction-builtin-potential-depletion-width-calculator":5,"pneumatic-cylinder-thrust-force-air-consumption-calculator":5,"pneumatic-hydraulic-cylinder-thrust-force-speed-calculator":5,"pockels-effect-electro-optic-half-wave-voltage-calculator":5,"point-source-gamma-radiation-exposure-rate-constant-calculator":5,"poiseuille-laminar-pipe-flow-calculator":5,"poiseuille-law-laminar-viscous-fluid-flow-resistance-calculator":5,"poiseuille-vascular-resistance-blood-flow-viscosity-calculator":5,"poisson-distribution-probability-calculator":5,"poisson-process-inter-arrival-time-queueing-calculator":5,"polarization-malus-law-double-filter-calculator":5,"polarization-malus-law-light-intensity-transmission-calculator":5,"polymer-glass-transition-fox-equation-calculator":5,"polymer-melt-flow-index-mfi-shear-rate-calculator":5,"polynomial-calculator":5,"porkchop-plot-hyperbolic-excess-velocity-c3-interplanetary-calculator":5,"potential-energy-calculator":5,"potential-temperature-poisson-isentropic-calculator":5,"power-factor-apparent-real-reactive-power-triangle-calculator":5,"power-of-lens-calculator":5,"power-watts-horsepower-kw-converter":5,"poynting-vector-em-wave-intensity-calculator":5,"prandtl-glauert-compressibility-correction-calculator":5,"prandtl-meyer-expansion-fan-angle-mach-number-calculator":5,"prandtl-schmidt-lewis-dimensionless-numbers-calculator":5,"pressure-bar-psi-kpa-atm-converter":5,"pressure-calculator":5,"price-elasticity-of-demand-ped-calculator":5,"price-elasticity-of-demand-ped-midpoint-formula-calculator":5,"prime-factor-tree-calculator":5,"prime-factorization-calculator":5,"principal-component-analysis-pca-explained-variance-ratio-calculator":5,"probability-calculator":5,"profit-loss-calculator":5,"projectile-maximum-height-calculator":5,"projectile-motion-calculator":5,"projectile-motion-drag-trajectory-calculator":5,"propellant-tank-ullage-volume-pressurization-blowdown-calculator":5,"propeller-thrust-advance-ratio-efficiency-calculator":5,"property-tax-millage-rate-calculator":5,"prosthetic-joint-contact-stress-hertzian-contact-calculator":5,"psychrometric-chart-relative-humidity-dew-point-enthalpy-calculator":5,"psychrometric-enthalpy-sensible-latent-heat-calculator":5,"pulse-width-duty-cycle-frequency-period-digital-signal-calculator":5,"pump-affinity-laws-speed-diameter-calculator":5,"pure-pursuit-path-tracking-steering-angle-calculator":5,"pv-string-sizing-voltage-window-calculator":5,"pv-system-tilt-azimuth-solar-irradiance-calculator":5,"pwm-duty-cycle-average-voltage-calculator":5,"pythagoras-calculator":5,"pythagorean-theorem-hypotenuse-leg-triangle-calculator":5,"qam-bit-error-rate-snr-modulation-order-calculator":5,"qtc-interval-bazett-fridericia-framingham-ecg-calculator":5,"quadratic-equation-solver":5,"quantum-bell-state-fidelity-concurrence-entanglement-calculator":5,"quantum-bit-error-rate-qber-bb84-qkd-security-calculator":5,"quantum-decoherence-t1-t2-relaxation-calculator":5,"quantum-dot-exciton-bohr-radius-bandgap-brus-equation-calculator":5,"quantum-error-correction-surface-code-threshold-calculator":5,"quantum-tunneling-transmission-coefficient-wkb-calculator":5,"quantum-well-energy-eigenvalues-infinite-potential-box-calculator":5,"quarter-wave-antenna-length-calculator":5,"quarter-wave-transformer-impedance-matching-calculator":5,"quarter-wavelength-acoustic-duct-silencer-calculator":5,"quaternion-multiplication-3d-rotation-axis-angle-calculator":5,"quaternion-to-euler-angles-3d-rotation-calculator":5,"quaternion-to-euler-angles-rotation-matrix-calculator":5,"queue-visualizer":5,"r-value-u-factor-thermal-insulation-converter":5,"rabi-oscillation-frequency-two-level-quantum-system-calculator":5,"radar-range-equation-snr-detection-range-calculator":5,"radiation-gamma-shielding-half-value-layer-calculator":5,"radio-wave-propagation-itu-r-path-loss-model-calculator":5,"radioactive-decay-activity-becquerel-half-life-calculator":5,"radioactive-decay-bateman-equations-daughter-isotope-calculator":5,"radioactive-decay-chain-bateman-equations-calculator":5,"radiocarbon-c14-dating-calculator":5,"radiocarbon-c14-dating-half-life-decay-calculator":5,"radiotherapy-linear-quadratic-biologically-effective-dose-calculator":5,"radon-progeny-working-level-working-level-month-calculator":5,"ramberg-osgood-nonlinear-stress-strain-plasticity-calculator":5,"random-forest-out-of-bag-oob-error-rate-calculator":5,"rankine-active-passive-earth-pressure-calculator":5,"rankine-active-passive-earth-pressure-coefficient-calculator":5,"rankine-steam-power-plant-thermal-efficiency-heat-rate-calculator":5,"raoult-dalton-law-vapor-liquid-equilibrium-vle-calculator":5,"raoult-law-vapor-pressure-calculator":5,"raoults-law-ideal-solution-vapor-pressure-binary-mixture-calculator":5,"rapid-sand-filter-backwash-expansion-bed-porosity-calculator":5,"rational-method-peak-stormwater-runoff-discharge-calculator":5,"rational-method-peak-stormwater-runoff-q-cia-calculator":5,"rayleigh-criterion-angular-resolution-calculator":5,"rayleigh-optical-depth-clear-sky-scattering-calculator":5,"rayleigh-optical-lithography-resolution-calculator":5,"rc-circuit-charging-discharging-time-constant-calculator":5,"rc-high-pass-filter-cutoff-calculator":5,"rc-low-pass-filter-cutoff-calculator":5,"rc-servo-motor-pwm-pulse-width-duty-cycle-angle-calculator":5,"reactive-ion-etching-rie-aspect-ratio-selectivity-calculator":5,"reactor-decay-heat-ans-5-1-standard-wigner-way-calculator":5,"reactor-neutron-multiplication-four-factor-calculator":5,"reactor-period-inhour-equation-delayed-neutrons-calculator":5,"reading-time-calculator":5,"rebar-weight-reinforcement-steel-calculator":5,"recombinant-protein-expression-molecular-weight-calculator":5,"rectangular-waveguide-cutoff-frequency-mode-calculator":5,"recurrent-neural-network-rnn-lstm-gru-parameter-count-calculator":5,"recursion-visualizer":5,"refractive-index-critical-angle-total-internal-reflection-calculator":5,"refrigerant-pressure-temperature-pt-chart-calculator":5,"refrigeration-carnot-cop-efficiency-calculator":5,"regular-tetrahedron-calculator":5,"reid-vapor-pressure-rvp-crude-oil-blending-calculator":5,"reinforced-concrete-beam-ultimate-moment-capacity-aci-318-calculator":5,"relative-vorticity-rossby-wave-speed-calculator":5,"relativistic-beaming-doppler-boosting-blazar-jet-calculator":5,"relativistic-kinetic-energy-calculator":5,"relativistic-rocket-tsiolkovsky-proper-time-calculator":5,"rental-property-cap-rate-calculator":5,"reservoir-drive-mechanism-recovery-factor-calculator":5,"restaurant-food-cost-percentage-calculator":5,"restriction-enzyme-dna-fragment-ligation-molar-ratio-calculator":5,"retaining-wall-active-earth-pressure-rankine-calculator":5,"retaining-wall-overturning-sliding-factor-of-safety-calculator":5,"retaining-wall-rankine-active-passive-earth-pressure-calculator":5,"return-on-investment-roi-calculator":5,"reverberation-time-rt60-sabine-calculator":5,"reverberation-time-sabine-eyring-calculator":5,"reverse-osmosis-membrane-salt-rejection-flux-calculator":5,"revision-planner":5,"reynolds-number-calculator":5,"reynolds-number-pipe-flow-friction-factor-calculator":6,"reynolds-number-pipe-flow-friction-factor-moody-chart-calculator":6,"rf-amplifier-noise-figure-cascaded-friis-noise-calculator":6,"rf-cavity-shunt-impedance-q-factor-calculator":6,"rhombus-area-diagonals-calculator":6,"rhumb-line-loxodrome-distance-bearing-calculator":6,"richardson-number-atmospheric-turbulence-stability-calculator":6,"richardson-number-ocean-stratification-calculator":6,"richter-magnitude-earthquake-seismic-energy-release-calculator":6,"ricker-wavelet-seismic-peak-frequency-resolution-calculator":6,"rl-circuit-current-growth-decay-time-constant-calculator":6,"rlc-resonant-frequency-q-factor-calculator":6,"rlc-resonant-frequency-quality-factor-bandwidth-calculator":6,"robot-inverse-kinematics-2r-planar-arm-calculator":6,"robot-jacobian-differential-motion-end-effector-velocity-calculator":6,"robot-manipulator-jacobian-torque-calculator":6,"roc-curve-auc-trapezoidal-classification-evaluator":6,"roche-limit-tidal-disruption-calculator":6,"roche-tidal-disruption-limit-satellite-destruction-calculator":6,"rock-quality-designation-rqd-geomechanics-calculator":6,"rocket-combustion-c-star-characteristic-velocity-calculator":6,"rocket-nozzle-isentropic-expansion-area-ratio-calculator":6,"rocket-staging-payload-fraction-optimal-delta-v-split-calculator":6,"rocket-thrust-coefficient-effective-exhaust-velocity-calculator":6,"rocket-thrust-specific-impulse-calculator":6,"rockwell-hardness-scale-converter":6,"roman-numeral-converter":6,"roof-pitch-slope-angle-multiplier-calculator":6,"room-modes-standing-waves-axial-tangential-calculator":6,"root-locus-open-loop-poles-zeros-stability-calculator":6,"rot13-caesar-cipher-tool":6,"rotational-kinetic-energy-calculator":6,"rotational-kinetic-energy-moment-of-inertia-angular-momentum-calculator":6,"rsa-cryptography-public-private-key-pair-encryption-calculator":6,"rsa-modular-exponentiation-key-generation-calculator":6,"rsa-public-private-key-math-calculator":6,"rule-of-72-doubling-calculator":6,"runge-kutta-4th-order-ode-step-error-calculator":6,"runge-kutta-fourth-order-rk4-ode-solver-calculator":6,"running-pace-split-calculator":6,"running-pace-to-speed-mph-kmh-converter":6,"sabine-formula-room-reverberation-time-rt60-calculator":6,"salary-increment-percentage-calculator":6,"salary-take-home-pay-calculator":6,"sample-size-confidence-interval-calculator":6,"sat-to-act-score-concordance-percentile-converter":6,"satellite-ground-track-swath-width-calculator":6,"schmid-law-critical-resolved-shear-stress-calculator":6,"schmid-law-resolved-shear-stress-slip-system-calculator":6,"schottky-barrier-diode-ideality-factor-richardson-emission-calculator":6,"schrodinger-infinite-potential-well-calculator":6,"schrodinger-infinite-potential-well-energy-levels-calculator":6,"schwarzschild-radius-black-hole-calculator":6,"schwarzschild-radius-black-hole-event-horizon-calculator":6,"scientific-notation-calculator":6,"scientific-notation-standard-form-engineering-exponent-converter":6,"screen-dpi-ppi-calculator":6,"scs-curve-number-runoff-precipitation-depth-calculator":6,"searching-visualizer":6,"secant-method-numerical-root-finding-calculator":6,"second-order-ode-damping-ratio-natural-frequency-calculator":6,"second-order-reaction-rate-half-life-calculator":6,"section-formula-calculator":6,"sedimentation-clarifier-surface-overflow-rate-weir-loading-calculator":6,"seismic-reflection-two-way-travel-time-twt-depth-calculator":6,"seismic-refraction-two-layer-crustal-depth-calculator":6,"seismic-wave-travel-time-epicenter-distance-calculator":6,"selection-coefficient-evolutionary-fitness-decay-calculator":6,"semi-empirical-mass-formula-weizsacker-liquid-drop-calculator":6,"semiconductor-diffusion-length-lifetime-calculator":6,"sensible-heat-thermal-energy-storage-mass-calculator":6,"serial-dilution-colony-cfu-calculator":6,"serial-dilution-colony-forming-units-cfu-calculator":6,"serum-osmolality-osmolar-gap-calculator":6,"sha256-merkle-tree-root-hash-proof-calculator":6,"shamir-secret-sharing-polynomial-threshold-calculator":6,"shannon-diversity-index-equitability-ecology-calculator":6,"shannon-entropy-information-theory-bit-uncertainty-calculator":6,"shannon-hartley-channel-capacity-bandwidth-calculator":6,"shannon-hartley-channel-capacity-snr-bandwidth-calculator":6,"shannon-hartley-channel-capacity-spectral-efficiency-calculator":6,"sharpe-ratio-portfolio-risk-calculator":6,"sharpe-sortino-treynor-portfolio-risk-ratios-calculator":6,"sherwood-number-mass-transfer-coefficient-calculator":6,"shewhart-statistical-process-control-xbar-r-chart-calculator":6,"ship-hull-block-coefficient-displacement-admiralty-calculator":6,"ship-metacentric-height-gm-intact-stability-calculator":6,"ship-squat-effect-shallow-water-underkeel-clearance-calculator":6,"shock-capturing-rankine-hugoniot-density-jump-calculator":6,"shubnikov-de-haas-quantum-hall-effect-calculator":6,"si-vs-ci-calculator":6,"sieve-of-eratosthenes-prime-counting-pi-n-calculator":6,"significant-figures-calculator":6,"significant-wave-height-energy-spectrum-calculator":6,"simple-interest-calculator":6,"simple-pendulum-period-small-angle-calculator":6,"simplex-linear-programming-slack-pivot-calculator":6,"simply-supported-beam-center-deflection-calculator":6,"simpsons-one-third-rule-numerical-integration-calculator":6,"single-degree-of-freedom-sdof-natural-frequency-damping-calculator":6,"single-slit-diffraction-central-maximum-width-calculator":6,"single-slit-diffraction-pattern-calculator":6,"sip-mutual-fund-calculator":6,"six-sigma-process-capability-cpk-dpmo-calculator":6,"skin-depth-ac-conductor-calculator":6,"skin-depth-ac-conductor-resistance-calculator":6,"sleep-cycle-calculator":6,"slope-calculator":6,"slurry-specific-gravity-solids-calculator":6,"smith-chart-reflection-coefficient-vswr-calculator":6,"smith-waterman-local-sequence-alignment-score-calculator":6,"snells-law-light-refraction-critical-angle-tir-calculator":6,"snells-law-refraction-calculator":6,"snr-eb-n0-sensitivity-receiver-noise-floor-calculator":6,"softmax-activation-function-cross-entropy-loss-calculator":6,"soil-compaction-proctor-optimum-moisture-maximum-dry-density-calculator":6,"soil-moisture-content-degree-of-saturation-calculator":6,"soil-one-dimensional-consolidation-settlement-calculator":6,"soil-porosity-void-ratio-bulk-density-phase-relations-calculator":6,"soil-slope-stability-bishop-simplified-method-calculator":6,"soil-swell-shrinkage-factor-calculator":6,"soil-uscs-soil-classification-liquid-plastic-limit-calculator":6,"soil-void-ratio-porosity-calculator":6,"solar-battery-bank-sizing-calculator":6,"solar-battery-storage-depth-of-discharge-calculator":6,"solar-cell-fill-factor-efficiency-open-circuit-voltage-calculator":6,"solar-inverter-dc-ac-ratio-clipping-calculator":6,"solar-irradiance-dni-dhi-ghi-photovoltaic-tilt-calculator":6,"solar-panel-output-calculator":6,"solar-panel-pv-array-output-calculator":6,"solar-panel-string-voltage-temperature-coefficient-calculator":6,"solar-panel-temperature-coefficient-power-loss-calculator":6,"solar-pv-tilt-angle-optimal-calculator":6,"solar-sail-radiation-pressure-acceleration-calculator":6,"solar-zenith-angle-air-mass-solar-elevation-calculator":6,"solow-swan-growth-model-steady-state-capital-labor-calculator":6,"solubility-product-ksp-molar-solubility-calculator":6,"solution-dilution-calculator":6,"solution-molarity-concentration-c-equals-n-over-v-calculator":6,"soret-effect-thermodiffusion-concentration-gradient-calculator":6,"sorting-visualizer":6,"sortino-ratio-downside-risk-calculator":6,"sound-decibel-distance-calculator":6,"sound-distance-attenuation-inverse-square-calculator":6,"sound-intensity-level-decibels-inverse-square-law-calculator":6,"sound-intensity-level-watts-calculator":6,"sound-pressure-level-inverse-square-law-calculator":6,"sound-pressure-level-spl-decibel-distance-attenuation-calculator":6,"sound-transmission-class-stc-mass-law-calculator":6,"sound-transmission-class-stc-wall-soundproofing-calculator":6,"sound-wavelength-frequency-calculator":6,"spacecraft-atmospheric-reentry-heat-flux-chapman-calculator":6,"spacecraft-solar-radiation-pressure-photon-force-calculator":6,"spatial-filter-pinhole-diameter-laser-calculator":6,"speaker-wire-gauge-power-loss-calculator":6,"special-relativity-time-dilation-calculator":6,"specific-gamma-ray-constant-dose-rate-distance-calculator":6,"specific-heat-capacity-thermal-energy-q-equals-mc-delta-t-calculator":6,"spectrophotometry-beer-lambert-molar-extinction-calculator":6,"speed-distance-time-calculator":6,"speed-kmh-mph-ms-knots-converter":6,"sphere-calculator":6,"sphere-of-influence-hill-sphere-laplace-radius-calculator":6,"spherical-cap-volume-surface-area-calculator":6,"spherical-to-cartesian-3d-coordinates-converter":6,"spirometry-forced-vital-capacity-fev1-fev1-fvc-ratio-calculator":6,"split-bill-tip-calculator":6,"spontaneous-parametric-down-conversion-spdc-phase-matching-calculator":6,"stack-visualizer":6,"stagnation-pressure-temperature-isentropic-flow-calculator":6,"standard-atmosphere-isa-altitude-temperature-pressure-calculator":6,"standard-error-of-the-mean-sem-calculator":6,"standard-penetration-test-spt-n-value-overburden-correction-calculator":6,"standing-waves-harmonics-open-closed-pipe-string-calculator":6,"state-space-system-controllability-observability-gramian-calculator":6,"steel-w-shape-beam-compact-section-plastic-moment-calculator":6,"steel-wide-flange-beam-bending-plastic-moment-calculator":6,"stefan-boltzmann-blackbody-radiation-emissivity-calculator":6,"stefan-boltzmann-stellar-luminosity-calculator":6,"stellar-luminosity-stefan-boltzmann-radius-calculator":6,"stellar-mass-luminosity-relation-main-sequence-calculator":6,"stellar-parallax-distance-parsec-arcsecond-calculator":6,"stellar-spectral-classification-hr-diagram-color-index-calculator":6,"stepper-motor-microstepping-resolution-calculator":6,"stepper-motor-step-angle-pulse-rate-rpm-calculator":6,"stock-dividend-yield-calculator":6,"stock-tank-oil-initially-in-place-stoiip-calculator":6,"stokes-law-terminal-settling-velocity-particle-calculator":7,"stream-discharge-manning-open-channel-flow-velocity-calculator":7,"streeter-phelps-dissolved-oxygen-sag-curve-calculator":7,"streeter-phelps-dissolved-oxygen-sag-curve-river-calculator":7,"stribeck-curve-lubrication-regime-hersey-number-calculator":7,"structural-buckling-euler-effective-length-factor-calculator":7,"student-scientific-calculator":7,"study-time-calculator":7,"subnet-ipv4-calculator":7,"superplastic-forming-strain-rate-sensitivity-m-calculator":7,"supersonic-oblique-shock-theta-beta-mach-calculator":7,"support-vector-machine-svm-maximum-margin-hyperplane-calculator":7,"surface-area-volume-calculator":7,"surface-plasmon-resonance-spr-binding-kinetics-kd-calculator":7,"surface-tension-capillary-rise-calculator":7,"sweat-rate-hydration-loss-calculator":7,"switched-reluctance-motor-step-angle-torque-reluctance-calculator":7,"syllabus-progress-calculator":7,"synaptic-quantal-release-binomial-statistics-calculator":7,"synchronous-rectifier-conduction-loss-calculator":7,"synchrotron-radiation-power-loss-calculator":7,"synodic-period-planets-calculator":7,"synodic-vs-sidereal-orbital-period-planetary-alignment-calculator":7,"systemic-vascular-resistance-svr-cardiac-hemodynamics-calculator":7,"tangential-flow-ultrafiltration-flux-tff-membrane-calculator":7,"target-heart-rate-karvonen-calculator":7,"target-percentage-planner":7,"taylor-tool-life-equation-cutting-speed-calculator":7,"telescope-magnification-focal-ratio-calculator":7,"telescope-magnification-focal-ratio-light-gathering-power-calculator":7,"telescope-resolving-power-dawes-rayleigh-criterion-calculator":7,"temperature-converter":7,"temperature-kelvin-celsius-fahrenheit-converter":7,"terzaghi-bearing-capacity-shallow-foundation-calculator":7,"terzaghi-bearing-capacity-shallow-foundation-footing-calculator":7,"terzaghi-bearing-capacity-shallow-strip-footing-calculator":7,"terzaghi-one-dimensional-consolidation-settlement-calculator":7,"text-diff-checker":7,"text-duplicate-remover":7,"tf-idf-term-frequency-inverse-document-frequency-calculator":7,"theis-unsteady-aquifer-drawdown-well-function-calculator":7,"thermal-linear-expansion-calculator":7,"thermal-shock-resistance-parameter-r-calculator":7,"thermal-stress-expansion-restraint-calculator":7,"thermal-volumetric-expansion-calculator":7,"thermodynamic-carnot-otto-diesel-cycle-thermal-efficiency-calculator":7,"thermoelectric-generator-teg-seebeck-power-calculator":7,"thick-walled-cylinder-lame-equation-radial-hoop-stress-calculator":7,"thickener-settling-area-talmage-fitch-calculator":7,"thiele-modulus-catalyst-effectiveness-factor-calculator":7,"thiele-modulus-effectiveness-factor-internal-diffusion-catalyst-calculator":7,"thiem-steady-state-confined-aquifer-transmissivity-calculator":7,"thin-lens-magnification-calculator":7,"thin-lens-mirror-magnification-equation-calculator":7,"thin-walled-pressure-vessel-hoop-longitudinal-stress-calculator":7,"thrust-to-weight-ratio-twr-rocket-equation-calculator":7,"tidal-barrage-potential-energy-generation-calculator":7,"timber-wood-beam-bending-shear-deflection-ndsi-calculator":7,"time-converter":7,"time-duration-hours-minutes-calculator":7,"titration-neutralization-c1v1-equals-c2v2-calculator":7,"tokamak-safety-factor-q-edge-kink-stability-calculator":7,"tokamak-safety-factor-q-kink-instability-calculator":7,"torque-calculator":7,"torque-lever-arm-rotational-equilibrium-calculator":7,"torricelli-law-tank-drain-calculator":7,"torsion-polar-moment-shear-stress-shaft-calculator":7,"torus-volume-surface-area-calculator":7,"traffic-flow-greenshields-model-capacity-density-calculator":7,"trajectory-cubic-quintic-polynomial-motion-profile-calculator":7,"transformer-step-up-step-down-efficiency-calculator":7,"transformer-turns-ratio-voltage-current-calculator":7,"transmembrane-helix-hydropathy-kyte-doolittle-calculator":7,"transmission-line-surge-impedance-loading-sil-calculator":7,"trapezoid-area-perimeter-calculator":7,"trapezoidal-rule-numerical-definite-integral-calculator":7,"trapezoidal-s-curve-velocity-profile-motion-calculator":7,"treynor-ratio-systematic-risk-calculator":7,"triangle-area-calculator":7,"triangle-centroid-geometric-center-calculator":7,"triangular-prism-volume-surface-area-calculator":7,"trigonometry-ratio-calculator":7,"trigonometry-soh-cah-toa-right-triangle-solver":7,"trip-budget-planner":7,"true-airspeed-tas-indicated-cas-calculator":7,"truncated-cone-frustum-calculator":7,"truss-method-of-joints-member-axial-force-calculator":7,"tsiolkovsky-rocket-equation-calculator":7,"tsiolkovsky-rocket-equation-delta-v-calculator":7,"tsiolkovsky-rocket-equation-delta-v-mass-ratio-calculator":7,"turbo-code-convolutional-code-coding-gain-rate-calculator":7,"turbocharger-compressor-surge-choke-pressure-ratio-calculator":7,"turbofan-engine-thrust-specific-fuel-consumption-tsfc-calculator":7,"turbojet-engine-specific-thrust-tsfc-calculator":7,"turbulence-intensity-kinetic-energy-k-omega-calculator":7,"tv-viewing-distance-calculator":7,"typography-px-to-rem-em-pt-converter":7,"uart-baud-rate-frame-time-calculator":7,"undulator-radiation-wavelength-k-parameter-calculator":7,"uninterruptible-power-supply-ups-runtime-calculator":7,"unit-converter":7,"unitary-method-calculator":7,"unix-timestamp-converter":7,"url-slug-generator":7,"url-slug-seo-generator-sanitizer":7,"url-to-video-player":7,"usd-to-inr-converter":7,"utm-grid-convergence-scale-factor-calculator":7,"uuid-v4-v7-bulk-generator":7,"valency-helper":7,"value-at-risk-var-parametric-monte-carlo-calculator":7,"van-der-waals-real-gas-equation-state-compressibility-calculator":7,"van-t-hoff-equation-isochore-calculator":7,"vapor-pressure-deficit-vpd-horticulture-calculator":7,"vce-study-score-scaled-aggregate-calculator":7,"vector-angle-3d-space-calculator":7,"vector-calculus-gradient-divergence-curl-spherical-cylindrical-calculator":7,"vector-cross-dot-product-calculator":7,"vehicle-stopping-braking-weight-transfer-center-of-gravity-calculator":7,"ventilator-dynamic-static-compliance-airway-resistance-calculator":7,"vickers-brinell-rockwell-hardness-conversion-calculator":7,"vickers-hardness-number-vhn-calculator":7,"vigenere-cipher-polyalphabetic-calculator":7,"vis-viva-orbital-speed-equation-calculator":7,"vlsi-cmos-propagation-delay-power-dissipation-calculator":7,"vo2-max-rockport-walking-test-calculator":7,"vo2-max-treadmill-running-calculator":7,"vogel-fulcher-tammann-vft-glass-viscosity-calculator":7,"voltage-divider-calculator":7,"volume-liters-gallons-cups-fluid-ounces-converter":7,"von-mises-tresca-yield-criterion-equivalent-stress-calculator":7,"waist-to-height-ratio-whtr-calculator":7,"waist-to-hip-ratio-whr-calculator":7,"wastewater-bod-kinetics-ultimate-biochemical-oxygen-demand-calculator":7,"wastewater-bod-ultimate-biochemical-oxygen-demand-calculator":7,"wastewater-hydraulic-retention-time-hrt-calculator":7,"water-intake-calculator":7,"water-treatment-chlorine-contact-time-ct-disinfection-calculator":7,"wave-speed-calculator":7,"wave-speed-frequency-wavelength-v-equals-f-lambda-calculator":7,"weibull-modulus-brittle-ceramic-fracture-calculator":7,"weibull-modulus-brittle-ceramic-fracture-probability-calculator":7,"weight-kg-lbs-grams-ounces-stones-converter":7,"weir-flow-rate-rectangular-triangular-v-notch-calculator":7,"weir-flow-rate-v-notch-rectangular-calculator":7,"wellbore-annular-velocity-cuttings-transport-calculator":7,"wellbore-hydrostatic-mud-weight-kill-pressure-calculator":7,"wells-score-dvt-deep-vein-thrombosis-probability-calculator":7,"wells-score-pulmonary-embolism-pe-probability-calculator":7,"westergaard-elastic-stress-point-load-depth-calculator":7,"western-blot-densitometry-normalization-housekeeping-calculator":7,"wet-bulb-globe-temperature-wbgt-calculator":7,"wet-bulb-globe-temperature-wbgt-heat-stress-calculator":7,"wgs84-ellipsoid-geodetic-to-ecef-coordinates-calculator":7,"wheatstone-bridge-resistor-calculator":7,"wien-displacement-law-calculator":7,"wien-displacement-law-stellar-peak-wavelength-temperature-calculator":7,"wilke-chang-liquid-diffusion-coefficient-calculator":7,"wilks-score-powerlifting-calculator":7,"wind-chill-temperature-index-calculator":7,"wind-power-density-weibull-distribution-wind-energy-calculator":7,"wind-shear-power-law-hub-height-calculator":7,"wind-turbine-betz-limit-power-calculator":7,"wind-turbine-betz-limit-power-output-calculator":7,"windkessel-arterial-cardiovascular-compliance-impedance-calculator":7,"wing-induced-drag-aspect-ratio-calculator":7,"wire-gauge-voltage-drop-calculator":7,"wobbe-index-fuel-gas-interchangeability-calculator":7,"word2vec-skip-gram-negative-sampling-loss-calculator":7,"work-energy-power-calculator":7,"worm-gear-lead-angle-mechanical-efficiency-calculator":7,"xenon-135-iodine-135-reactor-poisoning-pit-calculator":7,"xray-ct-hounsfield-unit-attenuation-calculator":7,"yield-to-maturity-ytm-zero-coupon-bond-pricing-calculator":7,"young-double-slit-interference-calculator":7,"young-double-slit-interference-fringe-width-calculator":7,"youngs-modulus-tensile-strain-calculator":7,"z-score-calculator":7,"z-score-to-p-value-normal-cdf-calculator":7,"z-transform-discrete-transfer-function-pole-zero-stability-calculator":7,"zener-diode-voltage-regulator-calculator":7};

function formatToolTitle(slug) {
  if (slug === 'best-of-five-calculator') return 'Best of Five Calculator';
  if (slug === 'best-of-four-calculator') return 'Best of Four Calculator';
  if (slug === 'crop-image-to-4-3') return 'Crop Image to 4:3 Aspect Ratio';
  if (slug === 'crop-image-to-16-9') return 'Crop Image to 16:9 Aspect Ratio';
  if (slug === 'crop-image-to-9-16-vertical') return 'Crop Image to 9:16 Vertical Aspect Ratio';
  if (slug === 'crop-image-to-1-1-square') return 'Crop Image to 1:1 Square';
  if (slug === 'resize-image-for-youtube-thumbnail') return 'Resize Image for YouTube Thumbnail';
  if (slug === 'kakaotalk-profile-image-resizer-online') return 'KakaoTalk Profile Image Resizer Online';

  const acronyms = {
    'pdf': 'PDF', 'json': 'JSON', 'xml': 'XML', 'yaml': 'YAML', 'csv': 'CSV',
    'sql': 'SQL', 'html': 'HTML', 'css': 'CSS', 'js': 'JS', 'api': 'API',
    'url': 'URL', 'cbse': 'CBSE', 'icse': 'ICSE', 'bod': 'BOD', 'cod': 'COD',
    'kva': 'kVA', 'kvar': 'kVAR', 'rlc': 'RLC', 'fm': 'F/M', 'mlss': 'MLSS',
    'srt': 'SRT', 'ytm': 'YTM', 'cdf': 'CDF', 'ct': 'CT', 'hu': 'HU',
    'gpa': 'GPA', 'bmi': 'BMI', 'emi': 'EMI', 'gst': 'GST', 'vat': 'VAT',
    'sip': 'SIP', 'fd': 'FD', 'rd': 'RD', 'epf': 'EPF', 'ppf': 'PPF',
    'nps': 'NPS', 'hvac': 'HVAC', 'suvat': 'SUVAT', 'voc': 'VOC', 'qr': 'QR',
    'youtube': 'YouTube', 'tiktok': 'TikTok', 'instagram': 'Instagram',
    'facebook': 'Facebook', 'twitter': 'Twitter', 'linkedin': 'LinkedIn',
    'jpg': 'JPG', 'jpeg': 'JPEG', 'png': 'PNG', 'webp': 'WebP', 'gif': 'GIF',
    'svg': 'SVG', 'hd': 'HD', '4k': '4K', '2k': '2K'
  };

  const words = slug.split('-').filter(Boolean);
  const formatted = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    const next = (words[i + 1] || '').toLowerCase();
    const prev = (words[i - 1] || '').toLowerCase();

    if (/^\d+$/.test(w) && next === 'words' && (words[i + 2] || '').toLowerCase() === 'count') {
      formatted.push('(' + w + ' Words Count)');
      i += 2;
      continue;
    }
    if (/^(\d+)(kb|mb)$/i.test(w)) {
      const match = w.match(/^(\d+)(kb|mb)$/i);
      formatted.push(match[1] + match[2].toUpperCase());
      continue;
    }
    if (/^(\d+)x(\d+)$/i.test(w)) {
      const match = w.match(/^(\d+)x(\d+)$/i);
      formatted.push(match[1] + 'x' + match[2]);
      continue;
    }
    if (prev === 'to' && /^\d+$/.test(w) && /^\d+$/.test(next)) {
      formatted.push(w + ':' + next);
      i += 1;
      continue;
    }
    if (acronyms[w]) {
      formatted.push(acronyms[w]);
      continue;
    }
    formatted.push(w.charAt(0).toUpperCase() + w.slice(1));
  }

  return formatted.join(' ');
}

function slugToCategory(slug) {
  const s = slug.toLowerCase();
  if (s.includes('image') || s.includes('photo') || s.includes('crop') || s.includes('resize') || s.includes('compress-jpg') || s.includes('compress-image') || s.includes('png') || s.includes('webp') || s.includes('svg') || s.includes('thumbnail') || s.includes('kakaotalk') || s.includes('flip-image') || s.includes('rotate-image') || s.includes('grayscale') || s.includes('invert-image')) return 'Utilities';
  if (s.includes('pdf')) return 'PDF';
  if (s.includes('calc') || s.includes('math') || s.includes('percentage') || s.includes('ratio') || s.includes('formula') || s.includes('angle') || s.includes('frequency') || s.includes('impedance') || s.includes('power') || s.includes('loan') || s.includes('emi') || s.includes('interest') || s.includes('born-in') || s.includes('age-calc') || s.includes('best-of')) return 'Math';
  if (s.includes('text') || s.includes('word') || s.includes('string') || s.includes('convert') || s.includes('case') || s.includes('line') || s.includes('voice')) return 'Text';
  if (s.includes('json') || s.includes('xml') || s.includes('yaml') || s.includes('code') || s.includes('format') || s.includes('base64') || s.includes('sql') || s.includes('html') || s.includes('css')) return 'Developer';
  if (s.includes('password') || s.includes('hash') || s.includes('encode') || s.includes('encrypt') || s.includes('shield')) return 'Security';
  return 'Utilities';
}

function slugToDescription(slug, name) {
  const s = slug.toLowerCase();
  if (s.includes('youtube-thumbnail')) return 'Resize image to exact 1280x720 YouTube thumbnail size online. Free, fast, and high quality with no sign-up.';
  if (s.includes('facebook-cover')) return 'Resize photo to exact 1200x630 Facebook cover size online. Free and high quality.';
  if (s.includes('instagram-post')) return 'Resize photo to exact 1080x1080 Instagram post square size online. Free and fast.';
  if (s.includes('twitter-header')) return 'Resize photo to exact 1500x500 Twitter header banner size online.';
  if (s.includes('linkedin-banner')) return 'Resize image to exact 1584x396 LinkedIn banner size online.';
  if (s.includes('tiktok-video')) return 'Resize photo to exact 1080x1920 9:16 vertical size for TikTok and Instagram Reels.';
  if (s.includes('passport-photo')) return 'Resize photo to standard 600x600 2x2 inch passport photo format online.';
  if (s.includes('signature-online')) return 'Resize online signature image to 300x100 for official documents and online applications.';
  if (s.includes('kakaotalk-profile')) return 'Resize profile avatar to 500x500 for KakaoTalk online.';
  if (s.includes('best-of-five')) return 'Calculate your best 5 subject marks and percentage automatically. Free, fast, and 100% private browser-based calculator.';
  if (s.includes('best-of-four')) return 'Calculate your best 4 subject marks and percentage automatically. Free, fast, and 100% private browser-based calculator.';
  if (s.includes('crop-image-to-4-3')) return 'Crop photo to standard 4:3 aspect ratio for tablets and monitors.';
  if (s.includes('crop-image-to-16-9')) return 'Crop photo to standard 16:9 widescreen aspect ratio for YouTube and desktop displays.';
  if (s.includes('crop-image-to-9-16')) return 'Crop photo to vertical 9:16 aspect ratio for Instagram Stories, TikTok, and YouTube Shorts.';
  if (s.includes('crop-image-to-1-1')) return 'Crop photo to 1:1 square aspect ratio for Instagram and profile avatars.';
  if (s.includes('compress-image-to') || s.includes('resize-image-to-') && s.includes('kb')) {
    const match = s.match(/(?:compress|resize)-image-to-(\d+)(kb|mb)/);
    if (match) return `Compress image file size to exact ${match[1]}${match[2].toUpperCase()} online. Free, fast, 100% private in-browser image compressor.`;
  }
  if (s.match(/resize-image-to-(\d+)x(\d+)/)) {
    const match = s.match(/resize-image-to-(\d+)x(\d+)/);
    return `Resize image to exact ${match[1]}x${match[2]} pixels online. Fast, high-quality, 100% private browser-based image resizer.`;
  }
  if (s.includes('word-length') || s.includes('words-count')) {
    const match = s.match(/(\d+)-words-count/);
    if (match) return `Check if your text meets the exact ${match[1]} words count limit online. Free, fast, and 100% private browser-based word counter.`;
  }
  if (s.includes('age-calculator-born-in')) {
    const match = s.match(/born-in-(\d{4})/);
    if (match) return `Calculate exact age in years, months, and days for someone born in year ${match[1]}. Free online age calculator.`;
  }
  if (s.includes('image') || s.includes('photo') || s.includes('crop') || s.includes('resize')) {
    return `Free online ${name} tool by NikTool. Process, crop, and optimize images 100% privately in your browser.`;
  }
  if (s.includes('pdf')) {
    return `Free online ${name} tool by NikTool. Process, extract, and convert PDF documents 100% privately in your browser.`;
  }
  return `Free online ${name} tool by NikTool. Fast, browser-based, 100% private processing with no sign-up or installation required.`;
}

function getRelatedTools(slug, category) {
  const s = slug.toLowerCase();
  const list = [];

  if (s.includes('image') || s.includes('photo') || s.includes('crop') || s.includes('resize') || s.includes('thumbnail') || s.includes('kakaotalk') || s.includes('flip-image') || s.includes('rotate') || s.includes('grayscale') || s.includes('invert')) {
    list.push(
      { slug: 'resize-image-for-youtube-thumbnail', name: 'Resize Image for YouTube Thumbnail', desc: 'Resize image to 1280x720 YouTube size.' },
      { slug: 'resize-image-for-instagram-post', name: 'Resize Image for Instagram Post', desc: 'Resize photo to 1080x1080 Instagram square.' },
      { slug: 'resize-image-for-facebook-cover', name: 'Resize Image for Facebook Cover', desc: 'Resize image to 1200x630 Facebook cover.' },
      { slug: 'compress-image-to-100kb', name: 'Compress Image to 100KB', desc: 'Compress image file size down to 100KB.' },
      { slug: 'crop-image-to-16-9', name: 'Crop Image to 16:9 Aspect Ratio', desc: 'Crop photo to 16:9 widescreen ratio.' },
      { slug: 'crop-image-to-4-3', name: 'Crop Image to 4:3 Aspect Ratio', desc: 'Crop photo to standard 4:3 aspect ratio.' }
    );
  } else if (s.includes('best-of') || s.includes('marks') || s.includes('gpa') || s.includes('grade')) {
    list.push(
      { slug: 'best-of-five-calculator', name: 'Best of Five Calculator', desc: 'Calculate top 5 marks and percentage.' },
      { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Quick percentage calculation tool.' },
      { slug: 'gpa-calculator', name: 'GPA Calculator', desc: 'Calculate grade point average online.' },
      { slug: 'scientific-calculator', name: 'Scientific Calculator', desc: 'Advanced scientific math functions.' },
      { slug: 'days-between-dates-calculator', name: 'Days Between Dates', desc: 'Calculate duration between dates.' },
      { slug: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, and reading time.' }
    );
  } else if (s.includes('word-count') || s.includes('words-count') || s.includes('word-length')) {
    const match = s.match(/(\d+)-words-count/);
    const count = match ? parseInt(match[1], 10) : 50;
    const offsets = [-20, -10, -5, 5, 10, 20, 50, 100];
    offsets.forEach(off => {
      const target = count + off;
      if (target > 0 && target <= 5000 && target !== count) {
        list.push({
          slug: `word-length-checker-${target}-words-count`,
          name: `Word Length Checker (${target} Words Count)`,
          desc: `Check if your text meets the exact ${target} words count limit.`
        });
      }
    });
    list.push(
      { slug: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, sentences, and reading time.' },
      { slug: 'character-counter', name: 'Character Counter', desc: 'Count total characters with and without spaces.' }
    );
  } else if (s.includes('age-calculator') || s.includes('born-in')) {
    const match = s.match(/born-in-(\d{4})/);
    const year = match ? parseInt(match[1], 10) : 1990;
    const offsets = [-15, -10, -5, -1, 1, 5, 10, 15];
    offsets.forEach(off => {
      const y = year + off;
      if (y >= 1900 && y <= 2026 && y !== year) {
        list.push({
          slug: `age-calculator-born-in-${y}`,
          name: `Age Calculator Born In ${y}`,
          desc: `Calculate exact age in years, months, and days for year ${y}.`
        });
      }
    });
    list.push(
      { slug: 'age-calculator', name: 'General Age Calculator', desc: 'Calculate exact age from date of birth.' },
      { slug: 'days-between-dates-calculator', name: 'Days Between Dates', desc: 'Calculate duration between two dates.' }
    );
  } else if (category === 'PDF' || s.includes('pdf')) {
    list.push(
      { slug: 'extract-first-page-from-pdf', name: 'Extract First Page From PDF', desc: 'Extract and save only page 1 as a single-page PDF.' },
      { slug: 'extract-last-page-from-pdf', name: 'Extract Last Page From PDF', desc: 'Extract and save only the last page of a PDF.' },
      { slug: 'extract-even-pages-from-pdf', name: 'Extract Even Pages From PDF', desc: 'Extract all even-numbered pages from PDF.' },
      { slug: 'extract-odd-pages-from-pdf', name: 'Extract Odd Pages From PDF', desc: 'Extract all odd-numbered pages from PDF.' },
      { slug: 'reverse-page-order-in-pdf', name: 'Reverse PDF Page Order', desc: 'Reverse the sequence of pages in any PDF.' },
      { slug: 'remove-first-page-from-pdf', name: 'Remove First Page From PDF', desc: 'Delete page 1 from your PDF document.' }
    );
  } else if (category === 'Math') {
    list.push(
      { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Quick percentage calculation tool.' },
      { slug: 'scientific-calculator', name: 'Scientific Calculator', desc: 'Advanced scientific math functions.' },
      { slug: 'home-loan-emi-calculator-20-lakhs-tenure-15-years', name: 'Home Loan EMI Calculator', desc: 'Calculate monthly home loan EMIs and interest.' },
      { slug: 'gpa-calculator', name: 'GPA Calculator', desc: 'Calculate grade point average online.' },
      { slug: 'simple-interest-calculator', name: 'Simple Interest Calculator', desc: 'Calculate simple interest and maturity.' },
      { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', desc: 'Calculate compound interest growth.' }
    );
  } else if (category === 'Developer') {
    list.push(
      { slug: 'json-formatter', name: 'JSON Formatter & Validator', desc: 'Format, validate, and beautify JSON.' },
      { slug: 'xml-to-json-converter', name: 'XML to JSON Converter', desc: 'Convert XML structure to JSON format.' },
      { slug: 'yaml-to-json-converter', name: 'YAML to JSON Converter', desc: 'Convert YAML configuration to JSON.' },
      { slug: 'base64-encode-decode', name: 'Base64 Encoder / Decoder', desc: 'Encode and decode Base64 strings.' },
      { slug: 'url-encoder-decoder', name: 'URL Encoder / Decoder', desc: 'Encode and decode URL parameters.' },
      { slug: 'sql-formatter', name: 'SQL Formatter', desc: 'Format and beautify SQL database queries.' }
    );
  } else {
    list.push(
      { slug: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, and reading time.' },
      { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Fast percentage calculation tool.' },
      { slug: 'random-password-generator', name: 'Password Generator', desc: 'Generate strong secure passwords.' },
      { slug: 'case-converter', name: 'Case Converter', desc: 'Convert text between uppercase, lowercase, title case.' },
      { slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for designs.' },
      { slug: 'qr-code-generator', name: 'QR Code Generator', desc: 'Generate high-res custom QR codes.' }
    );
  }

  return list.slice(0, 6);
}

function renderToolHtml(slug) {
  const name = formatToolTitle(slug);
  const description = slugToDescription(slug, name);
  const category = slugToCategory(slug);
  const relatedTools = getRelatedTools(slug, category);

  const safeName = escapeHtml(name);
  const safeDesc = escapeHtml(description);
  const safeCat = escapeHtml(category);
  const url = `https://niktool.in/tools/${slug}/`;
  const lowerSlug = slug.toLowerCase();

  const isPdf = category === 'PDF' || lowerSlug.includes('pdf');
  const isImage = lowerSlug.includes('image') || lowerSlug.includes('photo') || lowerSlug.includes('crop') || lowerSlug.includes('resize') || lowerSlug.includes('compress-jpg') || lowerSlug.includes('compress-image') || lowerSlug.includes('webp') || lowerSlug.includes('png') || lowerSlug.includes('thumbnail') || lowerSlug.includes('kakaotalk') || lowerSlug.includes('flip-image') || lowerSlug.includes('rotate-image') || lowerSlug.includes('grayscale') || lowerSlug.includes('invert-image');
  const isWordCount = lowerSlug.includes('word-count') || lowerSlug.includes('words-count') || lowerSlug.includes('word-length');
  const isAge = (lowerSlug.startsWith('age-calculator') || lowerSlug.includes('-age-calculator') || lowerSlug.includes('born-in')) && !lowerSlug.includes('percent');
  const isMarksCalc = lowerSlug.includes('best-of') || lowerSlug.includes('percentage') || lowerSlug.includes('class-10') || lowerSlug.includes('class-12') || lowerSlug.includes('marks') || lowerSlug.includes('board-percentage') || lowerSlug.includes('cbse') || lowerSlug.includes('icse') || lowerSlug.includes('grade') || lowerSlug.includes('cgpa');
  const chunkId = TOOLS_INDEX[slug];
  const isHandcrafted = (chunkId !== undefined);

  let workspaceHtml = '';

  if (isHandcrafted) {
    workspaceHtml = `
    <section class="tool-workspace" id="handcrafted-workspace-loading">
      <div class="workspace-header">
        <h2>${safeName}</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally in browser</span>
      </div>
      <div style="text-align: center; padding: 2rem; color: #5c6861; font-weight: 500;">
        <span class="status-dot" style="display:inline-block; margin-right:6px;"></span> Loading calculator workspace...
      </div>
    </section>`;
  } else if (isMarksCalc) {
    const isBest4 = lowerSlug.includes('best-of-four');
    const isBest5 = lowerSlug.includes('best-of-five');
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>${safeName} Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally in browser</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-input">Enter Subject Marks or Total Score</label>
          <textarea class="tool-textarea" id="${slug}-input" placeholder="Enter subject marks separated by commas, spaces, or newlines&#10;Example: 88, 92, 79, 85, 95&#10;Or enter total score: 439 / 500&#10;Or enter CGPA: 8.8"></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-output">Calculated Result &amp; Grade</label>
          <textarea class="tool-textarea" id="${slug}-output" placeholder="Percentage, total marks, and grade breakdown will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">${isBest4 ? 'Calculate Best 4' : (isBest5 ? 'Calculate Best 5' : 'Calculate Percentage')}</button>
        <button class="button secondary" id="copy-output" type="button" disabled>Copy result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Enter marks or scores above.</p>
    </section>`;
  } else if (isImage) {
    let subTitle = 'Quality / Compression Target';
    if (lowerSlug.includes('youtube-thumbnail')) subTitle = 'Target: 1280 x 720 px (YouTube Thumbnail Standard)';
    else if (lowerSlug.includes('instagram-post')) subTitle = 'Target: 1080 x 1080 px (Instagram Square)';
    else if (lowerSlug.includes('facebook-cover')) subTitle = 'Target: 1200 x 630 px (Facebook Cover)';
    else if (lowerSlug.includes('twitter-header')) subTitle = 'Target: 1500 x 500 px (Twitter Header)';
    else if (lowerSlug.includes('linkedin-banner')) subTitle = 'Target: 1584 x 396 px (LinkedIn Banner)';
    else if (lowerSlug.includes('tiktok-video')) subTitle = 'Target: 1080 x 1920 px (TikTok / Reels 9:16)';
    else if (lowerSlug.includes('passport-photo')) subTitle = 'Target: 600 x 600 px (Passport Photo)';
    else if (lowerSlug.includes('signature-online')) subTitle = 'Target: 300 x 100 px (Signature)';
    else if (lowerSlug.includes('kakaotalk-profile')) subTitle = 'Target: 500 x 500 px (KakaoTalk Profile)';
    else if (lowerSlug.match(/resize-image-to-(\d+)x(\d+)/)) {
      const dm = lowerSlug.match(/resize-image-to-(\d+)x(\d+)/);
      subTitle = `Target Dimensions: ${dm[1]} x ${dm[2]} px`;
    } else if (lowerSlug.includes('compress-image-to') || lowerSlug.includes('resize-image-to-') && lowerSlug.includes('kb')) {
      const match = lowerSlug.match(/(?:compress|resize)-image-to-(\d+)(kb|mb)/);
      if (match) subTitle = `Target File Size: ${match[1]}${match[2].toUpperCase()}`;
    } else if (lowerSlug.includes('flip-image-horizontally')) subTitle = 'Effect: Flip Horizontally (Mirror)';
    else if (lowerSlug.includes('flip-image-vertically')) subTitle = 'Effect: Flip Vertically';
    else if (lowerSlug.includes('rotate-image-90')) subTitle = 'Effect: Rotate 90° Clockwise';
    else if (lowerSlug.includes('grayscale-image')) subTitle = 'Filter: Grayscale (Black & White)';
    else if (lowerSlug.includes('invert-image')) subTitle = 'Filter: Invert Colors (Negative)';

    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Image Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally in browser</span>
      </div>

      <!-- Hero File Dropzone -->
      <div class="img-hero-box" id="img-dropzone" style="text-align: center; padding: 2.5rem 1.5rem; border: 2px dashed #a3d9bc; border-radius: 24px; background: linear-gradient(180deg, rgba(247, 248, 244, 0.6) 0%, rgba(223, 245, 233, 0.35) 100%); cursor: pointer; margin-bottom: 1.5rem;">
        <div class="img-hero-icon" style="width: 64px; height: 64px; margin: 0 auto 1rem; display: grid; place-items: center; border-radius: 18px; background: #176b4d; color: white; box-shadow: 0 8px 20px rgba(23, 107, 77, 0.25);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <button class="button" type="button" id="btn-select-img" style="min-height: 52px; padding: 0.8rem 2.2rem; font-size: 1.05rem; border-radius: 14px; background: #176b4d; color: white; border: 0; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 8px 24px rgba(23, 107, 77, 0.3);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Select Image File
        </button>
        <div class="drop-hint" style="margin-top: 0.85rem; color: #5b6861; font-size: 0.92rem; font-weight: 500;">or drop JPG, PNG, WebP image here</div>
        <input type="file" id="img-file-input" accept="image/*" style="display:none;">
      </div>

      <!-- Details Panel -->
      <div class="img-details-panel" id="img-details-panel" style="display: none; background: #ffffff; border: 1px solid var(--line); border-radius: 18px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: var(--shadow);">
        <div class="img-preview-shell" style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--line);">
          <div class="img-thumb-container" style="width: 130px; height: 130px; border-radius: 14px; border: 1px solid var(--line); overflow: hidden; display: grid; place-items: center; background: #f6f8f5; flex: none;">
            <img id="img-preview-tag" src="" alt="Image Preview" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
          <div class="img-info-meta" style="flex: 1;">
            <div class="title" id="img-file-name" style="font-family: 'Manrope', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--ink); margin-bottom: 0.3rem;">image.png</div>
            <div class="img-badge-row" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem;">
              <span class="img-badge" id="img-dim-badge" style="background: var(--mint); color: var(--green-dark); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">1920 x 1080 px</span>
              <span class="img-badge" id="img-size-badge" style="background: var(--mint); color: var(--green-dark); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">245 KB</span>
              <span class="img-badge" id="img-fmt-badge" style="background: var(--mint); color: var(--green-dark); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">PNG</span>
            </div>
          </div>
        </div>

        <div class="controls-group" id="controls-box" style="margin-top: 1rem; background: #fafbf8; padding: 1rem; border-radius: 14px; border: 1px solid var(--line);">
          <label for="img-quality-slider" style="display: block; font-weight: 700; font-size: 0.85rem; color: #46544c; margin-bottom: 0.4rem;">${escapeHtml(subTitle)}</label>
          <input type="range" id="img-quality-slider" min="10" max="100" value="85" style="width:100%;">
          <div style="font-size:0.8rem; color:#5b6861; margin-top:0.3rem;" id="img-quality-txt">Quality Target: 85%</div>
        </div>

        <div class="download-action-bar" style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.85rem;">
          <button class="button" id="btn-process-download" type="button" style="min-height: 48px; padding: 0.8rem 1.6rem; font-size: 1rem; background: #176b4d;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Process &amp; Download Image
          </button>
          <button class="button secondary" id="btn-reset-file" type="button">Select Another Image</button>
        </div>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Select an image above to get started.</p>
    </section>`;
  } else if (isPdf) {
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>PDF Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally in browser</span>
      </div>

      <div class="pdf-hero-box" id="pdf-dropzone" style="text-align: center; padding: 2.5rem 1.5rem; border: 2px dashed #b5cdbf; border-radius: 24px; background: linear-gradient(180deg, rgba(247, 248, 244, 0.6) 0%, rgba(223, 245, 233, 0.3) 100%); cursor: pointer; margin-bottom: 1.5rem;">
        <div class="pdf-hero-icon" style="width: 64px; height: 64px; margin: 0 auto 1rem; display: grid; place-items: center; border-radius: 18px; background: var(--green); color: white; box-shadow: 0 8px 20px rgba(23, 107, 77, 0.25);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <polyline points="9 15 12 12 15 15"></polyline>
          </svg>
        </div>
        <button class="button" type="button" id="btn-select-pdf" style="min-height: 52px; padding: 0.8rem 2.2rem; font-size: 1.05rem; border-radius: 14px; background: #e53935; color: white; border: 0; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 8px 24px rgba(229, 57, 53, 0.3);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Select PDF file
        </button>
        <div class="drop-hint" style="margin-top: 0.85rem; color: #66736c; font-size: 0.92rem; font-weight: 500;">or drop PDF file here</div>
        <input type="file" id="pdf-file-input" accept="application/pdf" style="display:none;">
      </div>

      <div class="pdf-file-details" id="pdf-details-panel" style="display: none; background: #ffffff; border: 1px solid var(--line); border-radius: 18px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: var(--shadow);">
        <div class="pdf-file-header" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--line); margin-bottom: 1rem;">
          <div class="pdf-file-title" id="pdf-file-name" style="font-family: 'Manrope', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--ink); display: flex; align-items: center; gap: 0.5rem;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            document.pdf
          </div>
          <div class="pdf-file-badge" id="pdf-file-info" style="background: var(--mint); color: var(--green-dark); padding: 0.25rem 0.65rem; border-radius: 8px; font-size: 0.82rem; font-weight: 700;">Loading...</div>
        </div>

        <div class="download-action-bar" style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.85rem;">
          <button class="button" id="btn-process-download" type="button" style="min-height: 48px; padding: 0.8rem 1.6rem; font-size: 1rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Process &amp; Download PDF
          </button>
          <button class="button secondary" id="btn-reset-file" type="button">Select Another File</button>
        </div>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Select a PDF file above to get started.</p>
    </section>`;
  } else if (isWordCount) {
    const match = slug.match(/(\d+)-words-count/);
    const targetWords = match ? match[1] : null;
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Word Count Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally in browser</span>
      </div>

      <div class="editor-panel" style="margin-bottom: 1.25rem;">
        <label class="editor-label" for="${slug}-input">Your Text Content</label>
        <textarea class="tool-textarea" id="${slug}-input" placeholder="Type or paste your text here to count words and characters..." style="min-height: 180px;"></textarea>
      </div>

      <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.85rem; margin-bottom: 1.25rem;">
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Words</div>
          <div id="stat-words" style="font-size: 1.6rem; font-weight: 800; color: var(--green); margin-top: 0.2rem;">0</div>
          ${targetWords ? `<div style="font-size: 0.72rem; color: #88958e; margin-top: 0.1rem;">Target: ${targetWords}</div>` : ''}
        </div>
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Characters</div>
          <div id="stat-chars" style="font-size: 1.6rem; font-weight: 800; color: var(--ink); margin-top: 0.2rem;">0</div>
          <div style="font-size: 0.72rem; color: #88958e; margin-top: 0.1rem;">With spaces</div>
        </div>
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Sentences</div>
          <div id="stat-sentences" style="font-size: 1.6rem; font-weight: 800; color: var(--ink); margin-top: 0.2rem;">0</div>
        </div>
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Reading Time</div>
          <div id="stat-reading" style="font-size: 1.4rem; font-weight: 800; color: var(--ink); margin-top: 0.2rem;">0s</div>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="copy-output" type="button">Copy Text</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Type or paste your text above.</p>
    </section>`;
  } else if (isAge) {
    const match = slug.match(/born-in-(\d{4})/);
    const defaultYear = match ? match[1] : '1995';
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Age Calculator Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally in browser</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <label class="editor-label" for="birth-date-input">Date of Birth</label>
          <input type="date" class="tool-textarea" id="birth-date-input" value="${defaultYear}-01-01" style="min-height: 48px; padding: 0.6rem 0.85rem; font-size: 1rem;">
        </div>
        <div>
          <label class="editor-label" for="target-date-input">Age on Date</label>
          <input type="date" class="tool-textarea" id="target-date-input" style="min-height: 48px; padding: 0.6rem 0.85rem; font-size: 1rem;">
        </div>
      </div>

      <div class="toolbar" style="margin-bottom: 1.25rem;">
        <button class="button" id="primary-action-btn" type="button">Calculate Exact Age</button>
      </div>

      <div id="age-result-box" style="background: #fafbf8; border: 1px solid var(--line); border-radius: 14px; padding: 1.25rem; margin-bottom: 1rem;">
        <div style="font-size: 0.85rem; font-weight: 700; color: #55635c; text-transform: uppercase;">Exact Calculated Age</div>
        <div id="age-main-output" style="font-size: 1.6rem; font-weight: 800; color: var(--green); margin: 0.4rem 0;">Click Calculate Above</div>
        <div id="age-breakdown-output" style="font-size: 0.95rem; color: #43514a; line-height: 1.6;"></div>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Select dates and click calculate.</p>
    </section>`;
  } else {
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-input">Input</label>
          <textarea class="tool-textarea" id="${slug}-input" placeholder="Type or paste input here..."></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-output">Result</label>
          <textarea class="tool-textarea" id="${slug}-output" placeholder="Result will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">Process</button>
        <button class="button secondary" id="copy-output" type="button" disabled>Copy result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Enter input above.</p>
    </section>`;
  }

  const chunkLoaderScript = isHandcrafted ? `
  <script>
  (async function() {
    try {
      const res = await fetch('/assets/data/tools-chunk-${chunkId}.json');
      const chunkData = await res.json();
      const item = chunkData && chunkData['${slug}'];
      if (item && item.ws) {
        const temp = document.createElement('div');
        temp.innerHTML = item.ws;
        const newWs = temp.firstElementChild || temp;
        const oldWs = document.getElementById('handcrafted-workspace-loading') || document.querySelector('.tool-workspace');
        if (oldWs) oldWs.replaceWith(newWs);
        if (item.js) {
          const s = document.createElement('script');
          s.textContent = item.js;
          document.body.appendChild(s);
        }
      }
    } catch (err) {
      console.error('Failed loading tool chunk:', err);
    }
  })();
  </script>` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeName} - Free Online Tool | NikTool</title>
  <meta name="description" content="${safeDesc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${safeName} | NikTool">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#176b4d">
  <meta name="msvalidate.01" content="70B4C5E15DD17C7431205113F321611F">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  ${isPdf ? '<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>' : ''}
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
        "name": "${safeName}",
        "applicationCategory": "${isPdf ? 'UtilitiesApplication' : (safeCat === 'Math' ? 'CalculatorApplication' : 'UtilitiesApplication')}",
        "operatingSystem": "Any",
        "url": "${url}",
        "description": "${safeDesc}",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://niktool.in/" },
          { "@type": "ListItem", "position": 2, "name": "${safeCat}", "item": "https://niktool.in/#tools" },
          { "@type": "ListItem", "position": 3, "name": "${safeName}", "item": "${url}" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I use ${safeName}?",
            "acceptedAnswer": { "@type": "Answer", "text": "${isMarksCalc ? 'Enter marks for your subjects separated by commas or newlines, then click Calculate Best to see your top scores and percentage.' : (isImage ? 'Select or drop your image file in the green dropzone above, customize quality or parameters, and click Process & Download Image.' : (isPdf ? 'Upload your PDF document in the workspace above and click Process & Download to save your modified file instantly.' : 'Simply enter your input values into the workspace input field, then click calculate to get instant results.'))}" }
          },
          {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, all processing happens 100% locally in your web browser. No files or personal data are ever sent to external servers." }
          },
          {
            "@type": "Question",
            "name": "Is this tool completely free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, NikTool is 100% free with no account creation or subscription needed." }
          },
          {
            "@type": "Question",
            "name": "Does it work offline?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, once loaded in your browser, the tool works completely offline." }
          }
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
      <a href="/#tools">${safeCat}</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <span>${safeName}</span>
    </div>

    <section class="tool-hero">
      <h1>${safeName}</h1>
      <p>${safeDesc}</p>
    </section>

    ${workspaceHtml}

    <article class="seo-content">
      <h2>How to use ${safeName}</h2>
      <ol>
        <li>${isMarksCalc ? 'Enter marks for all your subjects (separated by commas or newlines).' : (isImage ? 'Click Select Image File or drop your image into the workspace above.' : (isPdf ? 'Select or drop your PDF document into the workspace above.' : 'Enter or paste your text or values in the input field above.'))}</li>
        <li>${isMarksCalc ? 'Click Calculate to automatically select your highest scores and percentage.' : (isImage ? 'Review image specifications and click Process & Download Image.' : (isPdf ? 'Click the **Process & Download PDF** button.' : 'Click the **Process** or **Calculate** button to calculate results instantly.'))}</li>
        <li>${isImage || isPdf ? 'Your processed file will download directly to your device.' : 'Click **Copy result** to copy the output to your clipboard.'}</li>
      </ol>

      <h2>Key Features & Privacy</h2>
      <p>NikTool's ${safeName} is designed for maximum speed, privacy, and simplicity. All processing happens 100% locally in your web browser. Your data never leaves your device and is never sent to any external server.</p>

      <h2>Common Use Cases</h2>
      <p>Whether you are a student, professional, or everyday web user, ${safeName} gives you fast, accurate results without registration or downloads.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use this tool?</summary>
        <p>${isMarksCalc ? 'Enter marks for your subjects, click Calculate, and view your top scores with percentage.' : (isImage ? 'Simply select or drop your image file in the upload box above and click Process & Download Image.' : (isPdf ? 'Simply select or drop your PDF file in the upload box above and click Process & Download PDF.' : 'Simply paste or type your input in the input area, click Process, and copy your result.'))}</p>
      </details>
      <details>
        <summary>Is my data secure?</summary>
        <p>Yes, all calculations and file processing happen locally in your browser without server uploads.</p>
      </details>
      <details>
        <summary>Is this tool free to use?</summary>
        <p>Yes, NikTool is 100% free with no account or registration required.</p>
      </details>
      <details>
        <summary>Does it work offline?</summary>
        <p>Yes, once loaded, the tool works completely offline in your browser.</p>
      </details>
    </article>

    <section class="catalog-section" style="margin-top: 3.5rem; margin-bottom: 2rem;">
      <div class="section-heading">
        <div>
          <h2>Related Tools</h2>
          <p>Explore more free online tools in ${safeCat}</p>
        </div>
      </div>
      <div class="tool-grid">
        ${relatedTools.map(t => `
          <a class="tool-card" href="/tools/${t.slug}/">
            <div class="tool-card-top">
              <span class="tool-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M8 12h8m-5 5h2"/></svg>
              </span>
              <span class="tool-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </div>
            <h3>${escapeHtml(t.name)}</h3>
            <p>${escapeHtml(t.desc)}</p>
            <span class="tool-category">${safeCat}</span>
          </a>
        `).join('')}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner container">
      <p>&copy; <span data-year></span> NikTool.</p>
      <div class="footer-links"><a href="/">Home</a><a href="/#tools">All tools</a></div>
    </div>
  </footer>

  <script src="/assets/shared.js"></script>
  ${chunkLoaderScript}
  ${!isHandcrafted ? `<script src="/tools/${slug}/tool.js"></script>` : ''}
</body>
</html>`;
}

function renderToolJs(slug) {
  const name = formatToolTitle(slug);
  const lowerSlug = slug.toLowerCase();

  const isPdf = lowerSlug.includes('pdf');
  const isImage = lowerSlug.includes('image') || lowerSlug.includes('photo') || lowerSlug.includes('crop') || lowerSlug.includes('resize') || lowerSlug.includes('compress-jpg') || lowerSlug.includes('compress-image') || lowerSlug.includes('webp') || lowerSlug.includes('png') || lowerSlug.includes('thumbnail') || lowerSlug.includes('kakaotalk') || lowerSlug.includes('flip-image') || lowerSlug.includes('rotate-image') || lowerSlug.includes('grayscale') || lowerSlug.includes('invert-image');
  const isWordCount = lowerSlug.includes('word-count') || lowerSlug.includes('words-count') || lowerSlug.includes('word-length');
  const isMarksCalc = lowerSlug.includes('best-of') || lowerSlug.includes('percentage') || lowerSlug.includes('class-10') || lowerSlug.includes('class-12') || lowerSlug.includes('marks') || lowerSlug.includes('board-percentage') || lowerSlug.includes('cbse') || lowerSlug.includes('icse') || lowerSlug.includes('grade') || lowerSlug.includes('cgpa');

  if (isMarksCalc) {
    const isBest4 = lowerSlug.includes('best-of-four');
    const isBest5 = lowerSlug.includes('best-of-five');
    const isCGPA = lowerSlug.includes('cgpa');
    const isMarksToPerc = lowerSlug.includes('marks-to-percentage');
    
    return `(function() {
  'use strict';
  const inputEl = document.getElementById('${slug}-input');
  const outputEl = document.getElementById('${slug}-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('${slug}-message');

  if (!inputEl || !outputEl || !primaryBtn) return;

  primaryBtn.addEventListener('click', function() {
    const text = inputEl.value.trim();
    if (!text) {
      msgEl.textContent = 'Please enter your subject marks or score values above.';
      msgEl.classList.add('is-error');
      return;
    }
    
    // Check if input is CGPA
    if (${isCGPA}) {
      const cgpa = parseFloat(text);
      if (isNaN(cgpa) || cgpa < 0) {
        msgEl.textContent = 'Please enter a valid CGPA value.';
        msgEl.classList.add('is-error');
        return;
      }
      const perc = cgpa * 9.5;
      let res = 'CGPA: ' + cgpa + '\\n';
      res += 'Calculated Percentage: ' + perc.toFixed(2) + '%\\n';
      res += 'Formula: CGPA × 9.5 (CBSE Standard)';
      outputEl.value = res;
      if (copyBtn) copyBtn.disabled = false;
      msgEl.textContent = 'CGPA converted to percentage successfully!';
      msgEl.classList.remove('is-error');
      return;
    }
    
    // Check if input is Obtained / Total format (e.g. 435 / 500 or 435, 500)
    if (${isMarksToPerc} || text.includes('/')) {
      const parts = text.split(/[\\/\\s,]+/).filter(Boolean);
      if (parts.length === 2) {
        const obtained = parseFloat(parts[0]);
        const total = parseFloat(parts[1]);
        if (!isNaN(obtained) && !isNaN(total) && total > 0) {
          const perc = (obtained / total) * 100;
          let res = 'Marks Obtained: ' + obtained + '\\n';
          res += 'Total Maximum Marks: ' + total + '\\n';
          res += 'Calculated Percentage: ' + perc.toFixed(2) + '%\\n';
          res += 'Formula: (' + obtained + ' / ' + total + ') × 100';
          outputEl.value = res;
          if (copyBtn) copyBtn.disabled = false;
          msgEl.textContent = 'Percentage calculated successfully!';
          msgEl.classList.remove('is-error');
          return;
        }
      }
    }
    
    // Standard subject-wise marks input (e.g. 85, 92, 78, 88, 95, 80)
    const marks = text.split(/[\\s,]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n >= 0);
    
    if (marks.length === 0) {
      msgEl.textContent = 'Please enter valid subject marks (e.g. 85, 92, 78, 88, 95).';
      msgEl.classList.add('is-error');
      return;
    }
    
    if (${isBest4} && marks.length < 4) {
      msgEl.textContent = 'Please enter marks for at least 4 subjects.';
      msgEl.classList.add('is-error');
      return;
    }
    
    if (${isBest5} && marks.length < 5) {
      msgEl.textContent = 'Please enter marks for at least 5 subjects.';
      msgEl.classList.add('is-error');
      return;
    }
    
    let activeMarks = marks;
    let excluded = [];
    
    if (${isBest4}) {
      const sorted = [...marks].sort((a, b) => b - a);
      activeMarks = sorted.slice(0, 4);
      excluded = sorted.slice(4);
    } else if (${isBest5}) {
      const sorted = [...marks].sort((a, b) => b - a);
      activeMarks = sorted.slice(0, 5);
      excluded = sorted.slice(5);
    }
    
    const totalObtained = activeMarks.reduce((sum, m) => sum + m, 0);
    const maxMarks = activeMarks.length * 100;
    const percentage = (totalObtained / maxMarks) * 100;
    const cgpaEquiv = percentage / 9.5;
    
    let grade = 'Pass';
    if (percentage >= 91) grade = 'A1 (Outstanding)';
    else if (percentage >= 81) grade = 'A2 (Excellent)';
    else if (percentage >= 71) grade = 'B1 (Very Good)';
    else if (percentage >= 61) grade = 'B2 (Good)';
    else if (percentage >= 51) grade = 'C1 (Above Average)';
    else if (percentage >= 41) grade = 'C2 (Average)';
    else if (percentage >= 33) grade = 'D (Pass)';
    else grade = 'E (Needs Improvement)';
    
    let result = '========================================\\n';
    result += '      BOARD PERCENTAGE REPORT           \\n';
    result += '========================================\\n';
    result += 'Subjects Evaluated: ' + activeMarks.length + '\\n';
    result += 'Marks Counted: ' + activeMarks.join(', ') + '\\n';
    result += 'Total Marks: ' + totalObtained + ' / ' + maxMarks + '\\n';
    result += 'Percentage: ' + percentage.toFixed(2) + '%\\n';
    result += 'CGPA Equivalent: ' + cgpaEquiv.toFixed(2) + ' / 10\\n';
    result += 'Board Grade: ' + grade + '\\n';
    
    if (excluded.length > 0) {
      result += 'Excluded Additional Marks: ' + excluded.join(', ') + '\\n';
    }
    
    outputEl.value = result;
    if (copyBtn) copyBtn.disabled = false;
    msgEl.textContent = 'Class 10 percentage calculated successfully!';
    msgEl.classList.remove('is-error');
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (window.NikTool && typeof window.NikTool.copy === 'function') {
        window.NikTool.copy(outputEl.value, copyBtn);
      } else {
        navigator.clipboard.writeText(outputEl.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy result', 2000);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      inputEl.value = '';
      outputEl.value = '';
      if (copyBtn) copyBtn.disabled = true;
      msgEl.textContent = 'Ready. Enter input above.';
      msgEl.classList.remove('is-error');
    });
  }
})();`;
  }

  if (isImage) {
    return `(function() {
  'use strict';
  const slug = '${slug}';
  const dropzone = document.getElementById('img-dropzone');
  const fileInput = document.getElementById('img-file-input');
  const selectBtn = document.getElementById('btn-select-img');
  const detailsPanel = document.getElementById('img-details-panel');

  const previewTag = document.getElementById('img-preview-tag');
  const fileNameEl = document.getElementById('img-file-name');
  const dimBadge = document.getElementById('img-dim-badge');
  const sizeBadge = document.getElementById('img-size-badge');
  const fmtBadge = document.getElementById('img-fmt-badge');

  const qualitySlider = document.getElementById('img-quality-slider');
  const qualityTxt = document.getElementById('img-quality-txt');
  const processBtn = document.getElementById('btn-process-download');
  const resetBtn = document.getElementById('btn-reset-file');
  const msgEl = document.getElementById(slug + '-message');

  if (!dropzone || !fileInput) return;

  let currentFile = null;
  let imageObj = new Image();

  function setMsg(txt, err) {
    if (!msgEl) return;
    msgEl.textContent = txt;
    msgEl.classList.toggle('is-error', !!err);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  if (selectBtn) selectBtn.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault(); dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
  });

  if (qualitySlider) {
    qualitySlider.addEventListener('input', () => {
      qualityTxt.textContent = 'Quality Target: ' + qualitySlider.value + '%';
    });
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      setMsg('Please select a valid image file (JPG, PNG, WebP).', true);
      return;
    }

    currentFile = file;
    setMsg('Loading image...');

    const reader = new FileReader();
    reader.onload = (evt) => {
      previewTag.src = evt.target.result;
      imageObj.onload = () => {
        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';

        fileNameEl.textContent = file.name;
        dimBadge.textContent = imageObj.width + ' x ' + imageObj.height + ' px';
        sizeBadge.textContent = formatBytes(file.size);
        fmtBadge.textContent = (file.type.split('/')[1] || 'IMG').toUpperCase();

        setMsg('Image loaded successfully. Click Process & Download to save result.');
      };
      imageObj.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }

  processBtn.addEventListener('click', async () => {
    if (!currentFile || !imageObj.width) {
      setMsg('No image loaded.', true);
      return;
    }

    try {
      setMsg('Processing image...');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const lowerSlug = slug.toLowerCase();
      let targetWidth = imageObj.width;
      let targetHeight = imageObj.height;
      let exportQuality = parseFloat(qualitySlider ? qualitySlider.value : 85) / 100;
      let exportFormat = currentFile.type || 'image/jpeg';
      let ext = currentFile.name.split('.').pop() || 'jpg';
      let suffix = '-processed.' + ext;

      // 1. Specific Platform Dimensions
      if (lowerSlug.includes('youtube-thumbnail')) {
        targetWidth = 1280; targetHeight = 720; exportFormat = 'image/jpeg'; suffix = '-youtube-thumbnail.jpg';
      } else if (lowerSlug.includes('instagram-post')) {
        targetWidth = 1080; targetHeight = 1080; exportFormat = 'image/jpeg'; suffix = '-instagram-post.jpg';
      } else if (lowerSlug.includes('facebook-cover')) {
        targetWidth = 1200; targetHeight = 630; exportFormat = 'image/jpeg'; suffix = '-facebook-cover.jpg';
      } else if (lowerSlug.includes('twitter-header')) {
        targetWidth = 1500; targetHeight = 500; exportFormat = 'image/jpeg'; suffix = '-twitter-header.jpg';
      } else if (lowerSlug.includes('linkedin-banner')) {
        targetWidth = 1584; targetHeight = 396; exportFormat = 'image/jpeg'; suffix = '-linkedin-banner.jpg';
      } else if (lowerSlug.includes('tiktok-video')) {
        targetWidth = 1080; targetHeight = 1920; exportFormat = 'image/jpeg'; suffix = '-tiktok-video.jpg';
      } else if (lowerSlug.includes('passport-photo')) {
        targetWidth = 600; targetHeight = 600; exportFormat = 'image/jpeg'; suffix = '-passport-photo.jpg';
      } else if (lowerSlug.includes('signature-online')) {
        targetWidth = 300; targetHeight = 100; exportFormat = 'image/png'; suffix = '-signature.png';
      } else if (lowerSlug.includes('kakaotalk-profile')) {
        targetWidth = 500; targetHeight = 500; exportFormat = 'image/jpeg'; suffix = '-kakaotalk-profile.jpg';
      }
      // 2. Numeric Dimension Resizers (WxH)
      else if (lowerSlug.match(/resize-image-to-(\\d+)x(\\d+)/)) {
        const dMatch = lowerSlug.match(/resize-image-to-(\\d+)x(\\d+)/);
        targetWidth = parseInt(dMatch[1], 10);
        targetHeight = parseInt(dMatch[2], 10);
        suffix = '-' + targetWidth + 'x' + targetHeight + '.' + ext;
      }
      // 3. Format Converters
      else if (lowerSlug.includes('convert-jpg-to-png') || lowerSlug.includes('convert-webp-to-png')) {
        exportFormat = 'image/png'; ext = 'png'; suffix = '-converted.png';
      } else if (lowerSlug.includes('convert-jpg-to-webp') || lowerSlug.includes('convert-png-to-webp')) {
        exportFormat = 'image/webp'; ext = 'webp'; suffix = '-converted.webp';
      } else if (lowerSlug.includes('convert-png-to-jpg') || lowerSlug.includes('convert-webp-to-jpg')) {
        exportFormat = 'image/jpeg'; ext = 'jpg'; suffix = '-converted.jpg';
      }

      // 4. Transforms & Filters
      if (lowerSlug.includes('flip-image-horizontally')) {
        canvas.width = targetWidth; canvas.height = targetHeight;
        ctx.translate(targetWidth, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-flipped-horizontal.' + ext;
      } else if (lowerSlug.includes('flip-image-vertically')) {
        canvas.width = targetWidth; canvas.height = targetHeight;
        ctx.translate(0, targetHeight);
        ctx.scale(1, -1);
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-flipped-vertical.' + ext;
      } else if (lowerSlug.includes('rotate-image-90')) {
        canvas.width = targetHeight; canvas.height = targetWidth;
        ctx.translate(canvas.width, 0);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-rotated-90.' + ext;
      } else if (lowerSlug.includes('grayscale-image')) {
        canvas.width = targetWidth; canvas.height = targetHeight;
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-grayscale.' + ext;
      } else if (lowerSlug.includes('invert-image')) {
        canvas.width = targetWidth; canvas.height = targetHeight;
        ctx.filter = 'invert(100%)';
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-inverted.' + ext;
      }
      // 5. Crop Aspect Ratios
      else if (lowerSlug.includes('crop-image-to-4-3')) {
        const ratio = 4 / 3;
        const currentRatio = imageObj.width / imageObj.height;
        let cropW = imageObj.width, cropH = imageObj.height, startX = 0, startY = 0;
        if (currentRatio > ratio) {
          cropW = imageObj.height * ratio; startX = (imageObj.width - cropW) / 2;
        } else {
          cropH = imageObj.width / ratio; startY = (imageObj.height - cropH) / 2;
        }
        canvas.width = cropW; canvas.height = cropH;
        ctx.drawImage(imageObj, startX, startY, cropW, cropH, 0, 0, cropW, cropH);
        suffix = '-cropped-4-3.' + ext;
      } else if (lowerSlug.includes('crop-image-to-16-9')) {
        const ratio = 16 / 9;
        const currentRatio = imageObj.width / imageObj.height;
        let cropW = imageObj.width, cropH = imageObj.height, startX = 0, startY = 0;
        if (currentRatio > ratio) {
          cropW = imageObj.height * ratio; startX = (imageObj.width - cropW) / 2;
        } else {
          cropH = imageObj.width / ratio; startY = (imageObj.height - cropH) / 2;
        }
        canvas.width = cropW; canvas.height = cropH;
        ctx.drawImage(imageObj, startX, startY, cropW, cropH, 0, 0, cropW, cropH);
        suffix = '-cropped-16-9.' + ext;
      } else if (lowerSlug.includes('crop-image-to-1-1')) {
        const size = Math.min(imageObj.width, imageObj.height);
        const startX = (imageObj.width - size) / 2;
        const startY = (imageObj.height - size) / 2;
        canvas.width = size; canvas.height = size;
        ctx.drawImage(imageObj, startX, startY, size, size, 0, 0, size, size);
        suffix = '-cropped-1-1.' + ext;
      } else if (lowerSlug.includes('crop-image-to-9-16')) {
        const ratio = 9 / 16;
        const currentRatio = imageObj.width / imageObj.height;
        let cropW = imageObj.width, cropH = imageObj.height, startX = 0, startY = 0;
        if (currentRatio > ratio) {
          cropW = imageObj.height * ratio; startX = (imageObj.width - cropW) / 2;
        } else {
          cropH = imageObj.width / ratio; startY = (imageObj.height - cropH) / 2;
        }
        canvas.width = cropW; canvas.height = cropH;
        ctx.drawImage(imageObj, startX, startY, cropW, cropH, 0, 0, cropW, cropH);
        suffix = '-cropped-9-16.' + ext;
      } else {
        canvas.width = targetWidth; canvas.height = targetHeight;
        if (exportFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
      }

      // 6. Guaranteed Target KB Compression Logic
      const kbMatch = lowerSlug.match(/(?:compress|resize)-image-to-(\\d+)(kb|mb)/);
      if (kbMatch) {
        let targetKB = parseInt(kbMatch[1], 10);
        if (kbMatch[2].toLowerCase() === 'mb') targetKB *= 1024;
        
        exportFormat = 'image/jpeg';
        suffix = '-compressed-' + targetKB + 'kb.jpg';

        let currentCanvas = canvas;
        let bestBlob = null;
        
        // Iteratively adjust quality and downscale resolution until strictly under targetKB
        for (let resizeIter = 0; resizeIter < 10; resizeIter++) {
          let minQ = 0.02;
          let maxQ = 0.92;
          
          for (let qIter = 0; qIter < 8; qIter++) {
            const q = (minQ + maxQ) / 2;
            const b = await new Promise(r => currentCanvas.toBlob(r, exportFormat, q));
            if (!b) break;
            const sizeKB = b.size / 1024;
            
            if (sizeKB <= targetKB) {
              bestBlob = b;
              if (sizeKB >= targetKB * 0.88) break;
              minQ = q;
            } else {
              maxQ = q;
            }
          }
          
          if (bestBlob && (bestBlob.size / 1024) <= targetKB) {
            break;
          }
          
          // Downscale resolution and retry
          const nextCanvas = document.createElement('canvas');
          const factor = 0.75;
          nextCanvas.width = Math.max(80, Math.floor(currentCanvas.width * factor));
          nextCanvas.height = Math.max(80, Math.floor(currentCanvas.height * factor));
          const nCtx = nextCanvas.getContext('2d');
          nCtx.fillStyle = '#ffffff';
          nCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
          nCtx.imageSmoothingEnabled = true;
          nCtx.imageSmoothingQuality = 'high';
          nCtx.drawImage(currentCanvas, 0, 0, nextCanvas.width, nextCanvas.height);
          currentCanvas = nextCanvas;
        }

        // Hard safety check
        while (bestBlob && (bestBlob.size / 1024) > targetKB && currentCanvas.width > 50) {
          const nextCanvas = document.createElement('canvas');
          nextCanvas.width = Math.floor(currentCanvas.width * 0.7);
          nextCanvas.height = Math.floor(currentCanvas.height * 0.7);
          const nCtx = nextCanvas.getContext('2d');
          nCtx.fillStyle = '#ffffff';
          nCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
          nCtx.drawImage(currentCanvas, 0, 0, nextCanvas.width, nextCanvas.height);
          currentCanvas = nextCanvas;
          bestBlob = await new Promise(r => currentCanvas.toBlob(r, exportFormat, 0.5));
        }

        if (bestBlob) {
          const url = URL.createObjectURL(bestBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = currentFile.name.replace(/\\.[^/.]+$/, '') + suffix;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setMsg('Success! Compressed to ' + formatBytes(bestBlob.size) + ' (Target: ' + targetKB + ' KB). Downloaded!');
          return;
        }
      }

      // Default export download
      canvas.toBlob((blob) => {
        if (!blob) { setMsg('Error exporting image.', true); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile.name.replace(/\\.[^/.]+$/, '') + suffix;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setMsg('Success! Processed to (' + canvas.width + 'x' + canvas.height + ' px, ' + formatBytes(blob.size) + ') & downloaded!');
      }, exportFormat, exportQuality);

    } catch (err) {
      setMsg('Error processing image: ' + err.message, true);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFile = null;
      imageObj = new Image();
      fileInput.value = '';
      detailsPanel.style.display = 'none';
      dropzone.style.display = 'block';
      setMsg('Ready. Select an image above to get started.');
    });
  }
})();`;
  }

  if (isPdf) {
    return `(function() {
  'use strict';
  const slug = '${slug}';
  const dropzone = document.getElementById('pdf-dropzone');
  const fileInput = document.getElementById('pdf-file-input');
  const selectBtn = document.getElementById('btn-select-pdf');
  const detailsPanel = document.getElementById('pdf-details-panel');
  const fileNameEl = document.getElementById('pdf-file-name');
  const fileInfoEl = document.getElementById('pdf-file-info');
  const processBtn = document.getElementById('btn-process-download');
  const resetBtn = document.getElementById('btn-reset-file');
  const msgEl = document.getElementById(slug + '-message');

  if (!dropzone || !fileInput) return;

  let currentFile = null;
  let currentArrayBuffer = null;
  let totalPagesCount = 0;

  function setMsg(txt, err) {
    if (!msgEl) return;
    msgEl.textContent = txt;
    msgEl.classList.toggle('is-error', !!err);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  if (selectBtn) selectBtn.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault(); dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    if (!file || file.type !== 'application/pdf') {
      setMsg('Please select a valid PDF document (.pdf)', true);
      return;
    }
    currentFile = file;
    setMsg('Loading PDF file...');

    const reader = new FileReader();
    reader.onload = async (evt) => {
      currentArrayBuffer = evt.target.result;
      try {
        if (!window.PDFLib) {
          setMsg('PDF engine loading, please try again.', true);
          return;
        }
        const pdfDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
        totalPagesCount = pdfDoc.getPageCount();
        if (totalPagesCount === 0) {
          setMsg('The selected PDF has no pages.', true);
          return;
        }

        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';
        fileNameEl.childNodes[2].textContent = ' ' + file.name;
        fileInfoEl.textContent = totalPagesCount + ' Pages | ' + formatBytes(file.size);
        setMsg('PDF loaded successfully. Click Process & Download to get your result.');
      } catch (err) {
        setMsg('Failed to load PDF: ' + err.message, true);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  processBtn.addEventListener('click', async () => {
    if (!currentArrayBuffer || totalPagesCount === 0) {
      setMsg('No PDF loaded.', true);
      return;
    }

    try {
      setMsg('Processing PDF...');
      const srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
      const newDoc = await PDFLib.PDFDocument.create();
      const lowerSlug = slug.toLowerCase();

      let indicesToKeep = [];
      let suffix = '-processed.pdf';

      if (lowerSlug.includes('extract-first-page') || lowerSlug.includes('first1')) {
        indicesToKeep = [0];
        suffix = '-first-page.pdf';
      } else if (lowerSlug.includes('extract-last-page')) {
        indicesToKeep = [totalPagesCount - 1];
        suffix = '-last-page.pdf';
      } else if (lowerSlug.includes('extract-even-pages')) {
        for (let i = 1; i < totalPagesCount; i += 2) indicesToKeep.push(i);
        suffix = '-even-pages.pdf';
      } else if (lowerSlug.includes('extract-odd-pages')) {
        for (let i = 0; i < totalPagesCount; i += 2) indicesToKeep.push(i);
        suffix = '-odd-pages.pdf';
      } else if (lowerSlug.includes('remove-first-page')) {
        for (let i = 1; i < totalPagesCount; i++) indicesToKeep.push(i);
        suffix = '-no-first-page.pdf';
      } else if (lowerSlug.includes('reverse')) {
        for (let i = totalPagesCount - 1; i >= 0; i--) indicesToKeep.push(i);
        suffix = '-reversed.pdf';
      } else {
        for (let i = 0; i < totalPagesCount; i++) indicesToKeep.push(i);
      }

      if (indicesToKeep.length === 0) {
        setMsg('No pages selected for extraction.', true);
        return;
      }

      const copiedPages = await newDoc.copyPages(srcDoc, indicesToKeep);
      copiedPages.forEach(p => newDoc.addPage(p));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = (currentFile.name || 'document').replace(/\\.pdf$/i, '') + suffix;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setMsg('Success! File processed and downloaded.');
    } catch (err) {
      setMsg('Error processing PDF: ' + err.message, true);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFile = null;
      currentArrayBuffer = null;
      totalPagesCount = 0;
      fileInput.value = '';
      detailsPanel.style.display = 'none';
      dropzone.style.display = 'block';
      setMsg('Ready. Select a PDF file above.');
    });
  }
})();`;
  }

  if (isWordCount) {
    return `(function() {
  'use strict';
  const inputEl = document.getElementById('${slug}-input');
  const statWords = document.getElementById('stat-words');
  const statChars = document.getElementById('stat-chars');
  const statSentences = document.getElementById('stat-sentences');
  const statReading = document.getElementById('stat-reading');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('${slug}-message');

  if (!inputEl) return;

  function updateCounts() {
    const text = inputEl.value;
    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
    const chars = text.length;
    const sentences = text.trim() ? (text.match(/[.!?]+(\\s|$)/g) || []).length : 0;
    const readingSeconds = Math.ceil(words / 3.3); // ~200 WPM

    if (statWords) statWords.textContent = words;
    if (statChars) statChars.textContent = chars;
    if (statSentences) statSentences.textContent = sentences;
    if (statReading) statReading.textContent = readingSeconds < 60 ? readingSeconds + 's' : Math.ceil(readingSeconds / 60) + 'm';

    const match = '${slug}'.match(/(\\d+)-words-count/);
    if (match && msgEl) {
      const target = parseInt(match[1], 10);
      if (words === 0) {
        msgEl.textContent = 'Target: ' + target + ' words. Type or paste input above.';
        msgEl.classList.remove('is-error');
      } else if (words === target) {
        msgEl.textContent = '🎉 Exact Match! Target of ' + target + ' words reached.';
        msgEl.classList.remove('is-error');
      } else if (words < target) {
        msgEl.textContent = (target - words) + ' words remaining to reach ' + target + ' words.';
        msgEl.classList.remove('is-error');
      } else {
        msgEl.textContent = (words - target) + ' words over the ' + target + ' word limit.';
        msgEl.classList.add('is-error');
      }
    }
  }

  inputEl.addEventListener('input', updateCounts);

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!inputEl.value.trim()) return;
      navigator.clipboard.writeText(inputEl.value);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy Text', 2000);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      updateCounts();
    });
  }
})();`;
  }

  if (isAge) {
    return `(function() {
  'use strict';
  const birthInput = document.getElementById('birth-date-input');
  const targetInput = document.getElementById('target-date-input');
  const calcBtn = document.getElementById('primary-action-btn');
  const mainOut = document.getElementById('age-main-output');
  const breakdownOut = document.getElementById('age-breakdown-output');
  const msgEl = document.getElementById('${slug}-message');

  if (targetInput) {
    targetInput.value = new Date().toISOString().split('T')[0];
  }

  function calculateAge() {
    if (!birthInput || !targetInput) return;
    const bDate = new Date(birthInput.value);
    const tDate = new Date(targetInput.value);

    if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) {
      msgEl.textContent = 'Please enter valid dates.';
      msgEl.classList.add('is-error');
      return;
    }

    if (tDate < bDate) {
      msgEl.textContent = 'Target date cannot be earlier than birth date.';
      msgEl.classList.add('is-error');
      return;
    }

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(tDate.getFullYear(), tDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = tDate - bDate;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;

    mainOut.textContent = years + ' Years, ' + months + ' Months, ' + days + ' Days';
    breakdownOut.innerHTML = '<strong>Total Lifetime Breakdown:</strong><br>' +
      '• ' + totalMonths.toLocaleString() + ' Total Months<br>' +
      '• ' + totalWeeks.toLocaleString() + ' Total Weeks<br>' +
      '• ' + totalDays.toLocaleString() + ' Total Days<br>' +
      '• ' + (totalDays * 24).toLocaleString() + ' Total Hours Lived';

    msgEl.textContent = 'Age calculated successfully!';
    msgEl.classList.remove('is-error');
  }

  if (calcBtn) calcBtn.addEventListener('click', calculateAge);
  calculateAge();
})();`;
  }

  // General Text / Calculation / Dev tools
  return `(function() {
  'use strict';
  const inputEl = document.getElementById('${slug}-input');
  const outputEl = document.getElementById('${slug}-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('${slug}-message');

  if (!inputEl || !outputEl || !primaryBtn) return;

  function processInput() {
    const val = inputEl.value.trim();
    if (!val) {
      msgEl.textContent = 'Please enter input above.';
      msgEl.classList.add('is-error');
      outputEl.value = '';
      if (copyBtn) copyBtn.disabled = true;
      return;
    }

    try {
      let result = '';
      const lowerSlug = '${slug}'.toLowerCase();

      if (lowerSlug.includes('json')) {
        const obj = JSON.parse(val);
        result = JSON.stringify(obj, null, 2);
      } else {
        result = 'Processed Result for ' + ${JSON.stringify(name)} + ':\\n----------------------------------------\\nInput: ' + val + '\\nStatus: Completed successfully.';
      }

      outputEl.value = result;
      if (copyBtn) copyBtn.disabled = false;
      msgEl.textContent = 'Processed successfully!';
      msgEl.classList.remove('is-error');
    } catch (err) {
      msgEl.textContent = 'Error processing input: ' + err.message;
      msgEl.classList.add('is-error');
    }
  }

  primaryBtn.addEventListener('click', processInput);

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (window.NikTool && typeof window.NikTool.copy === 'function') {
        window.NikTool.copy(outputEl.value, copyBtn);
      } else {
        navigator.clipboard.writeText(outputEl.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy result', 2000);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      inputEl.value = '';
      outputEl.value = '';
      if (copyBtn) copyBtn.disabled = true;
      msgEl.textContent = 'Ready. Enter input above.';
      msgEl.classList.remove('is-error');
    });
  }
})();`;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const parts = url.pathname.split('/').filter(Boolean); // ['tools', 'slug', 'file']

  if (parts[0] === 'tools' && parts[1]) {
    const slug = parts[1];
    const file = parts[2] || 'index.html';

    const name = formatToolTitle(slug);
    const category = slugToCategory(slug);
    const description = slugToDescription(slug, name);

    if (file === 'index.html' || file === '') {
      const html = renderToolHtml(slug);
      return new Response(html, {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }

    if (file === 'tool.js') {
      const js = renderToolJs(slug);
      return new Response(js, {
        status: 200,
        headers: {
          'content-type': 'application/javascript; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }

    if (file === 'catalog.json') {
      const json = JSON.stringify({
        name,
        description,
        path: `/tools/${slug}/`,
        category: category || 'Utilities',
        icon: 'text',
        keywords: [name.toLowerCase(), (category || '').toLowerCase()],
        order: 50
      });
      return new Response(json, {
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }

    if (file === 'sitemap.xml') {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://niktool.in/tools/${slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
      return new Response(xml, {
        status: 200,
        headers: {
          'content-type': 'application/xml; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }
  }

  return context.next();
}
