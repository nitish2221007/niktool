const scientists = [
  { scientist: "Johannes Kepler", discovery: "Laws of planetary motion", country: "Germany" },
  { scientist: "Galileo Galilei", discovery: "Law of inertia", country: "Italy" },
  { scientist: "Isaac Newton", discovery: "Universal gravitation, Laws of motion", country: "UK" },
  { scientist: "C.V. Raman", discovery: "Inelastic scattering of light (Raman Effect)", country: "India" },
  { scientist: "Albert Einstein", discovery: "Theory of relativity, Photoelectric effect", country: "Germany/USA" },
  { scientist: "Niels Bohr", discovery: "Quantum model of hydrogen atom", country: "Denmark" },
  { scientist: "Michael Faraday", discovery: "Electromagnetic induction", country: "UK" },
  { scientist: "James Clerk Maxwell", discovery: "Electromagnetic theory", country: "UK" },
  { scientist: "Heinrich Hertz", discovery: "Electromagnetic waves", country: "Germany" },
  { scientist: "Marie Curie", discovery: "Radioactivity", country: "Poland/France" },
  { scientist: "Ernest Rutherford", discovery: "Nuclear model of atom", country: "New Zealand/UK" },
  { scientist: "Werner Heisenberg", discovery: "Quantum mechanics (Uncertainty principle)", country: "Germany" },
  { scientist: "S.N. Bose", discovery: "Quantum statistics (Bose-Einstein condensate)", country: "India" },
  { scientist: "Meghnad Saha", discovery: "Thermal ionization", country: "India" },
  { scientist: "Homi J. Bhabha", discovery: "Cosmic rays, nuclear energy", country: "India" },
  { scientist: "J. Robert Oppenheimer", discovery: "Nuclear fission", country: "USA" },
  { scientist: "Enrico Fermi", discovery: "Nuclear reactor", country: "Italy/USA" },
  { scientist: "Edwin Hubble", discovery: "Expanding universe", country: "USA" },
  { scientist: "Subrahmanyan Chandrasekhar", discovery: "Chandrasekhar limit (stellar evolution)", country: "India/USA" },
  { scientist: "Abdus Salam", discovery: "Unification of weak and electromagnetic interactions", country: "Pakistan" },
  { scientist: "Hideki Yukawa", discovery: "Theory of nuclear forces (mesons)", country: "Japan" },
  { scientist: "C.F. Powell", discovery: "Discovery of pi-meson", country: "UK" },
  { scientist: "Paul Dirac", discovery: "Quantum electrodynamics", country: "UK" },
  { scientist: "Richard Feynman", discovery: "Quantum electrodynamics", country: "USA" }
];

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('ncert-discovery-matrix-input');
  const output = document.getElementById('ncert-discovery-matrix-output');
  const processBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msg = document.getElementById('ncert-discovery-matrix-message');

  processBtn.addEventListener('click', () => {
    const query = input.value.trim().toLowerCase();
    if (query === '') {
      let result = "NCERT Class 11 Physics Scientists Database:\n\n";
      scientists.forEach(s => {
        result += `${s.scientist} - ${s.discovery} (${s.country})\n`;
      });
      output.value = result;
      msg.textContent = "Showing full database.";
    } else if (query === 'quiz') {
      const random = scientists[Math.floor(Math.random() * scientists.length)];
      output.value = `Quiz Question:\nWhich discovery is attributed to ${random.scientist}?\n\nAnswer:\n${random.discovery} (${random.country})`;
      msg.textContent = "Quiz mode active! Type a scientist's name or click Process again.";
    } else {
      const matches = scientists.filter(s => 
        s.scientist.toLowerCase().includes(query) || 
        s.discovery.toLowerCase().includes(query) ||
        s.country.toLowerCase().includes(query)
      );
      if (matches.length === 0) {
        output.value = "No scientists found matching your query. Try another name or discovery.";
        msg.textContent = "No results found.";
      } else {
        let result = `Found ${matches.length} result(s):\n\n`;
        matches.forEach(s => {
          result += `${s.scientist} - ${s.discovery} (${s.country})\n`;
        });
        output.value = result;
        msg.textContent = `Found ${matches.length} scientist(s).`;
      }
    }
    copyBtn.disabled = false;
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && window.NikTool.copy) {
      window.NikTool.copy(output.value, copyBtn);
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    output.value = '';
    copyBtn.disabled = true;
    msg.textContent = "Ready. Enter a scientist's name, discovery, or type 'quiz'.";
  });
});
