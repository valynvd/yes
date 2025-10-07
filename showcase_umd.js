(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ShowcaseAd = factory();
}(this, function () {

  function createAd(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    container.innerHTML = '';

    const img = document.createElement('img');
    img.src = config.image;
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    img.style.cursor = 'pointer';
    img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';

    img.onclick = () => window.open(config.clickUrl, '_blank');
    container.appendChild(img);
  }

  return { createAd };
}));
