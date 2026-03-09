/**
 * Navbar Component for Version 1.0.2
 */

import { i18n, languages, currentLanguage } from '../../core/i18n/i18n.js';
import { themeManager } from '../../core/theme/theme-manager.js';
import { versionConfig } from '../../core/version/version-config.js';

class Navbar {
  constructor() {
    this.initElements();
    this.init();
  }

  initElements() {
    this.navbar = document.getElementById('navbar');
    this.languageSwitcher = document.getElementById('language-switcher');
    this.languageDropdown = document.getElementById('language-dropdown');
    this.currentLanguageFlag = document.getElementById('current-language-flag');
    this.currentLanguageName = document.getElementById('current-language-name');
    this.themeToggle = document.getElementById('theme-toggle');
    this.historyDropdown = document.getElementById('history-dropdown');
    this.historyMenu = document.getElementById('history-menu');
    this.versionDropdownList = document.getElementById('version-dropdown-list');
  }

  async init() {
    this.initLanguageSwitcher();
    this.initThemeToggle();
    this.initHistoryDropdown();
    this.initActiveLink();
    this.initTranslations();
  }

  initLanguageSwitcher() {
    this.updateCurrentLanguage();
    this.generateLanguageOptions();

    if (this.languageSwitcher) {
      this.languageSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown(this.languageSwitcher, this.languageDropdown);
      });
    }

    document.addEventListener('click', () => {
      this.closeDropdown(this.languageSwitcher, this.languageDropdown);
    });
  }

  updateCurrentLanguage() {
    const lang = languages.find(l => l.code === currentLanguage);
    if (lang && this.currentLanguageFlag && this.currentLanguageName) {
      this.currentLanguageFlag.textContent = lang.flag;
      this.currentLanguageName.textContent = lang.name;
    }
  }

  generateLanguageOptions() {
    if (!this.languageDropdown) return;

    this.languageDropdown.innerHTML = '';
    languages.forEach(lang => {
      const button = document.createElement('button');
      button.className = `dropdown-item ${lang.code === currentLanguage ? 'selected' : ''}`;
      button.innerHTML = `
        <span>${lang.flag}</span>
        <span>${lang.name}</span>
      `;
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        i18n.setLanguage(lang.code);
        this.closeDropdown(this.languageSwitcher, this.languageDropdown);
      });
      this.languageDropdown.appendChild(button);
    });
  }

  initHistoryDropdown() {
    this.generateVersionList();

    if (this.historyDropdown) {
      this.historyDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown(this.historyDropdown, this.historyMenu);
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.history-dropdown')) {
        this.closeDropdown(this.historyDropdown, this.historyMenu);
      }
    });
  }

  generateVersionList() {
    if (!this.versionDropdownList) return;

    this.versionDropdownList.innerHTML = '';
    const sortedVersions = [...versionConfig.versions].reverse();

    sortedVersions.forEach(version => {
      const isCurrent = version.id === versionConfig.currentVersion.id;
      const item = document.createElement('div');
      item.className = 'version-dropdown-item';

      item.innerHTML = `
        <span class="version-id">${version.id}</span>
        <span class="version-date">${version.date}</span>
        <span class="version-name">${version.name}</span>
        ${isCurrent ? '<span class="version-badge current">Current</span>' : ''}
      `;

      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeDropdown(this.historyDropdown, this.historyMenu);

        if (isCurrent) {
          window.location.href = '/versions/1.0.2/';
        } else {
          this.switchToVersion(version);
        }
      });

      this.versionDropdownList.appendChild(item);
    });
  }

  switchToVersion(version) {
    this.showVersionTransition(version);
  }

  showVersionTransition(version) {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'version-transition';
    transitionElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
      overflow: hidden;
    `;

    const lineLeft = document.createElement('div');
    lineLeft.style.cssText = `
      position: absolute;
      top: 0;
      left: -50%;
      width: 50%;
      height: 100%;
      background-color: ${versionConfig.transition.colors.lineLeft};
      transition: transform ${versionConfig.transition.animationDuration}ms ease-in-out;
    `;

    const lineRight = document.createElement('div');
    lineRight.style.cssText = `
      position: absolute;
      top: 0;
      right: -50%;
      width: 50%;
      height: 100%;
      background-color: ${versionConfig.transition.colors.lineRight};
      transition: transform ${versionConfig.transition.animationDuration}ms ease-in-out;
    `;

    const brandText = document.createElement('div');
    brandText.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      font-weight: bold;
      color: ${versionConfig.transition.colors.text};
      opacity: 0;
      transition: opacity ${versionConfig.transition.animationDuration / 2}ms ease-in-out;
      transition-delay: ${versionConfig.transition.animationDuration / 2}ms;
    `;
    brandText.textContent = 'ceaserlab';

    transitionElement.appendChild(lineLeft);
    transitionElement.appendChild(lineRight);
    transitionElement.appendChild(brandText);
    document.body.appendChild(transitionElement);

    setTimeout(() => {
      lineLeft.style.transform = 'translateX(100%)';
      lineRight.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        brandText.style.opacity = '1';

        setTimeout(() => {
          brandText.style.opacity = '0';

          setTimeout(() => {
            lineLeft.style.transform = 'translateX(200%)';
            lineRight.style.transform = 'translateX(-200%)';

            setTimeout(() => {
              window.location.href = `/versions/${version.id}/`;
            }, versionConfig.transition.animationDuration / 2);
          }, versionConfig.transition.animationDuration / 2);
        }, versionConfig.transition.animationDuration / 2);
      }, versionConfig.transition.animationDuration);
    }, 100);
  }

  toggleDropdown(trigger, menu) {
    const isActive = trigger.classList.contains('active');
    this.closeAllDropdowns();
    if (!isActive) {
      trigger.classList.add('active');
    }
  }

  closeDropdown(trigger, menu) {
    trigger.classList.remove('active');
  }

  closeAllDropdowns() {
    this.languageSwitcher.classList.remove('active');
    this.historyDropdown.classList.remove('active');
  }

  initThemeToggle() {
    this.updateThemeIcon();

    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        themeManager.toggle();
      });
    }
  }

  updateThemeIcon() {
    themeManager.updateThemeIcon();
  }

  initActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.navbar.querySelectorAll('.nav-link');

    links.forEach(link => {
      if (link.getAttribute('href') === currentPath || (currentPath === '/versions/1.0.2/' && link.getAttribute('href') === '/versions/1.0.2/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  initTranslations() {
    const elements = this.navbar.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });
  }
}

export { Navbar };