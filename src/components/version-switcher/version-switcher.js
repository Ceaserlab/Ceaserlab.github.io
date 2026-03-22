/**
 * Version Switcher Component
 * 版本切换组件 - 提供统一的版本切换界面
 */

import { versionManager } from '../../core/version/version-manager.js';

class VersionSwitcher {
  constructor() {
    this.init();
  }

  /**
   * 初始化版本切换组件
   */
  init() {
    this.initElements();
    this.initVersionList();
    this.initEventListeners();
  }

  /**
   * 初始化DOM元素引用
   */
  initElements() {
    this.versionSwitcher = document.getElementById('version-switcher');
    this.versionDropdown = document.getElementById('version-dropdown');
    this.versionList = document.getElementById('version-list');
    this.currentVersionDisplay = document.getElementById('current-version');
  }

  /**
   * 初始化版本列表
   */
  initVersionList() {
    if (!this.versionList) return;

    this.versionList.innerHTML = '';
    const versions = versionManager.getSortedVersions();
    const currentVersion = versionManager.getCurrentVersion();

    versions.forEach(version => {
      const isCurrent = version.id === currentVersion.id;
      const item = document.createElement('div');
      item.className = `version-item ${isCurrent ? 'current' : ''}`;
      
      item.innerHTML = `
        <span class="version-id">${version.id}</span>
        <span class="version-date">${version.date}</span>
        <span class="version-name">${version.name}</span>
        ${isCurrent ? '<span class="version-badge">Current</span>' : ''}
      `;

      // 点击切换版本
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeDropdown();
        
        if (!isCurrent) {
          versionManager.switchVersion(version);
        }
      });

      this.versionList.appendChild(item);
    });

    // 更新当前版本显示
    if (this.currentVersionDisplay) {
      this.currentVersionDisplay.textContent = currentVersion.id;
    }
  }

  /**
   * 初始化事件监听器
   */
  initEventListeners() {
    // 切换按钮点击事件
    if (this.versionSwitcher) {
      this.versionSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });
    }

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#version-switcher')) {
        this.closeDropdown();
      }
    });
  }

  /**
   * 切换下拉菜单
   */
  toggleDropdown() {
    if (this.versionSwitcher) {
      this.versionSwitcher.classList.toggle('active');
    }
  }

  /**
   * 关闭下拉菜单
   */
  closeDropdown() {
    if (this.versionSwitcher) {
      this.versionSwitcher.classList.remove('active');
    }
  }
}

// 导出
export { VersionSwitcher };
