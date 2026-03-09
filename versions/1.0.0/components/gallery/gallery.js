/**
 * Gallery Component for Version 1.0.0
 */

class Gallery {
  constructor(containerId, images) {
    this.container = document.getElementById(containerId);
    this.images = images;
    if (this.container) {
      this.render();
    }
  }

  render() {
    const section = document.createElement('section');
    section.className = 'gallery-section section';
    section.innerHTML = `
      <div class="container">
        <h2 data-i18n="gallery.title">Gallery</h2>
        <div class="gallery-grid">
          ${this.images.map(img => `
            <div class="gallery-item">
              <img src="${img.src}" alt="${img.alt}" loading="lazy">
              <div class="gallery-caption">${img.caption || ''}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const afterSection = document.querySelector('.timeline-section');
    if (afterSection && afterSection.parentNode) {
      afterSection.parentNode.insertBefore(section, afterSection.nextSibling);
    }
  }
}

export { Gallery };