(function() {
  'use strict';
  var slug = 'parts-of-speech-checker';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  var DICT = {
    noun: ['cat','dog','house','school','book','teacher','student','water','city','idea','happiness','freedom','mountain','river','computer'],
    verb: ['run','walk','eat','write','read','think','play','study','learn','teach','build','create','help','make','go'],
    adjective: ['beautiful','happy','sad','big','small','fast','slow','bright','dark','tall','short','old','new','good','bad'],
    adverb: ['quickly','slowly','happily','sadly','carefully','loudly','softly','always','never','often','sometimes','here','there','now','then'],
    pronoun: ['i','you','he','she','it','we','they','me','him','her','us','them','my','your','his','this'],
    preposition: ['in','on','at','by','with','from','to','of','for','about','between','under','over','through','during'],
    conjunction: ['and','but','or','so','because','although','while','if','unless','since','until','when','where','that','whether'],
    interjection: ['oh','wow','hey','alas','hurrah','bravo','oops','ah','ouch','yay']
  };
  btn.addEventListener('click', function() {
    var word = inputEl.value.trim().toLowerCase();
    if (!word) { setMsg('Please enter a word.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var found = [];
    for (var type in DICT) {
      if (DICT[type].indexOf(word) !== -1) found.push(type);
    }
    var out = 'Word: "' + inputEl.value.trim() + '"\n\n';
    if (found.length > 0) {
      out += 'Part(s) of Speech: ' + found.map(function(f){ return f.charAt(0).toUpperCase() + f.slice(1); }).join(', ') + '\n\n';
      out += 'Definition:\n';
      if (found.indexOf('noun') !== -1) out += '- Noun: A person, place, thing, or idea.\n';
      if (found.indexOf('verb') !== -1) out += '- Verb: An action or state of being.\n';
      if (found.indexOf('adjective') !== -1) out += '- Adjective: Describes/modifies a noun.\n';
      if (found.indexOf('adverb') !== -1) out += '- Adverb: Modifies a verb, adjective, or adverb.\n';
      if (found.indexOf('pronoun') !== -1) out += '- Pronoun: Replaces a noun.\n';
      if (found.indexOf('preposition') !== -1) out += '- Preposition: Shows relationship between words.\n';
      if (found.indexOf('conjunction') !== -1) out += '- Conjunction: Connects words or clauses.\n';
      if (found.indexOf('interjection') !== -1) out += '- Interjection: Expresses emotion.\n';
    } else {
      out += 'This word is not in the common school dictionary.\n\n';
      out += 'Tips to identify parts of speech:\n';
      out += '- Can you put "the" or "a" before it? → Likely a Noun\n';
      out += '- Can you put "to" before it? → Likely a Verb\n';
      out += '- Does it describe a noun? → Likely an Adjective\n';
      out += '- Does it describe a verb? → Likely an Adverb\n';
      out += '- Does it end in -ly? → Likely an Adverb';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Part of speech identified.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
