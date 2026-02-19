/**
 * Home Page Logic
 * 首页逻辑
 */

import { i18n } from '../../core/i18n/i18n.js';
import { Navbar } from '../../components/navbar/navbar.js';
import { Gallery } from '../../components/gallery/gallery.js';
import { versionConfig } from '../../config/version.config.js';

class HomePage {
  constructor() {
    this.init();
  }

  /**
   * 初始化首页
   */
  async init() {
    // 检查版本参数
    this.checkVersionParam();

    // 初始化导航栏（直接初始化，不需要加载 HTML）
    new Navbar();

    // 初始化相册
    await this.initGallery();

    // 初始化翻译
    await this.initTranslations();

    // 初始化联系表单
    this.initContactForm();
  }

  /**
   * 检查版本参数
   */
  checkVersionParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const versionId = urlParams.get('v');

    if (versionId) {
      const version = versionConfig.versions.find(v => v.id === versionId);
      if (version) {
        this.showVersionWatermark(version);
        this.loadVersionContent(version);
      }
    }
  }

  /**
   * 显示版本水印
   */
  showVersionWatermark(version) {
    const watermark = document.createElement('div');
    watermark.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: rgba(0, 166, 126, 0.9);
      color: white;
      padding: 12px 24px;
      font-weight: bold;
      font-size: 14px;
      z-index: 9998;
      border-left: 4px solid white;
    `;
    watermark.textContent = `Version ${version.id}`;
    document.body.appendChild(watermark);
  }

  /**
   * 加载版本内容
   */
  loadVersionContent(version) {
    // 根据版本ID加载不同的内容
    // 这里可以根据需要实现更复杂的版本内容切换逻辑
    console.log(`Loading version ${version.id}: ${version.name}`);
    
    // 加载版本特定的CSS
    this.loadVersionSpecificCSS(version.id);
    
    // 示例：根据版本ID修改页面内容
    if (version.id === '0.9.0') {
      // Beta版本的特殊处理
      this.modifyBetaVersionContent();
    } else if (version.id === '1.0.0') {
      // 初始版本的处理
      this.modifyInitialVersionContent();
    }
  }

  /**
   * 加载版本特定的CSS
   */
  loadVersionSpecificCSS(versionId) {
    // 移除现有的版本特定CSS
    this.removeVersionSpecificCSS();
    
    // 根据版本ID加载不同的CSS
    if (versionId === '1.0.0') {
      // 1.0.0版本使用原始样式
      this.loadCSS('/src/styles/versions/1.0.0.css');
    } else if (versionId === '0.9.0') {
      // 0.9.0版本使用beta样式
      this.loadCSS('/src/styles/versions/0.9.0.css');
    }
  }

  /**
   * 加载CSS文件
   */
  loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.className = 'version-specific-css';
    document.head.appendChild(link);
  }

  /**
   * 移除版本特定的CSS
   */
  removeVersionSpecificCSS() {
    const existingLinks = document.querySelectorAll('.version-specific-css');
    existingLinks.forEach(link => link.remove());
  }

  /**
   * 修改Beta版本内容
   */
  modifyBetaVersionContent() {
    // 修改页面标题
    document.title = 'Ceaserzhao - Beta Version';
    
    // 在hero section添加Beta标识
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      const betaBadge = document.createElement('div');
      betaBadge.style.cssText = `
        position: absolute;
        top: 40px;
        right: 40px;
        background-color: #ff6b6b;
        color: white;
        padding: 8px 16px;
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      `;
      betaBadge.textContent = 'Beta Version';
      heroSection.appendChild(betaBadge);
    }
  }

  /**
   * 修改初始版本内容
   */
  modifyInitialVersionContent() {
    // 修改页面标题
    document.title = 'Ceaserzhao - Initial Release';
    
    // 删除不属于1.0.0版本的内容
    this.removeNonVersionContent('1.0.0');
  }

  /**
   * 删除不属于指定版本的内容
   */
  removeNonVersionContent(versionId) {
    if (versionId === '1.0.0') {
      // 删除时间线中2025年11月及以后的事件（这些是1.0.1版本添加的）
      this.removeFutureTimelineEvents('2025.11');
      
      // 删除可能不属于1.0.0版本的其他内容
      this.removeNonVersionSections();
    }
  }

  /**
   * 删除时间线中未来的事件
   */
  removeFutureTimelineEvents(cutoffDate) {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    timelineNodes.forEach(node => {
      const dateElement = node.querySelector('.timeline-date');
      if (dateElement) {
        const date = dateElement.textContent;
        if (this.isDateAfter(date, cutoffDate)) {
          node.remove();
        }
      }
    });
  }

  /**
   * 检查日期是否在 cutoffDate 之后
   */
  isDateAfter(date, cutoffDate) {
    // 简单的日期比较逻辑
    const dateParts = date.split('.').map(Number);
    const cutoffParts = cutoffDate.split('.').map(Number);
    
    if (dateParts[0] > cutoffParts[0]) return true;
    if (dateParts[0] === cutoffParts[0] && dateParts[1] > cutoffParts[1]) return true;
    if (dateParts[0] === cutoffParts[0] && dateParts[1] === cutoffParts[1] && dateParts[2] > cutoffParts[2]) return true;
    
    return false;
  }

  /**
   * 删除不属于当前版本的部分
   */
  removeNonVersionSections() {
    // 这里可以添加删除其他不属于1.0.0版本的部分的逻辑
    console.log('Removing non-1.0.0 version content');
  }

  /**
   * 初始化翻译
   */
  async initTranslations() {
    // 等待 i18n 初始化完成
    if (!i18n.translations[i18n.currentLanguage]) {
      await i18n.init();
    }

    this.updateTranslations();

    // 监听语言变化
    i18n.onChange(() => {
      this.updateTranslations();
    });
  }

  /**
   * 更新所有翻译
   */
  updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });
  }

  /**
   * 初始化相册
   */
  async initGallery() {
    try {
      const response = await fetch('/assets/data/gallery-data.json');
      const data = await response.json();

      const galleryHtml = await fetch('/src/components/gallery/gallery.html');
      document.getElementById('gallery-container').innerHTML = await galleryHtml.text();

      new Gallery('gallery-map', data.images);
    } catch (error) {
      console.error('Failed to load gallery:', error);
    }
  }

  /**
   * 初始化联系表单
   */
  initContactForm() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
      const message = messageInput.value.trim();

      if (!message) {
        alert(i18n.t('contact.message') || 'Please enter a message');
        return;
      }

      // 这里可以集成表单提交逻辑
      // 目前只是简单显示成功消息
      alert('Thank you for your message! This is a demo, so the message is not actually sent.');
      messageInput.value = '';
    });

    // 初始化时间轴横向滚动
    this.initTimelineScroll();
  }

  /**
   * 初始化时间轴横向滚动
   */
  initTimelineScroll() {
    const container = document.getElementById('timeline-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (!container || !scrollLeftBtn || !scrollRightBtn) return;

    const scrollAmount = 400;

    // 按钮滚动
    scrollLeftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // 鼠标滚轮支持（按住 Shift 时横向滚动）
    container.addEventListener('wheel', (e) => {
      if (e.shiftKey) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // 触摸滑动支持
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new HomePage();
});

// 导出
export { HomePage };
