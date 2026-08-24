(() => {
  'use strict';
  const ipEl = document.getElementById('sub-ip'), cidrEl = document.getElementById('sub-cidr');
  const netEl = document.getElementById('sub-res-net'), bcastEl = document.getElementById('sub-res-bcast');
  const maskEl = document.getElementById('sub-res-mask'), useEl = document.getElementById('sub-res-usable');
  const rangeEl = document.getElementById('sub-res-range');

  function ipToNum(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }

  function numToIp(num) {
    return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
  }

  function update() {
    const rawIp = ipEl.value.trim();
    const cidr = parseInt(cidrEl.value, 10);
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(rawIp)) return;

    const ipNum = ipToNum(rawIp);
    const maskNum = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = Math.max(0, totalHosts - 2);

    netEl.textContent = numToIp(netNum);
    bcastEl.textContent = numToIp(bcastNum);
    maskEl.textContent = numToIp(maskNum);
    useEl.textContent = usableHosts.toLocaleString();

    if (usableHosts > 0) {
      rangeEl.textContent = numToIp(netNum + 1) + ' — ' + numToIp(bcastNum - 1);
    } else {
      rangeEl.textContent = numToIp(netNum) + ' (Point-to-Point / Host route)';
    }
  }

  ipEl.addEventListener('input', update);
  cidrEl.addEventListener('change', update);
  update();
})();