/**
 * Version 1.0.2 Main Script
 * Component-based implementation
 */

import { i18n } from './core/i18n/i18n.js';
import { themeManager } from './core/theme/theme-manager.js';
import { versionConfig } from './core/version/version-config.js';
import { Navbar } from './components/navbar/navbar.js';
import { Gallery } from './components/gallery/gallery.js';
import { Contact } from './components/contact/contact.js';
import { Timeline } from './components/timeline/timeline.js';

// ==================== Main Page ====================
class HomePage {
  constructor() {
    this.init();
  }

  async init() {
    // Load saved language
    const savedLang = localStorage.getItem('language') || 'en';
    i18n.setLanguage(savedLang);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    themeManager.setTheme(savedTheme);

    new Navbar();
    await this.initGallery();
    new Contact();
    new Timeline();

    // Update translations
    this.updateTranslations();

    // Listen for language changes
    // Version 1.0.2 i18n doesn't support onChange, so we'll skip this
  }

  updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });
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