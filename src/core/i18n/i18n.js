/**
 * i18n Manager
 * 国际化管理器 - 支持多语言切换
 */

import { i18nConfig } from '../../config/i18n.config.js';
import { storage } from '../storage/storage.js';

class I18nManager {
  constructor() {
    this.currentLanguage = i18nConfig.defaultLanguage;
    this.translations = {};
    this.init();
  }

  /**
   * 初始化 i18n
   */
  async init() {
    // 从本地存储读取保存的语言
    const savedLanguage = storage.get('ceaser-language');

    if (savedLanguage && this._isValidLanguage(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    }

    // 加载默认语言
    await this.loadLanguage(this.currentLanguage);

    // 设置 HTML lang 和 dir 属性
    this._updateHtmlAttributes();
  }

  /**
   * 验证语言代码是否有效
   * @param {string} language
   * @returns {boolean}
   */
  _isValidLanguage(language) {
    return i18nConfig.languages.some(lang => lang.code === language);
  }

  /**
   * 加载语言文件
   * @param {string} language - 语言代码
   */
  async loadLanguage(language) {
    try {
      const response = await fetch(`${i18nConfig.localesPath}/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load language file: ${language}`);
      }
      this.translations[language] = await response.json();
    } catch (error) {
      console.error(`Failed to load language "${language}":`, error);
      // 如果加载失败，使用空对象
      this.translations[language] = {};
    }
  }

  /**
   * 切换语言
   * @param {string} language - 语言代码
   */
  async setLanguage(language) {
    if (!this._isValidLanguage(language)) {
      console.warn(`Language "${language}" is not supported`);
      return;
    }

    // 如果语言未加载，先加载
    if (!this.translations[language]) {
      await this.loadLanguage(language);
    }

    this.currentLanguage = language;
    storage.set('ceaser-language', language);
    this._updateHtmlAttributes();

    // 触发自定义事件
    this._dispatchLanguageChange(language);
  }

  /**
   * 更新 HTML 属性
   */
  _updateHtmlAttributes() {
    const langConfig = i18nConfig.languages.find(l => l.code === this.currentLanguage);
    if (langConfig) {
      document.documentElement.setAttribute('lang', langConfig.code);
      document.documentElement.setAttribute('dir', langConfig.rtl ? 'rtl' : 'ltr');
    }
  }

  /**
   * 翻译文本
   * @param {string} key - 翻译键 (支持嵌套，如 'nav.home')
   * @param {object} params - 参数对象
   * @returns {string}
   */
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果找不到翻译，返回 key
        console.warn(`Translation key "${key}" not found for language "${this.currentLanguage}"`);
        return key;
      }
    }

    // 如果不是字符串，返回 key
    if (typeof value !== 'string') {
      console.warn(`Translation value for key "${key}" is not a string`);
      return key;
    }

    // 替换参数
    return this._replaceParams(value, params);
  }

  /**
   * 替换字符串中的参数
   * @param {string} template
   * @param {object} params
   * @returns {string}
   */
  _replaceParams(template, params) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * 获取当前语言
   * @returns {string}
   */
  getLanguage() {
    return this.currentLanguage;
  }

  /**
   * 获取当前语言配置
   * @returns {object}
   */
  getLanguageConfig() {
    return i18nConfig.languages.find(l => l.code === this.currentLanguage);
  }

  /**
   * 获取所有支持的语言
   * @returns {array}
   */
  getAllLanguages() {
    return i18nConfig.languages;
  }

  /**
   * 触发语言变化事件
   * @param {string} language
   */
  _dispatchLanguageChange(language) {
    const event = new CustomEvent('languagechange', {
      detail: { language }
    });
    window.dispatchEvent(event);
  }

  /**
   * 监听语言变化
   * @param {function} callback
   * @returns {function} 取消监听的函数
   */
  onChange(callback) {
    const handler = (e) => callback(e.detail.language);
    window.addEventListener('languagechange', handler);
    return () => window.removeEventListener('languagechange', handler);
  }
}

// 导出单例实例
export const i18n = new I18nManager();
