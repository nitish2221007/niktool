(() => {
  'use strict';
  const vmEl = document.getElementById('lg-vmass'), vlEl = document.getElementById('lg-vlen');
  const ilEl = document.getElementById('lg-ilen'), rtEl = document.getElementById('lg-ratio');
  const imResEl = document.getElementById('lg-res-imass'), pmResEl = document.getElementById('lg-res-pmol');

  function update() {
    const vector_ng = parseFloat(vmEl.value), vector_bp = parseFloat(vlEl.value);
    const insert_bp = parseFloat(ilEl.value), ratio = parseFloat(rtEl.value);

    if (isNaN(vector_ng) || isNaN(vector_bp) || isNaN(insert_bp) || vector_ng <= 0 || vector_bp <= 0 || insert_bp <= 0) return;

    // Ligation formula: Insert Mass (ng) = Vector Mass (ng) * ( Insert Length / Vector Length ) * Molar Ratio
    const insert_ng = vector_ng * (insert_bp / vector_bp) * ratio;

    // Picomoles = ( Mass in ng * 1000 ) / ( Length in bp * 650 daltons/bp )
    const pmol_vector = (vector_ng * 1000.0) / (vector_bp * 650.0);
    const pmol_insert = (insert_ng * 1000.0) / (insert_bp * 650.0);

    imResEl.textContent = 'Required Insert Mass = ' + insert_ng.toFixed(1) + ' ng';
    pmResEl.textContent = 'Vector: ' + pmol_vector.toFixed(3) + ' pmol (' + vector_ng + ' ng) | Insert: ' + pmol_insert.toFixed(3) + ' pmol (' + insert_ng.toFixed(1) + ' ng @ ' + ratio + ':1 Ratio)';
  }

  [vmEl, vlEl, ilEl].forEach(el => el.addEventListener('input', update));
  rtEl.addEventListener('change', update);
  update();
})();