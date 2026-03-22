/**
 * Version Manager
 * 版本管理器 - 管理版本切换和版本特定资源
 */

import { versionConfig } from '../../config/version.config.js';
import { storage } from '../storage/storage.js';

class VersionManager {
  constructor() {
    this.currentVersion = versionConfig.currentVersion;
    this.versions = versionConfig.versions;
    this.init();
  }

  /**
   * 初始化版本管理器
   */
  init() {
    // 检查当前URL是否在版本目录中
    const pathname = window.location.pathname;
    const versionMatch = pathname.match(/^\/versions\/(\d+\.\d+\.\d+)\//);
    
    if (versionMatch) {
      // 从URL路径获取版本
      const versionId = versionMatch[1];
      const version = this.getVersionById(versionId);
      if (version) {
        this.currentVersion = version;
      }
    } else {
      // 从URL参数获取版本
      const urlParams = new URLSearchParams(window.location.search);
      const versionId = urlParams.get('v');

      if (versionId) {
        const version = this.getVersionById(versionId);
        if (version) {
          this.currentVersion = version;
        }
      }
    }

    // 加载版本特定的CSS
    this.loadVersionCSS(this.currentVersion.id);
  }

  /**
   * 根据ID获取版本
   * @param {string} versionId - 版本ID
   * @returns {object|null} 版本对象
   */
  getVersionById(versionId) {
    return this.versions.find(v => v.id === versionId) || null;
  }

  /**
   * 切换版本
   * @param {object} version - 版本对象
   * @param {boolean} showTransition - 是否显示过渡动画
   */
  switchVersion(version, showTransition = true) {
    if (showTransition) {
      this.showVersionTransition(version);
    } else {
      this._switchToVersion(version);
    }
  }

  /**
   * 显示版本切换过渡动画
   * @param {object} version - 版本对象
   */
  showVersionTransition(version) {
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
              this._switchToVersion(version);
            }, versionConfig.transition.animationDuration / 2);
          }, versionConfig.transition.animationDuration / 2);
        }, versionConfig.transition.animationDuration / 2);
      }, versionConfig.transition.animationDuration);
    }, 100);
  }

  /**
   * 实际切换版本
   * @param {object} version - 版本对象
   */
  _switchToVersion(version) {
    // 构建版本页面URL
    let versionUrl = '';
    if (version.id === versionConfig.currentVersion.id) {
      // 当前版本直接返回根目录
      versionUrl = '/';
    } else {
      // 其他版本导航到对应目录
      versionUrl = `/versions/${version.id}/index.html`;
    }
    
    // 跳转到版本页面
    window.location.href = versionUrl;
  }

  /**
   * 加载版本特定的CSS
   * @param {string} versionId - 版本ID
   */
  loadVersionCSS(versionId) {
    // 移除现有的版本特定CSS
    this.removeVersionCSS();
    
    // 根据版本ID加载不同的CSS
    let cssPath = '';
    if (versionId === '1.0.0') {
      cssPath = '/versions/1.0.0/style.css';
    } else if (versionId === '1.0.1') {
      cssPath = '/versions/1.0.1/style.css';
    } else if (versionId === '1.0.2') {
      cssPath = '/versions/1.0.2/style.css';
    }

    if (cssPath) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      link.className = 'version-specific-css';
      document.head.appendChild(link);
    }
  }

  /**
   * 移除版本特定的CSS
   */
  removeVersionCSS() {
    const existingLinks = document.querySelectorAll('.version-specific-css');
    existingLinks.forEach(link => link.remove());
  }

  /**
   * 获取当前版本
   * @returns {object} 当前版本对象
   */
  getCurrentVersion() {
    return this.currentVersion;
  }

  /**
   * 获取所有版本
   * @returns {array} 版本列表
   */
  getAllVersions() {
    return this.versions;
  }

  /**
   * 获取排序后的版本列表（从新到旧）
   * @returns {array} 排序后的版本列表
   */
  getSortedVersions() {
    return [...this.versions].reverse();
  }

  /**
   * 检查是否为当前版本
   * @param {string} versionId - 版本ID
   * @returns {boolean} 是否为当前版本
   */
  isCurrentVersion(versionId) {
    return versionId === this.currentVersion.id;
  }
}

// 导出单例实例
export const versionManager = new VersionManager();
