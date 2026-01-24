/**
 * Home Page Logic
 * 首页逻辑
 */

import { i18n } from '../../core/i18n/i18n.js';
import { Navbar } from '../../components/navbar/navbar.js';
import { Gallery } from '../../components/gallery/gallery.js';

class HomePage {
  constructor() {
    this.init();
  }

  /**
   * 初始化首页
   */
  async init() {
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
