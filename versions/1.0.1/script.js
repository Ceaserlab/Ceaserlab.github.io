/**
 * Version 1.0.1 Main Script
 * Component-based implementation
 */

import { i18n } from '/src/core/i18n/i18n.js';
import { themeManager } from '/src/core/theme/theme-manager.js';
import { versionManager } from '/src/core/version/version-manager.js';
import { Navbar } from '/src/components/navbar/navbar.js';
import { Gallery } from './components/gallery/gallery.js';
import { Contact } from './components/contact/contact.js';
import { Timeline } from './components/timeline/timeline.js';

// ==================== Main Page ====================
class HomePage {
  constructor() {
    this.init();
  }

  async init() {
    new Navbar();
    await this.initGallery();
    new Contact();
    new Timeline();

    // Load saved language
    const savedLang = localStorage.getItem('ceaser-language') || 'en';
    i18n.setLanguage(savedLang);

    // Load saved theme
    const savedTheme = localStorage.getItem('ceaser-theme') || 'dark';
    themeManager.setTheme(savedTheme);
  }

  async initGallery() {
    try {
      const response = await fetch('/assets/data/gallery-data.json');
      const data = await response.json();
      new Gallery('gallery-container', data.images);
    } catch (error) {
      console.error('Failed to load gallery:', error);
    }
  }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
  new HomePage();
});