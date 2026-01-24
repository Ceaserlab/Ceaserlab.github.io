/**
 * Theme Manager
 * 主题管理器 - 控制亮色/暗色主题切换
 */

import { themeConfig } from '../../config/theme.config.js';
import { storage } from '../storage/storage.js';

class ThemeManager {
  constructor() {
    this.currentTheme = this._detectTheme();
    this.init();
  }

  /**
   * 初始化主题
   */
  init() {
    // 从本地存储读取保存的主题
    const savedTheme = storage.get(themeConfig.switch.localStorageKey);

    if (savedTheme && themeConfig.themes[savedTheme]) {
      this.setTheme(savedTheme, false);
    } else if (themeConfig.switch.systemThemeDetection) {
      // 检测系统主题
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      this.setTheme(systemTheme, false);
    } else {
      this.setTheme(themeConfig.defaultTheme, false);
    }

    // 监听系统主题变化
    if (themeConfig.switch.systemThemeDetection) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // 只有在没有手动设置主题时才跟随系统
        if (!storage.get(themeConfig.switch.localStorageKey)) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }

    // 触发自定义事件
    this._dispatchThemeChange(this.currentTheme);
  }

  /**
   * 检测当前主题
   * @returns {string} 'light' or 'dark'
   */
  _detectTheme() {
    return document.documentElement.getAttribute('data-theme') || themeConfig.defaultTheme;
  }

  /**
   * 设置主题
   * @param {string} theme - 主题名称 ('light' or 'dark')
   * @param {boolean} save - 是否保存到本地存储
   */
  setTheme(theme, save = true) {
    if (!themeConfig.themes[theme]) {
      console.warn(`Theme "${theme}" not found`);
      return;
    }

    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    if (save) {
      storage.set(themeConfig.switch.localStorageKey, theme);
    }

    // 触发自定义事件
    this._dispatchThemeChange(theme);
  }

  /**
   * 切换主题
   */
  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * 获取当前主题
   * @returns {string}
   */
  getTheme() {
    return this.currentTheme;
  }

  /**
   * 获取主题配置
   * @param {string} theme - 主题名称
   * @returns {object}
   */
  getThemeConfig(theme = this.currentTheme) {
    return themeConfig.themes[theme];
  }

  /**
   * 获取所有可用主题
   * @returns {object}
   */
  getAllThemes() {
    return themeConfig.themes;
  }

  /**
   * 触发主题变化事件
   * @param {string} theme
   */
  _dispatchThemeChange(theme) {
    const event = new CustomEvent('themechange', {
      detail: { theme }
    });
    window.dispatchEvent(event);
  }

  /**
   * 监听主题变化
   * @param {function} callback
   * @returns {function} 取消监听的函数
   */
  onChange(callback) {
    const handler = (e) => callback(e.detail.theme);
    window.addEventListener('themechange', handler);
    return () => window.removeEventListener('themechange', handler);
  }
}

// 导出单例实例
export const themeManager = new ThemeManager();
