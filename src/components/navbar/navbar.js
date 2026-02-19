/**
 * Navbar Component Logic (Updated)
 * 导航栏逻辑（更新版）- 支持 History 下拉菜单
 */

import { i18n } from '../../core/i18n/i18n.js';
import { themeManager } from '../../core/theme/theme-manager.js';
import { i18nConfig } from '../../config/i18n.config.js';
import { versionConfig } from '../../config/version.config.js';

class Navbar {
  constructor() {
    this.initElements();
    this.init();
  }

  /**
   * 初始化 DOM 元素引用
   */
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

    // 调试：检查 language-switcher 的子元素
    if (this.languageSwitcher) {
      console.log('language-switcher children:', this.languageSwitcher.children.length);
      console.log('language-switcher innerHTML:', this.languageSwitcher.innerHTML.substring(0, 800));
    }

    // 调试日志
    console.log('Navbar initialized');
    console.log('navbar element:', this.navbar);
    console.log('languageSwitcher element:', this.languageSwitcher);
    console.log('languageDropdown element:', this.languageDropdown);
    console.log('themeToggle element:', this.themeToggle);
    console.log('historyDropdown element:', this.historyDropdown);
  }

  /**
   * 初始化导航栏
   */
  async init() {
    // 等待 i18n 初始化完成
    if (!i18n.translations[i18n.currentLanguage]) {
      await i18n.init();
    }

    await this.initLanguageSwitcher();
    this.initThemeToggle();
    this.initHistoryDropdown();
    this.initActiveLink();
    this.initTranslations();
  }

  /**
   * 初始化语言切换器
   */
  async initLanguageSwitcher() {
    console.log('initLanguageSwitcher called');
    console.log('languageSwitcher:', this.languageSwitcher);
    console.log('languageDropdown:', this.languageDropdown);

    // 更新当前语言显示
    this.updateCurrentLanguage();

    // 生成语言选项
    this.generateLanguageOptions();

    // 绑定点击事件
    if (this.languageSwitcher) {
      this.languageSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown(this.languageSwitcher, this.languageDropdown);
      });
    }

    // 点击外部关闭下拉菜单
    document.addEventListener('click', () => {
      this.closeDropdown(this.languageSwitcher, this.languageDropdown);
    });

    // 监听语言变化
    i18n.onChange((language) => {
      this.updateCurrentLanguage();
      this.generateLanguageOptions();
    });
  }

  /**
   * 更新当前语言显示
   */
  updateCurrentLanguage() {
    const langConfig = i18n.getLanguageConfig();
    if (langConfig && this.currentLanguageFlag && this.currentLanguageName) {
      this.currentLanguageFlag.textContent = langConfig.flag;
      this.currentLanguageName.textContent = langConfig.name;
    }
  }

  /**
   * 生成语言选项
   */
  generateLanguageOptions() {
    if (!this.languageDropdown) {
      console.error('languageDropdown is null');
      return;
    }
    this.languageDropdown.innerHTML = '';
    const languages = i18n.getAllLanguages();

    languages.forEach(lang => {
      const button = document.createElement('button');
      button.className = `dropdown-item ${lang.code === i18n.currentLanguage ? 'selected' : ''}`;
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

  /**
   * 初始化历史版本下拉菜单
   */
  initHistoryDropdown() {
    // 填充版本列表
    this.generateVersionList();

    // 绑定点击事件
    this.historyDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown(this.historyDropdown, this.historyMenu);
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.history-dropdown')) {
        this.closeDropdown(this.historyDropdown, this.historyMenu);
      }
    });
  }

  /**
   * 生成版本列表
   */
  generateVersionList() {
    this.versionDropdownList.innerHTML = '';
    const versions = versionConfig.versions;

    // 按日期倒序排列
    const sortedVersions = [...versions].reverse();

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

      // 点击切换版本
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeDropdown(this.historyDropdown, this.historyMenu);
        
        if (isCurrent) {
          window.location.href = '/';
        } else {
          this.switchToVersion(version);
        }
      });

      this.versionDropdownList.appendChild(item);
    });
  }

  /**
   * 切换到指定版本
   */
  switchToVersion(version) {
    // 实现版本切换逻辑
    this.showVersionTransition(version);
  }

  /**
   * 显示版本切换过渡动画
   */
  showVersionTransition(version) {
    // 导入版本配置
    import('../../config/version.config.js').then(({ versionConfig }) => {
      // 创建过渡动画元素
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

      // 创建左侧线条
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

      // 创建右侧线条
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

      // 创建品牌文字
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

      // 添加元素到页面
      transitionElement.appendChild(lineLeft);
      transitionElement.appendChild(lineRight);
      transitionElement.appendChild(brandText);
      document.body.appendChild(transitionElement);

      // 触发动画
      setTimeout(() => {
        lineLeft.style.transform = 'translateX(100%)';
        lineRight.style.transform = 'translateX(-100%)';
        
        // 显示品牌文字
        setTimeout(() => {
          brandText.style.opacity = '1';
          
          // 隐藏所有元素并跳转到版本页面
          setTimeout(() => {
            brandText.style.opacity = '0';
            
            setTimeout(() => {
              lineLeft.style.transform = 'translateX(200%)';
              lineRight.style.transform = 'translateX(-200%)';
              
              // 跳转到版本页面
              setTimeout(() => {
                window.location.href = `/?v=${version.id}`;
              }, versionConfig.transition.animationDuration / 2);
            }, versionConfig.transition.animationDuration / 2);
          }, versionConfig.transition.animationDuration / 2);
        }, versionConfig.transition.animationDuration);
      }, 100);
    });
  }

  /**
   * 切换下拉菜单
   */
  toggleDropdown(trigger, menu) {
    const isActive = trigger.classList.contains('active');
    
    // 关闭所有下拉菜单
    this.closeAllDropdowns();
    
    // 如果未激活，则激活
    if (!isActive) {
      trigger.classList.add('active');
    }
  }

  /**
   * 关闭下拉菜单
   */
  closeDropdown(trigger, menu) {
    trigger.classList.remove('active');
  }

  /**
   * 关闭所有下拉菜单
   */
  closeAllDropdowns() {
    this.languageSwitcher.classList.remove('active');
    this.historyDropdown.classList.remove('active');
  }

  /**
   * 初始化主题切换
   */
  initThemeToggle() {
    console.log('initThemeToggle called');
    console.log('themeToggle:', this.themeToggle);

    if (!this.themeToggle) {
      console.error('themeToggle is null');
      return;
    }

    this.updateThemeIcon();

    this.themeToggle.addEventListener('click', () => {
      themeManager.toggle();
    });

    // 监听主题变化
    themeManager.onChange((theme) => {
      this.updateThemeIcon();
    });
  }

  /**
   * 更新主题图标
   */
  updateThemeIcon() {
    if (!this.themeToggle) return;

    const theme = themeManager.getTheme();
    const sunIcon = this.themeToggle.querySelector('.sun-icon');
    const moonIcon = this.themeToggle.querySelector('.moon-icon');

    if (theme === 'dark' && sunIcon && moonIcon) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else if (sunIcon && moonIcon) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  /**
   * 初始化活动链接
   */
  initActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.navbar.querySelectorAll('.nav-link');

    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * 初始化翻译
   */
  initTranslations() {
    const elements = this.navbar.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });

    // 监听语言变化，更新翻译
    i18n.onChange(() => {
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18n.t(key);
      });
    });
  }
}

// 导出
export { Navbar };
