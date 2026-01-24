/**
 * History Page Logic
 * 历史版本页面逻辑
 */

import { i18n } from '../../core/i18n/i18n.js';
import { versionConfig } from '../../config/version.config.js';
import { Navbar } from '../../components/navbar/navbar.js';

class HistoryPage {
  constructor() {
    this.init();
  }

  /**
   * 初始化历史页面
   */
  async init() {
    // 初始化导航栏
    await this.loadNavbar();

    // 初始化翻译
    await this.initTranslations();

    // 初始化版本列表
    this.initVersionList();

    // 初始化版本选择器
    this.initVersionSelector();
  }

  /**
   * 加载导航栏
   */
  async loadNavbar() {
    try {
      const response = await fetch('/src/components/navbar/navbar.html');
      const html = await response.text();
      document.getElementById('navbar-container').innerHTML = html;
      new Navbar();
    } catch (error) {
      console.error('Failed to load navbar:', error);
    }
  }

  /**
   * 初始化翻译
   */
  async initTranslations() {
    if (!i18n.translations[i18n.currentLanguage]) {
      await i18n.init();
    }

    this.updateTranslations();

    i18n.onChange(() => {
      this.updateTranslations();
    });
  }

  /**
   * 更新翻译
   */
  updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });
  }

  /**
   * 初始化版本列表
   */
  initVersionList() {
    const versionList = document.getElementById('version-list');
    const versions = versionConfig.versions;

    // 按日期倒序排列
    const sortedVersions = [...versions].reverse();

    versionList.innerHTML = '';

    sortedVersions.forEach(version => {
      const isCurrent = version.id === versionConfig.currentVersion.id;
      const card = this.createVersionCard(version, isCurrent);
      versionList.appendChild(card);
    });
  }

  /**
   * 创建版本卡片
   */
  createVersionCard(version, isCurrent) {
    const card = document.createElement('div');
    card.className = `version-card ${isCurrent ? 'current' : ''}`;
    card.dataset.version = version.id;

    const badge = isCurrent
      ? `<span class="version-badge" data-i18n="history.current">${i18n.t('history.current')}</span>`
      : '';

    card.innerHTML = `
      <div class="version-card-header">
        <div class="version-info">
          <span class="version-id">${version.id}</span>
          ${badge}
        </div>
        <span class="version-date">${version.date}</span>
      </div>
      <h3 class="version-name">${version.name}</h3>
      <p class="version-description">${version.description}</p>
    `;

    // 点击切换到该版本
    card.addEventListener('click', () => {
      if (isCurrent) {
        alert('This is the current version!');
      } else {
        this.viewVersion(version);
      }
    });

    return card;
  }

  /**
   * 初始化版本选择器
   */
  initVersionSelector() {
    const select = document.getElementById('version-select');
    const viewButton = document.getElementById('view-button');
    const versions = versionConfig.versions;

    // 按日期倒序排列
    const sortedVersions = [...versions].reverse();

    // 填充选项
    sortedVersions.forEach(version => {
      const option = document.createElement('option');
      option.value = version.id;
      option.textContent = `${version.id} - ${version.name}`;
      select.appendChild(option);
    });

    // 默认选中当前版本
    select.value = versionConfig.currentVersion.id;

    // 查看按钮点击事件
    viewButton.addEventListener('click', () => {
      const selectedVersionId = select.value;
      const version = versions.find(v => v.id === selectedVersionId);

      if (version) {
        this.viewVersion(version);
      }
    });
  }

  /**
   * 查看指定版本
   */
  viewVersion(version) {
    if (version.id === versionConfig.currentVersion.id) {
      window.location.href = '/';
    } else {
      // 这里可以实现版本切换逻辑
      // 目前只是提示
      alert(`Switching to version ${version.id}...\n\nThis is a demo. Actual version switching will be implemented with Git history.`);
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new HistoryPage();
});

// 导出
export { HistoryPage };
